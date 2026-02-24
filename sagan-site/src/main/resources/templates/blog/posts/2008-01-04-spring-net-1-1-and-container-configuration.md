---
title: Spring .NET 1.1 and container configuration
source: https://spring.io/blog/2008/01/04/spring-net-1-1-and-container-configuration
scraped: 2026-02-24T09:22:08.366Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Pollack |  January 04, 2008 | 0 Comments
---

# Spring .NET 1.1 and container configuration

_Engineering | Mark Pollack |  January 04, 2008 | 0 Comments_

It has been quite a year for Spring.NET. We have gone through two milestone and two release candidates before the GA release in December. The first chunks of code for the 1.1 release were made way back in late 2004 by Aleks Seovic who started work on the ASP.NET framework. In short, it has been a long time in the making. Being the end of year, a natural time for reflection both past and present, I'd like to say thanks to the other members of the project and the Spring.NET community for all their contributions and support. I'm looking forward to a great 2008!

The feature set of Spring.NET 1.1 is quite broad. An IoC container for Dependency Injection, AOP, ASP.NET framework, declarative transaction management and [more](http://www.springframework.net/overview.html). However, the biggest bang for the buck you can get to improve the structure and testability of your code is to add Dependency Injection and AOP into your proverbial developer tool chest. Dependency Injection is the more foundational technology of the two and I’d like to add some addition bits of info on the options you have to configure the Spring.NET container.

Clearly the most common way to configure the container is via XML. XML, while offering lots of flexibility, is verbose and everyone has a good time venting over beers about how much they hate XML configuration files (Spring or otherwise). Writing a custom can help greatly reduce the verbosity, removing much of the boilerplate XML and presenting attributes that focus on a particular domain. For example Spring.NET provides this for transaction management and AOP configuration. However, good news on the non-XML configuration front is that Spring.NET will be adding attribute based DI and auto detection of annotated classes in assemblies in its next release. As you might expect, the functionality offered will be quite similar to what is in Spring Java (see [here](http://static.springframework.org/spring/docs/2.5.x/reference/beans.html#beans-annotation-config) and [here](http://static.springframework.org/spring/docs/2.5.x/reference/beans.html#beans-classpath-scanning)) but will be adapted with a careful eye toward removing extraneous Java artifacts (such as JSR-250 attributes) and introducing new features (such as leveraging method parameter names for wire-by-name semantics) that make sense only on .NET.

One thing to keep in mind is that core container is not dependent on XML based object definitions. The container has its own internal object model for these definitions. As such, object definitions can come from a variety of formats. Particularly enticing, from what I’ve read so far, is to configure exception handling advice using the DSL toolkit. Other interesting approaches for configuration are to use a scripting language DSL (see this [post](http://blog.interface21.com/main/2007/11/29/spring-dynamic-language-support-and-a-groovy-dsl/) for Spring Java + Groovy integration). At the end of the day, the goal is to let you pick among multiple configuration approaches for the task at hand.

In the current release, there are a few features relating to programmatic control and configuration of the container that do not seem to be widely known. Here is a brief overview of these features. I’ll put more complete descriptions in the reference docs soon.

#### Configuring an existing object

The main IoC container interface, IApplicationContext, contains the method `ConfigureObject(object objectToConfigure, string objectDefnitionName)`

Based on the object definition associated with the name, the container will perform dependency injection on the passed in instance. This is particularly useful when you need to create an object at runtime in response to a user request. In this case you typically pass into the constructor some data that is unique to the situation and let the container configure the rest of the objects dependencies that are common to all user requests.

#### Registering an existing object as a singleton

This functionality is defined on a sub-interface of IApplicationContext, namely IConfigurableApplicationContext. The calling code looks like the following

`((IConfigurableApplicationContext) applicationContext).ObjectFactory.RegisterSingleton("ObjectB", myObjectBInstance);`

The object registered will not be modified; it is simply stored as-is under the provided name. However, other objects may refer to this registered object as a dependency.

#### Retrieving objects by name and type

Retrieving objects by name is straightforward

`object  o = applicationContext.GetObject("AccountManager")`

and then casting to the appropriate type. You can also ask for object by type

`IDictionary dict = context.GetObjectsOfType(typeof (IAccountManager));`

These API calls need some TLC by adding making them generic as well as providing a convenience method to get a single object of the specified type instead of a collection.

#### Programmatic configuration of the container

The class GenericApplicationContext is an IoC container that does not assume any specific object definition format. You can load it up with XML based object definitions from embedded resource like so

`GenericApplicationContext ctx = new GenericApplicationContext();`

`IObjectDefinitionReader objectDefinitionReader = new XmlObjectDefinitionReader(ctx); objectDefinitionReader.LoadObjectDefinitions("assembly://MovieFinder/AppContextContribution.xml"); `

You can then add to the context other object definitions built using ObjectDefinitionBuilder. ObjectDefinitionBuilder offers a simple fluent interface to simplify the creation of object definitions. As such, ObjectDefinitionBuilder lets you chain together method calls to create an object definition that roughly correspond to the elements you are familiar with in Spring XML.

`IObjectDefinitionFactory objectDefinitionFactory = new DefaultObjectDefinitionFactory();`

`   ObjectDefinitionBuilder builder = ObjectDefinitionBuilder.RootObjectDefinition(objectDefinitionFactory, typeof(ColonDelimitedMovieFinder));  builder.AddConstructorArg("movies.txt") .SetLazyInit(true);   `

`ctx.RegisterObjectDefinition("AnotherMovieFinder", builder.ObjectDefinition); // process object definitions… ctx.Refresh() `

This code is lifted from an updated ‘MovieFinder’ example which you can download from the nightly builds. As a side note, the IObjectDefinitionFactory has another alternative implementation, WebObjectDefinitionFactory, for use with ASP.NET pages and user controls, though you are quite unlikely use it in this situation.

Here is an additional artificial example using the TestObject class that shows more of the ObjectDefinitionBuilder API.

`ObjectDefinitionBuilder builder = ObjectDefinitionBuilder.RootObjectDefinition(objectDefinitionFactory, typeof (TestObject));`

`   builder.AddPropertyValue("Age", 22) .AddPropertyValue("Name", "Joe") .AddPropertyReference("Spouse", "Spouse") .SetSingleton(false);  ctx.RegisterObjectDefinition("TestObject", builder.ObjectDefinition);  builder = ObjectDefinitionBuilder.RootObjectDefinition(objectDefinitionFactory, typeof(TestObject));  IList friends = new ArrayList(); friends.Add(new TestObject("Dan", 34)); friends.Add(new TestObject("Mary", 33));  builder.AddPropertyValue("Friends", friends) .AddConstructorArg("Susan") .AddConstructorArg(23) .SetSingleton(false);   `

`ctx.RegisterObjectDefinition("Spouse", builder.ObjectDefinition); `

If you already have an XML based application context, you can pass that in to the constructor of a GenericApplicationContext, which means it will acts at the latter’s parent application context in a simple root/child hierarchy. You can also register the context with the ContextRegistry under a name to provide service locator style lookup.

As is, the ObjectDefinitionBuilder API is rather ‘stringy’, meaning while it is possible to register objects for wiring ‘by-type’ it is more verbose than it needs to be. Improving the ‘fluentness’ of this API is another area for improvement in future releases.

Well, that’s all for now folks. Have a happy new year!