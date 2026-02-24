---
title: A Bridge Too Far
source: https://spring.io/blog/2007/01/16/a-bridge-too-far
scraped: 2026-02-24T09:32:35.592Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  January 16, 2007 | 0 Comments
---

# A Bridge Too Far

_Engineering | Rob Harrop |  January 16, 2007 | 0 Comments_

In my [last entry](http://blog.interface21.com/main/2006/09/29/exploiting-generics-metadata/) I presented a technique for creating strategy classes that take full advantage of any generic metadata that is present in your application. At the end of that entry I showed this code snippet:

```java
CopyEntitlementCalculator calculator = new DividendEntitlementCalculator();
calculator.calculateEntitlement(new MergerCorporateActionEvent());
```

You'll remember that DividendEntitlementCalculator was defined as:

```java
Copypublic class DividendEntitlementCalculator implements EntitlementCalculator<DividendCorporateActionEvent> {

    public void calculateEntitlement(DividendCorporateActionEvent event) {

    }
}
```

As such it is not correct to pass an instance of MergerCorporateActionEvent into the calculateEntitlement method of the DividendEntitlementCalculator class. However, as I mentioned in my last entry that code will compile. Why? Well, EntitlementCalculator.calculateEntitlement() is defined to accept any type that extends CorporateActionEvent so it *should* compile. So in this scenario what happens at runtime and how does Java enforce type safety? Well, as you might imagine running this code gives you a ClassCastException saying that you cannot cast a MergerCorporateActionEvent to DividendCoporateActionEvent. In this way, Java can enforce type safety for you application - there is no way that the MergerCorporateActionEvent can creep into a method where DividendCorporateActionEvent is expected.

The real question here is: 'Where does that ClassCastException come from?' The answer is pretty simple - the Java compiler adds the code to create and throw it as appropriate by introducing a *bridge method*. Bridge methods are synthetic methods that the compiler will generate and add to your classes to ensure type safety in the face of generic types.

In the case shown above EntitlementCalculator.calculateEntitlement can be called with any object that is type compatible with CorporateActionEvent. However, DividendEntitlementCalculator accepts only objects that are type compatible with DividendCorporateActionEvent, *but*, since you can call the DividendEntitlementCalculator via the EntitlementCalculator interface it too must accept CorporateActionEvent. So what does this translate to in the compiled class file? We have the user supplied method:

```java
Copypublic void calculateEntitlement(DividendCorporateActionEvent event) {
    System.out.println(event);
}
```

Which translates to this bytecode:

```java
Copypublic void calculateEntitlement(bigbank.DividendCorporateActionEvent);
  Code:
   Stack=2, Locals=2, Args_size=2
   0:   getstatic       #2; //Field java/lang/System.out:Ljava/io/PrintStream;
   3:   aload_1
   4:   invokevirtual   #3; //Method java/io/PrintStream.println:(Ljava/lang/Object;)V
   7:   return
```

But we also have a compiler generated method:

```java
Copypublic void calculateEntitlement(bigbank.CorporateActionEvent);
  Code:
   Stack=2, Locals=2, Args_size=2
   0:   aload_0
   1:   aload_1
   2:   checkcast       #4; //class bigbank/DividendCorporateActionEvent
   5:   invokevirtual   #5; //Method calculateEntitlement:(Lbigbank/DividendCorporateActionEvent;)V
   8:   return
```

Which translates to this Java code:

```java
Copypublic void calculateEntitlement(CorporateActionEvent event) {
    calculateEntitlement((DividendCorporateActionEvent)event);
}
```

So, here you can clearly see where the ClassCastException comes from when passing in CorporateActionEvents other than DividendCorporateActionEvents - the compiler generated *bridge method*.

Now, this is, of course, an excellent feature. We wouldn't want the addition of generics into the Java language to break the type safety that we have all been used to for so long. However, as is to be expected with these things - all is not well. The main problem with bridge methods as they are implemented in the current JDK is that annotations are not copied from the bridged method on to the bridge method. This causes all manner of problems when you inadvertently get hold of the bridge method in reflection and try to resolve some annotations.

Some of you might be wondering how you can get hold of a bridge method by mistake. This is somewhat of a complex issue. A common cause (and where we see it occur most in Spring) is where you are creating JDK proxies that delegate to some object and you try to map the method from the proxy interface onto the corresponding implementation method on the delegate (often to resolve annotations). Consider this code:

```java
Copypublic static void main(String[] args) {
    EntitlementCalculator ec = createProxy(new DividendEntitlementCalculator());
    ec.calculateEntitlement(null);
}

private static EntitlementCalculator createProxy(EntitlementCalculator calculator) {
    InvocationHandler handler = new TransactionLoggingInvocationHandler(calculator);
    return (EntitlementCalculator) Proxy.newProxyInstance(calculator.getClass().getClassLoader(),
                                                                calculator.getClass().getInterfaces(), handler);
}

private static class TransactionLoggingInvocationHandler implements InvocationHandler {

    private final EntitlementCalculator delegate;

    public TransactionLoggingInvocationHandler(EntitlementCalculator delegate) {
        this.delegate = delegate;
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Method delegateMethod = delegate.getClass().getMethod(method.getName(), method.getParameterTypes());
        Transactional annotation = delegateMethod.getAnnotation(Transactional.class);
        if(annotation != null) {
            System.out.println("Executing transactional method: " + delegateMethod);
        } else {
            System.out.println("Executing non-transactional method: " + delegateMethod);
        }
        return method.invoke(delegate, args);
    }
}
```

Here we are creating a proxy for a given EntitlementCalculator object that will log whether or not a method on the proxied object is transactional. If we annotate the DividendEntitlementCalculator class as below, we could expect the proxy to log that we are executing a transactional method when calling calculateEntitlement from main.

```java
Copy@Transactional
public void calculateEntitlement(DividendCorporateActionEvent event) {
    System.out.println(event);
}
```

However, executing the example above results in this outcome:

```java
CopyExecuting non-transactional method: public volatile void bigbank.DividendEntitlementCalculator.calculateEntitlement(bigbank.CorporateActionEvent)
```

Notice that this doesn't correspond to the method on the DividendEntitlementCalculator that we are invoking. Of course this was obviously going to be the case; the point here is that the signatures of the interface method and the delegate method *are* different. One is defined in terms of the parent type, in this case CorporateActionEvent, and the other is defined in terms of the child type, in this case DividendCorporateActionEvent. What you'll also notice is that we have actually been given the bridge method back - since its signature *does* match that of the interface method (by definition).

Perhaps a better solution to looking up the delegate method is to use the types of the passed in arguments rather than those on the interface method. When faced with arguments that use inheritance, you can simply search for a type match up the type hierarchy of the arguments. Unfortunately, this approach cannot work reliably. Consider the case where you have the following interface:

```java
Copypublic interface Foo<T> {
    void bar(T t);
}
```

And then this implementation:

```java
Copypublic class FooImpl implements Foo<Number>{

    public void bar(Number t) {
    }

    public void bar(Serializable t) {
    }
}
```

If you were to use the types of the concrete arguments passed into the InvocationHandler when resolving the delegate method, which of these methods would you choose when faced with an argument of type Integer? You can't tell (from the interface method) that the type parameter is Number and since both methods are type compatible with Integer, it's going to be impossible to resolve the correct method all the time in a general fashion.

There are *only* two ways (that I know of) for solving this problem. The first method involves using a library like [ASM](http://asm.objectweb.org/) to read the bytecode of the bridge method and find out which method it calls. The use of ASM to read bytecode is a great solution and it is generally foolproof. However, in secure environments it can require read permissions to libraries that are not allowed which may prove to be problematic. The second solution involves using the generic metadata in the bridge method to resolve which of the methods in the implementation class is being bridged.

In the example above we can see that the interface method is bar parameterized by T. We can use the generic interface metadata (Class.getGenericInterfaces()) of FooImpl to determine that T is realised as Number. From there it is a simple step to know that the bridged method is bar(Number) and not bar(Serializable). Unfortunately, this method gets increasingly more complex in the face of complex hierarchies involving multiple type parameters with bounds. Fortunately, this logic is encapsulated in Spring's BridgeMethodResolver class. This is a perfect example of Spring solving the hard infrastructure problems that Java developers face and integrating them into the application stack. Any time an annotation lookup is performed in Spring, bridge methods are transparently resolved.

The implementation of BridgeMethodResolver is largely complete; however, I am sure there are some complex cases that we have not yet accounted for and I'll be happy to hear from users who are encountering any problems in this area.