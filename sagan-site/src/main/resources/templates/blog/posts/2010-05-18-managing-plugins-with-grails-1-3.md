---
title: Managing plugins with Grails 1.3
source: https://spring.io/blog/2010/05/18/managing-plugins-with-grails-1-3
scraped: 2026-02-24T08:57:50.111Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  May 18, 2010 | 0 Comments
---

# Managing plugins with Grails 1.3

_Engineering | Peter Ledbrook |  May 18, 2010 | 0 Comments_

For a long time, managing Grails dependencies simply meant putting them in your application's lib directory. Then came Grails 1.2 and the dependency DSL: you could finally declare your dependencies and have Grails automatically download them and make them available to your app. Great!

Now, Grails 1.3 has brought the dependency DSL to the realm of plugins.

### So what?

Users have often faced two issues with the plugin system up till now:

1.  setting up a suitable Subversion server to act as a Grails plugin repository is not simple; and
2.  you can't control what dependencies a plugin brings into your application.

The first of these doesn't particularly apply to individual developers, but it's a bigger deal for companies where access to the internet may be restricted or where they want more control over the "latest" versions of libraries and plugins. How much better it would be if they could use a repository manager like [Nexus](http://nexus.sonatype.org/) or [Artifactory](http://www.jfrog.org/).

As for the dependencies, some plugins include libraries you don't need or (even worse) break your application. With the dependency DSL, you can explicitly exclude problematic libraries.

Those are some of the reasons why this change might be important to you. So how do you use the new feature?

### The dependency two-step

To properly demonstrate the utility of Grails' dependency management, we must set up a local repository. For this article, we'll use Artifactory. You could equally use Nexus or any other tool for creating Maven-compatible repositories.

I'll assume that Artifactory is already installed and running - for details of getting to this stage, check out its website and in particular the ["One minute Artifactory" screencast](http://www.jfrog.org/screencast.php?id=2FGHwZSAqog). At this point we have a local repository, but it's not serving any artifacts yet. Let's fix that.

I'm going to add the 'db-util' plugin and the 'commons-digester' library. You can try with any plugins or JARs you have available. Simply navigate to the 'Deploy' tab of Artifactory (having logged in with username "admin", password "password"), choose the appropriate files, and upload them. I grabbed the files:

    $USER\_HOME/.ivy2/cache/commons-digester/commons-digester/jars/commons-digester-2.0.jar
    $USER\_HOME/.grails/1.2.1/plugins/db-util-0.4.zip

and added them via the Artifactory UI: [![](http://www.cacoethes.co.uk/blog/wp-content/uploads/2010/05/artifactory-upload.png "artifactory-upload")](http://www.cacoethes.co.uk/blog/wp-content/uploads/2010/05/artifactory-upload.png)

Note that the UI allows you to specify the target repository for the upload. I chose 'plugins-releases-local' for the 'db-util' plugin and 'libs-releases-local' for 'commons-digester'. Also, before committing the plugin artifact, I set its groupId to 'org.grails.plugins' and its artifactId to 'db-util' (the default values are both 'grails-db-util'). The 'org.grails.plugins' groupId is the one that Grails assumes for plugin dependencies. Note also how the artifactId doesn't include the "grails-" prefix.

Those two artifacts are now available locally to any of your Grails applications. Now we need to configure the repository and dependencies in our Grails application.

### The dependency DSL

The next bit is surprisingly straightforward. We need to do two things:

1.  configure Grails to download plugins and JARs from our Artifactory repository; and
2.  specify our dependencies.

Just as with Grails 1.2, this is done in the grails-app/conf/BuildConfig.groovy. Here are the relevant sections in a sample Grails application:

```groovy
Copygrails.project.dependency.resolution = {
    ...
    log "warn"
    repositories {
        grailsPlugins()
        grailsHome()
        mavenRepo "http://localhost:8081/artifactory/libs-releases-local/"
        mavenRepo "http://localhost:8081/artifactory/plugins-releases-local/"
        grailsCentral()
    }
    plugins {
        build "org.grails.plugins:db-util:0.4"
    }
    dependencies {
        compile "commons-digester:commons-digester:2.0"
    }
}
```

So, in the repositories section you add a mavenRepo entry for each "repository" exposed by the Artifactory server. Note that in this case, we add both the 'libs-releases-local' repository and the 'plugins-releases-local' one.

The new addition to the DSL is the plugins section, which is (unsurprisingly) for declaring Grails plugins. It has exactly the same syntax as the dependencies section. So, 'db-util' is declared under plugins and 'commons-digester' is declared under dependencies.

That's all you have to do. If you now execute grails run-app, you'll see the some output like this:

...
Resolving dependencies...
Downloading: http://localhost:8081/artifactory/libs-releases-local/commons-digester/commons-digester/2.0/commons-digester-2.0.pom ...
Download complete.
Downloading: http://localhost:8081/artifactory/libs-releases-local/commons-digester/commons-digester/2.0/commons-digester-2.0.pom.sha1 ...
Download complete.
...
Downloading new plugins. Please wait... ...
Downloading: http://localhost:8081/artifactory/plugins-releases-local/org/grails/plugins/db-util/0.4/db-util-0.4.pom ...
Download complete.
Downloading: http://localhost:8081/artifactory/plugins-releases-local/org/grails/plugins/db-util/0.4/db-util-0.4.pom.sha1 ...
Download complete.
Downloading: http://localhost:8081/artifactory/plugins-releases-local/org/grails/plugins/db-util/0.4/db-util-0.4.zip ...
Download complete.
Downloading: http://localhost:8081/artifactory/plugins-releases-local/org/grails/plugins/db-util/0.4/db-util-0.4.zip.sha1 ...
Download complete.
Installing zip /home/pal20/.ivy2/cache/org.grails.plugins/db-util/zips/db-util-0.4.zip...
...

The 'db-util' plugin is installed and the 'commons-digester' JAR included on the classpath. Simple.

If you run into issues with the dependency resolution, then you can dial up the logging by replacing the log "warn" line in BuildConfig.groovy with log "info" or even log "debug".

Of course, sometimes you will want to host your own plugins or customised/patched versions of public one. The existing release-plugin command only works with old-style Subversion repositories, so what can you do?

### Publishing plugins to Maven-compatible repositories

Grails core doesn't help here, but then it doesn't need to. There is a Grails plugin dedicated to publishing Grails applications and plugins to Maven-compatible repositories: the [Maven Publisher Plugin](http://grails.org/plugin/maven-publisher).

Install this in your plugin project, add the following entry to your BuildConfig.groovy file:

```groovy
Copygrails.project.dependency.distribution = {
    remoteRepository(id: "pluginSnapshots", url: "http://localhost:8081/artifactory/plugins-snapshots-local/") {
        authentication username: "admin", password: "password"
    }
}
```

and then run `grails maven-deploy --repository=pluginSnapshots` Voila! Your plugin will be deployed to the local Artifactory 'plugins-snapshots-local' repository with a groupId of org.grails.plugins. Note that the value you pass for the \--repository argument should match the 'id' of a remote repository defined in the grails.project.dependency.distribution closure in BuildConfig.groovy.

You can fine tune the deployment, for example by using a pom.xml file with a <distributionManagement> element or by adding a groupId property to the plugin descriptor, but the basic steps are all straightforward.

All that's left to explain is where the dependency information is held. For example, the dependencies for normal artifacts (such as JAR libraries) are stored in a metadata file like pom.xml. Grails plugins are different. Their JAR dependencies are inside the zip package in a dependencies.groovy file. As for plugin dependencies, you define these as before in the dependsOn field in the plugin descriptor. These are then translated into dependency declarations in your plugin's generated pom.xml file (which is stored alongside the plugin zip file in the repository).

And that really is all there is to it. You can now provide your own, easy-to-manage Maven-compatible repository so that your team members no longer have to hit the internet every time they need a plugin or dependency. You can also inject some consistency into your projects by controlling which versions of Grails plugins are available. And you can easily patch public plugins and make those versions available to your team locally, while you wait for the fixes to make it into an official release.