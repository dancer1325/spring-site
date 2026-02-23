---
title: Notice of Permissions Changes to repo.spring.io, January 2023
source: https://spring.io/blog/2022/12/14/notice-of-permissions-changes-to-repo-spring-io-january-2023
scraped: 2026-02-23T10:22:20.510Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Michael Minella |  December 14, 2022 | 25 Comments
---

# Notice of Permissions Changes to repo.spring.io, January 2023

_News | Michael Minella |  December 14, 2022 | 25 Comments_

A critical piece of infrastructure, the [Spring Artifactory instance](https://repo.spring.io) lies at the heart of the Spring portfolio development work. Since 2013, JFrog, Inc., has generously sponsored the instance for the Spring developer community.

In October 2020, we announced some [permissions changes to our Artifactory instance](https://spring.io/blog/2020/10/29/notice-of-permissions-changes-to-repo-spring-io-fall-and-winter-2020) to restrict anonymous access to the platform for third-party dependencies.

At that time, we asked the Community to source Spring releases from Maven Central. Today, we are announcing some changes to our infrastructure in alignment with that request so that we can better position repo.spring.io for the long term.

## [](#how-to-use-repospringio)How to use repo.spring.io

repo.spring.io is intended for the download of snapshots and milestone artifacts that are not available from Maven Central. All other artifacts within the Spring ecosystem should be retrieved from Maven Central. Because of this, we will be configuring anonymous clients (non-authenticated) to resolve only from /snapshot and /milestone repositories. These repositories will continue to provide pre-release access to fixes and features for the community, letting you test, evaluate, and provide feedback on those pre-release builds.

Anonymous clients querying /release, /libs-release, /libs-milestone /libs-snapshot, /plugins-release, or any other virtual repository may be denied. If requests persist, their senders will risk being banned.

Official plugin releases by the Spring Team are available in Maven Central. Plugin snapshots and milestones will continue to resolve in their respective repositories:

```
Copy/plugins-snapshot 
/plugins-milestone
```

For everything else, for the better of the community, we expect that they would be resolved from Maven Central.

## [](#upcoming-changes)Upcoming Changes

If you use repo.spring.io, as directed by [https://start.spring.io](https://start.spring.io), (for example, using only `/snapshot` and `/milestone`), these changes most likely will not affect you.

If you are resolving from any of the other repos or administer a downstream Artifactory/Nexus cache, note the following dates:

### [](#jan-5-2023)Jan 5, 2023

First brown-out. 4 hours in duration. Spring Releases will not be available from the repo.spring.io repository. Virtual repositories will continue to resolve snapshots and milestones anonymously.

### [](#jan-12-2023)Jan 12, 2023

Second brown-out. 4 hours in duration. Spring Releases will not be available from the repository. Virtual repositories will NOT resolve snapshots and milestones anonymously. Only `/snapshot`, `/milestone`, `/plugins-snapshot`, and `/plugins-milestone` will resolve anonymously.

### [](#jan-19-2023)Jan 19, 2023

Third and final brown-out. 10 hours in duration. Spring Releases will not be available from the repository. Virtual repositories will NOT resolve snapshots and milestones anonymously. Only `/snapshot`, `/milestone`, `/plugins-snapshot`, and `/plugins-milestone` will resolve anonymously.

### [](#january-26-2023)January 26, 2023

Anonymous clients will no longer be able to download Spring Releases (including released plugins) from [https://repo.spring.io](https://repo.spring.io), instead they should be sourced from Maven Central. Virtual repositories will NOT resolve snapshots and milestones anonymously. Only `/snapshot` and `/milestone` will resolve anonymously.

We appreciate your understanding in helping us provide key infrastructure in a way that works for our entire community. We would also like to thank JFrog for working with us over the years in providing this key piece of infrastructure for such a large community. Repository administrators out there should feel free to reach out to us if you are concerned about any downstream replication.