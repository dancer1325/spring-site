---
title: Spring Cloud Function 3.2 is out!
source: https://spring.io/blog/2021/12/02/spring-cloud-function-3-2-is-out
scraped: 2026-02-23T13:02:06.898Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  December 02, 2021 | 1 Comment
---

# Spring Cloud Function 3.2 is out!

_Engineering | Oleg Zhurakousky |  December 02, 2021 | 1 Comment_

Spring Cloud [2021.0.0 is finally out](https://spring.io/blog/2021/12/02/spring-cloud-2021-0-0-codename-jubilee-has-been-released) and with it you have Spring Cloud Function 3.2

While the full list of features, enhancements and bug fixes is available [here](https://github.com/spring-cloud/spring-cloud-function/milestone/37?closed=1), I’d like to call out few of them in this post and provide some details.

## [](#grpc-support)gRPC Support

In addition to an already existing support for invoking function via [AWS Lambda](https://docs.spring.io/spring-cloud-function/docs/3.2.1/reference/html/aws.html), [RSocket](https://github.com/spring-cloud/spring-cloud-function/tree/main/spring-cloud-function-rsocket), [Spring Cloud Stream](https://docs.spring.io/spring-cloud-stream/docs/3.2.1/reference/html/) etc., Spring Cloud Function now allows you to invoke function via [gRPC](https://grpc.io/). Two ways to benefit from it.

#### [](#spring-message)*Spring Message*

Given the wide adaption of *Spring Messaging*, one way of benefiting from gRPC support is by embracing Spring's `Message`. Spring Cloud Function provides `GrpcSpringMessage` schema modeled after Spring's [Message](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/messaging/Message.html). It is internally converted to Spring Message to benefit from all of the existing support for *Spring Messaging*.

```java
Copymessage GrpcSpringMessage {
    bytes payload = 1;
    map<string, string> headers = 2;
}
```

It also defines a `MessagingService` exposing four interaction models you can chose

```java
Copyservice MessagingService {
    rpc biStream(stream GrpcSpringMessage) returns (stream GrpcSpringMessage);
    
    rpc clientStream(stream GrpcSpringMessage) returns (GrpcSpringMessage);
    
    rpc serverStream(GrpcSpringMessage) returns (stream GrpcSpringMessage);
    
    rpc requestReply(GrpcSpringMessage) returns (GrpcSpringMessage);
}
```

Both of these allow you to generate required stubs to support true plolyglot nature of gRPC while interacting with functions hosted by Spring Application Context.

Here is a quick example

Providing you have `spring-cloud-function-grpc` on the classpath, here is your simplest application context configuration

```java
Copy@Configuration
public static class SampleConfiguration {
    public static void main(String[] args) {
       SpringApplication.run(SampleConfiguration.class, args);
    }     
    @Bean
    public Function<String, String> uppercase() {
        return v -> v.toUpperCase();
    }
}
```

*(Note how nothing in the code above is even remotely related to gRPC, just a standard Spring-Boot app with function bean - the true value of Spring Cloud Function)*

And an example of one of the way you can invoke it via gRPC

```java
CopyMessage<byte[]> message = MessageBuilder.withPayload("\"hello gRPC\"".getBytes())
            .setHeader("foo", "bar")
            .build();
Message<byte[]> reply = GrpcUtils.requestReply(message);
```

#### [](#protobuf-extensions)*Protobuf Extensions*

While the core data object and its corresponding schema are modeled after Spring `Message` and can represent virtually any object, there are times when you may want to plug-in your own schema and protobuf services. Spring Cloud Function supports it by allowing you to develop your own protobuf extensions. Such extension is just another spring-boot project that has dependency on `spring-cloud-function-grpc` and must provide `protoc` generated artifacts including implementation of `io.grpc.BindableService` and implementation of `MessageConverter` for your message schema. Spring Cloud Function will take care of the rest. In fact we provide one such extension for [CloudEvents](https://github.com/spring-cloud/spring-cloud-function/tree/main/spring-cloud-function-adapters/spring-cloud-function-grpc-cloudevent-ext) out of the box already.

More details are available [here](https://github.com/spring-cloud/spring-cloud-function/tree/main/spring-cloud-function-adapters/spring-cloud-function-grpc)

## [](#enhanced-cloudevents-support)Enhanced CloudEvents Support

Speaking of CloudEvents. . . In version 3.1 we've introduces support for [CloudEvents](https://cloudevents.io/) and you can read [part-1](https://spring.io/blog/2020/12/10/cloud-events-and-spring-part-1) and [part-2](https://spring.io/blog/2020/12/10/cloud-events-and-spring-part-1) of the blog posts on the subject. This release contains some additional enhancements and bug fixes as well as support for `io.cloudevents.CloudEvent` type via integration with CloudEvents Java SDK. And to combine gRPC and CloudEvents we also provide a [dedicated example](https://github.com/spring-cloud/spring-cloud-function/tree/main/spring-cloud-function-samples/function-sample-grpc-cloudevent) demonstrating CloudEvents interaction over gRPC.

## [](#actuator-endpoint-into-functioncatalog)Actuator endpoint into FunctionCatalog

By now you should be all familiar with `FunctionCatalog` as one of the core components of Spring Cloud Function. But until now the only way of interacting with it was via direct reference. With this release we've exposed actuator endpoint that allows you to access it via `http://<host>:<port>/actuator/functions` url. For example, after [enabling](https://docs.spring.io/spring-cloud-function/docs/3.2.1/reference/html/spring-cloud-function.html#function_visualization) `functions` endpoint you can:

```
Copycurl http://localhost:8080/actuator/functions
```

. . .to see the output displaying the contents of your `FunctionCatalog` and should look something like this:

```text
Copy{"charCounter":
	{"type":"FUNCTION","input-type":"string","output-type":"integer"},
 "logger":
 	{"type":"CONSUMER","input-type":"string"},
 "functionRouter":
 	{"type":"FUNCTION","input-type":"object","output-type":"object"},
 "words":
 	{"type":"SUPPLIER","output-type":"string"}. . .
```

## [](#aws---api-gateway-v2-improved-custom-runtime-and-support-for-native-images)AWS - API Gateway v2, improved Custom Runtime and support for Native images

#### [](#api-gateway-v2)API Gateway v2

Some of the users of Spring Cloud Function AWS integration already know that in 3.1.x we've migrated to a single AWS *handler* model via `org.springframework.cloud.function.adapter.aws.FunctionInvoker` to supports multiple AWS events. The main benefit of this approach is that you no longer need to provide a minimal implementation of AWS Handler (e.g., `RequestHandler` or `RequestStreamHandler` etc). All you need to do is implement your function as you would normally do and specify `org.springframework.cloud.function.adapter.aws.FunctionInvoker` as handler when deploying it to AWS (see [Getting Started](https://docs.spring.io/spring-cloud-function/docs/3.2.1/reference/html/aws.html#_getting_started) for more details). But *multiple* does not imply *all* and with this release we've added support for few more events, specifically `APIGatewayV2HTTPEvent` and `APIGatewayV2HTTPResponse`.

#### [](#aws-custom-runtime)AWS Custom Runtime

Although mainly internal and not visible to the end user, it is worth mentioning about the additional improvements that were made to an already existing support of [AWS Custom Runtime](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html) which now relies on framework provided event loop.

#### [](#spring-native)Spring Native

And last but not least there were multiple improvements to support [Spring Native](https://github.com/spring-projects-experimental/spring-native) initiative and with that we are pleased to be able to show case couple of AWS examples ([here](https://github.com/spring-projects-experimental/spring-native/tree/main/samples/cloud-function-aws) and [here](https://github.com/spring-projects-experimental/spring-native/tree/main/samples/cloud-function-netty)) that you can easily compile into native images and deploy to AWS and see significant performance improvements. For more details on AWS and Spring Native you can watch this [Spring One presentation](https://springone.io/2021/sessions/spring-cloud-function).

Questions - [https://stackoverflow.com/questions/tagged/spring-cloud-function](https://stackoverflow.com/questions/tagged/spring-cloud-function) Issue Tracker - [https://github.com/spring-cloud/spring-cloud-function/issues](https://github.com/spring-cloud/spring-cloud-function/issues)