---
title: Spring Dependency Injection & Java 5 (including slides and code)
source: https://spring.io/blog/2008/03/18/spring-dependency-injection-java-5-including-slides-and-code
scraped: 2026-02-24T09:20:07.437Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  March 18, 2008 | 0 Comments
---

# Spring Dependency Injection & Java 5 (including slides and code)

_Engineering | Alef Arendsen |  March 18, 2008 | 0 Comments_

I'm writing this as I'm on my way to Cairo. We're flying just West of Italy and I have clear view on the Italian coast line, with its blue waters and waves gently moving towards shore. It must be nice down there now. I'm heading to Cairo for a meeting of the [Egyptian User Group](http://www.egjug.org), organized by Ahmed Hashim, who no doubt will have done an excellent job, I'm sure of that. I'll be presenting on Spring with the theme this time being Dependency Injection, type safety and Java 5. Yesterday (March 14th that is), I did almost the same presentation at the [Profict](http://www.profict.nl) Wintercamp in Loenen, NL for an audience of 60 of 70 I think.

Lately there has been a lot of talk about type safety, Spring and other dependency injection approaches. Way too often, I found people referring to Spring as having dependency injection features that are not type safe and even worse, people that were referring to Spring as having a dependency on XML . As I can't keep looking out the airplane window for ever (well, I probably can, but it's not that useful), I figured I'd write a little blog entry on the current status of dependency injection with Spring and Java 5.

With the addition of features in Spring 2.5 and also with Spring's sub project JavaConfig the type safety argument and the argument that Spring is tied to XML is simply not true anymore. While in the past, we've *always said* that Spring was not coupled to XML, surely the only viable option of expression your configuration details *was XML*. But since Spring 2.5, this is no longer a theoretical argument; there is a practicably usable option for configuring your dependencies using plain Java.

#### Spring @Autowired support

Spring 2.5 itself provides annotation-based dependency injection, where hints are giving to the Spring container where to inject dependencies using @Autowired annotations and @Qualifier annotations (or any other custom annotation for that matter). I will not cover the entire mechanism here. Instead, I'll highlight the blog entries and articles that cover the @Autowired approach:

-   [Introducing the Spring Framework 2.5](http://www.theserverside.com/tt/articles/article.tss?l=IntrotoSpring25) by Rod Johnson
-   [Spring 2.5's Comprehensive Annotation Support](http://blog.springsource.com/main/2008/01/28/spring-25s-comprehensive-annotation-support/) by Juergen Hoeller
-   [Customizing Annotation Configuration and Component Detection in Spring 2.5](http://blog.springsource.com/main/2007/05/29/customizing-annotation-configuration-and-component-detection-in-spring-21/) by Mark Fisher

#### Spring JavaConfig

In addition to the @Autowired support, Spring JavaConfig provides a entirely new approach to dependency injection. Plenty of blog entries have been talking about JavaConfig already, so I won't fully explain it here again. I got several questions recently about the status of JavaConfig. We haven't published any milestones for this project in a while. This certainly not without reason. Although the model already works quite well, we are still not done fleshing out some of the details. We want to release something we're 100% happy with and right now, it's simply not done yet. Keep an eye on the [JavaConfig project page](http://www.springframework.org/javaconfig) and this blog. A new milestone release is just around the corner.

The JavaConfig approach is highlighted in more detail in various blog entries as well:

-   [Spring Java Configuration Moving Ahead](http://blog.springsource.com/main/2007/11/04/spring-java-configuration-moving-ahead/) by Rod Johnson
-   [A Java Configuration Option for Spring](http://blog.springsource.com/main/2006/11/28/a-java-configuration-option-for-spring/) by Rod Johnson
-   [More on Java Configuration](http://blog.springsource.com/main/2007/06/05/more-on-java-configuration/) by Costin Leau
-   [Guice vs Spring JavaConfig: A Comparison of DI styles](http://www.jroller.com/habuma/entry/guice_vs_spring_javaconfig_a) by Craig Walls
-   [Spring: Prototype Scope, Lookup Methods and JavaConfig](http://www.jroller.com/Solomon/entry/spring_prototype_scope_lookup_methods) by Solomon Duskis
-   [IoC and Modularization - Spring, OSGi, Guice and more](http://www.jroller.com/Solomon/entry/ioc_and_modularization_spring_osgi) by Solomon Duskis
-   [Spring Configuration Annotations](http://www.jroller.com/Solomon/entry/spring_configuration_annotations) by Solomon Duskis

As I've also said in the sessions in Loenen and in Cairo, Spring JavaConfig is not yet done. There are still a few details to be fleshed to create a smooth DI language that supports all the features that the XML-based DI language also has. This is where (if you like) you can help us a lot. Try Spring JavaConfig and tell us what you think!

#### Conclusion

One other quite important point I tried to get across in my presentation yesterday and that's the idea of the Spring container as a dependency injection platform, with various DI flavors implemented on top of it. The first flavor, has existed for 5 years already (the XML-based approach). The second has also been around for quite a while already and now provides the basis for the EJB3 SessionBean functionality inside BEA WebLogic version 10 (and is also available in the public domain under the name Pitchfork). The last flavor that we released is the @Autowired flavor and next up is JavaConfig. Having the platform is what counts for us. It'll help us get you an nice experience with full backwards-compatibility, whether you're using JavaConfig, @Autowired or our XML-based approach (or, all at the same time for that matter).

#### A word on the source code and slides

In the slides you will see I've included an image of a Ford Model T. The analogy that I always use when describing Dependency Injection is a car assembly line. Without the car assembly line (according to Wikipedia), Ford could produce 11 Model Ts per month. With the assembly line one Model T took only 93 minutes. A standardized process of assembling parts (that do not know how they are going to be assembled) into a working car is very beneficial. In my opinion, having an approach that does not touch your main-line logic is important. JavaConfig offers this.

The code is attached as well. There is a dependency on the JTA API (the demo uses Hibernate), which is not installed in the Maven Repository. Lucio Benfante [has blogged about solving this problem](http://www.jugpadova.it/articles/2005/11/26/maven-2-spring-and-jta-depencies) (installing the JTA API in your local repository).

After you've installed the JTA API, run the CarPlantIntegrationTests in the com.carplant.plant package and read the comment for the class. This explains how to enable JavaConfig, Autowire config and the XML config (JavaConfig has been enabled by default).

-   The source code: [carplant.zip](http://blog.springsource.com/main/wp-content/uploads/2008/03/carplant.zip)
-   The slides: [di\_with\_spring.pdf](http://blog.springsource.com/main/wp-content/uploads/2008/03/di_with_spring.pdf)

\[update\] added one more resource on JavaConfig