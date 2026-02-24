---
title: Spring Android and Maven (Part 1)
source: https://spring.io/blog/2010/12/17/spring-android-and-maven-part-1
scraped: 2026-02-24T08:50:01.337Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Roy Clarkson |  December 17, 2010 | 0 Comments
---

# Spring Android and Maven (Part 1)

_Engineering | Roy Clarkson |  December 17, 2010 | 0 Comments_

We recently announced the [M1 release](http://www.springsource.org/spring-android/news/1.0.0.m1-released) of [Spring Android](http://www.springsource.org/spring-android), and with that release some questions have arisen around how to build an Android application utilizing the Spring Android Rest Template and Spring Android Commons Logging libraries. Google provides several methods for compiling an Android application, including SDK command line tools, and the ADT (Android Development Tools) Plugin for Eclipse. Unfortunately, neither of these methods includes integrated dependency management support.

### Overview

As Java developers we have come to appreciate tools such as [Maven](http://maven.apache.org/) and [Gradle](http://www.gradle.org/) for managing external dependencies. While traditional Java applications run in a JVM, Android applications run on the Dalvik virtual machine.  The Dalvik VM executes files in the Dalvik Executable (.dex) format.  It runs classes compiled by a Java language compiler that have been transformed into the .dex format.  A build tool will need to support this process if it is going to be able to compile a compatible Android application with dependencies.

There are basically two options for including external libraries in your Android application. The first is to manually copy the jars into the libs directory within your project and update the classpath within Eclipse. This is the simplest solution, and the one most supported by the ADT plugin. The disadvantage is that you have to manage the dependencies manually. Alternatively, a third party plugin such as the [Maven Android Plugin](http://code.google.com/p/maven-android-plugin/) can be utilized to automatically include the dependencies from a Maven repository.

In this post I will walk through the process of using the Android command line tools, Maven, the Maven Android Plugin, and [Android Maven artifacts](http://www.simpligility.com/2010/06/android-artifacts-hit-maven-central/) to compile a sample application that utilizes the Spring Android libraries, and deploy it to the Android emulator. After you have configured Maven, it is easy to create a build, deploy it to the emulator, run tests, and package the app for deployment to the Android Market. Before running the sample code, we will first highlight the configuration settings necessary in the pom.xml. The components used in this example are listed below.

-   [SpringSource Tool Suite 2.5.2 (Eclipse 3.6.1)](http://www.springsource.com/developer/sts)
-   [Android SDK Revision 9](http://developer.android.com/sdk/index.html)
-   [Maven Android Plugin 2.8.4](http://code.google.com/p/maven-android-plugin/)

### Maven Configuration

This section covers the parts of a pom.xml that are required for developing with Spring Android and the Maven Android Plugin.

#### Maven Android Plugin

In order to use Maven to build an Android application, you will need to configure the Maven Android Plugin within your pom.xml file. Android applications are deployed to the device as an apk file, not a jar. You must specify this in the the packaging configuration.

```xml
Copy
<packaging>apk</packaging>
```

To configure the Maven Android and Maven Compiler Plugins in the build task, set the sdk platform to the desired level. In this example it is set to 9, which corresponds to Android version 2.3.1. The emulator avd value is the name of the AVD (Android Virtual Device) you defined in the AVD Manager. In this case, an AVD with the name "9", but the AVD can be named whatever you like, as long as it matches the name you specified when creating the AVD. This is a basic configuration for the plugin that is needed to build and run an Android application. There are additional parameters that can be included for more functionality.

```xml
Copy
<build>
	<sourceDirectory>src</sourceDirectory>
	<finalName>${project.artifactId}</finalName>
	<plugins>
		<plugin>
			<groupId>com.jayway.maven.plugins.android.generation2</groupId>
			<artifactId>maven-android-plugin</artifactId>
			<version>2.8.4</version>
			<configuration>
				<sdk>
					<platform>9</platform>
				</sdk>
				<emulator>
					<avd>9</avd>
				</emulator>
				<deleteConflictingFiles>true</deleteConflictingFiles>
				<undeployBeforeDeploy>true</undeployBeforeDeploy>
			</configuration>
			<extensions>true</extensions>
		</plugin>
		<plugin>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>2.3.2</version>
		</plugin>
	</plugins>
</build>
```

#### Dependencies

The Android artifacts have been built and published to the Maven repository through the efforts of the [Android for Maven project](http://sourceforge.net/projects/android4maven/). Google prevented the official Android jars from being uploaded to Maven, so the, third party, Android for Maven project was started to provide an API compatible Android artifact that could be uploaded to the Maven repository. There are now artifacts for each major Android version available in the Maven repository. These are not functional, however, and only provide stubbed implementations of the API. All methods in all classes throw a runtime exception. Because an Android app runs on a device, it will never use these libraries for execution, but the API compatibility allows an app to be compiled as if it were the real library. More information can be found [here](http://www.simpligility.com/2010/06/android-artifacts-hit-maven-central/).

To compile an Android application with dependencies you need to include the Android version you are targeting for your app. As stated previously, we are using level 9, which corresponds to version 2.3.1. Check the [Maven Repository](http://repo2.maven.org/maven2/com/google/android/android/) for the available versions. You must set the android dependency scope to **provided**, otherwise Maven will try to include the Android jar library into your apk.

```xml
Copy
<dependency>
	<groupId>com.google.android</groupId>
	<artifactId>android</artifactId>
	<version>2.3.1</version>
	<scope>provided</scope>
</dependency>
```

Compile against the latest milestone release of Spring Android Rest Template by adding the following dependency.

```xml
Copy
<dependency>
	<groupId>org.springframework.android</groupId>
	<artifactId>spring-android-rest-template</artifactId>
	<version>1.0.0.M2</version>
</dependency>
```

Include the repositories for the snapshot and milestone builds to use the latest build or milestone release of either of the Spring Android libraries in your app.

```xml
Copy
<repositories>
	<!-- For testing against latest Spring snapshots -->
	<repository>
		<id>org.springframework.maven.snapshot</id>
		<name>Spring Maven Snapshot Repository</name>
		<url>http://maven.springframework.org/snapshot</url>
		<releases><enabled>false</enabled></releases>
		<snapshots><enabled>true</enabled></snapshots>
	</repository>
	<!-- For developing against latest Spring milestones -->
	<repository>
		<id>org.springframework.maven.milestone</id>
		<name>Spring Maven Milestone Repository</name>
		<url>http://maven.springframework.org/milestone</url>
		<snapshots><enabled>false</enabled></snapshots>
	</repository>
</repositories>
```

### Development Environment

The Android SDK is required for developing Android applications. As mentioned earlier, Google provides command line tools, and an Eclipse plugin for building Android applications, however you are not restricted to only those options. Other IDE's also provide support for building Android apps. The Maven Android Plugin makes use of the Android SDK command line tools to compile and deploy the app to the emulator, so there is no need for a separate IDE setup or configuration.

The instructions for [downloading and installing the Android SDK](http://developer.android.com/sdk/index.html) can be found on the Android web site. Please note that the [Android SDK Revision 8 release](http://developer.android.com/sdk/tools-notes.html) changed the location of some of the tools. In addition to the **tools** directory, you must also add the **platform-tools** directory to your path.

For example, a .bash\_profile on a Mac may look like the following.

```sourcecode
Copyexport ANDROID_HOME=~/android-sdk-mac_x86
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### Configure an Android Virtual Device

To run an Android app, you must have an [Android Virtual Device](http://developer.android.com/guide/developing/tools/avd.html) (AVD) configured. An AVD is a configuration of emulator options. In other words, you are defining the settings to use when running the emulator. You can save a configuration with a name and use it later. You can also define multiple AVD's for testing against different Android versions or hardware configurations.

The pom.xml file included with the sample Android client app specifies an AVD with the name "9". In order for Maven to be able to deploy the Android app, you must have an AVD configured with that same name. This is of particular interest, as all developer machines will need to have the same AVD configured, since the pom.xml is typically committed to source control.

1.  From the command line, type **android** and hit return. This opens the **Android SDK and AVD Manager** window.
2.  Select **Virtual devices** in the left hand column and click the **New...** button
3.  Enter **9** in the **Name** field
4.  Select **Android 2.3.1- API Level 9** in the **Target** selector
5.  Click **Create AVD** to finish

[![](http://blog.springsource.com/wp-content/uploads/2010/12/android-virtual-devices.png "android-virtual-devices")](http://blog.springsource.com/wp-content/uploads/2010/12/android-virtual-devices.png)

### Sample Application

We've set up a samples repository for the Spring Mobile projects. From the command prompt, clone the repository to your local machine with the following command.

```sourcecode
Copy$ git clone git://git.springsource.org/spring-mobile/samples.git spring-mobile-samples
```

#### Start the Server

If you would like to run the server component of the sample application, to see the interaction between the Android client and a Spring MVC website, the easiest way to do so is from within the STS IDE. Navigate to the **spring-android-showcase** directory. There are two directories, "client" for a client Android application, and "server" for a Spring MVC server application. The client app makes network requests to the server to illustrate RestTemplate functionality, so the server must be running for the client to function.

1.  From STS, select **File -> Import...**
2.  In the **General** folder, select **Existing Projects into Workspace** and click **Next**
3.  Click **Browse** and navigate to the **Server** directory of the **spring-android-showcase** directory
4.  Click **Open** to add the project to your workspace
5.  Highlight the **spring-android-showcase-server** project in the **Package Explorer** view and drag it to **SpringSource tc Server Developer Edition** in the **Servers** view to deploy the web app
6.  Finally, click the **Run** button to start the server

#### Run the Android Client

To build the client app enter the following command from the command line

```sourcecode
Copy$ mvn clean install
```

Enter the following command to start the Android emulator. Maven tries to start the AVD with the name configured in the pom.xml, which is why the name needs to match with the name of the actual AVD you created.

```sourcecode
Copy$ mvn android:emulator-start
```

Finally, deploy the application to the emulator with the following command.

```sourcecode
Copy$ mvn android:deploy
```

The app is deployed to the emulator as S2Android Showcase. Before running the app, start up the Android log viewer to see the activity of the application. You will spend a lot of time with the Android logs when doing development. To view the logs, execute the following command at the command prompt.

```sourcecode
Copy$ adb logcat
```

Congratulations! You have now built and deployed an Android app with Maven managed dependencies.

### Conclusion

Adding Maven to your Android development process adds extra complexity, but it provides the ability to compile an Android app that includes external dependencies from a Maven repository. Without it, you would manually have to download the dependencies needed to compile and run your application. We've shown the benefit of using it for dependency management to build with the Spring Android libraries. In the [Part 2](http://blog.springsource.com/2011/02/09/spring-android-and-maven-part-2/) post I will cover Android development in Eclipse with the [Maven Integration for Android Development Tools](http://code.google.com/a/eclipselabs.org/p/m2eclipse-android-integration/) plugin, and the [ADT (Android Developer Tools) Plugin for Eclipse](http://developer.android.com/sdk/eclipse-adt.html). Neither the m2eclipse nor ADT plugins support building Android applications with Maven dependencies. The Maven Integration for Android Development Tools plugin provides a bridge to the Maven Android Plugin, enabling Maven dependency management within Eclipse for Android projects. If you prefer using Eclipse for development, I'll discuss how to use these plugins in the [next post](http://blog.springsource.com/2011/02/09/spring-android-and-maven-part-2/).

### Additional Resources

The [Android Chapter of Maven: The Complete Reference](http://www.sonatype.com/books/mvnref-book/reference/android-dev.html) contains a lot of good information about the Android Maven Plugin.