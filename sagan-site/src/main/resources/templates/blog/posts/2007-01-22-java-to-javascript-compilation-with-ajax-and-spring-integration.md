---
title: Java to JavaScript Compilation with AJAX and Spring Integration
source: https://spring.io/blog/2007/01/22/java-to-javascript-compilation-with-ajax-and-spring-integration
scraped: 2026-02-24T09:32:26.633Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Alex |  January 22, 2007 | 0 Comments
---

# Java to JavaScript Compilation with AJAX and Spring Integration

_Engineering | Ben Alex |  January 22, 2007 | 0 Comments_

For some time I have been interested in client-centric, web-based user interfaces. These Generation IV frameworks are characterised by their component-based, event-driven programming model, and focus on the presentation logic residing entirely on the client. Targeting a web browser in this manner typically necessitates the use of [JavaScript](http://en.wikipedia.org/wiki/JavaScript) or [Flash](http://en.wikipedia.org/wiki/Adobe_Flash), which in itself imposes a number of unique challenges.

It is possible to address many of these challenges if we can program in Java and automatically produce a JavaScript or Flash runtime module. Two well-known products for achieving this today are [Google Web Toolkit](http://code.google.com/webtoolkit/) (GWT) and [Open Laszlo](http://www.openlaszlo.org/) respectively. Both are available under [OSI-approved licenses](http://www.opensource.org/licenses/) and have active communities, together with their own unique complexity. One consideration is to what extent they fulfil an objective of providing a transparent Java-based development environment that targets web browser deployment. This consideration has several facets, including IDE support, debugging integration, reflective capabilities, runtime widget binding and alike. All of these are normal considerations when developing rich clients using traditional Java technologies such as [Swing](http://java.sun.com/javase/technologies/desktop/) and [Standard Widget Toolkit](http://www.eclipse.org/swt/) (SWT).

The purpose of this blog entry is not to critique GWT or Open Laszlo. Instead I would like to explore an open source Java to JavaScript compiler named [Java2Script Pacemaker](http://j2s.sourceforge.net/) (J2S) and present an initial [Spring](http://www.springframework.org/) integration. This interesting project is not widely known, yet addresses transparent Java to JavaScript development in an encouraging manner. J2S ships with an incremental compiler, virtually complete JavaScript version of the java.lang, java.io and java.util packages, a JavaScript version of Junit, an Eclipse SWT JavaScript implementation, plus an AJAX library. More importantly, J2S can convert any existing Java code into JavaScript, subject to the availability of source code and dependencies also being similarly converted into JavaScript.

Focusing on technical considerations, J2S is currently differentiated from GWT in several broad ways. The first is its compiler technology, which builds on Eclipse [Abstract Syntax Tree](http://www.eclipse.org/articles/Article-JavaCodeManipulation_AST/index.html) (AST) and therefore requires [Eclipse](http://www.eclipse.org/). However, [Eclipse JDT Core](http://www.eclipse.org/jdt/core/index.php) supports a headless mode and thus it wouldn't be difficult to execute J2S compilation from an [Ant](http://ant.apache.org/) plugin or [Maven](http://maven.apache.org/) mojo. The second difference is that J2S provides comprehensive runtime reflection and widget binding capabilities. GWT prefers compile-time JavaScript optimisations, at the expense of these runtime services. J2S â on the other hand â recognises that a combination of [Moore's Law](http://en.wikipedia.org/wiki/Moore's_law), improved browser JavaScript interpreters and [JNI](http://java.sun.com/j2se/1.4.2/docs/guide/jni/)\-like JavaScript optimisations collectively provide scope for adequate performance, whilst still enjoying fuller JRE emulation and other runtime services.

Perhaps the biggest technical differentiator relates to the user interface approach. GWT provides its own Swing-like API that was designed for web browser integration. On the other hand, J2S aims to provide an implementation of SWT. There are a number of benefits evident in J2S' approach:

-   Your application can target both a rich client (in a JVM) and a web UI (in a web browser), with little to no recoding;
-   To develop and debug a J2S application is largely the same as developing and debugging an ordinary SWT application, which greatly reduces the learning curve for new developers;
-   Organisations have a good chance of engaging people with SWT skills;
-   Plenty of [literature](http://www.eclipse.org/swt/docs.php) and [community](http://www.eclipse.org/swt/community.php) [resources](http://www.eclipse.org/swt/examples.php) are available for SWT;
-   SWT is a stable and production-proven API; and
-   Both [open source](http://www.eclipse.org/vep/WebContent/main.php) and [commercial](http://www.swt-designer.com/) tools are available to help you build SWT applications.

J2S does have some limitations to consider, though. These include:

-   Download speed across the Internet can be slow. Given the majority of JEE applications are for intranet deployment, I am uncertain whether this should represent a major obstacle. Further, JavaScript compression and client caching minimise these delays.
-   Execution speed can be slow, although I haven't found it too bad once the code has downloaded. There are various optimisations available to improve speed. There is also the option of power users downloading a JVM-hosted SWT version of the user interface, which should impose limited additional development cost due to the shared SWT codebase.
-   [JFace](http://wiki.eclipse.org/index.php/JFace) is currently unsupported, and the full JRE is not emulated. A notable exception is [java.io.File](http://java.sun.com/j2se/1.4.2/docs/api/java/io/File.html). If you depend on this class, your application will not compile natively to JavaScript. Instead you'll need to use J2S' [@j2sNative](http://j2s.sourceforge.net/articles/tutorial-advanced-programming-on-j2s.html#j2snative) capability to compile the relevant classes to JavaScript. I have also encountered a couple of minor issues with the SWT implementation, but nothing too serious.
-   The J2S [community](http://groups.google.com/group/java2script/topics) is relatively small, and the framework hasn't seen wide usage to date. Still, every open source project starts small and needs to be given a chance to grow.
-   Users of IDEs other than Eclipse will be unable to use J2S in its present form. As mentioned earlier, the AST compilation model allows Eclipse JDT headless support, so this is not a major issue.

The Spring community would also understandably be interested in knowing, “does it work with Spring?”. The answer really depends on what you are trying to achieve. If you're aiming to build a standard SWT or Swing application, you would generally be using those technologies in the user interface layer to access a remote services layer. As such, your main Spring integration question concerns the availability of a suitable remoting mechanism. Spring offers you a broad choice of proven [infrastructure](http://www.springframework.org/docs/reference/remoting.html) for Java-to-Java remoting, with most projects opting for synchronous [HttpInvoker](http://www.springframework.org/docs/api/org/springframework/remoting/httpinvoker/package-summary.html), [RMI](http://java.sun.com/javase/technologies/core/basic/rmi/index.jsp) or [SOAP](http://www.w3.org/TR/soap/).

By generating a JavaScript-based client, J2S clearly requires some form of Java-to-JavaScript remoting. It is commonplace for Java-to-JavaScript remoting implementations to adopt an asynchronous approach, which means that execution continues immediately after a remoting invocation and there is a separate callback to handle the result of the invocation upon receipt. The two major approaches for Java-to-JavaScript remoting are [DWR](https://dwr.dev.java.net/) and [JSON-RPC](http://oss.metaparadigm.com/jsonrpc/), although both GWT and J2S offer their own independent remoting approaches. Neither the GWT nor J2S approaches offer Spring integration out-of-the-box, although Spring's flexible architecture makes it quite easy to do so (as I'll show you in the case of J2S below).

Before we look at the Spring implementation, let's review how the J2S AJAX remoting protocol operates. J2S adopts a quasi [command pattern](http://en.wikipedia.org/wiki/Command_pattern) for each potential remote call. The SimpleRPCRunnable superclass provides JavaScript-to-Java and Java-to-JavaScript serialization, with the subclass indicating the remote URL, fields to serialize and logic to execute remotely:

```java
Copy
public class LZ77JSSimpleRPCRunnable extends SimpleRPCRunnable {

private transient SomeServicesLayer servicesLayer; // setter omitted
public String jsContent;
public String result;

public String getHttpURL() {
return "http://localhost:8080/echotest/simplerpc";
}

public void ajaxRun() {
result = servicesLayer.computeTheAnswer(jsContent);
jsContent = null;
}
}
```

The field declarations are important. Every public non-transient field will be serialized by SimpleRPCRunnable. The getHttpURL() specifies the URL of the J2S servlet. The same URL can be used for any J2S command, making it the J2S front controller for your application. The ajaxRun() method contains the logic that will be executed on the server side. In this case, our ajaxRun() method is accessing a local (server-side) Spring bean. Note the servicesLayer field is declared transient, which means that SimpleRPCRunnable will not serialize it. Instead the Spring IoC container will dependency inject the SomeServicesLayer instance into our server-side command object. Thus, servicesLayer is always null on the J2S client side. For a client to asynchronously invoke the command, they would use code such as:

```java
Copy
SimpleRPCSWTRequest.swtRequest(new LZ77JSSimpleRPCRunnable() {

public void ajaxIn() {
jsContent = sourceText.getText();
}

public void ajaxOut() {
resultText.setText(result);
}
});
```

As shown, the ajaxIn() method is used to set the public fields to acceptable values on the client side. The ajaxOut() method is the asynchronous callback handler, meaning it is executed once the command object is returned from the server and deserialized. In this case, the command is updating a UI widget. The screen shot below shows the result of executing the command as a JVM-hosted SWT application:

![Figure 1](http://blog.interface21.com/main/wp-content/uploads/2007/01/figure1.png)

The next screen shot shows the result of executing the same command as a Firefox-hosted SWT application. No code or remoting configuration needed to change between these runtime targets, illustrating the flexibility and appeal of J2S' approach:

![Figure 2](http://blog.interface21.com/main/wp-content/uploads/2007/01/figure2.png)

SimpleRPCSWTRequest also offers two static methods for declaring whether an invocation should actually occur across the wire. SimpleRPCSWTRequest.switchToLocalJavaThreadMode() will cause the ajaxRun() method to be invoked locally, which may be appropriate if you are running in a JVM-hosted SWT application. To cause invocations to be serialized across the wire (and thus ajaxRun() to execute on the server), simply invoke SimpleRPCSWTRequest.switchToAJAXMode(). This mode is compatible with both browser and JVM target platforms, so using J2S to build multi-target user interfaces does not necessitate the use of an additional remoting protocol (eg HttpInvoker or RMI) for the JVM target.

Over on the server-side, we are not using the normal J2S SimpleRPCHttpServlet. Instead we are using a new class called SpringRpcHttpServlet (which is available as a [ZIP attachment](http://blog.interface21.com/main/wp-content/uploads/2007/01/j2s-spring-integration.zip "j2s-spring-integration"), along with the rest of the code referred to in this blog entry). SpringRpcHttpServlet operates the same as the normal SimpleRPCHttpServlet, except it sources server-side command objects from the Spring application context. The code is well documented, so take a look in the ZIP attachment if you are interested in understanding how it works in detail. Essentially it allows you to define the commands and their dependencies in a Spring application context file.

If your application requires additional commands, it's simply a case of creating a SimpleRPCRunnable subclass and then adding it to your application context. Those following my work on ROO may be interested to hear I intend to provide J2S remoting integration, freeing you from the need to write command objects or invoke via SimpleRPCSWTRequest.

In conclusion, J2S promises some attractive benefits for projects that require JavaScript compilation or a web browser implementation of SWT. It also interoperates successfully with a Spring backend. J2S' deliberate choice to leverage proven existing technologies such as AST and SWT make it a good example of reusing existing code and developer skills, in turn lowering adoption barriers and the prospect of material API change. If you consider yourself an early adopter, SWT devotee, or need a client-centric, web-based user interface that is built upon the mature SWT UI framework, it is definitely worth taking a closer look at J2S.