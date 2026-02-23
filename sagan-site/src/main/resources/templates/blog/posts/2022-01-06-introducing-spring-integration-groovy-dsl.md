---
title: Introducing Spring Integration Groovy DSL
source: https://spring.io/blog/2022/01/06/introducing-spring-integration-groovy-dsl
scraped: 2026-02-23T12:57:38.714Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Artem Bilan |  January 06, 2022 | 0 Comments
---

# Introducing Spring Integration Groovy DSL

_Engineering | Artem Bilan |  January 06, 2022 | 0 Comments_

Happy New Year, Spring community!

Hope you had great holidays and ready for new excitements in front of us.

After the rest and recharging during Christmas break I decided to pay honor to my favorite language back in days - Groovy.

And now it’s my pleasure to present you a brand new Groovy DSL for Spring Integration. You perhaps heard about our [old attempt](https://spring.io/blog/2012/11/06/a-groovy-dsl-for-spring-integration) to make a Groovy DSL on top of Spring Integration XML support. But the solution was pretty cumbersome (especially for protocol-specific channel adapters) and support burden has grown tremendously. This my latest implementation is fully based on already mature Java DSL and its builder pattern support.

Having 10 years experience with Gradle I thought that it is going be easy enough for me to prepare quickly something what just extends an `IntegrationFlowDefinition` and exposes a Groovy builder style for definition. Turns out just using a language and engineering a DSL on top of it are different tasks, and I had to start learning respective Groovy aspects from a scratch. A [series of blog posts](https://musketyr.medium.com/groovy-dsl-builders-1-the-concept-2d5a97fa0a51) by Vladimír Oraný gave me a good source of information what and how should be used and done to make end-user experience with Groovy DSL as best as possible.

Including the current success of existing [Kotlin DSL for Spring Integration](https://docs.spring.io/spring-integration/docs/current/reference/html/kotlin-dsl.html#kotlin-dsl), so far I ended up with a couple Groovy classes. The `IntegrationGroovyDsl` as a factory for `static integrationFlow()` methods to be imported to the target project and delegation to the well-knows `IntegrationFlows.from()` factories. And the `GroovyIntegrationFlowDefinition` as a wrapper around `IntegrationFlowDefinition` delegate. Both classes heavily leverage a Groovy first class citizen - `groovy.lang.Closure`, with a `@DelegatesTo` and `@ClosureParams` features to support IDE suggestions and auto-completion.

So, all you need is to have a `org.springframework.integration:spring-integration-groovy-dsl:0.0.1` dependency, add an `import static org.springframework.integration.dsl.IntegrationGroovyDsl.integrationFlow` and start typing your `IntegrationFlow` bean in a nice Groovy style. And this is how it looks so far in my IntelliJ IDEA:

![Groovy DSL in IDEA](https://raw.githubusercontent.com/spring-projects/spring-integration-extensions/main/samples/Groovy_DSL_in_IDEA.PNG)

Note

After learning those `@DelegatesTo` and `@ClosureParams`, I realized that Kotlin also provides a nice feature for better IDE experience. So, the next Spring Integration `5.5.8` version (due to in the middle of January) also includes an `@IntegrationDsl` marker annotation.

You can find more samples in the project [README](https://github.com/spring-projects/spring-integration-extensions/tree/main/spring-integration-groovy-dsl) and respective [Spock tests](https://github.com/spring-projects/spring-integration-extensions/blob/main/spring-integration-groovy-dsl/src/test/groovy/org/springframework/integration/dsl/test/GroovyDslTests.groovy). If project matures, eventually it may go directly to `spring-integration-core`. We also may override those `IntegrationGroovyDsl` and `GroovyIntegrationFlowDefinition` Groovy classes to Java (it’s just a DSL API anyway!), however I believe the `@CompileStatic` Groovy feature should be enough to optimize compiled byte code in the end.

Give it a try and any feedback is welcome!

Cheers,   
Artem

[Project Page](https://github.com/spring-projects/spring-integration-extensions) | [GitHub Issues](https://github.com/spring-projects/spring-integration-extensions/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)