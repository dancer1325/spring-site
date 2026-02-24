---
title: GORM for MongoDB: New Milestone, Richer Experience
source: https://spring.io/blog/2011/02/15/gorm-for-mongodb-new-milestone-richer-experience
scraped: 2026-02-24T08:46:21.793Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Graeme Rocher |  February 15, 2011 | 0 Comments
---

# GORM for MongoDB: New Milestone, Richer Experience

_Engineering | Graeme Rocher |  February 15, 2011 | 0 Comments_

Last year we [introduced support for MongoDB in GORM](http://blog.springsource.com/2010/11/15/yet-another-flavour-of-gorm-mongodb/#comments) (along with many [other](http://blog.springsource.com/2010/09/07/announcing-gorm-for-redis/) [GORM](http://grails.1312388.n4.nabble.com/ANN-GORM-for-Riak-td3090059.html) [implementations](http://blog.springsource.com/2010/10/26/introducing-gorm-for-gemfire/)) and it has been extremely well received by the community. We have had a ton of feedback, and today we are pleased to announce a new release (Milestone 2) which addresses some of the feedback we have received.

**Embedded Document Support**

The number one requested feature was nested document support and in this release we have improved that significantly. Now you can embed other domains using the standard embedded mapping in GORM:

```groovy
Copyclass Person {
  String firstName
  String lastName
  Address address
  static embedded = ['address']
}
```

The embedded domains get stored in a nested document within the primary Mongo document. In addition, lists and maps of basic types can now also be persisted to native Mongo ArrayList and hashes:

```groovy
Copyclass Person {
	List<String> friends
	Map pets
}
...

new Person(friends:['Fred', 'Bob'], pets:[chuck:"Dog", eddie:'Parrot']).save(flush:true)
```

Both embedded domains and lists and maps get stored within the primary Mongo document for the domain allowing more of the common MongoDB patterns to be implemented using GORM.

**Geospacial Indexing and Querying**

MongoDB has native support for [Geospacial indexing and querying](http://www.mongodb.org/display/DOCS/Geospatial+Indexing) and this is now supported in GORM for MongoDB. You can define a list or map as being "geo-indexed":

```groovy
Copyclass Hotel {
	String name
	List location
	static mapping = {
		location geoIndex:true
	}
}
```

And then easily persist the geo data using a two-dimensial list representing latitude and longitude:

```groovy
Copynew Hotel(name:"Hilton", location:[50, 50]).save()
```

Alternatively, and possibly more readable, you can use a map containing the latitude and longitude values:

```groovy
Copynew Hotel(name:"Hilton", location:[lat: 40.739037, long: 73.992964]).save()
```

Once persisted a domain class can then be queried with the new findBy\*Near syntax:

```groovy
Copydef h = Hotel.findByLocationNear([50, 60])
assert h.name == 'Hilton'
```

You can also use bound queries to locate a position within a rectangle using the findBy\*WithinBox method :

```groovy
Copydef box = [[40.73083, -73.99756], [40.741404,  -73.988135]]
def h = Hotel.findByLocationWithinBox(box)
```

Or within a circle using the findBy\*WithinCircle method:

```groovy
Copydef center = [50, 50]
def radius = 10
def h = Hotel.findByLocationWithinCircle([center, radius])
```

**Schemaless Domain Models**

MongoDB is completely schemaless meaning you are not limited to a fixed number of columns like in a relational database. GORM for MongoDB now supports schemaless domain models. You can continue to specify your fixed domain properties inside your domain model:

```groovy
Copyclass Plant {
    boolean goesInPatch
    String name
}
```

However, you can now also persist additional properties using the Groovy subscript operator:

```groovy
Copydef p = new Plant(name:"Pineapple")
p['color'] = 'Yellow'
p['hasLeaves'] = true
p.save()
p = Plant.findByName("Pineapple")

println p['color']
println p['hasLeaves']
```

There are many more improvements including the ability to customize index creation, support for query-by-example and more complete support for the GORM API. [The documentation](http://grails.github.com/inconsequential/mongo/manual/index.html) has been updated to cover all these new features. Let us know what you think, your feedback is invaluable.

One final plug, if you are in the Madrid area and want to know more about GORM for MongoDB come down to the [Spring IO conference this Thursday](http://www.javahispano.org/springio11/) where there will be many more talks on Spring, Grails and GORM.