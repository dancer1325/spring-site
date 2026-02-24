---
title: Spring Dynamic Modules 1.0 is here
source: https://spring.io/blog/2008/01/25/spring-dynamic-modules-1-0-is-here
scraped: 2026-02-24T09:21:15.493Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  January 25, 2008 | 0 Comments
---

# Spring Dynamic Modules 1.0 is here

_Engineering | Costin Leau |  January 25, 2008 | 0 Comments_

I am glad to report (along side [Adrian](http://blog.springsource.com/main/2008/01/25/spring-dynamic-modules-reaches-10/)) that after 3 milestones and 2 release candidates, [Spring Dynamic Modules](http://www.springframework.org/osgi) (formerly known as Spring OSGi) 1.0 has been [released](http://www.springsource.com/web/guest/2008/spring-dm-intro).

A lot of features have been improved or added since my previous [post](http://blog.springsource.com/main/2007/04/05/so-whats-the-deal-with-spring-osgi/) (about 1.0 M1); I'll talk more about them in future entries (there is also the reference [documentation](http://static.springframework.org/osgi/docs/current/reference/html/) that explains the library at length) so I'll just name a few:

\- consistency

We want to provide a powerful, simple and consistent programming model. That's why Spring Dynamic Modules builds on top of Spring and uses its proven concepts, reliability and ubiquity.

\- highly non-intrusive nature

The recommended way to use Spring DM is to **not** use its classes inside your code or have any imports for them inside your bundle manifests. If you are not using Spring inside your code and only for your application configuration, the same rule applies. Spring DM creates the application context for you, so there is no need for you to depend on Spring or Spring DM. And don't worry about things such as custom namespace or XML schemas - we've already covered them.

\- OSGi service dynamics life cycle management

This is one of the most important Spring DM features - the ability to interact with OSGi services just as you would with *normal* beans. You can publish and consume OSGi services without writing any code; we'll deal with the dynamics for you - and you have full control (more about this in the future).

\- smarter integration testing framework

Since we used Spring-DM integration testing extensively internally, we improved the defaults, the maven integration and made the automatic manifest generation faster and smarter then before. For example, the framework automatically determines the classes available in the test bundle and will not generated imports for it.

\- simple bundle interaction

Andy Piper ([blog](http://dev2dev.bea.com/blog/andypiper/)) added a simple, declaratively way to install/start/stop/update bundles based on the module life cycle and Spring beans dependency.

\- managed startup/shutdown context creation

In OSGi applications are broken into various modules (also known as bundles) which rely on each other services. This creates a dependency tree between the module which becomes important during startup and shutdown. Traditionally this can be addressed by installing and starting the bundles based on the dependency order however, this doesn't solve entirely solve the problem. As the OSGi specification recommends, OSGi services that take a long time to initialize (such as connection pools) should rely on a different thread then the one used for starting and stopping the bundle. This means that if a bundle is started, it does not mean its services are. And not every application is ready to wait for its required service during start up - in fact, few do. This means that a bundle will fail since it relied on a service published several milliseconds later (OSGi is, by default, an in-VM platform where things happen *really* fast).

This behavior is not rare - in fact, it's quite common at startup on multi-core platforms with multiple bundles. Spring DM addresses this problem by determining the dependencies (from the Spring configuration) and waiting for them to become available before creating the application context. A similar process will be used at shutdown, when Spring DM will stop the contexts based on their dependency order so you don't have to worry about starting or stopping your bundles.

\- thread-less dependency waiting

I cannot discuss the dependency mechanism without mentioning the 'thread-less' approach used for dependency waiting (sounds a bit like an oxymoron, I know - we're working on a fancy title for it) implemented by Hal Hildebrand (see his [blog](http://www.tensegrity.hellblazer.com/)). Since various services need to be available for a module to properly start some sort of waiting/monitoring is required which traditionally implies using a thread.

However, on an OSGi platform can be (and there will be) multiple modules (several dozens easily) - using a waiting thread per module simply does not scale. One thing which we worked hard on was improve this model and I believe we provided a very nice solution - using **no** thread at all for the waiting process. This means that no matter if 3 bundles are deployed or 300, no CPU time will be spent unless your modules actually start.

Spring Dynamic Modules is not just about 'spring'-ifying an API but rather dealing with a different runtime environment.

With regard to tooling, Spring IDE supports Spring DM namespaces and (thanks to [Christian](http://springide.org/blog/author/cdupuis/)) also provides Spring-DM specific [targets](http://tinyurl.com/ypacmn) for Eclipse [PDE](http://www.eclipse.org/pde/), a features available in Spring IDE nightly builds (more info on installing and using the plug-in is [available](http://static.springframework.org/osgi/docs/1.0/reference/html/appendix-pde-integration.html) in the reference documentation).

## Future directions

So now that 1.0 has been released, what's next? Plenty of areas to cover:

#### Web Support

OSGi platforms provides a dedicated [Http Service](http://www2.osgi.org/javadoc/r4/org/osgi/service/http/HttpService.html) but using it requires coding. Things such as resource loading, JSP generation and deployment can be significantly simplified. This is the main are of focus of the 1.1 release.

#### Persistence

Modern persistent tools provide advanced features such as lazy-loading which bend the modularity borders enforced by the OSGi environment as they rely on class generation and proxying. We want to address this problem and, just like with web support, provide a smooth experience whether plain JDBC or/and ORM tools are being used.

#### AOP

Following the persistence problem, we are seeking solutions for doing generic AOP inside OSGi. It's a hard nut to crack and to do it properly, internal OSGi platform support is required. The good news is that projects like [Equinox Aspects](http://www.eclipse.org/equinox/incubator/aspects/index.php) have already led the way and [OSGi Enterprise Expert Group](http://www.osgi.org/about/charter_eeg.asp?section=1) (EEG) have the problem on their radar.

## Enough talking

If you want to know more about Spring Dynamic Modules, see the [project page](http://www.springframework.org/osgi) and the reference documentation and do use our mailing list (the forum will appear shortly). Moreover, lately we worked on some OSGi/Spring DM [screencasts](http://www.springframework.org/osgi/demos) which are available on the Spring DM home page. The first one (composed by two parts), made by yours truly, shows how to quickly create a project to do integration testing with Spring DM.  
Why integration testing? Since with Spring DM it's a very simple and fast process and a very effective way to learn about OSGi (especially with regard to modularity).

There will be more screencasts in the future - just let us know what you'd like to see and based on the number of requests, we'll queue them accordingly.

Without further ado, "[Using Spring DM for OSGi integration testing](http://www.springframework.org/osgi/demos#integration-testing)":

[![](http://static.springframework.org/osgi/demos/integration-test-demo/part-1/demo-part1.jpg)](http://static.springframework.org/osgi/demos/integration-test-demo/part-1/int-testing-part1.html)

[![](http://static.springframework.org/osgi/demos/integration-test-demo/part-2/demo-part2.jpg)](http://static.springframework.org/osgi/demos/integration-test-demo/part-2/int-testing-part2.html)