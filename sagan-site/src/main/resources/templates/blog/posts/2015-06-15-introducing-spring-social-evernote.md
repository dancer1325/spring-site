---
title: Introducing Spring Social Evernote
source: https://spring.io/blog/2015/06/15/introducing-spring-social-evernote
scraped: 2026-02-23T19:49:44.103Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 15, 2015 | 1 Comment
---

# Introducing Spring Social Evernote

_Engineering | Josh Long |  June 15, 2015 | 1 Comment_

> This post is a guest post by community [member Tadaya Tsuyukubo (@ttddyy)](http://twitter.com/ttddyy), creator of the Spring Social Slideshare project. Thanks Tadaya! I’d like to see more of these guest posts, so - as usual - [don’t hesitate to ping me](http://spring.io/team/jlong)! -Josh

[Spring Social Evernote](https://github.com/ttddyy/spring-social-evernote) is one of the community modules in the [Spring Social](http://projects.spring.io/spring-social/) ecosystem. It is a service provider implementation for [Evernote](http://evernote.com). It allows developers to work with the [Evernote SDK for Java](https://github.com/evernote/evernote-sdk-java) with idiomatic Spring idioms.

Evernote takes a unique approach for providing their APIs to developers. They have created [language specific SDKs](https://dev.evernote.com/doc/) based on [Thrift serialization format](https://Thrift.apache.org/). Dave Engberg, CTO of Evernote, [explained the motivations for choosing Thrift in this blog](https://blog.evernote.com/tech/2011/05/26/evernote-and-Thrift/).

The Java SDK includes Thrift-generated domain classes (e.g. `Notebook`, `Note`, `User`, etc.) and endpoint access clients (e.g. `UserStoreClient`, `NoteStoreClient`, etc). Even though `~StoreClient` classes nicely encapsulate authentication and Thrift protocol for endpoint communication, they still have a few limitations.

For example, all Thrift methods that do communication in the various `~StoreClient` types throw **checked** exceptions. Also, `~StoreClient` classes don’t have interfaces corresponding to their operations, which frustrates (somewhat) unit testing. [Spring Social Evernote](https://github.com/ttddyy/spring-social-evernote) fills these gaps while delivering a familiar Spring Social programming model.

## [](#features)Features

Spring Social Evernote delivers a familiar Spring and Java-based programmingmodel that uses interfaces, unchecked exceptions, and `null`\-safe `Collection`s for Thrift-based domain objects. It also provides a service provider implementation for the Evernote OAuth API.

The `Evernote` interface and it’s implementation, `EvernoteTemplate`, are the central types for the API. The `Evernote` interface returns `~StoreOperations` (e.g. `NoteStoreOperations`, or `UserStoreOperations`) interfaces that correspond to the SDK's `~StoreClient` classes. Methods on these interfaces throw **unchecked** `EvernoteException` instead of checked `EDAM*Exception`. These implementations also have smarter `null`\-value handling for collections in Thrift-generated domain types.

```java
CopyEvernote evernote = new EvernoteTemplate(
    EvernoteService.SANDBOX, "your-custom-access-token");

// interface based programming
NoteStoreOperations noteStore = evernote.noteStoreOperations();

// no checked exception is thrown
Notebook notebook = noteStore.getDefaultNotebook();

// no NPE when there are no shared notebooks
for (SharedNotebook sharedNotebook : notebook.getSharedNotebooks()) {  
    ...
}
```

### [](#interface-based-programming-for-store-clients)Interface based programming for store clients

`~StoreClientOperations` interface classes correspond to `~StoreClient` implementation classes (e.g. `NoteStoreClientOperations` corresponds to `com.evernote.clients.NoteStoreClient`).

```java
Copy// NoteStoreOperations is interface encapsulating NoteStoreClient
NoteStoreOperations noteStore = evernote.noteStoreClientOperations();
Notebook notebook = noteStore.getNotebook("...");
```

### [](#unchecked-exceptions-for-endpoint-operations)Unchecked exceptions for endpoint operations

EDAM exceptions (e.g. `com.evernote.edam.error.EDAMUserException`) and Thrift exceptions (e.g. `com.evernote.Thrift.TException`) are trapped and rethrown as *runtime* exceptions of type `EvernoteException`.

```java
Copy// with UserStoreOperations, no explicit exception handling is required
User user = evernote.userStoreOperations().getUser();

// or explicitly you can get exception info
try {
  User user = userStoreClient.getUser();
} catch(EvernoteException e) {
  if (e.isEDAMUserException()) {
     EDAMErrorCode errorCode = e.getEDAMErrorCode();
     EDAMUserException originalException = e.getCause();
     ....
  }
}
```

### [](#null-safe-collection-handling-for-thrift-based-domain-objects)Null-safe collection handling for Thrift-based domain objects

In Thrift, a `null` collection isn't serialized, but the convention can cause some unexpected `NullPointerException`s when using the API. The Spring Social Evernote implementation sanitizes these values with empty collections.

```java
CopyNote note = evernote.noteStoreOperations().getNote(...)
// it is safe to loop without null check
for(Resource resource: note.getResources()) {
  ...
}
```

or (in Java 8):

```java
Copy evernote.noteStoreOperations()
    .getNote()
    .getResources()
        .forEach ( r -> System.out.println( r.toString() ));
```

Spring Social Evernote dirty checks the types and restores their `null` values just before serialization if the collection is otherwise empty.

For more on this particular support, check out [nullsafe-Thrift](https://github.com/ttddyy/nullsafe-Thrift) - a proof-of-concept project.

## [](#service-provider-implementation-for-evernote-oauth)Service provider implementation for Evernote OAuth

*Registering `ConnectionFactory`*

To register Evernote environment (`sandbox`, `prod`, `yinxiang`) into Spring Social Service Provider Connect Framework, you can use environment-specific `ConnectionFactory` classes like `EvernoteSandboxConnectionFactory`, `EvernoteProductionConnectionFactory`, or `EvernoteYinXiangConnectionFactory`. Alternatively, you can pass `EvernoteService` enum to `EvernoteConnectionFactory` in constructor.

```java
CopyConnectionFactoryRegistry registry = new ConnectionFactoryRegistry();

// sandbox connection
registry.addConnectionFactory(new EvernoteSandboxConnectionFactory("consumerKey", "consumerSecret"));

// production connection
registry.addConnectionFactory(new EvernoteProductionConnectionFactory("consumerKey", "consumerSecret"));

// or by EvernoteService enum
registry.addConnectionFactory(new EvernoteConnectionFactory("consumerKey", "consumerSecret", EvernoteService.SANDBOX));
```

## [](#using-evernotes-oauth-api)Using Evernote's OAuth API

Performing [Evernote-based OAuth authentication](https://dev.evernote.com/doc/articles/authentication.php) works as follows:

```java
Copy// obtain request token (temporal credential)
OAuth1Operations oauthOperations = evernoteConnectionFactory.getOAuthOperations();
OAuthToken requestToken = oauthOperations.fetchRequestToken(
    callbackUrl, null);

// construct authorization url with callback url for client to redirect
OAuth1Parameters parameters = new OAuth1Parameters();
parameters.set("preferRegistration", "true"); // create account
parameters.set("supportLinkedSandbox", "true");

String authorizeUrl = oauthOperations.buildAuthorizeUrl(
        requestToken.getValue(), parameters);

// obtain access token
OAuthToken requestToken = new OAuthToken(oauthToken, requestTokenSecret);
AuthorizedRequestToken authorizedRequestToken = new AuthorizedRequestToken(requestToken, oauthVerifier);

OAuth1Operations oAuth1Operations = evernoteConnectionFactory.getOAuthOperations(); // EvernoteOAuth1Operations
EvernoteOAuthToken accessToken = (EvernoteOAuthToken)oAuth1Operations.exchangeForAccessToken(authorizedRequestToken, null);

```

# [](#next-steps)Next Steps

For more project documentation, check out the [project wiki page](https://github.com/ttddyy/spring-social-evernote/wiki/About). Also, nullsafe collection in Thrift can be demonstrated in this [test class](https://github.com/ttddyy/nullsafe-Thrift/blob/master/src/test/java/net/ttddyy/nullsafeThrift/ThriftWrapperTest.java) as well.

Since Evernote doesn’t have RESTful API, I have created a web application, [Evernote Rest Webapp](https://github.com/ttddyy/evernote-rest-webapp), which provides RESTful endpoints for Evernote services. It is built on top of [Spring Boot](http://projects.spring.io/spring-boot/) and [Spring Social Evernote](https://github.com/ttddyy/spring-social-evernote). This implementation serves as a sort of bridge-API if you're interested.

## [](#summary)Summary

[Spring Social Evernote](https://github.com/ttddyy/spring-social-evernote) provides modern programming model and easy integration with Evernote authentication to your application.

If you have any suggestion, question, or anything, please ping me [@ttddyy](https://twitter.com/ttddyy).