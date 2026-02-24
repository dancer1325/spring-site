---
title: Spring Security 3.0.0.M1 Released
source: https://spring.io/blog/2009/06/03/spring-security-3-0-0-m1-released
scraped: 2026-02-24T09:07:15.516Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Luke Taylor |  June 03, 2009 | 0 Comments
---

# Spring Security 3.0.0.M1 Released

_Engineering | Luke Taylor |  June 03, 2009 | 0 Comments_

We're pleased to announce that the first milestone of Spring Security 3.0 is now available for [download](http://www.springsource.com/download). The release is also available through the Maven milestone repository at [http://maven.springframework.org/milestone](http://maven.springframework.org/milestone). As with Spring 3.0, this is the first release which requires a minimum JDK 1.5 to run and also require Spring 3.0, so you should get hold of the Spring 3.0.0.M3 release if you aren't already using it. So what's new and what has changed in this release?

## Expression–Based Access Control

This release is the first to include a preview of our [Spring-EL](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/ch07.html) based authorization support. You can now use expressions both in method annotations and for web security. This opens up many new possibilities when compared to the familiar attributes and voter–based mechanism. A simple example will probably be a good start. Here's one for a web application, using the security namespace:

```xml
Copy
  <http use-expressions="true">
     <intercept-url pattern="/secure/**" access="hasRole('ROLE_SUPERVISOR') and hasIpAddress('192.168.1.0/24')" />
     ...
  </http>;
```

The built–in hasRole('ROLE\_SUPERVISOR') expression is nothing fancy – it just checks the current user's authority list and returns true if they have the given role. But we've added an extra expression to specify that the IP address making the request must be in the range defined by the subnet/mask argument. This may or may not be of practical use depending on your network setup, but it illustrates how powerful the expression-based approach is. The list of security attributes which was previously contained in the "access" XML attribute has been replaced by a boolean expression. If it evaluates to "true" access will be granted. If it evaluates to "false", access will be denied.

### @Pre and @Post Annotations

Method security is a bit more complicated than the simple allow or deny that we've just seen for web requests. To provide more comprehensive support for the use of expressions with method security, we've introduced four new annotations which can contain expression attributes which are applied before and after the method invocation. To enable support for them, there's a new attribute on the global-method-security namespace element:

```xml
Copy
    <global-method-security pre-post-annotations="enabled"/>
```

The most obviously useful annotation is @PreAuthorize which controls whether a method can actually be invoked or not. For example (from the "Contacts" sample application):

```java
Copy
    @PreAuthorize("hasRole('ROLE_USER')")
    public void create(Contact contact);
```

which means that access will only be allowed for users with the role "ROLE\_USER". Nothing new here. But what about:

```java
Copy  
    @PreAuthorize("hasPermission(#contact, 'admin')")
    public void deletePermission(Contact contact, Sid recipient, Permission permission);
```

Here we're actually using a method argument as part of the expression to decide whether the current user has the "admin" permission for the given contact. The hasPermission() expression is linked into the Spring Security ACL module through the application context (see the Contacts sample configuration for how this is achieved). You can access any of the method arguments by name as expression variables, provided your code has debug information compiled in. Any Spring-EL functionality is available within the expression, so you can also access properties on the arguments. For example, if you wanted a particular method to only allow access to a user whose username matched that of the contact, you could write

```java
Copy
    @PreAuthorize("#contact.name == principal.name)")
    public void doSomething(Contact contact);
```

Here we are accessing another built–in expression, which is the "principal" of the current Spring Security Authentication object obtained from the security context. You can also access the Authentication object itself directly using the expression name "authentication". Authorization can also be performed after the method call has taken place, using the @PostAuthorize annotation. To access the return value from a method, use the built–in name "returnObject" in the expression.

#### Filtering

As you may already be aware, Spring Security also supports filtering of collections and arrays and this can now be achieved using expressions. This is most commonly performed on the return value of a method. For example:

```java
Copy    
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostFilter("hasPermission(filterObject, 'read') or hasPermission(filterObject, 'admin')")
    public List getAll();
```

When used with the @PostFilter annotation, Spring Security iterates through the returned collection and removes any elements for which the supplied expression is false. The name "filterObject" refers to the current object in the collection. You can also filter before the method call, using @PreFilter, though this is probably a less common requirement. The syntax is just the same, but if there is more than one argument which is a collection type then you have to select one by name using the "filterTarget" property of this annotation.

## Codebase Restructuring

In versions prior to 3.0, most of Spring Security's code was contained in the spring-security-core jar. Over the years, as more features have been added, it has become more difficult to track the dependencies both within the codebase itself and also on third party libraries. For example, it's hard for a user to determine which of the listed dependencies in the core Maven pom.xml are required for a particular set of features within the framework. In addition, the original package structure and class names have been around since the framework's origins as Acegi Security in 2003, when only a few basic authentication mechanisms were supported. As the amount of code has increased and the feature set has expanded, this package structure has begun to show its age.

![Spring Security 2.0.4 Package Structure](http://blog.springsource.com/wp-content/uploads/2009/06/spring-security-204.png "Spring Security 2.0.4 Package Structure")

Spring Security 2.0.4 Package Structure

The diagram above shows the high-level package diagram of the core, core-tiger, cas-client and acl jars in the 2.0.4 release, as produced by [Structure101](http://www.headwaysoftware.com/products/structure101/). You don't have to be an expert in code structure to realize that there is a bit of a problem here. There are a lot of circular references and no clear overall dependency structure within the packages. There are also some issues with packages being split across jar boundaries, which can cause problems with OSGi. This fragility in the code structure would likely have caused a maintenance overhead as Spring Security evolved, so the decision was made to restructure the code for the 3.0 release to give us a stable base for future development. Let's take a look at how things are now organized.

### Project Jars

The first thing we did was split the core out into several jars. The spring-security-core jar now contains only basic authentication and access-control code and is much cleaner. It has no dependencies on LDAP or the servlet API, for example, and there are now separate jars for web-specific code and for LDAP. We've also split out the namespace parsing code out int a separate jar, as it depends on most of the other jars and doesn't expose any public APIs that you are likely to use directly in your application. You only need to use it if you are using Spring Security namespace configuration in your application context XML files. The main project jars are shown in the following table.

Jar Name

Description

When to use

Root Package(s)

spring-security-core

Core authentication and access-contol classes and interfaces. Remoting support and basic provisioning APIs.

Required by any application which uses Spring Security. Supports standalone applications, remote clients, method (service layer) security and JDBC user provisioning.

`org.springframework.security.core`, `org.springframework.security.access`, `org.springframework.security.authentication`, `org.springframework.security.provisioning`, `org.springframework.security.remoting`

spring-security-web

Filters and other web-security infrastructure and related code. Anything with a servlet API dependency.

If you require Spring Security web authentication services and URL-based access-control

`org.springframework.security.web`

spring-security-config

Namespace parsing code.

If you are using the Spring Security XML namespace.

`org.springframework.security.config`

spring-security-ldap

LDAP authentication and provisioning code.

If you need to use LDAP authentication or manage LDAP user entries.

`org.springframework.security.ldap`

spring-security-acl

Domain object ACL implementation.

If you need to apply security to specific domain object instances within your application.

`org.springframework.security.acls`

spring-security-cas-client

Spring Security's CAS client integration.

If you want to use Spring Security web authentication with a CAS single sign-on server.

`org.springframework.security.cas`

spring-security-openid

OpenID web authentication support.

If you need to authenticate users against an external OpenID server.

`org.springframework.security.openid`

There is now a clearer separation of concerns at the jar level. For example, you only need the web jar (and its transitive dependencies) if you are writing a web application. This also makes the code easier to navigate and understand. The dependencies between the Spring Security 3.0 jars which now make up the same set of code we looked at for version 2.0.4 above are shown below

![Spring Security 3.0 jars](http://blog.springsource.com/wp-content/uploads/2009/06/spring-security-300m2-jars.png "Spring Security 3.0 jars")

Spring Security 3.0.0.M1 Jar Dependencies

### Package Structure

The package layout for these jars is show below. As you can see, there are no longer any circular references and the structure is much clearer.

![Spring Security 3.0.0.M1 Package Structure](http://blog.springsource.com/wp-content/uploads/2009/06/spring-security-300m1.png "Spring Security 3.0.0.M1 Package Structure")

Spring Security 3.0.0.M1 Package Structure

The `core` package and sub packages contain the basic classes and interfaces which are used throughout the framework and the other two main packages within the core jar are `authentication` and `access`. The `access` package containst access-control/authorization code such as the `AccessDecisionManager` and related voter-based implementations, the interception and method security infrastructure, annotation classes and support for Spring Security 3.0's expression-based access control. The `authentication` package contains the `AuthenticationManager` and related classes (such as authentication exception classes), the simple DAO-based authentication provider and password-encoders.

## Other Miscellaneous Changes

### Renamed Classes

Some of the class names in the codebase were also starting to show their age. For example, AbstractProcessingFilter is now AbstractAuthenticationProcessingFilter, and its most common concrete subclass AuthenticationProcessingFilter is now UsernamePasswordAuthenticationProcessingFilter, since there are now many filters in the framework which process authentication requests. Its corresponding AuthenticationEntryPoint is now LoginUrlAuthenticationEntryPoint. The obscurely named ObjectDefinitionSource has been renamed to SecurityMetadataSource, and the corresponding properties on AbstractSecurityInterceptor have been similarly renamed. Implementing classes and sub–interfaces have also been similarly renamed. HttpSessionContextIntegrationFilter is now SecurityContextPersistenceFilter and has a pluggable strategy to control how it stores the security context – it doesn't have to be stored in the HttpSession.

### Redirection/Forwarding on Authentication Success or Failure

Another problem with AbstractProcessingFilter was the number of different ways of controlling the destination the browser was redirected to after a successful or failed authentication. There was a mix of properties and strategies which were used. In Spring Security 3.0.0.M1, these have been replaced by two separate strategies AuthenticationSuccessHandler and AuthenticationFailureHandler which are fully responsible for handling the destination. Check out the Javadoc for these interfaces and have a look at issue [SEC-745](http://jira.springsource.org/browse/SEC-745) for more information.

### Reference Manual and Web Site Updates

Obviously, the 3.0 reference manual is still a work in progress :-), but we have been making some updates. The [Namespace](http://static.springframework.org/spring-security/site/docs/3.0.x/reference/ns-config.html) and [Technical Overview](http://static.springframework.org/spring-security/site/docs/3.0.x/reference/technical-overview.html) chapters should provide a reasonable overview of the framework. Please feel free to submit any ideas or patches through the issue tracker. Likewise if you spot any mistakes, of course.

The project web site has also been updated. The [FAQ](http://static.springframework.org/spring-security/site/faq.html) has some new questions and there's a new page with links to presentation videos and online articles. Please take a look and let us know if there's anything you'd like to see there (an external Security links page is already in the works).

## Conclusion

There's still a lot of work to be done for Spring Security 3, but we hope you'll try out this milestone release and provide some feedback on the new expression language support. You can find a full list of the changes to date in the [Jira ChangeLog](http://jira.springsource.org/browse/SEC?report=com.atlassian.jira.plugin.system.project:changelog-panel) and you'll also find links to the current project roadmap there.

The [Community Forum](http://forum.springsource.org/forumdisplay.php?f=33) is the best place to ask questions on using Spring Security or to start discussions on new features. Alternatively, if you find something amiss, you can raise a [Jira Issue](http://jira.springsource.org/browse/SEC).

We hope you enjoy using [Spring Security](http://static.springframework.org/spring-security/site).