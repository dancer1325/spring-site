---
title: Spring Roo
source: https://spring.io/blog/2011/09/12/spring-roo
scraped: 2026-02-24T08:34:53.456Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Chloe Jackson |  September 12, 2011 | 0 Comments
---

# Spring Roo

_Releases | Chloe Jackson |  September 12, 2011 | 0 Comments_

### Instant Results - Making Java Fun

Spring Roo is a lightweight developer tool that makes it fast and easy to deliver instant results. Best of all, you code 100% in Java and get to reuse all your existing Java knowledge, skills and experience. You'll like it - and have plenty of fun too! Read how **[TomTom cut development time in half](http://www.springsource.org/node/3001)** using Spring Roo.

Download the book by Josh Long and Steve Mayzak called [Getting Started with Roo](http://spring-roo-repository.springsource.org/Getting_Started_with_Roo.pdf). You can also purchase it as a print-on-demand book or in alternative formats from the [O'Reilly](http://oreilly.com/catalog/0636920020981) web site.

Ken Rimple and Srini Penchikala have also written the definitive Roo reference book called [Spring Roo in Action](http://www.manning.com/rimple/) available for purchase from [Manning Publications](http://www.manning.com/).

### Exciting Features - GWT. Solr. Cloud. Flex...

MVC applications with JPA are a breeze with Roo, but it also eases your journey into the next generation of technology. We already support cool features like Google Web Toolkit (GWT) for advanced next-generation user interfaces, Solr for search server integration and cloud deployment like Google App Engine. Plus we have incremental database introspection, Flex, Spring Integration and much more actively in development.

SpringSource and Google are working together to combine the speed of development of Spring Roo with the power of the Google Web Toolkit (GWT) to build rich browser apps. Try out the exciting GWT and Google App Engine support now available from Spring Roo 1.1.

### Zero Risks - Productivity Without Compromise

With Roo you still program everything in Java. Its innovative approach operates entirely at compile-time and is completely compatible with your IDE. Plus because there's no runtime portion, adoption is also simplified and low risk. All your Java developers will feel comfortable and be productive from day one. Roo really represents productivity without compromise.

  

---

## Why Spring Roo?

Spring Roo is a next-generation rapid application development tool for Java developers. With Roo you can easily build full Java applications in minutes. It differs from other productivity tools by focusing on:

-   [Rapid results](#try)
-   100% [develop in Java](#how_it_works)
-   Easy-to-use
-   Fast and simple to remove
-   Totally [compromise free](#no_compromises)

-   Active, helpful [community](#talk)
-   Comprehensive [technology integrations](#integrations)
-   Extension points via Roo add-ons
-   [SpringSource](http://www.springsource.com/about/about-us)\-certified architecture

### Technology Integrations

Roo gives you easy and immediate access to all of the mainstream Java technologies important to building sophisticated enterprise applications. Here's just some of the technologies that Roo-based projects can instantly leverage (plus there's plenty more supported by third-party add-ons, or you can write your own add-on):

-   Adobe Flex
-   Apache ActiveMQ
-   Apache Maven
-   Apache OpenJPA
-   Apache Tiles
-   Apache Tomcat
-   AspectJ
-   AspectJ Development Tools
-   Cloud computing
-   Dojo Toolkit
-   Eclipse IDE
-   EclipseLink
-   Google Web Toolkit
-   Google App Engine
-   Hibernate

-   Java 5+
-   Java Bean Validation
-   Java Database Connectivity
-   Java Message Service
-   Java Persistence API
-   Java Transaction API
-   Java Server Pages
-   Jetty
-   JUnit
-   Log4J
-   Representational State Transfer (REST)
-   Selenium

-   OSGi add-ons
-   Solr search
-   SpringSource tc Server with Insight
-   SpringSource Tool Suite
-   Spring Integration
-   Spring Framework
-   Spring Security
-   Spring Web Flow
-   URL Rewrite Filter
-   Web application resource (WAR) packaging
-   Write Your Own Add-Ons

### Productivity Without Compromise

Roo's [innovative approach](#how_it_works) is free of any compromises:

-   Program in Java!
-   Full IDE support (with features like code assist, refactoring and debugging)
-   No runtime portion, which means easier adoption in enterprise with approval requirements
-   Excellent runtime performance, as there's no runtime memory usage, deployment footprint, control flow invocation time etc
-   Lower risk of bugs impacting your project, as Roo operates entirely at development time (just like your IDE)
-   No lock-in to Roo, as you can remove it from your project in just minutes
-   Easy extensibility to new features thanks to OSGi-based add-on extensibility
-   We could go on, but you get the point: Roo doesn't make you compromise (ever) :-)

### How It Works

In a nutshell, Roo is a lightweight console shell that you load up while developing your projects. While the Roo shell can be used to complete time-consuming operations in just one quick command, most of the time you'll just ignore Roo and go off and develop your project in your IDE or text editor.

As you go about editing code in your normal way, Roo keeps an eye on your project files and automatically modifies them in response to your actions. Depending on the Roo add-ons you have running, Roo can help you with different types of files. For example, Roo's JPA add-on means you can write an incredibly simple Hello.java file that looks like this:

@RooJpaActiveRecord public class Hello {
private String world;
}

You might wondering what good is a Java class that only has a single private field. Well, not much. But Roo fixes that by using the compiler's "mixins" feature to add extra goodies into the .class files at compile-time (not runtime). This means the Hello.class actually contains a large number of useful members, none of which you had to go to the trouble of writing - or maintaining, debugging and testing - yourself:

public class Hello {
private String world {..}
public String getWorld() {..}
public void setWorld(String world) {..}
public Long getId() {..}
public void setId(Long id) {..}
public Integer getVersion() {..}
public void setVersion(Integer version) {..}
public String toString() {..}
public void persist() {..}
public void remove() {..}
public void flush() {..}
public static Long countHellos() {..}
public static Hello findHello(Long id) {..}
public static List findAllHellos() {..}
public static List findHelloEntries(int start, int finish) {..} // there are even more methods
}

What's neat about the Roo approach is your Hello.java is free of all that noise and effort, yet your Hello.class is extremely useful and totally compatible with your IDE (code assist, debugging etc) and runtime environment (no Roo dependencies or other compromises). Plus because it's just a plain Java class, it also performs brilliantly at runtime and doesn't consume extra memory at runtime. Roo is totally round-trip aware and will maintain the mixins as you develop your entity. For example, if you add another field Roo will instantly produce the getter/setter and update the toString() method. If you add an @Id field, Roo will stop producing its identifier field and yours will take priority. If you write a toString() method yourself, yours will of course be used and the Roo one will disappear. In fact if you comment out your toString() method, Roo's will instantly return. It's all incredibly easy (and fun as well!).

More subtle factors not immediately obvious above are that the @Roo\* annotations are "source retention". That means they don't appear in the .class file, reflecting Roo's "zero lock-in" and "no runtime" policy. Plus you can easily get rid of Roo by copying the contents of its generated mixin source code straight into your .java files. In fact there's even a refactoring command in Eclipse that will complete this for you in just a few seconds! Oh, and if you didn't want to write the Hello.java source file, you could have just used two Roo TAB-aware commands to do it: "entity --class Hello", "field String world". Like we said, it's all incredibly easy (and fun as well!).

Roo's approach delivers you the best of lock-in free, high-performance productivity tooling. It just works. [Try it](#try) and see for yourself. Or [head over to our reference guide](http://static.springsource.org/spring-roo/reference/html/index.html target=) to learn more about why you'd choose Roo as your productivity tool.

  

---

## Try Spring Roo

It's very easy to get started with Roo. Just follow the steps on this page and you'll have a running environment in minutes.

### Download

Roo requires you to download and install:

-    [Java 6 JDK](http://java.sun.com/javase/downloads/index.jsp)
-    [Apache Maven](http://maven.apache.org/download.html)

To obtain Roo, you can either download its standalone command-line shell version or use the version built into SpringSource Tool Suite. You can also download both and use them together if you prefer:

-    [Spring Roo](http://www.springsource.com/download/community?project=Spring%20Roo)
-    [SpringSource Tool Suite](http://www.springsource.com/products/sts)

### Install

If you downloaded the standalone Spring Roo, simply unzip it to a location of your choice. Then:

-   Windows users: add %ROO\_HOME%\\bin to your path
-   \*nix users: create a symbolic link to $ROO\_HOME/bin/roo.sh (eg sudo ln -s ~/spring-roo-1.x.x/bin/roo.sh /usr/bin/roo)

### Watch Video

If you'd like to watch how easy it is to use Roo once you've installed it, [this video](http://s3.springsource.com/MRKT/roo/2010-01-Five_Minutes_Roo.mov) will show you how. Alternately, complete the steps below and try it for yourself.

### First Project - Roo Standalone

Let's build a project. We'll omit the console output in the steps below. We also strongly recommend you type "hint" after each step to help learn to use the shell. Please note you need Roo 1.2.0 or above to execute these commands:

mkdir hello
cd hello
roo
roo> hint
roo> project --topLevelPackage com.foo
roo> jpa setup --provider HIBERNATE --database HYPERSONIC\_IN\_MEMORY  
roo> entity jpa --class ~.Timer --testAutomatically
roo> field string --fieldName message --notNull
roo> hint web mvc
roo> web mvc setup
roo> web mvc all --package ~.web
roo> selenium test --controller ~.web.TimerController
roo> web gwt setup
roo> web gwt all --proxyPackage ~.client.proxy --requestPackage ~.client.request  
roo> perform tests
roo> quit

Wow! You've now got a webapp complete with JUnit tests, Selenium tests, a MVC front-end, a Google Web Toolkit frontend. Just use “mvn gwt:run” to play with the GWT client, or use “mvn tomcat:run” to start the Tomcat MVC front-end and view with http://localhost:8080/foo/timers.

Next up you probably want to type "mvn eclipse:eclipse" and then use Eclipse's "General > Import Existing Project into Workspace" feature. Leave the Roo shell running and feel free to edit in Eclipse. You'll see Roo maintains your files while its running. If you change anything without Roo running, don't worry - just load Roo up and it will catch up on anything you've changed.

### First Project – via STS

If you installed SpringSource Tool Suite, just use File > New > Roo Project. Then enter a "project name" of "Foo" and a "package" of "com.foo". Once you click "Next" and "Finish", you'll see the Roo shell load up at the bottom of STS. Then enter the same commands as we saw in the "First Project (Roo standalone)" section and you can run the application easily via WTP.

### Next Steps

We have a [detailed reference guide](http://static.springsource.org/spring-roo/reference/html/index.html) to help you get started. The following sections are likely of assistance:

-   Installation
-   First Steps
-   Roo's Samples
-   Suggested Steps
-   Detailed Tutorial

  

---

## Learn Spring Roo

### Getting Started

We've made it easy to learn Roo. There are many resources available to assist you learn Roo either at your leisure or with some help.

Before you continue, we recommend you read the [getting started](http://www.springsource.org/roo/start) page and follow the first steps there. Here you'll learn how to install Roo and create your first project. There are also links to important sections of the reference guide to help you get started.

### Reference Guide

We have over 100 pages of Roo [reference documentation](/roo/guide) included in the Roo download to assist you. There are four main sections of the guide: Welcome to Roo, Base Add-Ons, Interals and Add-On Development, and Appendicies. This is the best resource to start with once you've finished the [getting started](http://www.springsource.org/roo/start) page.

### Community Resources

Visit the [community page](http://www.springsource.org/roo/community) to learn about the numerous ways you can connect with the wider Roo community. This is not only a great way to learn about Roo, but it's also a lot of fun and very friendly.

### Videos and Presentations

A large number of videos and downloadable presentations about Spring Roo are available via the [Project Links](http://forum.springsource.org/showthread.php?t=71985) Page. If you would like to present on Roo, also feel free to [contact](http://forum.springsource.org/forumdisplay.php?f=67) the Spring Roo project engineers and we'll be happy to provide the latest available slides and roadmap information to further assist you.

### Books

Manning have published a "Roo In Action" book. Visit [http://www.manning.com/rimple](http://manning.com/rimple) or follow [@RooInAction](http://twitter.com/RooInAction) for the latest updates.

Packt Publishing have published [Spring Roo 1.1 Cookbook](http://www.packtpub.com/spring-roo-1-1-cookbook/book) by Ashish Sarin.

O'Reilly have published [Getting Started with Roo](http://oreilly.com/catalog/0636920020981). You can also download the [open-source version of the book](http://spring-roo-repository.springsource.org/Getting_Started_with_Roo.pdf). This book is more a succinct introduction than a reference text.

### Training

SpringSource (a division of VMware) offer comprehensive on-site and public [training courses](http://www.springsource.com/training) covering the Spring platform, including Roo. If you're looking for a detailed custom course on Roo, SpringSource can also assist you.

### Professional Services

SpringSource is also available for short-duration [professional services](http://www.springsource.com/support/professional-services). Common services include design reviews, architectural advice and mentoring services.

### Support Subscriptions

Comprehensive developer and production [support subscriptions](http://www.springsource.com/services/enterprisesupport) are available from SpringSource. These include SLA-backed 24 x 7 x 365 options for mission-critical environments.

  

---

## Talk Spring Roo

### Spring Roo Community

The Roo community consists of thousands of people who are using Roo, ranging from beginning Java developers to JavaOne rockstars - and everyone in between! The Roo community is inclusive, friendly and warmly welcomes your participation. We will not only help you learn Roo, but we're also happy to assist you with usage tips, roadmap information and architectural advice. The ways to participate in the Roo community are detailed on this page. We look forward to hearing from you!

### Twitter

Follow [@SpringRoo](http://twitter.com/SpringRoo) for the latest official news and release announcements. If you're interested in the development progress of Roo and other interesting updates, we also encourage you to follow the [Roo project team engineers](http://twitter.com/SpringRoo/roo-team/members).

If you Tweet about Roo, please include #SpringRoo in the message (please do not use #roo or similar). This will help others find your Tweet, and it will be found by the Twitter gadgets on this page and our home page. Please let us (and others!) know what you think of Roo in this easy and fast way.

### Community Forum

The Roo [community forum](http://forum.springsource.org/forumdisplay.php?f=67) is the main way to communicate with other members of the community about getting started with Roo, usage advice, architectural help, roadmap information and possible bugs. You'll also find it an easy way to reach the Roo core project engineers, all of whom are active on the community forum and are happy to discuss roadmaps and detailed Roo internals with you.

### Spread The Word

If you like Roo, let others know about it! The easiest way is to simply Tweet with @SpringRoo, but other approaches can include internal company presentations, user group talks, conference sessions and so on. Roo is a pleasure to present because it's so demo-friendly, plus we also have a lot of freely-available and regularly-updated presentation material available for you (just [contact us](http://forum.springsource.org/forumdisplay.php?f=67) on the community forum). If you've already presented Roo, please let us know and we'll try to send you a small Roo gift (we normally have something nice to give out thanks to SpringSource).

### Application Showcase

Soon we'll be launching an "Application Showcase" to show others the applications that people have produced with Roo. If you have built an application in Roo and would like to provide a screen shot and short sentence or two about it, please get in touch with us via the [forum](http://forum.springsource.org/forumdisplay.php?f=67).

### Issue Tracker

If you've found a bug, or have a feature idea, please log it in our issue tracker. Our [issue tracker](http://jira.springframework.org/browse/ROO) can also be used to locate features other people have submitted, comment on requirements and vote for those features that you would find most useful. This is a common way we prioritise enhancement requests.

### Blog

The core Roo engineers regularly blog about Roo on the SpringSource [Team Blog](http://blog.springsource.com/). You can also directly access Roo-related articles by following the [Roo category](http://blog.springsource.com/category/roo/).

### Write Code

If you'd like to dig into the Roo code, the first step is to clone our Git repository and follow the readme.txt in the root directory. We use Maven to build Roo, so it's very easy to build your own releases (as you probably installed Maven already in order to use Roo!). The Git command you'll need is:

git clone git://github.com/SpringSource/spring-roo.git

One easy way to write code for Roo is to develop an add-on. Because Roo uses an OSGi-based addon architecture, you can easily build add-ons that can be located by others and and installed into their Roo shell.  
  
If you'd like to contribute to Roo itself (as opposed to writing an external add-on), you're also very welcome to do so. Have a look through the issue tracker or post a message on the community forum that outlines what you'd be interested in working on and we'll be pleased to help.