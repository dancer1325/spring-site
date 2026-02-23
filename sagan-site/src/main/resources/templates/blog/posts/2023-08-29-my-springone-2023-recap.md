---
title: My SpringOne 2023 Recap
source: https://spring.io/blog/2023/08/29/my-springone-2023-recap
scraped: 2026-02-23T09:26:46.505Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 29, 2023 | 1 Comment
---

# My SpringOne 2023 Recap

_Engineering | Josh Long |  August 29, 2023 | 1 Comment_

Hi, Spring fans! Look, it's Monday after the first in-person SpringOne of the 2020s and the first since the pandemic, and, being honest, I'm bushed! Vegas is a dizzying, sensational, overwhelming, exciting experience, and SpringOne is too. But it was worth it. The SpringOne show surpassed all expectations, so it was definitely worth it.

This overwhelming scale was nowhere more evident than in the keynote, which was standing room only. I can't really recap the entire show, but I do want to talk about some of the huge themes you'd have seen addressed in the keynote.

During the keynote, the good, the great, the incomparable Dr. David Syer, Moritz Halbritter, and I celebrated ten years of Spring Boot. (Yes, it is already ten years old. I can't believe it either!) And this year, we also celebrated twenty (20!) years of Spring Framework. The astute among you will know that Spring Framework 1.0 didn't come out until 2004, 19 years ago, but there were early releases of Spring Framework that looked and were called like what we know today as Spring Framework. And the doubly astute among, you may remember that Spring Boot came out on April 1, 2014, nine years ago, but there were also early releases in 2013.

![](https://pbs.twimg.com/media/F4EYOQ4aEAAbslR?format=webp&name=medium)

Dr. Syer and I revisited the past ten years, looking at the various releases of the technology, including some anecdotes and musing about how things have changed and evolved, and how - importantly - things are the same. We did some incredible things. We revived (possibly for a limited time only?) the ancient Spring Initializers! Want to generate a Spring Boot 1.0-centric project? Visit [start100.spring.io](https://start100.spring.io). 1.5? [Start150.spring.io](https://start150.spring.io). 2.0-ish? [start200.spring.io](https://start200.spring.io). And, of course, if you want to build a 3.x project, visit the contemporary [start.spring.io](https://start.spring.io) experience. In our demo we evolved the same application from 1.0 (look! starters, `start.spring.io`, autoconfiguration, etc.), 2.0 (reactive, animated ASCII art, Kubernetes support, etc.), all the way until the penultimate release of Spring Boot, version 3.0 (GraalVM native images, optimizations, Jakarta EE, etc), released November of 2022. But what about 3.1?

![](https://pbs.twimg.com/media/F4UzLkuX0AATQPv?format=webp&name=small)

Spring Boot contributor Moritz Halbritter, clad in *Lederhosen* (you just *had* to be there...), helped Dr. Syer and me catch up to the latest and greatest in Spring Boot 3.1, adding in Testcontainers and Docker Compose support. The whole 15 minutes was delicious fun, but it was not even close to the only thing we saw that day.

![](https://pbs.twimg.com/media/F4UzLg2WoAETB13?format=jpg&name=4096x4096)

Spring Framework lead, legend, and cofounder Juergen Hoeller reviewed 20 years of Spring's history (and who better? He's been there for all 20 years!), and then introduced some fantastic new opportunities and themes supported in Spring Framework 6.1 (and Spring Boot 3.2, due by the end of November of this year), including Project Loom, Project CRaC, Java 21, and more.

Juergen set the table, and the follow-up speakers served dessert, bringing us details. For my money, Cora Iberkleid's contribution, introducing (and demystifying), the incredible power of virtual threads (Project Loom) in Spring Framework 6.1, was probably my favorite segment of the keynote. She introduced `spring.threads.virtual.enabled=true`, which you'll specify in Spring Boot 3.2, with Spring Framework 6.1, to enable virtual threads across the supported portfolio projects like Apache Tomcat, Spring Data, etc.

![](https://pbs.twimg.com/media/F4EgYSSaAAYVRD3?format=jpg&name=4096x4096)

I've long been saying that virtual threads are probably my favorite single feature to have been added to Java. People have left the ecosystem and made do with vastly inferior languages to get what Project Loom promises to bring Java. It's *that* revolutionary, and I can't wait! Remember, Java 21, which includes Project Loom, is due September 19 September 19, 2023! Do *not* miss it!

Project Loom promises markedly improved scalability for workloads with blocking IO, but how about startup and performance? Spring has a great story with GraalVM, which has been supported since Spring Boot 3.0 and 2022. The story is only getting better. GraalVM does well at reducing the memory overhead of a given service *and* improving startup time.

But GraalVM isn't the only way to improve startup time. There's also a new initiative, also supported in Spring Framework 6.1, called Project CRaC (Coordinated Restore at Checkpoint), that offers dramatically improved startup time. Reactive and Netty legend Violeta Georgieva took the stage to discuss scaling to zero with JVM checkpoint restore.

Startup time is critical in all sorts of workloads, like platforms-as-a-services, but especially in serverless, scale-to-zero, and function-as-a-service platforms. And here we had some exciting new developments. AWS's Mark Sailles and Spring and eventing legend Oleg Zhurakousky introduced an exciting new frontier: writing Spring MVC-style \`@Controller's that could be deployed and scale-to-zero, on severless infrastructure like AWS Lambda and Azure Functions.

And speaking of Azure, [Microsoft's Asir Selvasingh and VMWare's Adib Saikali](https://pbs.twimg.com/media/F4EoFPFaAAIC_fc?format=jpg&name=large) had an excellent segment introducing some of the fantastic new opportunities (and discounts!) for Azure Spring Apps, a jointly developed and managed platform run on Microsoft Azure. One of the things they demonstrated was using AI - "artificial intelligence?" I hear you gasp, "In 2023? I could not have seen this coming!" - via Azures OpenAI integration, a sort of managed OpenAI-as-a-service offering that people can consume in a familiar, integrated fashion via Microsoft Azure. It works brilliantly with the new Spring AI project!

Which brings us to that: Spring AI has arrived! This little session exploded in popularity. The legendary Dr. Mark Pollack, first lead of Spring Data, creator of Spring.NET, and cofounder of Spring Cloud Data Flow, had a session that was overflowing with interest in the nascent Spring AI, and I even did a [livestream with him to talk about it](https://www.youtube.com/watch?v=0P8UU5vkvI8). Spring AI brings a simple `AiClient` that you can autoconfigure (provide the appropriate key for the large language model of your choice) and inject to have it generate responses to human language queries. What a time to be alive!

There was an incredible five minutes-long montage with kudos and congratulations and well-wishes from luminaries in the Spring ecosystem - the likes of Matt Raible (Okta developer advocate and fellow Java Champion), Trisha Gee (Gradle developer advocate and fellow Java Champion), Mala Gupta (Jetbrains IntelliJ IDEA developer advocate and fellow Java Champion), Sergei Egorov (Testcontainers and Atomicjar cofounder), Andreas Marek (GraphQL Java founder), Alina Yurenko (GraalVM developer advocate at Oracle Labs), Roman Elizarov (Kotlin language and coroutines luminary), and Marc Philipp (JUnit team lead).

These are just some of the major themes You [should just watch it here](https://springone.io/). And I have *no shot* at being able to capture even my top ten favorite sessions. You should [just watch them here](https://www.vmware.com/explore/video-library/search.html#sessiontype=%22SpringOne%20at%20VMware%20Explore%22&year=2023) as they're put online. (There are already some of them there, so get goin'!)

This show was loaded with an impossible burden - providing the long-awaited return to in-person events for SpringOne while celebrating 20 years of Spring ([did you see this](https://springone.io/history-of-spring)) and 10 years of Spring Boot, all the while capturing the unparalleled diversity of ideas in the modern JVM zeitgeist and preparing the largest ecosystem in the world for what lay ahead. But, somehow, it did it! I can't wait for next year!