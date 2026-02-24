---
title: Spring MVC: from JSP and Tiles to Thymeleaf
source: https://spring.io/blog/2012/10/30/spring-mvc-from-jsp-and-tiles-to-thymeleaf
scraped: 2026-02-24T08:14:34.968Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Michael Isvy |  October 30, 2012 | 6 Comments
---

# Spring MVC: from JSP and Tiles to Thymeleaf

_Engineering | Michael Isvy |  October 30, 2012 | 6 Comments_

When it comes to the view layer, Spring @MVC gives you a variety of choices. In this article, we will first discuss the way you have most likely used the view layer in the past few years: *JSP*. We will see the bad and better ways to work with them (plain *JSP*, *JSP* with custom tags, *Apache Tiles*).

We will then discuss a new project called *Thymeleaf*, which you can use as an alternate approach to *JSP*.

As usual, you can find all the code samples discussed in the [corresponding application on github](https://github.com/michaelisvy/mvc-layout-samples).

## Plain JSP

Let us get started with the below code sample:

```html
Copy
<html …> <body>
 <div style="padding-top: 50px;">
   <jsp:include page="../menu.jspx"/>
   <c:choose>
     <c:when test="${empty users}">
       Table is empty.
     </c:when>
     <c:otherwise>
      <table>
       <thead>
         <tr>
          <th> First Name </th>
          <th> Last name </th>
         </tr>
        </thead>
        <tbody>
        <c:forEach var="user" items="${users}">
        <tr>
          <td> <c:out value="${user.firstName}"/> </td>
          <td> <c:out value="${user.lastName}"/> </td>
        </tr>
        </c:forEach>
       </tbody>
     </table>
    </c:otherwise>
   </c:choose>
   <jsp:include page="../footer.jspx"/>
  </div>
 </body>
</html>
```

This code sample is not exactly “state of the art” in the sense that it could have been written 8 years ago in the exact same way. Does it mean that it is *outdated*? Let’s discuss some possible limitations.

1.  The layout

We’ve used *<jsp:include />* in order to include *JSP* fragments (header and footer). Obviously it’s good to have *<jsp:include />* because it prevents you from doing a lot of copy/pasting. However, if you have hundreds of JSP files, you’ll find yourself copy/pasting those *<jsp:include />* tags into all your JSPs. It would be better to externalize all layout information into a dedicated file.

2.  Verbosity

Our users page is fairly small because it simply displays a list of elements. We already have 50 lines of code (the above code sample has been slightly reduced). You can imagine how big it would be if we had to display a lot of content.

3.  HTML/CSS compliance

This page is **not HTML/CSS compliant**. Suppose a Web Designer has prototyped it, you would have to rewrite it completely in order to use intrusive JSP syntax. We’ll come back to that point when talking about *ThymeLeaf*.

![](http://blog.springsource.org/wp-includes/js/tinymce/plugins/wordpress/img/trans.gif "More...")

## JSP custom tags

Custom tags are part of *Java EE*. They allow you to externalize repetitive pieces of JSP without having to write a single line of Java. You instead create a dedicated .tagx file.

Here is an example:

```html
Copy
<jsp:directive.attribute name="title" required="true" rtexprvalue="true" />
<body>
 <div style="padding-top: 50px;">
  <jsp:include page="/WEB-INF/view/jsp/menu.jspx"/>
  <jsp:doBody />
  <jsp:include page="/WEB-INF/view/jsp/footer.jspx"/>
 </div>
 </body>
```

In the sample application, this file is called *mainLayout.tagx*. It is there on my filesystem:

[![](http://blog.springsource.org/wp-content/uploads/2012/10/01-tag.png "01-tag")](http://blog.springsource.org/wp-content/uploads/2012/10/01-tag.png)

The most important instruction in the above sample is *<jsp:doBody />*. When the template is processed, *<jsp:doBody />* is replaced with content from the “main” JSP.

Inside each JSP, I can invoke the previously created tag.

As you can see below, we are associating the *custom* namespace to our *tags* folder. We can then use the tag called *mainLayout*.

```html
Copy
<div xmlns:c="http://java.sun.com/jsp/jstl/core" xmlns:jsp="http://java.sun.com/JSP/Page"
 xmlns:custom="urn:jsptagdir:/WEB-INF/tags">
<custom:mainLayout title="${title}/">
 <c:choose>
…
 </c:choose>
</custom:mainLayout>
```

Note: as you can see in the above code sample, each JSP should specify the layout that it uses. If I have several layouts and I want to migrate several JSPs from *mainLayout* to *customLayout*, I would need to edit each of those JSP files and change the layout manually. We will come back to that point later when talking about *Tiles*.

Custom tags can do much more for you than just externalizing the layout part. To illustrate this point, I’ve created a *simpleTable* tag so I do not have to deal with <thead> and <tbody> tags. It also displays a message when the table is empty. My *JSP* file now looks like this:

```xml
Copy
<custom:mainLayout title="${title}/">
 <custom:simpleTable collection="${users}" headerLabels="First Name, Last Name">
   <c:forEach var="user" items="${users}">
     <tr>
       <td> <c:out value="${user.firstName}"/> </td>
       <td> <c:out value="${user.lastName}"/> </td>
     </tr>
   </c:forEach>
  </custom:simpleTable>
</custom:mainLayout>
```

You can browse [simpleTable.tagx](https://github.com/michaelisvy/mvc-layout-samples/blob/master/src/main/webapp/WEB-INF/tags/simpleTable.tagx) for a complete example.

Note: I should also mention a new project called **[Datatable4J](http://datatables4j.github.com/docs/index.html)** created by Thibault Duchateau. It provides a set of tags on top of jquery-datatables and therefore allows to create AJAX-style datatables without having to write Javascript yourself. Documentation is pretty good and this project is actively worked on.

## Pros and Cons

Standard Tags have many benefits:

-   I can use them to do much more than just externalizing layout information. In the end, they can easily make your JSPs 5 times smaller than they would be otherwise.
-   Eclipse/STS works well with custom tags so you’re able to use CTRL+space for auto-completion.

On the down side:

-   Documentation is not the best.
-   Even though custom tags are pretty neat already, I can’t recall any improvement to them in the past few years.
-   Using Custom tags implies that you’re using a JSP Engine inside your web container. You can then expect some minor differences depending on the web container you’re using (Apache Tomcat, IBM Websphere, Oracle Weblogic…).
-   It is also harder to Unit Test your view layer. You can see [Spring MVC Test framework](https://github.com/SpringSource/spring-test-mvc) if you’re interested in this topic.

## Externalizing your JSPs’ layout using Apache Tiles

Apache Tiles was already famous a decade ago for being the layout plugin that came with Struts 1. It now is an independent framework and integrates well with Spring MVC.

First of all, you should declare the appropriate Spring configuration:

```xml
Copy
<bean id="tilesViewResolver" class="org.springframework.web.servlet.view.tiles3.TilesViewResolver"/>
<bean id="tilesConfigurer" class="org.springframework.web.servlet.view.tiles3.TilesConfigurer">
 <property name="definitions">
 <list>
 <value>/WEB-INF/view/jsp/tiles.xml</value>
 </list>
 </property>
</bean>
```

In the below example, we are going to create 3 files as follows:

[![](http://blog.springsource.org/wp-content/uploads/2012/10/02-tag-tiles.png "02-tag-tiles")](http://blog.springsource.org/wp-content/uploads/2012/10/02-tag-tiles.png)

## Layout file

As with JSP custom tags, the layout is described in a dedicated file. The syntax is quite similar, except that we are using the *tiles* tag library.

```xml
Copy
<html xmlns:tiles="http://tiles.apache.org/tags-tiles" …>
<head> … </head>
 <body>
   <jsp:include page="/WEB-INF/view/jsp/menu.jspx"/>
   <tiles:insertAttribute name="main" />
   <jsp:include page="/WEB-INF/view/jsp/footer.jspx"/>
 </body>
</html>
```

*layout.jspx*

The most important instruction in the above sample is *<tiles:insertAttribute />*. When the template is processed, *<tiles:insertAttribute />* is replaced with content from the “main” JSP. We will then use a dedicated file (typically called tiles.xml) which contains all the tiles definitions as follows:

```xml
Copy
<tiles-definitions>
 <definition name="tiles/*" template="/WEB-INF/view/jsp/03-tiles/layout.jspx">
  <put-attribute name="main" value="/WEB-INF/view/jsp/03-tiles/{1}.jspx" />
 </definition>
</tiles-definitions>
```

*tiles.xml*

\[callout title=Wildcard usage\]In the past, Apache Tiles did not handle wildcards and we had to copy/paste a new definition inside tiles.xml every time a new JSP was created. \[/callout\]

Based on the above example, the view “tiles/users” will be resolved as */WEB-INF/view/jsp/users.jspx* using the template *layout.jspx*.

Inside the JSP, there is no mention of the layout it uses:

```html
Copy
<div xmlns:c="http://java.sun.com/jsp/jstl/core" xmlns:jsp="http://java.sun.com/JSP/Page">
<table>
 <thead>
   <tr>
    <th> First Name </th>
    <th> Last name </th>
   </tr>
  </thead>
  <tbody>
  <c:forEach var="user" items="${users}">
   <tr>
     <td> <c:out value="${user.firstName}"/> </td>
     <td> <c:out value="${user.lastName}"/> </td>
   </tr>
  </c:forEach>
  </tbody>
 </table>
</div>
```

The Apache Tiles approach is similar to custom tags and therefore has same pros and cons. There is some activity on the *Apache Tiles* project but it is definitely not as vibrant as *ThymeLeaf* which we will discuss in the next section.

## Thymeleaf

[Thymeleaf](http://www.thymeleaf.org/) defines itself as an  XML / XHTML / HTML5 template engine.

It is not based on JSPs but rather on some plain HTML files with a little bit of namespace magic.

First step: we should integrate ThymeLeaf with Spring. As usual, we need to declare the appropriate view resolver.

```html
Copy
<bean id="templateResolver" class="org.thymeleaf.templateresolver.ServletContextTemplateResolver">
  <property name="prefix" value="/WEB-INF/view/" />
  <property name="suffix" value=".html" />
  <property name="templateMode" value="HTML5" />
  <property name="cacheable" value="false" />
 </bean>
 <bean id="templateEngine" class="org.thymeleaf.spring3.SpringTemplateEngine">
  <property name="templateResolver" ref="templateResolver" />
 </bean>
 <bean class="org.thymeleaf.spring3.view.ThymeleafViewResolver">
  <property name="templateEngine" ref="templateEngine" />
  <property name="order" value="1" />
  <property name="viewNames" value="thymeleaf/*" />
 </bean>
```

Let us now consider a simple view page.

```html
Copy
<html xmlns:th="http://www.thymeleaf.org">
  <head>
    <link th:src="@{/style/app.css}" rel="stylesheet"/>
  </head>
  <body>
    <div th:if="${not #lists.isEmpty(users)}">
    <table>
     <thead> … </thead>
     <tbody>
<tr th:each="user : ${users}">
        <td th:text="${user.firstName}">John</td>
        <td th:text="${user.lastName}">Smith</td>
</tr>
     </tbody>
    </table>
</div></body></html>
```

*users.html*

There are a few things that we can notice:

\-This is an html file! You can actually preview it as a static file in your web browser. This feature is great for prototyping \[1\].

-   We are using a  dedicated namespace in order to turn static html pages into dynamic views. All parts that require dynamic processing are prefixed with “th:”.
    
-   It’s simple to refer to the context path using ‘@{…}’.  This is very easy to get wrong in plain JSPs \[2\].
    
-   ${users} is resolved using Spring Expression Language. If I had a form, I would have used expressions such as \*{user.name} to refer to form elements.
    

\[1\] We will not discuss prototyping any further in this article. However you can read this tutorial ([](http://www.thymeleaf.org/petclinic.html)[http://www.thymeleaf.org/petclinic.html](http://www.thymeleaf.org/petclinic.html)) if you would like to know more about it.

\[2\] In the first part of this article, when using <jsp:include />, I had to use a relative path  *“**../menu.jspx”.* This will lead to a broken link on the day I’ll move my JSP file to a different folder.

## Layout file

Let us now discuss how to externalize the layout into a dedicated file.

As we did with JSP custom tags and with Tiles, you need to declare your layout file. In the code sample below, you will find 2 fragments:

-   headerFragment contains all header information
    
-   menuFragment contains my menu bar
    

Those names are not mandatory and I can have as many fragments as I wish.

In each view file, I can refer to fragments using th:include as follows:

```html
Copy
<html xmlns:th="http://www.thymeleaf.org">
 <head th:include="thymeleaf/layout :: headerFragment">
 <!-- replaced with fragment content -->
 <!—- 'thymeleaf/layout' refers to /thymeleaf/layout.html on the filesystem -->
 </head>

 <body>

 <div th:include="thymeleaf/layout :: menuFragment">
 </div>
 <div th:if="${not #lists.isEmpty(users)}">
 <table>
   …
   <tbody>
     <tr th:each="user : ${users}">
      <td th:text="${user.firstName}">John</td>
      <td th:text="${user.lastName}">Smith</td>
     </tr>
   </tbody>
  </table>
 </div>
 </body>
</html>
```

On the filesystem we have:

[![](http://blog.springsource.org/wp-content/uploads/2012/10/03-thymeleaf.png "03-thymeleaf")](http://blog.springsource.org/wp-content/uploads/2012/10/03-thymeleaf.png)

## Pros and Cons

On the bright side:

-   ThymeLeaf is a healthy open source project: new features coming up each month, good documentation, responsive user forums…
-   It is the ideal template engine if you want your web designer to be able to read your view files
-   The Expression Language used (actually called Standard Dialect) is much more powerful than JSP Expression Language.
-   Unlike JSPs, Thymeleaf works well for Rich HTML emails (see http://www.thymeleaf.org/springmail.html).

On the down side:

-   Thymeleaf does not have an equivalent to custom tags (.tagx files) yet.
-   At this stage, ThymeLeaf is not compatible with JSP tag libraries.

## Conclusion

We’ve seen the JSP and Thymeleaf approaches side by side. If your application uses hundreds of JSPs, we are not saying that you should ditch them all and start over again using Thymeleaf. However you might consider Thymeleaf for HTML pages outside of the web container such as for Rich HTML emails.

If you are starting on a new project, we strongly encourage you to compare both Thymeleaf and JSPs in order to figure out which one is more suitable to your needs.

Also, my colleague Rob Winch did a great presentation about [modern templating options for Spring MVC](https://github.com/rwinch/spring-modern-templating). Besides JSP and Thymeleaf, it also discusses Mustache templates.

The sample app used for this blog entry is [available on github](https://github.com/michaelisvy/mvc-layout-samples/).