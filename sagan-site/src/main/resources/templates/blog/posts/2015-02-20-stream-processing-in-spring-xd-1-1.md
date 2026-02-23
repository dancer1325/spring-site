---
title: Stream Processing in Spring XD 1.1
source: https://spring.io/blog/2015/02/20/stream-processing-in-spring-xd-1-1
scraped: 2026-02-23T21:54:43.453Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 20, 2015 | 0 Comments
---

# Stream Processing in Spring XD 1.1

_Engineering | Josh Long |  February 20, 2015 | 0 Comments_

> This tip is drawn heavily from this Wiki-page on [Spring XD's streaming support](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Data-Stream-Processor-Module#reactor-streams) by various Spring XD team-members, and particularly the amazing [Ilayaperumal Gopinathan](https://github.com/ilayaperumalg)

Spring XD 1.1 is here and is *packed* with lots of new features. One theme for this release is rich stream processing support. Spring XD 1.1 provides integration with [Project Reactor](https://github.com/reactor) [`Stream`](https://github.com/reactor/reactor/blob/master/reactor-core/src/main/java/reactor/rx/Stream.java)s, [RxJava](https://github.com/ReactiveX/) [`Observable`](https://github.com/ReactiveX/RxJava/wiki/Observable)s, and [Spark](https://spark.apache.org/)'s streaming.

Let's look specifically at using Reactor, though the concepts are similar across all of the supported streaming APIs.

Messages that are delivered on the Message Bus are accessed from the input Stream. The return value is the output Stream that is the result of applying various operations to the input stream. The content of the output Stream is sent to the message bus for consumption by other processors or sinks. To implement a `Stream`\-based processor module you need to implement the interface `org.springframework.xd.reactor.Processor`:

```java
Copyimport org.springframework.xd.reactor.Processor;
import org.springframework.xd.tuple.Tuple;
import reactor.rx.Stream;

import static com.acme.Math.avg;
import static org.springframework.xd.tuple.TupleBuilder.tuple;

public class MovingAverage implements Processor<Tuple, Tuple> {

  @Override
  public Stream<Tuple> process(Stream<Tuple> inputStream) {
    return inputStream.map(tuple -> tuple.getDouble("measurement"))
      .buffer(5)
      .map(data -> tuple().of("average", avg(data)));
  }
}
```

Writing a test for this is as simple as setting up a Spring Integration flow that takes input on a request channel and routes it to this processor via a `org.springframework.xd.reactor.SynchronousDispatcherMessageHandler` component which itself writes its output to an output channel. From there, you can [package](https://github.com/spring-projects/spring-xd/wiki/Modules#module-packaging) and [register](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Processor-Module#register-the-module) the custom processor in the Spring XD admin server.