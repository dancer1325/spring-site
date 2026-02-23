---
title: Spring | Serverless
source: https://spring.io/serverless
scraped: 2026-02-19T07:47:36.199Z
description: Level up your Java code and explore what Spring can do for you.
---

![](/img/extra/serverless-8.svg)

# [](#serverless)Serverless

Serverless applications take advantage of modern cloud computing capabilities and abstractions to let you focus on logic rather than on infrastructure. In a serverless environment, you can concentrate on writing application code while the underlying platform takes care of scaling, runtimes, resource allocation, security, and other “server” specifics.

### What is serverless?

Serverless workloads are “event-driven workloads that aren’t concerned with aspects normally handled by server infrastructure.” Concerns like “how many instances to run” and “what operating system to use” are all managed by a Function as a Service platform (or FaaS), leaving developers free to focus on business logic.

### Serverless characteristics?

Serverless applications have a number of specific characteristics, including:

-   Event-driven code execution with triggers
-   Platform handles all the starting, stopping, and scaling chores
-   Scales to zero, with low to no cost when idle
-   Stateless

![](/img/extra/serverless-4.svg)![](/img/extra/serverless-4-dark.svg)

# Serverless vs Traditional Stack

![Diagram](/img/extra/serverless-5.svg)![Diagram](/img/extra/serverless-5-dark.svg)

## Function as a Service (FaaS)

-   Event-driven execution.
-   Developers delegate all server-specific tasks to the FaaS platform.
-   Developers only write business logic that is invoked by the platform, allowing for a more resilient requirement evolution as business needs change.

## Traditional applications

-   Must maintain server infrastructure (installing, configuring, patching, upgrading, etc.).
-   Infrastructure scales in ways that might not be dynamic enough for the workload (wasting resources).
-   Developers write integration code to deal with messaging platforms, HTTP request/responses, etc.

# Why Spring and Serverless?

The Spring portfolio provides a robust collection of functionality for use within serverless applications. Whether accessing data with [Spring Data](/projects/spring-data), using the enterprise integration patterns with [Spring Integration](/projects/spring-integration), or using the latest in reactive programming with [Spring Framework](/projects/spring-framework) and [Project Reactor](https://projectreactor.io/), Spring lets developers be productive in a serverless environment from day one.

Spring also helps your functions avoid vendor lock-in. The adapters provided by [Spring Cloud Function](/projects/spring-cloud-function) let you decouple from vendor-specific APIs when running your code on their platform.

[Get started with this simple guide](/guides/gs/service-registration-and-discovery)

# In detail: Spring Cloud Function

[Spring Cloud Function](/projects/spring-cloud-function) provides capabilities that lets Spring developers take advantage of serverless or FaaS platforms.

The `java.util.function` package from core Java serves as the foundation of the programming model used by Spring Cloud Function. In a nutshell, Spring Cloud Function provides:

-   Choice of programming styles: reactive, imperative, or hybrid.
-   Function composition and adaptation (such as composing imperative functions with reactive).
-   Support for reactive function with multiple inputs and outputs to let functions handle merging, joining, and other complex streaming operations.
-   Transparent type conversion of inputs and outputs.
-   Packaging functions for deployments, specific to the target platform (such as Project Riff, AWS Lambda, and more; see below).
-   Functions with flexible signatures (POJO functions) - “if it looks like a function, it’s a function”
-   All other benefits of Spring's idioms and programming model.

Spring Cloud Function provides adaptors so that you can run your functions on the most common FaaS services including [Amazon Lambda](https://aws.amazon.com/lambda/), [Apache OpenWhisk](https://openwhisk.apache.org/), [Microsoft Azure](https://azure.microsoft.com/en-us/services/functions/), and [Project Riff](https://projectriff.io/).

## Ready to get started?

## More resources

[![Spring, Functions, Serverless, and You](/img/extra/serverless-1.png)](https://www.youtube.com/watch?v=8tOj4A7jgWg)

# [Spring, Functions, Serverless, and You](https://www.youtube.com/watch?v=8tOj4A7jgWg)

Nate Schutta

[![Spring Tips: Project Riff and Spring Cloud Function](/img/extra/serverless-2.png)](https://spring.io/blog/2018/05/16/spring-tips-project-riff-and-spring-cloud-function)

# [Spring Tips: Project Riff and Spring Cloud Function](https://spring.io/blog/2018/05/16/spring-tips-project-riff-and-spring-cloud-function)

Josh Long

[![Serverless Spring](/img/extra/serverless-3.png)](https://www.youtube.com/watch?v=mPOl3024R4s)

# [Serverless Spring](https://www.youtube.com/watch?v=mPOl3024R4s)

Dave Syer and Mark Fisher

![](/img/extra/footer.svg)

## Get ahead

VMware offers training and certification to turbo-charge your progress.

[Learn more](https://spring.academy/)

## Get support

Tanzu Spring offers support and binaries for OpenJDK™, Spring, and Apache Tomcat® in one simple subscription.

[Learn more](/support)

## Upcoming events

Check out all the upcoming events in the Spring community.

[View all](/events)