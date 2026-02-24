---
title: Countdown to Grails 2.0: Database Migrations
source: https://spring.io/blog/2011/08/17/countdown-to-grails-2-0-database-migrations
scraped: 2026-02-24T08:36:41.022Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  August 17, 2011 | 0 Comments
---

# Countdown to Grails 2.0: Database Migrations

_Engineering | Peter Ledbrook |  August 17, 2011 | 0 Comments_

One of the many nice features of Grails is the way it will automatically create your database schema for you from your domain model. Admittedly it's a feature of Hibernate that Grails uses, but still, it helps you get started very quickly with database-driven web applications without having to worry about the database schema.

What happens once your application moves to production? During development, losing the data in between server runs isn't a big issue. But you can't just drop the database in production. So that rules out the "create" and "create-drop" values for the dbCreate data source setting. What about "update"? It won't clear the data from your database, so it's often used by people. Yet it doesn't work well for production because it has significant limitations. For example, it can't handle simple column renames and it certainly can't handle modifications to existing data that might be a necessary part of an upgrade. Although it's tempting to use dbCreate = "update" for your deployments to production, it is usually the wrong solution.

What does that leave you with? SQL scripts for performing the migrations? That's certainly possible, but it's not easy to create the appropriate SQL for given changes in your GORM domain model. And it's not suitable if you need to support multiple database types, since the SQL will probably differ for each one.

Fortunately, there is a flexible, database-agnostic tool for performing schema migrations: [Liquibase](http://www.liquibase.org/). Even better, there are two plugins for Grails that make using Liquibase a bit easier than would otherwise be the case: the [Liquibase plugin](http://grails.org/plugin/liquibase) and [Autobase](http://grails.org/plugin/autobase).

So if those plugins have been around for a long time, what's new for Grails 2.0? Database migrations are an essential part of using Grails for any serious work and so the Grails team decided that there should be an official way to handle them. The result is a new plugin that combines the best parts of the Liquibase and Autobase plugins: the [Database Migration plugin](http://grails.org/plugin/database-migration).

## In brief

Even though core database migration support was part of the Grails 2.0 roadmap, there was no reason to tie it to that version. That means you can use the plugin on Grails 1.3 projects as well. The plugin brings these features to your applications:

-   Declarative database schema and data migration
-   Groovy and XML migration scripts
-   Manual or automatic execution of migrations
-   Automatic tracking of migrations that have already been applied
-   Generation of migrations by diffing domain model and database

It provides well over 20 commands, giving you plenty of control. You can find out more from the plugin's [user guide](http://grails-plugins.github.com/grails-database-migration/docs/manual/index.html), but put simply it provides a great deal of help for managing controlled upgrades of a database for new versions of a Grails application. You can still use the other plugins or even a completely different approach if you want, but for most users this is definitely the way to go.

The rest of this article will show you a common usage pattern for the plugin.

## Getting started

Imagine you have been working hard on a Grails application and now you want to deploy the first version to production. It's time to consider how you're going to manage database upgrades. At this point the production database hasn't even been created. So, declare the Database Migration plugin as a runtime dependency like so:

```groovy
Copygrails.project.dependency.resolution = {
    inherits "global"
    ...
    plugins {
        runtime ":database-migration:1.0"

        compile ":hibernate:$grailsVersion"
        compile ":jquery:1.6.1.1"
        compile ":resources:1.0.2"

        build ":tomcat:$grailsVersion"
    }
    ...
}
```

and run grails compile. At the time of writing, 1.0 is the latest version of the plugin. Check the Grails [plugin portal](http://grails.org/plugin/database-migration) to find out what the latest version is at any given time.

With the plugin available, you can start the database migration journey. As I said, the production database hasn't been created yet. You could deploy the initial version of the application with a dbCreate value of "update" and that would work fine. But for reasons that I'll discuss later, I want to encourage you to initialise the database from a Database Migration changelog, i.e. a migration script. Don't worry, it's a lot less work than you might think.

The trick is to use one of the plugin's commands to generate the migration scripts for us. You start by making sure that your 'prod' database is empty and removing any dbCreate settings for that environment. You then run

grails dbm-create-changelog
grails prod dbm-generate-gorm-changelog --add changelog-1.0.groovy

(Now would be a good time to try the new Grails 2 interactive mode!)

The above will create a grails-app/migrations/changelog.groovy file that will become your parent changelog file. The second command then generates a migration script, grails-app/migrations/changelog-1.0.groovy, that will take an empty database and create the appropriate schema for the current version of the application. The parent changelog is also updated to include this new one. Note that your database will remain empty!

Although Liquibase aims to be database agnostic, it's best to run the various generation and diff commands in a Grails environment that has a data source of the appropriate type configured, typically "production". This will ensure you don't have to make too many changes to the generated changelogs.

\[callout title=Changelog Names\] The plugin doesn't force any particular naming convention on you for the changelog filenames. In this article, I'm simply using 'changelog-', so each changelog is tied to a particular version of the application. It works pretty well. \[/callout\]

Why did we create a 1.0 changelog rather than use the "update" dbCreate setting? The initial changelog means that you can take your application and deploy it to a fresh, empty database. All the migrations will work as you'd expect, since they will run in order from a known, fixed schema (i.e. an empty one). The trouble with the 'update' setting is that it will aways create a schema that matches the current domain model. Older changelogs simply won't run because the database isn't in a state that they expect! You can still use "update" for your first application version if you want, but the above approach means you get an early chance to test your initial changelog.

At this point, it's work reviewing the changelog-1.0.groovy file to see what a migration looks like and whether anything needs changing. You might see more indexes and constraints added than you really need, so some trimming might be in order.

OK, so we now have a migration script now. But when we run grails prod run-app the application won't start up: the database is still empty. Why? The migration scripts do not automatically run on startup, which means that you either have to manually update the database using a command like dbm-update or enable migration execution on startup. I prefer the latter, particularly as there are many situations in which you simply don't have access to the production database from the Grails command line. So, add these settings to the Config.groovy file:

```groovy
Copygrails.plugin.databasemigration.updateOnStart = true
grails.plugin.databasemigration.updateOnStartFileNames = ["changelog.groovy"]
```

Now when you start the application, the migration scripts will run and your application will work! And when you restart the server, the plugin will detect that the migrations have already run so they're ignored.

## Subsequent changes

The whole point of database migrations is that you make changes to your database as your application evolves and control that process. So now imagine you've done some work on your application and want to release a new version, perhaps 1.0.1. To upgrade the production database you will need to create a changelog for your domain model changes. You could do this manually, but you can save a fair bit of effort by making using of the Database Migration plugin's 'diff' commands.

To perform a diff, you need a database that the plugin can compare the current domain model to. Again, it's a good idea to use the same type of database as you're using in production. Also, the database must be in its original state, i.e. before the current set of domain model changes were made. In other words, don't run your application against the database with dbCreate = "update" enabled! In fact, it's worth creating a database dump for every version of the application so that you can roll back in case you do accidentally update the database in this way.

OK, enough of the warnings. Let's create the next changelog:

```groovy
Copygrails prod dbm-gorm-diff --add changelog-1.0.1.groovy
```

As before, this will create a changelog-1.0.1.groovy file in the migrations directory and include it from the parent changelog. You will also need to check the generated changelog and potentially tweak it, but it's much easier to edit an existing file than create a new one from scratch. That's it! Now you can commit this change log to version control along with the corresponding domain class changes. In fact, I recommend that you always include domain class changes ant the corresponding migration script modifications in the same commit.

The changelog files themselves look like this:

```groovy
CopydatabaseChangeLog = {
    changeSet(id: "UpdateDescriminatorForPluginTabs", author: "pledbrook") {
        update(tableName: "content") {
            column name: "class", value: "org.grails.plugin.PluginTab"
            where "title like 'description-%' and class = 'org.grails.wiki.WikiPage'"
        }
    }

    changeSet(id: "IssuesUrlForPlugins", author: "pledbrook") {
        addColumn(tableName: "plugin") {
            column name: "issues_url", type: "varchar(255)", {
                constraints nullable: true
            }
        }
    }
}
```

As you can see, they are simply collections of change sets, where each change set contains some database refactorings. Each change set needs a unique ID per author per changelog so that Liquibase can track whether it has been applied or not (Liquibase tracks the change sets, not the changelogs!). The above example demonstrates how you can update existing data (id "UpdateDescriminatorForPluginTabs") as well as add a new column. Other supported refactorings include:

-   Add/rename/modify column (schema change)
-   Add index
-   Add/rename/modify table
-   Add/remove unique constraint

The full range of refactorings are described in the [Liquibase manual](http://www.liquibase.org/manual/home), although all the examples are in XML. Fortunately, the mapping of XML -> Groovy is pretty straightforward:

1.  XML element -> Groovy method
2.  Attribute -> named argument
3.  Nested elements -> nested methods inside a closure

Finally, you may be wondering how to structure your changelogs. Should you have a change set per refactoring? Or a single change set per changelog? Or something in between? This is up to you, but a change set per source control commit can work well. In other words, you create a change set for each commit that contains changes to the domain model. Alternatively, you may want a change set per database table. Do whatever works for you.

That's all for this article. As you have seen, proper database migration support is an important part of any production database-backed web application, so it's great news that we now have an officially supported and very capable plugin to meet this need. It only works with relational databases (so no migrations for Redis, MongoDB, etc. I'm afraid) but it should still satisfy the requirements of the vast majority of Grails users. Go ahead and give it a try!