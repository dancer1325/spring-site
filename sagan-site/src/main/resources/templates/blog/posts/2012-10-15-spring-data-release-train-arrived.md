---
title: Spring Data release train arrived
source: https://spring.io/blog/2012/10/15/spring-data-release-train-arrived
scraped: 2026-02-24T08:15:24.387Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  October 15, 2012 | 0 Comments
---

# Spring Data release train arrived

_Engineering | Oliver Drotbohm |  October 15, 2012 | 0 Comments_

It's a pleasure to announce that we have [just released](http://www.springsource.org/node/3703) the GA versions of a variety of Spring Data modules. With this release we continue to manifest the commitment of SpringSource to provide Java developers with tools to work with state-of-the-art persistence technologies. In this blog post I'd like to give you detailed insight into what the release includes, why we decided for a release train and a brief outlook into what the next steps on the Spring Data roadmap are.

## The release train

Looking back at the way Spring Data modules were developed, release cycles were usually managed by the individual module leads. Given the different pace and maturity of the modules this caused some issues when trying to work with multiple modules at once. Especially the projects depending on Spring Data Commons were suffering from this problem.

We were working hard on minimizing these issues but eventually came to the conclusion that it makes sense to coordinate the releases much more and sync up minor releases of the modules. The general Spring Data release now ships with the following participants:

-   Spring Data Commons 1.4
-   Spring Data JPA 1.2
-   Spring Data MongoDB 1.1
-   Spring Data Neo4j 2.1
-   Spring Data Gemfire 1.2
-   Spring Data REST exporters 1.0

Moving forward we will continue to sync up the releases of upcoming minor versions. Still modules are free to do bug fix releases at their own pace.

## What's in this release

As just outlined, the core theme of the release is the cross-project compatibility. Besides this rather non-functional one the most important feature probably is the JavaConfig support for Spring Data repositories. We improved the XML namespace and introduced annotation support in Spring Data Commons to allow the integration of JavaConfig based repositories for store specific modules.

We introduce `@Enable(Jpa|Mongo|Neo4j|Gemfire)Repositories` that are 1:1 equivalents of the XML `repositories` namespace element. So what had to be configured like this in former versions (using JPA as example).

```xml
Copy
<jpa:repositories base-package="com.acme.repositories" />
```

Can now be achieved in Spring JavaConfig configuration classes by using the `@EnableJpaRepositories` annotation.

```java
Copy@EnableJpaRepositories(base-package = "com.acme.repositories")
class ApplicationConfig {

}
```

With this style of configuration we enable completely XML-free application configuration across the store implementations. More advanced examples of annotation configuration usage can be found in the sample code for the [recently released Spring Data book](http://shop.oreilly.com/product/0636920024767.do) written by the Spring Data team members. The code is on GitHub and uses all the new features of the latest Spring Data release as well as the most recent Spring 3.2 milestones. Consider this repository as a canonical sample repo for Spring Data related code samples going forward.

The integration of `@Enable…` annotations for repositories required us to raise the Spring dependency to the 3.1 line. Still all the rest of the codebase is fully compatible with the Spring 3.0 branch. So the modules shipped with the release all depend on Spring 3.1.2 by default. If you really need to work with 3.0.7, manually define the Spring dependency in your project's `pom.xml` to enforce the older version to be used.

### JPA

Besides the JavaConfig support for repositories the JPA module ships with a plethora of small but important improvements such as updates to the latest versions of persistence providers (Hibernate 3.6.10, EclipseLink 2.4.0). We pro-actively ensure compatibility with the Hibernate 4 branch but haven't upgraded our dependency yet to not force users into an upgrade or manually configuring their projects down to Hibernate 3.

### MongoDB

Amongst the released modules, the MongoDB is probably the one shipping with most new user-visible features. We improved the GridFS support so that you can now easily store and retrieve files into/from MongoDB by using the `GridFsTemplate` (see this section of the reference docs for details).

```java
Copyclass MongoConfig extends AbstractMongoConfiguration {

  // …

  @Bean
  public GridFsTemplate gridFsTemplate() {
    return new GridFsTemplate(mongoDbFactory(), mappingMongoConverter());
  }
}

class GridFsClient {

  public static void main(String… args) throws Exception {
    ApplicationContext context = new AnnotationConfigApplicationContext(MongoConfig.class);
    GridFsOperations operations = context.getBean(GridFsOperations.class);

    File file = new File("myfile.txt");
    operations.store(file.getInputStream(), "myfile.txt");

    GridFsResource[] txtFiles = operations.getResources("*.txt");
   }
}
```

If you'd like to use Spring Data MongoDB from within a JavaEE 6 environment you can now do so as we ship a CDI extension that allows injecting a MongoDB based Spring Data repository into a CDI managed bean using `@Inject` ([DATAMONGO-356](https://jira.springsource.org/browse/DATAMONGO-356)).

Beyond that we've received two community contributions by Maciej Walkowiak and Patryk Wasik. Maciej implemented support for JSR-303 validation by leveraging the persistence events we trigger ([DATAMONGO-36](https://jira.springsource.org/browse/DATAMONGO-36)). Patryk enabled optimistic locking by adding an `@Version` annotation as well as the necessary tweaks to our persistence mechanism to throw an exception in case document modifications have been done behind ones back ([DATAMONGO-279](https://jira.springsource.org/browse/DATAMONGO-279)).

## Neo4j

The Spring Data Neo4j added most notably support for unique entity creation. You can now annotate entity fields as `@Indexed(unique=true)` which will allow the Neo4j mechanisms for creating unique nodes and entities to kick in.

We also invested a lot in making working with relationships easier and more comprehensive, you can now populate and save relationship-entities in the same ways as node-entities. We also allow more fine-grained control of relationship-type. It can now also be set on the `@RelationshipEntity(type="REL_TYPE")` annotation or in a field annotated with `@RelationshipType` to be used on a per-instance basis. Due to popular demand, we now allow `@RelatedTo[Via](enforceTargetType=true)` annotated fields to be constrained by target field type.

With this release the support for storing type-hierarchies in the graph was revamped so you can use `@TypeAlias("myType")` for saving precious space in properties and indexes. The polymorphic reads for aliased types now also work as expected.

An useful addition for audits, validation and other cross-cutting concerns are the new lifecycle events. Like in the other modules `ApplicationContextListener` can now listen for `(Before|After)SaveEvent`s. We also refactored the internal infrastructure, so that you can now directly create a `Neo4jTemplate` around a `GraphDatabaseService` even without an application-context set-up.

Something we've put a lot of effort into, was improving the handling of user-defined or finder-method-derived cypher queries. This is an area that will also see a lot of investment in the future of the Spring Data Neo4j module. Spring Data Neo4j's 2.1 release supports the recently released Neo4j 1.8 version and works with 1.7 as well.

## Gemfire

The release of the Gemfire module includes a more advanced Spring namespace to more closely mimic the Gemfire cache configuration options and thus complete the Spring based programming model. It also ships with an implementation of the Spring Data repository abstraction to ease entity access and query execution just as you are used to from using other stores.

The Spring Data Gemfire module will also be shipped alongside the upcoming Gemfire 7.0 release to continue the mission to simplify developing Java applications using data grids.

## REST exporter

Another important new addition to the portfolio of the Spring Data projects is the REST exporter. It allows to expose entities managed by Spring Data repositories via HTTP in a hypermedia driven way and allows triggering the execution of query methods defined.

All it takes is registering the `RepositoryRestExporterServlet` in your application or let your Spring MVC DispatcherServlet configuration include the `RepositoryRestMvcConfiguration` JavaConfig class. By default, this will cause a resource exposed for every Spring Data repository in your application context. The resources can be discovered by following links exposed in a core resource.

Assuming you have two repository interfaces `CustomerRepository` and `ProductRepository`. You can now go ahead and add the following setup code to your Servlet 3 `WebApplicationInitializer`:

```java
CopyDispatcherServlet servlet = new RepositoryRestExporterServlet();
Dynamic dispatcher = container.addServlet("dispatcher", servlet);
dispatcher.setLoadOnStartup(1);
dispatcher.addMapping("/");
```

Running the app inside e.g. Jetty will give you this:

```source
Copy$ curl -v http://localhost:8080

{ "links" : [ {
    "rel" : "product",
    "href" : "http://localhost:8080/product"
  }, {
    "rel" : "customer",
    "href" : "http://localhost:8080/customer"
}]}
```

Clients can now follow these links to access products and customers, explore their relationships to other entities (hypermedia-driven in turn) and execute queries declared through query methods in there repository interfaces. Currently, only JPA based repositories are supported but we're going to add support for all the other stores in upcoming versions.

There are detailed options to configure which resources and which HTTP methods get exposed, extension points to manipulate the returned representations with custom links to enrich your API beyond plain CRUD operations. To find out more about the project check out it's [reference documentation](https://github.com/SpringSource/spring-data-rest/wiki) or the relevant chapter of the Spring Data book we wrote with O'Reilly (read more on that below).

## Roadmap

The current release finalizes the development of the 1.x branch of Spring Data Commons, which is what all store implementations released alongside rely on. Going forward we're going to concentrate on a first milestone of a 2.0 release to implement more advanced features and slightly changes some core things that will probably require API changes and adaptions to the programming model. This includes a common auditing mechanism (currently only available in the JPA module) as well as more flexibility in the interface based repository abstraction.

Besides the store implementation modules lead by SpringSource employees we're starting to see implementations lead by the community popping up recently. Neale Upstone has just released version 1.0 of the [FuzzyDB module](http://fuzzydb.blogspot.com/2012/10/fuzzydb-and-fuzzydb-spring-100-is-here.html) and the [Spring Data Solr](https://jira.springsource.org/browse/DATASOLR) module led by Christoph Strobl is close to a first milestone.

If there's any feature you'd like to see in Spring Data modules, any feedback to the existing ones, now is the time to raise your voice in the the [Spring JIRA](https://jira.springsource.org/secure/BrowseProjects.jspa#all).

## Miscellaneous

The last thing I'd like to point you to is the Spring Data support in STS that has been introduced in the 3.0 version. When editing a Spring Data repository you'll now get query method validation right in place as you can see below.

![](http://blog.springsource.org/wp-content/uploads/2012/10/ide-finder-typos.png "Query method name validation in STS")

Query method validation

Beyond that you also get code completion support when composing query methods.

![](http://blog.springsource.org/wp-content/uploads/2012/10/ide-property-proposal.png "Code completion proposals for query methods in STS")

Code completion support for query methods

If this blog post is your first contact with the Spring Data project or you'd like to get started with the project in general I highly recommend taking a look at the O'Reilly Spring Data book we wrote. It's a pragmatic introduction into state-of-the art Java persistence, the Spring Data project in general and its core design principles. It introduces the store-specific modules with hands on examples and detailed explanations of the sample code provided alongside the book. Attendees of the SpringOne2GX conference that just started will receive a free copy of the PDF version of the book.

## Summary

Over the development time of 8 months we have fixed almost [300 tickets](https://jira.springsource.org/secure/IssueNavigator.jspa?mode=hide&requestId=13731). Special thanks go out to Michael Hunger and Lasse Westh-Nielssen from Neo Technologies for driving the Neo4j module, David Turanski and Costin Leau for their work on the Spring Data Gemfire module, Jon Brisbin for leading the REST exporter module, Mark Pollack for the overall project lead as well as all other Spring Data team members for their support. Special thanks to everyone in the Spring Data community for their extremely valuable feedback through the JIRA and the forums as well as their pull requests on GitHub that helped actually getting even more features into the release.