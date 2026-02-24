---
title: New Spring Integration Samples
source: https://spring.io/blog/2010/09/29/new-spring-integration-samples
scraped: 2026-02-24T08:52:51.984Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  September 29, 2010 | 0 Comments
---

# New Spring Integration Samples

_Engineering | Oleg Zhurakousky |  September 29, 2010 | 0 Comments_

Based on your overwhelming requests for more [Spring Integration](http://www.springsource.org/spring-integration) samples and more usable structure we are pleased to make the following announcement:

Starting with the current release of Spring Integration the samples will no longer be included with Spring Integration distribution. Instead we've switched to a much simpler collaborative model that should promote better community participation and community contributions. Samples now have a dedicated Git SCM repository and a dedicated JIRA Issue Tracking system. Sample development will also have its own lifecycle which is not dependent on the lifecycle of the framework releases although the repository will still be tagged with each major release for compatibility reasons. The great benefit to the community is that we can now add more samples and make them available to you right away without waiting for the release of the framework. Having its own JIRA that is not tied up to the the actual framework is also a great benefit. You now have a dedicated place to suggest samples as well as report issues with existing samples. Or you may also want to submit a sample to us as an attachment through the JIRA and if we believe your sample adds value we would be more then glad to add it to our samples repository properly crediting the author.

### Where to get Samples

To monitor samples development and to get more information on the repository you can visit the following URL: [http://git.springsource.org/spring-integration/samples](http://git.springsource.org/spring-integration/samples ) . We are also using Git SCM as samples repository. For more information on Git SCM please visit their website: [http://git-scm.com/](http://git-scm.com/)

**CLONE samples repository.** (For those unfamiliar with Git, this is somewhat the equivalent of a checkout.)

This is the first step you should go through. You must have Git client installed on your machine. There are many GUI-based products available for many platforms. Simple Google search will let you find them. To clone samples repository from command line:

> \> mkdir spring-integration-samples > cd spring-integration-samples > git clone git://git.springsource.org/spring-integration/samples.git

That is all you need to do. Now you have cloned the entire samples repository. Since samples repository is a live repository, you might want to perform periodic updates to get new samples as well as updates to the existing samples. To get the updates use git PULL command:

> \> git pull

### Track Samples

As mentioned earlier, Spring Integration samples have a dedicated JIRA Issue tracking system. To submit new sample request or to submit the actual sample (as an attachment) please visit our JIRA Issue Tracking system: [https://jira.springframework.org/browse/INTSAMPLES](https://jira.springframework.org/browse/INTSAMPLES)

### Samples structure

The structure of the samples changed as well. With plans for more samples we realized that some samples have different goals then others. While they all share the common goal of showing you how to apply and work with [Spring Integration framework](http://www.springsource.org/spring-integration), they also defer in areas where some samples were meant to concentrate on the technical use cases while others on the business use cases and some samples are all about showcasing various techniques that could be applied to address certain scenarios (both technical and business). Categorization of samples will allow us to better organize them based on the problem each sample addresses while giving you a simpler way of finding the right sample.

Currently there are 4 categories. Within the samples repository each category has its own directory which is named after the category name:

##### BASIC

(samples/basic) This is a good place to get started. The samples here are technically motivated and demonstrate the bare minimum with regard to configuration and code, to help you to get started quickly by introducing you to the basic concepts, API and configuration of Spring Integration as well as Enterprise Integration Patterns (EIP). For example; If your are looking for an answer on how to implement and wire Service Activator to a Channel or how to use Messaging Gateway to your message exchange or how to get started with using MAIL or TCP/UDP modules etc., this would be the right place to find a good sample. The bottom line is this is a good place to get started.

##### INTERMEDIATE

(samples/intermediate) This category targets developers who are already familiar with Spring Integration framework (past getting started), but need some more guidance while resolving a more advanced technical problems one might deal with once they switch to a Messaging architecture. For example; If you are looking for an answer on how to handle errors in various message exchange scenarios or how to properly configure the Aggregator for the situations where some messages might not ever arrive for aggregation etc,. and any other issue that goes beyond the basic implementation and configuration of a particular component and addresses "what else you can do with it" type of problem this would be the right place to find these type of samples.

##### ADVANCED

(samples/advanced) This category targets develoopers who are very familiar with Spring Integration framework but looking to extend it to address a specific custom need by using Spring Integration public API. For example; if you are looking for samples showing you how to implement a custom Channel or Consumer (event-based or polling-based), or you trying to figure out what is the most appropriate way to implement custom Bean parser on top of Spring Integration Bean parsers hierarchy when implementing custom name space for a custom component, this would be the right place to look. Here you can also find samples that will help you with Adapter development. Spring Integration comes with an extensive library of adapters to allow you to connect remote systems with Spring Integration messaging framework. However you might have a need to integrate with system for which the core framework does not provide an adapter. So you have to implement your own. This category would include samples showing you how to do it.

##### APPLICATIONS

(samples/applications) This category targets developers and architects who have a good understanding of the Messaging architecture, [EIP](http://www.eaipatterns.com/) and above average understanding of [Spring](http://www.springsource.org) and [Spring Integration](http://www.springsource.org/spring-integration) frameworks and are looking for samples that address a particular business problem. In other words the emphasis of samples in this category is business use cases and how they could be solved via Messaging Architecture and Spring Integration in particular. For example; If you are interested to see how a Loan Broker or Travel Agent process could be implemented and automated via Spring Integration this would be the right place to find these types of samples.

> Spring Integration samples are also tagged with major releases. So, to checkout the version that is specific to 2.0.0.RELEASE all you need to do is execute the following Git command after you cloned the repository "git checkout v2.0.0.RELEASE".

> Remember! Spring Integration is a community driven framework, therefore community participation is IMPORTANT. That includes Samples, so if you can't find what you are looking for let us know. And of course, feedback is always welcome!