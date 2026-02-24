---
title: ASM version incompatibilities, using Spring @Autowired with Hibernate
source: https://spring.io/blog/2007/06/11/asm-version-incompatibilities-using-spring-autowired-with-hibernate
scraped: 2026-02-24T09:28:30.436Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  June 11, 2007 | 0 Comments
---

# ASM version incompatibilities, using Spring @Autowired with Hibernate

_Engineering | Alef Arendsen |  June 11, 2007 | 0 Comments_

I was working on Spring 2.1 stuff this week with Joris. We were preparing a sample using [all](http://www.w3.org/XML/) [three](http://blog.interface21.com/main/2007/06/05/more-on-java-configuration/) [ways](http://blog.interface21.com/main/2007/05/14/annotation-driven-dependency-injection-in-spring-21/) [of](http://blog.interface21.com/main/2007/05/29/customizing-annotation-configuration-and-component-detection-in-spring-21/) doing dependency injection. The sample does not only highlight dependency injection, but also features a back-end based on Hibernate.

Several features in Spring 2.1 require the ASM byte code manipulation framework. Hibernate also uses ASM, through CGLIB. There is a binary incompatibility between ASM 1.5.3 and 2.2.3. The former is used by Hibernate, the latter is used by Spring in various scenarios; specifically in some of the AOP functionality and the new @Autowired features.

UPDATE: read solution number 3 first!

## Solution no. 1

The first solution is to explicitly replace the CGLIB jar for Hibernate with a *nodep* version (one is available from the Spring distribution) which contains a re-packaged version of ASM version 1.5.3. With Maven, this requires you to put in a few exclusions alongside your Hibernate dependency and to explicitly put in the ASM 2.2.3 dependency in your *pom*.

```xml
Copy
<dependency>
	<groupId>org.hibernate</groupId>
	<artifactId>hibernate</artifactId>
	<version>3.2.1.ga</version>
	<exclusions>
		<exclusion>
			<groupId>asm</groupId>
			<artifactId>asm</artifactId>
		</exclusion>
		<exclusion>
			<groupId>asm</groupId>
			<artifactId>asm-attrs</artifactId>
		</exclusion>				
	</exclusions>
</dependency>
```

```xml
Copy
<dependency>
	<groupId>asm</groupId>
	<artifactId>asm</artifactId>
	<version>2.2.3</version>			
</dependency>
```

## Solution no. 2

I haven't tried this, but according to the [Hibernate JIRA](http://opensource.atlassian.com/projects/hibernate/browse) you can change the byte code provider for Hibernate to Javassist, as commented by [Max Rydahl Andersen](http://opensource.atlassian.com/projects/hibernate/browse/HHH-2222#action_25209) in the [bug report](http://opensource.atlassian.com/projects/hibernate/browse/HHH-2222).

## Solution no.3 (added October 18 2007)

As of Spring 2.5rc1, spring.jar contains ASM 2.2.3 (repackaged using [Jar Jar Links](http://code.google.com/p/jarjar/) (that name!!!!! :) ). This means all incompatibilities with other projects using ASM should from now on be a thing of the past. I haven't tried this out yet, so you should figure this one out for yourself.