---
title: Introducing GORM for Gemfire
source: https://spring.io/blog/2010/10/26/introducing-gorm-for-gemfire
scraped: 2026-02-24T08:52:16.098Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Graeme Rocher |  October 26, 2010 | 0 Comments
---

# Introducing GORM for Gemfire

_Engineering | Graeme Rocher |  October 26, 2010 | 0 Comments_

One of the many reasons for the rise of NoSQL datastores is the need to scale applications beyond their traditional comfort zone in the relational world. The irony is that Gemfire has been doing exactly this long before the term NoSQL was even coined by providing scale to some of the largest financial organizations in the world.

Gemfire is far more than a cache, but a complete data fabric with support for Grid Computing, Map/Reduce, continuous queries and transactional write-behind.

For those of you who attended the keynote at the hugely successful [SpringOne2GX](http://www.springone2gx.com/conference/chicago/2010/10/home) conference this may be old news. For the rest today I am pleased to announce the availability of the [GORM for Gemfire](http://grails-plugins.github.com/grails-gemfire/docs/manual/index.html) plugin for Grails.

Just like [GORM for Redis](http://blog.springsource.com/2010/09/07/announcing-gorm-for-redis/), the Gemfire plugin lets you use great GORM features like dynamic finders, criteria queries and named queries on top of the Gemfire distributed data fabric. GORM for Gemfire translates your queries into Gemfire's Object Query Language (OQL.).

Beyond supporting dynamic finders the plugin also supports a rich API for executing continuous queries using a special "cq" namespace and closures:

```groovy
CopyPerson.cq.findAllByLastName("Flintstone") { event ->
	if(!event.throwable) {
		println "NEW FLINSTONE ${event.newValue.firstName}"
	}
}
```

The plugin also allows closures to be executed as Gemfire functions that are serialized across your partitioned Gemfire regions and executed where the data lives allowing commons patterns such as Map/Reduce:

```groovy
Copydef results = Plant.executeFunction([p.id]) { ctx ->
  ctx.lastResult ctx.localData[ctx.filter.iterator().next()]
}
assert results[0].name == 'cabbage'
```

We have prepared an introductory video for those who want to get up to speed with using GORM for Gemfire within a Grails application:

[![GORM for Gemfire Screencast](http://blog.springsource.com/wp-content/uploads/2010/10/gemfire_thumbnail.jpg "GORM for Gemfire Screencast")](http://videos.springsource.org/grails/grails_gemfire.mov)

Further information on how to get started can be found in the [Gemfire plugin's user guide](http://grails-plugins.github.com/grails-gemfire/docs/manual/index.html) and official [Gemfire developer documentation](http://www.gemstone.com/docs/6.5.0/product/docs/html/Manuals/wwhelp/wwhimpl/js/html/wwhelp.htm#href=DevelopersGuide/DevGuide%20Title/TitlePageHTML.html). Enjoy!