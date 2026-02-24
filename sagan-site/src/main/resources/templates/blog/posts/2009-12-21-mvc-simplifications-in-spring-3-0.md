---
title: MVC Simplifications in Spring 3.0
source: https://spring.io/blog/2009/12/21/mvc-simplifications-in-spring-3-0
scraped: 2026-02-24T09:01:08.513Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  December 21, 2009 | 1 Comment
---

# MVC Simplifications in Spring 3.0

_Engineering | Keith Donald |  December 21, 2009 | 1 Comment_

As [Juergen](http://blog.springsource.com/2009/12/16/spring-framework-3-0-goes-ga/) and [Arjen](http://www.infoq.com/presentations/Whats-New-in-Spring-3.0) have mentioned, Java developers everywhere have a smooth upgrade with Spring 3.0. Now that Spring 3 is out, I'd like to take you through some of the new *MVC* features you may not know about. I hope you find these features useful and can start putting them to work in your web applications immediately.

This is also the start of a series on "Spring 3 Simplifications", so expect more posts like these in the coming days and weeks.

## Configuration Simplification

Spring 3 introduces a [mvc](http://static.springsource.org/schema/mvc/spring-mvc.xsd) namespace that greatly simplifies Spring MVC setup. Along with other enhancements, it has never been easier to get Spring web applications up and running. This can be illustrated by the [mvc-basic](https://src.springframework.org/svn/spring-samples/mvc-basic/trunk/) sample, which I will now walk you through.

[mvc-basic](https://src.springframework.org/svn/spring-samples/mvc-basic/trunk/) has been designed to illustrate a basic set of Spring MVC features. The project is available at our [spring-samples](https://src.springframework.org/svn/spring-samples) SVN repository, is buildable with Maven, and is importable into Eclipse. Start your review with [web.xml](https://src.springframework.org/svn/spring-samples/mvc-basic/trunk/src/main/webapp/WEB-INF/web.xml) and notice the configuration there. Notably, a DispatcherServlet is configured with a single master Spring configuration file that initializes all other application components. The DispatcherServlet is configured as the default servlet for the application (mapped to "/"), allowing for clean, REST-ful URLs.

Inside the master [servlet-context.xml](https://src.springframework.org/svn/spring-samples/mvc-basic/trunk/src/main/webapp/WEB-INF/spring/appServlet/servlet-context.xml), you'll find a typical setup. On the first line, component scanning has been turned on to discover application components from the classpath. On the next line, you'll find the first new Spring MVC 3 feature in action:

```xml
Copy
<!-- Configures the @Controller programming model -->
<mvc:annotation-driven />
```

This tag registers the HandlerMapping and HandlerAdapter required to dispatch requests to your @Controllers. In addition, it applies sensible defaults based on what is present in your classpath. Such defaults include:

-   Using the Spring 3 Type [ConversionService](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/validation.html#core-convert) as a simpler and more robust alternative to JavaBeans PropertyEditors
-   Support for formatting Number fields with [@NumberFormat](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/format/annotation/NumberFormat.html)
-   Support for formatting Date, Calendar, and Joda Time fields with [@DateTimeFormat](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/format/annotation/DateTimeFormat.html), if Joda Time is on the classpath
-   Support for validating @Controller inputs with @Valid, if a JSR-303 Provider is on the classpath
-   Support for reading and writing XML, if JAXB is on the classpath
-   Support for reading and writing JSON, if [Jackson](http://jackson.codehaus.org) is on the classpath

Pretty cool, huh?

Moving on, the next line demonstrates another new feature:

```xml
Copy
<!-- Forwards requests to the "/" resource to the "welcome" view -->
<mvc:view-controller path="/" view-name="welcome" />
```

Behind the scenes, mvc:view-controller registers a ParameterizableViewController that selects a view for rendering. In this case, when "/" is requested, the welcome view is rendered. The actual view template is a .jsp resolved inside the /WEB-INF/views directory.

Moving on, the next line shows yet another new feature:

```xml
Copy
<!-- Configures Handler Interceptors -->	
<mvc:interceptors>
    <!-- Changes the locale when a 'locale' request parameter is sent; e.g. /?locale=de -->
    <bean class="org.springframework.web.servlet.i18n.LocaleChangeInterceptor" />
</mvc:interceptors>
```

The mvc:interceptors tag allows you to register HandlerInterceptors to apply to all controllers. Previously, to do this you had to explicitly register such interceptors *with each* HandlerMapping bean, which was repetitive. Also note this tag now lets you restrict which URL paths certain interceptors apply to.

Moving on, the next line hightlights a new feature added in version 3.0.4:

```xml
Copy
<!-- Handles GET requests for /resources/** by efficiently serving static content in the ${webappRoot}/resources dir -->
<mvc:resources mapping="/resources/**" location="/resources/" />
```

The mvc:resources tag lets you configure a handler for static resources, such as css and javascript files. In this case, requests for /resources/\*\* are mapped to files inside the /resources directory.

Putting things in motion, if you deploy the sample you should see the welcome view render:

![mvc-basic](http://blog.springsource.com/wp-content/uploads/2009/12/mvc-basic.png "mvc-basic")

Feel free to activate the different language links to have the LocaleChangeInterceptor switch the user locale.

## Data Binding Simplification

The next set of new features I'll illustrate pertain to @Controller binding and validation. As I [blogged about](http://blog.springsource.com/2009/11/17/spring-3-type-conversion-and-validation/) a few weeks ago, there is a lot new in this area.

In the sample, if you activate the @Controller Example link the following form should render:

![mvc-basic-form](http://blog.springsource.com/wp-content/uploads/2009/12/mvc-basic-form.png "mvc-basic-form")

From there, if you change the locale you should see internationalized field formatting kick in. For example, switching from **en** to **de** would cause the Renewal Date 12/21/10 to be formatted 21.12.10. This behavior and the form's validation rules are driven by model annotations:

```java
Copy
public class Account {
	
	@NotNull
	@Size(min=1, max=25)
	private String name;
	
	@NotNull
	@NumberFormat(style=Style.CURRENCY)
	private BigDecimal balance = new BigDecimal("1000");
	
	@NotNull
	@NumberFormat(style=Style.PERCENT)
	private BigDecimal equityAllocation = new BigDecimal(".60");

	@DateTimeFormat(style="S-")
	@Future
	private Date renewalDate = new Date(new Date().getTime() + 31536000000L);

}
```

Form submit is handled by the following [AccountController](https://src.springframework.org/svn/spring-samples/mvc-basic/trunk/src/main/java/org/springframework/samples/mvc/basic/account/AccountController.java) method:

```java
Copy
@RequestMapping(method=RequestMethod.POST)
public String create(@Valid Account account, BindingResult result) {
    if (result.hasErrors()) {
        return "account/createForm";
    }
    this.accounts.put(account.assignId(), account);
    return "redirect:/account/" + account.getId();
}
```

This method is called *after binding and validation*, where validation of the Account input is triggered by the @Valid annotation. If there are any validation errors, the createForm will be re-rendered, else the Account will be saved and the user will be redirected; e.g. to [http://localhost:8080/mvc-basic/account/1](http://localhost:8080/mvc-basic/account/1).

For an illustration of another cool new feature, try requesting an account that does not exist; e.g. /account/99.

## Summary

Spring 3 is a great release containing numerous new features and simplifications across many exciting areas. I hope you found this post on some of the new Spring MVC enhancements useful. As I mentioned at the top, expect more to come in the "Spring 3 Simplifications" series, where we will continue to show new and interesting things you can do with the latest version of the framework.

Happy Holidays!