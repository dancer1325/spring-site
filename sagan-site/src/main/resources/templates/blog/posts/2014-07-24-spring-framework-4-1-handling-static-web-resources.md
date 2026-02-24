---
title: Spring Framework 4.1 - handling static web resources
source: https://spring.io/blog/2014/07/24/spring-framework-4-1-handling-static-web-resources
scraped: 2026-02-23T22:19:01.557Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Brian Clozel |  July 24, 2014 | 37 Comments
---

# Spring Framework 4.1 - handling static web resources

_Engineering | Brian Clozel |  July 24, 2014 | 37 Comments_

This week, [Juergen announced the Spring Framework 4.1 release candidate](http://spring.io/blog/2014/07/21/spring-framework-4-1-release-candidate-available). Now is the time to test those new features and see how they can make your applications better!

One of those new features is the flexible resolution and transformation of static web resources. Spring framework already allows you to serve static resources using `ResourceHttpRequestHandlers`. This feature gives you more power and new possibilities.

## [](#resourceresolvers-and-resourcetransformers)ResourceResolvers and ResourceTransformers

[ResourceResolvers](http://docs.spring.io/spring-framework/docs/4.1.0.RC1/javadoc-api/org/springframework/web/servlet/resource/ResourceResolver.html) and [ResourceTransformers](http://docs.spring.io/spring-framework/docs/4.1.0.RC1/javadoc-api/org/springframework/web/servlet/resource/ResourceTransformer.html) are at the very core of this new feature.

`ResourceResolvers` can resolve resources, given their URL path. They can also resolve the externally facing *public* URL path for clients to use, given their *internal* resource path. `ResourceTransformers` can modify the content of resolved resources.

Here's a diagram illustrating what happens when serving static resources with `ResourceHttpRequestHandlers`:

  Request for Resource
      |
      | HTTP request
      v
  Resolvers chain: FirstResolver, SecondResolver, ThirdResolver
  (each resolver can return the resource or delegate to the next one)
      |
      | Resolved Resource
      v
  Transformers chain: FirstTransformer, SecondTransformer
  (each transformer can transform the resource or just pass it along without modification)
      |
      | Transformed Resource
      v
  HTTP Response with Resource content

Here's another one showing how a chain of `ResourceResolvers` can update links to resources for HTTP client's use:

  Resource link in a template source file
      |
      | Resource path (like "/css/main.css")
      v 
  Resolvers chain: FirstResolver, SecondResolver, ThirdResolver
  (each resolver can modify the resource path or delegate to the next one)
      |
      | Updated resource path (like "/css/main-0e37f12.css")
      v 
  Resource link in a rendered template 

Now, let's take a look at what `ResourceResolvers` implementations have to offer:

Resolver Name

Goal

[PathResourceResolver](http://docs.spring.io/spring-framework/docs/4.1.0.RC1/javadoc-api/org/springframework/web/servlet/resource/PathResourceResolver.html)

finds resources under configured locations (classpath, file system...) matching to the request path

[CachingResourceResolver](http://docs.spring.io/spring-framework/docs/4.1.0.RC1/javadoc-api/org/springframework/web/servlet/resource/CachingResourceResolver.html)

resolves resources from a Cache instance or delegates to the next Resolver in the chain

[GzipResourceResolver](http://docs.spring.io/spring-framework/docs/4.1.0.RC1/javadoc-api/org/springframework/web/servlet/resource/GzipResourceResolver.html)

finds variations of a resource with a ".gz" extension when HTTP clients support gzip compression

[VersionResourceResolver](http://docs.spring.io/spring-framework/docs/4.1.0.RC1/javadoc-api/org/springframework/web/servlet/resource/VersionResourceResolver.html)

resolves request paths containing a version string, i.e. version information about the resource being requested. This resolver can be useful to set up HTTP caching strategies by changing resources' URLs as they are updated.

And now, `ResourceTransformers`:

Transformer Name

Goal

[CssLinkResourceTransformer](http://docs.spring.io/spring-framework/docs/4.1.0.RC1/javadoc-api/org/springframework/web/servlet/resource/CssLinkResourceTransformer.html)

modifies links in a CSS file to match the public URL paths that should be exposed to clients

[CachingResourceTransformer](http://docs.spring.io/spring-framework/docs/4.1.0.RC1/javadoc-api/org/springframework/web/servlet/resource/CachingResourceTransformer.html)

caches the result of transformations in a Cache or delegates to the next Transformer in the chain

[AppCacheManifestTransfomer](http://docs.spring.io/spring-framework/docs/4.1.0.RC1/javadoc-api/org/springframework/web/servlet/resource/AppCacheManifestTransfomer.html)

helps handling resources within HTML5 AppCache manifests for HTML5 offline applications

The key goal of those new additions to `ResourceHttpRequestHandlers` is to make it easy to optimize and work with optimized static resources for [front-end performance](https://developers.google.com/speed/docs/best-practices/rules_intro).

## [](#yet-another-asset-pipeline)Yet another asset pipeline?

Many libraries and frameworks address those issues with full, integrated *assets pipelines* which often offer strong, opinionated solutions about the programming languages, technologies and project structure to use. Those *asset pipelines* take care of resources optimization when creating the deployable application and/or while the application is running.

In Spring Framework 4.1, we've chosen a path that relies on optimizing resources at build time using the best tools out there for your application and leveraging Resolvers and Transformers at runtime. For JavaScript applications, we want to leverage the same toolchains used by JavaScript developers, like [grunt](http://gruntjs.com/) and [gulp](http://gulpjs.com) to optimize resources at build time. Same thing about [Dart](https://www.dartlang.org/) and [TypeScript](http://www.typescriptlang.org/) - native tooling always offers the best experience.

Those ecosystems are rich (actually much richer than the options available in Java) and constantly evolving. We believe that relying on those ecosystems and on a flexible solution in the Framework is the best approach here.

So your application should find the right balance and leverage:

-   transpiling, minifying, concatenating... tasks at build time using native tools for your client side application
-   resolvers and transformers provided with the framework (and also create your owns!)

Looking at the upcoming standards, such as [HTTP/2](https://http2.github.io/) and [ECMAScript 6](http://www.ecmascript.org/), it makes even more sense - defining changes will happen in this space in the next years.

## [](#resource-versioning)Resource versioning

Static web resources versioning is a central concern when pushing web apps to production and very much a server-side concern. Spring Framework 4.1 aims to provide first class support through various strategies including content-based hashing (like in Git, also known as fingerprinting) as well as versions that apply to entire sets of files (e.g. required for working with [JavaScript module loaders](http://spring.io/blog/2014/04/11/javascript-modularity-without-the-buzzwords)).

Underlying all this is the idea of "cache busting" where resources are served with aggressive HTTP cache directives (e.g. 1 year into the future) and relying on version-related changes in the URL to "bust" the cache when necessary. This could be a content-based hash version that changes whenever the content of the file changes or a version determined through some other means (e.g. simple property, git commit sha, etc).

## [](#source-code-layout)Source code layout

Another very important question is where your sources are located and how your application is organized - as Java developers, we're used to find those in `src/main/webapp`. But is it really the best location?

Nowadays, most web applications are made of a client application running in the browser and a server application, both communicating over HTTP or websockets. Each of those can have its own dependencies, tests, build tools, etc. So why can't we decouple those and reflect that separation of concerns in our codebase?

Breaking your web application in modules - a client module and a server module - can dramatically improve your development experience and gives the freedom your application needs.

We use the same layout in [Project Sagan](https://github.com/spring-io/sagan) and I discussed the rationale behind this in details in a previous screencast, [Project Sagan: client-side architecture](http://spring.io/blog/2014/04/28/project-sagan-client-side-architecture).

Here's an example of project layout:

spring-app/
|- build.gradle
|- client/
|  |- src/
|  |  |- css/
|  |  |- js/
|  |     |- main.js
|  |- test/
|  |- build.gradle
|  |- gulpfile.js
|- server/
|  |- src/main/java/
|  |– build.gradle

Both Resolvers/Transformers and build tools can offer similar features around resource handling. So which one should we use?

## [](#spring-resource-handling-showcase-application)Spring Resource Handling showcase application

In the [Spring Resource Handling showcase application](https://github.com/bclozel/spring-resource-handling), we are demonstrating several key features:

-   **Cache busting** static resources in HTML responses, CSS files, and HTML5 appcache manifests
-   A new **project layout** as mentioned earlier
-   **Template engine** integrations, such as [Groovy markup templates](http://spring.io/blog/2014/05/28/using-the-innovative-groovy-template-engine-in-spring-boot) and [Handlebars](http://handlebarsjs.com/)
-   **Using LESS** as a CSS alternative, with the client side pre-processor during development and a build processor for production
-   **A complete build tool chain**, using Gradle and gulp; future examples can demonstrate the same features using grunt, maven, etc

Note that this new **project layout** has two key advantages:

1.  Better developer experience, since resources are served unoptimized, directly from the disk at development time
    
2.  Optimal performance in production, since static resources are optimized by the build and packaged in a webJAR - so they are ultimately served from the classpath in production
    

## [](#were-waiting-for-your-feedback)We're waiting for your feedback

The [Spring Resource Handling showcase application](https://github.com/bclozel/spring-resource-handling) is still work in progress, and we're preparing enhancements for easier configuration (see [SPR-11982](https://jira.spring.io/browse/SPR-11982)); of course, the feedback of the community will be very useful here.

For more of this, don't forget [SpringOne 2GX 2014 in Dallas, TX](http://springone2gx.com/) - Rossen and I will cover this subject in a [dedicated session](https://2014.event.springone2gx.com/schedule/sessions/resource_handling_in_spring_mvc_4_1.html).