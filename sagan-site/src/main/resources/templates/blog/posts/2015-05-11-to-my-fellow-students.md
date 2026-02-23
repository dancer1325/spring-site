---
title: To My Fellow Students:
source: https://spring.io/blog/2015/05/11/to-my-fellow-students
scraped: 2026-02-23T21:02:55.106Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 11, 2015 | 3 Comments
---

# To My Fellow Students:

_Engineering | Josh Long |  May 11, 2015 | 3 Comments_

"You are always a student, never a master. You have to keep moving forward." -Conrad Hall

"The empires of the future are the empires of the mind." -Winston Churchill

"You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose." -Dr. Seuss

"Good students are good at all things." -Marissa Mayer

"The person who never made a mistake never tried anything new." -Albert Einstein

*Warning*: if you're a seasoned developer, than this may not be the post you're looking for. Keep reading, anyway. I'll bet you know some developers who are taking their first steps and, maybe, this could help them!

Hi!. [I'm Josh (@starbuxman)](http://twitter.com/starbuxman). I work as [the Spring developer advocate](http://spring.io/team/jlong) at Pivotal and I, like the rest of the team, spend a lot of time talking to a *lot* of really amazing people. We talk to all manner of developers: conference attendees, customers, students, C-levels and interns alike. I personally have made friends on every continent (save Antarctica! One day..) and interacted - online or sometimes in-person - with developers in every timezone. While I enjoy every selfie, hand-shake, discussion, forum thread, Twitter conversation, and email thread, the exchanges that really stick with me are the ones from students. They're often finding their way not just with Spring, but with Java in general and programming at large. They (foolishly!!) assume I have a clue. Those conversations weigh heavily on me. It's very important to not send them off in the wrong direction, if possible. This post is an attempt to capture a lot of these discussions.

## [](#a-journey-of-a-thousand-miles)A Journey of a Thousand Miles..

Sometimes students ask about how to get started. I don't even know where to begin. Get started in.. *what*? Sometimes I talk to young people trying to start programming. As often as not, these are people who I get introduced to by their parents. These young people know there's a prize - for the inspired it's a life filled with passion and new peaks to summit - waiting for those who make the journey, but they don't know how to take the first steps.

Most of the people I've talked to started building applications to see something ..dance. In my generation, many of us started with Basic games, and later a lot of developers started with something related to HTML and JavaScript, or even Flash. My first steps in Java were, after all, with Applets! These days, I see a lot of young people taking their first steps with Android or iOS or, even more recently, with Arduino and Minecraft mods. It's encouraging to be able to make something dance. Visual feedback is satisfying, it's encouraging. Put another way, I don't know any young, aspiring programmers who just can't stop thinking about CRON jobs!

There are many outlets for young people to get started with programming. Some of my favorites are Devoxx4Kids, Code.org (*the Hour of Code*) and Coder Dojo.

[Devoxx4Kids](http://www.devoxx4kids.org/) is a non-profit organization that was spun out of the Devoxx conferences and has chapters and events world-wide (though more are *always* welcome!). Devoxx4Kids connects qualified adult volunteers, a large and growing set of fun exercises, labs and technologies, and kids to run events worldwide aimed at inspiring young people (teenagers) to take their first steps with people there to help them.

[Code.org](http://code.org) is a similar movement that has garnered the attention and endorsements of modern-day celebrities like Microsoft founder Bill Gates, Facebook founder Mark Zuckerberg, US president Bill Clinton, and musician Will.i.am to encourage young people to get involved in code. There are educational resources and - every year - the community stages an hour of code event worldwide to encourage young people to write their first lines of code. In 2014, US president Obama participated and wrote his first lines of code in JavaScript! Like Devoxx4Kids, the *Hour of Code* movement sees thousands of events and workshops spring up world-wide where young people can go and get help taking their first steps programming.

[Coder Dojo](https://coderdojo.com/) is a global network of free programming clubs for young people.

[Khan Academy](https://www.khanacademy.org/) has numerous online learning resources for all manner of subjects, not just computer science. There *Computer Programing* section is expansive, though.

## [](#whats-beyond-the-horizon)What's Beyond the Horizon

Sometimes I talk to students further down the road, at university perhaps, starting to understand what it means to *program* a computer, and now eager to apply their newfound power. For them, it's not about making the conceptual leap into programming, it's about taking the next steps and applying it to some problem space.

I'm going to *attempt* to lay out the universe of technology as I see it these days and explain what each discipline is. This list isn't even close to exhaustive. It's important to understand that disciplines are not exclusive. Many developers straddle many disciplines and mix-and-match as required. This is the ideal. Program *all* the things! Specialization is for insects! Be the *Renaissance programmer* the world needs.

This list couldn't possibly be exhaustive and I'm happy to have any additions in the comments.

I will also try to link to relevant introductory material and popular technologies in this space. My perspective is of course my own. There are no doubt other resources out there, but I'm going with what I know works.

**Web Programming**: This, I think, is the most natural place to start for developers today because *everything* is connected to the web. Web programming refers to both the job of creating HTTP-based web applications (like Amazon.com) with pages, forms, etc., and to creating APIs. Humans talk to web applications (usually from a browser) and machines talk to APIs. Today, the most popular way to create APIs is to use REST. Web programming *also* refers to the work of *consuming* other web services, as you might act as a client to the Facebook API, for example. When people talk about web-development, they're usually talking about things like [REST web-services](http://spring.io/guides/gs/rest-service/), [web security](http://spring.io/guides/gs/securing-web/), [OAuth](http://spring.io/guides/tutorials/spring-security-and-angular-js/), [web testing](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/testing.html), JavaScript, CSS, and APIs.

**Front-End & (Rich or Mobile) Client Development**: For every web application out there, there are an increasing number of screens from which to consume it: Android-based devices, Apple iOS devices, video game consoles, TVs, cars, desktop and mobile browsers, etc. When we talk about front end development that usually, at least, refers to building [browser-based JavaScript](http://spring.io/guides/tutorials/spring-security-and-angular-js/) and HTML5 applications as well as mobile applications (typically [Android](http://spring.io/guides/gs/consuming-rest-android/) and [iOS](http://spring.io/guides/gs/consuming-rest-ios)).

**SQL Data Processing**: A diminishing, but still non-trivial, amount of application data is stored in relational databases (RDBMSes) like MySQL and PostgreSQL. These databases use a query language called SQL. You'll find there are myriad technologies to talk to these databases. In the JVM space, one typically uses [JDBC](http://spring.io/guides/gs/relational-data-access/) and [JPA](http://spring.io/guides/gs/accessing-data-jpa/).

**NoSQL Data Processing**: RDBMSes may be the entrenched technology, but it's by no means the only way of storing data. Often, application data has specialized storage requirements. Maybe the data is better described not in a set [of loosely connected tables](http://spring.io/guides/gs/accessing-data-jpa/), but [as a graph of nodes](http://spring.io/guides/gs/accessing-data-neo4j/), or as a series [of less rigid *documents*](http://spring.io/guides/gs/accessing-data-mongodb/), or perhaps the use cases require the ability to [do full text searches on the data](https://github.com/spring-projects/spring-data-elasticsearch). In any case, you'll end up using a so-called [*Not-only-SQL* or a No-SQL](http://en.wikipedia.org/wiki/NoSQL) solution for these sorts of requirements.

**Big-Data Processing**: while RDBMSes may be ubiquitous, and NoSQL may be more efficient or natural for certain types of data, some data sets require specialized processing techniques simply because there is *so much* of it. This category of processing is called big-data. There is often overlap between NoSQL and big-data. When we talk about big-data processing, most people think of technologies like [Apache Hadoop](http://projects.spring.io/spring-hadoop/), [YARN](http://spring.io/guides/gs/yarn-batch-processing/), [Apache Kafka](https://spring.io/blog/2015/04/15/using-apache-kafka-for-integration-and-data-processing-pipelines-with-spring) and stream-processing solutions [like Spring XD](http://spring.io/guides/gs/spring-xd/).

**Embedded Development**: This space is huge, and - I confess - I know very little about it. Today, in 2015, Java and C are very, very popular programming languages. C is 40+ years old, though! It continues to be so popular because it can run in *very* tiny computing environments, like watches, alarm clocks, refrigerators, cars, etc. When people talk about embedded development, they may be talking about using Linux, C, and custom microprocessors to build solutions for low-memory footprint devices. My theory is that this domain will decline in popularity over time as even the smaller things in our lives (cars, mobile phones), now have power enough to run more recent programming languages like Java, JavaScript, Groovy, etc.

**Cloud Computing**: in 2007, Amazon.com (yes, the book reseller) announced that it was going to make it possible to *rent* computers from them by the hour, *on-demand*. No human intervention was required, just APIs. It thus became possible to build software that could accommodate so many requests from users and - if demand grew - to dynamically *add* more computers and install new software! Since then, the world's changed dramatically, and when we talk about cloud computing today we're talking about how to build applications that are *elastic* - they can shrink and grow by adding capacity, dynamically. Imagine for example a website (like Amazon.com!) that has requires many, many more computers during big holidays like Christmas, because vastly more people are buying things. Historically, adding computer capacity meant somebody had to buy new machines, go to the data center and install new machines and operating systems, connect them to the network, etc., etc. Today developers use a layers of software on top of the raw-metal hardware to treat the hardware as a giant pool of resources. For developers and operators to be able to move as quickly as possible to business demand, they need the ability to elastically deploy, manage and scale applications. a Platform-as-a-Service lets you do this. When people talk about cloud computing today, they're probably talking about lower level infrastructure technologies like Amazon Web Services and Docker, and higher-level Platforms-as-a-Service like Heroku, and Pivotal's open-source [Cloud Foundry](http://spring.io/guides/gs/sts-cloud-foundry-deployment/). Cloud Foundry is a the whole layer above the infrastructure. Newer versions of Cloud Foundry support runing containerized workloads. One popular container is the aforementioned Docker. If you want to get a taste for what it's like to build, manage and scale containerized workloads on your local desktop machine, check out [Lattice](http://lattice.cf/docs/getting-started/).

**Application Integration**: as we move forward in time, there's an increasing number of applications and services that have been developed without knowledge of each other. The work of making two otherwise ignorant applications share data and services is called *application integration*. There are different ways to handle this chore, but the work typically involves reading, adapting, and writing data between systems. For this one might use enterprise application integration and message-driven architectures, or batch-processing. When we talk about application integration, we're typically talking about technologies like Rendez-Vous, [JMS](http://spring.io/guides/gs/messaging-jms/), MQ Series, [RabbitMQ](http://spring.io/guides/gs/messaging-rabbitmq/), and [Spring Integration](http://spring.io/guides/gs/integration).

**Internet of Things**: this is related to embedded development. It's the idea that most devices today can or already do have an IP addresses. They're networked. Examples include alarm clocks, coffee makers, home security systems, and refrigerators. Typically they generate a lot of data (as you might expect 24/7 consumer devices to do) and so it becomes important to use [lightweight protocols like MQTT](http://docs.spring.io/spring-integration/reference/html/mqtt.html) to manage the traffic.

It's important to understand that these things blend into each other. If you care about scaling application availability with cloud-computing, you'll probably also care about APIs and you'll probably also care about big-data and NoSQL. If you care about APIs, you'll probably also care about how to connect those APIs to client technologies like Android. I've made these distinctions so you can start.. somewhere! Pick a vertical, for now, but always dare to venture beyond. You'll be rewarded for your curiosity.

## [](#always-be-learning)Always Be Learning!

The best engineers start their day under the assumption that they're going to learn something before they get home. If your projects at work are monotonous, then get new projects.

Keep apprised of the latest and greatest news, if you can. There is no end to available resources to read the latest software releases, and watch interesting new published tech talks.

Here are some resources I check everyday before I start working, typically over coffee and lunch:

[InfoQ](http://infoq.com) is an online tech portal with news on all manner of subjects and technology verticals.

[Reddit](http://reddit.com) is an amazing place to find all sorts of news, not just on technology. I keep a few different *sub-Reddits* bookmarked: [programming](http://reddit.com/r/programming), [Java](http://reddit.com/r/java) for technology. I keep a few others for decidedly *non* technical content, too! :D

[Hacker News](http://hackernews.ycombinator.com) is another (moderated) link aggregator. It typicall provides some pretty deep stuff. I like it as a way of keeping an eye on the *edge* of technology.

[DZone](http://dzone.com) can be nice if you don't mind sifting through the noise to find interesting posts. It's a link aggregator, like Reddit.

[the Virtual JUG](http://virtualjug.com) is an online *virtual* Java User Group that's aired live over YouTube and features experts from around the Java community on a regular basis. Recordings of the talks are available on YouTube afterwards.

[GitHub](http://github.com/) is an online community for developers to collaborate on code. It builds on the `git` source-control and revision system, but integrates issue tracking, collaboration tools, documentation, and much more. It is *by-far* the largest community of developers and - my favorite part - there are *tons* of great (and some not so great!) open-source code examples on there that you can search for and peruse. Want to get good at programming? Fix some bugs and work on a team. We call that *scratching your own itch*. It'll improve your skills, give you valuable experience working with often very-skilled developers, and - if you make any kind of contributions to a project with users - you might possibly make somebody else's day better. Win-win!

[StackOverflow.com](http://stackoverflow.com) is an question-and-answer forum. Have a question on programing? Chances are someone else already had the same one. Search and behold. Or, if you can't find the right result, ask away. As you start to have the answers, give back by answering other people's questions.

[the Spring Blog](http://spring.io/blog) If you'll permit me one more plug, we *do* publish a lot of blogs on a crazy diverse set of topics, so I hope you'll check this blog out as well ;-)

## [](#you-mention-java-a-lot)You Mention Java a Lot..

I work with the Java language, which runs on top of the Java Virtual Machine. Java is a boring little language, I think, for the better. It lends itself to novices who want to start building things, and not struggling with the syntax. It helps the experienced too because it's fairly consistent to read. I, personally, quite like Java. It's expressive enough while still being easy enough to pickup and read. Whether you like Java the language or not, however, everybody agrees that the JVM (as a platform) is second-to-none. Virtually all the big-web giants (Twitter, Netflix, Google, eBay, Amazon.com, Yahoo!, etc) use the JVM in a majority capacity. The JVM is battle tested and well established. T

here are always alternatives, of course, but it should not be surprising that getting started in big-data, NoSQL, cloud-computing, mobile development, web APIs and more all require some proficiency of the JVM. If you don't like the Java language (though, you should try Java 8! You might like it..), there are *plenty* of mature alternatives like [Groovy](http://www.groovy-lang.org/), Scala, Clojure (Lisp on the JVM), [JRuby](http://jruby.org) (Ruby on the JVM), Jython (Python on the JVM), Kotlin, and Ceylon, all of which run on the JVM. That's right - you get the most powerful language runtime in the world, in the language flavor of your choice.

## [](#next-steps)Next Steps

This whole blog has been about next steps. Congratulations on taking the first steps! You'll make a lot of friends, solve a lot of interesting problems, and have a lot of fun if you put your mind to it.