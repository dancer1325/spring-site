---
title: Spring Security Kerberos/SPNEGO Extension
source: https://spring.io/blog/2009/09/28/spring-security-kerberos-spnego-extension
scraped: 2026-02-24T09:03:47.210Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mike Wiesner |  September 28, 2009 | 9 Comments
---

# Spring Security Kerberos/SPNEGO Extension

_Engineering | Mike Wiesner |  September 28, 2009 | 9 Comments_

We're pleased to announce that the first milestone of the Spring Security Kerberos Extension is now available for [download](http://dist.springframework.org/milestone/EXTSEC/spring-security-kerberos-1.0.0.M1.zip). The release is also available through the Maven milestone repository at [http://maven.springframework.org/milestone](http://maven.springframework.org/milestone). With the Spring Security Kerberos Extension, your users are authenticated against your web application just by opening the URL. There is no need to enter a username/password and no need to install additional software.

Before going deeper into Kerberos, I would like to introduce [Spring Security Extensions](http://static.springsource.org/spring-security/site/extensions.html), a new [Spring Extension](http://www.springsource.org/extensions) project dedicated to provide extension modules for the core Spring Security project. Currently we have two extensions developed there: A SAML2 integration and a Kerberos/SPNEGO integration. Every module will have its own release cycle, so that people can benefit from these extensions as soon as they are ready and don't have to wait for the next Spring Security release. If you have any ideas or even some code for further extensions, please tell us!

## Kerberos/SPNEGO

In the first milestone of this module we provide you with an out-of-the-box Kerberos/SPNEGO solution for web applications. Kerberos is a standardized network authentication protocol, which is designed to provide strong authentication for client/server application, like web applications where the Browser is the client. It is also the recommended way to authenticate users in a Windows network and it replaces the outdated and relatively insecure NTLM. Besides this, it is widely used in \*NIX environments and there are implementations for every major platform. So, it is very likely that you already have Kerberos in place and now you can use this also in your own web application. That means that your user just enters the URL and he is automatically authenticated with his domain username, for example mikewiesner@SPRINGSOURCE.COM. You can then find out this username via Spring Security or even with request.getRemoteUser(). How does this work? Here is a brief overview: ![SPNEGO](http://blog.springsource.com/wp-content/uploads/2009/09/SPNEGO.png "SPNEGO")

The Browser sends a GET request to your web application (1), which then returns that "negotiate" authentication is required (2). The Browser will then ask the Kerberos Server to get a so called service ticket (3). The Browser then send this service ticket, which proves the identity of the caller, and some additional things to the web application (5). After validating the ticket, based on some shared secret between your web application and the Kerberos server, you get back the username.

For this to work, every web applications needs to be registered at the Kerberos server and gets a service prinicipal and a shared secret assigned. For web applications, the service principal must be "HTTP/<full qualified domain name>@DOMAIN". For example "HTTP/web.[springsource.com@SPRINGSOURCE.COM](mailto:springsource.com@SPRINGSOURCE.COM)", if your app runs on web.springsource.com. You then need to export the credentials of this principal to a keytab file (shared secret) and make this available to your application. Every Kerberos based system will work this way, but the creation of this service principal and the keytab is different between the systems. I will show you how you do this with Microsoft Windows and MIT Kerberos, but it should also work with other implementations.

## Creating service principal with Microsoft Windows 2008 Server

Although this refers to Microsoft Windows 2008 Server, it should be very similar in 2003 and even 2000 Server. In ActiveDirectory, you just create a normal domain user and then assign him a service principal (SPN), and create the keytab with a command line utility. And now step by step:

Create a normal user which will become the service principal. The username and the password is meaningless for Kerberos, but you should of course choose a useful name, like http-web.springsource.com. Just make sure that you deactivate the option "User must change password at next logon" and activate "Password never expires".

After that, you have to use the command line tool "ktpass.exe". It is already included in Windows 2008 Server, in earlier versions you have to install it yourself. Just make sure that you are using a version which matches to your server version and also the locale should match. This tool will assign the service principal name (SPN) to your earlier created user and will export the user key to a keytab file. If your service principal is "HTTP/web.[springsource.com@SPRINGSOURCE.COM](mailto:springsource.com@SPRINGSOURCE.COM)" and your user is http-web.springsource.com, then your ktpass command should look like this:

```bash
Copy
ktpass /out http-web.keytab /mapuser http-web.springsource.com@SPRINGSOURCE.COM /princ HTTP/web.springsource.com@SPRINGSOURCE.COM  /pass *
```

ktpass will prompt you for some password. You should choose some secure random one for it. If you now have a file http-web.keytab in your directory, then everything worked fine. This file is needed later in your application, as it contains the shared secret to validate the service tickets.

## Creating service principal with MIT Kerberos

On \*NIX systems and also in Mac OS X, the MIT Kerberos implementation is widely used. With MIT Kerberos it is even simpler. Just open the kadmin console and execute the following commands:

```bash
Copy
kadmin:  addprinc -randkey HTTP/web.springsource.com
kadmin:  ktadd -k /http-web.keytab HTTP/web.springsource.com
```

You should then have a file http-web.keytab under root. This file is later needed in your application, as it contains the shared secret to validate the service tickets.

## Configuring Spring Security

First of all, the requirements:

-   Spring Security 3.0.0 M2
-   SUN JRE/JDK 1.6.x
-   Kerberos environment
-   Browser which supports SPNEGO (Firefox, IE, Safari)

In order to use the Kerberos module in Spring Security, you just have to declare a filter, an authentication entry point and an authentication provider. We included a sample web app which you can use as as starting point. You just have to configure your service principal name and place your generate keytab there. The sample app is included in the [download](http://www.springsource.com/products/spring-community-download) mentioned above.

If you open the security.xml file of the sample application, which is under /src/main/webapp/WEB-INF, you see a basic Spring Security configuration which uses the new Kerberos module.

```xml
Copy
<sec:http entry-point-ref="spnegoEntryPoint">
	<sec:intercept-url pattern="/secure/**" access="IS_AUTHENTICATED_FULLY" />
	<sec:custom-filter ref="spnegoAuthenticationProcessingFilter" position="BASIC_PROCESSING_FILTER" />
</sec:http>

<bean id="spnegoEntryPoint" class="org.springframework.security.extensions.kerberos.web.SpnegoEntryPoint" />

<bean id="spnegoAuthenticationProcessingFilter" class="org.springframework.security.extensions.kerberos.web.SpnegoAuthenticationProcessingFilter">
	<property name="authenticationManager" ref="authenticationManager" />
</bean>

<sec:authentication-manager alias="authenticationManager">
	<sec:authentication-provider ref="kerberosServiceAuthenticationProvider" />
</sec:authentication-manager>

<bean id="kerberosServiceAuthenticationProvider" class="org.springframework.security.extensions.kerberos.KerberosServiceAuthenticationProvider">
	<property name="ticketValidator">
		<bean class="org.springframework.security.extensions.kerberos.SunJaasKerberosTicketValidator">
			<property name="servicePrincipal" value="HTTP/web.springsource.com" />
			<property name="keyTabLocation" value="classpath:http-web.keytab" />
		</bean>
	</property>
	<property name="userDetailsService" ref="dummyUserDetailsService" />
</bean>

<!-- Just returns the User authenticated by Kerberos and gives him the ROLE_USER -->
<bean id="dummyUserDetailsService" class="org.springframework.security.extensions.kerberos.sample.DummyUserDetailsService"/>
```

The first two beans (SpnegoEntryPoint and SpnegoAuthenticationProcessingFilter) are responsible for the handshake, and the KerberosServiceAuthenticationProvider then finally validates the service ticket. Currently we only support the Kerberos/SPNEGO implementation which is included in SUN's JRE/JDK. As you only get back the username from Kerberos, you also need an UserDetailsService to fetch the roles and maybe some other user attributes. In this sample we just use a dummy implementation to make testing easier.

As you can see, we already filled in the service prinicipal name and the keytab location. Change these values for your need and make sure that the previously generated keytab is available under this location.

Now start your server and try to attempt a SPNEGO authentication. You should see your full domain username in the Browser. In your code you can retrieve the username with the normal Spring Security classes or even with the standard Java servlet call request.getRemoteUser(). If it doesn't work (maybe you see an empty page), check these things:

-   Check the logfile
-   Make sure that you use the full qualified domain name (not the IP adress and not the short name) in your URL.
-   If you are using Internet Explorer: Turn on "Windows Integrated Authentication" and make sure that the domain (in our case web.springsource.com) is listed in IE's local intranet site section.
-   If you are using Firefox: Have a look [here](http://grolmsnet.de/kerbtut/firefox.html).
-   If you are using a Windows client: Client and Server must be on different machines, because otherwise Windows will use NTLM instead of Kerberos.
-   Check if the time is synchronized on all involved machines.
-   If you're using Microsoft AD, you will find some further help here: [http://msdn.microsoft.com/en-us/library/ms995329.aspx](http://msdn.microsoft.com/en-us/library/ms995329.aspx)

Besides this, setting up a proper Kerberos environment can be complicated, and it is important to get this right before you start using the Spring Security Kerberos extension. Most of the problems we encounter during consulting are problems with the Kerberos environment and not with the application itself.

If you wan't to use the Spring Security Kerberos Extension in your own Maven project, you have to add the Spring Milestone Repository to your pom.xml. It should look like this:

```xml
Copy
<repositories>
	<repository>
		<id>spring-milestone</id>
		<name>Spring Portfolio Milestone Repository</name>
		<url>http://maven.springframework.org/milestone </url>
	</repository>
</repositories>
```

and of course the dependency:

```xml
Copy
<dependency>
	<groupId>org.springframework.security.extensions</groupId>
	<artifactId>spring-security-kerberos-core</artifactId>
	<version>1.0.0.M1</version>
</dependency>
```

There is still some work to do, for example to also provide Kerberos for Java clients and not only for the server, but we hope you'll try out this milestone release and provide some feedback. The [Community Forum](http://forum.springsource.org/forumdisplay.php?f=33) is the best place to ask questions or to start discussions on new features. Alternatively, if you find something amiss, you can raise a [Jira Issue](http://jira.springsource.org/browse/SES).