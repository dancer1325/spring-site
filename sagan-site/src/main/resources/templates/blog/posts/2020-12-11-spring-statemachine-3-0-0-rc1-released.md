---
title: Spring Statemachine 3.0.0-RC1 Released
source: https://spring.io/blog/2020/12/11/spring-statemachine-3-0-0-rc1-released
scraped: 2026-02-23T13:38:31.442Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  December 11, 2020 | 1 Comment
---

# Spring Statemachine 3.0.0-RC1 Released

_Releases | Janne Valkealahti |  December 11, 2020 | 1 Comment_

Yes, we're going reactive!

On behalf of the team and everyone that contributed, I am pleased to announce that the first release candidate of Spring Statemachine 3.0.0 has been released and is available from [our milestone repository](https://repo.spring.io/milestone/).

Highlights of this release include:

-   Relevant api's working with statemachine now have reactive methods.
-   From a functional point of view this release is equivalent what's in `2.2.x`, `2.3.x` and `2.4.x` branches apart from reactive changes.
-   We've chosen to align with recently released Spring Boot 2.4.1.

Internally everything is basically working atop of reactive concepts while we still keep old style methods around for blocking world. Plan is to see if and when it's possible to phase out from a blocking world. Now few words about new api's.

With good ol' blocking world you simple send an event and statemachine returns a boolean flag if event is accepted.

```java
CopyStateMachine<String, String> stateMachine;

boolean accepted = stateMachine.sendEvent("event1");
```

One slightly annoying thing were that you couldn't differentiate between cases where event were accepted(event caused a transition), denied(interceptor error or no possible transition) or deferred(in case machine config used deferred events). We chose to enrich what gets returned from event handling methods.

```java
CopyStateMachine<String, String> stateMachine;

Mono<StateMachineEventResult<String, String>> result = stateMachine
  .sendEvent(Mono.just(MessageBuilder.withPayload("event1").build()));

result.subscribe();
```

Firstly, one obvious thing as you probably guessed if being familiar with Reactor is that nothing happens until you subscribe to a returned `Mono`, secondly returned type within `Mono` is a `StateMachineEventResult` which contains more info about what happened with an event handling.

What about `Flux`, well simply pass in a flux and get a flux and handle it whatever you can do in a Reactor!

```java
CopyStateMachine<String, String> stateMachine;

Message<String> message1 = MessageBuilder.withPayload("event1").build();
Message<String> message2 = MessageBuilder.withPayload("event2").build();

Flux<StateMachineEventResult<String, String>> results = stateMachine
  .sendEvents(Flux.just(message1, message2));

results.subscribe();
```

What about actions as your main work with a statemachine happens there? Original blocking signature is:

```java
Copypublic interface Action<S, E> {
  void execute(StateContext<S, E> context);
}
```

New `ReactiveAction` is simply a java's `Function` with types `StateContext<S, E>` and `Mono<Void>`:

```java
Copypublic interface ReactiveAction<S, E>
  extends Function<StateContext<S, E>, Mono<Void>> {}
```

Which translates to

```java
Copyclass MyAction implements ReactiveAction<String, String> {
  @Override
  public Mono<Void> apply(StateContext<String, String> context) {
      return Mono.empty();
  }
}
```

With configuration:

```java
Copy@Configuration
@EnableStateMachine
public class StateMachineConfig extends StateMachineConfigurerAdapter<String, String> {

  @Override
  public void configure(StateMachineStateConfigurer<String, String> states)
      throws Exception {
    states
      .withStates()
      .initial("state1")
      .state("state2");
  }

  @Override
  public void configure(StateMachineTransitionConfigurer<String, String> transitions)
      throws Exception {
    transitions
      .withExternal()
        .source("state1").target("state2")
        .actionFunction(context -> Mono.fromRunnable(() -> {
          System.out.println("HI");
        }));
  }
}
```

Or *action* as `Function` definition in a normal way:

```java
CopyFunction<StateContext<String, String>, Mono<Void>> action =
  context -> Mono.empty();
```

[Project Page](https://spring.io/projects/spring-statemachine) | [GitHub](https://github.com/spring-projects/spring-statemachine) | [Issues](https://github.com/spring-projects/spring-statemachine/issues) | [Documentation](https://docs.spring.io/spring-statemachine/docs/3.0.0-RC1/reference/)