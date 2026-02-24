---
title: Getting Started with Redis, Spring Data & Cloud Foundry
source: https://spring.io/blog/2011/04/27/getting-started-with-redis-spring-data-cloud-foundry
scraped: 2026-02-24T08:42:09.100Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  April 27, 2011 | 0 Comments
---

# Getting Started with Redis, Spring Data & Cloud Foundry

_Engineering | Costin Leau |  April 27, 2011 | 0 Comments_

One of the drivers behind the popularity of [NoSQL](http://en.wikipedia.org/wiki/NoSQL_%28concept%29) solutions is performance (especially) under heavy loads. Due to their data model, key value stores lead the pack, providing lightweight yet flexible means of working with data. In this entry, I am going to quickly showcase what it takes to work with a key value store (Redis) using Spring (Spring Redis) through one of Spring Data samples (RetwisJ) and deploy the app into the [cloud](http://en.wikipedia.org/wiki/Cloud_computing) (through Cloud Foundry) to share it with the world. I am going even further by using Windows, as a deployment platform for a change.

### Redis

A popular [choice](http://redis.io/topics/whos-using-redis) among key-value stores is [Redis](http://redis.io), an open source, crazy fast database written in ANSI C weighting around 200 KB (yes, **kilo**\-bytes) for the server or 400 KB for the entire package (includes a command-line client and some administration utilities) and available virtually on all major platforms which also makes it the choice for the sample. Note that a Redis instance is not needed unless one wants to run the sample locally. If so, for Windows users (such as the author) yours truly uses (and recommends) [this](https://github.com/dmajkic/redis) pre-packed version available in both 32-bit and 64-bit flavours.

### Spring and NoSQL

If you are using NoSQL from a Java environment, take a look at [Spring Data](http://www.springsource.org/spring-data): it's not a project by itself but rather an umbrella of projects embracing the various new data access technologies such as non-relational databases (like Redis or MongoDB), map-reduce frameworks (think Hadoop) and cloud-base data services for Java apps. Spring Data promotes the *classic* Spring values, enhancing developer productivity by removing the API noise, boiler-plate code and resource management and offering a consistent programming model. It builds on top of existing Spring features and projects (such as inversion of control, life-cycle management, type conversion, portable data access exceptions, caching and so on) so one can add it right away, with minimal effort in her application. And of course, just like the rest of the Spring projects, it is open source and available under Apache license.

### Spring Data Redis

In the case of Redis, Spring Data offers dedicated support through the Spring Data Redis or simply [Spring Redis](http://www.springsource.org/spring-data/redis) project. It offers both low-level and high-level features ranging from portable Redis client abstractions (allowing different Redis clients such as Jedis, JRedis or RJC to be changed with literally one configuration line) to Redis-backed atomic collections or counters or pub-sub support. The project [reference](http://static.springsource.org/spring-data/data-keyvalue/docs/current/reference/html/#redis) documentation covers these topics in great detail.

### RetwisJ, YATC - Yet Another Twitter Clone

*RetwisJ source code, including the code in this blog, can be downloaded at Spring Data Key Value [sample project](https://github.com/SpringSource/spring-data-keyvalue-examples). Further more, documentation is available at [here](http://static.springsource.org/spring-data/data-keyvalue/examples/retwisj/current/)*

RetwisJ can be seen as the Java port of Redis' [Retwis](http://redis.io/topics/twitter-clone) sample: a simple Twitter-clone that demonstrates how one can replace expensive joins in a traditional, relational database with Redis flexible data model (such as set [intersections](http://redis.io/topics/data-types-intro)).

Migrating from a table-like mindset to key-value associations might seem difficult but it is not: rather then storing multiple values under one key one can store each value under "similar keys; in fact, relationships themselves can be stored as such. As explained in the [docs](http://static.springsource.org/spring-data/data-keyvalue/examples/retwisj/current/#retwisj:structure), rather then creating a table for users (containing one column for user name, one for password and so on) one can just store the items through a Redis hash (or map) and instead of creating an index to store relationship between entries, it can add a separate, reverse or lookup key for it. So the following table structure (users) can be deployed as the following key-value pairs : 

`   Key  Username  Password  1  springrod  interface21  2  costinl  this is fun    becomes    Key  Type  Value  uid:1  hash  {name: springrod, pass: interface21}  uid:2  hash  {name: costinl, pass: secret}   `

In a similar fashion, the association table between followers and the followee (or target) can be mapped through Redis Sets. So rather then performing table joins, one can simply do set intersection. Redis rich data models (Sets, Z-Sets (or sorted sets), Lists and Hashes) map nicely onto the Java collections through Spring Redis which provides corresponding java.util implementations on top of Redis. This means one can traverse, lookup or modify lists and set by using well known interfaces without having to manually issue any Redis commands.

To wit:

```java
Copyprivate RedisSet<String> following(String uid) {
   return new DefaultRedisSet<String>(KeyUtils.following(uid), template);
}
      
public Collection<String> commonFollowers(String uid, String targetUid) {
   Set<String> followers = following(uid).
       intersectAndStore(following(targetUid),
       KeyUtils.commonFollowers(uid, targetUid));
   ...
}
```

For general-purpose data access, the central Spring Redis is RedisTemplate which allows everything from easy, one-line manipulations of rich objects, serialization (be it byte array, XML or Jackson based) or message publication to advanced querying capabilities and data fetching (such as avoiding the infamous N+1 problem through Redis SORT/GET pattern).

```java
Copy// adding entries into a hash
BoundHashOperations<String, String, String> userOps = template.boundHashOps(KeyUtils.uid(uid));
userOps.put("name", name);
userOps.put("pass", password);
valueOps.set(KeyUtils.user(name), uid);
```

For a more in-depth explanation of the data-model and the sample, consult the RetwisJ [documentation](http://static.springsource.org/spring-data/data-keyvalue/examples/retwisj/current/).

### Connecting to Redis

A common problem Java users face when connecting to Redis is what [client](http://redis.io/clients) (or driver) to use. Spring Redis supports three different libraries ([Jedis](https://github.com/xetorthio/jedis), [JRedis](https://github.com/alphazero/jredis) and [RJC](https://github.com/e-mzungu/rjc)) in a consistent manner so one can switch between them without having to rewrite any code whatsoever. Let's pick up Jedis and see how the application configuration looks like:

```xml
Copy<beans>
  <context:property-placeholder location="classpath:redis.properties"/>

  <!-- Redis client -->
  <bean id="connectionFactory" class="org.springframework.data.keyvalue.redis.connection.jedis.JedisConnectionFactory"
		p:host-name="${redis.hostname}" p:port="${redis.port}" p:password="${redis.password}"/>

	<bean id="redisTemplate" class="org.springframework.data.keyvalue.redis.core.StringRedisTemplate" 
		p:connection-factory-ref="connectionFactory"/>

	<context:annotation-config />
	<context:component-scan base-package="org.springframework.data.redis.samples"/>

</beans>
```

Pretty straight forward - we declare the driver and the Redis properties (replaced at runtime through the property placeholder from redis.properties), we enable annotation configuration and scan the classpath for beans.

From a deployment perspective, RetwisJ is just a web application, a WAR that can be deployed in any (Servlet 2.5) web container such as Tomcat. It is made of a simple Spring @MVC controller, one Repository class and two domain objects: Post and User. To follow the Retwis example, even the security will be handled through Redis rather then the container HttpSession - this demonstrates not just another use-case for key-value stores but also improves scalability since Redis (and thus the user data) is distributed out of the box.

To build it, simple type in the root folder:

```code
Copy./gradlew build
```

And to run it deploy the resulting war (build/libs/retwisj.war) into your web container of choice.

### Deploying RetwisJ into Cloud Foundry

*The Cloud Foundry ready RetwisJ example is available in the dedicated sample [repository](https://github.com/SpringSource/cloudfoundry-samples)*

Deploying the WAR above into Cloud Foundry is pretty straight-forward - you only need an account (you can sign up for *free* [here](http://www.cloudfoundry.com/)). Once you do, you can use that to deploy your app either through STS (as described in detail in the previous [entries](http://blog.springsource.com/2011/04/13/using-cloud-foundry-from-sts/)) or the command-line (vmc) which is what I will use in this post.

Since we are using Redis, we need to replace our local instance properties with the ones suitable for Cloud Foundry which are exposed as environmental properties. As mentioned in these [docs](https://github.com/SpringSource/cloudfoundry-samples/wiki/Cloud-foundry-environment-variables), there is dedicated Spring support through the [cloud](http://schema.cloudfoundry.org/spring/cloudfoundry-spring.xsd) namespace.

We can use this so rather then reading the Redis properties from a local file, we can feed from them from the environment:

```xml
Copy<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xmlns:p="http://www.springframework.org/schema/p"
		xmlns:context="http://www.springframework.org/schema/context"
		xmlns:cloud="http://schema.cloudfoundry.org/spring"
		xsi:schemaLocation="
			http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
			http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
      http://schema.cloudfoundry.org/spring http://schema.cloudfoundry.org/spring/cloudfoundry-spring.xsd">

  	<cloud:service-properties id="cfoundryEnv" />
  	<context:property-placeholder properties-ref="cfoundryEnv"/>
	  
    <bean id="connectionFactory" class="org.springframework.data.keyvalue.redis.connection.jedis.JedisConnectionFactory"
      p:host-name="${redis.hostname}" p:port="${redis.port}" p:password="${redis.password}"/>

```

The property names do not have to change - we can name (*redis* in this case) the Redis instances bound to an app and use that to minimize the changes between the local environment and the cloud.

Note that this is just one option out of many: you can use Spring 3.1 [profiles](http://blog.springsource.com/2011/02/11/spring-framework-3-1-m1-released/) to automatically do the switch, use the cloud namespace to automatically have a RedisConnectionFactory created for you or automatically wired it into your app. See this [section](https://github.com/SpringSource/cloudfoundry-samples/wiki/Spring) for more information on the various features available.

Now let's deploy our Twitter-clone into the cloud!

For command-line aficionados like myself, Cloud Foundry offers the vmc utility, which allows you to interact with the Cloud Foundry instance. It's written in Ruby so one needs Ruby and Ruby Gem installed -see the [downloads](http://www.ruby-lang.org/en/downloads/ ) page for a suitable package for your OS. For Windows, the excellent [RubyInstaller](http://rubyinstaller.org/) in either installer or zip form solves the problem quite nicely by offer native integration (no need to use Cygwin or the like if you don't want to). If the gem command is not available, download it from the official [site](http://rubygems.org/), unzip it and you are good to go:

*See the getting started [guide](http://support.cloudfoundry.com/entries/20012337-getting-started-guide-command-line-vmc-users) for more information on available commands*

```code
Copyq:\>gem install vmc
Successfully installed vmc-0.3.10
1 gem installed
Installing ri documentation for vmc-0.3.10...
Installing RDoc documentation for vmc-0.3.10...
```

Log into our account:

```code
CopyQ:\>vmc target api.cloudfoundry.com
Succesfully targeted to [http://api.cloudfoundry.com]

Q:\>vmc login
Email: <signup email>
Password: **************
Successfully logged into [http://api.cloudfoundry.com]
```

The last step is simply to upload our WAR:

```code
Copy
Q:\>dir /B
retwisj.war

Q:\>vmc push
Would you like to deploy from the current directory? [Yn]: y
Application Name: my-retwisj
Application Deployed URL: 'my-retwisj.cloudfoundry.com'?
Detected a Java SpringSource Spring Application, is this correct? [Yn]: y
Memory Reservation [Default:512M](64M, 128M, 256M, 512M or 1G)
Creating Application: OK
Would you like to bind any services to 'my-retwisj'? [yN]: y
The following system services are available::
1. mongodb
2. mysql
3. rabbitmq
4. redis
Please select one you wish to provision: 4
Specify the name of the service [redis-866fb]: redis
Creating Service: OK
Binding Service: OK
Uploading Application:
  Checking for available resources: OK
  Processing resources: OK
  Packing application: OK
  Uploading (32K): OK
Push Status: OK

Staging Application: OK

Starting Application: OK

Q:\>vmc apps

+-------------+----+---------+------------------------------+-------------+
| Application | #  | Health  | URLS                         | Services    |
+-------------+----+---------+------------------------------+-------------+
| my-retwisj  | 1  | RUNNING | my-retwisj.cloudfoundry.com  | redis       |
+-------------+----+---------+------------------------------+-------------+
```

The process above should not take longer then 1 minute even on a slow connection (this blog [entry](http://blog.cloudfoundry.com/post/4737632136/what-happens-when-you-vmc-push-an-application-to-cloud) offers insight into what is going during the push operation). You might have noticed that only 32K are uploaded; that is not a mistake, vmc is smart enough to determine the files it already knows above (such as the ones already deployed) and those that have actually changed.

And that's it! - just point your browser at the URL above and enjoy your RetwisJ sample. The 'official' live instance is available at [](http://retwisj.cloudfoundry.com/)[http://retwisj.cloudfoundry.com/](http://retwisj.cloudfoundry.com/)

### Wrapping up

This entry covered quite a big of ground: Redis, Spring Data and Cloud Foundry deployment. I hope this shows how easy it is to get started and how powerful the combination is whether in your local environment or in the cloud. And this is just the start! Expect more functionality to be added in Spring Redis (which is soon approaching RC status) as well as into Cloud Foundry whether it is more services or better tooling.

Try them out and let us know what you think and need!