---
title: More nonsense about open source
source: https://spring.io/blog/2007/09/22/more-nonsense-about-open-source
scraped: 2026-02-24T09:24:51.363Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  September 22, 2007 | 0 Comments
---

# More nonsense about open source

_Engineering | Rod Johnson |  September 22, 2007 | 0 Comments_

In the aptly titled [Nonsense about Interface21](http://taose.blogspot.com/2007/09/nonsense-about-interface21.html), a SourceLabs employee disagrees with my contention that commit rights are necessary to provide credible open source support.

Before I reply: I want to make again something completely clear that I already stated in my last blog, but seems to have been misinterpreted by some: **Interface21 has no desire to prevent others making money from Spring**. Our track record proves that. We welcome others writing about Spring and providing Spring services. Or basing products on Spring, like [Matt Raible's](http://raibledesigns.com/rd/entry/interface21_on_open_source) AppFuse. We wish them success. Spring has partly gotten where it's gotten to through the richness of the ecosystem around it. As technologists and as a company we have always fostered that and we always will.

My point was a comment on one specific individual at one specific company claiming that open source is written by unpaid hobbyists and that economically rewarding the development of open source IP is irrelevant.

To the blog:

> Rod claims that dependable support requires committer access to the source code. This must come as a surprise to all the non-engineers employed by every other support company in the world. Someone has to do the sales and run the business and fix the servers and keep the website updated and find new customers, etc., etc. Committer access doesn't get you any of these, and who's going to tell me they're not required for a successful support company?

This certainly *is* nonsense. Let me paraphrase:

> Rod claims that dependable car repairs requires trained mechanics. This must come as a surprise to all the non-mechanics employed by every other garage in the world. Someone has to do the sales and run the business and fix the building and keep the website updated and find new customers, etc., etc. Mechanics don't get you any of these, and who's going to tell me they're not required for a successful garage?

Of course committers who can do third level support are only part of a support company--nobody said anything different. But as with the garage, if you don't have the people who can do the tricky stuff, everything else doesn't matter. For example: where I get my car serviced, the receptionist is efficient, friendly (and hot). That's great. There's a nice sofa, coffee and interesting reading material in the waiting area. But receptionist and physical environment are just a part of the machine that fundamentally guarantees to me that highly trained mechanics can fix my car, and have all the equipment to do so and access to all the required parts.

Take salespeople. If you don't have salespeople, you can't grow a software business. But if you have salespeople and nobody to provide true customer value, you don't have a sustainable business. (It's attractive from the short-term business point of view, though--thinking about our engineering budget of many millions of dollars a year, I can see the attraction in having a company that doesn't need to make that scale of investment.)

> Despite what Rod would have you believe, I (or anybody else) can offer top-quality Spring support thanks to the ASF license Spring uses. You don't need to be a Spring committer to fix bugs in it, and you don't need Interface21's permission or endorsement to use it. If there's a bug that impacts your production server, I can find it in the code myself, talk to the customer, and figure out what the best solution is: patch, workaround, client code change, etc. I can do that because I have access to the source code that matters -- the one the customer is using -- and because I understand, through careful and tedious preparation, what the customer needs.

Nonsense. I've already made set out the case around sustainability of business model. Let's consider things from a purely technical perspective. A few basic points about open source:

1.  Non-committers cannot guarantee anything going into the project code base.
2.  Commit rights are *earned*
3.  Commit rights represent a commitment
4.  Not all committers are equal. The commitment and earning continues forever.
5.  Getting something done *reliably and sustainably* requires depth.

Let's look in more detail.

1.  *Non-committers cannot guarantee anything going into the project code base.* This is self-evident. They can contribute patches, but have no guarantee that patches will be accepted. This can leave your customer with a patched solution that will need to be re-examined with the next release of the product, potentially holding the customer back from getting the full benefit of evolution of the software. Even if the bug report is correct and the patch does something useful, typically we see that the committers, who work with the software all day, choose a different and better route to make the fix. Same problem for the customer. The customer does not want to be using a forked version of the software.
2.  *Commit rights are earned.* Commit rights are earned through prolonged engagement with the community; demonstrated technical skill; submission of high quality patches; evidence of ongoing commitment; the desire not just to patch the occasional bug for financial gain but to contribute to the evolution of the product. Right now, for example, I would imagine that your VP Sales is going to read this exchange, worry about getting tough questions in sales situations and say "Can't we just get a Spring committer"? Which would not change the fact that you've had 2 years (or however long your company has been around) to show an interest in taking Spring forward, and have been content to let others do all the heavy lifting so long as you were trying to sit at the checkout.
3.  *Commit rights represent a commitment*. Committing to an open source project is like having a dog; once you choose to have a dog you can't get sick of it in 6 weeks and abandon it. Otherwise you are asking others to clean up after you.
4.  *Not all committers are equal.* A hierarchy of committer authorities evolves in every open source project. The lead may often rewrite commits from more junior committers; there is no guarantee that their changes will survive unchanged. Exactly the same will happen in any well-run software project.
5.  *Getting something done reliably and sustainably requires depth.* To provide mission critical 24x7 support you need multiple people who can fix the software and work as a team.

It's absurd to claim you can offer the same quality of support as the people who actually wrote the code. How quickly are you going to find the best way to fix a bug? Those guys spend all day working on it and did the initial design. Let's consider a concrete support issue. A SourceLabs employee goes as far as to [second the reporting of an issue by a Spring user](http://opensource.atlassian.com/projects/spring/browse/SPR-1688). The issue was resolved by Juergen Hoeller: the co-founder of Spring (and Interface21).

> You don't need to be a Spring committer to fix bugs in it, and you don't need Interface21's permission or endorsement to use it.

This is another of the several straw men in the post. Where did I say that you needed our permission or endorsement to use Spring?

Looking at your website, it appears that SourceLabs does contribute more to open source projects than OpenLogic (although certainly nothing to Spring). Which makes it surprising that you're disagreeing with my posts.

But again it comes back to my main point: even if this model of trying to cash in on support without making a deep commitment to a project can work at all (which it cannot dependably), *you are contributing zero to the project except when something goes wrong (and you have a paying customer).* You are contributing nothing to driving the software forward; you are reliant on others to do that so that you have something to monetize. You hope that those people will be naive enough to do it for free and you are totally punting on the need to push projects forward vigorously to innovate and meet the changing needs of their user base. Again, it's nice if other people do that.

> Good support means that you have a personal relationship with your customer. You know what they need, what other software they're using, what they're most concerned about, and you establish a bond of trust with them that you will be there for them. That goes way beyond giving them a pager number and saying, "Call me if it breaks".

Obviously. All these things are important, and are part of a complete picture. This is irrelevant to the present discussion, as no one said otherwise. Our customers give us rave reviews for all our services: support, training and consulting.

> No one at Interface21 can seriously claim to be actively engaged with the other pieces of a full Java enterprise stack; Spring, for all its awesomeness, is a framework, not a stack. It doesn't provide everything an enterprise customer needs, and supporting only Spring is not going to cut it with companies who also need help with Hibernate or Struts. In fact, Rod has to say that if you do need help with the other parts of your Java solution, Interface21 can't help you since they don't control the source code of those projects.

What Interface21 does is be honest with customers about what it does and does not provide, where it can provide rock-solid support and where it cannot. I should also note that we have a depth of technical talent that is unrivalled in enterprise Java (take a look at our people page), and are involved in an increasing number of projects *at a deep level*. AFAICT from your web site SourceLabs has made a significant contribution only to Apache Commons: hardly the core of the enterprise, and through only one person. So essentially you're complaining about the fact that I'm being very modest in my claims.

> I hope Interface21 isn't just afraid of a little competition from companies who understand that doing support right is much more complex than having an SVN account.

We have many happy customers, we're having a record quarter for support sales, and have a very strong pipeline of enterprise deals, so we're hardly afraid of competition. My previous blog explained why we really can do support right, with a follow-the sun model. AFAIK Interface21 is several times larger than SourceLabs, and growing much faster, so you're hardly in a position to patronize us. Oh, and given that you personally can do first-class Spring support, I thought you would have known that the Spring Framework repository is CVS, not SVN.

> Sure, Rod. You want to sell support for Spring, be my guest. Play up every advantage you can in the market, but it is a market. If you want to argue that control over committers makes you the best support option, go ahead, but as I said above, it's a pretty weak argument.

Of course it's a market. I never said otherwise. I was merely explaining why our Spring support is unrivalled.

*You want to sell support for Spring, be my guest.* As the founder and co-lead of Spring, I appreciate your permission. That's very generous.

But that was incidental to my main point, which was that to support open source credibly in a way that is sustainable enough to ensure the production of enterprise grade open source for the long haul, you can't just try to cash in on support revenue: you have to put a lot of effort and investment in.

I think everyone's position has been stated repeatedly at this point, and don't see much value in prolonging the discussion.

I welcome folk making money around Spring or anything else. I just think that any business should be open about the scope and quality of what it can offer.