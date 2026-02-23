---
title: Spring Integration Java DSL 1.0 Milestone 3 Available
source: http://spring.io/blog/2014/09/07/spring-integration-java-dsl-1-0-milestone-3-available
scraped: 2026-02-23T22:15:28.893Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 07, 2014 | 0 Comments
---

# Spring Integration Java DSL 1.0 Milestone 3 Available

_Releases | Artem Bilan |  September 07, 2014 | 0 Comments_

We are pleased to announce that the Java DSL for Spring Integration 1.0 Milestone 3 has been released. Please use the [Milestone Repository](http://repo.springsource.org/milestone) with Maven or Gradle, download a [distribution archive](http://repo.spring.io/milestone/org/springframework/integration/spring-integration-java-dsl/1.0.0.M3), or see the project [home page](https://github.com/spring-projects/spring-integration-extensions/wiki/Spring-Integration-Java-DSL-Reference) for more information.

Since the last [Milestone 2](https://spring.io/blog/2014/06/18/spring-integration-java-dsl-milestone-2-released), some new features and further improvements, as well as a number of bug fixes have been included to this Milestone, with the GA release due around the end of October.

First of all thanks for all who are interested in this Spring Integration Extension, provide feedback, share their thoughts and even contribute.

Here is a summary of major changes:

**Spring Integration 4.1**

Current Milestone provides compatibility with [Spring Integration 4.1](https://spring.io/blog/2014/09/05/spring-integration-4-1-milestone-1-available) as well as with [Spring Framework 4.1](https://spring.io/blog/2014/09/04/spring-framework-4-1-ga-is-here).

The changes include:

-   Spring Integration 4.1 provides `Channel names late resolution`,

which allows for DSL `IntegrationFlow`s definitions to be based on just channel names and avoid workarounds that required `@DependsOn` from one flow to another;

-   a number of Messaging performance improvements have been included in Spring Framework 4.1, when Spring Integration

(as well as its DSL) is based on Spring Messaging module;

-   Spring Framework 4.1 introduced the \[SpEL Compiler\]([http://docs.spring](http://docs.spring)

.io/spring/docs/current/spring-framework-reference/html/expressions.html#expressions-spel-compilation). It is very useful for Spring Integration, which extensively uses SpEL at runtime. You can enable the SpEL Compiler using the `spring.expression.compiler.mode` System Property with a value of `IMMEDIATE` or `MIXED`.

Of course, compatibility with Spring Integration 4.0 still remains.

**IntegrationFlow Lambda**

The `IntegrationFlow` bean definition can now be presented as a `Lambda` too, to simplify the DSL usage:

```java
Copy@Bean
public IntegrationFlow lambdaFlow() {
    return f -> f.filter("World"::equals)
                 .transform("Hello "::concat)
                 .handle(System.out::println);
}
```

Actually we just made `IntegrationFlow` a functional interface with a single method `define(IntegrationFlowDefinition<?> flow)` and the `IntegrationFlowBeanPostProcessor` just converts that 'fake' bean to the real `StandardIntegrationFlow` based on implicit `IntegrationFlowBuilder`. The only limitation is with such a definition, that it is based on an implicit `DirectChannel` with `lambdaFlow.input` bean name.

**Protocol-specific Adapters**

With this Milestone, several new protocol-specific `Namespace factories` have been introduced: `Files`, `(S)Ftp` and `Mail`. Some simple samples of their usage:

```java
Copy@Autowired
private DefaultFtpSessionFactory ftpSessionFactory;

@Bean
public IntegrationFlow ftpInboundFlow() {
     return IntegrationFlows
               .from(Ftp.inboundAdapter(this.ftpSessionFactory)
                        .preserveTimestamp(true)
                        .remoteDirectory("ftpSource")
                        .regexFilter(".*\\.txt$")
                        .localFilenameGeneratorExpression("#this.toUpperCase() + '.a'")
                        .localDirectory(new File("tmp")),
                      e -> e.id("ftpInboundAdapter"))
               .channel(MessageChannels.queue("ftpInboundResultChannel"))
               .get();
}

@Bean
public IntegrationFlow tailFlow() {
	return IntegrationFlows
			.from(Files.tailAdapter(new File(tmpDir, "TailTest"))
					.delay(500)
					.end(false))
			.channel(MessageChannels.queue("tailChannel"))
			.get();
}

@Bean
public IntegrationFlow imapIdleFlow() throws AddressException {
    return IntegrationFlows
            .from(Mail.imapIdleAdapter("imap://user:pw@imap.gmail.com:993/INBOX")
                    .searchTermStrategy((f, l) -> 
                    		new AndTerm(new FromTerm(new InternetAddress("bar@baz")), 
                    					new FlagTerm(new Flags(Flags.Flag.SEEN), false)))
                    .javaMailProperties(p -> p
                            .put("mail.debug", "true")
                            .put("mail.imap.connectionpoolsize", "5"))
                    .shouldReconnectAutomatically(true))
            .enrichHeaders(s -> s.headerExpressions(h -> h
                            .put(MailHeaders.SUBJECT, "payload.subject")
                            .put(MailHeaders.FROM, "payload.from[0].toString()")))
            .channel(MessageChannels.queue("imapIdleChannel"))
            .get();
}
```

**Support additions**

As you could notice in the last `IMAP` sample the `.javaMailProperties()` and `.enrichHeaders()` have fluent syntax to specify `Properties` and `Map<String, String>` as inline objects. Unfortunately, Java doesn't provide a `Builder` API for those simple classes, hence we do that for you and provide functional interfaces to build `Properties` and `Map` from Lambdas. For example, the `Mail.headers()` provides a `MailHeadersBuilder` - an extension of `MapBuilder`, which can be used in the `.enrichHeaders()` as well:

```java
Copy@Bean
public IntegrationFlow sendMailFlow() {
	return f -> f.enrichHeaders(Mail.headers().subject("foo").from("foo@bar").to("bar@baz"))
				 .handle(Mail.outboundAdapter("smtp.gmail.com")
							.credentials("user", "pw")
							.protocol("smtp")));
}
```

Of course, this is an equivalent of `<int-mail:header-enricher>` from XML configuration.

**Wrapping up**

You can obtain more information about these and existing classes from their [source code](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-java-dsl).

We look forward to your comments and feedback ([StackOverflow](http://stackoverflow.com) (`spring-integration` tag), [Spring JIRA](https://jira.spring.io/browse/INTEXT), [GitHub](https://github.com/spring-projects/spring-integration-extensions/issues)) as soon as possible and report issues you find before we GA towards over a couple months.

**SpringOne 2GX 2014**

Some of those mentioned topics are being covered at SpringOne *tomorrow*. Please attend \[Gary Russell's Session\] ([https://2014.event.springone2gx.com/schedule/sessions/spring\_integration\_java\_configuration\_and\_more.html](https://2014.event.springone2gx.com/schedule/sessions/spring_integration_java_configuration_and_more.html)) to learn more about these and other Spring Integration improvements added in the last 12 months.