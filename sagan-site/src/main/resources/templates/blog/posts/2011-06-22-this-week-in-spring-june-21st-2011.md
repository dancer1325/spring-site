---
title: This week in Spring: June 21st, 2011
source: https://spring.io/blog/2011/06/22/this-week-in-spring-june-21st-2011
scraped: 2026-02-24T08:39:40.072Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 22, 2011 | 0 Comments
---

# This week in Spring: June 21st, 2011

_Engineering | Josh Long |  June 22, 2011 | 0 Comments_

Welcome back to yet another This Week in Spring. SpringSource is out in full force at JAX San Jose this week and we will be at OSCON, in July. These events are great avenues for us to connect with the userbase. As usual, we've got a nice complement of stuff to cover this week, so let's get to it!

```
Copy      <LI>  There has been loads of interest and discussion surrounding last week's <a href="http://blog.springsource.com/2011/06/09/spring-framework-3-1-m2-released/">Spring 3.1 second milestone</a>.  Sam Brannen writes about the <a href="http://blog.springsource.com/2011/06/21/spring-3-1-m2-testing-with-configuration-classes-and-profiles"> new testing support</a> which is a great follow on to the previous posts about <a href="http://blog.springsource.com/2011/06/10/spring-3-1-m2-configuration-enhancements/">configuration enhancements</a> and <a href="http://blog.springsource.com/2011/06/13/spring-3-1-m2-spring-mvc-enhancements-2/">Spring MVC updates</a>.  
      </LI>

     <LI>
        Alex (from the blog "javaaddicto") has also written about the new features in Spring 3.1, and particularly the new support in Spring 3.1 M2 for   <a href="http://alexsotob.blogspot.com/2011/06/its-strange-but-its-true-i-cant-get.html">XML-free web applications in Spring MVC. </a> This is very cool! Check it out.
     </LI> 

   <LI> 
    Here is <EM>another</EM> more code centric look at <a href="http://www.dzone.com/links/r/spring_31_mvc_xmlfree_configuration_example.html">XML-free configuration in Spring 3.1 M2</a>, this time on dZone.  
     </LI>
```

2.  Rod Johnson sounds off on the state of the complexity in enterprise Java today. Check out this [interview with Rod on the TheServerSide.com](http://www.theserverside.com/video/Java-Developers-have-Loads-to-Learn-from-the-Rails-Community). Very cool!

```
Copy    <LI> Hot on the heels of the vFabric 5 release, Chris Harris has written up a good look at how to use the new SQLFire to <a href="http://cjharris5.blogspot.com/2011/06/grails-sqlfire-quickstart.html">build a Grails CRUD application</a>.
</LI>
```

4.  Manning has just released the third edition of SpringSource's very own Craig Walls' [Spring in Action](http://www.manning.com/walls4/). Good stuff, check it out!

```
Copy<li>
```

[Spring Data JPA](http://www.springsource.org/spring-data/jpa) (formerly, "Hades"), RC1 has just been released! It features, among other things, improved repository interface programming model (transactions at implementation, no need to extend JpaRepository anymore), improved parameter binding for created queries, performance improvement in inspecting annotations, improved detection of domain class from method return types, and much more. [Check out the release announcement.](http://www.springsource.org/node/3157)

```
Copy    <LI> Want to learn  about the Tomcat 7 classloader? <a href="http://dertompson.com/2011/06/19/tomcat-classloader/"> Get the skinny in this post!</a></LI>
```

8.  Using the Vaadin web framework? Want to see how to rapidly build a Vaadin application on CloudFoundry? Who wouldn't? [Check out this doc](http://vaadin.com/book/-/page/rapid.cloudfoundry.html) that explains how to setup the toolchain (including [SpringSource Tool Suite](http://www.springsource.com/developer/sts)) and build a web application from code, all the way to the cloud.

```
Copy    <LI>
```

The AMIS blog has an interesting post on [how to access and leverage Spring beans from Oracle ADF Faces-based JSF applications](http://technology.amis.nl/blog/12306/leveraging-spring-beans-in-adf-faces-applications-and-using-the-spring-propertyplaceholderconfigurer-bean-to-dynamically-configure-bean-properties-from-external-files). The blog is a bit out of date - in that it covers Spring 2.5, but could prove useful to users of that framework and technology. Note that - while this approach outlines a tooling-centric approach to adding the libraries and so on, the crux of the Spring / JSF integration is bundled with the core Spring framework as an expression resolver delegate, `org.springframework.web.jsf.el.SpringBeanFacesELResolver`, which the article does introduce. Very cool, generally, and the setup in Spring 3.x is not generally different, to this is useful for users of newer (and older!) versions.

```
Copy    </LI> 
```