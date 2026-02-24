---
title: Spring Integration 2.0 GA Released
source: https://spring.io/blog/2010/11/23/spring-integration-2-0-ga-released
scraped: 2026-02-24T08:50:52.014Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  November 23, 2010 | 0 Comments
---

# Spring Integration 2.0 GA Released

_Engineering | Mark Fisher |  November 23, 2010 | 0 Comments_

I am very pleased to announce that Spring Integration 2.0 GA has been released!

### Download

The distribution zip containing the Spring Integration JARs, source JARs, and documentation can be downloaded [here](http://www.springsource.com/download/community?project=Spring%20Integration).

### Dependency Configuration

The artifacts should also be available from the Maven central repository at some point later today. In the meantime, you can add the springframework Maven repository to your POM. The following example shows a dependency on "spring-integration-core" and the springframework repository entry. If you plan to use any of our adapters, you can replace "spring-integration-core" with the appropriate adapter, e.g. "spring-integration-twitter" (and all of the adapters will pull "core" into your app as a transitive dependency):

```xml
Copy
<dependencies>
    <dependency>
        <groupId>org.springframework.integration</groupId>
        <artifactId>spring-integration-core</artifactId>
        <version>2.0.0.RELEASE</version>
    </dependency>
</dependencies>

<repositories>
    <repository>
        <id>repository.springframework.maven.release</id>
        <name>Spring Framework Maven Release Repository</name>
        <url>http://maven.springframework.org/release</url>
    </repository>
</repositories>
```

### What's New?

To learn about the new features in this version, please visit the ["What's New?"](http://static.springsource.org/spring-integration/docs/2.0.0.RELEASE/reference/htmlsingle/#whats-new-in-2-part) section of our Reference Manual. From there you will find links to the particular chapters and sections that cover the new features. Also, you can read more about those same features in my [recent blog](http://blog.springsource.com/2010/10/29/spring-integration-2-0-release-candidate-1/) about our 1st Release Candidate.

Those two resources should serve as a great starting point for existing 1.0 users. We will also be providing a "migration guide" within the next couple weeks. Please stay tuned, but in the meantime [this blog](http://blog.jteam.nl/2010/11/17/migrating-from-spring-integration-1-0-3-to-2-0-0-rc2/) by Roberto van der Linden of JTeam covers most of the main points.

### Sneak Peek

I have a difficult time writing a blog entry without any code samples, so I figured I would give you a quick taste of one of the new features: Twitter support. In fact, I created this "application" this morning in order to monitor what the Twittersphere had to say about Spring Integration on release day. Here is the entire configuration:

```xml
Copy
<twitter:search-inbound-channel-adapter query="spring integration" channel="logger">
    <poller fixed-rate="60000" max-messages-per-poll="50"/>
</twitter:search-inbound-channel-adapter>

<logging-channel-adapter id="logger" expression="payload.fromUser + ': ' + payload.text"/>
```

Every minute, the search is executed, and if there are any new Tweets, they are sent to the logger. The only code is the main() method used to bootstrap the Application Context:

```java
Copy
public static void main(String[] args) {
    new ClassPathXmlApplicationContext("twitter/context.xml");
}
```

In case you don't believe that it really is that simple ;), the project is available on [github](https://github.com/markfisher/twitter-search-sample). It also just happens to be nearly identical to one of the Spring Integration samples in our repository. To learn more about our samples, be sure to read Oleg's [recent blog](http://blog.springsource.com/2010/09/29/new-spring-integration-samples/).

### The Bigger Picture

Just this past week, I presented a webinar entitled "Message Driven Architecture with Spring". That included a fairly broad overview of Spring's support for Events, Messaging with both JMS and AMQP, Lifecycle Management, Asynchronous Execution, Task Scheduling and Triggers.

The recording is available [here](http://www.springsource.com/webinar/message-driven-architecture-spring). Check it out if you want to learn as much as you can, in just one hour, about Spring Integration and how it fits within the Spring platform as a whole. It also features a couple interesting samples: the Loan Broker (inspired by the [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com) book) and the wildly popular REST/SOAP/Twitter/Email sample that Oleg and I presented at [SpringOne2Gx](http://www.springone2gx.com/conference/chicago/2010/10/session?id=19338).

### The Community

Finally, I want to thank the community. We absolutely could not have done this without you. The [forum](http://forum.springsource.org/forumdisplay.php?f=42) activity has been steadily increasing, and it's especially nice to see members starting to answer questions for others in addition to asking them ;). Overall, the feedback we received from users there and in the [issue tracker](http://jira.springsource.org/browse/INT) have had an enormous influence on this release.

As always, you can find all the relevant links on the [Spring Integration Home Page](http://www.springsource.org/spring-integration).

Enjoy! Mark