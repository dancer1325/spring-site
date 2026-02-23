---
title: Spring Batch on Kubernetes: Efficient batch processing at scale
source: https://spring.io/blog/2021/01/27/spring-batch-on-kubernetes-efficient-batch-processing-at-scale
scraped: 2026-02-23T13:33:17.962Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mahmoud Ben Hassine |  January 28, 2021 | 32 Comments
---

# Spring Batch on Kubernetes: Efficient batch processing at scale

_Engineering | Mahmoud Ben Hassine |  January 28, 2021 | 32 Comments_

## [](#introduction)Introduction

Batch processing has been a challenging area of computer science since its inception in the early days of punch cards and magnetic tapes. Nowadays, the modern cloud computing era comes with a whole new set of challenges for how to develop and operate batch workload efficiently in a cloud environment. In this blog post, I introduce some of the challenges a batch developer or architect may face when designing and running batch applications at scale and show how Spring Batch, Spring Boot and Kubernetes can tremendously simplify this task.

## [](#challenges-of-designing-and-running-batch-workloads-in-the-cloud)Challenges of Designing and Running Batch Workloads in the Cloud

Designing cloud-native batch applications might seem easy compared to web applications, but this is not true. Batch developers face many challenges.

#### [](#1-fault-tolerance)1\. Fault Tolerance

Batch processes typically interact with other services (such as databases, messages brokers, web services, and others) which are, by nature, flaky in cloud environments. Moreover, even the nodes on which those processes are run can die at any time and be replaced with healthy nodes. Cloud native batch applications should be designed in a fault-tolerant way.

#### [](#2-robustness)2\. Robustness

It is not uncommon that the human error of running a batch job twice has some big financial consequences (such as what happened to [Walgreens](https://www.deseret.com/2000/8/29/19526136/oops-walgreen-accidentally-bills-credit-card-customers-twice), [ANZ Bank](https://www.smh.com.au/national/anzs-45m-bank-bungle-20060519-gdnksi.html), and [NatWest](https://www.computerweekly.com/news/2240042675/NatWest-in-double-debit-error), to name a few). Moreover, some platforms, such as Kubernetes, have some known limitations about the eventuality of [running the same job twice](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#cron-job-limitations). A cloud native batch application should be ready to deal with this kind of issues by design.

#### [](#3-cost-efficiency)3\. Cost Efficiency

Cloud infrastructures are billed by cpu/memory/bandwidth usage. In case of failure, It would be inefficient to not be able to restart a job from where it left off and "lose" the cpu/memory/bandwidth usage of the previous run (and hence be billed twice or more!).

#### [](#4-observability)4\. Observability

Any modern batch architecture should be able to know at any point in time some key metrics, including:

-   What jobs are currently running?
-   Which jobs have failed, if any?
-   Other questions about how things are going.

Being able to have these KPIs at a glance on a dashboard is vital for efficient operations.

#### [](#5-scalability)5\. Scalability

We are dealing with an unprecedented amounts of data, which is impossible to handle on a single machine any more. Correctly processing large volumes of distributed data is probably the most challenging point. Cloud-native batch applications should be scalable by design.

All these aspects should be taken into consideration when designing and developing cloud-native batch applications. This is a considerable amount of work on the developer's side. Spring Batch takes care of most of these issues. I explain the details in the next section.

## [](#how-does-spring-batch-make-a-batch-developers-life-easier)How does Spring Batch Make a Batch Developer's Life easier?

Spring Batch is the de facto batch processing framework on the JVM. Entire books have been written on the rich feature set provided by Spring Batch, but I would like to highlight the most relevant features that address the previously mentioned challenges in the context of cloud-native development:

#### [](#1-fault-tolerance-1)1\. Fault Tolerance

Spring Batch provides fault-tolerance features, such as transaction management and skip and retry mechanisms, which are useful when batch jobs interact with flaky services in a cloud environment.

#### [](#2-robustness-1)2\. Robustness

Spring Batch uses a centralized transactional job repository, which prevents duplicate job executions. By design, human errors and platform limitations that may lead to running the same job twice are impossible.

#### [](#3-cost-efficiency-1)3\. Cost Efficiency

Spring Batch jobs maintain their state in an external database, which makes it possible to restart failed jobs where they left off. This is cost effective, compared to other solutions that would redo the work from the beginning and, hence, would be billed twice or more!

#### [](#4-observability-1)4\. Observability

Spring Batch provides integration with [Micrometer](https://micrometer.io), which is key in terms of observability. A Spring Batch-based batch infrastructure provides key metrics, such as the currently active jobs, read/write rates, failed jobs, and others. It can even be extended with custom metrics.

#### [](#5-scalability-1)5\. Scalability

As already mentioned, Spring Batch jobs maintain their state in an external database. As a result, they are stateless processes from the [12 factors](https://12factor.net) methodology point of view. This stateless nature makes them suitable to be containerized and executed in cloud environments in a scalable way. Moreover, Spring Batch provides several vertical and horizontal scaling techniques, such as multi-threaded steps and remote partitioning/chunking of data, to scale batch jobs in an efficient way.

Spring Batch provides other features, but the ones mentioned above are very helpful when designing and developing cloud-native batch processes.

## [](#how-does-kubernetes-make-the-batch-operators-life-easier)How Does Kubernetes Make the Batch Operator's Life Easier?

Kubernetes is the de facto container orchestration platform for the cloud. Operating a batch infrastructure at scale is far from being a trivial task, and Kubernetes really is a game changer in this space. Before the cloud era, in one of my previous jobs, I played the role of a batch operator and I had to manage a cluster of 4 machines dedicated to batch jobs. Here are some of the tasks I had to either do manually or find a way to automate with (bash!) scripts:

-   ssh into each machine to check which jobs are currently running
-   ssh into each machine to collect the logs of failed jobs
-   ssh into each machine to upgrade job versions or update their configuration
-   ssh into each machine to kill hanging jobs and restart them
-   ssh into each machine to edit/update the crontab file for job scheduling
-   Many other similar tasks..

All these tasks are obviously inefficient and error prone, leaving four dedicated machines under-utilized due to poor resource management. If you are still doing such tasks in 2021 (either manually or via scripts), I believe it's a good time to think about migrating your batch infrastructure to Kubernetes. The reason is that Kubernetes lets you do all these tasks with a **single** command against the **entire** cluster, and this is a **huge** difference from an operational point of view. Moving to Kubernetes lets you:

-   Ask the entire cluster about currently running jobs with a single command
-   Submit/schedule jobs without having to know on which node they will run
-   Update job definitions transparently
-   Automatically run jobs to completion (a Kubernetes job creates one or more pods and ensures that a specified number of them terminate successfully)
-   Optimize the usage of cluster's resources (Kubernetes plays Tetris with the cluster's machines) and hence optimize the bills!
-   Use many other interesting features

## [](#spring-batch-on-kubernetes-a-perfect-match-in-action)Spring Batch on Kubernetes: a perfect match, in action

In this section, I take the same job developed in Spring Batch's [getting started guide](https://spring.io/guides/gs/batch-processing) (which is a data ingestion job that loads some person data from a CSV file into a relational database table), containerize it, and deploy it on Kubernetes. If you want to go a step further by wrapping this job in a Spring Cloud Task and deploying it in a Spring Cloud Data Flow server, see [Deploy a Spring Batch application by Using Data Flow](https://dataflow.spring.io/docs/batch-developer-guides/batch/data-flow-spring-batch).

### [](#1-set-up-a-database-server)1\. Set up a Database Server

I use a MySQL database to store Spring Batch metadata. The database lives outside the Kubernetes cluster, and this is on purpose. The reason is to mimic a realistic migration path, where only stateless workloads are migrated to Kubernetes in a first step. For many companies, migrating databases to Kubernetes is not an option yet (and this is a reasonable decision). To start the database server, run the following commands:

```
Copy$ git clone git@github.com:benas/spring-batch-lab.git
$ cd blog/spring-batch-kubernetes
$ docker-compose -f src/docker/docker-compose.yml up
```

This will create a MySQL container pre-populated with [Spring Batch's technical tables](https://github.com/spring-projects/spring-batch/blob/master/spring-batch-core/src/main/resources/org/springframework/batch/core/schema-mysql.sql) as well as the [business table, `PEOPLE`](https://github.com/spring-guides/gs-batch-processing/blob/master/initial/src/main/resources/schema-all.sql). We can check this, as follows:

```
Copy$ docker exec -it mysql bash
root@0a6596feb06d:/# mysql -u root test -p # the root password is "root"
Enter password:
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.21 MySQL Community Server - GPL

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
mysql> show tables;
+------------------------------+
| Tables_in_test               |
+------------------------------+
| BATCH_JOB_EXECUTION          |
| BATCH_JOB_EXECUTION_CONTEXT  |
| BATCH_JOB_EXECUTION_PARAMS   |
| BATCH_JOB_EXECUTION_SEQ      |
| BATCH_JOB_INSTANCE           |
| BATCH_JOB_SEQ                |
| BATCH_STEP_EXECUTION         |
| BATCH_STEP_EXECUTION_CONTEXT |
| BATCH_STEP_EXECUTION_SEQ     |
| PEOPLE                       |
+------------------------------+
10 rows in set (0.01 sec)

mysql> select * from PEOPLE;
Empty set (0.00 sec)
```

### [](#2-create-a-bootiful-containerized-spring-batch-job)2\. Create a Bootiful, Containerized Spring Batch Job

Go to [start.spring.io](https://start.spring.io) and generate a project with the following dependencies: Spring Batch and the MySQL driver. You can use this [link](https://start.spring.io/#!type=maven-project&language=java&platformVersion=2.4.1.RELEASE&packaging=jar&jvmVersion=1.8&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=batch,mysql) to create the project. After unzipping the project and loading it in your favorite IDE, you can change the main class, as follows:

```
Copypackage com.example.demo;

import java.net.MalformedURLException;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

@SpringBootApplication
@EnableBatchProcessing
public class DemoApplication {

	public static void main(String[] args) {
		System.exit(SpringApplication.exit(
			SpringApplication.run(DemoApplication.class, args)));
	}

	@Bean
	@StepScope
	public Resource resource(@Value("#{jobParameters['fileName']}") String fileName) throws MalformedURLException {
		return new UrlResource(fileName);
	}

	@Bean
	public FlatFileItemReader<Person> itemReader(Resource resource)  {
		return new FlatFileItemReaderBuilder<Person>()
				.name("personItemReader")
				.resource(resource)
				.delimited()
				.names("firstName", "lastName")
				.targetType(Person.class)
				.build();
	}

	@Bean
	public JdbcBatchItemWriter<Person> itemWriter(DataSource dataSource) {
		return new JdbcBatchItemWriterBuilder<Person>()
				.dataSource(dataSource)
				.sql("INSERT INTO PEOPLE (FIRST_NAME, LAST_NAME) VALUES (:firstName, :lastName)")
				.beanMapped()
				.build();
	}

	@Bean
	public Job job(JobBuilderFactory jobs, StepBuilderFactory steps,
				   DataSource dataSource, Resource resource) {
		return jobs.get("job")
				.start(steps.get("step")
						.<Person, Person>chunk(3)
						.reader(itemReader(resource))
						.writer(itemWriter(dataSource))
						.build())
				.build();
	}

	public static class Person {
		private String firstName;
		private String lastName;
                // default constructor + getters/setters omitted for brevity
	}

}
```

The `@EnableBatchProcessing` annotation sets up all the infrastructure beans required by Spring Batch (job repository, job launcher, and others) as well as some utilities, such as `JobBuilderFactory` and `StepBuilderFactory` to facilitate the creation of steps and jobs. In the snippet above, I used those utilities to create a job with a single chunk-oriented step, defined as follows:

-   An item reader that reads data from a `UrlResource`. In some cloud environments, file systems are read-only or do not even exist, so the ability to stream data without downloading it is almost an essential requirement. Fortunately, Spring Batch has you covered! All file-based item readers (for flat files, XML files, and JSON files) work against the powerful Spring Framework `Resource` abstraction, so any implementation of `Resource` should work. In this example, I use a `UrlResource` to read data directly from the [remote URL of sample-data.csv](https://raw.githubusercontent.com/spring-guides/gs-batch-processing/master/initial/src/main/resources/sample-data.csv) at GitHub without downloading it. The file name is passed in as a job parameter.
-   An item writer that writes `Person` items to the `PEOPLE` table in MySQL.

That's it. Let's package the job and create a docker image for it by using Spring Boot's maven plugin:

```
Copy$ mvn package
...
$ mvn spring-boot:build-image -Dspring-boot.build-image.imageName=benas/bootiful-job
[INFO] Scanning for projects...
[INFO]
…
[INFO] --- spring-boot-maven-plugin:2.4.1:build-image (default-cli) @ demo ---
[INFO] Building image 'docker.io/benas/bootiful-job:latest'
…
[INFO] Successfully built image 'docker.io/benas/bootiful-job:latest'
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
```

The image should now be correctly built, but let's check that:

```
Copy$ docker images
REPOSITORY             TAG           IMAGE ID               CREATED             SIZE
benas/bootiful-job     latest        52244b284f08    41 seconds ago   242MB
```

Note how Spring Boot created a Docker image without the need to create a Dockerfile! A complete blog post has been written about this awesome feature by the awesome Josh Long: [YMNNALFT: Easy Docker Image Creation with the Spring Boot Maven Plugin and Buildpacks](https://spring.io/blog/2021/01/04/ymnnalft-easy-docker-image-creation-with-the-spring-boot-maven-plugin-and-buildpacks). Now let's run this job in a Docker container to check that everything is working as expected:

```
Copy$ docker run \
   -e SPRING_DATASOURCE_URL=jdbc:mysql://192.168.1.53:3306/test \
   -e SPRING_DATASOURCE_USERNAME=root \
   -e SPRING_DATASOURCE_PASSWORD=root \
   -e SPRING_DATASOURCE_DRIVER-CLASS-NAME=com.mysql.cj.jdbc.Driver \
   benas/bootiful-job \
   fileName=https://raw.githubusercontent.com/benas/spring-batch-lab/master/blog/spring-batch-kubernetes/data/sample1.csv
```

You should see something like:

```
Copy  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.4.1)

2021-01-08 17:03:15.009  INFO 1 --- [           main] com.example.demo.DemoApplication         : Starting DemoApplication v0.0.1-SNAPSHOT using Java 1.8.0_275 on 876da4a1cfe0 with PID 1 (/workspace/BOOT-INF/classes started by cnb in /workspace)
2021-01-08 17:03:15.012  INFO 1 --- [           main] com.example.demo.DemoApplication         : No active profile set, falling back to default profiles: default
2021-01-08 17:03:15.899  INFO 1 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2021-01-08 17:03:16.085  INFO 1 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2021-01-08 17:03:16.139  INFO 1 --- [           main] o.s.b.c.r.s.JobRepositoryFactoryBean     : No database type set, using meta data indicating: MYSQL
2021-01-08 17:03:16.292  INFO 1 --- [           main] o.s.b.c.l.support.SimpleJobLauncher      : No TaskExecutor has been set, defaulting to synchronous executor.
2021-01-08 17:03:16.411  INFO 1 --- [           main] com.example.demo.DemoApplication         : Started DemoApplication in 1.754 seconds (JVM running for 2.383)
2021-01-08 17:03:16.414  INFO 1 --- [           main] o.s.b.a.b.JobLauncherApplicationRunner   : Running default command line with: [fileName=https://raw.githubusercontent.com/benas/spring-batch-lab/master/blog/spring-batch-kubernetes/data/sample1.csv]
2021-01-08 17:03:16.536  INFO 1 --- [           main] o.s.b.c.l.support.SimpleJobLauncher      : Job: [SimpleJob: [name=job]] launched with the following parameters: [{fileName=https://raw.githubusercontent.com/benas/spring-batch-lab/master/blog/spring-batch-kubernetes/data/sample1.csv}]
2021-01-08 17:03:16.596  INFO 1 --- [           main] o.s.batch.core.job.SimpleStepHandler     : Executing step: [step]
2021-01-08 17:03:17.481  INFO 1 --- [           main] o.s.batch.core.step.AbstractStep         : Step: [step] executed in 884ms
2021-01-08 17:03:17.501  INFO 1 --- [           main] o.s.b.c.l.support.SimpleJobLauncher      : Job: [SimpleJob: [name=job]] completed with the following parameters: [{fileName=https://raw.githubusercontent.com/benas/spring-batch-lab/master/blog/spring-batch-kubernetes/data/sample1.csv}] and the following status: [COMPLETED] in 934ms
2021-01-08 17:03:17.513  INFO 1 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2021-01-08 17:03:17.534  INFO 1 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.
```

The job is now completed, and we can check that data has been successfully loaded in the database:

```
Copymysql> select * from PEOPLE;
+----+------------+-----------+
| ID | FIRST_NAME | LAST_NAME |
+----+------------+-----------+
|  1 | Jill       | Doe       |
|  2 | Joe        | Doe       |
|  3 | Justin     | Doe       |
|  4 | Jane       | Doe       |
|  5 | John       | Doe       |
+----+------------+-----------+
5 rows in set (0.00 sec)

```

That's it! Now let's deploy this job on Kubernetes. However, before moving on and deploying this job on Kubernetes, I want to show two things:

#### [](#preventing-duplicate-job-executions-of-the-same-job-instance)Preventing Duplicate Job Executions of the Same Job Instance

If you want to see how Spring Batch prevents duplicate job executions, you can try to re-run the job with the same command. The application should fail to start with the following error:

```
Copy2021-01-08 20:21:20.752 ERROR 1 --- [           main] o.s.boot.SpringApplication               : Application run failed

java.lang.IllegalStateException: Failed to execute ApplicationRunner
	at org.springframework.boot.SpringApplication.callRunner(SpringApplication.java:798) [spring-boot-2.4.1.jar:2.4.1]
	at org.springframework.boot.SpringApplication.callRunners(SpringApplication.java:785) [spring-boot-2.4.1.jar:2.4.1]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:333) [spring-boot-2.4.1.jar:2.4.1]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1309) [spring-boot-2.4.1.jar:2.4.1]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1298) [spring-boot-2.4.1.jar:2.4.1]
	at com.example.demo.DemoApplication.main(DemoApplication.java:30) [classes/:0.0.1-SNAPSHOT]
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_275]
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:1.8.0_275]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_275]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_275]
	at org.springframework.boot.loader.MainMethodRunner.run(MainMethodRunner.java:49) [workspace/:na]
	at org.springframework.boot.loader.Launcher.launch(Launcher.java:107) [workspace/:na]
	at org.springframework.boot.loader.Launcher.launch(Launcher.java:58) [workspace/:na]
	at org.springframework.boot.loader.JarLauncher.main(JarLauncher.java:88) [workspace/:na]
Caused by: org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException: A job instance already exists and is complete for parameters={fileName=https://raw.githubusercontent.com/benas/spring-batch-lab/master/blog/spring-batch-kubernetes/data/sample1.csv}.  If you want to run this job again, change the parameters.
…
```

Spring Batch does not let the same job instance be re-run after it has successfully completed. This is by design, to prevent duplicate job executions due to either a human error or a platform limitation, as explained in the previous section.

#### [](#preventing-concurrent-job-executions-of-the-same-job-instance)Preventing Concurrent Job Executions of the Same Job Instance

In the same spirit, Spring Batch prevents concurrent executions of the same job instance. To test it, add an item processor that does a `Thread.sleep` to slow down the processing and try to run a second job execution (in a separate terminal) while the first one is running. The second (concurrent) attempt fails with:

```
Copy2021-01-08 20:59:04.201 ERROR 1 --- [           main] o.s.boot.SpringApplication               : Application run failed

java.lang.IllegalStateException: Failed to execute ApplicationRunner
	at org.springframework.boot.SpringApplication.callRunner(SpringApplication.java:798) [spring-boot-2.4.1.jar:2.4.1]
	at org.springframework.boot.SpringApplication.callRunners(SpringApplication.java:785) [spring-boot-2.4.1.jar:2.4.1]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:333) [spring-boot-2.4.1.jar:2.4.1]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1309) [spring-boot-2.4.1.jar:2.4.1]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1298) [spring-boot-2.4.1.jar:2.4.1]
	at com.example.demo.DemoApplication.main(DemoApplication.java:31) [classes/:0.0.1-SNAPSHOT]
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_275]
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:1.8.0_275]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_275]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_275]
	at org.springframework.boot.loader.MainMethodRunner.run(MainMethodRunner.java:49) [workspace/:na]
	at org.springframework.boot.loader.Launcher.launch(Launcher.java:107) [workspace/:na]
	at org.springframework.boot.loader.Launcher.launch(Launcher.java:58) [workspace/:na]
	at org.springframework.boot.loader.JarLauncher.main(JarLauncher.java:88) [workspace/:na]
Caused by: org.springframework.batch.core.repository.JobExecutionAlreadyRunningException: A job execution for this job is already running: JobExecution: id=1, version=1, startTime=2021-01-08 20:58:46.434, endTime=null, lastUpdated=2021-01-08 20:58:46.435, status=STARTED, exitStatus=exitCode=UNKNOWN;exitDescription=, job=[JobInstance: id=1, version=0, Job=[job]], jobParameters=[{fileName=https://raw.githubusercontent.com/benas/spring-batch-lab/master/blog/spring-batch-kubernetes/data/sample1.csv}]
…
```

Thanks to the centralized job repository, Spring Batch can detect currently running executions (based on the job status in the database) and prevent concurrent executions either on the same node or any other node of the cluster by throwing a `JobExecutionAlreadyRunningException`.

### [](#3-deploy-the-job-on-kubernetes)3\. Deploy the Job on Kubernetes

Setting up a Kubernetes cluster is beyond the scope of this post, so I assume you already have a Kubernetes cluster up and running and can interact with it by using `kubectl`. In this post, I use the single-node local Kubernetes cluster provided by the Docker Desktop application.

First, I create a service for the external database, as described in "Scenario 1: Database outside cluster with IP address" from [Kubernetes best practices: mapping external services](https://cloud.google.com/blog/products/gcp/kubernetes-best-practices-mapping-external-services). Here is the service definition:

```
Copykind: Service
apiVersion: v1
metadata:
  name: mysql
spec:
    type: ClusterIP
    ports:
      - port: 3306
        targetPort: 3306
---
kind: Endpoints
apiVersion: v1
metadata:
  name: mysql
subsets:
  - addresses:
      - ip: 192.168.1.53 # This is my local IP, you might need to change it if needed
    ports:
      - port: 3306
---
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  # base64 of "root" ($>echo -n "root" | base64)
  db.username: cm9vdA==
  db.password: cm9vdA==
```

This service can be applied to Kubernetes, as follows:

```
Copy$ kubectl apply -f src/kubernetes/database-service.yaml
```

Now, since we have already created a Docker image for our job, deploying it to Kubernetes is a matter of defining a `Job` resource with the following manifest:

```
CopyapiVersion: batch/v1
kind: Job
metadata:
  name: bootiful-job-$JOB_NAME
spec:
  template:
    spec:
      restartPolicy: OnFailure
      containers:
        - name: bootiful-job
          image: benas/bootiful-job
          imagePullPolicy: Never
          args: ["fileName=$FILE_NAME"]
          env:
            - name: SPRING_DATASOURCE_DRIVER-CLASS-NAME
              value: com.mysql.cj.jdbc.Driver
            - name: SPRING_DATASOURCE_URL
              value: jdbc:mysql://mysql/test
            - name: SPRING_DATASOURCE_USERNAME
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: db.username
            - name: SPRING_DATASOURCE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: db.password
```

This manifest follows the same approach as [creating jobs based on a template](https://kubernetes.io/docs/tasks/job/parallel-processing-expansion/), as suggested by Kubernetes docs. This job template serves as a base for creating a job for each input file to ingest. I have already ingested the `sample1.csv` file, so I create a job for another remote file named [sample2.csv](https://raw.githubusercontent.com/benas/spring-batch-lab/master/blog/spring-batch-kubernetes/data/sample2.csv) by using the following command:

```
Copy$ JOB_NAME=sample2 \
  FILE_NAME="https://raw.githubusercontent.com/benas/spring-batch-lab/master/blog/spring-batch-kubernetes/data/sample2.csv" \
  envsubst < src/k8s/job.yaml | kubectl apply -f -
```

This command substitutes variables in the job template to create a job definition for the given file and then submits it to Kubernetes. Let's check the job and pod resources in Kubernetes:

```
Copy$ kubectl get jobs
NAME                  COMPLETIONS   DURATION   AGE
bootiful-job-sample2   0/1           97s        97s

$ kubectl get pods
NAME                             READY   STATUS      RESTARTS   AGE
bootiful-job-sample2-n8mlb   0/1     Completed   0          7s

$ kubectl logs bootiful-job-sample2-n8mlb
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.4.1)

2021-01-08 17:48:42.053  INFO 1 --- [           main] com.example.demo.BootifulJobApplication  : Starting BootifulJobApplication v0.1 using Java 1.8.0_275 on bootiful-job-person-n8mlb with PID 1 (/workspace/BOOT-INF/classes started by cnb in /workspace)
2021-01-08 17:48:42.056  INFO 1 --- [           main] com.example.demo.BootifulJobApplication  : No active profile set, falling back to default profiles: default
2021-01-08 17:48:43.028  INFO 1 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2021-01-08 17:48:43.180  INFO 1 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2021-01-08 17:48:43.231  INFO 1 --- [           main] o.s.b.c.r.s.JobRepositoryFactoryBean     : No database type set, using meta data indicating: MYSQL
2021-01-08 17:48:43.394  INFO 1 --- [           main] o.s.b.c.l.support.SimpleJobLauncher      : No TaskExecutor has been set, defaulting to synchronous executor.
2021-01-08 17:48:43.541  INFO 1 --- [           main] com.example.demo.BootifulJobApplication  : Started BootifulJobApplication in 1.877 seconds (JVM running for 2.338)
2021-01-08 17:48:43.544  INFO 1 --- [           main] o.s.b.a.b.JobLauncherApplicationRunner   : Running default command line with: [fileName=https://raw.githubusercontent.com/benas/spring-batch-lab/master/blog/spring-batch-kubernetes/data/sample2.csv]
2021-01-08 17:48:43.677  INFO 1 --- [           main] o.s.b.c.l.support.SimpleJobLauncher      : Job: [SimpleJob: [name=job]] launched with the following parameters: [{fileName=https://raw.githubusercontent.com/benas/spring-batch-lab/master/blog/spring-batch-kubernetes/data/sample2.csv}]
2021-01-08 17:48:43.758  INFO 1 --- [           main] o.s.batch.core.job.SimpleStepHandler     : Executing step: [step]
2021-01-08 17:48:44.632  INFO 1 --- [           main] o.s.batch.core.step.AbstractStep         : Step: [step] executed in 873ms
2021-01-08 17:48:44.653  INFO 1 --- [           main] o.s.b.c.l.support.SimpleJobLauncher      : Job: [SimpleJob: [name=job]] completed with the following parameters: [{fileName=https://raw.githubusercontent.com/benas/spring-batch-lab/master/blog/spring-batch-kubernetes/data/sample2.csv}] and the following status: [COMPLETED] in 922ms
2021-01-08 17:48:44.662  INFO 1 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2021-01-08 17:48:44.693  INFO 1 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.
```

You can then check the newly added persons in the `PEOPLE` table:

```
Copymysql> select * from PEOPLE;
+----+------------+-----------+
| ID | FIRST_NAME | LAST_NAME |
+----+------------+-----------+
|  1 | Jill       | Doe       |
|  2 | Joe        | Doe       |
|  3 | Justin     | Doe       |
|  4 | Jane       | Doe       |
|  5 | John       | Doe       |
|  6 | David      | Doe       |
|  7 | Damien     | Doe       |
|  8 | Danny      | Doe       |
|  9 | Dorothy    | Doe       |
|  10 | Daniel    | Doe       |

+----+------------+-----------+
10 rows in set (0.00 sec)

```

That's it, our job is successfully running in Kubernetes!

## [](#tips-and-tricks)Tips and Tricks

Before concluding this post, I wanted to share some tips and tricks that are worth considering when migrating Spring Batch jobs to the cloud on Kubernetes.

### [](#1-job-packaging-and-deployment)1\. Job Packaging and Deployment

Running more than one Spring Batch job in a single container or pod is not a good idea. This does not follow the cloud-native development best practices and the Unix philosophy in general. Running a job per container or pod has the following advantages:

-   Separate logs
-   Independent life cycles (bugs, features, deployments, etc)
-   Separate parameters and exit codes
-   Restartability (in case of failure, only restart the failed job)

### [](#2-choosing-the-right-spring-batch-job-parameters)2\. Choosing the Right Spring Batch Job Parameters

A successful Spring Batch job instance cannot be restarted. In the same way, a successful Kubernetes job cannot be restarted. This makes designing a Kubernetes job per Spring Batch job instance a perfect match! As a consequence, correctly choosing the identifying job parameters in Spring Batch becomes a crucial task, as doing so determines the identity of job instances and consequently the design of Kubernetes jobs (See point 3). Two important aspects of the framework are affected by this choice:

-   Job identification: Spring Batch prevents duplicate and concurrent job executions based on the identity of the job instance.
-   Failure scenario: Spring Batch relies on the job instance's identity to start a new job execution where the previous one left off.

Batch processing is about processing **fixed, immutable** data sets. If the input data is not fixed, then a stream-processing tool is more appropriate. Identifying job parameters in Spring Batch should represent a **uniquely identifiable immutable** data set. A good hint to correctly choose a set of identifying job parameters is calculating their hash (or more precisely the hash of the data they represent) and making sure that that hash is stable. Here are some examples:

Job parameters

Good/Bad

Comments

fileName=log.txt

Bad

An ever growing log file is not a fixed data set

fileName=transactions-2020-08-20.csv

Good

As long as the file content is fixed

folderName=/in/data

Bad

A folder with a variable content is not a fixed data set

folderName=/in/data/2020/12/20

Good

A folder with the files of all orders received on a given day

jmsQueueName=events

Bad

Items are removed from the queue so this is not a fixed data set

orderDate=2020-08-20

Good

If used, for example, in a database select query on D+1

Unfortunately, many people fail at designing good identifying job parameters and end up adding a timestamp or a random number as an additional identifying job parameter acting as job instance discriminator. Using an ever growing “run.id” parameter is a symptom of such a failure.

### [](#3-choosing-the-right-kubernetes-job-deployment-pattern)3\. Choosing the Right Kubernetes Job Deployment Pattern

The Kubernetes' documentation provides a whole section called [Job patterns](https://kubernetes.io/docs/concepts/workloads/controllers/job/#job-patterns), which describes how to choose the right job deployment pattern. In this post, I followed the [Parallel processing using expansions](https://kubernetes.io/docs/tasks/job/parallel-processing-expansion/) approach to create a job per file from a template. While this approach allows for processing multiple files in parallel, it can put a pressure on Kubernetes when there are many files to ingest, as this would result in many Kubernetes job objects being created. If all your files have a similar structure and you want to create a single job to ingest them in one shot, you can use the `MultiResourceItemReader` provided by Spring Batch and create a single Kubernetes job. Another option is to use a single job with a partitioned step where each worker step handles a file (this can be achieved by using the built-in `MultiResourcePartitioner`).

### [](#4-gracefulabrupt-shutdown-implication)4\. Graceful/Abrupt Shutdown Implication

When a Spring Batch job execution fails, you can restart it if the job instance is restartable. You can automate this, as long as the job execution is shut down gracefully, since this gives Spring Batch a chance to correctly set the job execution's status to `FAILED` and set its `END_TIME` to a non-null value. However, if the job execution fails abruptly, the job execution's status is still be set to `STARTED` and its `END_TIME` is `null`. When you try to restart such a job execution, Spring Batch will think (since it only looks at the database status) that a job execution is currently running for this instance and fails with a `JobExecutionAlreadyRunningException`. In such cases, the metadata tables should be updated to allow the restart of such a failed execution -- something like:

```
Copy> update BATCH_JOB_EXECUTION set status = 'FAILED', END_TIME = '2020-01-15 10:10:28.235' where job_execution_id = X;
> update BATCH_STEP_EXECUTION set status = 'FAILED' where job_execution_id = X and step_name='failed step name';
```

Graceful/Abrupt shutdown of Spring Batch jobs is directly related to Kubernetes jobs restart policy. For example, with `restartPolicy=OnFailure`, when a pod fails abruptly and the job controller creates a new pod immediately after, you cannot update the database in a timely manner and the new Spring Batch job execution fails with a `JobExecutionAlreadyRunningException`. The same happens with the third pod and so on, until the pod reaches the `CrashLoopBackOff` state and gets deleted once the `backoffLimit` is exceeded.

Now, if you follow the best practice of running your Spring Boot Batch application with `System.exit(SpringApplication.exit(SpringApplication.run(MyBatchApplication.class, args)));` as shown in the snippet above, Spring Boot (and, in turn, Spring Batch) can correctly handle `SIGTERM` signals and gracefully shutdown your application when Kubernetes starts the [pod termination process](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination). With this in place, when pods are gracefully shutdown, the Spring Batch job instance can automatically restart until completion. Unfortunately, graceful shutdown of Kubernetes pods is not guaranteed, and you should take this into consideration when you set the restart policy and the `backoffLimit` values, to ensure you have enough time to update the job repository as needed for failed jobs.

It should be noted that the `shell` form of docker's `ENTRYPOINT` [does not send Unix signals to the sub-process running in the container](https://docs.docker.com/engine/reference/builder/#entrypoint). So in order to correctly intercept Unix signals by the Spring Batch job running in a container, the `ENTRYPOINT` form should be `exec`. This is also directly related to Kubernetes' pod termination process mentioned above. More details about this matter can be found in the [Kubernetes best practices: terminating with grace](https://cloud.google.com/blog/products/gcp/kubernetes-best-practices-terminating-with-grace) blog post.

### [](#5-choosing-the-right-kubernetes-job-concurrency-policy)5\. Choosing the Right Kubernetes Job Concurrency Policy

As I pointed out earlier, Spring Batch prevents concurrent job executions of the same job instance. So, if you follow the "Kubernetes job per Spring Batch job instance" deployment pattern, setting the job's `spec.parallelism` to a value higher than 1 does not make sense, as this starts two pods in parallel and one of them will certainly fail with a `JobExecutionAlreadyRunningException`. However, setting a `spec.parallelism` to a value higher than 1 makes perfect sense for a partitioned job. In this case, partitions can be executed in parallel pods. Correctly choosing the concurrency policy is tightly related to which job pattern is chosen (As explained in point 3).

### [](#6-job-metadata-housekeeping)6\. Job Metadata Housekeeping

Deleting a Kubernetes job deletes its corresponding pods. Kubernetes provides a way to automatically clean up completed jobs by using the `ttlSecondsAfterFinished` parameter. However, there is no equivalent to this in Spring Batch: You should clean up the job repository manually. You should take this into consideration for any serious production batch infrastructure, as job instances and executions can grow very quickly, depending on the frequency and number of deployed jobs. I see a good opportunity here to create a Kubernetes Custom Resource Definition that deletes Spring Batch's metadata when the corresponding Kubernetes job is deleted.

## [](#conclusion)Conclusion

I hope this post has shed some light on the challenges of designing, developing, and running batch applications in the cloud and how Spring Batch, Spring Boot and Kubernetes can tremendously simplify this task. This post showed how to go from [start.spring.io](https://start.spring.io) to Kubernetes in three simple steps, thanks to the productivity of the Spring ecosystem, but this is only scratching the surface of the matter. This post is the first part of a blog series in which I will cover other aspects of running Spring Batch jobs on Kubernetes. In the next posts, I will tackle job observability with [Micrometer](https://micrometer.io) and [Wavefront](https://tanzu.vmware.com/observability) and then how to scale Spring Batch jobs on Kubernetes. Stay tuned!