---
title: YMNNALFT:  Dimensional Metrics Accumulation with Micrometer
source: https://spring.io/blog/2021/01/20/ymnnalft-dimensional-metrics-accumulation-with-micrometer
scraped: 2026-02-23T13:33:47.380Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 20, 2021 | 0 Comments
---

# YMNNALFT:  Dimensional Metrics Accumulation with Micrometer

_Engineering | Josh Long |  January 20, 2021 | 0 Comments_

Welcome to another installment of *You May Not Need Another Library For That* (YMNNALFT)! I've spent a lot of time since 2016 illuminating (or trying to, anyway!) some of the more enormous opportunities in the Spring ecosystem in [my Spring Tips videos](http://bit.ly/spring-tips-playlist). Today, however, I come to you in a different spirit, wanting to focus on the little, sometimes hidden, gems that do fantastic things and that might spare you an additional third-party dependency and its implied complexity.

It's 3 AM. Do you know where your production KPI Metrics are? You can't improve that you can't measure, and metrics are an important part of this. Without metrics, we're utterly and hopelessly lost, trapped in a spiraling death-march project with no sign or hope of any improvement! Tremble, ye wretched and miserable developer! Without metrics, we're blind, and there's nothing funny about that, so instead, here's a photo of my daughter's adorable little guinea pig, Kai:

![](https://pbs.twimg.com/media/Ef7FS3yUEAEE5oF?format=jpg&name=large)

Metrics give us a way to describe specific facts about our system - it lets us quantify essential data, which is nice since there are all sorts of things to count and quantify:

-   how many people have clicked the 'check out' button?
-   How many people have signed up?
-   How long are requests to a particular endpoint taking?
-   How many people are experiencing errors?
-   What is the average time for a given request? (Or, more usefully, what's the 99th percentile of a given request?
-   Bob, did you get your TPS reports in? Oh \_ c'mon\_, Bob! We talked about this! You said you'd get it in by close-of-business Tuesday, you absolute scoundrel!

There's a real art to learning about which metrics to capture and which are irrelevant. Whole careers, even! "Growth hacker," anyone? Not all metrics are created equal. *Growth hackers* care about metrics. Product managers will care about metrics. The business will care about metrics. Your platform can care about metrics. *You* should care about metrics. And why not? All the data's there for the taking, but you'll need a robust framework to help you. Writing code to instrument your code and capture metrics is only half the battle. Once captured, you'll want (need!) to store and analyze the metrics. To do so, you'll use a time series database - something like [VMWare's Wavefront](https://tanzu.vmware.com/observability), [Prometheus](https://prometheus.io/), [Netflix Atlas](https://github.com/Netflix/atlas), [DataDog](https://www.datadoghq.com/), [Instana](http://instana.com), etc., to then visualize and analyze that data. You'll need a robust framework that supports capturing all sorts of metrics (timers, counters, histograms, averages, etc.) in all sorts of contexts and then emitting those metrics to all sorts of time series databases (TSDBs).

Enter [Micrometer](http://micrometer.io). Micrometer allows you to instrument your code with dimensional metrics with a vendor-neutral interface and decide at the last step which monitoring system you'd like to use. Instrumenting your core library code with Micrometer allows the libraries to be included in applications that ship metrics to different backends. Spring Boot provides the Actuator module to support capturing and observing different aspects of an application. It sports endpoints of things like an application's health, the thread dumps, and countless other things. It has an endpoint, `/actuator/metrics`, that depends on Micrometer, giving you an at-a-glance view of the metrics being captured by your Spring Boot application, independent of whether you're also publishing those metrics to a TSDB.

Keep in mind that Spring depends on Micrometer, but Micrometer does not depend on Spring. Many libraries instrument themselves using the Micrometer SPI. All you need to do is add integration with a TSDB. Here are some of the third-party libraries that emit metrics with Micrometer: Javalin, HikariCP, the RabbitMQ Java client, Redisson, the Brave distributed tracing client, Netflix Spinnaker, the Netty-powered, non-blocking, Armeria framework, the Alibaba Nacos client, Apache Geode, the Microsoft Azure Spring Boot integrations, Resilience4J, the reactive Playtika Feign-client, Openrewrite, Apache Camel, the Couchbase Java DCP client, and literally hundreds of others. Oh, did I mention that countless modules in the Spring ecosystem support it as well? Yes, Micrometer truly is *everywhere* you want to be!

We're using Spring, of course, so it's easier to just add the Spring Boot Actuator module to the build. If you want to support a particular TSBD, you'll have to bring in the specific module for that particular integration. Some Micrometer integrations come complete with a full Spring Boot integration, too, so you can use those if you want in lieu of the direct Micrometer integration. VMware Wavefront is one such TSDB that ships with extensive and rich integration with Spring Boot, so I'll bring in that superset integration here.

Let's look at a simple service.

You'll need the following dependencies.

-   Actuator on [the Spring Initializr](http://start.spring.io) - `org.springframework.boot` : `spring-boot-starter-actuator`
    
-   Wavefront on [the Spring Initializr](http://start.spring.io) - `com.wavefront` : `wavefront-spring-boot-starter`
    

In this example, I create two counter metrics for the statistic about my coffee consumption for the day. I add one extra dimension to the data: whether the coffee had caffeine or not.

Here's the code:

```java
Copypackage bootiful.metrics;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class BootifulApplication {

	public static void main(String[] args) {
		System.setProperty("spring.profiles.active", "metrics");
		SpringApplication.run(BootifulApplication.class, args);
	}

	@Bean
	ApplicationListener<ApplicationReadyEvent> ready(MeterRegistry registry) {
		return event -> {

			// http://localhost:8080/actuator/metrics/coffees
			String metricsKey = "coffees";
			Counter decaffeinated = registry.counter(metricsKey, "caffeine", "false");
			Counter caffeinated = registry.counter(metricsKey, "caffeine", "true");

			for (int i = 0; i < (int) (Math.random() * 10); i++)
				caffeinated.increment();

			for (int i = 0; i < (int) (Math.random() * 10); i++)
				decaffeinated.increment();

			System.out.println("caffeinated: " + caffeinated.count());
			System.out.println("decaffeinated: " + decaffeinated.count());

			// http://localhost:8080/actuator/metrics/message-print
			Timer timer = registry.timer("message-print");

			for (int i = 0; i < 10; i++)
				timer.record(Duration.ofMillis((long) (Math.random() * (10 * 1000))));

			System.out.println("message-print: " + timer.totalTime(TimeUnit.SECONDS));
		};
	}

}
```

Here's what I put into my `application.properties`:

```properties
Copyspring.main.web-application-type=reactive
management.endpoints.web.exposure.include=*
management.endpoint.metrics.enabled=true
```

In most entries in this series, I mention possible alternatives to the library under discussion. I don't want to do that here because I haven't really found anything that comes close to Micrometer, and it'd be disingenuous if I said I had. Micrometer is a much better solution. Most of the other metrics frameworks you'll find either fail to integrate with as many solutions as Micrometer or, worse, don't support *dimensional metrics*. Dimensional metrics refer to metric data that has a variety of attributes (dimensions) attached. These attributes could include duration-related attributes (start and stop time), IDs, metadata attached with the client context, the region of the request, information about the client, information about the endpoint being invoked, host, status code, etc. This amount of detail allows for in-depth analysis and querying. Dimensional metrics mean that it's easier to capture metrics, and it's easier to then drill down into the metrics in an unforeseen way later. Win-win!

Did you like this gem at a glance approach? Did you learn anything? As always, I'm keen on hearing from you, so [please sound off on Twitter (@starbuxman)](http://twitter.com/starbuxman) ! I'll be back with another installment of *YMNNALFT*, so be sure not to miss that.