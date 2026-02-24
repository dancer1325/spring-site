---
title: Running a Spring Batch Job in The SpringSource Application Platform
source: https://spring.io/blog/2008/05/30/running-a-spring-batch-job-in-the-springsource-application-platform
scraped: 2026-02-24T09:16:54.257Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  May 30, 2008 | 0 Comments
---

# Running a Spring Batch Job in The SpringSource Application Platform

_Engineering | Dave Syer |  May 30, 2008 | 0 Comments_

In this article I will show you how to run a Spring Batch job in the SpringSource Application Platform. I ran an early version of this up as a little demo for JavaOne, and then again at the London Spring User Group, and thought it might be a good thing to share. The sample code is [here](http://blog.springsource.com/main/wp-content/uploads/2008/06/batch-ap-blog-v2.zip).

## The Bundles

First we'll do a quick tour of the bundles in the sample code. Start the server now, or at any point after you have installed some bundles.

### Bundle: hsql-server

This one is useful to have around for development and testing. All it does is launch an instance of HSQLDB in server mode, so that you can connect to it and inspect the database using SQL statements. You can just drag and drop it into the Platform Server instance in the Servers View. Do this first, because the Platform remembers the order in which bundles were installed, and starts them in that order. This one has to be started first because other bundles will try to connect to the database server.

The bundle configuration is in META-INF/spring/module-context.xml (this is conventional for Platform bundles) - Spring DM picks up all XML files from META-INF/spring. This one just uses Spring to configure and launch an instance of the HSQL Server.

There is an integration test that can be used to check the configuration.

The Eclipse project also contains a launch configuration for an HSQL Swing client, so you can see the database contents in a GUI. Launch it and connect to the server instance with the properties provided in META-INF/batch-hsql.properties in the same project (url=jdbc:hsqldb:hsql://localhost:9005/samples).

### Bundle: data-source

This bundle is a configuration bundle which exposes a single OSGi service for a javx.sql.DataSource. Drop this into the Server next. There is a simple integration test that can be used to check the configuration - it just gets a connection from the datasource and asserts it is not null.

### Bundle: data-source-initializer

This is another convenient bundle to have in a test environment. It's job is to tear down the database and re-install the tables needed for the rest of the bundles (the batch meta data, and some business tables for the jobs themselves). When you install this bundle into the server it will add the tables, which should then show up in the HSQL Swing GUI. Once it has been installed once, you can remove it (right click on the bundle in the Server View and select Remove).

### Bundle: job-launcher

This is the first bundle that contains some Spring Batch dependencies. It is mainly a configuration bundle, exposing services (JobLauncher, JobRepository, TransactionManager) for other bundles that will actually run jobs. Once it is installed it can just sit there providing the services.

The bundle configuration is in META-INF/spring/module-context.xml as per usual. It is a stripped-down version of the simple-job-launcher-context.xml from the Spring Batch samples. It only has to define the beans that will be exported, i.e.

```xml
Copy<bean id="jobLauncher"
    class="org.springframework.batch.core.launch.support.SimpleJobLauncher">
  <property name="jobRepository" ref="jobRepository" />
</bean>

<bean id="jobRepository"
    class="org.springframework.batch.core.repository.support.JobRepositoryFactoryBean">
  <property name="dataSource" ref="dataSource" />
  <property name="databaseType" value="hsql" />
</bean>
	
<bean id="transactionManager" 
    class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <property name="dataSource" ref="dataSource"/>
</bean>
```

The only other configuration there is the transaction advice for the JobRepository (not needed in Spring Batch 1.1). The dataSource reference comes from an OSGi service exposed by the data-source bundle above. To see how that reference is imported and how the local services are exposed to the OSGi Service Registry, we can look at META-INF/spring/osgi-context.xml:

```xml
Copy<reference id="dataSource" interface="javax.sql.DataSource" />

<service ref="jobLauncher"
  interface="org.springframework.batch.core.launch.JobLauncher" />
<service ref="jobRepository"
  interface="org.springframework.batch.core.repository.JobRepository" />
<service ref="transactionManager"
  interface="org.springframework.transaction.PlatformTransactionManager" />
```

This is pretty straightforward use of Spring DM. The important thing is that the module context is kept separate from the OSGi-specific context. This allows us to write an integration test for the module context, without having to deploy to the Platform. Thus we have:

```java
Copy@ContextConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
public class JobLauncherIntegrationTests {

  @Autowired
  private JobLauncher jobLauncher;

  @Test
  public void testLaunchJob() throws Exception {
    assertNotNull(jobLauncher);
  }

}
```

The test loads the context up, adding a local data source definition to replace the OSGi one (see JobLauncherIntegrationTests-context.xml), ad then asserts that a job launcher is available. You can run the test directly from Eclipse in the normal way.

#### The SimpleJobLauncherBean

In addition to the configuration above exposing services in the OSGi container, this bundle also exports a package. Look in the MANIFEST.MF:

```plain
Copy...
Export-Package: com.springsource.consulting.batch.support
...
```

If you look in this package you will find a convenience class that can be used by other bundles to launch a job (SimpleJobLauncherBean). The SimpleJobLauncherBean is an ApplicationListener which means that any Spring ApplicationContext that contains one of these will try to launch the job on startup (when the context is loaded). The way it does this is to listen for a ContextRefreshedEvent and then try to launch the job:

```java
Copytry {
  jobLauncher.run(job, converter.getJobParameters(parameters));
} catch (JobExecutionAlreadyRunningException e) {
  logger.error("This job is already running", e);
} catch (JobInstanceAlreadyCompleteException e) {
  logger.info("This job is already complete.  "
    + "Maybe you need to change the input parameters?", e);
} catch (JobRestartException e) {
  logger.error("Unspecified restart exception", e);
}
```

The plan for launching jobs is to simply create a bundle for each job, and have it define one of these SimpleJobLauncherBean instances.

### Bundle: hello-world

This is a very simple job bundle. It has all the features of a bigger job (input from a file and output to a database), but works with a very simple domain model and a very small dataset.

Drop the bundle into the running Server instance. It starts pretty quickly, and since the job is so small in scope you will immediately see the effect in the batch meta-data. In the HSQL Swing GUI you can execute some SQL, e.g.

```plain
CopySELECT * FROM BATCH_STEP_EXECUTION
```

And see the result, something like this:

STEP\_EXECUTION\_ID

VERSION

STEP\_NAME

...

STATUS

...

0

4

helloWorldStep

...

COMPLETED

...

This shows that the job was executed (and completed successfully). The configuration for the step is in META-INF/spring/module-context.xml:

```xml
Copy<bean
	class="com.springsource.consulting.batch.support.SimpleJobLauncherBean">
	<constructor-arg ref="jobLauncher" />
	<constructor-arg ref="helloWorld" />
	<property name="parameters" value="launch.timestamp=${launch.timestamp}"/>
</bean>

<bean id="helloWorld" parent="simpleJob">
	<property name="steps">
		<bean parent="simpleStep" id="helloWorldStep">
			<property name="commitInterval" value="100" />
			<property name="itemReader">
    ...
			</property>
			<property name="itemWriter">
    ...
			</property>
		</bean>
	</property>
</bean>
```

From the above you can see that we have a regular Spring Batch job configuration (called "helloWorld") with a single step. The step id ("helloWorldStep") was seen already in the database query above, showing that the step had been executed (once). All the step does is read data from a flat file, transforming the lines to domain objects, and writing them to a stdout. You can see the result by inspecting the trace logs in the Platform home directory, e.g. if you tail -f serviceability/trace/trace.log | grep -i hello you should see:

```plain
Copy[2008-05-30 15:57:04.140] platform-dm-11              
  com.springsource.consulting.batch.hello.MessageWriter.unknown 
  I Message: [Hello World]
[2008-05-30 15:57:04.140] platform-dm-11              
  com.springsource.consulting.batch.hello.MessageWriter.unknown 
  I Message: [Hello Small World]
```

If you like you can run the job again, just by editing one of the files in the bundle (e.g. the MANIFEST or one of the Spring config files) and saving it. The tools pick up the change and redeploy the bundle. The way this job is set up it starts every execution with a new set of parameters (using a timestamp) so it should always run successfully.

#### The End of a Job

Once the job has finished, either successfully or not, we want to leave the system in a state that signals what has happened. There are many possible approaches to this, but all we really need is one that is toolable, so that an operator can be notified, and take whatever action is necessary (like restart a failed job or re-parameterise a successful one for the next run). The operator might be a human, or a system function.

To signal the end of the job, the SimpleJobLauncherBean simply grabs the enclosing OSGi Bundle instance, and stops it. This is a pretty simple model, but has the benefit that the API is well defined and universally supported by the OSGi platform. It can in principle be extended very flexibly as long as the container (SpringSource Application Platform) can trap those bundle events. These are features we might see in the Batch Personality for the Platform version 2.0. If you have any ideas about what the behaviour should be and what features are required by operators, please help us by commenting on this article.

We can verify the state of the job bundle by logging into the Equinox console. If you go to a command line and type telnet localhost 2401 you should see a command prompt from the platform:

```plain
Copyosgi>
```

Type "ss" and hit return, and you will see a list of installed bundles:

```plain
Copyosgi> ss

Framework is launched.

id      State       Bundle
...
86      RESOLVED    org.springframework.batch.infrastructure_1.0.0
87      RESOLVED    org.springframework.batch.core_1.0.0
88      RESOLVED    com.springsource.org.apache.commons.lang_2.4.0
97      ACTIVE      job.launcher_1.0.0
99      RESOLVED    hello.world_1.0.0

osgi>
```

So the bundle with id=97 is the job launcher, and it is active. The bundle with id=99 is the hello world job (the ids might be different in your case), and it is resolved, but not active because it was stopped when the job finished executing.

You can restart the job again from the OSGi command line:

```plain
Copyosgi> start 99

osgi> ss

Framework is launched.

id      State       Bundle
...
86      RESOLVED    org.springframework.batch.infrastructure_1.0.0
87      RESOLVED    org.springframework.batch.core_1.0.0
88      RESOLVED    com.springsource.org.apache.commons.lang_2.4.0
97      ACTIVE      job.launcher_1.0.0
99      RESOLVED    hello.world_1.0.0

osgi>
```

The job bundle is back to the resolved state, but it has executed the job again, which you can verify from the HSQL GUI or from the trace logs as before.

STEP\_EXECUTION\_ID

VERSION

STEP\_NAME

...

STATUS

...

0

4

helloWorldStep

...

COMPLETED

...

1

4

helloWorldStep

...

COMPLETED

...

2

4

helloWorldStep

...

COMPLETED

...

#### Input files for Jobs

Hello world has a fixed input file packaged inside the bundle. Sometimes that would not be appropriate, and it would be common in practice to find the input file sitting on the file system. On the other hand, with a deployment model based on hot-deployable bundles, maybe packaging the input file in with the job execution is not a bad idea - the footprint of the bundle can be very small, and it contains a perfect audit record of what precisely was executed. Comments would be interesting.

### Bundle: football-job

There is another job bundle in the sample code, which is a more realistic business application (it's the football job sample from Spring Batch). You can launch it and re-launch it in the same way as the hello-world job.

If you just tried that, you probably found that on the second and subsequent launches, nothing changes in the database. That's expected because you have restarted a successfully completed job instance, so it won't process the data again. In fact an exception was thrown by the JobLauncher, caught and logged by the SimpleJobLauncherBean (so it shows up in the trace logs).

## Setting up a Workspace

### The SpringSource Application Platform

If you somehow managed to miss the release announcements, or haven't had time yet to try it out (maybe you thought it was all about web applications), here are a few links to get you started:

-   [Platform Download Page](http://www.springsource.com/beta/applicationplatform/downloads.php) including links to User (or admin) and Programmer Guide
-   The [SpringSource Enterprise Bundle Repository](http://www.springsource.com/repository/app/) - essential for downloading and locating dependencies
-   Rob's Blog on [exploiting Spring features](http://blog.springsource.com/main/2008/05/02/running-spring-applications-on-osgi-with-the-springsource-application-platform/) in the Platform
-   Rob's [Introductory Blog](http://blog.springsource.com/main/2008/04/30/introducing-the-springsource-application-platform/) on the Platform
-   Sam's blog on [deployment options](http://blog.springsource.com/main/2008/05/06/springsource-application-platform-deployment-options/)
-   Andy's blog on [provisioning bundles in the platform](http://blog.springsource.com/main/2008/05/09/working-with-springsource-application-platforms-provisioning-repository/)

### Pre-Requisites

To follow the examples and run the [sample code](http://blog.springsource.com/main/wp-content/uploads/2008/06/batch-ap-blog-v2.zip) you will need some or all of the following. I used them all, and so the smoothest experience will probably come from using them all.

-   The SpringSource [ToolSuite](http://www.springsource.com/web/guest/products/suite/sts)
-   The SpringSource [Application Platform](http://www.springsource.com/beta/applicationplatform/downloads.php) including the Eclipse tooling (install using the update site on the download page)
-   The Q4E [Maven Integration for Eclipse](http://code.google.com/p/q4e/)

After installing the SpringSource Eclipse tools, you need to create a server instance. Go to File->New->Other... and find Server->Server. Select SpringSource and the server type below that and use the browse dialogue to find the Platform installation.

### Downloading Dependencies

We are all waiting expectantly for the SpringSource Eclipse tooling to provide automatic download and installation of dependencies. If that isn't available when you read this article, then you can do it the way I did, if you like. Here's what I did:

-   (Optional) start with an empty local Maven repo (delete ~/.m2/repository, or point to a new location in settings.xml)
-   Before installing a bundle for the first time, open up the project's pom.xml and find the element with id "shell".
-   Change the activeByDefault flag to true, and wait while Q4E downloads the dependencies.
-   Inspect the dependencies using the Q4E visualiser (right click on project and select Maven2->Analyse Dependencies (or Visualize Dependencies). You only need to do this to see what the transitive dependencies are. (You can also use $ mvn dependency:tree on the command line.)
-   At this point I always also right click on the project and select Maven2->Fetch Source JARs. This is optional, but makes development easier and debugging possible.
-   Copy the direct dependencies into the Platform bundles/usr directory. Strictly you only need to copy the ones that are not already in bundles/ext. On a command line (with a sensible OS) you can do
    
    $ find ~/.m2/repository -name \\\*.jar -exec cp {} bundles/usr \\;
    
-   You might need to make "fake edits" on some or all of the MANIFEST.MF files in the bundle projects to force the tooling to refresh.
-   Switch the activeByDefault flag back to false.

No need to restart Eclipse or anything. The "Bundle Dependencies" classpath container should then contain the runtime dependencies you just downloaded. When all Eclipse errors in the Problems view (angry red margin markers) have disappeared, we are ready to go.

I would be delighted to hear from people who have a better way of doing this. Other people have evolved other methods already, but none seemed that convenient to me. Actually, a command-line Maven target would be quite easy to write, but I haven't seen that one yet.

#### Update for Beta5

With beta5 you don't need the "find and copy" step because the platform.config allows you to point to the local Maven repo as a source of dependencies instead of bundles/usr.

You also don't need the Maven local repo for runtime dependencies at all, in principle. You can open the Platform runtime (right click in the Servers view and Open), and browse for and download dependencies directly to bundles/usr. The only weakness currrently (the tools team is working on improving this) is that it doesn't provide any view of the transitive dependencies - you have to know explicitly which bundles are needed. In the case of the samples for this blog, that is easy because the MANIFESTs all have the dependencies completely specificied already. It's harder when you aren't sure what they are and have to create the MANIFEST from scracth. For that I'm still using Q4E for now.

## Closing

There is always more than one way to skin a cat, and the Platform is a very rich environment, so you can be sure that what I showed here is not the only way to achieve the goal of running a job in the Platform. Hopefully it's a good starting point.

A lot of the focus with the Application Platform 1.0 release is on the web tier, and while this is clearly essential (and very tricky to deliver), there are other fish to fry. The 2.0 release will have specific batch-related features (a Batch Personality), so anything we do now will be helpful to flesh out feature requirements for that release. So if you get a chance to try this out and have some constructive comments, especially about operational aspects, they will come in handy when we start to build the Batch Personality.