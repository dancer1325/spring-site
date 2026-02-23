---
title: Introducing Spring Cloud Function
source: https://spring.io/blog/2017/07/05/introducing-spring-cloud-function
scraped: 2026-02-23T16:27:41.879Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  July 05, 2017 | 11 Comments
---

# Introducing Spring Cloud Function

_Engineering | Mark Fisher |  July 05, 2017 | 11 Comments_

[Spring Cloud Function](https://github.com/spring-cloud/spring-cloud-function) is a new project with the following high-level goals:

-   Promote the implementation of business logic via functions.
-   Decouple the development lifecycle of business logic from any specific runtime target so that the same code can run as a web endpoint, a stream processor, or a task.
-   Support a uniform programming model across serverless providers, as well as the ability to run standalone (locally or in a PaaS).
-   Enable Spring Boot features (auto-configuration, dependency injection, metrics) on serverless providers.

Just as Spring has always promoted a plain old java object (POJO) based programming model, Spring Cloud Function promotes a programming model based on plain old functions. By that we mean the core interfaces defined in the `java.util.function` package: `Function`, `Consumer`, and `Supplier`.

Implementations of those types can be registered as beans either explicitly or implicitly via classpath scanning enabled by `@FunctionScan`. The parameter and/or return types can optionally use Reactor’s `Flux`, which is a Reactive Streams `Publisher`. That enables interoperability with other Reactive Streams components, even those that are based on other implementations, such as RxJava 2, and it brings reactive features such as non-blocking IO and back-pressure to this processing model (for more information see [Project Reactor](http://projectreactor.io)). Whenever the parameter and/or return types are not `Flux`, Spring Cloud Function wraps them so that functions can interoperate via `Flux`. For simple item-at-a-time processing use-cases, you can keep it simple:

```
Copypublic class Greeter implements Function<String, String> {
  public String apply(String name) {
    return "Hello " + name;
  }
}
```

But if you need to implement functions that handle a dataset as the unit of processing, via windowing or reduce operations, you can use `Flux` types:

```
Copypublic static class WordCount
    implements Function<Flux<String>, Flux<Map<String, Integer>>> {
  public Flux<Map<String, Integer>> apply(Flux<String> phrases) {
    return phrases.window(3)
      .flatMap(f -> f.flatMap(phrase -> Flux.fromArray(phrase.split("\\W")))
      .reduce(new HashMap<String, Integer>(),
        (map, word) -> { map.merge(word, 1, Integer::sum); return map; }));
  }
}
```

Relying on function types also makes it easy to compose functionality, such as:

```
CopytwistAndShout = twist.andThen(shout);
```

Of course, functions can also be defined using lambdas, such as:

```
CopyFunction<String, String> shout =  s -> s.toUpperCase() + “!”;
```

In fact Spring Cloud Function has support for compiling String based lambdas into function instances dynamically. This can be especially useful when prototyping or adding some trivial transformation logic, as the Spring Expression Language is commonly used today.

You may be asking why it’s necessary for Spring to promote this model, since you can easily create `Function`, `Consumer`, and `Supplier` instances anyways. It shouldn’t be much of a surprise to learn that the answer involves Inversion of Control. Over the years, everything from basic dependency injection to Spring’s ubiquitous use of the template pattern have been described by the Hollywood Principle: “don’t call us, we’ll call you”. The `Flux`\-adapting mentioned above is actually an example of Inversion of Control, but an even more important one is the decoupling of business logic from deployment profile. The business logic in this case refers to functions, while the deployment profile could be a REST app, stream processing app, or finite task. Spring Cloud Function provides a JAR for each of those types, and in each case an auto-configured [FunctionCatalog](https://github.com/spring-cloud/spring-cloud-function/blob/master/spring-cloud-function-core/src/main/java/org/springframework/cloud/function/registry/FunctionCatalog.java) is used to locate the `Functions`, `Consumers`, and `Suppliers` within the `ApplicationContext`.

For example to deploy the `Greeter` function shown above as a REST endpoint only requires adding the “spring-cloud-function-web” dependency, as can be seen in this [POM](https://github.com/markfisher/spring-cloud-function-blog-samples/blob/master/greeter/pom.xml). That also includes the Spring Boot Maven plugin so that the build produces an executable JAR:

```
Copy./mvnw clean install
java -jar greeter/target/greeter-0.0.1-SNAPSHOT.jar
```

That can then be invoked using curl:

```
Copy$ curl -H "Content-Type: text/plain" :8080/greeter -d World
Hello World
```

Likewise, to deploy a function as a stream-processor, only requires adding the “spring-cloud-function-stream” dependency that in turn builds upon Spring Cloud Stream. Just as Spring Cloud Stream provides a [Binder abstraction](http://docs.spring.io/spring-cloud-stream/docs/current/reference/htmlsingle/#_binders) that eliminates the need to define Channel Adapters, Spring Cloud Function eliminates the need to declare components like Service Activators, Transformers, or even the `@StreamListener`\-annotated methods to which Spring Cloud Stream delegates. The “spring-cloud-function-stream” JAR itself provides all of that. It’s yet another case of taking Inversion of Control to another level.

In part 2 of this blog series, we will provide examples of how `Suppliers`, `Functions`, and `Consumers` can be used within the next version of Spring Cloud Data Flow. The basic idea is that whenever you need to provide some custom logic, you could just implement simple functions. It’s the perfect example of an opinionated model where not only should you not need to provide the boilerplate, but it’s better for the framework to handle it anyways. For example, you would be able to register just functions - either inline or packaged as JARs (instead of Spring Cloud Stream apps) and then refer to those in the DSL while relying on Spring Cloud Data Flow to wrap them for you:

`mySupplier | myFunction | myConsumer`

The deployment profiles even extend into the realm of Serverless (a.k.a. Functions-as-a-Service) providers, such as AWS Lambda and Apache OpenWhisk (as well as Azure Functions and Google Cloud Functions once they provide support for Java). In part 3 of this blog series, we will dive into more details on that topic, but for now you can peruse the docs for the [AWS Lambda adapter](https://github.com/spring-cloud/spring-cloud-function/tree/master/spring-cloud-function-adapters/spring-cloud-function-adapter-aws) and the [Apache OpenWhisk adapter](https://github.com/spring-cloud/spring-cloud-function/tree/master/spring-cloud-function-adapters/spring-cloud-function-adapter-openwhisk). The upcoming blog will also cover integration with Kubernetes-based Serverless frameworks such as [Fission](http://fission.io).

Beyond the role of decoupling business logic and infrastructure, the various deployment profile JARs and FaaS adapters promote portability. A developer can implement a function in complete isolation, including unit tests that only concern themselves with the input and output parameters. That function can then be packaged with the dependency that allows it to run in the target environment, ranging from a standalone REST app to Spring Cloud Data Flow or a FaaS provider.

That brings us to the final point of this introductory blog. The term “Serverless” generates a lot of backlash, and is almost always followed by the explanation: “of course there are still servers, but you don’t have to think about them.” So while we’ll resist introducing the term “Frameworkless”, the same concept can indeed apply to the framework. In the Spring Cloud Data Flow example above, the function developer doesn’t need to think about the framework, and doesn’t even need to produce artifacts that have any framework code in their dependencies. The same idea would apply to the FaaS adapters. We’re basically pushing Inversion of Control to the point where we can twist the Hollywood Principle into: “don’t depend on us, we’ll depend on you”. That might not go over well in Hollywood, but for developers it means you can just write a function, package it in a JAR, and register it for use with the various endpoints or adapters. As always Spring is following the principle stated eloquently by Alan Kay: “Simple things should be simple. Complex things should be possible.” In upcoming blog posts, we’ll dive into some of the more complex things that are possible thanks to Spring Cloud Function, but we’ll never lose sight of keeping simple things simple.

Stay tuned!