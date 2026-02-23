---
title: Spring Cloud Stream - Composed Functions or EIP
source: https://spring.io/blog/2019/11/04/spring-cloud-stream-composed-functions-or-eip
scraped: 2026-02-23T14:27:47.617Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  November 04, 2019 | 2 Comments
---

# Spring Cloud Stream - Composed Functions or EIP

_Engineering | Oleg Zhurakousky |  November 04, 2019 | 2 Comments_

In preparation for the upcoming releases of Spring Cloud Stream (SCSt) 3.0.0 - Horsham and Spring Cloud Function (SCF) 3.0.0, we’ve been publishing a series of posts discussing and showcasing new features and enhancements. We provided [motivation and justification for moving away from the annotation-based programming model to the functional model](https://spring.io/blog/2019/10/14/spring-cloud-stream-demystified-and-simplified), and then we provided more details on the [functional approach, as well as reactive functions](https://spring.io/blog/2019/10/17/spring-cloud-stream-functional-and-reactive). In [another post](https://spring.io/blog/2019/10/25/spring-cloud-stream-and-spring-integration), which is relevant to what we're going to be discussing here, Artem demonstrated the benefits of combining functional approaches with the [Spring Integration](https://spring.io/projects/spring-integration) project. We also talked about [event routing](https://spring.io/blog/2019/10/31/spring-cloud-stream-event-routing) in our last post.

In this post, we discuss function composition and [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/) (EIP), their commonalities, their differences, and how one can complement the other in the context of SCSt.

***"There is no such a thing as a complex problem, since every complex problem is nothing more than an array of simple problems."***

### [](#function-composition)Function Composition

Function composition is a [feature of SCF](https://github.com/spring-cloud/spring-cloud-function/blob/master/docs/src/main/asciidoc/spring-cloud-function.adoc#function-composition) that lets you compose several functions together in a declarative way. The following example shows how to do so:

```
Copy--spring.cloud.function.definition=uppercase|reverse
```

Here, we effectively provided a definition of a single function that is itself a composition of a function named `uppercase` and a function named `reverse`. You can also argue that we've *orchestrated* a simple pipeline consisting of running the `uppercase` function and then sending its output to the `reverse` function. The term *orchestration* is important here, and we cover it in more detail later in the post.

### [](#enterprise-integration-patterns-eip)Enterprise Integration Patterns (EIP)

Enterprise Integration Patterns is a set of patterns that let you describe a business case as a collection of clearly defined and well understood patterns. Some examples are *filter*, *transformer*, *router*, and so on. For more details on EIP, see [this link](https://www.enterpriseintegrationpatterns.com). Spring provides a reference implementation of EIP thru [Spring Integration](https://spring.io/projects/spring-integration) framework. For example, by using the same two function example as before, we can construct a pipeline that uses SI's Java DSL, as follows:

```
CopyIntegrationFlow.fromChannel(inputChannel)
        .transform(uppercase)
        .transform(reverse);
```

For more on SI's Java DSL, see the [Java DSL documentation](https://docs.spring.io/spring-integration/docs/5.2.0.RELEASE/reference/html/dsl.html#java-dsl) as well as this [quick tutorial](https://spring.io/blog/2014/11/25/spring-integration-java-dsl-line-by-line-tutorial).

The core point here is that we've just demonstrated two ways of addressing the same problem thru orchestrating a pipeline. Both can be looked at as orchestrators of complex functionality:

-   *Orchestration by composition*: You get a single function.
-   *Orchestration by delegation*: You get some kind of a flow.

Why is this important? As stated earlier, *there is no such a thing as a complex problem, since every complex problem is nothing more than an array of simple problems*. So complexity is a composition. However, even complexity can be looked at as something straight forward or something complex. Let’s look at few use cases to set the context:

-   a) Consider a case where you need to compute something . . . and save it to the DB.
-   b) Consider another case where you need to compute something, but, if some attribute is missing or not ready, you need to send it back for more information and then compute again (if enough information has been provided) and then save it to a DB.

In the spirit of breaking complexity into simplicity, the first case can be broken down into two services in sequence: *compute -> save* (similar to our previous *uppercase -> reverse* example). The second case, while similar, contains a decision point that can then trigger a loop-back that contains some type of additional service call (and so on). In other words, it is not as straightforward as simple *compute -> save*.

#### [](#spring-integration-or-spring-cloud-function-composition)Spring Integration or Spring Cloud Function Composition?

To start, let’s quickly state that EIP and Spring Integration as its implementation can easily handle both use cases. They provide:

-   Patterns to sequentially hand off the result of one process to another
-   The ability to loop back
-   Route or filter based on some condition
-   Many more options

On the other hand, SCF, with its function composition feature, can easily handle the first use case and rightfully so. After all, `compute -> save` is a collection of functionalities aligned in sequence - `computeFunction.andThen(saveFunction).andThen(..)` or using SCF notation `computeFunction | saveFunction`. Also, with SCF composition, it is significantly simpler and more performant, given the differences in the internal implementation between SCF and SI. However, the second use case (which is not fully aligned in a sequence of steps) would be difficult if not impossible to implement with function composition. That is where using a framework such as SI would be the preferred option.

The good thing is that, when broken down, the complexity could still be realized as functions that are recognized as first class citizens by SCF and SI, as described in [this post](https://spring.io/blog/2019/10/25/spring-cloud-stream-and-spring-integration) by Artem Bilan. This means that you can defer the decision about your orchestration approach until later to chose SI or SCF or combination of both.

#### [](#summary)Summary

SCF Composition is suited better for orchestrating functionalities that are aligned in sequence, and SI is the better choice for everything else that fits into the category of EIP.