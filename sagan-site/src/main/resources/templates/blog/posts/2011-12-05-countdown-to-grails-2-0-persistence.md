---
title: Countdown to Grails 2.0: Persistence
source: https://spring.io/blog/2011/12/05/countdown-to-grails-2-0-persistence
scraped: 2026-02-24T08:31:23.439Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  December 05, 2011 | 0 Comments
---

# Countdown to Grails 2.0: Persistence

_Engineering | Peter Ledbrook |  December 05, 2011 | 0 Comments_

It's been a while since the last Countdown blog post, but the release of 2.0.0.RC3 gives me a good reason to write another. In the last post, I focused on database migration and how we are standardising on the new Database Migration Plugin. I'll be continuing on the theme of persistence here and introducing several great new features, particularly around querying.

## Miscellaneous

Let's start with some of the minor improvements. First, abstract domain classes are now treated as most people would expect: an abstract base domain class results in a table for it and its subclasses. For example, consider the hierarchy shown in the figure. Prior to Grails 2 this would result in separate 'employee' and 'manager' tables. Now you just get the one 'person' table.

[![Abstract Person class extended by Employee and Manager classes](http://blog.springsource.org/wp-content/uploads/2011/11/abstract-domain-inheritance.png "Abstract domain hierarchy")](http://blog.springsource.org/wp-content/uploads/2011/11/abstract-domain-inheritance.png)

Unfortunately this constitutes a breaking change, but the new behaviour makes much more sense and so we think the break is justified in this case. If you are using abstract domain classes currently, then you can either: (1) move them into the 'src/groovy' directory when you upgrade; or (2) migrate your data, for example with the Database Migration plugin.

### Find or create

The next feature simplifies a common coding pattern that's particularly useful inside the application bootstrap. Have you ever found yourself writing code like the following?

```groovy
Copydef adminRole = Role.findByName("admin")
if (!adminRole) {
    adminRole = new Role(name: "admin").save()
}
```

It's basically "I need a particular object, but if it doesn't exist create it." It's common and verbose enough to justify a dedicated method. In fact there are now four methods just for this pattern. They are:

1.  findOrCreateBy()
2.  findOrSaveBy()
3.  findOrCreateWhere()
4.  findOrSaveWhere()

The first two are variants of the dynamic findBy\*(). The second two accept a map of arguments containing the domain class properties and their values. Each set also has "Create" and "Save" versions, the former indicating that if the domain instance does not exist it should be created *but not saved*. The latter of course will automatically save the new instance.

So how do each of these look with our administrator role example?

1.  findOrCreateByName("admin")
2.  findOrSaveByName("admin")
3.  findOrCreateWhere(name: "admin")
4.  findOrSaveWhere(name: "admin")

Much more succinct and informative I think you'll agree.

### Multiple data sources

Before going onto the big features (AKA my favourite ones), I'd just like to point out that Burt Beckwith's Datasources plugin has now been folded into Grails core. This means that as soon as you download Grails you can start defining multiple (relational) data sources. You can then do interesting things such as map a domain class to a particular database:

```groovy
Copyclass User {
    ...
    static mapping = {
        datasource 'auth'
    }
}
```

or even specify the data source to use for individual retrievals:

```groovy
Copy// Retrieve the zip code specifically from our audit DB
def zipCode = ZipCode.auditing.get(42)
```

and stores:

```groovy
Copy// Save some zip code to the audit DB
zipCode.auditing.save()
```

The [user guide](http://grails.org/doc/2.0.0.RC3/guide/conf.html#multipleDatasources) has more information on just how it works from a user perspsective.

## New query syntax

Now for the main event: the new Where queries. Grails hasn't been short of options for querying, with dynamic finders, criteria queries and HQL support, so you may wonder why we're introducing another one. Well, criteria queries are powerful, but the syntax can be confusing. HQL is typically for more advanced usage. Dynamic finders only work for the simplest scenarios and don't let you query on relations. Where queries bridge the gap between dynamic finders and criteria/SQL by introducing a more natural (for programmers) syntax while offering almost as much power as criteria queries.

Let's look at a simple example:

```groovy
Copydef year2000 = ...
Book.where { author =~ "Stephen%" && publishDate > year2000 }.list()
```

This one query demonstrates several powerful features, but the first thing that strikes me is how readable it is. As a Groovy or Java developer, I recognise the operators used in the criteria and how they combine. I can tell very quickly that the above query will return me the books whose author name begins with "Stephen" and whose publication date is after the year 2000. Even without reading any documentation on the Where query syntax!

Beyond the readability of the above query, note the use of operators for criteria (=~ maps to 'ilike' in SQL), logical operators for combining criteria (&& and ||) and the use of the list() method to actually execute the query. The logical operators are a god-send to me because I find them easier to read and understand than the 'and' and 'or' blocks in criteria queries.

The significance of the list() method is that DomainClass.where() returns what is known as a detached query, meaning you can reuse it again and again. You can even use dynamic finders in place of list() to filter results further. In fact, detached queries are also available using the standard criteria query syntax - again [the user guide](http://grails.org/doc/2.0.0.RC3/guide/GORM.html#detachedCriteria) has more information on that.

Since the Where query takes a closure, you can do more advanced things such as include Groovy conditions in the criteria:

```groovy
Copydef constrainName = true
def bookIds = Book.where {
    if (constrainName) {
        author.name =~ "Stephen%"
    }
    publishDate in start..end
}.property("id")
```

This means you can include or exclude criteria at the flick of a switch. One question that may spring to mind is how do the two criteria combine? By default, criteria in separate statements, such as publishDate and author.name in this example, are combined with an implicit AND. If you would rather OR the statements, then you can use the new whereAny() method in place of where(). The syntax is otherwise identical between the two.

The above example also demonstrates *projection* support: the ability to retrieve just the value of a single property or an aggregate value instead of the domain instances themselves. So the above code will return a list of Book ids rather than Book instances. You can even chain projections for extra flexibility.

One last cool feature I want to highlight: it's trivially easy to include aggregate functions in the query criteria. This example returns all authors that are older than the average:

```groovy
CopyAuthor.where { age > avg(age) }
```

This is in fact just the tip of the sub-query iceberg as you can also apply extra criteria to a sub-query, as demonstrated in this example:

```groovy
Copydef query = Person.where {
  age > avg(age).of { lastName == "Simpson" } && firstName == "Homer"
}
```

As you can see, Where queries provide plenty of features in an easy to use package. I genuinely think they will become the defacto queries in Grails applications, displacing criteria queries and potentially dynamic finders.

## Domain class reloading

If the Where queries weren't enough, the final feature will really appeal to long-time Grails users: robust domain class reloading with run-app! In previous versions of Grails, changing a domain class would result in the servlet container being restarted, which could take some time. Now, modifying a domain class behaves just like any other class change (that includes Java classes in src/java by the way)!

I'll demonstrate this in a screencast that will go with the next Countdown to Grails 2.0 blog post, but feel free to try it out yourself. You can add, remove and rename properties. You can even change the type of them. The only thing you need to be aware of is that when a domain class is reloaded, the dbCreate setting takes effect. If this is left as the default "create-drop", then any existing data will be lost from the database. However, if you change the value to "update", you don't lose any data and the database schema still updates. The only thing to be careful of is that "update" doesn't handle some types of migration very well, but during development this isn't usually an issue.

There's something for everyone in version 2 of Grails. For day to day development, the Where queries and robust domain class reloading will make like easier. Support for multiple data sources will please the developers that need to work against multiple relational databases from a single application. And the database migration plugin standardises the approach for dealing with production data migrations with relational databases. All of this will be coming to you soon!