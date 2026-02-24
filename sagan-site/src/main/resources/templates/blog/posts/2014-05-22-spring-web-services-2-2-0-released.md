---
title: Spring Web Services 2.2.0 Released
source: https://spring.io/blog/2014/05/22/spring-web-services-2-2-0-released
scraped: 2026-02-23T22:30:24.961Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Arjen Poutsma |  May 22, 2014 | 9 Comments
---

# Spring Web Services 2.2.0 Released

_Releases | Arjen Poutsma |  May 22, 2014 | 9 Comments_

I'm pleased to announce that Spring Web Services 2.2.0.RELEASE has been released! This is the first release in the 2.2 release cycle. The main new feature in 2.2 is the introduction of code configuration support for Spring-WS. This means that you can now configure Spring-WS with a simple `@EnableWs` annotation. For instance:

```java
Copy@Configuration
@EnableWs
@ComponentScan(basePackageClasses = { MyConfiguration.class })
public class MyWsConfiguration {

  // @Beans go here
}
```

For more information about this topic, refer to the [javadoc of @EnableWs](http://static.springframework.org/spring-ws/docs/current/api/org/springframework/ws/config/annotation/EnableWs.html). You can also read more about this new feature in the [updated reference documentation](http://static.springframework.org/spring-ws/docs/current/reference/html/). To view a complete list of changes see the [changelog](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10060&version=12850).