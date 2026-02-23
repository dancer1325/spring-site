---
title: This Week in Spring (SpringOne Platform 2019 edition) - October 8th, 2019
source: https://spring.io/blog/2019/10/08/this-week-in-spring-springone-platform-2019-edition-october-8th-2019
scraped: 2026-02-23T14:32:58.856Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  October 08, 2019 | 3 Comments
---

# This Week in Spring (SpringOne Platform 2019 edition) - October 8th, 2019

_Engineering | Josh Long |  October 08, 2019 | 3 Comments_

It's here it's finally here! My favorite time of the year! Happy SpringOne Platform week! This week I'm in amazing Austin, TX talking to anybody who wants to about all things Spring. There have been a *ton* of amazing things announced at this show but one thing I've been excited to share with y'all is that we just announced the new Azure Spring Cloud runtime. (More on that in the links below)

I've been busy! I'm doing one talk with Microsoft on Azure Spring Cloud, and another with Okta / Google on simplifying the dev lifecycle. Also, I'm hosting the keynote tomorrow morning. So much to do, so little time!

I feel like this is a worthwhile time to mention how grateful I am that you're all out there. This community is the biggest and the best and I am forever grateful to be a part of it. I'm so glad that I get to meet so many of you this week at this show. Without you, this should wouldn't be possible!

Anyway, here are your gratuitous selfies and tweets!

> I had waay too much fun with LTR [@mraible](https://twitter.com/mraible?ref_src=twsrc%5Etfw) [@saturnism](https://twitter.com/saturnism?ref_src=twsrc%5Etfw), Lonnie and her husband Rex, [@TrishPhoto](https://twitter.com/TrishPhoto?ref_src=twsrc%5Etfw) and [@\_JamesWard](https://twitter.com/_JamesWard?ref_src=twsrc%5Etfw) [@s1p](https://twitter.com/s1p?ref_src=twsrc%5Etfw) — thank you all so much! [pic.twitter.com/0BYYvLdNu6](https://t.co/0BYYvLdNu6)
> 
> — Josh Long (龙之春, जोश, Джош Лонг, جوش لونق) (@starbuxman) [October 8, 2019](https://twitter.com/starbuxman/status/1181358792786755585?ref_src=twsrc%5Etfw)

> The power of “simple”. [@s1p](https://twitter.com/s1p?ref_src=twsrc%5Etfw) [@Pivotal](https://twitter.com/pivotal?ref_src=twsrc%5Etfw) [@VMware](https://twitter.com/VMware?ref_src=twsrc%5Etfw) [#Tanzu](https://twitter.com/hashtag/Tanzu?src=hash&ref_src=twsrc%5Etfw) SpringInitializr has 1M projects started every month. Check it out - [https://t.co/GCnvJ3SqL3](https://t.co/GCnvJ3SqL3). We’re just getting started! [pic.twitter.com/Lz4ixUTtaA](https://t.co/Lz4ixUTtaA)
> 
> — Chad Sakac (@sakacc) [October 7, 2019](https://twitter.com/sakacc/status/1181217922280312833?ref_src=twsrc%5Etfw)

> Hanging out with data / Greenplum legend Scott Yara [@s1p](https://twitter.com/s1p?ref_src=twsrc%5Etfw) [pic.twitter.com/45FJc5MZwk](https://t.co/45FJc5MZwk)
> 
> — Josh Long (龙之春, जोश, Джош Лонг, جوش لونق) (@starbuxman) [October 8, 2019](https://twitter.com/starbuxman/status/1181379597499338754?ref_src=twsrc%5Etfw)

> Hanging out with [@Microsoft](https://twitter.com/Microsoft?ref_src=twsrc%5Etfw) ‘s legendary [@Johnmont](https://twitter.com/Johnmont?ref_src=twsrc%5Etfw) [@s1p](https://twitter.com/s1p?ref_src=twsrc%5Etfw) [pic.twitter.com/JMKtvGuSBx](https://t.co/JMKtvGuSBx)
> 
> — Josh Long (龙之春, जोश, Джош Лонг, جوش لونق) (@starbuxman) [October 8, 2019](https://twitter.com/starbuxman/status/1181370931165442049?ref_src=twsrc%5Etfw)

> Hey [@s1p](https://twitter.com/s1p?ref_src=twsrc%5Etfw) I’m hanging out with my friends from ⁦[@Azure](https://twitter.com/Azure?ref_src=twsrc%5Etfw)⁩ at the [@Microsoft](https://twitter.com/Microsoft?ref_src=twsrc%5Etfw) booth. Would love to talk to you-come say hi [pic.twitter.com/e8adJttufw](https://t.co/e8adJttufw)
> 
> — Josh Long (龙之春, जोश, Джош Лонг, جوش لونق) (@starbuxman) [October 8, 2019](https://twitter.com/starbuxman/status/1181677710696992769?ref_src=twsrc%5Etfw)

> Big news! [@ryanpmorgan](https://twitter.com/ryanpmorgan?ref_src=twsrc%5Etfw) and [@Johnmont](https://twitter.com/Johnmont?ref_src=twsrc%5Etfw) announce Azure Spring Cloud. Fully managed service, jointly developed, for running Spring apps on [@Azure](https://twitter.com/Azure?ref_src=twsrc%5Etfw). [#SpringOne](https://twitter.com/hashtag/SpringOne?src=hash&ref_src=twsrc%5Etfw) [pic.twitter.com/ZEFtoSqCUs](https://t.co/ZEFtoSqCUs)
> 
> — Bryan Friedman (@bryanfriedman) [October 8, 2019](https://twitter.com/bryanfriedman/status/1181583035260702722?ref_src=twsrc%5Etfw)

And, without further ado, let's get to this week's extra packed and extra special installment. There are so many projects that *happened* to go GA just before SpringOne, so don't miss this incredible list!

-   [We are so pleased to *finally* be able to announce the Azure Spring Cloud runtime option](https://azure.microsoft.com/en-us/blog/introducing-azure-spring-cloud-fully-managed-service-for-spring-boot-microservices/)! Azure Spring Cloud is a partnership between Microsoft and Pivotal to provide a fully-managed environment to build and run Spring Cloud-powered microservices. It includes easy access to the Spring Cloud Config Server, the Eureka service registry, as well as other best-in-breed components like CosmosDB (a dropin replacement for a good many MongoDB applications) and Microsoft SQL Server. This is *huge* news! I'm at SpringOne Platform 2019 and doing a joint session with Microsoft's Julien Dubois to announce the details. Here is [the Pivotal blog on the partnership, too](https://content.pivotal.io/blog/azure-spring-cloud-a-new-way-to-run-spring-boot-apps-atop-kubernetes)
-   [What's new in Spring Data Moore?](https://spring.io/blog/2019/10/08/what-s-new-in-spring-data-moore)
-   [Spring Cloud Hoxton.M3 is now available](https://spring.io/blog/2019/10/05/spring-cloud-hoxton-m3-is-now-available)
-   [A Bootiful Podcast: Oracle's Geertjan Wielenga on his new book "Developer, Advocate!"](https://spring.io/blog/2019/10/04/a-bootiful-podcast-oracle-s-geertjan-wielenga-on-his-new-book-developer-advocate). The book has a chapter all about yours truly and - despite that - is still a great read for anyone pursuing a career in developer advocacy. And if you are, I hope you'll join me in advocating for *bootiful* applications, too! :-)
-   [Spring Boot for Apache Geode & Pivotal GemFire 1.1.2.RELEASE and 1.2.0.RC1 Available](https://spring.io/blog/2019/10/03/spring-boot-for-apache-geode-pivotal-gemfire-1-1-2-release-and-1-2-0-rc1-available)
-   [Reactor Californium-SR12 is out](https://spring.io/blog/2019/10/03/reactor-californium-sr12-is-out)
-   Next week, [I'll be in Amsterdam doing a talk - join me!](https://www.meetup.com/Tech-Meetups-ING/events/264844748/)
-   [Reactor Dysprosium (3.3.x) goes GA](https://spring.io/blog/2019/10/03/reactor-dysprosium-3-3-x-goes-ga)
-   [Spring Boot 2.2.0 RC1 has been released!](https://spring.io/blog/2019/10/03/spring-boot-2-2-0-rc1-has-been-released)
-   [Spring for RabbitMQ (Spring AMQP) 2.2 is now available](https://spring.io/blog/2019/10/02/spring-for-rabbitmq-spring-amqp-2-2-is-now-available)
-   [Spring for Apache Kafka 2.3 is now available](https://spring.io/blog/2019/10/02/spring-for-apache-kafka-2-3-is-now-available)
-   [Spring Boot 2.1.9 available now](https://spring.io/blog/2019/10/02/spring-boot-2-1-9-available-now)
-   [Spring Session for Apache Geode & Pivotal GemFire 2.1.6.RELEASE and 2.2.0.RC1 Available](https://spring.io/blog/2019/10/02/spring-session-for-apache-geode-pivotal-gemfire-2-1-6-release-and-2-2-0-rc1-available)
-   [Spring Integration 5.2 GA Available](https://spring.io/blog/2019/10/02/spring-integration-5-2-ga-available)
-   [Spring Security 5.2 goes GA](https://spring.io/blog/2019/10/01/spring-security-5-2-goes-ga)
-   [Spring Data R2DBC 1.0 RC1 released](https://spring.io/blog/2019/10/01/spring-data-r2dbc-1-0-rc1-released)
-   [Spring Data Moore goes GA](https://spring.io/blog/2019/10/01/spring-data-moore-goes-ga)
-   [Reactive Gateways with Spring Cloud Gateway](https://www.youtube.com/watch?v=iuh_b1futro&feature=share)
-   [twitter.com](https://twitter.com/ryanpmorgan/status/1181588723173089280?s=12)
-   [How to Run Apache Kafka with Spring Boot on Pivotal Application Service (PAS)](https://www.confluent.io/blog/apache-kafka-spring-boot-tutorial-for-pivotal-application-service) - a great post from our friends at Confluent!
-   [Pivotal teamed up with Microsoft, Docker, HashiCorp, Bitnami, Pivotal, and many others to create Cloud Native Application Bundles (CNAB)](https://content.pivotal.io/blog/cloud-native-application-bundles-a-simple-way-to-install-software-on-kubernetes-or-any-other-runtime?utm_campaign=content-social&utm_content=1568123224&utm_medium=social-sprout&utm_source=twitter). CNAB is an open source cloud-agnostic package format specification for bundling and installing distributed applications.
-   [Create Neo4J nodes from Excel!](https://twitter.com/rustyoliver/status/1180737891426689026?s=12)
-   [Spring Cloud Loadbalancer now has its own starter](https://twitter.com/olga_maciaszek/status/1180623087546572802?s=12)
-   [IBM's Billy Korando has a great post on using Spring Cloud Contract](https://t.co/kkWIvw5sm9?amp=1)
-   [Azure Functions using Java Spring with CI/CD using Azure Pipelines— Part 2](https://medium.com/@visweshwar/azure-functions-using-java-spring-with-ci-cd-using-azure-pipelines-part-2-44b341e9728e)
-   [Unboxing new Microsoft Azure solutions at SpringOne Platform 2019 - Open Source Blog](https://cloudblogs.microsoft.com/opensource/2019/10/03/new-microsoft-azure-solutions-springone-platform-2019/)
-   [JAX-WS SOAP Webservice Authentication Example using Spring Boot - Roy Tutorials](https://www.roytuts.com/jax-ws-soap-webservice-authentication-using-spring/)
-   [A Tutorial on Kafka With Spring Boot](https://dzone.com/articles/magic-of-kafka-with-spring-boot)
-   Thanks to [Brian Devins](http://twitter.com/devinsba), we now have support [for SQS Messaging in Spring Cloud Sleuth](https://github.com/spring-cloud/spring-cloud-sleuth/pull/1218)
-   [How to configure RSocket security in a Spring Boot application with Spring Security - Stack Overflow](https://stackoverflow.com/questions/58130652/how-to-configure-rsocket-security-in-a-spring-boot-application-with-spring-secur)
-   [This thread by Rod Johnson inviting people to contribute elements of style when writing Spring Boot-based applications](https://twitter.com/springrod/status/1178903600791085056?s=12) is pretty epic!