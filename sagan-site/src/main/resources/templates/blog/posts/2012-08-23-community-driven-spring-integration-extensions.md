---
title: Community-Driven Spring Integration Extensions
source: https://spring.io/blog/2012/08/23/community-driven-spring-integration-extensions
scraped: 2026-02-24T08:17:46.838Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Gunnar Hillert |  August 23, 2012 | 0 Comments
---

# Community-Driven Spring Integration Extensions

_Engineering | Gunnar Hillert |  August 23, 2012 | 0 Comments_

The Spring Integration team proudly announces the availability of the *Spring Integration Extensions* repository. The main goal for this new [GitHub](http://www.github.com)\-based repository is to promote a vibrant community of adapter and extension developers, and to encourage a broader segment of the community to contribute to the project. The Spring Integration Extensions project is hosted at:

-   [https://github.com/SpringSource/spring-integration-extensions](https://github.com/SpringSource/spring-integration-extensions)

This new repository will give us the flexibility to incorporate new contributions much more rapidly, without having to go through the core Spring Integration framework’s stricter vetting process. Since each community contributed extension is a separate project in the [Spring Integration Extensions](https://github.com/SpringSource/spring-integration-extensions) repository, it will have its own release life-cycle independent from the one that governs the core Spring Integration framework. As a result, this will allow for more frequent releases.

Over time, we expect that some of the lesser used Spring Integration modules may transition into the Extensions repository. On the other hand, for some extension modules, the [Spring Integration Extensions](https://github.com/SpringSource/spring-integration-extensions) project may also serve as an incubator, whereby they may eventually be incorporated into the core Spring Integration framework.

Thanks to several community contributions, the new repository already provides several adapters such as the [XQuery Adapter](https://github.com/SpringSource/spring-integration-extensions/tree/master/spring-integration-xquery) (incl. support for [XPath 2.0](http://en.wikipedia.org/wiki/XPath_2.0)) and the [SMB Adapter](https://github.com/SpringSource/spring-integration-extensions/tree/master/spring-integration-smb). Several adapters around [Amazon Web Services](http://aws.amazon.com/) (AWS) will be added in the coming weeks ([Amazon S3](http://aws.amazon.com/s3/), [Amazon SNS](http://aws.amazon.com/sns/), [Amazon SQS](http://aws.amazon.com/sqs/)). Furthermore, we are providing an early version of a [Print Adapter](https://github.com/SpringSource/spring-integration-extensions/tree/master/spring-integration-print) and we are also working on an adapter providing [WebSocket](http://www.html5rocks.com/en/tutorials/websockets/basics/) support using [Atmosphere](https://github.com/Atmosphere/atmosphere).

## How Can I Become a Contributor?

If you have an idea regarding new extensions and/or adapters, please feel free to file a [JIRA](https://jira.springsource.org/browse/INTEXT) ticket. If you have already created an extension module and you want to contribute code, please fork the [Spring Integration Extensions](https://github.com/SpringSource/spring-integration-extensions) repository, add your module and issue a [pull request](https://help.github.com/articles/using-pull-requests). Before we can merge your code, though, you have to fill out the [Contributor License Agreement](https://support.springsource.com/spring_committer_signup). Once submitted, we and/or other community members will review your [pull request](https://help.github.com/articles/using-pull-requests) and merge it. For much more detailed information, please take a closer look at the [Contributor Guidelines](https://github.com/SpringSource/spring-integration-extensions/wiki/Contributor-Guidelines) for the Spring Integration Extensions project.

## Creating New Spring Integration Extension Modules

One of the more popular extension types are Spring Integration Adapters. In order to simplify the process of writing custom adapters for [Spring Integration](https://github.com/SpringSource/spring-integration), we now provide an *Adapter Template* for [SpringSource Tool Suite](http://www.springsource.org/sts) (STS) 3.0.0. This template will make it very easy for contributors to build out new adapters quickly, while still ensuring consistency with those provided in the core Spring Integration framework (package structure, naming conventions, namespace handlers/parsers, etc).

The *Spring Integration Adapter Template*, which is part of the [Spring Integration Templates](https://github.com/SpringSource/spring-integration-templates/tree/master/si-sts-templates) project, creates a fully functional *Spring Integration Module*, and the template will create the following commonly used components:

-   Inbound Channel Adapter
-   Outbound Channel Adapter
-   Outbound Gateway

The template will not only create the core Java classes and some basic unit tests, but it will also provide XML Namespace support, which includes the XML Schema and the associated parser classes. Even if you create other types of components, this template should still give you valuable insights into how to develop those. For more information on using STS Templates for Spring Integration, please see the following blog posting:

-   [Creating Spring Integration Projects Using STS](http://blog.springsource.org/2012/04/09/create-spring-integration-projects-using-sts/).

The created adapter project will use [Gradle](http://www.gradle.org/) as its build tool, and it closely follows the build tasks as defined for *Spring Integration*:

##### Build the Adapter project

```xml
Copy
    $ ./gradlew build
```

##### Install the Adapter project to your local Maven repository

```xml
Copy
    $ ./gradlew install
```

##### Generate the JavaDoc

```xml
Copy
    $ ./gradlew api
```

##### Generate metrics using [Sonar](http://www.sonarsource.org/)

```xml
Copy
    $ ./gradlew sonar
```

##### Build the complete distribution

```xml
Copy
    $ ./gradlew dist
```

For more information please see [How to Create New Components](https://github.com/SpringSource/spring-integration-extensions/wiki/How-to-Create-New-Components) on the Spring Integration Extensions Wiki.

## Further Resources

-   [JIRA](https://jira.springsource.org/browse/INTEXT)
-   [Forums](http://forum.springsource.org/forumdisplay.php?42-Integration)
-   [Build Server](https://build.springsource.org/browse/INTEXT)
-   [Metrics](https://sonar.springsource.org/)

## Spring Integration GitHub Repositories

For completeness, here is a list of all Spring Integration relevant GitHub repositories:

-   [Spring Integration](https://github.com/SpringSource/spring-integration)
-   [Spring Integration Extensions](https://github.com/SpringSource/spring-integration-extensions)
-   [Spring Integration Samples](https://github.com/SpringSource/spring-integration-samples)
-   [Spring Integration Templates](https://github.com/SpringSource/spring-integration-templates/tree/master/si-sts-templates)
-   [Spring Integration Dsl Groovy](https://github.com/SpringSource/spring-integration-dsl-groovy)
-   [Spring Integration Dsl Scala](https://github.com/SpringSource/spring-integration-dsl-scala)