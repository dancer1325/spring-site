---
title: Pivotal Cloud Foundry is 5 years old, here’s how it changed my life...
source: https://spring.io/blog/2019/05/21/pivotal-cloud-foundry-is-5-years-old-here-s-how-it-changed-my-life
scraped: 2026-02-23T14:47:01.819Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  May 21, 2019 | 0 Comments
---

# Pivotal Cloud Foundry is 5 years old, here’s how it changed my life...

_Engineering | Ben Wilcock |  May 21, 2019 | 0 Comments_

[Josh Long](https://twitter.com/starbuxman) often says that “production is the best place on the Internet.” But where I used to work, developers needed to negotiate with operations, networks, and security before their code could go anywhere near this promised land.

Understandably, each of these disciplines seemed to have the same hidden agenda: change is bad. Experience had taught us that change was difficult and error-prone, so as a company we’d become risk-averse and cautious about our deployments. Releases were infrequent and large. There was plenty that could go wrong.

In spite of this, every six months or so developers would bundle up their code changes into a release, write the release notes, create a rollback plan, and wait around until midnight on a Saturday to deploy it. The deployment would be done manually, and not by developers, but by someone in operations. Developers were strictly passengers on this particular release-train (after all, we’re “the people who write all the bugs” as my friend [Coté](https://twitter.com/cote) would jokingly say).

So if production really is “the best place on the Internet”, I could only go there by proxy, at 3:00 AM on a Sunday, and only if I’d charmed my way past the “Change Authorization Board” first.

The whole process was unrewarding and depressing. It was so difficult that I almost quit because of it. There were simply too many barriers in the way of progress. Delivering code wasn’t a rewarding experience for anyone. You certainly couldn't ‘experiment’ with exciting new ideas or technologies. The deployments were too big. The feedback loops were too long and the risks were too great.

### [](#but-then-something-amazing-happened)But then something amazing happened...

In November 2013 Pivotal Cloud Foundry came along and changed everything. By incorporating hundreds of DevOps best practices into an easy to consume package. [Pivotal Web Services (PWS)](https://run.pivotal.io) could package, deploy, and run our code effortlessly with a few simple command line instructions. We could go from desktop to production with our software in minutes, and as often as we liked.

Developers loved it. Operators loved it. Security and Networks loved it. Best of all, our customers loved it! They couldn’t get enough of it in fact, but that’s another story. Just look how ***fast*** it is!!! You can have apps up and running in under 2 minutes:

> What you're observing here is a simple Spring Boot application that is being 'pushed' to Cloud Foundry with `cf push`. This process uses the `Java Buildpack` - open source code that configures my application (and OpenJDK) for cloud running and then builds and starts a container image containing both. Finally, it configures an internet URL and we're good to go!

Gone was the need to obtain permission before a deployment rolled out. Everything the Change Authorization Board wanted in order to keep us safe was already baked into the platform. Developers could work directly with the business, add some value daily, and use an automated pipeline to push it to the cloud. Because we now got instant feedback, innovation and experimentation became easy, safe and encouraged. Epic win!

It was the same story with backing services. Databases, messaging, monitoring, you name it, could all be created and attached with a few simple command-line instructions. Spring Boot even auto-wired them for you. No more waiting for your “new database request” ticket to shuffle it’s way up to the top of the database administrators todo list. Developers could commission their own services as and when required.

In the 5 short years that it’s been around, Pivotal Cloud Foundry has completely changed my life. It’s elevated me from the toil of release-trains and allowed developers like me to release code into the hands of users quicker, safer, and more often than ever before.

So if production really is “better than Disneyland, ([Josh Long](https://twitter.com/starbuxman), 2018)” thanks to Pivotal Cloud Foundry, I have a first-class season ticket!

---

You can try Pivotal Web Services (a 'pay-as-you-go' version of Pivotal Cloud Foundry) for yourself with this [simple step by step tutorial](https://pivotal.io/platform/pcf-tutorials/getting-started-with-pivotal-cloud-foundry/introduction). You don’t need a credit card to sign up for [Pivotal Web Services](https://run.pivotal.io) and new users get $87 of free credit. It’s super easy to push your code and very, very rewarding! You can have something up and running in a couple of minutes.

Pivotal Web Services is based on [Pivotal Cloud Foundry PAS](https://pivotal.io/pas) which allows enterprises to get the same smooth developer workflow on the cloud of their choice.