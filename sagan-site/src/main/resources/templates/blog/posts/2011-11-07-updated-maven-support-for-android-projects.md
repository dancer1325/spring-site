---
title: Updated Maven Support for Android Projects
source: https://spring.io/blog/2011/11/07/updated-maven-support-for-android-projects
scraped: 2026-02-24T08:32:59.078Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Roy Clarkson |  November 07, 2011 | 0 Comments
---

# Updated Maven Support for Android Projects

_Engineering | Roy Clarkson |  November 07, 2011 | 0 Comments_

It has been a while since my initial posts on using [Maven with Spring Android](http://blog.springsource.com/author/rclarkson/), and the state of the tools has changed somewhat. With the recent release of the [SDK for Android 4.0](http://developer.android.com/sdk/android-4.0.html) and [revision 14 of the Android Development Tools (ADT)](http://developer.android.com/sdk/tools-notes.html), Google made [several changes](http://android-developers.blogspot.com/2011/10/changes-to-library-projects-in-android.html) that impacted the third party Maven plugin support for building Android projects. Fortunately, the teams behind the [Android Maven Plugin](http://code.google.com/p/maven-android-plugin/), and the [Android Configurator for M2E](http://rgladwell.github.com/m2e-android/) have been hard at work to support these latest changes in the Android tools. If you have tried to run the [Spring Android Samples](https://github.com/SpringSource/spring-android-samples) recently, then you probably noticed the projects would not build. In this post, I will illustrate the configuration changes necessary to utilize the latest Maven plugins and Eclipse support in the Spring Android Showcase project.

### Android Maven Plugin

As of version 3.0.0-alpha-11, The Maven Android Plugin now has a new name, and is now called the Android Maven Plugin. The latest version, [3.0.0-alpha-13](http://code.google.com/p/maven-android-plugin/wiki/Changelog) fixes the build issue with Android SDK r14.

#### Update the Plugin

To update your plugin version, make the following changes to the artifactId and version.

```xml
Copy
<plugin>
    <groupId>com.jayway.maven.plugins.android.generation2</groupId>
    <artifactId>android-maven-plugin</artifactId>
    <version>3.0.0-alpha-13</version>
    <configuration>
        <sdk>
            <platform>${android-platform}</platform>
        </sdk>
        <deleteConflictingFiles>true</deleteConflictingFiles>
        <undeployBeforeDeploy>true</undeployBeforeDeploy>
    </configuration>
    <extensions>true</extensions>
</plugin>
```

Once modified, you can now run maven from the command line to build your project.

```sourcecode
Copymvn clean install
```

#### Potential Build Errors

It is possible that your project will receive a few build errors when you try to build with the new plugin.

##### java.lang.OutOfMemoryError

When I updated the Spring Android Showcase client, the build failed with the following:

```sourcecode
Copy[INFO] UNEXPECTED TOP-LEVEL ERROR:
[INFO] java.lang.OutOfMemoryError: Java heap space
[INFO] 	at com.android.dx.ssa.SsaBasicBlock.<init>(SsaBasicBlock.java:130)
[INFO] 	at com.android.dx.ssa.SsaBasicBlock.newFromRop(SsaBasicBlock.java:148)
[INFO] 	at com.android.dx.ssa.SsaMethod.convertRopToSsaBlocks(SsaMethod.java:174)
[INFO] 	at com.android.dx.ssa.SsaMethod.newFromRopMethod(SsaMethod.java:104)
[INFO] 	at com.android.dx.ssa.SsaConverter.convertToSsaMethod(SsaConverter.java:45)
[INFO] 	at com.android.dx.ssa.Optimizer.optimize(Optimizer.java:99)
[INFO] 	at com.android.dx.ssa.Optimizer.optimize(Optimizer.java:73)
[INFO] 	at com.android.dx.dex.cf.CfTranslator.processMethods(CfTranslator.java:273)
[INFO] 	at com.android.dx.dex.cf.CfTranslator.translate0(CfTranslator.java:134)
[INFO] 	at com.android.dx.dex.cf.CfTranslator.translate(CfTranslator.java:87)
[INFO] 	at com.android.dx.command.dexer.Main.processClass(Main.java:483)
[INFO] 	at com.android.dx.command.dexer.Main.processFileBytes(Main.java:455)
[INFO] 	at com.android.dx.command.dexer.Main.access$400(Main.java:67)
[INFO] 	at com.android.dx.command.dexer.Main$1.processFileBytes(Main.java:394)
[INFO] 	at com.android.dx.cf.direct.ClassPathOpener.processOne(ClassPathOpener.java:135)
[INFO] 	at com.android.dx.cf.direct.ClassPathOpener.processDirectory(ClassPathOpener.java:191)
[INFO] 	at com.android.dx.cf.direct.ClassPathOpener.processOne(ClassPathOpener.java:123)
[INFO] 	at com.android.dx.cf.direct.ClassPathOpener.processDirectory(ClassPathOpener.java:191)
[INFO] 	at com.android.dx.cf.direct.ClassPathOpener.processOne(ClassPathOpener.java:123)
[INFO] 	at com.android.dx.cf.direct.ClassPathOpener.processDirectory(ClassPathOpener.java:191)
[INFO] 	at com.android.dx.cf.direct.ClassPathOpener.processOne(ClassPathOpener.java:123)
[INFO] 	at com.android.dx.cf.direct.ClassPathOpener.processDirectory(ClassPathOpener.java:191)
[INFO] 	at com.android.dx.cf.direct.ClassPathOpener.processOne(ClassPathOpener.java:123)
[INFO] 	at com.android.dx.cf.direct.ClassPathOpener.process(ClassPathOpener.java:109)
[INFO] 	at com.android.dx.command.dexer.Main.processOne(Main.java:418)
[INFO] 	at com.android.dx.command.dexer.Main.processAllFiles(Main.java:329)
[INFO] 	at com.android.dx.command.dexer.Main.run(Main.java:206)
[INFO] 	at com.android.dx.command.dexer.Main.main(Main.java:174)
[INFO] 	at com.android.dx.command.Main.main(Main.java:95)
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 37.252s
[INFO] Finished at: Mon Nov 07 13:02:13 EST 2011
[INFO] Final Memory: 13M/81M
[INFO] ------------------------------------------------------------------------
```

To resolve this issue, you can simply add the following jvmArgument to the plugin declaration. This will increase the available memory for the build.

```xml
Copy
<plugin>
    <groupId>com.jayway.maven.plugins.android.generation2</groupId>
    <artifactId>android-maven-plugin</artifactId>
    <version>3.0.0-alpha-13</version>
    <configuration>
        <sdk>
            <platform>${android-platform}</platform>
        </sdk>
        <dex>
            <jvmArguments>
                <jvmArgument>-Xms256m</jvmArgument>
                <jvmArgument>-Xmx512m</jvmArgument>
            </jvmArguments>
        </dex>
        <deleteConflictingFiles>true</deleteConflictingFiles>
        <undeployBeforeDeploy>true</undeployBeforeDeploy>
    </configuration>
    <extensions>true</extensions>
</plugin>
```

##### Error while processing transient dependencies

[Spring Android 1.0.0.M4](http://www.springsource.org/spring-android/news/1.0.0.m4-released) is built against the [Android Rome Feed Reader](http://code.google.com/p/android-rome-feed-reader/). This version of ROME is not available in the Maven Central repository, so in order to use it you have to include the repository information in your POM. The Spring Android Showcase client does not contain any ROME samples, as these are included in a separate sample project. Normally, this would mean that you do not have to include the repository reference for that library. With the previous version of the Maven Android Plugin, the project built correctly without having to include the repository reference. However, it seems that the 3.0.0-alpha-13 release of the Android Maven Plugin tries to download all dependencies, even optional ones. If you do not include the ROME repository, then the build fails with the following error.

```sourcecode
Copy[WARNING] The POM for com.google.code.android-rome-feed-reader:android-rome-feed-reader:jar:1.0.0-r2 is missing, no dependency information available
Downloading: http://maven.springframework.org/milestone/com/google/code/android-rome-feed-reader/android-rome-feed-reader/1.0.0-r2/android-rome-feed-reader-1.0.0-r2.jar
Downloading: http://repo1.maven.org/maven2/com/google/code/android-rome-feed-reader/android-rome-feed-reader/1.0.0-r2/android-rome-feed-reader-1.0.0-r2.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 21.486s
[INFO] Finished at: Mon Nov 07 16:04:24 EST 2011
[INFO] Final Memory: 13M/81M
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal com.jayway.maven.plugins.android.generation2:android-maven-plugin:3.0.0-alpha-13:apk (default-apk) on project spring-android-showcase-client: Error while processing transient dependencies: Could not find artifact com.google.code.android-rome-feed-reader:android-rome-feed-reader:jar:1.0.0-r2 in org.springframework.maven.milestone (http://maven.springframework.org/milestone)
```

In order for the build to succeed with the current maven plugin, you need to include the Android ROME repository with your Spring Android projects.

```xml
Copy
<repository>
    <id>android-rome-feed-reader-repository</id>
    <name>Android ROME Feed Reader Repository</name>
    <url>https://android-rome-feed-reader.googlecode.com/svn/maven2/releases</url>
</repository>
```

### Android Configurator for M2E

The Android Configurator for M2E has also undergone a name change since I last [blogged about the Maven Android plugins](http://blog.springsource.com/2011/02/09/spring-android-and-maven-part-2/). Previously, it was called Maven Integration for Android Development Tools. The latest version of the Android Configurator now supports Android SDK r14.

#### Install the Plugin

You can install the configurator from the Eclipse Marketplace. If you are using SpringSource Tool Suite (STS), then you can install the Eclipse Marketplace from the Extensions tab on the Dashboard. It is located under the Utilities section. Otherwise, if you are using a different version of Eclipse 3.7, the Eclipse Marketplace is available from the Indigo download site.

1.  Install the Eclipse Marketplace client.
2.  From the Eclipse Marketplace, search for Android Configurator.
3.  Click the Install button to install the Android Configurator.
4.  The configuration will install the Android ADT if you do not already have it installed.

#### m2e - Maven Integration for Eclipse

One thing to note, is that the m2e - Maven Integration for Eclipse plugin is not automatically installed with the configurator. If you are using [STS 2.8.0](http://www.springsource.com/developer/sts), then the m2e plugin is already installed. If not, then you can follow the previous steps above to also install the [m2e plugin from the Eclipse Marketplace](http://marketplace.eclipse.org/content/maven-integration-eclipse) before importing your Android projects.

#### Import Your Project into Eclipse

Once the required Eclipse plugins are installed, you can import your Android project. If you have an existing POM file, then simply import the project as an Existing Maven Project and point to your POM. If you had previously been working on your project with the older versions of the Maven plugins, then you will need to update your project.

1.  Right-click on your project from within the Eclipse Package Explorer.
2.  Select the Maven context menu and Update Project Configuration...
3.  Verify your project is selected in the Available Maven Codebases, and click OK.

### Conclusion

The Maven plugins are powerful tools for use in building your Android projects, and these plugins will continue to evolve and mature with the help of the community. The [Spring Android Samples](https://github.com/SpringSource/spring-android-samples) have been updated to work with these latest plugins, so please pull the latest versions and review the changes. Additionally, the [Android Maven Plugin](https://github.com/jayway/maven-android-plugin) and [Android Configurator for m2e](https://github.com/rgladwell/m2e-android) are on GitHub, and they welcome your feedback and pull requests!