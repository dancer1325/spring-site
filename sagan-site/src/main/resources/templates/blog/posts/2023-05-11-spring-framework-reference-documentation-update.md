---
title: Spring Framework Reference Documentation Update
source: https://spring.io/blog/2023/05/11/spring-framework-reference-documentation-update
scraped: 2026-02-23T09:51:36.254Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  May 11, 2023 | 0 Comments
---

# Spring Framework Reference Documentation Update

_Engineering | Rossen Stoyanchev |  May 11, 2023 | 0 Comments_

Starting with version 6.0.9, the Spring Framework reference documentation site is generated with [Antora](https://antora.org/). This is a big change that brings many improvements. This blog post provides context around that.

## [](#overview)Overview

For a long time the Spring Framework reference documentation had two versions, one single page, and one multipage. The single page was very large but often preferred for the ability to search with Ctrl+F. The multipage provided structure, but it was difficult to navigate and search. See for example the [single](https://docs.spring.io/spring-framework/docs/4.3.x/spring-framework-reference/htmlsingle/) and [multiple](https://docs.spring.io/spring-framework/docs/4.3.x/spring-framework-reference/html/) versions from 4.3.x.

In 5.0 we switched to a single version that split the documentation into several high-level sections as a kind of middle ground between the single and the multipage versions. You could still use Ctrl+F within a section, while the content one any one of those pages wasn't as large as the full documentation. In this version we also added left-hand side navigation to make it easy to navigate the content. See [example](https://docs.spring.io/spring-framework/docs/5.3.x/reference/html/) in 5.3.x.

Ideally, however the content should be more structured with more unique URLs, and yet easy to search. Google is good about finding content, but with multiple versions of the same content and some URL changes over time, it can become challenging. An integrated search feature is a better alternative.

Then there are questions like [this issue](https://github.com/spring-projects/spring-framework/issues/24526) about adding a link from older versions to the latest that seem simple enough, but require a more advanced documentation site that is aware of multiple versions.

This is where [Antora](https://antora.org/) comes in. Over the past couple of years, the Spring team and the Antora team have collaborated to create a new documentation publishing system that meets the needs of Spring projects including the above as well as others that are expected from a modern documentation site.

We've just started using this integration, and you can see the result at [https://docs.spring.io/spring-framework/reference/](https://docs.spring.io/spring-framework/reference/).

## [](#improvements)Improvements

The first thing to notice is the drop-down to select a version in the top right-hand corner. We'll come back to the exact list of versions in a moment, but if you switch to a version other than the current one, you'll see a warning at the top of the page with a link to the latest.

The search box, also in the top right-hand corner is my personal favorite. An integrated search feature based on [Algolia Docsearch](https://docsearch.algolia.com/) that lets you search across the documentation without having to resort to Google search or have the full content loaded in order to use Ctrl+F.

**Note:** *Search currently uses the default Docsearch UI, which shows only 5 results. We are actively working on a custom UI, and will switch to it when ready!*

In the same area, you'll also see an "Edit this Page" link that makes it easy to submit a documentation update for a specific page.

The content is now structured and broken down into unique URLs that reflect the documentation structure. There is global navigation on the left, and local navigation on the right of the main content, along with a breadcrumb at the top.

There are more, less visible benefits too. For example, documentation changes do not depend on the next release, and are instead deployed immediately to the documentation.

## [](#versions)Versions

The 6.0.x branch and the main branch (currently 6.1.x) have been migrated to the Spring Antora integration, and the documentation site has those versions. We do not plan to migrate previous versions, and in any case the only other currently active branch is 5.3.x.

## [](#existing-links)Existing Links

Existing 6.0.x, 6.1.x, and "current" reference documentation links are redirected to the new reference documentation with a permanent redirect.

## [](#what-about-other-spring-projects)What About Other Spring Projects?

Spring Security has been using Antora for some time. We plan to migrate other projects too. There are also plans for further integration not only across versions, but across Spring projects too.

## [](#more-information)More Information

Stay tuned for an additional blog post in the next few weeks that dives deeper into all of this.