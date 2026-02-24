---
title: More Grails 1.3 features
source: https://spring.io/blog/2010/05/24/more-grails-1-3-features
scraped: 2026-02-24T08:57:36.428Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  May 24, 2010 | 0 Comments
---

# More Grails 1.3 features

_Engineering | Peter Ledbrook |  May 24, 2010 | 0 Comments_

Last week, [I described](/2010/05/18/managing-plugins-with-grails-1-3/) how Grails now treats plugins like normal dependencies that can be pulled from Maven-compatible repositories. Although this was the big new feature for 1.3, it wasn't the only one. In this post, I'll look at some of the others, starting with a feature that I only recently found out about.

## Named queries

GORM provides three distinct ways of performing database queries:

-   dynamic finders, e.g. Book.findByTitleAndAuthorLike(...);
-   criteria queries, which use a nice DSL; and
-   HQL, Hibernate's SQL-like query language.

These three features provide a potent mix of ease-of-use and power, providing you with the flexibility you need. And yet there's something missing.

Develop a non-trivial Grails application and you will soon realise that you often use the same queries again and again. What should you do? The copy-and-paste technique is simple but leaves you with major maintenance issues. You could write service methods for each of your common queries, but then you end up with quite fine-grained services and a pretty dumb domain model. The ideal place for these queries is on the domain classes themselves.

That's where named queries come in - a feature that slipped under the radar and into Grails 1.2.

### An example

Let's consider a simple domain model related to reports: \[caption id="attachment\_4791" align="alignnone" width="398"\]![Domain model for reports](http://blog.springsource.com/wp-content/uploads/2010/05/report-model.png "Domain model for reports")\[/caption\]

The basic idea is that a report can be about one or more servers and it may be generated one or more times a month. So dow stands for "day of week" and wom stands for "week of month". Each server has an associated location, which is just the name of a city in this much-reduced model.

Now consider what sort of information an application might want to extract from this model: perhaps all reports generated in the first week of the month, or all reports about a particular server. We could add static methods to the Report class to provide such queries, but named queries give us some additional benefits that you'll see later.

Creating a named query is straightforward, as you would expect with Grails. Simply add a static namedQueries property to the relevant domain class and assign a closure to it:

```groovy
Copyclass Report {
    String name

    static hasMany = [frequencies: Frequency, servers: Server]

    static namedQueries = {
        inFirstWeek {
            frequencies {
                eq("wom", 1)
            }
        }

        inWeek { wom ->
            frequencies {
                eq("wom", wom)
            }
        }

        dilbertsReports {
            servers {
                eq("mgrEmail", "dilbert@nowhere.org")
            }
        }

        inCity { city ->
            servers {
                location {
                    eq("city", city)
                }
            }
        }
}
```

The code above sets up four queries: inFirstWeek, inWeek, dilbertsReports, and inCity. You can then use them in the same places that you can use dynamic finders, for example in controller actions or service methods. If you want to retrieve all reports that are generated in the first week of the month, call the relevant named query like so:

```groovy
CopyReport.inFirstWeek.list()
```

If you want all reports generated in one of the other weeks of the month, then use inWeek instead:

```groovy
CopyReport.inWeek(2).list()
```

See how you can pass arguments to the named queries? Just make sure that your named query closure declares the appropriate number of arguments.

Hopefully you can see how easy it is to both declare and use named queries, but before I move on, a few points deserve clarification.

First, you must write the queries in Grails' criteria DSL. If you've been putting off learning about the criteria DSL, you now have a good reason to cease procrastinating!

Second, you invoke the DSL as a static property (if you aren't passing any arguments to it) or method, followed by a standard GORM retrieval method, such as list(), get(), or a dynamic finder. That means you can add extra filtering to your named queries. It's also worth pointing out that get() will only return a domain instance *if the result of the named query contains the required entity*. Otherwise, get() simply returns null.

In other words, let's say the inFirstWeek query returns the domain instances with IDs of 1, 3, and 6. Then

```groovy
CopyReport.inFirstWeek.get(3)
```

will return the domain instance with ID of 3, whereas

```groovy
CopyReport.inFirstWeek.get(2)
```

will return null, even if Report.get(2) returns a real domain instance. So the named query acts like a filter.

So far, so good. The way that the named queries combine with get(), list(), and dynamic finders may be enough of a reason to use them right away. But Grails 1.3 includes another trick up its sleeve.

### Chaining queries

How do arbitrary combinations of named queries sound? Well, by chaining named queries, you have just that. For example, if I want all of Dilbert's reports that are generated in the first week of the month, I can call

```groovy
CopyReport.dilbertsReports.inFirstWeek.list()
```

Alternatively, if I want all first week reports about servers in London, I can use

```groovy
CopyReport.inFirstWeek.inCity("London").list()
```

In fact, you can chain as many named queries as you like, as long as they all return the same type of domain class.

Named queries provide a powerful technique for query reuse that is both simple to implement and to use. You can now have a very rich domain model with client code that is easy to read and understand. How good is that?

Now I'd like to quickly look at some other Grails 1.3 features.

## Best of the rest

Smaller, but still useful, features made it into the Grails 1.3 release. Foremost of these was the upgrade to Groovy 1.7 (Grails 1.2 and previous are based on Groovy 1.6).

### Groovy 1.7

Many fixes and enhancements went into the Groovy 1.7 release, but perhaps two are the most significant for Grails developers:

1.  Anonymous and inner classes now supported - so integration with frameworks like Wicket should be much easier.
2.  Power asserts - you can now use the Groovy assert keyword instead of the JUnit/TestNG alternatives to get impressive diagnostic information on why an assertion failed. My favourite new feature!

### Dirty checking

No, this has nothing to do with household chores! As many of you are aware, Hibernate will automatically check whether a domain instance has been modified and persist the changes at the end of the session. GORM now allows you access to this feature via the isDirty() method:

```groovy
Copydef book = Book.get(10)
assert !book.dirty

book.title = "Unknown"
assert book.dirty
assert book.isDirty("title")
assert !book.isDirty("author")
```

See how you can also check whether individual fields have been modified?

### Global layouts

As you probably know, Grails allows you to apply layouts to views either explicitly, via a <meta> tag, or by convention. What it didn't allow you to do is specify a default layout for views as a fallback option. That deficiency has now been rectified and you can specify the default layout either via a setting in Config.groovy:

```groovy
Copygrails.sitemesh.default.layout = 'defaultLayout'
```

or by creating the file grails-app/views/layouts/application.gsp. The first approach would pick up the layout from grails-app/views/layouts/defaultLayout.gsp.

### JUnit 4

For all those testing fans out there, Grails finally comes with JUnit 4 by default, so you can now annotate your test cases to your heart's content.

With that, I'll wrap up this instalment of Grails 1.3 features. I hope you can make good use of the named queries! Next time, I'll look at in-place plugins.