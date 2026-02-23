---
title: The Spring Boot Dashboard in STS - Part 2: Working with Cloud Foundry
source: https://spring.io/blog/2015/10/15/the-spring-boot-dashboard-in-sts-part-2-working-with-cloud-foundry
scraped: 2026-02-23T19:21:48.758Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Martin Lippert |  October 15, 2015 | 0 Comments
---

# The Spring Boot Dashboard in STS - Part 2: Working with Cloud Foundry

_Engineering | Martin Lippert |  October 15, 2015 | 0 Comments_

Welcome back Spring community,

In this second part of our blog series about the new Spring Boot Dashboard in the Spring Tool Suite we will move beyond local applications in your workspace and take a look at remote apps deployed to a cloud runtime. If you missed the [first part](https://spring.io/blog/2015/10/08/the-spring-boot-dashboard-in-sts-part-1-local-boot-apps), please take a look it to get familiar with the boot dashboard in STS first.

## Cloud runtime support

The initial remote target that we support in the Boot Dashboard is Cloud Foundry. Neither the design nor the implementation of the Boot Dashboard limits this to be the only supported remote target, it is just the first one that we worked on.

The goal for us was to provide a similar experience as for local apps, giving you an easy way to interact, start, stop, update, and lookup log output of your Spring Boot apps on Cloud Foundry. Therefore you can add a Cloud Foundry section to the boot dashboard using the big plus icon in the toolbar.

![](http://docs.spring.io/sts/nan/v371/img/blog-series/09-cloudfoundry.png)

Once you entered your credentials and selected an org/space, a new section will appear in the boot dashboard, listing the apps that are deployed to this space on Cloud Foundry. You can see the name of the app as well as the number of instances that are configured and that are up and running.

![](http://docs.spring.io/sts/nan/v371/img/blog-series/10-cloudsection.png)

The basic actions work for one or multiple apps on CF in the same or a very similar way to how they work for local apps. You can jump to the console output and it will appear in the console view of STS/Eclipse, you can start and stop apps, you can double-click them to get to a browser window for the running app, you can configure a default path for the app, and you can add/remove tags to/from those apps. You can even execute some of the actions (like start and stop) across targets, if you select multiple entries in the boot dashboard across those target sections.

![](http://docs.spring.io/sts/nan/v371/img/blog-series/11-multiple-apps.png)

In addition to the common actions that are suitable for local and apps on Cloud Foundry, there are certain additional actions specifically for apps on Cloud Foundry. The boot dashboard allows you, for example, to delete an app entirely from Cloud Foundry, or to easily jump to the web console.

![](http://docs.spring.io/sts/nan/v371/img/blog-series/12-cloud-specific-actions.png)

## Deploying to Cloud Foundry

Up to here, we talked about existing apps on Cloud Foundry. But how do you get your apps deployed to Cloud Foundry? There are various ways, using the CLI or the Eclipse Plugin for Cloud Foundry. The boot dashboard offers you another option: you can drag&drop your Spring Boot application directly onto the Cloud Foundry target in the dashboard and it will deploy the Spring Boot app to CF. This is as easy as its sounds.

![](http://docs.spring.io/sts/nan/v371/img/blog-series/13-dnd-deploy.png)

If your application contains a manifest.yml file, this will be used to configure the application for Cloud Foundry. This typically contains the name of the app, the domain, memory settings, number of instances, and potentially a lot more.

If you don’t have a manifest.yml file in your project, the deploy action will prompt you in a dialog for the basic information it needs to deploy the app.

![](http://docs.spring.io/sts/nan/v371/img/blog-series/14-deploy-dialog.png)

But take care: if the project contains a manifest.yml file, it will be used to deploy and configure the app. Changes to the configuration on CF that you might have made via the web console will be lost the next time you restart/redeploy/update your app using the boot dashboard. Either configure everything in the manifest.yml file or go without it altogether - at least for the moment. We will be working to improve this to allow more flexible ways of dealing with manifest.yml files and external changes to the config of your app, but that is something to be done in future releases of STS.

Once the app is deployed, the boot dashboard will keep the association between the project in your workspace and the deployed app on Cloud Foundry (and will show this association in the boot dashboard).

![](http://docs.spring.io/sts/nan/v371/img/blog-series/15-project-association.png)

Keeping this association between your workspace project and the app on Cloud Foundry makes changes to this app a lot easier. If you change the code in your workspace and press the (re)start button for the app on CF, the boot dashboard will automatically re-push the app (the changes) to Cloud Foundry.

Once you have deployed your apps on Cloud Foundry, you often don’t need to work on everything locally at the same time. Usually you focus on certain parts of the application and sometimes you would like to use use even both: some services running on Cloud Foundry and some services running on your local machine in your IDE. But how do they interact?

## Tunneling local services for mixed deployments

As an early experiment, we built a specific feature into the boot dashboard that lets you use all your services and apps on CF and have them call individual services running on your local machine. That way you can focus on individual projects of your landscape and continue to use Cloud Foundry for the rest of your world. You can quickly iterate and work on the code locally - and test it while working with the other parts on Cloud Foundry. Isn’t that great?

They way this works is: You have a service discovery mechanism for your microservices in place. At the moment we support the Eureka service discovery service for this feature. You can start your local Spring Boot app using a special action called “(re)start and expose app via ngrok”. Executing this action will (re)start your local app on your machine. At the same time the action will create a public visible tunnel to this app using the ngrok service. As a result, you get a publicly visible URL that routes all its traffic to your local machine and to the local Spring Boot app that is running on your local machine. The app is automatically configured to register with the remote Eureka using this publicly visible tunnel URL.

![](http://docs.spring.io/sts/nan/v371/img/blog-series/16-ngrok-tunnel.png)

Clients to this service will now get this tunnel URL from Eureka instead of (or in addition to) the default instance of your service that might be running on Cloud Foundry already - and will call your locally running service instead of the one on CF. You can iterate on your local service quickly or even debug it.

This mixed deployment scenario is obviously not useful for production or team environments, where multiple people are using the applications on CF simultaneously. But this is extremely useful for testing and development environments.

The support for Cloud Foundry is just a starting point here. The Spring Boot Dashboard is by no means limited or focused on Cloud Foundry. Other remote cloud runtimes could and will be added in the future. One of the next runtimes that we are going to work on is Lattice, but other runtimes are very welcome as well. If you are interested in collaborating on this, let us know. The Spring Boot Dashboard is open-source under the EPL and we would be more than happy to collaborate with you on additional features and adding support for more cloud runtimes to it.

## Outlook

The third part of this series will introduce you to the built-in support for the Spring Boot Devtools and how you can use them from within the Boot Dashboard to make quick modifications to your apps (even on CF) and how to do remote debugging on CF.