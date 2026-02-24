---
title: Sun\'s GlassFish Embracing Spring
source: https://spring.io/blog/2007/02/16/sun-s-glassfish-embracing-spring
scraped: 2026-02-24T09:31:57.789Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  February 16, 2007 | 0 Comments
---

# Sun's GlassFish Embracing Spring

_Engineering | Rod Johnson |  February 16, 2007 | 0 Comments_

Sun take open source seriously these days, and users seem to be starting to take Sun open source seriously too.

[GlassFish](https://glassfish.dev.java.net/) was late to the party in open source application servers, but it seems to be gaining traction. And, more importantly, it actually seems to be pretty good. Various Interface21ers, including Costin and Juergen, have taken a look at GlassFish and given it the thumbs up (although we haven't yet worked with it in production). From what I've heard, performance is excellent--probably substantially due to the reworked servlet engine based on NIO. The JPA implementation--TopLink Essentials--should perform well too, being based on the mature and performant TopLink engine.

There also is evidence of real GlassFish adoption: for example, by the prominent Australian hotel booking service, [Wotif.com.](http://blogs.sun.com/stories/entry/wotif) Judging from my recent trip to Australia, [Wotif](http://www.wotif.com.au) is one of those sites like eBay and lastminute.com that normal people, rather than just technology people, talk about.

Naturally, Wotif.com are using Spring also. I think part of what's making Sun more relevant in the enterprise Java space is that they are now more plugged into what's happening in the wider world, and are willing to take the input on board and act on it.

Thus Sun have been moving toward offering Spring support for GlassFish in several areas, notably in the web services stack. This is particularly interesting, as the web services part of GlassFish is (naturally) the RI.

GlassFish developer Kohsuke Kawaguchi recently blogged about [Spring support in the JAX-WS stack](http://weblogs.java.net/blog/kohsuke/archive/2007/01/spring_support.html). This is particularly cool as it works through providing a Spring 2.0 namespace handler. Note the use of the JAX-WS namespace along with the core Spring beans namespace, allowing Spring bean definitions to be mixed in with JAX specific configuration:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:ws= "http://jax-ws.dev.java.net/spring/core"
       xmlns:wss="http://jax-ws.dev.java.net/spring/servlet" ...>

  <wss:bindings id="jax-ws.http">
    <wss:bindings>
      <wss:binding url="/stockQuote">
        <wss:service><!-- nested bean is of course fine -->
          <ws:service impl="foo.MyService">
            <ws:handlers>
              <ref bean="myHandler" />
            </ws:handlers>
          </ws:service>
        </wss:service>
      </wss:binding>
    </wss:bindings>
  </wss:bindings>

  <bean id="myHandler" class="foo.MyHandler" />
</beans>
```

This is the other way around from Spring remoting, with the remoting technology basically calling on Spring, rather than Spring *exporting* services, but it's equally well integrated and easy to use. Presumably it is also possible to import other Spring configuration files to leverage existing bean definitions.

Kohsuke adds the interesting thought that:

> Since Spring support is open-ended, this can be used to enable other JAX-WS extensions. So for example we can use this to configure JMS transport, or to configure JSON encoding, etc.

Now web service endpoints can directly hook into everything Spring has to offer: all the configuration capabilities, declarative services and enterprise integration...

There is documentation on the JAX-WS RI's Spring integration [here](https://jax-ws-commons.dev.java.net/spring/).

The Spring support seems to have been [well received](http://blogs.sun.com/theaquarium/entry/good_buzz_about_spring_support) in the GlassFish community. It would be interesting to hear from the Spring community, as well. What integration features would you like in GlassFish? Some of the integration features released thus far in WebLogic are probably a good start, like enhanced transaction management and JMX/console integration.

We have also, of course, already done a lot of work in Spring 2.0 with JPA and TopLink Essentials, the JPA RI and persistence engine in GlassFish. Mike Keith, EJB 3.0 co-lead, core TopLink developer and general ORM guru, has been very helpful, and we've found the whole TopLink team very responsive.