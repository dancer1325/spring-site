---
title: Spring GraphQL 1.0.0-M4 Released
source: https://spring.io/blog/2021/12/14/spring-graphql-1-0-0-m4-released
scraped: 2026-02-23T12:55:20.215Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  December 14, 2021 | 3 Comments
---

# Spring GraphQL 1.0.0-M4 Released

_Releases | Brian Clozel |  December 14, 2021 | 3 Comments_

The Spring GraphQL team has just released the 4th milestone towards a 1.0.0 release. Thanks to all contributors!

In this milestone, we have further improved the annotation programming model and extended the Spring Data support that were provided [in the previous milestones](https://spring.io/blog/2021/10/28/spring-graphql-1-0-0-m3-released).

## [](#interface-projections-for-graphql-arguments)Interface Projections for GraphQL Arguments

If you're familiar with Spring Data's [Interface-based Projections](https://docs.spring.io/spring-data/commons/docs/current/reference/html/#projections.interfaces), then this new feature will make perfect sense: you can use a well-defined interface to work with GraphQL arguments, without the need for any Object implementation.

For example:

```java
Copy@Controller
public class BookController {

    @MutationMapping
    public Book addBook(@Argument BookInputProjection bookInput) {
        // ...
    }
}

@ProjectedPayload
interface BookInputProjection {

    String getName();  // this maps to "name" argument

    @Value("#{target.author + ' ' + target.name})
    String getAuthorAndName();
}
```

You can learn more about this in the [@ProjectedPayload Interface](https://docs.spring.io/spring-graphql/docs/1.0.0-M4/reference/html/#controllers-schema-mapping-projectedpayload-argument) section of the documentation.

## [](#query-by-example-support)Query By Example Support

Spring GraphQL now supports use of the Query by Example, Spring Data, extension for data fetching. To use this extension, you don't need to write queries through store-specific query languages, but simply provide an example of a domain object with populated fields. The repository implementation will do the rest!

The `QueryByExampleDataFetcher` makes it easy to create a `DataFetcher` that binds GraphQL arguments onto an example object and then uses that to query for the data. There is also a feature for automated discovery of Query By Example repositories, based on the `@GraphQlRepository` annotation, and mapping to top-level GraphQL queries.

If your data store of choice supports it, this adds another way to leverage your Spring Data repositories in a Spring GraphQL application. See [the documentation](https://docs.spring.io/spring-graphql/docs/1.0.0-M4/reference/html/#data-querybyexample) for more details.

## [](#standard-bean-validation-for-graphql-arguments)Standard Bean Validation for GraphQL Arguments

On top of the existing constraints enforced at the schema level, you can now use Standard Bean Validation to validate GraphQL arguments that are declared as controller method parameters. If the argument doesn't match the defined constraints, a validation exception is thrown and written to the relevant "errors" section of the GraphQL response.

```java
Copy@Controller
public class BookController {

    @MutationMapping
    public Book addBook(@Argument @Valid BookInput bookInput) {
        // ...
    }
}

public class BookInput {

    @NotNull
    private String title;

    @NotNull
    @Size(max=13)
    private String isbn;
}
```

This is similar to the existing support in Spring MVC or Spring WebFlux, you can [learn more about `@Argument` validation](https://docs.spring.io/spring-graphql/docs/1.0.0-M4/reference/html/#controllers-schema-mapping-validation) in the reference docs.

### [](#context-access)Context Access

A new `@ContextValue` annotation provides convenient access to values in the `GraphQLContext` from controller methods.

Controller methods can access the authenticated user by declaring a method argument of type `javax.security.Principal`.

`@BatchMapping` methods can access the same `GraphQLContext` that is also available for `@SchemaMapping` methods and to any `DataFetcher`.

### [](#more)More

More [improvements and fixes made their way into their release](https://github.com/spring-projects/spring-graphql/milestone/5?closed=1) and they're available right now in the new Spring GraphQL 1.0.0-M4 release from the Spring Milestone repository.

### [](#how-can-you-help)How can you help?

If you're interested in helping out, you can [get started with Spring GraphQL](https://docs.spring.io/spring-graphql/docs/1.0.0-M4/reference/html/#boot-graphql) and [raise issues on our GitHub project](https://github.com/spring-projects/spring-graphql/issues). If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/docs/1.0.0-M4/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)