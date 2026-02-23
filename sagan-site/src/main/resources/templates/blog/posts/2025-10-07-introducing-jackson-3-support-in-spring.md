---
title: Introducing Jackson 3 support in Spring
source: https://spring.io/blog/2025/10/07/introducing-jackson-3-support-in-spring
scraped: 2026-02-23T07:27:33.850Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  October 07, 2025 | 3 Comments
---

# Introducing Jackson 3 support in Spring

_Engineering | Sébastien Deleuze |  October 07, 2025 | 3 Comments_

This is a new blog post in the [Road to GA series](https://spring.io/blog/2025/09/02/road_to_ga_introduction), this time sharing more details on the new Jackson 3 support, just a few days after [Jackson 3.0.0 GA release](https://cowtowncoder.medium.com/jackson-3-0-0-ga-released-1f669cda529a), about to be introduced in Spring Boot 4 and related Spring portfolio projects.

Jackson is by far the most used JSON library on the JVM, and the introduction of the Jackson 3 support in Spring is the opportunity for us to provide additional enhancements, as a follow-up of the popular [Jackson integration improvements in Spring](https://spring.io/blog/2014/12/02/latest-jackson-integration-improvements-in-spring) that I announced more than 10 years ago!

## [](#close-collaboration-between-spring-and-jackson-teams)Close collaboration between Spring and Jackson teams

When the Spring team works on leveraging new versions of popular open source libraries, while it may not be obvious, a significant part of the work is sometimes collaborating with the maintainers on refinements that will benefit the wider community.

Jackson 3 is a great illustration of that and I would like to thank Tatu Saloranta (the Jackson project lead) for his willingness to take our feedback into account during the release candidate phase - which has allowed the following refinements:

-   [Allow using Jackson 2 and Jackson 3 side by side](https://github.com/FasterXML/jackson-future-ideas/discussions/90)
-   [JDK 17 baseline](https://github.com/FasterXML/jackson-future-ideas/discussions/73#discussioncomment-11434464)
-   [Align Jackson and Spring defaults about JSON views](https://github.com/FasterXML/jackson-databind/issues/1484)
-   [Non-blocking parser enhancements](https://github.com/FasterXML/jackson-databind/issues/5111)
-   [Refine the null-safety handling in the JsonNode API](https://github.com/FasterXML/jackson-databind/issues/5283)
-   [Revert an unpopular change on `JsonWriteFeature.ESCAPE_FORWARD_SLASHES` default value](https://github.com/FasterXML/jackson-future-ideas/discussions/92#discussioncomment-14073094)
-   [Fix an increased need for `@JsonCreator`](https://github.com/FasterXML/jackson-databind/issues/5246)
-   [Jackson 3 migration guide](https://github.com/FasterXML/jackson/blob/main/jackson3/MIGRATING_TO_JACKSON_3.md)

## [](#status-of-the-jackson-support-as-of-spring-boot-40)Status of the Jackson support as of Spring Boot 4.0

The general principle is that, as of Spring Boot 4.0 and Spring Framework 7.0, the Spring portfolio is:

-   Introducing Jackson 3 support
-   Deprecating the Jackson 2 support for eventual removal
-   Switching the default Jackson version (classpath detection, dependencies) to Jackson 3

Main exception to this is Spring AI which intends to introduce Jackson 3 support in its 2.0 release in the first half of 2026.

More specifically, Spring Boot 4.0 is:

-   Providing dependency management for both Jackson 2 and 3
-   Performing auto-configuration for Jackson 3
-   Deprecating auto-configuration for Jackson 2 for eventual removal
-   Using Jackson 3 in its `spring-boot-starter-json` and `spring-boot-starter-jackson` starter dependencies

When upgrading to Spring Boot 4.0, the recommendation is, by order of preference:

1.  A migration to Jackson 3
2.  A migration to Jackson 3 with `spring.jackson.use-jackson2-defaults` set
3.  Using temporarily Jackson 2 to ease migration to Spring Boot 4.0 as a stepping stone towards Jackson 3

Transitive dependencies still depending on Jackson 2 remain supported and will benefit from the Jackson 2 dependency management.

## [](#migrating-to-jackson-3)Migrating to Jackson 3

This section focuses on the most important migration steps for typical Spring Boot applications, see [the Jackson 3 migration guide](https://github.com/FasterXML/jackson/blob/main/jackson3/MIGRATING_TO_JACKSON_3.md) for more details on other aspects. Related [Open Rewrite recipes](https://docs.openrewrite.org/recipes/java/jackson/upgradejackson_2_3) can help to automate some of those changes, and [Spring Application Advisor](https://enterprise.spring.io/spring-application-advisor) will provide the most comprehensive option for migrating your Spring Boot application incrementally.

### [](#update-packages)Update packages

The first breaking change you will encounter when upgrading is probably the Jackson package (and dependency groupID) change from `com.fasterxml.jackson` to `tools.jackson` **except for jackson-annotations which remains unchanged for backward-compatibility reasons**.

### [](#adapt-to-the-new-default-settings)Adapt to the new default settings

[Jackson 3 has changed some default settings](https://github.com/FasterXML/jackson-future-ideas/wiki/JSTEP-2) compared to Jackson 2, so you should either adapt your tests accordingly (recommended when you can), or customize Jackson 3 configuration to restore some of the previous defaults.

The changes most likely to break you tests are the following:

-   If you are comparing Jackson serialization with raw strings in your tests, you will likely be impacted by `MapperFeature.SORT_PROPERTIES_ALPHABETICALLY` now set to true.
-   `SerializationFeature.WRITE_DATES_AS_TIMESTAMPS` now known as `DateTimeFeature.WRITE_DATES_AS_TIMESTAMPS` has been changed to false to serialize dates as ISO-8601 strings.

If you prefer at least initially keep using default settings as close as possible as Jackson 2, you can use the `spring.jackson.use-jackson2-defaults` property. When set to true, the auto-configured `JsonMapper` will have defaults that align as closely as possible with those of Jackson 2 in Spring Boot 3.

### [](#jackson-modules)Jackson modules

Some former Jackson 2 modules are now built in Jackson 3, like the parameter-names or datatype-jsr310 ones. Other modules previously enabled via the `Jackson2ObjectMapperBuilder` are [now discovered automatically via the JDK service loader facility](https://javadoc.io/static/tools.jackson.core/jackson-databind/3.0.0/tools.jackson.databind/tools/jackson/databind/cfg/MapperBuilder.html#findAndAddModules\(java.lang.ClassLoader\)) for the converters and codecs provided with Spring Framework.

It is also of course possible to configure custom ones via `JsonMapper.Builder`.

### [](#from-objectmapper-to-jsonmapper)From ObjectMapper to JsonMapper

Jackson 3 introduces [a lot of changes and enhancements](https://github.com/FasterXML/jackson/wiki/Jackson-Release-3.0), but from a Spring perspective one of the most important ones to understand and embrace is the **switch from a mutable `ObjectMapper` in Jackson 2 to an immutable [`JsonMapper`](https://javadoc.io/static/tools.jackson.core/jackson-databind/3.0.0/tools.jackson.databind/tools/jackson/databind/json/JsonMapper.html) in Jackson 3**.

`JsonMapper`, which extends `ObjectMapper`, is specific to the JSON format, following a similar pattern than other formats (`XmlMapper`, `YAMLMapper`, `SmileMapper`, etc.) and Spring support has been updated to use this format specific variant, following Jackson 3 best practices.

Also with Jackson and Spring defaults mostly aligned, and the introduction of a first class [`JsonMapper.Builder`](https://javadoc.io/static/tools.jackson.core/jackson-databind/3.0.0/tools.jackson.databind/tools/jackson/databind/json/JsonMapper.Builder.html), **Spring Framework does not provide an equivalent for [`Jackson2ObjectMapperBuilder`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/converter/json/Jackson2ObjectMapperBuilder.html), you should just use the Jackson builder**.

For example, with Spring Boot 3 and its Jackson 2 support, the programmatic equivalent of `spring.jackson.serialization.indent-output=true` was:

```java
Copy@Bean
public Jackson2ObjectMapperBuilderCustomizer jacksonCustomizer() {
    return builder -> builder.indentOutput(true);
}
```

With Spring Boot 4 and its Jackson 3 support, it is:

```java
Copy@Bean
JsonMapperBuilderCustomizer jacksonCustomizer() {
    return builder -> builder.enable(SerializationFeature.INDENT_OUTPUT);
}
```

### [](#goodbye-mappingjacksonvalue)Goodbye MappingJacksonValue

The now deprecated [`MappingJackson2HttpMessageConverter`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/converter/json/MappingJackson2HttpMessageConverter.html) was extending [`GenericHttpMessageConverter`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/converter/GenericHttpMessageConverter.html) which does not allow to pass properly additional serialization information like the serialization view or `FilterProvider`, hence the need for a [`MappingJacksonValue`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/converter/json/MappingJacksonValue.html) wrapper.

For example, let say we are annotating a `User` record with `@JsonView(Summary.class)` to identify a subset of its components to serialize or deserialize:

```java
Copypublic record User(
    @JsonView(Summary.class) String firstname,
    @JsonView(Summary.class) String lastname,
    LocalDate birthdate,
    @JsonView(Summary.class) String email,
    String address,
    int postalCode,
    String city,
    String country) {
}
```

With Spring Framework 6 and before, on client side you had to use a `MappingJacksonValue` wrapper to specify the `Summary` JSON view should be used.

```java
Copyvar user = new User("Marcel", "Martin", LocalDate.of(1971, 7, 12),
    "m@m.fr", "1234 rue Gambetta", 69002, "Lyon", "France");
var jacksonValue = new MappingJacksonValue(user);
jacksonValue.setSerializationView(Summary.class);
var response = this.restTemplate.postForObject("http://localhost:8080/create", jacksonValue, String.class);
```

This allows to serialize only the record components annotated with `@JsonView(Summary.class)`:

```json
Copy{
  "firstname" : "Marcel",
  "lastname" : "Martin",
  "email" : "m@m.fr"
}
```

As of Spring Framework 7, you can leverage the fact that the new [`JacksonJsonHttpMessageConverter`](https://docs.spring.io/spring-framework/docs/7.0.x/javadoc-api/org/springframework/http/converter/json/JacksonJsonHttpMessageConverter.html) based on Jackson 3 is implementing [`SmartHttpMessageConverter`](https://docs.spring.io/spring-framework/docs/7.0.x/javadoc-api/org/springframework/http/converter/SmartHttpMessageConverter.html) which supports serialization hints, so you can write instead:

```java
Copyvar user = new User("Marcel", "Martin", LocalDate.of(1971, 7, 12),
    "m@m.fr", "1234 rue Gambetta", 69002, "Lyon", "France");
var response = this.restClient.post().uri("http://localhost:8080/create")
    .hint(JsonView.class.getName(), Summary.class).body(user)
    .retrieve().body(String.class);
```

No more mutable wrapper, just optional hints.

## [](#keep-using-jackson-2-support-temporarily)Keep using Jackson 2 support temporarily

Applications migrating to Spring Boot 4 are encouraged to migrate to Jackson 3 but can continue to use Jackson 2 or even use Jackson 2 and 3 at the same time if needed. Just be aware it may require additional dependencies and configuration refinements.

If you want to keep using temporarily Jackson 2 support instead of Jackson 3, you can for example:

-   Exclude `spring-boot-jackson` direct or transitive dependencies (from `spring-boot-starter-jackson` or `spring-boot-starter-json` for example) and use `spring-boot-jackson2` instead
-   Use `spring.jackson2` instead of `spring.jackson` for configuration properties

Jackson 2 auto-configuration is kept for some limited time in a deprecated form, only to help for a gradual migration to Jackson 3.

## [](#spring-security-jackson-3-support)Spring Security Jackson 3 support

Spring Security 7.0 introduces [Jackson 3 support](https://docs.spring.io/spring-security/reference/7.0/features/integrations/jackson.html) and deprecates Jackson 2 one.

It also makes Jackson support safer with [safe default typing](https://cowtowncoder.medium.com/jackson-2-10-safe-default-typing-2d018f0ce2ba) by leveraging a [PolymorphicTypeValidator](https://javadoc.io/doc/tools.jackson.core/jackson-databind/latest/tools.jackson.databind/tools/jackson/databind/jsontype/PolymorphicTypeValidator.html) where only Spring Security types are allowed by default, and provide the capability for applications to add their own types, for example:

```java
CopyClassLoader loader = getClass().getClassLoader();
BasicPolymorphicTypeValidator.Builder typeValidatorBuilder = BasicPolymorphicTypeValidator.builder()
    .allowIfSubType(CustomGrantedAuthority.class);
JsonMapper mapper = JsonMapper.builder()
    .addModules(SecurityJacksonModules.getModules(loader, typeValidatorBuilder))
    .build();
```

The Jackson 3 support uses a format compatible with the now deprecated Jackson 2 one, so class instances serialized with Jackson 2 should be deserializable with the Jackson 3 support.

## [](#spring-data-jackson-3-support)Spring Data Jackson 3 support

Spring Data 4.0 ships with full support for Jackson 3 for its core modules. Applications migrating to Spring Data 4 are encouraged to migrate to Jackson 3 but can continue to use Jackson 2 or even use Jackson 2 and 3 at the same time if needed. Just be aware that Jackson 3 ships with a different set of defaults that may require either a migration of your persistent data or updating Jackson 3 defaults to match Jackson 2 settings.

As Spring Data forms a larger set of projects, let's explore each module separately:

### [](#spring-data-commons)Spring Data Commons

Spring Data Commons adding support for Jackson 3 with a fallback to Jackson 2 if only Jackson 2 is on the classpath. This applies mostly to Web support through `ProjectingJacksonHttpMessageConverter` and `SpringDataWebConfiguration`.

`JacksonResourceReader` and `JacksonRepositoryPopulatorFactoryBean` are Jackson 3-based variants of `Jackson2ResourceReader` respective `Jackson2RepositoryPopulatorFactoryBean`.

If you’re using Jackson 2 together with Spring Data’s XML namespace support (`<repository:jackson2-populator …>`) and you want to migrate to Jackson 3, then you will have to define a `JacksonRepositoryPopulatorFactoryBean` bean in your Java configuration.

If you happen to use `SpringDataJacksonModules`, then you want to consider migrating towards `SpringDataJackson3Modules` for a Jackson 3-based arrangement of your modules.

### [](#spring-data-redis)Spring Data Redis

Spring Data Redis 4.0 ships with `JacksonHashMapper`, `JacksonJsonRedisSerializer`, and `GenericJacksonJsonRedisSerializer` implementations for Jackson 3. When using `JacksonObjectReader` and JacksonObjectWriter, make sure to retrofit your implementations using `Jackson2ObjectReader` respective `Jackson2ObjectWriter` as class naming has been aligned for a consistent scheme.

### [](#spring-data-rest)Spring Data REST

Spring Data REST is essentially a large wrapper around Jackson that doesn't support an operating mode using Jackson 2. If you want to use the new Spring Data REST version then your application must migrate to Jackson 3. Similar goes for Spring HATEOAS as both frameworks make heavy usage of Jackson.

### [](#spring-data-couchbase-elasticsearch-drivers)Spring Data Couchbase, Elasticsearch, Drivers

The larger ecosystem is slowly catching up with Jackson 3. Couchbase, Elasticsearch, and some drivers use Jackson 2 internally and will continue doing so. In most cases, Jackson usage within these components doesn't relate to your entities as it is their mechanism for a JSON parser and writer.

## [](#conclusion)Conclusion

Jackson 3 brings strong benefits in terms of security, API, default configuration and capabilities, but it also comes with breaking changes that will require some migration work, the Spring team fully realizes that and has put significant efforts in providing the best possible arrangement and related guidance as well as offering industry leading extended support on the previous version to give you the time to upgrade.

As usual, we are looking for feedback and will do our best to refine our guidance, documentation and answer to your related questions.