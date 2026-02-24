---
title: New Features in the Latest Cloud Foundry
source: https://spring.io/blog/2009/11/23/new-features-in-the-latest-cloud-foundry
scraped: 2026-02-24T09:02:07.418Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Charles Lee |  November 23, 2009 | 0 Comments
---

# New Features in the Latest Cloud Foundry

_Engineering | Charles Lee |  November 23, 2009 | 0 Comments_

We recently updated [CloudFoundry.com](http://www.cloudfoundry.com). With this update, we introduced several exciting new features that pave the way for future development. I want to take this opportunity to describe and explain these features, as well as provide some background in how they came about. We are excited for you to try them out and provide us with feedback.

## Cost Tracking

While the pay-per-use model of the cloud can reduce expenditure, it is important to track the actual usage and costs so that it does not result in an unexpected hefty bill. Previously, Cloud Foundry informed the users of their current spending rate of their deployments. This is useful for understanding the meter rate, but it does not give a clear understanding or statistics on how much an application deployment actually costs. The latest update to Cloud Foundry presents a new historical feature to cost tracking. For running deployments, Cloud Foundry displays the cost so far. For deployments that are no longer active, the total cost of running that deployment over its lifetime is shown.

![Screen shot 2009-11-18 at 12.59.52 PM](http://blog.springsource.com/wp-content/uploads/2009/11/Screen-shot-2009-11-18-at-12.59.52-PM.png "Screen shot 2009-11-18 at 12.59.52 PM")

Aside from preventing monthly bills from surprising you, this is particularly useful when you need to compare the cost per application against the budget. If your budget is derived from correlating the business objectives to the dollars spent, then Cloud Foundry will clearly show you if you have achieved your goals. Over time, we expect to evolve this feature to be more accurate (network I/O charges are not currently included) and expand the statistic correlation between cost and other operational metrics to give you the tools for better targeting and planning.

## Availability Zone

Many users have requested the ability to specify the availability zone for deployments due to the fact that reserved instances in EC2 need to be launched in specified availability zones.  Reserved instances are pre-paid and cost about a third of on-demand instances. Cloud Foundry now offers the ability specifiy the availability zone and the selection input is positioned below the region when configuring deployments.

![Screen shot 2009-11-19 at 10.46.12 AM](http://blog.springsource.com/wp-content/uploads/2009/11/Screen-shot-2009-11-19-at-10.46.12-AM.png "Screen shot 2009-11-19 at 10.46.12 AM")

Note: the cost tracking does not reflect the cost savings of using reserved instances as Amazon does not yet provide a convenient way of retrieving the billing details.

## Maintenance Page

If you need to disable your Java web application for maintenance, the convention is to display a bumper page (a.k.a. maintenance page) informing your user of the unavailability. Cloud Foundry now provides this capability with just a single button. First, when you add or edit an application, you will notice a new field: **Maintenance Page**. This is the static page (from the application’s root context) that you would like to display when in maintenance mode. Once deployed, you can switch between maintenance and normal operations by going to the Deployment Details page and clicking “Begin Maintenance” to display the maintenance page; and click “End Maintenance” to revert back to serving the application normally. This is a small step towards providing full application lifecycle management support. We introduced the integration with developer tools last month, and we will be analyzing and figuring out the various lifecycle phases/stages that should be supported in the development and deployment of applications into the cloud.

## Clone Deployment

There are numerous reasons for duplicating environments with the same configuration, and now Cloud Foundry provides a simple way of cloning a deployment with the Clone button on the deployment details page. Creating a duplicate deployment based on an existing deployment is particularly useful when used in conjunction with the maintenance feature to upgrade an application. The Clone button is enabled when your deployment utilizes an EBS volume. You will be prompted to give the clone a name and all the configuration will be duplicated and launched in a new deployment. Once the cloned deployment is launched, you can deploy a different version of the application or a completely different application altogether by clicking on the Redeploy button in the Applications section.

![Screen shot 2009-11-18 at 2.24.05 PM](http://blog.springsource.com/wp-content/uploads/2009/11/Screen-shot-2009-11-18-at-2.24.05-PM.png "Screen shot 2009-11-18 at 2.24.05 PM")

A series of steps may be involved in upgrading an active deployment of an application:

1.  Upload a tested application to Cloud Foundry
2.  Enable the maintenance page on the current deployment
3.  Clone the deployment
4.  Run a SQL script to migrate the database schema
5.  Redeploy with the newer version of the application
6.  Reconfigure the elastic IP so that the new deployment is served from the static IP address
7.  Stop the old deployment

With the clone feature, upgrading a running application can be smooth and reliable by leveraging the existing production deployment configuration.

## Additional Metrics and Charts

In this latest release of Cloud Foundry beta, we have improved the monitoring capability by extending the number of metrics collected, as well as adding user-interface features. First of all, Hyperic SIGAR filesystem metrics have been added to provide monitoring of crucial disk usage information on the VM root disks and the database storage. These metrics are now visible in the areas of instance details. Next, the number of client requests has been added as a metric. Cloud Foundry collects this data and converts it to a rate based metric per minute, giving you a measure of usage of your application. This metric appears in the improved deployment details section as a chart with a listing of aggregate values (maximum, minimum, and average).

![Screen shot 2009-11-18 at 3.44.20 PM](http://blog.springsource.com/wp-content/uploads/2009/11/Screen-shot-2009-11-18-at-3.44.20-PM.png "Screen shot 2009-11-18 at 3.44.20 PM")

This is just the beginning of providing a dynamic monitoring display that provides useful and correlated operational metrics and data. Over time, we will be adding more metrics for performance, health, and resource consumption.