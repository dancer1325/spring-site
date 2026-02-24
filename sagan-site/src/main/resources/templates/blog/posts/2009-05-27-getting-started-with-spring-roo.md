---
title: Getting Started with Spring Roo
source: https://spring.io/blog/2009/05/27/getting-started-with-spring-roo
scraped: 2026-02-24T09:07:39.093Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Alex |  May 27, 2009 | 0 Comments
---

# Getting Started with Spring Roo

_Engineering | Ben Alex |  May 27, 2009 | 0 Comments_

**Update:** The [third installment](http://blog.springsource.com/roo-part-3) of the "Introducing Spring Roo" blog series is now available and covers Roo's internal architecture in detail.

I have a confession to make. While many of you would know I've been busily working away on [Spring Roo](http://www.springsource.org/roo) in recent months, I also have a separate project that hasn't made it into Subversion. The other project is planning our wedding, as next month my fiancée and I are traveling overseas to get married. So as I pondered what I could show you in this blog entry about Roo, it struck me that I should take the opportunity to build our wedding's [RSVP](http://en.wikipedia.org/wiki/RSVP) site using Roo! So today we'll be learning how to build a wedding RSVP site using Roo, which some of my colleagues have commented is an enterprising example of pursuing work-life balance. :-)

## Progress Update

If you missed the [first installment](http://blog.springsource.com/2009/05/01/roo-part-1/) in the Spring Roo blog series on 1 May 2009, in brief I introduced the vision of SpringSource's new open source productivity tool for those wanting to rapidly build best practice Spring applications in Java. As many people discovered who played around with the alpha releases, Spring Roo offers a powerful and easy-to-use approach to productive application development, with much of the motivation behind Roo emerging in the first Jira issue, [ROO-1](http://jira.springframework.org/browse/ROO-1) (logged by Rod Johnson, Father of Spring and CEO of SpringSource).

Today I am pleased to announce that we have just released [Spring Roo 1.0.0.M1](http://www.springsource.com/download/community?project=Spring%20Roo). This release not only features numerous fixes, enhancements and a 31% performance improvement, but also an exciting range of new capabilities including [email services](http://static.springframework.org/spring/docs/3.0.0.M3/spring-framework-reference/html/ch26.html), [JMS](http://static.springframework.org/spring/docs/3.0.0.M3/spring-framework-reference/html/ch23.html), [Spring Web Flow](http://www.springsource.org/webflow), simplified installation and automatic [Selenium](http://seleniumhq.org/) support. That's on top of those many capabilities already present in the alpha releases, as mentioned in my [earlier blog](http://blog.springsource.com/2009/05/01/roo-part-1/) entry.

In addition to working on the first milestone release, over the last month we've also established the public project infrastructure typical of open source projects. We now have available a [community support forum](http://forum.springsource.org/forumdisplay.php?f=67), Jira [issue tracking](http://jira.springframework.org/browse/ROO), public [Subversion repository](https://anonsvn.springframework.org/svn/spring-roo/), FishEye [source monitoring](https://fisheye.springsource.org/browse/spring-roo) and [so on](http://forum.springsource.org/showthread.php?t=71985). Some of the comments reported on the [#roo Twitter](http://search.twitter.com/search?q=%23roo) channel over the last month have included "I'm impressed", "liking it", "custom roo addons \[are\] very easy", "here comes some innovation", "the first milestone release will be cool!", "Roo looks interesting and works", "very impressive tool", "very cool" etc. We've also started seeing the first [community-produced add-ons](http://jira.springframework.org/browse/ROO-41), underscoring the ease at which you can extend Roo with your own custom features.

Earlier this month we also concluded the community [project naming competition](http://blog.springsource.com/2009/05/01/roo-part-1/), with "Spring Roo" easily emerging as the winner. A total of 952 eligible votes were received, distributed between Spring Roo (467), Spring Boost (180), Spring Spark (179), Spring HyperDrive (64) and Spring Dart (62). Thank you to everyone who voted!

## Installation

Now that we've added simplified installation to Spring Roo 1.0.0.M1, installation is as simple as downloading the ZIP, extracting it, and then adding the "bin" directory to your path:

-   Windows users should load Control Panel, then click System, Advanced, Environment Variables, and double-click the "Path" entry. Append to the end of the path, ";C:\\spring-roo-1.0.0.M1\\bin" (or wherever you installed Roo).
-   \*nix users should create a symbolic link to the roo.sh shell script. A command such as "sudo ln -s ~/spring-roo-1.0.0.M1/bin/roo.sh /usr/bin/roo" will generally do the trick.

While you can use Spring Roo standalone, I also recommend that you download [SpringSource Tool Suite](http://www.springsource.com/products/sts) (STS) 2.3.0 or above. STS is our [free, Eclipse-based IDE](http://blog.springsource.com/2009/05/07/springsource-tool-suite-now-free/) and offers many features to simplify Spring application development. For example, if you download STS 2.3.0 or above you will receive inbuilt Spring Roo support and don't even need to install the standalone Spring Roo shell.

This blog will be written assuming you're using the standalone Spring Roo shell. Unless otherwise specified, all commands work the same in both standard Spring Roo and also STS 2.3.0 or above. One of the main differences is when using the Roo shell you press TAB for completion options, whereas within STS the TAB key is replaced by CTRL + SPACE. We use CTRL + SPACE because it's the more traditional key combination for completions within [Eclipse](http://www.eclipse.org/)\-based IDEs.

You should also verify you have [Maven](http://maven.apache.org/download.html) 2.0.9 or above installed. While Roo itself doesn't use Maven and can operate without it installed, projects created by Roo currently use Maven. In addition, be sure to delete the ROO\_HOME variable if you installed one of the earlier Roo alpha releases.

## Application Requirements

Now that you've installed Roo, let's consider the requirements of our wedding RSVP application. We'll then build the application using a combination of Roo and some manual coding. The requirement for some manual coding reflects an underlaying philosophy of Roo that you will still need to develop those parts of your application that differentiates it from the next. However, you'll see that Roo was designed to enable manual coding and customization in a completely transparent, familiar and round-trip supporting manner.

Despite having online RSVP, we've still sent out paper wedding invitations. On the back of each invitation is a small "invitation code". These are not easily guessed, but they're easy to read and type in (no [UUIDs](http://en.wikipedia.org/wiki/Universally_Unique_Identifier)!). The wedding invitation text invites the guest to visit our wedding RSVP site in order to RSVP. When they visit the wedding RSVP site, the guest will be asked to enter their invitation code.

Once the guest enters their invitation code, any existing RSVP record will be retrieved and allow them to edit it. If they haven't previously RSVPed, they'll be presented with a new RSVP form to fill in. The form will simply ask the guest how many people are attending, and any special requests (eg dietary needs). They'll also be asked to enter their email address, and if one is provided the application will send an email-based confirmation of their RSVP. We'll also keep a record of what date and time they RSVPed, which will be useful if they change their RSVP several times.

## Creating a Persistent Project

Now that we have an idea of a real-world application that we'd like to build, let's use Roo to build it. The first step is to create an empty directory and load Roo:

```code
Copy$ mkdir wedding
$ cd wedding
$ roo
```

If you followed the above installation instructions, you should be greeted with the Roo logo shown below. If you don't see a message like this, please go back and check your installation is correct.

![Start logo](http://blog.springsource.com/wp-content/uploads/2009/10/00-logo.png "Start logo")

There are quite a few usability features within Roo. If you type "hint" you will be presented with step-by-step instructions. Or if you type "help" you will see all of the commands currently available (these change at different phases of your project lifecycle). Plus you can press TAB in almost all cases for completion services. If you're learning Roo, "hint" is your friend. Not only will it teach you the commands, but it will also teach you about the shell and how the keyboard features work. Get into the habit of using "hint" whenever in doubt, especially during your first few Roo projects.

Let's begin our wedding project. After you type the "create project" command into the Roo shell, you should receive the following output:

```code
Copyroo> project --topLevelPackage com.wedding
Created /home/balex/wedding/pom.xml
Created SRC_MAIN_JAVA
Created SRC_MAIN_RESOURCES
Created SRC_TEST_JAVA
Created SRC_TEST_RESOURCES
Created SRC_MAIN_WEBAPP
Created SRC_MAIN_RESOURCES/META-INF/spring
Created SRC_MAIN_RESOURCES/META-INF/spring/applicationContext.xml
```

As shown from the console output, Roo has created a Maven 2 project structure. Even if you quit Roo at this point and never reload it, at this moment you have a properly-configured Spring 3 web application, complete with [URL rewriting](http://tuckey.org/urlrewrite/), annotation-based [classpath scanning](http://static.springframework.org/spring/docs/3.0.0.M3/spring-framework-reference/html/ch04s12.html) and [dependency injection of any class](http://static.springframework.org/spring/docs/3.0.0.M3/spring-framework-reference/html/ch08s08.html#aop-atconfigurable) - even those created with the "new" keyword or via an [ORM](http://en.wikipedia.org/wiki/Object-relational_mapping) like [Hibernate](https://www.hibernate.org/). You can even use "mvn tomcat:run" and start an embedded [Tomcat](http://tomcat.apache.org/) container.

If you typed "hint" at this point, Roo would suggest you install a [JPA](http://en.wikipedia.org/wiki/Java_Persistence_API) provider and database. Let's do that now:

```code
Copyroo> persistence setup --provider HIBERNATE --database HYPERSONIC_PERSISTENT
Created SRC_MAIN_RESOURCES/META-INF/persistence.xml
Created SRC_MAIN_RESOURCES/META-INF/spring/database.properties
Managed SRC_MAIN_RESOURCES/META-INF/spring/applicationContext.xml
Managed ROOT/pom.xml
```

Notice that we've selected Hibernate and a persistent [Hypersonic](http://hsqldb.org/) database in the command. This selection happened via the TAB button, so we didn't actually need to type those commands and arguments fully. Notice also the two "Managed" statements at the bottom. These denote a file or directory Roo is managing. Roo has inbuilt file undo services, so should something go wrong, it will automatically rollback the problematic command.

Because Roo uses JPA, we enjoy the benefits of portability across different JPA implementations. If you look at the code that Roo generates, you'll see that not a single line of it is specific to a particular persistence provider. You'll also see the Roo-provided code is extremely efficient. One of the great strengths of Java is its significant performance, and Roo does everything from avoiding [reflection](http://stackoverflow.com/questions/435553/java-reflection-performance) to optimizing string operations in your [toString](http://java.sun.com/javase/6/docs/api/java/lang/Object.html#toString\(\))() methods (and everything in between) to maximise runtime performance of your applications.

As we asked for a persistent database, it is stored in ~/wedding.\* by default. There is a "database properties list" command which will show you the database configuration:

```code
Copyroo> database properties list
database.driverClassName = org.hsqldb.jdbcDriver
database.password =
database.url = jdbc:hsqldb:${user.home}/wedding
database.username = sa
```

While the default location would work just fine, let's change it to somewhere else:

```code
Copyroo> database properties set --key database.url --value jdbc:hsqldb:/home/balex/our-wedding
Managed SRC_MAIN_RESOURCES/META-INF/spring/database.properties
```

As shown by the console output, all Roo did was edit a stock-standard database.properties file. You could have just as validly edited your project files using a text editor or [IDE](http://en.wikipedia.org/wiki/Integrated_development_environment). Roo doesn't mind. It was designed from the very beginning so that you could use other tools concurrently with Roo and everything would still work properly.

One reason you might like to use a "database properties set" command via Roo is because you're making a standalone script that can be replayed later. You can use the "script filename.roo" command to execute scripts, which are simply Roo commands in a standard text file format. I've included the wedding.roo script in the Roo 1.0.0 distribution for your convenience. Note that comments can also be included in the scripts using normal Java comment syntax (//, /\* and \*/).

## Creating an Entity

Let's now create a JPA entity. This entity will be stored in our database and represent the entire domain model for our application. You can create entities using your choice of IDE, text editor or the Roo shell:

```code
Copyroo> entity --class ~.domain.Rsvp
Created SRC_MAIN_JAVA/com/wedding/domain
Created SRC_MAIN_JAVA/com/wedding/domain/Rsvp.java
Created SRC_MAIN_JAVA/com/wedding/domain/Rsvp_Roo_Entity.aj
Created SRC_MAIN_JAVA/com/wedding/domain/Rsvp_Roo_ToString.aj
Created SRC_MAIN_JAVA/com/wedding/domain/Rsvp_Roo_Configurable.aj
```

At this point I imagine some of you are wondering, "what are those .aj files?". In a nutshell, these are [AspectJ](http://eclipse.org/aspectj) [inter-type declarations](http://www.eclipse.org/aspectj/doc/released/progguide/language-interType.html) (ITDs) that very effectively deliver [separation of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns) while also maintaining compatibility with future versions of the relevant Roo add-on. The .aj files are automatically created, maintained and deleted by Roo, allowing end users to safely ignore them. Indeed STS 2.1.0+ automatically hides them by default, just like Eclipse-based IDEs hide .classpath, .project and .settings resources. After all, these resources are merely internal outputs of the tool and it's pretty rare you would even open them - let alone maintain them yourself. I'm going to talk a lot more about these and other Roo internals in my [next blog entry](http://blog.springsource.com/roo-part-3), so I'll defer further discussion until then.

You might have noticed we created the Rsvp entity within the ".domain" package. The "" character automatically expands to your project's top-level package, which you may recall we specified when originally creating the project. As such Roo fully understands the concept of Java packages, and allows you to structure your project packages in whatever way you find most intuitive.

Naturally an entity would normally contain some fields, so let's add them (Roo's output is omitted, as it simply manages the same files as listed above):

```code
Copyroo> field string code --notNull --sizeMin 1 --sizeMax 30
roo> field string email --sizeMax 30
roo> field number attending --type java.lang.Integer
roo> field string specialRequests --sizeMax 100
roo> field date confirmed --type java.util.Date
```

In the first line you'll note we use a --notNull argument, together with a --sizeMin and --sizeMax argument. These refer to the new [Bean Validation](http://jcp.org/en/jsr/detail?id=303) standard, which is otherwise known as [JSR 303](http://jcp.org/en/jsr/detail?id=303). This particular standard offers automatic web and persistence tier validation, including creating the correct [DDL](http://en.wikipedia.org/wiki/Data_Definition_Language) for the tables in your database. One of the advantages of using Roo is you gain the benefit of relevant standards like JSR 303, JPA, the [Servlet Specification](http://java.sun.com/products/servlet/download.html) and [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer) without any extra effort. Naturally you don't need to use the JSR 303 arguments if you don't wish to do so.

Another point to note from the above field commands is we didn't specify which entity we wanted to insert the fields into. Roo automatically determines you probably want to add the fields to Rsvp, as that's the last entity you worked with. You could also specify an "--class ~.SomeEntity" argument if you wish to be explicit or target the fields at another entity (in which case that entity will become the default for subsequent entity-related commands).

## Proving it Works: JUnit, Web Tier and Selenium

By now we have an application that would actually work if we deployed it. But don't take my word for it - let's add a couple of features so that you can try the application out for yourself.

Let's start with [JUnit](http://www.junit.org/) integration tests. You can obtain an integration test with one command:

```code
Copyroo> test integration
Created SRC_TEST_JAVA/com/wedding/domain
Created SRC_TEST_JAVA/com/wedding/domain/RsvpDataOnDemand.java
Created SRC_TEST_JAVA/com/wedding/domain/RsvpIntegrationTest.java
Created SRC_TEST_JAVA/com/wedding/domain/RsvpDataOnDemand_Roo_Configurable.aj
Created SRC_TEST_JAVA/com/wedding/domain/RsvpDataOnDemand_Roo_DataOnDemand.aj
Created SRC_TEST_JAVA/com/wedding/domain/RsvpIntegrationTest_Roo_Configurable.aj
Created SRC_TEST_JAVA/com/wedding/domain/RsvpIntegrationTest_Roo_IntegrationTest.aj
```

This integration test will verify the common JPA operations like persist, remove, find, merge etc all work. A total of eight tests are performed per entity, and all build on Spring Framework's extensive [integration test infrastructure](http://static.springframework.org/spring/docs/3.0.0.M3/spring-framework-reference/html/ch10s03.html). While we could run the integration tests at this stage, it's trivial to add a web tier as well:

```code
Copyroo> controller scaffold ~.web.RsvpController
Created SRC_MAIN_JAVA/com/wedding/web
Created SRC_MAIN_JAVA/com/wedding/web/RsvpController.java
Created SRC_MAIN_WEBAPP/WEB-INF/config
Created SRC_MAIN_WEBAPP/WEB-INF/config/webmvc-config.xml
Created SRC_MAIN_JAVA/com/wedding/web/RsvpController_Roo_Controller.aj
Created SRC_MAIN_WEBAPP/images
Created SRC_MAIN_WEBAPP/images/banner-graphic.png
Created SRC_MAIN_WEBAPP/images/springsource-logo.png
Created SRC_MAIN_WEBAPP/images/resultset_first.png
Created SRC_MAIN_WEBAPP/images/resultset_next.png
Created SRC_MAIN_WEBAPP/images/resultset_previous.png
Created SRC_MAIN_WEBAPP/images/resultset_last.png
Created SRC_MAIN_WEBAPP/images/us.png
Created SRC_MAIN_WEBAPP/images/de.png
Created SRC_MAIN_WEBAPP/images/list.png
Created SRC_MAIN_WEBAPP/images/add.png
Created SRC_MAIN_WEBAPP/styles
Created SRC_MAIN_WEBAPP/styles/roo-menu-left.css
Created SRC_MAIN_WEBAPP/styles/roo-menu-right.css
Created SRC_MAIN_WEBAPP/WEB-INF/classes
Created SRC_MAIN_WEBAPP/WEB-INF/classes/left.properties
Created SRC_MAIN_WEBAPP/WEB-INF/classes/right.properties
Created SRC_MAIN_WEBAPP/WEB-INF/layouts
Created SRC_MAIN_WEBAPP/WEB-INF/layouts/layouts.xml
Created SRC_MAIN_WEBAPP/WEB-INF/layouts/default.jspx
Created SRC_MAIN_WEBAPP/WEB-INF/views
Created SRC_MAIN_WEBAPP/WEB-INF/views/dataAccessFailure.jspx
Created SRC_MAIN_WEBAPP/WEB-INF/views/resourceNotFound.jspx
Created SRC_MAIN_WEBAPP/WEB-INF/views/uncaughtException.jspx
Created SRC_MAIN_WEBAPP/WEB-INF/views/index.jspx
Created SRC_MAIN_WEBAPP/WEB-INF/views/views.xml
Created SRC_MAIN_WEBAPP/WEB-INF/tags
Created SRC_MAIN_WEBAPP/WEB-INF/tags/pagination.tagx
Created SRC_MAIN_WEBAPP/WEB-INF/tags/language.tagx
Created SRC_MAIN_WEBAPP/WEB-INF/tags/theme.tagx
Created SRC_MAIN_WEBAPP/WEB-INF/i18n
Created SRC_MAIN_WEBAPP/WEB-INF/i18n/messages.properties
Managed SRC_MAIN_WEBAPP/WEB-INF/i18n/messages.properties
Created SRC_MAIN_WEBAPP/WEB-INF/i18n/messages_de.properties
Managed SRC_MAIN_WEBAPP/WEB-INF/i18n/messages_de.properties
Created SRC_MAIN_WEBAPP/images/show.png
Created SRC_MAIN_WEBAPP/images/update.png
Created SRC_MAIN_WEBAPP/images/delete.png
Created SRC_MAIN_WEBAPP/WEB-INF/views/rsvp
Managed SRC_MAIN_WEBAPP/WEB-INF/config/webmvc-config.xml
Created SRC_MAIN_WEBAPP/WEB-INF/views/rsvp/list.jspx
Created SRC_MAIN_WEBAPP/WEB-INF/views/rsvp/show.jspx
Created SRC_MAIN_WEBAPP/WEB-INF/views/rsvp/create.jspx
Created SRC_MAIN_WEBAPP/WEB-INF/views/menu.jspx
Managed SRC_MAIN_WEBAPP/WEB-INF/views/menu.jspx
Created SRC_MAIN_WEBAPP/WEB-INF/views/rsvp/update.jspx
Managed SRC_MAIN_WEBAPP/WEB-INF/views/menu.jspx
Created SRC_MAIN_WEBAPP/WEB-INF/views/rsvp/views.xml
Created SRC_MAIN_WEBAPP/WEB-INF/urlrewrite.xml
Created SRC_MAIN_WEBAPP/WEB-INF/web.xml
Managed SRC_MAIN_WEBAPP/WEB-INF/web.xml
Managed ROOT/pom.xml
```

The automatic web tier provided by Roo builds on Spring Framework 3's excellent [REST support](http://static.springframework.org/spring/docs/3.0.0.M3/spring-framework-reference/html/ch18.html). All endpoints are completely RESTful and use clean, properly-formed URLs. Roo's automatic web tiers are useful in a number of situations, in particular:

-   Programmatic access via REST clients
-   Administrative section of an application
-   To serve as a template for your manually-created controllers and JSPs

Let's wrap up with a Selenium test, which will actually verify our new RsvpController works:

```code
Copyroo> selenium test --controller ~.web.RsvpController
Created SRC_MAIN_WEBAPP/selenium
Created SRC_MAIN_WEBAPP/selenium/test-rsvp.xhtml
Created SRC_MAIN_WEBAPP/selenium/test-suite.xhtml
Managed SRC_MAIN_WEBAPP/WEB-INF/views/menu.jspx
Managed ROOT/pom.xml
```

Okay, let's see the application in action by running the following commands:

```code
Copyroo> perform test
 (Maven console output condensed)
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running com.wedding.domain.RsvpIntegrationTest
Tests run: 9, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 2.726 sec
roo> quit
$ mvn tomcat:run
```

You can now use your browser to visit [](http://localhost:8080/wedding)[http://localhost:8080/wedding](http://localhost:8080/wedding). When you're ready to test the web tier, leave the Tomcat server running and then execute the following command:

```code
Copy$ mvn selenium:selenese
```

During execution of the Selenium tests, you should see an image similar to:

![Selenium screet shot](http://blog.springsource.com/wp-content/uploads/2009/05/02-selenium.png "Selenium screet shot")

## Security and Logging

So far we've created our wedding application, ran some integration tests, played around with it in a web browser, and verified correct operation of the web tier using automated Selenium testing. The next step is to fine-tune the [Log4J](http://logging.apache.org/log4j/)\-based logging:

```code
Copyroo> logging setup --package WEB --level DEBUG
Created SRC_MAIN_RESOURCES/META-INF/spring/log4j.properties
Managed SRC_MAIN_WEBAPP/WEB-INF/web.xml
```

Let's now turn our attention to security. At present anyone can access our web site and use the existing RESTful administrative backend to create, update and delete RSVPs. Recall from the application requirements that we wanted to use invitations codes (printed on the back of the cards) to ensure only invited guests can RSVP. Fortunately, [Spring Security](http://www.springsource.org/spring-security/) offers us a very fast way of satisfying this requirement, and Roo can install Spring Security in one line:

```code
Copyroo> security setup
Managed ROOT/pom.xml
Created SRC_MAIN_RESOURCES/META-INF/spring/applicationContext-security.xml
Created SRC_MAIN_WEBAPP/WEB-INF/views/login.jspx
Managed SRC_MAIN_WEBAPP/WEB-INF/views/views.xml
Managed SRC_MAIN_WEBAPP/WEB-INF/web.xml
```

There are also similar commands like "web flow" and "jms setup", but we're not going to explore them in this blog entry. You can expect to see many more "install" commands in future versions of Roo (and you're welcome to add installer requests to the [Roo issue tracker](http://jira.springframework.org/browse/ROO)).

## Manual Controllers, Dynamic Finders and Email Support

As mentioned above, our automatic web tier is perfectly suitable for the administrative backend of our application. But we also need a portion of the application this is suitable for prospective guests to use. This portion of the application must understand the relationship between invitation codes, managing RSVPs and sending emails. Because these requirements will require some programming, let's build a new controller:

```code
Copyroo> controller class --class ~.web.PublicRsvpController
Created SRC_MAIN_JAVA/com/wedding/web/PublicRsvpController.java
Managed SRC_MAIN_WEBAPP/WEB-INF/web.xml
Managed ROOT/pom.xml
```

The PublicRsvpController will respond to HTTP GET and POST requests. Two stubbed methods for these operations have automatically been provided in the PublicRsvpController.java source file.

If we consider the GET use case, our objective is to retrieve the correct RSVP for a particular invitation code. The way this will work is Spring Security will require people to login to use the application, and we'll treat each invitation code as a unique login name. As such, the GET method needs to obtain the currently logged on user's name from Spring Security and then retrieve the corresponding RSVP from the database. Normally you'd go and write a JPA QL query at this point to obtain the specific Rsvp instance that has the matching code, but because you're using Roo you can save yourself the trouble and instead use a dynamic finder.

Dynamic finders provide you with an almost unlimited range of pre-canned queries. These queries all internally use JPA QL, delivering maximum standards-based compatibility and portability. All dynamic finders (and other Roo methods) are implemented as properly-formed, type-safe Java methods - bringing all the normal advantages of familiarity, IDE code assist, debugger integration and significant runtime performance. You can list the available dynamic finders using a command such as this:

```code
Copyroo> finder list --class ~.domain.Rsvp --filter code,equ
findRsvpsByCodeEquals(String code)
findRsvpsByCodeNotEquals(String code)
```

Note the "--filter" argument is limiting the output to only those proposed method signatures that contain the "code" and "equ" strings. You can instruct Roo you'd like to see more combinations by omitting the "-filter" argument, or specifying "-depth 2" (or 3, 4 etc if you'd like more properties involved in your query).

Once you find the dynamic finder you'd like to use, simply add it:

```code
Copyroo> finder add --finderName findRsvpsByCodeEquals
Managed SRC_MAIN_JAVA/com/wedding/domain/Rsvp.java
Created SRC_MAIN_JAVA/com/wedding/domain/Rsvp_Roo_Finder.aj
Managed SRC_MAIN_JAVA/com/wedding/web/RsvpController_Roo_Controller.aj
Created SRC_MAIN_WEBAPP/WEB-INF/views/rsvp/findRsvpsByCodeEquals.jspx
Managed SRC_MAIN_WEBAPP/WEB-INF/views/menu.jspx
Managed SRC_MAIN_WEBAPP/WEB-INF/views/rsvp/views.xml
```

If we consider the POST use case for our PublicRsvpController, our requirements specified that we should send our guests an email to confirm their RSVP. Normally we'd pull out the Spring reference guide and locate the section on configuring email support, but instead we'll just ask Roo to deal with it for us:

```code
Copyroo> email sender setup --hostServer 127.0.0.1
Created SRC_MAIN_RESOURCES/META-INF/spring/email.properties
Managed SRC_MAIN_RESOURCES/META-INF/spring/applicationContext.xml
Managed ROOT/pom.xml
roo> field email template --class ~.web.PublicRsvpController
Managed SRC_MAIN_JAVA/com/wedding/web/PublicRsvpController.java
Managed SRC_MAIN_RESOURCES/META-INF/spring/applicationContext.xml
Managed SRC_MAIN_JAVA/com/wedding/web/PublicRsvpController.java
```

The final command added a Spring [MailSender](http://static.springframework.org/spring/docs/3.0.0.M3/javadoc-api/org/springframework/mail/MailSender.html) field to PublicRsvpController, plus provided a method that shows us how to use it.

While on the topic of email integration, my colleague [Stefan Schmidt](http://twitter.com/schmidtstefan) has just published a separate [blog entry](http://stsmedia.net/introducing-spring-roo-part-2-security-jms-email-support/) showing how to use the Roo email and JMS add-ons together. The article shows you more advanced configuration options, such as how to use Gmail to send your email messages.

## IDE Integration

We've now reached the point where you can use Eclipse/STS to finish the application off. Let's import the application into Eclipse/STS:

```code
Copyroo> perform eclipse
 (Maven console output condensed)
```

Finally, let's import the project into Eclipse/STS. You do this by loading Eclipse/STS, then selecting File > Import > Existing Projects into Workspace, and selecting the project's directory. If you're not using STS 2.3.0 or above, ensure you have separately installed AJDT 1.6.5 or above. When prompted by AJDT whether you'd like to enable JDT weaving, select to enable weaving. This will result in a better Roo experience when using Eclipse's Java editor.

## Final Steps

We're now going to change several files using Eclipse/STS. The following screen shot shows the project structure we'll ultimately end up with, and I've highlighted those files we'll be changing: ![structure](http://blog.springsource.com/wp-content/uploads/2009/10/structure.png "structure")

Start by editing applicationContext-security.xml. Make some minor changes so that it resembles the following file:

```xml
Copy
    <http auto-config="true" use-expressions="true">
    	<form-login login-processing-url="/static/j_spring_security_check" login-page="/login" authentication-failure-url="/login?login_error=t"/>
        <logout logout-url="/static/j_spring_security_logout"/>
        <intercept-url pattern="/rsvp/**" access="hasRole('ROLE_ADMIN')"/>
        <intercept-url pattern="/resources/**" access="permitAll" />
        <intercept-url pattern="/static/**" access="permitAll" />
        <intercept-url pattern="/login**" access="permitAll" />
        <intercept-url pattern="/**" access="isAuthenticated()" />
    </http>

    <authentication-manager alias="authenticationManager">
    	<authentication-provider>
	        <user-service>
	            <user name="admin1234" password="ignored" authorities="ROLE_ADMIN"/>
		        <user name="user12345" password="ignored" authorities="ROLE_USER"/>
		        <user name="user67890" password="ignored" authorities="ROLE_USER"/>
		    </user-service>
    	</authentication-provider>
	</authentication-manager>
```

The file above shows that the invitation codes are actually usernames, and we're ignoring passwords. Spring Security doesn't realize we're ignoring passwords, so we need to edit the src/main/webapp/WEB-INF/views/login.jspx and add an <input name="j\_password" type="hidden" value="ignored"/> line within the form. Of course, the existing <div> containing the "j\_password" label and input element should be deleted. Some appropriate text within the login.jsp explaining to guests where on the card they can find their invitation code should also be added to this file.

Security is now setup. Let's now open the PublicRsvpController.java file. As shown, Roo has already stubbed the email features, and provided you empty Spring MVC methods to complete. This is the only actual Java programming required in the entire application, and because these use the normal features of [Spring MVC](http://static.springframework.org/spring/docs/3.0.0.M3/spring-framework-reference/html/ch16.html) and Spring's MailSender class, I won't discuss them further here:

```java
Copy
@RequestMapping("/publicrsvp/**")
@Controller
@SessionAttributes("rsvp")
public class PublicRsvpController {

    @Autowired
    private transient MailSender mailTemplate;

    @RequestMapping
    public String get(ModelMap modelMap) {
    	modelMap.put("rsvp", getRsvp());
    	return "publicrsvp";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String post(@ModelAttribute("rsvp") Rsvp rsvp, ModelMap modelMap) {
  	rsvp.setConfirmed(new Date());
        if (rsvp.getId() == null) {
        	rsvp.persist();
        } else {
        	rsvp.merge();
        }
    	if (rsvp.getEmail().length() > 0) {
        	sendMessage("Ben Alex <ben.alex@springsource.com>", "RSVP to our wedding", rsvp.getEmail(), "Your RSVP has been saved: " + rsvp.toString());
    	}
    	modelMap.put("rsvp", rsvp);
    	return "thanks";
    }

    private Rsvp getRsvp() {
    	Rsvp rsvp = new Rsvp();
    	try {
        	String code = SecurityContextHolder.getContext().getAuthentication().getName();
        	rsvp.setCode(code);
    		// Cast due to http://java.sun.com/javaee/5/docs/api/javax/persistence/Query.html#getSingleResult()
    		rsvp = (Rsvp) Rsvp.findRsvpsByCodeEquals(code).getSingleResult();
    	} catch (DataAccessException ignored) { /* no Rsvp for this code was found, so start a new Rsvp */ }
    	return rsvp;
    }

    private void sendMessage(String mailFrom, String subject, String mailTo, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(mailFrom);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setTo(mailTo);
        simpleMailMessage.setText(message);
        mailTemplate.send(simpleMailMessage);
    }
}
```

Note in the "get" and "post" methods we return a string, which should correlate with the JSP view name we would like rendered. As such our next step is to provide those two JSPs. Fortunately Roo built some JSP files that will serve as useful templates.

First rename src/main/webapp/WEB-INF/index.jsp to thanks.jsp. This will be the page displayed when the "post" method returns. You probably want to add something like, "Your RSVP has been confirmed: ${rsvp}".

Next copy src/main/webapp/WEB-INF/views/rsvp/create.jspx to src/main/webapp/WEB-INF/views/publicrsvp.jspx. This page should then be edited. You can safely delete the "code" and "confirmed" sections, as both are taken care of by the PublicRsvpController. You should also change the "form\_url" variable assignment to <c:url value="/publicrsvp" var="form\_url"/>.

Because Spring Roo uses Tiles to allow easy branding of each web view, you need to edit the src/main/webapp/WEB-INF/views/views.xml file. You need to rename the "index" definition to "thanks", and also add a new definition for "publicrsvp" to the new publicrsvp.jspx. The final file should resemble:

```xml
Copy
<tiles-definitions>

	<definition extends="public" name="thanks">
		<put-attribute name="body" value="/WEB-INF/views/thanks.jspx"/>
	</definition>

	<definition extends="public" name="dataAccessFailure">
		<put-attribute name="body" value="/WEB-INF/views/dataAccessFailure.jspx"/>
	</definition>

	<definition extends="public" name="resourceNotFound">
		<put-attribute name="body" value="/WEB-INF/views/resourceNotFound.jspx"/>
	</definition>

	<definition extends="public" name="uncaughtException">
		<put-attribute name="body" value="/WEB-INF/views/uncaughtException.jspx"/>
	</definition>

	<definition extends="public" name="login">
        <put-attribute name="body" value="/WEB-INF/views/login.jspx"/>
    </definition>

	<definition extends="public" name="publicrsvp">
        <put-attribute name="body" value="/WEB-INF/views/publicrsvp.jspx"/>
    </definition>

</tiles-definitions>
```

The very last step is to edit src/main/webapp/WEB-INF/urlrewrite.xml and change the URL rewrite rule for /. The /app/index should be modified to /app/publicrsvp/, which indicates to perform a GET of the new PublicRsvpController by default.

You should now be ready to test deployment. You have several options:

-   Use "mvn tomcat:run" from the command line
-   Right-click the project within Eclipse/STS and select Run As > Run on Server
-   Right-click the project within STS and select Spring Tools > Open Roo Shell, then type "deploy --server someServer"

When you now visit [http://localhost:8080/wedding](http://localhost:8080/wedding), you will be prompted for your invitation code. Use one of the usernames listed in the applicationContext-security.xml file above. RSVP a few times, and you'll see the application correctly retrieves your previous RSVP record. You'll also see that it sends you an email, assuming you type an email address and have a properly configured SMTP server (edit mail.properties if you wish to change the [SMTP](http://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) server details). Login as the administrative user and you will see that you can access all RSVP records, change them and so on.

Naturally at this stage we'd normally tidy up the look and feel of publicly-visible parts of the application. Then we'd run "perform package" to provide a WAR that is ready to deploy to a production server environment such as [SpringSource tc Server](http://www.springsource.com/products/tcserver) or [SpringSource dm Server](http://www.springsource.com/products/dmserver).

## Conclusion

In this blog entry we covered the steps required to install Roo, use its shell, and rapidly build a realistic application that features:

-   A best practice Spring Framework 3-based application architecture
-   Maven 2-based project structure
-   JPA-based persistence, in this case using Hibernate
-   Database storage to a custom Hypersonic file location
-   Bean Validation (JSR 303) support, including propagation of the constraints down to database DDL
-   Automated JUnit integration tests that build on Spring Framework's integration test features
-   An automated RESTful application backend
-   Automated Selenium tests of your web tier
-   Dynamic finders that serve a practical use case in our application
-   Spring Security integration, including web URL security and a customised login page
-   Email transmission (read more about emailing via Roo in Stefan's [blog entry](http://stsmedia.net/introducing-spring-roo-part-2-security-jms-email-support/))
-   Log4J configuration support
-   URL rewriting that keeps the URLs clean and RESTful
-   A manual web controller
-   Embedded Tomcat server container usage
-   Eclipse and STS integration

We'll be adding a lot of additional capabilities to Roo over the coming weeks and months, and my next blog posting will cover Roo's internals and architecture. In the meantime we very much welcome your Roo comments, experiences and feedback. The [community forum](http://forum.springsource.org/forumdisplay.php?f=67) is a great place to ask questions, and you can also [follow](http://twitter.com/benalexau) [us](http://twitter.com/schmidtstefan) [on](http://search.twitter.com/search?q=%23roo) Twitter. We hope that you enjoy using [Spring Roo](http://www.springsource.org/roo).