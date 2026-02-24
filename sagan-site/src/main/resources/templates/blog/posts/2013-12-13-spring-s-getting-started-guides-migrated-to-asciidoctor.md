---
title: Spring\'s Getting Started Guides migrated to Asciidoctor
source: https://spring.io/blog/2013/12/13/spring-s-getting-started-guides-migrated-to-asciidoctor
scraped: 2026-02-24T07:48:36.670Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  December 13, 2013 | 1 Comment
---

# Spring's Getting Started Guides migrated to Asciidoctor

_Engineering | Greg L. Turnquist |  December 13, 2013 | 1 Comment_

> "If Markdown is a 1st-grader, then AsciiDoc is a PhD student."\[*sic*\] -- Dan Allen, project lead of [AsciiDoctor](http://asciidoctor.org/)

We recently migrated all of our [Getting Started Guides](http://spring.io/guides) to Asciidoctor. Why? Because Asciidoctor provides so many valuable features!

-   Several built in directives make it possible to pull in entire code files, small fragments of code, and external chunks of reusable content.
-   Rendering is now embedded into spring.io's website.
-   No need to "generate" the guide, which always puts you at risk of being out of sync with the code, the build files, and the document itself.
-   Lines up with how many of our projects are migrating away from DocBook towards AsciiDoctor to reduce maintenance.

We had a home grown tool helping us in the past with all these things, but by moving to Asciidoctor, we don't have to maintain it anymore. Instead we can draw upon the talents of the community to build a better collection of guides. Asciidoctor is also much more stable and well developed with all the contributions it has received.

## [](#making-contributions-to-a-guide)Making contributions to a guide

In case you didn't know, each guide on the website is backed by a GitHub repository. Just visit [http://github.com/spring-guides](http://github.com/spring-guides) to see the list.

We place high value on your feedback. If you spot an issue with a guide, please open an issue against its related repository on GitHub. In our internal HipChat channel, we get a nice **ding!** when that happens.

The guides are aimed at providing nice, concise ways to solve problems. The idea is that you should be able to read through a single guide during a lunch break in 15-30 minutes, including the ability to download the code and run it yourself.

If you want to make contributions to an existing guide, there is a [set of guidelines](https://github.com/spring-guides/draft-gs-template/wiki) you can read. They include instructions on installing Asciidoctor as well as rendering the content to check out your edits. Just sign our [contributor's agreement](https://support.springsource.com/spring_committer_signup) and submit a pull request.

## [](#asciidoc-vs-asciidoctor)AsciiDoc vs. Asciidoctor

You might have noticed me mentioning Asciidoctor everywhere. Asciidoctor is compliant with AsciiDoc, but it has many extra features we make use of.

-   including remote bits of text
-   including subsections of code
-   filtering out front matter

There are others, but essentially, don't install and run AsciiDoc and assume it will look the same.

> **Note:** GitHub doesn't render **include** directives. If you view a guide directly on GitHub, you will see many parts rendered, but not code fragments or the reused bits of content. To see it in its rendered format, you have to view it on the spring.io website. Not to worry; each guide has a link in the **description** of the repository.

## [](#summary)Summary

When we undertook the task of writing these guides, we had two goals. The first was to serve up the most useful set of code samples for solving problems with Spring. The second was to author the content using well supported tools, making it easy for both internal staff and the community to make contributions.

We're not done writing guides. More are in the pipeline. But switching to Asciidoctor has enabled us to use a very popular, community-driven tool with strong support from its leader. Hopefully with this reduction in barriers, it will be easier than ever for you to flag issues and make contributions. That way, we can focus on producing better content!