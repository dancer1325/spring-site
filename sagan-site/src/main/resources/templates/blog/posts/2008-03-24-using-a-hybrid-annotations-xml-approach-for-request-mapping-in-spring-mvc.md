---
title: Using a Hybrid Annotations & XML Approach for Request Mapping in Spring MVC
source: https://spring.io/blog/2008/03/24/using-a-hybrid-annotations-xml-approach-for-request-mapping-in-spring-mvc
scraped: 2026-02-24T09:19:58.421Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  March 24, 2008 | 3 Comments
---

# Using a Hybrid Annotations & XML Approach for Request Mapping in Spring MVC

_Engineering | Rossen Stoyanchev |  March 24, 2008 | 3 Comments_

In Spring 2.5 it is possible to use annotations to configure all parts of a web application. Seeing annotations applied is particularly interesting in the Web layer where developers traditionally rely on the SimpleFormController and the MultiActionController for form page handling. The introduction of annotations has created a third option, one that does not require a base class while still offering the flexibility of previous approaches.

While it is easy to see the elegance in using annotated POJOs to implement Controllers, the benefit is not as clear in the area of URL-to-Controller mappings. What would it be like to define all your URL mapping rules using annotations? Indeed this is one area in which centralized configuration has worked well for developers of Spring MVC applications.

Lets review the Spring 2.0 options for URL-to-Controller mappings:

1.  The bean name approach (BeanNameUrlHandlerMapping). The name of each bean holds the path it serves. Despite its simplicity, this approach can scale if combined with coarse-grained servlet mappings (e.g. "/browse/\*", "/order/\*", "/reports/\*", etc.).
2.  The centralized approach (SimpleUrlHandlerMapping). A central place to see URL patterns and controller mappings.
3.  The convention over configuration approach (ClassNameUrlHandlerMapping). Matches URL paths to class names. Hence "/accounts/\*" is mapped to a MultiActionController of type AccountsController. No explicit mappings are required.

Spring 2.5 adds a fourth option in the form of the @RequestMapping annotation, which can be placed on a class or a method. When placed on both the method-level mapping narrows the class-level mapping.

Here is a SimpleFormController-style workflow in which the method-level mapping is narrowed down by request method:

```java
Copy
@Controller 
@RequestMapping("/editAccount")
public class EditAccountController {

    @RequestMapping(method=RequestMethod.GET)
    public Account setupForm(@RequestParam("id") Long id) {
        ...
        return account;
    }

    @RequestMapping(method=RequestMethod.POST)
    public String processSubmit(Account account) {
        ...
        return "redirect:/success.htm";
    }
}
```

And here is a MultiActionController-style delegation in which the method-level mapping is narrowed down by both request method and relative path:

```java
Copy
@Controller 
@RequestMapping("/accounts/*")
public class AccountsController {

    @RequestMapping(method=RequestMethod.GET)
    public List<Account> list() {...}

    @RequestMapping(method=RequestMethod.GET)
    public Account show(@RequestParam("id") Long id) {...}

    @RequestMapping(method=RequestMethod.POST)
    public String create(Account account) {...}
    ... 
}
```

As you can see, with the "/accounts/\*" mapping embedded in the code it can be difficult to enforce an application-wide convention for Controller mapping. At least not without some rigorous discipline. Fortunately there is a way to combine an external HandlerMapping with method-level @RequestMapping annotations. Below is an example illustrating how this approach works:

```xml
Copy
<bean class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
    <property name="mappings">
        <value>
            /accounts/*=accountsController
        </value>
    <property>
</bean>
```

```java
Copy
@Controller
public class AccountsController {

    @RequestMapping(method=RequestMethod.GET)
    public List<Account> list() {...}

    @RequestMapping(method=RequestMethod.GET)
    public Account show(@RequestParam("id") Long id) {...}

    @RequestMapping(method=RequestMethod.POST)
    public String create(Account account) {...}
    ... 
}
```

Here the controller mapping resides in a central XML-based mapping while the action method mapping is specified through annotations. This approach can be described as a POJO MultiActionController with annotation-based method dispatching. In fact in a recent communication within SpringSource, Juergen pointed out that providing an annotation-based alternative to the MultiActionController was an explicit Spring 2.5 design goal so I guess there are no surprises there! Furthermore, there is work under way to allow you to combine method-level @RequestMapping annotations with the ControllerClassNameHandlerMapping convention (see [SPR-4129](http://jira.springframework.org/browse/SPR-4129)).

So what's the significance of all this?

An all XML-based approach to configuring the Web layer can get noisy, but centralized, externalized configuration does have its place. Extending from framework-specific base classes with deep inheritance hierarchies to implement control logic can also get noisy, and we generally believe that should be avoided if you can help it. In Spring MVC 2.5, annotations can help address both of these concerns by encapsulating method mapping rules inside your Controller class and also allowing you to implement your Controllers as POJOs. Furthermore, the hybrid approach above shows how you can get the best of externalized configuration and annotation-based configuration.