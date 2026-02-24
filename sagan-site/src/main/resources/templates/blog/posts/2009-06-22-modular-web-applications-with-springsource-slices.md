---
title: Modular Web Applications with SpringSource Slices
source: https://spring.io/blog/2009/06/22/modular-web-applications-with-springsource-slices
scraped: 2026-02-24T09:06:42.242Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  June 22, 2009 | 0 Comments
---

# Modular Web Applications with SpringSource Slices

_Engineering | Rob Harrop |  June 22, 2009 | 0 Comments_

**Updated:** added sub module instructions for Git.

I've talked in the past about providing support for truly modular applications, and I'm pleased to announce that you can now access the early prototype code of **SpringSource Slices**.

### Building and Installing

You can access the source code from our Git repository:

```plain
Copygit clone git://git.springsource.org/slices/slices.git
git submodule init
git submodule update
```

To build a packaged version of Slices simply run ant clean jar package from the build-slices directory:

```plain
Copycd slices/build-slices
ant clean jar package
```

This will result in a zip file in target/artifacts that contains the Slices subsystem which can then be installed on top of dm Server 2.0

Installing Slices is simply a matter of adding the new subsystem to dm Server and then updating dmServer's profile to start the new subsystem. Slices should work with any recent [dm Server 2.0 snapshot build](http://www.springsource.com/download/community?project=SpringSource%20dm%20Server&nightly=yes). Here I'm using 2.0.0.CI-R326-B274 which I've already downloaded and unzipped on my desktop:

```plain
Copy unzip target/artifacts/springsource-slices-BUILD-20090622083953.zip -d ~/Desktop/springsource-dm-server-2.0.0.CI-R326-B274
```

Next, dm Server's kernel.properties configuration must be updated to include the new slices subsystem. Open your dm Server installation's config/kernel.properties file, and edit the Profile Configuration section to list the slices subsystem and to give the profile a suitable name (I've called it slices):

```plain
Copy#######################
# Profile Configuration
#######################
profile.name=slices
profile.subsystems=	com.springsource.server.web,com.springsource.osgi.slices
profile.optionalSubsystems=
```

Save the updated file and you're ready to try the Slices sample application.

### Trying out the sample application

The Slices repository contains a version of Spring 3's PetClinic sample that we're constantly enhancing and improving as we add new features to Slices.

Before using the sample, its dependencies must be added to your dm Server installation. The dependencies are listed in the sample's dependencies.txt file. Download each of the listed dependencies to the installation's repository/bundles/usr directory. Next, start dm Server using the \-clean startup option:

```plain
Copy./bin/startup.sh -clean
```

Now it's time to build and deploy the sample. Move into the slices/samples/slices-petclinic/com.springsource.slices.petclinic.host directory and run ant clean jar:

```plain
Copycd samples/slices-petclinic/com.springsource.slices.petclinic.host
ant clean jar
```

The host can then be deployed by copying the resulting war to dm Server's pickup directory:

```plain
Copy cp target/artifacts/com.springsource.slices.petclinic.host.war ~/Desktop/springsource-dm-server-2.0.0.CI-R326-B274/pickup/
```

The host should now be accessible from [](http://localhost:8080/petclinic)[http://localhost:8080/petclinic](http://localhost:8080/petclinic):

![petclinic-no-slices](http://blog.springsource.com/wp-content/uploads/2009/06/petclinic-no-slices.png "petclinic-no-slices")

Next, move into the slices/samples/slices-petclinic/com.springsource.slices.petclinic.appointments directory and run ant clean jar to build the appointments slice:

```plain
Copycd samples/slices-petclinic/com.springsource.slices.petclinic.appointments
ant clean jar
```

The slice can now be deployed by copying the resulting war to dm Server's pickup directory:

```plain
Copycp target/artifacts/com.springsource.slices.petclinic.appointments.war  ~/Desktop/springsource-dm-server-2.0.0.CI-R326-B274/pickup/
```

Refresh [](http://localhost:8080/petclinic)[http://localhost:8080/petclinic](http://localhost:8080/petclinic) and it will now reflect the presence of the appointments slice with a new Appointments link:

![petclinic-appointments-slice](http://blog.springsource.com/wp-content/uploads/2009/06/petclinic-appointments-slice.png "petclinic-appointments-slice")

You can, if you wish, now remove the appointments war from the pickup directory to see the slice disappear again.

### Anatomy of a Slices Application

Using Slices you can construct a web application from multiple OSGi bundles, each of which serves up content for a distinct sub-portion of your application's URL space. Slices applications are arranged in a parent/child structure, with each application having at most one parent, referred to as the **host**, and zero or more children, referred to as **slices**. We're working on a simple Slices sample that looks like this:

![slice-anatomy](http://blog.springsource.com/wp-content/uploads/2009/06/slice-anatomy.png "slice-anatomy")

#### Inside the Host

The petclinic.host bundle contains all the shared content such as images and CSS, along with controllers and JSPs to serve up the home page. A host bundle is simply an RFC66-compliant web bundle that has a SliceHostFilter configured in its web.xml. The code snippet below shows the web.xml from the petclinic.host bundle:

```xml
Copy<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">
	
    <filter>
    	<filter-name>host-filter</filter-name>
    	<filter-class>com.springsource.osgi.slices.core.SliceHostFilter</filter-class>
    </filter>

    <filter-mapping>
        <filter-name>host-filter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

	<!-- Enables clean URLs with JSP views e.g. /welcome instead of /app/welcome -->
	<filter>
		<filter-name>UrlRewriteFilter</filter-name>
		<filter-class>org.tuckey.web.filters.urlrewrite.UrlRewriteFilter</filter-class>
	</filter>

	<filter-mapping>
		<filter-name>UrlRewriteFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
		
	<!-- Handles all requests into the application -->
	<servlet>
		<servlet-name>Spring MVC Dispatcher Servlet</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>
				/WEB-INF/spring/*.xml
			</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
	</servlet>
		
	<!-- Maps all /app requests to the DispatcherServlet for handling -->
	<servlet-mapping>
		<servlet-name>Spring MVC Dispatcher Servlet</servlet-name>
		<url-pattern>/app/*</url-pattern>
	</servlet-mapping>

  	<!-- Serves static resource content from the webapp root & .jar files such as spring-js.jar -->
	<servlet>
		<servlet-name>Resources Servlet</servlet-name>
		<servlet-class>org.springframework.js.resource.ResourceServlet</servlet-class>
		<load-on-startup>0</load-on-startup>
	</servlet>
		
	<!-- Map all /resources requests to the Resource Servlet for handling -->
	<servlet-mapping>
		<servlet-name>Resources Servlet</servlet-name>
		<url-pattern>/resources/*</url-pattern>
	</servlet-mapping>	
	
</web-app>
```

As you can see, the host can have any normal servlet and filter mappings, but it needs the SliceHostFilter to be able to route requests to its slices.

#### Inside a Slice

A slice is a bundle that looks and functions like a standard RFC66 webbundle, expect for the fact that it doesn't have its own ServletContext. Instead, a slice runs under the ServletContext of its host.

One of the main design goals for Slices in to ensure that slice development is as similar to standard web application development as can be. To this end, you create slice web content, exactly the same way you would create web content for any application, using web.xml. Here is the web.xml from the petclinic.appointments bundle:

```xml
Copy<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">

	<!-- Handles all requests into the application -->
	<servlet>
		<servlet-name>appointments</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>		
		<load-on-startup>1</load-on-startup>
	</servlet>
		
	<!-- Maps all /app requests to the DispatcherServlet for handling -->
	<servlet-mapping>
		<servlet-name>appointments</servlet-name>
		<url-pattern>/app/*</url-pattern>
	</servlet-mapping>
	
</web-app>
```

The appointments slice is just delegating into the Spring DispatcherServlet. Spring MVC can be used as normal within the slice.

The slice can access resources from the host bundle by simply referencing a resource name that does not exist in the slice itself. If a slice wants to access a resource in the host, even when it has a similarly named resource itself it can use the host: prefix to do so:

```java
CopyServletContext context =  getServletContext();
context.getResource("host:/WEB-INF/some.config.xml");
```

A slice needs to define which host it wants to attach to and does so using the Slice-Host manifest header. The Slice-ContextPath header defines which URL portion the slice handles:

```plain
CopyBundle-SymbolicName: petclininc.appointments
Slice-Host: petclinic.host;version="[1.0, 2.0)"
Slice-ContextPath: /appointments
```

#### Slice Lifecycle

A host can be running without any corresponding slices attached. When a Slice is installed into the server that matches a host, the slice is **attached** to the host. At this point, the sub-portion of the host's URL portion that matches the newly attached slice's Slice-ContextPath is routed to that slice.

When a slice is uninstalled, the portion of the URL space that was routed to the slice is now routed directly into the host. In this way, you can create content in the host to handle missing slices.

### What can I do in a Slice Today?

As of the time of writing, the Slices codebase supports the following features in a Slice:

-   Servlets and servlet mappings
-   JSPs
-   Spring MVC
-   Slice-local Sessions
-   Automatic fallback to app-wide Session
-   Slice-local resources lookups via ServletContext
-   Automatic fallback to resource lookup in the host
-   Explicit host resource lookup using host:

### What Next?

We're working on lots of interesting new functionality for Slices including:

-   Filters and filter mappings in slices
-   Listeners in slices
-   UI composition framework. You can see a manual approach to this in the Petclinic sample
-   Tiles 2 integration
-   Full sample application
-   SpringSource Tool Suite support

If you have any feature suggestions or you find a bug please don't hesitate to raise an issue [on our JIRA](https://issuetracker.springsource.com/browse/DMS).

If you want to keep a close eye on progress then you can follow our Git repository and our #dmserver Twitter tag.