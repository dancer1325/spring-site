---
title: Java DSL for Spring Integration 1.1 GA is Available
source: https://spring.io/blog/2015/09/22/java-dsl-for-spring-integration-1-1-ga-is-available
scraped: 2026-02-23T19:42:07.820Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Artem Bilan |  September 22, 2015 | 0 Comments
---

# Java DSL for Spring Integration 1.1 GA is Available

_Engineering | Artem Bilan |  September 22, 2015 | 0 Comments_

Dear Spring Community!

On behalf of Spring Integration team I'm pleased to announce that the 1.1 GA of Spring Integration Java DSL is now available from the [Release Repository](https://repo.spring.io/release/) and [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cspring-integration-java-dsl):

For Gradle use this dependency:

```
Copy'org.springframework.integration:spring-integration-java-dsl:1.1.0.RELEASE'
```

For Maven this:

```
Copy<dependency>
     <groupId>org.springframework.integration</groupId>
     <artifactId>spring-integration-java-dsl</artifactId>
     <version>1.1.0.RELEASE</version>
</dependency>
```

First of all a big thanks to everyone who visited my [talk](https://2015.event.springone2gx.com/schedule/sessions/spring_integration_java_dsl.html) at the SpringOne 2GX 2015 last week. An additional thanks for all the feedback we have received.

Thanks to that we were able to add some minor fixes between GA and previous [Milestone](https://spring.io/blog/2015/09/10/spring-integration-java-dsl-1-1-m2-is-available).

And as I promised on my talk we added the DSL definition for simple adapters from the Spring Integration Core module.

Let me demonstrate it here one more time and explain on what the solution is based to share some hooks for future contributors:

```java
Copy@Bean
public IntegrationFlow feedFlow() {
return IntegrationFlows
              .from(s -> s.feed(this.feedUrl, "feedTest")
                                    .feedFetcher(new FileUrlFeedFetcher())
                                    .metadataStore(metadataStore()),
                             e -> e.poller(p -> p.fixedDelay(100)))
              .channel(c -> c.queue("entries"))
              .get();
}
```

-   It is an `IntegrationFlow` definition which starts from the `inbound-channel-adapter` for the `FeedEntryMessageSource`.
-   The first Lambda for the `.from()` method is a `MessageSources` factory which just delegates to the target Namespace Factory:

```java
Copypublic FeedEntryMessageSourceSpec feed(URL feedUrl, String metadataKey) {
	return Feed.inboundAdapter(feedUrl, metadataKey);
}
```

It exists for convenience - to get a gain from IDE auto-completion feature.

-   In this case we delegate to the `org.springframework.integration.dsl.feed.Feed` Namespace Factory with very short source code:

```java
Copypublic abstract class Feed {

	public static FeedEntryMessageSourceSpec inboundAdapter(URL feedUrl, 
                                      String metadataKey) {
		return new FeedEntryMessageSourceSpec(feedUrl, metadataKey);
	}

}
```

-   The `FeedEntryMessageSourceSpec` is an implementation of the `MessageSourceSpec` to have a Builder pattern implementation around `FeedEntryMessageSource`.

All other components in the Spring Integration Java DSL are built the same way and I hope it looks simple enough to get more and more contribution from the community to address your specific adapters support in the Framework.

Please, stay tuned as we are going to go ahead with the [Spring Framework 5](https://spring.io/blog/2015/08/03/coming-up-in-2016-spring-framework-4-3-5-0) foundation and more organic integration with Java 8.

[Project Page](https://github.com/spring-projects/spring-integration-java-dsl) | [JIRA](https://jira.spring.io/browse/INTEXT) | [Issues](https://github.com/spring-projects/spring-integration-java-dsl/issues) | \[Contributions\] ([https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)) | [StackOverflow](http://stackoverflow.com) (`spring-integration` tag)