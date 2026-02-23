---
title: Spring Tools 4 - public beta released
source: https://spring.io/blog/2017/12/04/spring-tools-4-public-beta-released
scraped: 2026-02-23T16:12:42.089Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  December 04, 2017 | 16 Comments
---

# Spring Tools 4 - public beta released

_Releases | Martin Lippert |  December 04, 2017 | 16 Comments_

![spring tools 4](https://github.com/spring-projects/sts4/wiki/images/springtools4-main.png)

Beginning today, we enter a new chapter in the tooling landscape for Spring and the development of enterprise applications built on top of the de-facto standard, Spring Boot. By unveiling the public beta of the next generation of our Spring tooling, we allow developers around the globe to get a preview of what is coming next to improve their developer experience around Spring and Spring Boot.

## [](#spring-aware)Spring Aware

![smart code completion](https://github.com/spring-projects/sts4/wiki/images/screenshot-navigation.png)

The all-new Spring Tools 4 analyze your projects on the fly, understand the Spring constructs inside, and provide easy and super quick navigation to all your Spring elements. Finding a specific request mapping, an exact bean definition, or a newly created function was never as easy as with the new Spring Tools 4.

## [](#information-from-live-running-apps)Information from live-running apps

![in-depth information from live-running applications](https://raw.githubusercontent.com/wiki/spring-projects/sts4/images/screenshot-live-hovers.png)

The all-new Spring Tools 4 introduce a new concept of overlaying your source code with detailed information from live-running Spring Boot apps. As soon as you run your boot app on your machine, additional information from this app with show up directly in your source code editor. That way, you can see (and directly jump to) available request mappings, for example. But the most powerful part here are the detailed wiring reports for your beans. You can see exactly which bean (from which source) got injected into your @Autowired-annotated dependency (for example), and where your bean got injected in your application. This provides a unique insight into the running application directly in your source code. You don’t have to collect that data yourself and find the right lines of code manually. The tooling does that for you automatically.

## [](#ide-agnostic)IDE agnostic

We know that Spring developers love their IDEs and code editors. And we want them to continue to use the tools that they love. Therefore we implemented most parts of the Spring Tools 4 in an IDE-agnostic way. You can use them in:

-   **Eclipse** (or download a ready-to-use distribution of Eclipse, as usual)
-   **Visual Studio Code**
-   **Atom IDE**

And that is just the beginning. We expect more environments to join this party in the future.

## [](#re-built-from-scratch)Re-built from scratch

To realize these all-new Spring Tools 4, we decided to re-write most of the Spring tooling from scratch - with these goals in mind from the beginning:

-   **Let’s be IDE agnostic** - let every developer continue to use the environments they love.
-   **Build for performance right from the start** - we hate to wait for our IDE or editor to finish before we can continue coding. Therefore the Spring Tools 4 are designed to never block the user plus deliver results quickly.
-   **Build for modern Spring technologies** - the tools focus on Spring Boot and annotation-driven Spring app development.

## [](#download)Download

Get the public beta (and more details) from here: [https://spring.io/tools4](https://spring.io/tools4)

## [](#feedback)Feedback

We love feedback. And we love to hear from you. Let us know what you think about the new tools, share your experiences with us, and let us know what you are missing. Feedback is always welcome.

---

## [](#faq)FAQ

### [](#when-will-spring-tools-4-be-ga)When will Spring Tools 4 be GA?

You can go ahead and download the public beta version right now. We will publish updates to the public beta in relatively short cycles. The first official release will go GA in mid 2018.

### [](#what-will-happen-to-the-old-sts-39x-tooling)What will happen to the old STS 3.9.x tooling?

We will continue to ship updates for STS 3.9.x as a full distribution until mid of 2018 and will update the distribution to the upcoming Eclipse Photon (4.8) release. In case you still need important parts of the old tooling in Eclipse that haven't been supported in Spring Tools 4 for Eclipse, you will be able to install those parts as add-on features into the Spring Tools 4 Eclipse distribution and those parts will continue to receive maintenance updates for some time.

### [](#is-this-compatible-with-boot-15-and-boot-20)Is this compatible with Boot 1.5 and Boot 2.0?

Yes, the public beta is already compatible with Spring Boot 1.5.x and Spring Boot 2.0.

### [](#does-spring-tools-4-include-java-language-support)Does Spring Tools 4 include Java language support?

The Spring Tools 4 themselves do not include any specific support for programming in Java, like standard Java code completion, etc. However, we recommend to use existing Java language support for the various environments. The Eclipse-based distribution of the Spring Tools 4 (aka Spring Tool Suite 4) includes the Eclipse Java support. For Visual Studio Code, you should install the Java Extension Pack, which is a combination of the regular Java language tooling (provided from RedHat and Eclipse) and the launching and debugging support for Java for Visual Studio Code (from Microsoft). For Atom, there is also a Java extension around (that is based on the same code as the Java support for Visual Studio Code).

### [](#does-spring-tools-4-support-jdk9)Does Spring Tools 4 support JDK9?

You can run the public beta on a JDK9 JVM and you can use the existing JDK9-ready Java language tooling in Eclipse, Visual Studio Code, and Atom. But the Spring Tools 4 themselves do not support projects that rely on the JDK9 language syntax yet. This will be worked on during the upcoming beta cycles.