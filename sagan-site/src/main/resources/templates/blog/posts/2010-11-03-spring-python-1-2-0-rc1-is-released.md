---
title: Spring Python 1.2.0.RC1 is released!
source: https://spring.io/blog/2010/11/03/spring-python-1-2-0-rc1-is-released
scraped: 2026-02-24T08:51:47.366Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  November 03, 2010 | 1 Comment
---

# Spring Python 1.2.0.RC1 is released!

_Engineering | Greg L. Turnquist |  November 03, 2010 | 1 Comment_

After many months of work, [Spring Python's first 1.2 release is available](http://www.springsource.org/node/2887).

The project has migrated its documentation to Sphinx, the same tool used for documenting the Python language itself. You can visit the [project site](http://springpython.webfactional.com) and view it in [HTML](http://springpython.webfactional.com/1.2.x/sphinx/html/index.html) or download an [epub version](http://springpython.webfactional.com/1.2.x/SpringPython.epub) for viewing on a smart phone or tablet device.

This version of Spring Python transitions to Python 2.6, dropping support for 2.4 and 2.5. This means the team is gearing up to utilize many of the newer features of Python, which also paves the way to transition towards Python 3.x at some time in the future.

Spring Python has integrated with Pyro (Python Remote Objects) since the beginning as a powerful way to seamlessly link Python apps together through remoting. With Pyro's recent version 4 API release, this version of Spring Python adds support by providing a new Pyro4ServiceExporter and Pyro4ProxyFactory class. But don't worry; if you are still using Pyro 3, it's still supported by Spring Python 1.2.

A new form of remoting has been added: Secure XML-RPC. Python has a built in XML-RPC library, but it can challenging to utilize and definitely intrusive. Spring Python makes it seamless to utilize this powerful library. Spring Python also makes it easy to secure the channel using Python's built in SSL library.

We also migrated source code management to git. You can visit the [site to check out the source code](http://git.springsource.org/spring-python/spring-python).

Thanks,

The Spring Python team