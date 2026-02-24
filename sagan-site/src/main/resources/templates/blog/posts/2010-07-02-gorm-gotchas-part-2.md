---
title: GORM Gotchas (Part 2)
source: https://spring.io/blog/2010/07/02/gorm-gotchas-part-2
scraped: 2026-02-24T08:55:45.720Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  July 02, 2010 | 9 Comments
---

# GORM Gotchas (Part 2)

_Engineering | Peter Ledbrook |  July 02, 2010 | 9 Comments_

In [part 1 of this series](/blog/2010/06/23/gorm-gotchas-part-1), I introduced you to some of the subtleties associated with persisting domain instances with GORM. This time, I'm going to tackle relationships with particular focus on hasMany and belongsTo.

GORM provides only a few basic elements for defining relationships between domain classes, but they are sufficient to describe most needs. When I give training courses on Grails, it always surprises me how few slides cover relationships. As you can imagine, this apparent simplicity does hide some subtle behaviour that can trip up the unwary. Let's start with the most basic of relationships: the many-to-one.

## Many-to-one

Let's say I have the following two domain classes:

```groovy
Copyclass Location {
    String city
}

class Author {
    String name
    Location location
}
```

When you see an Author domain class, you just know that a Book one can't be far behind. It's true, there will be a Book class too, but for now let's just concentrate on the two domain classes above and the many-to-one location relationship.

It looks simple, right? And it is. Just set the location property to a Location instance and you have linked an author to a location. But see what happens when we run the following code in the Grails console:

```groovy
Copydef a = new Author(name: "Niall Ferguson", location: new Location(city: "Boston"))
a.save()
```

An exception is thrown. If you look at the ultimate "caused by" exception, you'll see the message "not-null property references a null or transient value: Author.location". What's going on?

The bit about a "transient value" is the key here. A transient instance is one that isn't attached to a Hibernate session. As you can see from the code, we are setting the Author.location property to a new Location instance, not one retrieved from the database. Hence the instance is transient. The obvious fix is to make the Location instance persistent by saving it:

```groovy
Copydef l = new Location(city: "Boston")
l.save()

def a = new Author(name: "Niall Ferguson", location: l)
a.save()
```

So if our many-to-one properties must have persistent instances as values, why do so many GORM examples look like our original code, where we created a new Location instance? It's because domain classes usually use the belongsTo property in situations like this.

### Cascading with belongsTo

Whenever you deal with relationships in Hibernate, you need to have a good grasp of what is meant by cascading. That holds true for GORM as well. Cascading determines what type of actions, when applied to a domain instance, also apply to the relations of that instance. For example, given the model above, is the author's location saved when we save the author? Is the location deleted when we delete the author? What about if we delete the location? Is the associated author also deleted?

Saves and deletes are the most common actions connected with cascading, and they're the only ones you really need to understand. So if you go back to the previous section, you'll understand that the Location instance isn't saved with the author because cascading is not in operation for that Author -> Location relationship. If we now change Location to this:

```groovy
Copyclass Location {
    String city

    static belongsTo = Author
}
```

we will find that the exception disappears and the Location instance is saved along with the author. The belongsTo line ensures that saves are cascaded from Author to Location. As the documentation says, it also cascades deletes as well, so if you delete an author, its associated location will be deleted too. However, saving or deleting a location does not save or delete the author.

### Which belongsTo?

One thing that often confuses people is that belongsTo supports two different syntaxes. The one used above simply defines cascading between two classes, while the alternative also adds a corresponding back reference, automatically turning the relationship into a bidirectional one:

```groovy
Copyclass Location {
    String city

    static belongsTo = [ author: Author ]
}
```

In this case, an author property is added to Location at the same time as the cascading is defined. The advantage of this syntax is that you can define multiple cascading relationships.

One thing you may notice if you use the latter syntax is that when you save a new Author with a location, Grails automatically sets the Location's author property to the Author instance. In other words, the back reference is initialised without you having to do it explicitly.

Before I move on to collections, I'd like to say one last thing about the many-to-one relationship. Sometimes people think that adding a back reference as we have done above turns the relationship into a one-to-one. In fact, it's not technically a one-to-one unless you add a uniqueness constraint on one side of the relationship or the other. For example:

```groovy
Copyclass Author {
    String name
    Location location

    static constraints = {
        location(unique: true)
    }
}
```

Of course, it doesn't make sense to turn the Author - Location relationship into a one-to-one in this particular case, but hopefully you can see how a one-to-one is defined.

The many-to-one relationship is pretty straightforward once you understand how belongsTo works. Relationships involving collections, on the other hand, can throw up a few unpleasant surprises if you're not used to Hibernate.

## Collections (one-to-many/many-to-many)

Collections are the natural way to model one-to-many relationships in an object-oriented language and GORM makes using them pretty easy considering what's happening behind the scenes. Nonetheless, this is definitely one area where the impedance mismatch between object-oriented languages and relational databases raises its ugly head. For a start, you have to remember that your in-memory data can be different to that in the database.

### Domain instance collections vs DB records

When you have a collection on a domain instance, you're dealing with in-memory objects. This means that you can deal with it just like any other collection of objects. You can iterate over it and you can modify it. Then at some point you will want to persist any changes to the database, which you can do by saving the object that has the collection. I'll come back to that shortly, but first I'd like to demonstrate some of the subtleties associated with this disconnect between your collection of objects and the actual data. To do that, I'm going to introduce the Book class:

```groovy
Copyclass Book {
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

This creates a uni-directional (Book does not have a back reference to Author) one-to-many relationship, where an author has zero or more books. Now let's say I execute this code in the Grails console (a wonderful tool for experimenting with GORM):

```groovy
Copydef a = new Author(name: "Niall Ferguson", location: new Location(city: "Boston"))
a.save(flush: true)

a.addToBooks(title: "Colossus")
a.addToBooks(title: "Empire")

println a.books*.title
println Book.list()*.title
```

The output will look like this:

\[Empire, Colossus\]
\[\]

So you can print the collection of books, but they aren't in the database yet. You can even insert a.save() after the second a.addToBooks() to no apparent effect. Remember from the previous article that I said calling save() does not guarantee immediate persistence of the data? This is a concrete example of that. If you want to see the new books in your query, you'll have to add an explicit flush:

```groovy
Copy...
a.addToBooks(title: "Colossus")
a.addToBooks(title: "Empire")
a.save(flush: true)   // <---- This line added

println a.books*.title
println Book.list()*.title
```

The two println statement will then output the same books, although not necessarily in the same order. Another symptom of this discrepancy between the in-memory collection and the database data is demonstrated if you replace the println statements with:

```groovy
Copyprintln a.books*.id
```

Even after a save() (without an explicit flush), this will print nulls. It's only when you flush the session that the child domain instances have their IDs set. This is quite different to the many-to-one case we saw earlier, where you didn't need an explicit flush for the Location instance to be persisted to the database! It's important to realise that difference exists, otherwise you'll be in for a hard time.

As a little aside in case you're following the examples in the Grails console yourself, be aware that anything you save when you run a script in the console will still be there when you execute the next script. The data is only cleared when you restart the console. Also, the session is always flushed on completion of the script.

OK, back to collections. The examples above exhibit some interesting behaviour that I want to talk about next. Why were the Book instances persisted to the database even though I didn't define a belongsTo on Book?

### Cascading

As with other relationships, mastering collections means mastering their cascading behaviour. The first thing to note is that saves are always cascaded from the parent to its children, even if there is no belongsTo specified. If that's the case, is there any point to using belongsTo? Yes.

Consider what happens if we execute this code in the console after we have added the author and his books:

```groovy
Copydef a = Author.get(1)
a.delete(flush: true)

println Author.list()*.name
println Book.list()*.title
```

The output looks like this:

\[\]
\[Empire, Colossus\]

In other words, the author has been deleted, but the books haven't. That's where belongsTo comes in: it ensures that deletes are cascaded as well as saves. Simply by adding the line static belongsTo = Author to Book, the above code will print empty lists for Author *and* Book. Simple, right? In this case, yes, but the real fun is only just beginning.

Aside: see how we're forcing a flush of the session in the example above? If we don't, Author.list() may display the author that's just been deleted, simply because the change may not have been persisted by that point.

### Deleting children

Deleting something like an Author instance and having GORM delete the children automatically is straightforward. But what if you just want to delete one or more of the author's books, not the author himself? You might try this:

```groovy
Copydef a = Author.get(1)
a.books*.delete()
```

thinking that this will delete all the books. But in fact this code will generate an exception:

org.springframework.dao.InvalidDataAccessApiUsageException: deleted object would be re-saved by cascade (remove deleted object from associations): \[Book#1\]; ...
	at org.springframework.orm.hibernate3.SessionFactoryUtils.convertHibernateAccessException(SessionFactoryUtils.java:657)
	at org.springframework.orm.hibernate3.HibernateAccessor.convertHibernateAccessException(HibernateAccessor.java:412)
	at org.springframework.orm.hibernate3.HibernateTemplate.doExecute(HibernateTemplate.java:411)
	at org.springframework.orm.hibernate3.HibernateTemplate.executeWithNativeSession(HibernateTemplate.java:374)
	at org.springframework.orm.hibernate3.HibernateTemplate.flush(HibernateTemplate.java:881)
	at ConsoleScript7.run(ConsoleScript7:3)
Caused by: org.hibernate.ObjectDeletedException: deleted object would be re-saved by cascade (remove deleted object from associations): \[Book#1\]

Wow, a useful stacktrace message! Yes, the problem is that the books are still in the author's collection, so when the session is flushed, they will be recreated. Remember, not only are saves cascaded, but modified domain instances are automatically persisted (because of Hibernate's dirty-checking).

The solution, as the exception message explains, is to remove the books from the collection:

```groovy
Copydef a = Author.get(1)
a.books.clear()
```

Except this isn't a solution, because the books are still in the database. They are simply no longer associated with the author. OK, so we need to explicitly delete them as well:

```groovy
Copydef a = Author.get(1)
a.books.each { book ->
    a.removeFromBooks(book)
    book.delete()
}
```

Oops, now we get a ConcurrentModificationException because we are removing books from the author's collection while we're iterating over it. Standard Java gotcha that one. We can side step that by creating a copy of the collection:

```groovy
Copydef a = Author.get(1)
def l = []
l += a.books

l.each { book ->
    a.removeFromBooks(book)
    book.delete()
}
```

That works, but boy does it require some effort.

You also have to be careful if you have a bidirectional relationship, for example if your belongsTo uses this sytnax: static belongsTo = \[ author: Author \]. If we remove the books from the collection without deleting them like so:

```groovy
Copydef a = Author.get(1)
def l = []
l += a.books

l.each { book ->
    a.removeFromBooks(book)
}
```

we'll get a "not-null property references a null or transient value: Book.author" error. As I'll explain later, that's because the books have had their author property set to null. Since the property is not nullable, this triggers a validation error. It's enough to drive anyone crazy!

Fear not, for there is a solution. If we add this mapping to Author:

```groovy
Copystatic mapping = {
    books cascade: "all-delete-orphan"
}
```

then any book that is removed from its author will automatically be deleted by GORM. The last code sample, where we remove all the books from the collection, will now work. In fact, if the relationship is unidirectional, you can reduce the code substantially:

```groovy
Copydef a = Author.get(1)
a.books.clear()
```

This will remove all the books and delete them in one fell swoop!

The moral of this story is a simple one: if you use belongsTo with a collection, explicitly set the cascade type to "all-delete-orphan" in the parent's mapping block. In fact, there's a strong case for making this the default behaviour for belongsTo and one-to-many relationships in GORM.

This raises an interesting question: why doesn't the clear() method work on a bidirectional relationship? I'm not 100% sure, but I believe it's because the books retain a back reference to the author. To understand why that would affect the behaviour of clear(), you must first realise that GORM maps unidirectional and bidirectional one-to-many relationships to database tables differently. For unidirectional relationships, GORM creates a join table by default, so when you clear the collection of books, the records are simply removed from that join table. Bidirectional relationships are mapped using a straight foreign key on the child table, i.e. the book table in our example. A diagram should make that clearer:

![one-to-many-mappings](http://blog.springsource.com/wp-content/uploads/2010/06/one-to-many-mappings.png "one-to-many-mappings")

When you clear the collection of books, that foreign key is still there because GORM doesn't clear the value of the author property. Hence it's as if the collection was never emptied.

That's almost it for collections. I'd just like to tie up this section with a quick look at the addTo\*() and removeFrom\*() methods.

### addTo\*() vs <<

In my examples, I have used the addTo\*() and removeFrom\*() dynamic methods provided by GORM. Why is that? After all, if these are standard Java collections, can't we just use code like this:

```groovy
Copydef a = Author.get(1)
a.books << new Book(title: "Colossus")
```

Sure we can, but there are some subtle benefits to the GORM methods. Consider this code:

```groovy
Copydef a = new Author(name: "Niall Ferguson", location: new Location(city: "Boston"))
a.books << new Book(title: "Colossus")
a.save()
```

Doesn't seem to be anything wrong with that, does there? And yet, if you run the code, you'll get a NullPointerException because the books collection is not yet initialised. That's quite different to the behaviour you see when you fetch the author from the database, for example using get(). In that case, we can happily append items to the books collection. We only run into this problem because we are creating the author via new. If you use the addTo\*() method instead, you don't have to worry about this issue at all because it's null-safe.

Now consider the example where we fetch the author using get() before appending a new book to its collection. If the relationship is bidirectional, we'll hit a "property not-null or transient" exception, because the book's author property hasn't been set. If you use the standard collection methods, you have to initialise back references manually. With the addTo\*() method, this is done for you.

The last feature of the addTo\*() method is the implicit creation of the correct domain class. Notice in our examples how we just pass the initial property values for the books to the method, rather than explicitly instantiating Book? That's because the method can infer from the hasMany property what type the collection contains. Neat, huh?

The removeFrom\*() method is less useful, but it does clear back references. Of course, this works best with the "all-delete-orphan" cascade option as I discussed earlier.

The last type of relationship to consider is the many-to-many.

### Many-to-many

If you want, you can get GORM to manage many-to-many relationships for you. There are a few things you need to be aware of if you do, though:

# [](#deletes-do-not-cascade-period)Deletes do not cascade, period.

# [](#one-side-of-the-relationship-emmustem-have-a-ttbelongstott-but-it-usually-doesnt-matter-which-side-has-it)One side of the relationship *must* have a belongsTo, but it usually doesn't matter which side has it.

# [](#the-ttbelongstott-only-affects-the-direction-of-cascading-saves---it-emdoes-not-cause-cascading-deletesem)The belongsTo only affects the direction of cascading saves - it *does not cause cascading deletes*

# [](#a-join-table-is-always-used-but-you-cannot-store-any-extra-information-on-it)A join table is always used, but you cannot store any extra information on it.

Sorry to labour the point on cascading deletes, but it's important to understand that the behaviour is quite different from the many-to-one and one-to-many relationships. It's also important to understand the last point: lots of many-to-many relationships have associated information. For example, a user may have many roles and a role may have many users. But the user may have different roles in different projects, hence the project is associated with the relationship itself. In these cases, you're better off managing the many-to-many relationship yourself.

## Summary

Well, that's probably the longest article I've written so far, but you've reached the end. Congratulations! Don't worry if you haven't managed to digest everything in one sitting, you can always refer back to it.

I think GORM does a great job of providing a nice abstraction for dealing with database relationships in an object-oriented way, but as you've seen, you can't really forget that you are ultimately dealing with a database. Armed with the information provided in this article, though, you should have no problems coping with the basics of GORM collections. Hopefully that will mean you can enjoy working with one-to-many relationships in your applications and reaping the benefits.

You may not believe it, but I haven't covered everything you need to know about collections yet. There are still some interesting issues to cover around lazy-loading, but I'll talk you through those in the next article.

Until next time!