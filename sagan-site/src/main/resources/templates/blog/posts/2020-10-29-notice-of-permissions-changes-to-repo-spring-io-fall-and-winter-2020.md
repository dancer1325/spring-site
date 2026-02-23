---
title: Notice of Permissions Changes to repo.spring.io, Fall and Winter, 2020
source: https://spring.io/blog/2020/10/29/notice-of-permissions-changes-to-repo-spring-io-fall-and-winter-2020
scraped: 2026-02-23T10:22:25.188Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Trevor Marshall |  October 29, 2020 | 40 Comments
---

# Notice of Permissions Changes to repo.spring.io, Fall and Winter, 2020

_News | Trevor Marshall |  October 29, 2020 | 40 Comments_

A critical piece of infrastructure, the Spring Artifactory instance [repo.spring.io](https://repo.spring.io), lies at the heart of the Spring portfolio development work. Since 2013, [JFrog, Inc.](https://jfrog.com) has generously sponsored the instance for the Spring developer community.

The Artifactory repository streamlines our project development by acting as a single location where Spring engineers can point their builds and by providing the community with early access to our snapshots and milestones.

Today, we are providing notice of some upcoming changes to the repository.

## [](#upcoming-changes)Upcoming Changes

If you use [repo.spring.io](https://repo.spring.io) as directed by [start.spring.io](https://start.spring.io), (for example, using only `/snapshot` and `/milestone`), these changes most likely will not affect you.

If you are resolving from any of the other repos, you might want to make note of the following dates:

### [](#november-12-2020)November 12, 2020

Anonymous users will no longer be able to load *any* 3rd party artifact into the repository caches. We will flush the caches and they will slowly refill only with artifacts used by our builds.

### [](#january-21-2021--was-jan-6)January 21, 2021 (was Jan 6)

We will no longer support anonymous download of 3rd-party Maven Central artifacts from [repo.spring.io](https://repo.spring.io), even if previously cached by an authenticated user. They should be resolved instead from the central servers.

The `/snapshot`, `/milestone`, and `/release` repositories will remain available, but please fetch our releases from a central repository.

## [](#how-to-use-repospringio)How to use repo.spring.io

Spring Team members only need to make sure their builds are authenticated, and can carry on using `/libs-release` etc.

Anonymous access using `/libs-snapshot` or `/libs-milestone` in the `pom.xml`, or with these configured in a remote repository, should replace them with `/snapshot` and `/milestone`, respectively. These repositories will continue to provide pre-release access to fixes and features for the community.

Anonymous access using `/libs-release` should stop.

**Please avoid using `/release`:** Our releases are all available from Maven Central. We do understand that there are a few exceptions in there. However, if it is still being abused after these changes, it could see restrictions as well.

The **plugins** produced by the Spring Team will continue to resolve in their respective repositories:

```
Copy/plugins-snapshot-local
/plugins-milestone-local
/plugins-release-local
```

You can keep references to `/plugins-release` but do not attempt to resolve an upstream dependency from that repository, or it will fail. The local repositories will always work.

For everything else, please resolve elsewhere. Maven Central and JCenter are built and sponsored for that. [repo.spring.io](https://repo.spring.io) is not.

As a final note, let me just say that we understand how these settings might have crept into projects over the years and that the last thing we want to do is break somebody's project, degrade their productivity, or spoil their day. If any of these changes cause unforeseen problems, please reach out and we will do our best to help get things fixed ASAP. Raising an issue in a respective project should find its way to us, and you can tag me.

Repository administrators out there can also feel free to reach out to me if you are concerned about any downstream replication.

Take care, Trevor Marshall

[Spring Artifactory Wiki](https://github.com/spring-projects/spring-framework/wiki/Spring-Artifactory)