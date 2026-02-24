---
title: Spring 2.5\'s Comprehensive Annotation Support
source: https://spring.io/blog/2008/01/28/spring-2-5-s-comprehensive-annotation-support
scraped: 2026-02-24T09:21:06.453Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  January 28, 2008 | 0 Comments
---

# Spring 2.5's Comprehensive Annotation Support

_Engineering | Juergen Hoeller |  January 28, 2008 | 0 Comments_

One of the central themes behind Spring 2.5 is comprehensive annotation-based configuration. We've been talking and blogging a lot about **@Autowired**, about Spring MVC's **@RequestMapping** and also about the new support for annotated tests written with JUnit4 or TestNG. **@Autowired** is certainly the central one of Spring 2.5's annotations, being available for use in service components, web components, unit tests - even domain objects when using Spring's **@Configurable** with AspectJ weaving. Spring MVC's **@RequestMapping** is equally flexible, supporting many variants of handler method signatures.

Today I'd like to take a different focus, namely on the wide-ranging set of dependency injection annotations supported by Spring. The following list includes the key annotations that can be used within Spring 2.5 beans:

-   **org.springframework.beans.factory.annotation.Required**: Identifies bean property setters that must be called (as opposed to optional setters). Supported since Spring 2.0.
-   **org.springframework.beans.factory.annotation.Autowired**: Spring 2.5's central injection annotation, applying to constructors, config methods and fields. Performs injection of components by type, with supporting for "qualifier" annotations that narrow the potential set of candidates in case of multiple matches.
-   **javax.annotation.PostConstruct**: JSR-250's common annotation for what Spring calls "init methods".
-   **javax.annotation.PreDestroy**: JSR-250's common annotation for what Spring calls "destroy methods".
-   **javax.annotation.Resource**: JSR-250's common annotation for injecting an external component by name. A "resource" in JSR-250 terminology really refers to a middleware component such as a DataSource.
-   **javax.xml.ws.WebServiceRef**: @Resource-like, for JAX-WS service lookups, injecting a JAX-WS port proxy.
-   **javax.ejb.EJB**: @Resource-like, for EJB Session Bean lookups, injecting an EJB component reference.
-   **javax.persistence.PersistenceUnit**: injecting a JPA EntityManagerFactory by persistence unit name. Supported since Spring 2.0.
-   **javax.persistence.PersistenceContext**: injecting a JPA EntityManager by persistence unit name. Supported since Spring 2.0.

  
This set of annotations encompasses all of Java EE 5's common annotations, which means that you may use the same common annotations in e.g. Servlet 2.5 servlets, JSF 1.2 managed beans and Spring managed beans. In other words, if you have some standard JSF 1.2 managed beans with annotation usage, you can take them as-is and move their definitions from faces-config to a Spring application context, without any change in the bean classes! This was an important design goal: Spring 2.5 may serve as straightforward replacement of the standard JSF 1.2 managed bean facility, simply through choosing **SpringBeanFacesELResolver** as your custom JSF ELResolver.

Configuration-wise, all you need to enable the complete set of annotations above is the following simple configuration element in your Spring application context:

`  <context:annotation-config/>  `

Note that this setting is related to dependency injection only and does not require any parameterization. (For customization, consider defining Spring's individual AnnotationBeanPostProcessors instead, e.g. **CommonAnnotationBeanPostProcessor**). However, the annotation-config element does *not* activate any kind of proxying or special exporting. For such purposes, Spring provides more specific configuration elements:

`  <tx:annotation-driven/>  `

This setting activates processing of transaction annotations, with the following two variants supported out of the box in Spring 2.5:

-   **org.springframework.transaction.annotation.Transactional**: Spring's own transaction annotation, as introduced in Spring 1.2. Allows for specifying propagation behavior (REQUIRED, REQUIRES\_NEW, etc), read-only flag, custom isolation level (REPEATABLE\_READ, SERIALIZABLE, etc) and custom rollback rules on a per-transaction level.
-   **javax.ejb.TransactionAttribute** EJB 3.0's transaction annotation. No customization options other than propagation behavior (REQUIRED, REQUIRES\_NEW, etc).

  
Side note: As with all of Spring's support options, the EJB 3.0 TransactionAttribute annotation will only be available if the EJB 3.0 API is actually present in the classpath. Spring automatically adapts to the presence of that API, analogous to the JSR-250 API or the JPA API (as referenced above).

The **<tx:annotation-driven>** element allows for transaction-specific configuration, e.g. the Spring PlatformTransactionManager to talk to (through the "transaction-manager" attribute) and the *mode* to operate in:

`  <tx:annotation-driven transaction-manager="myTm" mode="aspectj"/>  `

The explicit AspectJ mode of transaction annotation processing is new in Spring 2.5, allowing to use Spring's **AnnotationTransactionAspect** instead of traditional AOP proxies. This requires AspectJ compile-time weaving or load-time weaving, modifying the byte code of classes that happen to use the **@Transactional** annotation. Such weaving allows for supporting the annotation on any kind of method: be it public, protected or private - be it an external call or a call from within the object - the transaction will always kick in as specified by the annotation. This is in sharp contrast to traditional AOP proxies, where annotation-driven transactions are limited to public method calls coming in through the proxy.

If your environment is capable of load-time weaving, then the following configuration is sufficient for enabling AspectJ-style transaction annotation processing. Note that this requires either a runtime environment with built-in weaving support (e.g. WebLogic 10, OC4J 10.1.3.1, Tomcat configured with Spring's TomcatInstrumentableClassLoader) or Spring's VM agent to be specified on JVM startup ("-javaagent:spring-agent.jar").

`  <context:load-time-weaver/>  <tx:annotation-driven mode="aspectj"/>   `

`<bean id="transactionManager" class="..."/> `

Finally, Spring 2.5 also provides a convenient configuration element for activating JMX exporting. The default MBeanServer will be autodetected on all common platforms, including the standard Java 5 platform MBeanServer as well as the special MBeanServers exposed by WebLogic 9/10 and WebSphere 6.

`  <context:mbean-export/>  `

Spring-managed beans may then implement standard MBean/MXBean conventions, qualifying as MBean classes according to the JMX specification, or use the following annotations to declare their management signature (as known since Spring 1.2):

-   **org.springframework.jmx.export.annotation.ManagedResource**: used at the type level to indicate a JMX-exposed component.
-   **org.springframework.jmx.export.annotation.ManagedAttribute**: used at the bean property setter/getter level to indicate an MBean attribute.
-   **org.springframework.jmx.export.annotation.ManagedOperation**: used at the public method level to indicate an exporter MBean operation.

  
This indicates the real power of Spring's annotation configuration model: Different configuration concerns seamlessly merge into a unified whole, with consistent configuration style and unified component lifecycle - it's all still a standard Spring bean underneath, managed by a Spring ApplicationContext!

So much for this brief tour through Spring's core configuration annotations. If you are interested in hearing more about what's new in Spring 2.5 and how it all ties together, let me invite you to this Wednesday's [Spring 2.5 webinar](http://www.springsource.com/web/guest/webinars) where I will be covering all key feature areas in Spring 2.5, ranging from Java 6 support to annotation-based configuration!