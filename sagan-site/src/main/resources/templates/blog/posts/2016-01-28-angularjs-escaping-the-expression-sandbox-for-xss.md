---
title: AngularJS - Escaping the Expression Sandbox for XSS
source: https://spring.io/blog/2016/01/28/angularjs-escaping-the-expression-sandbox-for-xss
scraped: 2026-02-23T19:29:48.839Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  January 28, 2016 | 5 Comments
---

# AngularJS - Escaping the Expression Sandbox for XSS

_Engineering | Rob Winch |  January 28, 2016 | 5 Comments_

**UPDATE**: This is a summary of [XSS without HTML: Client-Side Template Injection with AngularJS](http://blog.portswigger.net/2016/01/xss-without-html-client-side-template.html). Previously the citation was in the middle of the document and difficult to find. The goal of the summary is to present the exploit and a fix without all the nuances, not to claim the work as my own.

# [](#introduction)Introduction

[AngularJS](https://angularjs.org/) is a popular JavaScript framework that allows embedding [expressions](https://code.angularjs.org/1.4.9/docs/guide/expression) within double curly braces. [For example](https://code.angularjs.org/1.4.9/docs/guide/expression#example), the expression `1+2={{1+2}}` will render as `1+2=3`.

This means that if the server echos out user input that contains double curly braces, the user can perform a XSS exploit using Angular expressions.

# [](#writing-user-input-server-side)Writing User Input Server Side

Let's explore a page that is safely HTML encoding user input. In our example below, we use [Thymeleaf](http://www.thymeleaf.org/) to HTML encode and then output the attribute `username` to the text of the div of our page.

```html
Copy<html xmlns:th="http://www.thymeleaf.org">
<head>
<title>AngularJS - Escaping the Expression Sandbox</title>
</head>
<body>
<div th:text="${username}"></div>
</body>
</html>
```

If username is `<script>alert('Rob')</script>` the output might look like:

```html
Copy<html xmlns:th="http://www.thymeleaf.org">
<head>
<title>AngularJS - Escaping the Expression Sandbox</title>
</head>
<body>
<div>&lt;script&gt;alert(&#39;Rob&#39;)&lt;/script&gt;</div>
</body>
</html>
```

You will notice that the output is properly HTML encoded. This means our application is currently safe from XSS attacks.

# [](#adding-angularjs)Adding AngularJS

Our application is currently secure against XSS attacks. Let's update the application to use AngularJS

```html
Copy<html xmlns:th="http://www.thymeleaf.org">
<head>
<title>Angular Expression - safe</title>
<script src="angular-1.4.8.min.js"></script>
</head>
<body ng-app>
<div th:text="${username}"></div>
</body>
</html>
```

You will notice two changes:

-   We include added `angular-1.4.8.min.js`
-   We added `ng-app` to the body element

Our application is now vulnerable to XSS attacks, but how can we exploit it? The big clue should be our introduction to Angular expressions. What would happen with a username of `1+2={{1+2}}`? The result would be:

```html
Copy<html>
<head>
<title>Angular Expression - safe</title>
<script src="angular-1.4.8.min.js"></script>
</head>
<body ng-app="">
<div>1+2={{1+2}}</div>
</body>
</html>
```

Angular would then update the DOM to be:

```html
Copy<html>
<head>
<title>Angular Expression - safe</title>
<script src="angular-1.4.8.min.js"></script>
</head>
<body ng-app="">
<div>1+2=3</div>
</body>
</html>
```

We could try a username of `{{alert('Rob')}}`, but that would be blocked by [Expression Sandboxing](https://code.angularjs.org/1.4.9/docs/guide/security#expression-sandboxing). At this point you might think that we are safe. However, despite appearing in the security section of the documention, Expression Sandboxing is not intended to provide security.

More concretely, the documentation states the following about [Mixing client-side and server-side templates](https://code.angularjs.org/1.4.9/docs/guide/security#mixing-client-side-and-server-side-templates):

> In general, we recommend against this because it can create unintended XSS vectors.

Ultimately, this means that if you allow user input to be rendered in templates on the server side, the application is vulnerable to XSS attacks. Let's take a look at a concrete example.

# [](#escaping-the-expression-sandbox)Escaping the Expression Sandbox

If our payload is sandboxed, how can we provide a valid XSS exploit? What would happen if our username was:

```javascript
Copy{{
'a'.constructor.prototype.charAt=[].join;
eval('x=1} } };alert(1)//');
}}
```

By overriding the native function `charAt` we can bypass Angular's Expression Sandbox and allow us to execute `alert(1)`. Refer to [XSS without HTML: Client-Side Template Injection with AngularJS](http://blog.portswigger.net/2016/01/xss-without-html-client-side-template.html) for complete details of how the exploit works.

**NOTE**: This payload targets Chrome and AngularJS 1.4.8. It is not known to work in other browsers.

# [](#conclusion)Conclusion

Allowing the server to echo user input into an Angular template will expose your application to XSS exploits. More generally, you should not mix server side rendering of user input and client side templates. You can find a sample that accompanies this blog post at [rwinch/angularjs-escaping-expression-sandbox](https://github.com/rwinch/angularjs-escaping-expression-sandbox).