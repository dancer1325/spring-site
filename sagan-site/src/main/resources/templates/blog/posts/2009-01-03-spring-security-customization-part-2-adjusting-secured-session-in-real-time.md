---
title: Spring Security customization (Part 2 - Adjusting secured session in real time)
source: https://spring.io/blog/2009/01/03/spring-security-customization-part-2-adjusting-secured-session-in-real-time
scraped: 2026-02-24T09:11:39.598Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  January 03, 2009 | 0 Comments
---

# Spring Security customization (Part 2 - Adjusting secured session in real time)

_Engineering | Oleg Zhurakousky |  January 03, 2009 | 0 Comments_

Imagine you are in the secured session (you are logged on and are authorized to access a particular resource), but your security infrastructure team has updated your rights and privileges. Perhaps you were given more rights and privileges or perhaps your rights were completely revoked. . . The problem is that your secured session is registered in session registry and until you log-off/log-on the Principal which represents you in this secured session will not be recreated. And what if the situation is even more dramatic (after all we are talking security here). . . You are a disgruntled employe and your immediate management found out about your "wrong doings", but it takes your company 5 meetings and 10 approval forms to get something done, and until that happens you are free to cause even more harm???

Obviously there are many business scenarios that could prompt for adjustment of user's privileges while such user is in session. And again in Spring Security there are obviously more then one way of accomplishing this. One way would be kicking people out of the system by using the session registry (which is actually intended for concurrent session control). Building a GUI or JMX enabling this, one can "expire" a user from the list of registered sessions. The next request they make will be rejected and the session will be invalidated, forcing the process of Authentication. However to make it more interesting and also to demonstrate yet another way of accomplishing the similar goal let's change scenario slightly and say that we don't want to completely invalidate user's secured session, but simply want to temporarily suspend it.

Now, the word *suspend* in the context of security could mean a lot of different things. It could mean a temporary suspension or it could mean a total revocation of rights. I'll leave it up to you to define the meaning of this word in whatever context. . . What I would rather do is to show you how secured session could be adjusted in real time using Spring Security components such as *AccessDecisionVoter* and *AccessDesisionManager*. Also in the following example we will adjust the current secured session by temporarily suspending user's rights without invalidating his/hers session.

To accomplish this we need to follow these steps.

*1\. In Spring Security configuration define AccessDecisionManager     1.1 Define basic voters such as RoleVoter and AuthenticatedVoter 2. Define and implement AccessDecisionVoter. This voter must maintain a list of users whose rights were revoked and must vote ACCESS\_DENIED each time a user performs a secured operation. 3. Add this voter to the stack of voters already registered with AccessDecisionManager.*

Also, to be able to interact with this voter during the course of the application runtime let's also JMX enable this voter by dynamically exporting it as JMX bean using Spring JMX.

That is pretty much it.

So, first we need to define *AccessDecisionManager* (ADM). Since we are using Spring Security name space (whenever we can) configuration elements such as **"security:http"**, Spring Security will register default *AccessDecisionManager* for us, which happens to be [AffirmativeBased](http://static.springsource.org/spring-security/site/apidocs/org/springframework/security/vote/AffirmativeBased.html) ADM. That is not good for us since we are trying to be a bit more conservative here. So, what we are going to do is define [UnanimousBased](http://static.springsource.org/spring-security/site/apidocs/org/springframework/security/vote/UnanimousBased.html) ADM and override default ADM of **"security:http"** element using *access-decision-manager-ref* attribute pointing to *UninimousBased* ADM (see below)

` <!-- Define custom Voter --> <bean id="suspendVoter" class="org.springframework.security.sample.SuspendRealTimeVoter"/>` ` <!-- Define AccessDesisionManager as UnanimousBased --> <bean id="accessDecisionManager" class="org.springframework.security.vote.UnanimousBased">   <property name="decisionVoters">     <list> **      <ref bean="suspendVoter" />**       <bean class="org.springframework.security.vote.RoleVoter" />       <bean class="org.springframework.security.vote.AuthenticatedVoter" />     </list>   </property> </bean>`

We are also going to put our custom voter first in the order of voter's stack, knowing that in the Unanimous based decision making process the first NO means *no further evaluation should be performed*. Realizing that other voting decisions could be time consuming or performance intensive, registering custom voter first in voter stack will ensure that such voting operations are only performed if privileges are not suspended.

`<!-- Define http security configuration --> <security:http **access-decision-manager-ref="accessDecisionManager"** . . . . .> . . . . </security:http> `

The only thing left to do is JMX enable "suspendVoter". This is easily done using [Spring JMX](http://static.springframework.org/spring/docs/2.5.x/reference/jmx.html) . ` <!-- JMX enable custom Voter --> <bean class="org.springframework.jmx.export.MBeanExporter">   <property name="beans">     <map>       <entry **key="org.springframework.security:name=SuspendRealTimeVoter" value-ref="suspendVoter"** />     </map>   </property> </bean>`

Now **"suspendVoter"** will be exported into JMX server under name **org.springframework.security:name=SuspendRealTimeVoter**

From the code perspective the only custom component we need to implement is **SuspendRealTimeVoter** class. In it, we will maintain a Set of users whose rights have been temporarily revoked. Inside of *vote(..)* method our logic is rather simple. If user is in the list, vote ACCESS\_DENIED otherwise vote ACCESS\_GRANTED.

`  public int vote(Authentication authentication, Object object, ConfigAttributeDefinition config) {     String userName = authentication.getName();     return revokedUsers.contains(userName) ? ACCESS_DENIED : ACCESS_GRANTED; }  `

There you'll also see *suspend(String userName)* and *grant(String userName)* methods via which we will test this functionality.

NOTE: To interact with our voter via JMX we will be using JConsole tool provided by your JDK (1.5+) and therefore need to JMX enable our application server. For this example I am using Tomcat, so if you are using Tomcat add the following VM argument to its startup script

`  -Dcom.sun.management.jmxremote  `

Start the server, deploy the application and access its URL: *[http://localhost:8080/spring-security-sample-suspendUser](http://localhost:8080/spring-security-sample-suspendUser)*

After successful log on click on *refresh* few times to see that your session is alive and doing well. Then navigate to the *bin* directory of your JDK, open command prompt and type *jconsole* (see below)

[![](http://blog.springsource.com/wp-content/uploads/2009/01/picture-7.png "picture-7")](http://blog.springsource.com/wp-content/uploads/2009/01/picture-7.png)

When JConsole opens up click on MBeans tab. Navigate the tree and access SuspendRealTimeVoter.

[![](http://blog.springsource.com/wp-content/uploads/2009/01/picture-8.png "picture-8")](http://blog.springsource.com/wp-content/uploads/2009/01/picture-8.png)

You will see that *suspend(..)* and *grant(..)* methods are available under *Operations* tab. Suspend the rights of the user you are logged on as and refresh HTML page you are on. You will be presented with denied.html page. Un-suspend the user by calling *grant(..)* method for that user and you are back in business. Now if it does take 5 meetings and 10 approval forms you can temporarily revoke the rights of the user giving your managers enough time to make such decisions.

**Conclusion**

This was just one example demonstrating how secured session could be temporarily suspended using Voters. But I hope you can clearly see how the same approach could be used to accomplish other goals. Such goals could be re-authenticate user automatically or simply update the list of his/hers GrantedAuorities and so on.

Sample source code for this article could be downloaded from here: [spring-security-sample-suspenduser](http://blog.springsource.com/wp-content/uploads/2009/01/spring-security-sample-suspenduser.zip)