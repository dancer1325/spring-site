---
title: Getting Started | Accessing MongoDB Data with REST
source: https://spring.io/guides/gs/accessing-mongodb-data-rest
scraped: 2026-02-19T08:02:28.702Z
description: Learn how to work with RESTful, hypermedia-based data persistence using Spring Data REST.
---

# Accessing MongoDB Data with REST

This guide walks you through the process of creating an application that accesses document-based data through a [hypermedia-based](/guides/gs/rest-hateoas) RESTful front end.

## What You Will Build

You will build a Spring application that lets you create and retrieve `Person` objects stored in a [MongoDB](https://www.mongodb.org/) NoSQL database by using Spring Data REST. Spring Data REST takes the features of [Spring HATEOAS](https://projects.spring.io/spring-hateoas) and [Spring Data MongoDB](https://projects.spring.io/spring-data-mongodb) and automatically combines them together.

Spring Data REST also supports [Spring Data JPA](/guides/gs/accessing-data-rest) and [Spring Data Neo4j](/guides/gs/accessing-neo4j-data-rest) as backend data stores, but those are not part of this guide.

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

-   [Download](https://github.com/spring-guides/gs-accessing-mongodb-data-rest/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-accessing-mongodb-data-rest.git](https://github.com/spring-guides/gs-accessing-mongodb-data-rest.git)`
    
-   cd into `gs-accessing-mongodb-data-rest/initial`
    
-   Jump ahead to [Install and launch MongoDB](#initial).
    

**When you finish**, you can check your results against the code in `gs-accessing-mongodb-data-rest/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=maven-project&groupId=com.example&artifactId=accessing-mongodb-data-rest&name=accessing-mongodb-data-rest&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.accessingdatarest&dependencies=data-rest,data-mongodb) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Rest Repositories** and **Spring Data MongoDB**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from Github and open it in your IDE or another editor.

## Install and launch MongoDB

For this guide to work, you must stand up a local MongoDB server.

On a Mac OS X machine with Homebrew installed, run the following commands:

brew tap mongodb/brew
brew install mongodb-community

You can find more installation options at [https://docs.mongodb.org/manual/installation/](https://docs.mongodb.org/manual/installation/).

After installing MongoDB, you need to launch the service. On a Mac, you can use the following command:

$ brew services start mongodb-community

You can start the MongoDB client from another terminal window by running the `mongosh` command.

## Create a Domain Object

Create a new domain object to present a person, as the following example (in `src/main/java/com/example/accessingmongodbdatarest/Person.java`) shows:

```
Copypackage com.example.accessingmongodbdatarest;

import org.springframework.data.annotation.Id;

public class Person {

  @Id private String id;

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

The `Person` object has a first name and a last name. (There is also an ID object, which is configured to be automatically generated, so need not deal with it.)

## Create a Person Repository

Next, you need to create a simple repository, as the following listing (in `src/main/java/com/example/accessingmongodbdatarest/PersonRepository.java`) shows:

```
Copypackage com.example.accessingmongodbdatarest;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface PersonRepository extends MongoRepository<Person, String> {

  List<Person> findByLastName(@Param("name") String name);

}
```

This repository is an interface and lets you perform various operations that involve `Person` objects. It gets these operations by extending `MongoRepository`, which in turn extends the [`PagingAndSortingRepository`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/PagingAndSortingRepository.html) interface defined in Spring Data Commons.

At runtime, Spring Data REST automatically creates an implementation of this interface. Then it uses the [@RepositoryRestResource](https://docs.spring.io/spring-data/rest/docs/current/api/org/springframework/data/rest/core/annotation/RepositoryRestResource.html) annotation to direct Spring MVC to create RESTful endpoints at `/people`.

`@RepositoryRestResource` is not required for a repository to be exported. It is used only to change the export details, such as using `/people` instead of the default value of `/persons`.

Here you have also defined a custom query to retrieve a list of `Person` objects based on the `lastName` value. You can see how to invoke it further down in this guide.

By default, Spring Boot tries to connect to a locally hosted instance of MongoDB. Read the [reference docs](https://docs.spring.io/spring-boot/reference/data/nosql.html#data.nosql.mongodb) for how to point your application to an instance of MongoDB that is hosted elsewhere.

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-accessing-mongodb-data-rest-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-accessing-mongodb-data-rest-0.0.1-SNAPSHOT.jar

Logging output is displayed. The service should be up and running within a few seconds.

## Test the Application

Now that the application is running, you can test it. You can use any REST client you wish. The following examples use the \*nix tool `curl`.

First you want to see the top level service, as the following example shows:

```
Copy$ curl http://localhost:8080
{
  "_links" : {
    "people" : {
      "href" : "http://localhost:8080/people{?page,size,sort*}",
      "templated" : true
    },
    "profile" : {
      "href" : "http://localhost:8080/profile"
    }
  }
}
```

The preceding example provides a first glimpse of what this server has to offer. There is a `people` link located at [http://localhost:8080/people](http://localhost:8080/people). It has some options, such as `?page`, `?size`, and `?sort`.

Spring Data REST uses the [HAL format](http://stateless.co/hal_specification.html) for JSON output. It is flexible and offers a convenient way to supply links adjacent to the data that is served.

When you use the people link, you see the `Person` records in the database (none at present):

```
Copy$ curl http://localhost:8080/people
{
  "_embedded" : {
    "people" : [ ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people?page=0&size=20"
    },
    "profile" : {
      "href" : "http://localhost:8080/profile/people"
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

There are currently no elements and, hence, no pages. It is time to create a new `Person`!

If you run this guide multiple times, there may be leftover data. Refer to the [MongoDB Shell quick reference](https://www.mongodb.com/docs/mongodb-shell/) for commands to find and drop your database if you need a fresh start.

The following command creates a person named “Frodo Baggins”:

```
Copy$ curl -i -X POST -H "Content-Type:application/json" -d "{  \"firstName\" : \"Frodo\",  \"lastName\" : \"Baggins\" }" http://localhost:8080/people
HTTP/1.1 201
Location: http://localhost:8080/people/53149b8e3004990b1af9f229
Content-Type: application/hal+json
Transfer-Encoding: chunked
Date: Tue, 10 Feb 2026 14:00:01 GMT
```

-   `-i`: Ensures you can see the response message including the headers. The URI of the newly created `Person` is shown.
    
-   `-X POST`: Signals this a `POST` used to create a new entry.
    
-   `-H "Content-Type:application/json"`: Sets the content type so the application knows the payload contains a JSON object.
    
-   `-d '{ "firstName" : "Frodo", "lastName" : "Baggins" }'`: Is the data being sent.
    

Notice how the previous `POST` operation includes a `Location` response header. This contains the URI of the newly created resource. Spring Data REST also has two methods (`RepositoryRestConfiguration.setReturnBodyOnCreate(…)` and `setReturnBodyOnUpdate(…)`) that you can use to configure the framework to immediately return the representation of the resource just created/updated.

From this you can query for all people, as the following example shows:

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
    "persons" : [ {
      "firstName" : "Frodo",
      "lastName" : "Baggins",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/people/53149b8e3004990b1af9f229"
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

The `persons` object contains a list with Frodo. Notice how it includes a `self` link. Spring Data REST also uses the [Evo Inflector](https://www.atteo.org/2011/12/12/Evo-Inflector.html) to pluralize the names of entities for groupings.

You can directly query for the individual record, adapting the identifier to the one that was created for you:

```
Copy$ curl http://localhost:8080/people/53149b8e3004990b1af9f229
{
  "firstName" : "Frodo",
  "lastName" : "Baggins",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/53149b8e3004990b1af9f229"
    }
  }
}
```

This might appear to be purely web-based, but, behind the scenes, it is talking to the MongoDB database you started.

In this guide, there is only one domain object. With a more complex system, where domain objects are related to each other, Spring Data REST renders additional links to help navigate to connected records.

Find all the custom queries, as the following example shows:

```
Copy$ curl http://localhost:8080/people/search
{
  "_links" : {
    "findByLastName" : {
      "href" : "http://localhost:8080/people/search/findByLastName{?name}",
      "templated" : true
    },
    "self" : {
      "href" : "http://localhost:8080/people/search"
    }
  }
}
```

You can see the URL for the query, including the HTTP query parameter, `name`. This matches the `@Param("name")` annotation embedded in the interface.

To use the `findByLastName` query, run the following command:

```
Copy$ curl http://localhost:8080/people/search/findByLastName?name=Baggins
{
  "_embedded" : {
    "people" : [ {
      "firstName" : "Frodo",
      "lastName" : "Baggins",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/people/53149b8e3004990b1af9f229"
        },
        "person" : {
          "href" : "http://localhost:8080/people/53149b8e3004990b1af9f229"
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

Because you defined it to return `List<Person>` in the code, it returns all of the results. If you had defined it to return only `Person`, it picks one of the `Person` objects to return. Since this can be unpredictable, you probably do not want to do that for queries that can return multiple entries.

You can also issue `PUT`, `PATCH`, and `DELETE` REST calls to replace, update, or delete existing records, respectively. The following example uses a `PUT` call:

```
Copy$ curl -X PUT -H "Content-Type:application/json" -d "{ \"firstName\": \"Bilbo\", \"lastName\": \"Baggins\" }" http://localhost:8080/people/53149b8e3004990b1af9f229
$ curl http://localhost:8080/people/53149b8e3004990b1af9f229
{
  "firstName" : "Bilbo",
  "lastName" : "Baggins",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/53149b8e3004990b1af9f229"
    }
  }
}
```

The following example uses a `PATCH` call:

```
Copy$ curl -X PATCH -H "Content-Type:application/json" -d "{ \"firstName\": \"Bilbo Jr.\" }" http://localhost:8080/people/53149b8e3004990b1af9f229
$ curl http://localhost:8080/people/53149b8e3004990b1af9f229
{
  "firstName" : "Bilbo Jr.",
  "lastName" : "Baggins",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/53149b8e3004990b1af9f229"
    }
  }
}
```

`PUT` replaces an entire record. Fields not supplied will be replaced with `null`. You can use `PATCH` to update a subset of items.

You can also delete records, as the following example shows:

```
Copy$ curl -X DELETE http://localhost:8080/people/53149b8e3004990b1af9f229
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

A convenient aspect of this [hypermedia-driven interface](/understanding/HATEOAS) is how you can discover all the RESTful endpoints by using curl (or whatever REST client you like). There is no need to exchange a formal contract or interface document with your customers.

## Summary

Congratulations! You have just developed an application with a [hypermedia-based](/guides/gs/rest-hateoas) REST front end and a MongoDB-based back end.

## See Also

The following guides may also be helpful:

-   [Accessing JPA Data with REST](https://spring.io/guides/gs/accessing-data-rest/)
    
-   [Accessing Gemfire Data with REST](https://spring.io/guides/gs/accessing-gemfire-data-rest/)
    
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

[Go To Repo](https://github.com/spring-guides/gs-accessing-mongodb-data-rest)