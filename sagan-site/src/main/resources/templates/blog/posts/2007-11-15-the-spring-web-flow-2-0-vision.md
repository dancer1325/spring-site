---
title: The Spring Web Flow 2.0 Vision
source: https://spring.io/blog/2007/11/15/the-spring-web-flow-2-0-vision
scraped: 2026-02-24T09:23:39.186Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  November 15, 2007 | 0 Comments
---

# The Spring Web Flow 2.0 Vision

_Engineering | Keith Donald |  November 15, 2007 | 0 Comments_

Spring Web Flow 2.0 M2 has just [released](http://www.springframework.org/node/556). I am particularly excited about this release because it sets the foundation we need to realize the bold vision we have for our community for the future. In this entry, I'll explain what that vision is, and exactly what this foundation will enable. I'll also go into detail about the architecture of Web Flow 2.0, and compare it to the 1.0 version.

### The Spring Web Flow 2.0 Vision

The goal of 2.0 is to evolve Spring Web Flow as a controlled navigation engine to offer significantly improved support for JavaServerFaces, flow managed persistence, and asynchronous event handling (Ajax) natively. The new Spring Faces project will build on Web Flow 2.0 to provide first-class support for JSF views in a Spring environment. In addition, Web Flow will continue to provide first-class support for Spring MVC-based views, allowing native JSF and MVC views to be used to full-power, even in the same application if desired.

*\* UPDATE: The vision above was updated on 1/11/08 after considering large amounts of feedback from the Spring community since The Spring Experience 2007. Based on that feedback, Spring Web Flow 2.0, scheduled to release in March 2008, will remain focused on the orchestration of controlled navigation and application transactions in a web application, usable as a complement to Spring MVC in an action-based MVC environment and JavaServerFaces in a component-based environment. When used with JSF, Spring Web Flow 2.0 can power an entire JSF-based web application as a "black box" or can be mixed with standard JSF navigation handlers that implement free-navigation requirements.* *2.0, therefore, will be an evolutionary release adding first-class support for JSF and Ajax, supporting Java 1.4+, and providing full backwards compatibility with the SWF 1.0 flow definition language.*

Now I'd like to go into a little more detail about the Web Flow 2.0 engine architecture, and how it compares to version 1.0. First lets start with a little 1.0 history.

### A Little 1.0 History...

In Spring Web Flow 1.0, the SWF controller engine cared for one half of the web request lifecycle; the half related to request processing, often called the *action phase*. The other half, the *render phase*, was pushed off on the caller: either Spring MVC, Struts, or JSF front controllers. This can be shown in the SWF 1.0 architectural diagram below:

![SWF 1.x Architecture](http://static.springframework.org/spring-webflow/images/webflow-1.x-arch.png "SWF 1.x Architecture")

The primary benefit of this architecture is it makes it natural to introduce Spring Web Flow onto existing projects. Whether you are using Struts, Spring MVC, or JSF, you can plug Web Flow in to handle your more complex user interactions, and use plain controllers for the rest.

The downside of this approach is it makes it difficult to apply application control logic during the view rendering phase of the request lifecycle without resulting to front controller specific adapters. Consider, for example, the desire for a flow-managed persistence context. Such a context should be allocated when a new flow execution begins, de-allocated when it ends, and disconnected after intermediate view renderings while we wait for the user to continue. If view rendering is not under the flow's control, how do you issue the disconnect callback at the right time? Similar problems exist in the areas of exception handling, concurrency management, and security.

Another downside of the SWF 1.x approach is it requires duplication of effort to "fit" Web Flow in to some environments, particularly a JSF FacesServlet. In the JSF case, both Web Flow and the JSF implementation were fighting over control over the URLs and how to manage server-side state.

### Enter Spring Web Flow 2.0

Beginning with Web Flow 2.0 M2, the entire web request lifecycle is now under the control of Spring Web Flow, including the view rendering phase. Furthermore, Spring Web Flow can now render responses using any view technology, with first-class support for Java Server Faces and Spring MVC-based views. In effect, this means SWF 2.0 is one of the few in its class that offers a unified controller model for all types of user interactions -- stateless and stateful alike -- with support for multiple view technologies as well. This also means the entire web request lifecycle can now be observed using native Web Flow execution hooks, allowing for security, exception handling, performance management, concurrency management, and persistence context management policies to be applied centrally at the proper points in the request lifecycle The new SWF 2 architecture, shown running inside a Spring MVC DispatcherServlet, is shown below:

![SWF 2.x Embedded Architecture](http://static.springframework.org/spring-webflow/images/webflow-2.x-embedded-arch.png "SWF 2.x Embedded Architecture")

Subtle, but important difference.

As of Spring Web Flow 2.0 M2, four concrete Web Flow view handling strategies have been proven, and one to several of these strategies can be used in any one web application. Each of these strategies is highlighted in turn below:

#### Java Server Faces

The first view handling strategy supported is Java Server Faces. Through the Spring Faces project, the SWF engine can now act as a container for JSF and fully drive the JSF UI component lifecycle, combining all the strengths of the SWF application controller model with all the strengths of the JSF UI component model. As a result of this, we bring the following to the table for our community:

-   A Spring-centric way of configuring and deploying a Spring Web application that uses JSF. To get up and running, you deploy a Spring Web Servlet and point it at your bean definition files, very similar to how you configure a Spring MVC web app today. No faces-config.xml or any other special JSF artifacts are required. This makes it very easy for Spring users to take advantage of JSF without any of the traditional drawbacks. You can even use JSF inside a Spring MVC DispatcherServlet if you desire, when running in "embedded" mode.

-   Automatic support for POST+REDIRECT+GET pattern to prevent duplicate submits and browser warnings when using browser navigational buttons. This is possible for the same reasons: Spring Web Flow supports this pattern natively, and we have integrated JSF into our model.

-   Flow-managed UI component state. This is particularly interesting as use of JSF traditionally implies a large amount of HTTP Session state for storing the component tree. JSF component state is now fully managed as SWF FlowExecution instance state, which means how that state is stored is a function of the flow execution repository in use. This means it is possible to implement a JSF app with no session storage whatsoever. This also means session storage is never allocated for stateless or "REST-ful" interactions. It also means when session storage is allocated for stateful flow executions, the amount of storage allocated is less and the scope of that state is defined (and generally shorter in practice compared to your traditional JSF web application).

#### External Systems

The second type of view handling strategy we have proven is the ability for the SWF engine to communicate with external systems and conversational contexts over HTTP (though the API is protocol independent). A good example of this is what a e-shopping site might use a third-party like paypal for. Lets say you are guiding the user through a e-shopping experience, and as part of that experience you need to pause and redirect the user to paypal to complete a payment authorization process. Paypal, after taking over control for authorizing payment, will then call you back so you can resume the user's e-shopping experience from where you paused. This is supported generally by passing the external service a callback URL it redirects to when it is done.

Such a pattern is now supported natively by the SWF engine. To do something like this, you would simply issue an "external redirect" to the external system. Spring Web Flow now handles embedding the proper flow execution callback URL in the redirect that is sent to the external system.

#### Resources

The third type of view handling strategy we have proven is the ability to serve resource content (images, javascript files, css files, etc) from resource bundles such as .jar files. We have a pre-defined "REST-ful" flow installed by Spring Faces for serving Javascript and CSS resources needed by the Ext and Dojo libraries, when Ext and Dojo JavaScript widgets are rendered by Spring Faces JSF components.

#### Spring MVC Views

Finally, the fourth type of view handling strategy we have proven out is the ability to serve Spring MVC-based views. This allows existing Spring MVC view templates to work as they always have with Web Flow 2.0, which is important for our existing Spring MVC and Web Flow users.

### Conclusion

This post provided a high-level overview of the goals of the Spring Web Flow 2.0 release, and the architectural groundwork laid in the recent [Spring Web Flow 2.0 M2 release](http://www.springframework.org/node/556). Watch for follow up entries that highlight the key new features in M2, and the new features we are busy implementing now for M3. Jeremy Grelle, lead of the Spring Faces project, particularly has a lot exciting to talk about regarding the new JSF and Ajax support!