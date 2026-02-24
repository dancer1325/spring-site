---
title: Deeper into Grails & Cloud Foundry
source: https://spring.io/blog/2011/04/21/deeper-into-grails-cloud-foundry
scraped: 2026-02-24T08:42:32.717Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  April 21, 2011 | 0 Comments
---

# Deeper into Grails & Cloud Foundry

_Engineering | Peter Ledbrook |  April 21, 2011 | 0 Comments_

In [my previous post](/2011/04/12/one-step-deployment-with-grails-and-cloud-foundry/), I showed you how easy it is to deploy a Grails application to [Cloud Foundry](http://www.cloudfoundry.com) using the corresponding plugin. Hopefully that whetted your appetite and you are ready to look at a more complex Grails application that demonstrates the power of the GORM plugins and stretches the Cloud Foundry services. If you don't have a Cloud Foundry account yet, please be patient. The response to the announcement has been phenomenal so it is going to take some time to work through the backlog of requests.

## GrailsTwitter

Simple Twitter clones have become almost the standard for sample Grails applications, so it's no surprise that another version has been developed for Cloud Foundry. You can find the code [on GitHub](https://github.com/SpringSource/cloudfoundry-samples/tree/master/grailstwitter/) along with the other Cloud Foundry samples and you can also test out [an instance of the application](http://grailstwitter.cloudfoundry.com/) that's already running on the cloud.

In this case, we have used a mix of data stores with MongoDB storing the status messages and tags, a SQL database for the user information (since we're using Spring Security), and Redis for caching the overall tag information:

[![](http://blog.springsource.com/wp-content/uploads/2011/04/grailstwitter-cf-model.png "Data model for GrailsTwitter")](http://blog.springsource.com/wp-content/uploads/2011/04/grailstwitter-cf-model.png)  
Data model for GrailsTwitter

The Person and Authority domain classes are standard Spring Security, so I won't say anything more about them other than they are mapped by Hibernate, and hence require the Cloud Foundry MySQL service when the application is deployed.

Of more interest is the Status domain class. By adding a static mapWith property to the class, we can ensure that instances of it are stored in MongoDB rather than a SQL store:

```groovy
Copypackage org.grails.twitter

import org.grails.twitter.auth.Person

class Status {
    static mapWith = "mongo"
    static transients = ["author"]
	
    String message
    Long authorId
    List<String> tags = []
    Date dateCreated
	
    Person getAuthor() {
        return Person.get(authorId)
    }
}
```

Other than that, it looks like a pretty standard GORM domain class. So how do we link the status messages, which are stored in MongoDB, to the users, which are stored in a SQL database? We can't use a standard GORM one-to-one relationship in this case, so instead we explicitly store the ID of the user in the status message and add a transient, read-only author property for easy access to the associated Person instance. Simple when you know how!

You can also see that tags aren't stored as separate domain instances (tags are any strings in a status message that start with '#'). Instead, each Status stores a list of its tags as plain strings - an approach suggested on the MongoDB web site. This means it's pretty cheap to save and retrieve status messages, but it does raise an important question: how do you find out what tags are in the system and how many occurrences there are of each one? There's no 'tag' table to query after all, which is what you would typically have in a relational database.

This is where MongoDB's support for map-reduce functions come in. The map function breaks out all the tags in all the status messages and then the reduce function aggregates them with a total count for each one. You can see the relevant code in the [TagService.cacheTags()](https://github.com/SpringSource/cloudfoundry-samples/blob/master/grailstwitter/grails-app/services/org/grails/twitter/TagService.groovy#L33) method. It can take some time to get your head round map/reduce, but it's great for parallel computing. With a single MongoDB instance though, this operation isn't stupendously fast. Hence it makes sense to cache the results.

## Caching

Whenever I think of caching, my thoughts immediately go to Ehcache. It's like the grand daddy of open source caching on the Java platform. Even the Spring Cache plugin for Grails is currently hard-coded to use it. So can we use it for our application when it's deployed to the cloud? If we're only ever going to have one instance of our application, then sure. You just have to configure the location of the disk store, although that's not trivial and I'll talk about file system access in a bit. But one of the key advantages of cloud deployment is the ability to quickly create multiple instances to handle load, in which case Ehcache isn't an option.

Caches are typically straightforward key-value stores, so there is an alternative available on Cloud Foundry currently, the Redis service, and other cache services like [vFabric Gemfire](http://www.vmware.com/products/vfabric-gemfire/overview.html) are in development. In the GrailsTwitter application we enumerate the tags and their total counts and store the results in a Redis sorted set. This is done in a transaction (via redis.multi()/.exec()) that ensures the set is updated atomically - important because there may be many, many requests coming in concurrently for the tag list. As a bonus, the sorted set ensures that we always retrieve the tags in order of "total count".

Of course, since Redis is an independent instance, you can have as many application instances as you like: all of them will use the same Redis service. The application is also a useful demonstration of how to use Redis directly rather than via the GORM API - we're not mapping any domain classes to Redis in GrailsTwitter.

The sample application also demonstrates the use of the Searchable plugin, which is based on Compass and in this case handles the user search. Now, the plugin has to store its search indexes somewhere, so how does it know where to put them when we deploy the application to Cloud Foundry?

## File system access

In many production environments, you know in advance where you can store files such as search indexes and so you put the path in your runtime configuration. Alternatively, you may include an external configuration file via the grails.config.locations setting and Ops will put the appropriate paths in that file. But with Cloud Foundry, you don't know any available file locations in advance, nor can you deploy an external configuration file.

Fortunately, Cloud Foundry provides a suitable file path at runtime through the HOME environment variable. All your application has to do is read it and then create any directories and files it needs using that path as the base. In the case of Searchable, the Cloud Foundry plugin automatically replaces the standard location for search indexes with one based on the HOME variable, so you don't have to do anything!

This is all great stuff, but there is serious problem with file system access in the cloud and I alluded to it earlier when talking about Ehcache: if you have more than one application instance, then each instance will have its own (different) copies of the files. This is rarely what you want. For example, all application instances should share the same search indexes, otherwise a user hitting one instance would get different search results to a user being served by a different instance.

Cloud Foundry is still in its early stages, so you can expect more services to come online throughout the year. Requests are already in for a search service (amongst others). In the meantime, we can provide a workaround that is illustrative of a common solution to the coordination challenges in the cloud: use Redis' support for pub/sub messaging to keep the files synchronised. For example in Grails Twitter, we could trigger an event every time a user is added and then all instances would listen for that event and index the new user. Same goes for modified or deleted users. The Redis plugin for Grails does not support pub/sub out of the box at the time of writing (it's coming!), but you can use Spring Data until that support is available.

## The future

As you've seen, you can already deploy moderately complex applications to Cloud Foundry by making judicious use of the services available, in particular Redis. And the simplicity with which you can deploy applications to Cloud Foundry make it a compelling deployment target.

Nonetheless it's important to understand that more services will be added to Cloud Foundry in future, which will allow you to deploy applications with more features. And as those services arrive, we are dedicated to ensuring that the corresponding Grails support is as slick and easy to use as what is already available. So experiment, have fun, and look forward to some exciting additions to the Cloud Foundry service!