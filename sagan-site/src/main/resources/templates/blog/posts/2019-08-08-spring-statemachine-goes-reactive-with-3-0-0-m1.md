---
title: Spring Statemachine Goes Reactive with 3.0.0.M1
source: https://spring.io/blog/2019/08/08/spring-statemachine-goes-reactive-with-3-0-0-m1
scraped: 2026-02-23T14:39:50.559Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  August 08, 2019 | 2 Comments
---

# Spring Statemachine Goes Reactive with 3.0.0.M1

_Releases | Janne Valkealahti |  August 08, 2019 | 2 Comments_

I’m pleased to announce a first milestone release of a [Spring Statemachine](https://projects.spring.io/spring-statemachine) 3.0.0.M1 and with these words I can say that Statemachine is going reactive.

Statemachine itself would not need to be reactive for its own execution but as soon as machine steps outside of its controlled environment to execute user defined logic like Actions and Guards there is no guarantees that those features would not block.

Those using persisting features with a databases will benefit with reactive changes when that side of a world becomes more reactive. Essentially every time we need to take a step outside from a machine world we may hit blocking IO operations.

2.x line will be there for foreseeable future where 3.x will benefit from new changes. It really depends on a users how much new features are added to 2.x line.

In a 2.x machine execution is fully based on Spring `TaskExecutor` API. These executions takes machines from one state to the other. Along this execution various user level Actions are executed when states are entered or exited. Guards can be used to guard various transition paths and we don’t have no control what these do. `TaskScheduler` API is mostly used with triggering timers and executing Actions while being on a state.

As everything were based on `TaskExecutor` and `TaskScheduler` user were able to just switch these to something else to provide more parallel execution and scheduling which are usually needed when dealing with statemachine regions which needs to do execution in a parallel manner. All this made an internal threading model relatively complex and hours has been spent to track various race condition over the years.

Now that everyting is literally based on a Reactor and what it can do, this internal threading model has become much more reliable. We really don’t need to use locking anymore as Reactor will give us guarantees that its own flow execution simply works.

We have a new methods to interact reactively by using `Mono` and `Flux` of messages. Returned `Flux` then have more richer results what happened with a particular event. For example from a returned `StateMachineEventResult` it’s possible to check if event was accepted or deferred and which region handled it.

```
CopyFlux<StateMachineEventResult<S, E>> sendEvent(Mono<Message<E>> event);
Flux<StateMachineEventResult<S, E>> sendEvents(Flux<Message<E>> events);
```

While in the old deprecated api you used something like:

```
Copyboolean accepted = machine.sendEvent("EVENT");
```

Now nothing happens until you subscribe into returned Flux of `StateMachineEventResult`.

```
CopyMessage<String> event = MessageBuilder.withPayload("EVENT").build();

machine.sendEvent(Mono.just(event))
  .doOnComplete(() -> {
    System.out.println("Event handling complete");
  })
  .subscribe();
```

Same story continues with actions which is just a `Function` taking `StateContext` and returning a `Mono`.

```
Copypublic interface ReactiveAction<S, E>
  extends Function<StateContext<S, E>, Mono<Void>> {}
```

Same with guard expect you need to return a `Boolean` with a `Mono`.

```
Copypublic interface ReactiveGuard<S, E>
  extends Function<StateContext<S, E>, Mono<Boolean>> {}
```

Now is a good time to try it out and provide feedback for next milestones. I’d like to thank all the community contributions as some of the refactorings were relatively labour intensive.