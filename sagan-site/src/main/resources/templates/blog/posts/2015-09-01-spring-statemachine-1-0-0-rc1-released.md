---
title: Spring Statemachine 1.0.0.RC1 Released
source: https://spring.io/blog/2015/09/01/spring-statemachine-1-0-0-rc1-released
scraped: 2026-02-23T19:43:42.910Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  September 01, 2015 | 2 Comments
---

# Spring Statemachine 1.0.0.RC1 Released

_Releases | Janne Valkealahti |  September 01, 2015 | 2 Comments_

We’re pleased to announce a first release candicate of [Spring Statemachine](http://projects.spring.io/spring-statemachine/) 1.0.0.RC1.

Focus of this release is to get core framework more stable and finally add jepsen tests for a distributed state machine. We also added a first version of a testing support. Resolved github tickets can be found from [RC1 issues](https://github.com/spring-projects/spring-statemachine/issues?q=milestone%3A1.0.0.RC1+is%3Aclosed). We're relatively close to issue a release version, meaning if nothing major pop-up, next release will be a `1.0.0.RELEASE`. If something urgent turns up we will do `1.0.0.RC2` prior to a release.

Now that we're here, let's crack it and see what new features we have in this release.

Beyond usual bug fixes here is a list of main new features:

-   Testing support
-   Jepsen tests for a Distributed State Machine

#Testing support Testing a state machine is not easiest task to accomplish and thus we're introcuding new `spring-statemachine-test` module which will ease a process of making unit tests for a Spring Statemachine. Due to dependencies it's not used in a core system but what comes for a `recipes` and a `Zookeeper` integration it is already used to test those modules.

Testing a simple state machine in a tests will look simple as:

```
CopyStateMachine<String, String> machine = buildMachine();
StateMachineTestPlan<String, String> plan =
  StateMachineTestPlanBuilder.<String, String>builder()
    .defaultAwaitTime(2)
    .stateMachine(machine)
    .step()
      .expectStates("SI")
      .and()
    .step()
      .sendEvent("E1")
      .expectStateChanged(1)
      .expectStates("S1")
      .and()
    .build();
plan.test();

```

if having a state machine defined as:

```
CopyStateMachine<String, String> buildMachine()
    throws Exception {
  StateMachineBuilder.Builder<String, String> builder =
    StateMachineBuilder.builder();

  builder.configureConfiguration()
    .withConfiguration()
      .taskExecutor(new SyncTaskExecutor())
      .autoStartup(true);

  builder.configureStates()
    .withStates()
      .initial("SI")
      .state("S1");

  builder.configureTransitions()
    .withExternal()
      .source("SI").target("S1")
      .event("E1");

   return builder.build();
}
```

#Jepsen tests

Our support for using distributed states with a Zookeeker turned out to be relatively difficult to test with a normal set of unit tests and thus we hit a wall with a test coverage. I'd like to use this moment to tell something about testing distributed systems with jepsen.

[Jepsen](https://github.com/aphyr/jepsen) testing framework by Kyle Kingsbury (aka [@aphyr](https://twitter.com/aphyr)) is a system what can be used to test distibuted systems and have a features like synchronizing events sent into a nodes and causing a brain splits on a network. Jepsen will be a core of our system to make sure that our distributed support will do what it it supposed to do. This is a first class system to test Spring Distributed Statemachine backed by a `Zookeeper`.

There's going to be a separate blog post for this but preliminary results can be found from our reference docs [Distributed State Machine Technical Paper](http://docs.spring.io/spring-statemachine/docs/1.0.0.RC1/reference/htmlsingle/#appendices-zookeeper). Stay stuned about that blog post!

In here we take a peek from our jepsen tests to show what happens when a cluster suffers a split which is causing a zookeeper ensemble to totally break and what happes when a network is break and healed.

![Zookeeper Sample](http://docs.spring.io/spring-statemachine/docs/1.0.0.RC1/reference/htmlsingle/images/sm-tech-partition-half-2.png)

In above graph we have a 5 node cluster sharing a same state machine configuration backed by a `Zookeeper` ensemble where each node is connecting to its own local instance. First an event `C` is sent into all machines(only one will handle a distributed state change) which will initiate distributed transition from state `S21` into `S211`. Network is then break and graph is showing how each machine eventually will end up into an error state. When network and `Zookeeper` ensemble is later healed, all machines will re-join an ensemble and sync their states. Finally event `K` is send, again to all machines, to show that all machines are working properly after network problems has been healed.

As mentioned in our documentation, if existing zookeer leader is kept in minority all instances are disconnected from ensemble, thus causing all state machines to enter into an error state. This situation is then resolved automatically later when network is healed and zookeeper emsemble fixes itself and state machines connected to it can reset their own states.

#SpringOne 2GX 2015 is around the corner!

Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.