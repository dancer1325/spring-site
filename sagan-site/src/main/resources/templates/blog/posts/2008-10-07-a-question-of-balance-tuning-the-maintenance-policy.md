---
title: A Question of Balance: Tuning the Maintenance Policy
source: https://spring.io/blog/2008/10/07/a-question-of-balance-tuning-the-maintenance-policy
scraped: 2026-02-24T09:14:15.097Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  October 07, 2008 | 0 Comments
---

# A Question of Balance: Tuning the Maintenance Policy

_Engineering | Rod Johnson |  October 07, 2008 | 0 Comments_

Running a business is like writing code in at least one respect: You don't always get it right the first time, even if you know what you want to achieveâbut you *do* get a better result in the end if you are prepared to rework things when necessary. At SpringSource, we had a clear vision for our recently announced maintenance policy: balancing the needs of the open source community with those of enterprise users and the creators of Spring, for the benefit of all. However, we didn't get the balance quite right first time, and it's time for some refactoring.

Over the last couple of weeks, I've been reminded of the size of the Spring community and the passion of many within it.

We have been intently listening to community feedbackânot just from those who are most vocal in public forums, but through many channels including private conversations and emails.

As we listened to the community, two issues stood out: the availability of regular stable releases of the current version of Spring to the community (expressed through requests for tagging of source code in the Spring open source repositories, if binaries were not provided); and pricing for small business and small system integrators. We know that people feel great about Spring software and our commitment to improving enterprise Java; we know that they want SpringSource to succeed and continue to innovate. But we heard real concern and we took it on board.

Today I'd like to restate our commitment to the community for anyone who may have had any doubt, and explain how we're making a significant change to our maintenance policy in response to the feedback we've received.

## Our Open Source Commitment

Some have stated concerns that Spring would cease to be open source. The phrase “license change” kept being bandied aroundâdespite the fact that we were not changing the licenses of any Spring code. While such speculation was unfounded, it's still concerning.

Let me take this opportunity [once again](http://blog.springsource.com/2008/05/27/open-source-open-strategy-the-springsource-manifesto/) to guarantee that Spring will remain open source for the community, under the current (Apache) license. Period.

If you got any different impression than that, my colleagues and I must have done a poor job of communicating our maintenance policyâor, perhaps, you've heard inaccurate second-hand information. Everything SpringSource does rests on Spring being open source, and a positive engagement with the community. First, we would not make Spring closed source because it would be the wrong thing to do. Second, we understand that given Spring's central role to many, if not most, enterprise Java projects and to many other open source projects, and as a de facto standard programming model, the impact would hurt enterprise Java significantly. Third, it would be a stupid business decision.

Our commitment to open source remains as strong as ever and continues to grow. We look forward to working together with our community in the coming months and years to build more great software. We're excited about Spring Framework 3.0 and other forthcoming open source releases, and are proud that we are able to make a bigger and bigger investment in open source.

## Stable Community Releases

Our original maintenance policy stated that after 3 months, binary releases on each major version of Spring would be available only to [SpringSource Enterprise](http://www.springsource.com/products/enterprise) customers, although source code would always be available (but without version tags).

Thus, we only changed the distribution model beyond 3 months into a major release. We still kept all the source code under the present license. No license change.

However, some in the community expressed concern about the fact that after 3 months tags would not be available in the repository. They worried about the risk of an extended window between binary releases available to the community, when the absence of tags might make it hard to access bug fixes. Some were also concerned about the potential for confusion between different Spring distributions, making communication difficult among the Spring community.

We took these concerns very seriously, and the result of our reflection is that we want to go a step beyond what users were requesting, to demonstrate our commitment to our communityâprobably the most important community in enterprise Javaâand to ensure that it continues to grow rapidly.

We are amending our maintenance policy in the light of community feedback. We will make regular binary releases from the Spring trunk available to the community, with no 3 month window. For each version of Spring, community releases will be available while it remains the trunk or until the next version is stable.

Once we have published a release candidate for a new version of a project, we will typically not release further tags or binary builds of earlier versions of the project to the open source community. Such releases will be available for three years to SpringSource Enterprise customers.

A key goal of our maintenance policy is to focus our resources on driving Spring features forward vigorously and continuing to lead and innovate in enterprise Java open source. As we increase our development resources we aim to move forward more quickly than ever before, with frequent major releases bringing new features and capabilities to the community.

As an example, Spring 2.5.x remains the trunk, so under this policy amendment we will be releasing Spring 2.5.6 to the community very shortly. Spring 3.0M1 will be released shortly afterward and the trunk will be for 3.0 development. Once we release Spring 3.0 RC1 we will no longer provide tags or releases for the 2.5.x branch. We will focus on 3.0 development so that we can release 3.0 as soon as possible after the first milestone.

Our 3 year support policy (and SpringSource Enterprise) provides peace of mind to enterprise customers, who cannot or will not upgrade frequently. Focusing more of our community development effort on the latest features benefits open source users.

## Small Business Pricing

Due to the large enterprise focus of our commercial products, some small companies drew the impression that SpringSource didn't care about them or did not want to do business with them. This isn't the case--we had simply prioritized enterprise scale subscriptions. But I can see how people could have drawn that conclusion, and I apologize that our pricing structure created this impression.

We understand that small businesses are active in the adoption of open source and that they make an important contribution to technological advances overall. Thus, we will be introducing a new product offering that is designed and priced expressly for use in small businesses and small SIs. This blog isn't the place to describe a specific commercial offering, but we will be publishing information about a new product in the near future.

## A Fair Balance

It's clear that we could have done a better job of reaching out to our community to explain what we were doing and why it was necessary.

However, it is important to understand our intentions for having a maintenance policy. First, we've never had a maintenance policy and couldn't go on forever without making clear our commitment to the community and to our customers. As a company, we're trying to be open with our community, rather than do anything by stealth. Sometimes that involves communicating unwelcome facts that other companies might try to spin their way around. Second, this policy is intended to help us generate revenue from organizations that will not get closely involved with the community, cannot or will not regularly upgrade to the latest release helping to drive Spring quality, and instead find value in receiving maintenance releases on old versions. These types of organizations want rock solid stability, [world class support](http://www.springsource.com/products/enterprise/support) and value [the additional software](http://www.springsource.com/products/enterprise/performancesuite) provided by our Enterprise product suite.

We want to build a great company, which can pay its talented developers, earn a reasonable profit and can continue to grow our contribution of great open source software. The more successful we are, the more great code we can contribute to the Spring community. As we have grown over the past 2 years, our ability to generate open source code has grown even faster and the results speak volumes, with more Spring downloads in the last 12 months and more jobs demanding Spring expertise created than ever before.

Many organizations will find value in our Enterprise products, technical support and three years of regular maintenance releases. We also know that many users will decide not to buy these products and services. And that's OK. That's how it works in commercial open source. If we can continue to grow our investment in great software, everyone wins.

Here is the policy I *wish* we could implement:

> If you are an organization deriving tremendous value from Spring by using it in large production environments, please send SpringSource a check for 1% of the value you are receiving by using Spring. We will use this money to pay salaries, grow our investment in open source and return a profit.

It would be nice if such a policy would work in practice. It wouldn't, so we put our maintenance policy in place to generate revenue from organizations using Spring in production and who require enterprise-grade guarantees in their software stack. Meanwhile, by keeping the source open we are continuing to provide the community with great software. Policies, by their very nature, are not perfect, but we believe that the course we have taken is the best balance between the needs of the Spring open source community and the needs of the open source business behind Spring. And, we're glad that your feedback has helped us make it work better for the community.

## No More Telephone Game?

To those who made constructive comments on the forums or in email to me, I'd like to say a sincere thank you. Thank you for caring about Spring enough to think about these issues; thank you for taking the time to set down your thoughts and share them with me. Please keep it up!

Another lesson I would like to draw from this is to try to achieve a more direct communication between SpringSource and the Spring team and the Spring community. You may have played the party game called [Telephone Game](http://en.wikipedia.org/wiki/Chinese_whispers), and heard of the famous story about how the message from the field in the British army “Send reinforcements, we're going to advance” arrived at HQ after multiple transmissions as “Send three and fourpence, we're going to a dance.” Communication in message boards and the blogosphere is important, but not always reliable.

I'd welcome the opportunity to hear your thoughts on better ways to communicate. I'm open to suggestions such as IRC chat sessions, regular open phone conferencesâ¦ It's your community too, and I know you have good ideasâ¦