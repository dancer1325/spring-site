---
title: Using Cloud Foundry from STS
source: https://spring.io/blog/2011/04/13/using-cloud-foundry-from-sts
scraped: 2026-02-24T08:43:01.217Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Dupuis |  April 13, 2011 | 0 Comments
---

# Using Cloud Foundry from STS

_Engineering | Christian Dupuis |  April 13, 2011 | 0 Comments_

By now you probably heard about [Cloud Foundry](http://www.cloudfoundry.com), the open PaaS from VMware that was announced yesterday; if not make sure to check out the [recording of the webcast](http://www.youtube.com/user/vmwaretv?feature=mhum#p/c/71331D676E1D17CA). Eventually you have already read earlier blog posts introducing the [Spring support for Cloud Foundry](http://blog.springsource.com/2011/04/12/cloud-foundry-for-spring-developers/), the add-on for [Spring Roo](http://blog.springsource.com/2011/04/12/roo-cloud-foundry-productivity-in-the-cloud/) and the [Grails plug-in](http://blog.springsource.com/2011/04/12/one-step-deployment-with-grails-and-cloud-foundry/).

With this post I’d like to introduce the Eclipse-based support for Cloud Foundry that lets you manage your cloud deployments, including configuration of Services and service bindings, application scaling, access to file resources and much more.

## Installing the Cloud Foundry for Eclipse and STS

There are three options to install the Cloud Foundry plugin into SpringSource Tool Suite (STS) and plain Eclipse. I will go through those options step-by-step in order to help you get started quickly.

### Installing through the STS Extension Install

Probably the easiest way to get started with the Cloud Foundry plugin is by installing it into a pre-installed copy of STS. You should have at least version 2.5.1.RELEASE installed; 2.6.1.SR1 is better. STS for various supported operating systems can be found on the [download page](http://www.springsource.com/downloads/sts).

Within STS select “Help > Dashboard” and click on the Extension tab at the bottom of the Dashboard. Wait for the extension listing to be loaded and select “Cloud Foundry Integration” from the “Server and Clouds” category; click “Install” to launch the installation procedure.

[![](http://blog.springsource.com/wp-content/uploads/2011/04/1.png "1")](http://blog.springsource.com/wp-content/uploads/2011/04/1.png)

From here on you can just follow the steps of the installation wizard. Along the way you need to review and accept the license agreement and restart STS to finalize the installation. After restarting STS you’re ready to connect to Cloud Foundry.

### Installing from Eclipse Marketplace

The Cloud Foundry plugin can quite easily be installed into plain Eclipse installations. To make sure that all dependencies can be satisfied during installation you should start be installing the “Eclipse IDE for JEE Developers” package. This package can be downloaded from the [Eclipse download page](http://www.eclipse.org/downloads/) or from the [SpringSource member distribution page](http://www.springsource.com/products/eclipse-downloads).

Start the installation by launching the Eclipse Marketplace client by selecting “Help > Eclipse Marketplace”. Type “cloud foundry” into the search field and select “Go”. This will find the “Cloud Foundry Integration” which you can install by clicking the “Install” button next to the listing in the search results.

[![](http://blog.springsource.com/wp-content/uploads/2011/04/2.png "2")](http://blog.springsource.com/wp-content/uploads/2011/04/2.png)

Again, now you just need to follow the steps in the software installation wizard; accept the license terms, eventually agree to install un-signed content and restart Eclipse when being asked to do so. After restarting your Eclipse you’re ready to connect to Cloud Foundry and deploy your first application from inside your development environment.

### Manual install from Update Site

If you don’t like or can’t use the STS Extension Install mechanism or Eclipse Marketplace Client you can install the integration plugin manually from the following update site:

`[http://dist.springsource.com/milestone/TOOLS/cloud/e3.6](http://dist.springsource.com/milestone/TOOLS/cloud/e3.6)`

Please note: the update site does not support directory indexing. Therefore you’ll get a “Access Denied” error message when hitting the URL with your web browser.

## Connecting to Cloud Foundry

The Cloud Foundry Integration plugin tightly integrates the cloud into the Web Tools Project (WTP) Server infrastructure. This is the most commonly known approach to deploying Java web applications from Eclipse. Most of you probably used the Servers View to deploy to a local Tomcat or tc Server instance.

With the Cloud Foundry Integration for Eclipse you will continue to use the Servers view to deploy your applications to the cloud. To start we first need to create a new WTP Server. This server represents your Cloud Foundry account and you’ll be able to connect to your Cloud Foundry account; much like using “vmc target ; vmc login” from the command line.

The following steps guide you through the process of connecting to Cloud Foundry:

-   Open the “Servers” view from “Window > Show view … > Other … > Servers”
-   Right click in the “Servers” view and select “New > Server”
-   Select “Cloud Foundry” from the “VMware” category and click “Next"
-   Enter your account information and select the cloud you want to connect to. If you have a Cloud Foundry account select “VMware Cloud Foundry – http://api.cloudfoundry.com” from the URL drop-down box. You can also use the Cloud Foundry Integration with a local installation of Cloud Foundry. Finally press “Validate Account” to check if the connection can be established successfully.
-   Click “Finish” to close the “New Server” wizard

[![](http://blog.springsource.com/wp-content/uploads/2011/04/3.png "3")](http://blog.springsource.com/wp-content/uploads/2011/04/3.png)

After finishing the “New Server” wizard you should see a new entry in the “Servers” view for Cloud Foundry. The connection to Cloud Foundry will automatically be established and you’ll see your deployed applications below the Cloud Foundry server node in the Servers view.

[![](http://blog.springsource.com/wp-content/uploads/2011/04/4.png "4")](http://blog.springsource.com/wp-content/uploads/2011/04/4.png)

You may notice that the “Start” and “Stop” actions in the view’s toolbar are disabled. Instead you’ll find “Connect” and “Disconnect” actions in the context menu when right-clicking the Cloud Foundry server.

### Deploying Applications

Deploying applications to Cloud Foundry is now just a question of dropping the application onto the Cloud Foundry server in the “Servers” view. Alternatively you could use the “Add and Remove …” action from the server’s context-menu.

Once the application has been added to Cloud Foundry it can be started: right-click the application in the “Servers” view and select “Start”. This will bring up the application deployment wizard that allows you specify the application name, URL and memory reservation. We’ll add more configuration options in the future.

After clicking “Finish” the plugin will upload and start the application on Cloud Foundry. You can review the status of your application deployment by double-clicking the application in the “Servers” view. This brings up the “Server Editor” that has been extended to show Cloud Foundry specific information.

[![](http://blog.springsource.com/wp-content/uploads/2011/04/5.png "5")](http://blog.springsource.com/wp-content/uploads/2011/04/5.png)

### Service Provisioning and Binding

The application that you want to deploy likely needs to access Services provided by Cloud Foundry. To initially provision the services you can use the “Server Editor”: on the “Applications” tab press the “Add service” action from the toolbar of “Services” section.

Once the services are provisioned to your Cloud Foundry account, you can bind them to your applications. To do so just drag and drop the services you want to bind to certain application to “Application Services” table on the right side of the “Server Editor”. If your application needs to access services during startup and would fail to start without the services being available, bind the services before you start your application.

### Remote File Access

The Cloud Foundry Integration for Eclipse provides access to remote file resources, much like “vmc files ” and “vmc logs --all”. Click the “Remote Systems View” link on the bottom right of the application details pane in the “Server Editor”. This brings up the "Remote Systems" view which will let you browse the file tree and open files, e.g. log files, directly from within Eclipse.

[![](http://blog.springsource.com/wp-content/uploads/2011/04/6.png "6")](http://blog.springsource.com/wp-content/uploads/2011/04/6.png)

## What's next

We'll continue to improve the Cloud Foundry Eclipse support over the coming weeks. As always we very much value community feedback. Therefore please take some time to check out the plugin and let us know what you think.

In case you find any issues please raise JIRAs in the [STS issue tracker](https://issuetracker.springsource.com/browse/STS).