---
title: Spring Web Flow 2.2.0.M1 Released
source: https://spring.io/blog/2010/08/05/spring-web-flow-2-2-0-m1-released
scraped: 2026-02-24T08:54:43.484Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  August 05, 2010 | 0 Comments
---

# Spring Web Flow 2.2.0.M1 Released

_Engineering | Rossen Stoyanchev |  August 05, 2010 | 0 Comments_

I'm pleased to announce the first milestone of Spring Web Flow 2.2 is now available for [download](http://www.springsource.com/download/community?project=Spring%20Web%20Flow). The release is also available through the Maven milestone repository at [http://maven.springframework.org/milestone](http://maven.springframework.org/milestone). As with Spring Web Flow 2.1, this release requires JDK 1.5, Spring 3 and Spring Security 3.

The main focus of the release is to address the needs of JSF users by extending the list of supported [JSF 2 features](http://andyschwartz.wordpress.com/2009/07/31/whats-new-in-jsf-2/). Not long ago [Web Flow 2.1](http://static.springsource.org/spring-webflow/docs/2.1.x/reference/htmlsingle/spring-webflow-reference.html#whatsnew) made it possible to use JSF 2 dependencies without the need for the separate Sun Facelets jar that is commonly used with JSF 1.2 today.

In Spring Web Flow 2.2 you can look forward to taking advantage of core JSF 2 features and JSF 2 component libraries. More on component libraries later in this post. First here is an overview of the new features.

## JSF 2 Ajax Requests

JSF 2 defines client and server side facilities for processing Ajax requests. You can add Ajax behavior to a component with the <f:ajax> tag as follows:

```xml
Copy
<h:commandButton value="More Results" action="next">
    <f:ajax render="@form" />
</h:commandButton>
```

When the above button is pressed an Ajax request is sent to the server that will result in partial request processing, rendering, and an update to the form the button belongs to.

The <f:ajax> tag also supports other attributes such as "event" for specifying client-side events (blur, mouseover, etc) and "execute" for specifying components that should be included in the execute phase of the request processing lifecycle. The <f:ajax> tag can be nested inside or surround other tags. There is also a JavaScript API. See section 10.4.1.1 and chapter 14 of the JSF 2 spec for more details and examples.

If you are a Web Flow 2 user you will find it familiar to process the above request as you do today:

```xml
Copy
<view-state id="reviewHotels">
    <transition on="next">
        <evaluate expression="searchCriteria.nextPage()" />
    </transition>
</view-state>
```

The transition on "next" does not have a target view state. That will keep us in the current view while advancing the SearchCriteria backing bean to the next page. To ensure rendering happens without a client-side redirect (the POST-redirect-GET pattern), you need to configure Web Flow to be able to recognize JSF 2 Ajax requests:

```xml
Copy
<bean class="org.springframework.webflow.mvc.servlet.FlowHandlerAdapter">
    <property name="flowExecutor" ref="flowExecutor" />
    <property name="ajaxHandler">
        <bean class="org.springframework.faces.webflow.JsfAjaxHandler"/>
    </property>
</bean>
```

The booking-faces sample in the 2.2.0.M1 release uses the <f:ajax /> tag throughout including use cases such as search result pagination and Ajax-based form validation.

## JSF 2 Resource Requests

JSF 2 introduces a ResourceHandler API for serving resources (images, .js, .css files) packaged relative to the web application root under /resources/\*\* or on the classpath under META-INF/resources/\*\*. JSF component libraries can add resources transparently via an API or @ResourceDependency annotation. Alternatively you can also add an <outputScript> tag to the view.

JSF renders resource URLs such that they point back to the same servlet like this: /myApp/myServlet/javax.faces.resources/

Note the "/javax.faces.resources" segment that comes after the servlet mapping. This is what distinguishes it as a JSF resource requests.

In Web Flow, JSF resource URLs point back to the Spring MVC DispatcherServlet. To handle such requests a new Spring MVC HttpRequestHandler is provided to delegate resource requests to the JSF 2 resource handling mechanism. Below is the configuration required to configure this handler. The final release will [simplify](https://jira.springframework.org/browse/SWF-1375) this configuration.

```xml
Copy
<bean class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
    <property name="mappings" value="/javax.faces.resource/**=jsfResourceHandler"/>
</bean>

<bean class="org.springframework.web.servlet.mvc.HttpRequestHandlerAdapter" />

<bean id="jsfResourceHandler" class="org.springframework.faces.webflow.FacesJsfResourceRequestHandler"/>
```

The booking-faces sample in the 2.2.0.M1 release contains the necessary configuration.

## Partial State Saving

Partial state saving is arguably one of the most important changes in JSF 2 (Facelets only). The way it works is, rather than storing the entire component tree state for every view the partial state saving algorithm always restores the tree to its initial state and then applies and keeps track of what's changed only. This rational is that component tree changes are likely to be smaller than the full component tree state thus resulting in less memory usage.

In Web Flow, the JSF component tree state has always been stored in a view-scoped Web Flow variable rather than directly in the HTTP session. Unfortunately to achieve that in JSF 1.2, Web Flow had to take over the entire state saving algorithm. This is why partial state didn't work out of the box in Web Flow 2.1 and had to be disabled through the "javax.faces.PARTIAL\_STATE\_SAVING" context parameter in web.xml.

General improvements in JSF 2 state saving made it possible to delegate to the standard JSF StateManager implementation and plug in a custom ResponseStateManager to override only the parts that do the actual reading and writing of component state. That is what Web Flow 2.2 does to provide support for partial state saving.

The change has been tested with Mojarra and in particular Mojarra version 2.0.3 (recommended version). If you use the Apache MyFaces JSF 2 implementation for the time being you will need to continue to use the "javax.faces.PARTIAL\_STATE\_SAVING" parameter to disable partial state saving. Unfortunately in MyFaces it wasn't as simple to customize how state is where state is read from and written to so it will take a little more time.

## Single FacesContext Per Request

Part of the changes for partial state saving required making sure a single FacesContext instance is used for the duration of a single flow request. This is probably a welcome change for JSF users as evidenced by a few of your comments in JIRA. To avoid getting a NullPointerException on FacesContext you will need to add this FlowExecutionListener:

```xml
Copy
<webflow:flow-executor id="flowExecutor">
    <webflow:flow-execution-listeners>
        <webflow:listener ref="facesContextListener" />
    </webflow:flow-execution-listeners>
</webflow:flow-executor>

<bean id="facesContextListener" class="org.springframework.faces.webflow.FlowFacesContextLifecycleListener"/>
```

This is needed regardless of the JSF version used.

## More JSF 2 Features

The only features that aren't supported are the ones where Web Flow provides core value including navigation and scopes. JSF 2 uses conventions to simplify navigation rules, adds conditional navigation, and provides view, flash, and custom scopes. You will find that Web Flow continues to provide significant value in both of these areas.

View parameters is another feature that isn't supported. Web Flow does provide a way to access request parameters and to bind them to fields of scoped beans. If you however have any good use cases in mind please do provide us with feedback.

Any other features not already mentioned (composite components, JSR-303 validation, system events, etc) are expected to work. With regards to composite components the following Mojarra [issue](https://javaserverfaces.dev.java.net/issues/show_bug.cgi?id=1690) may affect you. If so please vote for it.

## JSF 2 Component Libraries

In addition to its JSF integration, Spring Web Flow currently ships with a small library of components. The Spring Faces component library builds on the Dojo JavaScript toolkit and provides Ajax behavior, resource handling, and client-side validation in a progressive enhancement style. Much of this overlaps with what JSF 2 provides. Hence we have a choice to either extend support for JSF 2 to include the Spring Faces component library or to integrate closely with other component libraries popular in the JSF community. We believe the latter option will provide significantly more value to you.

At this point I am happy to announce we are working closely with the team behind [PrimeFaces](http://www.primefaces.org/) to bring you a close integration with its library of components. PrimeFaces is the first component library to support JSF 2 and is rapidly gaining in popularity. Much like Spring Faces it builds on a client-side JavaScript toolkit (jQuery) and has an impressive array of components that is growing by the day. If you haven't checked out the PrimeFaces component [showcase](http://www.primefaces.org:8080/prime-showcase/ui/home.jsf) please do so.

As a result you can expect Spring Web Flow 2.2 to release with JSF 2 samples featuring PrimeFaces components demonstrating effective use of Web Flow, JSF 2 and a first-class JSF 2 component library.

## Conclusion

Web Flow 2.2 will be the first release to provide support for core JSF 2 features and close integration with the PrimeFaces component library. If you're a JSF user I hope you will find this an exciting step forward. To try the release please [download](http://www.springsource.com/download/community?project=Spring%20Web%20Flow) it, run the updated booking-faces sample, and give us your feedback. You can expect a release candidate at the end of this month in sync with the [PrimeFaces 2.2](http://code.google.com/p/primefaces/wiki/Roadmap) release.

Meanwhile work on Web Flow 3 is continuing towards a first milestone. The defining feature of Web Flow 3 is Java flow definitions. The JSF work being done in the 2.2 branch will feed into the 3.0 branch.