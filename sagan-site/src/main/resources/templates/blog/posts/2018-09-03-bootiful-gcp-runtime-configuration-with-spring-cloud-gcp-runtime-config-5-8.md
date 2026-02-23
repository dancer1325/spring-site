---
title: Bootiful GCP: Runtime Configuration with Spring Cloud GCP Runtime Config (5/8)
source: https://spring.io/blog/2018/09/03/bootiful-gcp-runtime-configuration-with-spring-cloud-gcp-runtime-config-5-8
scraped: 2026-02-23T15:15:10.473Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 03, 2018 | 0 Comments
---

# Bootiful GCP: Runtime Configuration with Spring Cloud GCP Runtime Config (5/8)

_Engineering | Josh Long |  September 03, 2018 | 0 Comments_

> Hi Spring fans! In this brief 8 part series we’re going to look at the Spring Cloud integration for Google Cloud Platform, called Spring Cloud GCP. [Spring Cloud GCP](https://cloud.spring.io/spring-cloud-gcp/) represents a joint effort between Google and Pivotal that endeavors to provide a first class experience for Spring Cloud developers when using the Google Cloud Platform. Pivotal Cloud Foundry users will enjoy an even [easier integration with the GCP service broker](https://docs.pivotal.io/partners/gcp-sb/index.html). I wrote these installments with input from Google Cloud Developer Advocate, and my buddy, [Ray Tsang](http://twitter.com/saturnism). You can also catch a walkthrough of Spring Cloud GCP in our Google Next 2018 session, [Bootiful Google Cloud Platform](https://www.youtube.com/watch?v=2Jo3vy7iQf8). Thanks buddy! As always, [I'd love to hear from you if you have feedback](http://twitter.com/starbuxman).

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

So far we’ve looked at some simple examples with all but the most trivial of configuration. Where there was configuration, we specified it in `application.properties`. This approach works but there are limitations. What about centrality (making a single config value accessible to a number of other clients), security (storing secrets securely), live reconfiguration, and auditing and journaling? There are a number of other solutions out there that address some or all of these use cases including Apache Zookeeper, Hashicorp Consul, Hashicorp Vault (for secrets management, specifically), and - of course - the Spring Cloud Config Server. All fine choices, but you’d better have a recipe for scaling out and securing these pieces of infrastructure. GCP offers an alternative, Google Cloud RuntimeConfig, that you can use with no change to existing code, thanks to the power of Spring’s abstractions.

Let’s look at how to establish a configuration value and then reference that value from our application. We’ll also look at how to later update that configuration live, without restarting the application.

First, we’ll need to enable this API.

```shell
Copygcloud services enable runtimeconfig.googleapis.com
```

Let’s think through how we want to use this configuration. We’ll probably have configuration values that make sense when running the application on our local machines. Values that we can source from a built-in `application.properties` or `application.yaml`. These are the default values that apply to the application. There are going to be some values that are visible only in production -locators, credentials, etc. - that are unique to production. These values might be visible when running under the `cloud` profile, for example. We’re going to source those values - when running under the `cloud` profile - from Google Cloud Runtime Config. This way we can selectively override important values.

We must first create a runtime configuration, and then add a variable value to that configuration.

```shell
Copygcloud beta runtime-config configs create reservations_cloud
```

Then, register a variable (`greeting`) and that variable’s value (`Hello GCP`) in the just-created runtime config.

```shell
Copygcloud beta runtime-config configs variables set greeting  "Hello GCP"  --config-name reservations_cloud
```

We can enumerate all the configuration for a given config set like this:

```shell
Copygcloud beta runtime-config configs variables list --config-name=reservations_cloud
```

Spring Cloud GCP will need to do its work *before* most of the Spring application is running since it is a property source that feeds values into other configuration. Thus, any configuration that it requires to do its work must be accessible earlier than the configuration in the usual suspects like `application.properties`. It is a convention in Spring Cloud that such configuration live in `bootstrap.properties`. Let’s disable Spring Cloud GCP Runtime Config when running on the local machine, without any particular Spring profile active.

**src/main/resources/bootstrap.properties.**

```properties
Copyspring.cloud.gcp.config.enabled=false
spring.cloud.gcp.config.credentials.location=${spring.cloud.gcp.credentials.location}
```

When we’re running in production, in, say, Cloud Foundry, we’ll want to activate the `cloud` profile, at which point the Spring Cloud GCP Runtime Config client will kick in and source config from GCP. Spring Boot is smart about loading any profile-specific configuration in adition to default configuration. You need only suffix your configuration file with `-${YOUR_PROFILE}`: e.g.: `application-foo.properties`, or `bootstrap-bar.yml` for Spring profiles `foo` and `bar` respectively. Let’s configure Spring Cloud GCP for when the `cloud` profile is active.

**src/main/resources/bootstrap-cloud.properties.**

```java
Copyspring.cloud.gcp.config.enabled=true
spring.cloud.gcp.config.name=reservations
spring.cloud.gcp.config.profile=cloud
```

> **Note**
> 
> The combination of `${spring.cloud.gcp.config.name}_${spring.cloud.gcp.config.profile}` forms `reservations_cloud`, which is the name of the Runtime Configuration we’ve just created.

We will configure some overall properties that will serve as the defaults, absent any overrides, in `src/main/resources/application.properties`.

**src/main/resources/application.properties.**

```properties
Copymanagement.endpoint.health.show-details=always
management.endpoints.web.exposure.include=*

greeting = Hello ${user.name} (running on ${os.name} ${os.version})!
```

-   we want to, for this DEMO, expose all the Actuator endpoints to be able to interrogate them. In **any** other context: configure security!
    
-   we want to include all the Actuator endpoints
    

Let’s turn now to the Java code. You’ll need to add the following dependencies to your build: `org.springframework.boot` : `spring-boot-starter-web`, `org.springframework.boot` : `spring-boot-starter-actuator`, `org.springframework.cloud` : `spring-cloud-gcp-starter-config`. We add the Spring Cloud GCP dependency to get the correct configuration for the Runtime Config support. We add Spring Boot Actuator so we have access to a few operational endpoints, `/actuator/env` and `/actuator/refresh`.

Let’s see some code!

```java
Copypackage com.example.gcp.runtimeconfig;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class RuntimeConfigApplication {

        @RefreshScope 
        @RestController
        public static class GreetingsRestController {

                private final String greetings;

                
                GreetingsRestController(@Value("${greeting}") String greetings) {
                        this.greetings = greetings;
                }

                @GetMapping("/greeting")
                String greetings() {
                        return this.greetings;
                }
        }

        public static void main(String[] args) {
                SpringApplication.run(RuntimeConfigApplication.class, args);
        }
}
```

-   this annotation supports revising and refreshing the configuration for this bean. We can trigger a refresh event and observe updated configuration in the bean
    
-   we’re injecting the key from the property file or from GCP Runtime Config. Code-wise, it’s exactly the same.
    

Run this program with no profile active and you should see something like `Hello jlong!` when you hit the endpoint at `http://localhost:8080/greeting`.Hit this environment Actuator endpoint (`http://localhost:8080/actuator/env`) and you will find no mention of our GCP Runtime Config configuration. Now, run the program with the `cloud` profile active and hit the `/greeting` endpoint again and you’ll see something like `Hello GCP` reflected in the console output. Hit the `/actuator/env` endpoint and you’ll see an entry for `bootstrapProperties:spring-cloud-gcp` containing our Runtime Config values.

> **Tip**
> 
> you can change the active profile by specifying `-Dspring.profiles.active=foo,bar` for profiles `foo` and `bar` when running the application.

I like our application so far, but the greeting sounds so stiff! I’d love to change it, but don’t want to stop and start each application instance. Here we can take advantage of the `/actuator/refresh` endpoint to *refresh* our node’s configuration after updating the value in the Runtime Config configuration. Let’s change the value to something less formal, like `Hi, GCP`.

```shell
Copygcloud beta runtime-config configs variables set greeting  "Hi, GCP"  --config-name reservations_cloud
```

The configuration has been changed in the GCP Runtime Config, but that change isn’t visible, at least not by default, to our application. We need to force the Spring Boot to refresh its local configuration, drawing the configuration from the Runtime Config service. Issue an (empty) HTTP POST command to the `/actuator/refresh` endpoint and then hit the `/greeting` endpoint to see the updated value.

```shell
Copycurl http://localhost:8080/greeting
> Hello GCP

gcloud beta runtime-config configs variables set greeting  "Hi GCP"  --config-name reservations_cloud
curl -H"content-type: application/json" -d{} http://localhost:8080/actuator/refresh
curl http://localhost:8080/greeting
> Hi GCP
```

-   inspect the old value
    
-   change the value and then force the client to refresh its configuration. You’ll be able to confirm the update.