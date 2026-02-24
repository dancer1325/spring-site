---
title: Maven Artifacts (09/2007)
source: https://spring.io/blog/2007/09/18/maven-artifacts
scraped: 2026-02-24T09:25:05.685Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  September 18, 2007 | 0 Comments
---

# Maven Artifacts (09/2007)

_Engineering | Ben Hale |  September 18, 2007 | 0 Comments_

Up to this point the Spring Portfolio Maven artifacts, especially the snapshots, were inconsitently created and scattered about in various locations. Over the past couple of weeks, we’ve been working to get the projects to be more consistent in the creation and uploading of these artifacts.

## Maven Repositories

One of the most useful improvements to the Maven support in the Spring Portfolio is the use of consistent repository locations. There are three different repositories depending on your level of comfort with the code.

### Release Repository

For any final release (Spring 2.5, Spring Web Flow 2.0, etc.) the Maven artifacts for that release will be uploaded to the Maven Central repository (http://repo1.maven.org/maven2). Using this repository requires no effort on your part as Maven will automatically look for artifacts there.

The artifacts in this repository **do** follow expected repository behaviors and will not (and cannot) not be removed.

### Milestone Repository

For any milestone release (Spring 2.5-RC1, Spring Web Flow 2.0-M2, etc.) the Maven artifacts for that release will be uploaded to the the Spring Milestone repository (http://s3.amazonaws.com/maven.springframework.org/milestone). Using this repository requires you to add an entry to the <repositories/> element in your POM. It should look like this:

```xml
Copy
<repository>
    <id>spring-milestone</id>
    <name>Spring Portfolio Milestone Repository</name>
    <url>http://s3.amazonaws.com/maven.springframework.org/milestone</url>
</repository>
```

The artifacts in this repository **do not** follow expected repository behaviors and will be removed regularly. Upon the release of a final version (Spring 2.6, Spring Web Flow 2.1, etc.) all milestone versions from the previous release of an artifact will be removed. For example, when Spring 2.6 is released, Spring 2.5 milestones will be removed while Spring 2.6 milestones will be retained.

### Snapshot Repository

For any snapshot build (Spring 2.5-SNAPSHOT, Spring Web Flow 2.0-SNAPSHOT, etc.) the Maven artifacts for that build will be uploaded to the Spring Snapshot repository (http://s3.amazonaws.com/maven.springframework.org/snapshot). Using this repository requires you to add an entry to the <repositories/> element in your POM. It should look like this:

```xml
Copy
<repository>
    <id>spring-snapshot</id>
    <name>Spring Portfolio Snapshot Repository</name>
    <url>http://s3.amazonaws.com/maven.springframework.org/snapshot</url>
</repository>
```

The artifacts in this repository **do not** follow expected repository behaviors and will be removed regularly. At least the last 10 snapshot builds for a given artifact will be retained. If an artifact is removed from a distribution its snapshot builds will be removed immediately. On the release of a milestone or a final release, all snapshots for an artifact will be removed and a new snapshot for the next release created.

### Repository Browsing

The milestone and snapshot repositories are both hosted on [Amazon’s S3](http://www.amazon.com/gp/browse.html?node=16427261) service and as such the directory structure is not human-readable. To view the repositories in a human-readable format, use the [S3Browse](http://s3browse.com) utility.

-   Milestone Repository: [http://s3browse.com/explore/maven.springframework.org/milestone](http://s3browse.com/explore/maven.springframework.org/milestone)
-   Snapshot Repository: [http://s3browse.com/explore/maven.springframework.org/snapshot](http://s3browse.com/explore/maven.springframework.org/snapshot)

Only use these URLs for human-readable viewing. If you use them as the URLs for your POMs you will encounter errors.

## Artifact Sources

Another important improvement is the addition of source artifacts for all releases. You will notice in the milestone repository all artifacts have sources deployed with them. This will also be true as we go forward for all final releases as well. Specifically, starting with the Spring 2.5 release, in addition to the combined Spring sources, each module will also have a source artifact.

## Spring Snapshots

The final improvement is one that isn’t yet complete; [a nightly snapshot of Spring](http://opensource.atlassian.com/projects/spring/browse/SPR-3229). I’m pleased to say that this is close to being completed. I’m still working out the final kinks with respect to the [Maven Ant Tasks](http://maven.apache.org/ant-tasks.html) but this will eventually start showing up and I’ll announce it again when it does. As well, you can expect this functionality to eventually make its way out to all of the other ANT-based Spring Portfolio projects so that all projects will create Maven snapshots as well as milestones.