---
title: Spring at China Scale: Alibaba Group (Alipay, TaoBao, and TMall)
source: https://spring.io/blog/2013/03/04/spring-at-china-scale-alibaba-group-alipay-taobao-and-tmall
scraped: 2026-02-24T08:08:29.088Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 04, 2013 | 0 Comments
---

# Spring at China Scale: Alibaba Group (Alipay, TaoBao, and TMall)

_Engineering | Josh Long |  March 04, 2013 | 0 Comments_

### So What Does It Take to Operate at China Scale?

![Some of the companies of the Alibaba group](http://blog.springsource.org/wp-content/uploads/2013/03/alibaba0.jpg)

The challenges inherent to building enterprise applications that meet China-scale demand are unparalleled. One exemplary Chinese organization using Spring heavily to solve very unique challenges is the Alibaba group. [Alibaba](http://alibaba.com) is itself an online auction site, like eBay in the west. The Alibaba group in turn owns a few other online service companies, like [Alipay](http://www.alipay.com) (a secure transaction processor, like PayPal in the west), [TaoBao](http://www.taobao.com) (a comparison shopping engine, like Shopzilla in the west), and [TMall](http://www.tmall.com) (an e-tailer, exposing the catalogues of merchants, like Amazon in the west).

From the [InfoQ article](http://www.infoq.com/news/2012/12/interview-taobao-tmall), "on 11 November, 2012 (the Double Sticks promotion day), Tmall and Taobao witnessed 147 million user visits, purchases of 30 million people and nearly 100 million paid orders. At 0:00, more than 10 million users were concurrently online." The "double sticks promotion day" is celebrated as a sort of day to honor the single people out there. People make blind-dates, attend speed-dating events, and - somewhat like cyber monday shopping in the US - look for good deals from merchants. [TaoBao reported USD $3 billion dollars for a single 24 hour period](http://venturebeat.com/2012/11/13/chinese-online-mall-taobao-reports-3b-yes-billion-in-sales-in-one-day-infographic-in-chinese/). That's almost triple the entire 2011 Black Friday sales of two of the largest e-commerce sites (combined) in the United States! Now that's awesome scale!

The Alibaba group has never been shy about talking about what they're doing and how they're doing it. They were kind enough to come to [the SpringOne Beijing event in December, 2012](http://springonechina.cloudfoundry.com/), where they explained at great length how they're using Spring to meet their unique challenges.

So, what's it take to handle *China scale*? Unsurprisingly, quite a bit! Each company had its own specific needs and use cases, and developed quite a bit of custom infrastructure and middleware to meet those demands. The architectures in a lot of ways mirror the architectures described by architects at Twitter, Facebook and Google over the years. The difference is that, by building on the Spring framework, they didn't have to go it alone, and could get to production quicker. The Spring framework underpinned all of these organizations, providing a common POJO-centric framework and idiom, while making software testing orders of magnitude simpler. Talented architects, in many cases, built their own custom, use-case specific frameworks and middleware on top of Spring's component model and runtime.

There are lots of pieces that are common across these organizations. Each organization deals with massive amounts of data and needs a scalable services and cross-service communication. Generally, these engines support the concept of a registry, which knows about which services are up in network topologies, which are available, as well as the RPC contracts supported by type. A registry like this knows how to configure each instance with an eye towards the whole network topology. Each organization uses messaging to connect systems in a reliable, fast way. Each organization has achieved optimum scale by decomposing their services and scaling each service independently. This decomposition implies that services aren't collocated, and must now incur the cost of network communication. To keep network communication to a minimum, efficiently conveyed binary representations of data with known contracts are used. Finally, to expose these services to their users, they build highly optimized, almost stateless web applications.

Alibaba group is using a variety of Pivotal technology in many different places. Above and beyond using core Spring, they're also using Spring MVC, Spring Security, and Groovy in varying configurations and uses.

They've also taken advantage of the deep flexibility that Spring provides and built their own frameworks on top of Spring. It's worth noting that a lot [of this code is available online as open-source](http://code.alibabatech.com/wiki/dashboard.action).

![The topology of a Dubbo cluster](http://blog.springsource.org/wp-content/uploads/2013/03/alibaba1.jpg)

There are actually a couple of different approaches to services in play at the Alibaba group, for different reasons. One approach is called *Dubbo*. [Dubbo](https://github.com/alibaba/dubbo) is a high performance services framework. It makes it easy to export and consume services through various modes of RPC. It also makes it easy to cluster these services. The whole system is [open source](http://code.alibabatech.com/wiki/display/dubbo/Home). You may get the code [at GitHub](https://github.com/alibaba/dubbo).

Dubbo builds on top of many existing open-source components, including [Apache Zookeeper](http://zookeeper.apache.org), [Redis](http://redis.io), and, of course, [Spring](http://www.springsource.org). It's easy to see why Dubbo has become such a key part of the stack, serving more than 2,000 services with more than 3 billion invocations everyday. Dubbo has become a key part of Alibaba's service-based solutions, and has been deployed to the whole Alibaba.com family.

You can easily setup and export services using Dubbo with the Spring namespace, which works like this:

```xml
Copy
  <!-- Application name -->
  <dubbo:application name="hello-world-app"  />

  <!-- registry address, used for service to register itself -->
  <dubbo:registry address="multicast://224.5.6.7:1234" />

  <!-- expose this service through dubbo protocol, through port 20880 -->
  <dubbo:protocol name="dubbo" port="20880" />

  <!-- which service interface do we expose? -->
  <dubbo:service interface="com.alibaba.dubbo.demo.DemoService" ref="demoService" />

  <!-- designate implementation -->
  <bean id="demoService" class="com.alibaba.dubbo.demo.provider.DemoServiceImpl" />
```

Consuming a service is just as easy. On the client, you use the [dubbo:reference](dubbo:reference) element in the Dubbo namespace to bind a proxy by interface. Then, you may inject a reference to that proxy to any service that needs it, like this:

```xml
Copy	
    <!-- consumer application name -->
    <dubbo:application name="consumer-of-helloworld-app"  />

    <!-- registry address, used for consumer to discover services -->
    <dubbo:registry address="multicast://224.5.6.7:1234" />

    <!-- which service to consume? -->
    <dubbo:reference id="demoService" interface="com.alibaba.dubbo.demo.DemoService" />
```

![SOFA architecture](http://blog.springsource.org/wp-content/uploads/2013/03/alibaba2.jpg)

Another approach to services that's used specifically at Alipay is a project they call SOFA, which also supports the easy export and consumption of services in a distributed (and, importantly, collocated environment). SOFA offers many different styles of RPC, with multiple bindings available. It is similarly easy to export services using SOFA, like this:

```xml
Copy
<sofa:service ref="beanId" interface="MyInterface">
 <sofa:binding.ws/>
</sofa:service>

<sofa:reference id="refId" interface="MyInterface">
 <sofa:binding.ws/>
<sofa:reference/>
```

You can configure lots of different types of bindings, beyond `<sofa:service.ws />`, for example: `<sofa:binding.tr>`, `<sofa:binding.msg>`, and `<sofa:binding.http>` SOFA components

![SOFAMVC architecture](http://blog.springsource.org/wp-content/uploads/2013/03/alibaba3.jpg)

While SOFA is itself very interesting, what I really like is that they've built a SOFA-architecture aware version of Spring MVC called SOFA MVC. SOFA MVC provides extensions to Spring MVC, including certain optimizations to Velocity template rendering, data mocking support, A/B test support, specific protection against certain security exploits (XSS, CSRF, upload filtration, and cookies) based on Spring Security. Additionally, they've built their own deployment and runtime, offering features like Spring application context isolation and Servlet 3-style Java configuration.

This integrated runtime approach has proven very powerful, and the next step for their very unique requirements is to migrate away from heavier runtimes like JBoss and move to a home-grown, tailor-made, lighter weight and customized container like Eclipse Virgo. They believe that OSGi is a powerful and effective microkernel, and provides for an extensible architecture. They enjoy the isolation it provides multiple deployments on the same machine (at that scale, they try to collocate and re-use as much of an application server as possible!), and they like that service specification that OSGi requires.

I would advise anyone who has the chance to take a look at the open source projects at Alibaba group. My visit to their organization was really valuable. I learned a lot about how they're changing the world. They had some feedback to give me, as well, and that has all gone back into engineering at SpringSource so that you, the community, can benefit from the advances and Alibaba has made, one transaction at a time. I personally want to thank [JingYu Wang](http://www.weibo.com/whisperxd), XinSheng Wang, Ding Li, and LeWei Zhang at TaoBao; [Zhuoran Zhuang](http://weibo.com/yannantian), [ChangDing Liu](http://weibo.com/liuchangding), [Fei Liang](http://weibo.com/liangfei0201), [FuQiang Wang](http://weibo.com/fujohnwang) at TMall; [Bing Yang](http://weibo.com/unique5945) , [Lei Wang](http://weibo.com/u/1879507010) at Alipay; and - particularly - [XueFeng Ding](http://www.weibo.com/digitalsonic) (also from Alipay) who helped organize the whole, amazing in-depth look at the way the Alibaba group is using Spring.