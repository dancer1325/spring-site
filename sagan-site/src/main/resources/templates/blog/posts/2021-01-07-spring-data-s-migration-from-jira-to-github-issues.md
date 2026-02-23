---
title: Spring Data\'s Migration from Jira to GitHub Issues
source: https://spring.io/blog/2021/01/07/spring-data-s-migration-from-jira-to-github-issues
scraped: 2026-02-23T13:35:27.926Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  January 08, 2021 | 2 Comments
---

# Spring Data's Migration from Jira to GitHub Issues

_Engineering | Mark Paluch |  January 08, 2021 | 2 Comments_

Spring Data has migrated its entire history of issues from Jira to GitHub. The goal of this blog post is to give you context and details about this migration.

# [](#migration-details)Migration Details

Spring Data issues have been managed for over ten years in Jira. Today, every issue and every comment has been imported into GitHub. There is a lot to consider in such a move, so let's take a tour and go over some details.

Spring Data consists of 19 individual projects, each one of which is associated with its own issue tracker namespace. Four projects (Spring Data Build, BOM, Envers, and R2DBC) have been using GitHub. One project (Spring Data GemFire) was not migrated as it is in maintenance mode and is going end of life soon. During this migration, we migrated almost 15,000 tickets from 14 Jira projects into 14 GitHub repositories.

### [](#jira-details)Jira Details

Every imported issue displays information from Jira in the bottom half of its description. The goal was that all information from Jira is available on GitHub, and you don't have to go back and forth between the two. You may see one or more of the following, when available:

-   Affected versions
-   Reference URL
-   Attachments
-   Related issues
-   Pull requests and commit references
-   Backport versions
-   Vote and watcher counts

Note that votes and watch subscriptions could not be carried over to GitHub. Even if `spring-issuemaster` has full privileges, it can only vote once, and it cannot vote on someone else's behalf. So please visit GitHub issues to re-apply reactions and subscribe to receive updates for specific issues.

### [](#labels)Labels

Some Jira fields were converted to GitHub issue labels:

Jira Field

Label

Issue Type

`"type: *"`

Status

`"status: *"`

Resolution

`"status: *"`

Component

`"in: *"`

Two extra labels were also applied to imported issues:

Label

Description

`"has: votes-jira"`

imported issues with 10+ votes

`"has: backports"`

issues with backport versions

We used the opportunity to streamline the Jira field values over all repositories. Components are reflected through `"in: *"` labels. The `"status: *"` and `"type: *"` labels have also been given extra thought and revised. A typical Spring Data project has the following components:

Label

Description

`"in: core"`

Core support

`"in: mapping"`

Mapping metadata and converter infrastructure

`"in: repository"`

Repository abstraction

Depending on the actual project, you can find additional components, such as `"in: aggegation-framework"` for Spring Data MongoDB. Therefore, you might find components in [Spring Data REST](https://github.com/spring-projects/spring-data-rest/labels) that do not exist in [Spring Data JPA](https://github.com/spring-projects/spring-data-jpa/labels)..

Our choice of labels is aligned with the labels used in Spring Boot and Spring Framework. The Boot team has given their process and labels a lot of thought, and we know many people will appreciate the consistency. See the complete [set of labels](https://github.com/spring-projects/spring-data-commons/labels) for [Spring Data Commons](https://github.com/spring-projects/spring-data-commons).

In Jira, many fields and labels are modifiable. In GitHub, only contributors can add or remove labels. This makes perfect sense. Reporters simply describe the issue, while contributors categorize it. Both developers and contributors can use the labels to search.

Going forward, Spring Data adopts a bit of automation such that each new ticket must be triaged by the project team before a ticket is accepted as a feature request or a bug report.

### [](#fix-versions)Fix Versions

A Jira issue can have multiple fix versions, while a GitHub issue can have only one target milestone. This feels like a drawback, but there is more than is apparent to the eye, and the constraint has forced us to consider some meaningful adjustments.

Take [DATACMNS-715](https://jira.spring.io/browse/DATACMNS-715?redirect=false), for example, with fix versions `1.8.6`, `1.9.3`, `1.10.1`, and `1.11 RC1`. While the issue was fixed in all four versions, there is no way to express these using milestones. We can instead say it was fixed in `1.8.6` and forward-ported to all other versions. This is how it shows on the GitHub issue [#21759](https://github.com/spring-projects/spring-framework/issues/21759). Could we have made this adjustment in the past? Sure, but the support for multiple fix versions in Jira didn't force us to do so.

### [](#markup)Markup

The markup was, without a doubt the most significant and most painful part of the migration. A ten-year history of issue tracking reflects big shifts in programming styles that in turn determine what shows up in comments.

For example, lots of XML was pasted in comments in the beginning, and Markdown treats that as [HTML blocks](https://spec.commonmark.org/0.28/#html-blocks), which results in the tags not showing at all. Of course if those were surrounded with `{code:xml}...{code}`, it would look fine, but in those days, markup wasn't commonly used and the XML snippets showed up anyway, so it didn't force the issue and, consequently, made it impossible to migrate properly.

There are many other intricacies (such as the escaping of curly braces, avoiding the effect of monospacing, or escaping asterisks to prevent them from disappearing as markup for bold). I'll spare you the details. Suffice it to say that we put a lot of effort into making sure the markup conversion quality is reasonably high.

One specific issue to highlight is the use of "@" in plain text (that is, outside of code blocks). Those are user mentions on GitHub that trigger notifications. You might be surprised that [@Query](https://github.com/query), [@Modifying](https://github.com/modifying), [@Configuration](https://github.com/configuration) are actual GitHub users. This is why we've taken care to escape them. Going forward, when creating new issues or comments, please be a good GitHub citizen and use backticks (for example, \`@Query\`.

# [](#background)Background

We've used and liked Jira for a long time. The idea of migrating to GitHub Issues did not come to our team immediately. Jira seemed too essential. Over time, we've seen a growth in adoption of GitHub issues. Some of our projects used GitHub already and, for newer projects, such as Envers and R2DBC, we've used GitHub issues right from the start. We also see an elevated use of Markdown in Jira. Finally, the way we see our projects as a team is pretty fragmented, as there's no single view over all tickets to work on.

GitHub is the home of just about every open source project, including *every* Spring project, and all users can be reasonably expected to have GitHub credentials. As a result, it has become untenable today to expect developers to maintain a separate login for the issue tracker of every open source project they depend on or want to report an issue against.

Then there are the benefits of co-locating source code and issues. I've mentioned many of those earlier, like the [autolinked references](https://help.github.com/articles/autolinked-references-and-urls/) across issues, pull requests, source code and commits, within a single project and across all projects on GitHub and the ability to mention and notify any GitHub user. All of those are very powerful benefits that are simply not possible with siloed issue tracking. I doubt anyone wants to go back to the days when open source projects were hosted in different places. The same is true for issue tracking.

There are deeper, less obvious benefits for co-located source code and issues. GitHub treats issues and pull requests equally. They are assigned numbers from the same sequence, they look the same (description, comments, labels, and target milestone), they appear in release notes without distinction. A pull request is nothing but an issue with commits attached.

Historically, in the Spring Data projects, we required a Jira issue for every pull request. We didn't like the burden either, but we needed a single place of record for all issues. As a consequence of this split situation, it was never too clear what should be discussed under the pull request and how much belongs in the Jira issue.

Going forward, this is no longer a problem. We expect either an issue or a pull request, not both. If you need to start with a discussion first, which we *do* encourage, create an issue, and later, if you submit a pull request, the PR will supersede the issue. The two are still linked, and nothing is lost. The conversation follows the action.

Not to be overlooked is the markup question. There is no doubt that using different markup variants depending on the issue tracker is painful. There is also no question that Markdown is widely used and easy to use in code-related discussions. It requires less typing compared to Jira's Wiki markup and it just works when it comes to formatting code, because it's simpler and does not clash with symbols that commonly appear in code. This has looked obvious to me from the start, since I've also used GitHub and Markdown in parallel for years. Jira is about the oldest Atlassian product so there's a bit of history of why there's no out of the box support for Markdown. To be clear, this wasn't a decisive factor. It's just one of those things you learn to live with that can later become extra incentive for change.

Last but not least, today, most developers use Spring through Spring Boot, which has always used GitHub Issues. Spring Framework has used GitHub Issues for two years. From that perspective alone, there is enough incentive for Spring Data to migrate and to create a more consistent experience for Spring users.

Migrating to GitHub issues gives us, as a team, an opportunity to reconsider or commit message format. Since its inception, Spring Data messages followed the pattern of [`<ticketnumber> - summary.`](https://github.com/spring-projects/spring-data-commons/commit/2b7c5552738763dfec299695c4a17086af9b3b0b). That format worked well for us in the past. With migrating to GitHub, the ticket number starts with a hash (`#`), which is typically used as a comment character. As a consequence, changing commit messages or amending commits becomes a burden, as each committer needs to tune their Git config to not consider `#` a comment character. Going forward, GitHub allows [closing tickets and pull requests by referencing the ticket in a commit message](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).

Our future commit messages therefore will look more like:

```
CopySummary.

Body comes here.

Original pull request #456
Closes #123
```

# [](#the-actual-migration)The Actual Migration

---

Despite a lot of preparation, there is nothing like the day of the actual migration. We used GitHub's unofficial [import API](https://gist.github.com/jonmagic/5282384165e0f86ef105), which is documented to not trigger any notifications. Once in a while, the import of individual issues failed because of their body size. Especially pasting raw `StackOverflowExceptions` causes large issue bodies that need to be truncated.

With that in mind, we migrated all 14 projects over the course of two days. It took another few hours to make a second pass over all issues and comments to replace Jira issue keys with GitHub reference numbers.

All of that is now complete, and it is my pleasure to announce we are now open for business on GitHub Issues.