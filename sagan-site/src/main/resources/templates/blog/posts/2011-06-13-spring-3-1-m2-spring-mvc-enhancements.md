---
title: Spring 3.1 M2: Spring MVC Enhancements
source: https://spring.io/blog/2011/06/13/spring-3-1-m2-spring-mvc-enhancements
scraped: 2026-02-24T08:40:02.948Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  June 13, 2011 | 0 Comments
---

# Spring 3.1 M2: Spring MVC Enhancements

_Engineering | Rossen Stoyanchev |  June 13, 2011 | 0 Comments_

This post focuses on what's new for Spring MVC in Spring 3.1 M2. Here are the topics:

-   Code-based equivalent for the MVC namespace.
-   Customizable @MVC processing.
-   Programming model improvements.

A brief reminder that the features discussed here are in action at the [Greenhouse](https://github.com/SpringSource/greenhouse) project.

## Code-based Configuration For Spring MVC

As Chris pointed out in [his blog post](http://blog.springsource.com/2011/06/10/spring-3-1-m2-configuration-enhancements/) last Friday, XML namespaces cut down configuration dramatically but also reduce transparency and sometimes flexibility. This holds true for the MVC namespace, which supports a number of customizations but not everything that's available. That means you are either able to use it or otherwise leave it. We believe code-based configuration has a solution for that and a path from simple to advanced.

Let's begin with this simple, familiar snippet:

```xml
Copy
<mvc:annotation-driven />
```

Although not required for using annotated controllers, `<mvc:annotation-driven>` does a number of useful things -- it detects the presence of a JSR-303 (Bean Validation) implementation and configures data binding with it, it adds a JSON message converter if Jackson JSON library is available, and a few other things that can save quite a bit of configuration.

Now let's match that with code-based configuration:

```java
Copy
@Configuration
@EnableWebMvc
public class WebConfig {
}
```

Here *`[@EnableWebMvc](http://static.springsource.org/spring/docs/3.1.0.M2/javadoc-api/org/springframework/web/servlet/config/annotation/EnableWebMvc.html)`* imports an `@Configuration` class that matches the goodness of `<mvc:annotation-driven>`. As simple as that.

The next step is to use an attribute in `<mvc:annotation-driven>` perhaps to provide a `FormattingConversionService`, or to add a sub-element perhaps configuring message converters, or to use other MVC namespace elements like `<mvc:interceptors>`, `<mvc:resources>`, etc.

Let's see how to do all of that in code-based configuration:

```java
Copy
@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        // register converters and formatters...
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // add message converters...
    }

    @Override
    public void configureInterceptors(InterceptorConfigurer configurer) {
        configurer.addInterceptor(new AccountExposingHandlerInterceptor());
    }

    @Override
    public void configureResourceHandling(ResourceConfigurer configurer) {
        configurer.addPathMapping("/resources/**").addResourceLocation("/resources/");
    }

    // more @Override methods ... 

}
```

Notice this time we've also sub-classed *`WebMvcConfigurerAdapter`*, a convenient base class with nothing but *empty* method implementations of the *`[WebMvcConfigurer](http://static.springsource.org/spring/docs/3.1.0.M2/javadoc-api/org/springframework/web/servlet/config/annotation/WebMvcConfigurer.html)`* interface, which defines configuration callbacks for customizing the Spring MVC configuration. `@Configuration` classes that implement this interface are detected and given a chance to apply customizations. That's pretty much it.

The above provides parity with the MVC namespace in a way that is arguably more *transparent*. You can use familiar Java IDE shortcuts to explore both the `WebMvcConfigurer` interface and the `@Bean` methods of the imported `@Configuration` class.

What about more advanced customizations? Well, this is as far as we can go with the MVC namespace. For code-based configuration, in the next (RC1) release, you'll be able to take the above example *as is*, drop the imported configuration (i.e. remove `@EnableWebMvc`) and switch to a base class that contains `@Bean` methods you can override. This means you can use Spring MVC code-based configuration knowing that any level of customization is possible -- either through a simple callback mechanism or by extending directly from the class providing the actual configuration.

Here is a look at the `[web configuration](https://github.com/SpringSource/greenhouse/blob/master/src/main/java/com/springsource/greenhouse/config/WebConfig.java)` in Greenhouse.

## Customizable @MVC Processing

The @MVC programming model has been very successful enabling flexible controller method signatures. Yet many of you have asked for the underlying @MVC support classes to be more customizable. In response we've rolled a new set of @MVC support classes that give you more power and give us a better foundation to build on.

Before annotations, the Controller was the processing endpoint. With annotations the individual controller method became the endpoint complete with its own request mappings. Following this logic a `HandlerMapping` should not be limited to selecting a controller but should pick a *controller method* instead. Hence it will make sense that we've added a `*HandlerMethod*` abstraction and an `*AbstractHandlerMethodMapping*` for handler mappings that can select a `HandlerMethod`.

These are the new @MVC support classes built around the `HandlerMethod` abstraction:

-   `*RequestMapping*HandlerMapping`
-   `*RequestMapping*HandlerAdapter`
-   `*ExceptionHandler*ExceptionResolver`

As a result we now have *a single point of selection* in the handler mapping, the handler adapter knows exactly which handler method was selected, and so do other components. For example many of you requested to have *interception around the invocation of a handler method*, a gap that is now closed. Another less obvious consequence is the freedom to *map the same URL across different controllers* as long as the mapping differs in some other way (e.g. HTTP method).

Beyond request mapping, the execution of a controller method requires resolving method arguments (`@RequestParameter`, `@ModelAttribute`, etc) and handling return values (`@ResponseBody`, `@ModelAttribute`, etc.). The new @MVC support classes expose a *pluggable* mechanism where implementations of *`HandlerMethodArgumentResolver`* and *`HandlerMethodReturnValueHandler`* can be plugged in to resolve *every* method argument and handle *every* return value. You have *full* control over that -- you can either design your own argument types and return value types or customize the processing of the built-in ones. More details on that in a subsequent post.

To try the new @MVC support classes simply upgrade to Spring 3.1 M2. Both the MVC namespace and `@EnableWebMvc` configure them. Or if you have your own configuration just swap these:

-   `DefaultAnnotationHandlerMapping` -> *`RequestMappingHandlerMapping`*
-   `AnnotationMethodHandlerAdapter` -> *`RequestMappingHandlerAdapter`*
-   `AnnotationMethodExceptionResolver` -> *`ExceptionHandlerExceptionResolver`*

*A note on compatibility*: The existing support classes will continue to be available. However, we recommend that you switch going forward. For instance all the programming model improvements in the next section are only available that way. The new classes should be a drop-in replacement for the most part but there are two noteworthy differences. One, you can't combine any of the existing `AbstractUrlHandlerMapping` types (e.g. `SimpleUrlHandlerMapping`) with the new handler adapter, which expects a `HandlerMethod` and not a handler. Two, you can't rely on the method name when two `@RequestMapping` methods match equally to a request.

## Programming Model Improvements

This section lists programming model improvements introduced in the new @MVC support classes.

1\. Declared `@PathVariable` arguments are now automatically added to the model. For example this:

```java
Copy
@RequestMapping("/develop/apps/edit/{slug}")
public String editForm(@PathVariable String slug, Model model) {
	model.addAttribute("slug", slug);
    // ...
}
```

is replaced by:

```java
Copy
@RequestMapping("/develop/apps/edit/{slug}")
public String editForm(@PathVariable String slug, Model model) {
    // model contains "slug" variable
}
```

2\. Redirect strings support URI templates expanded with variables from the model (including declared `@PathVariables`). For example this:

```java
Copy
@RequestMapping(
    value="/groups/{group}/events/{year}/{month}/{slug}/rooms", 
    method=RequestMethod.POST) 
public String createRoom(
    @PathVariable String group, @PathVariable Integer year, 
    @PathVariable Integer month, @PathVariable String slug) {
    // ...	
    return "redirect:/groups/" + group + "/events/" + year + "/" + month + "/" + slug;
}
```

is replaced by:

```java
Copy
@RequestMapping(
    value="/groups/{group}/events/{year}/{month}/{slug}/rooms", 
    method=RequestMethod.POST) 
public String createRoom(
    @PathVariable String group, @PathVariable Integer year, 
    @PathVariable Integer month, @PathVariable String slug) {
    // ...	
    return "redirect:/groups/{group}/events/{year}/{month}/{slug}";
}
```

3\. URI template variables are supported in data binding. For example this:

```java
Copy
@RequestMapping("/people/{firstName}/{lastName}/SSN")
public String find(Person person, 
                   @PathVariable String firstName, 
                   @PathVariable String lastName) {
    person.setFirstName(firstName);
    person.setLastName(lastName);
    // ...
}
```

is replaced by:

```java
Copy
@RequestMapping("/people/{firstName}/{lastName}/SSN")
public String search(Person person) {
    // person.getFirstName() and person.getLastName() are populated
    // ...
}
```

4\. Consumable and producible media types can be specified via `@RequestMapping`. For example this:

```java
Copy
@RequestMapping(value="/pets", headers="Content-Type=application/json")
public void addPet(@RequestBody Pet pet, Model model) {
    // ...
}
```

is replaced by:

```java
Copy
@RequestMapping(value="/pets", consumes="application/json")
public void addPet(@RequestBody Pet pet, Model model) {
    // ...
}
```

Besides being shorter the above returns NOT\_ACCEPTABLE (406) if the URL matches but the input media type doesn't.

5\. For producible media types this:

```java
Copy
@Controller
@RequestMapping(value = "/pets/{petId}", headers="Accept=application/json")
@ResponseBody
public Pet getPet(@PathVariable String petId, Model model) {    
    // ...
}
```

is replaced by:

```java
Copy
@Controller
@RequestMapping(value = "/pets/{petId}", produces="application/json")
@ResponseBody
public Pet getPet(@PathVariable String petId, Model model) {    
    // ...
}
```

The above returns a NOT\_SUPPORTED\_MEDIA\_TYPE (415) if the URL matches but the acceptable media type doesn't.

## Summary

There is a lot that's new in this milestone release. I encourage everyone to try the changes and provide feedback ahead of the RC1 and GA releases.

I would also like to turn your attention to another on-going effort to provide integration test support to Spring MVC applications. For server-side test support see the [spring-test-mvc](http://github.com/SpringSource/spring-test-mvc) project available on Github. For client-side support check the [Spring Social](http://www.springsource.org/spring-social) project or track the following JIRA ticket [SPR-7951](https://jira.springsource.org/browse/SPR-7951).