---
title: JavaConfig support in the Spring Tool Suite
source: https://spring.io/blog/2013/07/18/javaconfig-support-in-the-spring-tool-suite
scraped: 2026-02-24T08:01:42.830Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Martin Lippert |  July 18, 2013 | 1 Comment
---

# JavaConfig support in the Spring Tool Suite

_Engineering | Martin Lippert |  July 18, 2013 | 1 Comment_

Spring applications that use JavaConfig instead of XML become more and more popular. Today we would like to show you the new features in the latest Spring Tool Suite 3.3.0 release that makes it easier for you to program Spring applications using annotations and JavaConfig instead of XML.

### [](#project-configuration)Project configuration

Let's assume you implement a web application based on Spring and JavaConfig. A common practice would be to have a base @Configuration class where you define the common base Spring configuration in your application. That might look like this:

```java
Copy@Configuration
@ComponentScan 
class ApplicationConfig {
	@Autowired	private Environment env;
	...
```

In addition to that you might have an web initializer implementation for the web application that defines your common base configuration class as root config and another one (maybe an inner class of this web initializer) for the web app specific configuration:

```java
Copy
@Configuration
@Import(RepositoryRestMvcConfiguration.class)
@ComponentScan 
public static class WebConfiguration extends WebMvcConfigurationSupport {

		@Autowired Repositories repositories;
	
		@Bean public DomainClassConverter domainClassConverter() {
			return new DomainClassConverter<>(mvcConversionService()); 
		} 
		...		
```

The Spring Tool Suite now provides the option to configure those `@Configuration` classes directly as Spring configs in the preferences of the project:

[![](http://blog.springsource.org/wp-content/uploads/2013/07/javaconfig-project-configuration.png "javaconfig-project-configuration")](http://blog.springsource.org/wp-content/uploads/2013/07/javaconfig-project-configuration.png)

This is exactly the same as for XML-based Spring config files. You could even have both configured for a project, but that doesn’t seem to be a good design choice. If you have XML files as entry points into your Spring application that use the `context:component-scan` element to take `@Configuration` classes into account, you don’t need to configure those classes in the project settings as well. They are recognized by the tooling automatically.

Having the `@Configuration` classes configured in the project settings, you can browse the Spring model in the Spring explorer or the Project Explorer.

###Bean Config Sets In the same way you arrange your XML configurations into bean config sets in the tooling (to arrange them into a meaningful context for validations), you can choose to add JavaConfig classes to those config sets as well.

[![](http://blog.springsource.org/wp-content/uploads/2013/07/javaconfig-configsets.png "javaconfig-configsets")](http://blog.springsource.org/wp-content/uploads/2013/07/javaconfig-configsets.png)

This is particularly useful if you use multiple bean profiles. In that case you can configure a config set per profile to get the validations for each profile.

###Spring project settings made easy Since version 3.3.0 the Spring Tool Suite provides an easier way to configure your Spring projects for the tool support. There are new context menu actions to define @Configuration classes in the project settings, remove them again, and arrange them into bean config sets:

[![](http://blog.springsource.org/wp-content/uploads/2013/07/add-as-bean-config.png "add-as-bean-config")](http://blog.springsource.org/wp-content/uploads/2013/07/add-as-bean-config.png)

[![](http://blog.springsource.org/wp-content/uploads/2013/07/remove-as-bean-config.png "remove-as-bean-config")](http://blog.springsource.org/wp-content/uploads/2013/07/remove-as-bean-config.png)

[![](http://blog.springsource.org/wp-content/uploads/2013/07/add-to-config-set.png "add-to-config-set")](http://blog.springsource.org/wp-content/uploads/2013/07/add-to-config-set.png)

### [](#validations)Validations

The Spring tooling runs a lot of validations against your Spring code and your Spring configuration files in the background as part of the project build. If you have your @Configuration classes defined in your project settings, those validations are running against those configs as well. This provides you, for example, validation against the @Autowired annotation. Whenever you have no matching bean defined in your project that would get injected at runtime, the tooling will flag this as a warning.

[![](http://blog.springsource.org/wp-content/uploads/2013/07/autowire-validation-1.png "autowire-validation-1")](http://blog.springsource.org/wp-content/uploads/2013/07/autowire-validation-1.png)

[![](http://blog.springsource.org/wp-content/uploads/2013/07/autowire-validation-21.png "autowire-validation-2")](http://blog.springsource.org/wp-content/uploads/2013/07/autowire-validation-21.png)

### [](#content-assist-for-spring-annotations)Content assist for Spring annotations

While Eclipse already provides good content assist for many situations, it doesn’t know about specifics of the annotations you use to configure Spring. But we do. Therefore we started to support spring-specific annotations with improved content assist. As a starting point, from now on, you get content assist for type names and package names in the @ComponentScan annotation when defining base packages and/or `basePackageType` attributes.

[![](http://blog.springsource.org/wp-content/uploads/2013/07/class-content-assist.png "class-content-assist")](http://blog.springsource.org/wp-content/uploads/2013/07/class-content-assist.png)[![](http://blog.springsource.org/wp-content/uploads/2013/07/package-content-assist.png "package-content-assist")](http://blog.springsource.org/wp-content/uploads/2013/07/package-content-assist.png)

We will continue this work and add more support of this kind. If you would like to see something specific being implemented in this area, let us know. Your feedback is welcome.

### [](#navigation-for-autowired)Navigation for `@Autowired`

Eclipse provides a nice feature called hyperlinking. It turns class names and all kinds of elements of your Java code into hyperlinks if you hold down the command key and hover over that element. We enhanced this quick navigation to provide direct access to injected beans for `@Autowired` fields and parameters. This way you can directly jump to the bean definition of the bean that gets injected into this `@Autowired` target.

[![](http://blog.springsource.org/wp-content/uploads/2013/07/autowire_field.png "autowire_field")](http://blog.springsource.org/wp-content/uploads/2013/07/autowire_field.png)

### [](#whats-next)What’s next

At the moment you have to define `@Configuration` classes in your project settings manually. This will change in future versions. We are working on automation in this area.In addition to that we also look into advanced support for `@Enable*` annotations. The goal is to provide more detailed information about what beans get created because of these annotations.

### [](#wrapping-up)Wrapping up

The Spring Tool Suite 3.3.0 supports JavaConfig based Spring projects as a first-class citizen and we hope you enjoy it. If you have any feedback, please do not hesitate to contact us [at the forum](http://forum.springsource.org/forumdisplay.php?32-SpringSource-Tool-Suite) or file a ticket (not just for bugs, but for enhancement requests as well) in our [JIRA for STS](https://issuetracker.springsource.com/browse/STS). Your feedback is always very welcome and highly appreciated. Enjoy the new version of the Spring Tool Suite.