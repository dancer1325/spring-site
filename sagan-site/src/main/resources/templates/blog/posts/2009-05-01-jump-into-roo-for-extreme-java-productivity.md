---
title: Jump into Roo for extreme Java productivity
source: https://spring.io/blog/2009/05/01/jump-into-roo-for-extreme-java-productivity
scraped: 2026-02-24T09:08:35.241Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Alex |  May 01, 2009 | 0 Comments
---

# Jump into Roo for extreme Java productivity

_Engineering | Ben Alex |  May 01, 2009 | 0 Comments_

**Update:** The [second installment](http://blog.springsource.com/roo-part-2) of the "Introducing Spring Roo" blog series is now available and includes a detailed step-by-step tutorial to help you get started with Roo. The [third installment](http://blog.springsource.com/2009/06/18/roo-part-3/) covers Roo's internal architecture in detail.

The twittersphere has been abuzz this week with news from [SpringOne Europe](http://europe.springone.com/europe-2009). One announcement generating a significant amount of interest is SpringSource's new open source productivity tool, codenamed "Roo".

Roo is a sophisticated round-tripping code generator that makes it quicker and easier than you've ever imagined to create and evolve Spring applications. Even if you have reservations about code generation, it will still be worth taking a look at Roo. It contains significant innovation that addresses all major objections to code generation, whilst still delivering best practice Spring applications and remaining useful throughout the application lifecycle.

This is the first blog in a series where I will discuss Roo, starting with its general design goals and functionality, then later moving onto how to use it and the Roo engineering internals. Given this first blog serves as an introduction, let's start by repeating the mission statement that guided Roo's development:

> Roo's mission is to fundamentally and sustainably improve Java developer productivity without compromising engineering integrity or flexibility.

How does this translate into a tool? One conference delegate who saw Roo described it as "a little genie who sits in the background and handles the things I don't want to worry about". This description is particularly appropriate for two reasons. First, Roo really is "little". Its current download is under 3 Megabytes, it lets you continue your normal Spring-based Java programming model, and it doesn't require you to adopt a special Roo runtime or build technology. Second, it does sit quietly in the background and look after things for you. Most importantly, Roo doesn't get in your way. If you want to write something yourself, just do it and Roo will quietly take care of automatically adjusting relevant files in response (ie Roo supports round-tripping). If you want to edit a Java or JSP file, just do it. Roo doesn't need you to use its interface. Or if you want to stop using Roo, just exit the program. Roo doesn't become part of your build system or runtime, so it is incredibly easy to stop using Roo in the unlikely event you'd ever want to.

We believe Roo fills a very sweet spot between the power of existing IDEs, the productivity potential demonstrated by modern web RAD frameworks, and the deep desire for Java developers to have a tool that works the way they want to work and reflect the engineering principles that they value. This has resulted in a non-invasive background tool that is exceptionally easy to learn how to use, can be applied to both existing and new projects, and streamlines the development of world best practise applications at extraordinary speed.

## Productivity and Usability

It's easier to be productive and enjoy developing when you have highly usable tools that are easy to learn and build on your existing knowledge, skills and experience. Usability was therefore a critical design factor for us when designing Roo. We were influenced by the clear productivity benefits developers enjoy through tab completing user interfaces such as the \*nix shell prompt. But we took it a step further, and wrote a shell specifically for Roo. By delivering a shell (instead of a GUI or command line utility) we were able to achieve a scriptable, user-friendly, easy-to-learn, forgiving interface. You can press TAB whenever in doubt and Roo will complete the command. You can type "hint" whenever you need to and receive project-stage-specific guidance. You can omit options from commands and Roo will automatically infer what you meant based on what you recently did. You can type illegal commands and Roo will carefully undo any changes the failed command might have made. You can write a script and play it back to produce your project again. You don't even need to fully type a command – just type enough so that Roo recognises it as unique. And you can do all of this from the operating system command prompt without even installing an IDE.

Of course, most Java developers use an IDE and find them invaluable for their productivity. So Roo recognises this and happily continues executing whilst you're working on a project inside your IDE. You won't need any Roo-specific IDE plugin (although we do have a plugin for [SpringSource Tool Suite](http://www.springsource.com/products/sts), which I'll discuss further below). Naturally within your IDE you will enjoy the fact that Roo was designed to make your Java development life easy via both code assist and debugging support. Your debugger will operate just as it always has, stepping through all code that forms part of your application – including those files that Roo helps you with. Every source file that Roo produces will correctly appear in code assist (control + space) lists, so you need not memorize method signatures.

As Roo supports you programming in Java, you'll receive the normal incremental validation that helps all of us identify a missing bracket or mistyped field name. IDE refactoring tools will continue to be of service to you, giving confidence that the application code quality will remain high even in the face of large development teams, changing team members, and years of ongoing development and maintenance. Finally, all Roo annotations currently adopt a naming convention of "Roo\*". This naming convention ensures you can easily find an annotation when you need it – not that you actually need to type in any Roo-specific annotations at all. The annotations themselves provide you with very fine-grained control over how Roo helps your development, allowing you to control member names and custom behaviour in a detailed manner should you wish to (the defaults work just fine as well).

At SpringSource Europe we also demonstrated the use of Roo within SpringSource Tool Suite (STS), our popular and [soon to be freely available](http://www.springsource.com/products/sts) Eclipse-based IDE. This allows you to enjoy all the benefits of Roo from within your IDE. You can enter commands in a "Roo View" at the bottom of the screen and see the changes instantly reflected in your Package Explorer and Editors. Or you can make a change in an Editor and see the Roo View immediately show what Roo did in response to your changes. It's the little genie sitting out of your way and taking care of what you don't want to.

## Technical Functionality

Roo is built on an add-on architecture that enables different types of Java applications to be built. At the moment there are around 18 "add-ons", and these are designed to support the easy development of request-response MVC web applications with a separate JPA-based entity layer. Some of the specific functionality that Roo currently includes:

-   Commencing a new application from an empty directory (Roo can work with an existing application as well, though)
-   Configuring your build system and setting up a project structure specific to that build system (we support Maven 2 initially)
-   Installing a JPA provider and database of your choice
-   Viewing and configuring database configuration details
-   Setting up Log4J configuration files, and allowing them to be modified using TAB completing commands
-   Creating JPA entities that enjoy automatic dependency injection and persistence methods
-   Adding fields to JPA entities, including automatically setting the correct annotations both for JPA as well as the new Bean Validation (JSR 303) standard
-   Managing automatic JUnit integration tests, which pass out of the box even if you have relationships between entities and are applying Bean Validation constraints
-   Creating and maintaining Spring MVC-based controllers that carefully follow REST conventions, including producing and maintaining JSP pages for those controllers
-   Stubbing Spring MVC controllers that you can finish yourself, saving you the need to lookup the most common annotations, conventions and method signatures used in such controllers
-   Dynamically creating finders on your entities, so you can produce typical "findByField1LikeOrField2Between(Field1 like, Field2 from, Field2 to)" style queries without writing JPA Query Language
-   Easy installation and configuration of Spring Security (just type "security setup" and press enter)

All of these capabilities build on Roo's internal metadata model, which is a comprehensive representation of your project. So whilst technologies like IDEs provide a member structure model, Roo takes this to a higher level of abstraction by offering enterprise application-specific metadata that reflect common development conventions. For example, whilst an IDE may know there is a class called "Foo" with a method named "persist" that defines certain parameters and return types, Roo also has this information but a range of additional metadata such as what the method means from a logical perspective.

As a result of the metadata model, the capabilities we will add to Roo in later releases will extend significantly beyond request-response web application development. The possibilities enabled through this metadata model are extremely broad, and include for example round-trip management of generation IV web applications (component-based, client-executed technologies), round-trip UML integration, alternate persistence models (such as optimised for cloud computing) and round-trip rich clients.

## Become Involved!

You're welcome to become involved in Roo. Whilst we have released a Roo alpha, this is a very early stage preview. We are also presently running a vote so the community can provide feedback on the name. Fittingly, the vote application was developed live during SpringOne Europe's keynote and deployed to the cloud. You can find links to these resources at [](http://www.springframework.org/roo)[http://www.springsource.org/roo](http://www.springsource.org/roo).

As mentioned at the start of the blog, I will also publish several more blogs over the coming weeks covering [Roo usage in detail](http://blog.springsource.com/roo-part-2), plus the internal architecture and how add-ons are authored. In the meantime you are invited to follow our work via the [#roo](http://search.twitter.com/search?q=%23roo) hash key on Twitter.

We hope that you enjoy using Roo.