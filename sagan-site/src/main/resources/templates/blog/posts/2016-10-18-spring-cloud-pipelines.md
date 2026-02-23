---
title: Spring Cloud Pipelines
source: https://spring.io/blog/2016/10/18/spring-cloud-pipelines
scraped: 2026-02-23T16:23:53.649Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  October 18, 2016 | 17 Comments
---

# Spring Cloud Pipelines

_Releases | Marcin Grzejszczak |  October 18, 2016 | 17 Comments_

On behalf of the Spring Cloud team it is my pleasure to announce a new project called [Spring Cloud Pipelines](http://cloud.spring.io/spring-cloud-pipelines/). Unlike most of Spring projects this one is not available at any repository since it’s not a library, but instead it is available as a github repo for you to download and use as template for creating a deployment pipeline.

Without any further ado let’s get into some details related to the project.

## [](#problem-were-trying-to-solve)[](#problem-we-re-trying-to-solve)Problem we’re trying to solve

Spring, Spring Boot and Spring Cloud are tools that allow developers speed up the time of creating new business features. It’s common knowledge however that the feature is only valuable if it’s in production. That’s why companies spend a lot of time and resources on building their own deployment pipelines.

This project tries to solve the following problems:

-   Creation of a common deployment pipeline
    
-   Propagation of good testing & deployment practices
    
-   Speed up the time required to deploy a feature to production
    

A common way of running, configuring and deploying applications lowers support costs and time needed by new developers to blend in when they change projects.

Currently we support the following CI / CD systems out of the box

-   Concourse
    
-   Jenkins
    

## [](#high-level-overview)[](#high-level-overview)High level overview

In the demo we’re using the following projects:

-   Artifactory to store jars
    
-   PCF Dev to deploy applications
    
-   Concourse or Jenkins to host pipelines
    
-   Spring Cloud Pipelines that contains the pipeline logic
    
-   Spring Cloud Contract to aid testing of your applications
    

Of course you can use your own jar gathering service, Cloud Foundry and Concourse / Jenkins. We’re providing them for you for the demo purposes.

The produced pipelines will look more or less like this ( [you can read more about the rationale behind this flow in the docs](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html#_the_flow)):

![flow concourse](https://raw.githubusercontent.com/spring-cloud/spring-cloud-pipelines/master/docs/img/intro//flow_concourse.png)

Figure 1. Flow in Concourse

![flow](https://raw.githubusercontent.com/spring-cloud/spring-cloud-pipelines/master/docs/img/intro//flow.png)

Figure 2. Flow in Jenkins

## [](#how-to-use-it)[](#how-to-use-it)How to use it?

This repository can be treated as a template for your pipeline. We provide some opinionated implementation that you can alter to suit your needs. The best approach to use it to build your production projects would be to download the Spring Cloud Pipelines repository as ZIP, then init a Git project there and modify it as you wish.

Example for using the code from `master` branch.

```
Copycurl -LOk https://github.com/spring-cloud/spring-cloud-pipelines/archive/master.zip
unzip master.zip
cd spring-cloud-pipelines-master
git init
# do all the changes
git add .
git commit -m "Initial commit"
git remote add origin ${YOUR_REPOSITORY_URL}
git push origin master
```

Why aren’t you simply cloning the repo? This is meant to be a seed for building new, versioned pipelines for you. You don’t want to have all of our history dragged along with you, don’t you?

## [](#links)[](#links)Links

-   [Project page](http://cloud.spring.io/spring-cloud-pipelines/)
    
-   [Project documentation](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html)
    
-   [Concourse opinionated pipeline setup](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html#concourse)
    
-   [Concourse Website](https://concourse-ci.org)
    
-   [Jenkins opinionated pipeline setup](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html#jenkins)
    
-   [Jenkins Job Dsl Plugin](https://github.com/jenkinsci/job-dsl-plugin/wiki)
    
-   [Spring Cloud Pipelines Gitter](https://gitter.im/spring-cloud/spring-cloud-pipelines)
    
-   [Spring Cloud Pipelines GitHub page](https://github.com/spring-cloud/spring-cloud-pipelines)