---
title: Reuse your Hibernate/JPA domain model with Grails
source: https://spring.io/blog/2010/08/26/reuse-your-hibernate-jpa-domain-model-with-grails
scraped: 2026-02-24T08:53:56.793Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  August 26, 2010 | 2 Comments
---

# Reuse your Hibernate/JPA domain model with Grails

_Engineering | Peter Ledbrook |  August 26, 2010 | 2 Comments_

It's a common story. You have an existing database and now you want to add a web application for it with the minimum of fuss. Is Grails up to the task? Of course it is! Even better, if you already have a domain model based on JPA or Hibernate configuration files, you can reuse it and still benefit from the great GORM features you're used to.

The first step in reusing an existing domain model is to get the class files on the application's classpath. You can do this either by packaging them up in a JAR file and including it in the application (typically by dropping it in the 'lib' directory), or by putting the source files in the 'src/java' directory. The JAR file is the better approach when sharing a model between applications, but you then need a multi-project build system to ensure that the JAR is always up to date for all projects. It's probably worth the extra effort and both Gradle and Maven have plugins for building Grails projects. Alternatively, if your Grails application is the only project using the model going forward, you should keep the source in 'src/java' instead.

Once you've decided on how to incorporate the domain model, you need to tell Grails about it. How you do that depends on whether you're using Hibernate configuration files or JPA annotations.

#### XML configuration files

Hibernate XML mapping files are old school, but they have the advantage of keeping all the mapping information in one place. To use them from your Grails application, simply create the file grails-app/conf/hibernate/hibernate.cfg.xml with the content:

```xml
Copy<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <mapping resource="org.example.Book.hbm.xml"/>
        <mapping resource="org.example.Author.hbm.xml"/>
        ...
    </session-factory>
</hibernate-configuration>
```

Make sure you add a <mapping> element for each of your Hibernate mapping files and drop those mapping files into grails-app/conf/hibernate. Amazingly, that's all you have to do! So what about annotated models?

#### JPA annotations

As with the Hibernate mapping files, you have to create the grails-app/conf/hibernate/hibernate.cfg.xml file. This time, you've got a bit more work to do as you have to add a <mapping> entry for every domain class:

```xml
Copy<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <mapping class="org.example.Book"/>
        <mapping class="org.example.Author"/>
        ...
    </session-factory>
</hibernate-configuration>
```

Not much fun I grant you, but at least you only have to do it once.

If you're using Grails 1.1.x or earlier, there's one more task to undertake: you have to tell Grails that this is an annotation-based model by adding the following to grails-app/conf/DataSource.groovy:

```groovy
CopydataSource {
    configClass = "org.codehaus.groovy.grails.orm.hibernate.cfg.GrailsAnnotationConfiguration"
    ...
}
```

You don't have to do this for Grails 1.2+ because GrailsAnnotationConfiguration is the default setting in those versions. Next time you run your Grails application, you'll have access to all your annotated domain classes.

**Note** Since version 1.3.2, you have been able to use the Grails command create-hibernate-cfg-xml to generate the Hibernate configuration file for you. Saves typing/copy-pasting!

One glaring gap remains in the domain model from a GORM standpoint: constraints. You can't define them in your Java classes, but without them, GORM validation is useless. Fortunately, you can attach constraint metadata to a class by adding a *package.DomainClass*Constraints.groovy script to 'src/java'. For example, if you have a domain class org.example.LibraryBook, then you should add the file src/java/org/example/LibraryBookConstraints.groovy. Inside this script you define your constraints block like so:

```groovy
Copyconstraints = {
    name(blank: false)
    age(min: 0, max: 120)
    ...
}
```

You may be wondering why the script goes in the 'src/java' directory. That's a good question. Grails requires the constraints script in source form, so you need to put it in a location which results in Grails including the .groovy file (not the compiled class) in the WAR. The 'src/java' directory is the only location that satisfies this requirement.

It really is surprisingly simple to incorporate a Java domain model in your Grails applications. You may lose the elegance and custom mappings of standard GORM domain classes, but you are still able to use dynamic finders, criteria queries, validation, etc. What about scaffolding? Grails will do its best to scaffold your domain model, but it makes no guarantees. As long as the model is straightforward, the scaffolding should work fine. Reusing a domain model is also a great way of trying out Grails since you don't have to create one from scratch.

Note that if you simply want to access a legacy database and don't have an existing domain model, then you are almost certainly better off using standard GORM domain classes with custom mappings. Both approaches are documented in the user guide: [Hibernate mappings](http://grails.org/doc/latest/guide/15.%20Grails%20and%20Hibernate.html) and the [custom mapping DSL](http://grails.org/doc/latest/guide/5.%20Object%20Relational%20Mapping%20\(GORM\).html#5.5.2 Custom ORM Mapping).

One final thing: if you've used a Java domain model in your own Grails project, I'd be interested to hear about your experiences. Anything that can help other users who want go down this path would be much appreciated!