---
title: Behind the Spring Security Namespace
source: https://spring.io/blog/2010/03/06/behind-the-spring-security-namespace
scraped: 2026-02-24T08:59:29.485Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Luke Taylor |  March 06, 2010 | 0 Comments
---

# Behind the Spring Security Namespace

_Engineering | Luke Taylor |  March 06, 2010 | 0 Comments_

With the introduction of the security schema in Spring Security 2, it became much easier to get a simple secured application up and running. In older versions, users had to declare and wire-up all the implementation beans individually, resulting in large and complicated Spring application context files which were difficult to understand and maintain. There was a pretty steep learning curve and I can still remember that it took me some time to get my head round it all when I started working on the project (then Acegi Security), back in 2004. On the positive side, this exposure to the basic building blocks of the framework meant that once you had managed to put together a working configuration, it was almost impossible not to have gained at least some awareness of the important classes and how they work together. This knowledge in turn put you in a good position to take advantage of the opportunities for customization that are one of the biggest benefits of using Spring Security.

We now have many Spring Security users who have started out using the namespace and have benefited from the simplicity and rapid development opportunities that it offers, but things get more difficult when you want to move beyond the features offered by the namespace. At that point you have to start to understand the framework architecture and how your custom classes will fit in. You have to know which classes to extend, which strategy interfaces to implement and where to plug them in. The learning curve is still there, it has just moved. The namespace intentionally provides a high-level view of the problem domain addressed by Spring Security and as such it actually hides the implementation details, making it difficult to know what is really going on. It does provide a lot of extension points, but for whatever reason you may feel you need to dig deeper.

In this article we'll take a look at a simple namespace configuration for a web application and what it would look like as a full-blown Spring bean configuration. We won't go into all the details of what the beans do, but you can find more information on specific classes and interfaces in the reference manual and Javadoc. The material here is mainly targeted at existing users who are already familiar with the basics, so if you haven't used Spring Security before you should at least read the namespace chapter in the [reference manual](http://static.springsource.org/spring-security/site/docs/3.0.x/reference/ns-config.html) and spend some time looking at the sample applications.

## Namespace Configuration

First let's look at the namespace configuration we want to replace.

```xml
Copy
<beans:beans xmlns="http://www.springframework.org/schema/security"
    xmlns:beans="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
      http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
      http://www.springframework.org/schema/security http://www.springframework.org/schema/security/spring-security-3.0.xsd">

    <http>
        <intercept-url pattern="/secure/extreme/**" access="ROLE_SUPERVISOR" />
        <intercept-url pattern="/secure/**" access="IS_AUTHENTICATED_FULLY" />
        <intercept-url pattern="/login.htm" access="IS_AUTHENTICATED_ANONYMOUSLY" />
        <intercept-url pattern="/images/*" filters="none" />
        <intercept-url pattern="/**" access="ROLE_USER" />
        <form-login login-page="/login.htm" default-target-url="/home.htm" />
        <logout logout-success-url="/logged_out.htm" />
    </http>

    <authentication-manager>
        <authentication-provider>
            <password-encoder hash="md5"/>
            <user-service>
                <user name="bob" password="12b141f35d58b8b3a46eea65e6ac179e" authorities="ROLE_SUPERVISOR, ROLE_USER" />
                <user name="sam" password="d1a5e26d0558c455d386085fad77d427" authorities="ROLE_USER" />
            </user-service>
        </authentication-provider>
    </authentication-manager>

</beans:beans>
```

This is a pretty straightforward example, similar to what you'll see in online examples and the sample applications that come with the project. It defines an in-memory list of user accounts to authenticate against, with a list of authorities (in this case simple roles) for each user. It also configures a set of protected URL patterns within the web application, a form-based authentication mechanism and support for a basic logout URL.

How would we reproduce this with an old-fashioned bean configuration? Time for a trip down memory lane for those who were around in the Acegi Security days.

## Spring Bean Version

### Authentication Beans

Let's look at the <authentication-manager> element first, which (as of Spring Security 3.0) must be declared in any namespace-based configuration. In this example, the <http> part depends on this element (the form-login authentication mechanism uses it to authenticate against). The actual dependency is on the interface AuthenticationManager, which encapsulates the authentication services provided by a Spring Security configuration. You could provide your own implementation at this level, but most people use the default, ProviderManager, which delegates to a list of AuthenticationProvider instances. The configuration could look like this:

```xml
Copy
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:sec="http://www.springframework.org/schema/security"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
      http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
      http://www.springframework.org/schema/security http://www.springframework.org/schema/security/spring-security-3.0.xsd">

    <bean id="authenticationManager" class="org.springframework.security.authentication.ProviderManager">
        <property name="providers">
            <list>
                <ref bean="authenticationProvider" />
                <ref bean="anonymousProvider" />
            </list>
        </property>
    </bean>

    <bean id="authenticationProvider" class="org.springframework.security.authentication.dao.DaoAuthenticationProvider">
        <property name="passwordEncoder">
            <bean class="org.springframework.security.authentication.encoding.Md5PasswordEncoder" />
        </property>
        <property name="userDetailsService" ref="userService" />
    </bean>

    <bean id="anonymousProvider" class="org.springframework.security.authentication.AnonymousAuthenticationProvider">
        <property name="key" value="SomeUniqueKeyForThisApplication" />
    </bean>

    <sec:user-service id="userService">
        <sec:user name="bob" password="12b141f35d58b8b3a46eea65e6ac179e" authorities="ROLE_SUPERVISOR, ROLE_USER" />
        <sec:user name="sam" password="d1a5e26d0558c455d386085fad77d427" authorities="ROLE_USER" />
    </sec:user-service>

</beans>
```

At this stage we've left the <user-service> element in place to illustrate that it can be used in isolation to create a UserDetailsService instance which is injected into the DaoAuthenticationProvider. We've also switched to using "beans" as the default XML namespace. We'll assume this from now on. UserDetailsService is an important interface in the framework and is just a DAO for user information. Its only responsibility is to load the data for a named user account. The bean equivalent would be

```xml
Copy
<bean id="userService" class="org.springframework.security.core.userdetails.memory.InMemoryDaoImpl">
    <property name="userMap">
        <value>
            bob=12b141f35d58b8b3a46eea65e6ac179e,ROLE_SUPERVISOR,ROLE_USER
            sam=d1a5e26d0558c455d386085fad77d427,ROLE_USER
        </value>
    </property>
</bean>
```

In this case, the namespace syntax is clearer, but you may want to use your own UserDetailsService implementation. Spring Security also has standard JDBC and LDAP-based versions. We've also added in an AnonymousAuthenticationProvider which is purely there to support the AnonymousAuthenticationFiter which appears in the web configuration below.

### Web Beans

Now we'll take a look at how the <http> block can be expanded. This is more complicated as the created beans do not not map as obviously to the element names used in the namespace.

#### The FilterChainProxy

As you probably already know, Spring Security's web functionality is implemented using servlet filters. It maintains its own chain of filters in the application context and delegates to this using an instance of Spring's DelegatingFilterProxy defined in the web.xml file. The class which implements this delegate filter chain (or potentially multiple chains) is called FilterChainProxy. You can think of the <http> block as creating the FilterChainProxy bean. FilterChainProxy has a property called filterChainMap, which is a map of patterns to lists of filter beans. So for example, you might have something like this:

```xml
Copy
    <bean id="filterChainProxy" class="org.springframework.security.web.FilterChainProxy">
        <property name="matcher">
            <bean class="org.springframework.security.web.util.AntUrlPathMatcher"/>
        </property>
        <property name="filterChainMap">
            <map>
                <entry key="/somepath/**">
                    <list>
                      <ref local="filter1"/>
                    </list>
                </entry>
                <entry key="/images/*">
                    <list/>
                </entry>
                <entry key="/**">
                    <list>
                      <ref local="filter1"/>
                      <ref local="filter2"/>
                      <ref local="filter3"/>
                    </list>
                </entry>
            </map>
        </property>
    </bean>
```

where filter1, filter2 etc. are the names of other beans in the application context which implement the javax.servlet.Filter interface.

So FilterChainProxy matches incoming requests to lists of filters and passes a request through the first matching chain it finds. Note that with the exception of the "/images/\*" pattern (which maps to an empty filter chain), these are not connected with the patterns in the <intercept-url< namespace elements. The <http> configuration is currently only capable of maintaining a single list of filters mapped to all requests (except those which are configured to bypass the filter chain completely).

Since the configuration above is a bit on the verbose side, there is a more compact namespace syntax which can be used to configure a FilterChainProxy map, without losing any functionality. The equivalent of the above would then be:

```xml
Copy
    <bean id="filterChainProxy" class="org.springframework.security.web.FilterChainProxy">
        <sec:filter-chain-map path-type="ant">
            <sec:filter-chain pattern="/somepath/**" filters="filter1"/>
            <sec:filter-chain pattern="/images/*" filters="none"/>
            <sec:filter-chain pattern="/**" filters="filter1, filter2, filter3"/>
        </sec:filter-chain-map>
    </bean>
```

The filter chains are now specified as an ordered list of bean names, in the order the filters will be applied. So what filters would our original namespace configuration create? In this case the FilterChainProxy would be:

```xml
Copy
    <alias name="filterChainProxy" alias="springSecurityFilterChain"/>

    <bean id="filterChainProxy" class="org.springframework.security.web.FilterChainProxy">
        <sec:filter-chain-map path-type="ant">
            <sec:filter-chain pattern="/images/*" filters="none"/>
            <sec:filter-chain pattern="/**" filters="securityContextFilter, logoutFilter, formLoginFilter, requestCacheFilter, 
                     servletApiFilter, anonFilter, sessionMgmtFilter, exceptionTranslator, filterSecurityInterceptor" />
        </sec:filter-chain-map>
    </bean>
```

So there are nine filters in there, some of which are optional and some of which are essential. At this point you can see that you are now exposed to many of the the details which the namespace protects you from. You control both the filters used and the order they are invoked in, both of which are crucial.

We've also added alias for the bean, to match the name used previously in web.xml. Alternatively, you could just use "filterChainProxy" directly.

#### The Filter Beans

We'll now look at those nine filter beans and the other beans that are required to support them.

```xml
Copy
<bean id="securityContextFilter" class="org.springframework.security.web.context.SecurityContextPersistenceFilter" >
    <property name="securityContextRepository" ref="securityContextRepository" />
</bean>

<bean id="securityContextRepository" 
        class="org.springframework.security.web.context.HttpSessionSecurityContextRepository" />

<bean id="logoutFilter" class="org.springframework.security.web.authentication.logout.LogoutFilter">
    <constructor-arg value="/logged_out.htm" />
    <constructor-arg>
        <list><bean class="org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler" /></list>
    </constructor-arg>
</bean>

<bean id="formLoginFilter" class="org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter">
    <property name="authenticationManager" ref="authenticationManager" />
    <property name="authenticationSuccessHandler">
        <bean class="org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler">
            <property name="defaultTargetUrl" value="/index.jsp" />
        </bean>
    </property>
    <property name="sessionAuthenticationStrategy">
        <bean class="org.springframework.security.web.authentication.session.SessionFixationProtectionStrategy" />
    </property>
</bean>

<bean id="requestCacheFilter" class="org.springframework.security.web.savedrequest.RequestCacheAwareFilter" />

<bean id="servletApiFilter" class="org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter" />

<bean id="anonFilter" class="org.springframework.security.web.authentication.AnonymousAuthenticationFilter" >
    <property name="key" value="SomeUniqueKeyForThisApplication" />
    <property name="userAttribute" value="anonymousUser,ROLE_ANONYMOUS" />
</bean>

<bean id="sessionMgmtFilter" class="org.springframework.security.web.session.SessionManagementFilter" >
    <constructor-arg ref="securityContextRepository" />
</bean>

<bean id="exceptionTranslator" class="org.springframework.security.web.access.ExceptionTranslationFilter">
    <property name="authenticationEntryPoint">
        <bean class="org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint">
            <property name="loginFormUrl" value="/login.htm"/>
        </bean>
    </property>
</bean>

<bean id="filterSecurityInterceptor" class="org.springframework.security.web.access.intercept.FilterSecurityInterceptor">
    <property name="securityMetadataSource">
        <sec:filter-security-metadata-source>
            <sec:intercept-url pattern="/secure/extreme/*" access="ROLE_SUPERVISOR"/>
            <sec:intercept-url pattern="/secure/**" access="IS_AUTHENTICATED_FULLY" />
            <sec:intercept-url pattern="/login.htm" access="IS_AUTHENTICATED_ANONYMOUSLY" />
            <sec:intercept-url pattern="/**" access="ROLE_USER" />
        </sec:filter-security-metadata-source>
    </property>
    <property name="authenticationManager" ref="authenticationManager" />
    <property name="accessDecisionManager" ref="accessDecisionManager" />
</bean>

```

Again, we've used a convenient namespace element, filter-security-metadata-source, to create the SecurityMetadataSource instance which is used by the FilterSecurityInterceptor, but you can insert your own bean here (see [this FAQ](http://static.springsource.org/spring-security/site/faq.html#faq-dynamic-url-metadata) for an example). The filter-security-metadata-source element creates an instance of DefaultFilterInvocationSecurityMetadataSource.

##### SecurityContextPersistenceFilter

This filter must be included in any filter chain. It is responsible for storing authentication information (a SecurityContext instance) between requests. It also for sets up the thread-local variable in which it is stored during a request and clears it when the request completes. Its default strategy is to store the SecurityContext in the HTTP session, hence the use of the HttpSessionSecurityContextRepository bean.

##### Access Control

FilterSecurityInterceptor sits at the end of the stack and applies the configured security contraints to incoming requests. If the request is not authorized (either because the user isn't authenticated, or because they don't have the required authorities) it will raise an exception. This will be handled by the ExceptionTranslationFilter which will either send the user an access denied message, or start the authentication process by invoking the configured AuthenticationEntryPoint. In this case, a LoginUrlAuthenticationEntryPoint is in use, which redirects the user to a login page. Before doing this, ExceptionTranslationFilter will cache the current request information, so that it can be restored after authentication, if required.

##### The Authentication Process

UsernamePasswordAuthenticationFilter is responsible for processing a submitted login form (it's created by the <form-login> namespace element). The bean has been configured with a SavedRequestAwareAuthenticationSuccessHandler which means that it will redirect the user to the URL that they originally requested before they were asked to authenticate. The original request is then restored by the RequestCacheFilter which using a request wrapper, allowing the user to continue from the point they left off.

##### Other Miscellaneous Filters

LogoutFilter is simply responsible for processing a logout link (/j\_spring\_security\_logout by default), clearing the security context and invalidating the session. AnonymousAuthenticationFilter is responsible for populating the security context for anonymous users, making it easier to apply default security restrictions which are relaxed for certain URLs. For example, in the above configuration, the IS\_AUTHENTICATED\_ANONYMOUSLY attribute implies that anonymous users can access the login page (but nothing else). Check out the chapter on this in the manual for more information. Its use is optional, and you can remove the extra AnonymousAuthenticationProvider if you aren't using it.

SecurityContextHolderAwareRequestFilter provides the standard servlet API security methods, using a request wrapper which accesses the SecurityContext. If you don't need these methods, you can omit this filter. SessionManagementFilter is responsible for applying a session-related strategy if the user is authenticated *during the current request* (for example, by remember-me authentication). In it's default configuration it will create a new session (copying the attributes from the existing one) with the aim of changing the session identifier, and providing a defence against session-fixation attacks. It is also used when Spring Security's concurrent session control is being used. In this configuration, the UsernamePasswordAuthenticationFilter is the only authentication mechanism in place, and is also injected with a SessionFixationProtectionStrategy. This means we can safely remove the session-management filter.

#### The AccessDecisionManager

If you've been paying close attention, you'll notice that we are still missing a bean reference from the above configuration. The security interceptor needs to be configured with an AccessDecisionManager. If you're using the namespace, then one is created internally, though you can also plug in a custom bean. Without the namespace, we need to supply one explicitly. The equivalent of the namespace internal version would look like this:

```xml
Copy
    <bean id="accessDecisionManager" class="org.springframework.security.access.vote.AffirmativeBased">
        <property name="decisionVoters">
            <list>
                <bean class="org.springframework.security.access.vote.RoleVoter"/>
                <bean class="org.springframework.security.access.vote.AuthenticatedVoter"/>                
            </list>
        </property>
    </bean>
```

#### WebInvocationPrivilegeEvaluator

This is another bean which is registered by the namespace, even though it it isn't directly required (it may be used in some JSP tags). It allows you to query whether the current user is allowed to invoke a particular URL. It can be useful in your controller beans to establish what information or navigation links should be made available in a presented view.

```xml
Copy
    <bean id="webPrivilegeEvaluator" class="org.springframework.security.web.access.DefaultWebInvocationPrivilegeEvaluator">
        <constructor-arg ref="filterSecurityInterceptor" />
    </bean>
```

##### Conclusion

Once again, this article isn't intended to explain in detail how all these beans work, but mainly to provide a reference to help to move on from a basic namespace configuration and to understand what lies underneath. As you can see, it's quite complicated! But remember that it's possible to plug quite a few of these beans into the namespace configuration itself, and you can now see where they're actually going. And now that you know which classes are involved, you know where to look for further information in the Spring Security Reference Manual, the Javadoc and of course the source code itself.