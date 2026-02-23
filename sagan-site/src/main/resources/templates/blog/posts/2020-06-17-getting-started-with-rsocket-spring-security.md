---
title: Getting Started With RSocket: Spring Security
source: https://spring.io/blog/2020/06/17/getting-started-with-rsocket-spring-security
scraped: 2026-02-23T13:56:43.656Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  June 17, 2020 | 2 Comments
---

# Getting Started With RSocket: Spring Security

_Engineering | Ben Wilcock |  June 17, 2020 | 2 Comments_

**Reading time: about 6 minutes** **Coding time: about 20 minutes**

If you've been following [my series on RSocket](https://spring.io/team/benwilcock), you've already learned how to build client-server applications with Spring Boot. In today's exercise, you're going to learn how to add security to your RSocket applications.

The task of securing RSocket applications is greatly simplified when you use Spring Security. [Spring Security](https://spring.io/projects/spring-security) is a must-have module for any production application. It allows you to easily plugin many different authentication providers and restricts each user's access to your application based on their identity and their role.

As you will see, the code required to secure your application is pretty straightforward. But because security is such a "cross-cutting" concern, the changes do touch a few different parts of the code. It's not difficult to make these changes yourself, but as ever, the full code sample is available on [GitHub](https://github.com/benwilcock/spring-rsocket-demo).

> **Note:** At the time of writing, RSocket’s security extensions are still a work in progress. You can follow their progress [here](https://github.com/rsocket/rsocket/blob/master/Extensions/Security/Authentication.md). In this exercise, we’ll be using [Simple Authentication](https://github.com/rsocket/rsocket/blob/master/Extensions/Security/Simple.md) which carries the warning: “Simple Authentication transmits the username and password in cleartext. Additionally, it does not protect the authenticity or confidentiality of the payload that is transmitted along with it. This means that the Transport that is used should provide both authenticity and confidentiality to protect both the username and password and corresponding payload.”

## [](#step-1-add-the-spring-security-dependencies)Step 1: Add The Spring Security Dependencies

In the `POM.xml` files for the `rsocket-client` and `rsocket-server` projects, add the following security dependencies:

```xml
Copy       <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-rsocket</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-messaging</artifactId>
        </dependency>
```

Together, these dependencies will integrate Spring Security into your RSocket applications. Including the `spring-boot-starter-security` package means that much of the configuration happens automatically.

## [](#step-2-secure-your-rsocket-server)Step 2: Secure Your RSocket Server

Securing your RSocket responders is best done in two stages. First, add a security configuration class, and second, secure your RSocket responder methods.

> Note: These changes will temporarily break the integration test you added in the [last tutorial](https://spring.io/blog/2020/05/25/getting-started-with-rsocket-testing-spring-boot-responders). Don't worry; I'll show you how to fix it again later.

### [](#21-configure-spring-security)2.1 Configure Spring Security

To customize the configuration of Spring Security, in your `rsocket-server` project, add a new class called `RSocketSecurityConfig.java` containing the code below.

> Note: The import statements are missing. Ask your IDE to add them for you when prompted.

```java
Copy@Configuration // (1)
@EnableRSocketSecurity // (2)
@EnableReactiveMethodSecurity // (3)
public class RSocketSecurityConfig {

    @Bean // (4)
    RSocketMessageHandler messageHandler(RSocketStrategies strategies) {

        RSocketMessageHandler handler = new RSocketMessageHandler();
        handler.getArgumentResolverConfigurer().addCustomResolver(new AuthenticationPrincipalArgumentResolver());
        handler.setRSocketStrategies(strategies);
        return handler;
    }

    @Bean // (5)
    MapReactiveUserDetailsService authentication() {
        //This is NOT intended for production use (it is intended for getting started experience only)
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("user")
                .password("pass")
                .roles("USER")
                .build();

        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("test")
                .password("pass")
                .roles("NONE")
                .build();

        return new MapReactiveUserDetailsService(user, admin);
    }

    @Bean // (6)
    PayloadSocketAcceptorInterceptor authorization(RSocketSecurity security) {
        security.authorizePayload(authorize ->
                authorize
                        .anyExchange().authenticated() // all connections, exchanges.
        ).simpleAuthentication(Customizer.withDefaults());
        return security.build();
    }

```

Specifying `@Configuration` (1) tells Spring Boot that this is a configuration class. The `@EnableRSocketSecurity` annotation (2) activates Spring's security features for RSocket. Setting `@EnableReactiveMethodSecurity` (3) allows you to secure your reactive methods.

The `RSocketMessageHandler` bean configured at (4) automatically converts user credentials into a `UserDetails` object. The `MapReactiveUserDetailsService` bean set at (5) provides Spring with a hardcoded database of users. Providing the user database manually in this way isn't very realistic, but it will suffice for this demo. You can read up on [how this is done with other identity providers later](https://docs.spring.io/spring-security/site/docs/5.3.2.RELEASE/reference/html5/#modules).

Finally, the `PayloadSocketAcceptorInterceptor` bean at (6) specifies what users can do with the application. In this case, users must authenticate before being connected or granted access to any server-side features.

### [](#22-secure-your-rsocket-methods)2.2 Secure Your RSocket Methods

The user's role governs the methods accessible to them. This "role-based access control" is configured in this case using Spring Security's `@PreAuthorize` annotation. The following code shows an example of this annotation in action — securing the "fire-and-forget" message-mapping in the RSocketController class:

```java
Copy    @PreAuthorize("hasRole('USER')") // (1)
    @MessageMapping("fire-and-forget")
    public Mono<Void> fireAndForget(final Message request, @AuthenticationPrincipal UserDetails user) { // (2)
        log.info("Received fire-and-forget request: {}", request);
        log.info("Fire-And-Forget initiated by '{}' in the role '{}'", user.getUsername(), user.getAuthorities());
        return Mono.empty();
    }
```

The `@PreAuthorize("hasRole('USER')")` annotation (1) ensures that only users with the authority ‘ROLE\_USER’ are allowed access to this method. In section 2.1 above, you created a user with this role.

If you're particularly eagle-eyed, you'll have noticed two other changes in the `fireAndForget()` method's signature. The first is that the method parameters now include `@AuthenticationPrincipal UserDetails user` (2). Spring provides this `user` object automatically. Second, the return parameter is now `Mono<Void>` rather than a regular 'void.' This change is required because `@EnableReactiveMethodSecurity` demands that the return values are from [project Reactor](https://projectreactor.io/docs/core/release/reference/#core-features) (i.e. Flux or Mono).

## [](#step-3-add-security-to-your-client)Step 3: Add Security To Your Client

In the code sample, the client has undergone several code changes. Most of them are not related to security. The majority of the changes simply make the client more comfortable to use when working with a secured server-side RSocket responder. In this section, you'll cover only the security changes. See the [code sample](https://github.com/benwilcock/spring-rsocket-demo) for the additional code.

The security changes made to the client-side are all related to how it connects to the RSocket server. The connection code has been moved out of the class constructor and into a new `login()` method. This login method expects the user to provide their username and password as they login. These credentials become metadata for the RSocket connection. The code for the login command is below:

```java
Copyprivate static final MimeType SIMPLE_AUTH = MimeTypeUtils.parseMimeType(WellKnownMimeType.MESSAGE_RSOCKET_AUTHENTICATION.getString()); // (1)

@ShellMethod("Login with your username and password.")
    public void login(String username, String password) {
        SocketAcceptor responder = RSocketMessageHandler.responder(rsocketStrategies, new ClientHandler());

        UsernamePasswordMetadata user = new UsernamePasswordMetadata(username, password); // (2)

        this.rsocketRequester = rsocketRequesterBuilder
                .setupRoute("shell-client")
                .setupData(CLIENT_ID)
                .setupMetadata(user, SIMPLE_AUTH) // (3)
                .rsocketStrategies(builder ->
                        builder.encoder(new SimpleAuthenticationEncoder())) // (4)
                .rsocketConnector(connector -> connector.acceptor(responder))
                .connectTcp("localhost", 7000)
                .block();

 // ...connection handling code omitted. See the sample for details.
    }
```

This code looks very similar to the old constructor code. The most relevant lines in terms of adding security are as follows:

The `SIMPLE_AUTH` static variable (1) declares how your user object should be encoded when passed as connection metadata. A new `UsernamePasswordMetadata` is defined (2), which contains the credentials provided by the user as they login. When connecting (3), the `setupMetadata()` method passes the `user` object and the encoding mimetype defined at point (1). A new `SimpleAuthenticationEncoder` (4) is placed in the `RSocketStrategies` used for this connection. This object takes care of encoding the UsernamePasswordMetadata (2) into the correct mimetype (1).

Further changes in the sample code allow the user to `logout`. This means the user can switch between identities without having to restart the client every time.

## [](#step-4-test-the-security-works)Step 4: Test The Security Works

The moment you added Spring Security's dependencies and your security configuration class, your code became more secure. At the same time, your integration test stopped working because it doesn't respect the new security settings.

To fix the `RSocketClientToServerITest.java` integration test, modify the `setupOnce()` method so that a user object added to the connection metadata. The code required looks very similar to that you just saw in the client's login method:

```java
Copy@BeforeAll
    public static void setupOnce(@Autowired RSocketRequester.Builder builder,
                                 @LocalRSocketServerPort Integer port,
                                 @Autowired RSocketStrategies strategies) {

        SocketAcceptor responder = RSocketMessageHandler.responder(strategies, new ClientHandler());
        credentials = new UsernamePasswordMetadata("user", "pass");
        mimeType = MimeTypeUtils.parseMimeType(WellKnownMimeType.MESSAGE_RSOCKET_AUTHENTICATION.getString());

        requester = builder
                .setupRoute("shell-client")
                .setupData(UUID.randomUUID().toString())
                .setupMetadata(credentials, mimeType)
                .rsocketStrategies(b ->
                        b.encoder(new SimpleAuthenticationEncoder()))
                .rsocketConnector(connector -> connector.acceptor(responder))
                .connectTcp("localhost", port)
                .block();
    }
```

With the credentials now added to the connection, the test functions correctly. To verify this, at the terminal, navigate to your `rsocket-server` folder and run the Maven `verify` command. This action will run the revised integration test.

```bash
Copy./mvnw clean verify
```

Congratulations. Your integration test now runs and passes once again!

## [](#theres-more)There's More

I've included two further integration tests in the `rsocket-server` sample code. The first, `RSocketClientToSecuredServerITest.java` uses the `test` user credentials from the `RSocketSecurityConfig` class to confirm that the server-side methods are not accessible to users who don't have the `USER` role. The test method code looks like this:

```java
Copy    @Test
    public void testFireAndForget() {
        // Send a fire-and-forget message
        Mono<Void> result = requester
                .route("fire-and-forget")
                .data(new Message("TEST", "Fire-And-Forget"))
                .retrieveMono(Void.class);

        // Assert that the user 'test' is DENIED access to the method.
        StepVerifier
                .create(result)
                .verifyErrorMessage("Denied"); // (1)
    }
```

The test asserts that the result of the fire and forget call should be an exception stating that the user is "Denied" access (1).

The other new test asserts that users with fake credentials can't obtain an RSocket connection. The code for this test is in the file `RSocketClientDeniedConnectionToSecuredServerITest.java`.

And finally, feel free to try the updated `rsocket-client` at the command line. You can login using the various credentials and try accessing the server-side methods for yourself.

```bash
Copycd rsocket-client
./mvnw clean package spring-boot:run

# To get help with all the available commands
shell:> help

# To access to all features.
shell:> login user pass 

# To access no features.
shell:> login test pass

# To exit the client
shell:> exit
```

That's it for this tour of RSocket and Spring Security. I hope you found it useful. You can also see how Josh Long handles the same topic in [this Spring Tips video](https://youtu.be/ER-mbWp2xYg). As usual, feel free to like, share, and leave a comment below. For future news and updates, why not [follow me on Twitter](https://twitter.com/benbravo73)?