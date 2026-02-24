---
title: XML Syntax Sugar in Spring 2.0
source: https://spring.io/blog/2006/11/26/xml-syntax-sugar-in-spring-2-0
scraped: 2026-02-24T09:33:25.576Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  November 26, 2006 | 0 Comments
---

# XML Syntax Sugar in Spring 2.0

_Engineering | Rod Johnson |  November 26, 2006 | 0 Comments_

If you've followed October's Spring 2.0 release, you will know that one of the big new features was XML extension name spaces: the ability to define new XML elements and attributes that generate Spring metadata, and can be used alongside regular bean definitions. This provides a valuable new extension point and makes Spring configuration both more simpler to use for many repeated tasks and more powerful.

However, there is also a sweet little piece of syntax sugar that you may not have noticed--probably because no one in the Spring team has gotten around to telling you... Having promised myself for a while that I was going to do a code-centered blog next, here goes.

The move to XML schema to allow extension namespaces also allows a little shortcut, using attributes instead of subelements for property values. These attributes are not validated, but because we are using XML schema, rather than a DTD, we can still retain all other validation. As the attribute names are property names, XML validation wouldn't add anything anyway; this is a problem of Java-based validation, rather than XML structure. Imagine the following Java object, with two simple properties and a dependency on an associated object:

```java
Copy
public class Person {
	
   private int age;
	
   private String name;
	
   private House house;

   public void setAge(int age) {
      this.age = age;
   }

   public void setName(String name) {
      this.name = name;
   }
	
   public void setHouse(House house) {
      this.house = house;
   }
}
```

This can be configured in Spring 2.0 using XML as follows:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xmlns:p="http://www.springframework.org/schema/p"
   xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<bean class="com.interface21.spring2.ioc.Person"
   p:name="Tony"
   p:age="53"
   p:house-ref="number10"
/>
	
<bean class="com.interface21.spring2.ioc.House"
   id="number10"
   p:name="10 Downing Street"
/>
	
</beans>
```

Note how the properties can be supplied using attributes, rather than elements. This works through the magic of the special namespace: "p". This is a special namespace that is not validated, but intended to allow the use of attributes with names matching Java property names.

With simple types we simply use the property name in the "p" namespace, as in "p:name". When injecting references to other Spring beans, use the "-ref" suffix, as in "p:house-ref".

This shortcut syntax is particularly compelling when you want to use autowiring. For example, consider the following variant:

```xml
Copy
<bean class="com.interface21.spring2.ioc.Person"
   autowire="byType"
   p:name="Tony"
   p:age="53"
/>
```

Here we have not set the "house" property, as autowiring can take care of that. You could even use default-autowire at the <beans> element level to have autowiring across the entire file.

The following snippet from Spring 1.0 or 1.1 usage illustrates how much Spring configuration has reduced the minimum number of angle brackets in the last two major releases (1.2 and 2.0):

```xml
Copy
<bean class="com.interface21.spring2.ioc.Person">
   <property name="name"><value>"Tony"</value></property>
   <property name="age"><value>"53"</value></property>		
   <property name="house"><ref local=&rdquo;number10&rdquo; /></property>
</bean>
```

In Spring 1.2 we introduced the "value" and "ref" attributes, instead of requiring subelements of <property> in most cases, while in Spring 2.0 it's now possible to use attributes pure and simple.

Of course, the traditional syntax continues to work--Spring 2.0 just adds additional options. Use the traditional longhand form when the property value is complex and not legal or readable as an attribute value. And, of course, there is no need to rewrite existing configuration files, as Spring 2.0 is entirely backward compatible overall.

The new syntax is particularly nice when putting configuration samples into presentations. Which reminds me that my real job for today is finishing my slides for the [Spring Experience](http://www.thespringexperience.com)... Hope to see you there!