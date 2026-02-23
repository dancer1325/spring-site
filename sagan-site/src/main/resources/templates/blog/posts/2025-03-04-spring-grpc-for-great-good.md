---
title: Spring gRPC 0.4.0 for great good!
source: https://spring.io/blog/2025/03/04/spring-grpc-for-great-good
scraped: 2026-02-23T07:43:30.238Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 04, 2025 | 1 Comment
---

# Spring gRPC 0.4.0 for great good!

_Engineering | Josh Long |  March 04, 2025 | 1 Comment_

*NB*: you can find the working code for [this blog here](https://github.com/joshlong-attic/2025-03-04-spring-grpc-040-walkthrough)

There's a new release of the amazing—if experimental—Spring gRPC project: version 0.4.0. I won't get into the nitty-gritty of all that's new, but I just wanted to highlight how elated I am to use it and walk you through the step-by-step path to gRPC joy. A million little things fall into place to make it the smoothest experience I've ever had using gRPC!

I went to the [Spring Initializr](https://start.spring.io) and selected `GRPC`, `GraalVM`, and `Web`. I'm a Maven enjoyer, but you do you. I chose Java 23, 'natch, since Java 24 is coming [in a week or two](https://openjdk.org/projects/jdk/24/). I figured this blog would still be interesting for at least a few weeks. Specifically, I'm using GraalVM, which is an OpenJDK distribution that supports some extra party tricks, including compiling JVM code into operating system- and architecture-specific native code.

If you're using a UNIX-compatible OS (Cygwin and Windows Subsystem for Linux on Windows count), then you might try [SDKMAN](https://sdkman.io) to install and manage your JDK varieties. I did this:

```shell
Copysdk install java 23.0.2-graalce  
```

Now, again, remember: this is Java 23. [Java 24 is due in the middle of March 2025](https://openjdk.org/projects/jdk/24/)! Don't be left behind. You don't want people snickering and pointing at you at parties, do you? Upgrade!

Already, Spring has our backs! The Spring Initializr seized upon the insight that I am using a Servlet engine, added Spring gRPC, Spring Boot's web support, *and* the bridge that allows you to host gRPC in a Servlet container. (By default, Spring gRPC runs gRPC via Netty, without an HTTP foundation.) Oh, *and* it opted us into HTTP/2!

The Spring Initializr *also* very helpfully configured the requisite plugins to do the code generation required to get a gRPC protocol buffer definition transpiled into Java code that we can implement. See what I mean by convenient? We haven't even started writing code, but we *could*!

The first step in writing any gRPC service is to define the schema using the Google Protocol Buffers format. We'll then transpile the schema into Java code, which we can implement in our own service. Make sure you've got the `protoc` compiler installed. You may also do well to install `grpcurl`, a convenient tool for making requests to a gRPC endpoint.

Here's my schema. It defines a simple service to enumerate and adopt `Dog`s.

```proto
Copysyntax = "proto3";  
option java_multiple_files = true;  
option java_package = "com.example.demo.grpc.impl";  
option java_outer_classname = "AdoptionsProto";  

import "google/protobuf/empty.proto";  

service Adoptions {  

  rpc All(google.protobuf.Empty) returns (DogsResponse){}  

  rpc Adopt(DogAdoptionRequest) returns (google.protobuf.Empty){}  
}  

message Dog {  
  int32 id = 1;  
  string name = 2;  
  string description = 3;  
  string owner = 4;  
}  

message DogAdoptionRequest {  
  int32 dogId = 1;  
  string name = 2;  
}  

message DogsResponse {  
  repeated Dog dogs = 1;  
}  
```

To generate the Java code, run:

```shell
Copy./mvnw -DskipTests package  
```

Now everything's in place for you to implement your first gRPC service!

```java
Copypackage com.example.demo;  

import com.example.demo.grpc.impl.AdoptionsGrpc;  
import com.example.demo.grpc.impl.Dog;  
import com.example.demo.grpc.impl.DogAdoptionRequest;  
import com.example.demo.grpc.impl.DogsResponse;  
import com.google.protobuf.Empty;  
import io.grpc.stub.StreamObserver;  
import org.springframework.boot.SpringApplication;  
import org.springframework.boot.autoconfigure.SpringBootApplication;  
import org.springframework.stereotype.Service;  

import java.util.List;  

@SpringBootApplication  
public class DemoApplication {  

    public static void main(String[] args) {  
        SpringApplication.run(DemoApplication.class, args);  
    }  
}  

@Service  
class AdoptionsGrpcService extends AdoptionsGrpc.AdoptionsImplBase {  

    @Override  
    public void all(Empty request, StreamObserver<DogsResponse> responseObserver) {  
        responseObserver.onNext(DogsResponse.newBuilder()  
                .addAllDogs(List.of(  
                        Dog.newBuilder().setName("dog1").setDescription("the goodest boy").setOwner("jlong").build(),  
                        Dog.newBuilder().setName("dog2").setDescription("the goodest girl").setOwner("jlong").build()))  
                .build());  
        responseObserver.onCompleted();  
    }  

    @Override  
    public void adopt(DogAdoptionRequest request, StreamObserver<Empty> responseObserver) {  
        System.out.println("Adopting " + request.getName() + " " + request.getDogId());  
        responseObserver.onNext(Empty.getDefaultInstance());  
        responseObserver.onCompleted();  
    }  
}  
```

To enable virtual threads, add the following to `src/main/resources/application.properties`:

```properties
Copyspring.threads.virtual.enabled=true  
```

Now, let's compile a GraalVM native image!

To compile a native image that runs on your host operating system, run:

```shell
Copy./mvnw -DskipTests -Pnative native:compile  
```

To create a Docker image (requires Docker running), run:

```shell
Copy./mvnw -DskipTests -Pnative spring-boot:build-image  
```

Now, let's test it out:

```shell
Copygrpcurl -plaintext localhost:8080 Adoptions.All  
```

If everything works, congrats on building your first Spring gRPC-centric application! Enjoy your journey to production! 🚀