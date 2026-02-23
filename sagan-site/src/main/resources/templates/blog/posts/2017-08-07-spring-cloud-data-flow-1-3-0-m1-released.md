---
title: Spring Cloud Data Flow 1.3.0.M1 released
source: https://spring.io/blog/2017/08/07/spring-cloud-data-flow-1-3-0-m1-released
scraped: 2026-02-23T16:21:45.612Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gunnar Hillert |  August 07, 2017 | 0 Comments
---

# Spring Cloud Data Flow 1.3.0.M1 released

_Releases | Gunnar Hillert |  August 07, 2017 | 0 Comments_

On behalf of the team, I am pleased to announce the first milestone release of Spring Cloud Data Flow 1.3.0.

Local Server: [Getting Started Guide](http://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M1/reference/htmlsingle/#getting-started).

Usability is one of the big focus for our team and in the 1.3 release-line, we are aiming to modernize the dashboard with an upgraded client-side technology stack, improved tooling, and documentation. The focus is to improve the readability, user-experience, and the overall performance.

## [](#angular-4)Angular 4

This first milestone release of Spring Cloud Data Flow contains the initial version of the new [Angular 4](https://angular.io/) based Dashboard UI. The old AngularJS 1.x based UI, particularly the tooling and secondary framework/library choices, started to show their age.

![Dashboard Screenshot](https://github.com/spring-cloud/spring-cloud-dataflow/raw/gh-pages/img/dashboard-1.3.0.M1-screenshot-1190px.png "Dashboard Screenshot")

As such we decided to modernize the entire stack and to take advantage of what Angular 4 provides. Furthermore, we are aligning the styling of the dashboard with [Pivotal UI](https://github.com/pivotal-cf/pivotal-ui).

A major improvement has been the utilization of [TypeScript](https://www.typescriptlang.org/), which is a superset of JavaScript. In conjunction with Angular 4, TypeScript is natural fit for Spring developers and reduces the friction between server-side and client-side code.

Developers familiar with Spring (Web), will appreciate TypeScript’s type support, its support for classes and interfaces, as well as Angular 4’s use of TypeScript [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) (Think annotations) and constructor-based dependency injection.

On a foundational level we use [Angular CLI](https://cli.angular.io/) to build and manage the project, which substantially minimizes infrastructure boilerplate code. In that regard, Angular CLI instills some flair of Spring Boot into your client-side development process.

## [](#better-documentation)Better Documentation

![Compodoc Screenshot](https://github.com/spring-cloud/spring-cloud-dataflow/raw/gh-pages/img/compodoc-1.3.0-1196px.png "Compodoc")

As part of the UI modernization process, we also want to provide better documentation. By the M2 release, we should have nearly 100% documentation coverage using [JSDoc](http://usejsdoc.org/). We then use [Compodoc](https://compodoc.github.io/website/) as tooling to analyze and create the final documentation. Ultimately, each CI build will generate and push the source-code documentation to:

[http://cloud.spring.io/spring-cloud-dataflow-ui/](http://cloud.spring.io/spring-cloud-dataflow-ui/)

## [](#test-coverage)Test coverage

Following in the footsteps of the other Spring Cloud projects we are using [Codecov](https://codecov.io/) to track the Spring Cloud Data Flow UI’s unit-test coverage. The link to the code coverage report can be found [here](https://codecov.io/gh/spring-cloud/spring-cloud-dataflow-ui/). The Spring Cloud Data Flow UI project’s README provides an icon showing current coverage as well as link to the current coverage report.

This is still work in progress, so expect coverage number to increase dramatically by the M2 release. Additionally, we plan on incorporating comprehensive E2E testing by the next milestone release and will also ensure that the Dashboard works across all modern browsers.

## [](#state-management)State Management

A major focus for the new Dashboard is the consistent usage of proper domain model classes. In the old UI we would basically pass-through the returned JSON data straight into the UI template code, making it tricky to maintain proper state. With a well-defined domain model and stateful services we now have much finer-grained control over the state of the application, e.g. when transitioning from paginated list to details pages and back.

## [](#cache-busting)Cache Busting

In the old Dashboard version we were relying on RequireJS for module support. That broke the production bundling of AngularJS 1.x, though, resulting in Cache Busting issues. We now use proper production bundling via Angular CLI ([Webpack](https://webpack.github.io/) underneath), which adds cache-busting hashes to the generated files.

## [](#whats-coming)What's coming?

Though we have completed the refactoring and the porting of “about”, “apps”, “runtime”, “stream”, and “task” tabs, we are very much looking for feedback. Feel free to open a GitHub issue with your findings, bugs, and feature requests. The “stream and composed-task designers”, “jobs”, and “analytics” tabs will be made available in the upcoming milestone release.

Ever wanted to edit a stream, version a stream/task data pipeline, upgrade, or rollback an app in the stream/task data pipeline? A new and flexible model to supplement the continuous delivery story in Spring Cloud Data Flow is actively under development. Stay tuned and look out for the next milestone release!

Feedback is important. Please reach out to us on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) and [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) for questions and feature requests. We also welcome contributions! Any help improving the [Spring Cloud Data Flow ecosystem](http://cloud.spring.io/spring-cloud-dataflow/#building-blocks-of-spring-cloud-data-flow) is appreciated.