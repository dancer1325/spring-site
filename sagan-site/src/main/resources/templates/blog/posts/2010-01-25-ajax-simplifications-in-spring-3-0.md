---
title: Ajax Simplifications in Spring 3.0
source: https://spring.io/blog/2010/01/25/ajax-simplifications-in-spring-3-0
scraped: 2026-02-24T09:00:05.372Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  January 25, 2010 | 0 Comments
---

# Ajax Simplifications in Spring 3.0

_Engineering | Keith Donald |  January 25, 2010 | 0 Comments_

In my [last entry](http://blog.springsource.com/2009/12/21/mvc-simplifications-in-spring-3-0/), I walked you through several enhancements in Spring 3 for web application development. A number of you expressed interest in a follow-up entry focused on Ajax remoting. Spring 3 provides a lot in this area to take advantage of. Read on, and I'll walk you through it.

## Spring and Ajax Overview

For the purposes of this article, when I say Ajax, I'm talking about the web browser's ability to communicate with a web server asynchronously using JavaScript. On the server-side, Spring provides the programming model for defining web services, including services consumed by JavaScript clients. On the client-side, nobody rolls their own Ajax framework these days, either. Most use an established JavaScript framework such as [jQuery](http://www.jquery.com) or [Dojo](http://dojotoolkit.org).

## Support for Ajax Clients

Until version 3, Spring did not ship support for Ajax remoting. That didn't stop our users from extending Spring to get it, or integrating other options themselves. Some used DWR, especially in the period before the rise of the JavaScript frameworks. More recently, REST-style remoting with JSON as the data exchange format has become more popular, especially because jQuery and co. [make it so easy to do](http://api.jquery.com/jQuery.getJSON).

Now that Spring 3 is out, official support for Ajax remoting with JSON is provided as part of Spring MVC. This includes support for generating JSON responses and binding JSON requests using the Spring MVC @Controller programming model. In this article, I'm going to focus on using this support to implement several Ajax use cases. Like my last post, I'll do this by walking you through a sample application you can experiment with yourself.

## MVC Ajax Sample

[mvc-ajax](https://src.springframework.org/svn/spring-samples/mvc-ajax/trunk/) has been designed to illustrate Spring MVC's JSON support. The project is available in our [spring-samples](https://src.springframework.org/svn/spring-samples/) Subversion repository, is buildable with Maven, and is importable into [STS](http://www.springsource.com/products/sts) / Eclipse. mvc-ajax has the same structure as the mvc-basic project presented in my [previous entry](http://blog.springsource.com/2009/12/21/mvc-simplifications-in-spring-3-0/). In fact, the Spring configuration is identical between the two.

Start your review by deploying the project to your servlet container and accessing the welcome page at localhost:8080/mvc-ajax. Since I use STS, I did this by first importing the project into the IDE, then deploying it to the built-in Tomcat / tc-server instance.

## Getting JSON from the Server

From the welcome page, activate the "Ajax @Controller Example" link. You will see a form to create a new Account. When you tab out of the Name field, your browser will ask the server if the name you just entered is available. If it is not, an error message will be displayed and the form will remain disabled until you enter a name that is available. The client-side JavaScript handling this resides in /WEB-INF/views/account/createForm.jsp and looks like:

```javascript
Copy
$(document).ready(function() {
    // check name availability on focus lost
    $('#name').blur(function() {
        checkAvailability();
    });
});

function checkAvailability() {
    $.getJSON("account/availability", { name: $('#name').val() }, function(availability) {
        if (availability.available) {
            fieldValidated("name", { valid : true });
        } else {
            fieldValidated("name", { valid : false,
                message : $('#name').val() + " is not available, try " + availability.suggestions });
        }
    });
}
```

Nothing Spring-specific here, just standard jQuery JavaScript.

On the server-side, the Controller for the account/availability resource is standard Java with some Spring MVC annotations:

```java
Copy
@RequestMapping(value="/availability", method=RequestMethod.GET)
public @ResponseBody AvailabilityStatus getAvailability(@RequestParam String name) {
    for (Account a : accounts.values()) {
        if (a.getName().equals(name)) {
            return AvailabilityStatus.notAvailable(name);
        }
    }
    return AvailabilityStatus.available();
}
```

AvailabilityStatus is a plain Java Value Object with two properties: an availability flag that tells the client if the user name is available, and an array of alternatives to suggest if the name you want is not available. The @ResponseBody annotation instructs Spring MVC to serialize the AvailabilityStatus to the client. Spring MVC automatically serializes to JSON because the client accepts that content type.

Underneath the covers, Spring MVC delegates to a [HttpMessageConverter](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/http/converter/HttpMessageConverter.html) to perform the serialization. In this case, Spring MVC invokes a [MappingJacksonHttpMessageConverter](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/http/converter/json/MappingJacksonHttpMessageConverter.html) built on the [Jackson](http://jackson.codehaus.org/) JSON processor. This implementation is enabled automatically when you use the [mvc:annotation-driven](https://src.springframework.org/svn/spring-samples/mvc-ajax/trunk/src/main/webapp/WEB-INF/spring/mvc-config.xml) configuration element with Jackson present in your classpath.

Pretty cool, huh? Try creating an Account, then creating another one with the same name. You should see an error message suggesting alternate names. Turn on Firefox's Firebug or Safari's Web Inspector to debug the asynchronous interaction.

## Posting JSON to the Server

Spring MVC also provides support for sending JSON to the server. I have found the need for this to be less common, simply because posting form parameters is often sufficient. Nevertheless, [JSON](http://www.json.org) provides a flexible data-interchange format that richer JavaScript clients can conveniently work with. The ability to map JSON to a server-side Java Object for processing can be a useful feature in those cases.

In the sample, a JavaScript event handler intercepts the form submit event and posts the form data as JSON. The server returns the id of the newly created Account, which is then used to display a modal confirmation dialog:

```javascript
Copy
$("#account").submit(function() {
    var account = $(this).serializeObject();
    $.postJSON("account", account, function(data) {
        $("#assignedId").val(data.id);
        showPopup();
    });
    return false;
});
```

On the server-side, the Controller is more standard Java with Spring MVC annotations:

```java
Copy
@RequestMapping(method=RequestMethod.POST)
public @ResponseBody Map<String, ? extends Object> create(@RequestBody Account account, HttpServletResponse response) {
    Set<ConstraintViolation<Account>> failures = validator.validate(account);
    if (!failures.isEmpty()) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return validationMessages(failures);
    } else {
        accounts.put(account.assignId(), account);
        return Collections.singletonMap("id", account.getId());
    }
}
```

Here, the @RequestBody annotation instructs Spring MVC to map the body of the HTTP request to an Account object. Spring MVC knows to map from JSON because the client set the request Content Type to application/json.

The create method also validates the Account object. If there are validation errors, a HTTP 400 is returned with the error messages, otherwise a HTTP 200 is returned with the assigned account ID.

## Summary

Spring 3 provides first-class Ajax support with JSON as part of the Spring MVC module. This includes support for generating JSON responses and binding JSON requests using the Spring MVC @Controller programming model in conjunction with the Jackson JSON processor. In this article, I showed you how this support works. I hope you found this post useful, and look forward to hearing more of your experiences putting Spring 3 to work in your own applications!