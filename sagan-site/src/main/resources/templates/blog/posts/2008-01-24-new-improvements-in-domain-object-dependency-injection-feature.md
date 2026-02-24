---
title: New Improvements in Domain Object Dependency Injection Feature
source: https://spring.io/blog/2008/01/24/new-improvements-in-domain-object-dependency-injection-feature
scraped: 2026-02-24T09:21:25.068Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ramnivas Laddad |  January 24, 2008 | 1 Comment
---

# New Improvements in Domain Object Dependency Injection Feature

_Engineering | Ramnivas Laddad |  January 24, 2008 | 1 Comment_

Spring's dependency injection (DI) mechanism allows configuring beans defined in application context. What if you want to extend the same idea to non-beans? Spring's support for *domain object DI* utilizes AspectJ weaving to extend DI to any object, even if it is created by, say, a web or an ORM framework. This enables creating domain behavior rich objects, since domain objects can now collaborate with the injected objects. In this blog, I discuss the latest improvements in the Spring framework in this area.

The core idea behind domain object DI is quite simple: An AspectJ-woven aspect selects join points corresponding to *creation* or *deserialization* of any object matching certain specification. Advice to those join points inject dependencies into the object being created or deserialized. Of course, the devil is in the details. For example, how do you select join point corresponding to deserialization or how do you inject dependency only once per object? By offering a few pre-written aspects, Spring shields developers from all these details.

Currently, most Spring users use the [@Configurable](http://static.springframework.org/spring/docs/2.5.x/api/org/springframework/beans/factory/annotation/Configurable.html) annotation to designate the configurable classes. With latest improvements in upcoming Spring 2.5.2, [available starting with nightly build 379](http://static.springframework.org/downloads/nightly/snapshot-download.php?project=SPR), you have a few more options making this feature a lot more powerful. The new improvements follow the "Make simple things simple, complex things possible" principle. Depending on your familiarity with AspectJ and expected design sophistication, one of the options will serve well. Figure 1 shows the new aspect hierarchy that makes a combination of simplicity and flexibility possible.

![Domain Object Dependency Injection Aspects](http://blog.springsource.com/main/wp-content/uploads/2008/01/SpringDomainObjectDI.png)

**Figure 1: Inheritance hierarchy for domain object dependency injection aspects.**

So what does each of these aspects offer? Let's go bottom up.

## Simple things simple: AnnotationBeanConfigurerAspect

AnnotationBeanConfigurerAspect enables domain object DI without any user AspectJ code. Therefore, it is the easiest choice for many developers. With this aspect, you annotate the classes that need dependency injection with the @Configurable annotation. For example, you can have the Order class annotated as follows:

```java
Copy 
@Configurable
public class Order {
    private transient MailSender mailSender;
    
    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    public void process() {
        ... 
        mailSender.send(...);
        ...
    }
}
```

Next, you instruct Spring on how to configure objects of the Order type. The instructions follow the standard bean definition for a prototype bean as follows:

```xml
Copy
<context:spring-configured/>
    
<bean class="example.Order" scope="prototype">
    <property name="mailSender" ref="externalMailSender"/>
</bean>
    
<bean id="externalMailSender" ...>
    ...
</bean>
```

Now upon any Order creation or deserialization, Spring will set the mailSender property of the created object with the externalMailSender bean.

Spring 2.5 features a new [annotation-based configuration option](http://static.springframework.org/spring/docs/2.5.x/reference/beans.html#beans-annotation-config) that allows eliminating or reducing the attendant XML. The @Configurable annotation-based DI benefits from it as well. For example, you can mark the mailSender property as @Autowired as follows:

```java
Copy 
@Configurable
public class Order {
    private transient MailSender mailSender;
    
    @Autowired
    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    public void process() {
        ... 
        mailSender.send(...);
        ...
    }
}
```

You can get rid of even the setter by annotating the field itself, reducing the above code to:

```java
Copy 
@Configurable
public class Order {
    @Autowired private transient MailSender mailSender;
    
    public void process() {
        ... 
        mailSender.send(...);
        ...
    }
}
```

In either case, the attendant XML configuration reduces to the following (note the use of <context:annotation-config/>):

```xml
Copy
<context:spring-configured/>
    
<context:annotation-config/>
    
<bean id="externalMailSender" ...>
    ...
</bean>
```

For more details on this domain object DI option, please see [Using AspectJ to dependency inject domain objects with Spring](http://static.springframework.org/spring/docs/2.5.x/reference/aop.html#aop-atconfigurable).

## Complex things possible: AbstractInterfaceDrivenDependencyInjectionAspect

The base aspect of AnnotationBeanConfigurerAspect, AbstractInterfaceDrivenDependencyInjectionAspect, uses an interface instead of annotation to mark a configurable class. While it looks like a rather superficial change, it offers some interesting options such as using domain interfaces and annotations to designate dependency injection, improving performance of injection by bypassing reflection, and utilizing multiple aspects to configure an object.

At the design level, this aspect configures any domain object whose type implements the ConfigurableObject interface. While, having a type implement the ConfigurableObject interface directly is certainly a valid choice, an elegant alternative is to use a declare parents statement in another aspect (a subaspect of AbstractInterfaceDrivenDependencyInjectionAspect would be a logical choice). The statement would declare a configurable class as implementing the ConfigurableObject interface. This keeps your domain classes free from Spring-specific artifacts, while benefiting from the DI mechanism. Let's see an example of such usage.

Consider the Order class from the earlier section. Instead of using the @Configurable, you can let it implement a domain-specific MailSenderClient interface that signifies that it uses a MailSender.

```java
Copy 
public class Order implements MailSenderClient {
    private transient MailSender mailSender;
            
    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }
            
    public void process() {
        ... 
        mailSender.send(...);
        ...
    }
}
```

Next you write a subaspect of AbstractInterfaceDrivenDependencyInjectionAspect to inject dependencies into any MailSenderClient objects.

```java
Copy 
public aspect MailClientDependencyInjectionAspect extends 
    AbstractInterfaceDrivenDependencyInjectionAspect {
    private MailSender mailSender;
    
    declare parents: MailSenderClient implements ConfigurableObject;
            
    public pointcut inConfigurableBean() : within(MailSenderClient+);
    
    public void configureBean(Object bean) {
        ((MailSenderClient)bean).setMailSender(this.mailSender);
    }
            
    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }
}
```

There are two AspectJ constructs used in the aspect:

1.  The declare parents statement makes MailSenderClient implement the ConfigurableObject interface, making it eligible for DI through AbstractInterfaceDrivenDependencyInjectionAspect.
2.  The inConfigurableBean() selects join points only in the MailSenderClient's subtype, thus restricting aspect's applicability to only the matching types.

The configureBean() method performs injection into the bean by making direct calls to the appropriate setters. Of course, any other logic appropriate for bean configuration such as calling a multi-argument method or calling any initialization methods would work just fine. Note that direct calls used in this way avoid reflection and can yield noticeable performance improvements if the rate of domain object creation is high.

You need to configure the MailClientDependencyInjectionAspect aspect instance itself to inject its dependency--the mailSender property. The Spring way would be to create a bean for the aspect and configure it in application context:

```xml
Copy
<bean class="example.MailClientDependencyInjectionAspect" 
        factory-method="aspectOf">
    <property name="mailSender" ref="externalMailSender"/>
</bean>
    
<bean id="externalMailSender" ...>
    ...
</bean>
```

There are a few additional patterns around this aspect:

-   Using multiple aspects to configure one object (one per "client" interface, for example).
-   Using domain annotation instead of domain interface or the @Configurable annotation to designate a configurable type.
-   Using hasmethod()\-based type pattern (currently an experimental feature in AspectJ 5 that will become [a regular feature in AspectJ 6](https://bugs.eclipse.org/bugs/show_bug.cgi?id=86818)) to avoid use of DI related types or annotations.
-   Using AspectJ-based mixins to provide default implementation for the client interfaces and avoid repeated setters.

However, let's save these ideas for another blog entry.

## Flexibility when you need it: AbstractDependencyInjectionAspect

Finally, here is the most flexible base aspect. This aspect requires you to have solid understanding of the AspectJ pointcut language. However, except in extreme customization scenario (such as custom deserialization events), you won't directly create a subaspect of this base aspect. Instead, you will use one of the subaspects we discussed earlier.

The aspect declares six pointcuts that a subaspect may define:

1.  beanConstruction(Object bean): Select bean construction. Typical implementation will select object initialization join point.
2.  beanDeserialization(Object bean): Select bean deserialization. Typical implementation will select the readResolve() method that must be present in the injected object. If you are using a nonstandard deserialization (that doesn't invoke readResolve()), you would select an appropriate alternative method with this pointcut.
3.  inConfigurableBean(): Select join points in bean configurable by the defining aspect. Typical implementation will use a within() pointcut with appropriate type pattern.
4.  preConstructionConfiguration(): Select join points for beans that need dependencies injected prior to construction. The default implementation of this pointcut select no join point (beans will have dependencies injected after the constructor has run).
5.  mostSpecificSubTypeConstruction(): Select join points corresponding to the most specific subtype. Default implementation uses join point signature to determine if the constructor represents the most specific in a type hierarchy of the bean being injected. This information is then used in conjunction with the preConstructionConfiguration() pointcut to use a before or after advice for injecting dependencies.
6.  leastSpecificSuperTypeConstruction(): Select join points corresponding to the least specific supertype.

This aspect also defines an abstract method configureBean(Object bean), whose implementation should specify the logic corresponding to dependency injection.

So there you have all options to enable domain object DI in your application. If you are into DDD or otherwise need DI extended to your domain objects, you have to look at these new set of aspects. Depending on your specific needs and AspectJ knowledge, you will find one of them helpful towards creating an elegant solution.