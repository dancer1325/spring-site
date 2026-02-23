---
title: Cloud Events and Spring - part 2
source: https://spring.io/blog/2020/12/23/cloud-events-and-spring-part-2
scraped: 2026-02-23T13:36:24.225Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  December 23, 2020 | 3 Comments
---

# Cloud Events and Spring - part 2

_Engineering | Oleg Zhurakousky |  December 23, 2020 | 3 Comments_

### [](#introduction)Introduction

We begin with a quick summary of the [previous post](https://spring.io/blog/2020/12/10/cloud-events-and-spring-part-1).

-   [Message](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html) is an adequate structure and abstraction with which to consume data that represents a Cloud Event in the context of Spring. We hope it was clear.
-   In Spring, our commitment to isolate functional versus non-functional concerns lets us address non-functional aspects (such as send, receive, retry, connect, convert, and others) at the framework level, letting you (mostly) concentrate on actual business logic and letting you keep your code simple and pluggable to a variety of *execution contexts* (more on this later).

### [](#the-business-problem)The Business Problem

As promised, this post is more technical, as it covers concrete examples available for you to try. So, without further ado, we begin by describing the three use cases that we will cover. Actually the use case is the same, but the execution context varies:

***"Receive data that represents a person to be hired, producing an employee record."***

The three different variations are in the execution context (an example of a typical non-functional concerns):

-   *HTTP request/response*
-   *From AMQP to Apache Kafka*
-   *From RSocket to Apache Kafka.*

Neither the use case nor the execution contexts are really new or unique. In Spring, we've been handling them for decades, with thousands of applications running in production. So, would anything change by adding Cloud Event context? In other words, would anything change if incoming and outgoing data represents a Cloud Event? These are the questions we are attempting to answer in this post.

The user code for these examples is:

```java
Copy@SpringBootApplication
public static class SampleApplication
  public static void main(String[] args) throws Exception {
    SpringApplication.run(SampleApplication.class, args);
  }

  @Bean
  public Function<Person, Employee> hire() {
    return person -> {
	Employee employee = new Employee(person);
	return employee;
    };
  }
}
```

Yes, it is kind of boring, since it does not show any of the non-functional aspects, as they are handled by the frameworks specific to the execution context. We also kept implementation details of the functions rather trivial, since they have no relevance to the topic. The framework does not really care what you do. It cares only about what you expect – *input* – and what you produce – *output* – and that information is available from the signature.

#### [](#use-case-1-over-http)Use Case 1 (over HTTP)

The full source code for this example is available [in the Spring Cloud Function samples](https://github.com/spring-cloud/spring-cloud-function/tree/master/spring-cloud-function-samples/function-sample-cloudevent). In it, we send a Cloud Event as an HTTP request and expect to receive a Cloud Event as an HTTP response. This means that, somehow, our `hire()` function needs to become an HTTP endpoint. We can do this by using the [Spring Cloud Function](https://spring.io/projects/spring-cloud-function) framework. By adding its `spring-cloud-function-web` dependency, we add Spring Boot auto-configurations and components necessary to turn our function into an HTTP endpoint. Configuration options and defaults are out of scope for this post, but you can get them from the relevant section of the [Spring Cloud Function documentation](https://docs.spring.io/spring-cloud-function/docs/3.1.0-M5/reference/html/spring-cloud-function.html#_standalone_web_applications). The important thing is that, based on such defaults, the name of the function becomes part of the URL path running on `localhost` port `8080`, resulting in the `http://localhost:8080/hire` endpoint.

Now you can start the application and post to it. Once the application is running, you can `curl` it with the following command:

```bash
Copycurl -w'\n' localhost:8080/hire \
 -H "Content-Type: application/json" \
 -d '{"firstName":"John", "lastName":"Doe"}' -i
```

You should receive the following response:

```json
Copy. . .
{"person":{"firstName":"John","lastName":"Doe"},"id":172,"message":"Employee 172 was hired on 17-12-2020"}
```

*Well. . . . This really had nothing to do with Cloud Events! Right...?*

Correct, but the capabilities of the framework to expose a function as a REST endpoint, to take care of type conversion, invocation, and other non-functional aspects are clear and have direct relevance to Cloud Events. Read on. . .

At the center of such enablement is [Message](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/messaging/Message.html) - a structure and a type that lets an incoming HTTP (or any other) request take on a canonical form so that other frameworks can deal with its contents in uniformed way, regardless of its origin or destination.

*But wait, what about Cloud Events?*

Let's turn this HTTP request into a Cloud Event by adding HTTP headers that represent the required Cloud Event attributes. Note that these headers are prefixed with a `ce-` prefix required by the [HTTP Protocol Binding](https://github.com/cloudevents/spec/blob/v1.0.1/http-protocol-binding.md) part of the Cloud Event specification.

```bash
Copycurl -w'\n' localhost:8080/hire \
 -H "ce-id: 0001" \
 -H "ce-specversion: 1.0" \
 -H "ce-type: hire" \
 -H "ce-source: spring.io/spring-event" \
 -H "Content-Type: application/json" \
 -d '{"firstName":"John", "lastName":"Doe"}' -i
```

After executing it, you will not see any difference. Your function acts the same way, and you receive the same response.

That is, of course, until you look and analyze the response headers, which now contain the required Cloud Event attributes (albeit different than the ones in the request):

```text
Copyce-source: http://spring.io/cloudevent
ce-specversion: 1.0
ce-type: sample
ce-id: 76208faf-f8e5-4267-9028-bb4392d66765
message-type: cloudevent
timestamp: 1608211771624
Content-Type: application/json
Transfer-Encoding: chunked
Date: Thu, 17 Dec 2020 13:29:31 GMT
{"person":{"firstName":"John","lastName":"Doe"},"id":171,"message":"Employee 171 was hired on 17-12-2020"}
```

*But how?*

This is the part where, once again, we remind you of our commitment to outsource non-functional aspects to the frameworks, as this is one of them. So, by default (established by the framework) we assume that, if a request were a Cloud Event, the response is expected to be a Cloud Event as well. You can also see that the four required Cloud Event attributes have values that were also generated by following certain default rules established by the framework. The `specversion` defaults to `1.0`, the `type` to the type name of the returned object, the `id` to the generated `UUID` (to provide a reasonably safe expectation of uniqueness), and the `source` to `http://spring.io/`.

*But I don't like default values. I want my own and I want to add additional attributes?*

As we mentioned in the [previous post](https://spring.io/blog/2020/12/10/cloud-events-and-spring-part-1): *"We also expose utilities, libraries, and configuration options that let you influence certain non-functional concerns, as doing so may still be required for a variety of reasons."* Here, you have two options. ***First option:*** You can change the function signature and return a `Message<Employee>`, where you can add additional metadata (that is, Cloud Event attributes). Once the framework sees that that you returned a `Message`, it does not attempt to do anything extra with regard to the metadata added by the user. That is the rule that actually applies to most if not all frameworks that rely on Spring Messaging. While this option is simple, it does leak non-functional aspects into your business logic. After all, you need to create an instance of `Message`, you need to add headers that represent Cloud Event attributes (preferably with the correct -- specification mandated -- attribute prefix), and so on. But the biggest flaw for this option is that it would require you to change the signature of the function and mix functional and non-functional aspects together, which is a clear violation of the *separation of concerns* rule. However, for the sake of argument, here is how you would do that:

```java
Copy@Bean
public Function<Message<Person>, Message<Employee>> hire() {
  return message -> {
    Person person = message.getPayload();
    Employee employee = new Employee(person);
      return CloudEventMessageBuilder.withData(employee).setId("123456")
	.setSource(URI.create("https://spring.cloudevenets.sample")).build();
  };
}
```

The sample source code contains a commented version of it.

***Second option:*** You can provide an implementation of a strategy called `CloudEventHeaderEnricher`, which provides a separate place where you can implement logic for generating appropriate attributes and headers for the output. This strategy is invoked by the framework at the time of generating the output `Message`. The following example shows a possible implementation of this strategy (also commented out in the example, so uncomment it, restart the app, and see the difference).

```java
Copy@Bean
public CloudEventHeaderEnricher cloudEventEnricher() {
  return messageBuilder -> messageBuilder.setSource("http://spring.io/cloudevent")
	.setType("sample").setId("987654");
}
```

Here, you can also see one of the utility classes that can assist you with building Cloud Event messages: [`CloudEventMessageBuilder`](https://github.com/spring-cloud/spring-cloud-function/blob/master/spring-cloud-function-context/src/main/java/org/springframework/cloud/function/cloudevent/CloudEventMessageBuilder.java). It is modeled after a standard Spring [`MessageBuilder`](https://docs.spring.io/spring-integration/api/org/springframework/integration/support/MessageBuilder.html) but with Cloud Event specific setters . However, the main advantage of this approach is the separation of concerns. Your business logic (your functional code) stays clean. Also, the non-functional code that you still need to write is written in a separate place.

One other thing . . . The example code assumes that you're interested only in the `data` portion of a Cloud Event and that you want it in the form of a POJO. But what if that is not the case? What if you want the entire view in a Cloud Event? Or what if you also want Cloud Event data in its raw form (that is, `byte[]`)? As mentioned earlier, the framework gets its instructions from the signature of the function. So, by declaring your input and output type as `Message` you're effectively instructing the framework to give you the entire Cloud Event (not just its `data`). Also, by specifying the generic type of `Message`, you instruct the framework to serve the `data` portion of a Cloud Event as that Java type, essentially requesting it to perform type conversion, if necessary. So go ahead and try the following signatures: `public Function<Message<byte[]>, Message<Employee>> hire() {...}` or `public Function<byte[], Employee> hire() {...}` or others.

That is pretty much all for now. The README file and comments in the source code also provide additional instructions where needed.

#### [](#use-case-2-from-amqp-to-kafka)Use Case 2 (from AMQP to Kafka)

The full source code for the example is available in the [Spring Cloud Function samples](https://github.com/spring-cloud/spring-cloud-function/tree/master/spring-cloud-function-samples/function-sample-cloudevent-stream). It assumes a certain level of familiarity with AMQP and Apache Kafka. For this example, we use RabbitMQ (as an AMQP message broker) and Apache Kafka.

While this use case may appear to be more complex than the previous one, this and the subsequent section (the third use case) are surprisingly short. That is because everything that was explained in the previous section applies here as well. In fact, the only thing that we are changing here is the execution context. We do that by the same mechanism: adding the relevant Spring Boot based auto-configurations. So, in this case, we add two auto-configurations: one for the RabbitMQ (AMQP message broker) binder and one for the Apache Kafka binder available in the [Spring Cloud Stream](https://spring.io/projects/spring-cloud-stream) framework. There is also some additional application configuration (which you can see in the `application.properties` file) to instruct the framework how to bind the input side of the `hire` function to RabbitMQ (through the RabbitMQ binder) and the output side to Apache Kafka (via Apache Kafka binder).

Assuming you have RabbitMQ and Kafka running, start the application and send a Message to RabbitMQ. You can use the [RabbitMQ dashboard](http://localhost:15672/#/exchanges) (if you have it installed) and send a message to `hire-in-0` exchange.  
To stay compliant with the Cloud Event specification, you should provide attributes with AMQP appropriate prefixes (that is, `cloudEvents:`). Consider the following example:

```text
CopycloudEvents:specversion=1.0
cloudEvents:type=hire
cloudEvents:source:spring.io/spring-event
cloudEvents:id=0001
```

Then consider the following data: `{"firstName":"John", "lastName":"Doe"}`

To simplify this demo part, we included a [test case](https://github.com/spring-cloud/spring-cloud-function/blob/master/spring-cloud-function-samples/function-sample-cloudevent-stream/src/test/java/io/spring/cloudevent/DemoApplicationTests.java) to effectively automate this demo by sending a Cloud Event to RabbitMQ and receiving one from Apache Kafka:

```java
CopyMessage<byte[]> messageToAMQP = CloudEventMessageBuilder
	.withData("{\"firstName\":\"John\", \"lastName\":\"Doe\"}".getBytes())
	.setSource("https://cloudevent.demo")
	.setHeader(MessageHeaders.CONTENT_TYPE, MimeTypeUtils.APPLICATION_JSON)
	.build(CloudEventMessageUtils.AMQP_ATTR_PREFIX);

rabbitTemplate.send("hire-in-0", "#", messageToAMQP);
Message<String> resultFromKafka = queue.poll(2000, TimeUnit.MILLISECONDS);
System.out.println("Result Message: " + resultFromKafka);
. . .
```

Note how we use `CloudEventMessageBuilder` here to set only `source` as a Cloud Event attribute while relying on default values for the rest of the required Cloud Event attributes. We also use `build(CloudEventMessageUtils.AMQP_ATTR_PREFIX)` to ensure that the attributes are prefixed with the `cloudEvents:` prefix (see [Cloud Events AMQP protocol bindings](https://github.com/cloudevents/spec/blob/v1.0.1/amqp-protocol-binding.md)). Also, note that, on the receiving end, Cloud Events attributes are now prefixed with a `ce_` prefix (see [Cloud Events Kafka protocol bindings](https://github.com/cloudevents/spec/blob/v1.0.1/kafka-protocol-binding.md)), since it was determined by the framework that the target destination is Apache Kafka. This last point is worth elaborating a bit. We already established that setting Cloud Event attributes is a non-functional aspect and that, because of it, we have exposed a mechanism to let you deal with it outside of your business logic. But what about attribute prefixes? Note that we are running the same code in different execution contexts. This means that the attribute prefixes actually depend on the execution context. So, by being aware of the execution context, the framework ensures the correctness of the Cloud Event attribute prefixes.

> Here, we rely on the [Spring Cloud Stream](https://spring.io/projects/spring-cloud-stream) framework and its defaults, such as destination auto-provisioning (both Kafka and Rabbit), binding names, connectivity, and more. The details of these defaults and configuration options are out of scope for this post, since none of them are relevant to Cloud Events. See the [Spring Cloud Stream documentation](https://docs.spring.io/spring-cloud-stream/docs/3.1.0-SNAPSHOT/reference/html/) for more details on the framework itself and its configuration options.

Also, as with the previous example, this one also includes commented variations with which you are welcome to experiment.

#### [](#use-case-3-from-rsocket-to-kafka)Use Case 3 (from RSocket to Kafka)

The full source code for the example is available in the [Spring Cloud Function samples](https://github.com/spring-cloud/spring-cloud-function/tree/master/spring-cloud-function-samples/function-sample-cloudevent-rsocket). It assumes a certain level of familiarity with RSocket and Apache Kafka. This section should be even shorter than the previous one, as it is very similar. However, there are a few interesting variants here that are worth discussing. Well, the obvious one is [RSocket](https://rsocket.io/). We're introducing a different delivery mechanism. But what really makes it even more interesting is the fact that there is no protocol binding defined for RSocket. We can choose to adhere to one of the Kafka, HTTP, or AMQP specifications, or we can communicate a Cloud Event in a structured mode, where the entire event is encoded into some structure (such as JSON).

A few implementation details also differ from the other use cases in this example. However, these details are not relevant in any way to Cloud Event. Rather, they are demonstrations of other mechanisms you can use. For example we use `Consumer` instead of a `Function` and manually send an output message by using a `StreamBridge` component provided by Spring Cloud Stream framework.

So, without further ado, here is our application code:

```java
Copy@Bean
public Consumer<Person> hire(StreamBridge streamBridge) {
  return person -> {
    Employee employee = new Employee(person);
    streamBridge.send("hire-out-0", CloudEventMessageBuilder.withData(employee)
	.setSource("http://spring.io/rsocket")
	.setId("1234567890")
	.build());
  };
}
```

Note how we use `CloudEventMessageBuilder` to generate the output `Message` as a Cloud Event.

We send a structured representation of a Cloud Event, encoded as JSON, over RSocket to the `hire()` function:

```java
CopyString payload = "{\n" +
	"    \"specversion\" : \"1.0\",\n" +
	"    \"type\" : \"org.springframework\",\n" +
	"    \"source\" : \"https://spring.io/\",\n" +
	"    \"id\" : \"A234-1234-1234\",\n" +
	"    \"datacontenttype\" : \"application/json\",\n" +
	"    \"data\" : {\n" +
	"        \"firstName\" : \"John\",\n" +
	"        \"lastName\" : \"Doe\"\n" +
	"    }\n" +
	"}";

rsocketRequesterBuilder.tcp("localhost", 55555)
	.route("hire")        // target function
	.data(payload).       // data we're sending
	.send()
```

The expected output should be similar to the previous use cases, since the target destination is the same.

#### [](#conclusion)Conclusion

As you can see, while dealing with Cloud Events in the context of Spring, you have options:

-   You can chose to care only about the contents of the Cloud Event yet maintain full control over the appearance of the outbound Cloud Event.
-   You can chose to deal with the Cloud Event itself through a `Message` and rely on the provided utilities to simplify access to Cloud Event specific data.
-   You can choose an execution context without affecting your business logic (user code) while delegating to the framework to ensure the correctness of certain Cloud Event specifics, such as attribute prefixes.

These are just a few that are relevant to the context of this post, but there are more.

Established and proven patterns, frameworks that implement those patterns, and layered and opinionated Spring Boot auto-configuration(s) make it all possible. Layers are important, as they let you compartmentalize your problem into a solution that can be re-used in other projects and integrations where the same problem exists. This effectively made current Cloud Event integration rather a simple effort, since most of the non-functional aspects that are not related to Cloud Event (that is, connect, send, receive, convert, retry, and so on) were already addressed by the individual frameworks behind both Spring Cloud Function and Spring Cloud Stream.

And last but not least there is an alternative way of dealing with Cloud Events and Spring and that is via [Cloud Events Java SDK](https://github.com/cloudevents/sdk-java) where you can also find an [example](https://github.com/cloudevents/sdk-java/tree/master/examples/spring-reactive).