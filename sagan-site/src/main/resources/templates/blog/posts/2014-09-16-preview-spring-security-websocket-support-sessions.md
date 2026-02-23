---
title: Preview Spring Security WebSocket Support & Sessions
source: https://spring.io/blog/2014/09/16/preview-spring-security-websocket-support-sessions
scraped: 2026-02-23T22:14:12.898Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  September 16, 2014 | 16 Comments
---

# Preview Spring Security WebSocket Support & Sessions

_Engineering | Rob Winch |  September 16, 2014 | 16 Comments_

## [](#introduction)Introduction

In my previous post, I discussed Spring Security WebSocket integration. One of the problems is that in a servlet container, the WebSocket requests do not keep the `HttpSession` alive.

Consider an email application that does much of its work through HTTP requests. However, there is also a chat application embedded within it that works over WebSocket APIs. If a user is actively chatting with someone, we should not timeout the `HttpSession` since this would be pretty poor user experience. However, this is exactly what [JSR-356 does](https://java.net/jira/browse/WEBSOCKET_SPEC-175).

Another issue is that according to JSR-356 if the `HttpSession` times out any WebSocket that was created with that `HttpSession` and an authenticated user should be forcibly closed. This means that if we are actively chatting in our application and are not using the `HttpSession`, then we will also disconnect from our conversation!

## [](#spring-session)Spring Session

The Spring Security team initially set out to solve these problems in Spring Security 4.0.0.M2. However, we realized that this was a much broader problem and so [Spring Session](https://github.com/spring-projects/spring-session) was born.

## [](#spring-session-http-integration)Spring Session HTTP Integration

The first step is to configure Spring Session in our web application. This means that our `HttpSession` is now backed by Spring Session and not our container.

In the example below, we add Spring Session to our Spring Security's `HttpSecurity instance`. Alternatively, we could have added the `SessionRepositoryFilter` directly to our Servlet Container's filter mappings before `springSecurityFilterChain`. You can find much more detailed steps in the [Spring Session reference](https://github.com/spring-projects/spring-session#quick-start).

```java
Copyprotected void configure(HttpSecurity http) throws Exception {
    http
        .addFilterBefore(new SessionRepositoryFilter(sessionRepository), ChannelProcessingFilter.class)
        ...
}
```

## [](#spring-session-websocket-integration)Spring Session WebSocket integration

Spring Session does not yet have support for WebSocket integration, but it is planned in the [next release](https://github.com/spring-projects/spring-session/issues/35). However, we can easily implement it ourselves.

The first step is to ensure we have access to the session id in our WebSocket Session. We can do this by creating a `HandshakeInterceptor`

```java
Copypublic class HttpSessionIdHandshakeInterceptor implements HandshakeInterceptor {

        public boolean beforeHandshake(ServerHttpRequest request, 
                ServerHttpResponse response, 
                WebSocketHandler wsHandler, 
                Map<String, Object> attributes) 
                  throws Exception {
            if (request instanceof ServletServerHttpRequest) {
                ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
                HttpSession session = servletRequest.getServletRequest().getSession(false);
                if (session != null) {
                    attributes.put(SESSION_ATTR, session.getId());
                }
            }
            return true;
        }

        public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Exception ex) {
        }
    }
```

We can then add the `HandshakeInterceptor` to our endpoint. For example:

```java
Copypublic class WebSocketConfig extends 
          AbstractWebSocketMessageBrokerConfigurer {

    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/portfolio")
                .withSockJS()
                .setInterceptors(new HttpSessionIdHandshakeInterceptor());

    }

   ...
}
```

Next we can create a `ChannelInterceptorAdapter` that uses the session id to update the last accessed time using Spring Session. For example:

```java
Copy@Bean
public ChannelInterceptorAdapter sessionContextChannelInterceptorAdapter() {
    return new ChannelInterceptorAdapter() {
        @Override
        public Message<?> preSend(Message<?> message, MessageChannel channel) {
            Map<String, Object> sessionHeaders = SimpMessageHeaderAccessor.getSessionAttributes(message.getHeaders());
            String sessionId = (String) sessionHeaders.get(SESSION_ATTR);
            if (sessionId != null) {
                Session session = sessionRepository.getSession(sessionId);
                if (session != null) {

                    sessionRepository.save(session);
                }
            }
            return super.preSend(message, channel);
        }
    };
}
```

Last we need to configure the incoming messages to use the `ChannelInterceptorAdapter` so that each time a message is received, we update the last accessed time of the `HttpSession`. For example:

```java
Copypublic class WebSocketConfig extends 
          AbstractWebSocketMessageBrokerConfigurer {

    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.setInterceptors(sessionContextChannelInterceptorAdapter());
    } 
    ...
}
```

## [](#sample-application)Sample Application

You can find a complete example, of authorization and session management in the security branch of [rwinch/spring-websocket-portfolio](https://github.com/rwinch/spring-websocket-portfolio/tree/security).