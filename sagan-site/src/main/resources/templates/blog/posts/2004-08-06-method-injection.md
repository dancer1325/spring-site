---
title: Method Injection
source: https://spring.io/blog/2004/08/06/method-injection
scraped: 2026-02-24T09:40:56.315Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  August 06, 2004 | 2 Comments
---

# Method Injection

_Engineering | Rod Johnson |  August 06, 2004 | 2 Comments_

A couple of months ago, in the days before I had a blog, there was a discussion by [Cedric](http://www.beust.com/weblog/archives/000132.html) and [Bob](http://today.java.net/cs/user/print/au/152?x-t=full.view) about "Getter Injection."

The basic concept is that the IoC container can override abstract or concrete methods on managed objects on deployment. The container is injecting a method, such as a getter method, rather than a reference or primitive as in Setter Injection. As it happened, I was already working on a container method override mechanism for Spring 1.1, which has since been released in Spring 1.1 RC1. It's an interesting concept, and definitely part of a complete IoC container. However, I believe that the concept is more general and needs a more general name. Also, that it should only be used in a fairly narrow range of scenarios.

Why would you want to do this? Cedric's motivation was that setter methods are "useless" and that "having methods in a Java object that you will never invoke is a Design Smell." In his view, the most important methods in the objects are really the *getters*, which usually return object references saved in the setters. Thus he proposes having the container implement the getter methods, and doing away with the setters. In practice this will mean that the container will actually override getter methods defined as part of application code, as otherwise it's impossible to use them. Thus the container will end up implementing it using a similar mechanism to CMP 2.x (although hopefully any similarity will end there).

I don't really buy the "useless method" argument, because setters *will* be invoked by an IoC container using Dependency Injection, and *will* be invoked in unit tests, without any container at all. They'll be invoked by application code if the object is used outside a container. Furthermore, a getter/setter combination is a nice way of establishing defaults, in case you don't choose to configure one or more setters to be invoked: the setter is there if you need it. While I can see Cedric's motivation, there's a tradeoff here: if we get rid of the supposedly useless setters we're left with incomplete classes. If the getters are abstract, we go back to the CMP 2.x testing scenario of needing to test abstract objects. If the getters are concrete, we're routinely writing methods that are going to be overridden at runtime. Now that really is useless code, in my view. (In general, I'm not a fan of overriding concrete methods, and avoid it where possible. I think I first read that suggestion in the *UML Reference Manual* and it makes a lot of sense.) There's also an element of magic involved in "setter injection." If I can have a simple POJO, with no fancy container subclassing, I prefer it. As Cedric himself put it very well in a panel discussion at TSSS last May, "use magic only when science fails."

I think the concept should be renamed **Method Injection**, and that its value is far greater for some other--less common--scenarios.

I wouldn't use it as an alternative to Setter or Constructor Injection in typical configuration of objects using Dependency Injection. Setter methods and constructors are plain Java constructs that work very well in a container, but aren't reliant on a container. That's good. Magic methods supplied by the IoC container create a bit more of a reliance on a container, although of course it's still possible to subclass objects outside the container, and although they're still just Java.

Essentially I see Method Injection as an alternative to subclassing in some corner cases, where the superclass should be kept isolated from a container dependency, and the container can more easily implement the necessary behaviour than a regular subclass. The method in question doesn't need to be a getter method (as in Setter Injection getters), although typically it will be a method that returns something.

I see three main cases for methods implemented by the container:

They can move a container dependency out of application code. They can rely on infrastructure not known until deployment. They can customize the behaviour of legacy code for the runtime environment. However, plain old subclassing also makes sense here. Container-subclassing is also a bit more dynamic than regular subclassing. We can potentially take the one base class and deploy it in different ways without ever needing to manage source code for more than one class. However, because its magic quotient is higher than that of regular subclassing, Strategy interfaces or various alternatives, I feel that Method Injection shouldn't be used too eagerly.

The main appeal of Method Injection to me is as a way of getting rid of a container dependency I sometimes had to incur using Spring 1.0, and which will apply to any container that supports the concept of "non-singleton" or "prototype" objects. (That is, a container that gives you the option of getting a shared or new instance of an IoC-managed object on request, depending on configuration.) I love working with Spring, but I hate having to import Spring APIs for configuration.

The specific use case that caused me to implement this is when one "singleton" object configured via Spring needs to create instances of a non-singleton object--for example, a single-threaded, single-use processing object--yet wants that object to be configured using Dependency Injection, rather than just using new. For example, imagine that ThreadSafeService needs to create an instance of SingleShotHelper, which is itself configured via Dependency Injection. In Spring 1.0.x it's necessary for ThreadSafeService to implement the BeanFactoryAware lifecycle interface, save the BeanFactory reference and call

`(SingleShotHelper) beanFactory.getBean("singleShotHelper")`

each time it needs to create a helper. That works fine, it's not too hard to test (BeanFactory is a simple interface, so it's easy to mock), but it's a Spring dependency, and it would be ideal to get that bit closer to a perfectly non-invasive framework. The type cast is also a little inelegant, although no big deal.

I usually ended up with one case of this situation in maybe 10 classes. I'd sometimes refactor this to extract a method, like this:

`protected SingleShotHelper createSingleShotHelper()  {         return (SingleShotHelper) context.getBean("singleShotHelper");     }` I could now subclass to implement this and keep the Spring dependency out of the superclass, but that seemed a bit excessive.

This kind of method is an ideal candidate for being implemented by the container, not the application developer. It's returning an object the container knows about; the whole thing can actually be expressed more concisely in configuration than code (when you allow for the little bit of code needed to save the BeanFactory reference).

With the new Method Injection functionality introduced in Spring 1.1, it's possible to use an abstract (or concrete) method such as:

`protected abstract SingleShotHelper createSingleShotHelper();`

and tell the container to override that method on deployment to return a specific bean from the same or a parent factory, like this:

`<lookup-method name="createSingleShotHelper" bean="singleShotHelper" >`

The methods can be protected or public. Any number of methods can be overridden. <lookup-method> elements can be used within bean definition elements just like property or constructor-arg elements.

I see the most compelling case for Method Injection being to return the result of looking up a named object managed by the container. (Of course this is not Spring-specific: any container could implement this.) The lookup will typically be of a non-singleton bean (in Spring parlance).

This way there are no dependencies in application code on Spring or any other IoC container. A corner case closed off without needing to import a Spring API. As I said, this feature was directly motivated by requirements in a client project I'm working on, and has proven useful in practice.

Lookup methods can be combined with either Setter Injection or Constructor Injection. They don't take arguments, hence method overloading isn't an issue.

The implementation uses CGLIB to subclass the class. (It's only available if CGLIB is on the class path, to avoid making the Spring core container dependent on CGLIB.)

Spring goes a step further, allowing you to define arbitrary behaviour for the overridden method--not just a bean lookup. You might want to do this, for example, to use a generic behaviour based on the runtime infrastructure--such as transaction rollback using the Spring TransactionInterceptor class. (Of course, rollback rules should normally be used to avoid this.) Or there may be compelling cases for generic override behaviours--such as "return transactional datasource DS1 if there's an active transaction, otherwise return nontransactional datasource DS2". Again, if we can conceal this kind of logic from application code, it's a win. Here we're beyond the scope of pure "getters": we could override methods to publish an event, for example.

There are often alternatives to arbitrary container overrides, such as subclassing the class and overriding the method in the normal way (science, rather than magic), or using AOP. In the case of a bean lookup as in the example, there is a clear benefit in the container doing the override, as it eliminates dependency on a Spring API. It's also much simpler to describe in XML. With the more general case, it's necessary to have a way of resolving overloaded methods.

This is already longer than I planned--and has taken a while!--so I'll leave discussing Spring 1.1's arbitrary override mechanism (including how it resolves overloaded methods) to a future post, if anyone is interested. I'm gaining a new admiration for all those indefatigable bloggers out there like Dion and Matt Raible, who seem to blog about 3 times a day.