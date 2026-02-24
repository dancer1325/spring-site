---
title: Spring 2.0 RC4 Released: Heads-up on DTD/Schema Renaming, Scope Attribute
source: https://spring.io/blog/2006/09/17/spring-2-0-rc4-released-heads-up-on-dtd-schema-renaming-scope-attribute
scraped: 2026-02-24T09:34:50.887Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Colin Sampaleanu |  September 17, 2006 | 0 Comments
---

# Spring 2.0 RC4 Released: Heads-up on DTD/Schema Renaming, Scope Attribute

_Engineering | Colin Sampaleanu |  September 17, 2006 | 0 Comments_

Spring Framework 2.0 RC4 has been [released](http://www.springframework.org/node/341). This is the last release candidate before Spring 2.0 final, and you may find out more about it from the release announcement itself as well as the [JIRA](http://opensource.atlassian.com/projects/spring/secure/IssueNavigator.jspa?reset=true&pid=10000&fixfor=10291) issue list for a complete list of changes in this release.

Possibly the most important thing to watch out for is that this release introduces versioned file/location names for the 2.0 DTD and Schemas (XSDs). This was necessary since the XML bean definition format was significantly enahnced for 2.0, but 1.2.x users still need to be able to refer to the 1.2.8 DTD. Here is an example of using the 2.0 "beans" schema (2.0 ships with a number of other new schemas as well, representing various special *namespaces*):

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="
                http://www.springframework.org/schema/beans
                http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">

     <!-- Define your beans here -->

</beans> 
```

Here is an example of using the 2.0 DTD (there is only one DTD, you must switch to schema to get the various new namespaces):

```xml
Copy
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE beans PUBLIC "-//SPRING//DTD BEAN 2.0//EN"
        "http://www.springframework.org/dtd/spring-beans-2.0.dtd">

<beans>

    <!-- Define your beans here -->

</beans>
```

One important thing to watch out for: any existing 1.2.x bean definition file should continue to work as is, since it is pointing to the 1.2 DTD, and all functionality is still supported. To get new 2.0 functionality supported by the new 2.0 DTD or schemas, you need to update your definition files as per the above examples. You also *must* switch from using the `singleton` attribute to define bean scopes, to using the new `scope` attribute instead. The old *singleton* and *scope* attributes overlap, and it was considered acceptable to remove the *singleton* attribute completely in the new DTD/schema definiitons, since the only people affected are people already changing their bean definition files to point to the new DTDs and schemas anyway. So if all you do is modify your existing bean definition files to point to the new DTD or schemas, without fixing up any use of *singleton*, you *will* get validation errors!

The new versioned DTD and schemas have been uploaded and are available online. While Spring itself finds the definitions within its own jar file (from the classpath) using an entity resolver, these definitions are needed online for XML Editors and other external users.