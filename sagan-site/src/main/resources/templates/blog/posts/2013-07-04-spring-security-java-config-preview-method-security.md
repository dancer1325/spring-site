---
title: Spring Security Java Config Preview: Method Security
source: https://spring.io/blog/2013/07/04/spring-security-java-config-preview-method-security
scraped: 2026-02-24T08:02:46.458Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  July 04, 2013 | 0 Comments
---

# Spring Security Java Config Preview: Method Security

_Engineering | Rob Winch |  July 04, 2013 | 0 Comments_

# [](#update)Update

Users should refer to the [Spring Security Reference](http://docs.spring.io/spring-security/site/docs/3.2.0.RC2/reference/htmlsingle/#jc) which contains more up to date information.

# [](#original-blog-post)Original Blog Post

This is the third installment of a four part blog series. In my [first post](http://blog.springsource.org/2013/07/02/spring-security-java-config-preview-introduction/), I introduced Spring Security Java configuration and discussed some of the logistics of the project. In [my previous post](http://blog.springsource.org/2013/07/03/spring-security-java-config-preview-web-security/), we walked through a few examples of configuring web based security.

In this post, I will discuss how to configure method based security using Spring Security Java configuration. Like our previous post, we will start off with a very basic example and follow it up with an example that performs a bit of customization.

### [](#methodsecurityservice)MethodSecurityService

While not terribly interesting, assume that we have a service called MethodSecurityService as shown below:

```java
Copy
public interface MethodSecurityService {
    @PreAuthorize("hasRole('ROLE_USER')")
    String requiresUserRole();
}
```

Our implementation is just as trivial, but will ensure we focus on Spring Security rather than our services.

```java
Copy
public class MethodSecurityServiceImpl implements 
      MethodSecurityService {
    
    public String requiresUserRole() {
        return "You have ROLE_USER";
    }
}
```

### [](#hello-method-security)Hello Method Security

By using `@EnableGlobalMethodSecurity` we can easily secure our methods with Java configuration. Note that `methodSecurityService` is not really part of our Security configuration, but we must create our `MethodSecurityService` using Spring so that it can have Security applied to it.

```java
Copy
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class HelloMethodSecurityConfig {
  @Bean
  public MethodSecurityService methodSecurityService() {
    return new MethodSecurityServiceImpl()
  }

  @Autowired
  public void registerGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth
        .inMemoryAuthentication()
          .withUser("user").password("password").roles("USER").and()
          .withUser("admin").password("password").roles("USER", "ADMIN");
    }
}
```

This configuration is fairly similar to the following XML configuration:

```xml
Copy
<global-method-security pre-post-annotations="enabled"/>
<authentication-manager>
  <authentication-provider>
    <user-service>
      <user name="user" password="password" authorities="ROLE_USER"/>
    </user-service>
  </authentication-provider>
</authentication-manager>
<beans:bean id="methodSecuriytService" class="MethodSecurityServiceImpl"/>
```

With our configuration, the invocation of requiresUserRole() on our methodSecurityService bean would require that the current user be authenticated with the role "ROLE\_USER". If the user was unauthenticated or did not have the role "ROLE\_USER" a AccessDeniedException would be thrown.

#### [](#custom-method-security)Custom Method Security

There are a number of additional attributes available on the @EnableWebSecurity annotation, but if you wish to customize method security in more advanced ways you will need to extend GlobalMethodSecurityConfiguration. An example where we customize the PermissionEvaluator can be seen below:

```java
Copy
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class CustomPermissionEvaluatorWebSecurityConfig extends GlobalMethodSecurityConfiguration {
  @Bean
  public MethodSecurityService methodSecurityService() {
    return new MethodSecurityServiceImpl()
  }

  @Override
  protected MethodSecurityExpressionHandler expressionHandler() {
    DefaultMethodSecurityExpressionHandler expressionHandler = new DefaultMethodSecurityExpressionHandler();
    expressionHandler.setPermissionEvaluator(new CustomPermissionEvaluator());
    return expressionHandler;
  }
  
  @Autowired
  public void registerGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth
        .inMemoryAuthentication()
          .withUser("user").password("password").roles("USER").and()
          .withUser("admin").password("password").roles("USER", "ADMIN");
    }
}
```

This is fairly similar to the following XML configuration:

```xml
Copy
<global-method-security pre-post-annotations="enabled">
  <expression-handler ref="expressionHandler"/>
</global-method-security>
<authentication-manager>
  <authentication-provider>
    <user-service>
      <user name="user" password="password" authorities="ROLE_USER"/>
    </user-service>
  </authentication-provider>
</authentication-manager>
<beans:bean id="methodSecuriytService" class="MethodSecurityServiceImpl"/>
<beans:bean id="expressionHandler" class="CustomExpressionHandler"/>
```

#### [](#additional-method-samples)Additional Method Samples

We have given a few examples of how the Spring Security Java Configuration can be used to secure your application with method level security. You can find additional samples in the spring-security-javaconfig project's github repository.

-   [Method Samples](https://github.com/SpringSource/spring-security-javaconfig/blob/master/samples-method.md)
-   [Complete Web Applications (some demo Method Security too)](https://github.com/SpringSource/spring-security-javaconfig/tree/master/samples)

### [](#feedback-please)Feedback Please

If you encounter a bug, have an idea for improvement, etc please do not hesitate to bring it up! We want to hear your thoughts so we can ensure we get it right before the code is generally available. Trying out new features early is a good and simple way to give back to the community. This also ensures that the features you want are present and working as you think they should.

Please log any issues or feature requests to the [Spring Security JIRA](https://jira.springsource.org/browse/SEC) under the category "Java Config". After logging a JIRA, we encourage (but do not require) you to submit your changes in a pull request. You can read more about how to do this in the [Contributor Guidelines](https://github.com/SpringSource/spring-security/blob/master/CONTRIBUTING.md)

If you have questions on how to do something, please use the [Spring Security forums](http://forum.springsource.org/forumdisplay.php?33-Security) or [Stack Overflow with the tag spring-security](http://stackoverflow.com/questions/tagged/spring-security) (I will be monitoring them closely). If you have specific comments questions about this blog, feel free to leave a comment. Using the appropriate tools will help make it easier for everyone.

#### [](#conclusion)Conclusion

You should now have an understanding of how to configure method based security using Spring Security Java configuration support. In the [next post](http://blog.springsource.org/2013/07/05/spring-security-java-config-preview-oauth/), we will demonstrate how Spring Security is designed for extension by walking through the OAuth Java Configuration proof of concept.