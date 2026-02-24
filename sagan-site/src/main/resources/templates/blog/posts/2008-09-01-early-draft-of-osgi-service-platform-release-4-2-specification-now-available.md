---
title: Early draft of OSGi Service Platform Release 4.2 specification now available
source: https://spring.io/blog/2008/09/01/early-draft-of-osgi-service-platform-release-4-2-specification-now-available
scraped: 2026-02-24T09:14:51.460Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  September 01, 2008 | 0 Comments
---

# Early draft of OSGi Service Platform Release 4.2 specification now available

_Engineering | Adrian Colyer |  September 01, 2008 | 0 Comments_

The OSGi Alliance have posted an [early draft of release 4.2 of the Service Platform specification](http://www.osgi.org/Download/File?url=/download/osgi-4.2-early-draft.pdf "Specification download").  SpringSource employees are active members of both the Core Platform Expert Group (CPEG) and the Enterprise Expert Group (EEG) within the Alliance. My personal involvement has been largely with the EEG, and particularly with RFC 124 "A Component Model for OSGi".

RFC 124 is a standardization of the core ideas behind [Spring Dynamic Modules](http://www.springframework.org/osgi "Spring Dynamic Modules project home page"). If you look at the configuration schema, you'll see that it very closely resembles the "osgi" namespace provided by Spring Dynamic Modules (DM).  RFC 124 takes everything that we have learnt over the last couple of years developing Spring DM and combines this with some key insights from other members of the core and enterprise expert groups to produce a specification that is both based on proven real world experience and also closely integrated with the OSGi Service Platform itself. Many thanks go to the Spring DM development team :- Costin Leau, Hal Hildebrand of Oracle, and Andy Piper of BEA (now Oracle) for all their hard work in helping to develop and test Spring DM, and then to help us take the model forward as the basis for standardization in the OSGi Service Platform.

Trying to standardize Spring DM leads to an interesting conundrum. In Spring DM it's easy to define a component and expose it as a service in the service registry. For example:

<bean id="myBean" class="com.xyz.SomeClass">

<osgi:service ref="myBean" interface="org.xyz.SomeInterface"/>

defines a bean "myBean" (just a regular Spring bean definition) and exposes it in the OSGi service registry under the SomeInterface interface.

The "osgi:service" element comes from Spring DM, but the "bean" element comes from the core Spring Beans schema. A standard based around the Spring DM namespace elements but without the ability to define the components that they refer to would be of little or no use.  So RFC 124 is a standard based on both the Spring DM namespace elements and semantics, and also the core of Spring itself :- the beans schema and its semantics. In RFC 124 a component is defined using the "component" element, but other than a name change from bean to component you'll find the attributes and semantics very familiar indeed.

Here's the standard-based definition of the same component and service registration based on RFC 124:

<component id="myComponent" class="com.xyz.SomeClass">

<service ref="myComponent" interface="org.xyz.SomeInterface"/>

What does this mean for Spring DM? As the standard settles down (there's still work to do in some areas) we will implement the RI for RFC 124 in Spring DM (as far as Spring and Spring DM are concerned, it's "just another namespace" which we can easily map onto existing capabilities). The SpringSource Application Platform which currently supports a Spring DM-based programming model for those wishing to exploit its OSGi capabilities will of course be updated to include the RI giving a standards-based programming and configuration model for OSGi-based enterprise applications.

The next meeting of the Enterprise Expert Group is in a couple of weeks time, where we will be continuing to refine the specification. A "coding camp" for those working on the RIs to accompany the specification is scheduled for later this year.