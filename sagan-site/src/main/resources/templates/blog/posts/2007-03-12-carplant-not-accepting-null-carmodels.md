---
title: CarPlant not accepting null CarModels
source: https://spring.io/blog/2007/03/12/carplant-not-accepting-null-carmodels
scraped: 2026-02-24T09:31:31.239Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  March 12, 2007 | 0 Comments
---

# CarPlant not accepting null CarModels

_Engineering | Alef Arendsen |  March 12, 2007 | 0 Comments_

Last Friday I finished a [training session](http://www.interface21.com/training) at a client of ours. Because I had some time to kill in the hotel I was staying in, I polished the sample application I coded up during the training to post it online for the guys of the training. Usually I try to find a little sample application specific to the client's domain to use during the training. This makes it a bit more lively instead of some of the HelloWorld examples.

This client is a big car brand, that have adopted Spring widely throughout their organization. That's why I created a CarPlant system capable of producing cars. Below you can find a little UML diagram displaying the (rather tiny) domain model and services in the system.

In the application, I'm using various techniques that you might not have seen that much yet. Here's a small list of what you can expect:

-   **@Required dependencies** - by using the RequiredAnnotationBeanPostProcessor we can check if certain dependencies are actually set. This mechanism (of course only available on Java 5) is a very nice alternative for the dependency-check attribute in XML
-   **@NotNull argument checking** - this is a simple aspect that I'm usually showing during training sessions. It uses a pointcut driven by annotations (which I think is a very neat way of driving your pointcuts) to check for null arguments passed to methods (so now you know what the title refers to ;-))
-   **DAOs *with* and *without* the use of HibernateTemplate** - to show the flexibility of Spring's DAO facilities
-   **Annotation-driven transaction management** which is a feature I definitely recommend if you're on Java 5. Using annotations for transaction management is a very good fit IMO
-   **Some integration testing** - this Spring gem (I don't think I'm the only one with this opinion ;-) ) is not used enough yet when I visit clients so let's do a little more promotion of the AbstractTransactionalDataSourceSpringContextTests (thanks Rod for the name :) )

The sample uses Maven, so you have to have that installed, because I haven't included the dependencies.

![carplant.png](http://blog.interface21.com/main/wp-content/uploads/2007/03/carplant.png)

The source code for the sample: [CarPlant.zip](http://blog.interface21.com/main/wp-content/uploads/2007/03/CarPlant.zip "CarPlant.zip")