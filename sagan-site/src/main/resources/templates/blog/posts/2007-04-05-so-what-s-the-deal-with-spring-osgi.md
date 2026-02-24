---
title: So what\'s the deal with Spring-OSGi?
source: https://spring.io/blog/2007/04/05/so-what-s-the-deal-with-spring-osgi
scraped: 2026-02-24T09:30:55.138Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  April 05, 2007 | 0 Comments
---

# So what's the deal with Spring-OSGi?

_Engineering | Costin Leau |  April 05, 2007 | 0 Comments_

Welcome to my blog! This is my first entry...ever. I manage to resist the urge of blogging but since so many people encouraged me to write about what I do at [i21](http://www.interface21.com) I decided to give it a go. This and the fact that the [Spring-OSGi](http://www.springframework.org/osgi) had its first [release](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=227224) yesterday evening (EET time zone).

I've been involved with Spring-OSGi since August last year and it has been quite a ride. It's one of the most challenging projects I have worked on and I'm glad to have it released, even as a milestone, to the public. Thanks a lot to everybody involved for making this happen, especially my [team](http://static.springframework.org/maven2/spring-osgi/team-list.html) mates - Adrian, Andy and Hal!

In this entry, I'd like you give you a glimpse at what Spring 1.0 M1 provides at the moment; I'll skip introducing OSGi since there is plenty of excellent material available on the internet (see the links at the bottom).

The basic idea behind Spring-OSGi is to make it easy to build/write/deploy Spring applications in an OSGi environment. That is, to have the comprehensive POJO based programming model that Spring offers (IoC, AOP, service abstractions) working transparently in a dynamic execution environment which is focused on versioning and modularity.

One of the biggest challenges when adopting OSGi is dealing with its dynamic nature. Services (which are are simple object instances) come and go and your application has to deal with that. The solution is not straight forward, depends from case to case and requires an application-wide scope just like exception handling and transaction do. Classloading restrictions, enforced by the modularity mentioned, combined with AOP can cause a lot of grief and force the developer to create hacks, thus throwing out the window the benefits OSGi provides. These are just a **few** examples of the things we are addressing in Spring-OSGi which in the end, should allow a smooth adoption path to OSGi.

Let's take a look at some of the features you'll find in 1.0 M1:

1.  **OSGi Application Context**

OSGi is based on *bundles* which are nothing more then jars with some dedicated manifest entries. They are modules, units that export and import class packages and/or services. An application can be composed of one or multiple bundles. Spring-OSGi provides an application context which builds on top of a bundle and its lifecycle, giving you access to the OSGi context in which the application lives, an OSGi [custom](http://static.springframework.org/maven2/spring-osgi/apidocs/org/springframework/osgi/context/OsgiBundleScope.html) scope as well as an [extra](http://static.springframework.org/maven2/spring-osgi/apidocs/org/springframework/osgi/context/BundleContextAware.html) Aware interface. As the rest of its ilk, the interface provides the ability to do dependency lookup, something you should think twice before using as OSGi service dependency injection is fully supported.

2.  **Resource abstraction**

Classloading is not what is used to be in OSGi - the classpath for example has a different meaning since it can be assembled from multiple bundles (which in turn, can be used in more then one classpath). Thus getClass().getResource() can have a different outcome as the environment in which are running has changed quite a lot. Here is an example of what you might get in case you are looking for a class:

[Equinox](http://www.eclipse.org/equinox/): bundleentry://5/my/package/MyClass.class (can be also bundleresource://) [Knopflerfish](http://www.knopflerfish.org/): bundle://13/my/package/MyClass.class [Felix](http://incubator.apache.org/felix/): bundle://18.0/0/my/package/MyClass.class

Relying on URL schemes is not portable thus one of the first things done in Spring OSGi was to encapsulate low-level access through the simple, yet effective [Resource](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/core/io/Resource.html) interface, so no matter what OSGi implementation you are using, you can find your files. Moreover, pattern style lookups such as myFolder/\* are possible (in fact we are using /META-INF/spring/\* to detect 'spring powered' bundles).

3.  **Dynamic service support**

Suppose you have the following application context:

```xml
Copy
<!-- service layer-->
<bean id="myService" class="ServiceClass">
    <property name="dao" ref="dao"/>
</bean>

<!-- dao layer -->
<bean id="dao" class="poorPerformerDAO">
    <property name="dataSource" ref="someDataSource"/>
</bean>
```

Most of the application have several layers which are excellent candidates for OSGi bundles since one can simply put the DAO classes in one bundle (the dao bundle), the service layer in another (service bundle) so when the DAOs implementations are updated (for example *poorPerformerDAO* above is replaced with *excellentPerformerDAO*) or a different version of the application is being deploy, no application restarts are required: one of the best reasons to choose OSGi!

However, to take advantage of the OSGi capabilities, the objects have to become services - that is, they have to be registered with the OSGi platform before being 'consumed' while the consumer (client) has to look for them. It's an [SOA](http://en.wikipedia.org/wiki/Service-oriented_architecture)\-like approach which avoids tight coupling between modules so when a bundle is shut down, the services published by it disappear. Which means that one first has to use the OSGi APIs to do the registration and lookup but also has to deal with failure as services can come and go.

Spring-OSGi greatly helps in this area by allowing literally any type of object to be exported and imported in your application without any code change.

Service Bundle:

```java
Copy
<!-- service layer-->
<bean id="myService" class="ServiceClass">
    <property name="dao>
       <osgi:reference interface="daoInterface"/>
    </property>
</bean></code>
```

Dao Bundle:

```xml
Copy
<!-- dao layer -->
<bean id="dao" class="goodPerformerDAO">
    <property name="dataSource" ref="someDataSource"/>
</bean>

<osgi:service ref="dao"/>
```

With Spring-OSGi to accomodate to the OSGI environment, two lines of configurations have to be added:

1.  to instruct the framework what OSGi service to look for

```
Copy<li><span style="font-family:courier"><osgi:service ..></span> to export an existing bean as an OSGi service</li>
```

Obviously the same can be done for the *dataSource* dependency - externalize it into an OSGi bundle and just replace the straight refwith an osgi:reference. No new APIs to deal with, no exceptions to try/catch/finally for and especially built-in lookup behavior. Spring-OSGi can be instructed so that the application context does not start unless a service implementating daoInterface is found - that is, the dao dependency can be satisfied. Moreover, at runtime if the service goes away, Spring-OSGi will automatically look for a new implementation based on your configuration (number of retries and timeout): if a call is invoked on 'dao' bean exactly when the owning bundle is updated (for example to upgrade *goodPerformerDAO* to *excellentPerformerDAO*) instead of getting a nasty, apparently inexplicable exception, one will get an imperceptible delay caused by new service lookup. As always, the behavior is fully configured.

To some degree the exporter/importer functionality resembles [Spring remoting](http://static.springframework.org/spring/docs/2.0.x/reference/remoting.html) with the big difference that there is no remoting involved - everything is running in the same VM and there is no serialization involved what so ever.

4.  **Integration testing**

Testing is important (even crucial) especially when migrating an application to a new environment, as a lot of things taken for granted can simply fail: we experienced this ourselves quite early on in development. This has been a big issue since testing was anything but easy or automated when talking about OSGi since the execution environment (the OSGi platform or container if you'd like) has to be started (no standardized API) and setup (install the bundles your test depends on). However the tricky part is that the test itself has to be OSGified - placed along side a manifest which declares the dependencies, into a bundle which has to be installed and started into the OSGi platform.

Meet [AbstractOsgiTests](http://static.springframework.org/maven2/spring-osgi/apidocs/org/springframework/osgi/test/AbstractOsgiTests.html) & [co](http://static.springframework.org/maven2/spring-osgi/apidocs/org/springframework/osgi/test/package-summary.html):

```java
Copy
public class SimpleIntegrationTests extends AbstractConfigurableBundleCreatorTests
{

  public void testInstalledBundles() {
    // get access to the OSGi bundle context
     Bundle[] bundles = getBundleContext().getBundles();

     getBundleContext().installBundle(someBundleLocation);
     assertEquals(bundles.length()+1, getBundleContext().getBundles().length());
  }

  // specify the bundles to install  
  protected String[] getBundles() {
        return new String[] {
                "org.springframework.osgi, commons-collections.osgi, 3.2-SNAPSHOT",
                "org.springframework.osgi, org.springframework.osgi.test.simple.service,1.0-SNAPSHOT"};
    }
}

```

AbstractOsgiTests builds on top of JUnit so you can write and run OSGi integration tests directly from your IDE. The entire setup is handled by the testing infrastructure so you don't have to: no need to write a MANIFEST.MF for your test, to do any packaging or deployment - everything is handled automatically. And it's fast, extremely fast! In fact, less then 10% percent of the startup time is spent inside Spring-OSGi code - the rest is used by the OSGi platform itself. Most of our integration tests are fully executed in 1-3 seconds each. Equinox, Knopflerfish and Felix are all supported.

Well, I think that's enough for a first entry... I'll write more about Spring-OSGi features in future entries. I hope I've made you curios enough to take 1.0 M1 for a spin (please note that it's the first milestone and it has some 'rough edges').

Thanks for reading! Costin

[OSGi Alliance](http://www.osgi.org/) which has some nice [intros](http://www.osgi.org/osgi_technology/index.asp?section=2) and [whitepapers](http://www.osgi.org/documents/collateral/TechnicalWhitePaper2005osgi-sp-overview.pdf) [Wikipedia](http://en.wikipedia.org/wiki/OSGi) EclipseCon OSGi [track](http://www.eclipsecon.org/2007/index.php?page=sub/&area=osgi) Spring-OSGi [specification](http://www.springframework.org/osgi/specification) Javapolis 2006 [presentation](http://www.bejug.org/confluenceBeJUG//display/PARLEYS/Spring%20OSGi) on Spring-OSGi (by yours truly) Last, but not least, good ol' [Google]( http://www.google.com/search?q=osgi&start=0&ie=utf-8&oe=utf-8).