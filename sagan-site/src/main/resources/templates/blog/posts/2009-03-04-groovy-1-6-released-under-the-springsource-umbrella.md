---
title: Groovy 1.6 released under the SpringSource umbrella
source: https://spring.io/blog/2009/03/04/groovy-1-6-released-under-the-springsource-umbrella
scraped: 2026-02-24T09:10:42.406Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Guillaume Laforge |  March 04, 2009 | 0 Comments
---

# Groovy 1.6 released under the SpringSource umbrella

_Engineering | Guillaume Laforge |  March 04, 2009 | 0 Comments_

I'm very pleased to report here the very recent [release of Groovy 1.6](http://docs.codehaus.org/display/GROOVY/2009/02/18/The+final+version+of+Groovy+1.6+is+released), which happened under the SpringSource umbrella, since the [acquisition of G2One by SpringSource](http://www.springsource.com/g2one).

[![Groovy dynamic language for the JVM](http://blog.springsource.com/wp-content/uploads/2009/03/groovy-logo.png "Groovy 1.6")](http://groovy.codehaus.org)Groovy 1.6 is a very important milestone for the project, **bringing tremendous performance improvements** making Groovy the fastest dynamic language for the JVM, as well as several new powerful features adding more weapons to your dynamic language arsenal.

In particular, beyond the usual bug fixes and minor enhancements, let me mention the following novelties:

-   **multiple assignments**
-   optional return in if/else and try/catch blocks
-   **AST transformations** and all the provided transformation annotations like @Bindable, @Vetoable, @Singleton, @Lazy, @Immutable, @Delegate, @Category, @Mixin and @Newify
-   the **Grape module and dependency system** and its @Grab transformation
-   various Swing builder improvements, thanks to the Swing / [Griffon](http://griffon.codehaus.org) team
-   as well as several Swing console improvements
-   the integration of **JMX builder**
-   **JSR-223 scripting engine built-in**
-   various **metaprogramming improvements**, like the ExpandoMetaClass Domain-Specific Language, per-instance metaclasses even for POJOs, and runtime mixins
-   **OSGi readiness** with the Groovy JAR being a full-blown OSGi bundle

A **very detailed article** on [InfoQ](http://www.infoq.com/), entitled "[What's new in Groovy 1.6?](http://www.infoq.com/articles/groovy-1-6)", delves into all these new features and enhancements, with code samples and explanations.

If you wish to learn more about [Groovy](http://groovy.codehaus.org/), and in particular Groovy 1.6, you should definitely consider attending [SpringOne Europe](http://europe.springone.com/europe-2009), in April, where sessions on Groovy and [Graills](http://grails.org) will be presented.

[![GR8 Conference dedicated to Groovy, Grails and Griffon](http://blog.springsource.com/wp-content/uploads/2009/03/gr8-conf-logo.png "GR8 Conference")](http://www.gr8conf.org)

You could also choose to attend the [GR8 Conference](http://www.gr8conf.org), a **conference dedicated to Groovy, Grails and Griffon**, organized by the [Danish JUG](http://www.javagruppen.dk/) and SpringSource! You'll learn more about the event on the [conference website](http://www.gr8conf.org) or by following its [twitter account](http://twitter.com/gr8conf). The conference takes place in Copenhagen, Denmark, in May, and will provide **several practical sessions and hands-on labs** **to get you up-to-speed on those great Groovy-based technologies**.