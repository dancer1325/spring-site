---
title: Apache Ambari meets Spring XD
source: https://spring.io/blog/2015/06/02/apache-ambari-meets-spring-xd
scraped: 2026-02-23T19:50:39.419Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Janne Valkealahti |  June 02, 2015 | 0 Comments
---

# Apache Ambari meets Spring XD

_Engineering | Janne Valkealahti |  June 02, 2015 | 0 Comments_

We’re pleased to announce the first version of the [Apache Ambari](https://ambari.apache.org/) plugin for [Spring XD](https://projects.spring.io/spring-xd/).

Ambari is a cluster provisioning tool to install and manage various Apache projects like HDFS, YARN, Zookeeper or Kafka. Ambari has a concept of a stack definition which is used by both Pivotal and Hortonworks. The stack definition is usually made up of components supported by the maintainer.

This Ambari integration adds support for provisioning Spring XD with [Pivotal HD 3.0](http://pivotal.io/big-data/pivotal-hd) and [Hortonworks HDP 2.2](http://hortonworks.com/hdp/).

Spring XD is not part of the main Ambari distribution for PHD or HDP. However, it is easy to extend an existing Ambari installation via a simple RPM installation which modifies existing stack definitions.

We've prepared [installation instructions](https://github.com/spring-projects/spring-xd-ambari/blob/master/src/docs/asciidoc/InstallingXDwithAmbari.asciidoc) in our repo [Github spring-xd-ambari](https://github.com/spring-projects/spring-xd-ambari) together with the source code for this plugin.

Spring XD on Pivotal HD 3.0 with external Redis as a message bus: ![PIC PHD](https://raw.githubusercontent.com/spring-projects/spring-xd-ambari/master/src/docs/asciidoc/images/xdphd.png)

Spring XD on Hortonworks HDP 2.2 with Ambari hosted Kafka as a message bus: ![PIC HDP](https://raw.githubusercontent.com/spring-projects/spring-xd-ambari/master/src/docs/asciidoc/images/xdhdp.png)

After cluster provisioning has been completed successfully, it is easy to connect to a running Spring XD cluster from the XD shell. A command script `/etc/springxd/conf/xd-shell.init` is created automatically with correct settings that you can load into the XD shell.

```text
Copy$ export JAVA_HOME=/usr/jdk64/jdk1.7.0_67
$ xd-shell
server-unknown:>script --file /etc/springxd/conf/xd-shell.init
admin config server http://ambari-2.localdomain:9393
Successfully targeted http://ambari-2.localdomain:9393
hadoop config fs --namenode hdfs://ambari-2.localdomain:8020
Script required 0.625 seconds to execute

xd:>runtime containers
  Container Id                          Host                  IP Address      PID    Groups  Custom Attributes
  ------------------------------------  --------------------  --------------  -----  ------  -----------------
  44c34156-8b8a-4ada-ad46-e5d955b6f995  ambari-6.localdomain  172.16.101.146  6327
  d8273536-c688-4fdd-b370-6bc0f68bdc25  ambari-5.localdomain  172.16.101.145  31199

xd:>hadoop fs ls /
Found 9 items
drwxrwxrwx   - yarn      hadoop           0 2015-06-01 04:55 /app-logs
drwxr-xr-x   - gpadmin   gpadmin          0 2015-06-01 04:52 /hawq_data
drwxr-xr-x   - mapred    hdfs             0 2015-06-01 04:50 /mapred
drwxr-xr-x   - hdfs      hdfs             0 2015-06-01 04:50 /mr-history
drwxr-xr-x   - hdfs      hdfs             0 2015-06-01 04:51 /phd
drwxr-xr-x   - hdfs      hdfs             0 2015-06-01 04:52 /system
drwxrwxrwx   - hdfs      hdfs             0 2015-06-01 04:53 /tmp
drwxr-xr-x   - hdfs      hdfs             0 2015-06-01 04:53 /user
drwxrwxrwx   - spring-xd hdfs             0 2015-06-01 07:29 /xd
```

Writing into HDFS works out of the box.

```text
Copyxd:>stream create --name hdfstest --definition "time|hdfs" --deploy
xd:>stream destroy --name hdfstest

xd:>hadoop fs ls --recursive true --dir /xd
drwxrwxrwx   - spring-xd hdfs          0 2015-06-01 07:29 /xd/hdfstest
-rw-r--r--   3 spring-xd hdfs        680 2015-06-01 07:29 /xd/hdfstest/hdfstest-0.txt
```

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). Super Early Bird Price expires June 12th! It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.

#Discounts

-   The Super Early Bird price tier ($300 discount) expires June 12th. The Early Bird price tier (June 13th - August 14th) is discounted $150.
-   Register 4 and get the 5th pass free. Contact us with the names of your first 4 registrants for your complimentary pass code (conference admission only).
-   Alumni, contact us for your discount code ($150 off any option).