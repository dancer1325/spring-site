---
title: Bootiful GCP: To Production! (8/8)
source: https://spring.io/blog/2018/09/13/bootiful-gcp-to-production-8-8
scraped: 2026-02-23T15:13:47.574Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 13, 2018 | 1 Comment
---

# Bootiful GCP: To Production! (8/8)

_Engineering | Josh Long |  September 13, 2018 | 1 Comment_

> Hi Spring fans! In this brief 8 part series we’re going to look at the Spring Cloud integration for Google Cloud Platform, called Spring Cloud GCP. [Spring Cloud GCP](https://cloud.spring.io/spring-cloud-gcp/) represents a joint effort between Google and Pivotal that endeavors to provide a first class experience for Spring Cloud developers when using the Google Cloud Platform. Pivotal Cloud Foundry users will enjoy an even [easier integration with the GCP service broker](https://docs.pivotal.io/partners/gcp-sb/index.html). I wrote these installments with input from Google Cloud Developer Advocate, and my buddy, [Ray Tsang](http://twitter.com/saturnism). You can also catch a walkthrough of Spring Cloud GCP in our Google Next 2018 session, [Bootiful Google Cloud Platform](https://www.youtube.com/watch?v=2Jo3vy7iQf8). Thanks buddy! As always, [I'd love to hear from you if you have feedback](http://twitter.com/starbuxman).

There are eight posts in the series. Here they all are:

-   [Bootiful GCP: Getting Started with Spring Cloud for Google Cloud Platform (1/8)](https://spring.io/blog/2018/08/20/bootiful-gcp-getting-started-with-spring-cloud-for-google-cloud-platform-1-8)
-   [Bootiful GCP: Relational Data Access with Spring Cloud GCP (2/8)](https://spring.io/blog/2018/08/23/bootiful-gcp-relational-data-access-with-spring-cloud-gcp-2-8)
-   [Bootiful GCP: Globally Consistent Data Access with Spanner (3/8)](https://spring.io/blog/2018/08/27/bootiful-gcp-globally-consistent-data-access-with-spanner-3-8)
-   [Bootiful GCP: Integration with Google Cloud Pub/Sub (4/8)](https://spring.io/blog/2018/08/30/bootiful-gcp-integration-with-google-cloud-pub-sub-4-8)
-   [Bootiful GCP: Runtime Configuration with Spring Cloud GCP Runtime Config (5/8)](https://spring.io/blog/2018/09/03/bootiful-gcp-runtime-configuration-with-spring-cloud-gcp-runtime-config-5-8)
-   \[Bootiful GCP: Supporting Observability with Spring Cloud GCP Stackdriver Trace (6/8)

\]([https://spring.io/blog/2018/09/06/bootiful-gcp-supporting-observability-with-spring-cloud-gcp-stackdriver-trace-6-8](https://spring.io/blog/2018/09/06/bootiful-gcp-supporting-observability-with-spring-cloud-gcp-stackdriver-trace-6-8))

-   \[Bootiful GCP: Use Spring Cloud GCP to Connect to Other GCP Services (7/8)

\]([https://spring.io/blog/2018/09/10/bootiful-gcp-use-spring-cloud-gcp-to-connect-to-other-gcp-services-7-8](https://spring.io/blog/2018/09/10/bootiful-gcp-use-spring-cloud-gcp-to-connect-to-other-gcp-services-7-8))

-   [Bootiful GCP: To Production! (8/8)](https://spring.io/blog/2018/09/13/bootiful-gcp-to-production-8-8)

As we’ve worked through these examples we’ve relied on the default authentication of the Google Cloud SDKs and Spring Cloud GCP working with a local installation of the Google Cloud SDK and the `gcloud` CLI. Spring Cloud GCP’s auto-configuration configures a `DefaultCredentialsProvider` that looks for *some* way to authenticate. Everything’s worked fine on our local machine so far because we ran the interactive authentication prompt and confirmed on the Google Cloud website the linking of our authorities to this application. But what if you want to run tests in a CI environment or deploy the application to a cloud platform?

We need a way to convey our authorization when running in these environments. We can do this on Google Cloud using *service accounts*. The [process is explained here](https://cloud.google.com/docs/authentication/production#auth-cloud-implicit-java). The gist is that you will need to describe, as narrowly as possible, the privileges your application can have using a Google Cloud service account and then render those credentials into a file which we will feed to the application.

```shell
CopyPROJECT_ID=$(gcloud config list --format 'value(core.project)')

NAME=gcp-service-app

gcloud iam service-accounts create $NAME

gcloud projects add-iam-policy-binding $PROJECT_ID  --member "serviceAccount:${NAME}@${PROJECT_ID}.iam.gserviceaccount.com" --role "roles/owner"

gcloud iam service-accounts keys create ${NAME}.json --iam-account ${NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

-   the name is arbitrary. You might use a name that reflects the nature of your application.
    
-   create the service account giving it a name
    
-   add a role - `roles/owner` - to our service binding. You would do well to be more granular in assignment of your roles.
    
-   generate a file, `gcp-service-app.json`, that contains the key.
    

The result of this process should be a `.json` file, `gcp-service-app.json`, on your local machine.

> **Warning**
> 
> That `.json` file is a secret! Do *not* share or lose track of it!

You need to tell the Spring Cloud application where to find this credential. You can pass it to Spring Cloud GCP as a file location or a Base 64-encoded `String`. Let’s do the latter. We can use the `spring.cloud.gcp.credentials.encoded-key` to convey the Base64-encoded contents of the file we just generated.

This is a secret value, and it will differ from one environment to another. We don’t want it checked into version control, in `src/main/resources/application.properties`, and even if we did we’d still need to maintain different environment-specific values. Spring Boot lets us provide overrides when running the application. We could use `application.properties` or `application.yml` files. We could stash thm in environment-specific Runtime Config. We could provide them as `-D` arguments or environment variables when running the application. So could easily say `java -Dspring.cloud.gcp.credentials.encoded-key=…​ -jar ..` to provide a value that either contributes a new value to the application or overrides the existing value in `src/main/resources/application.properties`.

Environment variables are a more natural fit for platforms like Cloud Foundry or Heroku where we don’t necessarily want to have control over *how* an application is run, over its `java` incantation. The platform Buildpack does that for us. Let’s look at how we could run the application locally.

**run.sh.**

```shell
Copy#!/bin/bash

export SPRING_CLOUD_GCP_CREDENTIALS_ENCODED_KEY=$( cat $GCP_SERVICE_ACCOUNT_KEY_FILE | base64 -w0  )
export SPRING_CLOUD_GCP_PROJECT_ID=$(gcloud config list --format 'value(core.project)')

mvn clean spring-boot:run
```

-   when you run this script, set the environment variable `SPRING_CLOUD_GCP_CREDENTIALS_ENCODED_KEY` before running the application to point to the location of your service account `.json` file.

On my machine, I was able to run that script like this: `GCP_SERVICE_ACCOUNT_KEY_FILE=/home/jlong/keys/gcp-service-account.json ./run.sh`. Your local path for the `.json` file will most likely vary.

You can translate those environment variables as needed for your particular CI environment. Once your application has been tested and integrated, it’s off to production! For me, production is Cloud Foundry (running on top of Google Cloud, no less). Here’s a script that deploys the application to the Cloud Foundry instance in which I’m authenticated.

**deploy.sh.**

```shell
Copy#!/usr/bin/env bash

mvn -DskipTests=true clean package

cf d -f $APP_NAME

cf push --no-start --random-route -p $JAR $APP_NAME
cf set-env $APP_NAME SPRING_CLOUD_GCP_CREDENTIALS_ENCODED_KEY "$( cat $GCP_SERVICE_ACCOUNT_KEY_FILE | base64 -w0 )"
cf set-env $APP_NAME SPRING_CLOUD_GCP_PROJECT_ID $(gcloud config list --format 'value(core.project)')

cf restart $APP_NAME
```

-   warning! this script **deletes** the existing application. You don’t need to, but it ensures things are cleanly reset :)
    
-   here we push the application, giving it a random route, and tell Cloud Foundry to *not* start it. Then, we specify environment variables for the application.
    
-   finally, we start the application now that we’re done securing it.
    

> **Tip**
> 
> In both `run.sh` and `deploy.sh` we used `base64 -w0` to encode the `.json` service account file in Base64. One of us is running on Linux and the other on OS X. The `-w0` operand ensures that the Base64 encoded file isn’t hard-wrapped, that it is one contiguous line of text, when running on Linux against the `GNU` `base64` utility.