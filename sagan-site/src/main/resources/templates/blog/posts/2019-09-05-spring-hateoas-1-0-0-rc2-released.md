---
title: Spring HATEOAS 1.0.0.RC2 released
source: https://spring.io/blog/2019/09/05/spring-hateoas-1-0-0-rc2-released
scraped: 2026-02-23T14:37:56.039Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  September 05, 2019 | 1 Comment
---

# Spring HATEOAS 1.0.0.RC2 released

_Engineering | Greg L. Turnquist |  September 05, 2019 | 1 Comment_

Dear Spring community, we’re proud to announce the second release candidate of Spring HATEOAS 1.0.0. Since our [last release](https://spring.io/blog/2019/03/05/spring-hateoas-1-0-m1-released), Spring HATEOAS has made great strides with two more milestones and two RCs.

Here’s the summary:

-   Internationalization support for both [HAL](https://docs.spring.io/spring-hateoas/docs/1.0.0.RC2/reference/html/#mediatypes.hal.i18n) and [HAL-FORMS](https://docs.spring.io/spring-hateoas/docs/1.0.0.RC2/reference/html/#mediatypes.hal-forms.i18n).
    
-   Performance improvements
    
-   Spring HATEOS is now based on Spring Framework 5.2 and Reactor’s Dysprosium release train. This is critical to support downstream projects like Spring Data Moore and Spring Boot 2.2.
    
-   Now supports Spring WebFlux applications that have both hypermedia and non-hypermedia endpoints.
    
-   Improved major chunks of reference documentation.
    
-   Created a [Spring HATEOAS Gitter channel](https://gitter.im/spring-projects/spring-hateoas).
    
-   Fixed issues in various media types to ensure they comply with spec definitions, and don’t throw unexpected exceptions.
    

Let’s have a detailed look at some of those features.

## [](#internationalization)[](#internationalization)Internationalization

One of the most brittle features to add to your API is internationalized text. Many clients mimic server-side rules by parsing the content of the payload. This sets them up for massive breaking changes when the server wants to adopt locale-specific text. Convincing your clients to adopt a link-based approach opens the door to using Spring resource bundles to tune the text shown on links.

HAL defines a title attribute for its link objects. These titles can be populated by using Spring’s resource bundle abstraction and a resource bundle named `rest-messages` so that clients can use them in their UIs directly. This bundle will be set up automatically and is used during HAL link serialization.

To define a title for a HAL link, use the key template `_links.$relationName.title` as follows:

Example 1. A sample `rest-messages.properties`

\_links.cancel.title=Cancel order \_links.payment.title=Proceed to checkout

This will result in the following HAL representation:

Example 2. A sample HAL document with link titles defined

{ "\_links" : { "cancel" : { "href" : "…" "title" : "Cancel order" }, "payment" : { "href" : "…" "title" : "Proceed to checkout" } } }

From there, you are free to include `rest-messages.properties` for default values, and then include, for example, `rest-messages_de.properties` for your German clients, etc.

HAL-FORMS has both a `title` and a `prompt` attribute, intended for human consumption. Look at the following `rest-messages.properties` entries:

Example 3. Defining HAL-FORMS template titles and prompts

\_templates.default.title=Some title **(1)** \_templates.putEmployee.title=Create employee **(2)** Employee.\_templates.default.title=Create employee **(3)** com.acme.Employee.\_templates.default.title=Create employee **(4)**

firstName.\_prompt=Firstname **(5)** Employee.firstName=Firstname **(6)** com.acme.Employee.firstName.\_prompt=Firstname **(7)**

1.  A global definition for the title using default as key.
    
2.  A global definition for the title using the actual affordance name as key. Unless defined explicitly when creating the affordance, this defaults to `$httpMethod + $simpleInputTypeName`.
    
3.  A locally defined title to be applied to all types named `Employee`.
    
4.  A title definition using the fully-qualified type name.
    
5.  All properties named email will get "Firstname" rendered, independent of the type they’re declared in.
    
6.  The firstName property in types named Employee will be prompted "Firstname".
    
7.  The firstName property of com.acme.Employee will get a prompt of "Firstname" assigned.
    

This puts you in control to show your customers what they need to see, and allows your clients to not sweat it when changes to the payload are made.

## [](#performance-improvements)[](#perf)Performance improvements

Thanks to efforts by both the community and our team, we have sped up the rendering of hypermedia. This includes caching critical bits, moving unnecessary object allocation off the hot path, and even getting rid of exceptions that were being used for normal control flow.

Additionally, this project, which started on Java 6, continues to adopt Java 8 features that make it easier to speed things up. Also thanks to batteries of load testing through JMH (Java Microbenchmark Harness), we have been able to spot many areas that were in desparate need of attention.

## [](#spring-framework-52--reactor-dysprosium--javanext)[](#spring-framework-5.2)Spring Framework 5.2 + Reactor Dysprosium + Java.NEXT

Being a crucial dependency for the Spring Data `Moore` release train, Spring HATEOAS has aligned with **Spring Framework 5.2** and **Reactor Dysprosium**. This all feeds toward **Spring Boot 2.2**.

At the same time, we build every commit against both the latest milestone/RC of Spring Framework as well as against snapshots. That way, we can spot problems fast and ensure they don’t break you.

If you are a trail blazer and using newer versions of Java, you should be happy to know we run every commit against both LTS releases (AdoptOpenJDK 8 & 11) and the latest version of Java available on Docker hub (AdoptOpenJDK 12). This way, there are no surprises if some breaking API change is coming down the pipe from the Java community.

## [](#community-support)[](#community)Community support

Community is important. That’s why we opened a Spring HATEOAS [Gitter channel](https://gitter.im/spring-projects/spring-hateoas). Come and join us! If you are using Spring HATEOAS to build an API and have a question or are broken down somewhere, come and find us. The community is here to help.

Anything missing? Let us know! With over [14 closed issues](https://docs.spring.io/spring-hateoas/docs/1.0.0.RC2/changelog.txt), be sure to check things out. And let us know what you think!

Check out the project links below.

Links: [Project Page](http://spring.io/projects/spring-hateoas) | [GitHub](https://github.com/spring-projects/spring-hateoas) | [Issues](https://github.com/spring-projects/spring-hateoas/issues) | [Gitter](https://gitter.im/spring-projects/spring-hateoas)

Being a release candidate, you’ll find the artifacts at [https://repo.spring.io/libs-milestone](https://repo.spring.io/libs-milestone).