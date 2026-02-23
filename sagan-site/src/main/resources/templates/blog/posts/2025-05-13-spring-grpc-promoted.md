---
title: Spring gRPC Promoted!
source: https://spring.io/blog/2025/05/13/spring-grpc-promoted
scraped: 2026-02-23T07:43:25.913Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  May 13, 2025 | 1 Comment
---

# Spring gRPC Promoted!

_Engineering | Dave Syer |  May 13, 2025 | 1 Comment_

It's a few months since we had [a blog](https://spring.io/blog/2025/03/04/spring-grpc-for-great-good) about [Spring gRPC](https://github.com/spring-projects/spring-grpc) that wasn't just a release announcement. This one marks the first release since the project was promoted from [experimental](https://github.com/spring-projects-experimental) to a full member of the [Spring Portfolio](https://github.com/spring-projects). This doesn't change the way you consume the project, but it has some implications for support and symbolically for what the project now means to the portfolio.

The latest release is 0.8.0, and it has been available for a couple of weeks now in Maven Central. The main reason for that release was to bump the dependencies to their latest versions, bringing Spring gRPC up to version 4 of the `protobuf-java` libraries. The easiest way to get started is to download a project with "gRPC" checked on the [Spring Initializr](https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.4.5&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=spring-grpc). There are separate "starters" for Spring Boot applications gRPC that want to be "servers" or "clients", or you can get both at once from the plain `spring-grpc-spring-boot-starter`. Version 0.8.0 will be supported (in open source and for commercial customers) until the next release. When we get to 1.0.0 we will transition to the normal policy of open source support which links to minor release of Spring Boot with [extensions](https://spring.io/blog/2025/02/13/support-policy-updates) for commercial customers. We anticipate that with 1.0.0, Spring gRPC features related directly to Spring Boot (i.e. starters, autoconfiguration and external configuration properties) will move to Spring Boot itself as part of the 4.0.0 release, so the support timelines for Spring gRPC 1.0.0 will be the same as for Spring Boot 4.0.0.

The biggest change since [Josh's blog](https://spring.io/blog/2025/03/04/spring-grpc-for-great-good) is probably the support for automatically creating gRPC client stubs as bean definitions. It works as soon as you add `@ImportGrpcClients` to a `@Configuration` class. E.g. here's a simple Spring Boot application

```java
Copy@SpringBootApplication
@ImportGrpcClients("localhost:9090")
public class GrpcServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(GrpcServerApplication.class, args);
	}

}
```

It will scan the classpath starting at the package of the annotated class, find all the `AbstractBlockStub` implementations, and for each one create a `@Bean` of that type from a `Channel` with the target address given in the annotation. In fact in a Spring Boot application like this you don't need the annotation, you can just create a configuration property `spring.grpc.client.default-channel.address` for the target address and the autoconfiguration will take care of the rest. Once that is done (either way) you can autowire one of the stubs into your application code, e.g.

```java
Copy@Component
class MyThing {

    public MyThing(SimpleBlockingStub stub) {
	    // do something with the stub here to call RPC methods on the remote server
	}

}
```

Or if you prefer more control, different stub types for example, you can use the `@ImportGrpcClients` annotation with more of its attributes. You can list the types of the stubs explicitly, or you can give a different base package to scan, and you can ask for a particular concrete type of `StubFactory` that knows how to create your stubs (Spring gRPC ships with factories for the common code-generation stub types that come from Google's `protoc` compiler).

We are working on a 0.9.0 release. One reason for that is some changes to the way `@ImportGrpcClients` works - mainly internal changes but if you already had a custom `StubFactory` you will need to make some small changes to it. Another reason for a 0.9.0 release is to test the new release process at Maven Central, via the [Central Portal](https://central.sonatype.org/register/central-portal/). This is expected to have no impact on users.