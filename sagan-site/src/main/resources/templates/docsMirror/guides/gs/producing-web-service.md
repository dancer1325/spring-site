---
title: Getting Started | Producing a SOAP web service
source: https://spring.io/guides/gs/producing-web-service
scraped: 2026-02-19T08:03:12.209Z
description: Learn how to create a SOAP-based web service with Spring.
---

# Producing a SOAP web service

This guide walks you through the process of creating a SOAP-based web service server with Spring.

## What You Will build

You will build a server that exposes data from various European countries by using a WSDL-based SOAP web service.

To simplify the example, you will use hardcoded data for the United Kingdom, Spain, and Poland.

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

-   [Download](https://github.com/spring-guides/gs-soap-service/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-soap-service.git](https://github.com/spring-guides/gs-soap-service.git)`
    
-   cd into `gs-soap-service/initial`
    
-   Jump ahead to [Add WSDL runtime dependency](#initial).
    

**When you finish**, you can check your results against the code in `gs-soap-service/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=gradle-project&groupId=com.example&artifactId=producing-web-service&name=producing-web-service&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.producing-web-service&dependencies=web-services) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Spring Web Services**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

## Add WSDL runtime dependency

Our service will require the wsdl4j dependency at runtime, let’s add it to our Gradle build:

```
Copydependencies {
	implementation 'org.springframework.boot:spring-boot-starter-webservices'
	runtimeOnly 'wsdl4j:wsdl4j'
	testImplementation 'org.springframework.boot:spring-boot-starter-webservices-test'
	testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}
```

Or our POM file:

```
Copy<dependencies>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-webservices</artifactId>
	</dependency>
	<dependency>
		<groupId>wsdl4j</groupId>
		<artifactId>wsdl4j</artifactId>
		<optional>true</optional>
	</dependency>

	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-webservices-test</artifactId>
		<scope>test</scope>
	</dependency>
</dependencies>
```

## Create an XML Schema to Define the Domain

The web service domain is defined in an XML schema file (XSD) that Spring-WS will automatically export as a WSDL.

Create an XSD file with operations to return a country’s `name`, `population`, `capital`, and `currency`. The following listing (from `src/main/resources/META-INF/schemas/countriesWs.xsd`) shows the necessary XSD file:

```
Copy<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tns="https://spring.io/guides/gs-producing-web-service"
           targetNamespace="https://spring.io/guides/gs-producing-web-service" elementFormDefault="qualified">

    <xs:element name="getCountryRequest">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="name" type="xs:string"/>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

    <xs:element name="getCountryResponse">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="country" type="tns:country"/>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

    <xs:complexType name="country">
        <xs:sequence>
            <xs:element name="name" type="xs:string"/>
            <xs:element name="population" type="xs:int"/>
            <xs:element name="capital" type="xs:string"/>
            <xs:element name="currency" type="tns:currency"/>
        </xs:sequence>
    </xs:complexType>

    <xs:simpleType name="currency">
        <xs:restriction base="xs:string">
            <xs:enumeration value="GBP"/>
            <xs:enumeration value="EUR"/>
            <xs:enumeration value="PLN"/>
        </xs:restriction>
    </xs:simpleType>
</xs:schema>
```

## Generate Domain Classes Based on an XML Schema

The next step is to generate Java classes from the XSD file. The right approach is to do this automatically during build time by using a Maven or Gradle plugin.

The following listing shows the necessary plugin configuration for Maven:

```
Copy<plugin>
	<groupId>org.codehaus.mojo</groupId>
	<artifactId>jaxb2-maven-plugin</artifactId>
	<version>4.0.0</version>
	<executions>
		<execution>
			<id>xjc</id>
			<goals>
				<goal>xjc</goal>
			</goals>
		</execution>
	</executions>
	<configuration>
		<sources>
			<source>${project.basedir}/src/main/resources/META-INF/schemas/countriesWs.xsd</source>
		</sources>
	</configuration>
</plugin>
```

Generated classes are placed in the `target/generated-sources/jaxb/` directory.

To do the same with Gradle, you can declare a new plugin in the `plugin` section :

```
Copyid 'com.github.bjornvester.xjc' version '1.9.0'
```

And then configure it to point to the XSD files location:

```
Copyxjc {
	xsdDir.set(layout.projectDirectory.dir("src/main/resources/META-INF/schemas"))
}
```

In both cases, the JAXB domain object generation process has been wired into the build tool’s lifecycle, so there are no extra steps to run.

## Create Country Repository

In order to provide data to the web service, create a country repository. In this guide, you create a dummy country repository implementation with hardcoded data. The following listing (from `src/main/java/com/example/producingwebservice/CountryRepository.java`) shows how to do so:

```
Copypackage com.example.producingwebservice;

import java.util.HashMap;
import java.util.Map;

import io.spring.guides.gs_producing_web_service.Country;
import io.spring.guides.gs_producing_web_service.Currency;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class CountryRepository {

	private static final Map<String, Country> countries = new HashMap<>();

	static {
		Country spain = new Country();
		spain.setName("Spain");
		spain.setCapital("Madrid");
		spain.setCurrency(Currency.EUR);
		spain.setPopulation(46704314);

		countries.put(spain.getName(), spain);

		Country poland = new Country();
		poland.setName("Poland");
		poland.setCapital("Warsaw");
		poland.setCurrency(Currency.PLN);
		poland.setPopulation(38186860);

		countries.put(poland.getName(), poland);

		Country uk = new Country();
		uk.setName("United Kingdom");
		uk.setCapital("London");
		uk.setCurrency(Currency.GBP);
		uk.setPopulation(63705000);

		countries.put(uk.getName(), uk);
	}

	public Country findCountry(String name) {
		Assert.notNull(name, "The country's name must not be null");
		return countries.get(name);
	}
}
```

## Create Country Service Endpoint

To create a service endpoint, you need only a POJO with a few Spring WS annotations to handle the incoming SOAP requests. The following listing (from `src/main/java/com/example/producingwebservice/CountryEndpoint.java`) shows such a class:

```
Copypackage com.example.producingwebservice;

import io.spring.guides.gs_producing_web_service.GetCountryRequest;
import io.spring.guides.gs_producing_web_service.GetCountryResponse;

import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class CountryEndpoint {

	private static final String NAMESPACE_URI = "https://spring.io/guides/gs-producing-web-service";

	private final CountryRepository countryRepository;

	public CountryEndpoint(CountryRepository countryRepository) {
		this.countryRepository = countryRepository;
	}

	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "getCountryRequest")
	@ResponsePayload
	public GetCountryResponse getCountry(@RequestPayload GetCountryRequest request) {
		GetCountryResponse response = new GetCountryResponse();
		response.setCountry(countryRepository.findCountry(request.getName()));

		return response;
	}
}
```

The `@Endpoint` annotation registers the class with Spring WS as a potential candidate for processing incoming SOAP messages.

The `@PayloadRoot` annotation is then used by Spring WS to pick the handler method, based on the message’s `namespace` and `localPart`.

The `@RequestPayload` annotation indicates that the incoming message will be mapped to the method’s `request` parameter.

The `@ResponsePayload` annotation makes Spring WS map the returned value to the response payload.

In all of these chunks of code, the `io.spring.guides` classes will report compile-time errors in your IDE unless you have run the task to generate the domain classes based on the WSDL.

## Expose the web service

Now we need to expose the service so that clients can fetch the WSDL definition. Spring Boot will scan all "**.xsd" and "**.wsdl" files in the configured location. So first, we’ll need to declare the location of our schema files by editing `src/main/resources/application.properties`:

```
Copyspring.webservices.wsdl-locations=classpath:META-INF/schemas/
```

Spring Boot will create `SimpleXsdSchema` or `DefaultWsdl11Definition` beans with their names matching file names. Here, we can expect a `SimpleXsdSchema` bean named `countriesWs` and we can use it to create a WSDL bean for exposing it. For that, let’s create a new `src/main/java/com/example/producingwebservice/WebServiceConfig.java` file with the following content:

```
Copypackage com.example.producingwebservice;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition;
import org.springframework.xml.xsd.SimpleXsdSchema;

@Configuration(proxyBeanMethods = false)
public class WebServiceConfig {

	@Bean
	public DefaultWsdl11Definition countries(SimpleXsdSchema countriesWs) {
		DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
		wsdl11Definition.setPortTypeName("CountriesPort");
		wsdl11Definition.setLocationUri("/services");
		wsdl11Definition.setTargetNamespace("https://spring.io/guides/gs-producing-web-service");
		wsdl11Definition.setSchema(countriesWs);
		return wsdl11Definition;
	}

}
```

The `DefaultWsdl11Definition` exposes a standard WSDL 1.1 by using the configured `XsdSchema`.

The bean name for `DefaultWsdl11Definition` determines the URL under which the generated WSDL file is available. In this case, the WSDL will be available under `[http://<host>:<port>/services/countries.wsdl](http://<host>:<port>/services/countries.wsdl)`.

By default, they will be exposed on the `"/services"` HTTP endpoint, but this can be customized with the `spring.webservices.path` property.

## Test the Application

Now that the application is running, you can test it. Create a file called `request.xml` that contains the following SOAP request:

```
Copy<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
				  xmlns:gs="https://spring.io/guides/gs-producing-web-service">
   <soapenv:Header/>
   <soapenv:Body>
      <gs:getCountryRequest>
         <gs:name>Spain</gs:name>
      </gs:getCountryRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

The are a few options when it comes to testing the SOAP interface. You can use something similar to [SoapUI](http://www.soapui.org) or use command-line tools if you are on a \*nix/Mac system. The following example uses curl from the command line:

```
Copy# Use data from file
$ curl --header "Content-Type: text/xml" -d @request.xml http://localhost:8080/services | xmllint --format
```

As a result, you should see the following response:

```
Copy<?xml version="1.0"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP-ENV:Header/>
  <SOAP-ENV:Body>
    <ns2:getCountryResponse xmlns:ns2="https://spring.io/guides/gs-producing-web-service">
      <ns2:country>
        <ns2:name>Spain</ns2:name>
        <ns2:population>46704314</ns2:population>
        <ns2:capital>Madrid</ns2:capital>
        <ns2:currency>EUR</ns2:currency>
      </ns2:country>
    </ns2:getCountryResponse>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

## Summary

Congratulations! You have developed a SOAP-based service with Spring Web Services.

## See Also

The following guides may also be helpful:

-   [Consuming a SOAP web service](https://spring.io/guides/gs/consuming-web-service/)
    
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-producing-web-service)