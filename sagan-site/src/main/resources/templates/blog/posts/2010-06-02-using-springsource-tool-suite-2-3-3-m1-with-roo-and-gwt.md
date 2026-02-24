---
title: Using SpringSource Tool Suite 2.3.3.M1 with Roo and GWT
source: https://spring.io/blog/2010/06/02/using-springsource-tool-suite-2-3-3-m1-with-roo-and-gwt
scraped: 2026-02-24T08:57:12.912Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Dupuis |  June 02, 2010 | 1 Comment
---

# Using SpringSource Tool Suite 2.3.3.M1 with Roo and GWT

_Engineering | Christian Dupuis |  June 02, 2010 | 1 Comment_

By now, most of you probably have heard about the announcements at Google I/O around Spring, Roo, STS and GWT. [Ben](http://twitter.com/benalexau) and [Rod](http://twitter.com/springrod) covered this in their respective [blog](http://blog.springsource.com/2010/05/19/spring-roo-1-1-0-m1-released/) [posts](http://blog.springsource.com/2010/05/19/spring-google-appengine/) recently. If you missed the keynote I strongly recommend to watch the recording on YouTube to catch up (the relevant section starts at 1:09:00 into the recording).

Today I'd like to provide some detailed steps and instructions on how you can use Roo and STS to create your first GWT application.

## Installation

Before we can fire up the Roo shell and start typing commands, we need to download and install all pre-requisites. Although a lot of components are involved in building advanced single-page applications that can run on the cloud, you really only need to download the STS 2.3.3.M1 bundle for your operating system. The STS installation includes Roo 1.1.0.M1, tc Server Developer Edition with Spring Insight (required to get Speed Tracer integration), Maven 2.2 and access to the Google Plugin for Eclipse (GPE).

1.  Download STS 2.3.3.M1 from [springsource.com](http://www.springsource.com/products/springsource-google-download).
2.  Run the installer or extract the downloaded archive. Follow the [installation instructions](http://download.springsource.com/release/STS/doc/STS-installation_instructions-2.3.2.RELEASE.pdf).
3.  Start STS and bring up the Dashboard ("Help -> Dashboard").
4.  Install the "Google Plugin for Eclipse" and the "DataNucleus Plugin" from the Dashboard's Extension tab.
5.  Restart when prompted.

## Create GWT scaffold Application

After installing STS we are ready to start up Roo and create our app. If you want to take a look at the application that was used during the keynote follow these steps:

1.  At your operating system command prompt, create a new empty directory and change into it.
2.  Start Roo 1.1.0.M1 by typing "roo" and pressing enter. Take a look at the version number that Roo displays in the shell banner when started. It should read "1.1.0.M1 \[rev 3a0b8a3\]". For your convenience Roo has been installed along-side STS in the same folder.
3.  Enter "script expenses.roo". This will run the provided Roo script and create the basic expense tracking sample application used by Ben during the keynote address.
4.  Type "quit" to exit the Roo shell.

By now you have a fully working Spring & GWT 2.1 application. Feel free to take a look around in the code Roo has produced for you. If you want to learn more about the architecture underlying this GWT application, I recommend Ray Ryan's [Google I/O session](http://code.google.com/events/io/2010/sessions/architecting-production-gwt.html). Take a look at the session recording and slides available from the I/O side.

## Run Application

Thanks to Roo you can easily locally run the generated application. If you have Maven installed on your system, simply type "mvn gwt:run" at your operating system command prompt. Just ensure you're still in the same directory as you created your project in. This will launch the GWT Development Mode from which you can easily load the GWT application in your browser. In order to use GWT Development Mode you need to install the related browser plugin. Your browser will prompt you to install the plugin if it is not already installed.

## Import Project into STS

In cooperation with the Google Plugin for Eclipse (GPE) team at Google we have enhanced STS so that you can easily take the created Roo project and import it into your Eclipse environment. STS will auto-configure your project so that it can be used with built-in Maven and GWT support without ever leaving your IDE.

From STS import the project using "File -> Import ... -> Maven -> Existing Maven Project". This will automatically configure all required project settings, install classpath containers and launch the Roo shell.

## Run Application from within STS

Using Google's GWT tools it is now very easy to launch the application from within STS. This allows you to debug your server-side code, but more interestingly your front-end GWT Java code as well. From the project's context menu select "Debug As -> Web Application". Please select the "ApplicationScaffold.html" html page to start and click "OK". Just confirm the "WAR Directory Selection" dialog to accept the default.

In the "Console" view you can now see the embedded GWT Development Mode starting. Additionally GPE's "Development Mode" view will appear making it easy to access the launched application. See below screenshot.

[![GWT Development Mode](http://blog.springsource.com/wp-content/uploads/2010/06/devmode.png "GWT Development Mode")](http://blog.springsource.com/wp-content/uploads/2010/06/devmode.png)

At this point feel free to add breakpoints and use the Eclipse debugger to familiarize yourself with the generated application.

In order to try out Roo's great round-tripping support please open the "Employee" Java source file and add a new field. For example, add a "private String comment" field and save the file. Notice how Roo will instantly update the GWT application to incorporate the new field in both the UI and backend code. You can observe this from the "Roo Shell" view. Note the STS integration includes links to the files Roo edited so you can open them and see the changes.

[![Roo Shell](http://blog.springsource.com/wp-content/uploads/2010/06/rooshell.png "Roo Shell")](http://blog.springsource.com/wp-content/uploads/2010/06/rooshell.png)

In case you still have the Development Mode server running at this point, open the "Development Mode" view and click the "Refresh" icon in the view's toolbar. After taking a deep breath - around 2-3 seconds - go back to your browser and click "refresh". Navigate to the "Employee" screen and notice the newly added field on the UI. You can verify that the server code has been fully refreshed (including proper persistence) by creating a new Employee filling in the "comment" field.

## Deploy to Google App Engine

We've received quite a few questions on how one can deploy the scaffolded application to Google App Engine; and if it runs on GAE. It certainly does and can be tested [here](http://sts-demo.appspot.com/).

Deployment is very straight forward and can be accomplished from within STS or from the command line. In the following section I'll show how deployment to GAE works from the command line.

1.  First you probably want to switch from the in-memory Hypersonic database used by the sample application to Google's Datastore based on BigTable. To do this launch the Roo shell from the command line and execute the following command: "persistence setup --database GOOGLE\_APP\_ENGINE --provider DATANUCLEUS".
2.  Next we need to specify the GAE application name. This can be done by editing the "src/main/webapp/WEB-INF/appengine-web.xml" file. Please set the application name to an existing application in your GAE account. Alternately, you could have specified the application name when typing the "persistence setup" command via the "--applicationId" option.
3.  Deploying to GAE is now simply a matter of running "mvn gwt:compile gae:deploy -DskipTests" ("-DskipTests" is only required with Roo 1.1.0.M1. This has [already been fixed]( https://jira.springsource.org/browse/ROO-879) and won't be necessary for Roo 1.1.0.M2).

I hope those instructions and steps are helpful and will encourage even more people to try out Roo's support for GWT. Please keep in mind that GWT, Roo and STS are at Milestone 1 stage so you might in fact hit limitations or unexpected issues. In this case please post on the Spring community [Roo](http://forum.springsource.org/forumdisplay.php?f=67) or [STS](http://forum.springsource.org/forumdisplay.php?f=32) forums. We, the SpringSource and Google engineers, are happy to help and are looking forward to your feedback.