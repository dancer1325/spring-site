---
title: Spring for Apache Kafka 2.1.0.RELEASE (and 1.3.2, 2.0.2) Available
source: https://spring.io/blog/2017/12/01/spring-for-apache-kafka-2-1-0-release-and-1-3-2-2-0-2-available
scraped: 2026-02-23T16:13:12.734Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  December 01, 2017 | 4 Comments
---

# Spring for Apache Kafka 2.1.0.RELEASE (and 1.3.2, 2.0.2) Available

_Releases | Gary Russell |  December 01, 2017 | 4 Comments_

I am pleased to announce the availability of Spring for Apache Kafka 2.1.0.RELEASE.

In addition, maintenance releases 1.3.2.RELEASE and 2.0.2.RELEASE are available, containing important bug fixes. See also below for information about `spring-integration-kafka` 3.0.0.RELEASE. It is recommended that all users upgrade.

The main purpose of the 2.1 release is to upgrade the `kafka-clients` library to 1.0.0, but we have included a few improvements:

-   Sometimes, when a message can’t be processed, you may wish to stop the container so the condition can be corrected and the message re-delivered. The framework now provides the `ContainerStoppingErrorHandler` for record listeners and `ContainerStoppingBatchErrorHandler` for batch listeners.
    
-   The `KafkaAdmin` now supports increasing partitions when a `NewTopic` bean is detected with a larger number of partitions than currently exist on the topic.
    
-   `StringJsonMessageConverter` and `JsonSerializer/JsonDeserializer` now pass and consume type information in `Headers`. This allows multiple types to be easily sent/received on the same topic:
    
    @SpringBootApplication public class Kafka21Application {
    
    ```
    Copypublic static void main(String[] args) {
        SpringApplication.run(Kafka21Application.class, args)
            .close();
    }
    
    @Bean
    public ApplicationRunner runner(KafkaTemplate<Object, Object> template) {
        return args -> {
            template.send(MessageBuilder.withPayload(42)
                    .setHeader(KafkaHeaders.TOPIC, "blog")
                    .build());
            template.send(MessageBuilder.withPayload("43")
                    .setHeader(KafkaHeaders.TOPIC, "blog")
                    .build());
            Thread.sleep(5_000);
        };
    }
    
    @Bean
    public StringJsonMessageConverter converter() {
        return new StringJsonMessageConverter();
    }
    
    @Component
    @KafkaListener(id = "multi", topics = "blog")
    public static class Listener {
    
        @KafkaHandler
        public void intListener(Integer in) {
            System.out.println("Got an int: " + in);
        }
    
        @KafkaHandler
        public void stringListener(String in) {
            System.out.println("Got a string: " + in);
        }
    
    }
    ```
    
    }
    
    Got an int: 42 Got a string: 43
    

The first time you run this app, you may need this property…​

```
Copyspring.kafka.consumer.auto-offset-reset=earliest
```

…​in case the template sends the messages before the containers completely start.

In addition, the `JsonSerializer` and `JsonDeserializer` can be configured using kafka properties for the producer/consumer.

Important

In accordance with [CVE-2017-4995](https://pivotal.io/security/cve-2017-4995), only classes in `java.util` and `java.lang` will be deserialized by default; to deserialize (trust) other packages, use the `addTrustedPackages` method on the deserializer or in a customized `DefaultJackson2TypeMapper` for the message converter. For the `JsonDeserializer`, the packages can be provided in the Kafka consumer config in property `JsonDeserializer.TRUSTED_PACKAGES`.

See the [What’s New](https://docs.spring.io/spring-kafka/reference/html/whats-new-part.html) for complete information.

Finally, `spring-integration-kafka` 3.0.0.RELEASE is also available; it is based on Spring for Apache Kafka 2.1, Spring Integration 5.0, and Spring Framework 5.0; it requires Java 8 and has the following new feature:

-   Mapping of `spring-messaging` headers to/from Kafka `Headers`.

See the [Project Page](http://projects.spring.io/spring-kafka/) for a complete matrix of `spring-kafka`, `spring-integration-kafka` and `kafka-clients` version compatibility.

[Project Page](http://projects.spring.io/spring-kafka/) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Contributing](https://github.com/spring-projects/spring-kafka/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-kafka) | [Chat](https://gitter.im/spring-projects/spring-kafka)