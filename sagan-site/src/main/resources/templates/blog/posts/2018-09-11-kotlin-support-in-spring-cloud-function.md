---
title: Kotlin Support in Spring Cloud Function
source: https://spring.io/blog/2018/09/11/kotlin-support-in-spring-cloud-function
scraped: 2026-02-23T15:02:45.880Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  September 11, 2018 | 4 Comments
---

# Kotlin Support in Spring Cloud Function

_Engineering | Oleg Zhurakousky |  September 11, 2018 | 4 Comments_

Rarely we blog about a single feature, but given that [this one](https://github.com/spring-cloud/spring-cloud-function/issues/77) was one of the most requested ones in [Spring Cloud Function](https://cloud.spring.io/spring-cloud-function/) (relatively young project), we thought it may be appropriate, so here it is.

Initial support for [Kotlin](https://kotlinlang.org/) lambdas has been added to Spring Cloud Function. What it means is that Spring Cloud Function can now recognize Kotlin lambdas that *effectively* match to one of Java's `Supplier`, `Function` or `Consumer` and treat them as such.

That is:

```$kotlin
Copy@Bean
open fun kotlinFunction(): (String) -> String {
    return  { it.toUpperCase() }
}

@Bean
open fun kotlinConsumer(): (String) -> Unit {
    return  { println(it) }
}

@Bean
open fun kotlinSupplier(): () -> String {
    return  { "Hello Kotlin" }
}

```

Check out the sample project [here](https://github.com/olegz/demos/tree/master/demo-function-kotlin)

That is pretty much it. The feature is available in the current snapshot and will be part of Spring Cloud Function 2.0.0.RELEASE. This means that enhancements and modifications are still ongoing so your feedback is quite important.

For more on Spring Cloud Function see the following:

[https://spring.io/blog/2017/07/05/introducing-spring-cloud-function](https://spring.io/blog/2017/07/05/introducing-spring-cloud-function) [https://www.nurkiewicz.com/2018/04/sneak-peek-at-spring-cloud-function.html](https://www.nurkiewicz.com/2018/04/sneak-peek-at-spring-cloud-function.html)

Enjoy!