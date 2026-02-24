---
title: Diagnosing OSGi uses conflicts
source: https://spring.io/blog/2008/11/22/diagnosing-osgi-uses-conflicts
scraped: 2026-02-24T09:12:58.800Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  November 22, 2008 | 0 Comments
---

# Diagnosing OSGi uses conflicts

_Engineering | Rob Harrop |  November 22, 2008 | 0 Comments_

In his [recent blog entry](http://blog.springsource.com/2008/10/20/understanding-the-osgi-uses-directive/), Glyn provided an introduction to the OSGi “uses” directive. In this blog, I want to dig a little deeper into the causes of uses constraint violations and present some tips for diagnosing uses problems in your applications.

For most of the examples I’m going to be using raw Equinox and not dm Server. The reason for this is that uses constraints are not specific to dm Server but are relevant to all OSGi users. At the end of this blog, I’ll demonstrate some of the smart constraint failure diagnostics built into dm Server.

## Dependent Constraint Mismatch

The most common cause of uses violations is a mismatch between one or more of the dependent constraints. As an example of this consider the three manifests below:

```
CopyManifest-Version: 1.0
Bundle-Name: Spring Bundle
Bundle-ManifestVersion: 2
Bundle-SymbolicName: spring
Bundle-Version: 2.5.5
Export-Package: spring.orm.hibernate;version="2.5.5";uses:="eclipselink"
Import-Package: eclipselink;version="[1.0, 2.0)"

Manifest-Version: 1.0
Bundle-Name: EclipseLink 1 Bundle
Bundle-ManifestVersion: 2
Bundle-SymbolicName: eclipselink
Bundle-Version: 1
Export-Package: eclipselink;version="1.0.0"

Manifest-Version: 1.0
Bundle-Name: EclipseLink 2 Bundle
Bundle-ManifestVersion: 2
Bundle-SymbolicName: eclipselink
Bundle-Version: 2
Export-Package: eclipselink;version="2.0.0"
```

Here you can see a spring bundle and two eclipselink bundles. Obviously, these are not the real bundles. The spring bundle has an import for package eclipselink in the range \[1.0, 2.0). Clearly, only the eclipselink\_1 bundle can satisfy this constraint. Now, consider these manifests from two different applications:

```
CopyManifest-Version: 1.0
Bundle-Name: App1 Bundle
Bundle-ManifestVersion: 2
Bundle-SymbolicName: app1
Bundle-Version: 1.0.0
Import-Package: spring.orm.hibernate,eclipselink;version="[1.0, 1.0]"

Manifest-Version: 1.0
Bundle-Name: App2 Bundle
Bundle-ManifestVersion: 2
Bundle-SymbolicName: app2
Bundle-Version: 1.0.0
Import-Package: spring.orm.hibernate,eclipselink;version="[2.0, 2.0]"
```

Here we can see that app1 imports eclipselink in range \[1.0, 1.0\] and app2 imports eclipselink in range \[2.0, 2.0\]. If I install these bundles into Equinox and then attempt to start the app bundles, the console shows something like this:

```
Copyid      State       Bundle
0       ACTIVE      org.eclipse.osgi_3.4.0.v20080605-1900
2       RESOLVED    spring_2.5.5
3       RESOLVED    eclipselink_1.0.0
4       RESOLVED    eclipselink_2.0.0
5       ACTIVE      app1_1.0.0
6       INSTALLED   app2_1.0.0
```

Here we can see that the spring and eclipselink bundles are all resolved. The app1 bundle has started, but the app2 bundle won’t start. To find out why we can use the diag command:

```
Copyosgi> diag app2
file:/Users/robharrop/dev/resdiag/uses/app2/bin [6]
  Package uses conflict: Import-Package: spring.orm.hibernate; version="0.0.0"
```

Here we can see that the app2 bundle can’t resolve because there is a package uses conflict for its import of spring.orm.hibernate. This means that the import in app2 for spring.orm.hibernate cannot be satisfied because one of its other imports conflicts with a uses constraint on the bundle that *could* supply spring.orm.hibernate - in this case the spring bundle.

The first step in diagnosing this is to find out the possible suppliers of the spring.orm.hibernate bundle. We know from our use case that the only possible supplier is the spring bundle, but if you don’t know the suppliers you can find them using the packages command:

```
Copyosgi> packages spring.orm.hibernate
spring.orm.hibernate; version="2.5.5"<file:/Users/robharrop/dev/resdiag/uses/spring/bin [2]>
  file:/Users/robharrop/dev/resdiag/uses/app1/bin [5] imports
```

This shows us that the spring.orm.hibernate package is exported by bundle 2. With this knowledge we can find out which packages are listed in the uses directive for the spring.orm.hibernate package in bundle 2:

```
Copyosgi> headers 2
Bundle headers:
 Bundle-ManifestVersion = 2
 Bundle-Name = Spring Bundle
 Bundle-SymbolicName = spring
 Bundle-Version = 2.5.5
 Export-Package = spring.orm.hibernate;version="2.5.5";uses:="eclipselink"
 Import-Package = eclipselink;version="[1.0, 2.0)"
 Manifest-Version = 1.0
```

Here we can see that the only package in the uses is the eclipselink package so that must be the culprit. Indeed, we can see the Spring bundle requires eclipselink in the range \[1.0, 2.0) whereas app2 requires eclipselink in range \[2.0, 2.0\] - these thwo ranges are disjoint, meaning that app2 *cannot* wire to the same version of eclipselink as the spring bundle.

In the case where the uses list is long, you can narrow down the possible violations by finding out which of the listed packages have more than one supplier. There must always be more than one supplier for you to see a uses constraint violation.

Version mismatch is not the only cause of dependent constraint mismatch. The constraints might not match because of attributes as well as version.

## Install Order Problems

If we revisit the previous example and change the manifest of the spring bundle so that it can accept version 2.0 of the eclipselink package and relax the range on app1 so it can accept anything over 1.0 we should be able to fix the problem:

```
CopyManifest-Version: 1.0
Bundle-Name: Spring Bundle
Bundle-ManifestVersion: 2
Bundle-SymbolicName: spring
Bundle-Version: 2.5.5
Export-Package: spring.orm.hibernate;version="2.5.5";uses:="eclipselink"
Import-Package: eclipselink;version="[1.0, 2.0]"

Manifest-Version: 1.0
Bundle-Name: App1 Bundle
Bundle-ManifestVersion: 2
Bundle-SymbolicName: app1
Bundle-Version: 1.0.0
Import-Package: spring.orm.hibernate,eclipselink;version="1.0"
```

Installing the bundles and starting the app bundles show that this change makes a big difference:

```
Copyid      State       Bundle
0       ACTIVE      org.eclipse.osgi_3.4.0.v20080605-1900
1       RESOLVED    spring_2.5.5
2       RESOLVED    eclipselink_1.0.0
3       RESOLVED    eclipselink_2.0.0
4       ACTIVE      app1_1.0.0
5       ACTIVE      app2_1.0.0
```

Now both app bundles can start. Unfortunately, there is a more subtle issue awaiting us. Depending on the installation order, this set of bundles might still fail to run together. To illustrate this, let’s install spring, eclipselink\_1 and app1 as one transaction and start app1:

```
Copyid      State       Bundle
0       ACTIVE      org.eclipse.osgi_3.4.0.v20080605-1900
1       RESOLVED    spring_2.5.5
2       RESOLVED    eclipselink_1.0.0
3       ACTIVE      app1_1.0.0
```

Now, let’s install eclipselink\_2 and app2:

```
Copyid      State       Bundle
0       ACTIVE      org.eclipse.osgi_3.4.0.v20080605-1900
1       RESOLVED    spring_2.5.5
2       RESOLVED    eclipselink_1.0.0
3       ACTIVE      app1_1.0.0
4       RESOLVED    eclipselink_2.0.0
5       INSTALLED   app2_1.0.0
```

The app2 bundle won’t start. The output from diag tells us why:

```
Copyosgi> diag app2
file:/Users/robharrop/dev/resdiag/uses/app2/bin [5]
  Package uses conflict: Import-Package: spring.orm.hibernate; version="0.0.0"
```

The uses constraint is back. Running through the diagnosis steps identified in the previous section won’t help here because there are no dependent constraint mismatches - we know that because the first time around these bundles resolved just fine.

The issue here is one of resolution order. The bundles were installed and resolved in two distinct chunks. The first chunk included spring, eclipselink\_1 and app1, the second eclipselink\_2 and app2. When the first chunk is resolved (as a result of starting the app1 bundle), the spring bundle gets wired to the eclipselink\_1 bundle for its import of the eclipselink package. This can be confirmed using the console:

```
Copyosgi> bundle app1
file:/Users/robharrop/dev/resdiag/uses/app1/bin [3]
  Id=3, Status=ACTIVE      Data Root=/opt/springsource-dm-server-1.0.0.RELEASE/lib/configuration/org.eclipse.osgi/bundles/3/data
  No registered services.
  No services in use.
  No exported packages
  Imported packages
    spring.orm.hibernate; version="2.5.5"<file:/Users/robharrop/dev/resdiag/uses/spring/bin [1]>
    eclipselink; version="1.0.0"<file:/Users/robharrop/dev/resdiag/uses/eclipselink1/bin [2]>
  No fragment bundles
  Named class space
    app1; bundle-version="1.0.0"[provided]
  No required bundles
```

Notice that the imported package section shows that eclipselink version 1.0.0 is imported from the eclipselink\_1 bundle. When the second chunk is installed, the app2 bundle cannot resolve because it requires eclipselink at version 2.0.0 but spring is already wired to eclipselink at version 1.0.0. When all the bundles are installed and resolved as one chunk, the OSGi resolver will attempt to satisfy *all* constraints, including making sure that the uses constraint on spring.orm.hibernate can be satisfied.

To fix this problem we don’t need to change our bundles. Instead, we can either reinstall the bundles in one chunk or we can trigger a refresh against the spring bundle - effectively asking OSGi to rerun the resolution process. Now that the eclipselink\_2 bundle is installed we can expect this to have a different outcome:

```
Copyosgi> refresh spring

osgi> ss

Framework is launched.

id      State       Bundle
0       ACTIVE      org.eclipse.osgi_3.4.0.v20080605-1900
1       RESOLVED    spring_2.5.5
2       RESOLVED    eclipselink_1.0.0
3       ACTIVE      app1_1.0.0
4       RESOLVED    eclipselink_2.0.0
5       ACTIVE      app2_1.0.0

osgi> bundle spring
file:/Users/robharrop/dev/resdiag/uses/spring/bin [1]
  Id=1, Status=RESOLVED    Data Root=/opt/springsource-dm-server-1.0.0.RELEASE/lib/configuration/org.eclipse.osgi/bundles/1/data
  No registered services.
  No services in use.
  Exported packages
    spring.orm.hibernate; version="2.5.5"[exported]
  Imported packages
    eclipselink; version="2.0.0"<file:/Users/robharrop/dev/resdiag/uses/eclipselink2/bin [4]>
  No fragment bundles
  Named class space
    spring; bundle-version="2.5.5"[provided]
  No required bundles
```

Notice that refreshing spring caused the app2 bundle to resolve. The wiring for the eclipselink package in the spring has changed to be satisfied by the export at version 2.0.0 from the eclipselink\_2 bundle.

## Uses constraints in dm Server

When you encounter a uses constraint violation in dm Server, we already attempt to perform some of the analysis steps for you, in particular identifying the possible dependent constraints that might be mismatched:

```
CopyCould not satisfy constraints for bundle 'app2' at version '1.0.0'.
 Cannot resolve: app2
  Resolver report:
    Bundle: app2_1.0.0 - Uses Conflict: Import-Package: spring.orm.hibernate; version="0.0.0"
      Possible Supplier: spring_2.5.5 - Export-Package: spring.orm.hibernate; version="2.5.5"
        Possible Conflicts: eclipselink
```

Uses constraints are common in enterprise libraries, and manually diagnosing a failure can be a real nightmare. In particular, determining the possible conflicts can be extremely time-consuming when you have an exported package with 10 or more packages listed in its uses clause. For this reason, automated diagnosis is a must, and I hope to improve the diagnosis code in dm Server all the time so that dealing with common errors becomes trivial.

In the next release, we are planning to build diagnosis tools right into our dm Server Eclipse tools so that most of these problems will be automatically diagnosed by dm Server.