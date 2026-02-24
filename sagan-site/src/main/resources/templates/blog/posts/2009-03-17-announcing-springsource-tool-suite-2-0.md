---
title: Announcing SpringSource Tool Suite 2.0
source: https://spring.io/blog/2009/03/17/announcing-springsource-tool-suite-2-0
scraped: 2026-02-24T09:10:14.862Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Dupuis |  March 17, 2009 | 0 Comments
---

# Announcing SpringSource Tool Suite 2.0

_Engineering | Christian Dupuis |  March 17, 2009 | 0 Comments_

Today we are pleased to announce the general availability of the 2.0 version of our SpringSource Tool Suite (STS). You can find the press release [here](http://www.springsource.com/node/1384).

For the 2.0 iteration we focused on the two major feature areas that we identified based on the great feedback from our customer base and community: provide the best possible environment for Spring-based application development and provide tools to develop enterprise applications based on OSGi and the SpringSource dm Server.

I'd like to use this blog to introduce some of the new Spring development tools of STS 2.0. The new OSGi development tools have already been highlighted in an [earlier blog](http://blog.springsource.com/2009/03/05/osgi-development-tools-in-sts/).

## Spring Development Tools in STS

STS 2.0 features many enhancements that are focused on every day developer activities and can help to increase the developer productivity.

With the new Visual Spring Configuration Editor (see below) it is now possible to create and edit Spring XML configurations more quickly and with minimal hassle due to new user assistance features such as a graphical representation of the XML content, content assist, hyperlinking and integrated documentation. The Visual Editor integrates tabs for each Spring XML configuration namespace and provides means to add and remove namespaces on the fly.

[![spring-configuration-editor-thumb](http://blog.springsource.com/wp-content/uploads/2009/03/spring-configuration-editor-thumb.png "Spring Configuration Editor")](http://blog.springsource.com/wp-content/uploads/2009/03/spring-configuration-editor.png "Spring Configuration Editor")

To create or edit single XML bean definitions or namespace elements the developer can use UI-elements that will provide guidance on required configuration parameters and inline validation. A New Bean Creation Wizard is also accessible to speed up creation and modification of bean definitions. Furthermore the Visual Editor helps by enabling execution of common tasks with a single click; e.g. exporting a Spring Bean as an OSGi service using the Spring DM configuration namespace and can be easily extended to understand custom Spring configuration namespaces.

For those developers that prefer to stay in XML, the SpringSource Tool Suite provides enhancements on top of [Spring IDE](http://springide.org)’s XML editing capabilities. STS 2.0 validates the XML content as-you-type, removing the need to save the file to unveil validation problems. In addition to validate as-you-type, STS also provides relevant Quick Fixes for reported validation problems (see below).

[![editor-quick-fixes-thumb](http://blog.springsource.com/wp-content/uploads/2009/03/editor-quick-fixes-thumb.png "Quick Fixes")](http://blog.springsource.com/wp-content/uploads/2009/03/editor-quick-fixes.png "Quick Fixes")

With the new Quick Fixes it is now very easy to create a configuration template in XML first and then let STS create the Java class including all configured properties automatically.The new editing and user assistance features can help to significantly lower the required time to edit Spring configuration files and bring the XML editing capabilities of STS to a similar level that developers are used to from editing Java files.

Additionally STS comes with an extension to the Spring IDE Spring Explorer that helps to navigate the usage of Spring annotations such as @Service, @Transactional or @Repository in large code bases (see below). By using the Bean Annotation Grouping it is very easy to navigate complex URL-to-Controller mappings based on the @RequestMapping annotation.

[![annotation-grouping-thumb](http://blog.springsource.com/wp-content/uploads/2009/03/annotation-grouping-thumb.png "Annotation Grouping")](http://blog.springsource.com/wp-content/uploads/2009/03/annotation-grouping.png "Annotation Grouping")

Besides the Spring Development Features outlined above, developers can also benefit from the STS 1.0 features, which also provide user assistance and guidance. The Task-Focused Tutorials, Runtime Error Analysis and Architecture Review Tools have proven to be particularly valuable to Spring developers.

## Download and Installation

You can download SpringSource Tool Suite 2.0 from the [product page](http://www.springsource.com/products/sts). STS comes as a fully integrated Eclipse distribution that builds on top of latest Eclipse Ganymede SR2 release and bundles Spring IDE, dm Server Tools and Eclipse AJDT.

Alongside STS 2.0 we are also releasing new versions of Spring IDE and the dm Server Tools today. In order to make installation of those two as easy as possible we’ve create a consolidated Eclipse update site that contains both plug-ins. The new consolidated update site URL is: `[http://www.springsource.org/update/e3.4](http://www.springsource.org/update/e3.4)`

Certainly you find the new versions also on the well known update site locations. As both Spring IDE and the dm Server Tools require Eclipse WTP to be installed it is easiest to start with the ‘[Eclipse IDE for Java EE Developers](http://www.eclipse.org/downloads)’ package. This package comes with all required dependencies.

## Feedback

As we now go into the next iteration it is always nice to get user feedback. If you have any comment or want to discuss certain features do so in our [community forum](http://forum.springframework.org/forumdisplay.php?f=32) and please feel free to raise [JIRAs](https://issuetracker.springsource.com/browse/STS) for any problem you might find with STS, Spring IDE or the dm Server Tools.