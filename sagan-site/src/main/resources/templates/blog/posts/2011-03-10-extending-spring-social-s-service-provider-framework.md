---
title: Extending Spring Social\'s Service Provider Framework
source: https://spring.io/blog/2011/03/10/extending-spring-social-s-service-provider-framework
scraped: 2026-02-24T08:44:47.857Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Craig Walls |  March 10, 2011 | 0 Comments
---

# Extending Spring Social's Service Provider Framework

_Engineering | Craig Walls |  March 10, 2011 | 0 Comments_

[Last week](http://blog.springsource.com/2011/03/02/introducing-spring-socials-service-provider-framework/), I introduced you to Spring Social's Service Provider "Connect" Framework and showed you how it simplifies creating connections between a user's local application account and their accounts on Software-as-a-Service (SaaS) providers. Today I want to show you how to extend the service provider framework to handle connections to providers that aren't directly supported by Spring Social.

### Extending Spring Social for Netflix

Suppose that you're developing a movie review website where users can go to read and post short movie reviews. Normally, the movie reviews are displayed with the most recent entries appearing first on the home page. But if a user has connected their account to their Netflix account, then you can show them reviews for the movies in their Netflix disc queue. To pull this off, you'd like to take advantage of Spring Social's Service Provider Framework for connecting your user's accounts with their Netflix accounts. Spring Social 1.0.0.M2 doesn't include a Netflix service provider or API binding, but can be easily extended to work with providers that aren't directly supported.

In this article, I'll show you how to build on Spring Social's Service Provider Framework to enable connectivity with Netflix. We'll start by developing a Netflix service provider implementation, then build a simple API binding to support our application's needs. The techniques used to develop the Netflix service provider can be applied to extend Spring Social to support almost any service provider. You can follow along by reviewing the [sample code on GitHub](https://github.com/SpringSource/spring-social-samples/tree/master/spring-social-extending-new-api).

### Getting to Know Netflix' Authorization API

Before we can start developing the Netflix service provider implementation, we need to do a bit of up-front research to get to know a few basic details about how the Netflix Authorization API works.

The first thing we need to determine is what authorization protocol Netflix uses. The [Authentication Overview](http://developer.netflix.com/docs/read/Security) section of the Netflix API documentation tells us that they use OAuth, but doesn't explicitly tell us which version of the OAuth specification is in play. Therefore a bit of detective work will be required.

Down the page a bit (under the "Those Pesky OAuth Parameters" header) we see mention of consumer keys, nonces, and timestamps. These are things that are not applicable to OAuth 2, so Netflix must be an OAuth 1 provider. Furthermore, the description of the `oauth_version` parameter being set to "1.0" serves to confirm that Netflix implements OAuth 1.

Now we know that Netflix uses OAuth 1. But it's also important to know whether they implement version 1.0 of the specification or version 1.0a. Service providers usually don't spell this out in their documentation and the `oauth_version` value should be "1.0" in either case. There are a few tell-tale signs, however, that point at a particular version of the OAuth specification. Here are a few clues that indicate that OAuth 1.0 is in play:

-   The `oauth_callback` parameter is sent on the authorization URL and not the request token request.
-   There is no notion of verifiers and no `oauth_verifier` parameter must be sent to the access token URL.

For OAuth 1.0a, watch for these signs:

-   The `oauth_callback` parameter is sent in the request token request and not in the authorization URL.
-   A verifier is received from the provider in the callback and an `oauth_verifier` parameter must be sent to the access token URL.

Looking for these clues in the Netflix documentation, we determine that Netflix uses OAuth 1.0 (not 1.0a). This information is significant and will be useful as we define our service provider implementation.

Finally, we need to know what the request token, authorization, and access token URLs are. Further down the page (under the "Making Protected Calls" header) you'll find details that tell us that the needed URLs are as follows:

-   **Request Token URL:** http://api.netflix.com/oauth/request\_token
-   **Authorization URL:** https://api-user.netflix.com/oauth/login
-   **Access Token URL:** http://api.netflix.com/oauth/access\_token

Pay particular attention to the protocols used in the request and access token URLs. Most providers are flexible in this regard, recommending that you use https. In my experience with Netflix, however, I've found that if you ask for a request or access token over https, Netflix will complain that the request signature is invalid. The authorization URL works fine over https, though.

### Developing a Netflix Service Provider Implementation

To create a new service provider implementation, we'll need to extend either `AbstractOAuth1ServiceProvider` or `AbstractOAuth2ServiceProvider`. These two classes provide OAuth version-specific base functionality for OAuth 1.0/1.0a and OAuth 2, respectively. Since Netflix is an OAuth 1.0 provider, our `NetFlixServiceProvider` will need to extend `AbstractOAuth1ServiceProvider`:

```java
Copy
package org.springframework.social.movies.netflix;
import org.springframework.social.connect.oauth1.AbstractOAuth1ServiceProvider;
import org.springframework.social.connect.support.ConnectionRepository;
import org.springframework.social.oauth1.OAuth1Template;

public final class NetFlixServiceProvider extends AbstractOAuth1ServiceProvider<NetFlixApi> {

    public NetFlixServiceProvider(String consumerKey, String consumerSecret, ConnectionRepository connectionRepository) {
        super("netflix", connectionRepository, consumerKey, consumerSecret, 
            new OAuth1Template(consumerKey, consumerSecret, 
                "http://api.netflix.com/oauth/request_token",
                "https://api-user.netflix.com/oauth/login?oauth_token={requestToken}" +
                    "&oauth_callback={redirectUri}&oauth_consumer_key=" + consumerKey,
                "http://api.netflix.com/oauth/access_token", 
                 OAuth1Version.CORE_10));
    }

    @Override
    protected NetFlixApi getApi(String consumerKey, String consumerSecret, String accessToken, String secret) {
        return new NetFlixTemplate(consumerKey, consumerSecret, accessToken, secret);
    }
	
}
```

There are two things you must do when extending one of Spring Social's abstract service provider classes: Setup the provider specifics in the constructor and implement the `getApi()` method.

The abstract base class contains all of the mechanics of connecting with a service provider. But you must set it up by passing provider specifics to the `super()` constructor. Here, the `NetFlixServiceProvider` constructor calls the `super()` constructor, passing in "netflix" as the provider ID, the given connection repository, consumer key, and consumer secret, and an instance of `OAuth1Template` that should be used to negotiate authentication with the provider.

The `OAuth1Template` given here is constructed with the consumer key and secret and is also given the three URLs (request token, authorization, and access token) that we gathered during our preliminary research. Notice that the authorization URL is parameterized to take the request token and redirect URI. `ConnectController` will provide those details in the course of doing the authorization flow. Also note that the authorization URL also takes an `oauth_consumer_key` parameter. This appears to be a Netflix-specific demand; the OAuth 1.0 specification has no such requirement and I've not come across any other provider that requires it.

Most OAuth 1 service providers implement the OAuth 1.0a specification. Therefore, `OAuth1Template` assumes that it will be dealing with OAuth 1.0a by default. Netflix, however, is an OAuth 1.0-based provider. The final parameter given to `OAuth1Template`'s constructor specifies that it should not assume 1.0a and should negotiate with the provider on OAuth 1.0 terms. If Netflix were an OAuth 1.0a provider, this parameter could be set to `OAuth1Version.CORE_10_REVISION_A` or left out altogether.

The one other thing that is required of a service provider implementation is to implement the `getApi()` method. For OAuth 1 providers, this method takes four `String` parameters containing the application's consumer key/secret pair and an access token/secret pair. Here, those values are used to create and return a new instance of `NetFlixTemplate` (more on this class in a moment).

Although `NetFlixServiceProvider` only demonstrates how to develop a service provider implementation for OAuth 1, the model isn't much different when extending `AbstractOAuth2ServiceProvider` to create an OAuth 2 service provider. The key differences are:

-   The client ID and secret aren't passed up through the `super()` constructor.
-   An instance of `OAuth2Template` is created instead of `OAuth1Template` (and no request token URL is needed).
-   The `getApi()` method is only given the access token value for constructing the API binding.

Have a look at [`FacebookServiceProvider`](https://github.com/SpringSource/spring-social/blob/master/spring-social-facebook/src/main/java/org/springframework/social/facebook/connect/FacebookServiceProvider.java), [`GitHubServiceProvider`](https://github.com/SpringSource/spring-social/blob/master/spring-social-github/src/main/java/org/springframework/social/github/connect/GitHubServiceProvider.java), or [`GowallaServiceProvider`](https://github.com/SpringSource/spring-social/blob/master/spring-social-gowalla/src/main/java/org/springframework/social/gowalla/connect/GowallaServiceProvider.java) for examples of how to create an OAuth 2-based service provider implementation. For more examples OAuth 1 service providers you might also want to look at [`TwitterServiceProvider`](https://github.com/SpringSource/spring-social/blob/master/spring-social-twitter/src/main/java/org/springframework/social/twitter/connect/TwitterServiceProvider.java), [`LinkedInServiceProvider`](https://github.com/SpringSource/spring-social/blob/master/spring-social-linkedin/src/main/java/org/springframework/social/linkedin/connect/LinkedInServiceProvider.java), and [`TripItServiceProvider`](https://github.com/SpringSource/spring-social/blob/master/spring-social-tripit/src/main/java/org/springframework/social/tripit/connect/TripItServiceProvider.java).

### Creating the Netflix API Binding

With the service provider implementation complete, we now turn our attention to creating a binding to the Netflix REST API. For our immediate needs, we'll need a way to read the user's disc queue. To define that operation, we create the `NetFlixApi` interface which defines the service API:

```java
Copy
public interface NetFlixApi {

    List<CatalogTitle> searchForTitles(String searchTerms);

    List<QueueItem> getDiscQueue();

}
```

This is hardly a complete binding to Netflix' REST API. But it will suffice for our purposes. The `searchForTitles()` method can be used to help a user select a movie that they'd like to write a review for. And the `getDiscQueue()` method will be used to retrieve the items in a user's disc queue. Now we need to create an implementation class. `NetFlixTemplate` uses Spring's `RestTemplate` to make calls to Netflix' REST API:

```java
Copy
package org.springframework.social.netflix;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.social.oauth1.ProtectedResourceClientFactory;
import org.springframework.web.client.RestTemplate;

public class NetFlixTemplate implements NetFlixApi {

    private final RestTemplate restTemplate;

    private final String userBaseUrl;

    public NetFlixTemplate(String apiKey, String apiSecret, String accessToken, 
            String accessTokenSecret) {
        this.restTemplate = 
                ProtectedResourceClientFactory.create(apiKey, apiSecret, accessToken, accessTokenSecret);
        this.userBaseUrl = getUserBaseUrl();
    }

    public List<CatalogTitle> searchForTitles(String searchTerm) {
        Map<String, Object> resultMap = restTemplate.getForObject(SEARCH_TITLES_URL, Map.class, searchTerm);
        List<CatalogTitle> titles = new ArrayList<CatalogTitle>();

        // extract CatalogTitle objects from resultMap

        return titles;
    }

    public List<QueueItem> getDiscQueue() {
        Map<String, Object> resultMap = restTemplate.getForObject(userBaseUrl + QUEUE_PATH, Map.class);
        List<QueueItem> queueItems = new ArrayList<QueueItem>();

        // extract QueueItem objects from resultMap

        return queueItems;
    }

    private String getUserBaseUrl() {
        Map<String, Map<String, Map<String, String>>> result = 
                restTemplate.getForObject(CURRENT_USER_URL, Map.class);
        return result.get("resource").get("link").get("href");
    }

    private static final String SEARCH_TITLES_URL = 
            "http://api.netflix.com/catalog/titles?term={term}&max_results=5&output=json";
    
    private static final String CURRENT_USER_URL = 
            "http://api.netflix.com/users/current?output=json";
    
    private static final String QUEUE_PATH = "/queues/disc?output=json";
}
```

Notice that although `NetFlixTemplate` uses `RestTemplate` it doesn't create a `RestTemplate` instance for itself. Instead, it uses `ProtectedResourceClientFactory` to create an OAuth-ready instance of `RestTemplate`. The `RestTemplate` created by `ProtectedResourceClientFactory` will be setup to use the OAuth credentials to sign each request it makes with an "Authorization" header.

Both `searchForTitles()` and `getDiscQueue()` use the OAuth-ready `RestTemplate` to perform their respective operations against the Netflix REST API. The `output` parameter in the URLs tell the Netflix API that we'd prefer to receive a JSON response and not XML. In each case, the call to `getForObject()` returns a `Map` that mirrors the structure of the JSON response. Relevant pieces of information are then extracted from the `Map` to produce the lists returned to the caller. (For brevity's sake, I've left the details of how the `Map` is broken down out of the listing above. Look in GitHub for the full implementation of [`NetFlixTemplate`](https://github.com/SpringSource/spring-social-samples/blob/master/spring-social-extending-new-api/src/main/java/org/springframework/social/movies/netflix/NetFlixTemplate.java).)

All of the user-oriented operations in Netflix's REST API, including the call to retrieve a user's disc queue, have URLs that start with "http://api.netflix.com/users/{user ID}". Although the user's Netflix ID isn't readily available to `NetFlixTemplate`, the user's base URL (including their Netflix ID) can be retrieved via the "/users/current" API call. The `getUserBaseUrl()` method makes the call to "/users/current" to retrieve the user's base URL. To avoid having to retrieve the base URL before every call, the constructor calls the `getUserBaseUrl()` method once and stores the base URL in a member variable for later use when constructing URLs for user-oriented operations.

Now that we have a Netflix service provider and API binding, we can build up the rest of the movie review application around them. As an illustration how the `getDiscQueue()` method may be used, look at the right column in the following screenshot:

[![](http://blog.springsource.com/wp-content/uploads/2011/03/movie_app.png "movie_app")](http://blog.springsource.com/wp-content/uploads/2011/03/movie_app.png)

Here, a list of movies in the user's disc queue is displayed along with any recent reviews for those movies. At this point, it's easy to imagine further enhancement to this application, perhaps enabling the user to revise their queue as they consider the reviews of other users.

### Using an existing API Binding

In the Netflix example, I chose to create my own API binding. But if there is already some existing library that binds to the service provider that you prefer to use, then there's no reason why you can't use it to interact with the provider's API alongside Spring Social's Service Provider Framework for connection-handling.

For example, although Spring Social comes with a Java binding to Twitter's REST API, you may prefer to use another binding implementation such as Twitter4J. Twitter4J provides a comprehensive Java binding to Twitter's service API, but does not address the authorization flow or connection management. If you'd like to use Twitter4J's API along with Spring Social's connection management features, you can do so by creating a service provider that uses Twitter4J as the API binding.

To do that, you'll need to create a service provider implementation whose `getApi()` method uses a `TwitterFactory` to construct a Twitter4J instance rather than a `TwitterTemplate`. Here's what a Twitter4J-based service provider implementation might look like:

```java
Copy
package org.springframework.social.showcase.twitter;
import java.util.Properties;
import org.springframework.social.connect.oauth1.AbstractOAuth1ServiceProvider;
import org.springframework.social.connect.support.ConnectionRepository;
import org.springframework.social.oauth1.OAuth1Template;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.conf.Configuration;
import twitter4j.conf.PropertyConfiguration;

public final class Twitter4JServiceProvider extends AbstractOAuth1ServiceProvider<Twitter> {

    public Twitter4JServiceProvider(String consumerKey, String consumerSecret, ConnectionRepository connectionRepository) {
        super("twitter", connectionRepository, consumerKey, consumerSecret, new OAuth1Template(consumerKey, consumerSecret,
            "https://twitter.com/oauth/request_token",
            "https://twitter.com/oauth/authorize?oauth_token={requestToken}",
            "https://twitter.com/oauth/access_token"));
    }

    @Override
    protected Twitter getApi(String consumerKey, String consumerSecret, String accessToken, String secret) {
        Properties props = new Properties();
        props.setProperty(PropertyConfiguration.OAUTH_CONSUMER_KEY, consumerKey);
        props.setProperty(PropertyConfiguration.OAUTH_CONSUMER_SECRET, consumerSecret);
        props.setProperty(PropertyConfiguration.OAUTH_ACCESS_TOKEN, accessToken);
        props.setProperty(PropertyConfiguration.OAUTH_ACCESS_TOKEN_SECRET, secret);
        Configuration conf = new PropertyConfiguration(props);
        return new TwitterFactory(conf).getInstance();
    }

}
```

As you can see, `Twitter4JServiceProvider` looks very similar to Spring Social's [`TwitterServiceProvider`](https://github.com/SpringSource/spring-social/blob/master/spring-social-twitter/src/main/java/org/springframework/social/twitter/connect/TwitterServiceProvider.java) and also quite like the `NetFlixServiceProvider` created earlier. The key differences are that `Twitter4JServiceProvider` is parameterized as a `Twitter` service provider and the `getApi()` method constructs a Twitter4J `Twitter` instance.

The code for `Twitter4JServiceProvider` along with a sample that uses it can be found at GitHub in the [Spring Social Samples repository](https://github.com/SpringSource/spring-social-samples/tree/master/spring-social-extending-new-api).

### Summary

Even though Spring Social 1.0.0.M2 is focused on a select few SaaS providers, the Service Provider Framework is easily extensible, enabling you to build support for other providers on top of Spring Social. Moreover, the framework is not limited to developing service provider implementations for Spring Social-specific API bindings--you may use it to create connections for an existing API binding.

While I'm on the subject of extending Spring Social, another area you may want to explore is creating new implementations of the [`ConnectionRepository`](https://github.com/SpringSource/spring-social/blob/master/spring-social-core/src/main/java/org/springframework/social/connect/support/ConnectionRepository.java) interface. Spring Social 1.0.0.M2 comes with a JDBC-backed implementation, but there are other possibilities for persisting connections. For example, the [Spring Android](http://www.springsource.org/spring-android) project defines a [`SqliteConnectionRepository`](http://git.springsource.org/spring-mobile/spring-android/blobs/master/spring-android-auth/src/main/java/org/springframework/social/connect/sqlite/SqliteConnectionRepository.java) that enables connections to be written to a SQLite database stored locally on Android devices. Also, it'd be interesting to see what a NoSQL connection repository might look like.

We look forward to seeing how you extend Spring Social. If you create a useful or interesting extension to Spring Social, please tell us about it in the [forum](http://forum.springsource.org/forumdisplay.php?f=82) or send us a pull request in GitHub. We've already received a handful of pull requests from the community and are working on incorporating them into Spring Social. Many thanks for those contributions!