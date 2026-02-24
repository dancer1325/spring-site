---
title: GORM Gotchas (Part 3)
source: https://spring.io/blog/2010/07/28/gorm-gotchas-part-3
scraped: 2026-02-24T08:54:58.103Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  July 28, 2010 | 0 Comments
---

# GORM Gotchas (Part 3)

_Engineering | Peter Ledbrook |  July 28, 2010 | 0 Comments_

It's great to hear that people are finding these articles useful, so it's with great pleasure that I add another to the series. This time I'm going to talk about associations again, but with the focus on when they are loaded into memory.

**Update 2 Aug 2010** I have added more information on eager fetching with one-to-many relationships because there are some issues you need to be aware of.

## It's cool to be lazy

One of the first things people learn about GORM relationships is that they are loaded lazily by default. In other words, when you fetch a domain instance from the database, none of its relations will be loaded. Instead, GORM will only load a relation when you actually use it.

Let's make this a bit more concrete by considering the example from the previous article:

```groovy
Copyclass Location {
    String city
}

class Book {
    String title

    static constraints = {
        title(blank: false)
    }
}

class Author {
    String name
    Location location

    static hasMany = [ books: Book ]
}
```

If we fetch an Author instance, the only information we can use without another query being executed is the author's name. When we try to get the associated location or the books, more queries are kicked off to get the extra data we need.

This is really the only sensible default option, particularly with complex models that have long chains of associations. If eager fetching were the default, you could feasibly end up pulling in half the data from the database simply by fetching a single instance.

Nonetheless, this option is not without cost. I'll look at three side-effects of lazy associations so that you know what they are, can recognise the symptoms, and can fix any problems resulting from those side-effects.

### Proxies

Lazy loading of associations involves some magic. After all, you don't want the location property above to return null, do you? So Hibernate uses proxies and custom collection classes to provide transparent access to the lazy-loaded collections and associations - you don't have to worry about the fact they're not in memory yet. Normally these proxies do a great job of hiding the work that goes on behind the scenes, but occasionally the implementation leaks through.

As an example, consider this domain model:

```groovy
Copyclass Pet {
    String name
}

class Dog extends Pet {
}
```

It's a very simple inheritance hierarchy, so you wouldn't expect any nasty surprises. Now imagine that we have a Dog instance in the database with an ID of 1. What do you think will happen with the following code?

```groovy
Copydef pet = Pet.load(1)
assert pet instanceof Dog
```

Intuitively, this should work. After all, the pet with ID 1 is a Dog. So why does the assertion fail? Instead of fetching the underlying instance from the database, the load() method returns a proxy that executes the required query on demand, for example when you try to access a property other than id. This proxy is a dynamic subclass of Pet rather than Dog so the instanceof check fails. It continues to fail even after the instance is loaded from the database! In diagrammatic form:

[![](http://blog.springsource.com/wp-content/uploads/2010/07/hibernate-proxy.png "hibernate-proxy")](http://blog.springsource.com/wp-content/uploads/2010/07/hibernate-proxy.png)

Changing Pet.load() to Dog.load() will fix the problem, since the proxy will then be a dynamic subclass of Dog. You can also make it work by relacing load() with get(), because the implementation of the latter automatically unwraps the proxy and returns the underlying Dog instance. In fact, Grails works hard to perform this automatic unwrapping in many other situations, so you're unlikely to come across the issue. That's one of the reasons it comes as such as surprise when you do.

There is one other scenario that may cause some heartache, although it should be fairly rare. Imagine you have another class, Person, that has a relationship to Pet like so:

```groovy
Copyclass Person {
    String name
    Pet pet
}
```

The pet relationship is lazy, so when you get the Person instance, the pet property will be a proxy. Normally this is hidden from you by GORM, but check out the behaviour of the following:

```groovy
Copydef p = Person.get(1)
assert p.pet instanceof Dog
assert Pet.get(1) instanceof Dog
assert Pet.findById(1) instanceof Dog
assert Pet.list()[0] instanceof Dog
```

Assuming that we have one Person instance and one Pet instance that's a Dog, and assuming that the two are related via the pet property, the first three assertions will succeed but the last one will not. Get rid of the other lines of code and suddenly that assertion will succeed. Huh?

This behaviour is undoubtedly confusing, but its roots lie in the Hibernate session. When you retrieve the Person from the database, its pet property is a proxy. That proxy is stored in the session and represents the Pet instance with ID 1. Now, the Hibernate session guarantees that no matter how many times you retrieve a particular domain instance from within a single session, Hibernate will return you the exact same object. So when we call Pet.get(1), *Hibernate* gives us the proxy. The reason the corresponding assertion succeeds is that GORM automatically unwraps the proxy. The same happens for findBy\*() and any other queries that can only return a single instance.

However, GORM does not unwrap proxies for the results of list(), findAllBy\*(), and other queries that can return multiple results. So Pet.list()\[0\] returns us the unwrapped proxy instance. If the Person isn't fetched first, Pet.list() will return the real instances: the proxy isn't in the session this time, so the query isn't obliged to return it.

You can protect yourself against this problem in a couple of ways. First, you can use the dynamic instanceOf() method instead of the instanceof operator. It's available on all GORM domain instances and is proxy-aware: Pet.get(1).instanceOf(Dog). Second, declare variables using def rather than static domain class types, otherwise you may see class cast exceptions. So, rather than

```groovy
CopyPerson p = Person.get(1)
Dog dog = Pet.list()[0]    // Throws ClassCastException!
```

use

```groovy
Copydef p = Person.get(1)
def dog = Pet.list()[0]
```

With this approach, you will still be able to access any properties or methods that are specific to Dog, even though you're working with a proxy.

It has to be said, GORM does an amazing job of shielding developers from proxies. They only rarely leak through to your application code, particularly with more recent versions of Grails. Still, some people will run into issues with them so it's useful to be aware what the symptoms are and why they occur.

I showed in the last example how the behaviour of the session combined with lazy loading can produce some interesting results. That combination also lies behind a more common error: the org.hibernate.LazyInitializationException.

### Lazy loading and the session

As I've already mentioned, when you have a lazily loaded relationship Hibernate has to execute an extra query if you then want to navigate that relationship at a later date. In the normal course of events this isn't a problem (unless you're worried about performance) since Hibernate does it transparently. But what happens if you try to access the relationship in a different session?

Let's say you have loaded the Author instance with ID 1 in a controller action and stored it in the HTTP session. At this point, no code has touched the books collection. On the next request, the user goes to a URL that corresponds to this controller action:

```groovy
Copyclass MyController {
    def index = {
        if (session.author) {
            render "Author ${session.author.name} has written the books: ${session.author.books*.title}"
        else {
            render "No author in session"
        }
    }
    ...
}
```

The intention here is that if our HTTP session contains an author variable, the action renders the titles of that author's books. Except in this case it doesn't. It throws a LazyInitializationException instead.

The problem is that the Author instance is what we call a *detached object*. It was loaded in one Hibernate session, but then that session was closed at the end of the request. Once an object's session is closed, it becomes detached and you cannot access any properties on it that will result in a query.

"But a session is open in my action, so why the problem?" I hear you cry. That's a good question. Unfortunately, this is a new Hibernate session and it doesn't know anything about our Author instance. Only when the object is explicitly attached to the new session will you be able to access its lazy associations. There are several techniques for doing just that:

```groovy
Copydef author = session.author

// Re-attach object to session, but don't sync the data with the database.
author.attach()

// Re-attach object, but merge any changes with the data in the database.
// You *must* use the instance returned by the merge() method.
author = author.merge()
```

The attach() method is useful in cases where the domain instance is unlikely to have changed in the database since the detached object was retrieved. If that data may have changed, then you'll have to be careful. Check the [Grails reference guide](http://grails.org/doc/latest/) for information on the behaviour of merge() and refresh().

Now If you get a LazyInitializationException, you'll know that it's because your domain object is not attached to a Hibernate session. You'll also have a good idea of how to resolve the issue, although I'll introduce another approach to solving the problem soon. Before I get to that, I want to have a look at another classic side effect of lazy initialisation: the N + 1 select problem.

### N + 1 selects

Let's go back to the author/book/location example from earlier in the article. Imagine we have four authors in the database and we run the following code:

```groovy
CopyAuthor.list().each { author ->
    println author.location.city
}
```

How many queries will be executed? The answer is five: one to get all the authors, and then one per author to retrieve the corresponding location. This is known as the N + 1 select problem and it's very easy to write code that suffers from it. The example above certainly looks harmless enough at first glance.

During development this isn't really a problem, but executing so many queries will harm the responsiveness of your application when it's deployed to production. Because of this, it's a good idea to analyse the database usage for your application before it's opened up to end users. The simplest approach is to enable Hibernate logging in grails-app/conf/DataSource.groovy, which ensures that all queries are logged to stdout:

```groovy
CopydataSource {
    ...
    loggingSql = true
}
```

You can of course enable it on a per-environment basis. An alternative approach is to use a special database driver like [P6Spy](http://www.p6spy.com/) that intercepts the queries and logs them.

So how do you avoid these extra queries? By fetching associations eagerly rather than lazily. This approach also solves the other issues related to lazy loading that I've mentioned.

### Being eager

GORM allows you to override the default lazy loading behaviour on a per-relationship basis. For example, we can configure GORM to always load an author's location along with the author via this mapping:

```groovy
Copyclass Author {
    String name
    Location location

    static hasMany = [ books: Book ]

    static mapping = {
        location fetch: 'join'
    }
}
```

In this case, not only is the location loaded with the author, but it's retrieved in the same query using a SQL join. So this code:

```groovy
CopyAuthor.list().each { a ->
    println a.location.city
}
```

will only result in a single query. You can also use the lazy: false option in place of fetch: 'join' but that will result in an extra query to load the location. In other words, the association is loaded eagerly, but with a separate SQL select. Most of the time you'll probably want to use fetch: 'join' to minimise the number of queries that are executed, but sometimes it can be the more expensive approach. It really depends on your model.

There are other options, but I won't go into them here. They are fully documented in sections 5.3.4 and 5.5.2.8 of the [Grails user guide](http://grails.org/doc/latest) if you want to know more (although I would wait for the 1.3.4 release of Grails, which will come with some important documentation updates).

The downside to configuring eager loading in the domain class mapping is that the association will *always* be loaded eagerly. But what if you only need that information occasionally? Any page that just wants to display an author's name will be slowed down unnecessarily because the location must also be loaded. The cost may be low for a simple association like this, but it will be greater for collections. That's why you also have the option to eagerly load associations on a per-query basis.

Queries are context sensitive, so they're the ideal place to specify whether particular associations should be eagerly loaded or not. Let's say we've reverted to the default behaviour for Author and now we want to get all authors and display their cities. In this context, we obviously want to retrieve the locations when we get the authors. Here's how:

```groovy
CopyAuthor.list(fetch: [location: 'join']).each { a ->
    println a.location.city
}
```

All we've done is add a fetch argument to the query with a map of association names -> fetch modes. If the code also displayed the titles of the authors' books, we'd add the books association to the map too. The dynamic finders support the exact same fetch option:

```groovy
CopyAuthor.findAllByNameLike("John%", [ sort: 'name', order: 'asc', fetch: [location: 'join'] ]).each { a->
    ...
}
```

We can also achieve the same thing with criteria queries:

```groovy
Copydef authors = Author.withCriteria {
    like("name", "John%")
    join "location"
}
```

All of the above applies to one-to-many relationships too, but there are some extra considerations you need to take into account.

#### Eager loading of one-to-manies

I said above that you would typically want to use joins when eagerly fetching associations, but this rule of thumb doesn't work well with one-to-many relationships. To understand why, consider this query:

```groovy
CopyAuthor.list(max: 2, fetch: [ books: 'join' ])
```

In all likelihood, this will return only one Author instance. That's probably not the behaviour you expect or want. So what's happening?

Under the hood Hibernate is using a left outer join to fetch the books for each author. That means you get duplicate Author instances: one for each book the author is associated with. If you don't have the max option there, you won't see those duplicates because GORM removes them. But the trouble is the max option is applied to the result *before* the duplicates are removed. So in the example above, Hibernate only returns two results, both of which are likely to have the same author. GORM then removes the duplicate and you end up with a single Author instance.

This problem occurs both with the domain class mapping configuration and criteria queries. In fact, criteria queries won't by default remove the duplicates from the results! There's only one sensible solution to this confusion: always use the 'select' mode for one-to-many relationships. For example, in domain mappings use lazy: false:

```groovy
Copyclass Author {
    ...
    static hasMany = [ books: Book ]

    static mapping = {
        location fetch: 'join'
        books lazy: false
    }
}
```

In queries, use the appropriate setting depending on whether you're using dynamic finders or criteria queries:

```groovy
Copyimport org.hibernate.FetchMode

Author.list(fetch: [ books: 'select' ])

Author.withCriteria {
    fetchMode "books", FetchMode.SELECT
}
```

Yes, you will end up with an extra query to fetch the collection, but it's only one and you gain consistency and simplicity. If you find you really need to reduce the number of queries, then you can always fall back to HQL.

Apart from the situation with one-to-manies, eager fetching in GORM is straightforward and if you follow the principle of using the 'select' fetch mode for one-to-manies, the same applies to those. The main effort goes into profiling an application's database access to determine where associations should be fetched eagerly or specifically with a join. Just beware premature optimisation!

### Wrapping up

As you've seen, lazy loading of associations raises a variety of issues, particularly when combined with the Hibernate session. Despite those issues, lazy loading is an important feature that remains a sensible default for object graphs. The problems that tend to crop up are easily identified once you know about them and are typically easy to solve too. And if nothing springs to mind, you can always fall back to judicious use of eager loading.

All that said, as the Grails version number has gone up, users have progressively become less and less likely to come across these issues. When you consider what's happening behind the scenes with Hibernate, that's a pretty impressive trick!