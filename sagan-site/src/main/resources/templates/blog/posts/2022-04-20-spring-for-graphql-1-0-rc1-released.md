---
title: Spring for GraphQL 1.0 RC1 Released
source: https://spring.io/blog/2022/04/20/spring-for-graphql-1-0-rc1-released
scraped: 2026-02-23T12:44:02.463Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  April 20, 2022 | 0 Comments
---

# Spring for GraphQL 1.0 RC1 Released

_Releases | Brian Clozel |  April 20, 2022 | 0 Comments_

On behalf of everyone involved, I'm pleased to announce the availability of the first and final release candidate of Spring for GraphQL 1.0. We're finally going to release a 1.0 version on May 17, the reference version for Spring Boot 2.7.0. We've shipped a few noteworthy changes and one important new feature in this release.

**Note:** *The Spring for GraphqL Boot starter is up-to-date with the changes discussed in this post and Spring Boot 2.7.0-RC1 is scheduled to be released on Thursday this week.*

### [](#graphql-over-rsocket)GraphQL over RSocket

Spring for GraphQL started out with the HTTP and WebSocket transports - must haves in the GraphQL world. Our programming model allows adding others too, and our existing infrastructure pointed at another clear candidate: [the RSocket protocol](https://rsocket.io/). In RC1 we've added client and server support for GraphQL over RSocket.

RSocket supports streaming through reactive streams back-pressure, request throttling, session resumption, among others. Moreover, [RSocket features](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#rsocket) provide all the semantics necessary to be a transport for all GraphQL requests, without an additional protocol on top such as is necessary for GraphQL over HTTP and over WebSocket.

RSocket itself runs over connection-oriented transports such as WebSocket, TCP, and others. In Spring Boot, you can [set up an RSocket server over WebSocket or TCP](https://docs.spring.io/spring-boot/docs/2.7.0-SNAPSHOT/reference/html/messaging.html#messaging.rsocket). After that you'll just need to configure a "route" for the GraphQL messages through the `"spring.graphql.rsocket.mapping"` property, e.g. `"spring.graphql.rsocket.mapping=graphql"`.

You can then use [rsc](https://github.com/making/rsc) to test your GraphQL API:

```
Copy➜  ~ rsc --request --route=graphql --dataMimeType="application/graphql+json" --data='{"query":"{\n  greeting \n}"}' --debug tcp://example.spring.io:9191
DEBUG 39367 --- [actor-tcp-nio-2] io.rsocket.FrameLogger                   : sending ->
Frame => Stream ID: 0 Type: SETUP Flags: 0b0 Length: 83
Data:

DEBUG 39367 --- [actor-tcp-nio-2] io.rsocket.FrameLogger                   : sending ->
Frame => Stream ID: 1 Type: REQUEST_RESPONSE Flags: 0b100000000 Length: 50
Metadata:
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| fe 00 00 08 07 67 72 61 70 68 71 6c             |.....graphql    |
+--------+-------------------------------------------------+----------------+
Data:
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 7b 22 71 75 65 72 79 22 3a 22 7b 5c 6e 20 20 67 |{"query":"{\n  g|
|00000010| 72 65 65 74 69 6e 67 20 5c 6e 7d 22 7d          |reeting \n}"}   |
+--------+-------------------------------------------------+----------------+
DEBUG 39367 --- [actor-tcp-nio-2] io.rsocket.FrameLogger                   : receiving ->
Frame => Stream ID: 1 Type: NEXT_COMPLETE Flags: 0b1100000 Length: 45
Data:
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 7b 22 64 61 74 61 22 3a 7b 22 67 72 65 65 74 69 |{"data":{"greeti|
|00000010| 6e 67 22 3a 22 48 65 6c 6c 6f 2c 20 52 53 6f 63 |ng":"Hello, RSoc|
|00000020| 6b 65 74 21 22 7d 7d                            |ket!"}}         |
+--------+-------------------------------------------------+----------------+
{"data":{"greeting":"Hello, RSocket!"}}
```

Spring for GraphQL also ships a dedicated GraphQL client for this case and [Spring Boot auto-configures the builder for it](https://docs.spring.io/spring-boot/docs/2.7.0-SNAPSHOT/reference/html/web.html#web.graphql.transports.rsocket):

```java
Copy
@Component
public class GraphQlExample {

    private final RSocketGraphQlClient client;

    public GraphQlExample(RSocketGraphQlClient.Builder<?> builder) {
        client = builder.tcp("example.spring.io", 8181).route("graphql").build();
    }

    public Mono<String> getGreeting() {
        return client.document("{ greeting }")
            .retrieve("greeting")
            .toEntity(String.class);
    }
}
```

### [](#default-graphql-media-type)Default GraphQL Media Type

So far, Spring for GraphQL was exclusively using `"application/json"` as a media type for HTTP requests and responses. We decided that, for our release candidate, we needed to better align with the [official GraphQL over HTTP specification](https://github.com/graphql/graphql-over-http/blob/92b57a9179834318b6f15e1d23afc49368dd5e3c/spec/GraphQLOverHTTP.md#content-types). From now on, if the client doesn't request any specific media type, we'll use `"application/graphql+json"` by default. We'll keep supporting `"application/json"` if clients request it. In any case, clients should recognize the `"+json"` suffix and encode/decode accordingly.

### [](#graphql-documents-locations)GraphQL documents locations

In the previous releases, `"classpath:graphql"` was the default location for schema files, client query documents and test client query documents. This could lead to situations where some would overshadow others and make your setup confusing. We're refined the situation with the following changes:

-   The server schema files remain with the current default `"graphql"` on the main classpath
-   The tester defaults to `"graphql-test"` (under src/test) for document files to test the server with
-   The client defaults to `"graphql-documents"` (under src/main), with a way to use a custom location for different remote APIs

Don't forget to update your application with those new locations!

### [](#graphqlsource-builder)GraphQlSource Builder

GraphQL Java offers two ways to create a schema. One is to declare it in schema definition files which is known as the SDL way. The other way is to define it programmatically through Java code.

Spring for GraphQL and its `GraphQlSource` builder focus on the former, i.e. the SDL way, by looking up and parsing `.graphqls` files, preparing a `RuntimeWiring`, and letting applications customize it. This is the more recent and [recommended option](https://www.graphql-java.com/documentation/schema/) in GraphQL Java too. However, we recognize that the purpose of `GraphQlSource` is to expose any `graphql.GraphQL` instance regardless of how the `graphql.schema.GraphQLSchema` was prepared.

In this release we've adjusted the `GraphQlSource` builder, extracting common config options into a base builder and keeping SDL related options in an extension. This means an application can now skip the steps related to initializing the schema and instead supply an externally prepared `GraphQLSchema`. This doesn't bring first class support for programmatic schema creation, but it does bring more clarity, and leaves the option to do so in the future, depending on feedback and use cases.

### [](#community)Community

Last but not least, thanks for the continued feedback and discussions in the Spring for GraphQL issue tracker. We really appreciate it as it makes the project stronger and better!