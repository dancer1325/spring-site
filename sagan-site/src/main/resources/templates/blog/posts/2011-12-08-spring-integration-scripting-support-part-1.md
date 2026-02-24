---
title: Spring Integration Scripting Support - Part 1
source: https://spring.io/blog/2011/12/08/spring-integration-scripting-support-part-1
scraped: 2026-02-24T08:30:56.140Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | David Turanski |  December 08, 2011 | 0 Comments
---

# Spring Integration Scripting Support - Part 1

_Engineering | David Turanski |  December 08, 2011 | 0 Comments_

Spring Integration scripting support, available in the 2.1 release, builds upon the Groovy scripting support introduced in 2.0.  If you are familiar with Spring Integration, consider scripting support as another tool in your toolbox that you will find useful in certain situations.  If you have existing code written in languages such as Groovy, Python, Ruby, or Javascript and need to integrate them with each other or into a Java application,  Spring Integration provides a simple way to do this.  Whatever the case, this post covers the basics to get you started using your favorite scripting language with Spring Integration.

### **Scripting vs SpEL**

If you are already using Spring Integration, you are probably  familiar with it's built-in support for the [Spring Expression Language (SpEL)](http://static.springsource.org/spring/docs/current/spring-framework-reference/html/expressions.html). This provides a light weight alternative to providing a Spring bean to implement simple integration functionality such as transformation, content-based routing, or filtering.  The following example shows how SpEL is used to implement a simple transformer that converts a message payload to upper case and appends a string containing the current time.  Spring Integration automatically binds the Message as the expression context so its *payload* and *headers* properties may be referenced in the expression.  Also note how you can incorporate external java classes (java.lang.System) into the SpEL expression.

```xml
Copy
<int:transformer input-channel="inChannel"
   output-channel="outChannel"
   expression="payload.toUpperCase() + '- [' + T(java.lang.System).currentTimeMillis() + ']'"/>
```

This is a common pattern in Spring Integration. Many of the endpoints provided out of the box include the *expression* attribute whose contents is interpreted as a SpEL expression that operates on the Message.

The same thing may be accomplished with an inline script, written in Ruby for example:

```xml
Copy
<int:transformer input-channel="inChannel"
    output-channel="outChannel">
    <int-script:script lang="ruby">
      "#{payload.upcase} -[#{Time.now.to_i}]"
    </int-script:script>
</int:transformer>
```

Observe that the body of the script is enclosed within the *script* tag defined in the scripting namespace introduced in Spring Integration 2.1.  The *lang* attribute specifies the scripting language (more on that later).  Similar to SpEL, the message payload and headers are automatically bound as script variables.

If the endpoint implementation requires only a single expression, as in the above example, most people will find SpEL a little more convenient than an inline script.  However, as we will see, scripting  offers additional power and flexibility when needed.

### Scripting Basics

The simple example above illustrates how to use an inline script in Spring Integration.  In some cases, it is advisable to enclose the body of the script in a CDATA section:

```xml
Copy
<router input-channel="inlineScriptInput">
<int-script:script lang="javascript"><![CDATA[
     (function(){
      return payload.length > 5 ? "longStrings" : "shortStrings";
     })();
   ]]>
   </int-script:script>
</router>
```

This is especially true for languages, such as Python, in which line breaks and indentations are part of the syntax.  However, you may also reference an external script with the *location* attribute :

```xml
Copy
<script:script lang="groovy" location="file:scripts/groovy/myscript.groovy">
```

As with any Spring resource, you may specify a location on the classpath, the file system, or a web application context.  Using an external script opens up some additional capabilities. For starters, you can provide custom variable bindings to provide additional inputs to the script. These may be primitive types or Spring beans:

```xml
Copy
<int:service-activator ...>
   <int-script:script language="python" location="authorizeCredit.py" refresh-check-delay="60">
      <int-script:variable name="creditService" ref="creditService"/>
      <int-script:variable name="maximumAmount" value="1000.00"/>
   </int:script:script>
</int:service-activator>
<bean id="creditService" class="com.example.CreditService">
...
</bean>
```

Another option provided with external scripts is the ability to periodically update the script contents at runtime.  For example,  if a script is updated on the file system the application context can refresh the script in near real time. To enable this feature simply provide the optional *refresh-check-delay* attribute, as shown above,  with a value is specified in seconds.  If the value is 0, the refresh happens immediately.  A value less than zero disables refresh.

### Under the Hood

Spring Integration's scripting support is backed by the JSR223 scripting engine included in Java 6.  Java implements standard APIs required to use JSR233 compliant scripting engines developed by third party providers.  Java 6 does not mandate any particular scripting language but the JDK and JRE does include the Mozilla Rhino Javascript engine.  Scripting engines for other languages require external dependencies such as Groovy, JRuby, and Jython.   If you want to use Python you need  to add the jython library as a runtime dependency in your Maven pom file, for example.

Likewise, Spring Integration does not mandate or endorse any particular scripting language. We have successfully tested the spring-integration-scripting module with the above languages but your mileage may vary depending on the nuances of the implementation.  As with other JSR specifications, compliance is subject to interpretation.  Additionally, each language implementation must provide a way to import and access Java classes from a scripting environment.  How this is done is not part of the JSR223 specification.

For example, one minor limitation arises when using Python with Spring Integration. When executing a script, the value returned is expected to be the value of the last executed expression in the main body of the script. Many object oriented scripting languages support return statements in "bare" scripts.  And the return may be implicit or explicit (the 'return' keyword is optional).  Let's take another look at the first example:

```xml
Copy
<int:transformer input-channel="inChannel"
    output-channel="outChannel">
    <int-script:script lang="ruby">
    "#{payload.upcase} -[#{Time.now.to_i}]"
    </int-script:script>
</int:transformer>
```

The body of the script is a single expression with an implicit return.  We could just as well use an explicit return:

```xml
Copy
<int:transformer input-channel="inChannel"
    output-channel="outChannel">
    <int-script:script lang="ruby">
    return "#{payload.upcase} -[#{Time.now.to_i}]"
   </int-script:script>
</int:transformer>
```

Or  assign a variable to an expression and return the variable:

```xml
Copy
<int:transformer input-channel="inChannel"
 output-channel="outChannel">
 <int-script:script lang="ruby">
 val = "#{payload.upcase} -[#{Time.now.to_i}]";
 val
 </int-script:script>
</int:transformer>
```

Python works a bit differently.  For starters, implicit return is not supported.  Also a return statement outside of a function or method is not permitted.  Bare expressions are valid in Python but the language makes a subtle distinction between expressions and statements which [affects the JSR233 implementation](http://stackoverflow.com/questions/1887320/get-data-back-from-jython-scripts-using-jsr-223).   For example, if you evaluate the following script with JSR223 with the engine.eval(), you get a null return:

```python
Copy
def multiply(x,y):
    return x*y
multiply(5,7)
```

Instead, you must assign the result to a variable, e.g., "answer",  and invoke engine.get("answer") following the the eval() invocation to get the expected result, 35.

```python
Copy
def multiply(x,y):
     return x*y
answer = multiply(5,7)
```

Spring Integration includes a work around to address this limitation. If the last statement in the script is a variable assignment, it will parse the variable name and return the value of engine.get().

### Scripting vs Spring Beans

We have seen how scripting provides an alternative to SpEL expressions when more power and flexibility is needed.  However it is not always obvious when scripting is a better choice than a full blown Spring bean. The sweet spot for scripting seems to be somewhere in the middle of the logic complexity spectrum - more powerful than SpEL but more lightweight than a Spring bean. As is often the case in software design, do the simplest thing that works. If a SpEL expression will do the trick there is no reason to use a script.  If more than one line of code is required, or your application can benefit from  meta-programming features not available in Java, or automatic refresh capabilities, scripting may be the ideal choice. If the logic requires more than a few lines of code, or performance is more important than flexibility, a Spring bean is a better choice

In the context of this discussion, I have deliberately avoided the term *POJO* in favor of the more generic *Spring bean*.  This is to point out that it is possible to implement Spring beans in languages such as Groovy and Scala already without any help from the Spring framework.  Additionally, Core Spring already provides [dynamic language support](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/htmlsingle/spring-framework-reference.html#dynamic-language) allowing you to implement Spring beans in JRuby or BeanShell, for example.  So, even without Spring Integration's scripting support, any Spring bean that follows the appropriate conventions may implement a Spring Integration endpoint.

### JSR223 vs Groovy

Spring Integration's scripting support builds on Spring Integration's Groovy support introduced in the 2.0 release. The groovy namespace offers similar capabilities and syntax backed by Spring's Groovy scripting API rather than JSR223.  As a consequence, Groovy support offers additional features specific to Groovy.  In many cases, the usage is virtually identical:

```xml
Copy
<int-groovy:script location="myScript.groovy">
   <int-groovy:variable name="foo" value="foo"/>
   <int-groovy:variable name="bar" value="bar"/>
   <int-groovy:variable name="date" ref="date"/>
</int-groovy:script>

<int-script:script lang="groovy" location="myScript.groovy">
   <int-script:variable name="foo" value="foo"/>
   <int-script:variable name="bar" value="bar"/>
   <int-script:variable name="date" ref="date"/>
</int-script:script>
```

If you are only interested in Groovy, native support is a better choice. In addition, Spring Integration's Groovy support includes the Groovy control bus which allows you to manage your application at runtime using Groovy scripts.

### Some Final Words

In this post we have covered the basics of Spring Integration's scripting support providing an easy way to use scripts written in any language in a Spring Integration application. In addition to simplifying integration steps, it is now possible to use Spring Integration to glue together existing scripts written in multiple languages.  In Part 2, we will look at some additional Spring Integration scripting examples.  If you have any good use cases or ideas for scripting, I'd love to hear about them!