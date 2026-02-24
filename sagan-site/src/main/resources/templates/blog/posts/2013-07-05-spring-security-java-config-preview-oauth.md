---
title: Spring Security Java Config Preview: OAuth
source: https://spring.io/blog/2013/07/05/spring-security-java-config-preview-oauth
scraped: 2026-02-24T08:02:32.662Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  July 05, 2013 | 0 Comments
---

# Spring Security Java Config Preview: OAuth

_Engineering | Rob Winch |  July 05, 2013 | 0 Comments_

This is the fourth post in my [five](http://blog.springsource.org/2013/07/02/spring-security-java-config-preview-introduction/) [part](http://blog.springsource.org/2013/07/03/spring-security-java-config-preview-web-security/) [blog](http://blog.springsource.org/2013/07/04/spring-security-java-config-preview-method-security/) series that introduces Spring Security Java configuration. In this post, we will discuss how Spring Security Java configuration can be extended by walking through Spring Security OAuth Java configuration support.

### [](#proof-of-concept)Proof of Concept

While the Spring Security Java configuration works well for very basic configuration, it is just a proof of concept. We have not ensured that all the functionality available in the XML namespace is present within its Java configuration support. It was important to ensure that Spring Security's Java configuration would work well with the Spring extensions. However, we did not want to wait until we implemented all the configuration functionality in the extensions before releasing Spring Security Java config. In the future, we plan to solidify the Spring Security OAuth Java configuration but for now it is more of a proof of concept than a complete solution.

### [](#hellooauth2serverconfiguration)HelloOAuth2ServerConfiguration

Spring Security's OAuth Java configuration supports a basic OAuth 2 server configuration. In its simplest form, it looks like this:

```java
Copy
@Configuration
@EnableWebSecurity
public class HelloOAuth2ServerConfiguration 
   extends OAuth2ServerConfigurerAdapter {
    private static final String RESOURCE_ID = "photos";

    
  @Autowired
  public void registerGlobal(AuthenticationManagerBuilder auth) throws Exception {
      auth
            .apply(new InMemoryClientDetailsServiceConfigurer())
                .withClient("my-client")
                    .resourceIds(RESOURCE_ID)
                    .authorizedGrantTypes("authorization_code","implicit")
                    .authorities("ROLE_USER")
                    .scopes("read","write")
                    .secret("secret");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeUrls()
                .anyRequest().authenticated()
                .and()
            .apply(new OAuth2ServerConfigurer())
                .resourceId(RESOURCE_ID);
    }
}
```

With this configuration we are now able to processes OAuth request. However, it has some limitations that will not work in many circumstances:

-   If user's are approving requests with the OAuth Server, we would still need to a Controller that processes "/oauth/confirm\_access"
-   There is no way to authenticate with a user rather than an OAuth client which means there is no way for a user to confirm access
-   Authorization is mapped to being authenticated, which is at best a naive implementation of authorization

### [](#securityconfigurer)SecurityConfigurer

Sitting these problems aside, let's take a look at what is happening. The OAuth2ServerConfigurer is an instance of SecurityConfigurer. When implementing SecurityConfigurer, it is recommended to extend SecurityConfigurerAdapter which is a base implementation of SecurityConfigurer.

By allowing HttpSecurity to accept a SecurityConfigurer, we can add extensions (like OAuth) that update the HttpSecurity object in more complex ways. In fact, methods like HttpSecurity.formLogin() are implemented using SecurityConfigurerAdapter implementations as well. The difference is that they are part of Spring Security's core modules and so there are convenience methods that perform the apply(SecurityConfigurerAdapter) for us.

Not only can we apply a SecurityConfigurer to the HttpSecurity object, we can also apply a SecurityConfigurer to the AuthenticationManagerBuilder. This is illustrated by the InMemoryClientDetailsServiceConfigurer. This means that the authentication mechanisms can be easily extended too.

What does this mean to you? Assume you have a more complicated Security configuration and want to share it across your company. You could allow engineers to copy paste the configuration everywhere. Alternatively, you can create your own SecurityConfigurerAdapter implementation that allows developers to focus on your company's custom DSL.

### [](#additional-oauth-samples)Additional OAuth Samples

Our sample configuration we provided was very simple, but it does not illustrate what to do in more realistic situations. We will not blog about these until we feel the OAuth support has been solidified further. However, there are additional samples that can get you started if you wish to try it out.

-   Spring Security JavaConfig's [sparklr application](https://github.com/SpringSource/spring-security-javaconfig/blob/master/samples/oauth2-sparklr/src/main/java/org/springframework/security/oauth/examples/sparklr/config/OAuth2ServerConfig.java)
-   [The Spring Rest Stack's](https://github.com/joshlong/the-spring-rest-stack) - oauth module

### [](#feedback-please)Feedback Please

If you encounter a bug, have an idea for improvement, etc please do not hesitate to bring it up! We want to hear your thoughts so we can ensure we get it right before the code is generally available. Trying out new features early is a good and simple way to give back to the community. This also ensures that the features you want are present and working as you think they should.

Please log any issues or feature requests to the [Spring Security JIRA](https://jira.springsource.org/browse/SEC) under the category "Java Config". After logging a JIRA, we encourage (but do not require) you to submit your changes in a pull request. You can read more about how to do this in the [Contributor Guidelines](https://github.com/SpringSource/spring-security/blob/master/CONTRIBUTING.md)

If you have questions on how to do something, please use the [Spring Security forums](http://forum.springsource.org/forumdisplay.php?33-Security) or [Stack Overflow with the tag spring-security](http://stackoverflow.com/questions/tagged/spring-security) (I will be monitoring them closely). If you have specific comments questions about this blog, feel free to leave a comment. Using the appropriate tools will help make it easier for everyone.

### [](#conclusion)Conclusion

Spring Security Java configuration used the OAuth support as a proof of concept to ensure it is ready for extension. In time, the OAuth support will be solidified into a replacement for the XML configuration. In my [last post](http://blog.springsource.org/2013/07/11/spring-security-java-config-preview-readability/) I discuss the readability of Spring Security Java Configuration.