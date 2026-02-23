---
title: Getting Started | Accessing Neo4j Data with REST
source: https://spring.io/guides/gs/accessing-neo4j-data-rest
scraped: 2026-02-19T08:02:06.389Z
description: Learn how to work with RESTful, hypermedia-based data persistence using Spring Data REST.
---

# Accessing Neo4j Data with REST

This guide walks you through the process of creating an application that accesses graph-based data through a [hypermedia-based](/guides/gs/rest-hateoas) RESTful front end.

## What You Will Build

You will build a Spring application that lets you create and retrieve `Person` objects that are stored in a [Neo4j](https://www.neo4j.org/) NoSQL database by using Spring Data REST. Spring Data REST takes the features of [Spring HATEOAS](https://projects.spring.io/spring-hateoas) and [Spring Data Neo4j](https://projects.spring.io/spring-data-neo4j) and automatically combines them together.

Spring Data REST also supports [Spring Data JPA](/guides/gs/accessing-data-rest), [Spring Data Gemfire](/guides/gs/accessing-gemfire-data-rest), and [Spring Data MongoDB](/guides/gs/accessing-mongodb-data-rest) as backend data stores, but this guide deals with Neo4j.

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

To **start from scratch**, move on to [\[scratch\]](#scratch).

To **skip the basics**, do the following:

-   [Download](https://github.com/spring-guides/{project_id}/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/{project_id}.git](https://github.com/spring-guides/{project_id}.git)`
    
-   cd into `{project_id}/initial`
    
-   Jump ahead to [Permissions to Access Neo4j](#initial).
    

**When you finish**, you can check your results against the code in `{project_id}/complete`.

## Standing up a Neo4j Server

Before you can build a this application, you need to set up a Neo4j server.

Neo4j has an open source server that you can install for free.

On a Mac with Homebrew installed, you can type the following in a terminal window:

$ brew install neo4j

For other options, see [https://neo4j.com/download/community-edition/](https://neo4j.com/download/community-edition/)

Once you have installed Neo4j, you can launch it with its default settings by running the following command:

$ neo4j start

You should see a message similar to the following:

Starting Neo4j.
Started neo4j (pid 96416). By default, it is available at http://localhost:7474/
There may be a short delay until the server is ready.
See /usr/local/Cellar/neo4j/3.0.6/libexec/logs/neo4j.log for current status.

By default, Neo4j has a username and password of `neo4j` and `neo4j`. However, it requires that the new account password be changed. To do so, run the following command:

$ curl -v -u neo4j:neo4j POST localhost:7474/user/neo4j/password -H "Content-type:application/json" -d "{\\"password\\":\\"a\_strong\_password\\"}"

This changes the password from `neo4j` to `a_strong_password` (certainly use a real password!) With that completed, you should be ready to run this guide.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.1.0&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=accessing-neo4j-data-rest&name=accessing-neo4j-data-rest&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.accessing-neo4j-data-rest&dependencies=data-rest,data-neo4j) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Rest Repositories** and **Spring Data Neo4j**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from Github and open it in your IDE or other editor.

## Permissions to Access Neo4j

Neo4j Community Edition requires credentials to access it. You can configure the credentials by setting properties in `src/main/resources/application.properties`, as follows:

```
Copyspring.neo4j.uri=bolt://localhost:7687
spring.neo4j.authentication.username=neo4j
spring.neo4j.authentication.password=a_strong_password
```

This includes the default username (`neo4j`) and the newly set password (`a_strong_password`) that you set earlier.

Do NOT store real credentials in your source repository. Instead, configure them in your runtime by using [Spring Boot’s property overrides](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config).

## Create a Domain Object

You need to create a new domain object to present a person, as the following example (in `src/main/java/com/example/accessingneo4jdatarest/Person.java`) shows:

```
Copypackage com.example.accessingneo4jdatarest;

import org.jspecify.annotations.Nullable;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
public class Person {

  @Id
  @GeneratedValue
  private @Nullable Long id;

  private String firstName;
  private String lastName;

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
}
```

The `Person` object has a first name and a last name. There is also an ID object that is configured to be automatically generated so that you need not do so.

## Create a `Person` Repository

Next, you need to create a simple repository, as the following example (in `src/main/java/com/example/accessingneo4jdatarest/PersonRepository.java`) shows:

```
Copypackage com.example.accessingneo4jdatarest;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface PersonRepository extends PagingAndSortingRepository<Person, Long>, CrudRepository<Person, Long> {

  List<Person> findByLastName(@Param("name") String name);

}
```

This repository is an interface and lets you perform various operations that involve `Person` objects. It gets these operations by extending the [`PagingAndSortingRepositry`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/PagingAndSortingRepository.html) interface defined in Spring Data Commons.

At runtime, Spring Data REST automatically creates an implementation of this interface. Then it uses the [`@RepositoryRestResource`](https://docs.spring.io/spring-data/rest/docs/current/api/org/springframework/data/rest/core/annotation/RepositoryRestResource.html) annotation to direct Spring MVC to create RESTful endpoints at `/people`.

`@RepositoryRestResource` is not required for a repository to be exported. It is used only to change the export details, such as using `/people` instead of the default value of `/persons`.

Here you have also defined a custom query to retrieve a list of `Person` objects based on the `lastName` value. You can see how to invoke it later in this guide.

## Finding the Application Class

The Spring Initializr creates an application class when you use it to create a project. You can find that in `src/main/java/com/example/accessingneo4jdatarest/Application.java`. Note that the Spring Initializr concatenates (and properly changes the case of) the package name and adds it to `Application` to create the application case name. In this case, we get `AccessingNeo4jDataRestApplication`, as the following listing shows:

```
Copypackage com.example.accessingneo4jdatarest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@EnableNeo4jRepositories
@SpringBootApplication
public class AccessingNeo4jDataRestApplication {

  public static void main(String[] args) {
    SpringApplication.run(AccessingNeo4jDataRestApplication.class, args);
  }
}
```

You need not make any changes to this application class for this example

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

The `@EnableNeo4jRepositories` annotation activates Spring Data Neo4j. Spring Data Neo4j creates a concrete implementation of the `PersonRepository` and configures it to talk to an embedded Neo4j database by using the Cypher query language.

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/{project\_id}-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/{project\_id}-0.0.1-SNAPSHOT.jar

Logging output is displayed. The service should be up and running within a few seconds.

## Test the Application

Now that the application is running, you can test it. You can use any REST client you wish. The following examples use the \*nix tool called `curl`.

First, you want to see the top level service. The following example (with output) shows how to do so:

```
Copy$ curl http://localhost:8080
{
  "_links" : {
    "people" : {
      "href" : "http://localhost:8080/people{?page,size,sort}",
      "templated" : true
    }
  }
}
```

Here you get a first glimpse of what this server has to offer. There is a `people` link located at [http://localhost:8080/people](http://localhost:8080/people). It has some options such as `?page`, `?size`, and `?sort`.

Spring Data REST uses the [HAL format](http://stateless.co/hal_specification.html) for JSON output. It is flexible and offers a convenient way to supply links adjacent to the data that is served.

```
Copy$ curl http://localhost:8080/people
{
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people{?page,size,sort}",
      "templated" : true
    },
    "search" : {
      "href" : "http://localhost:8080/people/search"
    }
  },
  "page" : {
    "size" : 20,
    "totalElements" : 0,
    "totalPages" : 0,
    "number" : 0
  }
}
```

There are currently no elements and, consequently, no pages, so it is time to create a new `Person`! To do so, run the following command (shown with its output):

```
Copy$ curl -i -X POST -H "Content-Type:application/json" -d '{  "firstName" : "Frodo",  "lastName" : "Baggins" }' http://localhost:8080/people
HTTP/1.1 201 Created
Server: Apache-Coyote/1.1
Location: http://localhost:8080/people/0
Content-Length: 0
Date: Wed, 26 Feb 2014 20:26:55 GMT
```

-   `-i` ensures you can see the response message including the headers. The URI of the newly created `Person` is shown
    
-   `-X POST` signals this a `POST` used to create a new entry
    
-   `-H "Content-Type:application/json"` sets the content type so the application knows the payload contains a JSON object
    
-   `-d '{ "firstName" : "Frodo", "lastName" : "Baggins" }'` is the data being sent
    

Notice how the previous `POST` operation includes a `Location` header. This contains the URI of the newly created resource. Spring Data REST also has two methods (`RepositoryRestConfiguration.setReturnBodyOnCreate(…)` and `setReturnBodyOnCreate(…)`) that you can use to configure the framework to immediately return the representation of the resource that was just created.

From this you can query for all people by running the following command (shown with its output):

```
Copy$ curl http://localhost:8080/people
{
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people{?page,size,sort}",
      "templated" : true
    },
    "search" : {
      "href" : "http://localhost:8080/people/search"
    }
  },
  "_embedded" : {
    "people" : [ {
      "firstName" : "Frodo",
      "lastName" : "Baggins",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/people/0"
        }
      }
    } ]
  },
  "page" : {
    "size" : 20,
    "totalElements" : 1,
    "totalPages" : 1,
    "number" : 0
  }
}
```

The `people` object contains a list with Frodo. Notice how it includes a `self` link. Spring Data REST also uses the [Evo Inflector](https://www.atteo.org/2011/12/12/Evo-Inflector.html) library to pluralize the name of the entity for groupings.

You can query directly for the individual record by running the following command (shown with its output):

```
Copy$ curl http://localhost:8080/people/0
{
  "firstName" : "Frodo",
  "lastName" : "Baggins",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/0"
    }
  }
}
```

This might appear to be purely web based, but, behind the scenes, there is an embedded Neo4j graph database. In production, you would probably connect to a standalone Neo4j server.

In this guide, there is only one domain object. With a more complex system, where domain objects are related to each other, Spring Data REST renders additional links to help navigate to connected records.

You can find all the custom queries by running the following command (shown with its output):

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

You can see the URL for the query, including the HTTP query parameter: `name`. Note that this matches the `@Param("name")` annotation embedded in the interface.

To use the `findByLastName` query, run the following command (shown with its output):

```
Copy$ curl http://localhost:8080/people/search/findByLastName?name=Baggins
{
  "_embedded" : {
    "people" : [ {
      "firstName" : "Frodo",
      "lastName" : "Baggins",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/people/0"
        },
        "person" : {
          "href" : "http://localhost:8080/people/0"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/search/findByLastName?name=Baggins"
    }
  }
}
```

Because you defined it to return `List<Person>` in the code, it returns all of the results. If you had defined it to return only `Person`, it would pick one of the `Person` objects to return. Since this can be unpredictable, you probably do not want to do that for queries that can return multiple entries.

You can also issue `PUT`, `PATCH`, and `DELETE` REST calls to either replace, update, or delete existing records. The following example (shown with its output) shows a `PUT` call:

```
Copy$ curl -X PUT -H "Content-Type:application/json" -d '{ "firstName": "Bilbo", "lastName": "Baggins" }' http://localhost:8080/people/0
$ curl http://localhost:8080/people/0
{
  "firstName" : "Bilbo",
  "lastName" : "Baggins",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/0"
    }
  }
}
```

The following example (shown with its output) shows a `PATCH` call:

```
Copy$ curl -X PATCH -H "Content-Type:application/json" -d '{ "firstName": "Bilbo Jr." }' http://localhost:8080/people/0
$ curl http://localhost:8080/people/0
{
  "firstName" : "Bilbo Jr.",
  "lastName" : "Baggins",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/0"
    }
  }
}
```

`PUT` replaces an entire record. Fields that are not supplied are replaced with `null`. `PATCH` can be used to update a subset of items.

You can also delete records, as the following example (shown with its output) shows:

```
Copy$ curl -X DELETE http://localhost:8080/people/0
$ curl http://localhost:8080/people
{
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people{?page,size,sort}",
      "templated" : true
    },
    "search" : {
      "href" : "http://localhost:8080/people/search"
    }
  },
  "page" : {
    "size" : 20,
    "totalElements" : 0,
    "totalPages" : 0,
    "number" : 0
  }
}
```

A convenient aspect of this hypermedia-driven interface is how you can discover all the RESTful endpoints by using curl (or whatever REST client you like). You need not exchange a formal contract or interface document with your customers.

## Summary

Congratulations! You have just developed an application with a [hypermedia-based](/guides/gs/rest-hateoas) RESTful front end and a Neo4j-based back end.

## See Also

The following guides may also be helpful:

-   [Accessing JPA Data with REST](https://spring.io/guides/gs/accessing-data-rest/)
    
-   [Accessing MongoDB Data with REST](https://spring.io/guides/gs/accessing-mongodb-data-rest/)
    
-   [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
    
-   [Accessing Gemfire Data with REST](https://spring.io/guides/gs/accessing-gemfire-data-rest/)
    
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

[Go To Repo](https://github.com/spring-guides/gs-accessing-neo4j-data-rest)