---
title: Testing Spring Cloud Projects
source: https://spring.io/blog/2016/01/04/testing-spring-cloud-projects
scraped: 2026-02-23T19:31:42.158Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Marcin Grzejszczak |  January 04, 2016 | 0 Comments
---

# Testing Spring Cloud Projects

_Engineering | Marcin Grzejszczak |  January 04, 2016 | 0 Comments_

Welcome to my first blog post as a Spring Cloud team member :)

It's been a month since I joined and it's worth to share some of the interesting things that took place during that time.

If you've been reading any of my posts at my [Too Much Coding blog](http://toomuchcoding.blogspot.com) then you know that I'm crazy about two things - testing and microservices. Since all that I do at the moment is microservice related today's post will be about testing.

# [](#the-spring-cloud-projects)The Spring Cloud projects

When I joined Spring Cloud team I did a quick scan of the Github and it turned out that we have quite a few projects to govern including:

-   [Spring Cloud Netflix](https://github.com/spring-cloud/spring-cloud-netflix/) (including Eureka Discovery Service and Registry, Hystrix, Feign and RIbbon support)
-   [Spring Cloud Zookeeper](https://github.com/spring-cloud/spring-cloud-zookeeper/)
-   [Spring Cloud Consul](https://github.com/spring-cloud/spring-cloud-consul)
-   [Spring Cloud Sleuth](https://github.com/spring-cloud/spring-cloud-sleuth)

All of them depend on Spring and Spring Boot. Of course each of them has its own version. That's a lot of interchanging dependencies, isn't it?

# [](#how-to-test-dependencies)How to test dependencies?

I wanted to be sure that if someone changes something in Spring core or Spring Boot then we will immediately know that our libraries are still operational. Of course we could create a repetitive build on our CI tool but even though the integration tests would be passing - there is still a possibility of having issues with classpaths and JAR packaging.

What I suggested was to write a couple of end to end tests...

Now whoever read this post of mine about [Microservice Deployment](http://toomuchcoding.blogspot.com/2015/09/microservice-deployment.html) would say that I've gone crazy cause I was completely against end to end tests in that particular scenario. So what has changed?

## [](#why-end-to-end-tests-were-a-good-idea)Why end to end tests were a good idea?

### [](#binary-approach---is-it-working-or-not)Binary approach - is it working or not?

With such a large number of projects, at this point in time I didn't want to roam through all Github repositories, check their tests and reassure myself that everything is working fine. I wanted a black box solution that would tell me if the applications are working or not.

### [](#cross-project-testing)Cross-project testing

The created applications would be using many different projects of ours. The end to end tests would pick any breaking changes in those.

### [](#application-packaging)Application packaging

A couple of times I've checked the tests, did a `./gradlew bootRun` and everything seemed to be working. Apart from the fact that `java -jar ...` didn't work cause the packaging was broken. I wanted to test that too.

### [](#sample-of-usage)Sample of usage

I wanted to create a couple of projects that would present the way Spring Cloud could be used. I wanted to step into a new Spring Cloud user's shoes and have a place where I can quickly set up the whole world of applications, infrastructure and click around to see what are the reactions.

# [](#the-brewery-project)The Brewery project

Since I've been giving a number of [talks about microservices](http://lanyrd.com/profile/marcin-grzejszczak/past/) I already had sample code prepared (kudos to [Szimano](https://github.com/szimano) who is the co-author of the initial solution). I've tweaked it, bent it and hacked it and here came the [Brewery](https://github.com/spring-cloud-samples/brewery).

## [](#the-high-overview)The high overview

The overall idea is that there are 3 applications that talk to each other:

-   presenting service
-   brewing service
-   zuul service

The **presenting service** is a UI for the user where he can order ingredients for the beer to be brewed. It also has in its backend the statuses of brewing processes.

Here is the UI of the service:

![Diagram](https://raw.githubusercontent.com/spring-cloud-samples/brewery/master/img/Brewery_UI.png)

The **brewing service** is a big application that is responsible for multiple functionalities. Initially it was split into a couple of microservices but for simplicity’s sake we decided to drop the number of deployable units. Coming back to the functionalities, these are:

-   collecting ingredients
-   maturing the beer
-   putting the beers into bottles
-   reporting (listening to the events in the system and putting them to an in memory data store)

The **zuul service** is just a Zuul router.

The idea of this system is that all of the components are either using Service Discovery or Spring Cloud Stream to communicate between each other.

Check out the [Readme](https://github.com/spring-cloud-samples/brewery/blob/master/README.md) for more information about the project structure.

## [](#re-usability)Re-usability

What I wanted to achieve is re-usability. In order to test [Spring Cloud Sleuth](https://github.com/spring-cloud/spring-cloud-sleuth) with [Spring Cloud Zookeeper](https://github.com/spring-cloud/spring-cloud-zookeeper/) as Service Registry I didn't want to change any code. Just wanted to run the tests with different parameters.

We're using Spring Cloud abstractions to do that so if we change from Eureka to Consul then no code should change at all and the applications should still be able to communicate (it's a matter of a JAR and configuration change). I wanted to test that too.

## [](#conventions)Conventions

here are a bunch of conventions in the Brewery app. The main one is that you have a specific suffix to the `docker-compose` yml files that corresponds to the tested functionality.

-   docker-compose-CONSUL.yml
-   docker-compose-EUREKA.yml
-   docker-compose-SLEUTH\_STREAM.yml
-   docker-compose-SLEUTH.yml
-   docker-compose-ZOOKEEPER.yml

Each of those docker-compose files knows how to run the whole world of applications and infrastructure to test the given functionality.

## [](#how-to-run-the-apps)How to run the apps?

First you have to build the apps and their Dockerfiles with Gradle. Also you have to pass the `WHAT_TO_TEST` system parameter. Basing on that parameter the classpaths of applications are chosen. Example for `SLEUTH`.

```
Copy./gradlew clean build -DWHAT_TO_TEST=SLEUTH --parallel
```

Once that's done it's enough to run the aforementioned bash script to run the required applications:

```
Copydocker-compose -f docker-compose-SLEUTH.yml up -d
```

**NOTE** : Sometimes the boot order matters so if you want to do things manually please check the corresponding bash file for the given functionality e.g. `docker-compose-SLEUTH.sh`.

In general it's much better to boot the applications together with running the tests. How to do that? It's just a one liner. Check out the next section for more information.

## [](#how-to-run-the-tests)How to run the tests?

Like the docs say:

> The easiest way is to:
> 
> ```
> CopyCreate a symbolic link somewhere on your drive to the acceptance-tests/scripts/runDockerAcceptanceTests.sh file.
> You can execute that script with such options
>     -t what do you want to test (SLEUTH, ZOOKEEPER etc.)
>     -v in which version of the BOM (defaults to Brixton.BUILD-SNAPSHOT)
>     -h where is your docker host? (defaults to '127.0.0.1' - provide your docker-machine host here)
>     -r is brewery repo already in place and needs to be reset? (defaults to not resetting of repo)
> ```
> 
> Once you run the script, the brewery app will be cloned, built with proper lib versions and proper tests will be executed.

So if you want to run the tests just copy paste the code below:

```
Copygit clone https://github.com/spring-cloud-samples/brewery.git
ln -s brewery/acceptance-tests/scripts/runDockerAcceptanceTests.sh  .
bash runDockerAcceptanceTests.sh -t SLEUTH
```

if you're a Mac user the last line should be sth like this (e.g. 192.168.50.60 being your docker-machine IP)

```
Copybash runDockerAcceptanceTests.sh -t SLEUTH -h 192.168.50.60
```

If you have your dependencies downloaded all the building, downloading and running of tests should take up to 5 minutes.

If you have all the applications already setup you can run the acceptance tests manually. Check the next section for more information about this.

## [](#how-do-the-tests-look-like-and-how-to-run-them)How do the tests look like and how to run them?

The acceptance tests are present under the [acceptance-tests](https://github.com/spring-cloud-samples/brewery/tree/master/acceptance-tests) Gradle module of brewery. You can run them either

-   from IDE (remember to pass proper `-DWHAT_TO_TEST` system parameter)
-   from Gradle (example for SLEUTH) `./gradlew :acceptance-tests:acceptanceTests -DWHAT_TO_TEST=SLEUTH`)
    -   if you're running on Mac you have to pass additionally the `-DLOCAL_URL=192.168.60.50` parameter where `192.168.60.50` is the IP of your docker-machine.

The tests are written in Groovy with [Spock framework](http://spockframework.github.io/spock/docs/1.0/) . If you have never heard of Spock it's high time that you start using it in your project. Check out the [Github code](https://github.com/spring-cloud-samples/brewery/blob/master/acceptance-tests/src/test/groovy/io/spring/cloud/samples/brewery/acceptance/SleuthBreweryAcceptanceSpec.groovy) with an example of a Spock test used in the Brewery.

If you combine Spock with [Spock-reports](https://github.com/renatoathaydes/spock-reports) then you can get a very nice BDD like output of your tests

![spock_reports](https://raw.githubusercontent.com/spring-cloud-samples/brewery/master/img/Spock_reports.png)

# [](#are-end-to-end-tests-a-silver-bullet)Are end to end tests a silver bullet?

It would seem that everything is awesome but actually it's not. The end to end tests have their good sides but they also definitely have a lot of down sides. Those are:

-   long feedback cycle (you have to wait around 5 minutes to see if your tests pass)
-   hard to debug (you have around 8 applications that can break - you have to check the logs of each application to see what went wrong)
-   network issues and random failures (this is the worst case cause often it's random - suddenly a packet was broken and the Zipkin Server hasn't received a span that was crucial for the tests to pass...)
-   testing code lives outside the tested library (fortunately the testing code doesn't change but it's much better to have all the code related to an application be in one repository)

The current setup suits our needs but in fact we want things to improve even further. That's why we're thinking about a couple of improvements to the current test approach.

# [](#whats-next)What's next?

Currently the end to end tests are executed together with the build on Travis. But...

-   eventually we're planning to make those tests run in our CI server only on a recurring basis.
-   we're going to move parts of the end to end tests as integration tests to the given libraries so that it will be much easier to debug any issues
-   we want to extend our tests so that they are executed also on Cloud Foundry

The intent is to have faster feedback from our tests that are executed from the library's codebase. Also we want our integration tests to be more reliable.

# [](#summary)Summary

In this post you could see:

-   how to brew beer
-   an approach to testing Open Source libraries using Docker, Docker Compose, Travis, Bash scripts and Gradle
-   the pros and cons of end to end testing
-   what are the long term plans of Spring Cloud team towards testing their libraries
-   agile way of working (we have an approach to testing - the e2e tests - but we know its downsides and we're iteratively planning to migrate to a better solution)

# [](#updates)Updates

\[15.01.2016\] Now it's much easier to execute the e2e tests:

```
Copygit clone https://github.com/spring-cloud-samples/brewery.git
cd brewery
bash runAcceptanceTests.sh -t SLEUTH
```

No more symbolic links (and far less of docker-compose) !

If you want to run the tests and kill all the apps at the end just execute

```
Copygit clone https://github.com/spring-cloud-samples/brewery.git
cd brewery
bash runAcceptanceTests.sh -t SLEUTH -k
```

Also check out the Brewery project readme for any changes: [https://github.com/spring-cloud-samples/brewery](https://github.com/spring-cloud-samples/brewery)