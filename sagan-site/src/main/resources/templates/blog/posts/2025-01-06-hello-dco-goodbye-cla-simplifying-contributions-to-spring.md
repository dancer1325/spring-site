---
title: Hello DCO, Goodbye CLA: Simplifying Contributions to Spring
source: https://spring.io/blog/2025/01/06/hello-dco-goodbye-cla-simplifying-contributions-to-spring
scraped: 2026-02-23T07:56:21.620Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  January 06, 2025 | 1 Comment
---

# Hello DCO, Goodbye CLA: Simplifying Contributions to Spring

_Engineering | Rob Winch |  January 06, 2025 | 1 Comment_

The Spring team will be rolling out a simplified contribution process that replaces the requirement to sign a [Contributor License Agreement (CLA)](https://en.wikipedia.org/wiki/Contributor_License_Agreement) with a [Developer Certificate of Origin (DCO)](https://en.wikipedia.org/wiki/Developer_Certificate_of_Origin). The process will start this week with Spring Framework, Spring Security, & Spring Boot and then roll out to the entire Spring portfolio.

# [](#history)History

Spring has long used a permissive Contributor License Agreement (CLA) in order to provide legal protections to the Spring project, users, and the Spring team. Long time contributors may remember that signing the CLA originally involved emailing a signed PDF of the CLA. The Spring team was then required to manually verify that the CLA was signed before accepting contributions. Without integrations like GitHub Apps, this manual process was somewhat necessary then.

In order to streamline that process, we created an electronic version of the CLA which automatically verified that the authors of pull requests had signed the CLA. This was a large improvement over the manual process, but it still had its disadvantages.

While the electronic CLA simplified contributions, contributors were still faced with obstacles when contributing to Spring. CLAs are lengthy legal documents that can be difficult to understand. What’s more is that CLAs tend to be custom and thus the effort to understand them must be done on a per project basis. Due to legal requirements between employees and their employers, developers would often need to work with their employer to get approval to sign the CLA. All of these factors added additional layers of complexity when contributing to Spring.

# [](#simplifying-contributions-to-spring)Simplifying Contributions to Spring

In order to further simplify contributing to Spring, we have decided to move to using a Developer Certificate of Origin (DCO). This still provides the same protections to the Spring project, users, and Spring team.

The benefit is that the Developer Certificate of Origin (DCO) is easy to read and a standard across many projects including the Linux Kernel. The [entire DCO](https://developercertificate.org/) can be summarized as:

1.  I certify that the submitted code can be submitted under the open source license of the project (for Spring this is [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt))
2.  I understand that what I am contributing is public and will be redistributed indefinitely

# [](#how-to-use-developer-certificate-of-origin)How to Use Developer Certificate of Origin

In order to contribute to the project, you must agree to the Developer Certificate of Origin. To confirm that you agree, your commit message must include a *Signed-off-by* [trailer](https://git-scm.com/docs/git-interpret-trailers) at the bottom of the commit message. For example, it might look like the following:

```plain
CopyA commit message

Closes gh-123

Signed-off-by: Rob Winch <rob@example.org>
```

The *Signed-off-by* trailer can be added automatically by using the [\-s or –signoff command line option](https://git-scm.com/docs/git-commit/2.13.7#Documentation/git-commit.txt--s) when specifying your commit message:

```bash
Copygit commit -s -m
```

If you have chosen the [Keep my email address private option](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address#about-commit-email-addresses) within GitHub, the *Signed-off-by* trailer might look something like:

```plain
CopyA commit message

Closes gh-123

Signed-off-by: Rob Winch <362503+rwinch@users.noreply.github.com>
```

# [](#faq)FAQ

## [](#what-about-existing-pull-requests)What about existing Pull Requests?

Existing pull requests which are already passing the CLA check do not need to sign the DCO. If the pull request is not already passing the CLA, then the DCO process should be used.

## [](#when-will-the-migration-to-using-a-dco-start)When will the migration to using a DCO start?

The Spring Framework, Spring Security, and Spring Boot projects will transition to this process this week (January 6, 2025). After a successful trial period, we will migrate all Spring projects to use this process.

## [](#what-checks-are-performed-to-ensure-the-process-is-followed)What checks are performed to ensure the process is followed?

Spring uses the [DCO GitHub App](https://github.com/dcoapp/app) to add a check that enforces that all commits in a pull request contain a *Signed-off-by* trailer with a value of the email and name found in the user’s GitHub profile.

If you would like to see what the process looks like, the DCO app describes [how the process works](https://github.com/dcoapp/app?tab=readme-ov-file#how-it-works) along with screenshots of what to expect.

## [](#what-do-i-do-if-the-dco-check-fails)What do I do if the DCO check fails?

If the DCO check fails, you can click on the “Details” link next to the failed check which will explain why the check failed and how to fix it. If you forgot to add the *Signed-off-by* trailer for a single commit, then you can do so by using:

```bash
Copygit rebase HEAD~1 --signoff
git push —-force-with-lease origin
```

## [](#what-if-there-is-more-than-one-author-for-the-commit)What if there is more than one author for the commit?

Clause c of the [Developer Certificate of Origin](https://developercertificate.org) allows a commit containing code from multiple origins to include a single *Signed-off-by* trailer. In this instance, inclusion of the *Signed-off-by* trailer indicates that the commit author certifies that they have the right to submit the commit under the project’s license.

## [](#can-i-use-githubs-suggest-a-change-feature)Can I use GitHub’s Suggest a Change Feature

You may [apply suggested changes](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/incorporating-feedback-in-your-pull-request#applying-suggested-changes) on a pull request.

1.  The person suggesting the change should include the *Signed-off-by* in their comment that suggest the change.
2.  Then, the person applying the change (committing the suggestion) will include their *Signed-off-by* trailer ([compulsory commit signoffs are enabled](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-the-commit-signoff-policy-for-your-repository)) when they click the “Sign off and commit suggestion” button which indicates that they agree to the Developer Certificate of Origin.

## [](#can-i-modify-someone-elses-commit)Can I modify someone else's commit?

The [Developer Certificate of Origin](https://developercertificate.org) clause b allows modifying the code, but it can be considered impolite attributing your changes (bugs) to another person. For that reason, it is [considered polite](https://github.com/torvalds/linux/blob/master/Documentation/maintainer/modifying-patches.rst#modifying-patches) to insert a description with your email and name enclosed in square brackets followed by a *Signed-off-by* at the end of the commit message. For example:

```plain
CopySigned-off-by: PR Developer <pr-dev@example.com>
[committer@example.com: apply code conventions]
Signed-off-by: Committer Developer <committer@example.org>
```

## [](#do-all-commits-need-to-include-the-dco)Do all commits need to include the DCO?

No. In certain cases described below, we may accept very minor contributions without requiring the DCO. This is designed for contributions that are minor enough (e.g. spelling errors, grammar mistakes, typos, formatting mistakes, etc.) to not be considered by you to be intellectual property that is independently protectable (an “Obvious Fix”). The purpose of this exception is to lower the barrier for new contributors to make helpful and necessary contributions while retaining the integrity of the project and our community.

# [](#happy-contributing)Happy Contributing!

We are looking forward to seeing more & simplified contributions from you! If you have any questions, don’t hesitate to reach out to us in our issue trackers.