---
title: SpEL support in Spring Data JPA @Query definitions
source: http://spring.io/blog/2014/07/15/spel-support-in-spring-data-jpa-query-definitions
scraped: 2026-02-23T22:20:24.471Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Thomas Darimont |  July 15, 2014 | 21 Comments
---

# SpEL support in Spring Data JPA @Query definitions

_Engineering | Thomas Darimont |  July 15, 2014 | 21 Comments_

Spring Data JPA allows manually defining the query to be executed by a repository method using the `@Query` annotation. Unfortunately parameter binding in JPQL is quite limited only allowing you to set a value and providing some type conversion. The latest [Spring Data JPA M1](https://spring.io/blog/2014/07/10/first-milestone-of-spring-data-release-train-evans-available) release of the Evans release train eases this pain by adding support for using SpEL expressions to use dynamically bound parameters within statements in `@Query` annotations which provides additional flexibility when defining queries manually. In this blog post, I am going to introduce you to the capabilities of this feature.

## [](#method-parameter-expressions)Method parameter expressions

SpEL support provides access to the query method arguments. This allows you to either simply bind the parameter as is or perform additional operations before binding.

```java
Copy@Query("select u from User u where u.age = ?#{[0]}")
List<User> findUsersByAge(int age);

@Query("select u from User u where u.firstname = :#{#customer.firstname}")
List<User> findUsersByCustomersFirstname(@Param("customer") Customer customer);
```

Parameters are exposed for indexed access (`[0]` in the first method) or via the name declared using `@Param`. The actual SpEL expression binding is either triggered by `?#` or `:#`. We support both types to allow you to be consistent to standard JPQL parameter bindings that also might occur in the query definition. Parameters of special types like `Sort` and \`\`\`Pageable\`\` are exposed with their simple class names as variables.

## [](#advanced-spel-expressions)Advanced SpEL expressions

While advanced parameter binding is a very useful feature, the real power of SpEL stems from the fact, that the expressions can refer to framework abstractions or other application components. A very common scenario for SpEL is the definition of security constraints. So it would be cool if we could restrict a query to only return results related to the currently authenticated user:

```java
Copy@Query("select u from User u where u.emailAddress = ?#{principal.emailAddress}")
List<User> findCurrentUserWithCustomQuery();
```

As you can see we refer to a property of Spring Security's `principal`. So how does the Spring Data SpEL support integrate with Spring Security.

## [](#spel-evaluationcontext-extension-model)SpEL EvaluationContext extension model

Spring Data exposes an extension point `EvaluationContextExtension`. The interface allows implementors to customize the `EvaluationContext` in a very detailed way but for convenience, we provide a `EvaluationContextExtensionSupport` base class to conveniently let you only implement the parts you're interested in:

```java
Copyclass SecurityEvaluationContextExtension extends EvaluationContextExtensionSupport {

  @Override
  public String getExtensionId() {
    return "security";
  }

  @Override
  public SecurityExpressionRoot getRootObject() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return new SecurityExpressionRoot(authentication) {};
  }
}
```

For our Spring Security extension we extend `EvaluationContextExtensionSupport` and override the `getRootObject()` method and return a new `SecurityExpressionRoot` instance which exposes all the security properties and expressions you already know from usage in `@PreAuthorize`. This step also makes them available in SpEL expressions in our `@Query` annotation.

The final step we need to take is to register the security extension as a bean:

```java
Copy@Configuration
@EnableJpaRepositories
class SecurityConfiguration {

    @Bean
    EvaluationContextExtension securityExtension() {
        return new SecurityEvaluationContextExtension();
    }
}
```

Spring Data JPA will pick up all beans of type `EvaluationContextExtension` and use those to prepare the `EvaluationContext` to be used to evaluate the SpEL expression defined in `@Query`.

The extension in place will now let you leverage the full power of the Spring Security SpEL functions. Imagine a repository query method that shall return the `BusinessObject`s which the current user is owner of or all `BusinessObject`s if the current user is admin. The query method definition would look like this:

```java
Copyinterface SecureBusinessObjectRepository extends Repository<BusinessObject,Long>{

    @Query("select o from BusinessObject o where o.owner.emailAddress like "+
      "?#{hasRole('ROLE_ADMIN') ? '%' : principal.emailAddress}")
    List<BusinessObject> findBusinessObjectsForCurrentUser();
}
```

You can find the working examples of the snippets seen here in the [Spring-Data-Examples](https://github.com/spring-projects/spring-data-examples/tree/master/jpa/security) repository.

## [](#sophisticated-use-cases)Sophisticated use cases

Often new features enable ways to do things that one thought weren't possible before - an example for this is pagination in native queries. Since this mechanism exposes special parameter types like `Sort`or `Pageable` as well, we're now able to use pagination in native queries. An example for this can be found here [UserRepository](https://github.com/spring-projects/spring-data-jpa/blob/master/src/test/java/org/springframework/data/jpa/repository/sample/UserRepository.java#L526).

## [](#whats-next)Whats next?

Currently we are investigating a more tighter integration of Spring Security into Spring Data. We're also working on adding support for SpEL capabilities for other Spring Data modules.

But now it's your turn - please let us know what you think in the comments below of file a feature request in our [JIRA](https://jira.spring.io).

## [](#springone-2gx-2014)SpringOne 2GX 2014

SpringOne 2GX 2014 is getting close.

If you want to learn more about Spring Data, be sure to [register](https://2014.event.springone2gx.com/register) for this year's SpringOne conference. The [schedule](https://2014.event.springone2gx.com/schedule/2014-09-09) contains a lot of data-related talks to introduce you to the latest features we're going to ship with Evans.