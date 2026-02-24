---
title: Spring Framework 3.0 M3 released
source: https://spring.io/blog/2009/05/06/spring-framework-3-0-m3-released
scraped: 2026-02-24T09:08:26.210Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  May 06, 2009 | 0 Comments
---

# Spring Framework 3.0 M3 released

_Engineering | Juergen Hoeller |  May 06, 2009 | 0 Comments_

We are pleased to announce that the third Spring 3.0 milestone is available now ([download page](http://www.springsource.com/download))! This release comes with many new features and refinements, including...

**Reference documentation**: M3 is the first Spring 3.0 milestone that comes with reference documentation, in both HTML and PDF format. Even if the documentation is still a work in progress, it does cover many 3.0 feature areas at this point already. We hope that you'll find this early cut of the documentation useful for learning more about the 3.0 milestone features.

**Annotated factory methods:** Spring 3.0 M3 includes the core functionality of the Spring JavaConfig project, namely configuration classes with annotated factory methods that define managed beans.

`**@Bean @Primary @Lazy** public RewardsService rewardsService() { return new RewardsServiceImpl(...); }`

Such factory methods are supported *on any annotated component class* (e.g. plain @Component classes), building and exposing bean objects based on the component's state. They will simply be treated as further bean definitions derived from that component class, in addition to the bean definition for the containing component. The default name for such a bean definition is the name of its factory method (in the example above: "rewardsService"). Those bean instances will be obtained through factory method calls whenever the container needs to obtain a fresh instance. This is semantically close to XML bean definitions with a factory-bean/factory-method reference.

Beyond simple factory methods, we support the *JavaConfig mode of operation* as well: If factory methods are defined on a class marked with the @Configuration annotation, then special behavior applies... Factory methods on such explicit configuration components are allowed to call other factory methods on the same component, with those internal factory method calls being rerouted through the container! This allows for building graphs of container-managed bean instances, with the builder code simply consisting of chained Java factory method calls. Like the original JavaConfig project, we are generating CGLIB subclasses of such configuration classes in order to provide those extended semantics.

Note that *annotated factory methods can be mixed and matched with XML bean definitions in a seamless fashion*. They can also be mixed and matched with regular annotated component classes, reusing many common annotations such as @Scope, @Lazy, @Primary, and @Qualifier. Components containing annotated factory methods may be defined in XML or detected through component scanning in the classpath. Basically, the same rules as for any regular Spring beans apply; this is now a natural extension of Spring 2.5's support for annotated components.

**Extended support for meta-annotations:** Spring's @Scope and @Transactional annotations, as well as specialized stereotypes such as @Service and @Controller, can be applied as meta-annotations on custom annotations now. For example:

`**@Service @Scope("request") @Transactional(rollbackFor=Exception.class)** @Retention(RetentionPolicy.RUNTIME) public @interface MyService { }`

`@MyService public class RewardsService { … }`

This is a powerful way of defining custom stereotype annotations with extended default semantics as shown above. Alternatively, you may build simple custom scope annotations: e.g. a custom @RequestScoped annotation marked with @Scope("request"), or custom transaction annotations: e.g. @MyTx marked with @Transactional(rollbackFor=Exception.class). In other words, this allows for creating convenient *shortcut annotations for your preferred configuration variants*!

**TaskScheduler abstraction:** Spring provides a full-fledged scheduling facade API now, including adapters for standard ScheduledExecutorServices and also CommonJ TimerManagers. This comes with a Trigger abstraction and a CronTrigger implementation for simple scheduling based on cron expressions. In 3.0 RC1, we'll be adding a scheduling namespace for convenient XML-based configuration on top of this.

**New type conversion SPI and converter API**: Inspired by the capabilities of Spring Web Flow's binding subsystem, Spring supports stateless Java 5 based type converters now. This has been integrated with Spring 3.0's expression parser already and will be fully supported as an alternative to standard JDK PropertyEditors for all Spring binding purposes in 3.0 RC1. Likewise, Spring Web Flow 3.0 will be using this new unified conversion subsystem as well.

We are now moving on to **Spring 3.0 RC1** which is scheduled for release in June. A major new feature planned for RC1 is support for annotation-based validation: specifically, the *integration of JSR-303 Bean Validation* providers. We are also researching refinements to the start/stop lifecycle in ApplicationContexts and are working on a serializability solution for Spring-managed scoped proxies. Watch this space!

P.S.: We are about to release a completely revised version of the good old **PetClinic sample application**, as a showcase for a modern Spring 3.0 web application, which will be available in a separate distribution. Keith will be blogging about this within the next couple of days.