---
title: EIP \'Loan Broker\' Reference Implementation (Part 1)
source: https://spring.io/blog/2010/03/19/eip-loan-broker-reference-implementation-part-1
scraped: 2026-02-24T08:59:06.227Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  March 19, 2010 | 0 Comments
---

# EIP 'Loan Broker' Reference Implementation (Part 1)

_Engineering | Oleg Zhurakousky |  March 19, 2010 | 0 Comments_

We are pleased to announce the first installment of the 'Loan Broker' Reference Implementation. ['Loan Broker'](http://www.enterpriseintegrationpatterns.com/ComposedMessagingExample.html) concept has become a de-facto reference domain for showcasing [Enterprise Integration Patterns](http://www.eaipatterns.com/) (EIP) - *by Gregor Hohpe ad Bobby Woolf*, and this installment of the Loan Broker RI demonstrates how *Enterprise Integration Patterns* are realized and applied using [Spring Integration](http://www.springsource.org/spring-integration) (SI) framework.

### Introduction

![lb-pipesFilters](http://blog.springsource.com/wp-content/uploads/2010/03/lb-pipesFilters.png "lb-pipesFilters")

At the core of EIP architecture are the very simple yet powerful concepts of [Pipes and Filters](http://www.eaipatterns.com/PipesAndFilters.html) and [Message](http://www.eaipatterns.com/Message.html). Endpoints (Filters) are connected with one another via Channels (Pipes). The producing endpoint sends Message to the Channel and the Message is retrieved by the Consuming endpoint.  This architecture is meant to define various mechanisms that describe **How** information is exchanged between the endpoints, without any awareness of **What** those endpoints are or **What** information they are exchanging, thus providing for a very *loosely coupled and flexible collaboration model while also, decoupling Integration concerns from Business concerns*. EIP extends this architecture by further defining:

-   *the types of pipes (Point-to-Point Channel, Publish-Subscribe Channel, Channel Adapter, etc.)*
-   *the core filters and patterns around how filters collaborate with pipes* *(Message Router, Splitters and Aggregators, various Message Transformation patterns, etc.)*

> **The Spring Integration (SI) messaging framework is designed to provide a POJO-based programming model built on top of Enterprise Integration Patterns.**

### Use Case

The details and variations of this use case are very nicely described in [Chapter 9 of the EIP Book](http://www.enterpriseintegrationpatterns.com/ComposedMessagingExample.html), but here is the brief summary; A Consumer while shopping for the best Loan Quote(s) subscribes to the services of a Loan Broker, which handles details such as:

1.  *Consumer pre-screening (e.g., obtain and review the consumer's Credit history)*
2.  *Determine the most appropriate Banks (e.g., based on consumer's credit history/score)*
3.  *Send a Loan quote request to each selected Bank*
4.  *Collect responses from each Bank*
5.  *Filter responses and determine the best quote(s), based on consumer's requirements.*
6.  *Pass the Loan quote(s) back to the consumer.*

Obviously the real process of obtaining a loan quote is a bit more complex, but since our goal here is to demonstrate how Enterprise Integration Patterns are realized and implemented within SI, the use case has been simplified to concentrate only on the Integration aspects of the process. It is not an attempt to give you an advice in consumer finances. ![loan-broker-1](http://blog.springsource.com/wp-content/uploads/2010/03/loan-broker-1.png "loan-broker-1") As you can see, by hiring a Loan Broker, the consumer is isolated from the details of the Loan Broker's operations, and each Loan Broker's operations may defer from one another to maintain competitive advantage, so whatever we assemble/implement must be flexible so any changes could be introduced quickly and painlessly. Speaking of change, this first installment of the Loan Broker RI does not actually talk to any 'imaginary' Banks or Credit bureaus. Those services are stubbed out. Our goal here is to assemble, orchestrate and test the *integration aspect* of the process as a whole. Only then can we start thinking about wiring such process to the real services. We will do this in Part 2, where you'll realize the true benefit of separating *integration* and *business* concerns. You will see, that the process and configuration describing this process will not change regardless of the number of Banks a particular Loan Broker is dealing with, or the type of communication media (or protocols) used (JMS, WS, TCP, etc.) to communicate with these Banks.

### Design

As you analyze the 6 requirements above you'll quickly see that they all fall into the category of Integration concerns. For example, in the consumer pre-screening step we need to gather additional information about the consumer and the consumer's desires and *enrich* the loan request with additional meta information. We then have to *filter* such information to *select* the most appropriate list of Banks, and so on. *Enrich, filter, select* - these are all *integration concerns* for which EIP defines a solution in the form of patterns. SI provides an implementation of these patterns.

**Submit Loan Quote request - [Messaging Gateway](http://www.eaipatterns.com/MessagingGateway.html)**

![lb-gateway](http://blog.springsource.com/wp-content/uploads/2010/03/lb-gateway1.png "lb-gateway")

The Messaging Gateway pattern provides a simple mechanism to access messaging systems, including our Loan Broker. In SI you define the Gateway as a Plain Old Java Interface (no need to provide an implementation), configure it via the XML ***<gateway>*** element or via annotation and use it as any other Spring bean. SI will take care of delegating and mapping method invocations to the Messaging infrastructure by generating a Message (payload is mapped to an input parameter of the method) and sending it to the designated channel.

*[LoanBrokerGateway.java](https://src.springframework.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/src/main/java/org/springframework/integration/loanbroker/LoanBrokerGateway.java)* is the interface representing the Message Gateway used by the consumer

*Gateway XML configuration:*

```xml
Copy<int:gateway id="loanBrokerGateway"
		     default-request-channel="loanBrokerPreProcessingChannel"
		     service-interface="org.springframework.integration.loanbroker.LoanBrokerGateway"/>
```

In the above configuration whenever any method is invoked on the '**loanBrokerGateway**' bean, a Message will be constructed and sent to the '**loanBrokerPreProcessingChannel**'.

Our definition of the Messaging Gateway ([LoanBrokerGateway.java](https://src.springframework.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/src/main/java/org/springframework/integration/loanbroker/LoanBrokerGateway.java)) gives the consumer two ways to interact with the Loan Broker. The Consumer might request a single(best) quote by invoking the *getLoanQuote(loanRequest)* method, or all quotes via a call to *getAllLoanQuotes(loanRequest)* method. This means that our Loan Broker must be aware of the type of the Loan request. We also know there are some pre-screening steps such as getting and evaluating the consumer's credit score, simply because some premiere Banks will only typically accept quote requests from consumers that meet a minimum credit score requirement.

> Essentially, this whole process resembles doctors visit where before seeing the real doctor you meet the nurse who takes your temperature, blood pressure etc., writing up a list of 'meta information' the doctor will need.

In EIP  a *Message* is a simple structure which consists of a *Message Payload* and *Message Headers*. *Message Headers* are a great mechanism to store meta information related to the *Message*. So how can we enrich our Message with the additional information? EIP defines the [Content Enricher](http://www.enterpriseintegrationpatterns.com/DataEnricher.html) pattern which describes how to augment a *Message* with additional information. Spring Integration provides a ***<header-enricher>*** element allowing you to quickly enrich a Message in-transit. But since our Loan Broker must perform several tasks before sending out the quote, it would be nice if there were also a mechanism to compose a process from a set of individual and independent tasks.

**Loan Request Pre-screeening – [Composed Message Processor](http://www.eaipatterns.com/DistributionAggregate.html) and [Content Enricher](http://www.enterpriseintegrationpatterns.com/DataEnricher.html)**

The *Composed Message Processor* pattern describes rules around building endpoints that maintain control over message flow which consists of multiple message processors. In our case the pre-screening flow consists of 3 steps: *a) determine the the type of the loan request;* *b) obtain consumer's credit history and score;* *c) determine (based on some criteria) the list of channels (each channel corresponds to an individual bank)*.

Spring Integration allows you to compose complex processors via the **<chain>** element

```xml
Copy<int:chain id="preScreening" input-channel="loanBrokerPreProcessingChannel" output-channel="banksDistributionChannel">
	<int:header-enricher>
		<int:header name="RESPONSE_TYPE"
			expression="headers.history.iterator().next().attributes['method'].equals('getLoanQuote') ? 'BEST' : 'ALL'" />
	</int:header-enricher>
	<int:header-enricher>
		<int:header name="CREDIT_SCORE" ref="creditBureau" method="getCreditScore"/>
	</int:header-enricher>
	<int:header-enricher>
		<int:header name="BANKS" ref="bankSelector" method="selectBankChannels"/>
	</int:header-enricher>
</int:chain>
```

![lb-chain](http://blog.springsource.com/wp-content/uploads/2010/03/lb-chain1.png "lb-chain")

This will create a bean '**preScreening**" as an SI *chain* endpoint, which also defines an *input/**output*\-*channel* to receive and send messages. The above *chain* is composed with 3 *header-enricher* processors. The first one will set **RESPONSE\_TYPE** header by utilizing [SpEL](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/expressions.html) while accessing the [Message History](http://www.eaipatterns.com/MessageHistory.html) and determining this header's value based on the Gateway method invoked.

> This example illustrates how SpEL can be used to perform simple evaluations while determining the header value, but we do not advocate using SpEL to perform complex business logic

Next we have a *header-enricher* which is mapped to a process responsible for getting the credit score from the Credit Bureau (currently stub [CreditBureauStub](https://src.springframework.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/src/main/java/org/springframework/integration/loanbroker/stubs/CreditBureauStub.java)) and set the **CREDIT\_SCORE** header. The last *header-enricher* uses the [BankChannelSelector](https://src.springframework.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/src/main/java/org/springframework/integration/loanbroker/BanksChannelSelector.java) (see the [bankSelector](https://src.springframework.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/src/main/resources/loan-broker-config.xml) config).The implementation of the *BankChannelSelector.selectBankChannels(..)* method takes a Message as input and returns a Set<String> value containing the name of channels, which will be set as the **BANKS** header. This completes our pre-screening process, our Loan Broker is now ready to send a loan request to each selected Bank via the *banksDistributionChannel*.

The **BANKS** header defines the dynamically generated and filtered list of channels each of which acts as a recipient representing a Bank. We need an endpoint that allows us to send the same *Message* to all recipients.

**Distribute Loan Quote Requests to Selected Banks - [Recipient List](http://www.eaipatterns.com/RecipientList.html)**

![lb-recipientList](http://blog.springsource.com/wp-content/uploads/2010/03/lb-recipientList.png "lb-recipientList") EIP defines various types of routing patterns which all derive from [Message Router](http://www.eaipatterns.com/MessageRouter.html). One of them is the [Recipient List](http://www.eaipatterns.com/RecipientList.html) router, which routes a message to all recipients in the list. SI provides a **<router>** element that allows us to configure a router which, in our case, will receive a *Message* from the *bankDistributionChannel*. This router will get the list of bank channels from the **BANKS** *Message Header* via a SpEL expression (this list is set in the pre-screening step), and will distribute the *Message* to these *channels*.

The XML Configuration below shows how this router is configured:

```xml
Copy<int:router id="bankRecipientListRouter" input-channel="banksDistributionChannel" 
								expression="headers['BANKS']" 
								apply-sequence="true"/>
```

> You can clearly see how we are assembling Loan Broker by connecting various endpoints (Filters) via channels (Pipes), while passing Messages. You can also see that we are accomplishing it through POJO-based programming techniques, barely using the Spring Integration API (only BankChannelSelector.java). SI takes care of interfacing our POJOs with the Messaging infrastructure.

One last thing the Loan Broker needs to to is to receive the loan quotes form the banks, aggregate them by consumer (we don't want to show quotes from one consumer to another), assemble the response based on the consumer's selection criteria (single best quote or all quotes) and reply back to the consumer.

**Aggregating Loan Quote Responses - [Aggregator](http://www.eaipatterns.com/Aggregator.html)**

An Aggregator pattern describes an endpoint which groups related *Messages* into a single *Message*. Criteria and rules can be provided to determine an *aggregation* and *correlation* strategy. SI provides several implementations of the Aggregator pattern as well as a convenient name-space based configuration.

![lb-complete](http://blog.springsource.com/wp-content/uploads/2010/03/lb-complete.png "lb-complete")

Our Loan Broker defines a *'**loanQuoteAggregator***' bean via the ***<aggregator>*** element which provides a default *aggregator* and *correlation* strategy. The default correlation strategy correlates messages based on the *$corelationId* header (see [Correlation Identifier](http://www.eaipatterns.com/CorrelationIdentifier.html) pattern). What's interesting is that we never provided the value for this header.  It was set earlier by the Recipient List router automatically, when it generated a separate Message for each Bank.

Once the Messages are correlated they are released to the actual Aggregator implementation. Although default Aggregator is provided by SI, its strategy (gather the list of payloads from all Messages and construct a new Message with this List as payload) does not satisfy our requirement. The reason is that our consumer might require a single best quote or all quotes. To communicate the consumer's request, earlier in the process we set the RESPONSE\_TYPE header. Now we have to evaluate this header and return either *all the quotes* (the default aggregation strategy would work) or the *best quote* (the default aggregation strategy will not work because we have to determine which loan quote is the best).

```xml
Copy<int:aggregator id="loanQuoteAggregator" input-channel="quotesAggregationChannel" method="aggregateQuotes">
	<bean class="org.springframework.integration.loanbroker.LoanQuoteAggregator"/>
</int:aggregator>
```

Obviously selecting the best quote could be based on complex criteria and would influence the complexity of the aggregator, but for now we are making it simple. If consumer wants the best quote we will select a quote with the lowest interest rate. To accomplish that the [LoanQuoteAggregator.java](https://src.springframework.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/src/main/java/org/springframework/integration/loanbroker/LoanQuoteAggregator.java) will sort all the quotes and return the first one. The [LoanQuote.java](https://src.springframework.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/src/main/java/org/springframework/integration/loanbroker/domain/LoanQuote.java) implements Comparable which compares quotes based on the *rate* attribute.

Once the response Message is created it is sent to the *default-reply-channel* of the Messaging Gateway (thus the consumer) which started the process. Our consumer got the Loan Quote!

One important thing to notice is that we have not defined a *default-reply-channel* attribute on ***<gateway>*** element. In fact we have not defined a single *channel* explicitly. Similar to other Messaging systems, SI will auto-create *input* and default *reply* channels as needed, giving you yet another way to further simplify Spring Application Context configuration.

### Conclusion

This reference implementation of the 'Loan Broker' use case was accomplished using the Spring Integration framework; a POJO-based, light weight, embeddable messaging framework with a loosely coupled programming model intended to simplify integration of heterogeneous systems without requiring a heavy-weight ESB-like engine or proprietary development and deployment environment. It is build on top of ***Enterprise Integration Patterns***. *"Patterns are meant to describe "building blocks" for YOUR solution - they are not meant to be solutions in of themselves. Patterns therefore lend themselves to be best implemented by lightweight, embeddable frameworks that serve to support your solution, not heavy, commercial-off-the shelf products that aim to control it. This is where the big vendors have all gone wrong with SOA..." - [Tom McCuch](http://www.infoq.com/articles/Spring-Integration-Joshua-Long#view_38115) (SpringSource) commenting on InfoQ article by [Joshua Long](http://www.infoq.com/articles/Spring-Integration-Joshua-Long)*. Integration concerns exist in all types of applications (server based and not) and should not require change in design, testing and deployment strategy if such applications need to integrate with one another. I (the developer) should not be porting my SWT or console-based application to an ESB-like server or implementing proprietary interfaces simply because I have an integration concern. I would simply like to have a framework that allows me to address these concerns whenever I have them with minimal to no changes to my code or infrastructure. *Spring Integration* is that framework.

In the next installment we'll demonstrate various remoting adapters and techniques available in Spring Integration by substituting our stubbed services with these adapters and will introduce an asynchronous style of integration that is relevant to the 'Loan Broker' use case.

**Resources**:

The 'Loan Broker' Reference Implementation is available with the release of [Spring Integration 2.0.M3](http://www.springsource.org/spring-integration) (see the Downloads section). It is distributed as an independent Eclipse/Maven project. You can also check it out as a project from our Subversion repository.

> $> svn co https://src.springframework.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/ loan-broker $> cd loan-broker $> mvn install

**Relevant Links**: [Spring Integration](http://www.springsource.org/spring-integration) [Spring Integration in Action](http://www.manning.com/fisher/) [Enterprise Integration Patterns](http://www.eaipatterns.com/index.html) [Getting Started With Spring Integration (Joshua Long)](http://www.infoq.com/articles/Spring-Integration-Joshua-Long) [Agile SOA - Part 1, 2 and 3 (Tom McCuch)](http://tom-mccuch.blogspot.com/)

Thanks to Gary Russel *(Spring Source, SI comitter)* and Dave Turanski *(Spring Source)* for helping out with this blog!