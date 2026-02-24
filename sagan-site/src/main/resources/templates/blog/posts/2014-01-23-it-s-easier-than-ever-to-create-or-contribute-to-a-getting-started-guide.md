---
title: It\'s easier than ever to create or contribute to a Getting Started Guide
source: https://spring.io/blog/2014/01/23/it-s-easier-than-ever-to-create-or-contribute-to-a-getting-started-guide
scraped: 2026-02-24T07:45:11.971Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  January 23, 2014 | 0 Comments
---

# It's easier than ever to create or contribute to a Getting Started Guide

_Engineering | Greg L. Turnquist |  January 23, 2014 | 0 Comments_

Greetings Spring community!

We keep receiving feedback that Spring's [Getting Started Guides](http://spring.io/guides) are smash hit.

So far, we've migrated these guides to [Asciidoctor](http://spring.io/blog/2013/12/13/spring-s-getting-started-guides-migrated-to-asciidoctor). We have also grown our guides to include [client-oriented ones](http://spring.io/blog/2013/12/17/getting-started-with-client-side-development-in-spring). More are coming!

The final link in the chain of making these guides work in the long term are the navigational links in the sidebar of each guide. We are now using metadata to tag and link various guides together while also connecting them to relevant projects.

For example, if you visit [Consuming a RESTful Web Service with AngularJS](http://spring.io/guides/gs/consuming-rest-angularjs/), you will see a sidebar that contains:

-   shortcuts to the top-level sections of that guide
-   two tags: [rest](http://spring.io/guides?filter=rest) and [JavaScript](http://spring.io/guides?filter=JavaScript), links that let you search for other guides containing the same tags
-   a link to the [Spring Framework](http://projects.spring.io/spring-framework) project, given this guide is focused on combining Spring MVC with AngularJS
-   links to [understanding REST](http://spring.io/understanding/REST) and [understanding JSON](http://spring.io/understanding/JSON)

The sidebars now require **zero** maintenance.

> **Note:** If there's something I'm a fan of, it's zero maintenance!

If you are making contributions to one of our guides, you no longer have to edit a separate file regarding the sidebar. Instead, each guide is marked up at the top with **tags** and **projects** metadata. That is all it takes to build up the navigational links on the sidebars.

This makes it easier than ever to release a new batch of related guides, chained together by some mutual links. For another example, checkout all the [Spring Data guides](http://spring.io/guides?filter=spring-data).

When you visit the list of guides, you can do an instant search based on title and guide description, as well as tag. And as you can see by all the links up above, search criteria can be bookmarked, captured, and saved.

> **FYI:** Tag data can change so don't assume it's forever.

With all these updates to the way guides are created and managed, the process to create a new one or edit an existing one is simpler than ever.

If you have an idea for a new guide, you can work on it in your own github repository. Just be sure to check out our [template project](https://github.com/spring-guides/draft-gs-template) as well as the [writing guidelines](https://github.com/spring-guides/draft-gs-template/wiki) to see the process for writing, editing, and contributing.

We are eager to see your contributions and will also be spreading the word so that the various Spring leads can write more guides for their projects as well.