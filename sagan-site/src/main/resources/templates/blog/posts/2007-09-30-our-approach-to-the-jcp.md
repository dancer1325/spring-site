---
title: Our approach to the JCP
source: https://spring.io/blog/2007/09/30/our-approach-to-the-jcp
scraped: 2026-02-24T09:24:37.949Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  September 30, 2007 | 0 Comments
---

# Our approach to the JCP

_Engineering | Rod Johnson |  September 30, 2007 | 0 Comments_

As I've posted before, Interface21 is getting [involved with the Java EE 6 effort](http://blog.interface21.com/main/2007/07/03/java-ee-6-gets-it-right/), and various of our folk including myself, Juergen Hoeller, Keith Donald and Rob Harrop will be involved in a number of expert groups.

This means that we're getting more involved with the JCP in general. We respect the confidentiality and other provisions of the JCP, so we won't talk about anything that isn't public. However, I would like to talk about our goals for JCP involvement and the fundamental approach we will bring. Of course we are just one company among many companies and individuals, so we will just be one voice, but this is what that voice will be seeking:

-   **Openness**: We will be pushing for as much openness as possible around the JCP. I've often felt that the "community" part of Java *Community* Process has been lacking--although it's good to see that revisions to the process seem to have favoured more openness. We will be trying to get as much information out to the community as soon as possible at all stages, and pushing against the tendency of some expert groups to put something out there and present it as gospel.
-   **Responsiveness**: Openness is worthwhile only if you listen. In the past, some expert groups have seen their role as being to tell people how it's going to be, not to listen. When people point out flaws, it's a lot better if you listen while you can still fix the problem rather than attack the critics. On the other hand, some expert groups have done a great job of being open and responsive, and we'll be trying to encourage the use of those as models. Open source has demonstrated many of the benefits of openness and responsiveness, and some of the techniques that can help make it work in practice.
-   **Awareness of big picture**: All JSRs exist in a wider context, and ignore that at their peril. This is one reason we feel good about EE 6: it's the first proposal from Java EE that takes into account prior art and solutions that people are successfully using. We don't want more java.util.logging fiascos. A few years ago, J2EE was synonymous with enterprise Java. Enterprise Java developers looked to it as the source of all answers. That didn't work out, and today, Java EE must make the right choices to maintain its relevance. That is actually a *good* thing: there's nothing to drive improvement like existing in a competitive landscape. And, as I pointed out in my last blog, a lot of the competition these days is from outside the world of Java altogether, meaning that the whole Java community is fundamentally on the same side. Inside the Java tent, technologies like OSGi need to be considered, especially where they can help to achieve some of the goals of the EE6 effort, such as componentization of servers. OSGi Alliance Technical Director Peter Kriens recently [blogged](http://www.osgi.org/blog/2007/07/can-someone-tell-sun-about-osgi.html) about this, making the interesting point that "In a context free society basing JSR 316 on OSGi/JSR 291 would be an absolute no-brainer." We would like to see the best technical decisions made, regardless of the origins of the technologies in question.

```
Copy<li><strong>Honesty</strong>: We intend to be completely honest about our opinions. There are parts of Java EE 5 that we think suck (notably the EJB interception model), and I recently <a href="http://blog.interface21.com/main/2007/07/03/java-ee-6-gets-it-right/">blogged </a>about why we think that Java EE 6 looks very promising. We're getting involved because we think EE6 is right and important. But we can bring most value by being honest about what we think doesn't work, as well. That way it might be made better.</li>
```

-   **Technical focus**: Fundamentally our position will be driven by what we believe will lead to the best technology solutions, which will work in the real world.
-   **End user focus**: We'll be asking the question *who does this benefit?* If there's no clear benefit to users, it's probably better not to add or change a feature, as increased platform complexity is definitely *not* what users want.
-   **Clarity**: We believe that where possible, concepts should be defined once across a group of specs such as Java EE. For example, the overlap between EJB3, Common Annotations for the Java Platform (JSR-250) and the Java EE 5 specification is confusing. Where is the single definitive discussion of injection functionality? We recognize that there are limitations of what's possible in this respect
-   **Maturity**: Most of the biggest mistakes in the past--CMP entity beans, anyone?--resulted from "standardizing" unproven, immature technology. Standardization of proven concepts works; standards bodies do a bad job of innovation. (There's a reason that "design by committee" is a term of abuse.) Once you standardize something that is unproven, you are setting up users for years of pain if it proves that you got things wrong. Fortunately the extensibility concept in Java EE 6 offers the perfect balance between responsible standardization and innovation on the platform, so Java EE is now well placed to navigate this tricky area.

We're just at the start of what will probably be a 2 year process. But we're optimistic and are going to try our best to help to make it work. We need your help. As a member of the JCP, Interface21 is committed to being open to the community.

It's good to see Bill Shannon and Roberto Chinnici, the spec leads at Sun, being committed to openness as well in EE6. [Roberto](http://weblogs.java.net/blog/robc/archive/2007/09/java_ee_6_platf.html) has just blogged an update on recent discussions and he's planning to do so again monthly.