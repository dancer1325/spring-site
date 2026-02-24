---
title: Messaging meets OSGi at OSGi DevCon Europe
source: https://spring.io/blog/2009/06/23/messaging-meets-osgi-at-osgi-devcon-europe
scraped: 2026-02-24T09:06:23.281Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Iwein Fuld |  June 23, 2009 | 0 Comments
---

# Messaging meets OSGi at OSGi DevCon Europe

_Engineering | Iwein Fuld |  June 23, 2009 | 0 Comments_

Yesterday I was speaking at OSGi DevCon Europe about using Spring Integration and dm Server to tackle common problems in large applications in a pragmatic way. Before and after my session I talked to various people that liked to have a little more information about these ideas. This blog will give an overview of what I talked about.

I'll jump right in with a summary of the presentation.

Any project will grow during its lifetime of active development. Usually developers add features and fix problems raised by the product owners by adding code. This process will naturally grow the code base. While the source grows the maintenance and fixing bugs typically gets harder. If not dealt with this process will ultimately lead to something I call Code Supernova. This uncontrolled growth, and eventual collapse, can be countered by proper modularization, and OSGi is one of the more compelling medicines currently available.

A second problem I talked about is the single thread breakdown. In a servlet container like Tomcat this is mitigated using a threadpool to service clients, but if a single request represents a large job it is wasteful to run that in a single thread. For more expensive service invocations you need to divide the work. Also in batch or middleware focused systems you will not have the luxury to rely on the web container to do thread management for you, so you will have to deal with the problem yourself, or use a good framework.

Thirdly modularization will negatively effect the response time of the system. This holds in particular for modularization that introduces network boundaries. Even without the latency the result of a service invocation might have so many subsequent steps that it simply takes too long to wait for it before rendering the response.

The latter two problems are resolved by Messaging, while OSGi plays an important role in keeping the network latencies introduced to a minimum.

Check out the presentation if you like to get some background.

[Os Gi+Spring Integration](http://www.slideshare.net/iweinfuld/os-gispring-integration?type=powerpoint "Os Gi+Spring Integration")

View more [Keynote presentations](http://www.slideshare.net/) from [Iwein Fuld](http://www.slideshare.net/iweinfuld).

I've done a little demo of a (simplistic) example of a system with and how to develop it using SpringSource Tool Suite, dm Server and Spring Integration. I've already detailed the idea in a previous blog (see [Spring Integration on dm Server](http://blog.springsource.com/2009/02/27/spring-integration-on-dm-server/)) so I won't repeat myself here. I've chosen a different domain than the town crier I used back then. It was about a bus, with a driver and some passengers... I've been told a few times that there should be a serious example too, but I can't seem to help myself. Maybe *you* can be the one to implement a fake stock trade system and commit it to the Spring Integration samples? I liked doing the demo a lot anyway, it even has twitter!

Just a few snippets so you can build your own twitter integration. I've seen prior art on this before, but I couldn't find it anymore, anyway it's trivial. The Twitterer:

```java
Copy
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.annotation.MessageEndpoint;
import twitter4j.Twitter;
import twitter4j.TwitterException;

@MessageEndpoint
public class Twitterer {
	@Autowired
	Twitter twitter;

	private AtomicInteger counter = new AtomicInteger(0);

	public void tweet(String tweet) {
		if (counter.incrementAndGet() < 3) {
			try {
				twitter.updateStatus("Announcement: \" " + 
						tweet + "\"");
			} catch (TwitterException e) {
				throw new RuntimeException(e);
			}
		}
	}
}
```

In the application context (namespaces omitted for brevity):

```xml
Copy
	<integration:outbound-channel-adapter ref="twitterer"
		method="tweet" channel="intercom" />

	<context:property-placeholder 
		location="classpath:/passenger/twitter.properties" />

	<beans:bean id="twitter" class="twitter4j.Twitter" 
		p:userId="${twitter.user}"
		p:password="${twitter.password}" />
```

The Twitterer is responsible for tweeting. You could actually replace it with a message filter, but I would not recommend attaching a channel adapter directly to the twitter4j.Twitter.updateStatus(..) method. If you want to see what happens then, look [here](http://twitter.com/iwrobot).

If you're wondering where the twitter4j bundle is, I just created it myself using the Bundlor integration in SpringSource Tool Suite. It took me less than 20 minutes and it was [completely painless](http://blog.springsource.com/2009/03/26/using-bundlor-in-eclipse/). Obviously there is [an issue open for this](https://issuetracker.springsource.com/browse/EBR-228), so it will be added to the our repository in the future.

I hope you can relate to these ideas and add to them where I've been incomplete. I am going sailing now, so my responses will have to wait until I'm done with that, but don't let that hold you back. Feedback is greatly appreciated as always.