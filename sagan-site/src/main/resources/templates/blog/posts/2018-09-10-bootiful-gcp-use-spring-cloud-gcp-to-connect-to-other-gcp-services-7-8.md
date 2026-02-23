---
title: Bootiful GCP: Use Spring Cloud GCP to Connect to Other GCP Services (7/8)
source: https://spring.io/blog/2018/09/10/bootiful-gcp-use-spring-cloud-gcp-to-connect-to-other-gcp-services-7-8
scraped: 2026-02-23T15:14:50.479Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 10, 2018 | 0 Comments
---

# Bootiful GCP: Use Spring Cloud GCP to Connect to Other GCP Services (7/8)

_Engineering | Josh Long |  September 10, 2018 | 0 Comments_

> Hi Spring fans! In this brief 8 part series we’re going to look at the Spring Cloud integration for Google Cloud Platform, called Spring Cloud GCP. [Spring Cloud GCP](https://cloud.spring.io/spring-cloud-gcp/) represents a joint effort between Google and Pivotal that endeavors to provide a first class experience for Spring Cloud developers when using the Google Cloud Platform. Pivotal Cloud Foundry users will enjoy an even [easier integration with the GCP service broker](https://docs.pivotal.io/partners/gcp-sb/index.html). I wrote these installments with input from Google Cloud Developer Advocate, and my buddy, [Ray Tsang](http://twitter.com/saturnism). You can also catch a walkthrough of Spring Cloud GCP in our Google Next 2018 session, [Bootiful Google Cloud Platform](https://www.youtube.com/watch?v=2Jo3vy7iQf8). Thanks buddy! As always, [I'd love to hear from you if you have feedback](http://twitter.com/starbuxman).

There are eight posts in the series. Here they all are:

-   [Bootiful GCP: Getting Started with Spring Cloud for Google Cloud Platform (1/8)](https://spring.io/blog/2018/08/20/bootiful-gcp-getting-started-with-spring-cloud-for-google-cloud-platform-1-8)
-   [Bootiful GCP: Relational Data Access with Spring Cloud GCP (2/8)](https://spring.io/blog/2018/08/23/bootiful-gcp-relational-data-access-with-spring-cloud-gcp-2-8)
-   [Bootiful GCP: Globally Consistent Data Access with Spanner (3/8)](https://spring.io/blog/2018/08/27/bootiful-gcp-globally-consistent-data-access-with-spanner-3-8)
-   [Bootiful GCP: Integration with Google Cloud Pub/Sub (4/8)](https://spring.io/blog/2018/08/30/bootiful-gcp-integration-with-google-cloud-pub-sub-4-8)
-   [Bootiful GCP: Runtime Configuration with Spring Cloud GCP Runtime Config (5/8)](https://spring.io/blog/2018/09/03/bootiful-gcp-runtime-configuration-with-spring-cloud-gcp-runtime-config-5-8)
-   \[Bootiful GCP: Supporting Observability with Spring Cloud GCP Stackdriver Trace (6/8)

\]([https://spring.io/blog/2018/09/06/bootiful-gcp-supporting-observability-with-spring-cloud-gcp-stackdriver-trace-6-8](https://spring.io/blog/2018/09/06/bootiful-gcp-supporting-observability-with-spring-cloud-gcp-stackdriver-trace-6-8))

-   \[Bootiful GCP: Use Spring Cloud GCP to Connect to Other GCP Services (7/8)

\]([https://spring.io/blog/2018/09/10/bootiful-gcp-use-spring-cloud-gcp-to-connect-to-other-gcp-services-7-8](https://spring.io/blog/2018/09/10/bootiful-gcp-use-spring-cloud-gcp-to-connect-to-other-gcp-services-7-8))

-   [Bootiful GCP: To Production! (8/8)](https://spring.io/blog/2018/09/13/bootiful-gcp-to-production-8-8)

The Spring Cloud GCP project strives to provide integrations with Spring and some of the GCP services that map well to Spring. But GCP is *vast*! There are a good deal many other services out there that you can consume via [their direct Java SDK](https://github.com/GoogleCloudPlatform/google-cloud-java/) or even through their REST APIs, directly. Spring Cloud GCP can make working with those APIs a bit easier, too! In this section, we’re going to integrate with the Google Cloud Vision API which supports analyzing images and doing feature detection.

As always, you will need to enable the API:

```shell
Copygcloud services enable vision.googleapis.com
```

When you use the auto-configurations in Spring Cloud GCP they conveniently obtain the required OAuth scopes to work with a given API on your behalf, and you never need to worry about it. We’ll need to do this work ourselves for other services. This is easy enough, thankfully. Use the `spring.cloud.gcp.credentials.scopes` property to obtain a general, platform-wide, catch-all scope that can be used to request permission for all basic Google Cloud Platform APIs.

**src/main/resources/applications.properties.**

```java
Copyspring.cloud.gcp.credentials.scopes=https://www.googleapis.com/auth/cloud-platform
spring.cloud.gcp.credentials.encoded-key=FIXME
```

And.. that’s it! Now you can use the API as you like. Let’s standup a simple REST API to which you can post an image as a multipart file upload and have the Google Cloud Vision API do feature detection.

```java
Copypackage com.example.gcp.vision;

import com.google.api.gax.core.CredentialsProvider;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;

// curl -F "image=@$HOME/Pictures/soup.jpg" http://localhost:8080/analyze
@SpringBootApplication
public class VisionApplication {

        
        @Bean
        ImageAnnotatorClient imageAnnotatorClient(
            CredentialsProvider credentialsProvider) throws IOException {
                ImageAnnotatorSettings settings = ImageAnnotatorSettings
                    .newBuilder()
                    .setCredentialsProvider(credentialsProvider)
                    .build();
                return ImageAnnotatorClient.create(settings);
        }

        @Slf4j
        @RestController
        public static class ImageAnalyzerRestController {

                private final ImageAnnotatorClient client;

                
                private final Feature labelDetection = Feature.newBuilder().setType(Feature.Type.LABEL_DETECTION).build();
                private final Feature textDetection = Feature.newBuilder().setType(Feature.Type.DOCUMENT_TEXT_DETECTION).build();

                ImageAnalyzerRestController(ImageAnnotatorClient client) {
                        this.client = client;
                }

                @PostMapping("/analyze")
                String analyze(@RequestParam MultipartFile image) throws IOException {
                        
                        byte[] data = image.getBytes();
                        ByteString imgBytes = ByteString.copyFrom(data);
                        Image img = Image.newBuilder().setContent(imgBytes).build();

                        AnnotateImageRequest request = AnnotateImageRequest
                            .newBuilder()
                            .addFeatures(this.labelDetection)
                            .addFeatures(this.textDetection)
                            .setImage(img)
                            .build();
                        BatchAnnotateImagesResponse responses = this.client
                            .batchAnnotateImages(Collections.singletonList(request));
                        AnnotateImageResponse reply = responses.getResponses(0);
                        return reply.toString();
                }
        }

        public static void main(String args[]) {
                SpringApplication.run(VisionApplication.class, args);
        }
}
```

-   we’re configuring the Google Cloud Vision client manually. This is more work than you might do if you had a Spring Boot starter, but it’s definitely not bad!
-   what kind of analysis do we want the client to do?
-   Spring MVC can turn multipart file uploads into a `MultipartFile` from which we can easily extract bytes to feed into this API.

You can POST an image to this endpoint using `curl` or any other general purpose HTTP client. Here’s how it would work with:

`curl`:

```shell
Copycurl  -F "image=@/home/jlong/Desktop/soup.jpg" http://localhost:8080/analyze
```

There are a *zillion* other APIs with whom you might work! Here we are only just beginning to scratch the surface of what’s possible. Check [out this service catalog](https://cloud.google.com/products/)! There are things like Google Cloud DataStore, Google Storage, Firebase, BigQuery, Apigee, video streaming services, IoT services, machine learning, Google Tensorflow, Google Dataflow, Google Cloud AutoML, Cloud Natural Language, Cloud Speech-to-Text, Cloud Text-to-Speech, Genomics APIs, Video Intelligence, and *so* much more.