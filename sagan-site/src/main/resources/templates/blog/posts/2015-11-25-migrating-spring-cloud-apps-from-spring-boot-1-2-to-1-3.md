---
title: Migrating Spring Cloud Apps from Spring Boot 1.2 to 1.3
source: https://spring.io/blog/2015/11/25/migrating-spring-cloud-apps-from-spring-boot-1-2-to-1-3
scraped: 2026-02-23T19:34:29.964Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  November 25, 2015 | 0 Comments
---

# Migrating Spring Cloud Apps from Spring Boot 1.2 to 1.3

_Engineering | Dave Syer |  November 25, 2015 | 0 Comments_

There are some interesting new features in [Spring Boot](http://projects.spring.io/spring-boot/) 1.3 that are now available in Spring Cloud in the Brixton release train. The Angel release train of [Spring Cloud](http://projects.spring.io/spring-cloud/) is partly incompatible with Spring Boot 1.3, so when you upgrade there are some important things to be aware of. This article helps you navigate the changes and update any existing apps to use the new features. It should also be helpful generally when trying to adopt new versions of Spring projects into existing codebases.

> TIP: You can use `mvn dependency:tree` or `gradle dependencies` to list the dependencies in your project and check the versions.

## [](#dependency-management)Dependency Management

If you are using the older versions of Spring Boot, you probably have something like this in your Maven POM:

```xml
Copy<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>1.2.7.RELEASE</version>
  <relativePath /> <!-- lookup parent from repository -->
</parent>
```

or

```xml
Copy<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-parent</artifactId>
      <version>1.2.7.RELEASE</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

or, if you are using Gradle,

```groovy
Copybuildscript {
	ext {
		springBootVersion = '1.2.7.RELEASE'
	}
	dependencies {
		classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
	}
}

```

To upgrade to Spring Boot 1.3.0 you would change the '1.2.7' above to '1.3.0'. So far so simple.

> TIP: to see a "typical" Maven POM with the most recent version of Spring Boot you can `curl start.spring.io/pom.xml`. To add Spring Cloud you can append `-d style=cloud-config-client`. The Spring Boot version can be changed by adding `-d bootVersion=1.3.1.BUILD-SNAPSHOT` (for instance). To do the same for Gradle use `build.gradle` instead of `pom.xml`.

## [](#using-spring-cloud-with-spring-boot)Using Spring Cloud with Spring Boot

Since Spring Cloud builds on top of Spring Boot it can be confusing and difficult to find a combination that works together. In what follows we describe a few scenerios of upgrades and show what you can expect to be able to achieve with dependency management.

### [](#the-big-upgrade)The Big Upgrade

In general the biggest change will be when you upgrade (Spring Boot 1.2 to 1.3, or Spring Cloud Angel to Brixton). If you downloaded a project from the [Spring Initializr](https://start.spring.io) then it will be using the Spring Boot parent POM:

```xml
Copy<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>1.2.7.RELEASE</version>
  <relativePath/> <!-- lookup parent from repository -->
</parent>
```

and a Spring Cloud BOM in the `<dependencyManagement>` section:

```xml
Copy<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-parent</artifactId>
      <version>Angel.SR4</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

In Gradle you would see something like this:

```groovy
Copybuildscript {
    ext {
        springBootVersion = '1.2.7.RELEASE'
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}") 
    }
}
dependencyManagement {
  imports { 
    mavenBom "org.springframework.cloud:spring-cloud-starter-parent:Angel.SR4" 
  }
}
```

Simply updating the Spring Boot version in either case isn't going to work because the Spring Cloud Angel BOM has old versions of Spring Boot and Spring (amongst other things). Thus we really need to upgrade both Spring Boot and Spring Cloud. For example in Maven:

```xml
Copy<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>1.3.0.RELEASE</version>
  <relativePath/> <!-- lookup parent from repository -->
</parent>
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-parent</artifactId>
      <version>Brixton.M3</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

and in Gradle:

```groovy
Copybuildscript {
    ext {
        springBootVersion = '1.3.0.RELEASE'
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}") 
    }
}
dependencyManagement {
  imports { 
    mavenBom "org.springframework.cloud:spring-cloud-starter-parent:Brixton.M3" 
  }
}
```

NOTE: Brixton.M2 and all earlier releases of Spring Cloud are *not* compatible with Spring Boot 1.3.0.RELEASE. You need at least Brixton.M3.

## [](#upgrading-spring-boot-beyond-130)Upgrading Spring Boot Beyond 1.3.0

Suppose you want to use Spring Boot snapshots, or upgrade to 1.3.1 when it is released, but Spring Cloud doesn't have a version that explicitly depends on the version of Boot you want.

In Maven, remember that if you use one of the off the shelf parent POMs they contain `<dependencyManagement>` and will take precedence. With that in mind, if you use those parent POMs, be sure to use the parent with the closest dependency set to what you need (the Boot one in this scenario).

```xml
Copy<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>1.3.1.BUILD-SNAPSHOT</version>
  <relativePath/> <!-- lookup parent from repository -->
</parent>
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-parent</artifactId>
      <version>Brixton.M3</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

In Gradle things are in principle simpler because there is no concept of a "parent". In practice the Spring Boot plugin cannot be applied with a different version than the dependency management unless you also manually apply the dependency management plugin as well. So you have to do a little dance in the `build.gradle`:

```groovy
Copybuildscript {
    ext {
        springBootVersion = '1.3.0.RELEASE'
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath "io.spring.gradle:dependency-management-plugin:0.5.3.RELEASE"
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}") 
    }
}

apply plugin: "io.spring.dependency-management"
...

dependencyManagement {
  imports { 
    mavenBom "org.springframework.cloud:spring-cloud-starter-parent:Brixton.M3" 
    mavenBom "org.springframework.bootspring-boot-starter-parent:1.3.1.BUILD-SNAPSHOT" 
  }
}

apply plugin: 'spring-boot' 

```

The rule is you have to a) import the dependency management plugin manually and *before* the Spring Boot one, b) declare the `dependencyManagement` *before* applying the Spring Boot plugin. Once you do that you can list dependencies in the `dependencyManagement` declaration and the *last* one wins (the opposite to Maven).

> NOTE: This sensitivity to the order of the declarations is a "feature" of the current version of the tooling. It might be different in future versions. See [this issue in the Gradle tooling](https://github.com/spring-gradle-plugins/dependency-management-plugin/issues/66) for more details.

## [](#using-maven-with-a-custom-parent)Using Maven with a Custom Parent

If you don't use the off the shelf parent POMs you have the freedom to use one that does *not* contain `<dependencyManagement>`, and this makes things easier to control. In this case you need to put both Spring Boot and Spring Cloud in the `<dependencyManagement>` and the order is significant: the first one wins (last one for Gradle). For example, to use Spring Boot 1.3.1.BUILD-SNAPSHOT and Spring Cloud Brixton.M3 in Maven:

```xml
Copy<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-parent</artifactId>
      <version>1.3.1.BUILD-SNAPSHOT</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-parent</artifactId>
      <version>Brixton.M3</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

## [](#order-of-the-boms)Order of the BOMs

Note that in both Maven and Gradle the order of the BOMs is significant: the one that is declared first generally wins in Maven (last one in Gradle) if there is a conflict at the top level (explicitly declared dependencies). A big difference with Maven is that the parent is special: if it contains `<dependencyManagement>` it always wins.

To understand if a particular dependency version will resolve in the way you need is complicated. It depends on the order of the BOMs, *and* the depth in the transitive dependency tree that your dependency is declared. For instance, the Spring Boot BOM declares an explicit (level 1) dependency management for `spring-core` but not on any other Spring Framework jars (those are brought in via a reference to the Spring Framework BOM). The rule is that the first time it is declared wins, but the whole tree is included (including all BOMs), searching from the top, level by level.

NOTE: Gradle does not have this "last one wins" rule without the Spring Boot (or Spring Dependency Management) Plugin. To do the same thing with a "native" Gradle build often requires careful and tedious work manually fixing transitive dependency versions.

## [](#further-manipulating-dependency-versions)Further Manipulating Dependency Versions

If you want to bump the version of a dependency beyond what is specified in the Spring Boot and Spring Cloud BOMs, things can get complicated. Broadly speaking there are 2 options: properties and additional BOMs. The first (properties) works with the off the shelf parent POMs, and the other doesn't. The second (more BOMs) only works if there *is* a BOM available for the dependency you are interested in, and only if the transitive dependencies don't conflict with your requirements. All of the Spring Cloud projects have their own BOM, for instance, as does Spring Framework, so that's a start.

### [](#properties)Properties

The Spring Boot parent POM (and the Spring Cloud one if you use that since it inherits from the Boot one) has all of its dependency versions extracted into `<properties/>`. So you can often just change the property value. Example in Maven:

```xml
Copy<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>1.3.0.RELEASE</version>
  <relativePath/> <!-- lookup parent from repository -->
</parent>
<properties>
  <spring.version>4.2.4.BUILD-SNAPSHOT</spring.version>
</properties>
```

There corresponding feature in Gradle is an `ext` property, e.g.

```groovy
Copyext['spring.version'] = '4.2.4.BUILD-SNAPSHOT'
```

### [](#additional-boms)Additional BOMs

The Spring Framework has its own BOM, so we can use that to manage the Spring versions instead. In Maven with a custom parent (containing no `<dependencyManagement>`):

```xml
Copy<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-framework-bom</artifactId>
      <version>4.2.4.BUILD-SNAPSHOT</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

> NOTE: this example actually will *not* work with the Spring Boot parent POM (unless it happens to have the same `<spring.version/>`) because the Spring Framework version is fixed already by the parent. To use the Spring Boot parent with a Spring Framwork snapshot it is better to use the properties approach (above).

In Gradle it is simpler (because there is no parent to set conflicting versions):

```groovy
CopydependencyManagement {
	imports { 
      mavenBom "org.springframework:spring-framework-bom:4.2.4.BUILD-SNAPSHOT" 
      mavenBom "org.springframework.boot:spring-boot-starter-parent:1.3.0.RELEASE" 
	}
}
```

## [](#conclusion)Conclusion

Dependency management is hard, but hopefully we have softened the blow by outlining a few common scenarios when upgrading bits of Spring Boot and Spring Cloud. There are some slightly different behaviours depending on whether you choose Maven or Gradle, but at least if you choose Gradle and use the Spring Boot plugin the differences are minimized. At the end of the day, Spring projects have different release schedules, so there can always be conflicts, but they will generally always be moving towards convergence, so if you wait long enough things will equalize. Umbrella projects like Spring Cloud, Spring Boot and the Spring IO Platform also help to smooth out the bumps: if you can use one of those to manage all your dependencies things get a lot simpler.

The sample apps in the Spring Guides have all been updated to Spring Boot 1.3 now, even if that means they depend on a milestone of Spring Cloud (this only applies to the Zuul proxy sample). Many do not need Spring Cloud any more. If you need a GA version of Spring Cloud you need to stay with Spring Boot 1.2 right now. The samples for that combination can be lifted from git history.