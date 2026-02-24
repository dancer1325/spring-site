---
title: SpringSource Application Platform Deployment Options
source: https://spring.io/blog/2008/05/06/springsource-application-platform-deployment-options
scraped: 2026-02-24T09:17:47.698Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sam Brannen |  May 06, 2008 | 0 Comments
---

# SpringSource Application Platform Deployment Options

_Engineering | Sam Brannen |  May 06, 2008 | 0 Comments_

Since we released the SpringSource Application Platform last Wednesday, numerous developers have downloaded the 1.0.0 beta and started taking the Platform for a test drive. As a result, people have begun asking, "How can I deploy my apps on the Platform, and what kind of deployment and packaging options do I have?" Moreover, developers are eagerly requesting to see working samples. In response, the S2AP team will be releasing several sample applications over the coming weeks demonstrating these features and more, but before you get your hands on these samples, I'd like to give you a high-level overview of the deployment and packaging options available in the Platform. After reading this post you'll be ready to hit the ground running with the samples as well as with your own applications.

## Overview

As Rob mentioned in his post last week, [Introducing the SpringSource Application Platform](http://blog.springsource.com/main/2008/04/30/introducing-the-springsource-application-platform/), the Platform supports applications packaged in the following forms:

1.  Raw OSGi Bundles
2.  Java EE WAR
3.  Web Modules
4.  Platform Archive (PAR)

When you deploy an application to the Platform, each deployment artifact (e.g., a single bundle, WAR, or PAR) passes through a deployment pipeline. This deployment pipeline supports the notion of personality-specific deployers which are responsible for processing an application with a certain *personality* (i.e., application type). The 1.0.0 release of the Platform natively supports personality-specific deployers analogous to each of the aforementioned packaging options. Furthermore, the deployment pipeline can be extended with additional personality deployers, and future releases of the Platform will provide support for personalities such as Batch, Web Services, etc.

Let's take a closer look now at each of the supported deployment and packaging options to explore which one is best suited for your applications.

## Raw OSGi Bundles

At its core, the SpringSource Application Platform is an OSGi container. Thus any OSGi-compliant bundle can be deployed directly on the Platform unmodified. You'll typically deploy an application as a single bundle or a set of stand-alone bundles if you'd like to publish or consume services globally within the container via the OSGi Service Registry. Please note, however, that due to the scoping nature of the PAR format, stand-alone bundles will not be able to consume services across application boundaries. In other words, a stand-alone bundle can not reference the services of modules deployed within a PAR.

## WAR Deployment Options

For Web Application Archives (WAR), the SpringSource Application Platform provides support for the following three formats.

1.  Standard Java EE WAR
2.  Shared Libraries WAR
3.  Shared Services WAR

Each of these formats plays a distinct role in the incremental migration path from a standard Java EE WAR to an OSGi-ified web application.

### Standard WAR

As Rob has already pointed out, *"Standard WAR files are supported directly in the Platform. At deployment time, the WAR file is transformed into an OSGi bundle and installed into Tomcat. All the standard WAR contracts are honoured, and your existing WAR files should just drop in and deploy without change."* Support for standard, unmodified WAR files allows you to try out the SpringSource Application Platform on your existing web applications and then gradually migrate toward the *Shared Libraries WAR*, *Shared Services WAR*, and *Web Module* formats.

### Shared Libraries WAR

If you have experience with developing and packaging web applications using the standard WAR format, you're certainly familiar with the pains of *library bloat*. So, unless you're installing shared libraries in a common library folder for your Servlet container, you have to pack all JARs required by your web application in /WEB-INF/lib. Prior to the release of the Platform, such library bloat has essentially been the *norm* for web applications, but now there is a better solution! The *Shared Libraries WAR* format reduces your application's deployment footprint and eradicates library bloat by allowing you to declare dependencies on libraries via standard OSGi manifest headers such as Import-Package and Require-Bundle. The Platform provides additional support for simplifying dependency management via the Import-Library and Import-Bundle manifest headers which are essentially macros that get expanded into OSGi-compliant Import-Package statements.

For detailed information on what kind of libraries you already have at your disposal, check out the [SpringSource Enterprise Bundle Repository](http://www.springsource.com/repository/app/). In addition, Andy Wilkinson will be posting a blog later this week explaining how to make the most of the Bundle Repository within your applications and the SpringSource Application Platform. So stay tuned.

### Shared Services WAR

Once you've begun taking advantage of declarative dependency management with a Shared Libraries WAR, you'll likely find yourself wanting to take the next step toward reaping further benefits of an OSGi container: sharing services between your OSGi-compliant bundles and your web applications. By building on the power and simplicity of [Spring-DM](http://www.springframework.org/osgi), the *Shared Services WAR* format puts the OSGi Service Registry at your fingertips. As a best practice you'll typically publish services from your domain, service, and infrastructure bundles via <osgi:service ... /> and then consume them in your web application's ApplicationContext via <osgi:reference ... />. Doing so promotes programming to interfaces and allows you to completely decouple your web-specific deployment artifacts from your domain model, service layer, etc., and that's certainly a step in the right direction. Of the three supported WAR deployment formats, the Shared Services WAR is by far the most attractive in terms of modularity and reduced overall footprint of your web applications.

## Web Modules

Above and beyond WAR-based deployment formats, the SpringSource Application Platform introduces a deployment and packaging option for OSGi-compliant web applications, the *Web Module* format. Web modules have a structure similar to a Shared Services WAR and can therefore take full advantage of all three WAR deployment formats. In addition, web modules benefit from reduced configuration for Spring MVC based applications via new OSGi manifest headers such as Web-DispatcherServletUrlPatterns and Web-FilterMappings. For further details on these and other Web-\* manifest headers, please consult the Platform's [Programmer Guide](http://static.springsource.com/projects/applicationplatform/1.0.x/programmer-guide/html/). Upcoming releases of the Platform will also support web.xml *fragments* as well as the aforementioned manifest headers.

If you're building a Spring MVC based web application as a web module, you won't need to worry about configuring a *root* WebApplicationContext or an ApplicationContext for your DispatcherServlet. Based on metadata in your web module's /META-INF/MANIFEST.MF, the Platform will auto-generate an appropriately configured web.xml for you on-the-fly, and your application will use the ApplicationContext created for your web module by Spring-DM. Future releases will add additional support to simplify configuration of [Spring Web Flow](http://www.springframework.org/webflow) based web applications as well.

## Migration path from WAR to Web Module

The following diagram graphically depicts the migration path from a Standard WAR to a Web Module. As you can see, the libs move from within the deployment artifact to the Bundle Repository. Similarly, the services move from within the WAR to external bundles and are accessed via the OSGi Service Registry. In addition, the overall footprint of the deployment artifact decreases as you move towards a Web Module.

![Migration path from WAR to Web Module](http://blog.springsource.com/main/wp-content/uploads/2008/05/migration-path-war-to-web-module.png)

## Platform Archives

The final piece of the puzzle is the PAR (Platform Archive) deployment format. A PAR is a standard JAR which contains all of the modules of your application (e.g., service, domain, and infrastructure bundles as well as a WAR or web module for web applications) in a single deployment unit. This allows you to deploy, refresh, and undeploy your entire application as a single entity. For those of you familiar with Java EE, a PAR can be considered a replacement for an EAR (Enterprise Archive) within the context of an OSGi container. As an added bonus, modules within a PAR can be refreshed independently and on-the-fly, for example via the [SpringSource Application Platform Tool Suite](http://www.springsource.com/beta/applicationplatform/) (register for the beta program and check out the Eclipse tooling support).

Furthermore, PARs *scope* the modules of your application within the Platform. Scoping provides both a physical and logical application boundary, shielding the internals of your application from any other applications deployed within the Platform. This means your application doesn't have to worry about clashing with other running applications (e.g., in the OSGi Service Registry). You get support for load-time weaving, classpath scanning, context class loading, etc., and the Platform does the heavy lifting for you to make all this work seamlessly in an OSGi environment. If you want to take full advantage of all that the SpringSource Application Platform and OSGi have to offer, packaging and deploying your applications as a PAR is definitely the recommend choice.

## Where to go from here

If you haven't already done so, I encourage you to join the [beta program](http://www.springsource.com/beta/s2ap) and take the SpringSource Application Platform for a test drive yourself.

You'll find up-to-date documentation in the [user guide](http://static.springsource.com/projects/s2ap/1.0.x/user-guide/html/) and [programmer guide](http://static.springsource.com/projects/s2ap/1.0.x/programmer-guide/html/), and if you happen to run into any issues deploying your applications or have recommendations on how we can improve the Platform, please don't hesitate to [create a JIRA issue](http://issuetracker.springsource.com/browse/PLATFORM).

And last but not least, be sure to check out upcoming posts on the [SpringSource Team Blog](http://blog.springsource.com) to keep abreast of news regarding the Platform and to see working examples including an OSGi-ified Spring PetClinic sample application which has been modularized and packaged as a PAR.