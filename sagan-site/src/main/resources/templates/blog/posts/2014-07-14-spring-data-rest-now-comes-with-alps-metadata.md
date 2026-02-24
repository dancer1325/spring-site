---
title: Spring Data REST now comes with ALPS metadata
source: https://spring.io/blog/2014/07/14/spring-data-rest-now-comes-with-alps-metadata
scraped: 2026-02-23T22:20:59.257Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  July 14, 2014 | 18 Comments
---

# Spring Data REST now comes with ALPS metadata

_Engineering | Greg L. Turnquist |  July 14, 2014 | 18 Comments_

With the recent release of [Spring Data's Evans M1 milestone](http://spring.io/blog/2014/07/10/first-milestone-of-spring-data-release-train-evans-available), Spring Data REST now comes with support for [ALPS metadata](http://alps.io) to describe the semantics of the resources exported.

[ALPS](http://alps.io/spec/index.html) is a data format for defining simple descriptions of application-level semantics, similar in complexity to HTML micro-formats. It also supports adding its metadata to existing media types. As of version 2.2 M1, Spring Data REST exposes JSON based ALPS resources that can help us navigate its resources. Let's see how!

We can start with a quick example. If you clone the [TODO repo](https://github.com/gregturn/todo) and run `mvn spring-boot:run`, you can navigate it to learn its values pretty easily.

```sh
Copy$ curl -i localhost:8080
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
X-Application-Context: application
Content-Type: application/hal+json
Transfer-Encoding: chunked
Date: Thu, 17 Jul 2014 13:36:48 GMT
{ "_links" : {
    "todos" : {
      "href" : "http://localhost:8080/todos"
    },
    "profile" : {
      "href" : "http://localhost:8080/alps"
    }
  }
}
```

At the root document are two links: `todos` and `profile`. The client might not know what `todos` means, but the content contained inside [profile](http://alps.io/spec/index.html#rfc.section.3.1) is well defined. It basically points to a resource that describes the semantics of the resources on top of what the actual media type ([HAL](http://tools.ietf.org/html/draft-kelly-json-hal) in this case) defines. Why don't we check it out?

```sh
Copy$ curl -i localhost:8080/alps
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
X-Application-Context: application
Content-Type: application/alps+json
Transfer-Encoding: chunked
Date: Thu, 17 Jul 2014 13:54:56 GMT

{ "version" : "1.0",
  "descriptors" : [ {
    "href" : "http://localhost:8080/alps/todos",
    "name" : "todos"
  } ]
}
```

Here we have an `application/alps+json` document. According to this, it has information about `todos`, which maps 1-on-1 with the `todos` we saw earlier. So let's navigate to it's href.

```sh
Copy$ curl localhost:8080/alps/todos
{ "version" : "1.0",
  "descriptors" : [ {
    "id" : "todo-representation",
    "descriptors" : [ {
      "name" : "description",
      "doc" : {
        "value" : "Details about the TODO item",
        "format" : "TEXT"
      },
      "type" : "SEMANTIC"
    }, {
      "name" : "title",
      "doc" : {
        "value" : "Title for the TODO item",
        "format" : "TEXT"
      },
      "type" : "SEMANTIC"
    }, {
      "name" : "id",
      "type" : "SEMANTIC"
    }, {
      "name" : "completed",
      "doc" : {
        "value" : "Is it completed?",
        "format" : "TEXT"
      },
      "type" : "SEMANTIC"
    } ]
  }, {
    "id" : "get-todos",
    "name" : "todos",
    "type" : "SAFE",
    "rt" : "#todo-representation"
  }, {
    "id" : "create-todos",
    "name" : "todos",
    "type" : "UNSAFE",
    "rt" : "#todo-representation"
  }, {
    "id" : "delete-todo",
    "name" : "todo",
    "type" : "IDEMPOTENT",
    "rt" : "#todo-representation"
  }, {
    "id" : "update-todo",
    "name" : "todo",
    "type" : "IDEMPOTENT",
    "rt" : "#todo-representation"
  }, {
    "id" : "patch-todo",
    "name" : "todo",
    "type" : "UNSAFE",
    "rt" : "#todo-representation"
  }, {
    "id" : "get-todo",
    "name" : "todo",
    "type" : "SAFE",
    "rt" : "#todo-representation"
  } ]
}
```

The document contains a top level descriptor, `todo-representation`. This descriptor is a collection of descriptors, one for each attribute of the domain object. Each domain element provides us with its name and extra documentation information. We supplied it a text value using `@Description` annotations inside the POJO, but this data can also be supplied by a resource bundle.

Further down in the ALPS document are all the RESTful transitions supported by this TODO resource: get, create, delete, update, and patch. Now we're getting somewhere!

Let's look at `get-todos` and see what we can figure out:

```javascript
Copy{ "id" : "get-todos",
  "name" : "todos",
  "type" : "SAFE",
  "rt" : "#todo-representation"
}
```

This operation describes a GET. It names `todos` as the rel it is about (which we saw at the beginning of this article). It is SAFE indicating it won't alter the state of the system. If means that if we execute a GET against `todos`, we can expect the response to contain results in the form of the `todo-representation` descriptor seen at the top.

-   Create and patch are unsafe because they alter the state of the system.
-   Delete and update are idempotent meaning we can perform the same operation multiple times and expect the same result.

The name of each operation also tells us where to perform the operation. `todos` indicates RESTful ops that should be executed against the collection resource, while `todo` is for use on an item resource.

With this information, we can see how to interact with `todos`. We'll start by creating a new TODO. Looking at `create-todos`:

```javascript
Copy{ "id" : "create-todos",
  "name" : "todos",
  "type" : "UNSAFE",
  "rt" : "#todo-representation"
}
```

It tells us to look for `todos`. So grabbing the URI shown at the top and combining it with POST, the REST verb for create, we can write this:

```sh
Copy$ curl -i -X POST -H "Content-Type:application/json" -d '
{ "title":"Create blog entry",
  "description": "Write blog post about SDRs ALPS metadata support",
  "completed": "false"
}' localhost:8080/todos
HTTP/1.1 201 Created
Server: Apache-Coyote/1.1
X-Application-Context: application
Location: http://localhost:8080/todos/1
Content-Length: 0
Date: Mon, 14 Jul 2014 20:23:12 GMT
```

In the response headers, we can the new location: [http://localhost:8080/todos/1](http://localhost:8080/todos/1).

The ALPS metadata also lists `get-todo` as another operation, which will return a `todo-representation`. So let's try it:

```sh
Copy$ curl localhost:8080/todos/1
{ "title" : "Create blog entry",
  "description" : "Write blog post about SDRs ALPS metadata support",
  "completed" : false,
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/todos/1"
    }
  }
}
```

Using the ALPS metadata, we were able to create a new TODO and then look it up.

We were able to learn what operations were available and what elements are managed by it. And we didn't have to know the URI structure either. The metadata told us where to look to conduct these RESTful transitions. This means the server can change URIs and it won't impact our ability to interact with the service.

If you're interested in seeing more of Spring Data REST in action, be sure to sign up for [Data Meets Hypermedia](http://2014.event.springone2gx.com/schedule/sessions/spring_data_rest_-_data_meets_hypermedia.html) at this year's [SpringOne conference](http://www.springone2gx.com). Spring Mobile/Android project lead [Roy Clarkson](http://spring.io/team/rclarkson) will join me as we use Spring Data REST to create Spring-a-Gram, a tool for snapping pics from your mobile device and sharing over the interwebs.