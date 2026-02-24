---
title: Setter injection versus constructor injection and the use of @Required
source: https://spring.io/blog/2007/07/11/setter-injection-versus-constructor-injection-and-the-use-of-required
scraped: 2026-02-24T09:26:00.111Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  July 11, 2007 | 15 Comments
---

# Setter injection versus constructor injection and the use of @Required

_Engineering | Alef Arendsen |  July 11, 2007 | 15 Comments_

A couple of month ago, we start publishing polls on [](http://www.springframework.org)[www.springframework.org](http://www.springframework.org) asking people to provide their feedback about Spring, some of its features and how they are using those features. The first question I posted was whether or not people were checking required dependencies and if so, what mechanisms they used. I quickly followed up on this question asking the community what transaction management strategy it used.

To my delight when I first checked the results, back in March, a lot of people told us by voting in the first poll that they were using the @Required annotation. The second poll--on transaction management, quickly showed that a lot of people were using the @Transactional annotation. Below you can find some of the results of the poll about checking required dependencies. Together with the poll on transaction management (about 30% of all respondents are using the @Transactional annotation to demarcate transaction boundaries) they consistently show that people are using Spring 2.0 a lot, which was very good news for us. Because upgrading an application that uses Spring 1.x to use Spring 2.0 shouldn't be any issue, we really hoped people would not stick to Spring 1.x and in fact, people massively upgraded.

### How are you checking required dependencies

8%

I check them in my business methods

9%

Using init-method and an assert mechanism (c.f. Assert)

9%

Using the dependency-check attribute in XML

13%

I don't have to, I use constructor injection

15%

Using InitializingBean and an assert mechanism

**17%**

**Using the Spring 2.0 @Required annotation**

29%

I do not check required dependencies

What's interesting however is that 29 percent of all people do not check required dependencies. In the forum thread that accompanied the discussion, interesting suggestions came up as to why some people weren't doing this and how people solved it otherwise. Let's review some of those.

## Constructor injection

I'd like to begin with reviewing constructor injection. Any object that has a constructor that takes arguments, can (obviously) not be constructed without passing in arguments. In Java, we have a default or implicit constructor added to our class as long as we do not add one ourselves. This default or implicit constructor does not take arguments, so as long as you do not add a constructor with arguments at all, or specifically add one without any arguments, it will be possible for Spring (or any other user of your class for that matter) to instantiate your class without passing it anything.

In other words, we can **force** a user of our class (again, this might be Spring but it could also be a unit test that instantiates your class directly) to instantiate it while passing in arguments.

```java
Copy
public class Service {

  public Collaborator collaborator;

  // constructor with arguments, you *have* to
  // satisfy the argument to instantiate this class
  public Service(Collaborator collaborator) {
    this.collaborator = collaborator;
  }
}
```

We can use this to our advantage when in need to check required dependencies. If we modify the above code example to include assertions, we are 100% sure the class will never be instantiated without its collaborators injected:

```java
Copy
public Service(Collaborator collaborator) {
  if (collaborator == null) {
    throw new IllegalArgumentException("Collaborator cannot be null");
  }
  this.collaborator = collaborator;
}
```

In other words, we do not need a dependency checking mechanism if we're using constructor injection in combination with an assertion mechanism like I've showed above.

### Why do people not use constructor injection mostly

The question of course now is, why so few people are using constructor injection to enforce required dependencies, if it is the simplest way to get the job done! There are two reasons for this--one is a bit more historical, the other being the nature of the Spring Framework itself.

### Historical reasons

Early 2003, when Spring was first published as an open source project, it primarily focused on setter injection. Other frameworks also pioneered ways of doing dependency injection and one of those was PicoContainer, which strongly focused on constructor injection. Spring maintained its focus on setter injection because at the time, we believed that the lack of default arguments and argument names for constructor arguments resulted in less clarity for developers. We however also implemented constructor injection, to be able to offer that feature to developers that wanted to instantiate and manage objects they didn't control.

This is one of the reasons why you're seeing a lot of setter injection throughout the Spring Framework itself. The fact that setter injection was used in Spring itself, as well as us advocating it mostly also caused many pieces of third-party software to start using setter injection as well as blog and articles to start mentioning setter injection.

(By the way, do people still remember type 1, 2 and M inversion of control ;-) )

### Frameworks need to be a lot more configurable

The second reason why setter injection is used a lot more often than you would expect, is the fact that frameworks like Spring in general, are much more suited to be configured by setter injection than by constructor injection. This is mostly because frameworks that need to be configured often contain lots of optional values. Making optional values configurable using constructor injection would lead to needless clutter and proliferating constructors, especially when used in combination with class inheritance.

For those exact two reasons, I think constructor injection is much more usable for application code than it is for framework code. In application code, you inherently have a lesser need for optional values that you need to configure (you're application code is less likely to be used in many situations, which would require configurable properties). Second of all, application code uses class inheritance a lot less often than framework code does. Specialization in an application does not occur as often in application code as it does in framework code for example--again the number of use cases in which application code is far less.

### So what should you use?

We usually advise people to use constructor injection for all mandatory collaborators and setter injection for all other properties. Again, constructor injection ensures all mandatory properties have been satisfied, and it is simply not possible to instantiate an object in an invalid state (not having passed its collaborators). In other words, when using constructor injection you do not have to use a dedicated mechanism to ensure required properties are set (other than normal Java mechanisms).

One of the other arguments for not using constructor injection is the lack of argument names in constructors and the fact that these do not appear in the XML. I would argue that in **most** applications, this does not matter that much. First consider the variant that uses setter injection:

```xml
Copy
<bean id="authenticator" class="com.mycompany.service.AuthenticatorImpl"/>

<bean id="accountService" class="com.mycompany.service.AccountService">
  <property name="authenticator" ref="authenticator"/>
</bean>
```

This version mentions the authenticator as a property name as well as a bean name. This is the pattern that I frequently encounter. I would argue that while using constructor injection, the lack of constructor argument names (and those not appearing in XML), doesn't really confuse us a lot.

```xml
Copy
<bean id="authenticator" class="com.mycompany.service.AuthenticatorImpl"/>

<bean id="accountService" class="com.mycompany.service.AccountService">
  <constructor-arg ref="authenticator"/>
</bean>
```

## Using the alternative mechanisms

That brings us back to the topic of this blog entry, which also included a mention of @Required. This the new Spring 2.0 annotation we introduced back in 2006. @Required allows you to instruct Spring to check required dependencies for you. In case you are not in the position to use constructor injection, or for whatever other reasons, you prefer setter injection, @Required is the way to go. Annotation a property's setter an registering the RequiredAnnotationBeanFactoryPostProcessor as a bean in your application context is all you need to do:

```java
Copy
public class Service {

  private Collaborator collaborator;

  @Required
  public void setCollaborator(Collaborator c) {
    this.collaborator = c;
  }
}
```

```xml
Copy
<bean class="org.sfw.beans.factory.annotation.RequiredAnnotationBeanFactoryPostProcessor"/>
```

### Other mechanisms to check required dependencies

There are a few other mechanisms to enforce the checking of required dependencies. Most of those rely on Spring's ability to allow you to get callbacks at certain points in the construction an initialization of an object, such as the Spring InitializingBean interface or Spring's an arbitrary init method you can configure in the XML (using the init-method attribute). Those all resemble the use of constructor injection a lot, with the difference that you are relying on Spring to call the method in which the assertions take place for you.

```java
Copy
public class Service implements InitializingBean {

  private Collaborator collaborator;

  public void setCollaborator(Collaborator c) {
    this.collaborator = c;
  }

  // from the InitializingBean interface
  public void afterPropertiesSet() {
    if (collaborator == null) {
      throw new IllegalStateException("Collaborator must be set in order for service to work");
    }
  }
}
```

Another mechanism, similar to @Required in Java is the dependency-check attribute in XML, which strangely enough is not used all that much. Enabling the dependency check by tweaking this attribute (it's turned off by default) will tell Spring to start checking certain dependencies on beans. Refer to the reference for more information about this features.

## So why **NOT** check required dependencies

There are a lof of people that actually do not check if dependencies have been accurately set. The biggest reason people gave for not doing so is because they would find out quickly enough is they fired up the ApplicationContext and somehow used the classes that had dependencies. This is of course very true. If you're using Spring's integration testing support for example, you can have Spring load up an application context for you. If you're also making sure some of the actual code gets tested in your integration test, you can probably pretty much guarantee all the dependencies the classes need to work are set. It is an approach that bugs me a little bit though. You have to be confident in your test cases covering your code enough though, because if your tests do not test the code that depends on the collaborators being set, you're screwed, as you might not detect things! Of course a smoke test when you are deploying your application would probably do the trick right then and there, but I wouldn't want to be the one that only finds out about missing dependencies at runtime!

## Conclusion

There is a lot to be said about constructor injection versus setter injection and I know a lot of people still prefer setter injection. I think though (and with me a lot of people) that constructor injection in combination with checking dependencies in your constructor is the better way (for code that does not have a lot of optional and configurable values or collaborators) to enforce checking of required dependencies. Combining this with final fields immediately gives you the other benefit of increased safety in a multi-threaded environment and because usually that does not prove to be a big deal anyway, I'm not going to touch on that in this blog entry.

There are situations in which I would not use constructor injection. One of those for example is a class with **a lot** of dependencies or other configurable values. I personally do not consider a constructor with 20 arguments as a good example of nice code. Of course, the question is, if a class with 20 dependencies does not have too many responsibilities...

One thing is for sure--enforcing required dependencies by checking them in your business methods is something I would certainly not do.