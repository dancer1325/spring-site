---
title: Spring Batch Recent Changes and Upcoming m4 Release
source: https://spring.io/blog/2008/02/04/spring-batch-recent-changes-and-upcoming-m4-release
scraped: 2026-02-24T09:20:57.525Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  February 04, 2008 | 0 Comments
---

# Spring Batch Recent Changes and Upcoming m4 Release

_Engineering | Dave Syer |  February 04, 2008 | 0 Comments_

We've been working really hard on Spring Batch getting ready for the [Spring Portfolio](http://www.springframework.org/projects) 2.5 release train, and I thought it would be a good time to update everyone on what is happening. In this article I'm going to expand a bit on the domain modelling, and our decision to raise the profile of some of the core domain objects, and increase their responsibilities. I will also give a few tastes of what is coming in the next couple of releases leading up to 1.0, so people have a chance to comment if they want to.

By way of an apology: there have been some quite significant changes in the internals of Spring Batch since last time I blogged on it, so I feel like I have been negligent. In this article I don't think I can cover all the changes, but I can promise to try and keep more up to date in the future, and I definitely will keep everyone up to date as the 1.0 release approaches. (N.B. the Spring Portfolio 2.5 release train includes Spring Batch 1.0.)

Because we have fixed 70 or more issues since 1.0.0-m3, we felt that it was time to get something out there. The plan that we made last week is to release 1.0.0-m4 tomorrow (February 5), with a slightly narrower scope than planned (e.g. postponing the XML namespace implementation). Then 1.0.0-m5 will come approximately 10-14 days later, with time for at least one release candidate before final release of 1.0.0 on March 20.

### Spring Batch Core

The Spring Batch Core is quite a compact API. It actually doesn't contain much if anything we necessarily expect a batch application developer to implement or extend, so it is in effect an internal API. Nevertheless, it has quite a profound effect on Spring Batch users because it shapes the way that we think about a batch job and its execution, and (more importantly for the users) its implementation, configuration and deployment.

#### Job and Step and the Data Model

Up to 1.0.0-m3 we had a classical case of a mismatch between our API and the Ubiquitous Language of batch. We had to keep explaining that a JobConfiguration was what most people would think of as a "Job" (same for StepConfiguration and "Step"). The "Job" is the thing you configure to run every day, but each time it runs, it has a new identity. This was a clear signal that "Job" was the name of the domain concept, so why were we calling it "JobConfiguration"? Good question. So now (in 1.0.0-m4) the thing that the user configures is a Job, and when it runs we create a new JobInstance. The same goes for Step and StepInstance. So the Entity stereotype is fulfilled by the \*Instance objects - they have an id, and a primary key in the database. An example would be the \[JobInstance effective February 2 2008\], for the \["end-of-day" Job\].

The other Entity stereotypes are JobExecution and StepExecution. These haven't changed their names or responsibilities since m3. When a JobInstance is executed we create a JobExecution (ensuring that the instance is not already executing first). At this point the \[JobExecution on February 2 at 10pm\], of the \[JobInstance effective February 2 2008\] for the \["end-of-day" Job\], is launched. But then if it fails, and is restarted the next day, then we would need a new \[JobExecution on February 3 at 10.12pm\] for the same JobInstance (i.e. \[JobInstance effective February 2 2008\] for the \["end-of-day" Job\]). Thus Job is 1-to-many with JobInstance, which in turn is 1-to-many with JobExecution. The same applies to Step\*.

#### Job and Step and Execution

We also made a change to the API in respect to execution of the Job and Step in 1.0.0-m4. Up to 1.0.0-m3 we had a separate interface for execution of each - JobExecutor executes Job, and StepExecutor executes Step. This has, as we thought at the time we designed it, benefits of encapsulation - we imagined multiple implementations of StepExecutor all able to execute the same Step. In practice, as we learned more about the contours of the implementation, we found that it was an artificial distinction. The signal, interestingly, was the fact that we had too many "instanceof" checks in Java in our StepExecutor implementations - they always had to make special cases for different Step implementations. In the end it was clear that each Step would have to know how to execute itself. As with all such insights, it is obvious when you see it, but until then it is anything but. Thank you [Eric Evans](http://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215).

So, for example, the central interface of the Step domain is

```java
Copy
public interface Step {

    // ... properties that the Job needs to know here ...

    void execute(StepExecution stepExecution) 
         throws StepInterruptedException, BatchCriticalException;

}
```

There is no need for the Step to return anything from the execute method because the StepExecution that is passed in is updated during the progress of the step. It is passed in by the caller, and can be used if needed to monitor the progress of the execution. It can also be used to stop the execution, if the caller needs to interrupt the job (hence the StepInterruptedException), just by setting a flag setTerminateOnly(). This is something that a couple of people have asked me about, so it's probably worth mentioning here: the Step is responsible for examining the value of that flag wherever it can, so there is a mechanism built into the framework for signalling early termination of a job. The effect of setting the flag depends on the implementation of Step, but we provide a SimpleStep that will inspect the flag after every item is processed, and abort if necessary. It also accepts a StepInterruptPolicy strategy which can be used to check for other abnormal conditions (e.g. Thread.isInterrupted()).

### The Spring Batch Namespace

Spring Batch is almost the perfect example of where a Spring XML namespace can help to make things easier for an application developer. We haven't implemented the NamespaceHandler yet, but it is scheduled for the next milestone 1.0.0-m5, so now is a good time for you to se how the example feels.

The motto is "make the configuration look like the domain model", and in that spirit, have a look at this example and see if it makes sense. It is a draft of the new namespace that mimics the existing fixed length import sample job, so those of you familiar with that will see the parallels. If you need to find the existing samples, just go to the Spring Batch homepage to download the release (the fixed length sample configuration can also be browsed [here](http://fisheye3.cenqua.com/browse/springframework/spring-batch/trunk/spring-batch-samples/src/main/resources/jobs/fixedLengthImportJob.xml)).

```xml
Copy
<batch>

	<job id="fixedLengthImportJob" volatile="false">
		<simple-step id="step1" chunk-size="50" save-restart-data="false"
			allow-start-if-complete="true" reader-ref="fileInputTemplate">
			<processor>
				<beans:bean
					class="org.springframework.batch.sample.item.processor.TradeProcessor">
					<property name="writer" ref="tradeDao" />
				</beans:bean>
			</processor>
			<simple-completion-policy skipLimit="5" />
		</simple-step>
		<simple-step id="step2" chunk-size="200">
			<jdbc-cursor-reader data-source-ref="dataSource">
				<query><![CDATA[SELECT ID FROM T_TRADE ORDER BY ID WHERE PROCESSED='N']]></query>
			</jdbc-cursor-reader>
			<processor>
				<beans:bean
					class="org.springframework.batch.sample.item.processor.TradeUpdater">
					<property name="dao" ref="tradeDao" />
				</beans:bean>
			</processor>
		</simple-step>
		<tasklet-step id="step3" chunk-size="1">
			<tasklet>
				<beans:bean
					class="org.springframework.batch.sample.sproc.TradeSummarizer"
					p:dataSource-ref="dataSource" />
			</tasklet>
		</tasklet-step>
	</job>

	<!-- INFRASTRUCTURE SETUP -->

	<flat-file-reader id="fileInputTemplate"
		resource="data/fixedLengthImportJob/input/20070122.teststream.ImportTradeDataStep.txt"
		field-set-mapper-ref="fieldSetMapper"
		validator-ref="fixedValidator">
		<fixed-length-tokenizer>
			<columns>
				ISIN=1-12 Quantity=13-15 Price=16-20 Customer=21-29
			</columns>
		</fixed-length-tokenizer>
	</flat-file-reader>

	<beans:bean id="fixedValidator"
		class="org.springframework.batch.item.validator.SpringValidator">
		<property name="validator">
			<bean id="tradeValidator"
				class="org.springmodules.validation.valang.ValangValidator">
				<property name="valang">
					<value>
						<![CDATA[
						{ isin : length(?) < 13 : 'ISIN too long' : 'isin_length' : 12}
					]]>
					</value>
				</property>
			</bean>
		</property>
	</beans:bean>

	<beans:bean id="tradeDao"
		class="org.springframework.batch.sample.dao.JdbcTradeWriter">
		<property name="jdbcTemplate" ref="jdbcTemplate" />
		<property name="incrementer">
			<bean parent="incrementerParent">
				<property name="incrementerName" value="TRADE_SEQ" />
			</bean>

		</property>
	</beans:bean>

	<beans:bean id="fieldSetMapper"
		class="org.springframework.batch.sample.mapping.TradeFieldSetMapper" />

</batch>
```

Notice how the details of the implementation of the Job and Step are hidden - there is a difference between the <simple-step/> and the <tasklet-step/>, but the only visible differences are those that it is necessary for the user to know about. The user doesn't need to know that there are different implementations of the Step interface backing this configuration, but the fact that there is an item-oriented and a task-oriented approach to steps is not hidden. That is what we think is important to the user. When we drafted these XML examples we took a couple of examples from the existing Spring Batch samples and hacked them around until the same configuration information was contained, but in most cases the overall size of the files dropped by 50% or more. That must mean we are on the right track.

### Postscript

This has been a really quick but quite a deep dive into Spring Batch and some of the recent changes. There are a lot more interesting nuggets that I could share with you about our experience with the usage and implementation of the framework. My [JavaOne](http://java.sun.com/javaone/sf/index.jsp) presentation was accepted, which means that you can look forward to learning more in San Francisco in May, and to hearing some more examples of real-life batch processing. Also, look out for more on this blog as the 2.5 release train comes to the start of its journey (from the user's point of view that is!).

In closing I need to pay tribute to Lucas Ward and Ben Hale who have been instrumental in the Spring Batch development process. I would also like to welcome Robert Kasanicky as our newest committer - Robert has contributed some very high quality code to Spring Batch and I am sure he will continue to do so as we wrap up 1.0 and start work on the next major release. If anyone else is interested in contributing, Robert followed the normal process of hanging out in the forum and on JIRA, contributing ideas and (crucially) patches. I nominated him, and we took a vote, and now he is officialy part of the team.

Feel free to comment here if there is anything in the article you need to clarify. For general discussion of Spring Batch, please use the [forum](http://forum.springframework.org/forumdisplay.php?f=41). The home page for Spring Batch is [here](http://www.springframework.org/spring-batch), or it can easily be found from the [Spring main website](http://www.springframework.org/)