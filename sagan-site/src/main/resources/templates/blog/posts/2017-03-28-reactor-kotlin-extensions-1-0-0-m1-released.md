---
title: Reactor Kotlin Extensions 1.0.0.M1 released
source: https://spring.io/blog/2017/03/28/reactor-kotlin-extensions-1-0-0-m1-released
scraped: 2026-02-23T16:35:48.073Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Sébastien Deleuze |  March 28, 2017 | 2 Comments
---

# Reactor Kotlin Extensions 1.0.0.M1 released

_Releases | Sébastien Deleuze |  March 28, 2017 | 2 Comments_

**Update: Kotlin is now [natively supported by `reactor-core` and `reactor-test`](https://github.com/reactor/reactor-core/commit/5140235171ddd84a83c761a6868aa55fa2036fbd) without requiring any additional extensions.**

I am excited to announce the release of the first milestone of [Reactor Kotlin Extensions](https://github.com/reactor/reactor-kotlin-extensions), which provides Kotlin extensions for Reactor API.

It provides support for Kotlin types like `KClass`, takes advantage of Kotlin [reified type parameters](http://kotlinlang.org/docs/reference/inline-functions.html#reified-type-parameters) and provide various extensions to allow more expressive code. You can see bellow a quick comparaison of Reactor with Java versus Reactor with Kotlin + extensions.

Java

Kotlin with extensions

`Mono.just("foo")`

`"foo".toMono()`

`Flux.fromIterable(list)`

`list.toFlux()`

`Mono.error(new RuntimeException())`

`RuntimeException().toMono()`

`Flux.error(new RuntimeException())`

`RuntimeException().toFlux()`

`flux.ofType(Foo.class)`

`flux.ofType<Foo>()` or `flux.ofType(Foo::class)`

`StepVerifier.create(flux).verifyComplete()`

`flux.test().verifyComplete()`

To use it in your project, add `https://repo.spring.io/milestone` repository and `io.projectreactor:reactor-kotlin-extensions:1.0.0.M1` dependency.

This is the very first milestone, so feel free to create issues and submit pull requests on [reactor-kotlin-extensions](https://github.com/reactor/reactor-kotlin-extensions) GitHub project.