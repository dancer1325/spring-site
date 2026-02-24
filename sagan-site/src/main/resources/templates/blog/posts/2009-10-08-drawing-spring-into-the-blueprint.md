---
title: Drawing Spring into the Blueprint
source: https://spring.io/blog/2009/10/08/drawing-spring-into-the-blueprint
scraped: 2026-02-24T09:03:32.351Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  October 08, 2009 | 0 Comments
---

# Drawing Spring into the Blueprint

_Engineering | Costin Leau |  October 08, 2009 | 0 Comments_

Last month, almost 4 years after the initial 4.0 release, OSGi Alliance officially [approved](http://www.osgi.org/News/20090924) the OSGi service platform 4.2 release. The announcement headline featured the *Blueprint Container* Service, a new addition to the Compendium specification based on the programming model promoted by the Spring Dynamic Modules (also known as Spring OSGi) project. To quickly summarize Blueprint, I will just blatantly quote the OSGi [spec](http://www.osgi.org/Release4/Download):

> (Blueprint Container) \[...\] defines a dependency injection framework, specifically for OSGi bundles, that understands the unique dynamic nature of services. It provides an OSGi bundle programming model with minimal implementation dependencies and virtually no accidental complexity in the Java code.

Users familiar with [IoC](http://en.wikipedia.org/wiki/Inversion_of_Control) concepts or Spring and Spring DM configuration, will find the Blueprint specification easy to grasp. In fact, being derived from Spring DM, many of the Blueprint concepts, syntax and terminology are identical and porting an existing an application between the two, in most cases, should be just a matter of adjusting the configuration files. In terms of features, Blueprint offers an inversion of control container that supports constructor and setter injection, factory methods, life cycle management and callbacks, signature disambiguation and type conversion among other things. On the OSGi side, one can use exporters and importers for transparent publication and consumption of OSGi services.

Below is a a code snippet from a Blueprint configuration that creates several objects, imports a service, wires them together then exposes the target as an OSGi service:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0" default-activation="lazy">
    <!-- basic object creation -->
    <bean id="object" class="java.lang.Object"/>
    <bean id="length" class="java.lang.Integer">
        <argument value="4"/>
    </bean>
    
    <bean id="buffer" class="java.lang.StringBuffer" depends-on="simple">
    	   <property name="length" ref="length"/>
    </bean>
    
    <bean id="current-time" class="java.lang.System" factory-method="currentTimeMillis" scope="prototype"/>
    
    <bean id="list" class="java.util.ArrayList" destroy-method="clear" activation="eager">
    	   <argument ref="length"/>
    </bean>

    <!-- service import -->
    <reference id="ds" class="javax.sql.DataSource" filter="(batch-size=200)"/>

    <bean id="consumer" class="org.springframework.jdbc.core.simple.SimpleJdbcTemplate">
        <property name="dataSource" ref="ds"/>
    </bean>
    
    <!-- service export -->
    <service id="publisher" ref="consumer" auto-detect="interfaces"/>
</blueprint>
```

Besides the configuration, Blueprint also offers a small API (through [container](http://www.osgi.org/javadoc/r4v42/org/osgi/service/blueprint/container/package-frame.html) and [reflect](http://www.osgi.org/javadoc/r4v42/org/osgi/service/blueprint/reflect/package-frame.html) packages) for dependency lookup, reading meta data, or performing custom type conversion which resembles, to some degree, that of Spring. For more information on the similarities (and differences) between Blueprint and Spring DM, see the dedicated [chapter](http://static.springsource.org/osgi/docs/2.0.0.M1/reference/html/blueprint.html) in the DM 2.0 M1 reference documentation.

## Mix and match

The Spring DM trunk has been closely following the specification since its inception and soon after the OSGi 4.2 platform approval, following Spring 3.0 RC1 announcement, Spring Dynamic Modules 2.0 M1 was [released](http://www.springsource.org/node/2006). Spring DM 2.x serves as the Reference Implementation (RI) for the Blueprint specification and I am glad to report that, though it's just the first milestone, M1 provides a complete Blueprint implementation, fully passing the Technology Compatibility Kit (TCK).

It is worth pointing out that while Blueprint depends on the OSGi 4.2 API, Spring DM 2.x does **not**. Users running OSGi 4.0 and 4.1 can safely use Spring DM 2.x; only the Blueprint functionality will be disabled, the rest of the features being available.

One of the key benefits of using Spring DM is having full access to the Spring container, transparently, from OSGi: whether you plan on using Blueprint, Spring /Spring DM API and configurations, Spring DM 2.x can accommodate both styles inside the same application thereby providing more flexibility. For example, field injection or annotation-based configurations can easily be added to a Blueprint bundle just as you would in a traditional Spring application, complementing the Blueprint functionality.

To wit, let's take one of the specification examples and combine the Blueprint configuration with [JSR-250](http://jcp.org/en/jsr/detail?id=250) (Common Annotations) and some of the [new additions](http://blog.springsource.com/2009/09/29/spring-framework-3-0-rc1-released/) in Spring 3 such as the [JSR-330](http://jcp.org/en/jsr/detail?id=330) (Dependency Injection for Java) support.

### A quick example

I have picked the trivial echo service example from the Blueprint spec (Section 121, page 638) which shows basic injection and OSGi export of a bean/pojo:

```java
Copy
public interface Echo {
  public String echo(String m);
}
```

```java
Copy
public class EchoImpl implements Echo {
  String message;
  public void setMessage(String m) {
    this.message= m;
  }
  public String echo(String s) { return message + s; }
}
```

```xml
Copy
<blueprint>
   <service id="echoService" interface="com.acme.Echo" ref="echo"/>
   <bean id="echo" class="com.acme.EchoImpl"
       <property name="message" value="Echo: "/>
   </bean>
</blueprint>
```

I will be using Maven for this example and thus its conventions for the project layout: \[caption id="attachment\_2939" align="aligncenter" width="326"\]![project maven layout](http://blog.springsource.com/wp-content/uploads/2009/10/project-layout.jpg "project-layout")\[/caption\]

#### Step 1: Add annotations

Let's modify the EchoImpl class so that it uses an OSGi service, such as PackageAdmin (for simplicity, as it is already offered out of the box by most OSGi platforms) to give us some wiring information on start-up, through the aforementioned annotations:

```java
Copy
public class EchoImpl implements Echo {
	@Inject
	private PackageAdmin pkgAdmin;

	String message;

	public void setMessage(String m) {
		this.message = m;
	}

	public String echo(String s) {
		return message + s;
	}

	@PostConstruct
	void startup() {
		Bundle bnd = pkgAdmin.getBundle(getClass());
		ExportedPackage pkg = pkgAdmin.getExportedPackage(Echo.class.getPackage().getName());
		System.out.printf("Echo service bundle [%s] wired to bundles %s\n", bnd.getSymbolicName(), 
				Arrays.toString(pkg.getImportingBundles()));
	}
}
```

#### Step 2: Update configuration

To enable annotation processing, simply use the context namespace (see [this](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/ch03s09.html) chapter in the Spring documentation for more information):

```xml
Copy
<blueprint>
   <service id="echoService" interface="com.acme.Echo" ref="echo" />
   <bean id="echo" class="com.acme.internal.EchoImpl">
     <property name="message" value="Echo: "/>
   </bean>
   
   <reference id="pkgAdmin" 
		interface="org.osgi.service.packageadmin.PackageAdmin" />

   <context:annotation-config/>

</blueprint>
```

#### Step 3: Update manifest

As some might have noticed, between step 1 and step 2, I have moved the EchoImpl class from com.acme into a dedicated package com.acme.internal so that the implementation is isolated from its public contract (the interface). Rather than creating the bundle manifest by hand, we will use [Bundlor](http://www.springsource.org/bundlor) instead to automatically generate it. Just mark *internal* packages as being private:

```sourcecode
CopyExcluded-Exports: *.internal*
```

Notice that the template contains no information regarding the annotations or the configuration - since 1.0.0.M6 Bundlor understands Blueprint bundles, it [automatically](http://blog.springsource.com/2009/09/26/bundlor-adds-support-for-the-blueprint-service/) picks up and parses any relevant configurations and classes.

#### Step 4: Package bundle

The last step is to simply package the project. I am using Maven but you can easily switch to Ant or other building environments:

```sourcecode
Copy# mvn package
```

And we're done. Now let's run our example.

#### Deploy bundle

Before deploying the bundle, you can double check the jar content (like the manifest) to see that it contains everything it needs:

```sourcecode
CopyManifest-Version: 1.0
Export-Package: com.acme;version="0.0.0"
Bundle-Name: blueprint-atinject
Bundle-ManifestVersion: 2
Bundle-SymbolicName: blueprint-atinject
Import-Package: javax.annotation,javax.inject,org.osgi.framework,org.o
 sgi.service.packageadmin
```

Simply deploy the resulting jar into an OSGi 4.2 framework alongside Spring DM 2.0.0.M1 and you should see the following output:

```sourcecode
CopyINFO: Blueprint API detected; enabling Blueprint Container functionality
...
INFO: JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
...
Echo service bundle [blueprint-atinject] wired to bundles []
...
INFO: Publishing service under classes [{com.acme.Echo}]
```

Below is my OSGi bundle list (resulting from invoking ss in equinox):

```sourcecode
Copy0       ACTIVE      org.eclipse.osgi_3.5.0.v20090520
1       ACTIVE      com.springsource.slf4j.api_1.5.6
                    Fragments=2
2       RESOLVED    com.springsource.slf4j.juli_1.5.6
                    Master=1
3       ACTIVE      com.springsource.slf4j.org.apache.commons.logging_1.5.6
4       ACTIVE      com.springsource.org.aopalliance_1.0.0
5       ACTIVE      com.springsource.net.sf.cglib_2.1.3
6       ACTIVE      org.springframework.asm_3.0.0.RC1
7       ACTIVE      org.springframework.expression_3.0.0.RC1
8       ACTIVE      org.springframework.core_3.0.0.RC1
9       ACTIVE      org.springframework.beans_3.0.0.RC1
10      ACTIVE      org.springframework.aop_3.0.0.RC1
11      ACTIVE      org.springframework.context_3.0.0.RC1
12      ACTIVE      org.springframework.osgi.io_2.0.0.M1
13      ACTIVE      org.springframework.osgi.core_2.0.0.M1
14      ACTIVE      org.springframework.osgi.extender_2.0.0.M1
15      ACTIVE      com.springsource.javax.inject_0.9.0.PFD
16      ACTIVE      com.springsource.javax.annotation_1.0.0
17      ACTIVE      blueprint-atinject_0.0.0
```

You can find the project archive (with instructions) attached [here](http://blog.springsource.com/wp-content/uploads/2009/10/blueprint-atinject.zip).

By embracing *de-facto* standards (like dependency injection) inside the OSGi platform, we believe that Blueprint is beneficial to OSGi and non-OSGi developers alike, as it encourages API decoupling and externalization of infrastructure concerns, considerably lowering the entry barrier for creating and configuring OSGi applications.

We are quite excited about the road ahead and the features currently in development!

For more updates (and feedback!) on OSGi and Spring DM, follow us on this blog and on Twitter (through tags [#osgi](http://search.twitter.com/search?q=%23osgi), [#springdm](http://search.twitter.com/search?q=%23springdm), [#dmserver](http://search.twitter.com/search?q=%23dmserver). Yours truly is available at [@costinl](http://twitter.com/costinl)).