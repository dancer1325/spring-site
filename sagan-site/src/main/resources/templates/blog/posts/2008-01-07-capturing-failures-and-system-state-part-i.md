---
title: Capturing failures and system state (part I)
source: https://spring.io/blog/2008/01/07/capturing-failures-and-system-state-part-i
scraped: 2026-02-24T09:21:58.985Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  January 07, 2008 | 0 Comments
---

# Capturing failures and system state (part I)

_Engineering | Alef Arendsen |  January 07, 2008 | 0 Comments_

At The Spring Experience, I hosted a session various aspects. One of them was the [Hibernate synchronization aspect](http://blog.interface21.com/main/2008/01/04/before-a-jdbc-operation-flush-the-hibernate-session-includes-tse-example-code/) that I described last week. Another was an aspect capable of capturing first failures and system state, sometimes called First-Failure Data Capture (FFDC). I hosted this session to show off some aspects that are very useful, but that people might not have come across in practice yet. I often hear people asking about aspects other than logging, tracing, transaction management and security. The Hibernate synchronization aspect and the FFDC aspect are nice examples I think.

## Introduction

The objective of FFDC is to capture as much information about the current state of the system when an error occurs. The following entry explains how this aspect works and how you can use in your own applications.

Let's set the following two goals:

-   When a failure escapes from a business service, we want to log the call context, meaning all calls that have happened in the context of this execution of the business service
-   When a failure escapes from a business service, we want to log the root cause of the failure, meaning not only the top-most exception (the exception that escaped from the method), but also the *first* exception that was thrown that might have been wrapped, swallowed or re-thrown

In order to do this, first let's devise a class that is capable is keeping track of the data for us that we want to record. We will call this class the CallContext. I'm omitting the actual implementation. I'll post the code in my next entry, the implementation does not really matter here and other than that, it's a pretty straightforward data holder anyway.

```java
Copy
public class CallContext {

	/**
	 * Registers the root call of this call context.
	 * We want to distinguish between the root call
	 * and all subsequent calls issued in the context
	 * of the root call.
	 */
	public void setRootCall(JoinPoint rootCall) { ... }
	
	/**
	 * Registers a call at a certain depth.
	 * @param the call to register
	 * @param the depth of the call
	 */ 
	public void registerCall(JoinPoint call, int depth) { ... }
	
	/**
	 * Registers the first failure of this call context.
	 * A first failure might already have occurred in which
	 * case subsequent registrations of the same or different
	 * failures will be ignored.
	 */
	public void setFirstFailure(Throwable t) { ... }
	
	/**
	 * Log the entire call context (i.e. output it to
	 * System.out).
	 */
	public void log(Throwable t) { ... }
}
```

As you can see, we are using the AspectJ [JoinPoint](http://www.eclipse.org/aspectj/doc/released/runtime-api/org/aspectj/lang/JoinPoint.html) type to identify an event happening in a program.

## Defining four scenarios

So, we've got the data ready. Next, let's rephrase the two goals we've set previously a little bit and create a list of things that we want to have happening in our program(s):

-   Before a call to a business service, we want to register the root call with the current call context
-   Before a call in the context of a business service, we want to register the (and the current depth) call with the current call context
-   When an exception occurs inside a business service, register it with the current call context as the first failure
-   After an exception escapes from a business service, we want to log the current call context

As you can see, I'm just slicing and dicing things a little in such a way that sentences in the form of 'before/after *something* happens, do *something*' start appearing. The only thing left to do is to identify the two *somethings* and we're done. Let's tackle each of the three different pieces of logic individually.

### Before a business service, register the root call with the current context

Using AspectJ, this is relatively simple to do. Let's assume a business service can be identified by a @BusinessService annotation that can be added to a method or a class. In case it's added to a class, all methods on that class are business services. In case it's added on to a method, that method alone is a business service. In other words: a business service is *a method defined in a class that in its turn is annotated by @BusinessService* or *a method that is annotated by @BusinessService itself*. In AspectJ this comes down to the following (for more information on the exact syntax of the AspectJ pointcut expression language, refer to [http://www.eclipse.org/aspectj//doc/released/progguide/semantics-pointcuts.html](http://www.eclipse.org/aspectj//doc/released/progguide/semantics-pointcuts.html)).

```java
Copy
pointcut businessService() : call(* (@BusinessService *..*).*(..)) || call(@BusinessService * *(..));
```

Now we have identified a business service, we can finish the first scenario:

```java
Copy
public aspect FirstFailureDataCapturer {

	public CallContext callContext = new CallContext();
	
	pointcut businessService() : call(@BusinessService *..*).*(..)) || 
			call(@BusinessService * *(..));
	
	before() : businessService() {
		// 'thisJoinPoint' is an implicit variable (just like 'this')
		// that represents the current join point
		this.callContext.setRootCall(thisJoinPoint);
	}
}
```

### Before a call in the context of a business service, register it with the current call context

We're done with the first scenario, let's tackle the second scenario. We have already identified what it means to be a business service. We want to trap all calls in the context of business services. An arbitrary call can be identified as follows:

```java
Copy
pointcut methodCall() : call(* *(..));
```

If we'd use this pointcut, we'd make the scenario applicable to *all methods*, but we only want to apply it to methods inside business services. Therefore we need to limit the scope of this pointcut. We can do that by using the *cflow* pointcut designator. The *cflow pointcut designator* takes another pointcut and limits to the things happening in the context of that pointcut. Let's see how we can use it to solve the problem at hand. Read the following as: 'a method call in a business service is a method call (refer to pointcut defined above) while (and) in the control flow of a business service (refer to other pointcut defined earlier'.

```java
Copy
pointcut methodCallInBusinessService() : methodCall() && cflow(businessService());
```

Let's go one step further and say that we do not want to register *all* method calls, but only a limited set. The following defines a traceable method, identifying only methods that I thought are relevant. It also excludes methods defined in the aspect itself (or in the control flow of the aspect). The latter prevents endless loops from occurring. Let's read this out aloud as well: a traceable method is a method call in a business service (refer to pointcut defined above) while not (and not) in the control flow of an executing advice defined in the FirstFailureDataCapturer and it should also not be a call to equals(), hashCode() or getClass().

```java
Copy
pointcut traceableMethod() : 
	methodCallInBusinessService() &&
	!cflow(within(FirstFailureDataCapturer) && adviceexecution()) &&
	!call(* equals(Object)) && !call(* hashCode()) && !call(* getClass());
```

Let's use this pointcut to implement the second scenario that we've identified. In the description of the scenario above, we have not specified that we also need to keep track of the current depth. We're using a before advice to log the current call. Let's also use that same advice to keep track of the depth and let's use an after advice to reset the depth to it's previous state.

```java
Copy
public aspect FirstFailureDataCapturer {

	public CallContext callContext = new CallContext();
	
	public int currentDepth = 0;
	
	// other pointcuts and advices omitted

	pointcut methodCallInBusinessService() : methodCall() && cflow(businessService());
	
	pointcut traceableMethod() : 
		methodCallInBusinessService() &&
		!cflow(within(FirstFailureDataCapturer) && adviceexecution())) &&
		!call(* equals(Object)) && !call(* hashCode()) && !call(* getClass());
		
	before() : traceableMethod() {
		currentDepth++;
		callContext.registerCall(thisJoinPoint, currentDepth);
	}
	
	after() : traceableMethod() {
		currentDepth--;
	}
}
```

### When an exception occurs inside a business service, register it with the current call context

Now that we're done with the second scenario, we've captured almost all state that we want to capture. The last thing that we wanted to capture was the first exception occurring in the context of that same business service.

A potential failure point is a) an exception escaping from a method or b) an exception handler inside a method (and then wrapped, swallowed, possibly re-thrown, et cetera). Let's use this definition to implement our third scenario. The first pointcut just uses the traceable method pointcut to identify potential failure points. We'll use after throwing advice in a minute to finish part of our scenario. The second is a little more interesting. It defines a pointcut that identifies exception handler (catch blocks) in the control flow of business services. Using this pointcut, we can identify excpetion that are caught, wrapped and re-thrown for example (or caught and swallowed).

```java
Copy
pointcut potentialFailurePoint() : traceableMethod();
	
pointcut exceptionHandler(Throwable t) : handler(*) && args(t) && cflow(businessService());
```

We'll use after before and after advice to finish the third scenario. First: before an exception handler, log the exception:

```java
Copy
public aspect FirstFailureDataCapturer {

	private CallContext context = new CallContext();

	// other members omitted

	before(Throwable t) : exceptionHandler(t) {
		this.callContext.setFirstFailure(t);
	}
}
```

And now, let's define the other advice:

```java
Copy
public aspect FirstFailureDataCapturer {

	private CallContext context = new CallContext();

	// other members omitted

	after() throwing(Throwable t) : potentialFailurePoint() {
		this.callContext.setFirstFailure(t);
	}
}
```

### After an exception escapes from a business service, log the current call context

The last thing we need to do is logging the current call context in case a business service execution results in an exception. We already have all the ingredients (the pointcuts) to skip straight on to the advice, so let's go ahead:

```java
Copy
public aspect FirstFailureDataCapturer {

	private CallContext context = new CallContext();

	// other members omitted

	after() throwing(Throwable t) : businessService() {
		this.callContext.log(t);
	}
}
```

## Using the CarPlant as an example

In my session at The Spring Experience I used my (infamous) CarPlant example to show the FirstFailureDataCapturer. The CarPlant is a relatively small system that is capable of manufacturing cars. Manufacturing cars is a two-step process: 1) getting parts from a CarPartsInventory system and 2) asking the CarAssemblyLine to assemble the parts into a Car. The CarPlant itself:

```java
Copy
@BusinessService public Car manufactureCar(CarModel model) {
	Set <Part> parts = inventory.getPartsForModel(model);
	
	return assemblyLine.assembleCarFromParts(model, parts);
}
```

The CarPartsInventory in this example is a stub and does not really do anything useful:

```java
Copy
public Set<Part> getPartsForModel(CarModel model) {
	return new HashSet<Part>();
}
```

The interesting bit here is the CarAssemblyLine. As you can see in the code below, the CarAssemblyLine has some strange code in it. It first throws an exception, catches it itself and then re-throws it as a pretty MeaninglessException.

```java
Copy
public Car assembleCarFromParts(CarModel model, Set<Part> parts) {
		
	try {
		throw new OnStrikeException("The workers are on strike!");
	} catch (OnStrikeException e) {
		throw new MeaninglessException();
	}
}
```

Obviously, under normal circumstances, the real cause of the problem, the root cause would never be identified in this case (it's caught, not logged... a different exception is thrown and the root cause is not passed along), and we'd also never be able to register the system state *exactly* at the point the real and first failure (the OnStrikeException) occurred. Fortunately now we have the FirstFailureDataCapturer, we can register the root cause and log it. Below you can find a sequence diagram and some output of a test that I ran. As you can see, we do not just get the call stack, but **all calls that occurred in the context of this business service execution**, or in other words: the entire call tree.

![ffdc.png](http://blog.springsource.com/main/wp-content/uploads/2008/01/ffdc.png)

## Capturing system state

If you look carefully, you can see the first exception that is dumped is the MeaninglessException. Right after the MeaninglessException has been dumped however there's a message saying that there is a root cause that's different from the MeaninglessException and then the real exception is dumped. The stack trace also mentions that the real exception was caused at line 18, whereas the MeaninglessException originated at line 20.

Now we have identified the *real* point where failure occur, we can also start capturing system state. As you can imagine, the system state at CarPlant:18 might differ from the system state at CarPlant:20 and our FirstFailureDataCapturer allows us to register the system state at the *correct point in time*.

So what is system state anyway? Well, that all depends on the runtime, your specific application and what you are interested in. A couple of examples:

-   The currently logged on user
-   The current car manufacturing request
-   Any technical system state (amount of threads, caching statistics, et cetera)
-   The node this exception occurred on

Capturing system state is now very easy and we can do this inside the CallContext.setFirstFailure() method for example.

## What about part II??

This aspect is not done yet! The first time the complete aspect came in the picture it was coded up as follows:

```java
Copy
public aspect FirstFailureDataCapturer {

	public CallContext callContext = new CallContext();
	
	pointcut businessService() : call(@BusinessService * *(..)) || call(* (@BusinessService *..*).*(..)) || call(@BusinessService * *(..));
	
	before() : businessService() {
		// 'thisJoinPoint' is an implicit variable (just like 'this')
		// that represents the current join point
		this.callContext.setRootCall(thisJoinPoint);
	}
}
```

As you can see, the call context is instantiated when the FirstFailureDataCapturer is instantiated. The question of course now is: *when and how many times will the FirstFailureDataCapturer be instantiated*? And, when you've answered this question, another question might come to mind: *what happens if this aspect is used in a multi-threaded environment?* In the next part I'll discuss all of this and make some other changes to the aspect to polish it a bit. In the meantime, you can always try to answer those questions in the comments of course :)! I'll also provide the source code for the aspect in the next part.