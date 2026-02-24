---
title: Social Coding in Spring Projects
source: https://spring.io/blog/2010/12/21/social-coding-in-spring-projects
scraped: 2026-02-24T08:49:47.199Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  December 21, 2010 | 0 Comments
---

# Social Coding in Spring Projects

_Engineering | Keith Donald |  December 21, 2010 | 0 Comments_

In the last year, new Spring projects have launched in a number of areas, including [social](http://www.springsource.org/spring-social), [mobile](http://www.springsource.org/spring-mobile), [data](http://www.springsource.org/spring-data), and [integration](http://www.springsource.org/spring-amqp). I've been doing this [for nearly 7 years](http://www.jroller.com/kdonald/entry/spring_developer_13), and honestly it has never been as exciting for me as it is today. I feel this way because our community understands the importance of raising the bar by building on the foundations you've laid before. That's why we're able to move so quickly, and that's a testament to the quality of the core development team led by [Juergen Hoeller](http://www.infoq.com/interviews/hoeller-spring).

One thing I'm very excited about is the increasing number of community contributions we're seeing. These have traditionally come in as patches via [JIRA](http://jira.springframework.org), but modern social coding platforms such as [Github](http://github.com) and [Gitorious](http://gitorious.org) have opened new opportunities. In this blog entry, I'd like to present a new contribution model that empowers you to contribute to your favorite Spring projects and work directly with the core development team.

### Raising Awareness of the Possibilities

What got me thinking about this topic was a [recent blog post](http://www.gridshore.nl/2010/11/28/playing-with-the-spring-mobile-project) by Jettro Coenradie covering Spring Mobile. In his post, Jettro presented a great idea for a new feature. He even took the time to put together a sample that demonstrated its value. I was left thinking "*Awesome!*", and wouldn't it rock if Jettro was *empowered* to contribute his feature back to the project. Jettro would benefit by having his code in the next official version, and the community would benefit by having a useful feature to apply they didn't have before. With social coding, this is all possible today and it's our responsibility to make the community aware of the process.

### The Rise of "Social Coding" Platforms

In the last two years, we have seen the rise of Social Coding platforms such as [Github](http://www.github.com), [Gitorious](http://www.gitorious.org), [Bitbucket](http://www.bitbucket.org), and [Launchpad](http://www.launchpad.net). Of the four, Github is the most popular with over [1 million](http://techcrunch.com/2010/07/24/github-one-million) hosted projects, including [several](https://github.com/jquery) [notable](https://github.com/rails) [ones](https://github.com/hibernate). The secret sauce in these platforms is the way they combine the principles of [Distributed Version Control](http://betterexplained.com/articles/intro-to-distributed-version-control-illustrated), which make it easy to share changes, with social networking capabilities to foster empowered software development communities.

So suppose, like Jettro, I am a user who needs an improvement made to a Spring project. Before, the best I could do would be to checkout the source, make my change locally, generate a patch file, and attach the patch to a [issue](https://jira.springframework.org/browse/SWS-594). Since I'm not a project committer, I cannot commit any changes myself. Nor can I create a branch that allows me to work on multiple improvements at once. If I discover one of my patches needs improvement, I'm forced into the painful process of generating and attaching another patch file.

**Modern social coding platforms provide a superior workflow.** First, I don't have to be a project committer to make changes. I'm empowered to fork the project's repository, create a local topic branch, and start hacking away. I commit my changes to my repository and, when I'm ready, I request that the core development team pull the changes from my branch into the master branch. This workflow gets you right to what matters: the code, and avoids the bureaucracy associated with JIRA issues and patch files.

The *empowered contributor* workflow can be visualized as follows:

![](http://blog.springsource.com/wp-content/uploads/2010/12/contributor-workflow.png)

A Spring project team member, such as Juergen Hoeller, receives your pull request, then integrates your changes:

![](http://blog.springsource.com/wp-content/uploads/2010/12/integrator-workflow.png)

A good social coding platform provides useful features that support this workflow, such as a Interactive Diff Reviewer, Review Discussion Capability, Contributor License Agreement (CLA) Processor, and Event Notifier.

### An Example of an Empowered Contribution

For the Spring Mobile 1.0.0.M2 release, I went through this workflow myself to contribute the improvement originally suggested by Jettro. In the following section, I'll replay that experience so you may use it as an example for your own empowered contributions.

As Spring Mobile is hosted on the SpringSource [Gitorious instance](http://git.springsource.org), some things in this example are Gitorious specific. In general, though, the social coding platforms are very similar. Where there are significant differences, I will note them.

#### Step 1: Fork the repository

The first thing I did was create my own fork of the Spring Mobile repository. Gitorious uses the term "Clone" instead of fork, and this is accomplished by clicking the "Clone Repository" button on the repository dashboard:

![](http://blog.springsource.com/wp-content/uploads/2010/12/spring-mobile-clone-repository.png)

#### Step 2: Clone your fork locally

Next, I cloned my fork to a local directory on my filesystem:

```code
Copygit clone --recursive git@git.springsource.org:~kdonald/spring-mobile/kdonalds-spring-mobile.git
```

Note how the URL references a repository location in my Gitorious user directory. As a point of comparison, Github's URL format is similar, but slightly different:

```code
Copygit clone --recursive git@github.com:kdonald/spring-mobile.git
```

#### Step 3: Link with the upstream repository

Next, I connected my local fork to the upstream Spring Mobile repository. This is an optional step, but generally recommended as it allows me to keep my fork up-to-date as changes are pushed to the upstream repository.

```code
Copygit remote add upstream git://git.springsource.org/spring-mobile/spring-mobile.git
git fetch upstream
```

#### Step 4: Create a topic branch for your work

Next, I created a topic branch for my improvement. A topic branch provides a dedicated workspace for my change, and allows my fork to remain a clean mirror of the master that can be reused. I named the branch *site-switcher*, after the name of the feature I intended to implement:

```code
Copygit checkout -b site-switcher
```

#### Step 5: Hack, commit, and push your changes

Next, I implemented the feature, committing my work locally in logical, iterative chunks. It took me several iterations to arrive at a complete implementation I was happy with, which consisted of new code, tests, and documentation. In the end, I pushed 4 commits to my fork.

```code
Copy./gradlew eclipse build <!-- import into Eclipse and hack, hack, hack... -->
git commit -m "logical commit 1"
git commit -m "logical commit 2"
git commit -m "logical commit 3"
git commit -m "logical commit 4"
git push origin site-switcher
```

#### Step 6: Send a pull request

Next, I sent a pull request to the development team requesting they integrate my changes into the main repository. Before doing this, I made sure my changes could be applied on top of the current state of the master branch without conflict:

```code
Copygit checkout master
git fetch upstream
git merge upstream/master
get checkout site-switcher
get rebase master
```

To create the pull request, I selected "Request Merge" from the dashboard of my fork:

![](http://blog.springsource.com/wp-content/uploads/2010/12/request-merge.png)

Gitorious uses the term "Merge Request" instead of "Pull Request", which has been popularized by Github. They mean exactly the same thing, and both Gitorious and Github provide a form workflow that makes the process trivial. On the form, I first provided a description of my changes for the core development team:

![](http://blog.springsource.com/wp-content/uploads/2010/12/merge-request-form-part1.png)

Next, I indicated I would like all commits from my topic branch merged into the master branch, and clicked "Create Merge Request" to send the request:

![](http://blog.springsource.com/wp-content/uploads/2010/12/merge-request-form-part2.png)

After sending, the development team is notified and a new, open "Merge Request" appears on the dashboard of the main repository:

![](http://blog.springsource.com/wp-content/uploads/2010/12/open-merge-request-indicator.png)

Each pull or merge request is assigned a [URL](http://git.springsource.org/spring-mobile/spring-mobile/merge_requests/1) where you may view merge status, review the diffs, and discuss the changes.

### An Example of Integrating an Empowered Contribution

At this point, the ball is in the core development team's court. It is their responsibility to review and integrate your change, and do so in the best interest of the community within a reasonable time frame. In this section, I will continue the example by illustrating the typical integration work flow.

#### Step 1: Review and Test

First, I performed a quick code review of the changes. I accomplished this by using Gitorious's diff viewer, which allows me to review the changes from my web browser and optionally comment on them. Github provides a similar capability.

Next, I created a local branch that provides a dedicated workspace for me to pull in the changes and test them:

```code
Copygit checkout -b kdonald-site-switcher master
git pull git://git.springsource.org/spring-mobile/spring-mobile.git refs/merge-requests/1
git log --pretty=oneline --abbrev-commit master..kdonald-site-switcher
./gradlew build
```

On Gitorious, each merge request is given a branch off the target repository that can also be used to push additional improvements identified from the review. On Github, you simply pull from the contributor's topic branch directly:

```code
Copygit pull https://github.com/kdonald/spring-mobile.git site-switcher
```

#### Step 2: Merge

After completing the review, I merged the changes into the master branch:

```code
Copygit checkout master
git merge kdonald-site-switcher
git push origin master
```

On Gitorious, I must now go update the status of the Merge Request to Closed, indicating it has been completed (Github will automatically close a pull request after a merge). The contributor will be notified, and all that's left is some final cleanup.

#### Step 3: Clean Up

On the integration side, I simply delete my local review branch. Since the changes have now been merged, it is not needed anymore:

```code
Copygit branch -D kdonald-site-switcher
```

Back on the contribution side, I sync my fork with the upstream master to pull in the merged changes. This keeps my fork up-to-date with the evolving upstream repository:

```code
Copygit checkout master
git fetch upstream
git merge upstream/master
git log
```

And I delete my topic branch, since I'm done with that work:

```code
Copygit branch -D site-switcher
git push origin :site-switcher
```

That's it! My change has now been integrated, and I'm now an official Spring Mobile @author with my commit history fully preserved! While waiting for my change to be integrated, I could have also been working on additional improvements in parallel, each in a dedicated topic branch. I also put together a quick [screencast](http://s3.springsource.org/MVC/spring-mobile-1.0.0.M2-screencast.mov) demonstrating the value of the new feature to the community.

### Github vs The Others

In this next section, I'd like to briefly highlight how the social coding platforms compare, and how SpringSource is currently using them.

Given the popularity of Github, all of the other social coding platforms are inevitably compared to it. I recently read a post on the [Hudson mailing list](http://groups.google.com/group/hudson-users/browse_thread/thread/31f5098f7cd59766/f62735b8da995634) that made the case, that for a developer, "Having a GitHub account is almost as common as having a Twitter handle or Gmail address". I have [seen](http://news.ycombinator.com/item?id=1831852) [employers](http://www.viget.com/extend/getting-into-open-source/) [using](http://twitter.com/#!/selenamarie/status/12618417404125184) Github profiles as differentiators when screening job candidates. The specific features of the various platforms are actually [very similar](http://thingsilearned.com/2010/01/07/github-and-bitbucket/). The significant advantage Github has over the others is its popularity and [leadership position](http://lusislog.blogspot.com/2010/10/designed-for-developers-why-people-keep.html). And that is particularly attractive to [open source projects](http://blog.basho.com/2010/11/11/a-few-more-details-on-why-we-switched-to-github/) focused on building diverse, empowered communities.

SpringSource itself currently runs an internal [Gitorious instance](http://git.springsource.org), which hosts a number of projects including [Spring Integration](http://git.springsource.org/spring-integration), [Security](http://git.springsource.org/spring-security), [Roo](http://git.springsource.org/roo), [Mobile](http://git.springsource.org/spring-mobile), and [Social](http://git.springsource.org/spring-social). The advantage of Gitorious is it is free to host your own instance, and that's exactly what we've done here, hosting these projects on our own infrastructure.

SpringSource has also recently registered as an [organization](http://github.com/springsource) at Github, and the new Spring Data projects along with [Batch](https://github.com/springsource/spring-batch), [AMQP](https://github.com/springsource/spring-amqp), and [Grails](http://github.com/grails) are hosted there.

In general, I expect more and more Spring projects to embrace DVCS and social coding moving forward, which I'm very excited about. I expect we'll continue to support both Gitorious and Github, and it's likely you'll see everything accessible from Github eventually (either directly or via mirror). I'd love to hear your feedback on what you'd like to see and if you have a preference for a particular platform.

### Summary

I hope this post has helped open your eyes to a superior model for community contributions. I encourage you to take full advantage of it and become an empowered Spring developer, working with our core development team on the projects that you use everyday in your careers. On behalf of the Spring project teams, we're very much looking forward to developing new and renewed relationships with many of you for the benefit of the Spring community overall. It is an exciting time to be a developer!