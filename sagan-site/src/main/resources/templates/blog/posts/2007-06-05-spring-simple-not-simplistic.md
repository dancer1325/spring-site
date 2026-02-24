---
title: Spring: simple, not simplistic...
source: https://spring.io/blog/2007/06/05/spring-simple-not-simplistic
scraped: 2026-02-24T09:28:58.087Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  June 05, 2007 | 0 Comments
---

# Spring: simple, not simplistic...

_Engineering | Alef Arendsen |  June 05, 2007 | 0 Comments_

During a training last week, for the first time, I used the first Release Candidate of Spring Web Services. It's hardly been two weeks since Arjen release RC1 of his precious, so it was very nice to show some of the attendees this new product.

Right before the web services part we did a little JMX and remoting, showing Spring's exporter functionality. As you might know, this allows you to export any Spring-managed bean to a remote endpoint or JMX registry, with just a very little amount of declarative configuration:

```xml
Copy
<bean id="myService" class="com.mycompany.MyServiceImpl">
    <property name="myDao" ref="myDao"/>
</bean>

<bean class="org.springframework.remoting.rmi.RmiServiceExporter">
	<property name="serviceName" value="myService"/>
	<property name="serviceInterface" value="com.mycompany.MyService"/>
	<property name="service" ref="myService"/>
</bean>
```

This is all **very** easy and is very much in line with what the audience usually thinks about Spring up until now: Spring is making all the stuff that used be very hard so much simpler; it just requires a few lines of XML (or some of the other configuration options that we currently are implementing) and done you are. This is of course true, but it's not the impression that I'd like to see people leaving a Core Spring training with.

Fortunately, in the form of Spring Web Services, Arjen gave me some excellent material to once and for all tell that the way we would like to have you think about Spring is entirely different from 'it's just about adding a few lines of XML and then we're done'. It's not like that!

To get back to the training I conducted last week; we were just done with JMX when I started my usual talk about web services. The short version basically says: ***web services != remoting***, you'd better learn to live with the fact that this means that ***the amount of stuff you have to do to implement a web service != the amount of stuff you have to do to export a service to an RMI endpoint*** (I suspect it's very likely that != can in all cases be replaced by >).

Arjen and me are working on a article that will explain this in much greater detail. Until then, the [Spring Web Services reference manual](http://static.springframework.org/spring-ws/site/reference/html/index.html) and [Arjen's personal blog](http://blog.interface21.com/arjen) should give you plenty information about the reasoning behind all of this.

What (very pleasantly) surprised me last week however was that one attendee to the training all of a sudden interrupted me and said: **'hey I get it know, the Spring approach is not necessarily about simplifying my code or reducing the amount of code, it's about taking away unnecessary complexity and allowing me to focus on what's important.'**.

This guy (Thomas, yes, it was you :) ), is soooo unbelievably right. Every part of the Spring Portfolio is focused at doing exactly that:

**Dependency Injection and AOP** are focused on providing a clean yet powerful approach to injecting dependencies and implementing cross-custting behavior. Modularity and separation of concerns are things that should be easy to achieve and are **very important issues**. Spring's DI container and the AOP facilities are focused on allowing you to achieve modularity and good separation of concerns. They're not primarily focused on simplifying your code. The fact that this is one of the results of using DI and AOP is a nice side-effect I would almost say ;-)

**Spring's remote exporters** are meant to provide a nearly transparent way of calling server-side code from remote locations. When wanting to implement an RMI-based remote endpoint, we're implicitly saying that we want to tightly couple our service to our client. Spring's remote exporters are not designed to do this in just four lines of XML. They were designed to get this nearly transparent programming experience. The fact that it can be done in just four lines of XML, again, is a nice side-effect.

And now the kicker... when we are implementing a web service, implicitly we are saying that we want to *loosely couple* our service from any potential client that might be using our service. We are not (or should not be) looking for a transparent way to issue method calls using <soap:Envelope> and <soap:Body> tags. Version management, flexibility and the ability to remain backward compatible are key to implementing robust web services that stand the test of time and loosely couple our clients to our service. Spring Web Services was designed to address these issues and to allow you to address them *very easily*. It was not meant to simplify your code! Although I am very sure that in many scenarios that code that you'll end up with when using Spring Web Services is as simple and understandable as it could possibly be!

I walked to my car with a big smile on my face last Friday. We had ended this training understanding the most important lesson: **Spring was not designed to simplify code; it was designed to let you focus on what matters. The code simplification that you get as a side-effect, of course that's something we can all appreciate I am sure!**