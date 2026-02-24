---
title: Understanding the OSGi uses Directive
source: https://spring.io/blog/2008/10/20/understanding-the-osgi-uses-directive
scraped: 2026-02-24T09:13:57.265Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Glyn Normington |  October 20, 2008 | 0 Comments
---

# Understanding the OSGi uses Directive

_Engineering | Glyn Normington |  October 20, 2008 | 0 Comments_

If you build an application for the SpringSource dm Server, or any other OSGi platform, you'll probably encounter the uses directive before long. Unless you have a clear understanding of the purpose of the directive, you won't know when to code it and you'll be left guessing when a bundle fails to resolve because of a uses conflict. This article should give you a thorough understanding of the uses directive, when to use it, and how to debug uses conflicts.

## Bundle Resolution

OSGi is designed so that once bundles are 'resolved', you shouldn't typically hit class cast exceptions and similar problems due to type mismatches. This is very important since OSGi uses a class loader for each bundle, so there is ample opportunity to expose users to various kinds of type mismatches.

It is essential to grasp that any Java type, such as a class or interface, must be loaded by a class loader before it is available at runtime. A runtime type is defined by the combination of the type's fully qualified class name and the class loader that defined the type. If the same fully qualified class name is defined by two distinct class loaders, then this produces two incompatible runtime types. This incompatibility causes runtime errors if the two types come into contact. For example, attempting to cast one of these types to the other will result in a class cast exception.

OSGi isn't the only Java module system based on class loaders, but it is by far the most mature. This means that the designers of OSGi have thought long and hard about these kinds of problems and have included solutions in the OSGi specification. The design of OSGi is to get these problems out of the way before the application code runs, in a process known as resolution. Resolution is analogous to compilation in a strongly typed programming language, such as Java, in that certain categories of problems are diagnosed before the application code ever starts to run. Getting your bundles to resolve can sometimes be a bit of a headache, but it beats diagnosing runtime errors such as class cast exceptions.

So what does it mean to resolve a bundle? It means satisfying the dependencies of the bundle, typically by finding bundles which export the packages that the given bundle imports and which satisfy various constraints. The most obvious constraint is that each exported package version should lie in the package version range of the package import. Another kind of constraint is where arbitrary attributes can be specified on a package import which then have to match attributes on the corresponding package exports.

## Packages Exported by Multiple Bundles

The uses constraint, which we'll get to soon, aims to remove a category of type mismatches caused by a package being exported by more than one bundle. A type mismatch occurs when a type from one bundle is used where a type from another bundle is required, as the runtime types are incompatible. For instance, a class cast exception occurs when an attempt is made to cast a type from one bundle using a different type with the same class name from another bundle. How can this happen? Since a bundle cannot import the same package from more than one bundle, there has to be some other way for conflicting types to come into contact. It happens by a type being passed "through" a type in another package.

There are two ways a type can be passed through another type. The first way is when one type refers to the other type explicitly. For example, a method of the Bar type in the org.bar package may refer to a type Foo in the org.foo package: public Foo getFoo();

The second way a type can be passed through another type is implicitly, via a supertype. For instance, the signature of a method may refer to a supertype: public Object getFoo(); In the implicit case, an instance of the supertype will at some point be cast to the conflicting type.

So that's how such a type mismatch occurs at the Java code level. Let's consider what the bundle manifests look like.

The required type Foo may be exported by the same bundle (B) that exports the org.bar package: bundle-symbolicname: B bundle-manifestversion: 2 export-package: org.foo,org.bar or by another bundle (F): bundle-symbolicname: B bundle-manifestversion: 2 export-package: org.bar import-package: org.foo bundle-symbolicname: F bundle-manifestversion: 2 export-package: org.foo

The uses directive was introduced so that OSGi could diagnose the above kinds of type mismatches during bundle resolution.

## The uses Directive

To detect potential type mismatches of the above kind during resolution, the explicit or implicit type reference at the level of Java code is declared in the corresponding bundle manifest. The export of the package containing the referring type is tagged with a uses directive which declares the package of the type referred to.

In the above example, the export of the org.bar package is declared to use the org.foo package: ... export-package: org.bar;uses:="org.foo" ... Note that the package, or packages, named in a uses directive are either exported or imported by the bundle manifest containing the uses directive. So the following manifest is valid: ... export-package: p;uses:="q,r", q import-package: r ... whereas the following manifest is invalid (because it neither exports nor imports the package q): ... export-package: p;uses:="q,r" import-package: r ...

## Transitive uses

Type references are transitive. For example, if a type A refers to type B which refers to another type C, a user of A can obtain a reference to C via B.

Since type references are transitive, OSGi automatically takes this into account. It forms what is known as the transitive closure of the uses directive. This means that it is sufficient to code a uses directive for each type reference and OSGi will take care of transitive type references.

For example, although the bundle manifest: ... export-package: p;uses:="q,r",q;uses:="r" import-package: r ... is correct, the following bundle manifest is sufficient to capture type references from package p to q, from q to r, and (transitively) from p to r: ... export-package: p;uses:="q",q;uses:="r" import-package: r ...

## Diagnosing uses Conflicts

The bundle resolution process aims to satisfy all constraints, so it will only report a uses conflict if it cannot satisfy dependencies in such a way as to honour all uses constraints. The diagnostics issued by SpringSource dm Server in these circumstances help to pin down the problem.

Let's look at a made-up example to understand the principle. Suppose we are developing a couple of utility bundles F and B which will be invoked from a client bundle C. Suppose we have introduced a second version of F and have tried deploying the bundles with the following manifests on the server. Manifest-Version: 1.0 Bundle-ManifestVersion: 2 Bundle-SymbolicName: F Bundle-Version: 1 Bundle-Name: F Bundle Export-Package: org.foo;version=1 Manifest-Version: 1.0 Bundle-ManifestVersion: 2 Bundle-SymbolicName: F Bundle-Version: 2 Bundle-Name: F Bundle Export-Package: org.foo;version=2 Manifest-Version: 1.0 Bundle-ManifestVersion: 2 Bundle-SymbolicName: B Bundle-Version: 1 Bundle-Name: B Bundle Export-Package: org.bar;uses:="org.foo" Import-Package: org.foo;version="\[1,2)" Manifest-Version: 1.0 Bundle-ManifestVersion: 2 Bundle-SymbolicName: C Bundle-Version: 1.0.0 Bundle-Name: C Bundle Import-Package: org.bar,org.foo;version="\[2,3)" When we try to deploy bundle C, dm Server issues the following log message: <SPDE0018E> Unable to install application from location 'file:/xxx/C.jar/'. Could not satisfy constraints for bundle 'C' at version '1.0.0'. Cannot resolve: C Resolver report: Bundle: C\_1.0.0 - Uses Conflict: Import-Package: org.bar; version="0.0.0" Possible Supplier: B\_1.0.0 - Export-Package: org.bar; version="0.0.0" Possible Conflicts: org.foo . The line: Bundle: C\_1.0.0 - Uses Conflict: Import-Package: org.bar; version="0.0.0" tells us that there is a uses constraint violation related to the package import of org.bar by bundle C. In other words, the export of org.bar that C is attempting to use has a uses constraint that cannot be satisfied.

The line: Possible Supplier: B\_1.0.0 - Export-Package: org.bar; version="0.0.0" tells us which supplier of org.bar was under consideration.

The line: Possible Conflicts: org.foo tells us which package is violating the uses constraint.

Stepping back from the detail, we know that the uses conflict is due to bundle C importing a different version of package org.foo than that imported by bundle B. Something must be causing different versions to be used and when we check the package imports carefully, we realise that we forgot to upgrade B to use the latest version of F.

After updating the manifest of B to: Manifest-Version: 1.0 Bundle-ManifestVersion: 2 Bundle-SymbolicName: B Bundle-Version: 1 Bundle-Name: B Bundle Export-Package: org.bar;uses:="org.foo" Import-Package: org.foo;version="\[2,3)" we can now deploy bundle C successfully.

## Diagnosing Complex uses Conflicts

Our made-up uses conflict was sufficiently simple that we could find the problem by staring at the various bundle manifests for long enough. With more complex uses conflicts, such as when there are a number of possibly conflicting packages listed in uses directives, you can probably make progress faster by using the Equinox console (telnet to port 2401) to examine the bundles which have been successfully installed (dm Server uninstalls any bundles it cannot successfully deploy).

You can get a list of the installed bundles by issuing the following Equinox console command: osgi> ss which, in our made-up problem, shows something like this: ... 82 ACTIVE F\_1.0.0 84 ACTIVE F\_2.0.0 85 ACTIVE B\_1.0.0

To display the bundle manifest of B issue: osgi> headers 85 and to display the importers and exporters of package org.foo issue: osgi> packages org.foo

## Summary

This article has explored the need for the uses directive, how it is used to provide early diagnosis of a certain category of type mismatch errors, and how you can get to the bottom of uses constraint violations using dm Server diagnostics and the Equinox console.

You may think the uses directive is more trouble than it is worth, but when you consider the alternative of tracking down the reason for a possibly obscure class cast exception while your application is running, you should start to see the rationale for uses. Indeed any Java module system which doesn't provide the equivalent of uses constraints is likely to give you class cast exceptions at runtime once you have gotten to the point of having multiple versions of your application modules. The OSGi uses directive solves a general problem of Java modularity.