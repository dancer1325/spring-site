---
title: Spring Framework RCE, Early Announcement
source: https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement
scraped: 2026-02-23T12:44:47.620Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  March 31, 2022 | 287 Comments
---

# Spring Framework RCE, Early Announcement

_Engineering | Rossen Stoyanchev |  March 31, 2022 | 287 Comments_

**Updates**

-   **\[04-13\]** ["Data Binding Rules Vulnerability CVE-2022-22968"](https://spring.io/blog/2022/04/13/spring-framework-data-binding-rules-vulnerability-cve-2022-22968) follow-up blog post published, related to the "disallowedFields" from the [Suggested Workarounds](#suggested-workarounds)
-   **\[04-08\]** [Snyk announces](https://snyk.io/blog/spring4shell-rce-vulnerability-glassfish-payara/) an additional attack vector for Glassfish and Payara. See also related Payara, upcoming release [announcement](https://blog.payara.fish/payara-and-spring4shell)
-   **\[04-04\]** Updated [Am I Impacted](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement#am-i-impacted) with improved description for deployment requirements
-   **\[04-01\]** Updated [Am I Impacted](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement#am-i-impacted) with additional notes
-   **\[04-01\]** Updated [Suggested Workarounds](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement#suggested-workarounds) section for Apache Tomcat upgrades and Java 8 downgrades
-   **\[04-01\]** ["Mitigation Alternative"](https://spring.io/blog/2022/04/01/spring-framework-rce-mitigation-alternative) follow-up blog post published, announcing Apache Tomcat releases versions **10.0.20**, **9.0.62**, and **8.5.78** that close the attack vector on Tomcat’s side
-   **\[03-31\]** [Spring Boot 2.6.6](https://spring.io/blog/2022/03/31/spring-boot-2-6-6-available-now) is available
-   **\[03-31\]** [Spring Boot 2.5.12](https://spring.io/blog/2022/03/31/spring-boot-2-5-12-available-now) is available
-   **\[03-31\]** [CVE-2022-22965](https://tanzu.vmware.com/security/cve-2022-22965) is published
-   **\[03-31\]** Added section "Misconceptions"
-   **\[03-31\]** Added section "Am I Impacted"
-   **\[03-31\]** Fix minor issue in the workaround for adding `disallowedFields`
-   **\[03-31\]** Spring Framework **5.3.18** and **5.2.20** are available

## [](#table-of-contents)Table of Contents

-   [Overview](#overview)
-   [Vulnerability](#vulnerability)
-   [Am I Impacted](#am-i-impacted)
-   [Status](#status)
-   [Suggested Workarounds](#suggested-workarounds)
-   [Misconceptions](#misconceptions)

### [](#overview)Overview

I would like to announce an RCE vulnerability in the Spring Framework that was leaked out ahead of CVE publication. The issue was first reported to VMware late on Tuesday evening, close to Midnight, GMT time by codeplutos, meizjm3i of AntGroup FG. On Wednesday we worked through investigation, analysis, identifying a fix, testing, while aiming for emergency releases on Thursday. In the mean time, also on Wednesday, details were leaked in full detail online, which is why we are providing this update ahead of the releases and the CVE report.

### [](#vulnerability)Vulnerability

The vulnerability impacts Spring MVC and Spring WebFlux applications running on JDK 9+. The specific exploit requires the application to be packaged and deployed as a traditional WAR on a Servlet container. If the application is deployed as a Spring Boot executable jar, i.e. the default, it is not vulnerable to the exploit. However, the nature of the vulnerability is more general, and there may be other ways to exploit it.

### [](#am-i-impacted)Am I Impacted?

These are the requirements for the specific scenario from the report:

-   Running on JDK 9 or higher
-   [Packaged as a traditional WAR](https://docs.spring.io/spring-boot/docs/2.5.x/reference/htmlsingle/#howto.traditional-deployment) and deployed on a standalone Servlet container. Typical Spring Boot deployments using [an embedded Servlet container](https://docs.spring.io/spring-boot/docs/2.5.x/reference/htmlsingle/#features.developing-web-applications.embedded-container) or [reactive web server](https://docs.spring.io/spring-boot/docs/2.5.x/reference/htmlsingle/#features.developing-web-applications.reactive-server) are not impacted.
-   `spring-webmvc` or `spring-webflux` dependency.
-   Spring Framework versions 5.3.0 to 5.3.17, 5.2.0 to 5.2.19, and older versions.

Additional notes:

-   The vulnerability involves `ClassLoader` access and depends on the actual Servlet Container in use. Tomcat 10.0.19, 9.0.61, 8.5.77, and earlier versions are known to be vulnerable. Payara and Glassfish are also known to be vulnerable. Other Servlet containers may also be vulnerable.
-   The issue relates to data binding used to populate an object from request parameters (either query parameters or form data). Data binding is used for controller method parameters that are annotated with `@ModelAttribute` or optionally without it, and without any other Spring Web annotation.
-   The issues does not relate to `@RequestBody` controller method parameters (e.g. JSON deserialization). However, such methods may still be vulnerable if they have another method parameter populated via data binding from query parameters.

### [](#status)Status

-   Spring Framework 5.3.18 and 5.2.20, which contain the fixes, have been released.
-   Spring Boot 2.6.6 and 2.5.12 that depend on Spring Framework 5.3.18 have been released.
-   [CVE-2022-22965](https://tanzu.vmware.com/security/cve-2022-22965) has been published.
-   Apache Tomcat has released versions 10.0.20, 9.0.62, and 8.5.78 which close the attack vector on Tomcat’s side, see [Spring Framework RCE, Mitigation Alternative](https://spring.io/blog/2022/04/01/spring-framework-rce-mitigation-alternative).

### [](#suggested-workarounds)Suggested Workarounds

The preferred response is to update to Spring Framework **5.3.18** and **5.2.20** or greater. If you have done this, then no workarounds are necessary. However, some may be in a position where upgrading is not possible to do quickly. For that reason, we have provided some workarounds below.

-   [Upgrading Tomcat](#upgrading-tomcat)
-   [Downgrading to Java 8](#downgrading-to-java-8)
-   [Disallowed Fields](#disallowed-fields)

Please note that, workarounds are not necessarily mutually exclusive since security is best done "in depth".

#### [](#upgrading-tomcat)Upgrading Tomcat

For older applications, running on Tomcat with an unsupported Spring Framework version, upgrading to Apache Tomcat **10.0.20**, **9.0.62**, or **8.5.78**, provides adequate protection. However, this should be seen as a tactical solution, and the main goal should be to upgrade to a currently supported Spring Framework version as soon as possible. If you take this approach, you should consider setting [Disallowed Fields](#disallowed-fields) as well for defense in depth approach.

#### [](#downgrading-to-java-8)Downgrading to Java 8

Downgrading to Java 8 is a viable workaround, if you can neither upgrade the Spring Framework nor upgrade Apache Tomcat.

#### [](#disallowed-fields)Disallowed Fields

Another viable workaround is to disable binding to particular fields by setting `disallowedFields`on `WebDataBinder` globally:

```java
Copy
@ControllerAdvice
@Order(Ordered.LOWEST_PRECEDENCE)
public class BinderControllerAdvice {

    @InitBinder
    public void setAllowedFields(WebDataBinder dataBinder) {
         String[] denylist = new String[]{"class.*", "Class.*", "*.class.*", "*.Class.*"};
         dataBinder.setDisallowedFields(denylist);
    }

}
```

This works generally, but as a centrally applied workaround fix, may leave some loopholes, in particular if a controller sets `disallowedFields` locally through its own `@InitBinder` method, which overrides the global setting.

To apply the workaround in a more fail-safe way, applications could extend `RequestMappingHandlerAdapter` to update the `WebDataBinder` at the end after all other initialization. In order to do that, a Spring Boot application can declare a `WebMvcRegistrations` bean (Spring MVC) or a `WebFluxRegistrations` bean (Spring WebFlux).

For example in Spring MVC (and similar in WebFlux):

```java
Copypackage car.app;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcRegistrations;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.annotation.InitBinderDataBinderFactory;
import org.springframework.web.method.support.InvocableHandlerMethod;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.ServletRequestDataBinderFactory;

@SpringBootApplication
public class MyApp {

	public static void main(String[] args) {
		SpringApplication.run(CarApp.class, args);
	}

	@Bean
	public WebMvcRegistrations mvcRegistrations() {
		return new WebMvcRegistrations() {
			@Override
			public RequestMappingHandlerAdapter getRequestMappingHandlerAdapter() {
				return new ExtendedRequestMappingHandlerAdapter();
			}
		};
	}

	private static class ExtendedRequestMappingHandlerAdapter extends RequestMappingHandlerAdapter {

		@Override
		protected InitBinderDataBinderFactory createDataBinderFactory(List<InvocableHandlerMethod> methods) {

			return new ServletRequestDataBinderFactory(methods, getWebBindingInitializer()) {

				@Override
				protected ServletRequestDataBinder createBinderInstance(
						Object target, String name, NativeWebRequest request) throws Exception {
					
					ServletRequestDataBinder binder = super.createBinderInstance(target, name, request);
					String[] fields = binder.getDisallowedFields();
					List<String> fieldList = new ArrayList<>(fields != null ? Arrays.asList(fields) : Collections.emptyList());
					fieldList.addAll(Arrays.asList("class.*", "Class.*", "*.class.*", "*.Class.*"));
					binder.setDisallowedFields(fieldList.toArray(new String[] {}));
					return binder;
				}
			};
		}
	}
}

```

For Spring MVC without Spring Boot, an application can switch from `@EnableWebMvc` to extending `DelegatingWebMvcConfiguration` directly as described in [Advanced Config](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-config-advanced-java) section of the documentation, then overriding the `createRequestMappingHandlerAdapter` method.

### [](#misconceptions)Misconceptions

There was speculation surrounding the commit to deprecate `SerializationUtils`. This class has only one usage within the framework and is not exposed to external input. The deprecation is unrelated to this vulnerability.

There was confusion with a [CVE for Spring Cloud Function](https://spring.io/blog/2022/03/29/cve-report-published-for-spring-cloud-function) which was released just before the report for this vulnerability. It is also unrelated.