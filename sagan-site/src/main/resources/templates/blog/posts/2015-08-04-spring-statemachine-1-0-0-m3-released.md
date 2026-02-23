---
title: Spring Statemachine 1.0.0.M3 Released
source: https://spring.io/blog/2015/08/04/spring-statemachine-1-0-0-m3-released
scraped: 2026-02-23T19:45:18.017Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Janne Valkealahti |  August 04, 2015 | 4 Comments
---

# Spring Statemachine 1.0.0.M3 Released

_Engineering | Janne Valkealahti |  August 04, 2015 | 4 Comments_

We’re pleased to announce a third milestone release of [Spring Statemachine](http://projects.spring.io/spring-statemachine/) 1.0.0.M3.

A lot has happened since a previous milestone and getting here took a bit more time we originally estimated. Now that we're here, let's crack it and see what new features we have in this release.

Beyond usual bug fixes here is a list of main new features:

-   Distributed state machine
-   Persisting state machine context
-   Relax use of enums as states and events
-   Programmatic instantiation of state machines
-   New recipe modules
-   New samples (persist, zookeeper, web)

#Distributed state machine

`Distributed state` is a new exciting feature which is meant to span state machine concepts through a jvm's boundaries. Let's think about this a second, if there is a state machine running on a single jvm, wouldn't it be nice if a state change on one jvm could automatically fire a state change on other participating state machines on a different jvm's.

Naturally a concept of a distributed state is relatively complex topic and thus in this milestone release we provide this feature as a techinical preview to get a change to play and experience with it.

We do have a new abstraction how arbitrary state machine and jmv can join into a distributed state machine ensemble order to orchestrate state changes externally from a local state machine. First implementation of this abstraction is based on a [Zookeeper](http://zookeeper.apache.org/). We have two samples around this topic, `zookeeper` and `web` samples.

We have a relatively nice sample on top of this and you can read more about it either from our [reference docs](http://docs.spring.io/spring-statemachine/docs/1.0.0.M3/reference/htmlsingle/#statemachine-examples-web) or later in this blog post.

![Web Sample](http://docs.spring.io/spring-statemachine/docs/1.0.0.M3/reference/htmlsingle/images/sm-dist-n1-4.png)

#Persist state machine

Persisting a state machine context was requested by a community order to ease concepts of how a simple state machine instance can be i.e. used to update tables in a database. Essentially this feature is also used in a `distributed state machine` but also allows a user to reset a `state machine` state in order to work with arbitrary repository updates without having a need to build a new state machine instance for every action. The problem in building a new state machine instance is that instantiation is a relatively heavy operation so able to reset a state machine is much more lightwave operation.

Also, around this feature, we have a new `interceptor` feature which allows user to communicate to external systems and i.e. stop a state transition logic if something cannot be persisted into an external storage.

#Builder patters for building state machines

While using enums as state and event types is a nice concept because it gives you a compile time guarantee of possible combinations, it limits you to compile time exactly. You would not have any change to build a state machine where states and events are build dynamically.

We relaxed requirement of using `enums` and it is now possible to use `strings` as states and events. This requirement was also one of a multiple requests from a community and probably one of a best feature requests.

Now that we are able to step away from enums, it opened up an interesting chance to implement a real `builder pattern` which allows to build state machine instances on demand. We still use same familiar interfaces from the annotation config model, but instead of setting things up at compile time, everything can be build dynamically on demand.

Simplified example of this shown below where transitions are not configured:

```java
CopyStateMachine<String, String> buildMachine() throws Exception {
  Builder<String, String> builder = StateMachineBuilder.builder();
  builder.configureStates()
    .withStates()
      .initial("SI")
      .end("SF")
      .states(new HashSet<String>(Arrays.asList("S1","S2","S3","S4")));
  return builder.build();
}
```

#Recipes

In some Spring projects we're starting to use a concept of a `recipe`. Recipe concept is familiar from a [Zookeeper](http://zookeeper.apache.org/) and [Curator](http://curator.apache.org/) where correct usa of a base system might have fealt a little difficult. People had similar uses cases and copypasting code became a usual manner and these usual use cases were transferred into recipes.

We're simply taking this same concept into a `Spring Statemachine` by starting to add recipes for common use cases. First two recipes are `tasks` and `persist`.

You can find more info about these from a [reference documentation](http://docs.spring.io/spring-statemachine/docs/1.0.0.M3/reference/htmlsingle).

#Samples

Samples are always the bread and butter to understand how things are used. We have three new samples, `zookeeper` and `web` which are samples for a distributed state machine, `persist` is a sample showing how an arbitrary database change can be handled via a state machine.

Web sample is a little more complicated example what it really needs be because we added an UI layer which is using JS fronted and communicates with backend server over websockets to notify state machine state changes. State machine is running inside a `Spring Boot` app and UI is updated automatically from changes in a state machine.

Where do we go from here? Currently we're expecting this release to be a last milestone and next release should be a first release candicate. We are mostly feature complete and in terms of adding new big features we're going to step into a code freeze. Topics of getting into a RC phase is to fix more bugs, getting core as stable as possible, and especially getting distributed states feature stable.

#SpringOne 2GX 2015 is around the corner!

Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). Super Early Bird Price expires June 12th! It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.