---
title: Spring Integration 1.0.3 Samples: just add Maven
source: https://spring.io/blog/2009/07/21/spring-integration-1-0-3-samples-just-add-maven
scraped: 2026-02-24T09:05:36.514Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  July 21, 2009 | 0 Comments
---

# Spring Integration 1.0.3 Samples: just add Maven

_Engineering | Mark Fisher |  July 21, 2009 | 0 Comments_

Spring Integration 1.0.3 is now available. You can find links to the download, reference manual, and more at the Spring Integration [home](http://www.springsource.org/spring-integration). This release includes quite a few [changes](http://jira.springframework.org/secure/IssueNavigator.jspa?reset=true&pid=10121&fixfor=11209), but in this blog, I'm going to focus on one in particular. Starting with this version, the samples are fully self-contained and Maven-enabled. That means you can download the distribution, go into the 'samples' directory, run 'mvn install' and then import the projects into a Maven-aware Eclipse instance, such as the [SpringSource Tool Suite](http://www.springsource.com/products/sts). Here's the step-by-step breakdown...

## Installing and Running the Samples

1.  Make sure you have Maven installed and in your path (2.0.9 or later is required). If not, download it and follow the setup instructions: [http://maven.apache.org](http://maven.apache.org/)
2.  If you don't already have a Maven-aware version of Eclipse, you can download the [SpringSource Tool Suite](http://www.springsource.com/products/sts) (STS) which will support these projects out-of-the-box (STS even includes support for the OSGi-enabled samples). Alternatively, you can manually add a Maven plugin, such as [m2eclipse](http://m2eclipse.codehaus.org/) to an existing Eclipse installation.
3.  Download the Spring Integration [Samples](http://static.springsource.org/spring-integration/samples/1.0.x/spring-integration-samples-1.0.3-20090721151407.zip) and unzip.
4.  Within the unzipped "samples" directory, run 'mvn install'. You should eventually see output similar to the following: ![si-samples-mvn-install-output](http://blog.springsource.com/wp-content/uploads/2009/07/si-samples-mvn-install-output.png "si-samples-mvn-install-output")
5.  Once STS/Eclipse is up and running, choose 'File -> Import...' and within the Wizard choose 'General -> Existing Projects into Workspace'. Then browse to the unzipped 'samples' directory, and you will see all of the projects selected by default: ![si-samples-import-project-list](http://blog.springsource.com/wp-content/uploads/2009/07/si-samples-import-project-list1.png "si-samples-import-project-list") Either accept all or choose the individual sample(s) that you want to import, and after a few moments of workspace building, you should be ready to run.\*

*\***NOTE:** if you import the 'osgi-inbound' project, you will see some errors on that particular project (but you should not see any errors on the other projects after the workspace build completes). Those errors would be resolved after configuring the runtime and the bundle repository. If you would like to work through the OSGi samples, refer to the dedicated chapter in the [Reference Manual](http://static.springsource.org/spring-integration/reference/htmlsingle/spring-integration-reference.html#samples-osgi). Also, we will be posting a blog that goes into detail on those projects within a few days.*

Each of the samples has a main method within a "Demo" class (except for 'osgi-inbound' and 'osgi-outbound' which are meant to be deployed within an OSGi environment - to be covered in that upcoming blog post). For example, the 'helloworld' project has 'HelloWorldDemo'. In the javadoc of each demo class, you will find a brief overview of features showcased in that individual sample.

## Enterprise Integration Patterns

For those familiar with [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com), here is an overview of some of the patterns that are represented in each sample\*:

**Pattern / Sample**

[Event Driven Consumer](http://enterpriseintegrationpatterns.com/EventDrivenConsumer.html)

[Polling Consumer](http://enterpriseintegrationpatterns.com/PollingConsumer.html)

[Message Filter](http://enterpriseintegrationpatterns.com/Filter.html)

[Message Translator](http://enterpriseintegrationpatterns.com/MessageTranslator.html)

[Content Based Router](http://enterpriseintegrationpatterns.com/ContentBasedRouter.html)

[Splitter](http://enterpriseintegrationpatterns.com/Sequencer.html)

[Aggregator](http://enterpriseintegrationpatterns.com/Aggregator.html)

[Channel Adapter](http://enterpriseintegrationpatterns.com/ChannelAdapter.html)

[Messaging Gateway](http://enterpriseintegrationpatterns.com/MessagingGateway.html)

[Service Activator](http://enterpriseintegrationpatterns.com/MessagingAdapter.html)

[Request/Reply](http://enterpriseintegrationpatterns.com/RequestReply.html)

cafe

X

X

X

X

X

X

X

X

filecopy

X

X

X

X

errorhandling

X

X

X

X

helloworld

X

X

jms

X

X

X

X

X

oddeven

X

X

X

X

X

quote

X

X

X

ws

X

X

X

X

xml

X

X

X

X

X

X

***\*NOTE:** All of the samples feature certain common patterns that are essential to the underlying Spring Integration core:*

-   [Message](http://enterpriseintegrationpatterns.com/Message.html): Spring Integration Messages encapsulate a POJO payload and a header Map ([Reference](http://static.springsource.org/spring-integration/reference/htmlsingle/spring-integration-reference.html#message)).
-   [Message Channel](http://enterpriseintegrationpatterns.com/MessageChannel.html): Spring Integration includes many Message Channel options for both point-to-point and publish-subscribe. Some include queues for buffering while others dispatch directly to subscribers ([Reference](http://static.springsource.org/spring-integration/reference/htmlsingle/spring-integration-reference.html#channel-configuration)).
-   [Message Endpoint](http://enterpriseintegrationpatterns.com/MessageEndpoint.html): At a high level, this includes all components that connect to channels for input and/or output.
-   [Messaging Mapper](http://enterpriseintegrationpatterns.com/MessagingMapper.html): Spring Integration binds inbound Messages to method arguments and method return values to Message payloads and/or headers.
-   [Message Dispatcher](http://enterpriseintegrationpatterns.com/MessageDispatcher.html): In Spring Integration, channels that do not have a queue use Message Dispatchers to invoke their subscribers.
-   [Pipes and Filters](http://enterpriseintegrationpatterns.com/PipesAndFilters.html): This is the most general pattern describing Message-processing components connected in a loosely-coupled way via channels.
-   [Message Bus](http://enterpriseintegrationpatterns.com/MessageBus.html): Spring Integration essentially turns a Spring ApplicationContext into a lightweight Message Bus within which all of these other components are hosted.

## Next Steps

For more detailed information, check out the [Samples](http://static.springsource.org/spring-integration/reference/htmlsingle/spring-integration-reference.html#samples) chapter of the Reference Manual and the **README** file located directly in the "samples" directory of the main distribution. Also, stay tuned for another blog covering the new OSGi based samples added in Spring Integration 1.0.3. That should be posted within a few days.

Last but not least, be sure to check out the "POJO Messaging" sample from the [Spring BlazeDS project](http://www.springsource.org/spring-flex) (see the build and run instructions in the Spring BlazeDS [Reference Manual](http://static.springsource.org/spring-flex/docs/1.0.x/reference/html/ch06.html)). That demonstrates Flex Producer and Consumer elements whose "destinations" are backed by Spring Integration Message Channels.