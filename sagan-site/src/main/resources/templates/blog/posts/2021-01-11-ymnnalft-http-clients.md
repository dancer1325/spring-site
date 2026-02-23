---
title: YMNNALFT:  HTTP Clients
source: https://spring.io/blog/2021/01/11/ymnnalft-http-clients
scraped: 2026-02-23T13:35:23.592Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 11, 2021 | 4 Comments
---

# YMNNALFT:  HTTP Clients

_Engineering | Josh Long |  January 11, 2021 | 4 Comments_

Welcome to another installment of *You May Not Need Another Library For That* (YMNNALFT)! I've spent a lot of time since 2016 illuminating (or trying to, anyway!) some of the more enormous opportunities in the Spring ecosystem in [my Spring Tips videos](http://bit.ly/spring-tips-playlist). Today, however, I come to you in a different spirit, wanting to focus on the little, sometimes hidden, gems that do fantastic things and that might spare you an additional third-party dependency and its implied complexity.

Today we're going to look at an all-in-one, handy dandy HTTP client, the `WebClient`.

HTTP services are a common source of data. The web is an existence proof of the scalability and resilience of HTTP, and it makes a very compelling case for constraints on HTTP, like REST, when building network services. If HTTP is the lingua franca of the open web, then we must ask questions in HTTP.

There are some great libraries out there (like [Apache HttpComponents Client](http://hc.apache.org/) and [OkHttp](https://square.github.io/okhttp/)) that work in much the same way. If you haven't got a particular one in mind but want a world-class option and are already using Spring, you could use the non-blocking, Netty-based HTTP client in Spring Webflux, the `WebClient`.

The `WebClient` is the reactive, non-blocking alternative to the `RestTemplate`. I love the `WebClient` because it is non-blocking: the client thread used to make the network request won't get hung up waiting for a network service response. This implies much better scalability - threads are free to be used for something else. I also love the `WebClient` because it uses the Reactive Streams APIs, making composition *much* easier. We just saw some of that in the last example.

You can use the `WebClient` to talk to any old HTTP endpoint, not just those written using non-blocking or reactive APIs on the server-side. And, even better, you can use the `WebClient` even in otherwise non-reactive code. What if - and just hear me out here - *what if* somebody wanted to use the `WebClient` but couldn't use the full reactive Spring web stack?

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F1M9fmo1WAFVK0%2Fgiphy.gif&f=1&nofb=1)

Search me! I can't imagine why you'd not want to use the reactive HTTP stack. That's OK even if you don't because there's still a lot of value in using the `WebClient` all by its lonesome. You could use the `WebClient` to make one or more HTTP calls and then concurrently compose the results. It's ideal for easy scatter-gather kinds of composition. This is a natural thing to want to do even if you're not otherwise using a reactive HTTP runtime, as might be the case if you're running in a Servlet environment.

You'll need the following dependencies to get the `WebClient` on the classpath.

-   Reactive Web on [the Spring Initializr](http://start.spring.io) - `org.springframework.boot` : `spring-boot-starter-webflux`

Let's look at some code. This example does two different things (concurrently):

-   Initializes a new project using the HTTP API that powers [the Spring Initializr](http://start.spring.io)
-   It retrieves all of the active open-source Spring projects using the Spring API

```java
Copypackage bootiful.httpclient.webclient;

import lombok.ToString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collection;

import static java.nio.file.StandardOpenOption.CREATE;

@EnableAsync
@SpringBootApplication
public class BootifulApplication {

	public static void main(String[] args) {
		SpringApplication.run(BootifulApplication.class, args);
	}

	@Bean
	WebClient webClient(WebClient.Builder builder) {
		return builder//
				.filter(//
						(clientRequest, exchangeFunction) -> exchangeFunction//
								.exchange(clientRequest)//
								.doOnNext(response -> System.out.println("got a WebClient response: " + response))//
				) //
				.build();
	}

	@Bean
	ApplicationListener<ApplicationReadyEvent> ready(@Value("file://${user.home}/Desktop/output.zip") Path output,
			WebClient client) {

		return event -> {

			// initialize a new Spring Boot project .zip archive
			Mono<DataBuffer> db = client.get()//
					.uri(URI.create("https://start.spring.io/starter.zip"))//
					.accept(MediaType.APPLICATION_OCTET_STREAM)//
					.retrieve()//
					.bodyToMono(DataBuffer.class);

			// gets written out to ~/output.zip
			Mono<Boolean> write = DataBufferUtils.write(db, output, CREATE).thenReturn(true);

			// enumerate all the active Spring projects using the
			// JSON API while we're at it...
			Mono<ProjectsResponse> json = client//
					.get()//
					.uri(URI.create("https://spring.io/api/projects"))//
					.retrieve()//
					.bodyToMono(ProjectsResponse.class);

			// look ma! No threading code! this will launch both network
			// calls (the .zip and the json) at the same time
			Mono.zip(write, json).subscribe(tuple -> enumerate(tuple.getT2()));
		};
	}

	private void enumerate(ProjectsResponse pr) {
		pr._embedded //
				.projects //
						.stream() //
						.filter(p -> p.status.equalsIgnoreCase("active")) //
						.forEach(project -> System.out.println(project.toString()));
	}

}

@ToString
class ProjectsResponse {

	public Embedded _embedded = new Embedded();

	@ToString
	public static class Project {

		public String name, slug, status, repositoryUrl;

	}

	@ToString
	public static class Embedded {

		public Collection<Project> projects = new ArrayList<>();

	}

}
```

If you want to bring in the `WebClient,` but \_ don't\_ want to use the rest of the reactive web stack, then you'll need to tell Spring Boot. Spring Boot will attempt to standup a Netty-based Spring Webflux environment, otherwise. You'll need the following configuration in your `application.properties`.

```properties
Copyspring.main.web-application-type=none
```

Did you like this gem at a glance approach? Did you learn anything? As always, I'm keen on hearing from you, so [please sound off on Twitter (@starbuxman)](http://twitter.com/starbuxman) ! I'll be back with another installment of *YMNNALFT*, so be sure not to miss that.