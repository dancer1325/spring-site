---
title: RabbitMQ: Enabling Grails full text search on Cloud Foundry
source: https://spring.io/blog/2011/08/29/rabbitmq-enabling-grails-full-text-search-on-cloud-foundry
scraped: 2026-02-24T08:35:35.205Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  August 29, 2011 | 0 Comments
---

# RabbitMQ: Enabling Grails full text search on Cloud Foundry

_Engineering | Peter Ledbrook |  August 29, 2011 | 0 Comments_

In my [second blog about Grails and Cloud Foundry](http://blog.springsource.com/2011/04/21/deeper-into-grails-cloud-foundry/) I introduced a variant of the [Grails Twitter example](https://github.com/SpringSource/cloudfoundry-samples/tree/master/grailstwitter) that could be hosted on [CloudFoundry.com](http://www..cloudfoundry.com/) At the time I mentioned that full text search using the Searchable plugin would limit you to a single application instance because the search indices would be unique to each instance. In other words, you might very easily get different search results depending on which application instance your browser is routed to.

I also said that one option for fixing this problem would be to synchronise the search indices across the instances. But that doesn't sound particularly easy, does it? As it happens, the introduction of the RabbitMQ service into Cloud Foundry means that the required code changes are far smaller than you might expect. So let's see how I added full text search for the Grails Twitter status messages.

## Making status messages searchable

The Searchable plugin makes a strong assumption that you want to index standard GORM domain classes. That means Hibernate/SQL. But the Grails Twitter status messages are being stored in MongoDB, not MySQL. Can we make them searchable? Yes we can, but at the cost of some features.

As with a normal domain class, the first step to searching the Status instances is to add a searchable property:

```groovy
Copypackage org.grails.twitter

import org.grails.twitter.auth.Person

class Status {
    static mapWith = "mongo"
    static transients = ["author"]

    static searchable = {
        only = ["message", "dateCreated"]
        authorId index: "no", store: "yes"
    }
	
    String message
    Long authorId
    List<String> tags = []
    Date dateCreated
	
    Person getAuthor() {
        return Person.get(authorId)
    }

    static constraints = {
        message maxSize: 160
    }
}
```

In this case I want to be able to search on the creation date and the content of the message but nothing else. I also want to link to a message's author from the search results. But if the authorId isn't indexed, then the search results won't contain the ID of the poster. So, I store authorId in the index, but don't make it searchable (index: "no"). Simple, no? When the search results are displayed, they can now include the name of each message's author.

One significant limitation of indexing a non-Hibernate domain class is that mirroring won't work. This means that new messages won't automatically be indexed when they are saved. Fortunately, we don't actually want this behaviour here, so I disable mirroring and 'bulk indexing on startup' in Config.groovy:

```groovy
Copysearchable {
    ...
    mirrorChanges = false
    bulkIndexOnStartup = false
}
```

Of course, we do want the status messages indexed on startup because the file system on Cloud Foundry is transient and so the search index will need rebuilding at every startup. But the automatic indexing won't work with non-Hibernate domain classes either, so I resort to manual indexing at the end of BootStrap.groovy:

```groovy
Copy...
class BootStrap {

    def searchableService
    def springSecurityService

    def init = { servletContext ->
        ...
        // Index all Hibernate mapped domain classes.
        searchableService.reindex()

        // Index all status messages.
        def statusMessages = Status.list()
        log.info "Indexing ${statusMessages.size()} status messages"
        Status.reindex(statusMessages)
        log.info "Finished indexing"
    }
    ...
}
```

That's not an awful lot of code, but it's enough to make the status messages searchable. All that's left is to make sure that new messages are indexed and that the search indices are synchronised across application instances.

## Syncing with RabbitMQ

The basic model for keeping the search indices in sync is pretty straightforward:

![](http://blog.springsource.com/wp-content/uploads/2011/08/grailstwitter-search-sync.png "Synchronising search indices with RabbitMQ")

Each time a status message is saved, a message is sent to the RabbitMQ broker, which then forwards it to all the application instances. Each instance then indexes the Status instance identified by the message.

Before we can implement this feature, we need to install the RabbitMQ plugin:

    grails install-plugin rabbitmq

The next job is to configure the broker with the appropriate exchanges and queues. I've blogged about both the [AMQP protocol](http://blog.springsource.com/2010/06/14/understanding-amqp-the-protocol-used-by-rabbitmq/) and the [RabbitMQ plugin](http://blog.springsource.com/2010/08/23/rabbitmq-plugin-for-grails-early-access/) before, so I won't go into the detail of exchanges and queues here. Suffice it say that all we need is a single fanout exchange (where all messages are routed to all listeners) and a Grails service that subscribes to that exchange. So in Config.groovy I add:

```groovy
Copyrabbitmq {
    connectionfactory {
        username = 'guest'
        password = 'guest'
        hostname = 'localhost'
    }

    queues = {
        exchange name: 'search.sync', type: fanout, durable: false
    }
}
```

The important bit is the exchange declaration: the connection factory settings are ignored when the application is deployed to Cloud Foundry because the RabbitMQ service is bound to the application at runtime.

Sending the message is a one-liner:

```groovy
Copy...
class StatusService {
    def springSecurityService
    def tagService
    
    void updateStatus(long userId, String message) {
        def status = new Status(message: message, authorId: userId).save(flush: true, failOnError: true)
        rabbitSend 'search.sync', '', "${status.id}:${status.class.name}"
        
        runAsync {
            tagService.extractTagsFromMessage(status)
        }
    }
    ...
}
```

and the service that indexes the status messages isn't much more complicated:

```groovy
Copypackage org.grails.twitter

class SyncService {
    static rabbitSubscribe = "search.sync"
    static transactional = false

    def grailsApplication
    def searchableService

    void handleMessage(String message) {
        def parts = message.split(/:/)
        if (parts.size() != 2) {
            log.error "Invalid message: $message"
            return
        }

        def domainClass = grailsApplication.getDomainClass(parts[1])
        log.debug "Reindexing instance ${parts[0]} of ${parts[1]}"
        try {
            searchableService.reindex(domainClass.clazz.get(parts[0]))
        }
        catch (Exception ex) {
            log.error "Failed to index instance ${parts[0]} of ${parts[1]}", ex
        }
    }
}
```

So the rabbitSend() method is used to send a simple string that contains the Status instance ID and the class name. In this case we're only dealing with Status instances, but it's useful to make the service generic to all potential searchable domain classes. Also, using Groovy means we don't have to do any nasty reflection: we just fetch the class and call the methods we want directly on it!

The important parts of SyncService are the rabbitSubscribe property and the handleMessage() method. The former declares that the service should subscribe to the exchange "search.sync", which is the one I'm sending the messages to. The handleMessage() method is invoked each time a message is received from that exchange, with the message content as its argument. Hence the method extracts the class name and instance ID and uses the Grails DomainClass.get() method to retrieve the relevant instance from the data store (MongoDB for our Status messages). Finally, the searchableService.reindex() method adds the status message to the local search index. And of course this is happening on every application instance.

The application is now ready for deployment to Cloud Foundry and scaling up to as many instances as you're allowed! You can see the result on [CloudFoundry.com](http://grailstwitter.cloudfoundry.com/). Note that in the GitHub project I have done some UI work to support full-text search, but those changes aren't really relevant to the subject at hand.

## Wrap up

I have to say, I was surprised myself how little code was required to get the search indices syncing. Not only that, but I was able to focus on how to solve the problem rather than how to code it, since the coding was so straightforward. To top it off, using Cloud Foundry meant the deployment consisted of creating and binding a RabbitMQ service and then running the grails prod cf-update command to push the changes to the server. Simple stuff.

As you've seen, RabbitMQ can provide innovative solutions for cloud-related problems, and the Grails plugin makes it very easy to use through the power of its conventions. You can communicate between different instances of the same application, different Grails applications, or even applications written using different languages and frameworks. We could for example deploy a simple Node.js or Sinatra application that logs and displays the "search.sync" messages, so you can keep track of them. Basically, RabbitMQ is an essential item in your cloud toolbox.