---
title: CORS support in Spring Framework
source: https://spring.io/blog/2015/06/08/cors-support-in-spring-framework
scraped: 2026-02-23T19:50:20.697Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  June 08, 2015 | 71 Comments
---

# CORS support in Spring Framework

_Engineering | Sébastien Deleuze |  June 08, 2015 | 71 Comments_

For security reasons, browsers prohibit AJAX calls to resources residing outside the current origin. For example, as you're checking your bank account in one tab, you could have the evil.com website in another tab. The scripts from evil.com shouldn’t be able to make AJAX requests to your bank API (withdrawing money from your account!) using your credentials.

[Cross-origin resource sharing](https://spring.io/understanding/CORS) (CORS) is a [W3C specification](http://www.w3.org/TR/cors/) implemented by [most browsers](http://caniuse.com/#feat=cors) that allows you to specify in a flexible way what kind of cross domain requests are authorized, instead of using some less secured and less powerful hacks like IFrame or JSONP.

[Spring Framework 4.2 GA](https://spring.io/blog/2015/07/31/spring-framework-4-2-goes-ga) provides [first class support for CORS](https://jira.spring.io/browse/SPR-9278) out-of-the-box, giving you an easier and more powerful way to configure it than typical [filter based](http://software.dzhuvinov.com/cors-filter.html) solutions.

Spring MVC provides high-level configuration facilities, described bellow.

## [](#controller-method-cors-configuration)Controller method CORS configuration

You can add to your `@RequestMapping` annotated handler method a [`@CrossOrigin`](http://docs.spring.io/spring-framework/docs/4.2.x/javadoc-api/org/springframework/web/bind/annotation/CrossOrigin.html) annotation in order to enable CORS on it (by default `@CrossOrigin` allows all origins and the HTTP methods specified in the `@RequestMapping` annotation):

```java
Copy@RestController
@RequestMapping("/account")
public class AccountController {

	@CrossOrigin
	@GetMapping("/{id}")
	public Account retrieve(@PathVariable Long id) {
		// ...
	}

	@DeleteMapping("/{id}")
	public void remove(@PathVariable Long id) {
		// ...
	}
}
```

It is also possible to enable CORS for the whole controller:

```java
Copy@CrossOrigin(origins = "http://domain2.com", maxAge = 3600)
@RestController
@RequestMapping("/account")
public class AccountController {

	@GetMapping("/{id}")
	public Account retrieve(@PathVariable Long id) {
		// ...
	}

	@DeleteMapping("/{id}")
	public void remove(@PathVariable Long id) {
		// ...
	}
}
```

In this example CORS support is enabled for both `retrieve()` and `remove()` handler methods, and you can also see how you can customize the CORS configuration using `@CrossOrigin` attributes.

You can even use both controller and method level CORS configurations, Spring will then combine both annotation attributes to create a merged CORS configuration.

```java
Copy@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/account")
public class AccountController {

	@CrossOrigin(origins = "http://domain2.com")
	@GetMapping("/{id}")
	public Account retrieve(@PathVariable Long id) {
		// ...
	}

	@DeleteMapping("/{id}")
	public void remove(@PathVariable Long id) {
		// ...
	}
}
```

If you are using Spring Security, make sure to [enable CORS at Spring Security level](http://docs.spring.io/spring-security/site/docs/current/reference/html/cors.html) as well to allow it to leverage the configuration defined at Spring MVC level.

```java
Copy@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and()...
	}
}
```

## [](#global-cors-configuration)Global CORS configuration

In addition to fine-grained, annotation-based configuration you'll probably want to define some global CORS configuration as well. This is similar to using filters but can be declared withing Spring MVC and combined with fine-grained `@CrossOrigin` configuration. By default all origins and `GET`, `HEAD` and `POST` methods are allowed.

### [](#javaconfig)JavaConfig

Enabling CORS for the whole application is as simple as:

```java
Copy@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**");
	}
}
```

If you are using Spring Boot, it is recommended to just declare a `WebMvcConfigurer` bean as following:

```java
Copy@Configuration
public class MyConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**");
            }
        };
    }
}
```

You can easily change any properties, as well as only apply this CORS configuration to a specific path pattern:

```java
Copy@Override
public void addCorsMappings(CorsRegistry registry) {
	registry.addMapping("/api/**")
		.allowedOrigins("http://domain2.com")
		.allowedMethods("PUT", "DELETE")
			.allowedHeaders("header1", "header2", "header3")
		.exposedHeaders("header1", "header2")
		.allowCredentials(false).maxAge(3600);
}
```

If you are using Spring Security, make sure to [enable CORS at Spring Security level](http://docs.spring.io/spring-security/site/docs/current/reference/html/cors.html) as well to allow it to leverage the configuration defined at Spring MVC level.

### [](#xml-namespace)XML namespace

It is also possible to configure CORS with the [mvc XML namespace](https://jira.spring.io/browse/SPR-13046).

This minimal XML configuration enable CORS on `/**` path pattern with the same default properties than the JavaConfig one:

```xml
Copy<mvc:cors>
	<mvc:mapping path="/**" />
</mvc:cors>
```

It is also possible to declare several CORS mappings with customized properties:

```xml
Copy<mvc:cors>

	<mvc:mapping path="/api/**"
		allowed-origins="http://domain1.com, http://domain2.com"
		allowed-methods="GET, PUT"
		allowed-headers="header1, header2, header3"
		exposed-headers="header1, header2" allow-credentials="false"
		max-age="123" />

	<mvc:mapping path="/resources/**"
		allowed-origins="http://domain1.com" />

</mvc:cors>
```

If you are using Spring Security, don't forget to [enable CORS at Spring Security level](http://docs.spring.io/spring-security/site/docs/current/reference/html/cors.html) as well:

```xml
Copy<http>
	<!-- Default to Spring MVC's CORS configuration -->
	<cors />
	...
</http>
```

## [](#how-does-it-work)How does it work?

CORS requests ([including preflight ones with an `OPTIONS` method](https://github.com/spring-projects/spring-framework/blob/master/spring-webmvc/src/main/java/org/springframework/web/servlet/FrameworkServlet.java#L906)) are automatically dispatched to the various `HandlerMapping`s registered. They handle CORS preflight requests and intercept CORS simple and actual requests thanks to a [CorsProcessor](http://docs.spring.io/spring/docs/4.2.x/javadoc-api/org/springframework/web/cors/CorsProcessor.html) implementation ([DefaultCorsProcessor](https://github.com/spring-projects/spring-framework/blob/master/spring-web/src/main/java/org/springframework/web/cors/DefaultCorsProcessor.java) by default) in order to add the relevant CORS response headers (like `Access-Control-Allow-Origin`). [CorsConfiguration](http://docs.spring.io/spring/docs/4.2.x/javadoc-api/org/springframework/web/cors/CorsConfiguration.html) allows you to specify how the CORS requests should be processed: allowed origins, headers, methods, etc. It can be provided in various ways:

-   [`AbstractHandlerMapping#setCorsConfiguration()`](http://docs.spring.io/spring/docs/4.2.x/javadoc-api/org/springframework/web/servlet/handler/AbstractHandlerMapping.html#setCorsConfiguration-java.util.Map-) allows to specify a `Map` with several [CorsConfiguration](http://docs.spring.io/spring/docs/4.2.x/javadoc-api/org/springframework/web/cors/CorsConfiguration.html) mapped on path patterns like `/api/**`
-   Subclasses can provide their own `CorsConfiguration` by overriding `AbstractHandlerMapping#getCorsConfiguration(Object, HttpServletRequest)` method
-   Handlers can implement [`CorsConfigurationSource`](http://docs.spring.io/spring/docs/4.2.x/javadoc-api/org/springframework/web/cors/CorsConfigurationSource.html) interface (like [`ResourceHttpRequestHandler`](https://github.com/spring-projects/spring-framework/blob/master/spring-webmvc/src/main/java/org/springframework/web/servlet/resource/ResourceHttpRequestHandler.java) now does) in order to provide a [CorsConfiguration](http://docs.spring.io/spring/docs/4.2.x/javadoc-api/org/springframework/web/cors/CorsConfiguration.html) for each request.

##Filter based CORS support

As an alternative to other methods presented above, Spring Framework also provides a [CorsFilter](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/filter/CorsFilter.html). In that case, instead of using `@CrossOrigin` or `WebMvcConfigurer#addCorsMappings(CorsRegistry)`, you can for example declare the filter as following in your Spring Boot application:

```java
Copy@Configuration
public class MyConfiguration {

	@Bean
	public FilterRegistrationBean corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://domain1.com");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		source.registerCorsConfiguration("/**", config);
		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
		bean.setOrder(0);
		return bean;
	}
}
```

## [](#learn-more)Learn More

-   Sign up for [SpringOne Platform 2019](https://springoneplatform.io/) – the premier conference for building scalable microservice applications with Spring. This year we're in Austin, TX from October 7th to 10th. Use the discount code **S1P\_Save200** to save money on your ticket. Need help convincing your manager? Use [this page](https://springoneplatform.io/2019/convince-your-manager).
-   Get the free eBook [Migrating to Cloud-Native Architectures](https://content.pivotal.io/ebooks/migrating-to-cloud-native-application-architectures) by Matt Stine
-   This [webinar](https://content.pivotal.io/webinars/jan-29-securing-microservices-spring-and-pivotal-cloud-foundry-webinar) discusses securing microservices with Spring and Pivotal Cloud Foundry