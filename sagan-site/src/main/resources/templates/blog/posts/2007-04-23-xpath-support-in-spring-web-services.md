---
title: XPath Support in Spring Web Services
source: https://spring.io/blog/2007/04/23/xpath-support-in-spring-web-services
scraped: 2026-02-24T09:30:31.776Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Arjen Poutsma |  April 23, 2007 | 0 Comments
---

# XPath Support in Spring Web Services

_Engineering | Arjen Poutsma |  April 23, 2007 | 0 Comments_

Following up on my post on [WS-DuckTyping](http://blog.springframework.com/arjen/archives/2007/03/27/ws-duck-typing/), I thought it would be interesting to show what support [Spring Web Services](http://static.springframework.org/spring-ws/site/) offers for XPath. Some of these features are available right now, but most will be part of the RC1 release we will release later this month. Throughout this post I will be using the contacts xml file defined in [item 35](http://www.cafeconleche.org/books/effectivexml/chapters/35.html) of [Effective XML](http://www.cafeconleche.org/books/effectivexml/), by Rusty Harold.

### XPathExpression

One of the options that has been available for quite a while is the [XPathExpression](http://static.springframework.org/spring-ws/site/apidocs/org/springframework/xml/xpath/XPathExpression.html). This is an abstraction over compiled XPath expressions, such as the Java 5 XPathExpression, and Jaxen XPath.

Recently, I've added the [XPathExpressionFactoryBean](http://static.springframework.org/spring-ws/site/apidocs/org/springframework/xml/xpath/XPathExpressionFactoryBean.html), to make it easier to inject XPath expressions into your beans, like so:

```xml
Copy
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">

    <bean id="myEndpoint" class="com.mycompany.ws.MyEndpoint">
        <constructor-arg ref="nameExpression"/>
    </bean>

    <bean id="nameExpression" class="org.springframework.xml.xpath.XPathExpressionFactoryBean">
        <property name="expression" value="/Contacts/Contact/Name"/>
    </bean>

</beans>
```

For simplicity's sake this expression does not use namespaces, but we could set those using the namespaces property of the factory bean.

The expression can be used in the code as follows:

```java
Copy
public class MyEndpoint extends AbstractDomPayloadEndpoint {
    
    private XPathExpression nameExpression;

    public MyEndpoint(XPathExpression nameExpression) {
        this.nameExpression = nameExpression;
    }

    // Gets invoked for every incoming request
    protected Element invokeInternal(Element requestElement, Document responseDocument) throws Exception {
        String name = nameExpression.evaluateAsString(requestElement);
        // do something with name
        return null; // no response
    }

}
```

A recently added feature of the XPathExpression is the [NodeMapper](http://static.springframework.org/spring-ws/site/apidocs/org/springframework/xml/xpath/NodeMapper.html). Here's how we can use it, if we change the expression to /Contacts/Contact:

```java
Copy
public class MyEndpoint extends AbstractDomPayloadEndpoint {

    private XPathExpression nameExpression;

    public MyEndpoint(XPathExpression nameExpression) {
        this.nameExpression = nameExpression;
    }

    protected Element invokeInternal(Element requestElement, Document responseDocument) throws Exception {
        List contacts = nameExpression.evaluate(requestElement,
                new NodeMapper() {
                    public Object mapNode(Node node, int nodeNum) throws DOMException {
                        Element contactElement = (Element) node;
                        Element nameElement = (Element) contactElement.getElementsByTagName("Name").item(0);
                        Element phoneElement = (Element) contactElement.getElementsByTagName("Phone").item(0);
                        return new Contact(nameElement.getTextContent(), phoneElement.getTextContent());
                    }
                } );
        for (Iterator iterator = contacts.iterator(); iterator.hasNext();) {
            Contact contact = (Contact) iterator.next();
            System.out.println(contact);
        }
        return null; // no response
    }

}
```

Just as we map rows using Spring JDBC's [RowMapper](http://www.springframework.org/docs/api/org/springframework/jdbc/core/RowMapper.html), each result node is mapped using the anonymous inner class. In this case, we create a Contact, which we simply print later on.

### XPathTemplate

Another recent addition is the [XPathTemplate](http://static.springframework.org/spring-ws/site/apidocs/org/springframework/xml/xpath/XPathOperations.html). This class follows the common template pattern used throughout Spring (JdbcTemplate, JmsTemplate, etc.). This template can be used as follows:

```java
Copy
public class MyEndpoint implements PayloadEndpoint {

    private XPathOperations template = new Jaxp13XPathTemplate();

    public Source invoke(Source request) throws Exception {
        String name = template.evaluateAsString("/Contacts/Contact/Name", request);
        // do something with name
        return null; // no response
    }

}
```

Of course, the template could have been injected with a constructor argument or a setter.

The XPath templates do not use pre-compiled XPath expressions, so they are a bit slower. However, the template is a bit more flexible, because you can reuse it for multiple expressions. It also supports the NodeMapper described above.

### @XPathParam

Finally, there is something new for the Java 5 users: the [@XPathParam](http://static.springframework.org/spring-ws/site/apidocs/org/springframework/ws/server/endpoint/annotation/XPathParam.html) annotation. You use this annotation on method parameters, and the XPath evaluations will simply be injected into the method. Here's how you use it:

```java
Copy
@Endpoint
public class MyEndpoint {

    @PayloadRoot("Contacts")
    public void handleContacts(@XPathParam("/Contacts/Contact/Name")String name) {
        // do something with name
    }

}
```

The @Endpoint annotation is required to mark the class as an endpoint, the @PayloadRoot indicates that handleContacts method will be invoked whenever a SOAP request comes it that has Contact as the root element. Finally, the @XPathParam does the parameter binding. You can bind to all the datatypes supported by XPath: booleans, doubles, Strings, Nodes, and NodeLists. Of course, it is more maintainable to keep all of the expressions together in one configuration file, but for simpler projects, this is a suitable approach.

Using this annotated endpoint style requires just a little bit of XML, just to let Spring-WS know the endoint exists, and to use annotations. The rest is picked up automatically.

```xml
Copy
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">

    <bean class="org.springframework.ws.server.endpoint.mapping.PayloadRootAnnotationMethodEndpointMapping"/>

    <bean class="org.springframework.ws.server.endpoint.adapter.XPathParamAnnotationMethodEndpointAdapter"/>

    <bean id="myEndpoint" class="com.mycompany.ws.MyEndpoint"/>

</beans>
```

Most of these features will be part of the RC1 release we will release later this month, (which will also include updated reference documentation we're working on). However, there are snapshots available for this release [here](http://static.springframework.org/spring-ws/site/downloads/snapshots.html), so give them a try, and report on the [forums](http://forum.springframework.org/forumdisplay.php?f=39).