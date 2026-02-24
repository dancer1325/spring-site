---
title: Debunking myths: proxies impact performance
source: https://spring.io/blog/2007/07/19/debunking-myths-proxies-impact-performance
scraped: 2026-02-24T09:25:41.820Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  July 19, 2007 | 7 Comments
---

# Debunking myths: proxies impact performance

_Engineering | Alef Arendsen |  July 19, 2007 | 7 Comments_

In a recent blog entry Marc Logemann [touches on the subject of proxy performance](http://www.logemann.org/2007/07/16/how-much-slower-is-spring-proxies-compared-to-plain-pojo/). In his entry he asks for a white paper by 'the Spring guys'. I don't want to spend (p)ages and (p)ages on discussing the differences up to the nanosecond between proxies and byte code weaving mechanisms, but I do think it's valuable to re-iterate once again what the differences are and whether or not this discussion matters at all.

## What are proxies and why do we use them?

Let's first shortly revisit what proxies are used for (in general, and in Spring). According the Gang of Four (GoF) [book on Design Patterns](http://www.amazon.com/exec/obidos/tg/detail/-/0201633612) a proxy is a surrogate object or placeholder for another object to control access to it. Because the proxy sits in between the caller of an object and the real object itself, it can decide to prevent the real (or target) object from being invoked, or do something before the target object is invoked. ![prox.jpg](http://blog.interface21.com/main/wp-content/uploads/2007/07/prox.jpg)

In other words, proxies can be used as stand-ins for real objects to apply extra behavior to those objects--be it security-related behavior, caching or maybe performance measurements.

Many modern frameworks use proxies to realize functionality that would not have been possible otherwise. Many object-relational mappers use proxies to implement behavior that prevents data from being loaded until it is actually really needed (this is sometimes called lazy loading). Spring also uses proxies to realize some of its functionality such as its remoting facilities, its transaction management facilities and the AOP framework.

An alternative to proxies is byte code weaving. When using byte code weaving mechanisms, there will never be a second object (aka the proxy). Instead, if behavior (such as transaction management or security) needs to be applied, it is woven 'into' the existing code, instead of 'around it'. One way to do do the weaving process is by using the Java5 -javaagent flag. Other ways are available to.

In other words: with proxies you end up with a proxy object that sits in front of the target object, whereas with a byte code weaving approach, there will not be a proxy that has to delegate calls.

## The cold hard truth

Okay, let's get it over with: proxies add overhead to a plain method invocation... significant overhead. To my mind, that's absolutely not surprising. The fact that putting a proxy in between is totally natural. Generally one could say that an intermediate always adds overhead. Now the question is: **what do we get in return for the overhead a proxy adds?**

Note that I'm not going to bother with providing numbers here. As Stefan Hansel correctly points out in [his comment on Marc's blog](http://www.logemann.org/2007/07/16/how-much-slower-is-spring-proxies-compared-to-plain-pojo/), micro benchmarks measuring the difference between plain target invocation versus having a proxy in between (or any micro benchmark for that matter) don't really make sense because of a whole bunch of other factors that you have to take into account as well.

### Okay, but you **do** want numbers?

Okay, let's get to it then. Let's consider the following piece of code where we have two objects, one which is proxied, one which is not. Let's assume the target object itself (the dotIt()) method does not do anything in particular. Let's also assume the proxy does not do any in particular also (it just delegates to the target object).

If I run this code on my laptop (MacBook) with a plain JDK dynamic proxy (more about those later), then one method invocation to *myRealObject* takes 9 nanoseconds (10\-9). One invocation to the proxied object takes 500 nanoseconds (about 50 times as slow).

```java
Copy
// real object
MyInterface myRealObject;
myRealObject.doIt();

// proxied object
MyInterface myProxiedObject;
myProxiedObject.doIt();
```

In contrast, if I a byte code weaving approach (in this case I'm using AspectJ to simulate the same setup), I only end up with about 2 nanoseconds added to my invocation.

So concluding, I can't make it any better than it is: proxies add significant overhead to a plain method invocation.

Before we go on let's first realize that the overhead that's being added here is **fixed**. It is definitely **not** the case that if the doIt() method itself would take 5 seconds, the proxied invocation would take 50 times as long. No, instead, the invocation would take 5 seconds + ~500 nanoseconds.

## Putting things in context (or: should you care?)

Okay, so now we know proxies aren't some kind of super-fast objects that work their magic without causing side-effects, the question is: "do we need to worry about the overhead". The answer is pretty simple: "no you don't" ;-). I'll explain you why.

We're using proxies to transparently add behavior to an object. Maybe to decorate an object with security rules (administrators can access it, but normal users can't) or maybe it's because we want to enable lazy loading, only loading data from a database on first access. Another reason would be to enable transparent transaction management for our objects.

### Transaction management

Let's look at the transaction management example. The following sequence diagram roughly depicts (a simplified view of) what happens in a situation where a service is called whereby beforehand a transaction is started and after successful completion the transaction is committed. ![seq.jpg](http://blog.interface21.com/main/wp-content/uploads/2007/07/seq.jpg)

The invocation of the service itself now definitely involve a certain overhead (the overhead we already discussed before). The question however is, what do we get in exchange for the overhead?

### Benefits realized

If we continue to look at the above example, we've realized a couple of benefits.

**Code simplification** We've greatly simplified our code by putting a proxy in between. If we use the @Transactional annotation Spring provides, all we need to do is the following:

```java
Copy
public class Service {

  @Transactional 
  public void executeService() { }

}
```

and

```xml
Copy
<tx:annotation-driven/>

<bean class="com.mycompany.Service"/>
```

An alternative (programmatic) approach would involve significantly modifying either the client (caller) or the service class itself.

**Centralized transaction management** Transaction management is now taken care of by a central facility, allowing for much more optimization and a very consistent approach to doing transaction management. This would not have been possible if we'd have implemented the transaction management code in our service or caller itself.

### And what does it matter anyway?

If that's not enough, we can always start looking at the actual performance degradation that we get from the proxying mechanism and compare it to the actual time it takes to start and/or commit a transaction. I don't have any numbers available, but I can assure you, committing a transaction on a JDBC transaction definitely takes more time than 491 nanoseconds.

### But what if it's very fine-grained operations the proxy executes

Ahh! That's an entirely different story. There are different classes of behavior you can transparently add of course (either using proxies or using a byte code weaving approach). I usually distinguish between fine-grained and coarse-grained behavior. Coarse-grained behavior to my mind is applied at a service level or only to a certain and limited set of operations in our application. A more fine-grained set of behavior would for example include logging of every method in our system. I would definitely not choose to use a proxy-based approach for such fine-grained approaches.

### Rules of thumb

Concluding we can say the following:

-   first of all proxies add overhead and that this overhead is negligible if the behavior applied to the objects that are proxied has something to do with longer running operations (such as database or file access or transaction management).
-   We can also say that if you need very fine-grained behavior and want to apply that to a large set of objects, it's probably safer to go for a byte code weaving approach, such as AspectJ.
-   If that's not enough, it's probably still safe to say that proxying (unless applied to thousands or more objects in your system) would never be the first place you should look for in a system that suffers from degraded performance.
-   Another rule of thumb might possibly be that any request in your system should probably not involve (calls to) more than 10 (or so) proxied methods. **10 proxy operations \* 500 ns per proxy operation = 5 microseconds** (which is still negligible I would say), but **100,000 proxy operations \* 500 ns per proxy operation = 50 millisecond** (which to my mind is no longer negligible).

## Different types of proxies

Apart from the discussion about whether or not proxies add overhead at all, it's also relevant to shortly discuss different types of proxies. There are several distinct types of proxies. In my little benchmark, I've used the JDK dynamic proxying infrastructure (from the java.lang.reflect package) that is only capable of creating proxies for interfaces. Another proxying mechanism is CGLIB which uses a slightly different approach to proxying. The last time I did a small performance benchmark between the two, I didn't really find a significant difference and frankly, I don't care that much. What is important is the inner workings of the proxy that has been created. There are a lot of things that can go wrong if you start implementing proxies yourself. If you compare the following two pieces of code for example you might not expect there to be a **huge** difference in performance between the two. And when I'm saying huge, I'm saying a factor 10 or so...

```java
Copy
public Object invoke(Object proxy, Method proxyMethod, Object[] args)
throws Throwable {
	Method targetMethod = null;
	if (!cachedMethodMap.containsKey(proxyMethod)) {
		targetMethod = target.getClass().getMethod(proxyMethod.getName(), 
			proxyMethod.getParameterTypes());
		cachedMethodMap.put(proxyMethod, targetMethod);
	} else {
		targetMethod = cachedMethodMap.get(proxyMethod);
	}
	Ojbect retVal = targetMethod.invoke(target, args);
	return retVal;
}
```

```java
Copy
public Object invoke(Object proxy, Method proxyMethod, Object[] args)
throws Throwable {
	Method targetMethod = target.getClass().getMethod(proxyMethod.getName(), 
			proxyMethod.getParameterTypes());
	Ojbect retVal = targetMethod.invoke(target, args);
	return retVal;
}
```

In other words, leave generating or creating proxies to people or frameworks that know what they're doing. Fortunately for you, I wasn't involved in the proxy design and Rob, Juergen, Rod et. al. are way better at that than I am, so no worries there ;-).

## What about byte code weaving

In general, one can say that a byte code weaving approach takes a little more time to set up depending on your environment. In some scenarios you need to set up a java agent, in other situations, you might need to modify your compilation process, other frameworks might require the use of a different class loader. In other words, byte code weaving is a little harder to set up. In my experience, (as always) the 80-20 rule applies here as well. 80% of all requirements can probably be solved using proxy-based systems. For the last mile, or the remaining 20%, opting for a byte code weaving approach might be a good option.

## The relation with AOP

You might wonder why I haven't touched on the subject of AOP yet. Proxies and byte code weaving have a strong relation to AOP. Or maybe that's the other way around. In any case, Spring's AOP framework *uses* proxies to realize its functionality. Proxies to my mind are just an implementation detail (although a pretty important one) is strongly linked with AOP and Spring in general.

## Conclusion

Concluding, we can say that proxies do add a little bit of overhead to a call to an object it proxies but that the discussion about this is not relevant under most circumstances. The reason for this lies partially in the great benefits proxies bring (such as way better maintenance of our code due to code simplification and centralized control) and also in the fact that things we do using proxies (such as transaction management or caching) usually have a far greater impact on performance as the proxying mechanism itself.