---
title: Spring Tools 4 GA released
source: https://spring.io/blog/2018/09/25/spring-tools-4-ga-released
scraped: 2026-02-23T15:12:43.241Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  September 25, 2018 | 28 Comments
---

# Spring Tools 4 GA released

_Releases | Martin Lippert |  September 25, 2018 | 28 Comments_

![spring tools 4](https://github.com/spring-projects/sts4/wiki/images/sts4-big.gif)

After a decade of rolling out updates and improvements to the famous Spring Tool Suite and the Spring IDE components for Eclipse, a new era of Spring tooling starts today and we welcome you to the all-new [Spring Tools 4](https://spring.io/tools). After an intensive period of public betas, we are happy to announce the first official release today.

Spring Tools 4 is a completely new set of tools for working with Spring projects in your favorite IDEs and editors. They are re-built from scratch with the goal in mind to provide the best support for implementing enterprise-grade applications based on Spring and Spring Boot across development environments and lightweight editors. They provide a unique editor-centric experience for working with Spring projects, ranging from smart and Spring-aware content-assist to a unique new way of connecting your source code with and enriching it with detailed information and insights from your running Spring Boot applications. This puts your source code editor side-by-side with your running boot applications.

## [](#spring-aware)Spring Aware

The all-new Spring Tools 4 analyze your projects on the fly, understand the Spring constructs inside, and provide easy and super quick navigation to all your Spring elements. Finding a specific request mapping, an exact bean definition, or a newly created function was never as easy as with the new Spring Tools 4.

![smart code completion](https://github.com/spring-projects/sts4/wiki/images/screenshot-navigation.png)

## [](#information-from-live-running-apps)Information from live-running apps

The all-new Spring Tools 4 introduces a new concept of overlaying your source code with detailed information from live-running Spring Boot apps. As soon as you run your boot app on your machine, additional information from this app will show up directly in your source code editor. The most powerful part here are the detailed wiring reports for your beans. You can see exactly which bean (from which source) got injected into your @Autowired-annotated dependency (for example), and where your bean got injected in your application. This provides a unique insight into the running application directly in your source code. You don’t have to collect that data yourself and find the right lines of code manually. The tooling does that for you automatically. And going one step further, you can get that information from remote Spring Boot apps too. This allows you to see bean wirings of cloud-deployed Spring applications directly in your source code editor.

![live hover screenshot](https://github.com/spring-projects/sts4/wiki/images/screenshot-live-hovers.png)

## [](#ide-agnostic)IDE agnostic

We know that Spring developers love their IDEs and code editors. And we want them to continue to use the tools that they love. Therefore we implemented most parts of the Spring Tools 4 in an IDE-agnostic way. You can use them in:

-   Eclipse ([https://www.eclipse.org/downloads](https://www.eclipse.org/downloads) or the STS4 distribution from [https://spring.io/tools](https://spring.io/tools))
-   Visual Studio Code ([https://code.visualstudio.com](https://code.visualstudio.com))
-   Atom IDE ([https://ide.atom.io](https://ide.atom.io))

And that is just the beginning. We expect more environments to join this party in the future.

## [](#re-built-from-scratch)Re-built from scratch

To realize these all-new Spring Tools 4, we decided to re-write most of the Spring tooling from scratch - with these goals in mind from the beginning:

-   Let’s be IDE agnostic - let every developer continue to use the environments they love.
-   Build for performance right from the start - we hate to wait for our IDE or editor to finish before we can continue coding. Therefore the Spring Tools 4 are designed to never block the user plus deliver results quickly.
-   Build for modern Spring technologies - the tools focus on Spring Boot and annotation-driven Spring app development.

## [](#continuous-updates)Continuous Updates

Moving forward, the Spring Tools 4 will receive continuous updates with bug fixes as well as new and improved features. Those updates will appear as updates automatically in your installation across all environments. The Eclipse-based distribution will also be updated continuously, even across Eclipse platform versions, so you will always be on the latest and greatest.

## [](#download)Download

-   Download the release from here: [https://spring.io/tools](https://spring.io/tools)
-   Installation instructions: [https://github.com/spring-projects/sts4/wiki/Installation](https://github.com/spring-projects/sts4/wiki/Installation)
-   To learn more, take a look at the user guide here: [https://github.com/spring-projects/sts4/wiki/User-Guide](https://github.com/spring-projects/sts4/wiki/User-Guide)

## [](#watch-spring-tools-4-in-action)Watch Spring Tools 4 in Action

Josh Long recorded a new and comprehensive "Getting Started with Spring Boot and Spring Tools 4" video, showing Spring Tools 4 for Eclipse in action. Take a look:

## [](#faq)FAQ

### [](#what-will-happen-to-the-old-sts-39x-tooling)What will happen to the old STS 3.9.x tooling?

We will continue to ship updates for STS 3.9.x as a full distribution until mid of 2019 and will update the distribution to the upcoming Eclipse releases (2018-09, 2018-12, and beyond). In case you still need important parts of the old tooling in Eclipse that haven’t been supported in Spring Tools 4 for Eclipse, you will be able to install those parts as add-on features into the Spring Tools 4 Eclipse distribution and those parts will continue to receive maintenance updates until mid of 2019. After mid of 2019, the old STS 3.9.x tooling will receive no maintenance updates anymore.

### [](#are-the-spring-tools-4-ready-for-boot-21-and-spring-framework-51)Are the Spring Tools 4 ready for Boot 2.1 and Spring Framework 5.1?

Yes, the Spring Tools 4 are ready for usage with various Spring Boot versions (including 1.5.x, 2.0.x and 2.1.x) as well as the latest Spring Framework versions (including 4.x and 5.x).

### [](#do-the-spring-tools-4-include-java-language-support)Do the Spring Tools 4 include Java language support?

The ready-to-use Spring Tools 4 distribution on top of Eclipse includes the standard Java language tooling of Eclipse out-of-the-box. For Visual Studio Code, you should install the Java Extension Pack, which is a combination of the regular Java language tooling (provided from RedHat and Eclipse) and the launching, testing, and debugging support for Java for Visual Studio Code (from Microsoft). For Atom, there is also a Java extension around (that is based on the same code as the Java support for Visual Studio Code).

### [](#do-the-spring-tools-4-support-jdk9-jdk10-jdk11)Do the Spring Tools 4 support JDK9, JDK10, JDK11?

Yes. You can use JDK 8/9/10/11 to run your Spring Tools 4. Language support for Java within your projects however is limited to JDK 8/9/10. Full language support for JDK11 will arrive with a future update soon.

### [](#do-the-spring-tools-4-support-lombok)Do the Spring Tools 4 support Lombok?

Yes, you can use Lombok in your projects when using the Spring Tools 4 in the various environments.

### [](#can-i-install-and-use-spring-tools-4-in-intellij-idea)Can I install and use Spring Tools 4 in IntelliJ IDEA?

No. We implemented a prototype to integrate the Spring Tools 4 with IntelliJ IDEA, but the third-party support for the language server protocol for IntelliJ isn’t mature, stable, and feature-rich enough to implement a meaningful version of the Spring Tools 4 for IntelliJ yet. However, there is awesome support for Spring available out-of-the-box in the IntelliJ Ultimate Edition that you can use instead if you prefer IntelliJ.

### [](#which-other-ides-and-editors-will-be-supported-in-the-future)Which other IDEs and editors will be supported in the future?

We don’t have exact plans yet, but we constantly monitoring the language server community for new and emerging clients and environments that might be good candidates for the Spring Tools 4. Eclipse Theia is one of the projects we are taking into account at the moment, for example.