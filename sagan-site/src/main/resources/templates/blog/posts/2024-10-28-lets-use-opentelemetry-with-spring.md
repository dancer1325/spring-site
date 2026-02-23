---
title: Let’s use OpenTelemetry with Spring
source: https://spring.io/blog/2024/10/28/lets-use-opentelemetry-with-spring
scraped: 2026-02-23T08:09:58.430Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Marcin Grzejszczak |  October 28, 2024 | 10 Comments
---

# Let’s use OpenTelemetry with Spring

_Engineering | Marcin Grzejszczak |  October 28, 2024 | 10 Comments_

# [](#introduction)Introduction

In the dynamic realm of observability, OpenTelemetry is a new set of tools that emerged from the now-deprecated OpenCensus and OpenTracing projects. When it comes to Spring Framework, Spring Boot, Spring Data, and Spring Cloud observability, mature solutions like Micrometer, the de facto Java standard of observability, are being used to instrument their various modules. The OpenTelemetry project consists of many components. The one we find most compelling is the OpenTelemetry Protocol (OTLP), which allows developers to harness the power of a consistent telemetry format for any back-end supporting OTLP. Let’s explore how Spring Boot seamlessly integrates with these tools to deliver exceptional observability.

# [](#the-power-of-micrometers-observation-api)The Power of Micrometer’s Observation API

Micrometer’s Observation API is a cornerstone of Spring Boot’s observability strategy. It offers a comprehensive observability solution that integrates seamlessly with various tracing and monitoring systems. Here’s why it’s the go-to choice for Spring Boot applications:

-   **Stability and Maturity**: Micrometer is a tried-and-true solution, offering a stable and mature platform for observability instrumentation.
-   **Broad Compatibility**: Out of many protocols (AppOptics, Azure Monitor, Netflix Atlas, AWS CloudWatch, Datadog, Dynatrace, Elastic, Ganglia, Graphite, Humio, Influx/Telegraf, JMX, KairosDB, New Relic, Prometheus, SignalFx, Google Stackdriver, StatsD, Wavefront for metrics; B3, W3C for tracing context propagation; Zipkin for span propagation) it also supports the OTLP protocol, ensuring interoperability with OpenTelemetry and other compatible observability tools.
-   **Versatile Integration**: Widely used across Spring and non-spring projects, Micrometer Observation provides a unified observability API that simplifies instrumentation and publishing of the collected data.
-   **Simplified API**: Instrument once and have multiple benefits out of it - plug-in tracing, metrics, logs, etc.
-   **Flexibility in Choice**: As technology changes, Micrometer allows developers to choose their preferred observability tech stack without changing the instrumentation.

# [](#leveraging-open-telemetry-protocol)Leveraging Open Telemetry Protocol

The OpenTelemetry Protocol (OTLP) facilitates communication between different observability tools. By leveraging OTLP, Spring Boot applications can export logging, metrics, and tracing data in a standardized format, making it easier to integrate with various backends and observability platforms. **At the end of the day, it’s the protocol that matters!**

**Why OTLP Matters:**

-   **Standardization**: OTLP provides a consistent way to export observability data, ensuring compatibility and reducing integration complexity.
-   **Flexibility**: Using OTLP allows developers to choose the best tools for their needs, without being locked into a specific vendor or technology stack.
-   **Future-Proofing**: As the observability landscape evolves, OTLP enables your tracing data to remain accessible and usable across different systems.

# [](#introducing-micrometer)Introducing Micrometer

Spring in its core is always about abstractions and allowing developers to choose. Same goes with Micrometer, which was founded in 2016 with the statement that “it’s like SLF4J but for metrics”. Micrometer allows you to abstract your code from the actual metrics backend. As for OTLP, Micrometer supports that from 2022 via a dedicated `OtlpMeterRegistry`.

We wanted to introduce the same abstraction for tracing, that’s why we ported the very mature Spring Cloud Sleuth project (founded in 2014) to Micrometer Tracing so that it is Spring agnostic. Thanks to Micrometer Tracing, you can choose which tracer library you want to pick (a tracer controls the lifecycle of a span and is fundamental for distributed tracing). Micrometer Tracing supports two tracing libraries: OpenZipkin Brave (Brave) and OpenTelemetry.

We believe in mature, production tested solutions, and that’s why we think Micrometer and Brave are essential tools in the Spring Boot observability toolkit. They provide robust observability capabilities, helping developers track and analyze requests across distributed systems.

Micrometer and Brave work seamlessly with Micrometer Observation and they both support OTLP ensuring your metrics ([for around 2 years](https://github.com/micrometer-metrics/micrometer/blob/v1.13.6/implementations/micrometer-registry-otlp/src/main/java/io/micrometer/registry/otlp/OtlpMeterRegistry.java#L63)) and tracing data (via a [freshly released zipkin-otel project](https://github.com/openzipkin-contrib/zipkin-otel/releases/tag/0.1.0) can be easily exported and utilized.

# [](#continuous-improvement)Continuous Improvement

The Spring team knows the Spring Framework quite well because we work on it on a daily basis. We’re also serious about observability - that’s why we're the ones working on the instrumentation. Having the Spring expertise and knowing what our community wants allows us to build a great, customizable developer experience. We believe that framework features and how they're instrumented go together: code, documentation and support.

Nobody’s perfect - including us. We do know that we can always improve the current OpenTelemetry and Spring experience. The Spring team is currently working on making OTLP become the first class citizen as far as metrics/traces/logging/semantic conventions is concerned. This means better auto-configuration where needed, better support in libraries, and less moving parts for developers.

# [](#spring-boot--opentelemetry-example)Spring Boot & OpenTelemetry example

A picture is worth a thousand words - let’s look at the result of running the code available [here](https://github.com/marcingrzejszczak/observability-boot-blog-post).

```xml
Copy<!-- Prerequisite for observability -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!-- For Metrics -->
<!-- For OTLP -->
<dependency>
	<groupId>io.micrometer</groupId>
	<artifactId>micrometer-registry-otlp</artifactId>
</dependency>

<!-- Brave version -->
<!-- For Tracing -->
<dependency>
	<groupId>io.micrometer</groupId>
	<artifactId>micrometer-tracing-bridge-brave</artifactId>
</dependency>
<!-- For Latency Visualization -->
<!-- For OTLP -->
<dependency>
	<groupId>io.zipkin.contrib.otel</groupId>
	<artifactId>encoder-brave</artifactId>
	<version>0.1.0</version>
</dependency>

<!-- For pushing logs out -->
<dependency>
	<groupId>com.github.loki4j</groupId>
	<artifactId>loki-logback-appender</artifactId>
	<version>1.5.2</version>
	<scope>runtime</scope>
</dependency>
```

Maven setup required to have Spring Boot with Open Telemetry (OTLP) through Micrometer Observation, Micrometer Core and Micrometer Tracing.

![Nodes](https://static.spring.io/blog/contentful/20240923/nodes.png)

Node graph of client command line application making an HTTP call to the server side

![Logs](https://static.spring.io/blog/contentful/20240923/logs.png)

Log correlation through Spring Boot, Micrometer Observation, Micrometer Tracing and OpenZipkin Brave bridge

![Traces](https://static.spring.io/blog/contentful/20240923/traces.png)

Trace view - span data received in OTLP format via OTel Brave Encoder (also through Micrometer Observation, Micrometer Tracing and OpenZipkin Brave bridge)

![Metrics](https://static.spring.io/blog/contentful/20240923/metrics.png)

Latency of the incoming requests through Spring Boot with Micrometer Observation, Micrometer Core, Micrometer OTLP push MeterRegistry and OTLP write receiver enabled on the Prometheus side

# [](#conclusion)Conclusion

Spring Boot’s Observability Approach:

-   **Library expertise**: People maintaining the code are the ones maintaining the instrumentation
-   **Integrated Solutions**: With Micrometer and Brave, all necessary tools are integrated within the Spring Boot ecosystem, providing a cohesive and reliable observability framework.
-   **The Protocol Matters**: Through OTLP, one standardizes on the protocol level making it easier to integrate with various backends and observability platforms.

Spring Boot’s embrace of OpenTelemetry principles through the use of OTLP, Micrometer for metrics, Brave for tracing and Micrometer Observation as a common abstraction demonstrates a commitment to robust and reliable observability. By leveraging these tools, developers can achieve comprehensive observability. This approach not only simplifies the observability setup but also ensures a stable and mature framework for production environments. Spring Boot is a great fan of OpenTelemetry, and it shows in how effortlessly it integrates with these powerful observability tools.

# [](#links)Links

-   Code: [https://github.com/marcingrzejszczak/observability-boot-blog-post](https://github.com/marcingrzejszczak/observability-boot-blog-post)
-   Spring Boot observability docs: [https://docs.spring.io/spring-boot/reference/actuator/observability.html](https://docs.spring.io/spring-boot/reference/actuator/observability.html)
-   Micrometer website: [https://micrometer.io/](https://micrometer.io/)
-   Micrometer docs: [https://docs.micrometer.io/micrometer/reference/](https://docs.micrometer.io/micrometer/reference/)
-   Micrometer Tracing docs: [https://docs.micrometer.io/tracing/reference/](https://docs.micrometer.io/tracing/reference/)