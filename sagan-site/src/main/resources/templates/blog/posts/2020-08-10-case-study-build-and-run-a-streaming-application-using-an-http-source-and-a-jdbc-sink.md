---
title: Case Study: Build and Run a Streaming Application Using an HTTP Source and a JDBC Sink
source: https://spring.io/blog/2020/08/10/case-study-build-and-run-a-streaming-application-using-an-http-source-and-a-jdbc-sink
scraped: 2026-02-23T13:37:49.502Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | David Turanski |  August 10, 2020 | 4 Comments
---

# Case Study: Build and Run a Streaming Application Using an HTTP Source and a JDBC Sink

_Engineering | David Turanski |  August 10, 2020 | 4 Comments_

### [](#introduction)[](#introduction)Introduction

So far in this series we have introduced the new [stream applications based on Java functions](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0), and [function composition](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1). We have also provided detailed examples of how to build a [source from a supplier](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source) and a [sink from a consumer](https://spring.io/blog/2020/08/03/creating-a-function-for-consuming-data-and-generating-spring-cloud-stream-sink-applications). Here we continue the journey with the first of several case studies to follow. Each case study demonstrates how to use one or more of the available pre-packaged Spring Boot stream applications, in various scenarios, to build data streaming pipelines.

Today we will showcase two of the most commonly used applications, the [HTTP source](https://github.com/spring-cloud/stream-applications/tree/master/applications/source/http-source) and the [JDBC sink](https://github.com/spring-cloud/stream-applications/tree/master/applications/sink/jdbc-sink). We will use them to build a simple service that accepts HTTP POST requests and saves the contents to a database table. We will first run these as standalone [Spring Cloud Stream](https://spring.io/projects/spring-cloud-stream) applications, and then show how to orchestrate the same pipeline with [Spring Cloud Data Flow](https://dataflow.spring.io). This is presented as a step-by-step tutorial and we encourage you to follow the steps as you read.

### [](#preparing-the-environment)[](#preparing-the-environment)Preparing the Environment

This simple streaming application consists of two remote processes communicating via a message broker. The pre-packaged stream applications work with either Apache Kafka or RabbitMQ out of the box. Here we will use Apache Kafka. The JDBC sink inserts data into a database. We will use MySQL for this example.

![application schematic](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/application-schematic.png?raw=true)

Let’s assume that we are starting from scratch and do not have Kafka or MySQL available in our development environment. To run this example, we will have some fun with Docker. So we need [Docker](https://www.docker.com/products/docker-desktop) running on our local machine. Later we will be using Spring Cloud Data Flow, so we will take advantage of the Data Flow [docker-compose installation](https://dataflow.spring.io/docs/installation/local/docker/). This is the easiest way to get started with Data Flow. It starts up several containers, including MySQL and Kafka. In order to make these backend services available to the standalone applications, we need to tweak the standard installation to publish ports, and change Kafka’s advertised host name.

Note

I have run with this setup on Mac OS, and expect that a similar setup will work on Windows. Please leave a note in the comments section if you run into issues or have some helpful tips to share.

First, let’s create a directory called `http-jdbc-demo` and download `docker-compose.yml` from github to there:

```
Copywget -O docker-compose.yml https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/v2.6.0/spring-cloud-dataflow-server/docker-compose.yml
```

or

```
Copycurl https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/v2.6.0/spring-cloud-dataflow-server/docker-compose.yml -o docker-compose.yml
```

In order to enable connections to Kafka and MySQL from the local host, we will download another bit of YAML to overlay or custom configuration.

```
Copywget -O shared-kafka-mysql.yml https://raw.githubusercontent.com/spring-cloud/stream-applications/gh-pages/files/shared-kafka-mysql.yml
```

Next, we need to obtain the LAN IP address for our local machine. On a Mac, you can do this in one of several ways, for example:

```
Copydig +short $(hostname)
```

or

```
Copyping $(hostname)
```

The LAN IP address is accessible to the docker containers as well, whereas `localhost` or `127.0.0.1` from inside a container refers to itself. We need to set the environment variable `KAFKA_ADVERTISED_HOST_NAME` to this value. We also need to set a few other environment variables:

```
Copyexport KAFKA_ADVERTISED_HOST_NAME=$(dig +short $(hostname))
export DATAFLOW_VERSION=2.6.0
export SKIPPER_VERSION=2.5.0
```

and to register the latest stream applications in Data Flow:

```
Copyexport STREAM_APPS_URI=https://repo.spring.io/libs-snapshot-local/org/springframework/cloud/stream/app/stream-applications-descriptor/2020.0.0-SNAPSHOT/stream-applications-descriptor-2020.0.0-SNAPSHOT.stream-apps-kafka-maven
```

Now, from our project directory, we can fire up the Data Flow cluster:

```
Copydocker-compose -f docker-compose.yml -f shared-kafka-mysql.yml up
```

This will display a lot of log messages and continue running until you terminate it (e.g., Ctrl-C), which will stop all of the containers. Keep this terminal open.

Open a new terminal and type:

```
Copydocker ps
```

This will list the running containers for the Data Flow cluster. We will look at Data Flow later. At this point, make sure that the `dataflow-kafka` container shows `0.0.0.0:9092→9092/tcp` under `PORTS`, and that `dataflow-mysql` similarly shows `0.0.0.0:3306→3306/tcp`.

![docker ps](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/docker-ps.png?raw=true)

### [](#create-a-database-table)[](#create-a-database-table)Create a database table

We could configure the JDBC sink application to initialize the database automatically, but for simplicity we will create it manually. We can do this using any JDBC database tool or by running `mysql` from within the `dataflow-mysql` container:

```
Copydocker exec -it dataflow-mysql mysql -uroot -p
```

You will be prompted for a password. The DB credentials are configured in [docker-compose.yml](https://github.com/spring-cloud/spring-cloud-dataflow/blob/master/spring-cloud-dataflow-server/docker-compose.yml#L22). If you don’t want to look there, the username is `root` and the password is `rootpw`.

Enter the following commands - you should be able to copy and paste the whole thing - to create a database and a table.

```
CopyCREATE DATABASE IF NOT EXISTS Demo;
USE Demo;
CREATE TABLE IF NOT EXISTS People (
	 id INT NOT NULL AUTO_INCREMENT,
	 name VARCHAR(255) NOT NULL,
	 street VARCHAR(255) NOT NULL,
	 city VARCHAR(255) NOT NULL,
	 PRIMARY KEY (id));
```

Type `exit;` to exit.

![create database](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/create-database.png?raw=true)

### [](#run-the-applications)[](#run-the-applications)Run the applications

At this point we’re ready to run the HTTP source and JDBC sink. The Spring Boot executable jars are published to the Spring Maven repository. We need ones which are built with the Kafka binder:

```
Copywget https://repo.spring.io/snapshot/org/springframework/cloud/stream/app/http-source-kafka/3.0.0-SNAPSHOT/http-source-kafka-3.0.0-SNAPSHOT.jar

wget https://repo.spring.io/snapshot/org/springframework/cloud/stream/app/jdbc-sink-kafka/3.0.0-SNAPSHOT/jdbc-sink-kafka-3.0.0-SNAPSHOT.jar
```

We will run these in separate terminal sessions. We need to configure these apps to use the same Kafka topic, let’s call it `jdbc-demo-topic`. The Spring Cloud Stream Kafka binder will create this topic automatically. We also need to configure the JDBC sink to connect to our database and to map the data to the table we created. We will post JSON that looks like this:

```
Copy{
 “name”:”My Name”,
 “address”: {
      “street”:”My Street”,
       “city”: “My City”
    }
}
```

We want to insert these values into the `People` table in the `Demo` database into the columns `name`, `street`, and `city`.

#### [](#start-the-jdbc-sink)[](#start-the-jdbc-sink)Start the JDBC Sink

Open a new terminal session where we downloaded the jars and run:

```
Copyjava -jar jdbc-sink-kafka-3.0.0-SNAPSHOT.jar --spring.datasource.url=jdbc:mariadb://localhost:3306/Demo --spring.datasource.username=root --spring.datasource.password=rootpw --jdbc.consumer.table-name=People --jdbc.consumer.columns=name,city:address.city,street:address.street --spring.cloud.stream.bindings.input.destination=jdbc-demo-topic
```

Note the `jdbc.consumer.columns` syntax for mapping the fields to the columns.

#### [](#start-the-http-source)[](#start-the-http-source)Start the HTTP Source

Open a new terminal session where we downloaded the jars and run:

```
Copyjava -jar http-source-kafka-3.0.0-SNAPSHOT.jar --server.port=9000 --spring.cloud.stream.bindings.output.destination=jdbc-demo-topic
```

Here we are setting the HTTP port to 9000 for the source (it’s 8080 by default). Also, it is very important that the output destination of the source matches the input destination of the sink.

#### [](#post-some-data)[](#post-some-data)Post some data

Next, we need to post some data to [http://localhost:9000](http://localhost:9000).

```
Copycurl http://localhost:9000 -H'Content-Type:application/json' -d '{"name":"My Name","address":{"street":"My Street","city":"My City"}}}
```

#### [](#verify-the-data-has-been-saved)[](#verify-the-data-has-been-saved)Verify the data has been saved

Once again, find an open terminal session and:

```
Copydocker exec -it dataflow-mysql mysql -uroot -p
```

Login with `rootpw` and query the table:

![query standalone](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/query-standalone.png?raw=true)

If you see this, congratulations! The standalone Spring Cloud Stream applications are working as expected. We can terminate our standalone applications (Ctrl-C) now. Leave the docker-compose process running so we can take a look at Data Flow.

### [](#using-spring-cloud-data-flow)[](#using-spring-cloud-data-flow)Using Spring Cloud Data Flow

As we can see, there are a lot of manual steps required to run these applications on “bare metal”, even though we didn’t have to write any code. These include:

-   customizing the docker-compose configuration, or alternately installing kafka and mysql on the local machine
    
-   downloading the desired versions of stream applications using a Maven URL (we just happened to know which ones to use here)
    
-   ensuring that the Spring Cloud Stream destination bindings are correctly configured so the applications can communicate
    
-   finding and reading the [docs](https://github.com/spring-cloud/stream-applications/blob/master/applications/sink/jdbc-sink/README.adoc) to get the configuration properties (we already did that to prepare this example ) and setting them correctly.
    
-   managing multiple terminal sessions
    

In the following sections we will see that doing this with [Spring Cloud Data Flow](https://dataflow.spring.io) eliminates all of these steps and provides a much richer development experience overall.

#### [](#open-the-data-flow-dashboard)[](#open-the-data-flow-dashboard)Open the Data Flow dashboard

To get started, open the Data Flow Dashboard at [http://localhost:9393/dashboard](http://localhost:9393/dashboard). This will take you to the Applications view where we see the pre-packaged applications registered. The docker-compose command we ran earlier performed this step, using a URL we provided to get the latest snapshot versions of the stream applications, including the same jar files we just ran.

![datflow ui applications](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/datflow-ui-applications.png?raw=true)

#### [](#create-and-deploy-a-stream)[](#create-and-deploy-a-stream)Create and deploy a stream

In the dashboard, choose `Streams` from the left menu and click on `Create Streams` to open a graphical stream editor.

![dataflow create stream](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/dataflow-create-stream.png?raw=true)

Drag and drop the http source and the jdbc sink into the editor pane and use the mouse to connect the two handles. Alternatively, you can type the Data Flow stream definition DSL directly into the text box at the top: `http | jdbc`.

Next we need to configure the applications. If you click on either one of the applications, you will see an `Options` link. Open the options window for the JDBC sink. You will see all the available configuration properties listed with short descriptions. The following screenshot shows a partial view; we need to scroll to see the rest.

![datflow ui jdbc options](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/datflow-ui-jdbc-options.png?raw=true)

Just as before, we need to provide the url, username, password, table, and columns. Here, we need to change the JDBC URL to `jdbc:mariadb://mysql:3306/Demo`,since the hostname `mysql` corresponds to the name of the mysql service defined in `docker-compose.yml`. Also we set the http port to `20000`, since it’s in the configured range of published ports. Refer to the [skipper-server configuration](https://github.com/spring-cloud/spring-cloud-dataflow/blob/master/spring-cloud-dataflow-server/docker-compose.yml#L82) for more details.

!\[\]\]([https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/datflow-ui-stream-configured.png?raw=true](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/datflow-ui-stream-configured.png?raw=true))

Let’s take a look at the stream definition DSL that was generated automatically:

```
Copyhttp --port=20000 | jdbc --password=rootpw --username=root --url=jdbc:mariadb://mysql:3306/Demo --columns=name,city:address.city,street:address.street --table-name=People
```

This DSL can be used in a script or a Data Flow client application to automate stream creation. Our configuration is complete, but where are the Spring Cloud Stream destination bindings? We don’t need them because Data Flow takes care of the wiring for us.

Select the `Create Stream` button and name the stream `http-jdbc`.

![dataflow ui deploy 1](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/dataflow-ui-deploy-1.png?raw=true)

To deploy the stream, click on the play button:

![play button](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/play-button.png?raw=true)

Accept the default deployment properties and click `Deploy stream` at the bottom of the page.

Click on the `Refresh` button as necessary. After a minute or so, you should see our stream is deployed.

![dataflow ui deploy 2](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/dataflow-ui-deploy-2.png?raw=true)

#### [](#post-some-data-and-verify-that-it-has-been-saved)[](#post-some-data-and-verify-that-it-has-been-saved)Post some data and verify that it has been saved

Here we will post some different values to port 20000:

```
Copycurl http://localhost:20000 -H'Content-Type:application/json' -d '{"name":"Your Name","address":{"street":"Your Street","city":"Your City"}}}'
```

When we run the query again, we should see a new row added to the table.

![query dataflow](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/query-dataflow.png?raw=true)

Nice work!

#### [](#data-flow-application-deployment)[](#data-flow-application-deployment)Data Flow Application Deployment

The astute reader will notice that no Docker containers were created for the deployed applications, even though the platform itself is running in containers. In the Data Flow [architecture](https://dataflow.spring.io/docs/concepts/architecture/), the Skipper server is responsible for deploying stream applications. In the local configuration, Skipper uses the Local Deployer to run jar files on its `localhost`, just like we did when we ran the applications standalone. To see that this is the case, we can run `ps` in the skipper container:

```
Copydocker exec -it skipper ps -ef
```

![docker exec ps](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/docker-exec-ps.png?raw=true)

To look at the console log use the `stdout` path:

```
Copydocker exec -it skipper more /tmp/1596916545104/http-jdbc.jdbc-v4/stdout_0.log
```

The `tail -f` command also works.

The application logs are also viewable from the UI if the deployment is successful.

![dataflow ui app log](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/http-jdbc/dataflow-ui-app-log.png?raw=true)

But if the deployment fails, we may need to look under the hood to troubleshoot it.

Note

The local Data Flow installation is fine for local development and exploration, but we do not recommend it for production. Production grade [Spring Cloud Data Flow OSS](https://spring.io/projects/spring-cloud-dataflow) , as well as commercially licensed products, are available for [Kubernetes](https://tanzu.vmware.com/content/blog/announcing-spring-cloud-data-flow-for-kubernetes) and [Cloud Foundry](https://docs.pivotal.io/scdf/1-6/index.html).

### [](#summary)[](#summary)Summary

We just took a close look at how to build a simple data streaming pipeline from pre-packaged Spring Cloud Stream applications to save JSON content posted via HTTP to a relational database. We used Docker and docker-compose to install a local environment and then we deployed the source and sink applications, first on “bare metal”, and then using Spring Cloud Data Flow. Hopefully, we learned something interesting about working with Spring Cloud Stream, Data Flow, Docker containers, the HTTP source, and JDBC sink.

#### [](#stay-tuned)[](#stay-tuned)Stay Tuned…​

In the coming weeks we will present many more case studies for Spring Cloud Stream and Spring Cloud Data Flow, each will explore different stream applications and capabilities.