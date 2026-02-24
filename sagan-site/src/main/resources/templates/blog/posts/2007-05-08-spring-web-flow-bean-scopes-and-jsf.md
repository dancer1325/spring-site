---
title: Spring Web Flow Bean Scopes and JSF
source: https://spring.io/blog/2007/05/08/spring-web-flow-bean-scopes-and-jsf
scraped: 2026-02-24T09:29:56.569Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  May 08, 2007 | 0 Comments
---

# Spring Web Flow Bean Scopes and JSF

_Engineering | Ben Hale |  May 08, 2007 | 0 Comments_

I've recently finished up an interesting issue in Spring Web Flow. This issue ([SWF-163](http://opensource.atlassian.com/projects/spring/browse/SWF-163)) dealt with adding Spring 2.0 bean scoping support for Spring Web Flow's internal scopes. The implementation isn't really that interesting (the [Scope](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/beans/factory/config/Scope.html) interface is pretty easy to implement after all), but I wanted to mention exactly how you would use something like this in your application.

## Spring 2.0 Scoping

In Spring 1.x, we had the idea of singleton and prototype bean scopes, but the notation was fixed and not especially descriptive with singleton="\[true | false\]". So in Spring 2.0, this notation was removed from the XSD style of configuration and now you see a notation that is more clear with scope="\[singleton | prototype | ...\]". Spring itself adds three more bean scopes; request, session, and globalSession which are related to web applications.

With the latest snapshots of Spring Web Flow 1.1, we now see bean scopes for the three major Web Flow scopes, flash, flow, and conversation.

```xml
Copy
<bean id="sale" class="org.springframework.webflow.samples.sellitem.Sale" scope="flash"/>
<bean id="sale" class="org.springframework.webflow.samples.sellitem.Sale" scope="flow"/>
<bean id="sale" class="org.springframework.webflow.samples.sellitem.Sale" scope="conversation"/>
```

To utilize these bean scopes you'll need to leverage the a new 1.1 version of the configuration (included in the Web Flow jar) and add a single element to your bean definition.

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:flow="http://www.springframework.org/schema/webflow-config"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans-2.0.xsd
            http://www.springframework.org/schema/webflow-config
            http://www.springframework.org/schema/webflow-config/spring-webflow-config-1.1.xsd">

	<flow:enable-scopes/>

	<bean id="sale" class="org.springframework.webflow.samples.sellitem.Sale" scope="conversation"/>

</beans>
```

The <enable-scopes/> tag only needs to exist once in a given application context and will allow you to use any of the three scopes contributed by Spring Web Flow.

## Scoped Beans and JSF

Right now the most compelling use of these new scopes is in JSF. By using the scope notation in a standard Spring bean definition file instead of the <var/> notation in a flow definition, the experience for JSF users is much closer to standard JSF behavior. To add this ability to JSF you register the standard Spring JSF DelegatingVariableResolver. The other definitions (FlowNavigationHandler, and FlowPhaseListener) are standard for using JSF with Spring.

```xml
Copy
<?xml version="1.0"?>
<!DOCTYPE faces-config PUBLIC
  "-//Sun Microsystems, Inc.//DTD JavaServer Faces Config 1.0//EN"
  "http://java.sun.com/dtd/web-facesconfig_1_0.dtd">

<faces-config>
    <application>
        <navigation-handler>
            org.springframework.webflow.executor.jsf.FlowNavigationHandler
        </navigation-handler>
        <variable-resolver>
            org.springframework.web.jsf.DelegatingVariableResolver
        </variable-resolver>
    </application>

    <lifecycle>
        <phase-listener>
            org.springframework.webflow.executor.jsf.FlowPhaseListener
        </phase-listener>
    </lifecycle>
</faces-config>
```

The major change from the previous Web Flow enabled configuration is that now the variable resolver is the one from Spring and not Spring Web Flow. When a JSP page looks for a sale variable, JSF will delegate to Spring for bean resolution and the bean instance will be scoped according to the scope attribute on its definition.

## Conclusion

The end result of this is that now JSF users can now use a syntax similar to the built-in style but in a container that is much more powerful.

If you'd like to use this new functionality, it will be coming shortly with the Spring Web Flow 1.1-m1 release, or you can get a preview by downloading the latest [Spring Web Flow 1.1-m1 nightly snapshot](http://static.springframework.org/downloads/nightly/snapshot-download.php?project=SWF).