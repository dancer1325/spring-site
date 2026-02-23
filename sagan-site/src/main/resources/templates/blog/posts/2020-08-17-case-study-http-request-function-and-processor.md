---
title: Case Study: HTTP Request Function and Processor
source: https://spring.io/blog/2020/08/17/case-study-http-request-function-and-processor
scraped: 2026-02-23T13:37:54.811Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | David Turanski |  August 17, 2020 | 0 Comments
---

# Case Study: HTTP Request Function and Processor

_Engineering | David Turanski |  August 17, 2020 | 0 Comments_

### [](#introduction)[](#introduction)Introduction

We began this series by introducing the new [stream applications based on Java functions](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0), and [function composition](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1). The [previous entry](https://spring.io/blog/2020/08/10/case-study-build-and-run-a-streaming-application-using-an-http-source-and-a-jdbc-sink) presented a tutorial for building a simple stream application and running it in Spring Cloud Data Flow. Today we explore the [HTTP Request Function](https://github.com/spring-cloud/stream-applications/tree/master/functions/function/http-request-function) and present examples of how to use it.

In case you missed it, the prior posts in this series are:

-   [Introducing Function Based Streaming Applications](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0)
    
-   [Function Composition with Streaming Applications](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1)
    
-   [How to Build a Supplier and Source Application](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source)
    
-   [How to Build a Consumer and Sink Application](https://spring.io/blog/2020/08/03/creating-a-function-for-consuming-data-and-generating-spring-cloud-stream-sink-applications)
    
-   [Build and Run a Simple Stream Application](https://spring.io/blog/2020/08/10/case-study-build-and-run-a-streaming-application-using-an-http-source-and-a-jdbc-sink)
    

#### [](#the-http-request-function)[](#the-http-request-function)The HTTP Request Function

This is an updated implementation of the legacy [HTTP Client Processor](https://github.com/spring-cloud-stream-app-starters/httpclient/blob/master/spring-cloud-starter-stream-processor-httpclient/README.adoc) Stream App Starter, based on the reactive Spring [WebClient](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/reactive/function/client/WebClient.html). The function is an all purpose web client that submits HTTP requests to a URL and returns the response. Designed primarily for streaming applications, it is able to extract the URL, HTTP method, request body, desired response type, and contents, using configured [SpEL expressions](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#expressions) evaluated against each incoming Message. Also, to support efficient stream processing, the function uses reactive streams. Its signature is:

Function<Flux<Message\>, Flux\>

That is, it accepts a [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html) (stream) of Messages and returns a Flux of any type.

#### [](#configuration-properties)[](#configuration-properties)Configuration Properties

The HttpRequestFunction is configured through the following [configuration properties](https://github.com/spring-cloud/stream-applications/blob/master/functions/function/http-request-function/src/main/java/org/springframework/cloud/fn/http/request/HttpRequestFunctionProperties.java):

*http.request.body-expression*  
A SpEL expression to derive the request body from the incoming message. (Expression, default: )

*http.request.expected-response-type*  
The type used to interpret the response. (Class<?>, default: String)

*http.request.headers-expression*  
A SpEL expression used to derive the http headers map to use. (Expression, default: )

*http.request.http-method-expression*  
A SpEL expression to derive the request method from the incoming message. (Expression, default: GET)

*http.request.maximum-buffer-size*  
Maximum buffer size in bytes allocated for input stream buffers. Defaults to 256k. Increase, as necessary, for posting or getting large binary content. (Integer, default: 256 \* 1024)

*http.request.reply-expression*  
A SpEL expression used to compute the final result, applied against the whole http {@link org.springframework.http.ResponseEntity}. (Expression, default: ResponseEntity::getBody)

*http.request.timeout*  
Request timeout in milliseconds. (Long, default: 30000)

*http.request.url-expression*  
A SpEL expression against the incoming message to determine the URL to use. (Expression, default: )

The SpEL expressions are applied to the incoming Message. So fields like `body` and `headers[name]` can be used to evaluate message contents. I say "*can be…*" because sometimes it is more desirable to use static values. In this case, literal values must be enclosed in single quotes, for example:

http.request.url-expression='[https://start.spring.io](https://start.spring.io)' http.request.http-method-expression='POST'

#### [](#example-1-using-the-http-request-function-in-a-standalone-application)[](#example-1-using-the-http-request-function-in-a-standalone-application)Example 1: Using the HTTP Request Function in a Standalone Application

Let’s look at an example of how to use this function in a simple Spring Boot web application. In this example, we will use it in an app that retrieves an image from a URL and renders a thumbnail of the image. The complete code for this example is [here](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/function-based-stream-app-samples/image-thumbnail-samples/image-thumbnail-web).

We will build the application using Spring Boot and Spring Web Flux, along with our function to retrieve the image, and some code to generate a thumbnail.

The relevant dependencies are:

-   org.springframework.cloud.fn:http-request-function - The HTTP request function transitively includes `spring-boot-starter-webflux`
    
-   io.spring.example:image-thumbnail-processor - A simple Java function, included in this [example](https://github.com/spring-cloud/spring-cloud-stream-samples/blob/master/function-based-stream-app-samples/image-thumbnail-samples/image-thumbnail-processor/src/main/java/io/spring/example/image/thumbnail/processor/ThumbnailProcessor.java), that creates thumbnails. We won’t get into the details here, just note that it is a separate component which we will reuse in a later example.
    

We first need to set some configuration properties for our function:

http.request.url-expression=payload http.request.expected-response-type=byte\[\] http.request.maximum-buffer-size=2097152

Thus, the message payload contains the target URL, the image(response body) will be returned as a byte array. And since these images might be fairly large, we will increase the size of the buffer holding the response body to 2GB (2 \* 1024 \* 1024).

Here is the code:

```
Copy@SpringBootApplication
@Controller
@Import(HttpRequestFunctionConfiguration.class)
public class ThumbnailStandaloneApplication {
  private static Logger logger = LoggerFactory.getLogger(ThumbnailStandaloneApplication.class);

  public static void main(String[] args) {
    SpringApplication.run(ThumbnailStandaloneApplication.class, args);
  }

  private ThumbnailProcessor thumbnailProcessor = new ThumbnailProcessor();

  @Autowired
  private HttpRequestFunction httpRequestFunction;

  @Bean
  RouterFunction<?> routes() {
    return RouterFunctions.route()
        .GET("/thumbnail", this::createThumbnail)
        .build();
  }

  private Mono<ServerResponse> createThumbnail(ServerRequest serverRequest) {
    String url = serverRequest.queryParam("url").orElseThrow(
                           () -> new RuntimeException("URL required"));

    return Mono.from(httpRequestFunction.apply(Flux.just(new GenericMessage<>(url)))
        .flatMap(image -> {
          Map<String, Object> model = new HashMap<>();
          byte[] thumbnail = thumbnailProcessor.apply((byte[]) image);
          logger.info("creating thumbnail for {}", url);
          model.put("url", url);
          model.put("thumb", new String(Base64.getEncoder().encode(thumbnail)));
          Mono<ServerResponse> serverResponse = ServerResponse.ok()
              .render("thumbnail", model);
          return serverResponse;
        }));
  }
```

We apply the `HttpRequestFunction` to retrieve the image. Then we apply the `thumbnailProcessor` to the returned byte array and encode it to base 64 so we can render it on the page.

![standalone](https://github.com/spring-cloud/spring-cloud-stream-samples/blob/master/function-based-stream-app-samples/image-thumbnail-samples/img/standalone.png?raw=true)

#### [](#example-2-using-the-http-request-processor-in-a-streaming-application)[](#example-2-using-the-http-request-processor-in-a-streaming-application)Example 2: Using the HTTP Request Processor in a streaming application

Now that we know how our function works, let’s put together a streaming application, using Spring Cloud Stream, to do something similar. In this case, we will use the pre-packaged [HTTP Request Processor](https://github.com/spring-cloud/stream-applications/tree/master/applications/processor/http-request-processor) and [File Source](https://github.com/spring-cloud/stream-applications/tree/master/applications/source/file-source) stream applications. This processor wraps the HTTP request function in a Spring Cloud Stream processor application that simply invokes the function, binding the input and output to a message broker destination (a Kafka topic, or a Rabbit MQ exchange, for example). Our application, expressed in stream definition DSL, looks like:

file-source | http-request-processor | image-thumbnail-sink

where the `|` represents I/O using a message broker.

Here, we are using a [user-developed sink](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/function-based-stream-app-samples/image-thumbnail-samples/image-thumbnail-stream-sample/image-thumbnail-sink) that uses the [file-consumer](https://github.com/spring-cloud/stream-applications/tree/master/functions/consumer/file-consumer) function to write each thumbnail to a file. The sink uses Spring Cloud Function’s declarative [composition](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1) to compose the [thumbnail-processor](https://github.com/spring-cloud/spring-cloud-stream-samples/blob/master/function-based-stream-app-samples/image-thumbnail-samples/image-thumbnail-processor/src/main/java/io/spring/example/image/thumbnail/processor/ThumbnailProcessor.java), from the previous example, with a header enricher, and finally the standard [fileConsumer](https://github.com/spring-cloud/stream-applications/blob/master/functions/consumer/file-consumer). So our composed function is defined by:

spring.cloud.function.definition=thumbnailProcessor|filenameEnricher|fileConsumer

in [application.properties](https://github.com/spring-cloud/spring-cloud-stream-samples/blob/master/function-based-stream-app-samples/image-thumbnail-samples/image-thumbnail-stream-sample/image-thumbnail-sink/src/main/resources/application.properties).

Our composite function definition is conceptually and syntactically similar to the above stream definition. But in this case the `|` represents in-process communication.

We will explore the ins and outs of the File Source in a future post. For now, we will use it to poll a source directory and produce messages whenever a new file is added to the directory. In this case, we want to process a text file with an image URL per line. We will configure the source to produce a message per line, containing the URL in the payload. We already know what the HTTP request processor does. The sink generates a thumbnail and writes it to a file.

The fully configured stream definition is:

file-source --file.consumer.mode=lines --file.consumer.mode=lines --file.supplier.directory= | http-request-processor --http.request.url-expression=payload --http.request.expected-response-type=byte\[\] --http.request.maximum-buffer-size=2097152| image-thumbnail-sink --file.consumer.directory=

If we run this and drop a text file into the source directory, we will see the thumbnails written to the target directory:

![thumbnail files](https://github.com/spring-cloud/spring-cloud-stream-samples/blob/master/function-based-stream-app-samples/image-thumbnail-samples/img/thumbnail-files.png?raw=true)

If you want to run this on your local machine, complete instructions are [here](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/function-based-stream-app-samples/image-thumbnail-samples/image-thumbnail-stream-sample#thumbnail-stream-sample).

#### [](#summary)[](#summary)Summary

We just did a deep dive on the HTTP Request Function, demonstrating how to use it in a standalone web application and in a streaming pipeline to process images. We also used function composition, composing user-written and out of the box functions, to great effect.

#### [](#stay-tuned)[](#stay-tuned)Stay Tuned…​

In the coming weeks we will present many more case studies for Spring Cloud Stream and Spring Cloud Data Flow, each will highlight different stream applications and capabilities.