---
title: Azure Spring Cloud Is Now In Public Preview
source: https://spring.io/blog/2019/11/04/azure-spring-cloud-is-now-in-public-preview
scraped: 2026-02-23T14:27:38.875Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 04, 2019 | 0 Comments
---

# Azure Spring Cloud Is Now In Public Preview

_Engineering | Josh Long |  November 04, 2019 | 0 Comments_

Hi, Spring fans! Today we're excited to announce that Azure Spring Cloud, the runtime for Spring Boot-based applications and Spring Cloud-based microservices jointly developed by Microsoft and Pivotal, is now in public beta. Anybody can try it out now!

As customers have moved their workloads to the cloud, we’ve seen a growth in the use of cloud-native architectures, particularly microservices. Microservice-based architectures help improve scalability and velocity, but implementing them can pose challenges. For many Java developers, Spring Boot and Spring Cloud have helped address these challenges, providing a robust platform with well-established patterns for developing and operating microservice applications.

The trouble is that creating and maintaining Spring Cloud infrastructure - like a service registry, distributed tracing, and distributed configuration - requires administrative work that few organizations are prepared to take on. Spring Cloud gives you the machinery, but it's up to you to figure out how you want things secured, scaled, load-balanced, etc. Azure Spring Cloud is a managed environment built on top of Microsoft Azure with pre-configured, opinionated, ready-to-deploy infrastructure services, and runtime for Spring-based applications.

## [](#a-spring-centric-platform)A Spring-centric Platform

Suppose you had a typical Spring Cloud-based microservice that depends on configuration in the Spring Cloud Config Server and participates in service registration and discovery using the Spring Cloud Eureka `DiscoveryClient` abstraction implementation.

**src/main/java/demo/DemoApplication.java**

```java
Copy
package demo; 

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}

@RestController
class GreetingsRestController {

    private final String message;

    GreetingsRestController(@Value("${application.message}") String msg) {
        this.message = msg;
    }

    @GetMapping("/hello")
    public String hello() {
        return message;
    }
}

```

This application is, of course, to be accompanied by a property file containing the name of the application as it appears in the service registry:

**src/main/resources/application.properties**

```
Copyspring.application.name = account-service
```

This demonstration is a trivial application. Still, to get it to production, you'd need to set up a Spring Cloud Config Server (complete with security and a Git repository), a Spring Cloud Eureka Server service registry (including horizontal scale-out), and a deployment for the application itself.

Azure Spring Cloud changes everything.

## [](#to-production-and-beyond)To Production... And Beyond!

To set up the environment, you'll need to set up an Azure Spring Cloud environment.

![](https://pbs.twimg.com/media/EIjfAwUWsAAar-f?format=jpg&name=4096x4096)

You can then configure a Spring Cloud Config Server, and its authentication, with ease.

![](https://pbs.twimg.com/media/EIjfAwOWsAEPUeM?format=jpg&name=4096x4096)

There is auto-configuration required specifically when deploying our service into production in Azure Spring Cloud. Enable it in your build with a Maven profile, like this:

```
Copy	<profiles>
		<profile>
			<id>cloud</id>
			<repositories>
				<repository>
					<id>nexus-snapshots</id>
					<url>https://oss.sonatype.org/content/repositories/snapshots/</url>
					<snapshots>
						<enabled>true</enabled>
					</snapshots>
				</repository>
			</repositories>
			<dependencies>
				<dependency>
					<groupId>com.microsoft.azure</groupId>
					<artifactId>spring-cloud-starter-azure-spring-cloud-client</artifactId>
					<version>2.1.0-SNAPSHOT</version>
				</dependency>
			</dependencies>
		</profile>
	</profiles>
```

Build the application using Maven, activating the Maven `cloud` profile:

```
Copymvn -Pcloud clean package 
```

You can now deploy the application using the Azure CLI, `az`:

```
Copyaz spring-cloud app create -n demo-app # create the logical application 
az spring-cloud app deploy -n demo-app --jar-path target/demo-0.0.1-SNAPSHOT.jar # deploy the Boot .jar
```

Once you've deployed the application, you can see that it's discoverable through the managed service registry on Azure Spring Cloud, such as these applications in various states:

![](https://pbs.twimg.com/media/EIjfAwSXUAIieQv?format=jpg&name=4096x4096)

## [](#whats-next)What's Next

What does this mean for you? Well, it's just the beginning! Microsoft Azure is a vibrant platform offering competitive prices, more regions than any other IaaS provider in the world, and a production-minded environment for Spring-based applications. We've introduced some of the features in Azure Spring Cloud in this post. However, you can still exploit the richness of the larger Azure platform from your Azure Spring Cloud-based applications, and you can leverage the Spring Cloud Azure open-source project to make binding to Azure-managed services a snap. The services are what is most enticing to me. For your next steps, you might explore the tight integration with Spring Security and Active Directory, or the reactive Spring Data support for Azure CosmosDB, or the reactive R2DBC integration for Microsoft SQL Server, fully managed on Microsoft Azure.

There are some great resources for you to pursue. You can walk through a much more [exhaustive training here](https://github.com/microsoft/azure-spring-cloud-training), and you can see some samples on how to [deploy and scale-up applications here](https://github.com/Azure-Samples/azure-spring-cloud).

And, of course, if you'd like to learn more about Azure Spring Cloud, then you should not miss this talk that Microsoft's [Julien Dubois](https://twitter.com/juliendubois) and [I](http://twitter.com/Starbuxman) presented at the recent SpringOne Platform 2019 show!

See you in production!