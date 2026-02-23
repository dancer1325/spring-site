---
title: Spring GraphQL 1.0.0-M3 Released
source: https://spring.io/blog/2021/10/28/spring-graphql-1-0-0-m3-released
scraped: 2026-02-23T13:01:03.521Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  October 28, 2021 | 0 Comments
---

# Spring GraphQL 1.0.0-M3 Released

_Releases | Brian Clozel |  October 28, 2021 | 0 Comments_

The Spring GraphQL team is pleased to announce a 3rd milestone towards a 1.0.0 release, driven with great help from the community .

## [](#batch-mapping)Batch Mapping

The [2nd milestone](https://spring.io/blog/2021/09/01/spring-graphql-1-0-0-m2-available-now) introduced an annotation programming model for GraphQL data controllers with `@SchemaMapping` methods. The 3rd milestone adds a new `@BatchMapping` method.

If you're familiar with GraphQL, you know that navigating an object graph can cause the "N+1 queries problem" if we're not mapping carefully object relations. We could already leverage the [Batching feature](https://www.graphql-java.com/documentation/v16/batching/) from GraphQL Java to solve that problem, but this release introduces [dedicated support](https://docs.spring.io/spring-graphql/docs/1.0.0-M3/reference/html/#execution-batching) as well as an [`@BatchMapping` annotation](https://docs.spring.io/spring-graphql/docs/1.0.0-M3/reference/html/#controllers-batch-mapping) for a smoother experience:

```java
Copy@Controller
public class BookController {

    @BatchMapping
    public Mono<Map<Book, Author>> author(List<Book> books) {
        // ...
    }
}
```

With that example, we're using a GraphQL engine mechanism to efficiently load many `Book->Author` relations with a single call.

## [](#improved-querydsl-support)Improved Querydsl Support

The [QuerydslDataFetcher support](https://docs.spring.io/spring-graphql/docs/1.0.0-M3/reference/html/#data-querydsl) now checks the selected fields for a query and fetches only the corresponding properties of the underlying domain entity.

## [](#typeresolvers)TypeResolver's

There is now [built-in support](https://docs.spring.io/spring-graphql/docs/1.0.0-M3/reference/html/#execution-graphqlsource-default-type-resolver) for TypeResolver's for GraphQL Unions and Interfaces. By default, it tries to match the simple name of a Java class to a GraphQL Object type, and it tries the same for super types in the hierarchy of the class.

There are further options to customize this behavior to provide sufficient hints to match concrete Java classes to GraphQL Object types. Please, try this and let us know how well it works or if you need further flexibility around this feature.

## [](#databinder-for-input-arguments)DataBinder for Input Arguments

GraphQL Java parses input arguments to generic Maps of data. Spring GraphQL now uses the Spring Framework `DataBinder` mechanism to turn those Maps into the typed objects declared on an `@Argument` controller method parameter. You can hook in the `ConversionService` to use in the `DataBinder` to convert individual input fields when needed.

## [](#websocketinterceptor)WebSocketInterceptor

There is now a `WebSocketInterceptor` sub-type of `WebInterceptor` which can also handle the `CONNECTION_INIT` and the `COMPLETE` messages on a WebSocket connection, including access to the `CONNECTION_INIT` payload along with the ability to reject the connection. Please, give this feature a try and let us know if there is anything further needed.

## [](#cors-configuration)CORS Configuration

The Spring GraphQL Boot starter provides `spring.graphql.cors.*` properties to configure CORS for the exposed GraphQL endpoints.

## [](#query-files-for-graphqltester)Query Files for GraphQlTester

This release builds on the `GraphQlTester` API and the testing auto-configuration to help you test your Spring GraphQL application.

`GraphQlTester` now supports use of `*.graphql` [query files](https://docs.spring.io/spring-graphql/docs/1.0.0-M3/reference/html/#testing-queries) in tests as an alternative to writing queries, inline in the Java test classes. Given a `projectReleases.graphql` file in your test resources:

```graphql
Copyquery projectReleases($slug: ID!) {
    project(slug: $slug) {
        releases {
            version
        }
    }
}
```

You can now refer to this query file in your test:

```java
CopygraphQlTester.queryName("projectReleases") 
        .variable("slug", "spring-framework") 
        .execute()
        .path("project.releases[*].version")
        .entityList(String.class)
        .hasSizeGreaterThan(1);
```

The "JS GraphQL" plugin for IntelliJ supports GraphQL query files with code completion.

## [](#sliced-tests-support-with-graphqltest)"Sliced tests" support with @GraphQlTest

Last but not least, we're now providing a new `@GraphQlTest` testing facility, quite similar to the `@WebMvcTest` and `@JsonTest` Spring Boot annotations. With this, you can write integration tests that [rely on particular slice of your application](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing.spring-boot-applications.autoconfigured-tests). No need to load the entire application context, only the relevant parts are considered, which makes it easy to mock and test without involving too much infrastructure.

In this example, we're testing our `BookController` to make sure that it's properly implemented - no need to set up complex data fixtures as we can mock the repository.

```java
Copy@GraphQlTest(controllers = BookController.class)
public class BookControllerTests {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockBean
    private BookRepository bookRepository;

    @Test
    void bookdByIdShouldReturnSpringBook() {
        given(this.bookRepository.findById(42L)).willReturn(new Book(42L, "Spring GraphQL"));
        String query = """
			{
			  bookById(id: "42"){
			    id
			    name
			  }
			}
			""";
        this.graphQlTester.query(query).execute()
                .path("data.bookById.name").entity(String.class).isEqualTo("Spring GraphQL");
    }

}
```

More [improvements and fixes made their way into their release](https://github.com/spring-projects/spring-graphql/milestone/4?closed=1) and they're available right now in the new Spring GraphQL 1.0.0-M3 from the Spring Milestone repository.

### [](#how-can-you-help)How can you help?

If you're interested in helping out, you can [get started with Spring GraphQL](https://docs.spring.io/spring-graphql/docs/1.0.0-M3/reference/html/#boot-graphql) and [raise issues on our GitHub project](https://github.com/spring-projects/spring-graphql/issues). If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/docs/1.0.0-M3/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)