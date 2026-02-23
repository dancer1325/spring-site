---
title: Hello, Spring GraphQL
source: https://spring.io/blog/2021/07/06/hello-spring-graphql
scraped: 2026-02-23T12:40:50.128Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  July 06, 2021 | 11 Comments
---

# Hello, Spring GraphQL

_Engineering | Rossen Stoyanchev |  July 06, 2021 | 11 Comments_

> **Guest Author**: [Andi Marek](https://twitter.com/andimarek), GraphQL Java founder

I am very happy to announce the creation of the [Spring GraphQL](https://github.com/spring-projects/spring-graphql) project and the availability of an initial milestone towards a 1.0 release. The project integrates [GraphQL Java](https://www.graphql-java.com/) and Spring and was developed in collaboration between both teams.

Today is GraphQL Java's 6th birthday! One fundamental decision I made from the start was to leave any HTTP and IO aspects as a separate concern. GraphQL Java has always been "just" an engine to execute GraphQL requests. The decision has paid off but the obvious downside is the need to create your own HTTP adapter for real world usage.

This lead to the creation of a multitude of GraphQL integrations for Spring over the years, including the [GraphQL Java Spring](https://github.com/graphql-java/graphql-java-spring) project from the GraphQL Java team.

But quite frankly I always aspired a first class Spring integration.

Nearly exactly one year ago to this day, the GraphQL Java and Spring teams had their first meeting to discuss how to make this happen.

Over the past 12 months, despite challenging timezone differences, we have collaborated on and discussed a wide range of topics. We are now ready to bring this effort to a wider audience with a milestone release.

Special thanks to [Rossen](https://spring.io/team/rstoyanchev) and [Brian](https://spring.io/team/bclozel) for the great collaboration, as well as to [Rob](https://spring.io/team/rwinch) and [Mark](https://spring.io/team/mp911de) and the increasing number of Spring engineers who are joining the effort.

I truly believe that this project is huge step for GraphQL Java and for the wider GraphQL ecosystem: having a Spring integration that's maintained and evolved by Spring engineers is a key factor for the success of GraphQL.

[Spring GraphQL](https://github.com/spring-projects/spring-graphql) is the successor of [GraphQL Java Spring](https://github.com/graphql-java/graphql-java-spring). The intent is for Spring GraphQL to become the foundation for all Spring applications for GraphQL, building in turn on GraphQL Java.

Our general philosophy for both GraphQL Java and Spring GraphQL is to be unopinionated and focused on comprehensive and wide ranging support. Our hope is that similar existing integrations for Spring and GraphQL Java will choose to build on Spring GraphQL and instead focus on providing higher level support and more opinionated features.

A very important goal is to hear from you, the community, to help us stabilize APIs and the set of features towards the 1.0 release. If you have GraphQL applications, please have a look and let us know by [opening an issue](https://github.com/spring-projects/spring-graphql/issues).

Please, read the [follow-up blog](https://spring.io/blog/2021/07/06/introducing-spring-graphql) post for more details.

The GraphQL Java and Spring teams will have a joint talk at [SpringOne](https://springone.io/) on September 2-3. Please, register to attend the conference, which is online and free for a second, consecutive year.

[Andy Marek](https://twitter.com/andimarek)