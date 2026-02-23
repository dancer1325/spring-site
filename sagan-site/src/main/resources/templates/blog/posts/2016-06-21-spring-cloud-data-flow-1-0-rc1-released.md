---
title: Spring Cloud Data Flow 1.0 RC1 released
source: https://spring.io/blog/2016/06/21/spring-cloud-data-flow-1-0-rc1-released
scraped: 2026-02-23T19:13:09.061Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  June 21, 2016 | 0 Comments
---

# Spring Cloud Data Flow 1.0 RC1 released

_Releases | Mark Pollack |  June 21, 2016 | 0 Comments_

On behalf of the team I am pleased to announce the release of Spring Cloud Data Flow 1.0 RC1.

Several exciting new features have been added in this release which carry over to the other Data Flow Server implementations that were also released today.

[Data Flow Local Server](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RC1/reference/htmlsingle/#getting-started-deploying-spring-cloud-dataflow)

[Data Flow for Cloud Foundry](https://spring.io/blog/2016/06/21/spring-cloud-data-flow-for-cloud-foundry-1-0-0-m3-released)

[Data Flow for Apache YARN](https://spring.io/blog/2016/06/21/spring-cloud-data-flow-for-apache-yarn-1-0-0-rc1-released)

[Data Flow for Kubernetes](https://spring.io/blog/2016/06/21/spring-cloud-data-flow-for-kubernetes-1-0-0-rc1-released)

[Data Flow for Apache Mesos](https://spring.io/blog/2016/06/21/spring-cloud-data-flow-for-apache-mesos-1-0-0-rc1-released)

Follow the links above for details on features unique to each individual runtime platform. The highlights of the release are:

-   [Spring Flo](https://github.com/spring-projects/spring-flo/wiki) is now an open source project and has been integrated into the Spring Cloud Data Flow dashboard allowing you to [visually design data pipelines in your browser](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RC1/reference/htmlsingle/#dashboard-flo-streams-designer).

![Data Flow Designer Screenshot](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-flo-create-stream.png)

-   [Batch and Task Events](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RC1/reference/html/spring-cloud-dataflow-task-events.html) can be used as a source in a stream definition on YARN and Kubernetes server implementations.
    
-   [Improved security](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RC1/reference/html/getting-started-security.html) by enabling HTTPS access to the server endpoints and support for basic and OAuth 2.0 authentication. The UI and shell have also been updated to support HTTPS and authentication.
    
-   The server now uses a RDBMS instead of Redis for stream/task definitions, application registration, and job repositories. Running a Redis Server is only required for analytics functionality. The default configuration uses an embedded H2 instance, but Oracle, SqlServer, MySQL/MariaDB, PostgreSQL, H2, and HSQLDB databases are supported. To use Oracle and SqlServer you will need to create your own Data Flow Server using [Spring Initializr](https://start.spring.io/) and add the appropriate JDBC driver class.
    
-   [Feature toggles](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RC1/reference/htmlsingle/#enable-disable-specific-features) to enable/disable analytics, stream, and task functionality. By default, all three are enabled using the configuration.
    
-   For all of the servers, including Data Flow Local Server, applications are no longer pre-registered. This helps decouple our out of the box applications’ releases from the Data Flow Server release lifecycle. As a convenience, a list of the latest stream applications are available via user-friendly public URLs. For example, the shell command
    
    $ dataflow:>app import --uri [http://bit.ly/stream-applications-kafka-maven](http://bit.ly/stream-applications-kafka-maven)
    
    will load the latest applications with the kafka binder and hosted via our maven repository. See the reference guide for more information on [registering groups of applications](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RC1/reference/htmlsingle/#spring-cloud-dataflow-register-apps).
    
-   To support centralized and consistent management of an application’s configuration properties, Spring Cloud Config client libraries have been included into the Spring Cloud Data Flow server as well as the Spring Cloud Stream applications provided by the [Spring Cloud Stream App Starters repository](https://github.com/spring-cloud/spring-cloud-stream-app-starters). You can also [pass common application properties](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RC1/reference/htmlsingle/#spring-cloud-dataflow-global-properties) to all streams when the Data Flow Server starts.
    
-   You can further customize our Spring Cloud Stream and Task application starters by using this version of [Spring Initializr](http://start-scs.cfapps.io/).
    
-   [Whitelisting of Spring Boot application properties](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RC1/reference/htmlsingle/#spring-cloud-dataflow-stream-app-whitelisting) gives the shell/UI information to show a preferred set of boot properties to display for code completion and application info.
    
-   Naming changes. The UI can now be found under the URL [http://localhost:9393/dashboard](http://localhost:9393/dashboard). All references to ‘module’ have now been replaced with ‘app’.
    

For the complete list of features, bug-fixes, and improvements, please refer to the [closed 1.0.0.RC GitHub issues.](https://github.com/spring-cloud/spring-cloud-dataflow/issues?q=milestone%3A1.0.0.RC1)

We welcome feedback and contributions! If you have any questions, comments or suggestions, please let us know via [GitHub Issues](https://github.com/spring-cloud/spring-cloud-dataflow/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-dataflow), or using the #SpringCloudDataFlow hashtag on Twitter.