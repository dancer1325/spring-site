---
title: Microservice  Registration and Discovery with Spring Cloud and Netflix\'s Eureka
source: https://spring.io/blog/2015/01/20/microservice-registration-and-discovery-with-spring-cloud-and-netflix-s-eureka
scraped: 2026-02-23T21:59:39.415Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 20, 2015 | 44 Comments
---

# Microservice  Registration and Discovery with Spring Cloud and Netflix's Eureka

_Engineering | Josh Long |  January 20, 2015 | 44 Comments_

The microservice style of architecture is not so much about building individual services so much as it is making the *interactions between* services reliable and failure-tolerant. While the focus on these interactions is new, the need for that focus is not. We've long known that services don't operate in a vacuum. Even before cloud economics, we knew that - in a practical world - clients should be designed to be immune to service outages. The cloud makes it easy to think of capacity as ephemeral, fluid. The burden is on the client to manage this intrinsic complexity.

In this post, we'll look at how [Spring Cloud](http://cloud.spring.io) helps you manage that complexity with a service registry like Eureka and Consul and client-side load-balancing.

## [](#the-clouds-phone-book)The Cloud's Phone Book

A service registry is a phone book for your microservices. Each service registers itself with the service registry and tells the registry where it lives (host, port, node name) and perhaps other service-specific metadata - things that other services can use to make informed decisions about it. Clients can ask questions about the service topology ("are there any 'fulfillment-services' available, and if so, where?") and service capabilities ("can you handle X, Y, and Z?"). You probably already use a technology that has some notion of a cluster (Cassandra, Memcached, etc.), and that information is ideally stored in a service registry.

There [are several popular options for service registries](http://jasonwilder.com/blog/2014/02/04/service-discovery-in-the-cloud/). Netflix built and then open-sourced their own service registry, [Eureka](https://github.com/netflix/eureka). Another new, but increasingly popular option is [Consul](http://consul.io). We'll look principally at some of the integration between Spring Cloud and Netflix's Eureka service registry.

From the [the Spring Cloud project page](http://projects.spring.io/spring-cloud/): "Spring Cloud provides tools for developers to quickly build some of the common patterns in distributed systems (e.g. configuration management, service discovery, circuit breakers, intelligent routing, micro-proxy, control bus, one-time tokens, global locks, leadership election, distributed sessions, cluster state). Coordination of distributed systems leads to boiler plate patterns, and using Spring Cloud developers can quickly stand up services and applications that implement those patterns. They will work well in any distributed environment, including the developer's own laptop, bare metal data centres, and managed platforms such as Cloud Foundry."

Spring Cloud already supports both Eureka and Consul, though I'll focus on Eureka in this post because it can be bootstrapped automatically in one of Spring Cloud's auto-configurations. Eureka is implemented on the JVM but Consul is implemented in Go.

## [](#installing-eureka)Installing Eureka

Standing up an instance of the Eureka service registry is easy if you have `org.springframework.boot:spring-cloud-starter-eureka-server` on your classpath.

```java
Copypackage registry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}

```

My nominal `src/main/resources/application.yml` looks like this these days.

```yml
Copyserver:
  port: ${PORT:8761}

eureka:
  client:
    registerWithEureka: false
    fetchRegistry: false
    server:
      waitTimeInMsWhenSyncEmpty: 0

```

The service's port is defaulted to the well-known 8761 if [Cloud Foundry](http://cloudfoundry.org/index.html)'s `VCAP_APPLICATION_PORT` environment variable isn't available. The rest of the configuration simply tells this instance to not register itself with the Eureka instance it finds, because that instance is.. itself. If you run it locally, you can point a browser to `http://localhost:8761` and monitor the registry from there.

## [](#deploying-eureka)Deploying Eureka

Spring Cloud will startup a [Eureka instance with its Spring Boot auto-configuration](http://projects.spring.io/spring-cloud/spring-cloud.html#spring-cloud-eureka-server). There are a couple of things to consider when deploying Eureka. First, you should *always* use a highly-available configuration in production. [The Spring Cloud Eureka sample](https://github.com/spring-cloud-samples/eureka) shows how to deploy it in a highly-available configuration.

Clients need to know where to find the Eureka instance. If you have DNS then that might be one option, if you're not polluting too large a global namespace. If you're [running in a Platform-as-a-Service and embracing 12-Factor app style applications](http://12factor.net/) then backing service credentials are configuration, and live external to the application, often exposed as environment variables. You can get the effect of having a Eureka service right now, though, by using Cloud Foundry's `cf` CLI [to create *a user-provided service*](http://docs.pivotal.io/pivotalcf/devguide/services/user-provided.html).

```
Copycf cups eureka-service -p '{"uri":"http://host-of-your-eureka-setup"}'
```

Point `host-of-your-eureka-setup` to a well-known host for your highly-available Eureka setup. I suspect we'll soon see a way to create Eureka as a backing service in the same way you might a PostgreSQL or ElasticSearch instance on [Pivotal Cloud Foundry](http://www.pivotal.io/platform-as-a-service/pivotal-cf).

Now that Eureka is up and running, let's use it to connect some services to each other!

## [](#speak-for-yourself)Speak for Yourself

Spring Cloud-based services have a `spring.application.name` property. It's used to pull down configuration from the Configuration server, to identify the service to Eureka, and is referenceable in numerous other contexts when building Spring Cloud-based applications. This value typically lives in `src/main/resources/bootstrap.(yml,properties)`, which is picked up earlier in the initialization than the normal `src/main/resources/application.(yml,properties)`. A service with `org.springframework.cloud:spring-cloud-starter-eureka` on the classpath will be registered with the Eureka registry by its `spring.application.name`.

The `src/main/resources/boostrap.yml` file for each of my services looks like this, where `my-service` is the service name that changes from service to service:

```yaml
Copyspring:
  application:
    name: my-service
```

Spring Cloud uses the information in `bootstrap.yml` at service startup to discover the Eureka service registry and register the service and its `spring.application.name`, host, port, etc. You might wonder about that first bit. Spring Cloud attempts to look for it at a well-known address (`http://127.0.0.1:`), but you can change that. Here's my `src/main/resources/application.yml` for a nominal Spring Cloud microservice, though [there's no reason this couldn't live in the Spring Cloud configuration server](https://spring.io/blog/2015/01/13/configuring-it-all-out-or-12-factor-app-style-configuration-with-spring). There may be many instances identifying themselves as `my-service`; Eureka will append the process' information to a list of registrations for the same ID.

```yml
Copy

eureka:
  client:
    serviceUrl:
      defaultZone: ${vcap.services.eureka-service.credentials.uri:http://127.0.0.1:8761}/eureka/

---
spring:
  profiles: cloud
eureka:
  instance:
    hostname: ${APPLICATION_DOMAIN}
    nonSecurePort: 80

```

In this configuration, the Spring Cloud Eureka client knows to connect to the Eureka instance running on localhost *if* Cloud Foundry's `VCAP_SERVICES` environment variable doesn't exist or contain valid credentials.

The bit of configuration under the `---` delimiter is for when the application [is run under the `cloud` Spring profile](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html). It's easy to set a profile using the `SPRING_PROFILES_ACTIVE` environment variable. You can configure Cloud Foundry environment variables in your `manifest.yml` or, [on Cloud Foundry Lattice](https://github.com/pivotal-cf-experimental/lattice), your [Docker file](https://docs.docker.com/reference/builder/).

The `cloud` profile specific configuration specifically tells the Eureka client how to register the service in the discovered Eureka registry. I do this because my services don't use fixed DNS. `APPLICATION_DOMAIN` is an environment variable I set in my deploy scripts that tells a service what its externally referenceable URI is.

Click refresh on the Eureka web UI after 30 seconds (as of this writing) and you'll see your web service(s) registered.

## [](#client-side-load-balancing-with-ribbon)Client-Side Load Balancing with Ribbon

Spring Cloud references other services through their `spring.application.name` value. Knowing this value can be handy in a lot of contexts when building Spring Cloud-based services.

The goal, you'll recall, is to let the *client* decide based on contextual information (which could change from client to client) which service instance it will connect to. Netflix has a Eureka-aware client-side load-balancing client called [Ribbon](https://github.com/Netflix/ribbon) that Spring Cloud integrates extensively. Ribbon is a client library with built-in software load balancers. Let's look at an example that uses Eureka directly and then uses it through the Ribbon and Spring Cloud integration.

```java
Copypackage passport;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class Application {

    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class)
                .web(false)
                .run(args);
    }
}

@Component
class DiscoveryClientExample implements CommandLineRunner {

    @Autowired
    private DiscoveryClient discoveryClient;

    @Override
    public void run(String... strings) throws Exception {
        discoveryClient.getInstances("photo-service").forEach((ServiceInstance s) -> {
            System.out.println(ToStringBuilder.reflectionToString(s));
        });
        discoveryClient.getInstances("bookmark-service").forEach((ServiceInstance s) -> {
            System.out.println(ToStringBuilder.reflectionToString(s));
        });
    }
}

@Component
class RestTemplateExample implements CommandLineRunner {

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public void run(String... strings) throws Exception {
        // use the "smart" Eureka-aware RestTemplate
        ResponseEntity<List<Bookmark>> exchange =
                this.restTemplate.exchange(
                        "http://bookmark-service/{userId}/bookmarks",
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<List<Bookmark>>() {
                        },
                        (Object) "mstine");

        exchange.getBody().forEach(System.out::println);
    }

}

@Component
class FeignExample implements CommandLineRunner {

    @Autowired
    private BookmarkClient bookmarkClient;

    @Override
    public void run(String... strings) throws Exception {
        this.bookmarkClient.getBookmarks("jlong").forEach(System.out::println);
    }
}

@FeignClient("bookmark-service")
interface BookmarkClient {

    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/bookmarks")
    List<Bookmark> getBookmarks(@PathVariable("userId") String userId);
}

class Bookmark {
    private Long id;
    private String href, label, description, userId;

    @Override
    public String toString() {
        return "Bookmark{" +
                "id=" + id +
                ", href='" + href + '\'' +
                ", label='" + label + '\'' +
                ", description='" + description + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }

    public Bookmark() {
    }

    public Long getId() {
        return id;
    }

    public String getHref() {
        return href;
    }

    public String getLabel() {
        return label;
    }

    public String getDescription() {
        return description;
    }

    public String getUserId() {
        return userId;
    }
}
```

The `DiscoveryClientExample` bean demonstrates using the Spring Cloud common `DiscoveryClient` to interrogate the services. The results contain information like the hostname and the port for each service.

The `RestTemplateExample` bean demonstrates the auto-configured Ribbon-aware `RestTemplate` instance. Note that the URI uses a service ID, not an actual hostname. The service ID from the URI is extracted and given to Ribbon which then uses a load-balancer to pick from among the registered instances in Eureka and, finally, the HTTP call is made to a real service instance.

The `FeignExample` bean demonstrates using the Spring Cloud Feign integration. [Feign](https://github.com/Netflix/feign) is a handy project from Netflix that lets you describe a REST API client declaratively with annotations on an interface. In this case, we want to map the HTTP results from calls to the `bookmark-service` to the `BookmarkClient` Java interface. This mapping is configured in the `Application` class towards the top of the code page:

```java
Copy  @Bean
  BookmarkClient bookmarkClient() {
    return loadBalance(BookmarkClient.class, "http://bookmark-service");
  }

```

The URI is a service reference, not an actual hostname. It's passed through the same processing as the URI given to the `RestTemplate` in the last example.

Pretty cool, eh? You can use the more basic `DiscoveryClient` API and make a call, or use the Ribbon and Eureka-aware `RestTemplate` or Feign-integrated client.

## [](#review)Review

-   Spring Cloud supports both the Eureka and Consul service registries (and perhaps more!)
-   The `DiscoveryClient` API can be used to interactively query Eureka given a service ID.
-   Ribbon is a client-side load balancer
-   The `RestTemplate` can substitute service IDs for hostnames in URIs and can defer to Ribbon to pick a service.
-   The Netflix Spring Cloud Feign integration makes it simple to create smart, Eureka-aware REST clients that uses Ribbon for client-side load-balacing to pick an available service instance.

## [](#where-to-go-from-here)Where to go from Here

We've only looked at service discovery and resolution with Eureka. Most of what we talked about here applies to Consul as well and indeed Consul has some features that Netflix doesn't have.

Round-robin load-balancing is just one option. You might instead require some notion of a leader node, and leadership election. Spring Cloud aims provides support for that kind of coordination, as well.

Service registration and client-side load-balancing are just *one* of the things that Spring Cloud does to promote more resilient service-to-service calls. We have *not* looked at its support single-sign on and security, distributed locks and leadership election, reliability patterns like the circuit breaker, and much more.

[The example code is all available online](https://github.com/joshlong/service-registration-and-discovery) so don't hesitate to the check out the example on your local machine or push it to Cloud Foundry using [the provided `cf.sh` script](https://github.com/joshlong/service-registration-and-discovery/blob/master/cf.sh) and various `manifest.yml` files.