---
title: Sneak peek at Reactor-Core 3.2 with Milestone 1
source: https://spring.io/blog/2018/01/16/sneak-peek-at-reactor-core-3-2-with-milestone-1
scraped: 2026-02-23T16:11:26.667Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Simon Baslé |  January 16, 2018 | 2 Comments
---

# Sneak peek at Reactor-Core 3.2 with Milestone 1

_Releases | Simon Baslé |  January 16, 2018 | 2 Comments_

Greetings Reactive Spring community!

While the team is still working heavily on the 3.1 line, we also wanted to give the community a chance to get a sneak peek at what’s coming for the future 3.2 line.

In particular, the big goodie slated for 3.2.0.RELEASE is the addition of what we’ve been calling "error mode", "continue mode" or lately more officially "error strategy".

# [](#the-idea)[](#the-idea)The idea

It is simple, really: what if exceptions in user code that get executed within operators could be recovered from, allowing the sequence to *continue*?

Let’s take an example, and imagine you have the following method:

```
Copypublic Flux<Integer> divide100By(Flux<Integer> dividers) {
  return dividers.map(div -> 100 / div);
}
```

In case the `dividers` source emits `0` at some point, the resulting `Flux` would immediately terminate with an `onError` signal of an `ArithmeticException`.

If the source happens to be, say, `Flux.range(0, 10)`, there’s still 9 perfectly valid values that could have been mapped.

How could you make it so that such a transient exception (and only that exception) gets ignored, and give a chance to further valid values to get processed?

# [](#the-current-workaround)[](#the-current-workaround)The current workaround

In Reactor 3.1, there’s a workaround that you can apply by using `flatMap` to create an inner sequence for each element, in turn applying error-recovery operators to these granular sequences:

```
Copypublic Flux<Integer> divide100By(Flux<Integer> dividers) {
  return dividers.flatMap(div -> (1)
      Mono.just(100 / div) (2)
          .doOnError(e -> { (3)
              if (e instanceof ArithmeticException) process(e); (4)
          })
          .onErrorResume(ArithmeticException.class, e -> Mono.empty()) (5)
      );
}
```

1.  Instead of `map` we use `flatMap`, generating a small inner `Mono` for each value
    
2.  That `Mono` is basically the old `map` operation…​
    
3.  …​with error recovery added.
    
4.  First we make sure to process (eg. log) `ArithmeticException` (and only these) before "recovery"
    
5.  Then we use `onErrorResume` with a `Mono.empty()` to effectively ignore the exception in the resulting sequence
    

This works, but it is a bit of a pain to write (although `compose` and `transform` could help mutualize that sort of code). But also, we moved from a single `map` operator to a `flatMap` with several inner operators.

`flatMap` has more overhead than a `map`, due to the need to coordinate multiple sources. Even though things like operator fusion diminish that cost, it is still there.

## [](#introducing-error-strategy)[](#introducing-error-strategy)Introducing Error Strategy

The difficulty if we want to further reduce the overhead of such a processing is that we now have to work at the level of each operator’s implementation.

Each operator in a chain must somehow be made aware that exceptions should be caught but not propagated through `onError`, but rather processed differently. This is quite a big change, and it is transverse!

Note how this conceptually sound like a `filter`, but for errors. Like a `filter` this implies that an operator that continues processing its source after one of its `onNext` threw an exception should also request at least one more element from its source.

Even though it can be isolated to a special execution path, this is still a complex core implementation change to operators.

And then there’s the question of the API: it would be really tedious to put in place as a constructor parameter, or an additional overload in `Flux` with an "error recovery" boolean…​ Do we really need to double the number of methods in the `Flux` API to support that feature?

Fortunately not: since 3.1 we have the `Context`, which is a good mean of propagating such information to every (Reactor) operator in a chain.

So that’s the road we took for the error strategy feature:

-   support is only added to **specific operators** (`map`, `filter`, `flatMap`, `handle` to name a few…​). These have a special javadoc tag to document that fact.
    
-   the feature is activated for a given `Flux` by putting a special key in its `Context`
    
-   each supported operator has a special path in its `onNext` implementation that checks for that key and, if found, will change its way of handling errors.
    
-   the feature is exposed to the user via the `errorStrategyContinue()` API
    
-   it can be a little more granular: one can filter which exceptions can be recovered from, and also set a custom handler for such recovered exceptions.
    

Important

One thing to keep in mind is that, since this is activated via the `Context`, the feature follows the same propagation rules as `Context`. For instance, it will activate on inner sequences in a `flatMap`. If that is not desirable, use `errorStrategyStop()` inside the flatMap to go back to default behavior (this won’t escape the scope of the flatMap). **It also propagates backwards, activating on the operators that precede `errorStrategyXXX`**.

Here is what our previous example becomes with error strategy:

```
Copypublic Flux<Integer> divide100By(Flux<Integer> dividers) {
  return dividers.map(div -> 100 / div) (1)
      .errorStrategyContinue(ArithmeticException.class, (2)
          (error, value) -> process(error)); (3)
}
```

1.  Back to a simple `map`
    
2.  We only recover from `ArithmeticException`
    
3.  We pass such exceptions to our in-house handler (note we also have access to the original value that caused the exception, if any)
    

# [](#testing-it-out-with-milestone-1)[](#testing-it-out-with-milestone-1)Testing it out with Milestone 1

We just released a `3.2.0.M1` milestone\[[1](#_footnote_1 "View footnote.")\] that mainly contains the error strategy feature, and we’d like you to test it ?

Note

This is such a transverse change that even if you don’t plan on using it, it would be valuable to run your tests with the artifact, to validate that if you don’t explicitly use `errorStrategyContinue()`, you shouldn’t see any change in behavior (as the feature is contained within specific execution path).

**In order to get the milestone** add the [`repo.spring.io/milestone`](http://repo.spring.io/milestone/io/projectreactor/reactor-core/3.2.0.M1/) repository to your Maven or Gradle build configuration and fetch the `reactor-core` `3.2.0.M1` artifact:

```
Copy<dependency>
  <groupId>io.projectreactor</groupId>
  <artifactId>reactor-core</artifactId>
  <version>3.2.0.M1</version>
</dependency>
```

For that feature’s API in particular, nothing is set in stone yet. So please let us know if you have any feedback by opening an [issue on GitHub](https://github.com/reactor/reactor-core/issues/new) or come and discuss the feature on [Gitter](https://gitter.im/reactor/reactor).

**In the meantime, happy coding!**

---

[1](#_footnoteref_1). PS: This milestone was released early, while 3.1.3.RELEASE was still under development, so please note that it doesn’t contain all the fixes in 3.1.3 and subsequent 3.1.x releases.