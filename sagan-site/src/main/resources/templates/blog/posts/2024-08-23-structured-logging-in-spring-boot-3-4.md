---
title: Structured logging in Spring Boot 3.4
source: https://spring.io/blog/2024/08/23/structured-logging-in-spring-boot-3-4
scraped: 2026-02-23T08:20:07.994Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Moritz Halbritter |  August 23, 2024 | 13 Comments
---

# Structured logging in Spring Boot 3.4

_Engineering | Moritz Halbritter |  August 23, 2024 | 13 Comments_

Logging is a long established part of troubleshooting applications and one of the three pillars of observability, next to metrics and traces. No one likes flying blind in production, and when incidents happen, developers are happy to have log files. Logs are often written out in a human-readable format.

Structured logging is a technique where the log output is written in a well-defined, often machine-readable format. This format can be fed into log management systems and enables powerful search and analytics capabilities. One of the most commonly used formats for structured logging is JSON.

With Spring Boot 3.4, structured logging is supported out of the box. It supports the [Elastic Common Schema (ECS)](https://www.elastic.co/guide/en/ecs/8.11/ecs-reference.html) and [Logstash](https://github.com/logfellow/logstash-logback-encoder?tab=readme-ov-file#standard-fields) formats, but it's also possible to extend it with your own formats.

Let's jump straight in and see how it works!

## [](#structured-logging-hello-world)Structured logging Hello World

Create a new project on [start.spring.io](https://start.spring.io). You don't need to add any dependencies, but make sure to select at least Spring Boot 3.4.0-M2.

To enable structured logging on the console, add this to your `application.properties`:

```properties
Copylogging.structured.format.console=ecs
```

This will instruct Spring Boot to log in the Elastic Common Schema (ECS) format.

Now start the application, and you'll see that the log is formatted in JSON:

```json
Copy{"@timestamp":"2024-07-30T08:41:10.561295200Z","log.level":"INFO","process.pid":67455,"process.thread.name":"main","service.name":"structured-logging-demo","log.logger":"com.example.structured_logging_demo.StructuredLoggingDemoApplication","message":"Started StructuredLoggingDemoApplication in 0.329 seconds (process running for 0.486)","ecs.version":"8.11"}
```

Quite cool, right? Now let's dive into the more advanced topics.

## [](#structured-logging-to-a-file)Structured logging to a file

You can also enable structured logging to a file. This can be used, for example, to print human-readable logs on the console and write structured logs to a file for machine ingestion.

To enable that, add this to your `application.properties` and make sure to delete the `logging.structured.format.console=ecs` setting:

```properties
Copylogging.structured.format.file=ecs
logging.file.name=log.json
```

Now start your application and you'll see that there's human-readable log on the console, and the file `log.json` contains machine-readable JSON content.

## [](#add-additional-fields)Add additional fields

One powerful feature of structured logging is that developers can add information to the log event in a structured way. You can, for example, add the user id to every log event and then later filter on that id to see what this particular user did.

Both Elastic Common Schema and Logstash include the content of the [Mapped Diagnostic Context](https://logback.qos.ch/manual/mdc.html) in the JSON. To see that in action, let's create our own log message:

```java
Copy@Component
class MyLogger implements CommandLineRunner {
    private static final Logger LOGGER = LoggerFactory.getLogger(MyLogger.class);

    @Override
    public void run(String... args) {
        MDC.put("userId", "1");
        LOGGER.info("Hello structured logging!");
        MDC.remove("userId");
    }
}
```

Before logging the log message, this code also sets the user id in the MDC. Spring Boot automatically includes the user id in the JSON:

```json
Copy{ ... ,"message":"Hello structured logging!","userId":"1" ... }
```

You can also use the [fluent logging API](https://www.slf4j.org/manual.html#fluent) to add additional fields without relying on the MDC:

```java
Copy@Component
class MyLogger implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(MyLogger.class);

    @Override
    public void run(String... args) {
        LOGGER.atInfo().setMessage("Hello structured logging!").addKeyValue("userId", "1").log();
    }

}
```

Elastic Common Schema [defines a lot of field names](https://www.elastic.co/guide/en/ecs/8.11/ecs-field-reference.html), and Spring Boot has built-in support for the service name, the service version, the service environment and the node name. To set values for those fields, you can use the following in your `application.properties`:

```properties
Copylogging.structured.ecs.service.name=MyService
logging.structured.ecs.service.version=1
logging.structured.ecs.service.environment=Production
logging.structured.ecs.service.node-name=Primary
```

When looking at the JSON output, there are now fields for `service.name`, `service.version`, `service.environment` and `service.node.name`. With that, you can now filter in your logging system on the node name, service versions, etc.

## [](#custom-log-formats)Custom log formats

As said above, Spring Boot supports the Elastic Common Schema and Logstash formats out of the box. To add your own format, you have to do the following steps:

1.  Create a custom implementation of the `StructuredLogFormatter` interface
2.  Reference your custom implementation in the `application.properties`

First, let's create our own custom implementation:

```java
Copyclass MyStructuredLoggingFormatter implements StructuredLogFormatter<ILoggingEvent> {

    @Override
    public String format(ILoggingEvent event) {
        return "time=" + event.getTimeStamp() + " level=" + event.getLevel() + " message=" + event.getMessage() + "\n";
    }

}
```

As you can see, the structured logging support is not limited to JSON, you can return any `String` you want. In this example, we chose to use `key=value` pairs.

We now need to make Spring Boot aware of our custom implementation. To do that, add this to the `application.properties`:

```properties
Copylogging.structured.format.console=com.example.structured_logging_demo.MyStructuredLoggingFormatter
```

It's time to start the application and marvel at the log output!

```
Copytime=1722330118045 level=INFO message=Hello structured logging!
```

Wow, look at that! What a beautiful piece of log output!

If you want to write JSON, there's a handy new `JsonWriter` in Spring Boot 3.4, which you can use:

```java
Copyclass MyStructuredLoggingFormatter implements StructuredLogFormatter<ILoggingEvent> {

    private final JsonWriter<ILoggingEvent> writer = JsonWriter.<ILoggingEvent>of((members) -> {
        members.add("time", (event) -> event.getInstant());
        members.add("level", (event) -> event.getLevel());
        members.add("thread", (event) -> event.getThreadName());
        members.add("message", (event) -> event.getFormattedMessage());
        members.add("application").usingMembers((application) -> {
            application.add("name", "StructuredLoggingDemo");
            application.add("version", "1.0.0-SNAPSHOT");
        });
        members.add("node").usingMembers((node) -> {
           node.add("hostname", "node-1");
           node.add("ip", "10.0.0.7");
        });
    }).withNewLineAtEnd();

    @Override
    public String format(ILoggingEvent event) {
        return this.writer.writeToString(event);
    }

}

```

Of course you can also use any other JSON library (e.g. Jackson) to create the JSON, you don't have to use the `JsonWriter`.

The resulting log message looks something like this:

```json
Copy{"time":"2024-07-30T09:14:49.377308361Z","level":"INFO","thread":"main","message":"Hello structured logging!","application":{"name":"StructuredLoggingDemo","version":"1.0.0-SNAPSHOT"},"node":{"hostname":"node-1","ip":"10.0.0.7"}}
```

## [](#wrapping-up)Wrapping up

We hope you like that new feature in Spring Boot 3.4! The [documentation](https://docs.spring.io/spring-boot/3.4-SNAPSHOT/reference/features/logging.html#features.logging.structured) has been updated for structured logging, too.

Please let us know what you think and if you find any issues, our [issue tracker](https://github.com/spring-projects/spring-boot/issues) is always open!