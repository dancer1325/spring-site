---
title: Getting Started | Accessing Data in Pivotal GemFire with REST
source: https://spring.io/guides/gs/accessing-gemfire-data-rest
scraped: 2026-02-19T08:02:52.405Z
description: Learn how to work with RESTful, hypermedia-based data persistence using Spring Data REST.
---

# Accessing Data in Pivotal GemFire with REST

This guide walks you through the process of creating an application that accesses data stored in [Apache Geode](https://geode.apache.org/) through a [hypermedia-based](/guides/gs/rest-hateoas) [REST-ful frontend](/understanding/REST).

## What you’ll build

You’ll build a *Spring* Web application that let’s you create and retrieve `Person` objects stored in the [Apache Geode](https://geode.apache.org/) In-Memory Data Grid (IMDG) using Spring Data REST. Spring Data REST takes the features of [Spring HATEOAS](https://projects.spring.io/spring-hateoas) and [Spring Data for Apache Geode](https://spring.io/projects/spring-data-geode) and combines them together automatically.

Spring Data REST also supports [Spring Data JPA](/guides/gs/accessing-data-rest), [Spring Data MongoDB](/guides/gs/accessing-mongodb-data-rest) and [Spring Data Neo4j](/guides/gs/accessing-neo4j-data-rest) as backend data stores, but those are not part of this guide.

For more general knowledge of Apache Geode concepts and accessing data from Apache Geode, read through the guide, [Accessing Data with Apache Geode](https://spring.io/guides/gs/accessing-data-gemfire/).

## What you’ll need

-   About 15 minutes
    
-   A favorite text editor or IDE
    
-   [Java 1.8](https://www.oracle.com/java/technologies/downloads/) or later
    
-   [Gradle 7.5+](https://gradle.org/install/) or [Maven 3.5+](https://maven.apache.org/download.cgi)
    
-   You can also import the code straight into your IDE:
    
    -   [Spring Tool Suite (STS)](/guides/gs/sts)
        
    -   [IntelliJ IDEA](/guides/gs/intellij-idea/)
        
    -   [VSCode](/guides/gs/guides-with-vscode/)
        
    

## How to complete this guide

Like most Spring [Getting Started guides](/guides), you can start from scratch and complete each step or you can bypass basic setup steps that are already familiar to you. Either way, you end up with working code.

To **start from scratch**, move on to [Starting with Spring Initializr](#scratch).

To **skip the basics**, do the following:

-   [Download](https://github.com/spring-guides/gs-accessing-gemfire-data-rest/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-accessing-gemfire-data-rest.git](https://github.com/spring-guides/gs-accessing-gemfire-data-rest.git)`
    
-   cd into `gs-accessing-gemfire-data-rest/initial`
    
-   Jump ahead to [Create a domain object](#initial).
    

**When you finish**, you can check your results against the code in `gs-accessing-gemfire-data-rest/complete`.

## Starting with Spring Initializr

For all Spring applications, you should start with the [Spring Initializr](https://start.spring.io). Spring Initializr offers a fast way to pull in all the dependencies you need for an application and does a lot of the set up for you. This example needs "*Spring for Apache Geode*" dependency.

The following listing shows an example `pom.xml` file when using Maven:

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
		 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">

	<modelVersion>4.0.0</modelVersion>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.7.0</version>
	</parent>

	<groupId>org.springframework</groupId>
	<artifactId>gs-accessing-gemfire-data-rest</artifactId>
	<version>0.1.0</version>

	<properties>
		<spring-shell.version>1.2.0.RELEASE</spring-shell.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-rest</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.data</groupId>
			<artifactId>spring-data-geode</artifactId>
		</dependency>
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.shell</groupId>
			<artifactId>spring-shell</artifactId>
			<version>${spring-shell.version}</version>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
			<exclusions>
				<exclusion>
					<groupId>org.junit.vintage</groupId>
					<artifactId>junit-vintage-engine</artifactId>
				</exclusion>
			</exclusions>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>

The following listing shows an example `build.gradle` file when using Gradle:

plugins {
    id 'org.springframework.boot' version '2.7.0'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    id 'io.freefair.lombok' version '6.3.0'
    id 'java'
}

apply plugin: 'eclipse'
apply plugin: 'idea'

group = "org.springframework"
version = "0.1.0"
sourceCompatibility = 1.8
targetCompatibility = 1.8

repositories {
    mavenCentral()
}

dependencies {

    implementation "org.springframework.boot:spring-boot-starter-data-rest"
    implementation "org.springframework.data:spring-data-geode"
    implementation "org.projectlombok:lombok"

    runtimeOnly "org.springframework.shell:spring-shell:1.2.0.RELEASE"

    testImplementation "org.springframework.boot:spring-boot-starter-test"

}

test {
    useJUnitPlatform()
}

bootJar {
    baseName = 'gs-accessing-gemfire-data-rest'
    version =  '0.1.0'
}

## Create a domain object

Create a new domain object to present a person.

`src/main/java/hello/Person.java`

```
Copypackage hello;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.gemfire.mapping.annotation.Region;

import lombok.Data;

@Data
@Region("People")
public class Person {

  private static AtomicLong COUNTER = new AtomicLong(0L);

  @Id
  private Long id;

  private String firstName;
  private String lastName;

  @PersistenceConstructor
  public Person() {
    this.id = COUNTER.incrementAndGet();
  }
}
```

The `Person` has a first and last name. Apache Geode domain objects need an id, so an `AtomicLong` is being used to increment with each `Person` object creation.

## Create a Person Repository

Next, you need to create a simple *Repository* to persist/access `Person` objects stored in Apache Geode.

`src/main/java/hello/PersonRepository.java`

```
Copypackage hello;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface PersonRepository extends CrudRepository<Person, Long> {

  List<Person> findByLastName(@Param("name") String name);

}
```

This *Repository* is an interface and will allow you to perform various data access operations (e.g. basic CRUD and simple queries) involving `Person` objects. It gets these operations by extending `CrudRepository`.

At runtime, *Spring Data for Apache Geode* will create an implementation of this interface automatically. Then, Spring Data REST will use the [@RepositoryRestResource](https://docs.spring.io/spring-data/rest/docs/current/api/org/springframework/data/rest/core/annotation/RepositoryRestResource.html) annotation to direct Spring MVC to create REST-ful endpoints at `/people`.

`@RepositoryRestResource` is not required for a *Repository* to be exported. It is only used to change the export details, such as using `/people` instead of the default value of `/persons`.

Here you have also defined a custom query to retrieve a list of `Person` objects based on `lastName`. You’ll see how to invoke it further down in this guide.

## Make the application executable

Although it is possible to package this service as a traditional [WAR](/understanding/WAR) file for deployment to an external application server, the simpler approach demonstrated below creates a standalone application. You package everything in a single, executable JAR file, driven by a good old Java `main()` method. Along the way, you use *Spring’s* support for embedding the [Tomcat](/understanding/Tomcat) servlet container as the HTTP runtime, instead of deploying to an external servlet container.

`src/main/java/hello/Application.java`

```
Copypackage hello;

import org.apache.geode.cache.client.ClientRegionShortcut;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.gemfire.config.annotation.ClientCacheApplication;
import org.springframework.data.gemfire.config.annotation.EnableEntityDefinedRegions;
import org.springframework.data.gemfire.repository.config.EnableGemfireRepositories;

@SpringBootApplication
@ClientCacheApplication(name = "AccessingGemFireDataRestApplication")
@EnableEntityDefinedRegions(
  basePackageClasses = Person.class,
  clientRegionShortcut = ClientRegionShortcut.LOCAL
)
@EnableGemfireRepositories
@SuppressWarnings("unused")
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}
```

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `hello` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

The `@EnableGemfireRepositories` annotation activates *Spring Data for Apache Geode* *Repositories*. *Spring Data for Apache Geode* will create a concrete implementation of the `PersonRepository` interface and configure it to talk to an embedded instance of Apache Geode.

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-accessing-gemfire-data-rest-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-accessing-gemfire-data-rest-0.0.1-SNAPSHOT.jar

Logging output is displayed. The service should be up and running within a few seconds.

## Test the application

Now that the application is running, you can test it. You can use any REST client you wish. The following examples uses the \*nix tool `curl`.

First you want to see the top level service.

```
Copy$ curl http://localhost:8080
{
  "_links" : {
    "people" : {
      "href" : "http://localhost:8080/people"
    }
  }
}
```

Here you get your first glimpse of what this server has to offer. There is a **people** link located at [http://localhost:8080/people](http://localhost:8080/people). *Spring Data for Apache Geode* doesn’t support pagination like the other Spring Data REST guides so there are no extra navigational links.

Spring Data REST uses the [HAL format](https://stateless.co/hal_specification.html) for JSON output. It is flexible and offers a convenient way to supply links adjacent to the data that is served.

```
Copy$ curl http://localhost:8080/people
{
  "_links" : {
    "search" : {
      "href" : "http://localhost:8080/people/search"
    }
  }
}
```

Time to create a new `Person`!

```
Copy$ curl -i -X POST -H "Content-Type:application/json" -d '{  "firstName" : "Frodo",  "lastName" : "Baggins" }' http://localhost:8080/people
HTTP/1.1 201 Created
Server: Apache-Coyote/1.1
Location: http://localhost:8080/people/1
Content-Length: 0
Date: Wed, 05 Mar 2014 20:16:11 GMT
```

-   `-i` ensures you can see the response message including the headers. The URI of the newly created `Person` is shown
    
-   `-X POST` issues a `POST` HTTP request to create a new entry
    
-   `-H "Content-Type:application/json"` sets the content-type so the application knows the payload contains a JSON object
    
-   `-d '{ "firstName" : "Frodo", "lastName" : "Baggins" }'` is the data being sent
    

Notice how the previous `POST` operation includes a `Location` header. This contains the URI of the newly created resource. Spring Data REST also has two methods on `RepositoryRestConfiguration.setReturnBodyOnCreate(…)` and `setReturnBodyOnCreate(…)` which you can use to configure the framework to immediately return the representation of the resource just created.

From this you can query for all people:

```
Copy$ curl http://localhost:8080/people
{
  "_links" : {
    "search" : {
      "href" : "http://localhost:8080/people/search"
    }
  },
  "_embedded" : {
    "persons" : [ {
      "firstName" : "Frodo",
      "lastName" : "Baggins",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/people/1"
        }
      }
    } ]
  }
}
```

The **people** collection resource contains a list with Frodo. Notice how it includes a **self** link. Spring Data REST also uses [Evo Inflector](https://www.atteo.org/2011/12/12/Evo-Inflector.html) to pluralize the name of the entity for groupings.

You can query directly for the individual record:

```
Copy$ curl http://localhost:8080/people/1
{
  "firstName" : "Frodo",
  "lastName" : "Baggins",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/1"
    }
  }
}
```

This might appear to be purely web based, but behind the scenes, it is talking to an embedded Apache Geode database.

In this guide, there is only one domain object. With a more complex system where domain objects are related to each other, Spring Data REST will render additional links to help navigate to connected records.

Find all the custom queries:

```
Copy$ curl http://localhost:8080/people/search
{
  "_links" : {
    "findByLastName" : {
      "href" : "http://localhost:8080/people/search/findByLastName{?name}",
      "templated" : true
    }
  }
}
```

You can see the URL for the query including the HTTP query parameter `name`. If you’ll notice, this matches the `@Param("name")` annotation embedded in the interface.

To use the `findByLastName` query, do this:

```
Copy$ curl http://localhost:8080/people/search/findByLastName?name=Baggins
{
  "_embedded" : {
    "persons" : [ {
      "firstName" : "Frodo",
      "lastName" : "Baggins",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/people/1"
        }
      }
    } ]
  }
}
```

Because you defined it to return `List<Person>` in the code, it will return all of the results. If you had defined it to only return `Person`, it would pick one of the `Person` objects to return. Since this can be unpredictable, you probably don’t want to do that for queries that can return multiple entries.

You can also issue `PUT`, `PATCH`, and `DELETE` REST calls to either replace, update, or delete existing records.

```
Copy$ curl -X PUT -H "Content-Type:application/json" -d '{ "firstName": "Bilbo", "lastName": "Baggins" }' http://localhost:8080/people/1
$ curl http://localhost:8080/people/1
{
  "firstName" : "Bilbo",
  "lastName" : "Baggins",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/1"
    }
  }
}
```

```
Copy$ curl -X PATCH -H "Content-Type:application/json" -d '{ "firstName": "Bilbo Jr." }' http://localhost:8080/people/1
$ curl http://localhost:8080/people/1
{
  "firstName" : "Bilbo Jr.",
  "lastName" : "Baggins",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/1"
    }
  }
}
```

`PUT` replaces an entire record. Fields not supplied will be replaced with `null`. `PATCH` can be used to update a subset of items.

You can delete records:

```
Copy$ curl -X DELETE http://localhost:8080/people/1
$ curl http://localhost:8080/people
{
  "_links" : {
    "search" : {
      "href" : "http://localhost:8080/people/search"
    }
  }
}
```

A very convenient aspect of this [hypermedia-driven interface](/understanding/HATEOAS) is how you can discover all the REST-ful endpoints using `curl` (or whatever REST client you are using). There is no need to exchange a formal contract or interface document with your customers.

## Summary

Congratulations! You’ve just developed an application with a [hypermedia-based](/guides/gs/rest-hateoas) [RESTful](/understanding/REST) frontend and a Apache Geode-based backend.

## See Also

The following guides may also be helpful:

-   [Accessing JPA Data with REST](https://spring.io/guides/gs/accessing-data-rest/)
    
-   [Accessing MongoDB Data with REST](https://spring.io/guides/gs/accessing-mongodb-data-rest/)
    
-   [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
    
-   [Accessing Neo4j Data with REST](https://spring.io/guides/gs/accessing-neo4j-data-rest/)
    
-   [Consuming a RESTful Web Service](https://spring.io/guides/gs/consuming-rest/)
    
-   [Consuming a RESTful Web Service with AngularJS](https://spring.io/guides/gs/consuming-rest-angularjs/)
    
-   [Consuming a RESTful Web Service with jQuery](https://spring.io/guides/gs/consuming-rest-jquery/)
    
-   [Consuming a RESTful Web Service with rest.js](https://spring.io/guides/gs/consuming-rest-restjs/)
    
-   [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
    
-   [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)
    
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    
-   [Creating API Documentation with Restdocs](https://spring.io/guides/gs/testing-restdocs/)
    
-   [Enabling Cross Origin Requests for a RESTful Web Service](https://spring.io/guides/gs/rest-service-cors/)
    
-   [Building a Hypermedia-Driven RESTful Web Service](https://spring.io/guides/gs/rest-hateoas/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-accessing-gemfire-data-rest)