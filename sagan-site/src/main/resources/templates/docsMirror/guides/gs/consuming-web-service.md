---
title: Getting Started | Consuming a SOAP web service
source: https://spring.io/guides/gs/consuming-web-service
scraped: 2026-02-19T08:01:21.006Z
description: Learn how to create a client that consumes a WSDL-based service
---

# Consuming a SOAP web service

This guide walks you through the process of consuming a SOAP-based web service with Spring.

## What You Will Build

You will build a client that fetches country data from a remote, WSDL-based web service by using [SOAP](http://en.wikipedia.org/wiki/SOAP). You can find out more about the country service and run the service yourself by following [this guide](https://spring.io/guides/gs/producing-web-service/).

The service provides country data. You will be able to query data about a country based on its name.

## What You Need

-   About 15 minutes
    
-   A favorite text editor or IDE
    
-   [Java 17](https://www.oracle.com/java/technologies/downloads/) or later
    
-   [Gradle 7.5+](https://gradle.org/install/) or [Maven 3.5+](https://maven.apache.org/download.cgi)
    
-   You can also import the code straight into your IDE:
    
    -   [Spring Tool Suite (STS)](/guides/gs/sts)
        
    -   [IntelliJ IDEA](/guides/gs/intellij-idea/)
        
    -   [VSCode](/guides/gs/guides-with-vscode/)
        
    

## How to complete this guide

Like most Spring [Getting Started guides](/guides), you can start from scratch and complete each step or you can bypass basic setup steps that are already familiar to you. Either way, you end up with working code.

To **start from scratch**, move on to [Starting with Spring Initializr](#scratch).

To **skip the basics**, do the following:

-   [Download](https://github.com/spring-guides/gs-consuming-web-service/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-consuming-web-service.git](https://github.com/spring-guides/gs-consuming-web-service.git)`
    
-   cd into `gs-consuming-web-service/initial`
    
-   Jump ahead to [Generate Domain Objects Based on a WSDL](#initial).
    

**When you finish**, you can check your results against the code in `gs-consuming-web-service/complete`.

## Run the Target Web Service Locally

Follow the steps in the [companion guide](https://spring.io/guides/gs/producing-web-service/) or clone the [repository](https://github.com/spring-guides/gs-producing-web-service) and run the service (for example, by using `./gradlew bootRun`) from its `complete` directory. You can verify that it works by visiting `[http://localhost:8080/services/countries.wsdl](http://localhost:8080/services/countries.wsdl)` in your browser. Save the file locally as you will need it later.

## Starting with Spring Initializr

For all Spring applications, you should start with the [Spring Initializr](https://start.spring.io). The Initializr offers a fast way to pull in all the dependencies you need for an application and does a lot of the setup for you. This example needs only the Spring Web Services dependency.

You can use this [pre-initialized project](https://start.spring.io/#!type=maven-project&language=java&&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=consuming-web-service&name=consuming-web-service&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.consumingwebservice&dependencies=web-services) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Spring Web Services**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

## Exclude Server side support

The Spring Web Services starter brings in both server and client support. Here, only the client support is relevant so we will update our build file to exclude server support.

Let’s exclude the "spring-boot-starter-webmvc" as we don’t need any server-side support in our application.

For Gradle:

```
Copyimplementation ('org.springframework.boot:spring-boot-starter-webservices') {
	exclude group: 'org.springframework.boot', module: 'spring-boot-starter-webmvc'
}
```

For Maven:

```
Copy<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-webservices</artifactId>
	<exclusions>
		<exclusion>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-webmvc</artifactId>
		</exclusion>
	</exclusions>
</dependency>
```

## Generate Domain Objects Based on a WSDL

The interface to a SOAP web service is captured in [WSDL](http://en.wikipedia.org/wiki/Web_Services_Description_Language). JAXB provides a way to generate Java classes from WSDL (or rather, the XSD contained in the `<Types/>` section of the WSDL). You can find the WSDL for the country service at `[http://localhost:8080/ws/countries.wsdl](http://localhost:8080/ws/countries.wsdl)`. If you haven’t saved it yet, do so now.

Create a `src/main/wsdl` directory and copy `countries.wsdl` to that location.

Let’s configure a build plugin in order to generate classes for the WSDL found in `src/main/wsdl`, putting those classes in the `com.example.consumingwebservice.wsdl` package.

To generate Java classes from the WSDL in Gradle, you need to enable an additional plugin in the `plugins {` section:

```
Copyid 'uk.co.boothen.gradle.wsimport' version '0.25'
```

Then, the plugin should be configured as follows:

```
Copywsimport {
	wsdlSourceRoot = "/src/main/wsdl"
	wsdl ("countries.wsdl") {
		packageName("com.example.consumingwebservice.wsdl")
		xjcarg("-XautoNameResolution")
	}
}
```

You can check the generated classes by `./gradlew assemble` and then look in `build/generated/src/wsdl/main`.

Use the following plugin configuration for Maven:

```
Copy<plugin>
	<groupId>com.sun.xml.ws</groupId>
	<artifactId>jaxws-maven-plugin</artifactId>
	<version>4.0.3</version>
	<executions>
		<execution>
			<goals>
				<goal>wsimport</goal>
			</goals>
		</execution>
	</executions>
	<configuration>
		<wsdlDirectory>${basedir}/src/main/wsdl</wsdlDirectory>
		<packageName>com.example.consumingwebservice.wsdl</packageName>
	</configuration>
</plugin>
```

To generate that code, run `./mvnw compile` and then look in `target/generated-sources/wsimport` if you want to check that it worked.

In both Maven and Gradle, the JAXB domain object generation process has been wired into the build tool’s lifecycle, so you need not run any extra steps once you have a successful build.

## Create a Country Service Client

To create a web service client, you have to extend the `WebServiceGatewaySupport` class and code your operations, as the following example (from `src/main/java/com/example/consumingwebservice/CountryClient.java`) shows:

```
Copypackage com.example.consumingwebservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.client.core.SoapActionCallback;

import com.example.consumingwebservice.wsdl.GetCountryRequest;
import com.example.consumingwebservice.wsdl.GetCountryResponse;

public class CountryClient extends WebServiceGatewaySupport {

  private static final Logger log = LoggerFactory.getLogger(CountryClient.class);

  public GetCountryResponse getCountry(String country) {

    GetCountryRequest request = new GetCountryRequest();
    request.setName(country);

    log.info("Requesting location for " + country);

    GetCountryResponse response = (GetCountryResponse) getWebServiceTemplate()
        .marshalSendAndReceive("http://localhost:8080/services/countries", request,
            new SoapActionCallback(
                "https://spring.io/guides/gs-producing-web-service/GetCountryRequest"));

    return response;
  }

}
```

The client contains one method (`getCountry`) that does the actual SOAP exchange.

In this method, both the `GetCountryRequest` and the `GetCountryResponse` classes are derived from the WSDL and were generated in the JAXB generation process (described in [Generate Domain Objects Based on a WSDL](#initial)). It creates the `GetCountryRequest` request object and sets it up with the `country` parameter (the name of the country). After printing out the country name, it uses the `WebServiceTemplate` supplied by the `WebServiceGatewaySupport` base class to do the actual SOAP exchange. It passes the `GetCountryRequest` request object (as well as a `SoapActionCallback` to pass on a [SOAPAction](http://www.w3.org/TR/2000/NOTE-SOAP-20000508/#_Toc478383528) header with the request) as the WSDL described that it needed this header in the `<soap:operation/>` elements. It casts the response into a `GetCountryResponse` object, which is then returned.

## Configuring Web Service Components

Spring WS uses Spring Framework’s OXM module, which has the `Jaxb2Marshaller` to serialize and deserialize XML requests, as the following example (from `src/main/java/com/example/consumingwebservice/CountryConfiguration.java`) shows:

```
Copypackage com.example.consumingwebservice;

import org.springframework.boot.webservices.client.WebServiceTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;

@Configuration
public class CountryConfiguration {

  @Bean
  public Jaxb2Marshaller marshaller() {
    Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
    // this package must match the package configured in the build.gradle/pom.xml
    marshaller.setContextPath("com.example.consumingwebservice.wsdl");
    return marshaller;
  }

  @Bean
  public CountryClient countryClient(WebServiceTemplateBuilder builder, Jaxb2Marshaller marshaller) {
    builder = builder.setMarshaller(marshaller).setUnmarshaller(marshaller);

    CountryClient client = new CountryClient();
    client.setWebServiceTemplate(builder.build());
    client.setDefaultUri("http://localhost:8080/services");
    return client;
  }

}
```

The `marshaller` is pointed at the collection of generated domain objects and will use them to both serialize and deserialize between XML and POJOs.

The `countryClient` is created and configured with the URI of the country service shown earlier. It is also configured to use the JAXB marshaller.

## Run the Application

This application is packaged up to run from the console and retrieve the data for a given country name, as the following listing (from `src/main/java/com/example/consumingwebservice/ConsumingWebServiceApplication.java`) shows:

```
Copypackage com.example.consumingwebservice;

import java.util.List;

import com.example.consumingwebservice.wsdl.GetCountryResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ConsumingWebServiceApplication {

  Logger logger = LoggerFactory.getLogger(ConsumingWebServiceApplication.class);

  public static void main(String[] args) {
    SpringApplication.run(ConsumingWebServiceApplication.class, args);
  }

  @Bean
  ApplicationRunner lookup(CountryClient countryClient) {
    return args -> {
      List<String> countryOption = args.getOptionValues("country");
      String country = (countryOption == null || countryOption.isEmpty()) ? "Spain" : countryOption.get(0);
      GetCountryResponse response = countryClient.getCountry(country);
      logger.info("Country [%s] has currency [%s].".formatted(country, response.getCountry().getCurrency()));
    };
  }

}
```

The `main()` method defers to the `SpringApplication` helper class, providing `CountryConfiguration.class` as an argument to its `run()` method. This tells Spring to read the annotation metadata from `CountryConfiguration` and to manage it as a component in the Spring application context.

This application is hard-coded to look up 'Spain'. Later in this guide, you will see how to enter a different symbol without editing the code.

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-consuming-web-service-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-consuming-web-service-0.0.1-SNAPSHOT.jar

Logging output is displayed. The service should be up and running within a few seconds.

The following listing shows the initial response:

```
CopyCountry [Spain] has currency [EUR].

<getCountryRequest><name>Spain</name>...</getCountryRequest>
```

You can plug in a different country by running the following command:

```
Copyjava -jar build/libs/consuming-web-service-0.0.1-SNAPSHOT.jar --country=Poland
```

Then the response changes to the following:

```
CopyCountry [Poland] has currency [PLN].

<getCountryRequest><name>Poland</name>...</getCountryRequest>
```

## Summary

Congratulations! You have just developed a client to consume a SOAP-based web service with Spring.

## See Also

The following guides may also be helpful:

-   [Producing a SOAP web service](https://spring.io/guides/gs/producing-web-service/)
    
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-consuming-web-service)