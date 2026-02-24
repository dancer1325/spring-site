---
title: A Response to: EJB 3 and Spring Comparative Analysis
source: https://spring.io/blog/2007/11/09/a-response-to-ejb-3-and-spring-comparative-analysis
scraped: 2026-02-24T09:23:48.170Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  November 09, 2007 | 0 Comments
---

# A Response to: EJB 3 and Spring Comparative Analysis

_Engineering | Mark Fisher |  November 09, 2007 | 0 Comments_

Last night I attended a New England Java User Group ([NEJUG](http://www.nejug.org)) meeting where Reza Rahman presented a "comparative analysis" of [EJB 3 and Spring](http://www.nejug.org/2007/nov07.jsp). Reza is one of the authors of [EJB 3 in Action](http://www.manning.com/panda/). I enjoyed meeting Reza and respect him for presenting what may be considered a controversial topic. Also I appreciate that he did attempt to address pros and cons for both EJB 3 and Spring. Nevertheless, I feel compelled to clarify a few points that were not wholly accurate in his coverage of Spring and which led me (and other attendees) to believe the presentation was motivated by a bias toward EJB 3. To be fair, unlike a fixed specification version, Spring is constantly evolving and some of the things that I will point out here are new features. On the other hand, some are Spring 2.0 features that have been available for more than a year. I personally believe that a "comparative analysis" must account for the up-to-date feature set of the latest stable version of the products being compared. I think it goes without saying that I might be a bit biased as well, but my motivation here is to provide a wholly objective response so that the presentation could perhaps be revised to reflect a more 'apples-to-apples' comparison. I will provide brief responses to 10 "themes" of the presentation.

## 1\. EJB uses annotations for metadata. Spring uses XML.

It was mentioned that Spring is beginning to support more annotations but that it is "going to take them a while". However, the Spring 2.0 release provided full JPA integration with @PersistenceContext for injecting the EntityManager and annotation-driven transaction management with Spring's @Transactional annotation (supporting the same semantics as a @Stateless EJB with the default propagation of REQUIRED). I was particularly discouraged that the comparison did not include JPA on both sides (see point #3 below). Spring 2.0 also introduced full annotation-based AspectJ support (@Aspect, @Before, @After, @Around) and the concept of "stereotype" annotations. For example, the @Repository annotation enables non-invasive Exception translation for data-access code that uses JPA or Hibernate APIs directly (without Spring's templates). Spring even provided annotation support as early as version 1.2, such as @ManagedResource for transparently exporting any Spring-managed object as a JMX MBean.

Now the main reason this issue is #1 for me, is the comment that it is "going to take them a while". As one of the main developers of Spring 2.5's annotation-driven configuration support, I must say that the Spring metadata model is extremely flexible and therefore we have been able to provide a comprehensive annotation-based model more quickly than one might expect. In fact, Spring 2.5 provides support for JSR-250 annotations: @Resource, @PostConstruct, and @PreDestroy - as well as @WebServiceRef and @EJB. Of particular interest is @Resource since it is the primary annotation used for dependency injection in EJB 3. With Spring, the @Resource annotation supports not only JNDI lookups (as with EJB 3) but also injection of *any Spring-managed object*. This effectively combines the main Spring advantage that was mentioned in this presentation (Spring supports DI of any type of object) with the main EJB 3 advantage (use of annotations instead of XML). Spring 2.5 also introduces an even more fine-grained annotation-driven dependency injection model based on @Autowired and the (extensible) @Qualifier annotation. Spring 2.5 also extends the "stereotype" annotations to include @Service and @Controller. Each of the stereotype annotations extends the generic @Component annotation by applying it as a meta-annotation. By applying the same technique, the @Component annotation provides an extension point for user-defined stereotypes. Spring can even auto-detect these annotated components as an alternative to XML configuration. For example, this excerpt is taken from the 2.5 version of the PetClinic sample application:

```xml
Copy
   <context:component-scan base-package="org.springframework.samples.petclinic.web" />
```

*No* additional XML is required for the web controllers since they use annotation-driven dependency injection and annotations for request mapping. I point this out, because the presentation specifically emphasized the verbosity of configuration for the web-tier:

```java
Copy
@Controller
public class ClinicController {

   private final Clinic clinic;

   @Autowired
   public ClinicController(Clinic clinic) {
      this.clinic = clinic;
   }
   ...
```

For up-to-date coverage of Spring's annotation support, see: [Introduction to Spring 2.5 on The Server Side](http://www.theserverside.com/tt/articles/article.tss?l=IntrotoSpring25), or the latest version of Spring's reference manual - specifically the [Annotation-based configuration section](http://static.springframework.org/spring/docs/2.5.x/reference/beans.html#beans-annotation-config). Also, stay tuned to this blog and the [Spring Framework home](http://www.springframework.org) for some soon-to-be-released articles and blogs covering version 2.5.

## 2\. Spring allows you to support multiple deployment environments but requires more configuration.

This one was actually presented as a Spring advantage but with an emphasis on the configuration overhead. The truth is any project where testing and agile development are taken seriously is going to require supporting "multiple deployment environments". In other words, this particular topic often gets distorted as if it applies only to multiple *production* environments. In reality, having to deploy to an Application Server during each development and testing cycle is a major obstacle to agility. Typically Spring users will modularize their configuration such that "infrastructure" configuration (e.g. DataSource, TransactionManager, JMS ConnectionFactory) is separate and dynamic properties are externalized. Since Spring provides support for replacing '${placeholders}' based on the externalized properties, the inclusion of different properties files typically becomes a transparent concern.

## 3\. EJB with JPA, Spring with Hibernate

I must admit this one bothered me the most. In the comparison slides, the EJB 3 examples showed JPA with data-access via *entityManager* and the *entityManager* instance being provided with the @PersistenceContext annotation. On the other hand, the Spring examples used Hibernate and showed setter injection of the Hibernate SessionFactory. In my mind, this violates the first rule of a bona-fide "comparative analysis": use the most similar feature available on both sides of the comparison. In this particular case, Spring does provide support for using the JPA API directly (i.e. JpaTemplate is completely optional; direct usage of the 'entityManager' still participates in Spring transactions, etc), and Spring also recognizes the @PersistenceContext annotation. This support has been available since Spring 2.0 (final release was more than a year ago), so I don't understand why the comparison does not use JPA on the Spring side as well. Other parts of the comparison were clearly based on Spring 2.0, so this leaves the impression of being selectively out-of-date and revealing a bias. If this particular example were modified to be 'apples-to-apples', it would have undermined one of the main overall themes: that Spring requires more configuration whereas EJB 3 relies on standard annotations.

Now, even though I believe the usage of Hibernate rather than JPA on the Spring side distorted the comparison, it does simultaneously reveal a strength of Spring. If you do want to use the Hibernate API directly instead of relying on the JPA API, Spring enables that, and it does so in a consistent way with regard to Spring transaction management and Exception translation. This then opens up the opportunity to use Hibernate features that extend beyond the limitations of JPA, such as Hibernate's "criteria" query API. By the same token, if you would like to add some direct JDBC for data-access where ORM is overkill, that is also supported in Spring - even when invoked within the same transaction as Hibernate or JPA data-access.

## 4\. Spring makes no assumptions, you have to provide configuration.

One specific example was the definition of a transaction manager. It was stated that you have to understand things at the container-vendor level to configure Spring integration. This is incorrect. For example, the following bean definition does not contain any container-specific information, yet Spring will auto-detect the transaction manager in all Java EE Application Servers:

```xml
Copy
   <bean id="transactionManager" class="org.springframework.transaction.jta.JtaTransactionManager"/>
```

If you do want to leverage container-specific features such as per-transaction isolation levels, then Spring also provides a few specialized implementations: *WebLogicJtaTransactionManager* *WebSphereUowTransactionManager*, and *OC4JJtaTransactionManager*. Switching between these implementations is only a matter of changing this single definition.

In addition to this, the Spring configuration slides were unnecessarily verbose. I'm afraid this may also have been motivated by the goal of emphasizing that EJB *unlike Spring* relies on intelligent defaulting. For example, the slide showed:

```xml
Copy
   <tx:annotation-driven transaction-manager="transactionManager"/>
```

Actually, if there is a single 'transactionManager' defined within a Spring context, then that attribute does not need to be provided explicitly on the 'annotation-driven' element. That attribute is available solely for enabling the usage of multiple transaction managers within one application *if necessary*. These techniques of "auto-detection" and "intelligent defaulting" apply throughout Spring, such as the JMS 'connectionFactory' for a message-listener (which is implicit in the example of #6 below) and the automatic location of an existing MBean server or RMI registry.

On a positive note, it was actually mentioned as an advantage that Spring allows for "local" transaction management. While EJB requires JTA for transaction management, many applications do not need distributed transactions across two-phase commit capable resources. In such cases, Spring allows for simpler transaction managers with less-overhead: DataSourceTransactionManager (for JDBC), HibernateTransactionManager, or JpaTransactionManager. I would have expected to hear a bit more detail on that particular Spring strength if the goal was to accurately describe the pros and cons. For example, this is a huge benefit for testing outside of the container or developing within a lightweight IDE environment such as Eclipse or IDEA.

Furthermore, if you do require JTA for distributed transactions but want to run in a lightweight container like Tomcat or Jetty, Spring easily supports standalone JTA providers like Atomikos and JOTM. Sure Spring's transaction manager setup requires configuration of a *single* bean definition, but it really is a one-time cost - and well worth the benefit.

## 5\. Spring does not have a stateful application paradigm.

The benefits of a stateless service layer are fairly well-established as a best practice, and Spring embraces that. Spring does provide scopes other than singleton however. Spring's "prototype" scope enables a distinct instance for each injection or lookup, and Spring 2.0 introduced web scopes: "request" and "session". The scoping mechanism itself is even extensible; it's possible to define and map a custom scope to the notion of a conversation. Spring also supports simple object pooling with the CommonsPoolTargetSource, but object pooling is rarely the best solution for state management.

More importantly, Spring does provide very robust, highly configurable state-management for web applications via [Spring Web Flow](http://www.springframework.org/webflow). There the conversational state is managed transparently, contrary to the claim of this presentation that developers have to interact directly with the HTTP Session to manage state in Spring applications. Furthermore, the repository configuration is pluggable so that various strategies may be used for physical storage of the state (session, client, backend cache, etc.). Finally, the latest developments in Spring Web Flow include support for extended persistence context and fully integrated support for JSF.

## 6\. Spring requires configuration of a container per MessageListener.

Spring 2.5 provides a new 'jms' namespace to greatly simplify the configuration of message-listeners. Notice that there is no separate configuration for a container per-listener. Multiple listeners share the configuration, and intelligent defaulting is used extensively:

```xml
Copy
<jms:listener-container>
	<jms:listener destination="queue.confirm" ref="logger" method="log"/>
	<jms:listener destination="queue.order" ref="tradeService" method="placeOrder"/>
</jms:listener-container>
```

It was also mentioned that thread management is always a per-container issue. However, this is not true. The message listener containers actually use Spring's TaskExecutor abstraction, and there are a number of implementations available. For example, if running on Java 5+, you can configure a thread-pool executor, or you can even configure a CommonJ WorkManager executor. The executors can easily be shared across multiple listener containers if desired. In fact, the 'task-executor' attribute is available on the 'listener-container' element (shown above) where it would be logically set 1 time but shared by each container instance that is created internally per listener definition.

## 7\. Concurrent Consumers cannot be greater than 1.

Okay, this was truly the most bizarre moment of the night. The code slide depicted a perfectly stateless implementation of a MessageListener (as it should be!), and then the configuration slide showed the 'maxConcurrentConsumers' value set to 1. At this point, it was stated that setting the value to anything other than one would cause thread-safety issues. I'm sorry to say, but this is flat out misinformation. The concurrent consumers setting determines the number of threads that are available for receiving Messages, and the 'maxConcurrentConsumers' determines to what extent the consumer pool can grow under heavy load (as demand decreases, the number of consumers drops back to the value set as 'concurrentConsumers'). As long as the MessageListener itself is thread-safe, this value can be increased to control throughput. Personally I would never use a MessageListener for anything other than delegating to a "service" so that even in the (very unlikely) case that I wanted to have a stateful object ultimately handling the content of the Message, then that target object would be configured with a pooling target source. The MessageListener itself would always be thread-safe and therefore the values for 'concurrentConsumers' and 'maxConcurrentConsumers' can be used as intended for managing throughput.

This topic raises one other point. A comprehensive comparison would reveal another pro of Spring here - namely Spring's listener adapter. The adapter provides automatic conversion from the JMS Message to a simple Java payload and then delegates to any Spring-managed object to handle that payload. For example, in the configuration above, the "logger" and "tradeService" listeners do not even have to implement the MessageListener interface. If they do not, then Spring automatically wraps those POJOs with an adapter that converts the Message and determines which method to invoke. It even converts a return value (if there is one) into a JMS reply Message and automatically replies to the destination specified by the incoming Message's 'reply-to' property. This same behavior is extremely difficult to implement from scratch since the JMS MessageListener handling method has a 'void' return type:

```java
Copy
public interface MessageListener {
   void onMessage(Message message);
}
```

## 8\. Spring's usage of the AspectJ expression language is powerful but cryptic.

EJB 3 is limited to @AroundInvoke, and the example showed this with some simple auditing applied through interception. The Spring example showed @Before advice since the auditing only required something to happen *before* the method execution (not around). I appreciated that the example emphasized the need to call context.proceed() on the EJB 3 side while the AspectJ @Before advice is much simpler. I was disappointed however that some of the attendees seemed to think that the AspectJ model was limited to @Before and therefore that EJB 3 @AroundInvoke was more powerful. To be comprehensive here, I would have included an example of @Around advice on the Spring side - to clarify that it is supported, but it is simply not always necessary.

The greatest limitation of the EJB 3 interception model is that the method (or class) that should be intercepted is directly annotated, whereas one of the fundamental goals of AOP is to be non-invasive - ultimately even supporting advice on code that is outside of your control. Given that goal, the AspectJ expression language is arguably as clear and concise as it can be while supporting all of the possible constructs where advice may be applied. While it may appear cryptic at first, it is fairly easy to learn. For example, it is conceptually similar but much more limited in scope than regular expressions (see the [AspectJ homepage](http://www.eclipse.org/aspectj/) for the expression language reference for details).

## 9\. Spring tool support has been sparse.

On this particular point, I would first point out that using Spring helps to reduce the development/test cycle so that a majority of a developer's time is spent within the IDE *not* deploying to an Application Server, and IDEs are great tools. The Eclipse-based [Spring IDE](http://springide.org/blog/) is an incredibly valuable add-on for development assistance in Spring projects, and IntelliJ also provides Spring support in IDEA. As far as deployment tools, Spring-based applications can of course be deployed into any container, and since Spring can utilize the underlying resources (DataSource, TransactionManager, JMS ConnectionFactory, etc), these are managed in the same way as with any application deployed within the particular container. Spring's ability to expose any object as a JMX MBean (including support for the aforementioned @ManagedResource) and its support for JMX notifications/listeners is very powerful for custom monitoring and management requirements.

That said, clearly Spring could benefit from increased tool support. This is why the 'Spring Tool Suite' was just recently established to bring together Spring IDE, AJDT, AspectJ, and Mylyn and evolve into much more. For more information, see the articles and links available [here](http://www.springframework.org/node/554).

## 10\. With EJB as a standard, you can migrate from one vendor to another. With Spring, you still have to port the metadata.

Everyone knows that portability is "easier said than done". While EJB 3 may be less painful than EJB 2 in this regard (less verbosity in the configuration), the fact remains that Application Servers offer different features and thus different configuration options. Clearly if you are deploying to an Application Server, you probably *should* take advantage of certain specific features. The problem with the original statement is that it implies something at the level of application configuration that makes Spring inherently less portable. On the contrary, any Spring user who has migrated from one Application Server to another would agree that Spring provides a significant amount of abstraction in this regard. In point #4 above, I mentioned that Spring's JtaTransactionManager uses auto-detection within any Java EE Application Server and that the same applies for MBean servers, and RMI registries. Along these same lines, when using JPA, Spring detects persistence.xml and creates the EntityManagerFactory accordingly. In all of these cases, Spring metadata - whether it be annotations (@PersistenceContext, @Transactional, @Resource, etc) or XML ('jee:jndi-lookup', etc) is just as portable as any EJB 3 application.

Even when moving beyond the capabilities of a typical EJB 3 application, minimal configuration changes provide significant convenience. In this regard, Spring actually *facilitates* portability to a much wider variety of environments: Tomcat, Jetty, standalone, Eclipse, IDEA, and so on. My suggestion here would be to grab the Spring distribution's PetClinic sample application and try building and deploying the WAR file into multiple Application Servers. Then, notice that it can just as easily be deployed within Tomcat, and that the degree of portability actually far exceeds that of an EJB 3 application as soon as you want to switch between the different data access strategies that are supported by the application: JDBC, Hibernate and JPA. Take a close look at the different configuration files for those different versions (located within the 'samples/petclinic/war/WEB-INF' directory). Especially with the additions of Spring 2.5, the configuration is extremely concise. Notice that the only change necessary to switch between these different versions is one line in the web.xml where the Spring context is bootstrapped. If you want to run with a container-managed DataSource, use the one line 'jee:jndi-lookup' element. Otherwise there is a bean definition for using a standalone DataSource, and the actual database properties are externalized into jdbc.properties.

## Conclusion

Well, it looks as though I had more to say than I thought :). My intention has been to provide some objective clarifications from the Spring perspective, and I hope that is evident to the reader. I know that this presentation has been very popular at JUGs and conferences, and I think it's an important discussion. Many Java developers are overwhelmed by the vast number of options today, and it's important that they have all of the facts necessary to make well-informed decisions. While I have not emphasized it here (and you probably don't want me to go on any further), one point of the presentation as well as the book ([EJB 3 in Action](http://www.manning.com/panda/)) is that Spring and EJB 3 need not be mutually exclusive. Spring can be used within EJB applications, EJBs can be accessed from Spring applications, and Spring now supports most of the same annotations: @Resource, @PersistenceContext, @PostConstruct, @PreDestroy, @EJB, and @WebServiceRef.