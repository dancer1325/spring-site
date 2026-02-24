---
title: What\'s New in Spring Integration 2.2 (Part 2 - Transaction Synchronization)
source: https://spring.io/blog/2012/09/26/what-s-new-in-spring-integration-2-2-part-2-transaction-synchronization
scraped: 2026-02-24T08:16:24.436Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Gary Russell |  September 26, 2012 | 0 Comments
---

# What's New in Spring Integration 2.2 (Part 2 - Transaction Synchronization)

_Engineering | Gary Russell |  September 26, 2012 | 0 Comments_

### Introduction

This is the second part in a series of blog posts highlighting some of the new features available in Spring Integration 2.2 following the recent release of [Release Candidate 1](http://www.springsource.org/node/3665). The [first part](http://blog.springsource.org/2012/09/24/whats-new-in-spring-integration-2-2-rc1-part-1-mongodb/) talks about the MongoDB adapters.

Spring Integration 2.2 introduces extended support for synchronizing non-transactional resources with transactions.

### Background

Spring has provided [first class support for synchronizing resources with transactions](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/transaction.html#tx-resource-synchronization) for many years. In many cases, this facility is used to synchronize transactions managed by multiple transaction managers, in order to implement the 'Best Efforts 1PC' pattern described in Dave Syer's excellent [JavaWorld article](http://www.javaworld.com/javaworld/jw-01-2009/jw-01-spring-transactions.html).

It is often used, for example, to synchronize a JMS commit with a JDBC commit.

Spring Integration has long supported this feature, by defining a `<transactional/>` element on a poller. This release takes this feature one step further, by allowing synchronization of non-transactional resources with a transaction.

For example, consider a `<file:inbound-channel-adapter/>` and an Integration application that reads a file when it appears in a directory, and updates a database. This feature allows us to configure different actions to be taken if the transaction commits or rolls back.

We will also show how these "post processing" actions can be configured to occur, even if there is not a real transactional resource involved.

### Caveat

The feature does NOT make an inherently non-transaction resource (such as a simple file system) transactional; rather, it simply allows us to synchronize file system (or other) activities with a transaction.

### Internals

The fundamental component of the Spring transaction synchronization feature is an object that implements `TransactionSynchronization`. Such an object has a number of callbacks that the framework invokes during synchronization (examples include `afterCommit`, `afterRollback`).

Spring Integration 2.2 introduces the concept of a `TransactionSynchronizationFactory`. This factory is responsible for creating a `TransactionSynchronization` object for each message. A default implementation is provided that allows the execution of SpEL expressions against the message as part of transaction synchronization.

### Configuration

Let's continue with the file system example. In order to enable transaction synchronization, we simply add a reference to a `TransactionSynchronizationFactory` on the `<transactional/>` element, and define a factory along with the SpEL expressions we wish to evaluate during transaction synchronization.

```xml
Copy<int-file:inbound-channel-adaper ...>
    <poller fixed-rate="1000">
        <transactional synchronization-factory="syncFactory"/>
    </poller>
</int-file:inbound-channel-adapter>

<int:transaction-synchronization-factory id="syncFactory">
	<int:after-commit expression="payload.renameTo('/successful/' + payload.name" />
	<int:after-rollback expression="payload.renameTo('/failed'/ + payload.name" />
</int:transaction-synchronization-factory>
```

As you can see, we rename the original inbound file, putting the file into a different directory, depending on whether the associated transaction commits or rolls back. Optionally, the result of the evaluation can be sent to a `channel` defined using the 'channel' attribute on the child elements of the transaction-synchronization-factory.

(Note: The "before-commit" element is also available which can also be used to affect whether the commit is actually completed or not).

### Pseudo Transactions

As can be seen above, we now have a convenient mechanism to perform some action before or after a transaction commits, or after it rolls back. But, what if we have a flow that does not involve a transactional resource at all? For example: `file:inbound-adapter<-poller->transformer->ftp:outbound adapter`.

Let's say we want to rename the input file, depending on success or failure of the ftp file transfer of the transformed file. In order to accommodate this use case, we have introduced the `PseudoTransactionManager`. This class implements `PlatformTransactionManager` for the sole purpose of allowing the use of the above synchronization techniques, even if there is no real transaction involved. Simply add the `<transactional/>` element as before, giving it a reference to a `PseudoTransactionManager` (or use the default bean id of 'transactionManager').

### Conclusion

With Spring Integration 2.2, users now have the ability to perform appropriate actions, normally affecting the original input source, after a flow completes (either successfully, or otherwise). This can be synchronized with a transaction on some other transactional resource, or even in cases where there is no real transaction involved.

A sample application exploring these features is provided [here](https://github.com/SpringSource/spring-integration-samples/tree/master/intermediate/tx-synch).