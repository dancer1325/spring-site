---
title: Spring Boot 1.0.0.RC2 Released
source: https://spring.io/blog/2014/02/12/spring-boot-1-0-0-rc2-released
scraped: 2026-02-24T07:41:32.655Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  February 12, 2014 | 0 Comments
---

# Spring Boot 1.0.0.RC2 Released

_Releases | Phil Webb |  February 12, 2014 | 0 Comments_

The second release candidate for [Spring Boot](http://projects.spring.io/spring-boot) 1.0.0 has now been released and published to the [Spring Maven Repository](https://github.com/spring-projects/spring-framework/wiki/Spring-repository-FAQ).

> **UPDATE:** We have released 1.0.0.RC3 earlier than expected to address an unfortunate [regression](https://github.com/spring-projects/spring-boot/issues/346) with RC2. Please use RC3 in preference to RC2.

This release incorporates over 40 [improvements and fixes](https://github.com/spring-projects/spring-boot/issues?milestone=3&page=2&state=closed). If you are upgrading from RC1, you may need to change some of your `import` declarations as we have restructured a few packages with this release.

As well as bug fixes, there are a couple of new noteworthy features:

### [](#spring-jar)spring jar

Users of the `spring` CLI application can now generate executable JARs directly from `.groovy` scripts. Simply run `spring jar` to create a self-contained runnable archive:

```sh
Copy$ spring jar webapp.jar web.groovy
$ java -jar webapp.jar
```

You can also use the same command from the embedded shell:

```sh
Copy$ spring shell
Spring Boot (v1.0.0.RC2)
Hit TAB to complete. Type 'help' and hit RETURN for help, and 'exit' to quit.

$ jar webapp.jar web.groovy
$ !java -jar webapp.jar
```

### [](#gradle-version-numbers)Gradle version numbers

The Spring Boot gradle plugin has been updated so that you can now omit the version numbers of known dependencies. For example:

```groovy
Copybuildscript {
    repositories {
        maven { url "http://repo.springsource.org/libs-milestone" }
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:1.0.0.RC2")
    }
}

apply plugin: 'java'
apply plugin: 'spring-boot'

repositories {
    mavenCentral()
    maven { url "http://repo.springsource.org/libs-snapshot" }
}

dependencies {
	// version numbers need not be specified for know dependencies
    compile("org.springframework.boot:spring-boot-starter")
    testCompile("org.springframework.boot:spring-boot-starter-test")
}
```

Take a look at the `spring-boot-dependencies` [pom.xml](https://github.com/spring-projects/spring-boot/blob/v1.0.0.RC2/spring-boot-dependencies/pom.xml) file for a complete list of known dependencies.

### [](#feedback)Feedback

Thanks to everyone that has already provided feedback and offered pull-requests for the project. Your early support has been invaluable. Please do continue to [raise issues](https://github.com/spring-projects/spring-boot/issues) for both bugs and suggestions.