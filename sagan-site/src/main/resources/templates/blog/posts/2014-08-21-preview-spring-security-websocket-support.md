---
title: Preview Spring Security WebSocket Support
source: http://spring.io/blog/2014/08/21/preview-spring-security-websocket-support
scraped: 2026-02-23T22:03:43.238Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  August 21, 2014 | 2 Comments
---

# Preview Spring Security WebSocket Support

_Engineering | Rob Winch |  August 21, 2014 | 2 Comments_

\[callout title=Updated Dec 11 2014\]Although originally about Spring Security 4.0.0.M2, the blog has been updated to reflect improvements found in Spring Security 4.0 RC1.\[/callout\]

## [](#introduction)Introduction

Previously, an application could use Spring Security to perform authentication in a WebSocket application. This worked because the `Principal` of an `HttpServletRequest` will be propagated to the WebSocket Session.

The problem is that authorization was limited to handshake. This means that once the connection was made, there was no way to provide any granularity to authorization of the WebSocket application.

## [](#using-spring-securitys-messaging-support)Using Spring Security's Messaging Support

Spring Security 4.0.0.RC2 has introduced authorization support for WebSockets through the Spring Messaging abstraction. To provide authorization, simply extend the `AbstractSecurityWebSocketMessageBrokerConfigurer` and configure the `MessageSecurityMetadataSourceRegistry`. For example:

```java
Copypublic class WebSocketSecurityConfig extends
          AbstractSecurityWebSocketMessageBrokerConfigurer {
    protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
      messages
        . simpDestMatchers("/user/queue/errors").permitAll()
        . simpDestMatchers("/**").hasRole("ADMIN");
      }
  }
```

\[callout title=Direct JSR-356 Support\]We have entertained integrating directly with JSR-356. However, at this time it is very difficult since JSR-356 is very low level and currently does not provide the abstractions necessary.\[/callout\]

This will ensure that:

-   The `/user/queue/errors` destination can be accessed by any user
-   Any other Message containing a destination header can only be accessed by users with the role of `ROLE_ADMIN`

## [](#xml-namespace-support)XML Namespace Support

Similarly we could have defined the above configuration using the Spring Security XML Namespace Support. The equivalent configuration is:

```xml
Copy<websocket-message-broker>
    <!-- pattern matches on the destination header -->
    <intercept-message pattern="/user/queue/errors" access="permitAll" />
    <intercept-message pattern="/**" access="hasRole('ROLE_ADMIN')" />
</websocket-message-broker>
```

## [](#method-security-and-websockets)Method Security and WebSockets

We can also use method security with WebSockets. For example, the following method can only be invoked by a user with the role `ROLE_ADMIN`:

```java
Copy	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@MessageMapping("/trade")
	public void executeTrade(Trade trade, Principal principal) {
```

## [](#sample-application)Sample Application

You can find a complete example, of authorization in the security branch of [rwinch/spring-websocket-portfolio](https://github.com/rwinch/spring-websocket-portfolio/tree/security).

## [](#what-next)What Next?

While this resolves our authorization problems, we still are missing a good mechanism to keep our `HttpSession` alive when sending messages over WebSockets. In the next post, I will discuss in more detail what these problems are and how Spring Session can alleviate these problems.

\[callout title=SpringOne 2GX 2014 is around the corner\]Book your place at [SpringOne](https://2014.event.springone2gx.com/register) in Dallas, TX for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. [From 0 to Spring Security 4.0](https://2014.event.springone2gx.com/schedule/sessions/from_0_to_spring_security_4_0.html) session will contain detailed information on how to get started with Spring Security and provide a deep dive into the new features found in Spring Security 4. Of course there plenty of other [exciting Spring related talks](https://2014.event.springone2gx.com/schedule/2014-09-09)!\[/callout\]