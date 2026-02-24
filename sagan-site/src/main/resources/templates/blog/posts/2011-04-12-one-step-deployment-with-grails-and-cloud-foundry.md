---
title: One-step deployment with Grails and Cloud Foundry
source: https://spring.io/blog/2011/04/12/one-step-deployment-with-grails-and-cloud-foundry
scraped: 2026-02-24T08:43:26.554Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  April 12, 2011 | 0 Comments
---

# One-step deployment with Grails and Cloud Foundry

_Engineering | Peter Ledbrook |  April 12, 2011 | 0 Comments_

A couple of years back, the co-founder of a startup spoke at the London Groovy and Grails User Group. I remember vividly how he said he dreamed of deploying a Grails application with "just one click". With the announcement of the new Cloud Foundry service, his dream is nearly a reality for all Grails users. Now you not only get simple and rapid development with Grails, but also simple and rapid deployment to a cloud hosting provider.

So how do Grails and Cloud Foundry work together? As long time Grails users would expect, we have [a plugin](http://grails.org/plugin/cloud-foundry) for that! To demonstrate how it works I'm going to walk you through deploying a sample application, [Pet Clinic](https://github.com/SpringSource/cloudfoundry-samples/tree/master/petclinic-grails), to Cloud Foundry. It's a simple application and you can see it [in action on Cloud Foundry](http://petclinic-grails.cloudfoundry.com/) already.

## The initial deployment

I shall assume that you already have Grails installed and an application to work with. If not, then check out the Grails [installation](http://grails.org/Installation) and [quick start](http://grails.org/Quick+Start) guides on the website. You can then grab the [source code](https://github.com/SpringSource/cloudfoundry-samples/tree/master/petclinic-grails) for the Pet Clinic application.

The Pet Clinic application is pretty straightforward, storing pets, owners, vets, and visits in a SQL database. Hence the main plugin it depends on is the standard Hibernate one. So what do we need to do to deploy the application to Cloud Foundry? We start by installing the Cloud Foundry plugin:

    grails install-plugin cloud-foundry

Once that's done, we need to provide the username and password to access the Cloud Foundry service. Of course, you can't do that until you [register for an account](http://www.cloudfoundry.com/), so make sure you do that as soon as you can! The best place to put your credentials is in your personal settings file: $HOME/.grails/settings.groovy since they will be available to *all* your Grails projects and you can keep them out of source control. They can also go in grails-app/conf/BuildConfig.groovy or grails-app/conf/Config.groovy if you want, but I wouldn't recommend it under normal circumstances.

So, we add the following properties to our settings.groovy file and then we're ready to go:

```groovy
Copygrails.plugin.cloudfoundry.username = "<your_username>"
grails.plugin.cloudfoundry.password = "<pass>"
```

First, we check whether the credentials are working, so we run the command:

    grails cf-info

which, all being well, will print out:

    VMware's Cloud Application Platform
    For support visit support@cloudfoundry.com

    Target:   http://api.cloudfoundry.com (v0.999)

    User:     <your\_username>
    Usage:    Memory   (1.0G of 2.0G total)
              Services (4 of 16 total)
              Apps     (2 of 20 total)

This command gives you a short summary of your account, including how many applications you have running and how much or your memory quota you are using.

Now for the moment you have been waiting: one-step deployment of your application. Simply run the command:

    grails prod cf-push

Note that we haven't even configured DataSource.groovy - that's deliberate, and we'll come back to the data source configuration shortly. But for now, all we have to do is press return when asked about the application URL and also when the command asks whether we want to create and bind a MySQL service. Then we wait as the plugin finishes the deployment of your application - and voila! The application is up and running and ready to use.

\[callout title=Cloud Foundry Classic\]You may notice 0.1 and 0.2 versions of the Cloud Foundry plugin. These only work with the Classic Cloud Foundry service, so make sure you don't install one of these versions by accident.\[/callout\]

What could be simpler? The main thing to be aware of at this stage is that *you can't deploy an application to a URL that is already being used*, so you wouldn't be able to deploy the Pet Clinic application to the URL [http://petclinic-grails.cloudfoundry.com/](http://petclinic-grails.cloudfoundry.com/) for example. Not to worry: you can either change the application's name in application.properties or specify a different application name at deployment time, as you'll see later when we look more closely at some of the commands.

One other note: the cf-\* commands default to the 'development' environment, but you usually want to use the 'production' environment for deployments. That's why we specify 'prod' in the above command.

Of course, not every deployment goes this smoothly and your application may fail to start up. If this is the case, then you can get hold of the Tomcat logs via the command:

    grails cf-crashlogs

The logs should give you plenty of information to diagnose the problem.

And that's the one step deployment! In the rest of the article I'll look at some of the most common commands that you will want to use on a day to day basis, but you can find a complete reference in the [plugin user guide](http://grails-plugins.github.com/grails-cloud-foundry/).

## Application updates and fine-grained control of provisioning

Once you have deployed an application to Cloud Foundry, that isn't the end of the story. What happens when you want to deploy a new version? Or scale the application to handle more concurrent users? The Cloud Foundry plugin has a rich set of commands that allow you to deal with those and other situations.

### Updating an application

Let's say you have added a fancy new UI to the Pet Clinic application and now you want to make it available to the world. You might think you just need to run cf-push again, but in fact there is a separate command for updating already deployed applications:

    grails prod cf-update

Interestingly, this command will only push the parts of the WAR file that have changed, so after the initial deployment the uploads to the server will be pretty quick. It will also automatically stop and then restart the application server. So again, if the application fails to start up properly, cf-crashlogs is your friend.

### Application names

As I mentioned earlier, you cannot deploy an application with a name that is already in use on Cloud Foundry. So does that mean you have to change the application name in application.properties? You can certainly do that, since the plugin uses that as the default application name on Cloud Foundry, but it's not the only option.

Most of the cf-\* commands take an \--appname option which allows you to override the default value. For example, the Pet Clinic sample has an application name of 'petclinic-grails', but you could deploy it on Cloud Foundry with a different name using:

    grails cf-push --appname=my-pet-clinic

The application would then be available at the URL [http://my-pet-clinic.cloudfoundry.com/](http://my-pet-clinic.cloudfoundry.com/).

### Services

Most applications need to store their data somewhere, be it in a SQL database or perhaps one of the NoSQL data stores like MongoDB. Cloud Foundry provides access to such stores via the concept of services. In future, expect to see other types of service too - perhaps caching and text search for example.

So, your application won't work until the services it requires have first been *provisioned*, i.e. created/allocated, and then *bound* to the application. For example, in the case of Pet Clinic we had to provision a MySQL service and bind it to the application so that it had somewhere to store its data. Fortunately, the cf-push command did this for us automatically.

If I run the cf-apps command, you will see how a MySQL service is bound to the petclinic-grails application:

    +------------------+----+---------+-----------------------------------+---------------+
    | Application      | #  | Health  | URLs                              | Services      |
    +------------------+----+---------+-----------------------------------+---------------+
    | petclinic-grails | 1  | RUNNING | petclinic-grails.cloudfoundry.com | mysql-52db6   |
    +------------------+----+---------+-----------------------------------+---------------+

This says that the 'petclinic-grails' application is bound to the service 'mysql-52db6', in other words, 'petclinic-grails' is storing its data in the given MySQL instance. And if I run cf-services, you'll see a list of all the available services that you can provision, as well as those that you have provisioned already:

    ============== System Services ==============

    +----------+---------+-------------------------------+
    | Service  | Version | Description                   |
    +----------+---------+-------------------------------+
    | mysql    | 5.1     | MySQL database service        |
    | redis    | 2.2     | Redis key-value store service |
    | mongodb  | 1.8     | MongoDB NoSQL store           |
    +----------+---------+-------------------------------+

    =========== Provisioned Services ============

    +---------------+---------+
    | Name          | Service |
    +---------------+---------+
    | mysql-52db6   | mysql   |
    +---------------+---------+

As you can see, Cloud Foundry currently support MySQL, Redis, and MongoDB, and in my next article I will be looking at a more complex example that uses all three types of service.

In the current example, the name of the provisioned service, 'mysql-52db6', was automatically generated for us by Cloud Foundry, but you can also give the services your own names if you provision them manually. For example:

    grails cf-create-service mysql my-db

will provision a MySQL service called 'my-db'. You can then use it as the database for an application by binding it:

    grails cf-bind-service my-db --appname=my-pet-clinic

You can even specify which services an application should bind to when pushing it to Cloud Foundry: simply specify the '--services' option, as documented in the plugin user guide.

By this time you should have one big question in your mind: how did the application know where to find the MySQL instance? We didn't specify a database connection URL at any point and yet the application ran without a problem. What's going on?

### It's a kind of magic

When you bind a service to an application in Cloud Foundry, you are telling the cloud to pass the connection settings for that service to the application at runtime. The Cloud Foundry plugin then picks up that information and overrides the connection settings in your application. As if by magic, your application then transparently works against the cloud service without you having done anything! And this works for all available services, not just MySQL.

Only the connection settings are overridden, so you can still control which type of MySQL tables are created via a custom dialect, e.g. InnoDB, and whether Hibernate should keep the database schema up to date (via the 'dbCreate' property). Just be sure you put the customisations in the appropriate environment block. For example, in DataSource.groovy you might have:

```groovy
Copy    production {
        dataSource {
            dialect= org.hibernate.dialect.MySQLInnoDBDialect
            driverClassName = "com.mysql.jdbc.Driver"
            username = "n/a"
            password = "n/a"
            url = "n/a"
            dbCreate = "update"
        }
    }
```

The username, password and url could be the values for a local MySQL instance since these will be overridden once the application is deployed to Cloud Foundry.

This process of overriding the connection settings isn't the only bit of magic that the Cloud Foundry plugin provides. It is also aware of the plugins that correspond to Cloud Foundry services, so if you have any of them installed, it will check that you have provisioned the appropriate services when you deploy an application. Hence why it asked us whether we wanted to provision and bind a MySQL service for the Pet Clinic application: the app had the Hibernate plugin installed. This works for the MongoDB and Redis plugins too.

Before I wrap up, one final thing: make sure you install the latest versions of the MongoDB and Redis plugins before deploying applications to Cloud Foundry that use those services.

## The holy grail of deployment

I've covered quite a bit of the Cloud Foundry service and the Grails plugin for it, but I hope you can see how straightforward deployment has become with the combination of Grails and Cloud Foundry. They really do make for simple and quick deployment of web applications. And as the current incarnation of Cloud Foundry matures, more and more services will be added so that you can host more complex applications on it.

And finally, as I mentioned earlier, in the next article I will be looking at a more complex sample application that combines several of the Cloud Foundry services. It will go into more depth about deploying to a cloud service and the kinds of things you need to think about. You can also glean extra information from the [Cloud Foundry Samples wiki](https://github.com/SpringSource/cloudfoundry-samples/wiki/Grails) on GitHub. Until next time, enjoy the new service!