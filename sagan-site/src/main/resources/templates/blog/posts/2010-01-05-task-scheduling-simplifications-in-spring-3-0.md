---
title: Task Scheduling Simplifications in Spring 3.0
source: https://spring.io/blog/2010/01/05/task-scheduling-simplifications-in-spring-3-0
scraped: 2026-02-24T09:00:36.394Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  January 05, 2010 | 0 Comments
---

# Task Scheduling Simplifications in Spring 3.0

_Engineering | Mark Fisher |  January 05, 2010 | 0 Comments_

Continuing the Spring 3.0 "simplification series" started by [Keith](http://blog.springsource.com/2009/12/21/mvc-simplifications-in-spring-3-0/) and [Chris](http://blog.springsource.com/2009/12/22/configuration-simplifications-in-spring-3-0/), I would like to provide a quick overview of simplifications in scheduling and task execution enabled by Spring 3.0.

I will be walking through a basic [sample application](https://src.springframework.org/svn/spring-samples/task-basic/trunk) that you can checkout from the spring-samples Subversion repository. It has been designed to be as simple as possible while showcasing both annotation-driven and XML-based approaches to scheduling tasks in Spring 3.0.

Let's begin with the annotation-driven approach. You can run it directly via the main() method in AnnotationDemo. If you take a look, you'll see that it's nothing more than a bootstrap for a Spring ApplicationContext:

```java
Copy
public static void main(String[] args) {
    new ClassPathXmlApplicationContext("config.xml", AnnotationDemo.class);
}
```

The reason nothing else is necessary is that the ApplicationContext contains an "active" component, which we will see in just a moment. Because of that component, the main() method will not exit. The config.xml is also minimal, containing only two elements:

```xml
Copy
<context:component-scan base-package="org/springframework/samples/task/basic/annotation"/>

<task:annotation-driven/>
```

The "component-scan" element points to the package that contains our "beans". There are two of them: ScheduledProcessor and AsyncWorker. We'll look at those momentarily, but first take a look at the "annotation-driven" element. That's the one that is new in Spring 3.0, and it drives two annotations: @Scheduled and @Async. You could provide references to a Spring TaskScheduler and TaskExecutor with the "scheduler" and "executor" attributes respectively, but for this sample, we'll just rely on the defaults.

The ScheduledProcessor contains the @Scheduled annotation on a method and is therefore the "active" component I mentioned above. Since the 'annotation-driven' element exists in the configuration, this method will be registered with a Spring TaskScheduler instance that will execute the method periodically with a fixed delay of 30 seconds.

```java
Copy
@Service
public class ScheduledProcessor implements Processor {

    private final AtomicInteger counter = new AtomicInteger();

    @Autowired
    private Worker worker;

    @Scheduled(fixedDelay = 30000)
    public void process() {
        System.out.println("processing next 10 at " + new Date());
        for (int i = 0; i < 10; i++) {
            worker.work(counter.incrementAndGet());
        }
    }
}
```

As you can see in the previous code excerpt, the Worker is invoked by the ScheduledProcessor within a loop. However, the AsyncWorker implementation contains the @Async annotation on its work(..) method, and due to the 'annotation-driven' element in the configuration, this will be wrapped in a proxy so that the method is actually invoked by a TaskExecutor instance. To verify that, the current thread name is displayed within that method. Likewise, to clarify that work is being performed concurrently, a sleep(..) call is made to simulate time-consuming work.

```java
Copy
@Component
public class AsyncWorker implements Worker {

    @Async
    public void work(int i) {
        String threadName = Thread.currentThread().getName(); 
        System.out.println("   " + threadName + " beginning work on " + i);
        try {
            Thread.sleep(5000); // simulates work
        }
        catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("   " + threadName + " completed work on " + i);
    }
}
```

If you run the AnnotationDemo main() method, the output should look something like this: `  processing next 10 at Mon Jan 04 18:20:52 EST 2010 SimpleAsyncTaskExecutor-1 beginning work on 1 SimpleAsyncTaskExecutor-2 beginning work on 2 SimpleAsyncTaskExecutor-3 beginning work on 3 SimpleAsyncTaskExecutor-5 beginning work on 5 SimpleAsyncTaskExecutor-4 beginning work on 4 SimpleAsyncTaskExecutor-6 beginning work on 6 SimpleAsyncTaskExecutor-7 beginning work on 7 SimpleAsyncTaskExecutor-8 beginning work on 8 SimpleAsyncTaskExecutor-9 beginning work on 9 SimpleAsyncTaskExecutor-10 beginning work on 10 SimpleAsyncTaskExecutor-1 completed work on 1 SimpleAsyncTaskExecutor-2 completed work on 2 SimpleAsyncTaskExecutor-3 completed work on 3 SimpleAsyncTaskExecutor-5 completed work on 5 SimpleAsyncTaskExecutor-6 completed work on 6 SimpleAsyncTaskExecutor-7 completed work on 7 SimpleAsyncTaskExecutor-8 completed work on 8 SimpleAsyncTaskExecutor-4 completed work on 4 SimpleAsyncTaskExecutor-10 completed work on 10 SimpleAsyncTaskExecutor-9 completed work on 9  `

There are a few things to notice about that output. First, the processing of 10 rows at a time will repeat every 30 seconds (due to @Scheduled). Second, the work items are being processed concurrently by different threads (due to @Async). There should be a pause of roughly 5 seconds between the last "beginning work" message and first "completed work" message. If the workers were all running in a single thread, we would instead see sequential beginning/completed pairs, and the entire process would take about 50 seconds. Of course, the temporal aspect cannot be captured here in the blog entry, so you really should [download](https://src.springframework.org/svn/spring-samples/task-basic/trunk) and run the sample yourself for the full effect (the project can be imported directly into [SpringSource Tool Suite](http://www.springsource.com/products/sts) or another Eclipse-based environment with Maven support).

The last thing I want to show is the XML-based alternative for the @Scheduled annotation. The sample includes another class, SimpleProcessor, that does not contain @Scheduled on its process() method:

```java
Copy
@Service
public class SimpleProcessor implements Processor {

    private final AtomicInteger counter = new AtomicInteger();

    public void process() {
        System.out.println("processing next 10 at " + new Date());
        for (int i = 0; i < 10; i++) {
            System.out.println("   processing " + counter.incrementAndGet());
        }
    }
}
```

The XML is only slightly more verbose than the annotation-driven version, because Spring 3.0 now provides a "task" namespace to keep the configuration concise.

```xml
Copy
<context:component-scan base-package="org/springframework/samples/task/basic/xml"/>

<task:scheduled-tasks>
    <task:scheduled ref="simpleProcessor" method="process" cron="3/10 * * * * ?"/>
</task:scheduled-tasks>
```

If you run the main() method in XmlDemo, you will see that process execute every 10 seconds. For variety, this one uses a cron expression instead of the simple fixed-delay. As a result, you will notice that the timing is based on a 3 second offset (:13, :23, etc), but of course cron expressions can be much more powerful than that (I just didn't want to create a sample that would only run on certain days or times of day). It's worth pointing out that the support for cron-based scheduling is included directly within Spring 3.0 itself.

Be sure to check out the [Task Execution and Scheduling](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/htmlsingle/spring-framework-reference.html#scheduling) chapter of the Spring 3.0 [Reference Manual](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/htmlsingle/spring-framework-reference.html) to learn more about the new TaskScheduler abstraction and Trigger strategies that provide the foundation for what you've seen here. The reference manual also discusses additional elements provided by the "task" namespace for configuring TaskScheduler and TaskExecutor instances with specific thread pool settings.

I hope this post has provided a useful overview of these new features. Stay tuned to the SpringSource team blog for more Spring 3.0 related content.