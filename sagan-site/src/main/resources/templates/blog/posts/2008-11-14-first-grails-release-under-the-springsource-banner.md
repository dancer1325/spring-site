---
title: First Grails Release Under the SpringSource Banner
source: https://spring.io/blog/2008/11/14/first-grails-release-under-the-springsource-banner
scraped: 2026-02-24T09:13:03.194Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Graeme Rocher |  November 14, 2008 | 0 Comments
---

# First Grails Release Under the SpringSource Banner

_Engineering | Graeme Rocher |  November 14, 2008 | 0 Comments_

I'm pleased to announce the first release of [Grails](http://grails.org) since the [acquisition of G2One](http://www.springsource.com/g2one) by SpringSource. Grails 1.0.4 includes a number of improvements as well as upgrades to key libraries that underpin Grails and can be downloaded from the [Grails download page](http://grails.org/Download). More specifically Grails 1.0.4 ships with the [latest Spring 2.5.6 release](http://springframework.org/node/813) that came out a week or so ago.

Beyond [the improvements](http://jira.codehaus.org/browse/GRAILS?report=com.atlassian.jira.plugin.system.project:changelog-panel) there are a couple of interesting new features in this release. The first is the addition of a feature that better supports mapping of Hibernate user type definitions in GORM. You can now map custom user types onto multiple columns, including the ability to customize the underlying SQL type:

```java
Copy
static mapping =  {
     amount type: MonetaryUserType, {
         column name: "value"
         column name: "currency", sqlType: "char", length: 3
     }
}
```

Other new features include the ability to define custom PropertyEditor instances used for data binding simply by specifying a [PropertyEditorRegistrar](http://static.springframework.org/spring/docs/2.5.x/api/org/springframework/beans/PropertyEditorRegistrar.html) instance as a Spring bean in grails-app/conf/spring/resources.groovy. Grails uses Spring's [data binding and validation](http://static.springframework.org/spring/docs/2.5.x/api/org/springframework/validation/package-summary.html) capabilities under the surface, so the mechanics are essentially the same as in Spring MVC.

Now we're shifting focus onto the Grails 1.1 release, which aims to dramatically improve  the unit testing features built into Grails, provide support for the Maven build system, add support for JSP tags in GSP, as well as provide incremental improvements to key existing features such as GORM and the plugin system.

Following the Grails 1.1 release a number of key plugins for Grails will be made possible due to improvements to the plugin system, including plugins for the Java Content Repository (JCR) API, the Java Persistence API (JPA) and the Portlet API. Some of these are already in an alpha state in the [plugin repository](http://plugins.grails.org) for those willing live on the bleeding edge.

Overall we're extremely excited about the coming year and look forward to bringing you a number of significant releases in the short term, and some exciting possibilities with integration between Groovy, Grails and key Spring portfolio products such as Spring Batch, Spring Integration and Spring dm Server in the longer term.