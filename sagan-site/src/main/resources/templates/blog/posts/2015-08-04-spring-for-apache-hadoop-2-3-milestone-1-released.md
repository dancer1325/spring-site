---
title: Spring for Apache Hadoop 2.3 Milestone 1 released
source: https://spring.io/blog/2015/08/04/spring-for-apache-hadoop-2-3-milestone-1-released
scraped: 2026-02-23T19:45:31.198Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  August 04, 2015 | 0 Comments
---

# Spring for Apache Hadoop 2.3 Milestone 1 released

_Releases | Thomas Risberg |  August 04, 2015 | 0 Comments_

We are pleased to announce the Spring for Apache Hadoop 2.3 M1 milestone release.

The most important enhancements in the Spring for Apache Hadoop 2.3 M1 version:

-   Add Hadoop 2.7.1 as the default release
-   Add support for HDP 2.3 and CDH 5.4.4
-   Bug fixes: Fix for append reopen may fail [SHDP-510](https://jira.spring.io/browse/SHDP-510)
-   Better boot support: Support boot config props metadata [SHDP-452](https://jira.spring.io/browse/SHDP-452)
-   Add support for Hive 1.x and HiveServer2

See the release [changelog](http://docs.spring.io/spring-hadoop/docs/2.3.0.M1/changelog.txt) for details.

To be able to use Hive 1.x which dropped support for HiveServer1 and the corresponding Thrift client we had to rewrite the Hive support in Spring for Apache Hadoop. We now support HiveServer2 using the JDBC client and for the most common uses you only need to change the client configuration to use a hiveDataSource. Here is an example:

```xml
Copy<hive-client-factory id="hiveClientFactory" hive-data-source-ref="hiveDataSource"/>
<beans:bean id="hiveDriver" class="org.apache.hive.jdbc.HiveDriver"/>
<beans:bean id="hiveDataSource" class="org.springframework.jdbc.datasource.SimpleDriverDataSource">
	<beans:constructor-arg name="driver" ref="hiveDriver"/>
	<beans:constructor-arg name="url" value="jdbc:hive2://localhost:10000"/>
</beans:bean>
```

If you used the `org.apache.hadoop.hive.service.HiveClient` directly in your code you need to switch to use the new `org.springframework.data.hadoop.hive.HiveClient` which mimics the old Thrift based client but uses the JDBC driver to communicate with the HiveServer2.

The changes that we made to the Spring for Apache Hadoop [Hive example](https://github.com/spring-projects/spring-hadoop-samples/tree/master/hive) code can be seen in this [commit](https://github.com/spring-projects/spring-hadoop-samples/commit/b1569e5f9f1fdfde9530e44bf0b32c0d1d3798d1).

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.3.0.M1 (default - Apache Hadoop stable 2.7.1)
-   2.3.0.M1-hadoop26 (Apache Hadoop 2.6.0)
-   2.3.0.M1-phd30 (Pivotal HD 3.0)
-   2.3.0.M1-cdh5 (Cloudera CDH 5.4)
-   2.3.0.M1-hdp23 (Hortonworks HDP 2.3)

Please provide feedback so we can prioritize the work on new features scheduled for 2.3 (see previous [blog post](https://spring.io/blog/2015/05/21/spring-for-apache-hadoop-2-2-rc1-released) for a list) and any additional feature requests. You can use JIRA issues or GitHub issues (see project page for links).

The project page is at - [http://projects.spring.io/spring-hadoop/](http://projects.spring.io/spring-hadoop/)