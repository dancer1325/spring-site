---
title: Bootiful GCP: Supporting Observability with Spring Cloud GCP Stackdriver Trace (6/8)
source: https://spring.io/blog/2018/09/06/bootiful-gcp-supporting-observability-with-spring-cloud-gcp-stackdriver-trace-6-8
scraped: 2026-02-23T15:14:57.324Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 06, 2018 | 0 Comments
---

# Bootiful GCP: Supporting Observability with Spring Cloud GCP Stackdriver Trace (6/8)

_Engineering | Josh Long |  September 06, 2018 | 0 Comments_

> Hi Spring fans! In this brief series we’re going to look at the Spring Cloud integration for Google Cloud Platform, called Spring Cloud GCP. [Spring Cloud GCP](https://cloud.spring.io/spring-cloud-gcp/) represents a joint effort between Google and Pivotal that endeavors to provide a first class experience for Spring Cloud developers when using the Google Cloud Platform. Pivotal Cloud Foundry users will enjoy an even [easier integration with the GCP service broker](https://docs.pivotal.io/partners/gcp-sb/index.html). These installments were written with help from Google Cloud Developer Advocate, and my buddy, [Ray Tsang](http://twitter.com/saturnism). You can also catch a walkthrough of Spring Cloud GCP in our Google Next 2018 session, [Bootiful Google Cloud Platform](https://www.youtube.com/watch?v=2Jo3vy7iQf8). Thanks buddy!

There are eight posts in the series. Here they all are:

-   [Bootiful GCP: Getting Started with Spring Cloud for Google Cloud Platform (1/8)](https://spring.io/blog/2018/08/20/bootiful-gcp-getting-started-with-spring-cloud-for-google-cloud-platform-1-8)
-   [Bootiful GCP: Relational Data Access with Spring Cloud GCP (2/8)](https://spring.io/blog/2018/08/23/bootiful-gcp-relational-data-access-with-spring-cloud-gcp-2-8)
-   [Bootiful GCP: Globally Consistent Data Access with Spanner (3/8)](https://spring.io/blog/2018/08/27/bootiful-gcp-globally-consistent-data-access-with-spanner-3-8)
-   [Bootiful GCP: Integration with Google Cloud Pub/Sub (4/8)](https://spring.io/blog/2018/08/30/bootiful-gcp-integration-with-google-cloud-pub-sub-4-8)
-   [Bootiful GCP: Runtime Configuration with Spring Cloud GCP Runtime Config (5/8)](https://spring.io/blog/2018/09/03/bootiful-gcp-runtime-configuration-with-spring-cloud-gcp-runtime-config-5-8)
-   \[Bootiful GCP: Supporting Observability with Spring Cloud GCP Stackdriver Trace (6/8)

\]([https://spring.io/blog/2018/09/06/bootiful-gcp-supporting-observability-with-spring-cloud-gcp-stackdriver-trace-6-8](https://spring.io/blog/2018/09/06/bootiful-gcp-supporting-observability-with-spring-cloud-gcp-stackdriver-trace-6-8))

-   \[Bootiful GCP: Use Spring Cloud GCP to Connect to Other GCP Services (7/8)

\]([https://spring.io/blog/2018/09/10/bootiful-gcp-use-spring-cloud-gcp-to-connect-to-other-gcp-services-7-8](https://spring.io/blog/2018/09/10/bootiful-gcp-use-spring-cloud-gcp-to-connect-to-other-gcp-services-7-8))

-   [Bootiful GCP: To Production! (8/8)](https://spring.io/blog/2018/09/13/bootiful-gcp-to-production-8-8)

As we move more and more applications to the cloud, and introduce more and more microservices, the complexity of understanding what’s gone wrong - and *where??* - grows. Distributed tracing addresses this problem. Distributed tracing, in theory, is a simple chore. For every request that enters or exits the system.. for every ingres or egress int he system, attach a UUID if one isnt already present and if it is present then propagate it. Unfortunately, this sort of logic is tedious and hard to get right as requests move from one node to another, synchronously and asynchrously, across thread and network boundaries. Spring Cloud Sleuth addresses this problem and provides an SPI into which backend distributed tracing systems, like OpenZipkin and Google Cloud Stack Driver, can plugin.

As with all GCP APIs, we must first enable this one.

```shell
Copygcloud services enable cloudtrace.googleapis.com
```

We’re going to setup a trivial REST API and a trivial REST client, and use the Spring Cloud GCP Stack Driver support to make short work of tracing those interactions.

Let’s first look at our trivial REST API. Start a new project (using the skeletal `pom.xml` from above) and add `org.springframework.boot` : `spring-boot-starter-web` and `org.springframework.cloud` : `spring-cloud-gcp-starter-trace`. Our REST API (well, endpoint, anyway) will return a "greetings, *a name here*!" whenever `http://localhost:8080/greeting/{id}}` is invoked. Here’s the code for the service, first:

```java
Copypackage com.example.gcp.trace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class TraceServiceApplication {

        @GetMapping("/greeting/{id}")
        String greet(@PathVariable String id) {
                return "greetings, " + id + "!";
        }

        public static void main(String args[]) {
                SpringApplication.run(TraceServiceApplication.class, args);
        }
}
```

The configuration is arguably more interesting.

**src/main/resources/application.properties.**

```properties
Copyspring.cloud.gcp.trace.enabled=true

spring.sleuth.sampler.probability=1
spring.sleuth.web.skipPattern=(^cleanup.*|.+favicon.*)

server.port=8081

spring.application.name=trace-service
```

-   we are opting-in to the trace support for Spring Cloud GCP. You could disable it when running the code on localhost but enable it in production with this flag.
-   these properties tell Spring Cloud Sleuth to trace everything (a "probability" of 1.0 means 100% of all observed requests will be sampled and traced).
-   if you’re running this demo on the same machine then you’ll want to avoid port conflicts in the client
-   `spring.application.name` is our application’s logical name and it can be used in distinguishing it from other applications in trace trees, service registries, etc.

The client lobs a hundred HTTP requests when the application starts up. The `RestTemplate` it uses has been post-processed by the Spring Cloud Sleuth auto-configuration to intercept and trace all HTTP calls.

```java
Copypackage com.example.gcp.trace;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cloud.sleuth.annotation.NewSpan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.stream.IntStream;

@Slf4j
@SpringBootApplication
public class TraceClientApplication {

        @Component
        public static class Client {

                private final RestTemplate restTemplate;

                public Client(RestTemplate restTemplate) {
                        this.restTemplate = restTemplate;
                }

                @EventListener(ApplicationReadyEvent.class)
                @NewSpan("client") 
                public void before() {
                        IntStream
                            .range(0, 100)
                            .mapToObj(i ->
                                restTemplate
                                    .getForEntity("http://localhost:8081/greeting/{id}", String.class, i)
                                    .getBody())
                            .forEach(response -> log.info("result: " + response));
                }
        }

        @Bean
        RestTemplate restTemplate() {
                return new RestTemplate();
        }

        public static void main(String args[]) {
                SpringApplication.run(TraceClientApplication.class, args);
        }
}
```

-   the client is a straightforward use of `RestTemplate` to connect to our service. If we wanted to send 100 requests with no shared parent span, we wouldn’t need `@NewSpan`. If we’d had 100 requests arrive from the outside and hit an HTTP endpoint in the client and that endpoint then resulted in 100 requests going to the service, we’d have a shared overarching span. A single trace with multiple spans.

And the configuration for this node is virtually identical to that of the service.

```properties
Copyspring.cloud.gcp.trace.enabled=true

spring.sleuth.sampler.probability=1
spring.sleuth.web.skipPattern=(^cleanup.*|.+favicon.*)

spring.application.name=trace-client

server.port=8080
```

-   enable Spring Cloud GCP tracing..
-   ensure that all requests are traced
-   give our client a logical name
-   and start on a different port than the service

In order to see this in action, you’ll need to start the service, then the client, and then make your way over to the [Google Cloud Console](https://console.cloud.google.com/). Click on the "Hamburger"menu on the left hand side of the screen and click on STACKDRIVER → TRACE. There you’ll be given the ability to inspect the requests that just flew through your services.

![Looking at trace information in the Google Cloud Console](https://pbs.twimg.com/media/Dk6aAXJU0AAe5Md.jpg:large)

Stackdriver is the umbrella name for a host of services including monitoring, tracing, and - and this is *so wicked cool!* - live debugging of running applications. You could easily spend a lot more time - you *should*! - in this section of the console. Suffice it to say that Google is *gets* observability and that’s reflected in their services.