---
title: Spring Data Graph 1.1.0 with Neo4j support released
source: https://spring.io/blog/2011/08/19/spring-data-graph-1-1-0-with-neo4j-support-released
scraped: 2026-02-24T08:36:36.555Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  August 19, 2011 | 0 Comments
---

# Spring Data Graph 1.1.0 with Neo4j support released

_Releases | Thomas Risberg |  August 19, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the second release (1.1.0.RELEASE) of the [Spring Data Graph](http://www.springsource.org/spring-data/neo4j) project with [Neo4j](http://neo4j.org) support is now available!

After the first public release of Spring Data Graph in April 2011 we mainly focused on user feedback.

With the improved [documentation](http://static.springsource.org/spring-data/data-graph/docs/1.1.0.RELEASE/reference/html/) around the tooling and an upgraded AspectJ version we addressed many of the AspectJ issues that where reported by users. With the latest STS and Eclipse and hopefully with Idea11 it is possible to develop Spring Data Graph applications without the red wiggles. To further ease the development we also provided sample build scripts for ant/ivy and a plugin for gradle.

Of course we kept pace with development of Neo4j, currently using the latest stable release of [Neo4j (1.4.1)](http://neo4j.org/).

During the last months of Neo4j development the improved querying ([Cypher](http://static.springsource.org/spring-data/data-graph/docs/1.1.0.RELEASE/reference/html/#d0e1065), [Gremlin](http://static.springsource.org/spring-data/data-graph/docs/1.1.0.RELEASE/reference/html/#d0e1115)) support was one of the important aspects. So we strove to support it on all levels. Now, it is possible to execute Cypher queries from Spring Data Graph Repositories, from the Neo4j-Template but also as part of dynamic field annotations and via the introduced entity methods. The same goes for Gremlin scripts. What's possible with this new expressive power? Let's take a look.

For example, in a repository:

```
Copy
	public interface PersonRepository extends GraphRepository, NamedIndexRepository {
	
	    @Query("start team=(%team) match (team)-[:persons]->(member) return member")
	    Iterable findAllTeamMembers(@Param("team") Group team);
	
	    @Query(value = "g.v(team).out('persons')", type = QueryType.Gremlin)
	    Iterable findAllTeamMembersGremlin(@Param("team") Group team);
	}
```

The Neo4j Template API got a complete overhaul which resulted in much fewer, more focused methods. The advanced query result handling capabilities (type conversion, mapping, single results, handler, etc.) are now implemented using a more fluent API. This new API is available for all types of queries, whether index lookups, graph traversals, Cypher queries or Gremlin scripts.

```
Copy
	template.query("start n=(0) match n-->m return m", null).to(Node.class);
template.execute("g.v(0).out", null).to(Node.class);

template.lookup("relationship", "name", "rel1").to(String.class, new PropertyContainerNameConverter()).single();

template.traverse(referenceNode, traversalDescription).handle(new Handler<Path>() {
            public void handle(Path value) {
                final String name = (String) value.endNode().getProperty("name", "");
                resultSet.add(name);
            }});

```

The REST API wrapper also got an internal refreshment and added support for querying Cypher and Gremlin remotely. This makes both capabilities also available for running the object graph mapping and the Neo4j Template against a remote Neo4j-REST-Server.

Many thanks to the community for the valueable feedback, the code contributions and discussions. The collaboration between the SpringSource and Neo-Technology teams was enjoyable, as always.

Please check out the current release from Maven Central or from SpringSource.org. If you would like to discuss the Spring Data Graph project, make sure to visit the [Spring Forums](http://forum.springsource.org/forumdisplay.php?f=80). We host the project publicly on [github](http://github.com/springsource/spring-data-graph) for you to fork, comment and contribute.

## We want to give you a few glimpses of the future roadmap.

We are going to host a [webinar](http://plancast.com/p/6qyc) on Sept. 8th to give a quick intro to Spring Data Graph.

Spring Data Graph will be rebranded to "Spring Data Neo4j" as this is what it is about: "Support for the Neo4j Graph Database in a [Spring Framework](http://springsource.org/) environment." This already cast its first signs in the changed package structures.

We will focus on an additional mapping-based implementation that also works without AspectJ. Another major focus will be the remote REST-API which becomes more and more important with the availability of hosted Neo4j services at PaaS providers.

The Spring Data Graph Guide Book will be published as InfoQ Mini Book and available as printed version at the [Spring One](http://www.springone2gx.com/conference/chicago/2011/10/home) conference in October.

Neo Technology will be present at [Spring One](http://www.springone2gx.com/conference/chicago/2011/10/home) to talk about NOSQL, Graph Databases and Spring Data Neo4j. We also hope to contribute some unexpected events and technologies to the conference. So stay tuned.

Michael Hunger *Project Lead, Spring Data Neo4j*

Project resources: [Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20Neo4j) | [JavaDocs](http://static.springsource.org/spring-data/data-graph/docs/1.1.0.RELEASE/api/) | [Spring Data Graph Guide Book](http://static.springsource.org/spring-data/data-graph/docs/1.1.0.RELEASE/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-graph/docs/1.1.0.RELEASE/changelog.txt)