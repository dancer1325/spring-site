---
title: Grails 1.1 Released
source: https://spring.io/blog/2009/03/10/grails-1-1-released
scraped: 2026-02-24T09:10:23.730Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Graeme Rocher |  March 10, 2009 | 0 Comments
---

# Grails 1.1 Released

_Engineering | Graeme Rocher |  March 10, 2009 | 0 Comments_

Hot on the heels of the [Groovy 1.6 release](http://blog.springsource.com/2009/03/04/groovy16/), we are pleased to announce that Grails 1.1 final is out and available from the [Grails site](http://grails.org/Download). There are numerous improvements that are listed in detail in the [release notes](http://grails.org/1.1+Release+Notes). However, some of the key ones are:

**Standalone GORM:** It is now possible to use Grails' ORM layer (built on Hibernate) outside of Grails. There is an example that uses GORM inside a Spring MVC application in the samples/petclinic-mvc directory of the distribution. The example configures a GORM enabled SessionFactory using Spring as follows:

```html
Copy
<gorm:sessionFactory base-package="org.grails.samples" 
                     data-source-ref="dataSource"
	             message-source-ref="messageSource">
   <property name="hibernateProperties">
        <util:map>
             <entry key="hibernate.hbm2ddl.auto" value="update"/>
         </util:map>
   </property>
</gorm:sessionFactory>
```

**Maven & Ant+Ivy Support:** Grails applications can now be built with the two most prominent build tools in the Java space. Integrating Grails applications into your Java eco-system just got a lot easier and Grails now covers integration with Java across the whole application life-cycle from build to deployment.

**Better Plugins:** A crucial part of the Grails experience is the [plugin eco-system](http://grails.org/Plugins), and now with Grails 1.1 that experience just got a lot better. Plugins are now installed automatically from project metadata, installs occur transitively (meaning plugin depencencies are automatically installed) and support has been added for global plugins (plugins that span multiple applications).

**Spring Namespace Support:** As well as supporting Spring's native XML for defining new beans, Grails also supports a Groovy DSL for defining bean definitions. This DSL has been extended to support Spring namespaces:

```java
Copy
beans = {
    xmlns aop:"http://www.springframework.org/schema/aop"

    fred(Person) {
       name = "Fred"
       age = 45
    }
    birthdayCardSenderAspect(BirthdayCardSender)

     aop {
         config("proxy-target-class":true) {
             aspect( id:"sendBirthdayCard",ref:"birthdayCardSenderAspect" ) {
                   after method:"onBirthday",
                   pointcut: "execution(void ..Person.birthday()) and this(person)"
              }
         }
     }
}
```

**JSP Tag Library Support:** It is now possible to use any JSP tag library inside GSP making it even easier to migrate to Grails today. You can even use standard Spring MVC tag libraries with Grails (which is built on Spring MVC):

```html
Copy
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<form:form commandName="address" action="do">
       <b>Zip: </b><form:input path="zip"/>
</form:form>
```

There are many other features and improvments beyond those covered here. It is worth taking a tour through the release notes for a lengthier [overview of the highlights](http://grails.org/1.1+Release+Notes).

These are exciting times for Groovy, Grails and Spring, and if you want to hear more you should come along to [SpringOne Europe](http://europe.springone.com/europe-2009) and/or [gr8conf](http://www.gr8conf.org/), both of which provide ample coverage of Groovy and Grails.