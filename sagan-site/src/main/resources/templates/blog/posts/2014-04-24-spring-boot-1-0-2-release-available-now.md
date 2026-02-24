---
title: Spring Boot 1.0.2.RELEASE Available Now
source: https://spring.io/blog/2014/04/24/spring-boot-1-0-2-release-available-now
scraped: 2026-02-24T07:27:23.249Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  April 24, 2014 | 5 Comments
---

# Spring Boot 1.0.2.RELEASE Available Now

_Releases | Dave Syer |  April 24, 2014 | 5 Comments_

Spring Boot 1.0.2.RELEASE is available now in the Spring and Maven Central repositories. This is mostly a bug-fix release (nothing major, but please upgrade if you are using an older version). There are also a couple of nice new features.

My favourite additions are the new `@IntegrationTest` features. Here's an example:

```java
Copy@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SampleActuatorApplication.class)
@WebAppConfiguration
@IntegrationTest("server.port=0")
public class SampleActuatorApplicationTests {

	@Value("${local.server.port}")
	private int port;

        ...

}
```

Here we have set the default value of "server.port" to 0 (which means "choose a random port") and then we have bound it to a field in the test so we can use it to interact with the running server. Neat, eh? You can bind other key-value pairs by adding more `Strings` to the `@IntegrationTest` `value` attribute.

We also added the following:

-   Websocket support to the Groovy CLI
-   Support for "yaml" file extensions in external configuration
-   A webapp will have a `LocaleResolver` if `spring.mvc.locale` is set
-   The script separator for SQL initialization has been externalized
-   `Filter` and `Servlet` beans can be disabled by wrapping them in a registration bean with `enabled=false`

... plus a ton of documentation improvements. See [GitHub for the complete list of changes](https://github.com/spring-projects/spring-boot/issues?milestone=10&state=closed).

Thanks again to all the community contributors who helped with this release. Take it for a ride, today!

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/1.0.2.RELEASE/reference/htmlsingle/)