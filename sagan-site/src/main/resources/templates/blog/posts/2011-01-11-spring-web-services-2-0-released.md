---
title: Spring Web Services 2.0 Released
source: https://spring.io/blog/2011/01/11/spring-web-services-2-0-released
scraped: 2026-02-24T08:49:09.926Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Arjen Poutsma |  January 11, 2011 | 0 Comments
---

# Spring Web Services 2.0 Released

_Engineering | Arjen Poutsma |  January 11, 2011 | 0 Comments_

After being in the works for almost a year, I'm happy to announce that Spring Web Services 2.0 has been released! In this post, I'd like to go over some of the major new features.

## Java 5+ and Spring 3.0 Required

As you are probably aware, we moved the Object XML Mapping (OXM) module from the Spring-WS project into Spring 3.0. As such, it was a bit problematic to use Spring-WS 1.5 (with its own OXM module) with Spring 3.0, due to conflicting classes in the org.springframework.oxm package.

As of version 2.0, we no longer ship the OXM module as part of Spring-WS, but depend on Spring's OXM instead. As a result, **Spring Web Services 2.0 requires Spring 3.0** to work. Normally, we tend to be a bit more lenient with regard to version requirements, not necessarily requiring the latest Spring version, but this was the only way to make things work.

As a consequence of depending on Spring 3.0, we also have a **Java 5+ requirement**, and have the entire code base to use Java 5 features (such as generics, variable arguments, and enums) where they made sense. For example, the NodeMapper interface, used in combination with the XPathTemplate, is now generic, so there is no more need to cast:

```java
Copy
Person person = template.evaluateAsObject("//person", new DOMSource(document), new NodeMapper<Person>() {
    public Person mapNode(Node node, int nodeNum) throws DOMException {
        Element personElement = (Element) node;
        return new Person(personElement.getAttribute("firstName"), personElement.getAttribute("lastName"));
    }
});
```

Note that, even though we did upgrade the code base to use Java 5+ features, we did so in a backwards compatible fashion. As such, **Spring Web Services 2.0 is backwards compatible with 1.5**. We did, however, remove deprecated classes. For example, the XsdBasedSoap11Wsdl4jDefinitionBuilder was dropped in favor of the DefaultWsdl11Definition, which has identical functionality, but is far more customizable.

## Improved @Endpoint Programming Model

One of the most important new feature in Spring Web Services 2.0 is the ability to use arbitrary parameter types in @Endpoint methods. The big improvement to the @Endpoint model of Spring-WS 1.5 is that you can now mix and match parameters, and are not as limited in the return types. Basically, this brings the Spring-WS @Endpoint programming model up to par with Spring 3's @Controller model.

For instance, you can have the following @Endpoint method:

```java
Copy
@PayloadRoot(localPart = "myRequest", namespace = "http://example.com")
@ResponsePayload
public MyJaxb2Response handleMyRequest(@RequestPayload org.w3c.dom.Element myElement, 
                                       SoapHeader requestHeader,
                                       MessageContext messageContext) {

    // do something interesting here
}
```

This method will receive any SOAP message where the payload root element has the "[http://example.com](http://example.com)" namespace and "myRequest" local name. This payload will then be passed on as a W3C DOM element, in combination with the SoapHeader (to get access to individual header elements), and the whole message context.

Currently supported parameters/return types include:

-   DOM Elements (W3C DOM by default; JDOM, dom4j, XOM are enabled automatically if present on the classpath)
-   Types supported by an OXM Marshaller (requires an explicitely configured marshaller)
-   JAXB2 types, if JAXB2 is found on the classpath (this means you no longer have to configure a Jaxb2Marshaller explicitly)
-   javax.xml.transform.Source and subtypes
-   StAX XMLStreamReader and XMLEventreaders. Note that these can only be used as parameter types, not return types.

To get the payload of the request message as any of these parameter types, you will have to annotate the parameter with @RequestPayload. Similarly, if you want the return value to end up in the payload of the response message, you will have to annotate the method with @ResponsePayload. This is very similar to Spring 3's @Controller model, where we have @RequestBody and @ResponseBody, which offer similar functionality in the HTTP space.

Additionally, we support the following parameter types without @RequestPayload:

-   MessageContext
-   SoapHeader, SoapBody, SoapEvelope (of the request message)
-   @XPathParam parameters. Note that you can now use the @Namespace and @Namespaces annotations to specify any namespaces used in your XPath expressions, and no longer need to set them up in XML application contexts. For instance:
    
    ```java
    Copy
    @Namespaces(@Namespace(prefix = "tns", uri = "http://springframework.org/spring-ws"))
    public void myEndpointMethod(@XPathParam("/tns:root")String s) {
        // do something slightly more interesting here
    }
    ```
    
    These namespace annotations (both @Namespace and @Namespaces) can be present on the method, class, or package level (i.e. package-info.java).
    

To enable this programming model, all you have to do is put <sws:annotation-driven/> in your Spring Web Services application context:

```xml
Copy
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:sws="http://www.springframework.org/schema/web-services"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
       http://www.springframework.org/schema/web-services http://www.springframework.org/schema/web-services/web-services-2.0.xsd">

    <sws:annotation-driven/>

     <!-- other beans go here, or perhaps a <context:component-scan/> -->

</beans>
```

You can optionally provide a marshaller and unmarshaller attribute to this element, pointing to an OXM Marshaller and Unmarshaller respectively. This will enable support for using types supported by this marshaller as @RequestPayload/@ResponsePayload types.

Note that we have also deprecated support for <sws:marshalling-endpoints/> and <sws:xpath-endpoints/>, in favor of <sws:annotation-driven/>. As a result, these two elements don't exist in the 2.0 version of the XSD schema, but still do exist in the 1.5 version of it. So you can either stick with the 1.5 version of the schema, or upgrade to 2.0 and <sws:annotation-driven/>.

Finally, as everything in Spring, the parameter/return type mechanism is completely pluggable. So if you don't see the parameter type you'd like to see, feel free to write your own MethodArgumentResolver or MethodReturnValueHandler, plug it into Spring-WS, and you're set!

## New Integration Testing Module

The other major new feature is the new Web services integration test module, spring-ws-test. This module contains functionality to test both clients (i.e. classes that use the WebServiceTemplate), and servers (i.e. @Endpoints). Both client- and server-side testing modules offers a 'fluent' API, so you can typically use the Code Completion features (i.e. ctrl-space) in your IDE to guide you through the process of setting up the tests.

### Client-side Integration Testing

The core class for doing client-side integration testing is the MockWebServiceServer. The underlying idea is that the web service template connects to this mock server, sends it request message, which the mock server then verifies against the registered expectations. If the expectations are met, the mock server then prepares a response message, which is send back to the template.

The typical scenario of testing client-side code consists of:

1.  Creating a MockWebServiceServer.
2.  Setting up expectation(s) about the request message.
3.  Creating an appropriate response message
4.  Using the WebServiceTemplate as normal, either directly of through client code.
5.  Call MockWebServiceServer.verify() to make sure that all expectations have been met.

Consider, for example, the this Web service client class:

```java
Copy
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

public class CustomerClient extends WebServiceGatewaySupport {                           

  public int getCustomerCount() {
    CustomerCountRequest request = new CustomerCountRequest();                           
    request.setCustomerName("John Doe");

    CustomerCountResponse response =
      (CustomerCountResponse) getWebServiceTemplate().marshalSendAndReceive(request);    
      
    return response.getCustomerCount();
  }
}
```

A typical test for CustomerClient would look like this:

```java
Copy
import javax.xml.transform.Source;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.xml.transform.StringSource;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.assertEquals;

import org.springframework.ws.test.client.MockWebServiceServer;                          
import static org.springframework.ws.test.client.RequestMatchers.*;                      
import static org.springframework.ws.test.client.ResponseCreators.*;                     

@RunWith(SpringJUnit4ClassRunner.class)                                                  
@ContextConfiguration("integration-test.xml")                                            
public class CustomerClientIntegrationTest {

  @Autowired
  private CustomerClient client;                                                         

  private MockWebServiceServer mockServer;                                               

  @Before
  public void createServer() throws Exception {
    mockServer = MockWebServiceServer.createServer(client);
  }

  @Test
  public void customerClient() throws Exception {
    Source requestPayload = new StringSource(
      "<customerCountRequest xmlns='http://springframework.org/spring-ws'>" +
        "<customerName>John Doe</customerName>" +
      "</customerCountRequest>");
    Source responsePayload = new StringSource(
      "<customerCountResponse xmlns='http://springframework.org/spring-ws'>" +
        "<customerCount>10</customerCount>" +
      "</customerCountResponse>");

    mockServer.expect(payload(requestPayload)).andRespond(withPayload(responsePayload)); 

    int result = client.getCustomerCount();                                              
    assertEquals(10, result);                                                            

    mockServer.verify();                                                                 
  }
}
```

For more information on client-side testing, please refer to the [reference manual](http://static.springsource.org/spring-ws/sites/2.0/reference/html/client.html#d0e4160).

### Server-side Integration Testing

The core class for doing server-side integration testing is the MockWebServiceClient. The underlying idea is that this client creates a request message, and then sends it over to the endpoint(s) that are configured in a standard MessageDispatcherServlet application context. These endpoints will handle the message, and create a response. The client then receives this response, and verifies it against registered expectations.

The typical usage of the MockWebServiceClient is:

1.  Create a MockWebServiceClient instance.
2.  Send request messages.
3.  Set up response expectations.

Consider, for example, this simple Web service endpoint class:

```java
Copy
@Endpoint                                                                                
public class CustomerEndpoint {

  @ResponsePayload                                                                       
  public CustomerCountResponse getCustomerCount(                                         
      @RequestPayload CustomerCountRequest request) {                                    
    CustomerCountResponse response = new CustomerCountResponse();
    response.setCustomerCount(10);
    return response;
  }
}
```

A typical test for CustomerEndpoint would look like this:

```java
Copy
import javax.xml.transform.Source;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.xml.transform.StringSource;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.ws.test.server.MockWebServiceClient;                          
import static org.springframework.ws.test.server.RequestCreators.*;                      
import static org.springframework.ws.test.server.ResponseMatchers.*;                     

@RunWith(SpringJUnit4ClassRunner.class)                                                  
@ContextConfiguration("spring-ws-servlet.xml")                                           
public class CustomerEndpointIntegrationTest {

  @Autowired
  private ApplicationContext applicationContext;                                         

  private MockWebServiceClient mockClient;

  @Before
  public void createClient() {
    mockClient = MockWebServiceClient.createClient(applicationContext);                  
  }

  @Test
  public void customerEndpoint() throws Exception {
    Source requestPayload = new StringSource(
      "<customerCountRequest xmlns='http://springframework.org/spring-ws'>" +
        "<customerName>John Doe</customerName>" +
      "</customerCountRequest>");
    Source responsePayload = new StringSource(
      "<customerCountResponse xmlns='http://springframework.org/spring-ws'>" +
        "<customerCount>10</customerCount>" +
      "</customerCountResponse>");

    mockClient.sendRequest(withPayload(requestPayload)).                                 
      andExpect(payload(responsePayload));                                               
  }
}
```

For more information on server-side testing, please refer to the [reference manual](http://static.springsource.org/spring-ws/sites/2.0/reference/html/server.html#d0e3303).

## Other New Features

Besides the major features mentioned above, there are a couple of others:

-   Spring Web Services 2.0 introduces support for Spring Security 3.0
-   Support for XMPP (Jabber) transports

## More Information

If you want to give Spring Web Services 2.0 a shot, you can go to the [site](http://static.springsource.org/spring-ws/sites/2.0/), or directly to the [downloads](http://www.springsource.com/download/community?project=Spring%20Web%20Services). If you're using Maven, an upgrade should be as simple as adding the following repository:

```xml
Copy
<repository>
    <id>spring-release</id>
    <name>Spring Release Repository</name>
    <url>http://maven.springframework.org/release</url>
</repository>
```

Individual dependencies can then by added like so:

```xml
Copy
<dependency>
    <groupId>org.springframework.ws</groupId>
    <artifactId>spring-ws-core</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
```

The jars should be available on Maven Central soon.

Finally, I want to thank both Lukáš Křečan and Tareq Abed Rabbo. These two community members were a major help during the development of this release.