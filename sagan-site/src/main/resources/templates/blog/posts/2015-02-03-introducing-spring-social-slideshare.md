---
title: Introducing Spring Social Slideshare
source: https://spring.io/blog/2015/02/03/introducing-spring-social-slideshare
scraped: 2026-02-23T21:57:18.454Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 03, 2015 | 0 Comments
---

# Introducing Spring Social Slideshare

_Engineering | Josh Long |  February 03, 2015 | 0 Comments_

> This post is a guest post by community [member Tadaya Tsuyukubo (@ttddyy)](http://twitter.com/ttddyy), creator of the Spring Social Slideshare project. Thanks Tadaya! I'd like to see more of these guest posts, so - as usual - don't hesitate to [ping me](http://spring.io/team/jlong)! -Josh

---

[Spring Social Slideshare](https://github.com/ttddyy/spring-social-slideshare) is one of the community modules in [Spring Social](http://projects.spring.io/spring-social/) ecosystem. It is a Java binding built on top of the Spring Social framework to interact with the SlideShare REST API.

Spring Social modules provide an implementation of the `ApiBinding` interface that binds Java interfaces and concrete implementation classes to a REST API. By convention, an interface is named as target service, e.g. `GitHub`, `LinkedIn`, `Facebook`, etc. The implementation class is of the form `*Template`, e.g.: `GitHubTemplate`, `LinkedInTemplate`, and `FacebookTemplate.` In Spring Social Slideshare, there is a `Slideshare` interface and `SlideshareTemplate` implementation class. You can use spring to inject the `SlideshareTemplate` to your service. Or, if you choose to, you can directly instantiate `SlideshareTemplate` and interact with SlideShare API outside of DI from spring.

## [](#creating-a-slideshare-instance)Creating a `SlideShare` instance

You need to [apply for a SlideShare API key](http://www.slideshare.net/developers/applyforapi). Once you submit the application form, you will get an email containing **“API Key”** and **“Shared Secret”**. You need these two keys to access SlideShare API.

This is the core part of the module to interact with SlideShare API.

```java
CopySlideShare slideshare = new SlideShareTemplate("api_key", "shared_secret");
SlideshowOperations slideshow = slideshare.slideshowOperations();
```

Now you can perform slideshow related operation via `slideshow` instance.

## [](#retrieving-a-specific-slideshow)Retrieving a specific `Slideshow`

Specific slideshow can be retrieved by slideshow id or url.

```java
Copy// get a slideshow "Booting up Spring Social"
Slideshow show = slideshow.getSlideshowById("41084028");

// By url
Slideshow show =  slideshow.getSlideshowByUrl(
  "http://www.slideshare.net/SpringCentral/booting-up-spring-social");
```

There are many different properties that you can consume including the slideshow's `id,` `url,` `title,` `description,` `created,` `username,` and `downloadUrl`. If you want to embed the presentation in HTML, use the `embed` property.

Also, you can retrieve slideshows by user, tag, or group.

```java
CopyGetSlideshowsResponse response;

// by user
response = slideshow.getSlideshowsByUser(
  "SpringCentral", FETCH_SIZE);

// you can also specify offset and detailed flag
response = slideshow.getSlideshowsByUser("SpringCentral",
  FETCH_SIZE, offset, true);

// by tag or group
response = slideshow.getSlideshowsByTag("spring", FETCH_SIZE);
response = slideshow.getSlideshowsByGroup("group_name", FETCH_SIZE);

// You can print the `count` and `name`
List<Slideshow> shows = response.getSlideshows();    // list of slideshows

```

## [](#performing-searches)Performing Searches

You can search slideshows by keyword:

```java
CopySearchSlideshowsResponse response;
response = slideshow.searchSlideshows("spring");

// paginated access
int page = 3;
int itemsPerPage = 20;
response = slideshow.searchSlideshows("spring", page, itemsPerPage);

List<Slideshow> shows = response.getSlideshows();
```

Each response has a `numResults` and `totalResults` property that gives you the number of results returned and the total results of the result collection.

## [](#creating-and-uploading-presentations)Creating and Uploading Presentations

You can upload a presentation by specifying a `java.io.File`, `String`, and an implementation of Spring's `Resource` hierarchy.

> **Note:** SlideShare API requires extra permission for upload operation. Please see [“SlideShare API Documentation”](http://www.slideshare.net/developers/documentation#upload_slideshow) for requesting upload permission on your dev account.

```java
Copy
File file = new File( "path_to_your_presentation_file");
String uploadedShowId = slideshow.uploadSlideshowFromFile(
  username, password, file, "My Title", "My Description");

// Other API to upload slideshows
//   slideshow.uploadSlideshowResource(...)
//   slideshow.uploadSlideshowFromContent(...)
//   slideshow.uploadSlideshowFromUrl(...)
```

You can modify your slideshow's information, as well.

```java
Copy
List<String> tags = Arrays.asList("spring", "social");
PrivacySetting privacy = new PrivacySetting();
privacy.setMakeSlideshowPrivate(false);    // make slideshow public

String editedShowId = slideshow.editSlideshow(username, password,
    "01234", "New Title", "New Desc", tags, privacy);

```

Simply you can delete slideshow by ID.

```java
CopyString deletedShowId = slideshow.deleteSlideshow(username, password, "01234");
```

## [](#whats-next)What’s next?

The Slideshare API provides four areas of functionality supporting slideshows, users, favorites and lead/campaign operations. The current version of Spring Social Slideshare only supports slideshow-specific operations.

The project is evolving. Don't hesitate to reach [me](https://twitter.com/ttddyy), [create an issue on GitHub](https://github.com/ttddyy/spring-social-slideshare/issues/new), or send pull-requests for specific improvements.

## [](#summary)Summary

If your application needs to integrate with SlideShare, [Spring Social Slideshare](https://github.com/ttddyy/spring-social-slideshare) is an easy, familiar approach. I created a [sample project](https://github.com/ttddyy/spring-social-slideshare-demo) which demonstrates the basic operations explained in this post. [Start here](https://github.com/ttddyy/spring-social-slideshare-demo/blob/master/src/main/java/demo/Application.java). Thank you for reading this post.