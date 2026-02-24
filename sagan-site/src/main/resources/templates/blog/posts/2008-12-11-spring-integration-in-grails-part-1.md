---
title: Spring Integration in Grails (Part 1)
source: https://spring.io/blog/2008/12/11/spring-integration-in-grails-part-1
scraped: 2026-02-24T09:12:08.695Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Russ Miles |  December 11, 2008 | 1 Comment
---

# Spring Integration in Grails (Part 1)

_Engineering | Russ Miles |  December 11, 2008 | 1 Comment_

Spring Integration last week went [1.0 GA](http://www.springsource.org/spring-integration) and so, inspired by [Adrian's keynote](http://www.springsource.org/node/845) (no, not the Monty Python sketch, just the Grails live-coding example) from SpringONE Americas, I thought it would be fun to show how to take advantage of Spring Integration in the slightly different setting of a Grails application.

Please note: This is a cross post from my own blog @ [www.russmiles.com](http://www.russmiles.com)

This series of articles will look at how to add Spring Integration to Grails in a number of configurations that will eventually lead to a full Grails plugin for Spring Integration. More like an online diary, you'll get the chance to see how we take our first steps by bootstrapping Spring Integration into a Grails application, through using some of the more advanced features of Spring Integration to bridge messages across diverse infrastructures, to finally applying this experience to create a Grails plugin that you can use to quickly and easily add Spring Integration to your own Grails projects.

If you'd prefer to have the finished project as you work through the article, the full Grails project source code is [available for download here](http://www.russmiles.com/storage/code/grails-integration-part1/grails-plus-integration-demo.zip) (NOTE: Built against [Grails 1.1 Beta 1](http://www.grails.org/Download) )

## Grails (for blaggers)

Grails is a dynamic, convention-over-configuration application framework based on the Groovy language that uses Spring under the covers. This usage of Spring makes it a doddle to add [Spring portfolio project](http://www.springsource.org/projects) functionality to a Grails application, which is exactly what we will look at in this article in terms of the Spring Integration project.

## Spring Integration (for blaggers)

For anyone who has not had the chance to use Spring Integration, in a nutshell it is a lightweight message-oriented collection of libraries that you can use inside your Spring-based applications. To that end, Spring Integration has some core concepts that are useful to understand:

-   **Messages** Messages are the core abstraction of any message-oriented middleware and Spring Integration is no different. Messages can be made up of any Java, and therefore Groovy, type that is then passed from endpoints to endpoint using channels...
-   **Endpoints** Endpoints are the components that want to send or receive a message. Sometimes a number of endpoints are involved in the chain of pipes between where a message is sent and it is delivered. To this end, endpoints itself is a strange name as in fact nothing actually ends at an endpoint.
-   **Channels** These are the pipes that hold your messages while they are in transit from one endpoint to another. Channels come in a number of flavors, including [Direct](http://static.springframework.org/spring-integration/reference/htmlsingle/spring-integration-reference.html#channel-implementations-directchannel) channels (Messages are passed in a blocking fashion from endpoint to endpoint in the same thread), which is the default type of channel if no other behavior is specified, and [PublishAndSubscribe](http://static.springframework.org/spring-integration/reference/htmlsingle/spring-integration-reference.html#channel-implementations-publishsubscribechannel) channels (Messages are sent to all subscribed consumers in an asynchronous, non-blocking fashion).

## Getting started - Creating the sample application

The first step in any Grails development is to create an application to do your work in. A Grails application is made up of a number of directories and files that all have an implied meaning within the context of the Grails convention over configuration approach.

To create your Grails application, all you have to do is make sure that your Grails installation is on your path and then issue the following command from the command line:

\> **grails create-app grails-plus-integration-demo**

If everything is working fine then you should see the following output:

... some other output first and then ...

**Created Grails Application at <Your directory>/grails-plus-integration-demo**

Grails has now created an application in the grails-plus-integration-demo directory from wherever you typed the grails create-app command. Change directory into your new Grails application and then run it to make sure everything is healthy:

\> **cd grails-plus-integration-demo** \> **grails run-app**

You should see some output like the following:

... other output then ...

**Server running. Browse to http://localhost:8080/grails-plus-integration-demo**

Open up your browser of choice and navigate to the address of your running grails application, which should be **[http://localhost:8080/grails-plus-integration-demo](http://localhost:8080/grails-plus-integration-demo)** and you should see something like the following:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images01-running-app.png)

**Figure 1. Your new Grails app, up and running**

Ok, nothing groundbreaking so far but now we are all set to create some functionality that will eventually exercise a Spring Integration messaging pipeline. To close your Grails application from the command-line, press Ctrl-C.

## **Creating the Domain objects**

If you're practicing domain driven design then a typical next step is to create some domain objects. Grails is designed with this approach in mind and provides some default commands to get you started.

For our very simple sample application in this article, all we need is one domain object called inventively "GreetingsMessage". To do this, use the following grails command from within your new application's directory:

\> **grails create-domain-class GreetingsMessage**

You should then see something like the following:

**Running script /Applications/SpringSource/grails/grails-1.1-beta1/scripts/CreateDomainClass.groovy Environment set to development Created DomainClass for GreetingsMessage Created Tests for GreetingsMessage**

With your GreetingsMessage domain class created, it's time to add a couple of properties. To do this you'll need to edit the GreetingsMessage.groovy file that is currently residing in your grails-app/domain directory. You only need to add one line for our sample to allow us to send a string message along as the content of a GreetingsMessage object:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images02-updating-domain-class.png)

**Figure 2. Updating your domain class with one property**

Save away your updated GreetingsMessage domain class and you're done.

## **Creating a controller and form view**

Next we need to create a controller and a view to create instances of our GreetingsMessage to then eventually send them across a Spring Integration pipeline. Now, if we were simply persisting our GreetingsMessage objects in a database then we could use the grails generate-all command to give us immediate access to all the controllers and views we'd need. However, in this sample application all we want to create is a controller that allows the user to enter a string for the message content and then to route that to a specific service endpoint and so we're going to hand craft a simple controller and view to do that.

Using the command line, create a grails controller called "GreetingsMessageSender":

\> **grails create-controller GreetingsMessageSender**

This command should emit something like the following:

**Running script /Applications/SpringSource/grails/grails-1.1-beta1/scripts/CreateController.groovy Environment set to development Created Controller for GreetingsMessageSender \[mkdir\] Created dir: /Users/russellmiles/project/grails-plus-integration-demo/grails-app/views/greetingsMessageSender Created Tests for GreetingsMessageSender**

You've now created an empty controller and some unit tests for its functionality. Grails has also created an empty directory in your **grail-app/views** directory called greetingsMessageSender that will contain your view templates when you've added some controller methods.

The next step is update the controller with the methods we want it to support. Open and update **grails-app/controllers/GreetingsMessageSender.groovy** so that it matches the following:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images03-partially-completed-controller.png)

**Figure 3. The (partially) completed GreetingsMessageSender controller**

If you're not too familiar with Groovy then this is what the class's code is doing:

-   The index closure is executed when the controller is visited with no other specific action being invoked. For the time being, this index closure is simply redirecting the browser to the send action.
-   The send closure is executed whenever the send action on this controller is visited by a browser. This code for now simply looks for a 'content' entry in the HTTP params passed into the send closure, and then, if not null, sets the flash message with some simple text that can then be rendered in the associated view.

So where's the associated view? It's now time to create one. Save away your controller and then create a new file in the **grails-app/views/greetingsMessageSender** directory called **send.gsp**.

There's quite a bit of code in this send.gsp view, so I recommend that you [download the code here](http://www.russmiles.com/storage/code/grails-integration-part1/send.gsp) as opposed to typing it all in yourself. However if you're feeling plucky then you can copy the code shown below into your send.gsp file:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images04-completed-view.png)

**Figure 4. The completed send.gsp view**

The key pieces of code in the view to focus on are the g:form and the flash.message sections. The g:form contains a single input text box that populates the content field from the form into the HTTP params that will then be picked up by the send closure on the GreetingsMessageSenderController when the form is submitted.

The flash.message code displays the contents of the flash collection, in this case our message as added by the send closure.

You're now ready to run and try out this simple interface, although we don't expect it to do much for the time being. Try it out by running your app again using the **grails run-app** command and navigating to your application's homepage:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images05-completed-grails-app-homepage.png)

**Figure 5. Your new controller link on your Grails application homepage**

Clicking on the GreetingsMessageController results in the 'index' method being executed, which then results in your browser being redirected to the send closure and you should then see your new form:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images06-completed-message-entry-form.png)

**Figure 6. Your send form**

You should be able to enter in a message in the text box, click on "Send", and then, well, nothing will happen... yet.

## **Add one part Spring Integration, mix well**

So far you've created a pretty straightforward Grails application but now it's time to add a little Spring Integration into the mix. Spring Integration offers a great way to loosely de-couple components inside and outside your application, and that's exactly what we're going to do here.

The plan is to create a service that takes a string and then simply pushes it to upper case. Nothing too exciting there, but here's the juicy part: we're going to make it so that our front-end controller has no idea where the controller is or what interface it supports. Of course, we could simply inject our service into the controller, but that would tie our controller to the service at the interface level. What we're going to do here is manifest the contract between the service and the controller as nothing more than the types of messages that will be passed, in this case messages that contain a single string.

**NOTE:** SOA folks ears will have likely pricked up when I mentioned contracts and message passing. realizing that this is fairly close to the purpose of services where you declare the contract as being the types of messages that will be exchanged with a service endpoint. This is absolutely on purpose but it's worth mentioning that although Spring Integration is a great facilitator for SOA practices, it is no where near as heavy weight as having a distributed, monolithic ESB even though it shares some of the same architectural underpinnings (like message passing and endpoints). Typical ESB implementations tend to result in expensive web service calls to achieve the most trivial of exchanges and come with all sorts of baggage, whereas Spring Integration allows complete control to scale up exchanges from in-thread message passing, through multi-thread in-process polling, right up to inter-process/machine exchanges if they are required (more on that in forthcoming articles in this series).

The first step is to add the Spring Integration libraries to our sample application. Grails has a specific, per-application location for libraries that are directly depended upon by the application. The easiest way of doing this is to copy the contents of the Spring Integration distribution dist directory to our grails application's lib directory.

![](http://www.russmiles.com/storage/images/grails-integration-part1/images08-spring-integration-dist.png)

**Copy the contents of the Spring Integration dist directory...**

![]( http://www.russmiles.com/storage/images/grails-integration-part1/images07-application-root-directory.png)

**... to the lib directory in your Grails application's root directory.**

Adding the libraries makes Spring Integration available to your Grails application. You're now all set to create your Spring Integration pipeline, after you've created the component that will service that pipeline.

## **Creating a Grails Service as the pipeline endpoint**

Grails includes the concept of a service so we're going to create a simple service that will take an incoming String message and shift its contents to uppercase. To create the service, using the following Grails command:

\> **grails create-service DemoBean**

Executing this command should give you an output similar to the following:

**Running script /Applications/SpringSource/grails/grails-1.1-beta1/scripts/CreateService.groovy Environment set to development Created Service for DemoBean Created Tests for DemoBean**

Now Grails has created a DemoBeanService inside the grails-app/services directory. It's not the most interesting service, but it will serve to illustrate the spring integration mechanisms.

To complete the service, open up the **DemoBeanService.groovy** file in the **grails-app/services** directory and complete it as show below:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images09-demo-bean-service.png)

**Figure 7. Your completed DemoBeanService class**

The service has one method whose purpose is to shift any incoming string to uppercase before it is returned. Now that you have a service that you want to invoke when a user submits a String into the controller, it's time to wire these two together.

Now, we could use DI directly but for this example we're going to lay the foundation of a more flexible architecture by using Spring Integration to handle passing the incoming strings to the specific service that we configure.

## Creating the Spring Integration pipeline

To join up our front end Grails controller with a backend service we're going to use a simple Spring Integration pipeline. Spring Integration is driven using a Spring configuration domain specific dialect with its own namespace to keep the configuration as minimal as possible.

Grails supports adding existing Spring XML configuration to an application using a convention where the configuration is kept in a **resources.xml** file in the **grails-app/conf/spring** directory. To save yourself some typing time, [download that file here](http://www.russmiles.com/storage/code/grails-integration-part1/resources.xml) and then drop it into your **grails-app/conf/spring** directory.

Next, open up the **resources.xml** in your favorite text editor and let's have a look at what's going on.

First, notice that we're introducing the Spring Integration namespace so that we can use the elements and attributes associated with the Spring Integration XML-based domain specific language. In fact, the Spring Integration namespace is set up as the default namespace for the document, so we have to qualify bean elements with a namespace.

The entire pipeline is then expressed in this document. The main components and the roles that those components meet in this pipeline are as follows:

-   **The Gateway, whose id is** **messagingGateway** This component is in fact a facade that separates the rest of the application from the underlying messaging architecture. Components can consume this gateway and invoke it as normal, synchronously according to the specified service interface. Under the skin, the gateway is a proxy that will conduct the necessary messaging exchanges the the Spring Integration channels. In this case, the gateway will take the contents of any method invocation and wrap the contents in a Spring Integration message before placing it on the default-request-channel.

-   **The outgoing channel, whose id is demoChannel** This channel is where outgoing messages are placed. An incoming message channel is not actually needed as Spring Integration will create a temporary channel for reply messages that automatically hooks up with the gateway that the request messages came from. This is achieved using a correlation id that is originally set by the gateway.

-   **The service activator endpoint, whose id is localService** This component is responsible for invoking a specific method on a specific bean when a message appears on the incoming channel. In this case the doSomething method on the demoBean service will be invoked with the message contents, which is a string as dictated by the parameter on the doSomething method.

**NOTE:** All service classes in grails by default result in a singleton service object of that class that is indexed in the Spring application context under a camel-cased version of the class name. So where the service-activator refers to the demoBeanService bean, this is automatically resolved by Grails to the singleton instance of the DemoBeanService we created earlier.

And that's it, we have a complete message passing pipeline that will pass messages through an internal queue, strongly decoupling any message provider from the consumers. You'll notice that any consumer that creates a message and invokes the gateway does not need to know where the message ends up, nor does it even need to know what interface that destination endpoint implements. The contract here is the types of the messages being passed, which for this simple example are merely Strings.

## Hooking in the gateway to the controller

The final step is to hook the Spring Integration pipeline into the Grails controller so that it can pass and receive messages transparently. As far as the controller is concerned, it is merely invoking a local object that meets a specific interface, but under the skin Spring Integration is routing that message to the specified bean which is our **demoBeanService**.

To tie the loose ends, you need to create a service interface that you are happy to expose to the controller. Note that the actual bean that is referenced by the endpoint does not need to necessarily implement the same interface, it's the message parameters that matter here.

To create the interface, create a Java interface in the **src/java** directory called **MessageService.java**, within a suitable package structure like **com.russmiles.demo.grails.integration**. Complete the interface so that it matches the following:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images10-message-service-interface.png)

**Figure 8. The definition of the MessageService interface**

Now that you've defined the gateway interface, the last job is to hook the gateway itself into your controller. In grails, you can automatically provide dependencies to an object based upon their name, and so to access the gateway from inside your controller all you need to do is declare an attribute whose name matches the gateway's id:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images11-adding-gateway-dependency.png)

**Figure 9. Adding the dependency on the gateway into your controller**

Now that you've hooked in the gateway to the controller, you can amend your send closure to make use of it:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images12-final-controller.png)

**Figure 10. Your completed controller**

And that's it, time to fire up your Grails application that uses Spring Integration.

### Running your Spring Integration based Grails application

With everything wired together, all that's left to do is to take your application for a spin. Run the Grails application using the usual command:

\> **grails run-app**

Now go and visit your **GreetingsMessageSenderController** in your browser as shown below:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images13-final-form-ready-for-input.png)

**Figure 11. Your form, ready for input to trigger your Spring Integration pipeline**

Enter in some text to the form and click on Send:

![](http://www.russmiles.com/storage/images/grails-integration-part1/images14-final-form-taking-input.png)

**Figure 12. Some data entered into the form and ready to roll**

The following diagram shows what should happen next:

![](http://www.russmiles.com/storage/images/grails-integration-part1/15-final-form-with-return-message.png)

**Figure 13. You message, sent through the pipeline and returned processed to be displayed as part of the flash message**

To reiterate, here's what's happening when you click that "Send" button.

When you click send, your controller will call the gateway, the gateway will hand the message onto the appropriate channel as a Spring Integration message, the service activator will then take that message, unpack it and invoke the demoBean service. The service takes the string content and shifts it to upper case and returns the result through a temporary channel setup for this exchange. The method on the gateway returns, unblocking the controller who then renders the view with the result in the flash collection.

## Summary

This article was just the first attempt to bootstrap a Spring Integration messaging pipeline into a Grails application. The next step is to do something a bit more than just pass a message from a gateway to a service-activated object in process. In the next article in this series we'll look at how to take advantage of our flexible Spring Integration pipeline to pass a message to a service endpoint that is not running in the same process as our Grails application, using JMS adapters.