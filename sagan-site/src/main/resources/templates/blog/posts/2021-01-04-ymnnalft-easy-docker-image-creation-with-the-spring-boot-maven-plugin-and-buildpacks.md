---
title: YMNNALFT: Easy Docker Image Creation with the Spring Boot Maven Plugin and Buildpacks
source: https://spring.io/blog/2021/01/04/ymnnalft-easy-docker-image-creation-with-the-spring-boot-maven-plugin-and-buildpacks
scraped: 2026-02-23T13:36:00.515Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 04, 2021 | 7 Comments
---

# YMNNALFT: Easy Docker Image Creation with the Spring Boot Maven Plugin and Buildpacks

_Engineering | Josh Long |  January 04, 2021 | 7 Comments_

Welcome to another installment of *You May Not Need Another Library For That* (`#YMNNALFT`)! I've spent a lot of time since 2016 illuminating (or trying to, anyway!) some of the more enormous opportunities in the Spring ecosystem in [my Spring Tips videos](http://bit.ly/spring-tips-playlist). Today, however, I come to you in a different spirit, wanting to focus on the little, sometimes hidden, gems that do fantastic things and that might spare you an additional third-party dependency and its implied complexity.

Have you tried out [Paketo](https://paketo.io)? It's neat-o! It alleviates one of the biggest pains of cloudy software these days:[Dockerfiles](https://docs.docker.com/engine/reference/builder/).

As an aside: the *biggest* pain point is, of course, YAML. YAML is why people leave IT! YAML: when you want the indentation-sensitive treachery of Python, with the nonexistent design-time validation of Python and *none* of the benefits of Python. YAML: because life is, clearly, not hard enough. 9/10 dentists agree: YAML causes production rot!

> "Indeed it has been said that YAML is the best form of configuration except for all those other forms that have been tried from time to time." - Not Winston Churchill

Aaaanyway, YAML is a whole, other, "Oprah," and we just don't have a ton of time to get into it, so let's move on: we want to simplify the creation of Dockerfiles. Dockerfiles are tedious and they require us to re-specify the complete environment required to run our applications in production. It's possible to get something working in a fairly minimal number of lines, but as I learned while avoiding the COVID-19 virus, "minimal" is not "none!" And besides, something working does not a production environment make. We can do better.

[Paketo](https://paketo.io/) is a Cloud Foundry foundation project based on the [buildpacks project](https://buildpacks.io/) from [CNCF](https://www.cncf.io/) (which stands for "Code Never Comes Finished," or maybe it was "Common Network Code Foundation," or was it "Cloud Native Computing Foundation"?). From the website: "buildpacks transform your application source code to images that can run on any cloud. Paketo Buildpacks provide language runtime support for applications. They leverage the Cloud Native Buildpacks framework to make image builds easy, performant, and secure." Basically: application in; container out. See? Neat!

Buildpacks come from the Heroku and Cloud Foundry Platform-as-a-service offerings. You give the buildpack an application artifact (like, say, a Java `.jar`), and the buildpack gives you back your application in a container. More specifically, it'll create a sensible filesystem containing your application artifact and everything needed to run that application artifact. So, given a `.jar`, it might create a filesystem with a JVM configured with reasonable memory bounds and any required Java agents configured. All of *that* is what eventually gets turned into a container. You'd be *shocked* what you can get containerized with virtually no configuration at all! Buildpacks work because, no matter how much we may protest, most applications aren't special. A `.jar` is a `.jar` for everybody, and a Node.js/NPM project builds the same for everybody. Buildpacks support several different languages and runtime (way too many to name). You can use the Paketo CLI to make short work of containerizing various applications, like this: `pack build .`.

Or, anyway, that's what you *would* do if you were not using [Spring Boot 2.3 or later](https://docs.spring.io/spring-boot/docs/2.4.1/maven-plugin/reference/htmlsingle/#build-image). But, you are, \_ aren't you\_? Buildpack support is now in the Spring Boot build plugins themselves.

If you were using Maven, you could type the following incantation:

```
Copy./mvnw spring-boot:build-image -Dspring-boot.build-image.imageName=bootiful/demo
```

If you were using Gradle, you could type the following incantation:

```
Copy./gradlew bootBuildImage --imageName=bootiful/demo
```

Stand back for a minute while it does all the work. It'll dump out the Docker image at the end of its work. You can then `docker tag` and then `docker push` that image to your container registry of choice ([VMware Harbor](https://goharbor.io/), [Google Container Registry](https://cloud.google.com/container-registry/), [JFrog Container Registry](https://jfrog.com/container-registry/), [DockerHub](https://hub.docker.com/), etc.).

Do you want to take that to production? That's pretty trivial, too! Here's the right incantation for Kubernetes, assuming your image is on Google Container Registry, has an artifact ID of `demo`. The version specified in `pom.xml` becomes a tag for the version of the container, too.

```
Copykubectl create deployment demo --image=gcr.io/bootiful/demo
```

Hopefully, this is enough to get you to production without so much as even having to configure something like Jib or the Spotify Maven plugin or crafting a long, byzantine shell script to do the `docker build` itself. Now, don't get me wrong. You *might* still need to create your own \`Dockerfile's for whatever reason, as you might have something to say about the ordering or contents of particular layers, and if so, then Spring Boot [has your back here](https://docs.spring.io/spring-boot/docs/2.4.1/maven-plugin/reference/htmlsingle/#build-image-customization), too.

Alright, that's more than enough to get going. Go to the [Spring Initializr](http://start.Spring.io) (my second favorite place on the internet, *after* production) and generate a new project and take your containerized application to the platform of your choice.

Did you like this gem at a glance approach? Did you learn anything? As always, I'm keen on hearing from you, so [please sound off on Twitter (@starbuxman)](http://twitter.com/starbuxman) ! I'll be back with another installment of *YMNNALFT* later this week, so be sure not to miss that. I've got installments on, among other things, Easy RPC, The Garden of `*Utils` objects, Dimensional Metrics with Micrometer, and many, many more topics.