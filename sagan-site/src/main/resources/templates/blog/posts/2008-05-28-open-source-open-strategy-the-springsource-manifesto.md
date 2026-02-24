---
title: Open Source, Open Strategy: The SpringSource Manifesto
source: https://spring.io/blog/2008/05/28/open-source-open-strategy-the-springsource-manifesto
scraped: 2026-02-24T09:16:58.713Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  May 28, 2008 | 0 Comments
---

# Open Source, Open Strategy: The SpringSource Manifesto

_Engineering | Rod Johnson |  May 28, 2008 | 0 Comments_

As an open source software provider, we think we should be open about our strategy, too. We'd like to share how we got here, where we're going and why the journey will be good for Spring, good for Spring users and good for SpringSource.

## Our History

The Spring story began in 2001, when I began working on the 30,000 lines of framework code I published along with [Expert One-on-One J2EE Design and Development](http://www.wrox.com/WileyCDA/WroxTitle/productCd-0764543857.html) in 2002. My objective was to help others to avoid the pitfalls that I had encountered completing J2EE projects since 1999.

It quickly became clear that others liked the ideas in that code - such as Dependency Injection and the Spring data access abstraction - and benefited from putting them into practice. I was approached by readers who requested that I publish the code and who wanted to contribute.

I quickly came to see some important benefits of open source.

-   Most users get the functionality they need for free

```
Copy    	<li> It develops a strong community, which contributes to making the software better </li>

     	<li>Open source is inherently anti-bureaucratic </li>
     	<li>Open source can underpin a business model with lower sales and marketing costs than a traditional enterprise software company---meaning better value for customers. </li>
     	<li>Open source projects (and, hence, open source companies) can attract developers worldwide, rather than in any one geographical area. This represents a huge pool of talent that isn't available to traditional software vendors.</li>
```

## Real value, Real cost

These benefits are great, but they don't suspend the laws of gravity or economics.

No software gets developed by magic. In the case of Spring, we brought together an outstanding group of developers early on. There was a big personal cost to those individuals, which could not have been sustained forever. I spent around 18 months out of the workforce working on Spring and the ideas behind it. This affected my family's financial stability: we even needed to redraw a significant amount from our mortgage. Juergen Hoeller was fortunate to have an employer who understood the potential savings Spring could deliver in building their software product. However, he soon needed to move to part time work--with a corresponding salary sacrifice--to maintain his commitment to Spring. It was that long, intense, focused effort from Juergen and myself that set Spring up for what it is today. Other core developers like Colin Sampaleanu and Thomas Risberg were able to make a more intermittent contribution, through devoting their own personal time and at a sacrifice of their families and friends. This situation was not sustainable enough to underpin critical infrastructure for the enterprise.

In the long term, all software development requires investment. Not just investment in writing code: investment in *maintaining* it for the long haul.

We founded SpringSource (then Interface21) in 2004 to enable that investment.

The following year we were able to make our first high profile hire, who helped to increase the firepower of the team and its intellectual leadership---Adrian Colyer: IBM Senior Technical Staff Member, lead of the AspectJ project. This was a big milestone. For the first time we were able to make it possible for someone to work on Spring who couldn't do so otherwise.

Initially our business was based around consulting and training. It became clear that those businesses could not sustain the level of investment that our user community expected and could not enable the delivery of the vision that we were passionate about delivering as technologists. Our growth was constrained; too many of our best people spent the bulk of their time and energy delivering services, with little left to write software; and we were worried that we would burn out our staff with the level of travel and overtime that we were forced to require.

When Spring 2.0 was released several months behind schedule, we realized that our then business model was a starting, rather than an end point. Also in 2006 our vision grew, as the broadening of the Spring Portfolio and our exploration of the potential of the OSGi and Spring models demonstrated the transformational potential of a Spring-based server platform.

We decided to [raise funding in 2007](http://blog.springsource.com/main/2007/06/06/why-did-we-raise-10m/) to realize this vision, and bridge our transition from a services business to a software company that could sustain the creation of top quality software.

The benefit was dramatic. We were able to recruit more star developers into the team and enable them to contribute more to open source. We were able to focus talented product developers among our existing staff toward enhancing and extending the Spring Portfolio. We were able to ensure the future of AspectJ after IBM reduced its investment.

Our record of open source releases in the last few months speaks for itself:

```
Copy    <ul>
<li> Spring 2.5 </li>
     	<li>Spring.NET 1.1 </li>
     	<li>Spring Security 2.0 </li>
     	<li>Spring Web Flow 2.0</li>
     	<li>Spring Batch 1.0  (co-developed by SpringSource and Accenture) </li>
     	<li>Spring Web Services 1.5 </li>
     	<li>Spring Integration </li>
     	<li>Spring Dynamic Modules 1.0 </li>
     	<li>Spring IDE 2.0</li>
     	<li>AspectJ 1.6</li>
```

All these releases move those projects forward significantly and deliver real benefits to users.

We're also making significant contribution to other open source projects such as Apache Tomcat, Apache HTTPD (the Apache web server that powers much of the Internet) and other Apache projects, and the Mylyn project at Eclipse.

## Our Values

Over the last 5 years the Spring team has evolved from a project team into a company, and our business model has changed from a services business into a software company with an outstanding services capability. Throughout this transformation we've maintained our core values. In particular:

-   We've always been focused on technical leadership and excellence.
-   We don't aim to deliver me-too solutions, but to advance the art.
-   We deliver pragmatic technical solutions. Software is only as valuable as the results it delivers in the real world.
-   We believe that long-term success in open source business requires significant contribution to open source.
-   We're proud of our integrity. We are honest with our community, our users and customers.
-   We strive to deliver the utmost value to our customers.
-   We treat our users, customers, partners and competitors with respect.
-   We value our community and strive to act in its best interests.

Our actions flow from these values. For example:

-   We won't reinvent a good wheel. We will use existing projects where possible, getting involved in them if we think they are important to our users, as with AspectJ, Tomcat and Equinox. We are the most active contributors to the first two of those projects. To this end, you will see us get more involved in the Apache and Eclipse communities. We aim to be the leading provider of enterprise Java open source, so it's natural for us to take an active role in the communities behind important open source projects.
-   We *will* create new projects where no good solution exists. Spring Batch is a great example of this---bringing Spring values of power, simplicity and consistency to an area that has been sadly neglected in Java infrastructure.

The strength of these values has helped our company through a period of rapid growth. It has also been a key factor in the success of our integration with [Covalent, a long-established open source company we acquired in January 2008](http://blog.springsource.com/main/2008/01/29/some-decisions-are-easy-%e2%80%93-like-springsource-acquiring-covalent/). The two organizations had a similar culture, making it natural for the staff to integrate. And it helps us to continue to attract outstanding technical and business talent.

## Our (and *Your*) Software

At SpringSource we develop three types of products, which are distinct:

```
Copy     <ul>
```

-   *Ubiquitous programming models and infrastructure.* This covers the Spring Portfolio, as well as AspectJ (which we lead) and Tomcat (to which we are a leading contributor). We want everyone to be able to use these projects. Many of them are de facto standard.

```
Copy     <li>
```

*[The SpringSource Application Platform](http://www.springsource.com/web/guest/products/suite/applicationplatform).* A complete application server product building on the Spring Portfolio and other Apache and EPL software.

```
Copy     <li>
```

*[Enterprise value adds](http://www.springsource.com/web/guest/products/enterprise).* Value adds to both categories of open source products. We provide these via annual subscription to a commercial license for our customers. They enhance productivity in building Spring applications (as in SpringSource Tool Suite), or the operational experience of running those products in production (as in SpringSource Application Management Suite). They do not define programming model or deployment model, but enhance the experience obtainable by using the first two categories of product. Users are not forced to purchase these value adds (unlike with a traditional software license); they can confirm for themselves that they provide value for money.

## Our Business Strategy

We redefined enterprise Java with Spring. Our mission is to continue to provide the technical leadership and solutions to take enterprise Java to the next level. We are building a great software company around this.

Currently there is a stark misalignment of software value delivered and economic activity around enterprise Java. The lion's share of revenue goes to BEA (Oracle) and IBM, yet significant parts of the runtime their customers use is open source, and the innovations that matter in enterprise Java mostly come from elsewhere.

It's clear that the enterprise Java market needs fresh solutions and it's also clear that the market would like the solutions from a open source company. We believe that it will be us.

We make money by:

```
Copy    <ul>
<li>Providing world class support and services. This includes dependable 24x7 support, outstanding training and consulting services and indemnification for enterprise customers who are understandably risk-averse. </li>
     	<li>Adding subscription products that deliver value to complement the Spring Portfolio. </li>
     	<li>Selling subscriptions to enterprise editions of our full-stack products. </li>
```

## Our Licensing Strategy

Our recent release of the SpringSource Application Platform under the GPL v3 has generated much discussion. I'd like to take the opportunity to explain our licensing strategy, and why we believe it is the right choice for the Spring community.

First, let's be completely clear and get an important question out of the way:

**We are not changing and will not change the license of any existing project**. The Spring Portfolio will remain under the Apache License. This covers the Spring Framework, Spring Security, Spring Web Flow and the rest of the Spring Portfolio.

We remain committed to the Apache License (and the EPL) everywhere we've used it. However, not all software is alike. Different licenses are appropriate for different products. This year, SpringSource has brought several important new products to market for which different licensing is appropriate.

Licenses other than the Apache License have two purposes for us:

```
Copy    <ul>
<li><em>For additional products available only to our customers</em>. These products satisfy a real need for those customers, and help to sustain the open source software that they and others benefit from. </li>

     	<li><em>To ensure that ISVs and OEMs using our new stack products don't get a free ride from software we develop for our community, and that software vendors can't compete with us with our own code</em>. The GPL v3 license used for the SpringSource Application Platform meets this goal, while remaining free to end users or open source usage. 
```

Let's consider the second point in detail where the SpringSource Application Platform is concerned. This is a full stack product that competes with offerings from Oracle/BEA (WebLogic, OC4J), IBM (WebSphere) and Red Hat (JBoss). All those vendors recognize that they also need a mature OSGi-based runtime. We have a substantial technology lead in this area. All three will need to do the heavy lifting we've done with SpringSource Application Platform's dm-Kernel™.

Suppose that we published SpringSource Application Platform under the ASL. We could expect these vendors to compete with us in short order and they would likely charge their customers for products that use the technology. Not only would this be unfair, but it would reduce our ability to invest in the product - ultimately hurting the entire community.

So we chose a license that means that end users can freely benefit from our work, but competitors can't compete with us with our own code.

## Where Next?

We aim to create a complete Java stack, based on Spring projects and Spring philosophy. Wherever we've gone thus far, we've made things easier, better and faster. We're going to go a lot more places. Some have expressed fear about our efforts getting diluted, but the evidence (for example, recent Spring Portfolio releases) proves that we are accelerating. In the last 6 months we've released more open source, at a faster rate, than ever before. We are scaling our efforts in the same modular fashion as the products underlying the development. Our product strategy is inherently anti-monolithic and this is translating nicely as the organization grows.

For years, we've created great technology. Today we're creating more than ever. We're proud that we've helped to drive the transformation of enterprise Java from the misery of EJB 1.x and 2.x to agile development with POJOs. We've delivered billions of dollars of value to enterprise customers and we'll deliver much more in the future.

We're excited about continuing the story and delivering more, better infrastructure. The enterprise Java community needs a company focused on delivering best of breed solutions. We redefined enterprise Java once with Spring and it's another new season for enterprise Java with the SpringSource Application Platform . Please challenge us as we challenge the status quo.