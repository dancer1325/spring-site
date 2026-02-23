---
title: YMNNALFT:  Websockets
source: https://spring.io/blog/2021/01/25/ymnnalft-websockets
scraped: 2026-02-23T13:33:51.810Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 25, 2021 | 3 Comments
---

# YMNNALFT:  Websockets

_Engineering | Josh Long |  January 25, 2021 | 3 Comments_

Welcome to another installment of *You May Not Need Another Library For That* (YMNNALFT)! I've spent a lot of time since 2016 illuminating (or trying to, anyway!) some of the more enormous opportunities in the Spring ecosystem in [my Spring Tips videos](http://bit.ly/spring-tips-playlist). Today, however, I come to you in a different spirit, wanting to focus on the little, sometimes hidden, gems that do fantastic things and that might spare you an additional third-party dependency and its implied complexity.

The open web has long extended hope to those who wanted a commodity platform to build and deploy services and applications at a large scale. We knew that the web could be compelling once a few things were improved. People could deliver rich clients that would be upgradeable with the refresh of a browser page. They could deliver data-and-multimedia-centric, immersive experiences. We knew that people could do these things if they only had the right paradigm for building web sites and services. But they say that you can't appreciate the sweet without the sour, so the community embarked on a mission to find the *absolute worst* approach to building websites and services, and that, kids, is the story of how we got PHP.

The End. ...

Alright, so there's a *little* more to it. In the beginning, there were severe limitations in both the backend and in the client. The problems with the client endured a lot longer than the issues with the backend, however. By the early 2000s, every significant programming language community could build HTTP services, but the client's abilities stagnated. (It was almost like some major force was acting in bad faith to keep the open web from advancing. But why? And who? It's a mystery, one I suppose we'll never resolve...)

The open web evolved on its own. It HTTP ` PATCH` 'ed itself. In the late 90s, we got PayPal to make secure commerce possible. In the early 2000s, we got the constraint on HTTP called REST (which stands for Really Easy Service Transactions, or was it REcent Software Trend? No. That's not right. Representational State Transfer! That sounds right...). And then "Ajax" (no, *not* the cleaning product) [arrived](http://www.jjg.net/about/), which allowed the client to make requests of the service in-situ, without forcing another HTTP roundtrip to the service to fetch a new page. Lovely. Then we spent an agonizing five years or so trying to find ways to push data from the server to the client instead of sending data to a client in response to the client's request.

And we did try *everything*. There were kludges upon kludges. (Here's a fun fact: janky JavaScript existed *years* before Node.js arrived!) Eventually, in 2011, we got a standard that all the HTTP browser vendors and HTTP server vendors could support consistently, and that solved 70% of our needs: [WebSockets](https://en.wikipedia.org/wiki/WebSocket). Websockets are awesome! They're the best way to introduce asynchronous communication to a browser-based application. They're fast, they're lightweight and easy to implement.

While there are many frameworks that you can use to implement WebSocket endpoints, you needn't look any further than Spring as it's supported out of the box for both reactive and non-reactive services. Let's look at a service example using Spring Webflux, the reactive web runtime.

You'll need the following dependencies.

-   Reactive Web on [the Spring Initializr](http://start.spring.io) - `org.springframework.boot` : `spring-boot-starter-webflux`

Here's what I put into my `application.properties`:

```properties
Copyspring.main.web-application-type=reactive

```

Here's the code:

```java
Copypackage bootiful.websockets.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import reactor.core.publisher.Flux;

import java.util.Map;

@SpringBootApplication
public class BootifulApplication {

	public static void main(String[] args) {
		System.setProperty("spring.profiles.active", "wsserver");
		SpringApplication.run(BootifulApplication.class, args);
	}

	@Bean
	SimpleUrlHandlerMapping greetingsHm() {
		return new SimpleUrlHandlerMapping(Map.of("/ws/greetings", greetingsWsh()), 10);
	}

	@Bean
	WebSocketHandler greetingsWsh() {
		return session -> {

			Flux<WebSocketMessage> out = session.receive().map(WebSocketMessage::getPayloadAsText)
					.flatMap(name -> Flux.just("Hi, " + name).map(session::textMessage));

			return session.send(out);
		};
	}

}
```

The `SimpleUrlHandlerMapping` maps the `WebSocketHandler` to an HTTP URI. The `WebSocketHandler` provides the reactive WebSocket endpoint logic, turning the incoming payload (a name) into a greeting (`Hi, NAME!`) to be sent to the client.

Now, I'm going to do something that I would not normally do. If there were *any* other way, friends, I would surely prefer that alternative to this rather unbecoming way forward. I would not do this in polite company, but I feel there's no other way to get this done, no other way to demonstrate how trivial it can be to communicate with a WebSocket endpoint. I do not do this lightly.

I.. am going to use JavaScript:

```
Copy    window.addEventListener('load', () => {
        const ws = new WebSocket('ws://localhost:8080/ws/greetings')
        ws.addEventListener('open', () => {
            ws.send('JavaScript Fans')
        })
        ws.addEventListener('message', (message) => {
            console.log(message.data)
        })
    })

```

In the example, we set up a `WebSocket` object in JavaScript, register a callback to send data on the WebSocket when it was finally ready, and register another callback for any replies that arrive. Go to your browser's *Developer Tools* (instructions vary for each browser, but you might try `OPTION` + `CMD` + `I` if you're on a Mac and using Chrome or Firefox) and then choose `Console`. You'll see the response from the WebSocket endpoint there.

With more code, we can also talk to that service using the Spring `WebSocketClient`.

You'll need the following dependencies.

-   Reactive Web on [the Spring Initializr](http://start.spring.io) - `org.springframework.boot` : `spring-boot-starter-webflux`

Here's the code:

```java
Copypackage bootiful.websockets.client;

import lombok.SneakyThrows;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.client.ReactorNettyWebSocketClient;
import org.springframework.web.reactive.socket.client.WebSocketClient;
import reactor.core.publisher.Mono;

import java.net.URI;

@SpringBootApplication
public class BootifulApplication {

	@SneakyThrows
	public static void main(String[] args) {
		System.setProperty("spring.profiles.active", "wsclient");
		SpringApplication.run(BootifulApplication.class, args);
		Thread.sleep(5_000);
	}

	@Bean
	WebSocketClient webSocketClient() {
		return new ReactorNettyWebSocketClient();
	}

	@Bean
	ApplicationListener<ApplicationReadyEvent> ready(WebSocketClient client) {
		return event -> client.execute(URI.create("ws://localhost:8080/ws/greetings"), webSocketSession -> {
			WebSocketMessage world = webSocketSession.textMessage("Spring Fans");
			return webSocketSession.send(Mono.just(world))
					.thenMany(webSocketSession.receive().map(WebSocketMessage::getPayloadAsText).log()).then();
		})//
				.subscribe();
	}

}
```

Here's what I put into my `application.properties`:

```properties
Copyspring.main.web-application-type=none
```

WebSockets make our browser-based clients more lively. I quite prefer RSocket for service-to-service communication, however.

Did you like this gem at a glance approach? Did you learn anything? As always, I'm keen on hearing from you, so [please sound off on Twitter (@starbuxman)](http://twitter.com/starbuxman) ! I'll be back with another installment of *YMNNALFT*, so be sure not to miss that.