---
title: Introducing Spring Social\'s Service Provider Framework
source: https://spring.io/blog/2011/03/02/introducing-spring-social-s-service-provider-framework
scraped: 2026-02-24T08:45:11.383Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Craig Walls |  March 02, 2011 | 0 Comments
---

# Introducing Spring Social's Service Provider Framework

_Engineering | Craig Walls |  March 02, 2011 | 0 Comments_

In my [previous post](http://blog.springsource.com/2010/11/03/socializing-spring-applications/), I introduced you to Spring Social's Java bindings to popular Software-as-a-Service (SaaS) APIs such as Twitter, Facebook, LinkedIn, and TripIt. In addition to providing simple, strongly-typed Java methods for common API operations, these bindings ensure each HTTP request includes the credentials required to authorize your application to invoke the API on behalf of a user.

What my first post did not address was: *how do we manage the credentials required to invoke service APIs on behalf of users?* I'm pleased to say that we now have answers to that question.

Earlier this week, we announced the release of the second milestone of the Spring Social project. The most significant new feature in Spring Social 1.0.0.M2 is the introduction of a Service Provider "Connect" framework. Today I want to introduce you to this framework and show you how to use it to manage "connections" to SaaS providers.

The examples in this article are from the [Spring Social Showcase](https://github.com/SpringSource/spring-social-samples). To follow along, clone the repository and follow the README to build and deploy the sample app.

### Getting Spring Social

With the M2 release, Spring Social has been split into several modules:

-   **spring-social-core** - The service provider framework, OAuth support, and core classes.
-   **spring-social-web** - The connect controller and supporting types.
-   **spring-social-facebook** - A service provider implementation for connecting with Facebook and support for signing into an application via Facebook.
-   **spring-social-twitter** - A service provider implementation for connecting with Twitter and support for signing into an application via Twitter.
-   **spring-social-linkedin** - A service provider implementation for connecting with LinkedIn.
-   **spring-social-tripit** - A service provider implementation for connecting with TripIt.
-   **spring-social-github** - A service provider implementation for connecting with GitHub.
-   **spring-social-gowalla** - A service provider implementation for connecting with Gowalla.
-   **spring-social-test** - Support for testing service provider implementations and API bindings.

Depending on your needs, you won't necessarily need all of these modules. At a minimum, you'll need the core module. You can add this to a Maven-built project with the following entry:

```xml
Copy
<dependency>
    <groupId>org.springframework.social</groupId>
    <artifactId>spring-social-core</artifactId>
    <version>1.0.0.M2</version>
</dependency>
```

In the likely case that you'll be using Spring Social in a web application, you'll also need the web module:

```xml
Copy
<dependency>
    <groupId>org.springframework.social</groupId>
    <artifactId>spring-social-web</artifactId>
    <version>1.0.0.M2</version>
</dependency>
```

Then, you'll need to add one or more of the provider modules. In our examples, we'll be talking about adding Twitter connectivity to an application, so we'll need the twitter module:

```xml
Copy
<dependency>
    <groupId>org.springframework.social</groupId>
    <artifactId>spring-social-twitter</artifactId>
    <version>1.0.0.M2</version>
</dependency>
```

Since we're building off of a milestone release of Spring Social, we're going to need to add Spring's milestone repository to the pom.xml file:

```xml
Copy
<repository>
	<id>org.springframework.maven.milestone</id>
	<name>Spring Maven Milestone Repository</name>
	<url>http://maven.springframework.org/milestone</url>
	<snapshots><enabled>false</enabled></snapshots>
</repository>
```

Note that although Spring Social 1.0.0.M2 has a compile-time dependency on Spring Framework 3.1, Spring Social also works fine with Spring Framework 3.0.x.

With the dependencies addressed in our build, we're ready to add Twitter connectivity to the application.

### Connecting with Twitter

To help understand what Spring Social's Service Provider "Connect" Framework brings to the table, let's take a quick tour through the showcase application.

After signing into the showcase sample, the first thing you'll see are a list of the service providers that the showcase supports connectivity with: Twitter, Facebook, and TripIt. They should all show that your account is not yet connected to any of them.

[![](http://blog.springsource.com/wp-content/uploads/2011/03/showcase11.png "showcase1")](http://blog.springsource.com/wp-content/uploads/2011/03/showcase11.png)

If you click on the Twitter link, you'll be redirected to a connection status page and be given the opportunity to "Connect with Twitter". You'll also see a checkbox that, if checked, will post a tweet about Spring Social Showcase after connecting to Twitter.

[![](http://blog.springsource.com/wp-content/uploads/2011/03/showcase21.png "showcase2")](http://blog.springsource.com/wp-content/uploads/2011/03/showcase21.png)

After clicking the "Connect with Twitter" button (I'll let you decide whether or not to check the "Post tweet..." checkbox), you'll be redirected to Twitter's authorization page, which should look something like this:

[![](http://blog.springsource.com/wp-content/uploads/2011/03/showcase31.png "showcase3")](http://blog.springsource.com/wp-content/uploads/2011/03/showcase31.png)

The username and password fields won't be shown if you're already signed into Twitter. But in either case, you'll be given an opportunity to deny or allow the showcase example the right to access and update your data on Twitter. When you click on the "Allow" button to grant permission, Twitter will redirect back to the showcase application and a connection will be created between the showcase account and your Twitter profile. You'll be shown a connection status page, this time indicating that a connection exists.

[![](http://blog.springsource.com/wp-content/uploads/2011/03/showcase41.png "showcase4")](http://blog.springsource.com/wp-content/uploads/2011/03/showcase41.png)

At this point, you may choose to disconnect from Twitter if you'd like. But for now, return to the home page and you'll see that you are now connected to Twitter.

[![](http://blog.springsource.com/wp-content/uploads/2011/03/showcase51.png "showcase5")](http://blog.springsource.com/wp-content/uploads/2011/03/showcase51.png)

If you click on the "Twitter" link, with a connection available, you'll be taken to the Twitter Showcase page which displays, among other things, your profile image, Twitter display name, and Twitter screen name. You may also choose to connect another Twitter account from here (you may connect multiple provider accounts to a single application account), disconnect from Twitter, or post a tweet.

[![](http://blog.springsource.com/wp-content/uploads/2011/03/showcase61.png "showcase6")](http://blog.springsource.com/wp-content/uploads/2011/03/showcase61.png)

### The Service Provider "Connect" Framework

When you first clicked on the "Twitter" link in the showcase sample, you were shown a status connection page for Twitter. This page is served by Spring Social's `ConnectController`. `ConnectController` is a Spring MVC controller that handles the authorization process. In the case of Twitter, that's an OAuth 1 authorization flow. For OAuth 1, `ConnectController` supports the following flow:

-   **GET /connect/{provider ID}** - Displays a page with the connection status.
-   **POST /connect/{provider ID}** - Initiates the connection flow, requests a request token from the provider, and redirects to the provider's authorization page.
-   **GET /connect/{provider ID}?oauth\_token={request token}&oauth\_verifier={verifier}** - Handles the callback after authorization, exchanges the request token and verifier for an access token, and creates the connection.
-   **DELETE /connect/{provider ID}** - Disconnects from the provider.

`ConnectController` also supports OAuth 2's authorization flow. When authorizing against an OAuth 2 based provider like Facebook, `ConnectController`'s flow is slightly different:

-   **GET /connect/{provider ID}** - Displays a connection status page
-   **POST /connect/{provider ID}** - Initiates authorization with the provider, redirecting to the provider's signin and/or authorization page.
-   **GET /connect/{provider ID}?code={code}** - Handles the authorization callback from the provider, exchanges the code for an access token, and creates the connection.
-   **DELETE /connect/{provider ID}** - Disconnects from the provider

`ConnectController` can be configured in a Spring MVC application as simple as adding the following `<bean>` element:

```xml
Copy
<bean class="org.springframework.social.web.connect.ConnectController">
    <constructor-arg value="${application.url}" />
</bean>
```

If you look at how `ConnectController` is configured in the showcase sample, however, you'll see that it has an `interceptors` property injected with a list of interceptor beans. Connect interceptors let you inject custom functionality into the connection flow. One of those interceptors, `TweetAfterConnectInterceptor`, is responsible for posting a tweet after you connect with Twitter. (See the [reference documentation](http://static.springsource.org/spring-social/docs/1.0.0.M2/reference/html/connecting.html#connect-interceptors) for more information on connection interceptors.)

When a request goes to `ConnectController`, it works with a service provider class to handle the behind-the-scenes interaction with the service. In the case of Twitter, that provider class is `TwitterServiceProvider` and is configured in Spring like this:

```xml
Copy
<bean class="org.springframework.social.twitter.connect.TwitterServiceProvider">
    <constructor-arg value="${twitter.appId}" />
    <constructor-arg value="${twitter.appSecret}" />
    <constructor-arg ref="connectionRepository" />
</bean>
```

`TwitterServiceProvider`, like all of Spring's service provider implementations, is constructed with the following arguments:

-   The application's ID or consumer key.
-   The application's secret or consumer secret.
-   A reference to a connection repository bean used to persist connection details.

You obtain the application's consumer key and secret when you register the application with the service provider. To register an application with Twitter go to [https://dev.twitter.com/apps/new](https://dev.twitter.com/apps/new) and fill out the form. When you're done, Twitter will respond with a page showing details about your application, including the consumer key and consumer secret.

In this case, the application's Twitter application ID and secret are expressed as placeholder variables to be resolved by a property placeholder configurer. It's recommended that you externalize these details, since you'll likely have a different ID/secret pair for your production deployment than you would for testing and development environments.

Each of Spring's service provider classes has a provider ID (returned from its `getId()` method and different than its Spring bean ID). `ConnectController` will use that ID, as specified in the URL path, to choose the service provider it will work with when creating connections. For `TwitterServiceProvider`, the provider ID is "twitter". Mapping this ID to `ConnectController`'s request mappings, we get the following flow:

-   **GET /connect/twitter** - Displays the user's connection status with Twitter.
-   **POST /connect/twitter** - A request token is retrieved from Twitter and then redirects to the Twitter's authorization page. This is where the flow went to when you clicked the "Connect with Twitter" button.
-   **GET /connect/twitter?oauth\_token={request token}&oauth\_verifier={verifier}** - Handles the callback after authorization, exchanges the request token and verifier for an access token, and creates the connection.
-   **DELETE /connect/twitter** - Disconnects from Twitter. This is what happens when you click the "Disconnect" button.

Once a connection has been established, it's important to store it away for future use so that you won't have to repeatedly ask your users to reauthorize your application. Therefore, `TwitterServiceProvider` relies on a connection repository to persist the connection information. Spring Social provides `JdbcConnectionRepository`, which persists connection details in a relational database. The `JdbcConnectionRepository` bean is configured like this:

```xml
Copy
<bean id="connectionRepository" class="org.springframework.social.connect.jdbc.JdbcConnectionRepository">
    <constructor-arg ref="dataSource" />
    <constructor-arg ref="textEncryptor" />
</bean>
```

The `JdbcConnectionRepository` depends on a data source through which it will access the database as well as an instance of Spring Security 3.1's `TextEncryptor` interface. It uses the text encryptor to encrypt the connection credentials (e.g., access token and secret) when storing them in the database. As a sample application, Spring Security's encryption needs are rather light, so it's wired with a no-op text encryptor:

```xml
Copy
<bean id="textEncryptor" class="org.springframework.security.crypto.encrypt.Encryptors" 
      factory-method="noOpText" />
```

(For production-level encryption, consider one of the other encryptors offered by Spring Security's [Encryptors](http://static.springsource.org/spring-security/site/docs/3.1.x/apidocs/org/springframework/security/crypto/encrypt/Encryptors.html) static factory class.)

### Working with connections

When you first signed into the Spring Social Showcase, it displayed a list of service providers and indicated that you were not connected with any of them. After going through the connection process with Twitter and returning to that page, it showed that a connection had been established.

The showcase application's `HomeController` determines the connection status with each of the providers, by calling their `isConnected()` method:

```java
Copy
for (ServiceProvider<?> serviceProvider : serviceProviders) {
	boolean connected = serviceProvider.isConnected(currentUser.getName());
	model.addAttribute(serviceProvider.getId() + "_status", connected ? "Yes" : "No");
}
```

The `isConnected()` method will return true if there is one or more connections between the given account and the service provider.

You may also ask the provider for a list of connections by calling its `getConnections()` method:

```java
Copy
List<ServiceProviderConnection<TwitterApi>> connections = twitterProvider.getConnections(currentUser.getName());
```

From any one of those connections, you may retrieve the service API. For example, to get an instance of `TwitterApi` from the first connection:

```java
Copy
TwitterApi twitter = connections.get(0).getServiceApi();
```

With that `TwitterApi` object you may interact with Twitter, fetching timeline entries, posting tweets, or any of the other operations defined in the `TwitterApi` interface.

A key thing to notice here is that at no point is it necessary for application code to deal directly with access tokens and secrets in order to interact with the service. The service provider framework deals with those details under the covers.

### Summary

Spring Social 1.0.0.M2 brings a service provider framework to the table that greatly simplifies an application's role in obtaining authorization to access a service on behalf of a user and connecting the user's local application account to their account on the provider. Adding connection capabilities to a Spring application involves configuring a service provider as a bean in the Spring application context and Spring Social's `ConnectController` to handle the authorization process. The [reference documentation](http://static.springsource.org/spring-social/docs/1.0.0.M2/reference/html/serviceprovider.html) has more information on using Spring Social's service provider framework.

Although Spring Social 1.0.0.M2 only offers service provider implementations for 6 providers (Facebook, Twitter, LinkedIn, TripIt, GitHub, and Gowalla), the framework is easily extensible. In a followup article, I'll show you what goes into writing a custom service provider implementation, enabling you to use Spring Social's connection support for any provider you need to connect to.

As always, we are very interested in hearing your feedback. We encourage you to collaborate with us in the [forum](http://forum.springsource.org/forumdisplay.php?f=82) or by submitting enhancement requests in [issue tracking](http://jira.springsource.org/browse/SOCIAL).