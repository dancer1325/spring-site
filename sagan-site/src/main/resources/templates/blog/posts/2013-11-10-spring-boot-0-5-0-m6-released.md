---
title: Spring Boot 0.5.0.M6 Released
source: https://spring.io/blog/2013/11/10/spring-boot-0-5-0-m6-released
scraped: 2026-02-24T07:53:26.440Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  November 10, 2013 | 0 Comments
---

# Spring Boot 0.5.0.M6 Released

_Releases | Phil Webb |  November 10, 2013 | 0 Comments_

Spring Boot 0.5.0.M6 has been released and is now available in the [Spring repo](http://repo.spring.io/milestone/org/springframework/boot/org/springframework/boot/). Instructions for installing and using are on the [project website](http://projects.spring.io/spring-boot/docs/README.html) or in [github](https://github.com/spring-projects/spring-boot). There are loads of updates in this release, including:

-   Auto-configuration reports to let you know what Spring Boot is doing on your behalf
-   Remote shell support via [CRaSH](http://www.crashub.org/)
-   Support for JDK 8
-   A new Aether based @Grab engine
-   Lots of bug fixes

Here is a quick example that demonstrates the remote shell and auto-configuration report:

```groovy
Copy@Grab("spring-boot-starter-shell-remote") 
@Controller 
class MyRemote {
}
```

When you run this application using `spring run example.groovy` you should see a password in the log output:

2013-11-10 12:48:09.264  INFO 33677 --- \[ost-startStop-1\] o.s.web.servlet.DispatcherServlet        : FrameworkServlet 'dispatcherServlet': initialization completed in 980 ms
2013-11-10 12:48:09.648  INFO 33677 --- \[       runner-0\] roperties$SimpleAuthenticationProperties : 

Using default password for shell access: 062813ce-aaaa-4b92-a50f-67b156a923dd

2013-11-10 12:48:09.700  INFO 33677 --- \[       runner-0\] .a.a.CrshAutoConfiguration$CrshBootstrap : Configuring property ssh.port=2000 from properties

You can use this password to ssh into the application and experiment with the available commands:

```
Copy$ ssh -p 2000 user@localhost
```

To take a look at the auto-configuration report simply hit the actuator endpoint [http://localhost:8080/autoconfigurationreport](http://localhost:8080/autoconfigurationreport).