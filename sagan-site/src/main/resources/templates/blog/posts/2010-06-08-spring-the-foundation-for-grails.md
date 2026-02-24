---
title: Spring: the foundation for Grails
source: https://spring.io/blog/2010/06/08/spring-the-foundation-for-grails
scraped: 2026-02-24T08:56:58.320Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  June 08, 2010 | 0 Comments
---

# Spring: the foundation for Grails

_Engineering | Peter Ledbrook |  June 08, 2010 | 0 Comments_

In the SpringSource training course for Groovy & Grails, we highlight that Grails stands on the shoulders of giants. One of those giants is Spring. Without it, Grails simply wouldn't have been developed as quickly as it was. It probably wouldn't have the flexibility to integrate easily with enterprise Java systems either. Just look at the number of plugins available: many are based on Java libraries with Spring support.

In this post, I want to start by looking at how Grails uses Spring and then cover the various ways in which you can access that raw power and flexibility.

## A child of Spring

You may not be aware of this, but when you create a Grails application you are also creating a Spring MVC one. Under the hood, Grails creates a variant of Spring MVC's DispatcherServlet and configures a bunch of beans to do the heavy lifting. Of course, this means that there is a Spring context underpinning your application - one that you have access to as you'll see later.

Here are some examples of the beans you'll find if you look in the Spring context of a typical Grails application:

-   *grailsApplication* - a bean representing the current application and its resources
-   *pluginManager* - the plugin manager, which you can query for information about loaded plugins
-   *jspViewResolver* - a custom MVC view resolver for GSPs that falls back to JSPs
-   *messageSource* - source for localized messages
-   *localeResolver* - how the user's locale is determined
-   *annotationHandlerMapping* - allows the use of the @Controller annotation

That's just a few of the many beans that Grails creates. In fact, you may be surprised to learn that all your application controllers, tag libraries, domain classes and services are also beans.

In what other areas does Grails depend on Spring? Well, there's data binding for a start: Spring does all the physical binding of string data to object properties. It's not just the web layer either: GORM uses Spring's Hibernate templates for saving and querying domain classes. Perhaps most importantly, Grails uses Spring's transaction management. And as I've already alluded to, many plugins make use of the Spring integration provided with Java libraries.

So, a Grails application is really a Spring application. That raises the question of how you tap into the underlying Spring components when you need to.

## Talking to Spring

You can easily write a Grails application, even a fairly complex one, without worrying about Spring. That's great, because it means new developers don't have to learn the technology right away. But just because you don't *have* to interact with Spring directly doesn't mean that it's hard.

There are several approaches you can take and I'll look at each of them in turn.

### Services and auto wiring

The key to Spring is the creation and wiring of beans. You would normally have to provide some configuration to do this, but Grails services give you a lightweight, convention-based alternative. As I said earlier, several of the artifacts you create in a Grails application automatically become Spring beans, but it's the services that allow you the most control.

The principle is simple: create a class under grails-app/services with a suffix of Service and you will automatically get a new (singleton) Spring bean in your application. The name of that bean? Simple: the class name with a lowercase first letter. For example, the class SecurityService will result in a bean named "securityService". AuditReportService will likewise become an "auditReportService" bean.

Wiring other beans into your services (and all other core Grails artifacts) is similarly straightforward: declare a property with the same name as the bean you want. For example, say I wanted to use the "auditReportService" bean from another service (or maybe a controller). I can wire it in like this:

```groovy
Copyclass MyService {
    def auditReportService
    ...
}
```

I'm sure you'll agree that was pretty simple. It's an example of Spring's auto wiring. Grails will also wire beans by name even if you specify a type for the property.

Another useful feature of services is that they are transactional by default. This makes them a great way of abstracting away data access and building a robust architecture for your application. A typical approach is to create different "gateways" to your services: an HTML UI, an XML REST interface, remoting via RMI, etc. all calling into your services.

One final note: I said that Grails will instantiate your services as singleton beans, but you can change this behaviour on a per-service basis. Simply add a static scope property to your service class, like so:

```groovy
Copyclass MyService {
    static scope = "request"
    ...
}
```

As you can see, you get a lot of the main benefits of Spring with almost no effort when you use services. That's great, but what if you have existing classes that you want to turn into beans? Perhaps you have written them in Java, or they come packaged in a JAR file. With plain Spring, you would configure them manually. Fortunately, you can do the same in Grails.

### Manually defining beans

In the good old days, before annotations, you would create one or more bean descriptor files in XML format for your Spring application. Grails allows you to do the same with the grails-app/conf/spring/resources.xml file. There's nothing special about it, so the standard Spring documentation applies!

I have to say I'm not a big fan of writing XML any more, so I prefer an alternative bean definition format: Grails' Spring Bean DSL. Here's a very simple example of defining a report generator bean in grails-app/conf/spring/resources.groovy:

```groovy
Copybeans = {
    reportGenerator(org.example.XmlReportGenerator)
}
```

The definition starts with the name of the bean ("reportGenerator") followed by the class in parentheses ("XmlReportGenerator"). You can also configure bean and bean definition properties:

```groovy
Copybeans = {
    reportGenerator(org.example.XmlReportGenerator) { bean ->
        bean.autowire = "byName"
        prettyFormat = true
    }
}
```

OK, so it's more concise than the XML format, but is that a good enough reason to switch? Probably not for most people. The real power of the DSL comes from the fact that it's real Groovy, which means:

-   you can mix in normal Groovy code, such as conditions and loops; and
-   you can use real types for property values.

**Uodate** I have changed the example below to use the new approach for detecting the current environment.

Take this example:

```groovy
Copyimport grails.util.Environment

beans = {
    if (Environment.current == Environment.PRODUCTION) {
        // Use the real web service for production
        securityService(org.example.WsClientSecurityService) {
            endpoint = "http://..."
        }
    }
    else {
        // Use a dummy service for development and testing
        securityService(org.example.DummySecurityService)  {
            userRoles = [ peter: [ "admin", "user"], tom: [ "user" ] ]
        }
    }
}
```

It demonstrates how you can use conditions to configure different bean implementations for different Grails environments. For production "securityService" is a web service client, whereas for all other environments we use a dummy in-memory service. You can also see that it's possible to assign a literal map to a Mapproperty and the same goes for any other type too. Not only is it significantly more concise than with XML, but you are also working with real types and objects that you can manipulate at runtime.

There is more to the DSL than I have covered here, so I recommend you check out the [user guide](http://www.grails.org/doc/latest/guide/14.%20Grails%20and%20Spring.html) for more information. You will find that the DSL supports Spring namespaces, factory methods, and more.

I have covered the two most common Spring integration points for Grails, but there is another one: annotations.

### Annotations

Spring 2.5 introduced annotations for all sorts of things, such as components, Spring MVC controllers, transactions and more. You'll be glad to know that you can use those annotations in your Grails application. For example, imagine you have a Java class under src/java like so:

```java
Copypackage org.example;

@Component("securityService")
public class DummySecurityService implements SecurityService {
    ...
}
```

This should automatically become a Spring bean with the name "securityService", but that won't happen yet. One more step is required: you have to specify the packages that Grails should scan for Spring annotations. So in this example, we want the org.example package scanned. To do this, simply add the following setting to grails-app/conf/Config.groovy:

```groovy
Copygrails.spring.bean.packages = [ "org.example" ]
```

The class will now be automatically created as a Spring bean. Note that Grails scans all sub-packages as well, so the above would work even if the class were in a org.example.sub.pkg package.

As long as you specify the package via grails.spring.bean.packages, you can even add classes as controllers using the @Controller annotation. This can be helpful if you decide to migrate from Spring MVC to Grails or if a team has developed some Spring MVC controllers that you want to drop into your Grails application.

As you can see, there are enough options for defining beans in Grails to suit most people. That just leaves runtime interrogation of the Spring application context to cover.

### Runtime interaction

Many applications find it useful to talk to the Spring application context directly, be it to find all beans of a particular type or simply to retrieve a particular bean without relying on auto wiring. How do you get access to the application context?

If your class is a Spring bean, then you can simply implement the ApplicationContextAware interface. Spring will then automatically inject the context into your applicationContext property. Alternatively, you can inject the grailsApplication bean and retrieve the context via grailsApplication.mainContext.

On the other hand, if your class is not managed by Spring you have to do some manual work. It's not pretty, but you can grab the context via this snippet of code:

```groovy
Copyimport org.springframework.web.context.support.WebApplicationContextUtils
import org.codehaus.groovy.grails.web.context.ServletContextHolder
import org.springframework.context.ApplicationContext
...
def ctx = WebApplicationContextUtils.getWebApplicationContext(ServletContextHolder.servletContext)
```

Beware: you're not dealing with a single application context in Grails. The application context you get from the different techniques described above has a parent application context. That parent contains the grailsApplication, pluginManager, and other beans configured from the web-app/WEB-INF/applicationContext.xml file. You may discover code that allows you to get the application context in a different way from those just detailed, but you may end up with a reference to the parent, which doesn't contain the services, controllers, etc.

To wrap up, Grails is fundamentally a Spring application in disguise. Although it hides Spring from casual inspection, it does provide some powerful techniques to interact with Spring directly. That means you can readily take advantage of existing Java/Spring libraries and make use of a framework that makes larger applications more manageable than they would otherwise be.