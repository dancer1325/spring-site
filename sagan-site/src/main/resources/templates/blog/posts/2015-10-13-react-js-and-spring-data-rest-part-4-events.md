---
title: React.js and Spring Data REST: Part 4 - Events
source: https://spring.io/blog/2015/10/13/react-js-and-spring-data-rest-part-4-events
scraped: 2026-02-23T19:36:59.093Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  October 13, 2015 | 9 Comments
---

# React.js and Spring Data REST: Part 4 - Events

_Engineering | Greg L. Turnquist |  October 13, 2015 | 9 Comments_

To see updates to this code, visit our [React.js and Spring Data REST tutorial](https://spring.io/guides/tutorials/react-and-spring-data-rest/).

In the [previous session](https://spring.io/blog/2015/09/29/react-js-and-spring-data-rest-part-3-conditional-operations), you introduced conditional updates to avoid collisions with other users when editing the same data. You also learned how to version data on the backend with optimistic locking. You got a tip off if someone edited the same record so you could refresh the page and get the update.

That’s good. But do you know what’s even better? Having the UI dynamically respond when other people update the resources.

In this session you’ll learn how to use Spring Data REST’s built in event system to detect changes in the backend and publish updates to ALL users through Spring’s WebSocket support. Then you’ll be able to dynamically adjust clients as the data updates.

Feel free to [grab the code](https://github.com/gregturn/react-and-spring-data-rest/tree/master/events) from this repository and follow along. This session is based on the previous session’s app with extra things added.

## Adding Spring WebSocket support to the project

Before getting underway, you need to add a dependency to your project’s pom.xml file:

```xml
Copy<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

This bring in Spring Boot’s WebSocket starter.

## Configuring WebSockets with Spring

[Spring comes with powerful WebSocket support](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#websocket). One thing to recognize is that a WebSocket is a very low level protocol. It does little more than offer the means to transmit data between client and server. The recommendation is to use a sub-protocol (STOMP for this session) to actually encode data and routes.

The follow code is used to configure WebSocket support on the server side:

```java
Copy@Component
@EnableWebSocketMessageBroker
public class WebSocketConfiguration extends AbstractWebSocketMessageBrokerConfigurer {
static final String MESSAGE_PREFIX = "/topic";

@Override
public void registerStompEndpoints(StompEndpointRegistry registry) {
	registry.addEndpoint("/payroll").withSockJS();
}

@Override
public void configureMessageBroker(MessageBrokerRegistry registry) {
	registry.enableSimpleBroker(MESSAGE_PREFIX);
	registry.setApplicationDestinationPrefixes("/app");
}

```

-   `@EnableWebSocketMessageBroker` turns on WebSocket support.
-   `AbstractWebSocketMessageBrokerConfigurer` provides a convenient base class to configure basic features.
-   **MESSAGE\_PREFIX** is the prefix you will prepend to every message’s route.
-   `registerStompEndpoints()` is used to configure the endpoint on the backend for clients and server to link (`/payroll`).
-   `configureMessageBroker()` is used to configure the broker used to relay messages between server and client.

With this configuration, it’s now possible to tap into Spring Data REST events and publish them over a WebSocket.

## Subscribing to Spring Data REST events

Spring Data REST generates several [application events](http://docs.spring.io/spring-data/rest/docs/current/reference/html/#events) based on actions occurring on the repositories. The follow code shows how to subscribe to some of these events:

```java
Copy@Component
@RepositoryEventHandler(Employee.class)
public class EventHandler {
private final SimpMessagingTemplate websocket;

private final EntityLinks entityLinks;

@Autowired
public EventHandler(SimpMessagingTemplate websocket, 
			EntityLinks entityLinks) {
	this.websocket = websocket;
	this.entityLinks = entityLinks;
}

@HandleAfterCreate
public void newEmployee(Employee employee) {
	this.websocket.convertAndSend(
	  MESSAGE_PREFIX + "/newEmployee", getPath(employee));
}

@HandleAfterDelete
public void deleteEmployee(Employee employee) {
	this.websocket.convertAndSend(
	  MESSAGE_PREFIX + "/deleteEmployee", getPath(employee));
}

@HandleAfterSave
public void updateEmployee(Employee employee) {
	this.websocket.convertAndSend(
	  MESSAGE_PREFIX + "/updateEmployee", getPath(employee));
}

/**
 * Take an {@link Employee} and get the URI using 
 * Spring Data REST's {@link EntityLinks}.
 *
 * @param employee
 */
private String getPath(Employee employee) {
  return this.entityLinks.linkForSingleResource(employee.getClass(),
		employee.getId()).toUri().getPath();
}

```

-   `@RepositoryEventHandler(Employee.class)` flags this class to trap events based on **employees**.
-   `SimpMessagingTemplate` and `EntityLinks` are autowired from the application context.
-   The `@HandleXYZ` annotations flag the methods that need to listen to. These methods must be public.

Each of these handler methods invokes `SimpMessagingTemplate.convertAndSend()` to transmit a message over the WebSocket. This is a pub-sub approach so that one message is relayed to every attached consumer.

The route of each message is different, allowing multiple messages to be sent to distinct receivers on the client while only needing one open WebSocket, a resource-efficient approach.

`getPath()` uses Spring Data REST’s `EntityLinks` to look up the path for a given class type and id. To serve the client’s needs, this `Link` object is converted to a Java URI with its path extracted.

Note

`EntityLinks` comes with several utility methods to programmatically find the paths of various resources, whether single or for collections.

In essense, you are listening for create, update, and delete events, and after they are completed, sending notice of them to all clients. It’s also possible to intercept such operations BEFORE they happen, and perhaps log them, block them for some reason, or decorate the domain objects with extra information. (In the next session, we’ll see a VERY handy use for this!)

## Configuring a JavaScript WebSocket

Next step is to write some client-side code to consume WebSocket events. The follow chunk in them main app pulls in a module.

```javascript
Copyvar stompClient = require('./websocket-listener')
```

That module is shown below:

```javascript
Copydefine(function(require) {
	'use strict';
var SockJS = require('sockjs-client'); <b class="conum">(1)</b>
require('stomp-websocket'); <b class="conum">(2)</b>

return {
	register: register
};

function register(registrations) {
	var socket = SockJS('/payroll'); <b class="conum">(3)</b>
	var stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		registrations.forEach(function (registration) { <b class="conum">(4)</b>
		  stompClient.subscribe(registration.route, registration.callback);
		});
	});
}

```

1.  You pull in the SockJS JavaScript library for talking over WebSockets.
2.  You pull in the stomp-websocket JavaScript library to use the STOMP sub-protocol.
3.  Here is where the WebSocket is pointed at the application’s `/payroll` endpoint.
4.  Iterate over the array of `registrations` supplied so each can subscribe for callback as messages arrive.

Each registration entry has a `route` and a `callback`. In the next section, you can see how to register event handlers.

## Registering for WebSocket events

In React, a component’s `componentDidMount()` is the function that gets called after it has been rendered in the DOM. That is also the right time to register for WebSocket events, because the component is now online and ready for business. Checkout the code below:

```javascript
CopycomponentDidMount: function () {
    this.loadFromServer(this.state.pageSize);
    stompClient.register([
        {route: '/topic/newEmployee', callback: this.refreshAndGoToLastPage},
        {route: '/topic/updateEmployee', callback: this.refreshCurrentPage},
        {route: '/topic/deleteEmployee', callback: this.refreshCurrentPage}
    ]);
},
```

The first line is the same as before, where all the employees are fetched from the server using page size. The second line shows an array of JavaScript objects being registered for WebSocket events, each with a `route` and a `callback`.

When a new employee is created, the behavior is to refresh the data set and then use the paging links to navigate to the **last** page. Why refresh the data before navigating to the end? It’s possible that adding a new record causes a new page to get created. While it’s possible to calculate if this will happen, it subverts the point of hypermedia. Instead of cobbling together customize page counts, it’s better to use existing links and only go down that road if there is a performance-driving reason to do so.

When an employee is updated or deleted, the behavior is to refresh the current page. When you update a record, it impacts the page your are viewing. When you delete a record on the current page, a record from the next page will get pulled into the current one, hence the need to also refresh the current page.

Note

There is no requirement for these WebSocket messages to start with `/topic`. It is simply a common convention that indicates pub-sub semantics.

In the next section, you can see the actual operations to perform these operations.

## Reacting to WebSocket events and updating the UI state

The following chunk of code contains the two callbacks used to update UI state when a WebSocket event is received.

```javascript
CopyrefreshAndGoToLastPage: function (message) {
    follow(client, root, [{
        rel: 'employees',
        params: {size: this.state.pageSize}
    }]).done(response => {
        this.onNavigate(response.entity._links.last.href);
    })
},
refreshCurrentPage: function (message) {
follow(client, root, [{
rel: 'employees',
params: {
size: this.state.pageSize,
page: this.state.page.number
}
}]).then(employeeCollection => {
this.links = employeeCollection.entity._links;
this.page = employeeCollection.entity.page;
    return employeeCollection.entity._embedded.employees.map(employee =&gt; {
        return client({
            method: 'GET',
            path: employee._links.self.href
        })
    });
}).then(employeePromises =&gt; {
    return when.all(employeePromises);
}).then(employees =&gt; {
    this.setState({
        page: this.page,
        employees: employees,
        attributes: Object.keys(this.schema.properties),
        pageSize: this.state.pageSize,
        links: this.links
    });
});

```

`refreshAndGoToLastPage()` uses the familiar `follow()` function to navigate to the **employees** link with the **size** parameter applied, plugging in `this.state.pageSize`. When the response is received, you then invoke the same `onNavigate()` function from the last session, and jump to the **last** page, the one where the new record will be found.

`refreshCurrentPage()` also uses the `follow()` function but applies `this.state.pageSize` to **size** and `this.state.page.number` to **page**. This fetches the same page you are currently looking at and updates the state accordingly.

Note

This behavior tells every client to refresh their current page when an update or delete message is sent. It’s possible that their current page may have nothing to do with the current event. However, it can be tricky to figure that out. What if the record that was deleted was on page two and you are looking at page three? Every entry would change. But is this desired behavior at all? Maybe, maybe not.

## Moving state management out of the local updates

Before you finish this section, there is something to recognize. You just added a new way for the state in the UI to get updated: when a WebSocket message arrives. But the old way to update the state is still there.

To simplify your code’s management of state, remove the old way. In other words, submit your **POST**, **PUT**, and **DELETE** calls, but don’t use their results to update the UI’s state. Instead, wait for the WebSocket event to circle back and then do the update.

The follow chunk of code shows the same `onCreate()` function as the previous session, only simplified:

```javascript
CopyonCreate: function (newEmployee) {
    follow(client, root, ['employees']).done(response => {
        client({
            method: 'POST',
            path: response.entity._links.self.href,
            entity: newEmployee,
            headers: {'Content-Type': 'application/json'}
        })
    })
},
```

Here, the `follow()` function is used to get to the **employees** link, and then the **POST** operation is applied. Notice how `client({method: 'GET' …​})` has no `then()` or `done()` like before? The event handler to listen for updates is now found in `refreshAndGoToLastPage()` which you just looked at.

## Putting it all together

With all these mods in place, fire up the app (`./mvnw spring-boot:run`) and poke around with it. Open up two browser tabs and resize so you can see them both. Start making updates in one and see how they instantly update the other tab. Open up your phone and visit the same page. Find a friend and ask him or her to do the same thing. You might find this type of dynamic updating more keen.

Want a challenge? Try the exercise from the previous session where you open the same record in two different browser tabs. Try to update it in one and NOT see it update in the other. If it’s possible, the conditional PUT code should still protect you. But it may be trickier to pull that off!

## Review

In this session:

-   You configured Spring’s WebSocket suport with SockJS fallback.
-   You subscribed for create, update, and delete events from Spring Data REST to dynamically update the UI.
-   You published the URI of affected REST resources along with a contextual message ("/topic/newEmployee", "/topic/updateEmployee", etc.).
-   You registered WebSocket listeners in the UI to listen for these events.
-   You wired the listeners to handlers to update the UI state.

With all these features, it’s easy to run two browsers, side-by-side, and see how updating one ripples to the other.

Issues?

While multiple displays nicely update, polishing the precise behavior is warranted. For example, creating a new user will cause ALL users to jump to the end. Any thoughts on how this should be handled?

Paging is useful, but offers a tricky state to manage. The costs are low on this sample app, and React at very efficient at updating the DOM without causing lots of flickering in the UI. But with a more complex app, not all of these approaches will fit.

When designing with paging in mind, you have to decide what is the expected behavior between clients and if there needs to updates or not. Depending on your requirements and performance of the system, the existing navigational hypermedia may be sufficent.