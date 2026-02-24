---
title: Finishing "Beginning Spring 2: from Novice to Professional"
source: https://spring.io/blog/2006/08/03/finishing-beginning-spring-2-from-novice-to-professional
scraped: 2026-02-24T09:36:10.889Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | admin |  August 03, 2006 | 0 Comments
---

# Finishing "Beginning Spring 2: from Novice to Professional"

_Engineering | admin |  August 03, 2006 | 0 Comments_

To celebrate the launch of the new i21 team blog I take this opportunity to introduce a new Spring book that's coming up shortly. It's titled "[Beginning Spring 2: from Novice to Professional](http://www.apress.com/book/bookDisplay.html?bID=10123)" and is published by Apress. I've co-authored this book with [Mark Fisher](http://blog.interface21.com/main/author/markf/) (i21), [Bram Smeets](http://bram.jteam.nl/) (of DWR fame) and Seth Ladd (of "[Expert Spring MVC and Web Flow](http://www.amazon.com/gp/product/159059584X/102-1014766-1407365?v=glance&n=283155)" fame). Rob Harrop is the technical reviewer.

The book is targeted - as you might have guessed - to beginning users of the Spring Framework. Now the funny thing about Spring is that you're always a beginner in some areas. The framework offers so much features and integrations that you can't possible know them all (that doesn't go for you Juergen).

That's why we didn't take the term "beginner" too strict. Sure, the book does introduce the Spring Framework for people that pick up the book in the book store and literally hadn't heard about Spring before. Also, a beginning Spring user is typically not a beginning Java developer. And since there are also a lot of new Spring 2.0 features covered in the book almost all Spring users - and Ben Hale ofcourse - will find at least some of the chapters interesting.

We've taken an approach of problem solving and practical advice. In each chapter we lay out the challenges developer typically face in the subject's area and discuss some common pitfalls with examples. Next we introduce the Spring solutions and how readers can benefit by using these in their applications. We find that by laying out the problem first and discussing the Spring solution next it becomes much easier to grasp the ideas in Spring and appreciate the solutions.

Hence I believe this book will be of interest for people that have been using Spring for some time on a project but never really had the chance to take a step back and think about the problems behind the solutions.

Here's an outline of the chapters:

Chapter 1 is an introduction to modern application development. It outlines the challenges of configuration and the dangers of restricting architectures to narrow programming models. It introduces concepts as Dependency Lookup and Dependency Injection and places Spring in perspective of JEE technologies. It introduces the core values of the framework: intregrate, improve, add consistency, make easier to use, document and raise the standards.

Chapter 2 introduces the Spring Container and its XML configuration files. It's a pretty extensive coverage that introduces the flexibility that's available to Spring users. For example, the use of FactoryBean and factory methods is covered in quite some detail because it can add a lot of flexibility to application. The bean life cycle is introduced since understanding this point of extensibility has become more important for Spring user in the light of Spring 2.0.

Chapter 3 covers the *classic* Spring AOP framework. We found that we couldn't cover the new Spring 2.0 features without gently introducing readers into the core AOP concepts: what are the problems, what's AOP and how does in the solve the problems? What's Advice and what are the different types? What are Proxy objects and how is their creation configured? What are Join Points and Pointcuts. Finally this chapter shows some examples of how Spring uses AOP internally? This chapter is based on Spring 1.2 and serves as a starting point for the next chapter.

Chapter 4 is probably mine - and I'm sure also Ben's - favorite because it covers Spring AOP 2.0. Adrian wrote an excellent [chapter](http://static.springframework.org/spring/docs/2.0.x/reference/aop.html) in the Spring 2.0 reference manual on the new AOP features. This chapter takes things more slowly. It's based on the AOP concepts in chapter 3 and introduces Aspects and the AspectJ Pointcut language. It's based on the @AspectJ-style but also covers the declaration of Aspects and Advisors in XML. It also introduces Auto Proxy Creation, a key feature in Spring 2.0 although it was already available in Spring 1.x. This chapter is a must read for all Spring users.

In the back of the book there are exercises for chapters 2, 3 and 4 that provide additional context and that help readers to get hands-on experience with Spring.

Chapter 5 is an introduction to data access. When I first wrote this chapter it was pretty short and introduced Spring's data access framework. Then I understood it would be interesting for users to get a better understanding of what the challenges of data access are. So I rewrote this chapter and now half of it covers typical data access problems: managing database resources, issues with data access exceptions, issues with transaction management and the overall impact of data access on applications. Next it covers how Spring solves these various problems and how you can find the right place for data access in your applications.

Chapter 6 covers how to use JdbcTemplate in your applications to insert, update, select and delete data in database with SQL.

Chapter 7 is a hands-on introduction to using Spring's transaction management in your applications. It also covers the easy transaction management configuration in Spring 2.0. Did you know Spring 2.0 offers 6 (!) ways of configuring transaction management? Talking about flexibility.

Chapter 8 introduces Spring MVC hands-on. It gives an overview of a typical web layer and next introduces the components of Spring MVC. It has three examples that range from a paginated read-only list to complicated form handling. This is a great chapter for existing Spring users that want to learn more about Spring MVC. It also covers the Spring 2.0 JSP form tags.

Chapter 9 is hands-on and covers some of the view technologies that are supported by Spring MVC like JSTL, Velocity, Freemarker, XSLT, PDF, Excel and JasperReports.

And finally chapter 10 covers testing. It stresses the importance of testing plus JUnit, EasyMock and the Spring classes for writing integration tests (some people call them fuctional tests).

In this book we use a sample application that deals with managing the many aspects of a tennis club and tennis tournaments. We thought it would be nice if readers and the Spring audience in general would have access to a sample application that's reasonably complex. It gives us a nice way to share our ideas of how Spring fits into real applications. We're still working to finish the sample application but I can tell you already it's going to include lots of extra reading material on the design and configuration we've choosen to use.

As you've noticed this book doesn't cover Hibernate. We felt that is would be too hard to explain Hibernate properly from the ground up *and* how to use it with Spring. In the end we've changed our minds a little and though it would be nice if there's some Hibernate material available for the readers. So there's going to be a bonus appendix available online that introduces the basic ideas behind Hibernate and how Spring facilitates its use. It's a starting point for people that haven't gotten their feet wet yet when it comes to Object-Relational Mapping tools.

So when will be book be available? On the current schedule the book will be available end of october. You can pre-order it as of now. We hope Spring users will enjoy this book. I'll keep you posted on the progress we're making over the coming weeks.