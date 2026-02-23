---
title: Go, Go, GraalVM with Spring Native: My Adventures in Native Image-ville
source: https://spring.io/blog/2021/12/29/go-go-graalvm-with-spring-native-my-adventures-in-native-image-ville
scraped: 2026-02-23T12:58:37.284Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 29, 2021 | 4 Comments
---

# Go, Go, GraalVM with Spring Native: My Adventures in Native Image-ville

_Engineering | Josh Long |  December 29, 2021 | 4 Comments_

Hi, Spring fans! Happy new year! I can't believe we quickly got this far, but we did. This last year's been insanely busy, and one of the things I've most loved is all the opportunities to use Spring Native to build GraalVM-powered architecture-specific native images.

We released [Spring Native 0.11](https://spring.io/blog/2021/12/09/new-aot-engine-brings-spring-native-to-the-next-level), which is fantastic because it features a brand new AOT (ahead-of-time) engine that completely reworks how we transpile Spring Boot applications into GraalVM native images. I've been working with GraalVM a lot over the last two years, and this new release is a vast, revolutionary step in the story of Spring Native and a giant leap forward on the journey to Spring Framework 6 and Spring Boot 3, both of which will land in 2022.

I've been tinkering with the new release a lot over the last month, too. Spring Native works well for a ton of use cases supported by Spring itself, and so, for most applications, I've found things work just fine with no changes. That said, some things will not work in a Spring Native context or any GraalVM context without some help. For example, it would help if you told GraalVM what you're doing that might confound it - proxies, serialization, resource-loading, etc. Spring Native provides a mechanism - *hints* - by which you can do this. It's easy. But it still has to be done. So, I've been going around to some projects that I think would probably need some help and trying to make them work.

### [](#mybatis-and-spring-native)MyBatis and Spring Native

I got Spring and MyBatis to work well and put that in a sample branch. [See this blog for more on that](https://joshlong.com/jl/blogPost/mybatis-and-spring-native.html). It was challenging to get Spring and the MyBatis Spring Boot autoconfiguration to work. I started rebuilding the autoconfiguration, bit by bit, and managed to build an inarguably less helpful, less robust [Spring Boot autoconfiguration for MyBatis that works well with Spring Native, too](https://github.com/joshlong/mybatis-spring-native/tree/mybatis-spring-boot). Hopefully, we can use that as a foundation and figure out how to bridge the gap and get the provided, supported autoconfiguration working as well. I'm already talking to some folks on the MyBatis team about possibly including some of this work. (Fingers crossed!). With this proof-of-concept Spring Boot autoconfiguration and Spring Native configuration, you can create a MyBatis SQL Mapper like this:

```java
Copy
@Mapper
public interface CityMapper {

	@Insert("INSERT INTO city (name, state, country) VALUES(#{name}, #{state}, #{country})")
	@Options(useGeneratedKeys = true, keyProperty = "id")
	void insert(City city);

	@Select("SELECT id, name, state, country FROM city ")
	Collection<City> findAll();
}
```

### [](#spring-retrosocket-and-spring-native)Spring Retrosocket and Spring Native

I also updated the [Spring Retrosocket](https://github.com/spring-projects-experimental/spring-retrosocket) project to work with [Spring Native](https://github.com/spring-projects-experimental/spring-retrosocket). Spring Retrosocket is a declarative [Feign](https://github.com/OpenFeign/feign)\- or [Retrofit](https://square.github.io/retrofit/)\-like client for RSocket-based services.

```java
Copy@RSocketClient
interface GreetingsClient {

	@MessageMapping("hello")
	Mono<String> hello(Mono<String> name);
}
```

### [](#the-kubernetes-java-client-and-spring-native)The Kubernetes Java Client and Spring Native

Then, I turned my attention to making the Kubernetes Java client work well in a Spring Native and GraalVM context. The Kubernetes Java client is essential if you want to build memory-efficient controllers and operators for Kubernetes. Did I mention that GraalVM native images are *very* memory efficient? It depends on what you're doing in your application, of course, but my typical applications end up taking anywhere from 40 to 55 megabytes of RAM (well, [RSS](https://en.wikipedia.org/wiki/Resident_set_size), specifically). And that's in addition to startup in only tens of milliseconds. The official Kubernetes-for-Java client has a Spring Boot autoconfiguration. So all I had to do was write the [trivial Spring Native configuration](https://github.com/kubernetes-native-java/spring-native-kubernetes/blob/main/src/main/java/io/kubernetes/nativex/KubernetesApiNativeConfiguration.java) required to make such applications work well in a Spring Native and GraalVM context. [I explain it here](https://joshlong.com/jl/blogPost/kubernetes-java-client-and-spring-native-and-graalvm.html) in detail. Suffice it to say it's now possible to use your favorite development framework not just to build excellent Kubernetes resources and controllers but deploy them in a low-footprint fashion to your organization's clusters.

### [](#fabric8-and-spring-native)Fabric8 and Spring Native

Speaking of Kubernetes clients, I also got RedHat's fabulous [Fabric8.io Kubernetes client](https://fabric8.io) working with [Spring Native, too](https://github.com/kubernetes-native-java/fabric8-spring-native). I found a lovely example operator and custom resource definition that I then made work using my [Fabric8 Spring Native hints](https://github.com/kubernetes-native-java/fabric8-sample-controller). This is a more fully-featured example, and it works a charm. This was based on a fabulous example by Rohan Kanojia that I found and adapted to use Spring Boot and Spring Native.

This approach has legs! Between Spring Native and the official Kubernetes Java client and the Fabric8 client, there's no reason not to use Spring Boot to build your next Kubernetes operator.

### [](#spring-graphql-and-spring-native)Spring GraphQL and Spring Native

Then, I turned my attention to Spring GraphQl and Spring Native. Spring GraphQL works pretty well as long as you override how the `GraphQlSourceBuilder` derives the Spring Framework `Resource` instances used to feed the engine the schema for your GraphQL endpoints. It's not as easy as it could be, but it's still only an extra `@Bean` or two or so lines of code to make it work. Fine. The trouble starts when you're using Spring GraphQL and want to query the metamodel for Spring GraphQL's schema itself. Having the GraphQL metamodel is convenient when, for example, you're using the `/graphiql/` interactive console to query the data. *That* took some doing, but I did it. I explain [that further in this post](https://joshlong.com/jl/blogPost/spring-graphql-and-spring-native.html).

With that, I can deploy a GraphQL controller like this:

```java
Copy
@Controller
class CustomerGraphQlController {

	private final CustomerRepository repository;
 	
 	CustomerGraphQlController(CustomerRepository repository) {
 		this.repository = repository ;
 	} 

	@QueryMapping
	Flux<Customer> customers() {
		return this.repository.findAll();
	}
}

record Customer(@Id Integer id, String name) {
}
```

...that uses the following schema:

```
Copytype Query {
    customers : [Customer]
}
type Customer {
    id: ID
    name :String
}
```

Then open the example up at `http://localhost:8080/graphiql/` and issue the following query:

```
Copyquery {
 customers { id, name }
}
```

And get the results I was expecting!

### [](#miscellaneous)Miscellaneous

I've also been dealing with many other things I wanted to get working with Spring Native. So here's the Spring Native configuration for [CommonMark, a Markdown parser in Java](https://github.com/joshlong/template-spring-boot-starter/blob/master/src/main/java/com/joshlong/templates/graalvm/TemplateNativeConfiguration.java).

Here are the various classes I had to add to make [Apache Lucene](https://github.com/joshlong/lucene-spring-boot-starter/tree/master/lucene-spring-boot-starter) work in a Spring Native project. Of course, this example is more involved and uses[GraalVM substitutions](https://simply-how.com/fix-graalvm-native-image-compilation-issues) and a typical Spring Native configuration. But it works, and well, too!

Oh, and did I mention I worked with [Ronald Dehuysser](https://twitter.com/rdehuyss) to get [Jobrunr](https://jobrunr.io), a distributed job scheduling engine, working in a GraalVM context with Spring Native? Because I did, and the result is *awesome*!

I've done all this in just the last few weeks: the possibilities are endless, and I can't wait to see more and more of the wide and world of Springdom sprout GraalVM integrations.