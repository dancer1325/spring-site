---
title: Spring Cloud Stream - Event Routing
source: https://spring.io/blog/2019/10/31/spring-cloud-stream-event-routing
scraped: 2026-02-23T14:25:10.753Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  October 31, 2019 | 0 Comments
---

# Spring Cloud Stream - Event Routing

_Engineering | Oleg Zhurakousky |  October 31, 2019 | 0 Comments_

Welcome to another post in a series of posts showcasing the new features of [Spring Cloud Stream](https://spring.io/projects/spring-cloud-stream) (SCSt). In previous posts (available [here](https://spring.io/blog/2019/10/14/spring-cloud-stream-demystified-and-simplified), [here](https://spring.io/blog/2019/10/17/spring-cloud-stream-functional-and-reactive) and [here](https://spring.io/blog/2019/10/25/spring-cloud-stream-and-spring-integration)), we tried to provide justification for our shift to a functional programming model in Spring Cloud Stream (SCSt). It is less code and less configuration, and your code remains completely decoupled from the internals of SCSt.

Today, we'll talk about routing with functions. Routing, in the context of SCSt, is the ability to either *a) route events to a particular event subscriber* or *b) route an event produced by an event subscriber to a particular destination*. To help more with the context, let's quickly look at how things work in the annotation-based programming model. In this post, we'll refer to it as route 'TO' and route 'FROM'.

For routing ***TO*** an event subscriber, we used the `condition` attribute of the `StreamListener` annotation, as follows:

```
Copy@StreamListener(target = Sink.INPUT, condition = "headers['type']=='order'")
public void receiveOrders(Order order) {...}
```

[Here](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/2.1.3.RELEASE/single/spring-cloud-stream.html#_using_streamlistener_for_content_based_routing) are more details on this approach.

And, for routing ***FROM*** an event subscriber, we used [Dynamically Bound Destinations](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/2.1.3.RELEASE/single/spring-cloud-stream.html#dynamicdestination) - the approach that allows framework to bind to a destination based on some instruction provided within the individual event.

## [](#event-routing-with-functions)Event Routing with Functions

With the functional approach, we can do all of the above in a more clean and concise way with a few additional features.

#### [](#route-to)Route TO:

Routing 'TO' functions can be achieved by relying on the routing function feature available in [Spring Cloud Function](https://spring.io/projects/spring-cloud-function) (SCF). You can enable routing explicitly by setting the `spring.cloud.stream.function.routing.enabled` property or implicitly by setting the `spring.cloud.function.routing-expression` property and providing routing instruction with Spring Expression Language (SpEL). The routing instruction should result in the definition of the function to which to route, 'TO'. For the purposes of binding, the name of the routing destination is `functionRouter-in-0` (see `RoutingFunction.FUNCTION_NAME` and the binding naming convention described [here](https://spring.io/blog/2019/10/17/spring-cloud-stream-functional-and-reactive)).

When a message is sent to this destination, the routing function tries to determine which actual function needs to process such an event. It first tries to access the `spring.cloud.function.routing-expression` message header and, if provided, determine the name of the actual function to invoke. This is the most dynamic approach. The second most dynamic approach is to provide a `spring.cloud.function.definition` header, which should contain the definition of the function to which to route 'TO'. Both approaches require explicit enablement of routing function by setting the `spring.cloud.stream.function.routing.enabled` property.

As for additional features that were not available in previous versions, the `spring.cloud.function.routing-expression` can also be used as application property. For example, consider the case when the expression is the same regardless of the incoming event, as in the annotation-based example shown earlier in this post (for example, `spring.cloud.function.routing-expression=headers['type']=='order'`). For this approach, you need not explicitly enable a routing function, given that `spring.cloud.function.routing-expression` as an application property has the same effect.

Albeit trivial, the following is a complete example of one of the approaches described above:

```
Copy@SpringBootApplication
public class RoutingStreamApplication {

  public static void main(String[] args) {
      SpringApplication.run(RoutingStreamApplication.class,
	  "--spring.cloud.function.routing-expression="
	  + "T(java.lang.System).nanoTime() % 2 == 0 ? 'even' : 'odd'");
  }
  @Bean
  public Consumer<Integer> even() {
    return value -> System.out.println("EVEN: " + value);
  }

  @Bean
  public Consumer<Integer> odd() {
    return value -> System.out.println("ODD: " + value);
  }
}
```

By sending a message to the `functionRouter-in-0` destination that is exposed by the binder (that is, rabbit or kafka), such a message will be routed to the appropriate ('even' or 'odd') `Consumer` bean, based on the value of `nanoTime()` at the time of message processing.

#### [](#route-from)Route FROM:

As before, routing 'FROM' relies on the Dynamically Bound Destinations feature of SCSt. However, as with routing 'TO', there are a number of additional features.

The following example shows the basics:

```
Copy@Autowired
private BinderAwareChannelResolver resolver;

public Consumer<String> send(Message message) {   
     MessageChannel destination = resolver
        .resolveDestination(message.getHeaders().get("type"))
     Message outgoingMessage = . . . // your code
     destination.send(outgoingMessage);
}
```

All you need is a reference to `BinderAwareChannelResolver` (autowired in the proceeding example). Then you can use some logic to determine the destination name (in our case, we use the value of the 'type' header). Once the destination name is determined, you can obtain a reference to it by using the `BinderAwareChannelResolver.resolveDestination(..)` operation and sending a message to it. That is really all it takes.

The downside of the above approach is that some framework-specific abstractions leak into your code. Look at the fact that you need to be aware of `BinderAwareChannelResolver` and `MessageChannel`, amongst other things. In fact, most of the code in the preceding example is boilerplate.

A more dynamic and less leaky approach is to rely on `spring.cloud.stream.sendto.destination` property, which effectively does all of the above - but behind the scenes. The following example shows how to use this approach:

```
Copy@SpringBootApplication
public class RoutingStreamApplication {

  @Bean
  public Function<Message<String>, Message<String>> process() {
    return message -> {
      // some logic to process incoming message
      Message<String> outgoingMessage = MessageBuilder
		.withPayload("Hello")
		.setHeader("spring.cloud.stream.sendto.destination", "even")
		.build();
       return outgoingMessage;
     };
  }
}
```

We no longer have to inject `BinderAwareChannelResolver`, perform resolution of `MessageChannel`, and so on. We simply create a new `Message` that specifies a header that is used by the framework to dynamically resolve destination.

#### [](#routing-sources)Routing Sources

Last but not least, let's look at another popular use case of a route 'FROM' where the source of data originates outside the context of SCSt but needs to be routed to the appropriate destination:

```
Copy@Controller
public class SourceWithDynamicDestination {
    @Autowired
    private ObjectMapper jsonMapper;

    private final EmitterProcessor<?> processor = EmitterProcessor.create();

    @RequestMapping(path = "/", method = POST, consumes = "*/*")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void handleRequest(@RequestBody String body, 
      @RequestHeader(HttpHeaders.CONTENT_TYPE) Object contentType) 
      throws Exception {
        Map<String, String> payload = jsonMapper.readValue(body, Map.class);
        String destination = payload.get("id");
        Message<?> message =
          MessageBuilder.withPayload(payload)
           .setHeader("spring.cloud.stream.sendto.destination", destination)
           .build();
        processor.onNext(message);
    }

    @Bean
    public Supplier<Flux<?>> source() {
        return () -> processor;
    }
}
```

Then we can see the result by running the following `curl` command:

```
Copycurl -H "Content-Type: application/json" -X POST -d '{"id":"customerId-1","bill-pay":"100"}' http://localhost:8080
```

Here, we use both a functional approach and a dusting of the reactive paradigm, by virtue of `Supplier<Flux<?>>` bean. We have a simple MVC controller, and we want to route requests downstream, based on the value of the 'id' attribute of the content. While the details of the `EmitterProcessor` and its usage here are a subject for another post, what is important is that it demonstrates a fully functional application where HTTP requests are routed dynamically to destinations managed by the target binder.

> NOTE: At the time of this writing, the reference documentation is being actively updated to support the upcoming 3.0.0.RELEASE of SCSt, but you can always use the source of the [reference documentation](https://github.com/spring-cloud/spring-cloud-stream/blob/master/docs/src/main/asciidoc/spring-cloud-stream.adoc#event-routing) for the most up-to-date information.

Check out [Spring Cloud Stream](https://github.com/spring-cloud/spring-cloud-stream) on GitHub.

Also, the previous blogs in the series:

-   [Spring Cloud Stream - demystified and simplified](https://spring.io/blog/2019/10/14/spring-cloud-stream-demystified-and-simplified)

[\- Spring Cloud Stream - functional and reactive](https://spring.io/blog/2019/10/17/spring-cloud-stream-functional-and-reactive)

-   [Spring Cloud Stream & Spring Integration](https://spring.io/blog/2019/10/25/spring-cloud-stream-and-spring-integration)