---
title: Project Sagan: Upgrading to JDK 8
source: https://spring.io/blog/2014/04/18/project-sagan-upgrading-to-jdk-8
scraped: 2026-02-24T07:27:13.423Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  April 18, 2014 | 0 Comments
---

# Project Sagan: Upgrading to JDK 8

_Engineering | Chris Beams |  April 18, 2014 | 0 Comments_

As I'm sure most readers are aware, [Java SE 8 was released last month](http://www.oracle.com/events/us/en/java8/index.html). In conjunction with the [recent release of STS 3.5.0](https://spring.io/blog/2014/04/02/spring-tool-suite-and-groovy-grails-tool-suite-3-5-0-released) and its complete support for JDK 8, we thought now would be an ideal time to upgrade Sagan to take advantage of the new language features and APIs.

> ***Note**: Not yet familiar with the [Sagan project](https://github.com/spring-io/sagan)? It's the Spring reference application that powers this blog and everything else at [spring.io](http://spring.io). Check out the [first](https://spring.io/blog/2014/03/27/project-sagan-open-sourcing-spring-io) [three](https://spring.io/blog/2014/04/04/project-sagan-zero-downtime-deployments) [posts](https://spring.io/blog/2014/04/11/javascript-modularity-without-the-buzzwords) in this series for more details.*

Cloud Foundry's [Java buildpack](https://github.com/cloudfoundry/java-buildpack) has provided support for JDK 8 since the day it was released. To begin using it, we've [created our own fork](https://github.com/spring-io/java-buildpack) of the buildpack, [bumped the JDK version](https://github.com/spring-io/java-buildpack/commit/340c15363babd62ade352ff379c5e3dc36c933d2) from 1.7.0 to 1.8.0, and [configured our Gradle build](https://github.com/spring-io/sagan/commit/fcdba9b894a4b9715eab14e3cb7de95af45ae6c0) to use our fork when deploying Sagan to production.

> ***Note**: At some point in the near future, 1.8.0 will become the default version for the Cloud Foundry build pack, and the forking described will no longer be necessary.*

As you may have noticed, [Sagan uses Travis CI](https://travis-ci.org/spring-io/sagan) for continuous integration and deployment, and [updating our Travis configuration](https://github.com/spring-io/sagan/commit/0c617b2b05d18a54a6a85784032c266cc8449185#diff-0) to use JDK 8 was extremely simple.

Of course the most interesting aspect of the upgrade is the changes to the code inself. Take a look through the commits in [pull request #348](https://github.com/spring-io/sagan/pull/348), where you'll see changes broken up into several categories, including refactoring to use lambda expressions and taking advantage of JDK 8's powerful new Stream API.

For [one very simple example](https://github.com/spring-io/sagan/commit/09aa380061e7729522d6d4d006f3829dece0ce62#diff-1dc1df79f7f4999479abd8b7c374309aL46), it's great to go from code like this:

```java
CopyList<String> projectVersions = new ArrayList<>();
for (ProjectRelease projectRelease : project.getProjectReleases()) {
    projectVersions.add(projectRelease.getVersion());
}
```

to this:

```java
CopyList<String> projectVersions = project.getProjectReleases().stream()
    .map(ProjectRelease::getVersion)
    .collect(Collectors.toList());
```

Or, in [unit tests](https://github.com/spring-io/sagan/commit/3718f646d31651fb50d9d12fb3d5bc2151e320d5#diff-b1f47aff8c17f1c697e3ebc6c5c9505dR82), from the ceremony-laden:

```java
CopymockMvc.perform(createPostRequest)
    .andExpect(new ResultMatcher() {
        @Override
        public void match(MvcResult result) {
            String redirectedUrl = result.getResponse().getRedirectedUrl();
            assertThat(redirectedUrl, startsWith("/admin/blog"));
        }
    });
```

to the tight and readable:

```java
CopymockMvc.perform(createPostRequest)
    .andExpect(result -> {
        String redirectedUrl = result.getResponse().getRedirectedUrl();
        assertThat(redirectedUrl, startsWith("/admin/blog"));
    });
```

Of course, what you see above only scratches the surface of what's possible with streams, lambda expressions and method references in JDK 8. There are a few new concepts to learn, but you'll be glad you did! To do so, we recommend reading Venkat Subramanian's excellent [Functional Programming in Java](http://pragprog.com/book/vsjava8/functional-programming-in-java).

There are additional changes we can make to take full advantage of what JDK 8 has to offer, and among them is converting our uses of `java.util.Date`, `java.util.Calendar` and `java.util.TimeZone` to JDK 8's new [Date and Time API](http://www.oracle.com/technetwork/articles/java/jf14-date-time-2125367.html). We've created [issue #360](https://github.com/spring-io/sagan/issues/360) to do just that, and if you're interested in helping make it happen, we'd love to work with you on a pull request. Just take a look at the [contributor guidelines](https://github.com/spring-io/sagan/blob/master/CONTRIBUTING.md), and let us know you're interested in a comment on that issue.

In any case, if you've been curious to check out and play with the new features and APIs in JDK 8, we hope you'll find these changes to the Sagan app a useful reference.

> ***Note:** if you already have the Sagan repository checked out locally, you'll need to re-generate your IDE project metadata to ensure you're working properly against 1.8-level language features. The [project wiki has been updated](https://github.com/spring-io/sagan/wiki) to reflect the correct requirements and steps for doing this.*

Also, for a more general overview of what's available at both the language and API level in JDK 8, be sure to check Benjamin Winterberg's excellent [Java 8 Tutorial](http://winterbe.com/posts/2014/03/16/java-8-tutorial/) and [Java SE 8 API Explorer](http://winterbe.com/posts/2014/03/29/jdk8-api-explorer/).

---

### [](#springone-2gx-2014-is-around-the-corner)SpringOne 2GX 2014 is around the corner

This year's [SpringOne will be in Dallas, TX](http://www.springone2gx.com) on September 8-11 and [super early bird registration is now open](https://2014.event.springone2gx.com/register). We hope to see you there!