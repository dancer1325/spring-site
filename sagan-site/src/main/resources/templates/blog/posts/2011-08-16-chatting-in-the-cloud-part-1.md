---
title: Chatting in the Cloud: Part 1
source: https://spring.io/blog/2011/08/16/chatting-in-the-cloud-part-1
scraped: 2026-02-24T08:36:46.343Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  August 16, 2011 | 0 Comments
---

# Chatting in the Cloud: Part 1

_Engineering | Mark Fisher |  August 16, 2011 | 0 Comments_

Last week the availability of [RabbitMQ](http://www.rabbitmq.com/) as a service on [Cloud Foundry](http://cloudfoundry.com/) was [announced](http://blog.cloudfoundry.com/post/8713844574/rabbitmq-cloud-foundry-cloud-messaging-that-just-works). Any application running on Cloud Foundry may now send and receive messages via a RabbitMQ broker that can be provisioned as a service with a single command (e.g. *'vmc create-service rabbitmq'*). Instances of the messaging service may be shared between applications, and since RabbitMQ is a protocol-based broker, those applications may even be written in different languages. So, this is an exciting announcement for those interested in modular, polyglot, event-driven applications running in the cloud. I will be posting a series of blogs that focus on those types of applications. In this post, I am going to keep things simple and focus on the initial experience for Spring developers.

First, I would encourage you to check out [this tutorial](http://support.cloudfoundry.com/entries/20322602-getting-started-with-the-rabbitmq-service-from-a-spring-application) as the best way to get started even if you have no previous experience with Cloud Foundry. There you will see how a simple Spring application can be built with Maven and deployed to Cloud Foundry with the [VMC command line tool](http://support.cloudfoundry.com/entries/20012337-getting-started-guide-command-line-vmc-users). That application then introduces RabbitMQ with its MVC controller being enhanced to publish and retrieve Messages. It shows how to configure and use the RabbitMQ service through the [Spring AMQP](http://www.springsource.org/spring-amqp) library.

Also, on the day of the original Cloud Foundry announcement (and the same day as these [blog](http://blogs.vmware.com/console/2011/04/cloud-foundry-delivering-on-vmwares-open-paas-strategy.html) [posts](http://blog.springsource.com/2011/04/12/launching-cloud-foundry/)), I posted [another blog](http://blog.springsource.com/2011/04/12/cloud-foundry-for-spring-developers/) that covered the basics of the "cloud" namespace support. Reading through that may also help set the stage for what you're about to see. Specifically, we've extended the "cloud" namespace to include support for a RabbitMQ ConnectionFactory, and that will be covered when we get to the configuration overview below.

Now, I would like to introduce another sample application that demonstrates a simple chat server. RabbitMQ provides a great backbone for a versatile chat app since it supports different types of exchanges, such as "direct"/point-to-point, "topic"-based publish/subscribe, and "fanout" for simple broadcasting. Also RabbitMQ supports a wide variety language bindings. Add the fact that it's basically just a flip of a switch to enable messaging in the cloud, and now many different apps can easily share the service. As mentioned above, I will be progressively enhancing the sample and posting a few more blog posts down the road to cover those exchange types and some polyglot chatting, but for now my goal is to provide an accessible starting point with just global broadcasting through a fanout exchange. The current state of the application is not much more complex than that featured in the tutorial. I will be walking through some of the configuration and code, but if you want to follow along and delve into more detail, I recommend cloning the sample from the SpringSource [cloudfoundry-samples](https://github.com/SpringSource/cloudfoundry-samples) repository on github.

## The 'rabbit-chat' Sample Application

Here's what the running application looks like:

[![](http://blog.springsource.com/wp-content/uploads/2011/08/rabbit-chat-browser.png "rabbit-chat-browser")](http://blog.springsource.com/wp-content/uploads/2011/08/rabbit-chat-browser.png)

That form will submit HTTP POST requests using jQuery:

```javascript
Copy
$('#chatForm').submit(
	function() {
		$.post(
			$('#chatForm').attr("action"),
			$('#chatForm').serialize(),
			function(response) {
				if (response) {
					confirm(response.id);
				}
			});
		$('#text').val("");
		return false;
	});
```

And, the chat log will be regularly updated via polling - also using jQuery's AJAX support:

```javascript
Copy
$.ajax({
	url : "chatlog",
	success : function(message) {
		if (message && message.length) {
			var messagesDiv = $('#messages');
			messagesDiv.html(message);
			messagesDiv.animate({ scrollTop: messagesDiv.attr("scrollHeight") - messagesDiv.height() }, 150);
		}
		timer = poll();
	},
	error : function() {
		timer = poll();
	},
	cache : false
});
```

## The Java Code

If you clone the repository and cd into the 'rabbit-chat' directory, you will see the following structure:

`   ├── pom.xml ├── src │   └── main │       ├── java │       │   └── org │       │       └── cloudfoundry │       │           └── samples │       │               └── rabbitmq │       │                   └── chat │       │                       └── ChatController.java │       ├── resources │       │   └── static │       │       └── js │       │           └── jquery.min.js │       └── webapp │           └── WEB-INF │               ├── spring │               │   └── servlet-context.xml │               ├── views │               │   └── chat.jsp │               └── web.xml   `

The [pom.xml](https://github.com/SpringSource/cloudfoundry-samples/blob/master/rabbit-chat/pom.xml) file declares the dependencies. Of particular interest are the following:

-   spring-webmvc (3.0.5.RELEASE)
-   spring-rabbit (1.0.0.RC3)
-   cloudfoundry-runtime (0.7.1)

The [web.xml](https://github.com/SpringSource/cloudfoundry-samples/blob/master/rabbit-chat/src/main/webapp/WEB-INF/web.xml) file declares a Spring MVC DispatcherServlet and a single catch-all servlet-mapping ("/").

As you can see there is a single controller called "ChatController". It is configured via annotations. It uses the @Controller and @RequestMapping annotations as well as @Autowired. Since ChatController is really the heart of the application (and its only Java code), let's have a quick look at the entire implementation:

```java
Copy
@Controller
public class ChatController {

	@Autowired
	private volatile AmqpTemplate amqpTemplate;

	private final Queue<String> messages = new LinkedBlockingQueue<String>();

	@RequestMapping(value = "/")
	public String home() {
		return "WEB-INF/views/chat.jsp";
	}

	@RequestMapping(value = "/publish", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	public void publish(@RequestParam String username, @RequestParam String text) {
		this.amqpTemplate.convertAndSend(username + ": " + text);
	}

	@RequestMapping(value = "/chatlog")
	@ResponseBody
	public String chatlog() {
		return StringUtils.arrayToDelimitedString(this.messages.toArray(), "<br/>");
	}

	/**
	 * This method is invoked when a RabbitMQ Message is received.
	 */
	public void handleMessage(String message) {
		if (messages.size() > 100) {
			messages.remove();
		}
		messages.add(message);
	}
}
```

There are 3 controller methods (those annotated with @RequestMapping), and each one has a single line of code. The simplest of these is *home()* which returns the location of the JSP to render. I would typically use a Spring MVC ViewResolver, but since it's just a single page app using AJAX, that is the only view that is ever rendered directly. As you can see, *home()* will be invoked anytime you request the application root.

The *publish(..)* method is invoked for HTTP POST requests to the relative URL "/publish", and it expects two parameters in the request: username and text. Those are provided by the HTML form that you saw in the previous section. It is rendered by [chat.jsp](https://github.com/SpringSource/cloudfoundry-samples/blob/master/rabbit-chat/src/main/webapp/WEB-INF/views/chat.jsp). The publish method does nothing more than concatenate the username + text values into a single String to be converted into an AMQP Message and sent by the *AmqpTemplate* after which it responds with a simple HTTP 200 (OK) status. The template instance has been autowired into the Controller. We will look at the AmqpTemplate configuration shortly along with the underlying *ConnectionFactory* that enables use of the RabbitMQ service on Cloud Foundry.

The *chatlog()* method simply returns up to 100 of the most recent messages that have been part of the chat. It's the method being polled by the AJAX request shown in the previous section. The *handleMessage(..)* method is responsible for queuing those chat messages, and so that is the one connected to an underlying message listener. That pretty much covers the application's functionality.

## The Spring Configuration

Now, we can walk through the configuration for this application. This could have been done completely in Java with annotations, but hopefully you agree that this is a rather concise configuration file:

```xml
Copy
<context:component-scan base-package="org.cloudfoundry.samples.rabbitmq.chat"/>

<mvc:annotation-driven/>

<mvc:resources location="file:./src/main/resources/static/,classpath:/static/" mapping="static/**"/>

<rabbit:queue id="chatQueue"/>

<rabbit:fanout-exchange name="chatExchange">
	<rabbit:bindings>
		<rabbit:binding queue="chatQueue"/>
	</rabbit:bindings>
</rabbit:fanout-exchange>

<rabbit:template connection-factory="rabbitConnectionFactory" exchange="chatExchange"/>

<rabbit:admin connection-factory="rabbitConnectionFactory"/>

<rabbit:listener-container>
	<rabbit:listener queues="chatQueue" ref="chatController" method="handleMessage"/>
</rabbit:listener-container>

<cloud:rabbit-connection-factory id="rabbitConnectionFactory"/>
```

The 'component-scan' element enables the @Contoller-annotated class to be registered as a Spring-managed object, and it also activates the support for @Autowired. The two elements with the 'mvc' prefix simply setup the MVC @RequestMapping support and enable the loading of static resources (in this case used for the jQuery support that is provided in the 'resources/static/js' directory).

The rest of the elements are relevant for the RabbitMQ configuration. The "rabbit:admin" generates an instance of *RabbitAdmin* that is responsible for recognizing Exchanges, Queues, and Bindings that are defined within the same application context. Notice that the queue element has "chatQueue" as its **id** but that id does not have a "name" attribute. That will trigger the creation of a Queue with a unique, generated name that is exclusive to this particular application. In other words, the "id" attribute's value does not map to the Queue's name; it is the id of the Spring bean, but not of the RabbitMQ Queue. Even though it has a generated name, it needs to be identifiable for referencing within this application context. For example, you can see that it is referenced in the binding for the "chatExchange" that is defined here as a Fanout Exchange. That exchange will also be declared against the broker, since the "rabbit:admin" element is present.

The "rabbit:template" is pretty straightforward. It requires a reference to the ConnectionFactory (don't worry, we'll get to that one in a moment), and if you want its "send" methods to publish to an Exchange other than the no-name default Exchange, you can provide that here. We are publishing to the "chatExchange" that we just discussed.

The "rabbit:listener-container" is practically identical to the element of the same name in Spring's JMS support. This one is listening to the "chatQueue", and remember that's just a reference to the bean id, the real name of that particular Queue is generated by the broker. Whenever a Message arrives on that Queue, the "handleMessage" method we saw earlier will be invoked. The listener container's adapter will automatically handle the conversion of the Message body in a case like this where the method argument is a String. Since that method argument does not need to accept an actual Message instance, and the method name can be anything we want it to be, we refer to this as a "Message-driven POJO". In other words, it has no direct dependency on the messaging API. Its being invoked by the listener container is a form of Inversion of Control.

Finally, there is the Connection Factory configuration. In this case, we are using the "cloud" namespace and its "rabbit-connection-factory" element. As long as your application is bound to a single "rabbitmq" service in Cloud Foundry, no other information is necessary for creating the ConnectionFactory instance. The code underlying that namespace support will determine the credentials from the environment itself. That namespace support is provided by the "cloudfoundry-runtime" library which you can see declared in this application's [pom.xml](https://github.com/SpringSource/cloudfoundry-samples/blob/master/rabbit-chat/pom.xml) file.

## Running the Application

You can run the application using either the [vmc command line tool](http://support.cloudfoundry.com/entries/20012337-getting-started-guide-command-line-vmc-users) or [SpringSource Tool Suite](http://cloudfoundry.zendesk.com/entries/20012462-getting-started-guide-sts-users). With *vmc* you would have something like the following:

`   $ vmc push Would you like to deploy from the current directory? [Yn]: y Application Name: rabbit-chat-sample Application Deployed URL: 'rabbit-chat-sample.cloudfoundry.com'?  Detected a Java SpringSource Spring Application, is this correct? [Yn]: y Memory Reservation [Default:512M](64M, 128M, 256M, 512M or 1G)    Creating Application: OK Would you like to bind any services to 'rabbit-chat-sample'? [yN]: y Would you like to use an existing provisioned service [yN]? n The following system services are available: 1. mongodb 2. mysql 3. postgresql 4. rabbitmq 5. redis Please select one you wish to provision: 4 Specify the name of the service [rabbitmq-5e262]:           Creating Service: OK Binding Service: OK Uploading Application:   Checking for available resources: OK   Processing resources: OK   Packing application: OK   Uploading (3K): OK    Push Status: OK Staging Application: OK                                                          Starting Application: OK   `

If using STS, you just need to enable the Cloud Foundry support (available from the Dashboard's "Extensions" tab), and then create a new server instance (see the [Getting Started Guide](http://cloudfoundry.zendesk.com/entries/20012462-getting-started-guide-sts-users) for all the details) to which you can simply drag the application. Once the application is added to the server instance, you can provision and bind services through the UI. The following screenshot shows the 'rabbit-chat' sample application.

[![](http://blog.springsource.com/wp-content/uploads/2011/08/rabbit-chat-sts.png "rabbit-chat-sts")](http://blog.springsource.com/wp-content/uploads/2011/08/rabbit-chat-sts.png)

## Scaling the Application

Remember the discussion of the "chatQueue" id and how the Queue's name would be generated since it was using the id rather than name attribute? Well, the reason we are using id instead of name here is that we want each instance of the application to have its own exclusive, and effectively anonymous, Queue. It is the Fanout Exchange that has a single named instance. Each instance of the application will bind its own Queue to that Exchange. This decoupling of Exchanges and Queues is quite appropriate for a scalable cloud application (especially since those Queues whose names are generated will be deleted automatically when their owning instance is shutdown).

To scale the application, you can use VMC at the command line:

`   $ vmc instances rabbit-chat-sample +1 Scaling Application instances up to 2: OK   `

Or, you can use the STS support. Here's a focused view of the 'instances' configuration taken from the same screenshot posted above:

[![](http://blog.springsource.com/wp-content/uploads/2011/08/rabbit-chat-sts-instances.png "rabbit-chat-sts-instances")](http://blog.springsource.com/wp-content/uploads/2011/08/rabbit-chat-sts-instances.png)

## What's Next?

This blog is intended to be the first of a series. In upcoming posts, we will explore the following:

-   Enhancement of the messaging functionality beyond the currently global broadcasting in order to demonstrate both point-to-point messaging (for chatting with a single named user) as well as publish/subscribe with dynamically allocated Exchanges to represent a "chat room".
-   Addition of a Node.js app that sits alongside the Java app and participates in the same chat since both apps are bound to the same RabbitMQ service instance.
-   Inclusion of Spring 3.1 profile support to show how this same configuration file could be modified to work equally well against Cloud Foundry or an alternative deployment, such as a local Tomcat instance.