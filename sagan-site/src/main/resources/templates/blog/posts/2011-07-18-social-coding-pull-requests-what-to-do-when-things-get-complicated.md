---
title: Social Coding: Pull Requests - What to Do When Things Get Complicated
source: https://spring.io/blog/2011/07/18/social-coding-pull-requests-what-to-do-when-things-get-complicated
scraped: 2026-02-24T08:38:32.917Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  July 18, 2011 | 0 Comments
---

# Social Coding: Pull Requests - What to Do When Things Get Complicated

_Engineering | Dave Syer |  July 18, 2011 | 0 Comments_

Scenario: you want to contribute some code to an open source project hosted on a public git repository service like github. Lots of people make pull requests to projects I'm involved in and many times they are more complicated to merge than they need to be, which slows down the process a bit. The basic workflow is conceptually simple:

1.  fork a public open source project
2.  make some changes to it locally and push them up to your own remote fork
3.  ask the project lead to merge your changes with the main codebase

and there is an excellent account of this basic workflow in [a blog by Keith Donald](http://blog.springsource.com/2010/12/21/social-coding-in-spring-projects).

Complications arise when the main codebase changes in between the time you fork it and the time you send the pull request, or (worse) you want to send multiple pull requests for different features or bugfixes, and need to keep them separate so the project owner can deal with them individually. This tutorial aims to help you navigate the complications using git.

The descriptions here use github domain language ("pull request", "fork", "merge" etc.), but the same principles apply to other public git services. We assume for the purposes of this tutorial that the public project is accepting pull requests on its master branch. Most Spring projects work that way, but some other public projects don't. You can substitute the word "master" below with the correct branch name and the same examples should all be roughly correct.

To help you follow what's going on locally, the shell commands below beginning with "$" can be extracted into a script and run in the order they appear. The endpoint should be a local repository in a directory called "work" that has an origin linked to its master branch (simulating the remote public project) and two branches on a private fork. The two branches have the same contents at their heads, but different commit histories (as per the ASCII diagram at the bottom).

## The Two Remote Repositories

If you are going to send a pull request, there are two remote repositories in the mix: the main public project, and the fork where you push your changes.

It's a matter of taste to some extent, but what I like to do is make the main project the remote "origin" of my working copy, and use my fork as a second remote called "fork". This makes it easy to keep track of what's happening in the main project because all I have to do is

```
Copy# git fetch origin
```

and all the changes are available locally. It also means that I never get confused when I do my natural git workflow

```
Copy# git checkout master
# git pull --rebase
... build, test, install etc ...
```

which always brings me up to date with the main project. I can keep my fork in sync with the main project simply by doing this after a pull from master:

```
Copy# git push fork
```

## Initial Set Up

Let's create a simple "remote" repo to work with in a sandbox. Instead of using a git service provider we'll just do it locally in your filesystem (using UN\*X commands as an example).

```
Copy$ rm -rf repo fork work
$ git init repo
$ (cd repo; echo foo > foo; git add .; git commit -m "initial"; git checkout `git rev-parse HEAD`)
```

(The last checkout there was to leave the repository in a detached head state, so we can later push to it from a clone.) From now on, pretend "repo" is a public github project (e.g. `git://github.com/SpringSource/repo.git`).

The "fork" URL in this clone command would be something like `git@github.com/myuserid/repo.git`. Now we'll create the fork. This is equivalent to what github does when you ask it to fork a repository:

```
Copy$ git clone repo fork
$ (cd fork; git checkout `git rev-parse HEAD`)
```

Finally we need to set up a working directory where we make our changes (remember "repo" = `git://github.com/SpringSource/repo.git`):

```
Copy$ git clone repo work
$ cd work
$ git checkout origin/master
```

Because we cloned the main public repo that is by default the remote "origin". We are going to add a new remote so we can push our changes:

```
Copy$ git remote add fork ../fork
$ git fetch fork
$ git push fork
```

The local repository now has a single commit and looks something like this in `gitk` (or your favourite git visiualization tool):

```
CopyA (origin/master, fork/master, master)
```

In this diagram, "A" is the commit label, and in brackets we list the branches associated with the commit.

## Get the Latest Stuff

You can always get the latest stuff from the main repo using

```
Copy# git checkout master
# git pull --rebase
```

and sync it with the fork

```
Copy# git push fork
```

If you operate this way, keeping master synchronized between the main repo and your fork as much as possible, and never making any local changes to the master branch, you will never have any confusion about where the rest of the world is. Also, if you are going to send multiple pull requests to the same public project, they will not overlap each other if you keep them separate on their own branches (i.e. not on master).

## The Pull Request

When you want to start work on a pull request, start from a master branch fully up to date as above, and make a new local branch

```
Copy$ git checkout -b mynewstuff
```

Make changes, test etc:

```
Copy$ echo bar > bar
$ echo myfoo > foo
$ git add .
$ git commit -m "Added bar, edited foo"
```

and push it up to your fork repository with the new branch name (not master)

```
Copy$ git push fork mynewstuff
```

If nothing has changed in the origin, you can send a pull request from there.

## What if the Origin Changes?

For the purpose of this tutorial we simulate a change in the origin like this:

```
Copy$ cd ../repo
$ git checkout master
$ echo spam > spam; git add .; git commit -m "add spam"
$ git checkout `git rev-parse HEAD`
$ cd ../work
```

Now we're ready to react to the change. First we'll bring our local master up to date

```
Copy$ git checkout master
$ git pull
$ git push fork
```

The local repository now looks like this:

```
CopyA -- B (mynewstuff, fork/mynewstuff)
 \
  -- D (master, fork/master, origin/master)
```

Notice how your new stuff does not have `origin/master` as a direct ancestor (it's on another branch). This makes it awkward for the project owner to merge your changes. You can make it easier by doing some of the work yourself locally, and pushing it up to your fork before sending the pull request.

### Re-writing History on your Branch

If you aren't collaborating with anyone on your branch it should be absolutely fine to rebase onto the latest changes from the remote repo and force a push:

```
Copy# git checkout mynewstuff
# git rebase master
```

The rebase might fail if you have made changes that are incompatible with somehting that happened in the remote repo. You will want to fix the conflicts and commit them before moving on. This makes life difficult for you, but easy for the remote project owner because the pull requiest is guaranteed to merge successfully.

While you are re-writing history, maybe you want to squash some commits together to make the patch easier to read, e.g.

```
Copy# git rebase -i HEAD~2
...
```

In any case (even if the rebase went smoothly) if you have already pushed to your fork you will need to force the next push because it has re-written history (assuming the remote repo has changed).

```
Copy# git push --force fork mynewstuff
```

The local repository now looks like this (the `B` commit isn't actually identical to the previous version, but the difference isn't important here):

```
CopyA -- D (master, fork/master, origin/master) -- B (mynewstuff, fork/mynewstuff)
```

Your new branch has a direct ancestor which is `origin/master` so everyone is happy. Then you are ready to go into github UI and send a pull request for your branch against `repo:master`.

### What if I want to Keep my Local Commits?

If you committed your changes locally in multiple steps, maybe you want to keep all you little bitty commits, and still present your pull request as a single commit to the remore repo. That's OK, you can create a new branch for that and send the pull request from there. This is also a good thing to do if you *are* collaborating with someone on your feature branch and don't want to force the push.

First we'll push the new stuff to the fork repo so that our collaborators can see it (this is unnecessary if you want to keep the changes local):

```
Copy$ git checkout mynewstuff
$ git push fork
```

then we'll create a new branch for the squashed pull request:

```
Copy$ git checkout master
$ git checkout -b mypullrequest
$ git merge --squash mynewstuff
$ git commit -m "comment for pull request"
$ git push fork mypullrequest
```

Here's the local repository:

```
CopyA -- B (mynewstuff, fork/mynewstuff)
 \
  -- D (master, fork/master, origin/master) -- E (mypullrequest, fork/mypullrequest)
```

You are good to go with this and your new branch has a direct ancestor which is `origin/master` so it will be trivial to merge.

If you weren't collaborating on the `mynewstuff` branch, you could even throw it away at this point. I often do that to keep my fork clean:

```
Copy# git branch -D mynewstuff
# git push fork :mynewstuff
```

Here's the local repo, fully synchronized with both of its remotes:

```
CopyA -- D (master, fork/master, origin/master) -- E (mypullrequest, fork/mypullrequest)
```

## Continue Working on your New Stuff

Let's say your pull request is rejected and the project owner wants you to make some changes, or the new stuff turns into something more interesting and you need to do some more work on it.

If you didn't delete it above, you can continue to work on your granular branch...

```
Copy$ git checkout mynewstuff
$ echo yetmore > foo; git commit -am "yet more"
$ git push fork
```

and then move the changes over to the pull request branch when you are ready

```
Copy$ git rebase --onto mypullrequest master mynewstuff
```

All the changes we want are in place now, but the branches are on the wrong commits. As you can see below, `mynewstuff` is where I want `mypullrequest` to be, and the remote `fork/mynewstuff` doesn't have a corresponding local branch:

```
CopyA -- B -- C (fork/mynewstuff)
 \
  -- D (master, fork/master, origin/master) -- E (mypullrequest, fork/mypullrequest) -- F (mynewstuff)
```

We can use `git reset` to switch the two branches to where we want them (you can probably do this is a graphical UI if you like):

```
Copy$ git checkout mypullrequest
$ git reset --hard mynewstuff
$ git checkout mynewstuff
$ git reset --hard fork/mynewstuff
```

and the new repository looks like this:

```
CopyA -- B -- C (mynewstuff, fork/mynewstuff)
 \
  -- D (master, fork/master, origin/master) -- E (fork/mypullrequest) -- F (mypullrequest)
```

If we are OK with the pull request being 2 commits, we can just push it as it is:

```
Copy$ git checkout mypullrequest
$ git push fork
```

The endpoint looks like this:

```
CopyA -- B -- C(mynewstuff, fork/mynewstuff)
 \
  -- D (master, fork/master, origin/master) -- E -- F (mypullrequest, fork/mypullrequest)
```

Or we could rebase it to squash the commits together and force the push, scematically:

```
Copy# git rebase -i HEAD~2
...
# git push --force fork
```

Because `origin/master` is a direct ancestor of `fork/mypullrequest` I know that my pull request will be trivial to merge.

## Wrap Up

Hopefully this tutorial has given you enough git ammunition to go ahead and make some changes to your favourite open source project and be confident that the merge will be easy. Remember there is always more than one way to do it, and git is a powerful, low-level tool, so your mileage my vary and you might find variants of the approach above preferable or even necessary, depending on your changes.