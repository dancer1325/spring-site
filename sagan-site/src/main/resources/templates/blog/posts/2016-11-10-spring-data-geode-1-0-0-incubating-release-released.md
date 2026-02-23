---
title: Spring Data Geode 1.0.0.INCUBATING-RELEASE Released
source: https://spring.io/blog/2016/11/10/spring-data-geode-1-0-0-incubating-release-released
scraped: 2026-02-23T18:58:37.083Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  November 10, 2016 | 0 Comments
---

# Spring Data Geode 1.0.0.INCUBATING-RELEASE Released

_Engineering | John Blum |  November 10, 2016 | 0 Comments_

On behalf of the *Spring* and *Apache Geode* communities, I am extremely pleased and excited to announce the release of *Spring Data* for [Apache Geode 1.0.0-incubating](http://geode.incubator.apache.org/releases/).

You can get the bits from [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cspring-data-geode) by including the following dependency in either your application Maven POM or Gradle build file...

#### [](#maven)Maven

```
Copy<dependency>
  <groupId>org.springframework.data</groupId>
  <artifactId>spring-data-geode</artifactId>
  <version>1.0.0.INCUBATING-RELEASE</version>
</dependency>
```

#### [](#gradle)Gradle

```
Copycompile 'org.springframework.data:spring-data-geode:1.0.0.INCUBATING-RELEASE'
```

Including the `spring-data-geode` dependency will transitively pull in all required *Apache Geode* artifacts so you can start building *Spring* applications that use *Apache Geode* now.

#### [](#note)NOTE:

> I changed the version qualifier again by removing the `APACHE-GEODE` qualification and simplifying to `INCUBATING-RELEASE`. Once *Apache Geode* graduates, the `INCUBATING` qualification will drop off as well and the version number will simply become `major.minor.maint.[M#|RC#|RELEASE]`.

# [](#whats-new)What's New

Both *Spring Data Geode* **1.0.0.INCUBATING-RELEASE** and *Apache Geode* **1.0.0-incubating** release are significant for several reasons.

First and foremost, this marks the first, [official GA release](http://markmail.org/message/5p4kx6akynrt6cvo) of [Apache Geode](http://geode.incubator.apache.org/) inside the *Apache Software Foundation* (ASF). This is a massive step forward not only to signify the maturity of Geode, which is rooted in over a decade of production experience that is [Pivotal GemFire](https://pivotal.io/big-data/pivotal-gemfire), but also accelerates it's graduation as a Top-Level Project (TLP) inside ASF.

But, that's not all!

# [](#security)Security!

This release also incorporates significant changes to the security model of *Apache Geode* by introducing a **new**, [*Integrated Security* framework](http://geode.incubator.apache.org/docs/guide/managing/security/chapter_overview.html) (some technical details [here](https://cwiki.apache.org/confluence/display/GEODE/Geode+Integrated+Security)) that not only includes secure transport (i.e. SSL) but authentication and authorization as well.

This is significant because *Apache Geode* is one of the few OSS IMDG options to offer Security without an Enterprise license!

One of the best things about this new feature is that it is a *framework* allowing different security providers to be plugged in. Out-of-the-box, Geode is built on [Apache Shiro](http://shiro.apache.org/), which provides a familiar and robust way to configure security not only for Geode, but your applications as well.

# [](#how-to-secure-apache-geode)How-To Secure Apache Geode

Without *Spring (Data Geode)*, *Apache Geode* provides its own options for configuring security.

One option is to implement the *Apache Geode* [SecurityManager](http://geode.incubator.apache.org/releases/latest/javadoc/org/apache/geode/security/SecurityManager.html) interface and [set](http://geode.incubator.apache.org/docs/guide/managing/security/enable_security.html) the corresponding Geode `security-manager` (System) property to the fully-qualified class name. An example of this can be seen [here](https://cwiki.apache.org/confluence/display/GEODE/Using+Custom+SecurityManager).

But, using a property to reference a FQCN severely limits how you configure the `SecurityManager` in a managed environment or test context. Per my feedback, this will be [addressed](https://issues.apache.org/jira/browse/GEODE-2030) in a later Geode release.

Another option is to use *Apache Geode's* `security-shiro-init` (System) property to specify an [INI configuration file](http://shiro.apache.org/configuration.html#Configuration-INIConfiguration) located in a designated [resource path](http://shiro.apache.org/configuration.html#securitymanager-from-an-ini-resource) supported by *Apache Shiro*. However, this is limiting for 2 reasons.

First, *Apache Geode* only supports the `classpath:` resource specifier at present (also being [addressed](https://issues.apache.org/jira/browse/GEODE-2054) by the Geode engineering team). Second, having to learn yet another configuration file format, no matter how [standard](https://en.wikipedia.org/wiki/INI_file), is well, no better than XML, IMO.

Of course, *Apache Shiro* tries to alleviate the pain when running in a *Spring* context by offering [this](http://shiro.apache.org/spring.html). But, there is still too much boilerplate configuration logic left to be desired.

# [](#how-to-secure-apache-geode-with-spring-data-geode)How-To Secure Apache Geode with Spring (Data Geode)

In the spirit of making *Apache Geode* **quick** and as **easy to use** as possible (see my last [blog post](https://spring.io/blog/2016/10/11/spring-data-geode-1-0-0-apache-geode-incubating-m3-released)), I have been collaborating closely with the Geode engineering team to improve on the initial design and really make *Integrated Security* a first-class citizen in *Spring Data Geode* by employing many of the fundamental API and framework design concepts popularized by the *Spring Framework* and *Spring Boot*.

So, I give you the **new** `@EnableSecurity` annotation in SDG's new Annotation-based configuration model. You have several ways in which to configure *Apache Geode's* security features using the annotation.

#### [](#securitymanager-class-name-reference)SecurityManager class name reference

You can still reference a Geode `SecurityManager` implementation by its fully-qualified class name using...

```java
Copypackage example;

class ExampleSecurityManager 
    implements org.apache.geode.security.SecurityManager {
  ...
}

@CacheServerApplication(name = "ClassNameExample")
@EnableSecurity(securityManagerClassName = "example.ExampleSecurityManager")
class ExampleApplication {
  ...
}
```

A more detailed example can be seen in the SDG *Contacts Application* RI, [here](https://github.com/jxblum/contacts-application/blob/SDG-1.0.0.INCUBATING-RELEASE/security-example/src/test/java/example/app/geode/security/GeodeSecurityIntegrationTests.java#L236-L242).

However, you must provide a default, no-arg constructor, and your Geode `SecurityManager` implementation will be responsible for loading all the security authentication/authorization details upon construction; not very ideal.

#### [](#securitymanager-proxy-implementation)SecurityManager proxy implementation

Another option is to create a `Proxy` implementing the Geode `SecurityManager` interface, which delegates to an actual, underlying Geode `SecurityManager` configured in and injected by the *Spring* container, or other managed environment like Pivotal *CloudFoundry*.

One such `Proxy` implementation can been seen in the RI [here](https://github.com/jxblum/contacts-application/blob/SDG-1.0.0.INCUBATING-RELEASE/contacts-core/src/main/java/example/app/geode/security/SecurityManagerProxy.java), and is configured as follows...

```java
Copy@CacheServerApplication(name = "ProxyExample")
@EnableSecurity(securityManagerClassName = 
  "example.app.geode.security.SecurityManagerProxy", 
  useBeanFactoryLocator = true)
class ExampleApplication {

    ...

    @Bean
    JdbcSecurityRepository securityRepository(JdbcTemplate template) {
      return new JdbcSecurityRepository(template);
    }

    @Bean
    SimpleSecurityManager securityManager(
        SecurityRepository<User> securityRepository) {

      return new SimpleSecurityManager(securityRepository);
    }
}
```

The `SecurityMangerProxy` is constructed by *Apache Geode* during cache initialization. The *Spring* container will find the [SimpleSecurityManager](https://github.com/jxblum/contacts-application/blob/SDG-1.0.0.INCUBATING-RELEASE/contacts-core/src/main/java/example/app/geode/security/provider/SimpleSecurityManager.java) bean definition and inject it into the `SecurityManagerProxy`.

The `SecurityManagerProxy` works by leveraging another *Spring* feature, the [BeanFactoryLocator](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/access/BeanFactoryLocator.html), which is used by SDG, as mentioned in the [Reference Guide](http://docs.spring.io/spring-data-gemfire/docs/current/reference/html/#apis:declarable) (and [here](http://docs.spring.io/spring-data-gemfire/docs/current/reference/html/#bootstrap:cache:advanced)), to configure and auto-wire objects constructed and initialized outside of the *Spring* container, such as by *Apache Geode*.

This is useful in situations where an application object (e.g. [CacheLoader](http://geode.incubator.apache.org/releases/latest/javadoc/org/apache/geode/cache/CacheLoader.html)) may have been defined in Geode's native `cache.xml` config and needs to be auto-wired with bean(s) (e.g. `DataSource`) defined in the *Spring* container. This also works for objects referenced in Geode (System) properties like the `SecurityManager`.

The `SecurityManagerProxy` must [extend](https://github.com/jxblum/contacts-application/blob/SDG-1.0.0.INCUBATING-RELEASE/contacts-core/src/main/java/example/app/geode/security/SecurityManagerProxy.java#L39-L40) the [LazyWiringDeclarableSupport](http://docs.spring.io/spring-data-gemfire/docs/current/api/org/springframework/data/gemfire/LazyWiringDeclarableSupport.html) class, which enables the `Proxy` to be auto-wired by the *Spring* container using the `BeanFactoryLocator` once Geode constructs the object. It's quite slick actually.

You can see the complete example configuration in the RI [here](https://github.com/jxblum/contacts-application/blob/SDG-1.0.0.INCUBATING-RELEASE/security-example/src/test/java/example/app/geode/security/GeodeSecurityIntegrationTests.java#L244-L281). This also requires the `useBeanFactoryLocator` attribute to be set to **true** [on the Geode Server, *Spring Boot* application class](https://github.com/jxblum/contacts-application/blob/SDG-1.0.0.INCUBATING-RELEASE/security-example/src/test/java/example/app/geode/security/GeodeSecurityIntegrationTests.java#L196-L197), which is shown in the example above as well.

#### [](#apache-shiro-ini-configuration-file)Apache Shiro INI configuration file

Perhaps you do not want to unnecessarily couple your application code to Geode's proprietary classes and interfaces, such as the `SecurityManager`. Perhaps you just want to fully utilize *Apache Shiro\`s* security framework.

One way to do this is to create an *Apache Shiro* [INI configuration file](http://shiro.apache.org/configuration.html#Configuration-INIConfiguration) and reference it in the `@EnableSecurity` annotation like so...

```java
Copy@CacheServerApplication(name = "ProxyExample")
@EnableSecurity(shiroIniResourcePath = "my-shiro.ini")
class ExampleApplication {
    ...
}
```

Again, the *Apache Shiro* INI file must be on the classpath. Due to the present *Apache Geode* [limitation](https://issues.apache.org/jira/browse/GEODE-2054), it is not possible to use other resource specifiers (e.g. `file:` or `url:`).

This completed example configuration can be seen [here](https://github.com/jxblum/contacts-application/blob/SDG-1.0.0.INCUBATING-RELEASE/security-example/src/test/java/example/app/geode/security/GeodeSecurityIntegrationTests.java#L283-L287).

#### [](#apache-shiro-realms)Apache Shiro Realms

However, what you, as an application developer, really want to do is just define *Apache Shiro* `Realms` as *Spring* beans in the *Spring* container to access the security meta-data needed by your application to secure *Apache Geode* and have *Spring* do all the work.

Well, SDG can do that for you too. For example...

```java
Copy@CacheServerApplication(name = "RealmExample")
@EnableSecurity
class ExampleApplication {

    @Bean
    PropertiesRealm shiroRealm() {
      PropertiesRealm propertiesRealm = new PropertiesRealm();
      propertiesRealm.setResourcePath("classpath:shiro.properties");
      propertiesRealm.setPermissionResolver(new GeodePermissionResolver());
      return propertiesRealm;
    }
  }
```

That's it; that is all you need.

Notice the Shiro [PropertiesRealm](http://shiro.apache.org/static/1.3.2/apidocs/org/apache/shiro/realm/text/PropertiesRealm.html) uses the `GeodePermissionResolver` to resolve Geode permissions. Additionally, you have the option to specify whatever resource path you choose; you are not restricted to the `classpath:` only.

You are also free to define whatever `Realms` (e.g. JDBC, JNDI, LDAP, etc) provided by Shiro that your application uses to access its security meta-data.

If you define more than one Shiro `Realm`, you can even order them using *Spring's* `@Order` annotation on the `Realm` bean definitions, like so...

```java
Copy@CacheServerApplication(name = "OrderedMultiRealmExample")
@EnableSecurity
class ExampleApplication {

    @Bean
    @Order(1)
    IniRealm iniRealm() {
      IniRealm iniRealm = new IniRealm("classpath:partial-shiro.ini");
      iniRealm.setPermissionResolver(new GeodePermissionResolver());
      return iniRealm;
    }

    @Bean
    @Order(2)
    PropertiesRealm propertiesRealm() {
      PropertiesRealm propertiesRealm = new PropertiesRealm();
      propertiesRealm.setResourcePath("classpath:partial-shiro.properties");
      propertiesRealm.setPermissionResolver(new GeodePermissionResolver());
      return propertiesRealm;
    }
}
```

`Realm` ordering is an important factor in the *authentication strategy* used in *Apache Shiro's* [Authentication Sequence](http://shiro.apache.org/authentication.html#Authentication-sequence).

You can can see multiple example configurations of using Shiro `Realms` in the RI [here](https://github.com/jxblum/contacts-application/blob/SDG-1.0.0.INCUBATING-RELEASE/security-example/src/test/java/example/app/geode/security/GeodeSecurityIntegrationTests.java#L289-L386).

# [](#whats-next)What's Next

We covered a lot of ground, but still, there is more work to do. Specifically, I intend on doing the following...

-   Integrate *Apache Geode's* *Integrated Security* framework with [Spring Security](http://projects.spring.io/spring-security/).
-   Improve *Spring Boot's* auto-configuration support for SDG [Repositories](http://docs.spring.io/spring-boot/docs/1.4.2.RELEASE/reference/htmlsingle/#boot-features-nosql) as well as auto-configure *Apache Geode* as a [caching provider](http://docs.spring.io/spring-boot/docs/1.4.2.RELEASE/reference/htmlsingle/#_supported_cache_providers) using *Spring's* [Cache Abstraction](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#cache).
-   Extend SDG's Annotation configuration support to dynamically create Geode cache *Region's* based on an entity and/or *Repository* bean definitions.

Much more is in the works, so stay tuned.

# [](#additional-release-highlights)Additional Release Highlights

-   Sets the base Java version to **Java 8**.
-   Upgraded to *Spring Framework* 4.3.4.RELEASE.
-   Upgraded to *Spring Data Commons* 1.12.5.RELEASE.

See the [changelog](https://github.com/spring-projects/spring-data-gemfire/blob/1.0.0.APACHE-GEODE-INCUBATING-RELEASE/src/main/resources/changelog.txt#L7-L14) for additional details.

# [](#conclusion)Conclusion

As always, feedback is most welcomed and you can reach out to us in [JIRA](https://jira.spring.io/browse/SGF) or on [StackOverflow](http://stackoverflow.com/questions/tagged/spring-data-gemfire).

Thank you all! Happy coding.