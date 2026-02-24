---
title: Spring into Mobile Application Development
source: https://spring.io/blog/2010/11/20/spring-into-mobile-application-development
scraped: 2026-02-24T08:50:56.383Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  November 20, 2010 | 0 Comments
---

# Spring into Mobile Application Development

_Engineering | Keith Donald |  November 20, 2010 | 0 Comments_

At [SpringOne2gx](http://www.springone2gx.com) we announced exciting new initiatives in the areas of social media and mobile application development. A few weeks ago, Craig Walls released [Spring Social](http://www.springsource.org/spring-social). Today, Roy Clarkson released [Spring Mobile](http://www.springsource.org/spring-mobile) and [Spring Android](http://www.springsource.org/spring-android). In this post, I'd like to highlight these projects and share how Spring aims to simplify mobile application development.

### Choices in Mobile Application Development

If you attended SpringOne2gx this year, you've seen [Greenhouse](http://greenhouse.springsource.org), an app we built for our community that also serves as a reference and driver for Spring technology. Craig showed you some of the [social elements](http://blog.springsource.com/2010/11/03/socializing-spring-applications) of Greenhouse, such as the ability to connect your account with Twitter and Facebook. There are also a number of mobile elements. Specifically, Greenhouse doubles as a mobile web app, and sports native [Greenhouse for iPhone](http://itunes.apple.com/us/app/greenhouse/id395862873) and Android clients.

Like many organizations today, we had to answer the basic question of "what mobile platforms to target?" In the end, we chose to invest in a native experience for iPhone and Android users, while also developing a cross-platform mobile web app. Our decision to go native was driven by the fact the app is consumer-oriented, and a large number of prospective consumers (application developers) own iPhone and Android devices. At the same time, the mobile web app aims to provide a good baseline experience that works cross-platform, something that's possible today with the rise of WebKit and HTML 5.

From our development work, grew Spring Framework contributions: first, a **Spring Mobile** project that provides extensions to Spring MVC for developing mobile web apps; and second, a **Spring Android** project that supports the development of native Android clients that communicate with Spring-based back-ends. I'll take you through each of these projects in turn.

### Spring Mobile

The first problem we tackled was designing a web app that was pleasant for mobile visitors to use. While a smartphone may have a capable web browser, it still has a small screen and that needs to be accounted for. There are essentially two approaches to dealing with this problem:

1.  Detect the device that originated the web request and serve a separate site to mobile devices.
2.  Serve a single site, but progressively enhance it for desktop users by using CSS 3 media queries and JavaScript.

You can find examples of both techniques in the wild today; for example, the conference site [Lanyrd](http://www.lanyrd.com) enhances through client-side detection, while [SpeakerRate](http://www.speakerrate.com) uses server-side detection that redirects mobile visitors to a separate site (see for yourself by installing the Firefox User Agent Switcher and setting your user agent to iPhone).

In Greenhouse, we started with server-side detection. Specifically, we aimed to apply a different page layout if the device was a mobile device. Out of this grew a general purpose "Device Resolver Abstraction", which is the defining feature of Spring Mobile 1.0.0.M1. Some highlights of this feature include:

1.  A HandlerInterceptor that uses a DeviceResolver to detect the Device that originated the current HttpServletRequest.
2.  The ability to inject the detected Device into @Controller methods and view templates to vary logic by device type.

Below are some usage examples from the Greenhouse codebase. First, have a look at the interceptor definition from /WEB-INF/spring/appServlet/servlet-context.xml:

```xml
Copy
<interceptors>
    <!-- On pre-handle, detect the device that originated the web request -->
    <beans:bean class="org.springframework.mobile.device.mvc.DeviceResolvingHandlerInterceptor" />
</interceptors>
```

Now, a JSP template that conditionally renders some content if the device is not a mobile device:

```xml
Copy
Please try again<c:if test="${!currentDevice.mobile}"> or <a href="<c:url value="/signup" />">sign up</a></c:if>.
```

Finally, a Tiles-based page layout that changes if the device is a mobile device:

```xml
Copy
    <definition name="page" templateExpression="/WEB-INF/layouts/${currentDevice.mobile ? 'mobile/' : 'standard/'}page.jsp" />
```

In addition to these features, Spring Mobile 1.0.0.M1 ships:

1.  A HandlerInterceptor that redirects mobile visitors to another URL. This is useful if your mobile site truly is a separate application. Consider Flickr, for example, which will redirect you to [m.flickr.com](http://m.flickr.com) if you access [www.flickr.com](http://www.flickr.com) from your phone.
2.  A DeviceResolver implementation that delegates to WURFL for device detection. WURFL provides a large database of devices and their capabilities. It is useful when you need to know more about the Device that originated the request, such as its specific screen size, manufacturer, model, preferred markup, or other capabilities.

Recently, we have also begun exploring the use of [CSS 3 media queries](http://www.webmonkey.com/2010/09/make-a-big-splash-on-small-screens-with-media-queries/) with [JavaScript](http://www.quirksmode.org/blog/archives/2010/08/combining_media.html#more) to perform client-side detection. This approach has the advantage of not requiring special server-side handling unless you aim to vary the semantic content you send to the device, and not just optimize the style. Not all browsers support media queries, so they may not be an option for you, but if you're [targeting smartphones](http://davidbcalhoun.com/2010/using-mobile-specific-html-css-javascript) with WebKit-based browsers you should be fine. In general, the approach of first designing your app for mobile, then progressively enhancing it for desktop feels quite elegant to me.

### Spring Android

For the Android client, a different set of challenges emerged. We needed to exchange data with the server over HTTPS via REST, and since that data is user-specific we require the user to sign in. Rather than use Basic Auth, where we would need to store username and password credentials on the device itself, we opted for OAuth.

OAuth is an emerging standard that provides a token-based authorization scheme. Essentially, a username and password is traded for an access token, and the access token is used to make requests for protected resources. This means you only need to store the access token with the device for "remember me" functionality. Furthermore, we chose to implement the sign in process whereby the client takes you to the server's web site for connection authorization. In this way, the client never sees your username and passsword, which is important if you allow third-party clients to be developed against your API (which we also want to encourage). Finally, in the event a user's phone is stolen or otherwise compromised, an access token can be invalidated without the risk of username and password compromise.

Out of this work, came the desire to get specific modules of the Spring Framework working in an Android environment. Specifically, we aimed to use [RestTemplate](http://blog.springsource.com/2009/03/27/rest-in-spring-3-resttemplate) for the REST API calls, and [Spring Security](http://static.springsource.org/spring-security/oauth/index.html) for the OAuth client.

I'm pleased announce that the first milestone of Spring Android ships an "Android-ready" RestTemplate. We're using it in Greenhouse, and we encourage you to use it as the REST client in your own Android applications. Check out the example usage below:

```java
Copy
RestTemplate restTemplate = new RestTemplate(new CommonsClientHttpRequestFactory());
Event event = restTemplate.getForObject("https://myapp.com/event/{name}", Event.class, "springone2gx");
```

In future milestones, you can expect more of the Spring Framework to be supported in an Android environment, such as the Spring Security OAuth client.

### Getting Started

The best way to get started is to *see it live* by walking through the Greenhouse app in your own local development environment. As a reference, Greenhouse uses the Spring Mobile and Spring Android projects, as well as Spring MVC, Security, Social, and Integration. The [project page](http://www.springsource.org/greenhouse) provides a [guide](http://www.springsource.org/greenhouse/guide) that shows you how to get the web app, iPhone client, and Android client all running in your local environment in minutes.

If you have questions about features, roadmap, or just want to have a discussion with the development team, please do visit our [community forums](http://forum.springsource.org/forumdisplay.php?f=25). We value your feedback.

### Summary

I'm very excited about all the new initiatives we've got going, and especially what we're doing in the social and mobile space. The first milestones of these projects are just the beginning. I encourage you to get involved in the projects that are useful to you and help us make them the best they can possibly be.