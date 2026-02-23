---
title: Getting Started | Accessing JPA Data with REST
source: https://spring.io/guides/gs/accessing-data-rest
scraped: 2026-02-19T08:01:42.903Z
description: Learn how to work with RESTful, hypermedia-based data persistence using Spring Data REST.
---

# Accessing JPA Data with REST

This guide walks you through the process of creating an application that accesses relational JPA data through a [hypermedia-based](/guides/gs/rest-hateoas) [RESTful](/understanding/REST) front end.

## What You Will Build

You will build a Spring application that lets you create and retrieve `Person` objects stored in a database by using Spring Data REST. Spring Data REST takes the features of [Spring HATEOAS](https://spring.io/projects/spring-hateoas) and [Spring Data JPA](https://spring.io/projects/spring-data-jpa) and automatically combines them.

Spring Data REST also supports [Spring Data Neo4j](/guides/gs/accessing-neo4j-data-rest), [Spring Data Gemfire](/guides/gs/accessing-gemfire-data-rest), and [Spring Data MongoDB](/guides/gs/accessing-mongodb-data-rest) as backend data stores, but those are not part of this guide.

## What You Need

-   About 15 minutes
    
-   A favorite text editor or IDE
    
-   [Java 17](https://www.oracle.com/java/technologies/downloads/) or later
    

## How to Complete This Guide

Like most Spring [Getting Started guides](https://spring.io/guides) you can start from scratch and complete each step, or you can jump straight to the solution, by viewing the code in [this repository](https://github.com/spring-guides/gs-accessing-data-rest).

To **see the end result in your local environment**, you can do one of the following:

-   [Download](https://github.com/spring-guides/gs-accessing-data-rest/archive/main.zip) and unzip the source repository for this guide
    
-   Clone the repository using Git: `git clone [https://github.com/spring-guides/gs-accessing-data-rest.git](https://github.com/spring-guides/gs-accessing-data-rest.git)`
    
-   Fork the repository which lets you request changes to this guide through submission of a pull request
    

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!jvmVersion=17&packaging=jar&groupId=com.example&artifactId=accessing-data-rest&packageName=com.example.accessingdatarest&dependencies=data-rest,data-jpa,h2) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use.
    
3.  Click **Dependencies** and select **Rest Repositories**, **Spring Data JPA**, and **H2 Database**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from GitHub and open it in your IDE or other editor.

## Create a Domain Object

Create a new domain object to present a person, as the following listing shows:

Java

Kotlin

```
Copypackage com.example.accessingdatarest;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Person {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

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

```
Copypackage com.example.accessingdatarest

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
class Person(

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  var id: Long? = null,

  var firstName: String? = null,
  var lastName: String? = null
)
```

The `Person` object has a first name and a last name. (There is also an ID object that is configured to be automatically generated, so you need not deal with that.)

## Create a Person Repository

Next, you need to create a simple repository, as the following listing shows:

Java

Kotlin

```
Copypackage com.example.accessingdatarest;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface PersonRepository extends PagingAndSortingRepository<Person, Long>, CrudRepository<Person,Long> {

  List<Person> findByLastName(@Param("name") String name);

}
```

```
Copypackage com.example.accessingdatarest

import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
interface PersonRepository : PagingAndSortingRepository<Person, Long>, CrudRepository<Person, Long> {

  fun findByLastName(@Param("name") name: String): List<Person>

}
```

This repository is an interface that lets you perform various operations involving `Person` objects. It gets these operations by extending the [`PagingAndSortingRepository`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/PagingAndSortingRepository.html) interface that is defined in Spring Data Commons.

At runtime, Spring Data REST automatically creates an implementation of this interface. Then it uses the [@RepositoryRestResource](https://docs.spring.io/spring-data/rest/docs/current/api/org/springframework/data/rest/core/annotation/RepositoryRestResource.html) annotation to direct Spring MVC to create RESTful endpoints at `/people`.

`@RepositoryRestResource` is not required for a repository to be exported. It is used only to change the export details, such as using `/people` instead of the default value of `/persons`.

Here you have also defined a custom query to retrieve a list of `Person` objects based on the `lastName`. You can see how to invoke it later in this guide.

Spring Boot automatically spins up Spring Data JPA to create a concrete implementation of the `PersonRepository` and configure it to talk to a backend in-memory database by using JPA.

Spring Data REST builds on top of Spring MVC. It creates a collection of Spring MVC controllers, JSON converters, and other beans to provide a RESTful front end. These components link up to the Spring Data JPA backend. When you use Spring Boot, this is all autoconfigured. If you want to investigate how that works, look at the `RepositoryRestMvcConfiguration` in Spring Data REST.

## Running the Application

You can now run the application by executing the main method in `AccessingDataRestApplication`. You can run the program from your IDE or by executing the following Gradle command in the project root directory:

./gradlew bootRun

Alternatively, you could use Maven to run the application using the command:

./mvnw spring-boot:run

## Test the Application

Now that the application is running, you can test it. You can use any REST client you wish. The following examples use the \*nix tool, `curl`.

First, you want to see the top-level service. The following example shows how to do so:

$ curl http://localhost:8080
{
  "\_links" : {
    "people" : {
      "href" : "http://localhost:8080/people{?page,size,sort\*}",
      "templated" : true
    },
    "profile" : {
      "href" : "http://localhost:8080/profile"
    }
  }
}

The preceding example provides a first glimpse of what this server has to offer. There is a `people` link located at `[http://localhost:8080/people](http://localhost:8080/people)`. It has some options, such as `?page`, `?size`, and `?sort`.

Spring Data REST uses the [HAL format](https://stateless.co/hal_specification.html) for JSON output. It is flexible and offers a convenient way to supply links adjacent to the data that is served.

The following example shows how to see the people records (none at present):

$ curl http://localhost:8080/people
{
  "\_embedded" : {
    "people" : \[ \]
  },
  "\_links" : {
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
    "number" : 0,
    "size" : 20,
    "totalElements" : 0,
    "totalPages" : 0
  }
}

There are currently no elements and, hence, no pages. Time to create a new `Person`! The following listing shows how to do so:

$ curl -i -H "Content-Type:application/json" -d '{"firstName": "Frodo", "lastName": "Baggins"}' http://localhost:8080/people
HTTP/1.1 201
Location: http://localhost:8080/people/1
Content-Type: application/vnd.hal+json
Transfer-Encoding: chunked
Date: Wed, 14 Jan 2026 13:40:30 GMT

{
  "\_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/1"
    },
    "person" : {
      "href" : "http://localhost:8080/people/1"
    }
  },
  "firstName" : "Frodo",
  "lastName" : "Baggins"
}

-   `-i`: Ensures you can see the response message including the headers. The URI of the newly created `Person` is shown.
    
-   `-H "Content-Type:application/json"`: Sets the content type so the application knows the payload contains a JSON object.
    
-   `-d '{"firstName": "Frodo", "lastName": "Baggins"}'`: Is the data being sent.
    
-   If you are on Windows, the command above will work on [WSL](https://learn.microsoft.com/en-us/windows/wsl). If you can’t install WSL, you might need to replace the single quotes with double quotes and escape the existing double quotes, i.e. `-d "{\"firstName\": \"Frodo\", \"lastName\": \"Baggins\"}"`.
    

Notice how the response to the `POST` operation includes a `Location` header. This contains the URI of the newly created resource. Spring Data REST also has two methods (`RepositoryRestConfiguration.setReturnBodyOnCreate(…)` and `setReturnBodyOnUpdate(…)`) that you can use to configure the framework to immediately return the representation of the resource just created. `RepositoryRestConfiguration.setReturnBodyForPutAndPost(…)` is a shortcut method to enable representation responses for create and update operations.

You can query for all people, as the following example shows:

$ curl http://localhost:8080/people
{
  "\_embedded" : {
    "people" : \[ {
      "\_links" : {
        "self" : {
          "href" : "http://localhost:8080/people/1"
        },
        "person" : {
          "href" : "http://localhost:8080/people/1"
        }
      },
      "firstName" : "Frodo",
      "lastName" : "Baggins"
    } \]
  },
  "\_links" : {
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
    "number" : 0,
    "size" : 20,
    "totalElements" : 1,
    "totalPages" : 1
  }
}

The `people` object contains a list that includes `Frodo`. Notice how it includes a `self` link. Spring Data REST also uses [Evo Inflector](https://www.atteo.org/2011/12/12/EvoInflector.html) to pluralize the name of the entity for groupings.

You can query directly for the individual record, as follows:

$ curl http://localhost:8080/people/1
{
  "\_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/1"
    },
    "person" : {
      "href" : "http://localhost:8080/people/1"
    }
  },
  "firstName" : "Frodo",
  "lastName" : "Baggins"
}

This might appear to be purely web-based. However, behind the scenes, there is an H2 relational database. In production, you would probably use a real one, such as PostgreSQL.

In this guide, there is only one domain object. With a more complex system, where domain objects are related to each other, Spring Data REST renders additional links to help navigate to connected records.

You can find all the custom queries, as shown in the following example:

$ curl http://localhost:8080/people/search
{
  "\_links" : {
    "findByLastName" : {
      "href" : "http://localhost:8080/people/search/findByLastName{?name}",
      "templated" : true
    },
    "self" : {
      "href" : "http://localhost:8080/people/search"
    }
  }
}

You can see the URL for the query, including the HTTP query parameter, `name`. Note that this matches the `@Param("name")` annotation embedded in the interface.

The following example shows how to use the `findByLastName` query:

$ curl http://localhost:8080/people/search/findByLastName?name=Baggins
{
  "\_embedded" : {
    "people" : \[ {
      "\_links" : {
        "self" : {
          "href" : "http://localhost:8080/people/1"
        },
        "person" : {
          "href" : "http://localhost:8080/people/1"
        }
      },
      "firstName" : "Frodo",
      "lastName" : "Baggins"
    } \]
  },
  "\_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/search/findByLastName?name=Baggins"
    }
  }
}

Because you defined it to return `List<Person>` in the code, it returns all results. If you had defined it to return only `Person`, it picks one of the `Person` objects to return. Since this can be unpredictable, you probably do not want to do that for queries that can return multiple entries.

You can also issue `PUT`, `PATCH`, and `DELETE` REST calls to replace, update, or delete existing records (respectively). The following example uses a `PUT` call:

$ curl -X PUT -H "Content-Type:application/json" -d '{"firstName": "Bilbo", "lastName": "Baggins"}' http://localhost:8080/people/1
{
  "\_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/1"
    },
    "person" : {
      "href" : "http://localhost:8080/people/1"
    }
  },
  "firstName" : "Bilbo",
  "lastName" : "Baggins"
}

The following example uses a `PATCH` call:

$ curl -X PATCH -H "Content-Type:application/json" -d '{"firstName": "Bilbo Jr."}' http://localhost:8080/people/1
{
  "\_links" : {
    "self" : {
      "href" : "http://localhost:8080/people/1"
    },
    "person" : {
      "href" : "http://localhost:8080/people/1"
    }
  },
  "firstName" : "Bilbo Jr.",
  "lastName" : "Baggins"
}

`PUT` replaces an entire record. Fields not supplied are replaced with `null`. You can use `PATCH` to update a subset of items.

You can also delete records, as the following example shows:

$ curl -X DELETE http://localhost:8080/people/1
$ curl http://localhost:8080/people
{
  "\_embedded" : {
    "people" : \[ \]
  },
  "\_links" : {
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
    "number" : 0,
    "size" : 20,
    "totalElements" : 0,
    "totalPages" : 0
  }
}

A convenient aspect of this hypermedia-driven interface is that you can discover all the RESTful endpoints by using curl (or whatever REST client you like). You need not exchange a formal contract or interface document with your customers.

## Summary

Congratulations! You have developed an application with a [hypermedia-based](/guides/gs/rest-hateoas) RESTful front end and a JPA-based back end.

## See Also

The following guides may also be helpful:

-   [Building a Hypermedia-Driven RESTful Web Service](https://spring.io/guides/gs/rest-hateoas/)
    
-   [Accessing GemFire Data with REST](https://spring.io/guides/gs/accessing-gemfire-data-rest/)
    
-   [Accessing MongoDB Data with REST](https://spring.io/guides/gs/accessing-mongodb-data-rest/)
    
-   [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
    
-   [Accessing Neo4j Data with REST](https://spring.io/guides/gs/accessing-neo4j-data-rest/)
    
-   [Consuming a RESTful Web Service](https://spring.io/guides/gs/consuming-rest/)
    
-   [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
    
-   [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
    
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    
-   [Creating API Documentation with Restdocs](https://spring.io/guides/gs/testing-restdocs/)
    
-   [Enabling Cross Origin Requests for a RESTful Web Service](https://spring.io/guides/gs/rest-service-cors/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-accessing-data-rest)