---
title: Obtaining Spring 3 Artifacts with Maven
source: https://spring.io/blog/2009/12/02/obtaining-spring-3-artifacts-with-maven
scraped: 2026-02-24T09:01:49.725Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  December 02, 2009 | 0 Comments
---

# Obtaining Spring 3 Artifacts with Maven

_Engineering | Keith Donald |  December 02, 2009 | 0 Comments_

A [recent commentor](http://blog.springsource.com/2009/11/13/spring-framework-3-0-rc2-released/#comment-169626) here ragged, "It's only half of the world that's using Maven", when pointing out it is not obvious how to obtain Spring 3 artifacts with Maven. In this entry, I'll show you how to do this and what the options are. This information will also be integrated into the reference documentation of the upcoming Spring 3 final release.

## Maven Repositories where Spring Artifacts are Published

In general, Spring publishes its artifacts to two different places:

1.  [Maven Central](http://repo1.maven.org/maven2), which is the default repository Maven queries, and does not require any special configuration to use
2.  [The Enterprise Bundle Repository](http://www.springsource.com/repository) (EBR), which is run by SpringSource and also hosts all the libraries that integrate with Spring

So the first thing you need to decide when obtaining Spring with Maven is which place you'll get it from. In general, *if you care about OSGi*, use the EBR, since it houses *OSGi compatible* artifacts for all of Spring's dependencies, such as Hibernate and Freemarker. If OSGi does not matter to you, either place works, though there are some pros and cons between them. In general, pick one place or the other for your project; do not mix them. This is particularly important since EBR artifacts use a different naming convention than Maven Central artifacts.

Below is a table that compares Maven Central to the EBR in several areas:

Feature

Maven Central

Enterprise Bundle Repository (EBR)

**OSGi Compatible**

No

Yes

**Number of Artifacts**

Tens of thousands; all kinds

Hundreds; those that Spring integrates/supports

**Consistent Naming Conventions for all Artifacts?**

No

Yes

**Artifact Naming Convention**

**Group id** Varies; newer artifacts use domain name e.g. "org.sl4j"; older artifacts use artifact id e.g. "log4j" **Artifact id** Varies; typically the JAR file name minus extension e.g. "log4j" **Version** Varies; most use numbers and dots e.g. "3.0.0"

**Group id** <Domain name> e.g. "org.springframework" **Artifact id** <Bundle-SymbolicName>, derived from main package e.g. "org.springframework.beans". If the JAR had to be patched to ensure OSGi compliance, "com.springsource." is prepended e.g. "com.springsource.org.apache.log4j" **Version** OSGi version number format of <major>.<minor>.<micro>\[.qualifier\] e.g. "3.0.0.RC3"

**Publishing**

Automatic (rSync via remote repositories)

Manual (JIRA processed by SpringSource)

**Quality Assurance**

None I am aware of; Accuracy is responsibility of publishing organization

Extensive (for both MANIFEST.mf and .pom); QA is performed by Spring Team

**Hosting**

@ Contegix funded by Sonatype with several mirrors

S3 funded by SpringSource

**Search Utilities**

[Various](http://maven.apache.org/general.html#How_to_find_dependencies)

[www.springsource.com/repository](http://www.springsource.com/repository)

**Integrated with SpringSource Tools (STS, Roo, etc)**

Yes, with STS and Roo

Yes, with STS

Now that you know the options, I'll discuss how to obtain Spring artifacts from both places.

## Obtaining Spring Releases From Maven Central

You do not have to add a repository to your .pom to obtain *final* releases of Spring projects from Maven Central. Simply add the dependencies your project requires.

A .pom <dependency> snippet for each Spring Framework 3 artifact as it will be indexed in Maven Central is listed below.

```xml
Copy

<!-- Shared version number properties -->
<properties>
    <org.springframework.version>3.0.5.RELEASE</org.springframework.version>
</properties>

<!--
    Core utilities used by other modules.
    Define this if you use Spring Utility APIs (org.springframework.core.*/org.springframework.util.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-core</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Expression Language (depends on spring-core)
    Define this if you use Spring Expression APIs (org.springframework.expression.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-expression</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!-- 
    Bean Factory and JavaBeans utilities (depends on spring-core)
    Define this if you use Spring Bean APIs (org.springframework.beans.*) 
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-beans</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Aspect Oriented Programming (AOP) Framework (depends on spring-core, spring-beans)
    Define this if you use Spring AOP APIs (org.springframework.aop.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-aop</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Application Context (depends on spring-core, spring-expression, spring-aop, spring-beans) 
    This is the central artifact for Spring's Dependency Injection Container and is generally always defined
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Various Application Context utilities, including EhCache, JavaMail, Quartz, and Freemarker integration
    Define this if you need any of these integrations
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context-support</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Transaction Management Abstraction (depends on spring-core, spring-beans, spring-aop, spring-context)
    Define this if you use Spring Transactions or DAO Exception Hierarchy
    (org.springframework.transaction.*/org.springframework.dao.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-tx</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    JDBC Data Access Library (depends on spring-core, spring-beans, spring-context, spring-tx)
    Define this if you use Spring's JdbcTemplate API (org.springframework.jdbc.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-jdbc</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Object-to-Relation-Mapping (ORM) integration with Hibernate, JPA, and iBatis.
    (depends on spring-core, spring-beans, spring-context, spring-tx)
    Define this if you need ORM (org.springframework.orm.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-orm</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Object-to-XML Mapping (OXM) abstraction and integration with JAXB, JiBX, Castor, XStream, and XML Beans.
    (depends on spring-core, spring-beans, spring-context)
    Define this if you need OXM (org.springframework.oxm.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-oxm</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Web application development utilities applicable to both Servlet and Portlet Environments
    (depends on spring-core, spring-beans, spring-context)
    Define this if you use Spring MVC, or wish to use Struts, JSF, or another web framework with Spring (org.springframework.web.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-web</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Spring MVC for Servlet Environments (depends on spring-core, spring-beans, spring-context, spring-web)
    Define this if you use Spring MVC with a Servlet Container such as Apache Tomcat (org.springframework.web.servlet.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-webmvc</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Spring MVC for Portlet Environments (depends on spring-core, spring-beans, spring-context, spring-web)
    Define this if you use Spring MVC with a Portlet Container (org.springframework.web.portlet.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-webmvc-portlet</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Support for testing Spring applications with tools such as JUnit and TestNG
    This artifact is generally always defined with a 'test' scope for the integration testing framework and unit testing stubs
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-test</artifactId>
  <version>${org.springframework.version}</version>
  <scope>test</scope>
</dependency>

```

## Obtaining Spring Releases From The Enterprise Bundle Repository (EBR)

To obtain *final* releases of Spring projects from the EBR, add the following repositories to your .pom:

```xml
Copy
<repository>
    <id>com.springsource.repository.bundles.release</id>
    <name>EBR Spring Release Repository</name>
    <url>http:// repository.springsource.com/maven/bundles/release</url>
</repository>
<repository>
    <id>com.springsource.repository.bundles.external</id>
    <name>EBR External Release Repository</name>
    <url>http:// repository.springsource.com/maven/bundles/external</url>
</repository>
```

Then simply add the dependencies your project requires, keeping in mind the EBR artifact naming conventions.

A .pom <dependency> snippet for each Spring Framework 3 artifact as it will be indexed in the EBR is listed below:

```xml
Copy

<!-- Shared version number properties -->
<properties>
    <org.springframework.version>3.0.0.RELEASE</org.springframework.version>
</properties>

<!--
    Core utilities used by other modules.
    Define this if you use Spring Utility APIs (org.springframework.core.*/org.springframework.util.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.core</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Expression Language (depends on core)
    Define this if you use Spring Expression APIs (org.springframework.expression.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.expression</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!-- 
    Bean Factory and JavaBeans utilities (depends on core)
    Define this if you use Spring Bean APIs (org.springframework.beans.*) 
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.beans</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Aspect Oriented Programming (AOP) Framework (depends on core, beans)
    Define this if you use Spring AOP APIs (org.springframework.aop.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.aop</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Application Context (depends on core, expression, aop, beans) 
    This is the central artifact for Spring's Dependency Injection Container and is generally always defined
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.context</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Various Application Context utilities, including EhCache, JavaMail, Quartz, and Freemarker integration
    Define this if you need any of these integrations
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.context.support</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Transaction Management Abstraction (depends on core, beans, aop, context)
    Define this if you use Spring Transactions or DAO Exception Hierarchy
    (org.springframework.transaction.*/org.springframework.dao.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.transaction</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    JDBC Data Access Library (depends on core, beans, context, transaction)
    Define this if you use Spring's JdbcTemplate API (org.springframework.jdbc.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.jdbc</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Object-to-Relation-Mapping (ORM) integration with Hibernate, JPA, and iBatis.
    (depends on core, beans, context, transaction)
    Define this if you need ORM (org.springframework.orm.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.orm</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Object-to-XML Mapping (OXM) abstraction and integration with JAXB, JiBX, Castor, XStream, and XML Beans.
    (depends on core, beans, context)
    Define this if you need OXM (org.springframework.oxm.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.oxm</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Web app development utilities common across Servlet/Portlet environments (depends on core, beans, context)
    Define this if you use Spring MVC, or wish to use Struts, JSF, or another web framework with Spring (org.springframework.web.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.web</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Spring MVC for Servlet Environments (depends on core, beans, context, web)
    Define this if you use Spring MVC with a Servlet Container such as Apache Tomcat (org.springframework.web.servlet.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.web.servlet</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Spring MVC for Portlet Environments (depends on core, beans, context, web)
    Define this if you use Spring MVC with a Portlet Container (org.springframework.web.portlet.*)
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.web.portlet</artifactId>
  <version>${org.springframework.version}</version>
</dependency>

<!--
    Support for testing Spring applications with tools such as JUnit and TestNG
    This artifact is generally always defined with a 'test' scope for the integration testing framework and unit testing stubs
-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.test</artifactId>
  <version>${org.springframework.version}</version>
  <scope>test</scope>
</dependency>

```

## Obtaining Spring Milestone Releases

Milestones and Release Candidates may not be published directly to Maven Central, and in general are published separately from final releases. SpringSource hosts two repositories for obtaining Spring milestones. The first one should be used in conjunction with Maven Central, and the second one in conjunction with the EBR.

### Obtaining Milestones from the Maven Central Compatible Repository

To obtain Spring *milestones* from the Maven Central compatible repository, add the following repository to your .pom:

```xml
Copy
<repository>
    <id>org.springframework.maven.milestone</id>
    <name>Maven Central Compatible Spring Milestone Repository</name>
    <url>http:// maven.springframework.org/milestone</url>
</repository>
```

The milestone version number format is <major>.<minor>.<micro>.M#; for example, 3.0.0.M4. The release candidate version number format is <major>.<minor>.<micro>.RC#; for example, 3.0.0.RC3.

For example, adding the following dependency would retrieve version 3.0.0.RC3 of the spring-context artifact:

```xml
Copy
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context</artifactId>
  <version>3.0.0.RC3</version>
</dependency>
```

### Obtaining Milestones from the Enterprise Bundle Repository (EBR)

To obtain Spring *milestones* from the EBR, add the following repository to your .pom:

```xml
Copy
<repository>
    <id>com.springsource.repository.bundles.milestone</id>
    <name>EBR Spring Milestone Repository</name>
    <url>http:// repository.springsource.com/maven/bundles/milestone</url>
</repository>
```

Be sure to keep in mind the distinct EBR artifact naming convention. For example, adding the following dependency would retrieve version 3.0.0.RC3 of the org.springframework.context artifact:

```xml
Copy
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.context</artifactId>
  <version>3.0.0.RC3</version>
</dependency>
```

## Obtaining Nightly Spring Snapshots

Snapshots of Spring projects are published each night, allowing users to verify that reported issues have been resolved before the next release. Like Milestones, there is a separate Maven Central compatible snapshot repository and an EBR snapshot repository.

### Obtaining Snapshots from the Maven Central Compatible Repository

To obtain Spring *nightly snapshots* from the Maven Central compatible repository, add the following repository to your .pom:

```xml
Copy
<repository>
    <id>org.springframework.maven.snapshot</id>
    <name>Maven Central Compatible Spring Snapshot Repository</name>
    <url>http:// maven.springframework.org/snapshot</url>
</repository>
```

The snapshot version format is <major>.<minor>.<micro>.BUILD-SNAPSHOT; for example, 3.0.1.BUILD-SNAPSHOT.

For example, adding the following dependency would retrieve the latest snapshot of the spring-context artifact:

```xml
Copy
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context</artifactId>
  <version>3.0.1.BUILD-SNAPSHOT</version>
</dependency>
```

Notice the <major>.<minor>.<micro>.BUILD-SNAPSHOT format differs slightly from the traditional Maven 2 snapshot format of <major>.<minor>.<micro>-SNAPSHOT. This is because x.y.z-SNAPSHOT is not a valid OSGi version number. All Spring projects now follow the [OSGi version numbering scheme](http://www.springsource.com/repository/app/faq#q12) (Maven 3 will as well).

### Obtaining Snapshots from the Enterprise Bundle Repository (EBR)

To obtain Spring *nightly snapshots* from the EBR, add the following repository to your .pom:

```xml
Copy
<repository>
    <id>com.springsource.repository.bundles.snapshot</id>
    <name>EBR Spring Snapshot Repository</name>
    <url>http:// repository.springsource.com/maven/bundles/snapshot</url>
</repository>
```

As an final example, adding the following dependency would retrieve the latest snapshot of the org.springframework.context artifact:

```xml
Copy
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>org.springframework.context</artifactId>
  <version>3.0.1.BUILD-SNAPSHOT</version>
</dependency>
```

## Spring Project Productivity Tools

I would like to close with a brief note about the tooling Spring provides for projects that use Maven. Both the SpringSource Tool Suite and [Spring Roo](http://www.springsource.org/roo) provide wizards that can generate new Spring projects with pre-configured .poms. Roo goes quite far in this regard--it can actually manage your .pom for you as you execute code generation commands that require additional artifacts to be downloaded.

Cloud Foundry also has a new capability that allows cloud deployments to be made sans external dependencies, greatly reducing deployment times. To make this work, Cloud Foundry syncs with the EBR after publishing to complete a deployment.

## Summary

Whew, that was quite a lot of ground to cover.

This was a long entry, but in summary, I hope it is now clear how to obtain Spring artifacts with Maven, whether you are seeking a final release, a milestone, a release candidate, or a nightly snapshot. Making Spring easy to get your hands on is very important to us. It's particularly important in a project's milestone phase, when users are trying out new functionality for the first time and have the opportunity to directly influence Spring's direction.