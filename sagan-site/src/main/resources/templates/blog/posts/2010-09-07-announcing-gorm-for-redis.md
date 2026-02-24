---
title: Announcing GORM for Redis
source: https://spring.io/blog/2010/09/07/announcing-gorm-for-redis
scraped: 2026-02-24T08:53:25.201Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Graeme Rocher |  September 07, 2010 | 0 Comments
---

# Announcing GORM for Redis

_Engineering | Graeme Rocher |  September 07, 2010 | 0 Comments_

One of the major movements inspired by the rise of the [cloud platform](http://blog.springsource.com/2010/08/31/cloud-platform/) is the growing interest in alternative storage techniques to traditional relational databases. One such storage mechanism is [Redis](http://code.google.com/p/redis/), a high performance key/value store that is playing an important part in future cloud infrastructure.

There has been a lot of interest in Redis within the Grails community and hot on the heels of the [Redis 2.0.0 release](http://code.google.com/p/redis/wiki/Redis_2_0_0_Changelog) we are pleased to announce the availability of [GORM for Redis Milestone 1](http://grails.github.com/inconsequential/redis/).

What is GORM for Redis? Quite simply it allows Grails developers used to the convenience of features such as [dynamic finders](http://grails.org/doc/latest/guide/5.%20Object%20Relational%20Mapping%20\(GORM\).html#5.4.1%20Dynamic%20Finders), [criteria](http://grails.org/doc/latest/guide/5.%20Object%20Relational%20Mapping%20\(GORM\).html#5.4.2%20Criteria) and [named queries](http://grails.org/doc/latest/ref/Domain%20Classes/namedQueries.html) to take advantage of Redis as their underlying store instead of Hibernate.

Once you have [Redis up and running](http://grails.github.com/inconsequential/redis/manual/guide/2.%20Getting%20Started.html) you can install GORM for Redis from the Grails command line:

```groovy
Copygrails install-plugin redis
```

If you uninstall the Hibernate plugin then all domain classes in grails-app/domain will become Redis entities instead, otherwise you can specify an individual entity as persistable with Redis using:

```groovy
Copystatic mapWith = "redis"
```

Once you have your Redis domain classes ready you can continue to use the regular GORM API methods such as save(), delete(), dynamic finders etc.

A [lower-level API](http://grails.github.com/inconsequential/redis/manual/guide/7.%20The%20Low-level%20API.html) is also included if you want to build your own indices:

```groovy
Copydef theSimpsons = Person.findAllByLastName("Simpson")
def list = redis.list("the.simpsons")
theSimpsons.each { list << it.id }
```

And then query the indices:

```groovy
Copydef theSimpsons = redis.entities(Person, "the.simpsons")
theSimpsons.each {
    println it.firstName
}
```

See the [full documentation](http://grails.github.com/inconsequential/redis/) for further information on working with the lower level API and other features. There is also a [sample application](http://github.com/grails/inconsequential/downloads) available to download.

The Redis plugin itself is built on the [Inconsequential](http://github.com/grails/inconsequential) codebase which is designed as an abstraction above NoSQL stores. We also have in-progress support for other alternative stores such as Cassandra and JCR.

The project is open source and we are interested in collaborating with the NoSQL community to build out similar support as that found in GORM for Redis. There is a GORM TCK which you can run against an implementation to test compatibility which we continue to extend to cover as many features of GORM as possible.

If you're interested in helping us on our quest give us a shout on the Inconsequential [mailing list](http://groups.google.com/group/inconsequential).

This is a milestone release, so we're interested in hearing your feedback as we head closer to milestone 2 and the inevitable final release.

Enjoy!