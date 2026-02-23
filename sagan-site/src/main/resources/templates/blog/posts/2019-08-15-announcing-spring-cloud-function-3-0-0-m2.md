---
title: Announcing Spring Cloud Function 3.0.0.M2
source: https://spring.io/blog/2019/08/15/announcing-spring-cloud-function-3-0-0-m2
scraped: 2026-02-23T14:38:50.962Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  August 15, 2019 | 0 Comments
---

# Announcing Spring Cloud Function 3.0.0.M2

_Engineering | Oleg Zhurakousky |  August 15, 2019 | 0 Comments_

We are pleased to announce the second Milestone of the Spring Cloud Function 3.0.0.M2.

> NOTE: Spring Cloud Function 3.0.0.M1 was primarily to establish compatibility with Spring Boot 2.2.x. and therefore went unannounced.

Spring Cloud Function 3.0.0.M2 modules are available for use in the [Spring Milestone](https://repo.spring.io/libs-milestone-local/org/springframework/cloud/) repository.

### [](#quick-highlights)Quick highlights:

-   Spring Boot 2.2.x
-   Enhanced deployer (requires a separate blog)

### [](#notable-features-and-enhancements)Notable features and enhancements:

##### [](#function-arity-multiple-inputsoutputs)Function arity (multiple inputs/outputs)

One of the biggest features introduced with this milestone is support for functions with multiple inputs and outputs. Important thing to point out is that this feature only makes sense in reactive world where you may want to pass several streams to a function for purposes of doing some type of aggregate/merge operation on such streams. For conventional cases you can always send multiple arguments using a Collection of some type.

To represent multiple inputs/outputs in *the type safe way* to benefit from type conversion and other features mentioned earlier, we’ve chosen `Tuple` library from [project reactor](https://projectreactor.io/docs/core/release/api/index.html?reactor/util/function/Tuples.html), given that spring-cloud-function had it as a dependency at its core from its inception. However, in the future we also intend to support types like `BiFunction` as well as POJO-style functions if we can determine the arity and types of inputs and outputs through some type of convention.

While the feature is new and in the process of being enhanced, it’s already being utilised by few internal projects and you can try it as well. Here is an example:

Assume the following function:

```java
Copy@Bean
public Function<Tuple2<Flux<String>, Flux<Integer>>, Flux<?>[]> repeater() {
  return tuple -> {
    Flux<String> stringFlux = tuple.getT1();
    Flux<Integer> integerFlux = tuple.getT2();

    Flux<Integer> sharedIntFlux = integerFlux.publish().autoConnect(2);

    Flux<String> repeated = stringFlux
      .zipWith(sharedIntFlux)
      .flatMap(t -> 
            Flux.fromIterable(Collections.nCopies(t.getT2(), t.getT1())));

    Flux<Integer> sum = sharedIntFlux
	.buffer(3, 1)
	.map(l -> l.stream().mapToInt(Integer::intValue).sum());

    return new Flux[] { repeated, sum };
  };
}
```

You can invoke it as such:

```java
CopyFunction<Tuple2<Flux<String>, Flux<Integer>>, Flux<?>[]> repeater = catalog.lookup("repeater");
Flux<String> stringStream = Flux.just("one", "two", "three");
Flux<Integer> intStream = Flux.just(3, 2, 1);
Flux<?>[] result = repeater.apply(Tuples.of(stringStream, intStream));
result[0].subscribe(System.out::println);
result[1].subscribe(System.out::println);
```

There will be a separate blog on this subject in the future.

##### [](#choice-of-programming-styles---reactive-imperative)Choice of programming styles - reactive, imperative

As before, functions could be implemented in imperative or reactive style via [project reactor](https://projectreactor.io/). However, in the previous versions we would *always* apply reactive transformation on functions implemented using imperative style. For example, `Function<Foo, Foo>` would become `Function<Flux<Foo>, Flux<Foo>>`. With this release, this is no longer the case. Functions implemented in the imperative way could be looked up and invoked *as is* (imperative) or as *reactive*. For example, let's assume the following configuration:

```java
Copy@Bean
public Function<String, String> uppercase() {
	return v -> v.toUpperCase();
}
```

You can access this function as it is written:

```java
CopyFunction<String, String> function = functionCatalog.lookup("uppercase");
```

or as reactive equivalent:

```java
CopyFunction<Flux<String>, Flux<String>> reactiveFunction = functionCatalog.lookup("uppercase");
```

Spring Cloud Function will automatically adapt.

##### [](#transparent-type-conversion-of-inputs-and-outputs)Transparent type conversion of inputs and outputs.

One of the new features that comes with this milestone is transparent type conversion at the function core, so while some of it was already present in the web adapter, it is now available at the level of function invocation allowing any type of function consumers (not just web) to benefit from it. One of the primary benefits of this feature is realised when composing functions (for more on this later). For example, assume the following functions: `Function<Foo, Foo> foo()` and `Function<Bar, Bar> bar()` composed as `foo|bar`. While it would not work in the previous versions given type incompatibility between output of one and input of another, it is supported now providing the appropriate *conversion strategies* are available. Such *conversion strategies* are standard Spring's `ConversionService` and `MessageConverters`. And while we're still in the process of refining this feature and providing detailed documentation, the `ConversionService` and `MessageConverters` that work for most cases (e.g., JSON) are already initialised by default.

For example, assume the following function configuration:

```java
Copy@Bean
public Function<Person, Person> uppercasePerson() {
  return person -> {
    return new Person(person.getName().toUpperCase(), person.getId());
  };
}
```

To benefit from `MessageConverters` we can invoke this function as `Function<Message<String>, Person>` (or byte\[\] as a payload) thus employing the available JSON `MessageConverter` to convert `String` to `Person` (see below).

```java
CopyFunction<Message<String>, Person> uppercasePerson = catalog.lookup("uppercasePerson");
Person person =  uppercasePerson.apply(MessageBuilder.withPayload("{\"name\":\"bill\",\"id\":2}").build()); 
```

Keep in mind that for functions written using reactive style nothing changes and the same *conversion strategies* are applied.

##### [](#function-composition-and-adaptation)Function composition and adaptation;

While function composition is not a new feature to Spring Cloud Function, it was refined with this milestone.

As before, you can compose functions via "|" or ",” characters.

As an additional benefit you can compose functions with different programming styles (e.g., reactive and imperative), you can compose *Supplier* with *Function*, *Supplier* with *Consumer*, *Function* with *Consumer* etc., - we will adapt. You can compose functions where output of the producer function does not match the input of the consumer function - we will convert. There will be a separate blog on this subject in the future and we're also in the process of refining documentation.

#### [](#next-steps)Next Steps

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-function) or [GitHub](https://github.com/spring-cloud/spring-cloud-function/) .