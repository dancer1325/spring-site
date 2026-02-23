---
title: Spring AMQP 1.6 RELEASE available
source: https://spring.io/blog/2016/06/01/spring-amqp-1-6-release-available
scraped: 2026-02-23T19:14:44.278Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  June 01, 2016 | 0 Comments
---

# Spring AMQP 1.6 RELEASE available

_Releases | Artem Bilan |  June 01, 2016 | 0 Comments_

We are pleased to announce that the Spring AMQP 1.6 GA (`1.6.0.RELEASE`) is now available in the [spring release repo](https://repo.spring.io/release), as well as in the [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cspring-rabbit).

First of all, thanks to everyone who contributed to the project any way: JIRAs, GitHub issues, Pull Requests, blog posts & articles and even just with simple StackOverflow questions!

You can find the full feature pack in the previous [Spring AMQP 1.6 RC1](https://spring.io/blog/2016/05/06/spring-amqp-1-6-0-release-candidate-and-1-5-6-available) blog post. You can refer to the [what’s new](http://docs.spring.io/spring-amqp/docs/1.6.0.RC1/reference/html/_introduction.html#whats-new) in the reference documentation as well as [the closed JIRA Issues for the entire 1.6 version](https://jira.spring.io/issues/?jql=project%20%3D%20AMQP%20AND%20status%20%3D%20Closed%20AND%20fixVersion%20in%20%28%221.6%20M1%22%2C%20%221.6%20M2%22%2C%20%221.6%20RC1%22%2C%20%221.6%20GA%22%29%20%20ORDER%20BY%20fixVersion%2C%20priority%20DESC).

Nevertheless we encountered with the couple last minute features which we would like to share here as well:

-   The [User Id](https://www.rabbitmq.com/validated-user-id.html) message property can now be populated in the `RabbitTemplate` via `userIdExpression`. Typically we can use `username` from the `ConnectionFactory`:

```
Copy<rabbit:template id="rabbitTemplate"
                 connection-factory="connectionFactory"
                 user-id-expression="@connectionFactory.username" />
```

-   Another community contribution feature is `Builder` fluent API for `Queue` and `Exchange` definitions:

```
Copy@Bean
public Queue fooQueue() {
    return QueueBuilder.nonDurable("foo")
                  .autoDelete()
                  .exclusive()
                  .withArgument("foo", "bar")
                  .build();
}
...
@Bean
public Exchange fooExchange() {
    return ExchangeBuilder.directExchange("foo")
                  .autoDelete()
                  .delayed()
                  .durable()
                  .internal()
                  .withArgument("foo", "bar")
                   .build();
}
```

This is the last `1.x` line release, although any maintain `1.6.x` releases are possible, but as just bug fixes and minor improvements. Next up (2017) is `2.0` which will may require Spring 5 and include some Reactive Streams effort and Java 8 code base.

As usual, we welcome any feedback, questions, or help, using the usual mechanisms:

[Project Page](http://projects.spring.io/spring-amqp/) | [JIRA](https://jira.spring.io/browse/AMQP) | [Contribution](https://github.com/spring-projects/spring-amqp/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp)