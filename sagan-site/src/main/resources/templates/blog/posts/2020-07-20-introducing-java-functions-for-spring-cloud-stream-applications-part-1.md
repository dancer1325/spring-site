---
title: Introducing Java Functions for Spring Cloud Stream Applications - Part 1
source: https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1
scraped: 2026-02-23T13:37:34.287Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | David Turanski |  July 20, 2020 | 1 Comment
---

# Introducing Java Functions for Spring Cloud Stream Applications - Part 1

_Engineering | David Turanski |  July 20, 2020 | 1 Comment_

## [](#introducing-java-functions-for-spring-cloud-stream-applications---part-1)[](#introducing-java-functions-for-spring-cloud-stream-applications-part-1)Introducing Java Functions for Spring Cloud Stream Applications - Part 1

Last week we posted [Introducing Java Functions for Spring Cloud Stream Applications - Part 0](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0)  
to announce the release of Spring Cloud Stream applications 2020.0.0-M2.  
Here, we explore [function composition](https://en.wikipedia.org/wiki/Function_composition_\(computer_science\)), one of the more powerful features enabled by the function oriented architecture presented in Part 0. If you haven’t had a chance to read [Part 0](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0), now would be a great time!

### [](#function-composition)[](#function-composition)Function Composition

Function composition has a solid theoretical foundation in mathematics and computer science.  
In practical terms, it is a way to join a sequence of functions to create a more complex function.

Let’s look at a simple example using Java functions. We have two functions, `reverse` and `upper`.  
Each accepts a String as input and produces a String as output. We can compose them using the built-in `andThen` method. The composite function is itself a `Function<String, String>`.  
If you run this, it will print `ESREVER`.

Function<String, String> reverse = s -> new StringBuilder(s).reverse().toString(); Function<String, String> upper = String::toUpperCase; Function<String, String> reverseUpper = reverse.andThen(upper); System.out.println(reverseUpper.apply("reverse"));

Tip

in addition to `andThen`, [java.util.Function](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html) includes `compose` which first applies the argument (`b`) and then applies `a` to the result.  
Thus, `a.compose(b).apply(s)` is equivalent to `a.apply(b.apply(s))`.

### [](#function-composition-in-spring-cloud-function)[](#function-composition-in-spring-cloud-function)Function Composition in Spring Cloud Function

Spring Cloud Function includes some great features to take [composing functions](https://cloud.spring.io/spring-cloud-function/reference/html/spring-cloud-function.html#_programming_model) to another level.

#### [](#declarative-composition)[](#declarative-composition)Declarative Composition

If we define our functions from the above example as Spring beans,

@Bean Function<String, String> reverse() { return s -> new StringBuilder(s).reverse().toString(); }

@Bean Function<String, String> upper() { return String::toUpperCase;

}

we can compose these functions using the `spring.cloud.function.definition` property `spring.cloud.function.definition=upper|reverse`

Here `|` is a composition operator which results in an auto-configured bean implementing the composite function, along with related resources to let you seamlessly invoke the composite function.

#### [](#composition-with-supplier-and-consumer)[](#composition-with-supplier-and-consumer)Composition With Supplier and Consumer

Spring Cloud Function extends native Java Function composition to support composition with Supplier and Consumer.

This follows from concepts which are implicitly true:

-   A Function composed with a Consumer is a Consumer
    
-   A Supplier composed with a Function is a Supplier
    
-   A Supplier composed with a Consumer is a valid processing model (with no inputs or outputs, this form of composition does not map to a functional interface, but is analogous to [Runnable](https://docs.oracle.com/javase/7/docs/api/java/lang/Runnable.html))
    

As we shall see, Spring Cloud Stream Applications employ these concepts to great effect.

#### [](#type-conversion)[](#type-conversion)Type Conversion

When using function composition, we have to consider compatible argument types.  
Using native Java composition, we can do compose a Function<Integer,String> with a Function<String, Integer> into a Function<Integer, Integer> :

Function<Integer, String> intToStr = String::valueOf; Function<String, Integer> doubleit = i -> Integer.parseInt(i) \* 2; Function<Integer, Integer> composite = intToStr.andThen(doubleit); composite.apply(10);

When running a Spring application, Spring Cloud Function uses Spring’s standard type conversion support to coerce function arguments as needed.  
Given the following Function bean definitions, the function definition intToStr|doubleit works as expected, converting the String to an Integer.

@Bean Function<Integer, Integer> doubleit() { return i -> i \* 2; }

@Bean Function<Integer, String> intToStr() { return String::valueOf;

}

In addition to converting primitives, Spring functions can convert between Message and POJO, JSON String and POJO, and more.  
For example, the following functions can be composed in either order:

@Bean Function<Integer, Integer> doubleit() { return i -> i \* 2; }

@Bean Function<Integer, Message\> convertIntMessage() { return i -> MessageBuilder.withPayload(String.valueOf(i)).build();

}

### [](#function-composition-in-spring-cloud-stream)[](#function-composition-in-spring-cloud-stream)Function Composition in Spring Cloud Stream

Spring Cloud Stream 3.x builds on Spring Cloud Function to fully support a [functional programming model](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/3.0.6.RELEASE/reference/html/spring-cloud-stream.html#_functional_binding_names). The fundamental premise of Spring Cloud Stream is that it enables a function to execute in a distributed environment. The binder binds the input(s) and output(s) of a function packaged in a Spring Boot application, to configured message broker destinations so that the output produced by one function is consumed as the input of another remotely running function. We can think of a data streaming pipeline as just a distributed composition of functional components.

To illustrate this, a typical Spring Cloud Stream pipeline like

source | processor1 | processor2 | processor3 | sink

is logically equivalent to

supplier | function1 | function2 | function3 | sink

This idea leads to some interesting architectural choices since we can use function composition to combine some or all of these components into a single application.

For example we can implement the sequence of three processors as a single application, let’s call it `composed-processor`, packaging `function1`, `function2`, and `function3`,and composed by `spring.cloud.function.definition=function1|function2|function3`. Now the pipeline can be deployed as:

source | composed-processor | sink

Even simpler, we can create a `composed-source` to do all the processing within the source:

composed-source | sink

As always, there is no right answer here. There are always trade-offs to consider:

-   Function composition results in less deployments. This reduces cost, latency, operational complexity, and so on.
    
-   Individual deployments are loosely coupled and can scale independently.
    
-   The message broker provides guaranteed delivery. When a simple stateless application goes down and is restarted, it can continue where it left off, processing the pending results of the previous processing step.
    
-   A single application that performs complex processing is harder to reason about and keeps intermediate processing results in memory, or possibly in an interim data store. When a stateful application fails, it can lead to inconsistent state, making recovery harder.
    

If these trade-offs look familiar, it’s because they are pretty much the same as any microservice vs monolith debate. In the end, do what works best for you.

#### [](#function-composition-with-prepackaged-source-applications)[](#function-composition-with-prepackaged-source-applications)Function Composition with Prepackaged Source Applications

In some cases, function composition is a no-brainer. From the start, we have provided pre-packaged processors to perform simple transformations, or filtering using [SpEL](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#expressions). The legacy architecture required a separate processor when using the prepackaged sources or sinks. A common complaint from users was “why do I need to deploy a separate application just to evaluate a SpEL expression?” To address this, we initially introduced a form of support for [function composition](https://spring.io/blog/2019/01/09/composed-function-support-in-spring-cloud-data-flow) in an earlier release. To use this feature with the prepackaged applications required forking them to modify the code or the build dependencies to provide the functions.

The current release provides function composition out of the box for all of the prepackaged sources. Specifically, a source can now be [composed with prepackaged functions](https://github.com/spring-cloud/stream-applications/blob/master/docs/FunctionComposition.adoc) to perform any of the following locally:

-   execute SpEL transformations
    
-   enrich message headers
    
-   filter events
    
-   produce task launch requests
    

As an example, we can compose the `time` source with a header enricher and filter with configuration properties and run it as a standalone Spring boot application:

java -jar target/time-source-rabbit-3.0.0-SNAPSHOT.jar --spring.cloud.stream.bindings.output.destination=even --spring.cloud.function.definition=timeSupplier|headerEnricherFunction|filterFunction --header.enricher.headers=seconds=T(java.lang.Integer).valueOf(payload .substring(payload.length() - 2)) --filter.function.expression=headers\[seconds\]%2==0

This will publish the time, such as `` `07/16/20 16:43:48 ``, every other second whenever the number of seconds is even, to the configured destination `even`.

Here we are using a prepackaged time source for RabbitMQ, binding the output to a topic exchange named `even`. The binder will create the exchange if it does not exist. The function definition extends the supplier to extract the seconds, convert it to an integer and store it in the `seconds` message header and then filter on the value of the header. Only even values pass the filter.

#### [](#task-launch-requests)[](#task-launch-requests)Task Launch Requests

In 2018, we introduced a reference architecture for running [file ingest](https://tanzu.vmware.com/content/blog/need-24x7-etl-then-move-to-cloud-native-file-ingest-with-spring-cloud-data-flow) with Spring Cloud Data Flow and Spring Batch. To do this, we forked the `sftp` source as `sftp-dataflow`, specifically to implement a prepackaged source that produces task launch requests. The task launch request is a simple value object, rendered as JSON, and consumed by the [tasklauncher-sink](https://github.com/spring-cloud/stream-applications/tree/master/applications/sink/tasklauncher-sink). The sink acts as a client to Data Flow to launch a [batch application](https://dataflow.spring.io/docs/batch-developer-guides/) per the request. We initially chose sftp since it is the most commonly used protocol for file processing. However, we realized that the same pattern can be applied to any source. We now can do this with function composition. Along with the standard [sftp source](https://github.com/spring-cloud/stream-applications/blob/master/applications/source/sftp-source/src/test/java/org/springframework/cloud/stream/app/source/sftp/SftpSourceTests.java#L64) , we can trigger a task launch from `ftp`, `file`, `s3`, and so one. Even the time source can be used to launch a task at regular intervals.

This somewhat contrived example produces task launch requests:

java -jar target/time-source-rabbit-3.0.0-SNAPSHOT.jar --spring.cloud.stream.bindings.output.destination=time-test --spring.cloud.stream.function.definition=timeSupplier|spelFunction|headerEnricherFunction|taskLaunchRequestFunction --spel.function.expression=payload.length() --header.enricher.headers=task-id=payload\*2 --task.launch.request.task-name-expression="'task-'+headers\['task-id'\]

The payload, as JSON, is `{"args":[],"deploymentProps":{},"name":"task-34"}`

#### [](#function-composition-with-user-written-code)[](#function-composition-with-user-written-code)Function composition with user written code

In reality, when users develop a Spring Cloud Stream pipeline, they are likely to select a source and sink from our prepackaged [Spring Cloud Stream Applications](https://github.com/spring-cloud/stream-applications). Processors are typically user-written code, implementing specific business logic. If you are writing a processor, or want to extend a source or sink, any of the [functions](https://github.com/spring-cloud/stream-applications/tree/master/functions) are available to you. Since we publish the functions as separate artifacts, you can simply include them in your dependencies. You can either use declarative composition, as shown above, or you can inject them into your code and invoke them programmatically. Of course, you can easily integrate your own functions as well.

### [](#how-do-i-contribute-a-new-function-or-application)[](#how-do-i-contribute-a-new-function-or-application)How do I contribute a new function or application?

If you cannot find what you are looking for in the existing catalog of functions and applications, please consider contributing. This way, the entire open source community will benefit. In a subsequent post, we will walk through a real-world example of developing a function and stream application.

We encourage the community to get involved with this project. In addition to code contributions, we really appreciate documentation improvements and creating issues.

### [](#stay-tuned)[](#stay-tuned)Stay tuned…​

This blog is the second in a series that will cover many related topics. Look for more deep dives and focused topics in the coming weeks. We will take you through the entire landscape of components included in this repository and surrounding processes.