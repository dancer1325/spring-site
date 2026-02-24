---
title: Spring Framework: The Origins of a Project and a Name
source: https://spring.io/blog/2006/11/09/spring-framework-the-origins-of-a-project-and-a-name
scraped: 2026-02-24T09:33:38.798Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  November 09, 2006 | 6 Comments
---

# Spring Framework: The Origins of a Project and a Name

_Engineering | Rod Johnson |  November 09, 2006 | 6 Comments_

I am regularly asked about the origin of the name “Spring.”

The name goes back to late 2002. In November 2002, I published [Expert One-on-One J2EE Design and Development](http://www.amazon.com/Expert-One-Design-Development-Programmer/dp/0764543857/). The book was accompanied by 30,000 lines of framework code, which had accounted for a good deal of the year full-time I put into writing the book. (Writing a 750 page book is enough work on its own; writing a substantial framework to go along with it is sheer masochism. It was hard.) Many of the fundamental concepts of the Spring Framework were there: an already capable IoC container, with BeanFactory and ApplicationContext and sophisticated Dependency Injection (although that name was not coined until late 2003); an early form of what become Spring MVC with Controller, HandlerMapping and friends; the *template* concept; JdbcTemplate and the concept of technology-agnostic data access exceptionsâ¦

I wasn't sure what to do with the code. I was happy for people to use it if it benefited them, directly or as a guide to their own implementations. I wasn't sure I wanted to commit time to an open source project (having already sacrificed almost a year's salary), but I was keen to see the concepts achieve the best possible implementation, and I couldn't do that alone. Shortly after the book was published, readers began to use the Wrox forums to discuss the code and two of themâJuergen Hoeller and Yann Caroffâpersuaded me to make the code the basis of an open source project, and became co-founders. Juergen's name is of course central to any discussion of Spring today; but the Spring community should also remember Yann for his early contribution toward making the Spring project happen.

Whatever happened next, the framework needed a name. In the book it was referred to as the “Interface21 framework” (at that point it used com.interface21 package names), but that was not a name to inspire a community. Fortunately Yann stepped up with a suggestion: “Spring”. His reasoning was association with nature (having noticed that I'd trekked to Everest Base Camp in 2000); and the fact that Spring represented a fresh start after the “winter” of traditional J2EE. We recognized the simplicity and elegance of this name, and quickly agreed on it.

Yann eventually stopped contributing to open source to concentrate on playing music as a hobby and having a normal social life. Juergen, of course, stepped up to make a decisive contribution to making Spring the force it is today. Within a few months more the key Spring team had come together and the project went public in June 2003 and powered towards 1.0.