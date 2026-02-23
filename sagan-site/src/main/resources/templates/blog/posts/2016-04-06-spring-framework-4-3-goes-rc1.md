---
title: Spring Framework 4.3 goes RC1
source: https://spring.io/blog/2016/04/06/spring-framework-4-3-goes-rc1
scraped: 2026-02-23T19:13:53.974Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  April 06, 2016 | 4 Comments
---

# Spring Framework 4.3 goes RC1

_Releases | Juergen Hoeller |  April 06, 2016 | 4 Comments_

Dear Spring community,

It is my pleasure to announce that a feature-complete Spring Framework 4.3 release candidate is [available](http://projects.spring.io/spring-framework/) now! This is a perfect opportunity for you to get involved: Please run your regression tests against it, and of course, feel free to try the new features...

### Dependency injection refinements:

\* @Autowired injection of Map/Collection beans and self references \* @Autowired on configuration class constructors (finally!) \* No need for declaring @Autowired on a unique non-default constructor \* ObjectProvider as a richer variant of an ObjectFactory handle \* InjectionPoint/DependencyDescriptor as an injectable argument for @Bean methods

### MVC processing refinements:

\* Default processing of OPTIONS, HEAD, Allow and If-Unmodified-Since \* Support for custom HTTP Vary configuration and HTTP Range on custom resources \* Precomposed @GetMapping, @PostMapping, @RequestScope, @SessionScope etc \* @RequestAttribute and @SessionAttribute as handler method arguments \* Full support for Jackson 2.7's new type resolution algorithm

### Various infrastructural refinements across the framework:

\* Wider support for composed annotations and for placeholders/expressions in attributes \* Richer programmatic metadata in core container exceptions \* Component scanning in manifest-defined classpath entries \* A background initialization option for bootstrapping JPA / Hibernate \* A 'sync' flag on @Cacheable and support for the Caffeine cache provider

We are working towards an RC2 with some remaining fine-tuning and performance improvements in the meantime, preparing for 4.3's general availability on June 1st!

Cheers, Juergen