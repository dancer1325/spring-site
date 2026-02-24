---
title: Pluggable styling with SpringSource Slices
source: https://spring.io/blog/2009/07/10/pluggable-styling-with-springsource-slices
scraped: 2026-02-24T09:06:00.611Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  July 10, 2009 | 0 Comments
---

# Pluggable styling with SpringSource Slices

_Engineering | Andy Wilkinson |  July 10, 2009 | 0 Comments_

Since we [announced](http://blog.springsource.com/2009/06/22/modular-web-applications-with-springsource-slices/) SpringSource Slices, a number of users and customers have asked about using Slices to make the styling and branding of their Web sites pluggable. In this blog, I'll demonstrate how easy it is with Slices.

## Pluggable styling

I have a standard war file, named styled.host.war, that contains a very simple index.html page:

```html
Copy<html>
	<head>
		<title>SpringSource Slices Pluggable Styling Demonstration</title>
		<link rel="StyleSheet" href="styles/main.css" type="text/css" />
	</head>
	<body>
		<div class="header">
			<div class="title">SpringSource Slices</div>
			<div class="subtitle">Pluggable Styling Demonstration</div>
		</div>
	</body>
</html>
```

As you can see, it's looking for a CSS file named styles/main.css. Without a slice in place, this file doesn't exist. Deploying the war to dm Server shows that the page is unstyled:

```plain
Copycp styled.host.war ~/springsource-dm-server-2.0.0.CI-B297/pickup/
```

```plain
Copy[2009-07-10 15:20:46.183] fs-watcher <SPDE0048I> Processing 'CREATED' event for file 'styled.host.war'.
[2009-07-10 15:20:46.525] fs-watcher <SPDE0010I> Deployment of 'styled.host' version '1.0.0' completed.
[2009-07-10 15:20:46.539] Thread-19  <SPWE0000I> Starting web bundle '/styling'.
[2009-07-10 15:20:46.965] Thread-19  <SPWE0001I> Started web bundle '/styling'.
```

![Unstyled index page](http://blog.springsource.com/wp-content/uploads/2009/07/unstyled.png "unstyled")

The page can easily be styled by deploying a Slice that specifies the styled host war as its host and provides the required stylesheet:

```plain
Copycp plain.style.slice.war ~/springsource-dm-server-2.0.0.CI-B297/pickup/
```

```plain
Copy[2009-07-10 15:28:30.699] fs-watcher <SPDE0048I> Processing 'CREATED' event for file 'plain.style.slice.war'.
[2009-07-10 15:28:30.789] fs-watcher <SPDE0010I> Deployment of 'plain.style.slice' version '1.0.0' completed.
```

Now if we look at the page, its appearance has changed thanks to the styling provided by the Slice:

![Index page with the plain style applied](http://blog.springsource.com/wp-content/uploads/2009/07/plain-style.png "plain-style")

Note that there was no need to redeploy or alter the Host war file, the Host simply picked up the new style when the Slice was deployed. Similarly, if we now undeployed the styling Slice, the Host would revert to its unstyled appearance that we saw earlier. Alternatively, we can take things a step further by removing this styling Slice and deploying another one to change the styling, again without having to redploy or alter the Host:

```plain
Copyrm ~/springsource-dm-server-2.0.0.CI-B297/pickup/plain.style.slice.war
cp green.style.slice.war ~/springsource-dm-server-2.0.0.CI-B297/pickup/
```

```plain
Copy[2009-07-10 15:34:48.948] fs-watcher <SPDE0048I> Processing 'DELETED' event for file 'plain.style.slice.war'.
[2009-07-10 15:34:49.038] fs-watcher <SPDE0012I> Undeployment of 'plain.style.slice' version '1.0.0' completed.
[2009-07-10 15:36:01.064] fs-watcher <SPDE0048I> Processing 'CREATED' event for file 'green.style.slice.war'.
[2009-07-10 15:36:01.146] fs-watcher <SPDE0010I> Deployment of 'green.style.slice' version '1.0.0' completed.
```

![Index page with the green style applied](http://blog.springsource.com/wp-content/uploads/2009/07/green-style1.png "Index page with the green style applied")

## How does it work?

It's incredibly easy to take advantage of this capability of Slices.

### The Host

The main host maps Slices' SliceHostFilter to /\* in its web.xml file:

```xml
Copy<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
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
</web-app>
```

This Filter will route any requests with a path that matches any of the Hosts's Slices to the matching Slice. If it doesn't find a matching Slice the request is simply passed through to the Host.

As we saw above in the index.html file, the host is looking for all of its styling within the /styles directory, but doesn't actually provide this content itself.

### The styling Slices

Each of the styling Slices is also very simple. In their MANIFEST.MF files they specify their host, using the Slice-Host header, and a context path of /styles, using the Slice-ContextPath header:

```plain
CopyManifest-Version: 1.0
Bundle-SymbolicName: green.style.slice
Bundle-Version: 1.0
Bundle-ManifestVersion: 2
Bundle-Name: Styling Slice
Slice-Host: styled.host;version="[1.0, 2.0)"
Slice-ContextPath: /styles
```

The key thing here is that the configured context path of /styles matches the location in which the Host is looking for its styling. This means that, when the Slice is deployed, the filter in the Host will route requests made to /styles to the Slice. All that's left is for the styling slice to contain whatever resources are required to style the Host. In this case it's the main.css file, which the host references in its index.html, and an image which is referenced from the CSS:

![The content of the green styling slice](http://blog.springsource.com/wp-content/uploads/2009/07/slice-content.png "slice-content")

## Learning more

The source code for the war files that I've used above is available in the samples/pluggable-styling directory of the Slices Git repository (git://git.springsource.org/slices/slices.git). Also, take a look at Rob's [announcement blog](http://blog.springsource.com/2009/06/22/modular-web-applications-with-springsource-slices/) which includes details of how to build Slices and install it into dm Server.