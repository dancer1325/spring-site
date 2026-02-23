---
title: Introducing JHipster
source: https://spring.io/blog/2015/02/10/introducing-jhipster
scraped: 2026-02-23T21:55:52.113Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 10, 2015 | 27 Comments
---

# Introducing JHipster

_Engineering | Josh Long |  February 10, 2015 | 27 Comments_

> This post is a guest post by community [member Julien Dubois (@juliendubois)](http://twitter.com/juliendubois), a former SpringSource employee who now works for Ippon Technologies and is creator of the JHipster project. Thanks Julien! I'd like to see more of these guest posts, so - as usual - don't hesitate to [ping me (@starbuxman)](http://twitter.com/starbuxman)! -Josh

---

![the JHipster](https://jhipster.github.io/images/logo-jhipster-drink-coffee.png "the JHipster")

## [](#introduction)Introduction

JHipster, or "Java Hipster," is a handy application generator that will create for you a Spring Boot (that's the Java part) and AngularJS (that's the *hipster* part) application.

In a very short amount of time, [JHipster has became very popular on Github](https://github.com/jhipster/generator-jhipster), and it has been featured on online magazines - like [InfoQ](http://www.infoq.com/news/2015/01/jhipster-2.0), Infoworld or SD Times - and in conferences all over the world - Paris, London, Montreal, Omaha, Taipei, Richmond, Frankfurt!

JHipster focuses on generating a high quality application with a Java back-end using an extensive set of Spring technologies; [Spring Boot](http://spring.io/projects/spring-boot), [Spring Security](http://spring.io/projects/spring-security), [Spring Data](http://spring.io/projects/spring-data), Spring MVC (providing a framework for websockets, REST and MVC), etc. an Angular.js front-end and a suite of pre-configured development tools like [Yeoman](http://yeoman.io/), [Maven](http://maven.apache.org/), [Gradle](https://gradle.org/), [Grunt](http://gruntjs.com/), [Gulp.js](http://gulpjs.com/) and [Bower](http://bower.io/). JHipster creates a fully configured Spring Boot application with a set of pre-defined screens for user management, monitoring, and logging. The generated Spring Boot application is specifically tailored to make working with Angular.js a smoother experience.

JHipster gives you the tools to update, manage and package the resulting application. Run `mvn package -Pprod` to trigger a Maven build that uses the Spring Boot Maven plugin to create a single executable `.war` file, and Grunt or Gulp.js tasks to test, minify and optimize JavaScript, HTML and CSS code.

## [](#getting-started)Getting Started

JHipster uses Node.js and Yeoman to generate the application and Java and Maven (or Gradle) to run the generated application. You can find an updated getting-started guide in [the online documentation](http://jhipster.github.io/installation.html).

Check out the following video to learn how to create a JHipster application and use the provided set of tools to modify and improve the generated code.

## [](#a-walkthrough-of-the-generated-spring-boot-application)A Walkthrough of the Generated Spring Boot Application

The generated application can be quite different depending on the options you have selected when you created it. For example, if you selected `MongoDB` instead of `MySQL`, your Spring Data repositories will be different. If you selected "Java 8" instead of `Java 7`, you will have lambda expressions in the generated code. Whatever you choose, the resulting application will share a similar architecture and fundamental code-base.

Let's look at some of the key features of the resulting application:

-   `src/main/java` directory has Spring Boot configuration classes in the `config` package. JHipster uses Spring's Java configuration and has no XML configuration.
-   JPA entity or MongoDB document classes in the `domain` package. The JPA entities are configured with cache and auto-generated primary keys. If you use JHipster to generate your JPA entities, it is able to create one-to-many and many-to-many relationships.
-   (Small) Spring Data repositories in the `repository` package.
-   Optionally, you can have regular `@Service`\-beans in the `service` layer. These services are typically transactional and secured business objects.
-   REST endpoints live in the `web.rest` package, created with Spring MVC's REST support.
-   JHipster also generates Liquibase changelog files to handle database updates. Adding a new entity will create a specific schema update, which will be versioned, and will be executed when the application is restarted.
-   Integration tests using Spring's Test Context support.
-   JHipster creates a fully usable AngularJS front-end on top of this Spring application, with CRUD screens to manage your generated entities.

## [](#developing-with-jhipster)Developing with JHipster

JHipster is a great application starter, but once you have generated your application and added some CRUD Angular.JS screens on top of your JPA entities, you will need to get coding.

JHipster projects are ultimately just simple Spring Boot-based Maven and Gradle-based projects that can be imported into any IDE that knows about Maven (or Gradle) and Java.

JHipster gives you command-line tools to build and update your application. Grunt or Gulp.js help you build your front-end. For example, running `grunt serve` will launch a browser that is managed by Grunt, that will be automatically reloaded when any of your HTML, JavaScript, or CSS code change. Bower allows you to upgrade or install JavaScript or CSS libraries. For example, running `bower install ng-table` will install `ng-table`.

You can run your Spring Boot application from the command line using the Spring Boot Maven plugin (or Gradle plugin): `mvn spring-boot:run`. You can use the Maven Liquibase `diff` goal to automatically generate a Liquibase changelog. Run `mvn liquibase:diff` will check your existing database schema against your current (modified) JPA code and generate the necessary Liquibase changelog file in order to update your database schema automatically.

You can use Docker to set up your development box. This can be easier for some advanced users (especially Linux users), and will allow you to have a consistent working environment if you have a team of developers. A specific `jhipster-docker` project has been created for this. Check out [the JHipster documentation page on installation for more details](http://jhipster.github.io/installation.html).

## [](#managing-the-application-in-production)Managing the Application in Production

JHipster applications have a configured-by-default `admin` user that has access to several *administration*\-specific screens. The three most interesting screens are the API screen (generated with Swagger), the metrics screen, and the logging screen. The **API screen** documents the REST API of your Spring Boot application and simplifies working with front-end developers using Angular.JS. The **metrics screen** uses Dropwizard Metrics and gives you detailed information on your application's performance, including the performance of your Spring bean's methods. The **logging screen** uses Logback and allows you to change your logging levels at runtime. You could, for example, change the logging level of Spring Security in order to have detailed information on your security configuration.

JHipster has a `development` and a `production` mode. The `production` mode gives you a minified and optimized front-end, GZip compression, HTTP caching and more. In order to test the `production` mode, run your application with the `prod` profile (available both with Maven or Gradle): `mvn spring-boot:run -Pprod`. Using the Chrome Developer Tools, you can run an audit of your generated application to check performance.

## [](#deploying-to-cloud-foundry)Deploying to Cloud Foundry

JHipster has a Cloud Foundry `sub generator` that makes it easy to deploy application to Cloud Foundry: `yo jhipster:cloudfoundry`. This adds a Cloud Foundry application, creates a database (MySQL, PostgreSQL and MongoDB are supported) and then binds the database to the application and uploads (`cf push`) your application to Cloud Foundry.

## [](#next-steps)Next Steps

JHipster takes you further with fewer steps. If you want to learn more, check out the [JHipster site](http://jhipster.github.io/), the [JHipster Github page](https://github.com/jhipster/generator-jhipster) and [follow @java\_hipster on Twitter](http://twitter.com/java_hipster).