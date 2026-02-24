---
title: Spring Integration on dm Server
source: https://spring.io/blog/2009/02/27/spring-integration-on-dm-server
scraped: 2026-02-24T09:11:01.419Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Iwein Fuld |  February 27, 2009 | 0 Comments
---

# Spring Integration on dm Server

_Engineering | Iwein Fuld |  February 27, 2009 | 0 Comments_

### Introduction

In this blog post I will show you how to create a loosely coupled and scalable application with Spring Integration and dm Server. The added benefit of using OSGi will allow us to change the behavior of the application at runtime and of course we're going to have some fun with that too. First I will quickly highlight the reasons for designing an application for concurrent use, then I will describe different strategies of integrating OSGi bundles with Messaging. Along the way you will get a glimpse of our tooling and some of the dm Server features. You should be able to do this yourself, if you have downloaded and installed the latest SpringSource Tool Suite and dm Server. You don't need the sample code to follow the story, but it will be available in the Spring Integration sandbox if you're interested.

**The synchronous breakdown**

Synchronous calls in applications perform fine, but they don't scale. It has been documented quite a bit before, so I'll give you a quick refresher and then move on. When you make a synchronous call, the calling thread has to block until the call is done. If you happen to do I/O in that method, the blocking thread is wasting cpu cycles. If you have a massively parallel web application this isn't too big a problem, because you can just increase the max size of the threadpool you're using. However, if you need to make use of the full potential of your servers cpu power from a single call, you're out of luck. Since one thread runs on one core, the more cores you have the more inefficient a single threaded program will be.

**Messaging to the rescue**

Getting into concurrent programming yourself is a lot of fun, but it isn't the easiest thing to do, and you might want to finish work early today. That's where Spring Integration can help you. It gives you all the control over the concurrent processing that you need without you having to take responsibility for the low level details of concurrent programming.

**How does OSGi help?**

You can fully prevent the synchronous breakdown without OSGi. It just makes life so much better that you shouldn't miss out on it. Doing a full redeploy and restart of the jvm every time you make a little change wouldn't be much fun. And there is another thing that makes the combination of OSGi and Messaging very interesting. If an enterprise application grows big you have to modularize at some point. Running multiple modules in the same traditional server is a recipe for disaster (also called jar hell). In traditional architectures people have therefore scaled out prematurely in many cases. This makes for a very poor setup. The different nodes have to talk to each other over the network, and they can't share resources like cpu and memory. This renders the architecture inefficient and severely impacts performance. Not only are you wasting cycles on some cores in one server, you are now repeating the same inefficiency over multiple nodes. To add insult to injury there is network latency adding I/O waits where a normal local method call would have sufficed.

With OSGi you don't have to take that hit, you can run different bundles in the same jvm, so that calls between them are fast as normal method calls, without the dreaded jar hell associated with deploying jars of different teams on the same classpath. Having an application that you can change the behavior of at runtime, work on with multiple teams and that helps you reduce the needed hardware to a single beefy server. Sounds sweet, so let's do it.

### Preparation

If you prefer to follow the blog with the actual code sample or write the sample in parallel on your own you need to have the proper tools (and code) available. To follow the ideas of the blog you don't need to do this. I will include essential code samples here. This article is not intended to be a detailed howto, so if you want to follow along you'll have to do your own coding, or just use the sample. To do this follow these steps.

1.  Download and install the [SpringSource Tool Suite](http://www.springsource.com/products/suite/sts) and [dm Server](http://www.springsource.com/products/suite/dmserver) (this is as easy as unzipping the files). You can also use Eclipse with the dm Server tools and Spring IDE if you prefer.
2.  Configure a dm Server under the default name and start it
    1.  open the Server view, right click in it and select new
    2.  type Spring in the search window and select SpringSource dm Server 1.0
    3.  point to the unzipped dm Server directory
3.  Update your bundle repository and install Spring Integration Core 1.0.1 and Commons Logging 1.1.1
    1.  double click the newly created server a server management console opens
    2.  select the repository tab and click 'Update local bundle and library repository index'
    3.  search for Spring Integration and download the core bundle
    4.  start the server
4.  Import the projects from the [Spring Integration sandbox](https://src.springframework.org/svn/spring-integration/sandbox/si-osgi)
    1.  check out the projects to a local working directory
    2.  From STS select File->Import->Existing projects into workspace and point to the working directory

### Asynchronous hand-off to a Messaging bundle

In this section we'll use a single bundle that depends on Spring Integration and hand off our work to it. This bundle will hide all the messaging details, and if you have only a small part of the system that does the intensive work this might be just what you need.

The sample application I'm going to show is developed for a medieval town. In these towns there used to be a town crier that would walk the streets exclaiming local news and announcements at high volume. The town in question (that wishes to remain anonymous) has been forced by the town crier union to improve working conditions for their town crying workforce and due to budget restrictions they would like to reduce the headcount at the same time.

They have come to the conclusion that the only way to achieve these goals is to replace most of the manual labor of the town crier with an automated system. The town crier will simply pass his message to this system from the comfort of his office and then the message will be distributed to all the citizens in the town. The city hall already keeps a track of all the citizens, so it will be easiest to place this distribution logic in the towns city hall.

\[caption id="attachment\_1096" align="alignnone" width="653" caption="Overview of the various bundles in the sample."\]![System design of various bundles](http://blog.springsource.com/wp-content/uploads/2009/02/si-osgi.png "si-osgi")\[/caption\]

**The Town Crier bundle** It was decided that the town crier should not be re schooled to work with the new system, so he will still invoke the towns cry() method, he just doesn't need to go about and do it many times to cover each part of the town anymore. Distribution of the announcement will be done by the new system in town transparently. The towncrier bundle just has one class TownCrier.java which is injected with the Town it should cry to.

```java
Copy
@Component
public class TownCrier {
	private static final Log logger = LogFactory.getLog(TownCrier.class);

	@Autowired //Spring will take care of the wiring as usual
	private Town town;

	private ScheduledThreadPoolExecutor schedule;

	@PostConstruct
	public void start() {
		logger.info("Starting feeder");
		schedule = new ScheduledThreadPoolExecutor(1);

		TimerTask task = new TimerTask() {
			public void run() {
				logger.info("Crying the time");
				town.cry("Oyez! Oyez! Oyez! It is now " + new Date());
			}
		};
		schedule.scheduleAtFixedRate(task, 1, 1, TimeUnit.SECONDS);
	}
}
```

If you know Spring Integration you'll cringe at this code and want to use an inbound channel adapter and a poller instead, but we're just simulating legacy code here, so bear with me.

To help Spring refer to the town, which will be put in another bundle, we are going to use Spring DM. If you have never worked with OSGi and Spring DM before this is a good time to read [a primer](http://springosgi.googlepages.com/). We will simply add an OSGi reference element in our osgi-context.xml.

```xml
Copy
<osgi:reference id="collectorService"
	interface="com.springsource.samples.integration.osgi.town.input.Town" />
```

Finally there is a dependency on the town bundle where the service is exported from in the MANIFEST.mf.

```code
CopyImport-Package: com.springsource.samples.integration.osgi.town.input,
 org.apache.commons.logging;version="[1.1.1,1.1.1]",
 javax.annotation
```

Again, the full code is in the [Spring Integration sandbox](https://src.springframework.org/svn/spring-integration/sandbox/si-osgi)

**The Town bundle** The town (bundle) has fully embraced messaging. They are using Spring Integration to take care of messaging and concurrency for them. They also define the input and output interfaces needed by the town crier and the citizens (mentioned later).

The Town interface has a cry method, and we wish to expose an implementation of it to the town crier. We can let Spring Integration create an implementation for us that takes the string argument and puts it on a channel wrapped in a Message. This is done using a gateway.

```xml
Copy
<gateway id="inputGateway" default-request-channel="announcements"
	service-interface="com.springsource.samples.integration.osgi.town.input.Town" />

<publish-subscribe-channel id="announcements" />
```

```java
Copy
public interface Town {
	void cry(String string);
}
```

Since the Town interface has only one method we don't need to tell Spring Integration which method to call, so the @Gateway is optional here.

**Listening in at runtime**

A citizen in the town will register at city hall, but doesn't know about messaging. The Citizen can listen to cry's with it's onCry(String string) method, but doesn't have any dependency on Spring Integration. In some cases you might want to run a bundle with no Spring Integration dependencies, but enable it in an event driven architecture using Spring Integration.

The sample uses a service activator in the Town bundle on the CityHall that takes care of unwrapping the messages and pushing them to citizens:

```java
Copy
@ServiceActivator
public void onCry(String announcement) {
	for (Citizen consumer : citizens) {
		consumer.onCry(announcement);
	}
}
```

To allow citizens to register themselves a CitizenRegistry is exposed as an OSGi service.

```xml
Copy
<osgi:service id="citizenRegistry" ref="cityHall"
	interface="com.springsource.samples.integration.osgi.town.output.CitizenRegistry" />
```

The citizen registry service is also implemented by CityHall to maintain the citizens collection to which announcements are distributed.

In the scribe bundle an example of a Citizen is implemented. It references the CitizenRegistry through an OSGi reference.

```xml
Copy
<osgi:reference id="citizenRegistry"
	interface="com.springsource.samples.integration.osgi.town.output.CitizenRegistry" />
```

The Scribe registers itself to the citizen registry during initialization, and subsequently logs all announcements that it gets pushed.

This way only the town bundle's code needs to change to start using the new system and the citizen bundle can remain the same. Of course there might be good reasons to have multiple bundles that are aware of the messaging going on and share channels directly. In the next section we're going to have a look into that.

### Exposing a channel as an OSGi service

Let's say the town deals with a central government too. The government sends a representative to the town in the form of the government bundle. This representative knows about the announcement channel directly, so there is no need to shield it from it using a gateway or service activator. The town exposes the announcementsChannel as an OSGi service:

```xml
Copy
<osgi:service id="announcementsChannel" ref="announcements"
	interface="org.springframework.integration.channel.SubscribableChannel" />
```

To send government decrees to the town's announcement channel we have a gateway in the government bundle in the sample, but this could be any endpoint. The important point is to reference the channel from the town bundle in the government bundle:

```xml
Copy
	<osgi:reference id="announcementsChannel"
		interface="org.springframework.integration.channel.SubscribableChannel" />
```

Now you can use it as a normal channel in the other bundle:

```xml
Copy
<si:service-activator input-channel="announcementsChannel"
	ref="nationalArchive" />

<si:gateway
	service-interface="com.springsource.samples.integration.osgi.government.GovernmentDecreeGateway"
	id="decreeer" default-request-channel="announcementsChannel" />
```

For the sake of simplicity the sample implements very simple local endpoints, but once the channels are bridging bundles nothing is stopping you from using Spring Integrations adapters to go out of the jvm.

### How do I apply this in the real world?

What if the message payload was an interest rate change from a Central Bank or the Federal Reserve, the town was the central message system for an internal banking application, the citizens were individual trading services (e.g. Foreign Exchange, Bond trading, Options & Warrants, etc). Each needs to be modular since

-   they are changed frequently by different teams
-   more modules are added regularly
-   each module needs to take different action based on the new interest rate

Let's say the government bundle becomes the bank's internal lending/credit division (its own lending rates to others may vary based on the Fed rate - could be built on different architecture). I'm not a financial expert, nor an expert in your domain, so I will not presume to tell you how this technical solution applies exactly. In the future we will refactor the sample to a more realistic domain and add that to the samples to give you some ideas. If you have special requests be sure to comment back here.

### Conclusion

To design a scalable application you need to consider the problems of synchronous handoff. Messaging can resolve many of these problems. To evolve large applications that would best run on a single jvm for optimal performance OSGi is a compelling alternative. Mixing the two with Spring Integration and dm Server is powerful and simple. In this article you have seen how to:

-   use a gateway for inbound calls by bundles without a Spring Integration dependency
-   use a service activator for outbound calls to bundles do not depend on Spring Integration
-   expose a SubscribableChannel to let messages be polled by bundles that use Spring Integration
-   expose a MessageChannel to let messages be pushed by bundles that are using Spring Integration

The same setup is possible with another messaging framework and OSGi container, but the simplicity of this sample sets a good example that will be hard to beat. Yes this is a challenge, go on take the bait, you know you want to...

### Links

-   [SpringSource Tool Suite](http://www.springsource.com/products/suite/sts)
-   [dm Server](http://www.springsource.com/products/suite/dmserver)
-   [Spring Integration](http://www.springsource.org/spring-integration)
-   [dm Server programmer guide](http://static.springsource.com/projects/dm-server/1.0.x/programmer-guide/html/index.html)
-   [Spring Integration reference manual](http://static.springframework.org/spring-integration/reference/htmlsingle/spring-integration-reference.html)
-   [Alternative approach with Camel](http://cwiki.apache.org/confluence/display/CAMEL/tutorial-osgi-camel-part1)