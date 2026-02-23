---
title: Spring GraphQL 1.0.0-M2 available now
source: https://spring.io/blog/2021/09/01/spring-graphql-1-0-0-m2-available-now
scraped: 2026-02-23T13:05:54.211Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Brian Clozel |  September 01, 2021 | 0 Comments
---

# Spring GraphQL 1.0.0-M2 available now

_Engineering | Brian Clozel |  September 01, 2021 | 0 Comments_

Less than 2 months after [the initial announcement of Spring GraphQL](https://spring.io/blog/2021/07/06/hello-spring-graphql) and [its follow up intro blog](https://spring.io/blog/2021/07/06/introducing-spring-graphql), I'm happy to announce that the `1.0.0-M2` version has been released and is available from the Spring Milestone repository.

The Spring GraphQL team would like to thank the early adopters and contributors - with your help, we're making good progress towards a GA version!

We've [fixed a few issues and renamed a couple of concepts](https://github.com/spring-projects/spring-graphql/milestone/2?closed=1), but the most notable change is the introduction of a [new annotation model for GraphQL Controllers](https://docs.spring.io/spring-graphql/docs/1.0.0-M2/reference/html/#controllers). You can now annotate `@Controller` components to handle queries, mutations and subscriptions:

```java
Copy@Controller
public class GreetingController {

        @QueryMapping 
        public String hello() { 
            return "Hello, world!";
        }

}
```

This is a new feature and we can't wait to hear your feedback - [please give it a try](https://docs.spring.io/spring-graphql/docs/1.0.0-M2/reference/html/#controllers) and let us know what you think!

## [](#spring-graphql-at-springone)Spring GraphQL at SpringOne!

Don't miss the [Spring GraphQL presentation at SpringOne today](https://springone.io/2021/sessions/spring-graphql)! This will give a nice intro to this new Spring project and you'll get a chance to chat with the team, live and on the dedicated SpringOne Slack.

### [](#how-can-you-help)How can you help?

If you're interested in helping out, you can [get started with Spring GraphQL](https://docs.spring.io/spring-graphql/docs/1.0.0-M2/reference/html/#boot-graphql) and [raise issues on our GitHub project](https://github.com/spring-projects/spring-graphql/issues). If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/docs/1.0.0-M2/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)