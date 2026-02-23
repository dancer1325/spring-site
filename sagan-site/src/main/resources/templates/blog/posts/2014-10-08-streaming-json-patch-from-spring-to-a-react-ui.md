---
title: Streaming JSON Patch from Spring to a React UI
source: https://spring.io/blog/2014/10/08/streaming-json-patch-from-spring-to-a-react-ui
scraped: 2026-02-23T22:12:13.207Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Brian Cavalier |  October 08, 2014 | 1 Comment
---

# Streaming JSON Patch from Spring to a React UI

_Engineering | Brian Cavalier |  October 08, 2014 | 1 Comment_

We're exploring ways to help developers create rich, modern front-ends that integrate easily with Spring back-ends. If you attended SpringOne this year, you've already seen some of the things we've been working on:

1.  [Hypermedia support in Spring Data REST](https://speakerdeck.com/gregturn/springone2gx-2014-spring-data-rest-data-meets-hypermedia) presented by Greg Turnquist, Oliver Gierke, and Roy Clarkson
2.  [RaveJS: Spring Boot concepts for JavaScript applications](http://www.slideshare.net/unscriptable/rave-js-springone-2gx-2014) by John Hann
3.  [Differential Synchronization and JSON Patch](http://www.slideshare.net/briancavalier/differential-sync-and-json-patch-s2-gx-2014) by Craig Walls and me

In short, We want to make it easy to communicate efficiently between a Spring back-end and a client and to easily integrate the best and most popular client-side technologies.

## [](#react--streaming-updates)React + streaming updates

JSON Patch is a format for sending incremental changes to structured data. I thought it would be interesting to try streaming updates in JSON Patch format via STOMP all the way out to a web UI.

Craig Walls had already built a simple [football scores proof of concept](https://github.com/habuma/scores), using the new [Spring Sync](https://github.com/spring-projects/spring-sync/) project to push score updates to a browser using JSON Patch over STOMP. I was able to take his POC, drop in RaveJS, add client-side reactive streams, and integrate the updates into a [React](http://facebook.github.io/react/) UI component.

You can find the [complete code on github in my rave-most-react branch](https://github.com/briancavalier/scores). The server is unchanged from Craig's original version. The [web client](https://github.com/briancavalier/scores/tree/rave-most-react/src/main/resources/public) is where the action is. Have a look at the [main.js to get an overall sense of the app](https://github.com/briancavalier/scores/blob/rave-most-react/src/main/resources/public/main.js) before we dive into some specifics.

## [](#starting-out)Starting out

I used [RaveJS](https://github.com/RaveJS/rave) and npm to manage my client side dependencies, so my startup was simple:

```sh
Copy> cd src/main/resources/public

> npm init

<answer a few questions>

> npm install --save rave most jiff react rave-load-jsx rave-node-process stompjs
```

Then I just needed a single script tag in the existing HTML, and I was off to coding!

```html
Copy<script src="node_modules/rave/rave.js"></script>
```

## [](#introducing-mostjs)Introducing most.js

Thanks to Craig, I already had a stream of updates (in JSON Patch format) flowing to the client over STOMP. I decided that the nicest way to work with the stream of patches would be to (surprise!) *actually use a stream*.

[Most.js](https://github.com/cujojs/most) is cujoJS's new JavaScript reactive streams package. It provides a small, but powerful set of APIs for creating, transforming, and consuming event streams. I used it to wrap up the stompjs API.

It turns out that there were two STOMP subscriptions: one that carried an initial, complete copy of all the score data, and another that carried all the subsequent changes. I was able to wrap both subscriptions up into a single reactive stream representing "the latest set of scores" by using [jiff.js](https://github.com/cujojs/jiff) to apply the JSON Patches as they arrived.

This bit of code creates a stream from a STOMP subscription to the initial data, takes the first event (a complete snapshot of all scores), and combines it with a second stream containing only JSON Patch updates to produce a view of the scores that changes over time.

```js
Copyfunction getScoresStream(initDestination, updateDestination, client) {
	// Create a stream containing one full copy of the data, and
	// flatMap that to a stream containing the time-varying
	// current set of scores, by accumulating each patch
	// and emitting the updated scores data.
	return getInitialDataStream(initDestination, client)
		.flatMap(function(data) {
			return getUpdatesStream(updateDestination, client, data);
		});
}

function getInitialDataStream (initDestination, client) {
	// Await a copy of the data from the STOMP subscription
	// that is sending the full scores data, then unsubscribe.
	return streamFromStompJson(initDestination, client)
		.take(1);
}

function getUpdatesStream (updateDestination, client, data) {
	// Incrementally accumulate patches from the STOMP subscription
	// that is carrying JSON Patches onto the scores data to produce
	// an updated view of the scores.
	return streamFromStompJson(updateDestination, client)
		.startWith([])
		.scan(updateWithJsonPatch, data);
}
```

Most.js also automatically cleans up underlying resources when streams end. It was easy to arrange to unsubscribe from the first subscription after an initial copy of the full scores data had arrived, leaving only one subscription: the changes.

## [](#making-the-ui-with-react)Making the UI with React

Now that I had a single most.js stream representing the latest scores, I created a [React component to display them](https://github.com/briancavalier/scores/blob/rave-most-react/src/main/resources/public/Scoreboard.jsx). I installed (see above) the [rave-load-jsx extension](https://github.com/KidkArolis/rave-load-jsx), a RaveJS extension created by a community member, which enables direct JSX component loading in RaveJS. All I had to do was create a Scoreboard.jsx file and start coding a simple React scoreboard component.

React components have an internal `state` object containing the data that will be used to render the component. All I needed to do was pass the latest scores stream when creating the component, and then have the component observe the stream and update its `state`. The relevant bit of code is only a couple lines:

```js
Copy// this.props.scores is the scores stream provided when the
// Scoreboard component is created

this.props.scores.observe(function(scores) {
	self.setState({ scores: scores });
});
```

React took care of automatically keeping the DOM in sync with the `state`.

## [](#from-bits-to-pixels)From bits to pixels

This is admittedly a toy app. However, it shows quite a few powerful concepts working together in a very small space, with very little code: small, server-generated deltas flowing over STOMP + WebSocket, to a reactive stream on the client being observed by a React component. Changes are flowing from a Spring back-end through to the UI--bits to pixels, as it were.

I hope this tiny app also provides a glimpse at the direction we're headed. We want to provide tools and client-side packages that help developers build rich, modern client applications that integrate with leading client-side technologies and Spring back-ends.