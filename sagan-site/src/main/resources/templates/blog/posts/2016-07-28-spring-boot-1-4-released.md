---
title: Spring Boot 1.4 released
source: https://spring.io/blog/2016/07/28/spring-boot-1-4-released
scraped: 2026-02-23T19:08:33.408Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  July 28, 2016 | 20 Comments
---

# Spring Boot 1.4 released

_Releases | Phil Webb |  July 28, 2016 | 20 Comments_

One behalf of the Spring Boot team, and everyone that has contributed, I am pleased to announce that Spring Boot 1.4.0 has been released and is available now from [repo.spring.io](http://repo.spring.io/release/), [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.springframework.boot%22) and [Bintray](https://bintray.com/bintray/jcenter/org.springframework.boot%3Aspring-boot/view). This release adds a significant number of new features and improvements and builds on the [latest release of the Spring Framework](https://spring.io/blog/2016/06/10/spring-framework-4-3-goes-ga). For full [upgrade instructions](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.4-Release-Notes#upgrading-from-spring-boot-13) and ["new and noteworthy"](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.4-Release-Notes#new-and-noteworthy) features please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.4-Release-Notes).

Here are some of the highlights of v1.4:

## [](#startup-failure-message)Startup failure message

Spring Boot will now perform analysis of common startup failures and provide useful diagnostic information rather than simply logging a stack trace. For example, if you have a port clash, you'll now see the following message:

\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
APPLICATION FAILED TO START
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

Description:

Embedded servlet container failed to start. Port 8080 was already in use.

Action:

Identify and stop the process that's listening on port 8080 or configure this application to listen on another port.

## [](#convention-based-error-pages)Convention based error pages

Custom error pages for a given status code can now be created by following a convention based approach. Simply add static HTML or a template in the correct location to create a mapping. For example, to register a custom 404 page you could add `src/main/resource/public/error/404.html`

## [](#extended-data-support)Extended data support

Spring Boot now ships with support for [Neo4J](https://neo4j.com/), [Couchbase](http://www.couchbase.com) and [Redis Spring Data repositories](http://projects.spring.io/spring-data-redis/). In addition, [Hibernate 5.0](http://hibernate.org/search/documentation/migrate/5.0/) is now the default JPA provider. We've also refreshed our Elasticsearch integration to support the [Jest client](https://github.com/searchbox-io/Jest).

## [](#banner-images)Banner images

You can now use image files to render ASCII art banners. Drop a `banner.gif`, `banner.jpg` or `banner.png` file into `src/main/resources` to have it automatically converted into ASCII:

![Image Banner](https://raw.githubusercontent.com/wiki/spring-projects/spring-boot/images/spring-banner-image.png)

## [](#test-improvements)Test improvements

Spring Boot 1.4 includes a major overhaul of testing support. Test classes and utilities are now provided in dedicated `spring-boot-test` and `spring-boot-test-autoconfigure` jars. We’ve added [AssertJ](http://joel-costigliola.github.io/assertj/), [JSONassert](http://jsonassert.skyscreamer.org/) and [JsonPath](https://github.com/jayway/JsonPath) dependencies to the test starter and provided a simpler unified `@SpringBootTest` annotation for use with Spring's JUnit runner.

We can now also auto-configure many tests, meaning most users will require less test configuration. We've also introduced dedicated `@JsonTest`, `@WebMvcTest`, `@RestClientTest` and `@DataJpaTest` annotations that let you quickly test a "slice" of your application.

Finally, there's also comprehensive Mockto integration. You can now easily 'mock' or 'spy' Spring Beans:

```java
Copy@RunWith(SpringRunner.class)
@SpringBootTest
public class MyTest {

    @MockBean
    private RemoteService remoteService;

    @Autowired
    private Reverser reverser;

    @Test
    public void exampleTest() {
        // RemoteService has been injected into the reverser bean
        given(this.remoteService.someCall()).willReturn("mock");
        String reverse = reverser.reverseSomeCall();
        assertThat(reverse).isEqualTo("kcom");
    }

}
```

## [](#actuator)Actuator

The actuator `/info` endpoint has been improved so that you can easily contribute additional items. Out of the box we now support:

-   Full or partial Git information generated from Maven or Gradle plugins.
-   Build information generated from the Spring Boot Maven or Gradle plugin.
-   Custom information from the Environment (any property starting `info.*`)

The `/metrics` endpoint has also been refined so that submissions can be "merged" and/or "grouped".

## [](#other-changes)Other changes

There's a whole host of other changes and improvements that are documented in the [Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.4-Release-Notes). You can also find a list of deprecated classes and methods that we plan to remove in the next version.

  
  

We want to take this opportunity to again thank all our users and contributors. We've now had over [281 people](https://github.com/spring-projects/spring-boot/graphs/contributors) submit code, and there have been over [8,500 commits](https://github.com/spring-projects/spring-boot/commits/master) to the project.

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/issues?q=is%3Aopen+is%3Aissue+label%3A%22ideal+for+contribution%22) in the issue repository. If you have general questions, please ask at [stackoverflow.com](http://stackoverflow.com) using the [`spring-boot` tag](http://stackoverflow.com/tags/spring-boot).

Happy coding!

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle)