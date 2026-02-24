---
title: Using Postgres on Cloud Foundry
source: https://spring.io/blog/2011/08/30/using-postgres-on-cloud-foundry
scraped: 2026-02-24T08:35:30.272Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Thomas Risberg |  August 30, 2011 | 0 Comments
---

# Using Postgres on Cloud Foundry

_Engineering | Thomas Risberg |  August 30, 2011 | 0 Comments_

When the new open source Platform-as-a-Service (PaaS) offering [Cloud Foundry](http://cloudfoundry.com "Cloud Foundry") from VMware launched earlier this year, it included a relational database service powered by MySQL along with the NOSQL options of MongoDB and Redis. One of the promises of the Open PaaS is to provide choice both in languages and frameworks you can develop with and in the database services that are available to use. We now have a new relational database service using [PostgreSQL](http://postgresql.org "PostgreSQL") available. This is great since we can now choose between the two most popular open source relational databases. PostgreSQL is is a very robust and reliable database that has been around for a long time so it definitely has been battle tested.

### vFabric Postgres on Cloud Foundry

The new PostgreSQL service is an excellent option for our relational database needs. PostgreSQL was originally developed and optimized to run on physical machines. Now that we are running our databases in the cloud it makes sense to optimize them for that environment. This is exactly what VMware has done for Postgres by creating a version that is optimized for the virtualized cloud environment. To power the PostgreSQL service on [cloudfoundry.com](http://cloudfoundry.com/) the Cloud Foundry team is using vFabric Postgres 9.0, a vSphere-optimized version of Postgres. The vFabric Postgres product is part of the [recently announced](http://finance.yahoo.com/news/VMware-Introduces-New-iw-1888124214.html?x=0) [vFabric Data Director](http://www.vmware.com/products/datacenter-virtualization/vfabric-data-director/), which is a new database provisioning and operations solution designed to deliver a Database-as-a-Service model for the enterprise. The first database supported on Data Director is vFabric Postgres.

So, is there any difference between vFabric Postgres and regular PostgreSQL from a developers perspective? No, they are functionally identical. You use the same JDBC driver and SQL syntax. The changes made are internal and related to delivering the elasticity and performance required for the cloud.

### Building a Book Shelf sample app with Roo

To get started using PostgreSQL on Cloud Foundry you first need an account on Cloud Foundry. Once that is taken care of we can start developing our first database application. The fastest way to write a Spring application is by using [Spring Roo](http://www.springsource.org/roo "Spring Roo") which is Spring’s rapid application development tool for Java developers. This of course means that you need to [install Roo](http://www.springsource.org/roo/guide?w=intro#intro-installation) and the [Cloud Foundry add-on](http://www.springsource.org/roo/guide?w=base-cloud-foundry).

Now that we have all the prerequisites in place we can get started. First create a directory for the application and open the Roo shell. Once that is opened we can create our project.

```text
Copy
roo> project --topLevelPackage org.springsource.data.demo.bookshelf
```

Now we are ready to configure the persistence options for our Roo app. I'll select Hibernate as the JPA provider and Postgres as the database. There is no need to provide any custom connection properties since we will be running this application in Cloud Foundry. The connection details are automatically managed for us.

```text
Copy
org.springsource.data.demo.bookshelf roo> persistence setup --provider HIBERNATE --database POSTGRES
```

Next we need to create our Entity class for this brief example. I'll create a Book class that will be part of my new BookShelf application. I'm just going to create the Book class for now and will add the Author and any other classes some time in the future.

```text
Copy
org.springsource.data.demo.bookshelf roo> entity --class ~.domain.Book
~.domain.Book roo> field string --fieldName title --sizeMax 200
~.domain.Book roo> field string --fieldName isbn --sizeMax 20
~.domain.Book roo> field date --fieldName published --type java.util.Date
~.domain.Book roo> field number --fieldName price --type java.math.BigDecimal
```

Once this is taken care of we are ready to create the web application with a controller for our Book class.

```text
Copy
~.domain.Book roo> controller all --package ~.web
```

We are done, pretty painless if you ask me. Now we need to package everything up, connect to Cloud Foundry and deploy the app.

```text
Copy
~.web roo> perform package
~.web roo> cloud foundry login
~.web roo> cloud foundry deploy --appName bookshelf --path /target/bookshelf-0.1.0.BUILD-SNAPSHOT.war
```

Once the deploy completes we should be able to list our current set of applications

```text
Copy
~.web roo> cloud foundry list apps

================================================ Applications ================================================

Name                      Status      Instances     Services             URLs
----                      ------      ---------     --------             ----
bookshelf                 STOPPED     1                                  bookshelf.cloudfoundry.com
```

### Connecting the app to PostgreSQL on Cloud Foundry

Now we get to the fun part. As you saw above, the application is in a stopped status. We can't start it now since we have not created our database and bound it to the application yet. So let's do that now, but first let's see what data services are available.

```text
Copy
~.web roo> cloud foundry list services

=================== System Services ====================

Service        Version     Description
-------        -------     -----------
rabbitmq       2.4         RabbitMQ messaging service
mongodb        1.8         MongoDB NoSQL store
redis          2.2         Redis key-value store service
postgresql     9.0         PostgreSQL database service (vFabric)
mysql          5.1         MySQL database service
```

Great, we do have PostgreSQL available as an option. So, let's create a database service instance, bind it to the app and start the app.

```text
Copy
~.web roo> cloud foundry create service --serviceName books --serviceType postgresql
~.web roo> cloud foundry bind service --serviceName books --appName bookshelf
~.web roo> cloud foundry start app --appName bookshelf
```

Let's see what we get when visiting [](http://bookshelf.cloudfoundry.com)[http://bookshelf.cloudfoundry.com](http://bookshelf.cloudfoundry.com)

[![bookshelf screen](http://blog.springsource.com/wp-content/uploads/2011/08/bookshelf.png "bookshelf")](http://blog.springsource.com/wp-content/uploads/2011/08/bookshelf.png)

So the app is up and running and we can add and view the books on our bookshelf.

### More about PostgreSQL on Cloud Foundry

We saw in the example above that we can connect our applications to PostgreSQL. But how do we know if we are running against a regular PostgreSQL install or vFabric Postgres? One way of determining this is to examine the output of the version() function. It typically says something like "PostgreSQL 9.0.4 on x86\_64-pc-linux-gnu, compiled by GCC gcc-4.4.real (Ubuntu 4.4.3-4ubuntu5) 4.4.3, 64-bit". Since the Postgres database running on [cloudfoundry.com](http://cloudfoundry.com/) is based on vFabric Postgres 9.0 we actually see a return value saying "\[PostgreSQL 9.0.4 \] vPostgres 1.0 release-v build". Let's see if we can easily add a page to our web app to display some database information. I'll create a DatabaseInfo controller that I can modify.

```text
Copy
~.web roo> controller class ~.web.DatabaseInfoController
```

This creates a controller *(bookshelf/src/main/java/org/springsource/data/demo/bookshelf/web/DatabaseInfoController.java)* that I've added a DataSource and some database info retrieval code to in the index method.

```java
Copy
@RequestMapping("/databaseinfo/**")
@Controller
public class DatabaseInfoController {

   @Autowired
   DataSource dataSource;

    @RequestMapping
    public void get(ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) {
    }

    @RequestMapping(method = RequestMethod.POST, value = "{id}")
    public void post(@PathVariable Long id, ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) {
    }

    @RequestMapping
    public String index(ModelMap modelMap) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
    	String userInfo = jdbcTemplate.queryForObject("select user", String.class);
    	String urlInfo = "?";
    	if (dataSource instanceof BasicDataSource) {
    	    urlInfo = ((BasicDataSource) dataSource).getUrl();
	}
	String versionInfo = jdbcTemplate.queryForObject("select version()", String.class);
        modelMap.put("userInfo", userInfo);
        modelMap.put("urlInfo", urlInfo);
        modelMap.put("versionInfo", versionInfo);
        return "databaseinfo/index";
    }
}
```

There is also a JSP file *(bookshelf/src/main/webapp/WEB-INF/views/databaseinfo/index.jspx)* that is used by this controller and that needs to have some code added.

```xml
Copy
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<div xmlns:jsp="http://java.sun.com/JSP/Page" xmlns:spring="http://www.springframework.org/tags" xmlns:util="urn:jsptagdir:/WEB-INF/tags/util" version="2.0">
  <jsp:directive.page contentType="text/html;charset=UTF-8"/>
  <jsp:output omit-xml-declaration="yes"/>
  <spring:message code="label_databaseinfo_index" htmlEscape="false" var="title"/>
  <util:panel id="title" title="${title}">
    <spring:message code="application_name" htmlEscape="false" var="app_name"/>
    <h3>
      <spring:message arguments="${app_name}" code="welcome_titlepane"/>
    </h3>
    <p>  The database user is ${userInfo}. </p>
    <p>  The dataSource URL is ${urlInfo}. </p>
    <p>  The database version is ${versionInfo}. </p>
  </util:panel>
</div>
```

Now we can build and deploy the modified application to the cloud.

```text
Copy
~.web roo> perform package
~.web roo> cloud foundry deploy --appName bookshelf --path /target/bookshelf-0.1.0.BUILD-SNAPSHOT.war
```

Accessing the application we can see a new link to the [Database Info Controller View](http://bookshelf.cloudfoundry.com/databaseinfo/index) that returns the following page:

[![bookshelf db info](http://blog.springsource.com/wp-content/uploads/2011/08/bookshelf-dbinfo1.png "bookshelf-dbinfo")](http://blog.springsource.com/wp-content/uploads/2011/08/bookshelf-dbinfo1.png)

As you can see we are using vFabric Postgres in our cloud deployed app.

### Can I run vFabric Postgres in my own server or private cloud?

Yes, you can get vFabric Postgres for development or production. You will also need the companion product [vFabric Data Director](http://www.vmware.com/products/datacenter-virtualization/vfabric-data-director/) to manage the database instances. vFabric Data Director is a software solution that enables you to provide Database-as-a-Service (DBaaS) for your cloud. It is designed for the cloud environment and is capable of managing thousands of databases while offering application developers self-service database management.

See [Jignesh Shah's blog](http://jkshah.blogspot.com/2011/08/vmware-vfabric-data-director-vfabric.html) for more info on this new product.