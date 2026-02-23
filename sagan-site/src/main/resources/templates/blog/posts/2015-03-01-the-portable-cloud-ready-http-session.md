---
title: The Portable, Cloud-Ready HTTP Session
source: https://spring.io/blog/2015/03/01/the-portable-cloud-ready-http-session
scraped: 2026-02-23T21:53:13.360Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 01, 2015 | 12 Comments
---

# The Portable, Cloud-Ready HTTP Session

_Engineering | Josh Long |  March 01, 2015 | 12 Comments_

## [](#a-framework-for-all-seasons-and-architectures)A Framework for all Seasons (and Architectures)

Spring walks an interesting line. It provides a lot of value no matter where you run it, and - because it's built on dependency injection layer - it offers a natural piece of indirection between the underlying layer and the applications that run on top of it. This indirection promotes code portability through decoupling: your application code is ignorant of where the `javax.sql.DataSource` (or whatever) handle it's using comes from, be it a JNDI lookup, environment variables, or a simple new'd-up bean provided by Spring. This decoupling and the rich toolbox of features on top of Spring supporting all manner of use cases - batch processing, integration, stream processing, web services, microservices, operations, web applications, security, etc. - have made Spring a logical choice for developers deploying to (sometimes-embedded) web containers like Apache Tomcat or Eclipse Jetty, to application servers like WebSphere and WildFly, and to cloud runtimes like Google App Engine, Heroku, OpenShift, and (my personal favorite these days) Cloud Foundry. This portability is *also* what makes it easy to forklift most (reasonably-written!) applications from the application servers into lighter web containers and, ultimately, into the cloud.

## [](#the-stateful-fly-in-the-ointment)The (Stateful) Fly in the Ointment

So, what's the problem? Why write this blog at all?

Things aren't ideal with applications that use the HTTP session, however. Scaling the HTTP session is where things get, - pardon the HTTP session terminology pun - *sticky*. You see there are two things that your application will need to scale the HTTP session: session affinity and session replication. Session affinity (or *sticky sessions*) means that requests to a clustered web application will be routed to the node that originally issued the HTTP session cookie. If that application instance should be taken offline, then session replication ensures that the relevant state is available on another node. The client can be routed there seamlessly, retaining all notion of conversational state. It's not *that* hard to configure HTTP session replication in the popular containers. Here's the page on setting it up [with Apache Tomcat](http://tomcat.apache.org/tomcat-6.0-doc/cluster-howto.html) and here's the page on how to set it up with [Jetty](http://www.eclipse.org/jetty/documentation/9.2.3.v20140905/session-clustering-jdbc.html). Typical session replication strategies involve using multicast networking to notify other nodes in a cluster of state changes. Session affinity and session replication work well in small environments where you only have a few nodes. Unless you're using an embedded web container, configuring the HTTP session replication is yet another thing that needs to be configured in the container, outside of the control of the application.

## [](#thats-ok-the-cloudll-fix-it-right)That's OK, the Cloud'll Fix It, Right?

You'd think that - if nothing else - this sort of configuration would get easier and more predictable once you move your application to the cloud, but in fact it can be more painful! Multicast networking is a no-no in most cloud environments, including in Amazon Web Services. Even in higher-level, more application-centric Platform-as-a-Service environments like Heroku or Cloud Foundry, session replication hasn't been super easy. Heroku, for example, [offers no session affinity and no session replication](https://devcenter.heroku.com/articles/intro-for-java-developers). This restriction is understandable: besides the restrictions in multicast networking, applications should - as much as possible - minimize server-side state. Remember, Heroku limits your application's RAM to 512MB! This is more than enough if you don't try to treat your spare RAM as a database or persistence tier! Cloud Foundry, for its part, serves larger communities of developers and runs on-premise in various data-centers so it has to be a bit more practical. Pivotal Web Services (which runs [Cloud Foundry](http://cloudfoundry.org)), for example, offers 1GB of RAM for applications, and it has offered session affinity for a few years. It didn't offer session replication until late last year when a change to the buildpack enables session replication for any `.war`\-based web applications [deployed to the default, standalone configuration of the Apache Tomcat web server](http://blog.pivotal.io/cloud-foundry-pivotal/products/session-replication-on-cloud-foundry-2). This support doesn't use multicast networking, though. Instead, it uses the convention of configuring any bound Redis backing-service for use with the Tomcat container's session replication strategy. Using a backing-service like Redis, or perhaps some shared filesystem, are really the only sensible approaches to session replication in the cloud.

All of these approaches have different tradeoffs:

-   some are container-specific and that implies they don't move readily from one environment to another.
-   they may introduce additional complexity for operations (if you still have that team!) and that introduces just that much more friction between the application and production
-   they may use mutlicast networking which doesn't work well in a cloud environment
-   they may rely on *magic* like the Cloud Foundry Java buildpack which only knows about `.war`s deployed to standalone Apache Tomcat, not embedded `.jar`s or indeed other web containers like Jetty.
-   an implied limitation to all of these other points is that the persistence strategy isn't pluggable. Multicast isn't for you? Great, use Redis. Redis isn't for you and want to use Memcache or something else not readily supported? Oh...

## [](#enter-spring-session)Enter Spring Session

Spring Session provides a very nice solution for all of these problems. It's a wrapper around the standard Servlet HTTP Session abstraction. It's easy to plug in to any application, whether they're Spring-based or not. It acts as a sort of proxy in front of the HTTP session that forwards requests to a strategy implementation. Out of the box, there's an implementation that supports working with `java.util.Map<K,V>`s and another that works with Redis, directly. The implementation that uses a `java.util.Map<K,V>` doesn't sound all that interesting at first, but remember, all your favorite distributed data-grids (Pivotal GemFire, Hazelcast, Oracle Coherence, etc.) can give you a reference to a `Map` implementation backed by data-grid memory.

The Redis-specific implementation takes advantage of some efficiencies in Redis, if it's available. Let's look at setting up a dead-simple Spring Session application using Redis. Why Redis? Because it's legitimately "web-scale" - [check out this post on how Twitter uses it to scale to 105TB of RAM, 39MM QPS, and 10,000+ instances over on the *High Scalability* blog](http://highscalability.com/blog/2014/9/8/how-twitter-uses-redis-to-scale-105tb-ram-39mm-qps-10000-ins.html)!

In order to get this example to work, I've added the following Maven dependencies to [a simple Spring Boot project](http://start.spring.io).

-   `org.springframework.boot`:`spring-boot-starter-redis`:`1.2.0.RELEASE`
-   `org.springframework.boot`:`spring-boot-starter-web`:`1.2.0.RELEASE`
-   `org.springframework.session`:`spring-session-data-redis`:`1.0.0.RELEASE`

Here's a simple example application:

```java
Copypackage demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.UUID;

@EnableRedisHttpSession 
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}

@RestController
class HelloRestController {

	@RequestMapping("/")
	String uid(HttpSession session) {
		UUID uid = (UUID) session.getAttribute("uid");
		if (uid == null) {
			uid = UUID.randomUUID();
		}
		session.setAttribute("uid", uid);
		return uid.toString();
	}
}
```

Before you run it, make sure that you dedicate a clean Redis database to this application. You can, for example, reset the current database using `FLUSHDB`. The Spring Boot Redis starter automatically connects to a Redis database running on `localhost`. If you want to point it somewhere specific, use the [various `spring.redis.*` properties](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/redis/RedisProperties.java).

The example is as bare-minimum as possible: it simply confirms that data is being written to the Redis backing-store. Open up your `redis-cli` utility after interacting with the web application at `localhost:8080/` in your browser. The first request will trigger a unique session which will be used to cache the `uid` value. Subsequent requests by the same browser session will see the same value. Enter `keys *` in the `redis-cli` to see what's been persisted.

## [](#deploying-to-cloudfoundry)Deploying to CloudFoundry

Moving to this cloud can be a bit trickier. If you're deploying this to Cloud Foundry, the Cloud Foundry buildpack will automatically replace the Spring Boot auto-configured `RedisConnectionFactory` with a `RedisConnectionFactory` that points to the Redis instance bound to the application. This works *if* you're running on Cloud Foundry, using the right buildpack, and don't have more than one `RedisConnectionFactory` in your application.

I'll be using a Cloud Foundry `manifest.yml` to describe how this application should look when deployed to Cloud Foundry. In this case, it'll require at minimum a backing-service named `redis-session` that supports a Redis database. I've put this file in the root of my project, next to my Maven `pom.xml`. Note that this `manifest.yml` contributes an environment variable, `SPRING_PROFILES_ACTIVE`, that will activate the `cloud` Spring profile. We'll use this later.

```yml
Copy
---
applications:
- name: connectors
  memory: 512M
  instances: 1
  host: connectors-${random-word}
  domain: cfapps.io
  path: target/connectors.jar
  services:
    - redis-session
  env:
    SPRING_PROFILES_ACTIVE: cloud
    DEBUG: "true"
    debug: "true"

```

You need to create a Redis instance before pushing the application. I used the following incantation to create a simple Redis instance (called `redis-session`, we reference it in the `manifest.yml`) on Pivotal Web Services and then push the application.

```bash
Copycf create-service rediscloud  25mb redis-session
cf push
```

I can deploy the application as-is and things should just work in this example, with just one bound backing-service and one bean of a known type.

You can use the Spring Cloud PaaS connectors to make short work of explicitly configuring and consuming a cloud-managed Redis backing-service. In this new arrangement, we'll use Spring profiles to keep configuration for running on Cloud Foundry explicit. Add Spring Cloud PaaS connectors like this:

-   `org.springframework.cloud`:`spring-boot-starter-cloud-connectors`:`1.2.0.RELEASE`

That'll make it so that Spring Boot will autowire instances of every bound backing-service type it knows about. If there's a Redis database with a service ID `redis-session` then it can be injected using regular Spring qualifiers, like so:

```java
Copy   // ..
   @Autowired
   @Qualifier("redis-session")
   RedisConnectionFactory rcf;

```

This approach is the simplest, and that's what you'll get if you simply add the Spring Cloud starter dependency. If you want to explicitly configure services, disable the Spring Boot starter by adding the following property to your Spring Boot `src/main/resources/application.properties`:

```properties
Copyspring.cloud.enabled=false
```

Then, use the Spring Cloud PaaS connectors explicitly. The bean definition will *only* be active when the `cloud` Spring profile is active. Otherwise, the Spring Boot auto-configuration will kick in (which is what you want when runnning locally).

```java
Copypackage demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.Cloud;
import org.springframework.cloud.CloudFactory;
import org.springframework.cloud.service.common.RedisServiceInfo;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.lang.reflect.Field;
import java.util.UUID;

@EnableRedisHttpSession
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	@Profile("cloud")
	RedisConnectionFactory redisConnectionFactory() {
		CloudFactory cloudFactory = new CloudFactory();
		Cloud cloud = cloudFactory.getCloud();
		RedisServiceInfo redisServiceInfo = (RedisServiceInfo) cloud.getServiceInfo("redis-session");
		return cloud.getServiceConnector(redisServiceInfo.getId(),
                     RedisConnectionFactory.class, null);
	}
}

@RestController
class HelloRestController {

	@RequestMapping("/")
	String hello(HttpSession session) {
		UUID uid = (UUID) session.getAttribute("uid");
		if (uid == null) {
			uid = UUID.randomUUID();
		}
		session.setAttribute("uid", uid);
		return uid.toString();
	}
}
```

## [](#but-wait-theres-more)But Wait, There's More..

The whole point of this post was to look at how easily you can get scalable HTTP sessions for your Spring applications in your local environment or in the cloud. I'm *not* recommending that you start cramming your HTTP session with JSF page graphs again! If you need an expiring, scalable, ephemeral-ish store for lightweight business state - like security tokens - then Spring Session can help. Since Spring Session sits between your application and the HTTP session, it can provide a few other useful abstractions above and beyond the Servlet `HttpSession`. [Rob Winch, the lead of Spring Security and Spring Session](http://spring.io/team/rwinch), has done an amazing job talking about some of these other use cases in the documentation and in other blog posts, so I'll just review here:

-   you can easily [implement "Switch Users"](https://github.com/joshlong/bootiful-sessions/tree/master/users) functionality (sort of like Google Accounts). Check out the [amazing writeup in the docs for more](http://docs.spring.io/spring-session/docs/current/reference/html5/guides/users.html).
-   Spring Session knows about your Spring websocket traffic and will correctly perpetuate the HTTP session. This avoids [the problems](https://issues.apache.org/bugzilla/show_bug.cgi?id=54738) with [the websocket standard](https://java.net/jira/browse/WEBSOCKET_SPEC-175) where there's no practical way to perpetuate the HTTP session from websocket traffic. Check out the [amazing writeup in the docs for more](http://docs.spring.io/spring-session/docs/current/reference/html5/guides/websocket.html).
-   you can pull knobs and levers for everything, including the mechanism used to corellate client requests to server-side session state: [HTTP headers](https://github.com/joshlong/bootiful-sessions/tree/master/rest)? Cookies? Something else? The headers approach is pretty darned cool and can give you a [sort of poor-man's OAuth access token if used along with Spring Security](http://spring.io/blog/2015/01/20/the-resource-server-angular-js-and-spring-security-part-iii) to secure REST services. Check out the amazing [writeup in the docs for more](http://docs.spring.io/spring-session/docs/current/reference/html5/guides/rest.html).

I was lucky enough to do a webinar on Spring Session last week. [Rob](http://spring.io/team/rwinch) gave me the 411 on some things that *could* be in future releases:

-   session concurrency control ("sign me out of my other accounts")
-   Spring Batch and Spring Integration claim-check support
-   support for managing accounts - optimized persistence (beyond Java serialization),
-   smarter, injectable beans (as opposed to beans that are exposed as well-known request attributes but could otherwise be made available as Spring MVC arguments or the like)

Thanks, Rob, for all the great information.