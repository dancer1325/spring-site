---
title: This Week in Spring - July 24th, 2018
source: https://spring.io/blog/2018/07/25/this-week-in-spring-july-24th-2018
scraped: 2026-02-23T15:18:53.653Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  July 25, 2018 | 0 Comments
---

# This Week in Spring - July 24th, 2018

_Engineering | Josh Long |  July 25, 2018 | 0 Comments_

Hi Spring fans! Welcome to another installment of *This Week in Spring*! This week I'm in San Francisco in studio with Spring Security lead [Rob Winch](http://twitter.com/rob_winch) filming our new *Spring Security Livelessons* video. There is *so* much to cover that, as you can imagine, it's a tall order even for the two of us!

I'm also busily preparing for my talk with my buddy and Googler [Ray Tsang](http://twitter.com/saturnism) at this week's Google Cloud NEXT event on all things [Pivotal and Google Cloud](https://cloud.withgoogle.com/next18/sf/sessions/session/224460). We're going to look at the *bootiful* Spring Cloud GCP project and, importantly, the new project jointly announced between Google and Pivotal just this morning, KNative, which serves as the platform on which we at Pivotal have built and deployed our Project Riff serverless function-as-a-service runtime. Do *not* miss it if you're around!

Alright, we've got a lot to cover related to Pivotal, Google, KNative, Spring and so much more this week so let's get to it!

-   Big big big announcement today: Pivotal have joined forces with Google on KNative. As a first step, [KNative will underpin what we're working on with Project Riff](https://content.pivotal.io/blog/knative-powerful-building-blocks-for-a-portable-function-platform).
-   Spring Cloud Data Flow lead Dr. Mark Pollack has just announced the release of [Spring Cloud Data Flow 1.6](https://spring.io/blog/2018/07/23/spring-cloud-data-flow-1-6-rc1-released). The new release includes a PCF Scheduler, an improved dashboard, batch database and schema optimization, and so much more. Check it out!
-   Spring REST Docs lead Andy Wilkinson has [just announced Spring REST Docs 2.0.2](https://spring.io/blog/2018/07/19/spring-rest-docs-2-0-2-release)
-   Spring REST Docs lead Andy Wilkinson has [just announced Spring REST Docs 1.2.5](https://spring.io/blog/2018/07/19/spring-rest-docs-1-2-5-release)
-   Check out this post to learn the increasing ways you can use Cloud Foundry's CredHub for secrets management [in your application stack](https://content.pivotal.io/blog/credhub-and-the-road-to-credential-rotation)
-   Andy Wilkinson, never one to rest on his laurels, *also* [announced that the Gradle dependency management plugin 1.0.6.RELEASE](https://spring.io/blog/2018/07/18/dependency-management-plugin-1-0-6-release) is now available from Maven Central, Bintray, and the Gradle Plugin Portal. This maintenance release fixes four issues.
-   [This Week in Spring - July 17th, 2018](https://spring.io/blog/2018/07/17/this-week-in-spring-july-17th-2018)
-   This video demonstrates how BOSH makes it [a snap to deploy Kubernetes](https://www.cloudfoundry.org/blog/video-bosh-makes-easy-use-kubernetes-cloud-foundry/)
-   I love this - Spring community legend Michael Simons looks at [how to support Spring Boot's configuration properties](https://info.michael-simons.eu/2018/07/15/spring-boots-configuration-metadata-with-kotlin/) metadata from within Kotlin applications. Good stuff!
-   Watch this video to learn how [Cloud Foundry simplifies Kubernetes](https://twitter.com/cloudfoundry/status/1021870639475507201)
-   Joris Kuipers introduces new support in [Spring Cloud AWS for storing configuration in the AWS Parameter Store](https://t.co/f1NHZ5uNRc?amp=1).
-   Check out Dan Baskette's post [on KNative and Pivotal in this post](https://thenewstack.io/knative-enables-portable-serverless-platforms-on-kubernetes-for-any-cloud/)
-   I'm honored to [have been again selected for JAX's Top 20 influencers list](https://twitter.com/jaxentercom/status/1021685394730045440?s=12), for 2018. Thanks so much!
-   Such an exciting day! Read on what the newly announced Knative project means to the Project Riff and Spring ecosystems [in Ryan Morgan's blog post](https://twitter.com/springcentral/status/1021833584989138946)
-   [https://twitter.com/cloudfoundry/status/1021805217229230082](https://twitter.com/cloudfoundry/status/1021805217229230082)
-   Finally the cat's out of the bag! KNative is here and we've been working with Google to make it the best foundation for Project Riff. [Read this post to learn more.](https://projectriff.io/blog/announcing-riff-0-1-0-on-Knative/)
-   There's a new 1.0.1 release of [the Reactor Kafka integration](https://github.com/reactor/reactor-kafka/releases/tag/v1.0.1.RELEASE). Congratulations to Oleh Dokuka and the rest of the team!
-   [https://www.linkedin.com/pulse/marathon-digitization-how-flexibility-hiring-fuel-abby-kearns/?published=t](https://www.linkedin.com/pulse/marathon-digitization-how-flexibility-hiring-fuel-abby-kearns/?published=t)
-   [Congratulations to the UAA team on acheiving OpenID certification](http://openid.net/certification/#OPs)! UAA, of course, is the authentication and authorization service that powers Cloud Foundry, among other things. It's an Apache 2 licensed open-source identity provider based on Spring and Spring Security OAuth.
-   There are a lot of reasons to come to SpringOne Platform 2018, and Jenny Zhang, Principal Consultant of Corporate Security at Mastercard, is one of them. It will be very interesting to listen to the [experiences of a master of security at scale](https://springoneplatform.io/2018/speakers/jenny-zhang).
-   Congrats to Codecentric's Spring Boot Admin which has just reached 5,000 stars on [Github](https://github.com/codecentric/spring-boot-admin). *And*, never one to let success go to their heads, the project [just got new support for custom views](http://codecentric.github.io/spring-boot-admin/current/#customizing-custom-views) that will be included in the upcoming release.
-   This is a great talk by Thomas Darimont [on how to secure a Spring application with Keycloak](https://twitter.com/springcentral/status/1020363816389902336), the OAuth authorization service from Redhat.
-   [twitter.com](https://twitter.com/olivergierke/status/1020039382760345602?s=12)
-   Check out Josh Bloch's QCon talk! Josh is the creator of a ton of the APIs we take for granted in the Java platform (like the Java collections API) and this talk is all about the [contents of his latest book, *Effective Java, 3rd Edition*](https://twitter.com/joshbloch/status/1020074042471182336?s=12)
-   Congrats to the Trampoline [team on their new release](https://twitter.com/trampolinesb/status/1019997905258721282?s=12)! This release introduces an option to define a delay before launching an instance inside a group to be able to have a Config server ready or to wait until a cache is available.
-   The latest version of the Axon Framework comes with a Subscription Query API, making it possible to subscribe to updates of a specific query model and a Deadline Manager that allows for scheduling of deadline messages. This InfoQ post looks at that and a lot of other features in [the new Axon release](https://www.infoq.com/news/2018/07/axon-query-subscriptions-kafka)
-   Check out Matt Raible's new post on the Okta blog on how [to use React.js with a Spring Boot application](https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot)
-   Want to learn about [*Reactive Spring*](https://t.co/Vor6s7j8tE?ssr=true)? Check out this talk I did for the vJUG last year!
-   It's great to see the Spring Cloud Open Service Broker API now officially supported [on the Spring Initializr](https://twitter.com/springcentral/status/1019656205222928385)
-   This is super interesting! It's a [new, third-party project called Spring Cloud Contract Swagger](https://svenbayer.blog/2018/07/17/cdc-with-swagger/), that aims to support CDCT with Swagger definitions. Cool!