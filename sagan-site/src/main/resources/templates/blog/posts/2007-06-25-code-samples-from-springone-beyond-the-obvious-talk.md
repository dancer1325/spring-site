---
title: Code samples from SpringOne \'Beyond the obvious\' talk
source: https://spring.io/blog/2007/06/25/code-samples-from-springone-beyond-the-obvious-talk
scraped: 2026-02-24T09:27:18.921Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Joris Kuipers |  June 25, 2007 | 0 Comments
---

# Code samples from SpringOne 'Beyond the obvious' talk

_Engineering | Joris Kuipers |  June 25, 2007 | 0 Comments_

Last week at SpringOne, Alef and I gave a talk on dealing with complex applications using Spring. Complexity in this case was considered both at the structural and dynamic level. As for the structural part of the talk, I covered that one in my [previous blog posting](http://blog.interface21.com/main/2007/06/11/using-a-shared-parent-application-context-in-a-multi-war-spring-application/). The dynamic part explained some possible solutions to deal with differences between your deployment environments. (testing, acceptance, production, etc.) A lot of people asked me if I could provide them with the source of the demonstrations I gave during the talk. I've attached the sources to this blog entry and will explain briefly how this all works. Hopefully the talk itself will eventually become available on [parleys.com](http://parleys.com) later this year, so you can get some more background information on the topic.

#### Environmental Awareness: Support your runtime environment

In the talk I argued that dealing with differences between your environments by using custom build scripts that generate deployment units per environment comes with several disadvantages. One of those is that you cannot reuse your build artifacts (war or ear files) when your application promotes from for example your acceptance environment to your production environment. In order to address these disadvantages, you have to make your application *environment aware*: come up with some way to determine in what environment your app is running and then configure your app to react to that.

There are several ways to do this: in a Spring-application, the obvious way to enable environment-dependent behaviour is to have different bean definitions for each environment that requires non-default configuration. I've shown three ways to do that:

-   The first is to load extra context configuration files for certain environments. By using bean definition [inheritance](http://static.springframework.org/spring/docs/2.0.x/reference/beans.html#beans-child-bean-definitions) and overrides you can then take the appropriate actions at configuration time. When you use a ContextLoaderListener to configure your web application context, this requires some extra code, which is shown in the web project in the attached samples. BTW, credits for this idea should go to a former colleague of mine (Ezra, thanks!)
-   The second is to use [JavaConfig](http://www.springframework.org/javaconfig) instead of XML to define your environment-dependent beans. Where you determine what beans to create is then moved from determining what config files to load to your JavaConfig class.
-   The last sample combines the previous two to determine what JavaConfig class to use, where subclasses that extend a common base configuration are created for each environment. This showcases the power of having your configuration in an actual class: you can use regular java inheritance and polymorphism, which blurs the distinction between bean definition inheritance and class inheritance.

Other ways could include custom [FactoryBean](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/beans/factory/FactoryBean.html)\-implementations, for example.

#### The samples

The samples demonstrate the use of a simple service and dao that find a Person's last name by first name. In the default case, only two persons are defined (Alef and I). In a development environment, we'll use a static dao implementation instead that always returns a [John Doe](http://en.wikipedia.org/wiki/John_Doe). In an acceptance environment, a third person (our collegue Arjen) is defined. The integration tests check if the correct behaviour is exposed by our application in each environment.

There are several ways you can check in what environment your application is running: for these samples, I've used a system property that is being used by the EnvironmentUtils class. Other ways could be to examine the database or a JNDI registry, for example.

Instead of just zipping up my Eclipse workspace, I've created a [Maven sample](http://blog.interface21.com/main/wp-content/uploads/2007/06/multi-env-samples.zip) *UPDATE*: Dave Turanski kindly [updated the example](http://blog.springsource.com/wp-content/uploads/2010/08/multi-env-maven.zip) to Spring 3.0: several people have tried to convince me to give Maven a second chance lately, after I had turned away from it in disgust a couple of years ago. I have to admit that Maven 2 is actually a lot better than Maven 1, although the generation of Eclipse workspace artifacts for web projects could use some improvement (like WTP 2 support). I missed some other stuff too, but that's probably just an utter lack of experience on my part. The good thing is that I now do not have to package all the dependencies in my sample.

After installing Maven, you can run the sample tests by running 'mvn test' from the root directory. To generate Eclipse projects from the samples, run the following command: 'mvn -DdownloadSources=true eclipse:eclipse'. To build the jars and war, use 'mvn package' or 'mvn install' to also add the build artifacts to your local repository.

The war contains a single servlet accessible as '/\[context-root\]/env': to see the difference for each environment, start your servlet container with a system property called 'app.env' which holds the environment letter (D, T, A or P). So, -Dapp.env=D added to the startup line of your server would cause the application to run in development mode, which means that all last names returned will be 'Doe'.