---
title: Spring Web Services 1.0 Released
source: https://spring.io/blog/2007/08/17/spring-web-services-1-0-released
scraped: 2026-02-24T09:25:27.861Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Arjen Poutsma |  August 17, 2007 | 0 Comments
---

# Spring Web Services 1.0 Released

_Releases | Arjen Poutsma |  August 17, 2007 | 0 Comments_

After two years of development, we are pleased to announce that Spring Web Services 1.0 is now available.  

[![Spring-WS Logo](http://static.springframework.org/spring-ws/site/images/spring-ws-logo.png "Spring-WS Logo")](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=178569&release_id=532966)

[Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=178569&release_id=532966) | [Reference documentation](http://static.springframework.org/spring-ws/site/reference/html/index.html) | [API documentation](http://static.springframework.org/spring-ws/site/apidocs/index.html)

[Spring Web Services](/spring-ws) is a product of the Spring community focused on the creation of document-driven, contract-first web services. The key features of Spring Web Services include...

-   Making the best practice the easy practice: Spring Web Services makes enforcing best practices easier. This includes practices such as the WS-I basic profile, Contract-First development, and having a loose coupling between contract and implementation.
-   Powerful mappings: You can route an incoming XML request to any handler depending on message payload, SOAP Action header, or XPath expression.
-   XML API support: Incoming XML messages can be handled in standard JAXP APIs such as DOM, SAX, and StAX, but also JDOM, dom4j, XOM, or even marshalling technologies.
-   Flexible XML Marshalling: The Object/XML Mapping module in the Spring Web Services distribution supports JAXB 1 and 2, Castor, XMLBeans, JiBX, and XStream.  Because it is a separate module, you can use it in other environments as well.  
    
-   Reuse of your Spring expertise: Spring-WS uses Spring application contexts for all configuration, which gets you up-and-running quickly. Also, the architecture of Spring-WS resembles that of Spring-MVC.
-   Support for WS-Security: WS-Security allows you to sign SOAP messages, encrypt and decrypt them, or authenticate against them. And it integrates with [Spring Security](http://acegisecurity.org/)!

Learn more about Spring Web Services at [The Spring Experience](http://www.thespringexperience.com/), December 12 - 15, 2007 at the Westin Diplomat in Hollywood, Florida. Arjen will deliver two sessions on Spring Web Services there: [Introducing Spring Web Services](http://www.thespringexperience.com/speaker_topic_view.jsp?topicId=346), and [WS-DuckTyping with Web Services](http://www.thespringexperience.com/speaker_topic_view.jsp?topicId=347).

See [the release notes](http://opensource.atlassian.com/projects/spring/secure/ReleaseNote.jspa?version=10592&styleName=Text&projectId=10060&Create=Create) for a list of fixes since 1.0-RC2.

Finally, a big word of thanks to all involved. It would not have been possible without you!