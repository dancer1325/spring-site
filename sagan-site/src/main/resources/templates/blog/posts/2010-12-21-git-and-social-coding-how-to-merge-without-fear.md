---
title: Git and Social Coding: How to Merge Without Fear
source: https://spring.io/blog/2010/12/21/git-and-social-coding-how-to-merge-without-fear
scraped: 2026-02-24T08:49:42.004Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  December 21, 2010 | 0 Comments
---

# Git and Social Coding: How to Merge Without Fear

_Engineering | Dave Syer |  December 21, 2010 | 0 Comments_

Git is great for social coding and community contributions to open source projects: contributors can try out the code easily, and there can be hordes of people all forking and experimenting with it but without endangering existing users. This article presents some examples with the Git command line that might help build your confidence with this process: how to fetch, pull and merge, and how to back out of mistakes. If you are interested in the social coding process itself, and how to contribute to Spring projects, check out another [blog on this site by Keith Donald](http://blog.springsource.com/2010/12/21/social-coding-in-spring-projects/).

[Grails](https://github.com/grails) has been on Github for a while and had a great experience with community contributions, so some other projects from SpringSource are starting to migrate over there as well. Some of the migrating projects are new (e.g. [Spring AMQP](https://github.com/SpringSource/spring-amqp)) and some are already established and have migrated from SVN (e.g. [Spring Batch](https://github.com/SpringSource/spring-batch)). There are also some Spring projects on a SpringSource hosted Gitorious instance, for example [Spring Integration](http://git.springsource.org/spring-integration). The social coding process is slightly different on Github and Gitorious, but the underlying Git manipulations are the same, and that is what we present here. Hopefully, after reading this article and maybe working through the examples, you will be inspired to try the new model and to make contributions to Spring projects. Git is fun and has some great features for this kind of development.

If you have never used Git this is probably not the place to start learning. If you are migrating from SVN to Git and are not as confident when things go wrong as you feel you need to be, or if you want to rid your history of those irritating "`Merged branch 'master'...`" log messages and keep it nice and linear, this is the place to be. If you are signed up on a social coding site and want to get crunching your changes into your favourite open source project, this article will help you feel more confident about it but you should still read the documentation from your coding host about forking and merging. Hopefully then it will all make sense.

This article takes you through a few simple but common scenarios with Git and multiple users. We start with two users sharing a single repository, and show some pitfalls they can encounter and some tricks for rescuing themselves. Then we move on to a social coding example where there are still two users, but now there are also two remote repositories. This is quite common in open source projects and has a some benefits from a change management perspective, as we will see.

## Origins

We are going to start by setting up a simple repository to use for some examples. Here are some Git command line operations you can do yourself from any UN\*X shell, and then a sketch of the Git index to show how the commits and branches are laid out:

$ mkdir test; cd test; touch foo.txt bar.txt
$ git init .
$ git add .
$ git status
To be added
$ git commit -m "Initial"
\[master (root-commit) 5f1191e\] initial
 2 files changed, 2 insertions(+), 0 deletions(-)
 create mode 100644 bar.txt
 create mode 100644 foo.txt
$ git checkout -b feature
$ echo bar > bar.txt
$ git commit -am "change bar"
$ git checkout master
$ echo foo > foo.txt
$ git commit -am "change foo

A - B (master)
  \\
    C (feature)

A simple layout, but complex enough to be interesting. There are 3 commits (we ommitted the commit messages in the diagram), and two independent branches. The branches were deliberately engineered to have no conflicts - they contain changes to different files. If you are working through the command line examples and want to see the index tree as well, use a Git UI tool (I used `gitk --all` which is available on all platforms I believe).

The last thing to do is prepare this repository for cloning:

$ git checkout HEAD~1 

We deliberately used a reference `HEAD1` instead of a branch name so that the origin is left with a detached HEAD. If you are used to a remote repository workflow, this will make sense because we are faking a remote repository locally, and remote repositories are usually "bare" (there is no checked out branch). The `HEAD1` reference means "go back a step, but don't assign the new HEAD to any branch", and this makes it possible to push changes to the repository from clones later.

## Bob Makes a Clone and Tracks the Branch

Bob is our first user of the repository. Here is his terminal and the index layout in his local repository:

$ git clone test bob
$ cd bob
$ git checkout --track origin/feature

A - B (master,origin/master)
  \\
    C (feature,origin/feature)

Bob knows that the feature branch was experimental, but has now been tested so he wants to move it onto the master for inclusion in the next release. But if he merges from here, he gets a non-linear mess (despite the fact that there are no conflicts):

$ git merge master
Merge made by recursive.
 foo.txt |    2 +-
 1 files changed, 1 insertions(+), 1 deletions(-)

A - B (master,origin/master) - D (feature) "Merge branch 'master' into feature"
  \\                           /
    C (origin/feature) ------

Bob hates this. The history is non-linear so it's much harder to see where all the changes came from, and it also leaves him with the dreaded auto-generated commit message "Merge branch 'master'...". (It doesn't matter if he merges feature onto master or master onto feature, the result is the same structure with the same ancestors and the same child commits, but with a slightly different auto-generated message.) A push is legal from here but he ends up with the ugly history visible to everyone and also the less than useful auto-generated comments.

Bob doesn't panic! He can still revert to the original index because he hasn't pushed anything yet:

$ git reset --hard origin/feature

A - B (master,origin/master)
  \\
    C (feature,origin/feature)

From there he can sit back and wait for someone else to solve the problem. Along comes Jane...

(Note that not everyone shares this view of Bob's, that unnecessary non-linear history and auto-generated commit logs with no new changes are a bad thing. Some people actually find it "re-assuring" that there are signs of parallel development. They generally don't use rebase and prefer the simple pull and merge approach to collaboration with Git.)

## Jane Clones Another Copy and Does a Local Rebase

Jane is also a developer with write access to the test repository. She is bolder than Bob and decides that what is needed is a rebase to keep the history linear:

$ git clone test jane
$ cd jane
$ git checkout --track origin/feature
$ git rebase master

A - B (master,origin/master) - D (feature)
  \\
    C (origin/feature)

(Note that Jane could have achieved the same result by starting down the same route as Bob - a merge of master, followed by a rebase has the same endpoint because rebase is smart enough to realize that it can save some duplication and not show intermediate states that contain no new changes.)

Now everything looks OK(ish), but git will not allow a push back to origin because the feature has diverged:

$ git push
To file:///path/to/test
 ! \[rejected\]        feature -> feature (non-fast-forward)
error: failed to push some refs to 'file:///path/to/test'
To prevent you from losing history, non-fast-forward updates were rejected
Merge the remote changes before pushing again.  See the 'Note about
fast-forwards' section of 'git push --help' for details.

If Jane takes the hint and merges from here and she really will regret it. The result of the rebase is only really OK*ish* - it has duplicate commits (`C` and `D` with the same log message and the same changes when you quint at them), so the merge will not be pretty. Git is only going to do what she told it, and the merge is legal, but the effect will be

-   a non-linear history
-   an auto-generated commit message
-   duplicate commit messages (one on each ancestor branch)

Here's the result:

$ git merge origin/feature 
Merge made by recursive.

A - B (master,origin/master) - D "change bar" - E (feature) "Merge branch 'master' into feature"
  \\                                            /
    C (origin/feature) "change bar" ----------

She only made two changes to the source code but the result is 5 commits in the index. That sucks. To revert she can use the same trick as before, except that now there is no named branch at the commit she wants to reset to (D). Either she can add one, or use a UI tool `gitk` is good at this), or use a relative reference:

$ git reset --hard HEAD~1

A - B (master,origin/master) - D (feature)
  \\
    C (origin/feature)

The unfriendly thing to do, and the one that all the Git manuals warn you about, is to force a push. Jane gives it a try:

$ git push --force

A - B (master,origin/master) - D (feature,origin/feature)

Now that's more like it! Two changes and three commits (one on either side of the changes), and a nice linear history with no unpleasant commit messages. So why is it such a bad thing to do? Let's look at our hapless friend Bob again.

## Bob is Now Potentially in a Mess

He will be fine if he hasn't modified the "feature" branch:

$ git checkout master
$ git pull
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (3/3), done.
From file:///path/to/test
 + 4b223e2...4db65c2 feature       -> origin/feature  (forced update)
Already up-to-date.

A - B (master,origin/master) - D (origin/feature)
  \\
    C (feature)

It looks a little ugly here, but Git has held everything together. Bob can see that Jane (or someone) has forced an update to the remote branch he was tracking, so his local branch has diverged through no fault of his. He might be a little peeved about that, but in this case it is harmless because he hasn't made any changes to his local branch so he can just reset his branch:

$ git checkout feature
Switched to branch 'feature'
Your branch and 'origin/feature' have diverged,
and have 1 and 2 different commit(s) each, respectively.
$ git reset --hard origin/feature

A - B (master,origin/master) - D (feature,origin/feature)

Everyone is happy! So a forced push is OK in some circumstances. In particular, it can be acceptable for someone working on a fork of a "main" project, as often arises with social coding (like at Github). Let's look at that use case in more detail.

## Forks and Social Coding

One of the intended useful features of Git is that it can be used as a distributed repository - you don't have to take the single-origin approach common with SVN and older systems. The distributed feature is used heavily, but not extensively, when you fork from a public open-source project and then ask the project's owner to merge in some of your changes to the main repository.

So let's suppose that there is a cool open-source project called `main`, owned by Mary, and Bob goes and forks it from the project home page. He gets a new repository with a precise copy of the Git index of the `main` repository, and he can call it whatever he likes (he chooses `bob-main` to help us keep it straight). The Git part of this is trivial - effectively he is just cloning `main`, moving the origin reference to the new location in his own space on the server, and then pushing the changes back up. The social coding application handles all this behind the scenes and helpfully suggests to Bob that he clone his new remote fork.

So now we have a `main` repository (which is the origin for Mary, but not for Bob), and a `bob-main` repository which are identical. Let's make it start with just one commit to keep it simple (so take the origin creation recipe from the first example and stop after the first commit):

A (master)

Mary's local copy starts identical Bob's, and they both look like this:

A (master,origin/master)

But their origin references are different. For Mary:

$ git remote -v
origin	git@host:/mary/main (fetch)
origin	git@host:/mary/main (push)

and for Bob:

$ git remote -v
origin	git@host:/bob/bob-main (fetch)
origin	git@host:/bob/bob-main (push)

Typically Mary will not have permission to push to Bob's repository nor vice versa.

### Bob Adds a Feature

Bob has a great idea for the main project so he creates his feature branch and starts coding, ending up here:

$ git checkout -b feature
$ echo foo >> foo.txt
$ git commit -am "change foo"

A(master,origin/master) - C (feature)

He is pleased with this, so he pushes it back to his own origin

$ git push origin feature

A(master,origin/master) - C (feature,origin/feature)

Notice how Bob keeps all his changes on a branch. This isn't compulsory, but as we'll see later, it makes it a lot easier to keep track of differences with the `main` repository (even though so far Bob has no explicit connection to there). The user documentation at Github actually doesn't recommend this approach, but you might find it helpful.

### Mary Makes Some Changes

Mary is the project owner, and she can push to her master branch any time she likes. So she does this:

$ echo bar >> bar.txt
$ git commit -am "change bar"
$ git push

A - B (master,origin/master)

### Bob Sends a Pull Request

Now Bob asks Mary to merge his changes. Mary follows the friendly instructions on the social coding site and pulls down Bob's changes to take a look

$ git checkout -b bob master
$ git pull https://host/bob/bob-main feature

A - B (master,origin/master) - D (bob) "Merge branch 'feature' of '...bob-main' into bob"
  \\                           /
    C  ----------------------

Mary sees immediately that Bob has diverged from her master. What should she do?

### Alternative 1: No Forced Push

In this case it might be quite straightforward if there are no conflicts. She decides to spend some time cleaning up the history, just in case it is easy. This is the same process that Bob used in the previous, single origin example.

$ git reset --hard HEAD~1
$ git rebase master

A - B (master,origin/master) - C (bob)

No problems there, and the history is linear again. Mary just needs to wrap up the change with her main project:

$ git checkout master
$ git merge bob
$ git push
$ git branch -D bob

A - B - C (master,origin/master)

She deleted the local branch `bob` at the end there because it is no longer marking anything significant, and it isn't tracking a remote branch so she doesn't have to deal with that reference as well.

### Alternative 2: Forced Push in Fork

If the rebase failed above, or Mary simply takes the view that if it is Bob that wants his change to be merged then the onus is on him to make the history linear, she can ask him to rebase onto her master. She sends him a message via the nifty social coding site, and then resets her local copy:

$ git checkout master
$ git branch -D bob
$ git prune

A - B (master,origin/master)

Now Bob gets to work. He is still on his feature branch, so

$ git remote add main https://host/mary/main
$ git fetch main

A (master,origin/master) - B (main/master)
 \\
  C (feature,origin/feature)

So now he has a read-only reference to the main repository and an alias for it so he can bring himself up to data quickly with Mary's work. (The alias is optional, but it will help him to stay up to date and see at a glance where his master is relative to Mary's.) First he brings his master in line with the main one

$ git checkout master
$ git merge main/master
$ git push

A - B (master,origin/master,main/master)
 \\
  C (feature,origin/feature)

It is here that we see the benefit of working on a feature branch: it is always trivial to merge the master with the main repository if it is kept free of local changes (master is never ahead of main/master). Now he tries the rebase that Mary asked for:

$ git checkout feature
$ git rebase master

A - B (master,origin/master,main/master) - D (feature)
 \\
  C (origin/feature)

Bob sees that the history is as he wants it, so he pushes it up to his remote repository:

$ git push --force

A - B (master,origin/master,main/master) - D (feature,origin/feature)

Bob has played the same trick here that Jane did in the previous example - he forced a push of a local branch to maintain a linear history.

Bob and Mary are consenting adults and the only reason the feature branch exists in Bob's repository is to anchor the pull request, so it is unlikely that anyone else is tracking that branch. If someone was tracking that branch they might be inconvenienced, even severely inconvenienced if they tagged a public release on that branch. It's a risk that Bob decides to take - it's no risk at all in fact in this example because Bob is the only person with write access to his repository and he's pretty confident that no-one is using his branch for making releases.

## Conclusion

The process of merging the contribution is not simple unless the changes are trivial, but Git does take a lot of the pain out of it, and it's easy enough once you get the hang of it. The key point in the example is that Git is being used in a particular style, and there are some constraints and conventions that make it easier: Bob and Mary's repositories are read-only to each other, and Bob is actually the only person with write permission to his fork so he doesn't mind at all that Mary wants him to force a push there. This is by far not the only feature of Git that makes it interesting for open-source developers, but it goes a long way to explain why some of us are moving to sites like [Github](https://github.com/).