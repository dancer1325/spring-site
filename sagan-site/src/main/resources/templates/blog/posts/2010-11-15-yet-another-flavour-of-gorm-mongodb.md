---
title: Yet Another Flavour of GORM: MongoDB
source: https://spring.io/blog/2010/11/15/yet-another-flavour-of-gorm-mongodb
scraped: 2026-02-24T08:51:15.021Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Graeme Rocher |  November 15, 2010 | 0 Comments
---

# Yet Another Flavour of GORM: MongoDB

_Engineering | Graeme Rocher |  November 15, 2010 | 0 Comments_

Our crusade to make GORM ubiquitous across NoSQL stores hit another milestones today as we are pleased to announce [GORM for MongoDB](http://grails.org/plugin/mongodb "GORM for MongoDB").

MongoDB is a document database that bridges the gap between key-value stores (which are fast and highly scalable) and traditional RDBMS systems (which provide rich queries and deep functionality).

Like the [Redis](http://blog.springsource.com/2010/09/07/announcing-gorm-for-redis/) and [Gemfire](http://blog.springsource.com/2010/10/26/introducing-gorm-for-gemfire/) plugins, GORM for [MongoDB](http://www.mongodb.org/) has full support for CRUD operations:

```groovy
Copydef person = new Person(name:"Fred", age: 45)
person.save()

person = Person.get(person.id)
assert person != null

person.delete()

assert Person.get(person.id) == null
```

Rich querying with [dynamic finders](http://grails.org/doc/latest/guide/5.%20Object%20Relational%20Mapping%20\(GORM\).html#5.4.1%20Dynamic%20Finders):

```groovy
Copydef fred = Person.findByName("Fred")
def adults = Person.findAllByAgeGreaterThan(18)
def teenagers = Person.findAllByAgeBetween(13, 18)
def children = Person.findAllByAgeLessThan(13)
```

Complex query handling with [criteria queries](http://grails.org/doc/latest/guide/5.%20Object%20Relational%20Mapping%20\(GORM\).html#5.4.2%20Criteria):

```groovy
Copydef results = Person.withCriteria {
    like('name', 'F%')
    gt('age', 18)
}
```

And reusable query support with [named queries](http://grails.org/doc/latest/ref/Domain%20Classes/namedQueries.html):

```groovy
Copyclass Person {
   String name
   int age

   static namedQueries = {
         adults { gt 'age', 18 }
         childrenStartingWithF {
              lt 'age', 18
              like 'name', 'F%'
         }
   }
}

Person.adults.list()
Person.adults.findByName("Fred")
Person.childrenStartingWithF.count()
```

All this whilst still allowing access to the lower-level Mongo driver:

```groovy
Copydef fred = Person.collection.findOne(name:"Fred")
```

We have prepared a short screencast demonstrating GORM for MongoDB in action:

[![GORM for MongoDB Screencast](http://blog.springsource.com/wp-content/uploads/2010/11/Mongo-Thumbnail.jpg "GORM for MongoDB Screencast")](http://videos.springsource.org/grails/grails_mongo.mov)

You can checkout the [full documentation on the GORM for MongoDB plugin](http://grails.github.com/inconsequential/mongo/manual/index.html) for more information on installation, configuration and working with the APIs.

GORM for MongoDB is built on the [same codebase](https://github.com/grails/inconsequential) as the Redis and Gemfire support, speaking of which we are extremely excited with upcoming community contributions to the code, including support for Java Content Repository (JCR) and [Riak](https://wiki.basho.com/display/RIAK/Riak) (a scalable key/value datastore with a nice REST API).

We continue to be keen to work with the community on building out support for GORM implementations on top of other datastores, if you're interested in helping out give us a shout on the Grails [mailing list](http://grails.org/Mailing+lists).

Enjoy!