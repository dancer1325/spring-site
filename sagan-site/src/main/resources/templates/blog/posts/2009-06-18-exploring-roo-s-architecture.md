---
title: Exploring Roo\'s Architecture
source: https://spring.io/blog/2009/06/18/exploring-roo-s-architecture
scraped: 2026-02-24T09:06:47.478Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Alex |  June 18, 2009 | 0 Comments
---

# Exploring Roo's Architecture

_Engineering | Ben Alex |  June 18, 2009 | 0 Comments_

Last month we discovered how easy it is to [build a fully-fledged enterprise application](http://blog.springsource.com/2009/05/27/roo-part-2/) in just a few minutes using [Spring Roo](http://www.springsource.org/roo) - our new productivity tool for Java developers. While many Java developers have [already](http://twitter.com/kalayl/statuses/2197250433) [started](http://twitter.com/jayjwagner/statuses/2198297867) [evaluating](http://twitter.com/alexcuesta/statuses/2193076123) [Roo](http://twitter.com/mingjin/statuses/2188877538) [to](http://twitter.com/royvanrijn/statuses/2180948379) [help](http://twitter.com/kellerds/statuses/2062301262) [save](http://twitter.com/jungho_kim/statuses/2155503471) [time](http://twitter.com/techcast/statuses/2131191020) [on](http://twitter.com/diversit/statuses/2079233314) [their](http://twitter.com/desmax74/statuses/2073967984) [projects](http://twitter.com/jcatron/statuses/2065733225), I've received a lot of questions from people curious about how Roo actually works. In this blog entry I will explore Roo's architecture in depth, including its goals, alternatives prototyped, design rationale and implementation details. By the end you'll have a good understanding of what makes Roo tick and why its approach works well for Java projects.

## New Roo and STS Releases

Before I get into the detail of Roo's architecture, I should briefly mention we have today released [Spring Roo 1.0.0.M2](http://www.springsource.com/download/community?project=Spring%20Roo). Featuring [dozens of bug fixes and minor enhancements](http://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10340&styleName=Html&version=11227), this new release also includes:

-   A very nice unit test mocking capability (written by Rod Johnson)
-   Java and SQL reserved word detection (so no longer will you accidentally call a field something like "from")
-   The ability to specify the particular Java version you'd like to use (of particular importance to Apple users)
-   Extra [Spring Web Flow](http://www.springsource.org/webflow) configuration (so you now have a proper flow to play with)
-   Automatic exposure of dynamic finders to the web tier
-   Improved support for Windows users and those with non-English default locales

We've also released [SpringSource Tool Suite](http://www.springsource.com/products/sts) (STS) 2.1.0.M2 since my [last blog](http://blog.springsource.com/2009/05/27/roo-part-2/) entry. The Roo support in STS continues to improve, and you can now even configure STS to point to a separately-downloaded Roo installation. This is great news for the increasing number of people writing their own Roo add-ons or simply wanting to use the latest Roo releases with STS. Other nice Roo features in STS include CTRL + R "Roo command" dispatch, an inbuilt Roo shell, extra Roo commands to execute integration tests or deployments (including to a cloud environment!) and more. I thoroughly recommend downloading STS 2.1.0.M2 if you haven't already done so.

## Roo Core versus Roo Add-Ons

At its heart, Roo offers a core set of services that permit "add-os" to be used. These core services include a shell, file system manager, file system monitor, file undo capability, classpath abstraction, Abstract Syntax Tree (AST) parsing and binding, project build system interface, metadata model, process management, bootstrap and utility services. While we'll indirectly explore some of these core services later on, the vast majority of functionality that end users are interested in come from add-ons. Without any add-ons, Roo is just an elaborate console.

When you download Roo, we ship the core services plus a series of common add-ons. All of the add-ons can be identified via the "addon" keyword appearing in their JAR name. Every add-on that ships with Roo is optional and end users are free to enhance existing add-ons or create new ones. Indeed we very much welcome the community to develop and share add-ons they find useful.

Given there is a design separation between Roo's core services and the add-ons a user may wish to use, the focus of our energy for Roo 1.0.0 is on ensuring mainstream web applications can be easily and productively developed. In subsequent versions of Roo we will ship an increasingly richer array of add-ons that help users build other classes of application.

One area I've been asked frequently about is Roo's use of [Maven](http://maven.apache.org/). As noted in my [last blog](http://blog.springsource.com/2009/05/27/roo-part-2/) entry, the projects that Roo 1.0.0 creates use Maven. Because this Maven usage is implemented via an add-on, it is easy to add support for other project build systems as well. Indeed we've had many requests for [Ant](http://ant.apache.org/)/[Ivy](http://ant.apache.org/ivy/) support, and there is already a feature request in Jira ([ROO-91](http://jira.springsource.org/browse/ROO-91)) for this.

On a similar note, Roo also currently ships [JPA](http://en.wikipedia.org/wiki/Java_Persistence_API) and [JSP](http://java.sun.com/products/jsp/) add-ons. Both of these are pragmatic choices we made to support typical web application development in Roo 1.0.0. There is no technical reason at all preventing the development of [JDBC](http://java.sun.com/javase/technologies/database/), [JDO](http://java.sun.com/jdo/), [JSF](http://java.sun.com/javaee/javaserverfaces/), [Velocity](http://velocity.apache.org/) and [FreeMarker](http://freemarker.org/) add-ons, and we hope to see such add-ons over time.

Because this blog entry is focused on Roo's architecture, I'll conclude discussion of individual add-ons at this point. You can read my [last blog](http://blog.springsource.com/2009/05/27/roo-part-2/) entry if you'd like to learn more about how the current Roo 1.0.0 add-ons can be used to build applications. For now, let's dig a little deeper into how Roo actually works.

## Roo's Design Goals

Whenever reviewing any technology, it is important to consider the design goals and objectives that influenced its architectural choices. I explored some of these goals in my [original Roo blog entry](http://blog.springsource.com/2009/05/01/roo-part-1/), but let's revisit the topic here in a little more detail.

Most importantly, we wanted Roo to be a productivity solution for Java developers. There are many developers who prefer to (or need to) work in Java, and Java remains the most [widely used programming language on the planet](http://www.tiobe.com/index.php/content/paperinfo/tpci/index.html). Providing a first-class productivity tool to this very large group of developers represents Roo's most fundamental goal.

Second, we wanted to ensure we eliminated barriers to adopting Roo. There is no point having a great productivity tool if people aren't comfortable (or simply aren't allowed) to use it. Specifically, that meant having no [lock-in](http://en.wikipedia.org/wiki/Vendor_lock-in#Lock-in_in_electronics_and_computers) (ie easy removal of Roo), no runtime portion (and potential approval hurdles in many organizations), no unnatural development techniques, no IDE dependencies, no licensing costs, no strange dependencies to make it work, no steep learning curve, and no compromises to speed, performance or flexibility.

Third, we wanted to deliver a solution that built on the many strengths of Java. These include extremely good runtime performance, availability of standards (like [JPA](http://en.wikipedia.org/wiki/Java_Persistence_API), [Bean Validation](http://jcp.org/en/jsr/detail?id=303), [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer), [Servlet API](http://java.sun.com/products/servlet) etc), fantastic IDE support (like debuggers, code assist, refactoring etc), established technologies, type safety, and a massive pool of existing developer knowledge, skills and experience (not only in Java itself but also the de facto Java building blocks like Spring, JSP, Hibernate etc).

## Alternatives to Roo's Architecture

With the above requirements in mind, in 2008 I prototyped a number of different techniques including [JSR 269](http://jcp.org/en/jsr/detail?id=269) (the Pluggable Annotation Processing API in Java 6), build-time source code generation, IDE plugins, bytecode generation at development time, bytecode generation at runtime and advanced reflective approaches such as extensions to Spring Framework AOP. I didn't prototype other JVM languages because the principal motivation underpinning Roo was a tool to enable Java programming.

In one way or another each approach I prototyped had issues that ruled it out. Every approach needed a special runtime, special IDE plugin or suboptimal build step (or a combination thereof). Most also permanently locked the user into the approach, with removal unduly difficult and therefore creating a barrier to adoption that would stop many Java developers from enjoying the productivity gains on offer. Many approaches also relied on reflective techniques at runtime that would be slow and confusing to debug, and most offered little to no IDE integration. I also particularly preferred providing a lightweight, command-line tool, as I strongly believed this would deliver better a usability experience than a GUI. These are the reasons why we didn't use the approaches listed above.

## Roo Architecture Summary

After considerable prototyping we arrived at the Roo architecture, the key elements of which are:

-   A tab-completing, context-aware, hint-providing command line shell that can be loaded and exited by the user at any time and supports concurrent use with text editors and IDEs
-   Use of @Roo\* annotations which have [source-level retention](http://java.sun.com/j2se/1.5.0/docs/api/java/lang/annotation/RetentionPolicy.html#SOURCE) only (not runtime retention)
-   [AspectJ](http://www.eclipse.org/aspectj/) [inter-type declarations](http://www.eclipse.org/aspectj/doc/released/progguide/language-interType.html) (ITDs, also known as "introductions" or "mixins") for automatically maintained Java members (we'll discuss ITDs in depth below)
-   A [metadata](http://en.wikipedia.org/wiki/Metadata) model to facilitate easy development of custom Roo add-ons (we'll also discuss the metadata model below)
-   Full round-trip capabilities, courtesy of the metadata model and various core services mentioned above

This architecture didn't need a special build system, runtime component, IDE plugin or alike. It also met all of the design requirements mentioned earlier.

## Roo's Secret Sauce

The "new idea" that made this possible was to automatically use ITDs as a code generation artifact. Using ITDs in this manner delivers considerable practical benefits, because it allows Roo to generate code that is in a separate [compilation unit](http://hell.org.ua/Docs/oreilly/java/exp/ch05_06.htm) (ie physical file) from the code that the developer writes. Despite being in a separate file, the ITDs are combined into the same compiled .class file at compilation time. Because the resultant class is essentially the same as if the developer had written all the code themselves, all the benefits of traditional Java programming (like IDEs, debugger support, code assist, type introspection, type safety etc) work just as you'd expect. Also, because the compiled class is just a class file, everything works perfectly at runtime. Specifically, you don't have to worry about issues like [reflection performance](http://stackoverflow.com/questions/435553/java-reflection-performance), memory usage, confusing and difficult to debug operation, extra libraries that may need approval and upgrading etc.

What's also exciting about using ITDs for code generation is the [separation of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns) it delivers. Separation of concerns benefits the application developer, as they can safely ignore the ITD files created by Roo (because the developer knows Roo will manage them). But the separation of concerns is also excellent for Roo add-ons as well. The development of add-ons is much easier as the add-on developer knows they control the entire ITD compilation unit contents. A more subtle benefit is the automatic upgrade support this delivers. We've seen many examples during Roo's development where we've improved an add-on and then users who subsequently load Roo receive an automatically upgraded ITD. Similarly users can remove add-ons from their environment and the relevant ITDs will automatically be removed by Roo. This is an extremely pragmatic and useful technique that we've found invaluable.

The final major benefit of ITDs is lock-in avoidance. As we'll see later, ITDs are essentially normal Java source files. They just sit on your disk with all of the other source code, meaning developers can elect to never load Roo again and their project will still work. Those wanting a more complete removal can use features like [Eclipse AJDT](http://www.eclipse.org/ajdt/)'s "[push in refactoring](http://contraptionsforprogramming.blogspot.com/2009/05/push-in-refactoring-for-ajdt.html)". What this does is automatically move all source code from ITDs to the correct Java source file. This means if you don't want to use Roo anymore, just "push in refactor" your project and you have a perfectly normal Java project - just as if you'd written it all by hand yourself. This is fantastic news:

-   People just wanting to kick-start a project can do so with incredible ease and then remove Roo (as an aside they can also resume using Roo again at any time and it will work fine)
-   People wanting to use Roo for long term productivity gains can do so with complete confidence, knowing they can very easily remove it at any future time with just a couple of mouse clicks

Roo uses ITDs as provided by AspectJ. [SpringSource](http://www.springsource.com/) are big supporters and users of AspectJ, and here are just some of the reasons we feel it's a good fit for Roo-based projects:

-   AspectJ is an active project with a large community
-   AspectJ is mature, reliable and robust, having origins back in 2001 at PARC
-   AspectJ is widely supported by mainstream technologies like Maven, Ant and IDEs
-   Using AspectJ delivers existing IDE support without us needing to write extra plugins
-   Our research showed around half of all Spring users were already using AspectJ anyway
-   AspectJ is not used at runtime (the AspectJ runtime JAR is needed, but this has been a Spring Framework dependency since Spring 2.0 and as such would already be approved by organizations using Spring 2.0 and above)
-   AspectJ operates at build time and therefore ensures Java's performance and [perm gen space](http://blogs.sun.com/jonthecollector/entry/presenting_the_permanent_generation) is not compromised
-   Roo's ITD usage pattern is automatic, transparent and does not require users to have any AspectJ (or ITD) knowledge, skills or experience
-   Using AspectJ permits more advanced programming patterns to be employed such as [domain driven design](http://en.wikipedia.org/wiki/Domain-driven_design) (DDD) and [enforcement aspects](http://www.eclipse.org/aspectj/doc/next/progguide/starting-development.html), should developers wish to employ them
-   SpringSource employs the current leads of AspectJ (Andy Clement) and AJDT (Andrew Eisenberg), plus highly regarded AspectJ experts (like Ramnivas Laddard and Adrian Colyer), so we knew we had considerable in-house skills to ensure AspectJ would work very well with Roo
-   Many other production-proven technologies from SpringSource are also built on or support AspectJ, including [Spring Framework](http://www.springsource.org/about), [Spring Security](http://www.springsource.org/security), [SpringSource Application Management Suite](http://www.springsource.com/products/ams), [SpringSource dm Server](http://www.springsource.com/products/dmserver), [SpringSource tc Server](http://www.springsource.com/products/dmserver) and more

## Roo Usage in More Detail

Let's explore Roo's ITD usage and metadata model by creating a new project. Assuming you've installed Roo 1.0.0.M2, let's create a new directory for our project and start Roo:

```code
Copy$ mkdir architecture
$ cd architecture
$ roo
```

Once you receive the welcome screen, enter the following commands:

```code
Copyroo> project --topLevelPackage com.hello
roo> persistence setup --provider HIBERNATE --database HYPERSONIC_IN_MEMORY
roo> entity --name World 
roo> field string name 
```

Graphically your screen will look something like this:

![first-commands](http://blog.springsource.com/wp-content/uploads/2009/10/first-commands.png "first-commands")

  

Let's now open up a text editor and take a look inside the World.java file:

```java
Copy
package com.hello; 

import javax.persistence.Entity; 
import org.springframework.roo.addon.javabean.RooJavaBean; 
import org.springframework.roo.addon.tostring.RooToString; 
import org.springframework.roo.addon.entity.RooEntity; 

@Entity 
@RooJavaBean 
@RooToString 
@RooEntity 
public class World { 
   private String name; 
} 
```

As shown, there are several @Roo\* annotations. These annotations are included in Roo add-ons and instruct Roo to create an ITD if required. The @RooEntity annotation is indicating that you'd like Roo to automatically provide typical JPA methods and fields (including an identifier and version property). The @RooJavaBean is requesting getters and setters to be created for each field. The @RooToString is requesting a toString() method to be created.

All ITDs created by Roo adopt a specific naming convention. The convention is SimpleTypeName + "*Roo*" + AddOnSpecificKeyword + ".aj". Roo automatically ensures all files matching this format are properly managed by a relevant add-on. If there is no add-on installed for a particular keyword, Roo will delete the orphaned ITD file. This ensures you can change your add-on configuration at any time and not have to manually deal with cleaning up.

Let's have a look inside the World\_Roo\_ToString.aj ITD:

```java
Copy
package com.hello; 

privileged aspect World_Roo_ToString { 

    public String World.toString() {    
        StringBuilder sb = new StringBuilder();        
        sb.append("id: ").append(getId()).append(", ");        
        sb.append("version: ").append(getVersion()).append(", ");        
        sb.append("name: ").append(getName());        
        return sb.toString();        
    }    
    
} 
```

As you can see, an ITD looks just like a normal Java source file. There is only one difference: in the method signature there is a "World." prefix before the "toString()" method name. This is directing AspectJ to introduce the toString() method into the World.class file during compilation. As you can see, ITDs are incredibly simple even if you've never encountered them before. In particular, there are no pointcuts required.

Let's edit the World.java file and add another field to it:

```java
Copy
private String comment;
```

If you've left Roo running, as soon as you save World.java you will notice that it instantly modifies the World\_Roo\_JavaBean.aj and World\_Roo\_ToString.aj files. This is because Roo monitors the file system for any changes you make outside of the Roo shell, such as through your preferred IDE. You could have also used Roo's "add field string" command if you preferred.

If you didn't have Roo running, the next time that you load it an automatic startup-time scan will be performed. This includes automatically upgrading any existing ITDs if the relevant add-on has been upgraded (or even deleting the ITD if the add-on no longer exists). The point is all of this happens automatically and naturally, without you needing to worry about following special rules and constraints about when Roo must run or how you must change files etc.

## Customizing What Roo Generates

All @Roo\* annotations allow you to control the member name being used, and also provide the member yourself. Let's edit the World.java file and change the @RooToString annotation to:

```java
Copy
@RooToString(toStringMethod="rooIsFun")
```

If you now have a look in the World\_Roo\_ToString.aj file, you'll see the method name has automatically changed:

```java
Copy
package com.hello; 

privileged aspect World_Roo_ToString { 
    
    public String World.rooIsFun() {    
        StringBuilder sb = new StringBuilder();        
        sb.append("id: ").append(getId()).append(", ");        
        sb.append("version: ").append(getVersion()).append(", ");        
        sb.append("comment: ").append(getComment()).append(", ");        
        sb.append("name: ").append(getName());        
        return sb.toString();        
    }    
    
} 
```

Let's say you don't like Roo's toString() method (which is now rooIsFun(), remember!). You have two ways of removing it. You can either delete or comment out the @RooToString annotation in the World.java file, or you can simply provide your own rooIsFun() method directly in World.java. Feel free to try both techniques. In both cases you'll see Roo automatically deletes the World\_Roo\_ToString.aj file, as it can see you don't need Roo to provide the method for you anymore. This reflects Roo's approach: you are always in total control and there aren't any surprises.

## Metadata Model

While you certainly don't need to understand Roo's internals to simply use Roo, curious readers might be wondering how the World\_Roo\_ToString.aj file even knew there were getId(), getVersion(), getComment() and getName() methods available. This is particularly interesting given these methods aren't even in the World.java file. Let's explore this a little more.

In the Roo shell, enter the following command:

```code
Copyroo> metadata for type --type com.hello.World
```

The resultant screen should look similar to:

![metadata](http://blog.springsource.com/wp-content/uploads/2009/10/metadata.png "metadata")

  

What this is summarizing is Roo's internal representation of the World.java type. This is built from an AST parse and bind of the World.java file. You may have noticed there are downstream dependencies listed. These represent other metadata items that wish to be notified should the World.java metadata ever change. Add-ons will generally listen for changes to other metadata items and then modify ITDs (or XML files or JSPs etc) accordingly.

You can watch the metadata event notifications take place by typing "metadata trace 1" and then changing the World.java file. The notification messages will appear similar to the following:

![tracing](http://blog.springsource.com/wp-content/uploads/2009/10/tracing.png "tracing")

  

Before concluding this introduction to Roo's metadata model, I will note that Roo does not require metadata to be retained in memory. This ensures very large projects can still use Roo without running out of memory. Roo automatically tracks cache statistics and also the runtime profile of individual add-ons. Those systems with sufficient memory will enjoy an automatic [LRU](http://en.wikipedia.org/wiki/Cache_algorithms#Least_Recently_Used) cache. If you're curious about the LRU cache statistics, these are available via the "metadata status" command (note the cache hit ratio is pleasingly high):

```code
Copyroo> metadata status 
2: org.springframework.roo.addon.configurable.ConfigurableMetadata
5: org.springframework.roo.addon.javabean.JavaBeanMetadata
8: org.springframework.roo.addon.finder.FinderMetadata
35: org.springframework.roo.addon.plural.PluralMetadata
53: org.springframework.roo.addon.beaninfo.BeanInfoMetadata
64: org.springframework.roo.addon.entity.EntityMetadata
124: org.springframework.roo.addon.tostring.ToStringMetadata
862: org.springframework.roo.process.manager.internal.DefaultFileManager
[DefaultMetadataService@6030f9 providers = 14, validGets = 369, cachePuts = 17, cacheHits = 352, cacheMisses = 17, cacheEvictions = 0, cacheCurrentSize = 6, cacheMaximumSize = 1000]
```

## Conclusion

I hope that you have found this discussion of how Roo works interesting. We've seen that Roo uses ITDs to achieve sustainable productivity gains for Java developers. We've looked at the benefits of Roo's ITD approach and seen how it actually works in depth, including how they are customized, how they operate at a metadata level and how their lifecycle is transparently and automatically linked to add-on upgrades. We've also discussed how ITDs deliver mature and proven separation of concerns while concurrently avoiding lock-in, runtime implications and other subtle issues that are important in large, real-world projects. Finally, we reviewed Roo's metadata system and explored some of its event notifications, type introspection and scalability features.

We look forward to supporting the community in becoming involved in Roo and developing new add-ons. We invite you to [try out Roo](http://www.springsource.com/download/community?project=Spring%20Roo) and we very much welcome your [feedback](http://forum.springsource.org/forumdisplay.php?f=67), [bug reports](http://jira.springsource.org/browse/ROO), [feature ideas](http://jira.springsource.org/browse/ROO) and [comments](http://search.twitter.com/search?q=%23roo). I hope that you enjoy using [Roo](http://www.springsource.org/roo).