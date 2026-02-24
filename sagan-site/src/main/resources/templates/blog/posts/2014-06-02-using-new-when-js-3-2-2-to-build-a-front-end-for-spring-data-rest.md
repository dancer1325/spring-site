---
title: Using new when.js 3.2.2 to build a front end for Spring Data REST
source: https://spring.io/blog/2014/06/02/using-new-when-js-3-2-2-to-build-a-front-end-for-spring-data-rest
scraped: 2026-02-23T22:28:05.587Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  June 02, 2014 | 4 Comments
---

# Using new when.js 3.2.2 to build a front end for Spring Data REST

_Engineering | Greg L. Turnquist |  June 02, 2014 | 4 Comments_

Greetings Spring community!

[Roy Clarkson](http://spring.io/team/rclarkson) and I are presenting a talk at this year's SpringOne 2014 conference called [Spring Data REST - Data Meets Hypermedia](http://lanyrd.com/2014/springone2gx/sczbpf). We will explore how to quickly bridge the gap between a powerful Spring Data backend and a hypermedia enabled, RESTful front end.

In one part of the talk, we will delve into a javascript front end that lets the user takes pictures and upload them to a website. The website turns around and fetches images from the back end. By itself, this isn't that difficult thanks to the fully loaded RESTful API provided by Spring Data REST.

But fetching multiple images straight up isn't very efficient and is prone to freeze the web browser. Thanks to the CujoJS guys on our team ([Brian Cavalier](https://spring.io/team/briancavalier) and [John Hann](https://spring.io/team/jhann)), I was able to use the [recently released when.js module](http://know.cujojs.com/blog/when-js-3-2-released) and code a much smoother experience.

The segment below shows a core usage of rest.js combined with promises via when.js, and how it makes it super simple to write readable and functional code.

First, we pull in some key modules:

```javascript
Copyvar rest = require('rest');
var when = require('when');
var defaultRequest = require('rest/interceptor/defaultRequest');
var mime = require('rest/interceptor/mime');
var hateoas = require('rest/interceptor/hateoas');
```

Then we configure an `api` object with a `mime` interceptor, a `hateoas` intercepter, and configure it to default the `Accept` header to `application/hal+json` so that Spring Data REST talks HAL.

```javascript
Copyvar api = rest
    .wrap(mime)
    .wrap(hateoas)
    .wrap(defaultRequest, {headers: {'Accept': 'application/hal+json'}});
```

With that configuration, we can do some RESTful calls to fetch an array of images without wrecking the user's experience:

```javascript
Copywhen.all(api({
    method: 'GET',
    path: gallery._links.items.href,
    params: {projection: "noImages"}
}).then(function (response) {
    if (response.entity._embedded) {
        return response.entity._embedded.items.map(function (itemWithoutImage) {
            return api({path: itemWithoutImage._links.self.href})
        })
    } else {
        return [];
    }
})).done(function(itemsWithImages) {
    itemsWithImages.forEach(function(item) {
        items[item._links.self.href] = item.entity;
        nestedTable.append(createItemRowForGallery(item.entity, gallery));
    })
})
```

So what's happening? Let's look at each little chunk and explore what is happening.

```javascript
Copyapi({
    method: 'GET',
    path: gallery._links.items.href,
    params: {projection: "noImages"}
})
```

This is making a call to retrieve the array of **items** related to this particular **gallery**. It returns a promise giving us some nice options.

> **NOTE:** It uses `?projection=noImages` to fetch a list of item URIs without the image data. (Image retrieving ten 2MB images in one fell swoop!)

```javascript
Copy.then(function (response) {
	...
})
```

This function **then** takes the list of URIs and chops up the work of fetching their individual images.

```javascript
Copy    if (response.entity._embedded) {
        return response.entity._embedded.items.map(function (itemWithoutImage) {
            return api({path: itemWithoutImage._links.self.href})
        })
    } else {
        return [];
    }
```

Inside the `then` function, the code looks for `_embedded` data, and if it exists, it then transforms the array of imageless items 1-for-1 into an array of `GET` promises, fetching each item's actual image. If there is no `_embedded` data, then it returns an empty array.

```javascript
Copywhen.all(
	...
).done(function(itemsWithImages) {
    itemsWithImages.forEach(function(item) {
        items[item._links.self.href] = item.entity;
        nestedTable.append(createItemRowForGallery(item.entity, gallery));
    })
})
```

The array of promises that are fetching image data is wrapped with [when.all](https://github.com/cujojs/when/blob/master/docs/api.md#whenall), a handy function that will wait until each and every promise is done before moving on.

Since we intend to consume the output of all these `GET`s by displaying them on the screen, we finish things off with `done()`. `itemsWithImages`, which is provided by `when.all`, is an array of equal size containing the results of each individual promise.

> **BTW:** In case you didn't know...rule #1 when working with promises is that a [then()](https://github.com/cujojs/when/blob/master/docs/api.md#promisethen) function call MUST return either an object (that will get wrapped as a promise) or a promise itself. If you intend to actually consume the outcome and be done with it, use [done()](https://github.com/cujojs/when/blob/master/docs/api.md#promisedone) instead.

If you're a bit new to javascript, this might seem like quite a bit to take in. But being a [javascript newbie myself](http://blog.greglturnquist.com/2014/03/having-a-ton-of-fun-with-spring-data-rest-javascript.html), I have found that this API let me easily express what I wanted to do.

If you want to see more then be sure to sign up for [our talk at this year's SpringOne](http://lanyrd.com/2014/springone2gx/sczbpf/)! We'll look at a desktop version of this picture-snapping app. We'll also dig into a mobile friendly browser page and and a native mobile app, both which let you use your phone's camera to snap pics and upload to the site.

Cheers!