---
title: Maven Configuration for Spring Integration
source: https://spring.io/blog/2010/11/30/maven-configuration-for-spring-integration
scraped: 2026-02-24T08:50:38.080Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Fisher |  November 30, 2010 | 2 Comments
---

# Maven Configuration for Spring Integration

_Releases | Mark Fisher |  November 30, 2010 | 2 Comments_

### Dependencies

Add the following within the <dependencies> section of your POM:

> *<dependency>  
>    <groupId>org.springframework.integration</groupId>  
>    <artifactId>spring-integration-core</artifactId>  
>    <version>2.2.3.RELEASE</version>  
> </dependency>*

That will make the "spring-integration-core" module available to your project (the "core" includes the Messaging API and Enterprise Integration Patterns support). If you want to use any of the adapters or support for XML, Groovy, and/or Spring Security, you can instead add one or more of the following as the "artifactId" value:

-   spring-integration-event
-   spring-integration-feed
-   spring-integration-file
-   spring-integration-ftp
-   spring-integration-groovy
-   spring-integration-http
-   spring-integration-ip
-   spring-integration-jdbc
-   spring-integration-jms
-   spring-integration-jmx
-   spring-integration-mail
-   spring-integration-rmi
-   spring-integration-security
-   spring-integration-sftp
-   spring-integration-stream
-   spring-integration-test
-   spring-integration-twitter
-   spring-integration-ws
-   spring-integration-xml
-   spring-integration-xmpp

**NOTE:** Any of the modules listed above will bring the "core" module in as a transitive dependency, so you do not need to include it in the POM if you are using at least one from that list. Also, some dependencies, such as Jackson for JSON mapping, are not pulled in as transitive dependencies so you will need to add these to your POM (this also applies if you are using other build systems such as gradle).

---

### Repositories

The artifacts are available via the [Maven central repository](http://repo2.maven.org/maven2/org/springframework/integration/), but you can also add the SpringSource repository within the <repositories> section of your POM:

> *<repository>  
>    <id>repository.springframework.maven.release</id>  
>    <name>Spring Framework Maven Release Repository</name>  
>    <url>http://maven.springframework.org/release</url>  
> </repository>*

If you want to use Milestone or Snapshot dependencies instead-of or in-addition-to the Release dependencies, then you can provide the following URLs, respectively:

-   http://maven.springframework.org/milestone
-   http://maven.springframework.org/snapshot