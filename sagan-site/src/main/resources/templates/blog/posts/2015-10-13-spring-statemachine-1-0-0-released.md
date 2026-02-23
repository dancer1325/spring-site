---
title: Spring Statemachine 1.0.0 Released
source: https://spring.io/blog/2015/10/13/spring-statemachine-1-0-0-released
scraped: 2026-02-23T19:40:09.624Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  October 13, 2015 | 0 Comments
---

# Spring Statemachine 1.0.0 Released

_Releases | Janne Valkealahti |  October 13, 2015 | 0 Comments_

We’re pleased to announce a release of [Spring Statemachine 1.0.0](http://projects.spring.io/spring-statemachine). I'd like to start by saying thank you for all who contributed in any way to make this happen. Artifacts are available either from [Maven Central](http://repo1.maven.org/maven2/org/springframework/statemachine/) or from [Spring Repository](http://repo.spring.io/libs-release/org/springframework/statemachine/).

What we actually got into this first release:

-   Easy to use flat one level state machine for simple use cases.
-   Hierarchical state machine structure to ease complex state configuration.
-   State machine regions to provide even more complex state configurations.
-   Usage of triggers, transitions, guards and actions.
-   Type safe configuration adapter.
-   Builder pattern for easy instantiation for use outside of Spring Application context
-   Recipes for usual use cases
-   Distributed state machine based on a Zookeeper
-   State machine event listeners.
-   Spring IOC integration to associate beans with a state machine.

Lets take a quick recap how this project was born and how it evolved from first github import into a release. This also gives a little background how a new spring project is born or might be born. Project was kicked off at early parts of this year from a base work done for [Spring Hadoop](http://projects.spring.io/spring-hadoop/).

For SpringOne 2014 which were held at Dallas we were pushing a new container grouping feature into a Spring YARN which added a more high level functionality atop of YARN containers. These days [YARN runtime for Spring XD](http://docs.spring.io/spring-xd/docs/1.2.1.RELEASE/reference/html/#running-on-YARN) and new [Spring Cloud Dataflow YARN deployer](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.M1/reference/html/getting-started-deploying-spring-cloud-dataflow.html#_deploying_on_yarn) are based on that. Communication with a Hadoop YARN resource manager is asynchronous by its nature so I ended up having a lot of trouble by trying to implement this specific part of a codebase without using a proper state machine concepts. Believe me when I say that I tried, tried really hard not to use a proper states and after a week or so I had to face a reality and face a fact that I tried to out-code my own code. I kinda ended up having something which marginally worked but if I touched any parts of that code hell broke loose. I rm'd everything and said to myself, "goddammit Janne, I need a state machine".

After I completed a base implementation of a state machine, literally all my problems vanished, simply because a state machine was now controlling all the logic which had to happen in a specific order while all communication towards a YARN resource manager still happened asynchronously. And yes, now that we've stepped into a release phase, it gives us an option to replace Spring YARN internal state machine with this release.

Idea was born that it would probably be a really good idea to fork this specific state machine code into its own project, enhance it a little and fire up a new Spring Project and see if it gets any traction. If being honest I was a little surprised how much interest it got with this tech which is more than 50 years old. Good and solid concepts just don't die nor they need to die!

Few words about a challenges I faced during this journey getting from an idea into a release:

-   Simple state machine without nested states and implementation hooks(i.e listeners) is very easy to implement.
-   Introducing a deep nested states is where things gets a little complicated especially when you throw in various other features like entry/exit actions, different transition types and guards. I faced a lot of trouble with transitions between sub-states which had a different parent state.
-   Adding orthogonal regions makes things even more complicated simply because in theory a state machine is single threaded but regions are independent and can be executed parallel. Lot of work went in to have base support for executing regions independently.
-   Distributed state machine based on a zookeeper(via SPI abstraction) was a little crazy thing to do. Some would not even try it and testing is a nightmare(cannot be done via simple unit tests). I used `Aphyr's` [Jepsen](http://jepsen.io/) framework for this which, if mildly speaking, put things is pieces, but eventually allowed me to find all sort of bugs when you step out from a single JVM and start to work with a distributed JVM's. This was a painful but interesting journey.

Many people have asked if we have a roadmap? Short answer is yes and no. Yes because we definitely have a lot of stuff we want to implement and no because project has been driven by requests from a community. I started to follow [UML state machine spec](https://en.wikipedia.org/wiki/UML_state_machine) for base features but eventually about 50% of extra features were requested by users. UML spec if very vague for some of its specification features and leaves a lot of details into the implentation itself. If you want something, speak up and go to [GitHub Issues](https://github.com/spring-projects/spring-statemachine/issues). Want to contribute, PR something(even a simple fix for a typo is very much appreciated!).

What we know so far:

-   Version 1.0.x will not add any new features which would change core concepts, but will continue to add normal maintenance/bug fixes. We may add new features which will enhance existing concepts.
-   Version 1.1.x will focus on topics like security and execution model. We're looking to have an easy integration with `Spring Security`, `Spring Session` to secure state machine actions. For execution we're looking to replace or give an shot for [Reactor](http://projectreactor.io) in favor of normal Framework task scheduling/execution.
-   Version 2.x(in foreseeable future) will raise baseline with Spring Framework 5 and JDK8. 1.x serie will keep baseline with Spring Framework 4 and JDK7.

Try it, feel it, sniff it, and let us know what you think!