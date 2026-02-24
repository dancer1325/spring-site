---
title: Spring Batch
source: https://spring.io/blog/2007/05/07/spring-batch
scraped: 2026-02-24T09:30:00.948Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  May 07, 2007 | 0 Comments
---

# Spring Batch

_Engineering | Dave Syer |  May 07, 2007 | 0 Comments_

## Introduction

I've been working hard with a couple of clients on a new product called [Spring Batch](http://www.springframework.org/spring-batch). The aim is to provide tools and applications to support bulk processing in an enterprise environment. Spring Batch is part of the [Spring Portfolio](http://www.springframework.org/sub-projects) with an initial release in the Spring 2.1 release train.

The original impetus to build some prototype code actually came independently from a number of Interface21 clients. This provides some useful additional detail and some constraints on the implementation so that it can be applied to the real-world problems posed by the clients. I hope that this article will stimulate some more interest and provide feedback on the general approach.

Rod Johnson will be presenting at JavaOne on Spring Batch, along with our partners from Accenture. If you are lucky enough to be there you will see some of the details and the thinking behind the product. Here I will show some of the details of the infrastructure layer of Spring Batch that won't be covered in the presentation.

The source code will be published in subversion as soon as I figure out how to get all the artifacts together (web site, JIRA, continuous integration etc.). I also plan to blog a couple more times with more details of the way the product is being designed. There is a mailing list for people who are interested in following the release process as we move towards a 1.0 release. To sign up to the list go to the [list information page](http://lists.interface21.com/listmanager/listinfo/spring-batch-announce).

### Spring Batch Infrastructure

The initial release provides some low level tools to support the other parts of the product. We call these the Spring Batch Infrastructure.

One of the goals of the infrastructure is to provide a declarative or semi-declarative approach to optimisation of bulk processing generally. This includes the ability to batch operations together, and to retry an piece of work if there is an exception. Both requirements have a transactional flavour, and similar concepts may be relevant (propagation, synchronisation). They also both lend themselves to the template programming model common in Spring, c.f. TransactionTemplate, JdbcTemplate, JmsTemplate.

The core interfaces in the framework are BatchOperations and BatchCallback, and the main implementation of BatchOperations is BatchTemplate. Example usage:

```java
Copy
BatchTemplate template = new BatchTemplate();

template.setCompletionPolicy(new FixedChunkSizeCompletionPolicy(20));

template.iterate(new BatchCallback() {

    public boolean doInIteration(BatchContext context) {
        // Do stuff in batch...
        return true; // Return false signals that data are exhausted
    }

});
```

The callback is executed repeatedly, until the completion policy determines that the batch should end, in this case after 20 operations. In real operations this would be wrapped in a transaction using the normal Spring transaction management framework.

The Spring Batch infrastructure also provides an API for automatic retry of a business operation. This is independent of the batching support, but will often be used in conjunction with it. The central interfaces in this case are RetryOperations and RetryCallback, and the main implementation of RetryOperations is RetryTemplate.

Example usage:

```java
Copy
RetryTemplate template = new RetryTemplate();

template.setRetryPolicy(new TimeoutRetryPolicy(30000L));

Object result = template.execute(new RetryCallback() {

    public Object doWithRetry(RetryContext context) {
        // Do stuff that might fail, e.g. webservice operation
        return result;
    }

});
```

### Optimising Transactional Pipeline Processing

Once the product is released, the infrastructure can be used immediately to simplify batch optimisations and automatic retries. The framework is oriented around application developers not needing to know any details of the framework - there are a few application developer interfaces that can be used for convenient construction of data processing pipelines, but apart from that we aim to support as close to a POJO programming model as is practical. This is similar to the approach taken in Spring Core in the area of transaction management and DAO implementation.

### Spring Batch Container Layer

The design vision for Spring Batch is that the infrastructure can be used to implement a class of process-oriented batch applications in what we call the Spring Batch Container Layer. The first container to be published is a bulk-processing application, using the infrastructure in its implementation. This so-called "simple batch execution container" will provide robust features for traceability and management of a batch lifecycle. A key goal is that the management of the batch process (locating a job and its input and results, starting, scheduling, restarting) should be as easy as possible for a non-developer, like an application support team with some business back up. People tell me this is sacrilege, but I like to think of this as an "ETL" tool (Extract Transform and Load). At least ETL is what the container is literally doing, even if it doesn't fit with some people's notion of traditional ETL. The Spring programming model is perfect for this kind of problem - write your POJO that knows how to locate and process a single item of data, and let the framework do the plumbing.

Watch this space for more blogs on the Container Layer, on the domain concepts, ubiquitous language and design details.

### Future Directions

In addition to the simple container, we also want to provide an extension which can take an input source, partition it into sub-ranges, and process those concurrently. A common application of this will be to put the concurrent processing behind a remote proxy, such as an EJB or web-service. All the concurrent sub-processes are able to identify themselves individually, show statistics and restart from the last known good record after an error. They are also able to aggregate their reportable details up to the parent process to give an operator a single view of a parallel job. The same business logic implemented as a logical unit of work can be used as in the simple container. The difference is only in the configuration - the Spring programming model again at its best.

Matt Welsh's work shows that [SEDA](http://www.eecs.harvard.edu/~mdw/proj/seda/) has enormous benefits over more rigid processing architectures, and messaging containers give us a lot of resilience out of the box. So we want to provide a more SEDA flavoured container, or container support, as well as supporting the more traditional approach. There might be a tie in with Mule and/or other ESB tools here, giving the benefit of a very scalable architecture, where the choice of transport and distribution strategy can be made as late as possible. The same application code could be used in principle for a standalone tool processing a small amount of data, and a massive enterprise-scale bulk-processing engine.