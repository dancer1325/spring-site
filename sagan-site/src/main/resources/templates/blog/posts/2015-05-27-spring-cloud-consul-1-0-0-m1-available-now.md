---
title: Spring Cloud Consul 1.0.0.M1 Available Now
source: https://spring.io/blog/2015/05/27/spring-cloud-consul-1-0-0-m1-available-now
scraped: 2026-02-23T19:50:52.613Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  May 27, 2015 | 15 Comments
---

# Spring Cloud Consul 1.0.0.M1 Available Now

_Releases | Spencer Gibb |  May 27, 2015 | 15 Comments_

[Consul](https://consul.io/intro/index.html) is a system for discovering and configuring services in your infrastructure. It was built by [Hashicorp](https://hashicorp.com/), the same smart folks that created [Vagrant](https://www.vagrantup.com) and [Packer](https://www.packer.io). Consul provides services such as Service Discovery, Health Checking, Key/Value Store all while supporting multiple datacenters out of the box.

[Spring Cloud Consul](http://projects.spring.io/spring-cloud/spring-cloud-consul) aims to bring all of those features to the [Spring Cloud](http://projects.spring.io/spring-cloud/) ecosystem. The project has reached its first milestone and fresh jars are available in the [repo.spring.io](http://repo.spring.io/libs-milestone-local) repository. Spring Cloud Consul provides the following features:

-   Spring Cloud Consul Discovery: An implementation of the Spring Cloud Commons [`DiscoveryClient`](https://github.com/spring-cloud/spring-cloud-commons/blob/master/spring-cloud-commons/src/main/java/org/springframework/cloud/client/discovery/DiscoveryClient.java). Service registration and discovery are performed via the Consul [HTTP API](https://consul.io/docs/agent/http.html).
    
-   Spring Cloud Consul Config: Distributed configuration via the Consul [Key/Value API](https://consul.io/docs/agent/http/kv.html). This behaves similarly to the [Spring Cloud Config Client](https://github.com/spring-cloud/spring-cloud-config#spring-cloud-config-client), but is backed by the distributed Consul KV Store.
    
-   Spring Cloud Consul Bus: An event bus for linking services and service instances together with distributed messaging. Useful for propagating state changes across a cluster (e.g. config change events). This is implemented using the Consul [Event API](https://consul.io/docs/agent/http/event.html).
    
-   Spring Cloud Consul UI: An embedded version of the [Consul Web UI](https://www.consul.io/intro/getting-started/ui.html).
    

All of the above have the 1.0.0.M1 release tag, to get started include the following artifacts in your `pom.xml`:

```xml
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-consul-config</artifactId>
  <version>1.0.0.M1</version>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-consul-discovery</artifactId>
  <version>1.0.0.M1</version>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-consul-bus</artifactId>
  <version>1.0.0.M1</version>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-consul-ui</artifactId>
  <version>1.0.0.M1</version>
</dependency>
```

Follow [the documentation](https://github.com/spring-cloud/spring-cloud-consul/blob/master/docs/src/main/asciidoc/spring-cloud-consul.adoc#install-consul) to make sure Consul is installed and running.

A sample application that might look like the following:

```java
Copy@SpringBootApplication
@EnableDiscoveryClient
@EnableConsulUi
@RestController
public class SampleApp2 {

  @RequestMapping("/")
  public String hello() {
    return "Hello World";
  }

  public static void main(String[] args) {
    SpringApplication.run(SampleApplication.class, args);
  }
}
```

After running your app, hit `http://localhost:8080/ui` to see the consul ui.

The [code](https://github.com/spring-cloud/spring-cloud-consul) is hosted on github, and community contributions are extremely welcome, so get on over there are check it out. There is a sample in [spring-cloud-consul-sample](https://github.com/spring-cloud/spring-cloud-consul/tree/master/spring-cloud-consul-sample). Instructions to run the sample are included in the [README](https://github.com/spring-cloud/spring-cloud-consul/blob/master/README.adoc).

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). Super Early Bird Price expires June 12th! It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. I'll be speaking about Spring Cloud Consul, watch [here](https://2015.event.springone2gx.com/presenters/spencer_gibb.html) for future details. Check recent blog posts to see what I mean and there is more to come!

#Discounts

-   The Super Early Bird price tier ($300 discount) expires June 12th. The Early Bird price tier (June 13th - August 14th) is discounted $150.
-   Register 4 and get the 5th pass free. Contact us with the names of your first 4 registrants for your complimentary pass code (conference admission only).
-   Alumni, contact us for your discount code ($150 off any option).