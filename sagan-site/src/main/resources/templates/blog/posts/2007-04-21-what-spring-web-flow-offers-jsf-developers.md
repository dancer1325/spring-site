---
title: What Spring Web Flow Offers JSF Developers
source: https://spring.io/blog/2007/04/21/what-spring-web-flow-offers-jsf-developers
scraped: 2026-02-24T09:30:36.206Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  April 21, 2007 | 0 Comments
---

# What Spring Web Flow Offers JSF Developers

_Engineering | Keith Donald |  April 21, 2007 | 0 Comments_

[Spring Web Flow](http://www.springframework.org/webflow), much like the Spring Framework itself, is a unique integration technology. Most of our users view it as a generic [ApplicationController](http://www.martinfowler.com/eaaCatalog/applicationController.html) that can be embedded in any environment. We support Servlet and Portlet based applications, and ship integration with the leading web frameworks Struts, Spring MVC, and Java Server Faces. There are even teams I know of using Spring Web Flow in a Flex environment. In each of these environments, Spring Web Flow integrates to provide a better model for implementing navigation logic and managing application state.

Our users like this because they get to write their control flow once and reuse it anywhere. In this day of come-and-go web frameworks, Spring Web Flow provides them one modern framework to learn and build knowledge, tools, and extensions around. It has been designed to play this role from the beginning, and I am really excited to see Web Flow integration growing on a number of levels.

One important area where our integration is growing is with the Java Server Faces (JSF) community. Beginning with [Spring Web Flow 1.0.3](http://www.springframework.org/node/451), our JSF integration is on-par with what the Spring community expects, and delivers what JSF developers in the trenches need most. This blog will illustrate the integration enhancements to show you the difference Spring Web Flow is making for JSF developers.

### The Fit

[Spring Web Flow](http://www.springframework.org/webflow) is a controller framework that provides a language and runtime for implementing user interface control flow in a web application. [Java Server Faces](https://javaserverfaces.dev.java.net/) is a user interface component framework that consists of a standard API and two implementations - the Sun Reference Implementation and Apache MyFaces. As a standard API specification backed by the JCP, JSF provides extension points that allow product vendors to plug in and compete on their extensions. When used as a JSF extension, Spring Web Flow takes over two responsibilities: handling your view navigation rules and managing the state associated with your ongoing user interactions (a.k.a conversations). This integration combines Web Flow's strengths in navigation and state management with JSF's strength as a growing ecosystem of user interface component libaries. All JSF components and views continue to work as before with Web Flow in the picture. With Web Flow in there, JSF developers benefit from a considerably more powerful navigation model that alleviates the headaches traditionally associated with managing conversational state manually.

I could go on-and-on about Web Flow's specific feature set. Instead of doing that, I'll try and highlight the features that make the most difference for JSF developers.

In the domain of navigation handling Web Flow provides:

-   The ability to implement dynamic navigation rules that are changeable on-the-fly without a server restart
-   Full forward, backward, refresh, redirect, and recursive navigation capabilities built into its flow definition language
-   Modularization and encapsulation of navigation logic through the flow definition concept

Basically, Web Flow solves every problem [this poor soul](http://icoloma.blogspot.com/2006/10/myfaces-emperor-has-no-clothes.html) experienced with JSF's basic navigation capabilities. As [one of our leading users noted](http://forum.springframework.org/showpost.php?p=111157&postcount=4), Web Flow can be used as a complete replacement for JSF's default "forward-centric" navigation model:

> Jeremy Grelle: I have been using SWF as a complete replacement for JSF navigation-rules, even in the case of our simpler pages and menus. I was happy to be able to take it to this extreme as it would be a bit too confusing for my team to have navigation rules defined in multiple places.

In the domain of state management, Web Flow introduces several conversational scopes that compliment JSF's existing request, session, and application scopes. These scopes are

-   Conversation scope - a managed scope that lives for the duration of an user dialog
-   Flow scope - a managed scope that lives for the duration of a flow executing within a conversation
-   Flash scope - a managed scope that lives for the duration of a view participating in a flow

These scopes are 'managed' because they are cleaned up for you by Web Flow automatically. Conversation scope is ideal for storing model state to be persisted at the end of a user interaction such as an account registration wizard. Flash scope has proven quite useful to users integrating Ajax libraries such as Ajax4JSF and ICEFaces where multiple requests from the same view are the norm. In this case, flash scope allows model state to be manipulated across fine-grained Ajax requests coming from the same page and then automatically cleared on the next navigation.

Going back to what our leading users are saying:

> Jeremy Grelle: I find that even with the simpler pages in JSF, you oftentimes need something to manage the state of your model across multiple requests to the page...there are many solutions for this problem in the JSF community (Tomahawk's saveState tag, Shale's dialog framework, etc.), but I personally find SWF's multiple scopes to be the most robust and elegant solution.

### The Approach

Hopefully by now you have a good idea of what Web Flow brings to the table when used as a JSF extension. Now I'd like to go into a little more detail about how the integration works, and then close by showing you how to get starting using Web Flow and JSF together.

Understanding how Web Flow plugs in to JSF first takes a understanding of basic Web Flow constructs. The unit of controller functionality in Spring Web Flow - something like an Account registration wizard or a Customer Master/Detail Editor - is called a *flow definition*. A runtime instance of such a controller is called a *flow execution*. A new flow execution is launched at runtime to allow a single user to participate in a dialog with the application. The flow execution handles selecting the user's initial view, then responds to user events to carry out application behaviors and determine the next views to display. It also manages the state associated with the user dialog.

A big part of integrating Web Flow with JSF was fitting its flow execution lifecycle into the JSF lifecycle. This was achieved in part by implementing a [custom PhaseListener](http://static.springframework.org/spring-webflow/docs/current/api/org/springframework/webflow/executor/jsf/FlowPhaseListener.html) that handles launching new flow executions when requested by a clients, as well as restoring existing flow executions during the restoration of JSF views.

For example, by accessing a URL like:

```html
Copy
http://localhost:8080/accounts/servlet.faces?_flowId=register-account-flow
```

... you would start a new "register-account-flow". The request hits the FacesServlet first which kicks off the JSF lifecycle. Before any view is restored, the FlowPhaseListener starts the 'register-account-flow' which ultimately determines the initial JSF view to display.

Once the initial JSF view has been selected it is rendered. Rendering typically happens after an automatic redirect with Spring Web Flow's default [always redirect on pause](http://www.ervacon.com/products/swf/tips/tip4.html) setting, which associates the selected view with a URL that can be safely refreshed and navigated back to at later point with no browser warnings.

When rendering does occur, JSF UI components have full access to beans managed in any of Web Flow's conversational scopes, as well as access to your standard JSF session and application scopes. Component value bindings are transparent, meaning that JSF view developers don't need to know which scope a bean is managed in, they only need to know the name of the bean. This capability was achieved by implementing another JSF extension point, a [custom VariableResolver](http://static.springframework.org/spring-webflow/docs/current/api/org/springframework/webflow/executor/jsf/DelegatingFlowVariableResolver.html).

After a view participating in a flow execution has rendered, the user decides what she wants to do. If she decides to click the browser refresh button, that's fine - the flow execution is refreshed at its stable URL and the same JSF view is re-rendered. If she decides to do something that fires off some Ajax request from the same page, that's fine as well - the flow execution is again restored automatically, and JSF components participating in the Ajax call can update flow-managed state in a thread-safe manner seamlessly (no pun intended).

Once the user decides to invoke a UI command, for example by clicking a command link, the standard JSF postback lifecycle kicks in. After UI component validations are processed and model values are updated, the JSF action outcome is signaled as an event against the view-state of the restored flow execution. The flow takes over from there, processing the event by invoking the appropriate application behavior and selecting the next view according to the navigation rules of the flow definition. This Web Flow navigation step is handled by the last key construct in the JSF integration, a [custom NavigationHandler](http://static.springframework.org/spring-webflow/docs/current/api/org/springframework/webflow/executor/jsf/FlowNavigationHandler.html).

To summarize, from the point of view of the JSF view and component developer, it's just standard JSF - doesn't matter whether you are using JSP or Facelets with XYZ component provider. Web Flow executions are restored for you automatically and access to conversatioal state is completely transparent. Web Flow events are just standard JSF UI command outcomes. From the perspective of the controller developer, it's all Web Flow. As a result, verbose and limited navigation rules in faces-config.xml are replaced by modular, concise flow definitions based on a much richer flow definition language. The bottom line is you get all the advantages of the native JSF component model with all the strengths of the Web Flow navigation model.

### Getting Started

The best way to get started with Spring Web Flow in a JSF environment is to [download the 1.0.3 release](https://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517&release_id=502434) and deploy the [sellitem-jsf](http://static.springframework.org/spring-webflow/docs/1.0.3/reference/practical.html#sellitem-JSF-sample) sample, which is also [available for testing on-line](http://spring.ervacon.com/swf-sellitem-jsf/). The sample is importable as an Eclipse Dynamic Web Project for easy deployment inside Eclipse. In addition, the sample is Spring IDE 2.0 enabled, which is an Eclipse plugin that includes a [Graphical Web Flow Editor](http://www.springframework.org/node/429).

I'll briefly highlight getting started with Web Flow in a JSF environment with the sellitem-jsf sample to close out this entry.

##### Setting up the Faces Config (Boilerplate)

To plug Web Flow in the custom integration artifacts discussed above must be added to faces-config.xml:

```java
Copy
<application>
    <navigation-handler>org.springframework.webflow.executor.jsf.FlowNavigationHandler</navigation-handler>
    <variable-resolver>org.springframework.webflow.executor.jsf.DelegatingFlowVariableResolver</variable-resolver>
</application>

<lifecycle>
    <phase-listener>org.springframework.webflow.executor.jsf.FlowPhaseListener</phase-listener>
</lifecycle> 
```

##### Writing Your Flow Definitions (Meat)

Then you need your flow definitions that define your controller logic. This is the "sellitem" flow definition, which is a 4-step checkout flow with a single dynamic navigation rule that ultimately ends with confirmed sale transaction:

```java
Copy
<?xml version="1.0" encoding="UTF-8"?>
<flow xmlns="http://www.springframework.org/schema/webflow"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/webflow
                          http://www.springframework.org/schema/webflow/spring-webflow-1.0.xsd">

	<var name="sale" class="org.springframework.webflow.samples.sellitem.Sale" scope="conversation" />

	<start-state idref="enterPriceAndItemCount" />

	<view-state id="enterPriceAndItemCount" view="/priceAndItemCountForm.jsp">
		<transition on="submit" to="enterCategory"/>
	</view-state>

	<view-state id="enterCategory" view="/categoryForm.jsp">
		<transition on="submit" to="requiresShipping" />
	</view-state>

	<decision-state id="requiresShipping">
		<if test="${conversationScope.sale.shipping}" then="enterShippingDetails" else="processSale" />
	</decision-state>

	<view-state id="enterShippingDetails" view="/shippingDetailsForm.jsp">
		<transition on="submit" to="processSale" />
	</view-state>

	<action-state id="processSale">
		<bean-action bean="saleProcessor" method="process">
			<method-arguments>
				<argument expression="conversationScope.sale" />
			</method-arguments>
		</bean-action>
		<transition on="success" to="showCostOverview" />
	</action-state>

	<end-state id="showCostOverview" view="/costOverview.jsp" />

</flow>
```

##### Setting Up the Web Flow Config (Boilerplate)

The flow definitions should be registered in a registry so they are eligible for execution:

```java
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:flow="http://www.springframework.org/schema/webflow-config"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-2.0.xsd
           http://www.springframework.org/schema/webflow-config
           http://www.springframework.org/schema/webflow-config/spring-webflow-config-1.0.xsd">

	<!-- Launches, continues, and refreshes flow executions -->
	<flow:executor id="flowExecutor" registry-ref="flowRegistry"/>
	
	<!-- Creates the registry of flow definitions eligible for execution in this application -->
	<flow:registry id="flowRegistry">
		<flow:location path="/WEB-INF/flows/sellitem-flow.xml" />
	</flow:registry>

</beans>
```

##### Launching a Flow Execution

Once registered, launch a flow simply by pointing your browser at the FacesServlet with the flow identifier provided as input:

```html
Copy
http://localhost:8080/sellitem-jsf/servlet.faces?_flowId=sellitem-flow
```

It is worth noting you can configure the format of flow definition and execution URLs - for example, to turn on REST-style URLs instead of the default request-parameter based URLs.

##### Implementing the JSF views

As discussed JSF views are just plain JSF views whether they are JSP-based or Facelet-based, with standard JSF binding expressions for accessing conversational state and standard UI commands for signaling Web Flow events. The sellitem-jsf sample uses JSPs-based views:

```html
Copy
<f:view>
<div id="content">
	<h2>Enter price and item count</h2>
	<hr>
	<table>
		<h:form id="priceAndItemCountForm">
			<tr>
				<td>Price:</td>
				<td>
					<h:inputText id="price" value="#{sale.price}" required="true">
					  <f:validateDoubleRange minimum="0.01"/>
					</h:inputText>
				</td>
				<td>
					<h:message for="price" errorClass="error"/>
				</td>
			</tr>
			<tr>
				<td>Item count:</td>
				<td>
					<h:inputText id="itemCount" value="#{sale.itemCount}" required="true">
					  <f:validateLongRange minimum="1"/>
					</h:inputText>
				</td>
				<td>
					<h:message for="itemCount" errorClass="error"/>
				</td>
			</tr>
			<tr>
				<td colspan="2" class="buttonBar">
					<h:commandButton type="submit" value="Next" action="submit"/>
				</td>
				<td></td>
			</tr>
		</h:form>
	</table>
</div>
</f:view>
```

That's it! You can [try out the application](http://spring.ervacon.com/swf-sellitem-jsf/servlet.faces?_flowId=sellitem-flow) and see for yourself how Web Flow cares for navigation and application controller logic, while JSF UI components care for content rendering and data binding and validation behavior. It really is a great fit.

### Future

We didn't just get here by accident, we got here by working with clients building applications with Spring Web Flow and JSF everyday on our forums and support centers. Special thanks go out to Jeremy Grelle, James Clinton, Ed Burns, Craig McClanahan, and Colin Sampaleanu for all their contributions in getting the Spring Web Flow JSF integration to where it is today - rock solid.

Work on Spring Web Flow 1.1 has begun, and greater levels of integration is a major theme in an exciting roadmap. Notable on the JSF front, we will be adding support for the Unified Expression Language (EL) within flow definitions, as well as support for leveraging Spring 2.0 as a comprehensive provider of JSF managed-beans beans across all scopes - including the conversational scopes provided by Spring Web Flow. This work is in addition to new core features that will benefit Web Flow users in all environments, such as support for conversation scoped persistence contexts. Participate in the [1.1 Roadmap discussion](http://forum.springframework.org/showthread.php?t=37742) on the forums for more information and to get involved!

I'd also like to take this opportunity to encourage those already using Spring Web Flow in a JSF environment to speak out about your experience--send me an email, leave a comment here, write an article on JSF central, tell leaders in the JSF community about your experience. Your real world experience can help influence the direction of the JSF 2.0 specification in a time where the specification lead has [asked for community feedback](http://weblogs.java.net/blog/edburns/archive/2007/03/prejcpfiled_dra_1.html). Interface21 has been extended an invitation from Ed Burns, the JSF specification lead, to be a part of the JSF 2.0 expert group, which is a recognition of Web Flow's contribution as an innovative JSF extension. We have accepted that invitation and are excited about helping channel whats proven to work in the area of navigation and state management on a general basis back into JSF 2.0, while continuing to chart new territory and remaining usable in *any* environment.