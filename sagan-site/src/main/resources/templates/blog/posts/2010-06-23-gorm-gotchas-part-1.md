---
title: GORM Gotchas (Part 1)
source: https://spring.io/blog/2010/06/23/gorm-gotchas-part-1
scraped: 2026-02-24T08:55:50.668Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  June 23, 2010 | 14 Comments
---

# GORM Gotchas (Part 1)

_Engineering | Peter Ledbrook |  June 23, 2010 | 14 Comments_

Are you new to Grails? Or have you perhaps run into your first GORM "oddity"? If so, then you'll want to read this series on GORM gotchas. Not only will the articles highlight those little idiosyncrasies that often catch people out, but they will also explain why GORM behaves in these ways.

Hopefully you will already know that GORM is the database access library that comes with Grails. It's based on probably the most popular Java ORM out there: Hibernate. As you can imagine, Hibernate is a powerful and flexible library and it brings big benefits to GORM. But there is a cost to using it: many of the problems that users of GORM run into stem from the way Hibernate works. GORM tries to hide the implementation details as best it can, but they do leak out on occasion.

In the rest of this post, I'll describe the basics of persisting objects to the database. Sounds simple, but GORM doesn't quite work as you might expect even on something so basic.

## When I call save(), I mean save!

Problems with saving domain instances are probably the first ones that developers come across. How many of you have gone through the "I saved it, so why isn't it in the database?" phase? If it makes you feel any better, I've been through it too. Why does this happen? There are a couple of possibilities.

### Don't forget the validation!

Every time you save a domain instance, Grails validates it using the constraints that you have defined. If any values in the domain instance violate those constraints, the save will fail and the constraint errors will be attached to the domain instance. The trouble is, this failure to save the domain instance happens quietly: you won't know about it unless you check the return value of save() or call hasErrors().

When you are binding user data to a domain instance, this is typically the behaviour you want. It's hardly a surprise if user input happens not to fit the constraints. Throwing an exception in this case just isn't appropriate, particularly when you're web application has quite a few concurrent users. In these circumstances it's always best to check the return value of save() and react accordingly (it returns null if the save failed, otherwise it returns the domain instance):

```groovy
Copydef book = new Book(params)
if (!book.save()) {
    // Save failed! Present the errors to the user.
    ...
}
```

On the other hand, when you're setting up test data in BootStrap or in the Grails console, you usually expect the save to work. If there are any validation errors, it means a mistake on your part. In such cases as these, you don't want to mess around with checking the return value of every save() and you'd be more than happy if Grails were to throw an exception for validation failures. This isn't the default behaviour, but you can easily switch it on via a failOnError argument:

```groovy
Copybook.save(failOnError: true)
```

If you insist, you can even make it the default: simply set grails.gorm.failOnError to true in grails-app/conf/Config.groovy. And don't forget, all domain properties have an implicit nullable: false constraint!

That's probably the most common reason for domain instances not being saved when you expect them to be. So what's the other?

### Hibernate's session

On rare occasions, you can find yourself saving a domain instance only to discover that a following query doesn't pick it up, even when the instance passes validation. This is a symptom of a wider issue connected with using Hibernate under the hood.

**Hibernate is a session-based ORM framework.**

This is a very important point and anyone that hopes to truly be comfortable with GORM has to understand what the session is and what impact it has on applications. So what is a session? It's basically an in-memory cache of objects that are backed by a database. When you save a new domain instance, it is implicitly attached to the session, i.e. it is added to the cache and becomes a Hibernate-managed object. *But it may not be persisted to the database at that point!* The following diagram illustrates this behaviour:

![hibernate-session-in-action](http://blog.springsource.com/wp-content/uploads/2010/06/hibernate-session-in-action.png "hibernate-session-in-action")

When you save instances, they will immediately be available from the session. But Hibernate uses it's discretion to decide when to persist the new instances to the database, which means it can optimise the order of the SQL statements. Normally you won't notice any of this because Grails and Hibernate take care of things, but occasionally you will get caught out.

As you'd expect, though, Grails does allow you to control when data is actually persisted to the database. Have you ever seen code like this in examples?

```groovy
Copybook.save(flush: true)
```

The flush: true forces Hibernate to persist all changes to the database right away. It corresponds to what is known as *flushing the session*.

The danger now is that you will go away and put flush: true everywhere. Don't. Let Hibernate do it's job and only manually flush the session when you have to, or at least only at the end of a batch of updates. You should only really use if you're not seeing the data in the database when it should be there. I know that's a bit wishy-washy, but the circumstances when such action is necessary depend on the database implementation and other factors. One area where manual flushing can be very useful is when you are interacting with another application or internal service that is accessing the same database as you but outside of your current session.

If you're still a little hazy on the session, don't worry - we'll be coming back to the Hibernate session again and again, because it is fundamental to many of the gotchas related to GORM. In fact, it's the reason why people are hit by the next problem.

### Now you're saving when I don't want you to?!

Failing to persist a domain instance when you call save() is pretty common. Now consider the reverse situation: objects being persisted without a corresponding call to save(). If you haven't come across this behaviour yet, I can almost guarantee that you will. So why might might it happen?

Hibernate supports the concept of dirty-checking. What this means is that Hibernate checks whether any values of a domain instance's (persistent) properties have changed *after that instance has been pulled from the database*, and will persist those changes to the database. That's a bit of a mouthful so hopefully an example will help clarify this explanation. Let's say we have a Book domain class with title and author properties, and the following code is in a controller action:

```groovy
Copydef b = Book.findByAuthor(params.author)
b.title = b.title.reverse()
```

Note that there is no call to save() here. When the request has completed you will find that the book's title has been reversed in the database - the change has been persisted without an explicit save. This is because:

1.  the book is attached to the session (by virtue of being retrieved by a query);
2.  the title property is persistent (all properties are persistent unless configured as transient); and
3.  the property value has changed by the time the session closes.

Let's look at those in a little more detail. First, I have already mentioned that objects can be "attached" to the session, i.e. managed by Hibernate and backed by the database, but how do objects become attached? If you use GORM to retrieve a domain instance in any way, for example via the get() method or any type of query, then the object is automatically associated with the session. If you just create a new instance via the new keyword, then the object is *not* attached to the session until the save() method is called.

Second, domain class properties are persistent by default, i.e. they have matching columns in the database where their values are stored. You can make properties transient by adding their names to the static transients list property, which means that their values aren't stored in the database.

Finally, I mentioned that changes are persisted if they exist when the session closes. What did I mean by that? In order to do anything with the database via Hibernate, you must have an open session. Once the session is closed, you can no longer use it for database access. Also, the session is flushed when it's closed, which is why changes are persisted at the end of our controller action above (Grails automatically opens a session at the start of a request and closes it at the end).

Can you prevent such changes being persisted? Sure. One option is to call save() on your domain instance: if any of the property values fail validation, the changes will *not* be persisted. Of course, if the values are valid and yet you still don't want to persist them, you can call discard() on your instance. This won't reset the values of the instance's properties, but it will ensure that they aren't saved to the database.

That's a fair bit of information to digest for just a few gotchas. The key is understanding how the Hibernate session affects persistence of domain instances. Even if you haven't quite grokked it yet, future GORM gotcha articles will provide more information and examples.

In general, I recommend that you always use save() to persist objects rather than relying on dirty-checking. It makes it clear in the code that you want to persist the changes and those changes get validated at the same time. I also recommend that you always check the return value of save() in application code, although you're better off using the failOnError: true option when setting up bootstrap or test data.

If you're at all intimidated by or wary of GORM at this point, don't be. It really does make playing around with a database easy and fun, and with the information gleaned from this series of articles, you'll have the confidence to deal with any problems that may crop up.

Until next time!