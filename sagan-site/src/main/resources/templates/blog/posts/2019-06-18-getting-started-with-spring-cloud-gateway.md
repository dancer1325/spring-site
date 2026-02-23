---
title: Getting Started with Spring Cloud Gateway
source: https://spring.io/blog/2019/06/18/getting-started-with-spring-cloud-gateway
scraped: 2026-02-23T14:39:15.641Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  June 18, 2019 | 7 Comments
---

# Getting Started with Spring Cloud Gateway

_Engineering | Ben Wilcock |  June 18, 2019 | 7 Comments_

Microservice architectures are great, but as your application programming interfaces (APIs) start to grow, so do the challenges related to their maintenance.

For example, as an existing API matures and adds new features it will need to take its clients along with it on the journey. When the details of an API change, clients need to adjust in order to work with these changes. This process takes time and can really slow your APIs evolution and interfere with your ability to iterate quickly.

Offering multiple APIs brings with it its own set of challenges. How do you route requests and responses to the correct API? How do you manage any message disparity? How do you support clients when your endpoints can move around?

And then there’s the question of integrating with legacy systems. Not everyone is so lucky that they get to build apps and services into an entirely new ecosystem, instead needing to play nicely with preexisting systems for things like authentication and other backing services.

An API Gateway helps you to solve these problems and more. It is a powerful architectural tool which you can use to manage message routing, filtering and proxying in your microservice architecture. Many API Management Gateways can be dated back to SOA and these tend to have been implemented as centralized servers. But as microservices became more popular, modern lightweight independent and decentralized micro-gateway applications have appeared – such as [Spring Cloud Gateway](https://spring.io/projects/spring-cloud-gateway).

In this first article in our series on Spring Cloud Gateway, we’ll start by doing something very simple – reroute requests coming into a gateway and forward them to another service elsewhere. We’ll also insert a simple HTTP Header to the request just to show one more example of what’s possible with a gateway.

#### [](#tools-youll-need)Tools you'll need:

-   [HTTPie](https://httpie.org/) – a command line client for http calls
-   Your favorite Java IDE (check out [Spring Tools](https://spring.io/tools) if you don’t have one)
-   Your favorite command line (e.g zsh, bash, DOS command or PowerShell)
-   [Httpbin.org](http://httpbin.org) – a website and diagnosis tool which converts Http GET request data into a JSON response

## [](#step-1-create-a-project)Step 1: Create a project

In a new folder, download and extract a new Spring Cloud Gateway project using [start.spring.io](https://start.spring.io/)(and [HTTPie](https://httpie.org/)) as follows...

```bash
Copyhttp https://start.spring.io/starter.zip dependencies==cloud-gateway,actuator baseDir==spring-cloud-gateway-demo | tar -xzvf -
```

We can immediately assert that this project is working by building and running the code and checking the Spring Boot Actuator health endpoint like so...

```bash
Copy./mvnw package spring-boot:run
```

Now that your Spring Boot application is up and running, point your browser to [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health). You should receive a JSON-formatted message saying `{"status":"UP"}` which indicates that everything is working fine. Now stop your server (ctrl+c) and continue to the next section.

## [](#step-2-add-a-re-route-instruction-to-the-gateway)Step 2: Add a re-route instruction to the Gateway

In your IDE, open the class `src/main/java/com/example/demo/DemoApplication.java` and add the following method, correcting the import statements as you go. If you get stuck, check out the code sample [here](https://github.com/benwilcock/spring-cloud-gateway-demo).

```java
Copy    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
            // Add a simple re-route from: /get to: http://httpbin.org:80
            // Add a simple "Hello:World" HTTP Header
            .route(p -> p
            .path("/get") // intercept calls to the /get path
            .filters(f -> f.addRequestHeader("Hello", "World")) // add header
            .uri("http://httpbin.org:80")) // forward to httpbin
            .build();
    }
```

Here we build a new route for our gateway. Any request to `http://localhost:8080/get` will be matched to this route instruction and our two changes to the request will be made. The `filters()` method handles things such as adding or changing headers, in our case setting the `Hello` header to the value `World`. Additionally, the `uri()` method forwards our request to the new host. It’s important to note that the `/get` path is being retained when forwarding the message.

Now compile your new code and start the application server once more, like this...

```bash
Copy./mvnw package spring-boot:run
```

In the next section, we'll test what we've built.

# [](#step-3-test-your-new-gateway)Step 3: Test your new Gateway

To test what we have built, we can once again use [HTTPie](https://httpie.org/). Send a HTTP GET request to [http://localhost:8080/get](http://localhost:8080/get) and observe what comes back, like this...

```bash
Copyhttp localhost:8080/get --print=HhBb
```

You should see a response very much like the one shown below.

```bash
CopyGET /get HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: localhost:8080
User-Agent: HTTPie/1.0.2

HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Content-Encoding: gzip
Content-Length: 256
Content-Type: application/json
Date: Mon, 10 Jun 2019 13:13:36 GMT
Referrer-Policy: no-referrer-when-downgrade
Server: nginx
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block

{
    "args": {},
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Forwarded": "proto=http;host=\"localhost:8080\";for=\"0:0:0:0:0:0:0:1:52144\"",
        "Hello": "World",
        "Host": "httpbin.org",
        "User-Agent": "HTTPie/1.0.2",
        "X-Forwarded-Host": "localhost:8080"
    },
    "origin": "0:0:0:0:0:0:0:1, 2.102.147.153, ::1",
    "url": "https://localhost:8080/get"
}
```

There are a few things of note in this output:

1.  The response originates from [httpbin.org](http://httpbin.org) as evidenced by the `"Host"` header.
2.  The `"X-Forwarded-Host"` is `"localhost:8080"` (our locally running Gateway application)
3.  The Http header `"Hello"` has been inserted and given a value of `"World"`.
4.  In the Json response, the full `"url"` of the original request is `"https://localhost:8080/get"` (the gateway service that we built together).

The path of execution is from the client ([HTTPie](https://httpie.org/)) -> DemoApplication.java (our gateway) -> httpbin.org (our echo service) and then back again.

## [](#final-thoughts)Final thoughts.

That’s it. You now should have a Spring Cloud Gateway application up and running and have learned how to forward the requests it receives to another endpoint. You could use this technique to automatically forward requests from your Gateway application to any other service.

The code to accompany this article can be found [here](https://github.com/benwilcock/spring-cloud-gateway-demo). The full documentation for the current GA release of Spring Cloud Gateway (2.1.0 at the time of writing) can be found [here](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.1.0.RELEASE/single/spring-cloud-gateway.html).

## [](#next-time)Next time.

We’ve only dipped our toes into what Spring Cloud Gateway can do, but hopefully, this was a good first look. In our next post, we’ll take a look at how to create a dynamic gateway – one that can discover the location of services at runtime. Until then, if you'd like to learn more, be sure to check out the [Spring Cloud Gateway page on spring.io](https://spring.io/projects/spring-cloud-gateway), the [official guide](https://spring.io/guides/gs/gateway/), or set up your own service and gateway on [Pivotal Web Services](https://run.pivotal.io/)!

Finally, be sure to check out [SpringOne Platform](https://springoneplatform.io/), the premier conference for building scalable applications that people love. Join your peers to learn, share, and have fun in Austin, TX from October 7th to 10th for the biggest and best show yet. Even better, use code **S1P\_Save200** when registering to save on your ticket. We hope to see you there!

---

# [](#authors)Authors

-   [Ben Wilcock](https://twitter.com/benbravo73) – Spring Marketing, Pivotal.
-   [Brian McClain](https://twitter.com/BrianMMcClain) – Technical Marketing, Pivotal.