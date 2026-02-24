---
title: OSGi Test Stubs 1.0.0.M1
source: https://spring.io/blog/2009/06/23/osgi-test-stubs-1-0-0-m1
scraped: 2026-02-24T09:06:27.733Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  June 23, 2009 | 1 Comment
---

# OSGi Test Stubs 1.0.0.M1

_Engineering | Ben Hale |  June 23, 2009 | 1 Comment_

I'm pleased to announce the 1.0.0.M1 release of SpringSource's OSGi Test Stubs.  These stubs offer a way to unit test complex OSGi Framework interactions without needing a full OSGi container.

-   Package - [Download](http://www.springsource.com/download/community?project=SpringSource%20OSGi%20Test%20Stubs)
-   Git - [git://git.springsource.org/osgi-test-stubs/osgi-test-stubs.git](git://git.springsource.org/osgi-test-stubs/osgi-test-stubs.git)

## The Problem

As the dm Server team has been developing, we found that one of the biggest problem areas for testing for us was in [BundleActivator](http://www.osgi.org/javadoc/r4v41/org/osgi/framework/BundleActivator.html)s.  Our BundleActivators do quite a bit of publishing services to the service registry as well as consuming services using [ServiceTracker](http://www.osgi.org/javadoc/r4v41/org/osgi/util/tracker/ServiceTracker.html)s.  These kinds of tasks involve many interwoven calls to [BundleContext](http://www.osgi.org/javadoc/r4v41/org/osgi/framework/BundleContext.html)s, [Bundle](http://www.osgi.org/javadoc/r4v41/org/osgi/framework/Bundle.html)s, [ServiceRegistration](http://www.osgi.org/javadoc/r4v41/org/osgi/framework/ServiceRegistration.html)s, and [ServiceReference](http://www.osgi.org/javadoc/r4v41/org/osgi/framework/ServiceReference.html)s.  In the beginning, these activators were simple enough that not much unit testing was done on them, and we depended on integration tests to catch any bugs that were introduced.  As time went on though, the activators became more complex and unit testing became a more pressing need.  We started using EasyMock for these tests, but found that they were very complex, hard to maintain, and most importantly hard to understand.

```java
Copy@Test
public void startAndStop() throws Exception {
    BundleActivator bundleActivator = new DumpBundleActivator();
    BundleContext context = createMock(BundleContext.class);
    Filter filter = createMock(Filter.class);
    
    String filterString = "(objectClass=" + DumpContributor.class.getName() + ")";
    
    expect(context.createFilter(filterString)).andReturn(filter);
    context.addServiceListener((ServiceListener)anyObject(), eq(filterString));
    expect(context.getServiceReferences(DumpContributor.class.getName(), null)).andReturn(new ServiceReference[0]).atLeastOnce();
    
    ServiceRegistration generatorRegistration = createMock(ServiceRegistration.class);
    ServiceRegistration summaryRegistration = createMock(ServiceRegistration.class);
    ServiceRegistration jmxRegistration = createMock(ServiceRegistration.class);
    ServiceRegistration threadRegistration = createMock(ServiceRegistration.class);
    ServiceRegistration heapRegistration = createMock(ServiceRegistration.class);
    
    expect(context.registerService(eq(DumpGenerator.class.getName()), isA(StandardDumpGenerator.class), (Dictionary<?,?>)isNull())).andReturn(generatorRegistration);
    expect(context.registerService(eq(DumpContributor.class.getName()), isA(SummaryDumpContributor.class), (Dictionary<?,?>)isNull())).andReturn(summaryRegistration);
    expect(context.registerService(eq(DumpContributor.class.getName()), isA(JmxDumpContributor.class), (Dictionary<?,?>)isNull())).andReturn(jmxRegistration);
    expect(context.registerService(eq(DumpContributor.class.getName()), isA(ThreadDumpContributor.class), (Dictionary<?,?>)isNull())).andReturn(threadRegistration);
    expect(context.registerService(eq(DumpContributor.class.getName()), isA(HeapDumpContributor.class), (Dictionary<?,?>)isNull())).andReturn(heapRegistration);
    
    generatorRegistration.unregister();
    summaryRegistration.unregister();
    jmxRegistration.unregister();
    threadRegistration.unregister();
    heapRegistration.unregister();
    
    context.removeServiceListener((ServiceListener)anyObject());
    
    replay(context, filter, generatorRegistration, summaryRegistration, jmxRegistration, threadRegistration, heapRegistration);
    
    bundleActivator.start(context);
    bundleActivator.stop(context);
    
    verify(context, filter, generatorRegistration, summaryRegistration, jmxRegistration, threadRegistration, heapRegistration);
}
```

## The Solution

It quickly became clear that maintaining code that looked like this wasn't going to work in the long term. As many users know, Spring has long had an incredibly useful set of [test stubs](http://static.springsource.org/spring/docs/2.5.x/reference/testing.html#mock-objects) and it became clear that we needed something similar for OSGi.

Creating a set of test stubs is a delicate balancing act, especially when it comes to an API as complex as the OSGi Framework. On one hand, you need the implementation to be simple enough that you are not likely to introduce bugs and you can allow the user to specify the behavior and return values of the calls. On the other hand, you need a sophisticated enough implementation that complex objects (such as the ServiceTracker) can get expected behavior when they call the stub.

With all this in mind, I set off implementing test stubs for BundleContext, Bundle, ServiceReference, and ServiceRegistration. To get an idea of what kind of difference these test stubs make, here's the previous test after converting it to use the stubs.

```java
Copy@Test
public void startAndStop() throws Exception {
    BundleActivator bundleActivator = new DumpBundleActivator();
    StubBundleContext bundleContext = new StubBundleContext().addFilter(new ObjectClassFilter(DumpContributor.class));

    bundleActivator.start(bundleContext);
    assertServiceListenerCount(bundleContext, 1);
    assertServiceRegistrationCount(bundleContext, DumpGenerator.class, 1);
    assertServiceRegistrationCount(bundleContext, DumpContributor.class, 4);

    bundleActivator.stop(bundleContext);
    assertCleanState(bundleContext);
}
```

As you can see this test is now much simpler to read and maintain, but most importantly it's more understandable. The basic building block of this test is the StubBundleContext. This context is passed into the DumpBundleActivator's start call where services are registered. But it's the assertions where things really get interesting.

Using the StubBundleContext, it is possible for the user to assert everything they'd need to for testing. However, the test stubs package also includes an OSGiAssert class that makes typical assertions more readable. In this case, you can see that after calling start we want to have one ServiceListener registered, one DumpGenerator service registered, and four DumpContributor services registered. After calling stop we want to make sure that everything is cleaned up and the system is left in a clean state.

## The Future

There are many more ways to manipulate the stub types as well as some more assertions for common test cases. I should warn that what is available now is by no means exhaustive. I'm always looking for user requirements on ways that these stubs can be improved and assertions that can be added. Please download the package or clone the source code and give me feedback in the comments and suggestions at the [dm Server JIRA](https://issuetracker.springsource.com/browse/DMS).