---
title: Deploying GWT Applications in SpringSource dm Server - Part 2
source: https://spring.io/blog/2008/11/24/deploying-gwt-applications-in-springsource-dm-server-part-2
scraped: 2026-02-24T09:12:54.366Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Corrie |  November 24, 2008 | 0 Comments
---

# Deploying GWT Applications in SpringSource dm Server - Part 2

_Engineering | Ben Corrie |  November 24, 2008 | 0 Comments_

## Introduction

This is the second in a series of three blogs describing a step-by-step approach to building and deploying GWT applications in the [SpringSource dm Server™](http://www.springsource.com/products/suite/dmserver). The first blog looked at the process of creating a simple WAR file from a sample GWT application. This next blog will look at turning the WAR file we created in [Part 1](http://blog.springsource.com/2008/11/07/deploying-gwt-applications-in-springsource-dm-server-part-1/) into a ["Shared Libraries"](http://static.springsource.com/projects/dm-server/1.0.x/programmer-guide/htmlsingle/programmer-guide.html#architecture-wars) WAR. This means that we are going to externalize the GWT dependencies of our application into an OSGi bundle so that it can be shared by any number of GWT applications. You can think of it as extending our dm Server with GWT remoting capabilities.

As mentioned in [Part 1](http://blog.springsource.com/2008/11/07/deploying-gwt-applications-in-springsource-dm-server-part-1/), I am not using the [Spring Framework](http://www.springframework.org/) in this second blog posting, rather I am focusing on the [SpringSource dm Server™](http://www.springsource.com/products/suite/dmserver) and [SpringSource Tool Suite](http://www.springsource.com/products/suite/sts) to deploy "pure" GWT.

Please also see [Part 1](http://blog.springsource.com/2008/11/07/deploying-gwt-applications-in-springsource-dm-server-part-1/) for the background to the GWT [StockWatcher](http://code.google.com/docreader/#p=google-web-toolkit-doc-1-5&s=google-web-toolkit-doc-1-5&t=GettingStarted) sample and the software I'm using.

## Quick Catch Up

In [Part 1](http://blog.springsource.com/2008/11/07/deploying-gwt-applications-in-springsource-dm-server-part-1/), we built the GWT StockWatcher sample application from scratch as an Eclipse project and then generated the code into a Dynamic Web project which we then deployed into dm Server. Finally, we exported the Dynamic Web project into a WAR file and deployed it outside of STS.

The step by step approach described here will build on what we did in [Part 1](http://blog.springsource.com/2008/11/07/deploying-gwt-applications-in-springsource-dm-server-part-1/), rather than start over. The only thing we did in [Part 1](http://blog.springsource.com/2008/11/07/deploying-gwt-applications-in-springsource-dm-server-part-1/) that we're now going to change is to remove the explicit dependency on the gwt-servlet.jar library.

## Step 1: Turn our GWT dependency into a OSGi bundle

Firstly, a little more background. The whole concept of the "Shared Libraries" approach is to create a map of dependencies within the dm Server using explicit imports and exports between OSGi bundles. With a small WAR such as our StockWatcher sample, this is mostly just an interesting academic exercise. However, given that many commercial web projects ship in large WAR files which are packaged with tens or even hundreds of dependent jar files, breaking out these dependencies into shareable resources not only makes sense from a footprint perspective, but also makes the packaging, versioning and maintenance of the applications significantly less painful.

The good news is that much of work to create these dependencies has already been done for you. The [SpringSource Enterprise Bundle Repository](http://www.springsource.com/repository/app/) contains "bundlized" versions of most common libraries. However, at the time of writing, our GWT dependency is an example of a library that you have to turn into a bundle yourself. Fortunately for us, Eclipse 3.4 makes the process very simple.

\- Right click in the Project explorer and select "New" -> "Other" -> "Plug-in Development" -> "Plug-in from existing Jar archives". - Click "Add external" and browse for gwt-servlet.jar. - Click "Next" and call the project "com.google.gwt". - Set the plugin version to reflect the GWT version, in this case it's 1.5.3. - Select "Analyze library contents and add dependencies" - Select the Equinox OSGi framework

[![](http://blog.springsource.com/wp-content/uploads/2008/10/picture-21.png "Importing gwt-servlet")](http://blog.springsource.com/wp-content/uploads/2008/10/picture-21.png)

Click "Finish" and don't bother switching to the Plug-in development perspective. We're just going to export our bundle straight out again.

You should now see an overview of the generated MANIFEST.MF file, which is where a bundle's dependencies are defined. You'll see in the "Runtime" tab that the tool has added all of the com.google.gwt.. packages as exports. You'll also see in the "Dependencies" tab that it has worked out that this bundle requires a couple of javax.servlet.. packages and a junit package.

We'll remove the JUnit dependency for now as it will be unresolved by default in dm Server. Of course if we wanted we could add a JUnit bundle to dm Server to satisfy the dependency or alternatively we could make the dependency optional by adding required:=optional. Select the junit.framework package, click "Remove" and then save.

It's worth pointing out that this is a crude way of turning a JAR file into a bundle and it is not guaranteed to work in all circumstances. For one thing, we may not want all of our packages to be exported. More significantly however, there are one or two source-level gotchas which may not play well in OSGi, such as the use of Class.forName(). If in doubt, always go first to the [SpringSource Enterprise Bundle Repository](http://www.springsource.com/repository/app/) rather than trying to roll your own.

Finally, we need to export our Plug-in project as an OSGi bundle. Select "Export" -> "Plug-in development" -> "Deployable plug-ins and fragments". Select a convenient location as the output directory.

[![](http://blog.springsource.com/wp-content/uploads/2008/10/picture-51.png "Exporting the gwt-server plugin")](http://blog.springsource.com/wp-content/uploads/2008/10/picture-51.png)

We should now see a file in <export path>/plugins/com.google.gwt\_1.5.3.jar. The next step is to rename the file to make it consistent with the format of the other named bundles in dm Server: simply change the underscore to a dash: com.google.gwt-1.5.3.jar. Without this change, the current version of STS won't recognise the bundle version. If you want to skip this step, you can download it [here](http://blog.springsource.com/wp-content/uploads/2008/10/comgooglegwt-153jar.zip).

Finally, copy the bundle into the dm Server bundle repository: <dm Server installation root>/repository/bundles/usr. Any bundle in here can be a dependency of other bundles in dm Server, but importantly it will also be visible as a dependency in STS, as we'll see in the next step.

At this point, you can delete the com.google.gwt project from the workspace as it has served its purpose.

## Step 2: Migrate our WAR project to the new OSGi bundle

Hopefully, you should now have a dm Server installation with a com.google.gwt-1.5.3.jar in its repository.

The next step is to break our application!

Right-click on StockWatcherWar, select "Properties" -> "Java EE Module Dependencies", unselect the gwt-server.jar file and click on "OK". We've now removed our WAR's explicit dependency on GWT and caused a number of new problems for ourselves, most of which are compiler errors.

So we need to turn our Dynamic Web project into a dm Server bundle so that it can explicitly import the dependencies it needs from our newly created GWT bundle. To do this, right-click on StockWatcherWar and select "Spring Tools" -> "Add OSGi Bundle Project Nature". You should notice that the project now carries an all-important "S" symbol and the MANIFEST.MF has also changed character:

[![](http://blog.springsource.com/wp-content/uploads/2008/10/picture-6a.png "Manifest nature")](http://blog.springsource.com/wp-content/uploads/2008/10/picture-6a.png)

It's broken because it doesn't look like a bundle manifest. Let's add some sane defaults (you can either cut-and-paste the following, or use the fields in the tabs). Note that you can also use ctrl-space in the editor to prompt you with valid options.

Manifest-Version: 1.0 Bundle-ManifestVersion: 2 Bundle-Name: com.google.sample.stockwatcher Bundle-SymbolicName: com.google.sample.stockwatcher Bundle-Version: 1.0.0 Bundle-Description: Shared Libraries StockWatcher demo

So this has fixed one problem, in that our bundle manifest now looks sane. However, we haven't yet defined the dependency on the GWT bundle, so we've still got a number of compiler errors.

Select the "Dependencies" tab and click on "Add". Right at the top, you should see that a com.google.gwt bundle has magically appeared. Now, it's important to understand that the GWT bundle appearing in this list has nothing to do with the plug-in project we created in Step 1. If you delete that project from the workspace, the bundle will still appear. It works because the dm Server installation is set as the project's runtime and the tooling is therefore looking in the dm Server's repository for any bundles which you may want to import. If this hasn't worked, then either the GWT bundle wasn't copied to the correct location or the WAR project's runtime wasn't set to dm Server. Check the latter in "Properties" -> "Targeted Runtimes".

[![](http://blog.springsource.com/wp-content/uploads/2008/10/picture-7a.png "picture-7a")](http://blog.springsource.com/wp-content/uploads/2008/10/picture-7a.png)

Next, select the GWT bundle, click on "OK" and then save the manifest. You should now see the GWT bundle added to a new classpath element called "Bundle Dependencies":

[![](http://blog.springsource.com/wp-content/uploads/2008/10/picture-8a.png "Bundle dependencies")](http://blog.springsource.com/wp-content/uploads/2008/10/picture-8a.png)

You should now notice that most of the errors have been resolved, but a couple are still outstanding. This is because our GWT bundle has a dependency on the javax.servlet APIs and until we have those classes available, the type hierarchy is incomplete.

So why didn't we have this problem previously when we just had gwt-servlet.jar in our build path? Well, before we made our changes, our WAR would pick up everything on its build path, which includes all of the JARs made available by the dm Server Target Runtime. However, you may have noticed that when we added the OSGi Bundle Project Nature, the dm Server JARs on the build path disappeared. This is because, by becoming an OSGi bundle, we have entered a different world of dependencies where imports and exports must be declared explicitly.

Declaring our dependency on the javax.servlet APIs is a simple matter of importing another bundle. You'll see it in the list as com.springsource.javax.servlet. Once you've added the two bundles, save the manifest and you should now see all errors resolved. Phew!

If we navigate now to the MANIFEST.MF tab, we can see the effect of all of our button pushing: A green "Import-Bundle" entry in the manifest. Note that we could just as easily have used ctrl-space after "Import-Bundle" and it would have suggested all possible imports:

[![](http://blog.springsource.com/wp-content/uploads/2008/10/picture-10a.png "Editing the manifest")](http://blog.springsource.com/wp-content/uploads/2008/10/picture-10a.png)

If you want to see my projects, you can download a zipped up copy [here](http://blog.springsource.com/wp-content/uploads/2008/11/stockwatcherwarslproj.zip). It includes Runtime Configurations to launch in hosted mode with the embedded Tomcat, hosted mode with dm Server and to launch the GWT compiler. Note that hosted mode with the embedded Tomcat works fine without having to modify the bundle WAR project. This is because the javax.servlet packages from dm Server are no longer on the build path. To use my projects, you'll need the GWT\_ROOT\_INSTALL variable and you may need to select your dm Server Target Runtime instance, as described in [Part 1](http://blog.springsource.com/2008/11/07/deploying-gwt-applications-in-springsource-dm-server-part-1/).

## Step 3: Deploy onto dm Server

The steps to deploy our "Shared Libraries" application are exactly the same as Steps 7 and 8 in [Part 1](http://blog.springsource.com/2008/11/07/deploying-gwt-applications-in-springsource-dm-server-part-1/), so there's no point going through those in detail again. The key difference of course is that we've successfully broken out our dependencies into a library which can be shared by multiple GWT applications. If you download my [StockWatcher Shared Libraries WAR](http://blog.springsource.com/wp-content/uploads/2008/11/stockwatcherwar1.zip), you'll see that it's now 290k instead of 890k.

Just for fun, let's have a peek under the covers and look at our bundles interacting.

When dm Server starts up, it notifies you that its OSGi console can be accessed using a telnet client:

\[2008-10-27 16:48:04.266\] main                     <SPOF0001I> OSGi telnet console available on port 2401.

Let's open up a terminal window and see what we can find out:

\> telnet localhost 2401 Trying ::1... Connected to localhost. Escape character is '^\]'.

osgi>

You can get a list of the commands available to the Equinox console by typing help. There is also a useful DeveloperWorks article about it you can read [here](http://www.ibm.com/developerworks/library/os-ecl-osgiconsole/index.html).

Typing ss gives us a list of all the running plugins:

osgi> ss

Framework is launched.

id    State       Bundle . . . . 73    ACTIVE      com.google.sample.stockwatcher\_1.0.0 74    ACTIVE      com.google.gwt\_1.5.3

Typing packages 74 gives us all of the exported packages from the GWT bundle. It shows that all of the exported packages are being imported by the StockWatcherWar bundle. This is a result of our use of "Import-Bundle". As it happens, the only packages our StockWatcherWar actually requires are com.google.gwt.user.client.rpc and com.google.gwt.user.server.rpc. If we'd wanted to, we could instead have been more selective by using "Import-Package" to import these packages explicitly. This is described in the [dm Server Programmer Guide](http://static.springsource.com/projects/dm-server/1.0.x/programmer-guide/html/ch05.html).

file:////Users/bcorrie/dmServer-1.0.0/springsource-dm-server-1.0.0.RELEASE/work/com.springsource.server.deployer/Module/StockWatcherWar.war-0/StockWatcherWar.war \[73\] imports com.google.gwt.i18n.client.constants; version="0.0.0"<file:////Users/bcorrie/dmServer-1.0.0/springsource-dm-server-1.0.0.RELEASE/repository/bundles/usr/com.google.gwt-1.5.3.jar \[74\]>

## Step 4: Deploying other GWT applications on the shared library

It's worth noting that not all GWT applications need to use gwt-servlet.jar. Only GWT applications which use some form of remoting have a dependency on this library. Google ship a number of sample applications in their distribution, most of which generate into just javascript and html and are therefore deployed with no Java code. Turning these samples into a WAR file is a simple matter of running the Compile script into a Dynamic Web project as described in [Part 1](http://blog.springsource.com/2008/11/07/deploying-gwt-applications-in-springsource-dm-server-part-1/) Step 5 and then creating a suitable web.xml.

However, one example included with the GWT distribution which does use some simple remoting is called DynaTable. Using the same steps and principles described in these blogs, I turned this sample into a Shared Libraries WAR file. To see what I did, you can download the zipped up [projects](http://blog.springsource.com/wp-content/uploads/2008/11/dynatableslproj.zip) or [WAR file](http://blog.springsource.com/wp-content/uploads/2008/11/dynatablewar.zip) and have a look. This very simply demonstrates the principle of running multiple applications in dm Server, both of which are sharing the GWT bundle we created.

[![](http://blog.springsource.com/wp-content/uploads/2008/11/picture-1b.png "Two applications running")](http://blog.springsource.com/wp-content/uploads/2008/11/picture-1b.png)

## Looking forward to Part 3

In the final blog in this series, we will modularize our StockWatcher sample further, abstracting out its services into bundles which can be hotswapped in and out of the running server.