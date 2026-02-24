---
title: Update on Groovy and Grails Tools
source: https://spring.io/blog/2009/08/27/update-on-groovy-and-grails-tools
scraped: 2026-02-24T09:04:18.913Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Dupuis |  August 27, 2009 | 0 Comments
---

# Update on Groovy and Grails Tools

_Engineering | Christian Dupuis |  August 27, 2009 | 0 Comments_

Since Andy's [announcement](http://blog.springsource.com/2009/07/30/a-groovier-eclipse-experience/) of the early alpha version of a new and improved Groovy Eclipse plugin, we have received very good feedback from early adopters out of the Groovy and Grails community. Judging from comments and twitter buzz there really is a big interest in good quality Groovy language support on the Eclipse platform. Andy and Andrew made good progress during the last weeks and are heading towards an [M1](http://archive.groovy.codehaus.org/lists/org.codehaus.groovy.eclipse-plugin-dev/msg/689d61aa0908181006h10714f43ya2526e72638ddee8@mail.gmail.com) release which is not far off; check out [JIRA](http://jira.codehaus.org/secure/IssueNavigator.jspa?reset=true&&fixfor=15311&fixfor=15561&pid=11710&sorter/field=issuekey&sorter/order=DESC&sorter/field=status&sorter/order=ASC) for more details on when to expect it.

We'd like to thank everybody who tried out the early version and took time to report problems and submit feature requests. At this early stage user feedback is immensely important; not only to fix issues but also to understand what is important to Groovy users so that we can focus on the relevant features and problems.

One request that comes up very often is to add support for Grails. I'd like to use this blog to outline what we are planning in this area.

When we initially started the work to provide Groovy and Grails tooling it became clear that Grails tools will only be valuable to users if there is good and solid support for the Groovy language available. That is why we focused on the compiler and UI work for Groovy first. Because we made some significant progress in that area already it is now also time to start fleshing out Grails tooling requirements and start the work on them.

There are two basic requirements that we are working on right now:

## Project and Classpath Management

Grails projects have a complex project classpath which is normally hidden by Grails and does not surface to the user. But what if you want to compile and work on a Grails project inside Eclipse? The classpath should be managed for you.

There are two important aspects to consider when setting up a Grails project classpath: binary library dependencies and dependencies to plugin source files like e.g. Groovy classes.

With an early prototype we can compile Graeme's semi-complex "[Twitter in 40 minutes](http://www.springsource.com/webinar/building-twitter-with-grails-40-minutes)" Grails project in STS. Certainly we can also run unit and integration tests. See the following screenshot for a picture proof.

[![grails-tools-thumb](http://blog.springsource.com/wp-content/uploads/2009/08/grails-tools-thumb.png "grails-tools-thumb")](http://blog.springsource.com/wp-content/uploads/2009/08/grails-tools.png "Grails Tools with Classpath Container and Quick Command Launch")

The prototype features a "Grails Dependencies" classpath container which collects general Grails dependencies but also project and global plugin JARs. Additionally all plugin source files and folders are linked into the project by using link source folders. All this is automatically driven and does not require any manual configuration. The tools understand the Grails project configuration for plugin directories and other build settings.

## Running Grails Commands inside the IDE

Another feature that people have asked for is the ability to run Grails commands inside the IDE. Once the IDE can launch Grails commands it can also automatically update and refresh the source tree in Eclipse and trigger incremental compilation and validation.

Refer to the above screenshot to see how launching Grails commands could look like.

It is our goal and commitment to make developing Grails applications even more productive with good and **free** developer tools. There are exciting things ahead of us and you'll see lots of interesting things coming up: one being an integrated experience for developing Grails application and deploying to CloudFoundry - all without leaving STS.

Our plan is to make a first version of the Grails tools available around SpringOne G2x in late October. Make sure to check out Andy's session on [Eclipse Groovy Tooling](http://www.springone2gx.com/conference/new_orleans/2009/10/session?id=15407).

At this time I'd like to encourage every Groovy and Grails user to enter requests for Grails tooling features into the [STS JIRA](https://issuetracker.springsource.com/browse/STS). The input will help us prioritizing features.