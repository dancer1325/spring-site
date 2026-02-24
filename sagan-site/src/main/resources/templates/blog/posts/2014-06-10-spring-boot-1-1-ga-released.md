---
title: Spring Boot 1.1 GA Released
source: https://spring.io/blog/2014/06/10/spring-boot-1-1-ga-released
scraped: 2026-02-23T22:27:09.345Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  June 10, 2014 | 3 Comments
---

# Spring Boot 1.1 GA Released

_Releases | Phil Webb |  June 10, 2014 | 3 Comments_

[Spring Boot](http://projects.spring.io/spring-boot/) 1.1.1 has been released and is available now from [repo.spring.io](https://repo.spring.io/release/) and [maven central](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.springframework.boot%22). This release will form part of the [Spring IO Platform](https://spring.io/platform) and offers a number of new features and improvements over 1.0. For [upgrade instructions](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.1-Release-Notes#upgrading-from-spring-boot-10) and "[new and noteworthy](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.1-Release-Notes#new-and-noteworthy)" features please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.1-Release-Notes).

*NOTE: Please use v1.1.1 as there was a minor issue with the initial v1.1.0 release*

Here are some of the highlights:

## [](#templating-support)Templating Support

Alongside the existing [Thymeleaf](http://www.thymeleaf.org/) and [JSP](http://www.oracle.com/technetwork/java/javaee/jsp/index.html) support, Additional templating options have been added for [Freemarker](http://freemarker.org/), [Velocity](http://velocity.apache.org/) and [Groovy](http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html). Groovy templates are particularly cool, with a beautifully concise markup:

```groovy
Copyhtml(lang:'en') {
    head {
        meta('http-equiv':'"Content-Type" content="text/html; charset=utf-8"')
        title('My page')
    }
    body {
        p('This is an example of HTML contents')
    }
}
```

For more information check out the "[Using the innovative Groovy template engine](http://spring.io/blog/2014/05/28/using-the-innovative-groovy-template-engine-in-spring-boot)" blog post by [Cédric Champeau](http://spring.io/team/melix).

## [](#metrics-and-health)Metrics and Health

The `/metrics` actuator endpoint now includes more information, including heap details, class load count, thread information and garbage collection statistics. The `HealthIndicator` interface has been improved to allow for multiple indicator beans, and to support returning specific HTTP status codes when there is a problem. Out of the box support for JDBC, Redis, Mongo and RabbitMQ is provided.

## [](#flyway--liquibase-support)Flyway & Liquibase Support

Support is now provided for [Flyway](http://flywaydb.org/) or [Liquibase](http://www.liquibase.org/) database migrations. Using either project provides a simple way to dynamically evolve your database schema as your product develops.

## [](#additional-auto-configurations)Additional auto-configurations

Additional auto-configurations and starter POMs are now included for [GemFire](http://www.gopivotal.com/big-data/pivotal-gemfire), [HornetQ](http://hornetq.jboss.org/), [Elasticsearch](http://www.elasticsearch.org/), [Solr](http://lucene.apache.org/solr/), [Spring Social](http://projects.spring.io/spring-social/), [Spring Integration](http://projects.spring.io/spring-integration/), [Spring Mobile](http://projects.spring.io/spring-mobile/) and [Spring HATEOAS](http://projects.spring.io/spring-hateoas/). If you're upgrading a project that previously defined configuration for any of these products, you should check to see if you can delete some code!

## [](#custom-banner-support)Custom Banner Support

This is one of my favorite little improvements and should be familiar to any DropWizard users. You can now define a custom banner by adding a file called `banner.txt` to your classpath.

## [](#documentation-updates)Documentation updates

The [reference documentation](http://docs.spring.io/spring-boot/docs/1.1.x/reference/htmlsingle/) has been updated to reflect the new features and several additional [How-to's](http://docs.spring.io/spring-boot/docs/1.1.x/reference/htmlsingle/#howto) have been added. We are now also publishing a generated [Maven site for the `spring-boot-maven-plugin`](http://docs.spring.io/spring-boot/docs/1.1.x/maven-plugin/).

  

Thanks to everyone that has contributed to this release, we have had lots of community involvement and many new features and improvements were developed by external contributors. Please keep up the good work and continue to raise those [issues](https://github.com/spring-projects/spring-boot/issues) and [pull requests](https://github.com/spring-projects/spring-boot/pulls)!

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/1.1.0.RELEASE/reference/htmlsingle)