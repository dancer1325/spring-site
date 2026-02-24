---
title: A Simple Groovy DSL for building RabbitMQ AMQP Applications
source: https://spring.io/blog/2011/06/01/a-simple-groovy-dsl-for-building-rabbitmq-amqp-applications
scraped: 2026-02-24T08:40:51.069Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jon Brisbin |  June 01, 2011 | 0 Comments
---

# A Simple Groovy DSL for building RabbitMQ AMQP Applications

_Engineering | Jon Brisbin |  June 01, 2011 | 0 Comments_

Asynchronous applications can sometimes be a challenge while you're developing them since you usually need two separate components to see the full message publication and consumption lifecycle. It often happens that you write a consumer that can dump messages to System.out or your log file, just so you can make sure your publisher is doing the right thing. It would be really handy if you could mock the message publication and consumption interaction in a single component so you could actually see what's going on.

The RabbitMQ Groovy DSL aims to help with this by providing a very concise and easy-to-use DSL language for creating message consumers and producers so you can quickly mock message interaction between components without writing any boilerplate code.

### Working with Exchanges

The top level node in the RabbitMQ DSL is the `exchange` node. Besides setting a name that is inherited by nodes inside its scope, it also declares the exchange in your broker.

```groovy
Copy
mq.exchange(name: "myexchange") {
  
}
```

By default, it will declare a `direct` exchange. The other exchange types are supported through the `type` property.

```groovy
Copy
mq.exchange(name: "myexchange", type: "topic") {
  
}
```

Whenever you use the `queue`, `consume`, or `publish` nodes (which we'll discuss in a minute) inside the exchange node's scope, the name of your exchange will be "inherited" from this node so you don't have to repeat it.

### Working with Queues

The next logical step in working toward sending and receiving messages in your mock application is to declaring a queue into which your messages will be delivered. You do this with the `queue` node.

```groovy
Copy
mq.exchange(name: "myexchange") {

  queue(name: "myqueue", routingKey: "test") {
    
  }
  
}
```

Declaring this queue inside the `exchange` node's scope will also cause it to be bound to the enclosing exchange. The value of the `routingKey` property will be used in declaring this binding.

This example uses a named queue but you can also get an anonymous, server-generated queue by setting the `name` property to null.

```groovy
Copy
mq.exchange(name: "myexchange") {

  queue(name: null, routingKey: "test") {
    
  }
  
}
```

The name of this anonymous queue is tracked internally, so as long as you declare your consumers and publishers within this node's scope, you won't need to know what it is. If, however, you want to write some helper functions that need the name of the anonymous queue, simply set your node to a variable. The value of this variable will be a Spring AMQP [Queue](http://static.springsource.org/spring-amqp/docs/1.0.x/api/org/springframework/amqp/core/Queue.html) object which has a property on it named, ironically enough: `name`.

```groovy
Copy
mq.exchange(name: "myexchange") {

  Q = queue(name: null, routingKey: "test") {
    
  }
  
  println "queue name is: ${Q.name}"
  
}
```

### Creating Queue Consumers

To deal with incoming messages, you need to declare a consumer. The DSL for consumers is extremely flexible in how you attach code to be executed whenever a message is received. Under the covers, consume is simply a Spring AMQP [SimpleMessageListenerContainer](http://static.springsource.org/spring-amqp/docs/1.0.x/api/org/springframework/amqp/rabbit/listener/SimpleMessageListenerContainer.html)) and the consume node that represents this takes a couple different forms.

#### Using a Groovy Closure

The simplest way to declare a consumer is to just use a Closure as the method to be executed whenever a message is received. The only parameter to this closure will be a Spring AMQP [Message](http://static.springsource.org/spring-amqp/docs/1.0.x/api/org/springframework/amqp/core/Message.html) object.

```groovy
Copy
mq.exchange(name: "myexchange") {

  queue(name: null, routingKey: "test") {
    
    consume { msg ->
      // Handle the message body here, which will always be a byte array
      String bodyAsString = new String(msg.body)
      println "msg body: ${bodyAsString}"
    }
    
  }
  
}
```

#### Using an event

The RabbitMQ Groovy DSL is actually full-featured enough to write a complete, production application, though we're only really focussing on mocking an application in this article. One of the features of the DSL is the concept of events. Events are dispatched at certain, fixed times during the lifecycle of a message (before and after publishing a message and when an error occurs), and custom events can be handled as message consumers.

To declare an event handler, you can use the `on` node (which, by convention, you probably want at the top of your source file).

```groovy
Copy
mq.on   error: { err -> err.printStackTrace() },	
      myevent: { msg -> println "myevent: ${new String(msg.body)}" }
```

This declares two event handlers: one for any exceptions that occur and one we can delegate to whenever we receive a message. Since all we're doing in this case is printing the message to System.out, we can easily share code between consumers.

To tell our consumer to use this event handler whenever a message is received, we use the `onmessage` property of our `consume` node.

```groovy
Copy
mq.on   error: { err -> err.printStackTrace() },	
      myevent: { msg -> println "myevent: ${new String(msg.body)}" }

mq.exchange(name: "myexchange") {

  queue(name: null, routingKey: "test") {
    
    consume onmessage: "myevent"
    
  }
  
}
```

#### Using a Closure, a MessageListener, or a POJO

You can set the onmessage property to more than just a String, however. For flexibilty, you can set it to one of:

-   A String of the event to synchronously dispatch to.
-   A Groovy Closure to execute directly.
-   A Spring AMQP [MessageListener](http://static.springsource.org/spring-amqp/docs/1.0.x/api/org/springframework/amqp/core/MessageListener.html) implementation.
-   A POJO which will be wrapped by a Spring AMQP [MessageListenerAdapter](http://static.springsource.org/spring-amqp/docs/1.0.x/api/org/springframework/amqp/rabbit/listener/adapter/MessageListenerAdapter.html).

#### Continuing to listen for messages

Your consumer will continue to listen for messages unless you either return a `false` or a null value from your Closure or event handler. To keep your consumer active and waiting for messages, simply return `true` or non-null.

```groovy
Copy
mq.exchange(name: "myexchange") {

  queue(name: null, routingKey: "test") {
    
    consume { msg ->
      // Handle the message body here, which will always be a byte array
      String bodyAsString = new String(msg.body)
      println "msg body: ${bodyAsString}"
      // Keep listening for messages and don't exit
      return true
    }
    
  }
  
}
```

If you return `false` or null from your Closure, the consumer will exit.

```groovy
Copy
mq.exchange(name: "myexchange") {

  queue(name: null, routingKey: "test") {
    
    consume { msg ->
      // Handle the message body here, which will always be a byte array
      String bodyAsString = new String(msg.body)
      println "msg body: ${bodyAsString}"
      // I'm done with you, please exit
      return false
    }
    
  }
  
}
```

The command-line executor uses a system of reference counting to determine whether any consumers are still active or not. Returning `false` or null from standard Groovy Closures will tell the caller to stop the consumer's internal `MessageListenerContainer`. Something to watch out for when using a `MessageListener` implementation, however, is that you will have to shutdown the consumer yourself.

The `consume` DSL node will return a special `Consumer` object, which exposes a method named `shutdown` which is responsible for shutting down the `MessageListenerContainer`. If you're implementing a `MessageListener` yourself, you'll have to call this method whenever you want your consumer to exit, otherwise the system won't know when you're finished and won't ever shut your consumer down for you.

Set the `consume` node to a variable and call the `shutdown` method on it.

```groovy
Copy
mq.exchange(name: "myexchange") {

	def consumer
	def listener = [
    onMessage: { msg ->
      println "Invoked from a standard MessageListener"
      consumer?.shutdown()
    }
  ] as MessageListener

	queue(name: null, routingKey: "test.key") {
		consumer = consume onmessage: listener
	}
  
}
```

### Publishing Messages

Publishing messages with the DSL is just as easy as consuming them. There are basically two variations on `publish`.

```groovy
Copy
mq.exchange(name: "myexchange") {

  // Return a String, a byte array, or an instance of a Spring AMQP Message
	publish(routingKey: "test.key") {
		"this is from a publish"
	}

  // Write raw bytes to a ByteArrayOutputStream
	publish(routingKey: "test2.key", myHeaderValue: "customHeader", contentType: "text/plain") { out ->
		out.write("these are test bytes".bytes)
	}
  
}
```

In the first sample, we pass back a String (we could also use a `byte[]`) that is used as the body of the message. In the second example, we set standard message headers (in this case `contentType`) as well as custom application headers, and we can write to a `ByteArrayOutputStream` that gets passed to our Closure.

### Wrapping it All Together

Note that you don't have to split up publishing and consuming into two separate source files. You can include both functions right alongside one another to get a good visual on what it is you're trying to accomplish with messaging in the first place.

```groovy
Copy
mq.on error: { err -> err.printStackTrace() }

mq.exchange(name: "myexchange") {

  queue(name: null, routingKey: "test") {
    consume { msg ->
      // Handle the message body here, which will always be a byte array
      String bodyAsString = new String(msg.body)
      println "msg body: ${bodyAsString}"
    }    
  }

	publish(routingKey: "test") {
		"this is from a publish"
	}
  
}
```

Though we've concentrated on mocking applications that might later be built-out more robustly using pure Java (or even another language entirely), the RabbitMQ DSL is also handy for writing simple maintenance applications, or any messaging application where you need message consumption and publication but you don't want to expend a lot of effort to write a full-blown messaging application.

### Where do I get it?

The RabbitMQ DSL is available on GitHub and is Apache-licensed. Installation instructions are in the README.

-   [https://github.com/jbrisbin/rabbitmq-dsl](https://github.com/jbrisbin/rabbitmq-dsl)

And thanks to a recent contribution from [Joris Kuipers](https://github.com/jkuipers), you can get [some IDE completion support](http://blog.springsource.com/2011/05/08/better-dsl-support-in-groovy-eclipse/) in Eclipse and STS using the included [rabbitmq.dsld](https://github.com/jbrisbin/rabbitmq-dsl/blob/master/src/main/groovy/rabbitmq.dsld).