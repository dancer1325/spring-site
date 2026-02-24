---
title: The Essence of Spring
source: https://spring.io/blog/2007/04/24/the-essence-of-spring
scraped: 2026-02-24T09:30:22.865Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  April 24, 2007 | 0 Comments
---

# The Essence of Spring

_Engineering | Rossen Stoyanchev |  April 24, 2007 | 0 Comments_

This happened in Atlanta last week while I was in a Barnes & Noble bookstore. I circled around to the computer section and began scanning titles. With my head tilted I overheard a conversation about a job. I wasn't actively listening but I knew one side was pitching a job while the other was inquiring about it.

A couple of minutes later it was just me and the guy who was looking for talent. I was sure he would start speaking. Soon after he said 'so you're in J2EE?' and so the conversation began. He asked me about my work. He didn't know about Interface21 but upon hearing it's the company behind Spring his face lit. He said he hadn't tried Spring yet and then added he was currently using Struts.

The association of Spring and Struts has come up on a few occasions before. It's not uncommon for people to hear of Spring MVC but not know much about the rest of Spring. For others Spring is mainly a framework for dependency injection. Given the ground Spring covers all this got me thinking how to best define what it's about to those who aren't that familiar with it yet?

It's probably easier to talk about Spring at length than it is to define it concisely but here is a shot at it. I challenge you to do it in fewer words so long as you imagine speaking to the gentleman from the bookstore.

Spring is about dependency injection of plain objects. Instead of creating objects yourself you tell a framework like Spring about it and let it configure them for you. I say "plain" to emphasize these objects aren't aware of Spring. Sounds simple? Once you let that happen you open the door to powerful AOP-style services through a proxy mechanism that intercepts calls to your objects and adds behavior in a transparent way. Want transaction demarcation or access to remote services without "polluting" your business objects? It's easy to do with a few more lines of configuration (no coding!). Spring uses this formula over and over again to provide transparent access to security, transactions, remoting and many other traditionally difficult to implement enterprise services.

So have a closer look. This is only a start. There is more to be said but the above in my mind captures an essence, paints a picture that's closer to what Spring is all about. On another level Spring is about keeping things simple and minimal.