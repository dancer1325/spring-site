---
title: Putting Spring Web Flow to a Load Test
source: https://spring.io/blog/2007/06/22/putting-spring-web-flow-to-a-load-test
scraped: 2026-02-24T09:27:28.623Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  June 22, 2007 | 1 Comment
---

# Putting Spring Web Flow to a Load Test

_Engineering | Rossen Stoyanchev |  June 22, 2007 | 1 Comment_

Load testing a Web Flow application is similar to load testing any other web application â we'll use a load testing tool to simulate increasing levels of concurrent client access in order to capture essential performance statistics.

With Web Flow there will be a couple of important considerations for the load test:

1.  The load test must maintain independent “cookie storage area” so each client request can carry an independent HTTP session.
2.  We need a mechanism for extracting the unique flow execution key from the initial response and use it to customize subsequent requests in the same flow session.

Apache JMeter is an open-source performance test tool that can satisfy both considerations.

For 1) we add an HTTP Cookie Manager element at the root of each Test Group exercising Web Flow functionality. The Cookie Manager ensures each simulated client request can have its own cookies independent of other client requests thus allowing the servlet container to track independent HTTP sessions through the jsessionid cookie.

For 2) we add a Regular Expression Extractor immediately after the HTTP Request Element that initiates the flow. The purpose of the Extractor is to parse the HTTP response, locate some text using a regular expression we provide, and to make that text available as a variable for subsequent HTTP Request elements to use. Here is a sample Regular Expression Extractor configuration:

`Reference Name: flowExecutionKey Regular Expression: name="_flowExecutionKey" value="(.*)" Template: $1$ Match No.: 0 `

With the above configuration, we can now embed the variable ${flowExecutionKey}in subsequent HTTP Request Elements that are part of the same flow session.  
  
Now let's use this to put Web Flow to a load test. To properly exercise representative Web Flow functionality I created a sample web flow application to mimic a 6-step shopping cart flow collecting user input for shipping address, shipping options, credit card, billing address, order confirmation, as well as an order summary at the end. Individual steps in this flow include data binding and validation, view states, action states, decision states, and sub-flow states â things we'd expect to find in a typical Web Flow application. The application however uses stubs instead of actual database access code to avoid including such numbers in the overall statistics. We'd like to focus on Web Flow alone for this test.

After building the application and creating the JMeter scripts I added an Aggregate Report element to record performance stats for tests with different load levels.

Using my Lenovo T60 dual-core laptop running Ubuntu and Apache Tomcat version 5.5 as the servlet container configured for a maximum of 150 concurrent connections I observed the following results:

Users

90%

Max

Requests/sec

KB/sec

Total Requests

20

102

596

351

380

18000

60

372

5942

338

366

18000

80

463

10287

336

364

18000

100

550

11144

315

342

18000

150

687

20691

306

332

18000

Real load testing should be done on real hardware and based on real use cases. There is no substitute for that. However, we can derive certain conclusions from the above numbers.

The above numbers indicate that when exercising core Web Flow functionality throughput remains stable even as the number of concurrent users is significantly increased. The response time for 90% of users remains less than a second. The worst response time climbs as the load increases but that's not surprising considering the inadequate hardware used for testing.

Using the above technique you can load test your own Web Flow applications.

[![jmeter-snapshot.JPG](http://blog.interface21.com/main/wp-content/uploads/2007/07/jmeter-snapshot.JPG)](http://blog.interface21.com/main/wp-content/uploads/2007/07/jmeter-snapshot.JPG "jmeter-snapshot.JPG")

[](http://blog.interface21.com/main/wp-content/uploads/2007/07/jmeter-snapshot.JPG "jmeter-snapshot.JPG")

[](http://blog.interface21.com/main/wp-content/uploads/2007/07/jmeter-snapshot.JPG "jmeter-snapshot.JPG")[swf-shoppingcart-regexp.txt](http://blog.interface21.com/main/2007/06/22/putting-spring-web-flow-to-a-load-test/swf-shoppingcart-regexptxt/ "swf-shoppingcart-regexp.txt")