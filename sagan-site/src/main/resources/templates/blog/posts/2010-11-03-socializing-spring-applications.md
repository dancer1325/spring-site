---
title: Socializing Spring Applications
source: https://spring.io/blog/2010/11/03/socializing-spring-applications
scraped: 2026-02-24T08:51:33.506Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Craig Walls |  November 03, 2010 | 1 Comment
---

# Socializing Spring Applications

_Engineering | Craig Walls |  November 03, 2010 | 1 Comment_

Increasingly, web surfers are using the internet to connect with friends, family, and colleagues using social networking sites. Conversations that once took place over email are now taking place in short messages written on someone's Facebook wall or in a brief tweet on Twitter. Connections once made with a handshake are now created using LinkedIn. And when a face-to-face meetings are desired, travel details can be shared using TripIt.

Just as people are using these social networking sites to interact with each other, businesses are also finding ways to inject themselves into the social graph so that they can connect in a more personal way with their customers and also make their web sites an extension of their customers' social experiences.

This week, we are pleased to have released the first milestone of [Spring Social](http://www.springframework.org/spring-social), a new extension to Spring that aims to provide a platform upon which social-ready Spring applications may be built. I thought I'd take this opportunity to introduce you to Spring Social and give you a taste of what it offers.

### Securely Sharing Social Data

On the surface, developing applications that interact with the various social networks may appear straightforward. Since most of the social networks offer a REST API, Spring's `RestTemplate` would seem to be all you need. But you'll quickly discover that those social REST APIs are protected by [OAuth](http://oauth.net/) and that signing a request sent through `RestTemplate` with OAuth credentials is a non-trivial task.

OAuth is an open protocol that enables a user to share their data hosted on one or more service providers with another application. With access to that data, the application can aggregate, present, and process the information in ways that provide additional value beyond what the service providers themselves ever intended or imagined.

Virtually all of the major service providers support OAuth, including Twitter, Facebook, LinkedIn, TripIt, and Foursquare, as well as the Google and Yahoo APIs. Therefore, OAuth is essential to developing social-ready applications.

At the beginning of an OAuth-secured interaction is a back-and-forth conversation that is commonly known as the "OAuth Dance". In a typical OAuth Dance, there are three parties involved:

-   The service provider (such as Twitter or LinkedIn)
-   The user who wants to access or update data hosted by that service provider.
-   The consumer application that the user wants to share their data with.

The key steps in this dance are as follows:

1.  The consumer application directs the user to the service provider's site to sign in and authorize the consumer.
2.  Assuming that the user agrees to grant the consumer access to their data, the flow is sent back to the consumer application.
3.  The consumer application receives an access token from the service provider.

The access token received in step 3 is the "valet key" that must accompany any request to the service provider's REST API. In OAuth 1, this means that the access token, along with the request URL, parameters, and a few other bits of information are collected together in a base string, encrypted, and sent on the request in an `Authorization` header. Constructing this header and attaching it to the request is a complicated task. This is the reason that using `RestTemplate` to access OAuth-secured resources is difficult. If you get it wrong, the service provider will respond with an HTTP 401 for any resource you try to access and debugging the encrypted `Authorization` header is tricky.

### Working with Social Templates

A key component of Spring Social is its collection of social templates. These templates (which leverage `RestTemplate` under the covers) expose operations of the service providers that they model, handling the intricacies of adding OAuth `Authorization` headers for you.

Spring Social 1.0.0.M1 includes 4 social templates to choose from:

-   `TwitterTemplate`
-   `FacebookTemplate`
-   `LinkedInTemplate`
-   `TripItTemplate`

To use any of these templates, simply create an instance of it, providing the OAuth connection details through constructor arguments. For example, to create an instance of `TwitterTemplate`:

```java
CopyTwitterTemplate twitter = new TwitterTemplate(apiKey, apiSecret, accessToken, accessTokenSecret);
```

The four parameters to `TwitterTemplate`'s constructor are all Strings values. The API key and API secret are given to you when you register your application with Twitter (see [http://dev.twitter.com/apps/new](http://dev.twitter.com/apps/new)). The access token and access token secret are granted to your application on a per-user basis at the end of the OAuth Dance with Twitter. At this point, I'm going to assume that you've already obtained all four of these values; we'll circle back to how to manage API keys and tokens a little later.

Creating instances of the other social templates isn't much different. `LinkedInTemplate` and `TripItTemplate` each have constructors with the same argument list as the `TwitterTemplate` constructor shown above. Since Facebook's API security is based on OAuth 2, `FacebookTemplate` has a slightly simpler constructor that only requires the value of the access token:

```java
CopyFacebookTemplate facebook = new FacebookTemplate(accessToken);
```

Once you have an instance of one of these social templates, what can you do with it? If you're using `TwitterTemplate`, perhaps you want to know the authenticated user's Twitter screen name:

```java
CopyString screenName = twitter.getProfileId();
```

Or for something a bit more involved, maybe you could send a tweet on behalf of the user:

```java
Copytwitter.updateStatus("Hey, I'm tweeting with #Spring Social!");
```

Similarly, with a `FacebookTemplate` in hand, you can post to the user's wall:

```java
Copyfacebook.updateStatus("Spring Social can also post to Facebook!");
```

And if you want to examine a user's upcoming travel itineraries, `TripItTemplate`'s `getTrips()` can oblige:

```java
CopyList trips = tripIt.getTrips();
for(Trip trip : trips) {
    System.out.println("I'm traveling to " + trip.getPrimaryLocation() +
                                 " on " + trip.getStartDate());
}
```

This is just a sampling of the kinds of things you can do with Spring Social's templates. Check out the API documentation to see the other operations that are available.

### Managing OAuth Connections

When I created the `TwitterTemplate` instance above, I glossed over where the API key/secret and the access token came from. Initially, the access token would be received after a user authorizes the application to access their data hosted on the service provider. But you probably don't want to force your users to perform authorization every time they use your application, so you'll need a way to store the access tokens long-term for reuse in future sessions.

In its first milestone release Spring Social doesn't provide an OAuth token management strategy, leaving it up to the application to obtain and manage OAuth details for itself. This is something that we intend to address for 1.0 Milestone 2. In the meantime, however, we can look to [Greenhouse](http://git.springsource.org/greenhouse/greenhouse) for an example of how this might take shape.

In Greenhouse, all of the information about a service provider is stored in a relational database in a `ServiceProvider` table with the following schema:

[![](http://blog.springsource.com/wp-content/uploads/2010/11/SocialProvider1.png "SocialProvider")](http://blog.springsource.com/wp-content/uploads/2010/11/SocialProvider1.png)

As you can see, the `ServiceProvider` table includes, among other things, the provider's API key and secret. To access an individual service provider record, Greenhouse uses `JdbcServiceProviderFactory`, an implementation of a `ServiceProvider` interface:

```java
Copypackage com.springsource.greenhouse.connect;

public interface ServiceProviderFactory {

    ServiceProvider getServiceProvider(String name);

    <S> ServiceProvider<S> getServiceProvider(String name, Class<S> serviceType);

}
```

To retrieve a Twitter service provider from the database, Greenhouse simply calls the `getServiceProvider()` method, passing in "twitter" (the provider's name) as a parameter. In the case of Twitter, this ultimately returns an instance of `TwitterServiceProvider` which is an implementation of the `ServiceProvider` interface.

The ServiceProvider has several methods, but two of them are interesting with regard to token management. The first, `connect()`, is used by Greenhouse to create a connection between one of its users and their social identity on the service provider:

```java
Copyvoid connect(Long accountId, AuthorizedRequestToken requestToken);
```

At the point where the `connect()` method is called, Greenhouse has gone through enough of the OAuth dance to have an authorized request token in hand. Passing those along with the user's account ID will create a connection in the `AccountConnection` table. The `AccountConnection` table has the following schema:

[![](http://blog.springsource.com/wp-content/uploads/2010/11/AccountConnection1.png "AccountConnection")](http://blog.springsource.com/wp-content/uploads/2010/11/AccountConnection1.png)

With the connection having been made, you can use `ServiceProvider`'s `getServiceOperations()` method to get an instance of `TwitterOperations` (the interface that `TwitterTemplate` is based on):

```java
CopyTwitterOperations twitter = twitterProvider.getServiceOperations(accountId);
```

Under the covers of `getServiceOperations()`, the `ServiceProvider` implementation retrieves the access token and uses it along with its own API key and secret to construct a TwitterTemplate, freeing the application from having to deal with the access token directly.

In Greenhouse, the `TwitterOperations` instance is a request-scoped bean, created via a factory method in `ServiceProvidersApiConfiguration`, using Spring JavaConfig like this:

```java
Copy@Bean
@Scope(value="request", proxyMode=ScopedProxyMode.INTERFACES)
public TwitterOperations twitter(ServiceProvider<TwitterOperations> twitterProvider, @Value("#{request.getAttribute('account')}") Account account) {

    return twitterProvider.getServiceOperations(accountId(account));

}
```

As a Spring bean, the `TwitterOperations` can be injected into any other Spring bean that needs to exchange data with Twitter. For instance, in Greenhouse, the `EventsController` is the Spring MVC controller that handles web interaction for all event-oriented requests. It uses a `TwitterOperations` to post tweets about an event on the user's behalf. It is injected with the `TwitterOperations` bean through its constructor:

```java
Copy
@Inject
public EventsController(EventRepository eventRepository, TwitterOperations twitterApi) {
    this.eventRepository = eventRepository;
    this.twitterApi = twitterApi;
}
```

As I mentioned, we intend to transition the `ServiceProvider` facility from Greenhouse to Spring Social in milestone 2. Obviously, the current implementation supports relational storage of OAuth details, but we're eager to hear from you with ideas on other implementations that maintain OAuth information in other kinds of stores.

### Running Greenhouse

Although you can view the running Greenhouse application at [http://greenhouse.springsource.org](http://greenhouse.springsource.org), you'll probably want to checkout the Greenhouse source code and try it out for yourself as you explore Spring Social. To do that, follow the following steps:

1.  Checkout the Greenhouse source code:  
    `git clone git://git.springsource.org/greenhouse/greenhouse.git`
2.  Import the Greenhouse project into [SpringSource Tool Suite](http://www.springsource.com/developer/sts)
3.  Drag the Greenhouse project into the SpringSource tcServer (under the Servers tab) to deploy the application.
4.  Edit the run configuration for tcServer to add "-DspringProfiles=embedded" to the end of the list of VM arguments.
5.  Start the server and access http://localhost:8080/greenhouse in your web browser.

Step 4 is required because Greenhouse uses the new environment beans feature of Spring 3.1, which makes it possible to identify beans that will only be created for certain profiles. Setting that property indicates that the application should be run with the "embedded" profile.

### Conclusion

Spring Social 1.0 M1 is the first step in an exciting quest to bring social networking capabilities to Spring. I encourage you to [download Spring Social](http://www.springsource.com/download/community?project=Spring%20Social), [check out the code](http://git.springsource.org/spring-social), and provide feedback either through [issue tracking](http://jira.springsource.org/browse/SOCIAL), the [Spring Social Forum](http://forum.springsource.org/forumdisplay.php?f=82), or via the [Greenhouse mailing list](https://lists.springsource.com/listmanager/listinfo/greenhouse-dev).