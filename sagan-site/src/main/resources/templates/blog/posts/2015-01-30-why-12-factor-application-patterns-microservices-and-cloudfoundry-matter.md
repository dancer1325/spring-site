---
title: Why 12 Factor Application Patterns, Microservices and CloudFoundry Matter
source: https://spring.io/blog/2015/01/30/why-12-factor-application-patterns-microservices-and-cloudfoundry-matter
scraped: 2026-02-23T21:58:13.128Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Tim Spann |  January 30, 2015 | 8 Comments
---

# Why 12 Factor Application Patterns, Microservices and CloudFoundry Matter

_Engineering | Tim Spann |  January 30, 2015 | 8 Comments_

It seems like a lifetime ago, but a few short years ago I was leading a $100 million government project for a large system integrator that involved 50+ developers, 20+ testers, 15+ managers, 5+ ops and a cast of characters. Once a week we had to do our deploy.

Despite using Scrum, Cruise Control, SVN, Java, Eclipse, Guava, Google Guice, UML, JUnit, PMD, Findbugs, Checkstyle, MDD, TDD, eclEmma and mostly modern tools; our deploy process was a fragile, long, manual, person intensive process. Each Friday night we started. A long email thread began the process with a text check list that we emailed back and forth as each person in the process did their piece. Another architect or I would manage the process and be responsible for the Go/No Go decision and the critical DB compare step. We were using a proprietary vertical framework from a major software company for the basis of the project. It involved manually running SQL scripts, running diff scripts, visually comparing some items, checking the version control check list, checking the Cruise Control results, JUnit / Code Coverage HTML and some other generated reports. A UNIX admin would copy over the giant EAR files, SQL and a ton of giant XML files. Once there they would run a number of shell scripts to change some things, sometimes using environment variables. Then they would be moved to a special directory and the Java app server would be stopped, everything backed up. The EARs would be moved over, datasources and other configs would be copied and checked. DB change scripts would be run against Oracle and meta data would be updated/inserted/deleted via numerous sql scripts. The server would be started up. I would run a Selenium test to hit the various sites to "warm them up" as the complex proprietary DB framework needed the cache warmed and started. The first few tries would fail.

Once initialized, we would email the team and a person in Canada would run a different scripted web test that was our "Smoke Test". If that worked, about 40% success, the email would pass off to the test team to start a few hours more testing. If all went well, by 2am on Saturday the site would be ready to go. That usually didn't happen. Some minor thing would be broken because something was forgotten in the configuration or a file wasn't committed, or someone missed one step. Giant files, no way to move pieces, this file transfer was not fast.

The local development machines were running Windows, Oracle JDK and Tomcat plus a special Java application to simulate an application server. For production, we ran on a UNIX Java application server with a different implementation of the JDK. It almost never went smoothly. So many weird issues with different JDKs, application servers, memory, JMS, database connections and library issues. There were over 20,000 Java classes with many Session and Entity EJBs. The only good thing was that all the items my team developed had good unit tests and everything used good domain modeling. Despite crushing deadlines, we kept our code coverage above 80% and used FindBugs/PMD/CheckStyle. We mandated peer reviews for all modules and that was very useful, but without automating that, it did add a manual step to the process. I forgot to mention that we had several hour plus ANT builds; I think I blocked that out.

Good code fails when you don't have good process and a platform to help you.  
Good teams fail when you don't have a good culture that embraces DevOps, microservices and not giant monoliths.