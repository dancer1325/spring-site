---
title: Write your Google App Engine applications in Groovy
source: https://spring.io/blog/2009/04/08/write-your-google-app-engine-applications-in-groovy
scraped: 2026-02-24T09:09:17.868Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Guillaume Laforge |  April 08, 2009 | 0 Comments
---

# Write your Google App Engine applications in Groovy

_Engineering | Guillaume Laforge |  April 08, 2009 | 0 Comments_

\[caption id="attachment\_1577" align="alignright" width="250" caption="Google App Engine Groovy"\]![Google App Engine Groovy](http://blog.springsource.com/wp-content/uploads/2009/04/google-app-engine-groovy.png "Google App Engine Groovy")\[/caption\]

Google just [announced](http://googleappengine.blogspot.com/2009/04/seriously-this-time-new-language-on-app.html) that their Google App Engine cloud hosting platform now supports other languages than Python: namely Java and Groovy!

You can now effectively **write your Google App Engine applications in Groovy**!

A couple of weeks ago, the SpringSource Groovy team and the Google App Engine Java team worked together, hand in hand, to iron out the details, to ensure that the popular and award-winning Groovy dynamic language for the JVM would run well on this exciting platform. After having created together some patches for Groovy, in the area of constrained and strict security manager policies, the Groovy development team integrated these patches and [released the updated Groovy 1.6.1](http://docs.codehaus.org/display/GROOVY/2009/04/07/Groovy+1.5.8+and+1.6.1+are+out "Groovy 1.6.1 released") version in line for the D-Day. With this new release, you can directly use the "groovy-all" JAR in your WEB-INF/lib directory and get started writing your applications in Groovy, right away, and host them on Google's infrastructure.

In the rest of this article, I'll walk you through some easy steps to let you build your first Groovy powered App Engine webapp. I'll skip the basic installation steps, as they are outlined and explained very well in the App Engine documentation, and I'll focus more on the aspects of building the Groovy application per se. As you shall see, this is fairly easy.

## Getting started

First of all, obviously, you'll need to have registered a Google account on Google App Engine, so that you can create applications on the platform, and be able to upload them in the cloud. You will also need to download and install the Google App Engine Java SDK. For all these steps, you should checkout the online documentation, which gives all the details you will need.

Once the SDK is installed, for the course of this tutorial, you should also [download](http://groovy.codehaus.org/Download "Download Groovy 1.6.1") and [install Groovy 1.6](http://groovy.codehaus.org/Installing+Groovy). You will only really need Groovy installed for the first part of this article, where we'll need to compile a servlet, otherwise, for the rest of the article, you won't need it anymore as we'll use Groovlets which are compiled by the Groovy runtime itself.

With Java, the SDK, and Groovy installed, we can proceed further and start a new project out of this [Groovy-ready project template](http://groovy.codehaus.org/gae/groovy-gae-template.zip "Groovy App Engine project template"). Download that skeleton, unzip it in a directory of your liking, and let's have a look at what we have! Is it like opening a Christmas present?

![Google App Engine Groovy project structure](http://blog.springsource.com/wp-content/uploads/2009/04/project-structure.png "Google App Engine Groovy project structure")

I have unzipped the template project into a directory called gaedemo. At the root of this directory, you will see an src directory which will contain all of our Groovy and Java sources that need to be compiled (servlets, domain classes, utility classes, etc.). The deploy directory basically corresponds to our exploded webapp: you will see a classes directory for compiled classes, lib for the various JARs (the Groovy JAR as well as Google App Engine's own API JAR), and groovy for containing the Groovlets we'll develop in the second part of this article. You have also certainly noticed the appengine-web.xml file which is an App Engine-specific descriptor. The canonical web.xml file is also present, for defining your servlets, your mappings, and more.

### Compiling your classes

With this overview of the project structure in mind, let's see what each key files contain. Let's start with the build.groovy file. Instead of creating an Ant build, I leveraged Groovy's [AntBuilder](http://docs.codehaus.org/display/GROOVY/Using+Ant+from+Groovy "Groovy AntBuilder"), a lightweight DSL / scripting wrapper on top of Ant and the Ant tasks:

def ant = new AntBuilder().sequential {
    webinf = "deploy/WEB-INF"
    taskdef name: "groovyc", classname: "org.codehaus.groovy.ant.Groovyc"
    groovyc srcdir: "src", destdir: "${webinf}/classes", {
        classpath {
            fileset dir: "${webinf}/lib", {
                include name: "\*.jar"
            }
            pathelement path: "${webinf}/classes"
        }
        javac source: "1.5", target: "1.5", debug: "on"
    }
}

We instanciate AntBuilder, create a property for the target WEB-INF directory, we define the groovyc Ant task which is the Groovy Joint Compiler which is able to compile both Groovy and Java interdependent classes together, by delegating the compilation of Java classes to the javac compiler — yet another proof of the seamless interoperability between both languages. After the definition of that task, we can call it to compile our source code, using the classpath made of the JARs in WEB-INF/lib and the compiled classes.

For calling that build file, granted you've installed Groovy, you will just have to use the following command to compile your project:

groovy build

### Setting up the project descriptor

The appengine-web.xml file contains some metadata needed by Google App Engine for deploying your application. In particular, this is where you'll define the name of the application, or its version number. You'll have to update the file to use your own application name. So far, our descriptor looks like the following:

<appengine-web-app xmlns="http://appengine.google.com/ns/1.0">
    <application>myowngroovy</application>
    <version>1</version>
</appengine-web-app>

### Creating your first servlet

Before diving into Groovlets, we'll start with a good old Servlet! As Google App Engine supports the Servlet 2.5 spec, we can write a simple Hello World! servlet. We create a file named HelloServlet.groovy in our src directory, which will contain the following code:

import javax.servlet.http.\*

class HelloServlet extends HttpServlet {
    void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.contentType = "text/plain"
        resp.writer.println "Hello Google App Engine Groovy!"
}
}

This looks pretty much like a normal Java servlet, although you'll notice the simpler syntax Groovy provides: the lack of semicolons, the optional public keyword, the property notation for getters/setters, the omission of semicolons.

Next step: we need to reference that servlet in web.xml, as follows:

<web-app xmlns="http://java.sun.com/xml/ns/javaee" version="2.5">
    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>HelloServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>

Once the servlet is configured, we shouldn't forget to compile the servlet with our tiny build file:

groovy build

### Uploading your application in the cloud!

If your Google App Engine SDK is properly configured, you should be able to run the following command, from the root of your project:

appcfg.sh update deploy/

That command will prompt for your credentials on first use, and further calls will show an output similar to the following lines:

Reading application configuration data...
Beginning server interaction for myowngroovy...
0% Creating staging directory
5% Scanning for jsp files.
20% Scanning files on local disk.
25% Initiating update.
28% Cloning 5 application files.
40% Uploading 1 files.
52% Uploaded 1 files.
90% Deploying new version.
95% Will check again in 1 seconds
98% Closing update: new version is ready to start serving.
99% Uploading index definitions.
Update complete.
Success.
Cleaning up temporary files...

If you see the word "Success", it's certainly because everything went pretty smoothly and that your application is ready to be accessed! Hitting the servlet from a URL similar to this one (depending on the name of the application you've chosen): [http://myowngroovy.appspot.com/hello](http://myowngroovy.appspot.com/hello) will show you the nice "Hello Google App Engine Groovy!" message!

## Groovlets to the rescue!

Well, it's exciting to write plain old Java servlets with the Groovy language, right? It feels like the first day you had writen and made working your first servlet? Not quite so, it seems almost old-fashioned already. Fortunately, Groovy comes to the rescue with its [Groovlets](http://groovy.codehaus.org/Groovlets)!

In a nutshell, Groovlets are mere Groovy scripts stored in WEB-INF/groovy, which are rendered by a Groovy servlet dispatcher, that compiles and renders those scripts.

Firstly, let's update our web.xml to add the GroovyServlet into the mix, and a URL mapping for redirecting to it all the URLs following the \*.groovy pattern:

<web-app xmlns="http://java.sun.com/xml/ns/javaee" version="2.5">
    <servlet>
        <servlet-name>GroovyServlet</servlet-name>
        <servlet-class>groovy.servlet.GroovyServlet</servlet-class>
    </servlet>
    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>HelloServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>GroovyServlet</servlet-name>
        <url-pattern>\*.groovy</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>

Once this is done, we create our first Groovlet script under WEB-INF/groovy, and call it hello.groovy:

html.html {
    head {
        title "Hello"
    }
    body {
        p "Hello Groovy World!"
    }
}

This Groovy scripts uses a html variable bound to the binding of the script which is an instance of [MarkupBuilder](http://groovy.codehaus.org/Creating+XML+using+Groovy%27s+MarkupBuilder). It's a small utility DSL for creating any kind of XML or HTML markup. Instead of outputing raw HTML in the form of strings with a println statement, MarkupBuilder provides a cleaner and groovier syntax. Of course, you can make this markup however dynamic you like by mixing in some loops or conditionals, etc.

After reuploading the application, you can now access this Groovlet by hitting the URL [](http://myowngroovy.appspot.com/hello.groovy)[http://myowngroovy.appspot.com/hello.groovy](http://myowngroovy.appspot.com/hello.groovy). No need to compile anything this time, since that's the GroovyServlet's job to compile those Groovlets scripts.

Wasn't that easy?

## What's next?

We've only scratched the surface so far, but it's enough to get started with Groovy. As you'll discover in the Google App Engine APIs, there are a several interesting services that you can leverage from your Groovlets and servlets:

-   a datastore API that you can use to store your objects, either through a low-level schema-less API, or through JDO
-   an images API to do various transforms and apply filters on images
-   a mail API to send emails
-   a memcache API to cache expensive data structures or computation results
-   a URL fetcher API to retrieve remote URL content
-   a users API for your authentication needs using Google's user accounts

Of course, all these services can be used from your Groovlet scripts. You can also use third-party libraries and put them in your WEB-INF/lib. It would be interesting to investigate further the available APIs to see if a thin Groovy layer on top of them could even further simplify their usage, in a groovier way.

Currently, Groovlets and normal servlets are totally supported, but for instance, [Grails](http://grails.org) applications aren't working on the current version of Google App Engine. We'll continue working on this with the Google App Engine team, so that you may use Grails as well, for more demanding applications.

[![GR8 Conference dedicated to Groovy, Grails and Griffon](http://blog.springsource.com/wp-content/uploads/2009/03/gr8-conf-logo.png "GR8 Conference")](http://www.gr8conf.org)

If you want to learn more about Groovy and Grails, how to write Groovy-powered App Engine apps, you may also consider [registering](http://www.gr8conf.org/registration/index) and coming to the [GR8 Conference](http://www.gr8conf.org "GR8 Conference, a conference dedicated to Groovy, Grails and Griffon"), a **conference dedicated to Groovy, Grails and Griffon**, with experts or makers of these technologies as speakers, with hands-on practical sessions. And with this announcement of the support of Groovy in App Engine, there's no doubt we'll also speak about that at the conference!

We're looking forward to reading your feedback on Groovy on App Engine, and we'd love to hear about all the suggestions you may make about how we can improve even more the experience developing Groovy apps in the cloud.