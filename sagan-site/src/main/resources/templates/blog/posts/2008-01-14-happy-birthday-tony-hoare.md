---
title: Happy Birthday Tony Hoare
source: https://spring.io/blog/2008/01/14/happy-birthday-tony-hoare
scraped: 2026-02-24T09:21:49.740Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  January 14, 2008 | 0 Comments
---

# Happy Birthday Tony Hoare

_Engineering | Rod Johnson |  January 14, 2008 | 0 Comments_

Last Friday was Tony (C.A.R.) Hoare's birthday. Who is [C. A. R. Hoare](http://en.wikipedia.org/wiki/C_A_R_Hoare)? If you're a programmer, you're probably familiar with [Quicksort](http://en.wikipedia.org/wiki/Quicksort)\--an elegant and surprisingly simple sorting algorithm that is blazingly fast in most cases. If you studied computer science, you've almost certainly implemented Quicksort in numerous languages, and will recognize the animation on this page. Hoare invented Quicksort in 1960, and it's now the most widely used sorting algorithm. ![Quicksort in Action](http://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif)

Among other contributions, Hoare also invented the Communicating Sequential Processes (CSP) language used to specify the interactions of concurrent processes. A smart guy, who has made a notable contribution to the evolution of computer science.

In 1980, Hoare won the Turing Award "for his fundamental contributions to the definition and design of programming languages." His acceptance speech, called [The Emperor's Old Clothes](http://www.cs.princeton.edu/~rywang/02f518/papers/hoare.pdf), should be compulsory reading not just for computer scientists but for IT managers and application developers.

Let me quote a few gems:

> Programmers are always surrounded by complexity; we cannot avoid it. Our applications are complex because we are ambitious to use our computers in ever more sophisticated ways. Programming is complex because of the large number of conflicting objectives for each of our programming projects. If our basic tool, the language in which we design and code our programs, is also complicated, the language itself becomes part of the problem rather than part of its solution.

This is not true only of languages; it's true of platforms and frameworks as well. Increasingly, these have more influence on success and failure when implementing business applications than languages themselves--a point that was made in [a panel discussion I was on in November at QCon San Francisco](http://qcon.infoq.com/sanfrancisco/conference/) on the future of the Java language. The fundamental truth is that it is the role of infrastructure (whether language or platform) to simplify life for developers, and to let them focus on the real task of delivering business value.

Points relative to languages--and long-obsolete technologies--still have a resonance today:

> For the user of a time-sharing or personal computer system, the interval between typing in a program (or amendment) and starting to run that program is wholly unproductive.

A modern translation--the code-to-test cycle must be as short as possible, making agile testing essential to productivity.

Describing an overly complex language project, Hoare commented that:

> At first I hoped that such a technically unsound project would collapse but I soon realized it was doomed to success. Almost anything in software can be implemented, sold, and even used given enough determination. There is nothing a mere scientist can say that will stand against the flood of a hundred million dollars. But there is one quality that cannot be purchased in this way - and that is reliability. The price of reliability is the pursuit of the utmost simplicity. It is a price which the very rich find most hard to pay.

When I first came across the text of this lecture 5 or 6 years ago, in the dark days of "old J2EE" I felt that Tony Hoare was directly speaking to me. **Tony Hoare Predicted the Problems of J2EE in 1980.** Back then, like most J2EE architects who were more interesting in achieving results than resume enhancement, I was in the same situation as Hoare with PL/1--watching a disaster in slow motion without the power to avert it. In [J2EE without EJB](http://www.wrox.com/WileyCDA/WroxTitle/productCd-0764558315.html) in 2004 I wrote of the "complexity industry" that produces over-complex solutions, at great cost in money, time and plain failure. The complexity industry flourishes in application development teams and internal architecture groups, as well as in infrastructure. The complexity industry is difficult to overcome, because so many people have a vested interest in its existence--sometimes financial; sometimes professional (when it allows them to build empires); and very often simply resume enhancement. Those who defend it can always argue that critics simply don't understand what they're criticizing--something that makes it the more important when people of Hoare's unquestionable eminence speak up.

That was earlier this century--and was the legacy of concepts from last century. Today, things are different--at least in the enterprise Java space. The [dramatic growth in the popularity of Tomcat](http://blog.springsource.com/main/2007/12/24/is-it-a-tomcat-or-the-elephant-in-the-room/) is perhaps the biggest proof point for the fact that developers now have the power to enforce simplicity. The (healthy) pressure of Ruby on Rails on Java (which I think will ultimately strengthen Java) points to the same thing. There's even evidence that some of the traditional application server vendors understand the change and how it can benefit their customers. BEA, through [embracing Spring](http://www.bea.com/framework.jsp?CNT=pr01660.htm&FP=/content/news_events/press_releases/2006) and other technologies that simplify customer experience, have arguably led the way. Even Sun--with the [Java EE 6 Profile concept](http://blog.springsource.com/main/2007/07/03/java-ee-6-gets-it-right/)\--seem to be moving with the times, and acknowledging the reality that many customers no longer want a traditional, monolithic application server.

Every time someone chooses not to use EJB; every time someone chooses to deploy a web application on Tomcat instead of WebSphere; every time someone chooses to use a simple remoting strategy over an elaborate SOAP-based approach, they are making this choice of simplicity. And as Hoare commented, far from punting building a "non-enterprise" grade solution, through a simpler approach, they are actually significantly gaining in key *enterprise* grade features such as reliability.

> The price of reliability is the pursuit of the utmost simplicity. It is a price which the very rich find most hard to pay.

I've been thinking more about computer science since meeting an old university friend who is now academic on a recent trip to Sydney. Hence my revisit to Hoare's lecture. But beyond the obvious lessons from Hoare's experience in both the commercial and academic worlds, thinking about computer science is depressing in the context of enterprise Java application development. We are a long way from doing *clever* things. We've suffered from so much complexity that we are focused on *making things work*. As Hoare stressed, *whatever* you want to do, having a simple model from the programmer's viewpoint is a prerequisite to doing it most successfully. (Often infrastructure needs to be clever to achieve that simplicity.)

The last few years have been about making the model of enterprise Java work in practice and defeating the complexity industry. That's largely complete. Today, outcomes in enterprise Java projects are fairly predictable and good. I believe that the new few years will be about solving problems beyond the obvious, and building infrastructure that is smarter and has greater knowledge of the code which it runs. I'm proud that I believe our company can help make this reality. As we continue to bring innovation in many areas, SpringSource will be at the forefront of working to solve building next generation technology such as [Spring Dynamic Modules for the OSGi Service Platform](http://www.springframework.org/osgi) and AspectJ, not merely cleaning up the messes of yesterday. However things work out, the future looks bright for application developers--and managers who want predictable, cost-effective results.

Happy New Year!