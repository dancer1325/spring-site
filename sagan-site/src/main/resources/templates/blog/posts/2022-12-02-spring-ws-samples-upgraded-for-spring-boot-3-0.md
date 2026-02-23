---
title: Spring WS Samples upgraded for Spring Boot 3.0!
source: https://spring.io/blog/2022/12/02/spring-ws-samples-upgraded-for-spring-boot-3-0
scraped: 2026-02-23T10:25:13.552Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  December 02, 2022 | 5 Comments
---

# Spring WS Samples upgraded for Spring Boot 3.0!

_Engineering | Greg L. Turnquist |  December 02, 2022 | 5 Comments_

With the recent [announcement of Spring Boot 3.0 going GA](https://spring.io/blog/2022/11/24/spring-boot-3-0-goes-ga), some of you may be interested in upgrading your Spring Web Services-based applications to take full advantage of this. The Spring WS team has upgraded our set of sample apps to help you carry that out.

The [main branch](https://github.com/spring-projects/spring-ws-samples) now tracks the version of samples with all these updates. (The prior version of samples built on Spring Boot 2.7 are now on that repository’s `1.0.x` branch.)

Some of the highlights are covered below.

## [](#a-lot-of-our-tools-have-moved)A LOT of our tools have moved!

Back in the olden days, much of our XML processing tools were inside the JDK. But ever since Java 9 and the migrations of Java EE-based packages to the Eclipse Foundation, those tools have since been pulled out of the JDK. On top of that, SOAP-based libraries, heavily leveraging the now Jakarta EE specs, have seen some upgrades.

This means you’ll be needing to either upgrade your plugins or switch to alternatives. For example, some SOAP apps use Jakarta XML Binding (JAXB). To comply with Jakarta EE 9+, you need JAXB 3.0. One way to access **xjc**, a popular tool to generate Java POJO classes from XSD files is shown below:

Example 1. Using JAXB’s xjc compiler on XSD files (airline/server/pom.xml)

```
Copy<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>jaxb2-maven-plugin</artifactId>
    <version>3.1.0</version>
    <executions>
        <execution>
            <id>xjc</id>
            <goals>
                <goal>xjc</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <sources>${project.basedir}/src/main/resources/messages.xsd</sources>
        <packageName>org.springframework.ws.samples.airline.schema</packageName>
        <target>3.0</target>
    </configuration>
</plugin>
```

**Note**

This isn’t meant to be an extensive listing of all the settings, but instead one example of how to use it. Please visit the plugin’s ref docs for more details.

There are several tools that will compile a WSDL into Java classes, one being Jakarta XML Web Services (JAX-WS).

Example 2. Using JAX-WS’s wsimport tool to compile a WSDL (airline/client/jax-ws/pom.xml)

```
Copy<plugin>
    <groupId>com.sun.xml.ws</groupId>
    <artifactId>jaxws-maven-plugin</artifactId>
    <version>3.0.0</version>
    <executions>
        <execution>
            <goals>
                <goal>wsimport</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <!-- The name of your generated source package -->
        <wsdlFiles>${project.basedir}/../airline.wsdl</wsdlFiles>
        <packageName>org.springframework.ws.samples.airline.client.jaxws</packageName>
        <sourceDestDir>${sourcesDir}</sourceDestDir>
        <destDir>${classesDir}</destDir>
        <extension>true</extension>
    </configuration>
</plugin>
```

There are actually multiple ways to do this, and if you look at each sample, they each do things a little differently. Pick the one that meets your needs the best.

## [](#logging-soap-traffic)Logging SOAP traffic

One of the most vital tools we have is logging. And logging SOAP messages coming and going is critical to debugging configuration and ensuring we are sending what the server is expected. Thanks to Spring Boot, it’s easier than ever to debug SOAP traffic.

Just add this to your `application.properties` file:

Example 3. Logging SOAP messages (airline/server/src/main/resources/application.properties)

```
Copylogging.level.org.springframework.ws.client.MessageTracing.sent=DEBUG
logging.level.org.springframework.ws.server.MessageTracing.sent=DEBUG
logging.level.org.springframework.ws.client.MessageTracing.received=TRACE
logging.level.org.springframework.ws.server.MessageTracing.received=TRACE
```

## [](#axiom-doesnt-support-jakarta-ee-9)Axiom doesn’t support Jakarta EE 9+

Spring Web Services 4.0 had to, unfortunately, drop its support for Apache Axiom. It’s most recently version (1.4) still taps the old version of Java EE Activation, not the Jakarta EE version.

The irony is that our Axis1 client (Axis is built on top of Axiom) still works! This is mostly due to that example not using Spring WS but simple Axis APIs to talk to the Airport Server. (Perhaps we don’t need such a sample?)

The upshot of all this is that SOAP itself as a technology is very solid. The specs and formats of SOAP messages haven’t really changed. Instead, the libraries that help us compose, transmit, and consume SOAP messages is what’s changing. And so a legacy library can easily communicate with a new-and-improved SOAP server running the very latest version of Spring WS.

## [](#xws-security-doesnt-support-jakarta-ee-9)XWS-Security doesn’t support Jakarta EE 9+

XWS-Security has been a workhorse for years. It is a rock-solid library that allows us to sign, secure, encrypt, decrypt, and validate SOAP messages through the many flavors of security covered in the specs. It’s very easy to dial in exactly what you need with XWS-Security on both clients and servers.

The problem is, XWS-Security hasn’t had an update since 2008. That means, no support for Jakarta EE 9-based APIs.

Thankfully, we have the Apache WSS4J project, which as recently as October of this year, put out a release that supports Jakarta EE 9.

The samples have been upgraded showing how to use Spring WS’s Wss4jSecurityInterceptor in both client-based and server-based messaging.

## [](#more-spring-boot-overall)More Spring Boot overall

You may not realize it, but these examples were first created long ago, back in 2013 by Spring WS’s original creator, Arjen Poutsma. And they predate a LOT of stuff including Spring Boot. They were first written without any usage of Spring Data and they also began with Spring’s legacy XML format while using Spring WS 2.1.

I have strived to upgrade these samples to use the more modern convention of Java-based configuration, switching to Spring Boot autoconfigured services when possible, and also migrating toward a full-on usage of Spring Data JPA where it made sense. And I will continue to upgrade these samples as needed to better leverage them.

If you spot issues or possible improvements, feel free to [submit a pull request](https://github.com/spring-projects/spring-ws-samples/pulls). Contributions welcome!

## [](#summary)Summary

I know that configuring SOAP-based services with Java can be incredibly brittle. Examples are one of the most useful things we as software developers need.

But hopefully, by updating these samples to work with Spring Boot 3.0, Jakarta EE 9+, Java 17, and Spring Framework 6.0, you’ll have a good place to go if you need help assembling your next (or current!) SOAP-based application.

\--Greg Project Lead for Spring Web Services