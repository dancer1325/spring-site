---
title: Spring Overtakes EJB as a Skills Requirement
source: https://spring.io/blog/2008/01/24/spring-overtakes-ejb-as-a-skills-requirement
scraped: 2026-02-24T09:21:29.836Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  January 24, 2008 | 0 Comments
---

# Spring Overtakes EJB as a Skills Requirement

_Engineering | Rod Johnson |  January 24, 2008 | 0 Comments_

Job listings are a good indicator of the true adoption of technologies. They indicate whether or not companies are spending money, making it possible to distinguish substance from hype; they indicate the importance for developers of gaining and growing the relevant skills (an important element of technology perpetuation); and they provide a good guide to the safety for companies in adopting a particular technology.

Thus the [jobtrends](http://www.indeed.com/jobtrends) site of Indeed.com, a job listing aggregation site, is an important resource. It allows trends in the number of job requirements to be tracked over time, and makes it convenient to compare technologies.

Sometimes these trends can have dramatic implications. Indeed.com shows that in November, 2007, Spring overtook EJB as a skills requirement for Java job listings. As of yesterday, the respective job numbers were 5710 for Spring against 5030 for EJB.

Comparing absolute job numbers, we can see the trend lines and where they cross over:

![Spring vs EJB absolute job numbers](http://blog.springsource.com/main/wp-content/uploads/2008/01/spring-ejb-absolute.png)

Given the immense amount of legacy EJB, this is amazing. Presumably, few new projects now use EJB.

The "relative" graph, comparing the respective rates of growth, is even more interesting, showing a stark contrast between the two technologies:

![Spring vs EJB relative job numbers](http://blog.springsource.com/main/wp-content/uploads/2008/01/spring-ejb-relative.png)

We see that EJB requirements are stagnant or in decline, while Spring requirements are growing at an ever increasing rate.

Of course, Spring and EJB are not mutually exclusive. Using Spring does not prevent you from using EJB, or vice versa. There are cases where EJB provides useful services you might want in an application using Spring. Using any version of EJB without Spring would be to forgo numerous valuable additional capabilities. Indeed, it's largely been the pro-EJB lobby who have (for whatever reason) presented the two technologies as direct competitors.

The overlap between the two technologies is significant and growing, but not at the rate at which Spring requirements are growing:

![Spring and EJB job numbers](http://blog.springsource.com/main/wp-content/uploads/2008/01/spring-and-ejb-absolute1.png)

While it's not an apples-to-apples comparison, it is reasonable to consider Spring and EJB as alternatives for the core component model in enterprise Java applications. And it's clear which is now in the ascendancy.

I must admit to a certain degree of personal satisfaction, given that I've been predicting that EJB would become legacy since early 2003, and arguing that EJB was way overused [before that](http://www.wiley.com/WileyCDA/WileyTitle/productCd-0764543857.html). In [J2EE without EJB](http://www.wiley.com/WileyCDA/WileyTitle/productCd-0764558315.html), I laid out a detailed analysis of the deficiencies of the EJB model and how it failed ot meet its stated goals or the needs of developers and customers. Back then, such statements were highly controversial.

EJB 3.0 improves things somewhat, but it's still too little, too late: the DI capability is less than has proven to be needed for the real world; the interception API recognizes the need for a solution to cross-cutting concerns, but provides the least capable, clunkiest and most error-prone solution yet seen (something I've been meaning to blog on for a while); it's saddled with the baggage of backward compatibility with now irrelevant previous generation technologies; the full EJB contract (which is hundreds of pages longer than the "simplified programming model") dictates a complex runtime with excessive overhead; despite its syntax sugar, it fails to address a number of deficiencies in EJB such as startup actions, singletons and the obsolete threading model. Finally, it's effectively tied to an app server environment, at a time of changing infrastructure.

I could go on and on about these deficiencies, but the job numbers speak of the practical experiences and conclusions of thousands of companies.

*Note that I'm talking about session and message beans here; JPA is a separate specification now, is based on modern technology, and is proving its value.*

What does the decline of EJB mean to the industry as a whole, and for individual developers?

-   The fact that there are plenty of good technical reasons for the decline of EJB is heartening. It's one of many signs that it's harder today to impose solutions that have never been proven in practice than it was when J2EE emerged. This is a Good Thing.
-   It's not necessarily a rejection of standards--just a healthy rejection of standards that don't deliver results. As I've long argued, Java EE is more than EJB, and anyone who cares about the platform as a whole should be honest about the relevance and quality of the parts.
-   With better technology, business objects become POJOs, dependence on specific component models diminishes and labels become less important.
-   Moving away from EJB provides greater architectural flexibility, at a time when requirements are changing, through the rise of SOA and other forces, and [companies are increasingly choosing lighter-weight deployment platforms](http://blog.springsource.com/main/2007/12/24/is-it-a-tomcat-or-the-elephant-in-the-room/). Although support for various parts of the EJB 3.0 model is available outside a full-blown application server (including in [Spring 2.5](http://www.springframework.org/node/561), which offers the EJB 3.0 DI model in addition to its own, and in [Pitchfork,](http://www.springsource.com/web/guest/pitchfork/pitchfork-faq) which is used as [the basis of WebLogic 10's EJB 3.0 implementation](http://www.bea.com/framework.jsp?CNT=pr01660.htm&FP=/content/news_events/press_releases/2006)), EJB is a component model fundamentally predicated on deployment to a traditional application server.

Frankly, the EJB era was an aberration. EJB failed to solve the problems of earlier this decade; it's still more inadequate to those of the future. Most of EJB's initial premises are now discredited; the specification's insistence on backward compatibility does not justify the tradeoffs it imposes. Its decline is a natural consequence of moving into a new, more fluid, world, where technologies such as [OSGi](http://www.osgi.org/osgi_technology/) and the humble Servlet API are proving much more relevant. Of course, as the absolute numbers are still very high, EJB is not going to go away completely any time soon. But the trend lines clearly suggest that it *is* becoming legacy.

It's timely that this milestone in job requirements occurred just before we announced the [SpringSource Spring Certification program](http://blog.springsource.com/main/2008/01/17/the-springsource-certification-program/). Now that Spring is such an important skill in the market, it's important to both employers and developers that there is a definitive measure for Spring knowledge.

Further proof of Spring's momentum was recently given by statistics on leading industry web sites for 2007. On ServerSide, [2 of the top 5 articles](http://www.theserverside.com/news/thread.tss?thread_id=47967) were about Spring, including the top article. On [InfoQ](http://www.infoq.com), 3 of the top 10 were about Spring, with the top article (my Spring 2.0 Update) getting 4x the page views of the next most popular.