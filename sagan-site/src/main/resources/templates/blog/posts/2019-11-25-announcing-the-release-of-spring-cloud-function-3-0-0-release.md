---
title: Announcing the release of Spring Cloud Function 3.0.0.RELEASE
source: https://spring.io/blog/2019/11/25/announcing-the-release-of-spring-cloud-function-3-0-0-release
scraped: 2026-02-23T14:24:30.442Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  November 25, 2019 | 0 Comments
---

# Announcing the release of Spring Cloud Function 3.0.0.RELEASE

_Engineering | Oleg Zhurakousky |  November 25, 2019 | 0 Comments_

We are pleased to announce the release of the Spring Cloud Function 3.0.0.RELEASE, which is available as part of Spring Cloud Hoxton.RELEASE (imminent) and builds on Spring Boot 2.2.x.

Spring Cloud Function 3.0.0.RELEASE modules are available for use in the [Maven Central](https://repo.maven.apache.org/maven2/org/springframework/cloud/) repository.

### [](#quick-highlights)Quick highlights:

#### [](#transparent-type-conversion)Transparent type conversion

This release introduces a refactored implementation of `FunctionCatalog` which amongst features such as *function composition, support for reactive and non-reactive functions* and more introduces *transparent type conversion* via [MessageConverters](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jms/support/converter/MessageConverter.html) provided by Spring Messaging.

This means that you can use domain specific types in your function signatures and rely on `MessageConverters` to do the conversion.

```java
Copy@Bean
public Function<Foo, Bar> funcFooToBar() {
    return value -> . . .;
}
```

Further more, these converters are also used to convert types when composing functions. Consider the following function:

```java
Copy@Bean
public Function<Flux<Baz>, Flux<Xyz>> funcBazToXyz() {
    return value -> . . .;
}
```

composed as `spring.cloud.function.definition=funcFooToBar|funcBazToXyz`. Given that the above two functions have a mismatch between output of `funcFooToBar` and input of `funcBazToXyz` the `MessaggeConverters` will kick in to convert such types. Also note another feature of `FunctionCatalog` which allows you to compose reactive and non-reactive functions. Spring Cloud Function provides several `MessageConverters` out-of-the-box which should satisfy most of the cases (such as *json* to POJO and back), however you may also register your own by simply declaring a bean of type `MessageConverter`.

### [](#function-routing)Function Routing

Routing feature of Spring Cloud Function allows you to invoke a special function which acts as a router to an actual function you wish to invoke This feature is very useful in certain FAAS environments where maintaining configurations for several functions could be cumbersome or exposing more then one function is not possible.

You can get more details on this feature in [this section](https://cloud.spring.io/spring-cloud-static/spring-cloud-function/3.0.0.RELEASE/reference/html/spring-cloud-function.html#_function_routing) of the user guide.

#### [](#function-arity-multiple-inputsoutputs)Function arity (multiple inputs/outputs)

There are times when a stream of data needs to be categorized and organized. For example, consider a classic big-data use case of dealing with unorganised data containing, let’s say, ‘orders’ and ‘invoices’, and you want each to go into a separate data store. This is where function arity (functions with multiple inputs and outputs) support comes to play. There is a separate post on this feature available [here](https://spring.io/blog/2019/08/15/announcing-spring-cloud-function-3-0-0-m2) and the example of such a function is available in one of these [test cases](https://github.com/spring-cloud/spring-cloud-stream/blob/master/spring-cloud-stream/src/test/java/org/springframework/cloud/stream/function/MultipleInputOutputFunctionTests.java#L342).

More information is available in [this section](https://cloud.spring.io/spring-cloud-static/spring-cloud-function/3.0.0.RELEASE/reference/html/spring-cloud-function.html#_function_arity) of the user guide.

#### [](#function-composition-and-adaptation)Function composition and adaptation;

While function composition is not a new feature to Spring Cloud Function, it was refined with this release.

As an additional benefit you can compose functions with different programming styles (e.g., reactive and imperative), you can compose *Supplier* with *Function*, *Supplier* with *Consumer*, *Function* with *Consumer* etc., - we will adapt. You can compose functions where output of the producer function does not match the input of the consumer function - we will convert. There will be a separate blog on this subject in the future and we're also in the process of refining documentation.

#### [](#kotlin-lambda-support)Kotlin Lambda support

While support for Kotlin lambdas existed since v2.x there are some additional enhancements. You can read more about it in [this section](https://cloud.spring.io/spring-cloud-static/spring-cloud-function/3.0.0.RELEASE/reference/html/spring-cloud-function.html#_kotlin_lambda_support) of user guide.

#### [](#next-steps)Next Steps

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-function) or [GitHub](https://github.com/spring-cloud/spring-cloud-function/) .