---
title: Spring 3 Type Conversion and Validation
source: https://spring.io/blog/2009/11/17/spring-3-type-conversion-and-validation
scraped: 2026-02-24T09:02:17.523Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  November 17, 2009 | 1 Comment
---

# Spring 3 Type Conversion and Validation

_Engineering | Keith Donald |  November 17, 2009 | 1 Comment_

The Spring 3 final release is *right around the corner*, and it's going to be a great release. In this blog entry, I will take you through some of Spring 3's type conversion and validation enhancements. Whether you are developing a traditional web application, a desktop application, or a "next-generation" RIA, data binding, type conversion, and validation are important areas. As you'll see in this entry, Spring 3 gives you a significant upgrade in each of these areas while preserving backwards compatibility with previous releases.

### New System Goals

Before I get into features, I'd first like to highlight the goals we had when we set out to improve Spring 3's data binding system:

1.  Provide a stateless, strongly-typed Type Converter SPI that supercedes JavaBean PropertyEditors
2.  Provide a unified Type Conversion API to use anywhere conversion is required, including Spring's DataBinder and Expression Language
3.  Allow for type conversion to be driven by Java Annotation metadata
4.  Simplify by registering sensible defaults and applying convention-over-configuration

As Spring 3 final approaches, I believe we have delivered on each of the goals. Read on and you be the judge of that.

### Features

The first environment that takes full advantage of the new type conversion system is Spring MVC, which I'll pull from to demonstrate the new features. This starts with the new Spring MVC 3 configuration namespace:

```xml
Copy
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:mvc="http://www.springframework.org/schema/mvc"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
            http://www.springframework.org/schema/mvc
            http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd">

    <mvc:annotation-driven />

</beans>
```

The preceding minimal configuration causes Spring to automatically install default type converters that localize Number and Date fields, including full support for the popular Joda Time library if it is present on your classpath. In addition, Spring automatically enables annotation-driven declarative validation if a JSR-303 provider, such as Hibernate Validator, is present on your classpath.

Now when you bind to a field, that field will be printed and parsed for the user's locale using a sensible default format. To illustrate, consider the following model:

```java
Copy
public class Account {

    private Date activationDate = new Date(1258466400);

    private BigDecimal balance = new BigDecimal("3000.25");
}
```

... printed on a form for users in the US and DE Locales:

Locale.US

Locale.DE

Activation Date: 

Balance: 

Activation Date: 

Balance: 

### Overriding Defaults with Annotations

Often you need to format a field in a manner that differs from the default format. In the previous example, you probably want the **activationDate** field to be formatted using a short date format, and the **balance** field to be formatted using a currency format. In previous versions of Spring, you would register a custom PropertyEditor in your Controller to achieve this. In Spring 3, you simply annotate your fields:

```java
Copy
private class Account {

    @DateTimeFormat(style="S-")
    private Date activationDate = new Date(1258466400);

    @NumberFormat(style=Style.CURRENCY)
    private BigDecimal balance = new BigDecimal("3000.25");
}
```

With the annotation overrides, the following is printed for the US and DE Locales:

Locale.US

Locale.DE

Activation Date: 

Balance: 

Activation Date: 

Balance: 

#### Parameter Annotations

Annotation-driven overrides can also be applied to method parameters. Consider the following Controller method that fetches upcoming appointments for a specific day, where the day is a URL path variable encoded in ISO date format:

```java
Copy
    @RequestMapping(value = "/appointments/{day}", method = RequestMethod.GET)
    public String getAppointmentsForDay(@PathVariable @DateTimeFormat(iso=ISO.DATE) Date day) {
        ...
    }
```

Sending a GET request to /appointments/2009-11-17 fetches all Appointments on November 17th, 2009. Setting the @DateTimeFormat **iso** attribute to **ISO.DATE** instructs Spring to parse the incoming date string as an ISO Date (yyyy-mm-dd).

### Validation

It is common to validate a model after binding user input to it. Spring 3 provides support for declarative validation with JSR-303. This support is enabled automatically if a JSR-303 provider, such as Hibernate Validator, is present on your classpath. When enabled, you can trigger validation simply by annotating a Controller method parameter with the @Valid annotation:

```java
Copy
    @RequestMapping(value = "/appointments", method = RequestMethod.POST)
    public String add(@Valid AppointmentForm form, BindingResult result) {
        ....
    }

    static class AppointmentForm {

        @NotNull @Future
        private Date date;
    }
```

After binding incoming POST parameters, the AppointmentForm will be validated; in this case, to verify the date field value is not null and occurs in the future.

### Convention Over Configuration

Finally, consider how the principle of *convention over configuration* can be applied to type conversion. In a business application, you will often define your own custom field types. In previous versions of Spring, to format such types you would create a custom PropertyEditor implementation and register it in your Controller. With Spring 3, in most cases you simply can adhere to the following convention:

1.  Define a static valueOf(String) method or Constructor(String) to parse your value from its String representation
2.  Implement toString() to print your value for display

Consider a SocialSecurityNumber type that adheres to this convention:

```java
Copy
    public class SocialSecurityNumber {

        @Size(9)
        @Mask("###-##-####")
        private String value;

        public SocialSecurityNumber(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }
```

When a SocialSecurityNumber field is printed for display, toString() will be called; when a client value is parsed, the Constructor will be called. No separate Formatter or PropertyEditor implementation is required.

### Summary

This entry has covered some of the new Spring 3 type conversion and validation features. To learn more, including how to implement your own type converters, checkout the [Spring 3 Reference Guide](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/validation.html#core-convert). Also, watch for the release of the revised Petclinic 3 sample application in the coming weeks (this sample app demonstrates all the features highlighted here and is currently available for early access in our SVN repo [here](https://src.springframework.org/svn/spring-samples/petclinic/trunk/)) .

I am excited about the foundation these new capabilities provide us moving forward! Please do let me know about your experiences applying and extending these features, and keep the feedback and ideas coming at [jira.springframework.org](http://jira.springframework.org).