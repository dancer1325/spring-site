---
title: Spring Data REST 1.1.0.M1 Released
source: https://spring.io/blog/2013/03/11/spring-data-rest-1-1-0-m1-released
scraped: 2026-02-24T08:07:51.768Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jon Brisbin |  March 11, 2013 | 0 Comments
---

# Spring Data REST 1.1.0.M1 Released

_Releases | Jon Brisbin |  March 11, 2013 | 0 Comments_

The Spring Data team is happy to announce the next major step in the evolution of exporting domain objects to the web using RESTful semantics: Spring Data REST 1.1.0.M1 is now available in the SpringSource milestone repository.

[Spring Data REST Home](http://www.springsource.org/spring-data/rest) | [Source on GitHub](https://github.com/SpringSource/spring-data-rest) | [Reference Documentation](http://static.springsource.org/spring-data/rest/docs/1.1.0.M1/reference/htmlsingle/)

## Export domain objects to the web

[Spring Data REST](http://www.springsource.org/spring-data/rest) is a set of Spring MVC components that you can add to your own Spring MVC applications that export your Spring Data Repositories to the web using RESTful, HATEOAS semantics. It provides a consistent interaction API by exporting repositories to RESTful URLs that are configurable in a couple different ways.

Spring Data REST supports CRUD for top-level entities (those domain objects directly managed by a Spring Data Repository) by literally writing a single line of code that defines an interface that extends Spring Data's `CrudRepository` interface. That done, your entities then have full RESTful semantics. You can create new ones, update existing ones, and delete them using standard URLs that are, following the principles of HATEOAS, discoverable. That means the user agent accessing your Spring Data REST application doesn't need to have advance knowledge of what resources you are exporting. It can discover what entites exist and what relationships exist on those entities by successive calls to URLs provided in the JSON. These "links" are the real foundation and power of a HATEOAS REST application.

## Changes from the ground up

Version 1.1 is virtually a re-write from the ground up. Not only is it easier to configure than 1.0 and better conforms to Spring MVC expections for the transition to Spring 3.2, but the biggest change in the internals of Spring Data REST is that it now supports other types of Spring Data repository implementations beyond just JPA. The HTTP semantics for CRUD and manging relationships (if the datastore supports it) remain the same no matter what backing datastore is used.

That means it's now possible to export JPA entities and MongoDB entities within the same Spring Data REST application and access those entities using a common URL structure and using the standard Spring HATEOAS Resource representation for all entities and collections. The user agent accessing those RESTful URLs does not need any special knowledge on which datastore the backing entities are managed by and, most importantly, you don't have to write any code to get that functionality!

### MongoDB support

Spring Data REST 1.1 now supports exporting MongoDB `CrudRepository` implementations. The same HTTP semantics apply to MongoDB `@Document` entities as apply to JPA entities. GET, POST, PUT, DELETE are of course supported, but so is `@DBRef`. You can view and manage the relationship between two documents using GET, POST, PUT, and DELETE and you can export finder methods based on your `@Query` definitions. Please reference the [spring-data-mongodb reference documentation](http://static.springsource.org/spring-data/data-mongodb/docs/current/reference/htmlsingle/) for the full details of how the object mapping differs from JPA style mapping and how query definitions work.

### Gemfire support

Spring Data REST 1.1 now supports exporting entities that use the high-performance [Gemfire database](http://www.vmware.com/products/application-platform/vfabric-gemfire/) to different Regions. Read the [Spring Data Gemfire documentation](http://static.springsource.org/autorepo/docs/spring-data-gemfire/1.3.0.M1/reference/htmlsingle/) for the full explanation of the vast configuration options and how POJO mapping in Gemfire differs from other mapping technologies.

### Neo4J support is next

Spring Data REST 1.1 is now set to support Neo4J `GraphRepository`s with the next version of spring-data-neo4j, version 2.3. When that's generally available (which should be around or before the general availablity of Spring Data REST 1.1 RELEASE), you will be able to access `@NodeEntity`s and their relationships using standard HATEOAS semantics, just like you do with the other datastores.

## Add it to your existing apps

Spring Data REST is designed in such a way that you can, if you wish, create an entire application for the Spring Data REST application. It's just a standard Spring MVC webapp after all. But things get really interesting when you add Spring Data REST to your own services.

[Spring HATEOAS](https://github.com/springsource/spring-hateoas) author [Oliver Gierke](https://github.com/olivergierke) has created an example application that demonstrates the use of HATEOAS principles in a modern web application. It's called [spring-restbucks](https://github.com/olivergierke/spring-restbucks) and is an implementation of the Restbucks application described in the Systematic Theology of REST services: [REST in Practice](http://shop.oreilly.com/product/9780596805838.do) by Jim Webber, Savas Parastatidis and Ian Robinson.

### Mixin REST services

By mixing Spring Data REST with your other RESTful services, you can get a seamless integration between those domain objects exported by Spring Data REST--objects for which you didn't have to write any code to have them exposed--and those services that don't represent an actual entity but a process. You can see an example of how a payment service might interact with domain object CRUD in the spring-restbucks application, where credit card payment processing is handled by a custom controller, while object CRUD is handled by Spring Data REST. Your custom controllers can actually piggyback onto the Spring Data REST URLs so that a consistent and simple URL structure can be maintained throughout the appliation, no matter whether the URL refers to your custom controller, a Spring Data REST JPA Repository, or any of the other supported Repository styles.

### It's not exclusive

It's not an either-or with Spring Data REST. If you don't want all of your Repositories exposed to a web client, no problem! There a several different ways you can turn off functionality for Repositories. You can embed annotations into your source code or, if you don't have access or simply can't add the Spring Data REST annotations, you can use a fluent, DSL-style configuration to tell Spring Data REST how your resources should be exposed. Using Spring Data REST in your application isn't an exclusive committment to only one way of doing things. Spring Data REST is structured in a what that it will play nicely with your existing application so you can incorporate those bits of functionality from Spring Data REST you want, while still maintaining all the custom-coded services you're used to creating in Spring MVC controllers.

#### JSONP support moving to a filter

The JSONP support that was built into Spring Data REST 1.0 has been removed from the core framework in preference to a forthcoming general-purpose JSONP Serlvet Filter that will work much better than the way JSONP was implemented in version 1.0. When that filter is generally available, then JSONP support can be added not just to Spring Data REST, but virtually any Servlet-based REST resource.

## Installation and Documentation

To get started playing with Spring Data REST, have a look at [the reference documentation](http://static.springsource.org/spring-data/rest/docs/1.1.0.M1/reference/htmlsingle/) to get the lay of the land, so to speak, and get started playing with it in your own application by simply adding a dependency to the `spring-data-rest-webmvc` artifact (currently at 1.1.0.M1 in the [SpringSource milestone repository](a%20href=%22http://repo.springsource.org/libs-milestone%22)) then import the Spring Data REST configuration [like you see being done in the spring-restbucks application](https://github.com/olivergierke/spring-restbucks/blob/master/src/main/java/org/springsource/restbucks/RestbucksWebApplicationInitializer.java#L88).

### Learn more at CONFESS\_2013

If you're planning on attending CONFESS\_2013 in Vienna the first week of April, then you can hear all about Spring Data REST at [my talk on exporting entities to the web](https://2013.con-fess.com/sessions/-/details/85/Exporting-JPA-Entities-directly-to-the-web-using-Spring-Data-REST).

### Links

[Spring Data REST Home](http://www.springsource.org/spring-data/rest) | [Source on GitHub](https://github.com/SpringSource/spring-data-rest) | [Reference Documentation](http://static.springsource.org/spring-data/rest/docs/1.1.0.M1/reference/htmlsingle/)