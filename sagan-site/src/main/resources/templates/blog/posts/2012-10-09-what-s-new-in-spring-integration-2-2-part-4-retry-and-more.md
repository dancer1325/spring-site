---
title: What\'s New in Spring Integration 2.2 (Part 4 - Retry and More)
source: https://spring.io/blog/2012/10/09/what-s-new-in-spring-integration-2-2-part-4-retry-and-more
scraped: 2026-02-24T08:12:38.272Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Gary Russell |  October 09, 2012 | 0 Comments
---

# What's New in Spring Integration 2.2 (Part 4 - Retry and More)

_Engineering | Gary Russell |  October 09, 2012 | 0 Comments_

## Introduction

This is the fourth part in a series of blog posts highlighting some of the new features available in Spring Integration 2.2 following the recent release of [Release Candidate 1](http://www.springsource.org/node/3665). The [first part](http://blog.springsource.org/2012/09/24/whats-new-in-spring-integration-2-2-rc1-part-1-mongodb/) talks about the MongoDB adapters, the [second part](http://blog.springsource.org/2012/09/26/whats-new-in-spring-integration-2-2-part-2-transaction-synchronization/) talks about transaction synchronization; the [third part](http://blog.springsource.org/2012/10/05/whats-new-in-spring-integration-2-2-part-3-jpa-support/) talks about JPA support.

Spring Integration 2.2 introduces the ability to apply one or more localized AOP Advice elements to a message handler. A number of standard Advice classes has also been provided as well as a sample application that explores the features they provide.

## Background

> For a general introduction to Aspect Oriented Programming (AOP), see the [Spring Documentation](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/aop.html)

With Spring Integration, to-date, it has been possible to apply an `<advice-chain/>` to a poller. Assuming Direct channels are being used, an AOP Advice in such a chain applies to the entire flow, encompassing all downstream components. There are times, however, when it would be advantageous to advise just an individual endpoint to, say, retry an operation, rather than causing the entire flow to fail and be retried when a component well down-stream fails..

## Introduction

Spring Integration 2.2 Introduces a new child element `<request-handler-advice-chain/>` on many endpoints.

Consider a Spring Integration flow:

`some-inbound-adapter<-poller->http-gateway1->http-gateway2->jdbc-outbound-adapter`

If the database connection has a glitch, and we have a retry advice on the poller; the entire flow will be reprocessed; causing both http gateways to be called a second (or more) times.

This feature provides a mechanism to apply a retry Advice (among others) to just the outbound adapter. Also, the Advice can be applied to many other endpoints, regardless of where they appear in the flow, for example, we could retry just the http-gateway2 if it fails.

In addition to the general capability to configure an Advice chain, three Advice classes are provided:

**

RequestHandlerRetryAdvice RequestHandlerCircuitBreakerAdvice ExpressionEvaluatingRequestHandlerAdvice

**

These are described in some more detail below, and are explored further in a new [retry-and-more](https://github.com/SpringSource/spring-integration-samples/tree/master/intermediate/retry-and-more) sample application.

## RequestHandlerRetryAdvice

This advice provides the ability to configure retry, utilizing the [spring-retry project](https://github.com/SpringSource/spring-retry), which had its origins in Spring Batch. spring-retry has a RetryTemplate which allows configuration of retry policies, such as back-off, recovery actions etc. Refer to the [spring-retry project](https://github.com/SpringSource/spring-retry/commits/master) for more information.

Retry can be stateless or stateful. Stateless retry means the retries are simply performed internally; when a failure occurs the thread simply retries, based on the retry and backoff policies. Stateful recovery is used when the message source itself can retry - for example a transactional JMS or AMQP inbound channel adapter. In this case something needs to identify that this message has been tried before (such as JMSMessageID). For this purpose a SpEL-based RetryStateGenerator is provided which can extract the identifier from a header, for example.

In both cases, when retries are exhausted, a RecoveryCallback can be invoked; this is used to dispose of the failed message. An ErrorMessageSendingRecoverer is provided, which sends the failed message to a channel.

Examples of the RequesHandlerRetryAdvice are shown in the new [retry-and-more](https://github.com/SpringSource/spring-integration-samples/tree/master/intermediate/retry-and-more) sample application.

## RequestHandlerCircuitBreakerAdvice

This advice provides an implementation of the Circuit Breaker pattern. If, say, a remote service is unavailable (requests fail for a configurable number of attempts), this Advice prevents attempts to call that service again for some (configurable) period of time. Once that time has expired, the advice allows the next attempt to call the service however, if the service is still unavailable, it is immediately marked as such. When a service is unavailable, an exception is immediately thrown without invoking the service; the circuit breaker is said to be 'open'. Once a successful service call is made, the circuit breaker is 'closed' and all subsequent calls will be routed to the service until it is, once again, detected to be unavailable because the configured number of consecutive failed attempts has been exceeded.

An example of the RequestHandlerCircuitBreakerAdvice is shown in the new [retry-and-more](https://github.com/SpringSource/spring-integration-samples/tree/master/intermediate/retry-and-more) sample application.

## ExpressionEvaluatingRequestHandlerAdvice

This advice provides a mechanism whereby a SpEL expression is evaluated after the request is processed (either successfully or otherwise). For example, with an FTP outbound adapter, the onSuccessExpression might be

`"payload.reNameTo('/foo/succeeded/" + payload.name)"`,

whereas the onFailureExpression might be

`"payload.reNameTo('/foo/failed/" + payload.name)"`.

Each expression has a corresponding channel to which the result of the evaluation (if any) is sent.

An example of this advice is also shown in the new [retry-and-more](https://github.com/SpringSource/spring-integration-samples/tree/master/intermediate/retry-and-more) sample application.

## Custom Advice Classes

While any AOP Advice can be applied, an abstract class has been provided to assist in creation of Advice classes to be used specifically for advising endpoints. For more information see the [Custom Advice Classes](http://static.springsource.org/spring-integration/docs/2.2.0.RC1/reference/htmlsingle/#custom-advice) section in the reference documentation.

## Conclusion

Spring Integration provides a great deal of flexibility to assemble loosely coupled components into applications. It is now extremely easy to apply common mechanisms, such as retry, to individual components within that application. See the [reference documentation](http://static.springsource.org/spring-integration/docs/2.2.0.RC1/reference/htmlsingle/#message-handler-advice-chain) and [retry-and-more](https://github.com/SpringSource/spring-integration-samples/tree/master/intermediate/retry-and-more) sample application for more information.