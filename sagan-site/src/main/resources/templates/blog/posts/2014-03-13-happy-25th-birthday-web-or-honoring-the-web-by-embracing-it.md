---
title: Happy 25th Birthday, Web! or: Honoring the web by embracing It
source: https://spring.io/blog/2014/03/13/happy-25th-birthday-web-or-honoring-the-web-by-embracing-it
scraped: 2026-02-24T07:37:21.438Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 13, 2014 | 0 Comments
---

# Happy 25th Birthday, Web! or: Honoring the web by embracing It

_Engineering | Josh Long |  March 13, 2014 | 0 Comments_

![](https://pbs.twimg.com/media/BinE4F6CYAAepRt.jpg)

Yesterday, the 12th of March, 2014, was [the](http://www.slate.com/blogs/future_tense/2014/03/12/techniversaries_detract_from_the_25th_anniversary_of_the_internet.html) [25th anniversary](https://twitter.com/BerkeleyLab/status/443827636159012864) [of](http://www.reddit.com/r/IAmA/comments/2091d4/i_am_tim_bernerslee_i_invented_the_www_25_years/) [Sir](http://www.bbc.com/news/uk-26540635) [Tim](http://www.cnn.com/2014/03/12/tech/web/tim-berners-lee-web-freedom/) [Berner's](http://en.wikipedia.org/wiki/Tim_Berners-Lee) [Lee](http://www.theverge.com/2014/3/12/5499258/tim-berners-lee-asks-for-net-neutrality-on-internets-25th-birthday) having invented the *web*. As he explains: "I just had to take the hypertext idea and connect it to the Transmission Control Protocol and domain name system ideas and—*ta-da!*—the World Wide Web." *Elementary*, really. (Hah!)

[Pictured](http://en.wikipedia.org/wiki/File:First_Web_Server.jpg) (taken from Wikimedia) is the original NeXT workstation (whose operating system , [NeXT Step](http://en.wikipedia.org/wiki/NeXTSTEP), underpins today's OS X and iOS design) on which Sir Tim Berners-Lee put together the initial HTTP service and client.

As an aside: I've always wondered what it would be like to be able to have been there, in that lab. To perchance accidentally trip and fall and unplug his machine and (thus) the entire web - Ha! Just imagine how much more productive you'd be if - for one hour - you could just turn the web off today! :)

HTTP had so much of the design [right in the first revisions of HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol). It was a fairly simple protocol to implement. It is stateless, which makes it easy to partition services. By 1.0 in 1996, it supported querying, and writing data and some basic client/server negotiation. It uses headers to annotate requests and responses, providing an in-built mechanism for clients and services to *enrich* the payloads conveyed payloads. HTTP was built to be used by disparate clients with disparate encodings. It was designed to benefit from network elements like caches and proxies. HTTP 1.1 was (formally) content-agnostic and had a concept of a content-type (including the `Accept` and `Content-Type` headers).

By the time [Roy Fielding](http://en.wikipedia.org/wiki/Roy_Fielding) (who also worked on HTTP 1.1) put together his famous doctoral dissertation for the University of California, Irvine, introducing the REST architectural constraint, the platform was already there for the building! [REST](http://wikipedia.org/wiki/REST) formalized some of the good ideas already in HTTP. It mapped the state mutations implied by HTTP verbs to the lifecycle of data. Think of REST as *HTTP: The Service-Oriented Parts*.

HTTP has taken us a long way. REST, too, has been a game changer. REST powers the mobile revolution, it drove the RIA-revolution, and - I'd argue - it has delivered the hitherto unicorn-like realization of [*SOA*](http://en.wikipedia.org/wiki/Service-oriented_architecture) for the masses.

## [](#an-overview-of-springs-http-and-rest-support)An Overview of Spring's HTTP and REST Support

The Spring platform *breathes* HTTP and REST. Indeed, the first lines of code ever written for the Spring framework were in support of *web programming*. The Spring frameworks offer a very rich stack for building HTTP and REST based applications.

In this post, I hope to provide a brief tour of some of Spring's rich REST support.

### [](#the-smarter-client)The Smarter Client

The [Spring framework](http://projects.spring.io/spring-framework/) includes the `RestTemplate` which reduces common HTTP operations to one-liners in the same style as the familiar [`JdbcTemplate`](http://docs.spring.io/spring/docs/4.0.x/javadoc-api/org/springframework/web/client/RestTemplate.html) and the new NIO-2 powered [`AsyncRestTemplate`](http://docs.spring.io/spring/docs/4.0.x/javadoc-api/org/springframework/web/client/AsyncRestTemplate.html). From the docs, "it simplifies communication with HTTP servers, and enforces RESTful principles. It handles HTTP connections, leaving application code to provide URLs (with possible template variables) and extract results." Yup.

The `RestTemplate` supports an interceptor model that can be used to plugin things like security, auditing, session handling, and much more. In particular, it can be made to transparently handle stateful HTTP-based exchanges like [OAuth](http://oauth.net/).

OAuth is a protocol to allow secure authorization in a simple and standard way from web, mobile and desktop applications. It secures an innumerable many web services out there including the likes of Facebook, Twitter, GitHub, LinkedIn, TripIt, and Google's various APIs. If you want to consume web services on the web, OAuth is hard to ignore and - thanks to [Spring Social](http://projects.spring.io/spring-social/) \- you don't need to!

![Building atop, or integrating with, another platform can give your application new reach.](https://pbs.twimg.com/media/BinXaxRCUAQIRAW.jpg:large)

Spring Social is an umbrella project. It provides at its foundation the machinery for building OAuth service clients (using the `RestTemplate`) and then layers on top of that type-safe, Java bindings for various APIs, including [Spring Social Twitter](http://projects.spring.io/spring-social-twitter), [Spring Social Facebook](http://projects.spring.io/spring-social-facebook/), and [Spring Social LinkedIn](http://projects.spring.io/spring-social-linkedin/). There are *many* other ([known](https://github.com/spring-projects/spring-social/wiki/Api-Providers) and unknown) third party bindings for numerous alternative APIs.

Spring Social further provides tight integration with Spring MVC applications, handling the OAuth authentication *dance* for you. Spring Social makes consuming secured OAuth APIs dead simple, and supports other common use cases like *Sign In With Facebook*.

The [Spring for Android project](http://spring.io/spring-android) delivers the `RestTemplate` for Android clients. You can also use Spring Social clients from Android, extending your reach even further.

You can find numerous *Getting Started guides* \[detailing how to consume REST services\](detailing how to consume REST services) (among other things!), not just with the [`RestTemplate`](https://spring.io/guides/gs/consuming-rest/), but [from Android, popular JavaScript clients, and more](https://spring.io/guides?filter=Consuming). There are also handy getting-started guides [to using Spring Social Twitter](https://spring.io/guides?filter=Twitter) and [Facebook](https://spring.io/guides?filter=Twitter), for a start.

### [](#the-wide-scalable-secure-web)The Wide, Scalable, Secure, Web

Spring MVC is distributed as part [of the Spring framework](http://spring.io/spring-framework). Spring MVC provides a very rich foundation for building HTTP and REST-based applications. REST is, as I mentioned earlier, an architectural constraint, *not* a hard and fast standard. Instead, there are guidelines. This is a strength and a virtue. REST can be a moving target. Dr. Leaonard Richardson devised what's called the Richardson Maturity Model, which itself provides a matrix against which [you can judge the compliance of a given REST API with RESTful principles](http://martinfowler.com/articles/richardsonMaturityModel.html).

It's not hard to be at level 2 with Spring MVC's core REST support. Taking it to the next level, 3, involves understanding a little bit about [*hypermedia*](http://en.wikipedia.org/wiki/Hypermedia), or the capacity of HTTP resources to be connected together through *links*, and HATEOAS. From the Wikipedia page on [HATEOAS](http://en.wikipedia.org/wiki/HATEOAS): "a REST client enters a REST application through a simple fixed URL. All future actions the client may take are discovered within resource representations returned from the server. The media types used for these representations, and the link relations they may contain, are standardized. The client transitions through application states by selecting from the links within a representation or by manipulating the representation in other ways afforded by its media type. In this way, RESTful interaction is driven by hypermedia, rather than out-of-band information."

There are many fine guides on [building](https://spring.io/guides?filter=Building%20a%20RESTful) REST web services, and [securing them](https://spring.io/guides/gs/securing-web/). There [are of course](http://github.com/joshlong/the-spring-rest-stack) [many](https://github.com/joshlong/boot-it-up) other [fine](https://github.com/olivergierke/spring-restbucks) examples out there, too.

[Spring HATEOAS](http://spring.io/projects/spring-hateoas) is a layer atop Spring MVC that lets you work in terms of *resources* that themselves have payloads and a collection of *links* assigned to them. These links represent a table of URIs that are *related* to the resource to which they're attached.

Working with Spring HATEOAS and Spring MVC is as easy as it can be (short of not writing any code at all!) But when you think about it, writing next-to-no code would be pretty neat, too... If you think about it, REST resources are HTTP-interfaces to data. They are discharged with moving the data represented by resources through their lifecycle, from creation, reads, updates and deletion. If you've ever used the Spring Data repository support, then you can probably see where I'm going here. [Spring Data REST](http://projects.spring.io/spring-data-rest/) lets you declaratively expose your Spring Data repositories (which themselves can be as simple as defining an interface that extends another one!) as a REST endpoint. Not bad!

And, last but certainly not least, the venerable, open-source, and easy-to-use [Apache Tomcat](http://tomcat.apache.org/) web server drives a lot of the Java-powered web. Apache HTTPD drives even more of it, and

### [](#so-what-about-security)So, what about security?

An open web application or REST API is like an wide open, exposed database; it will *probably* not be what you wanted. *Securing a web application* means many things to many people: is the connection between the client and the server encrypted? Does the application know who is making the request? Are we securing a web application? A REST service? A messaging channel? Thankfully, there needn't be more than one answer: [Spring Security](http://spring.io/projects/spring-security). Spring Security is your one-stop security shop, complete with integrations for backend identity providers (LDAP, Active Directory), authentication and authorization, encryption and support for common functionality like application sign-in and sign-out.

You might, for example, use Spring Security OAuth [to secure your REST endpoint](http://spring.io/projects/spring-security-oauth), and of course you could then consume this from Spring Social!

### [](#boot-is-where-its-at)Boot Is Where It's At

[Spring Boot](http://spring.io/projects/spring-boot) provides an ideal entry-point into all of these technologies. Applications deployed with Spring Boot come with management and metrics, out of the box. Most of the aforementioned getting started guides are based on Spring Boot. There's a lot to recommend Spring Boot for REST development, but one metric must [surely be how Tweetable it is!](https://twitter.com/david_syer/status/365367862170353667). And, of course, another is that Spring Boot makes building a Spring application as easy as pie, and that it comes packed with all sorts of features that are designed to make simpler the task of getting to production in a consistent way.

The following code is [a slight derivation](https://github.com/joshlong/sparklr-boot) of [Dr. David Syer's *epic* example demonstrating how to use Spring Boot and Spring Security OAuth to secure a REST endpoint](https://github.com/dsyer/sparklr-boot). All I've done is add a Spring Data REST-powered JPA repository and some seed data (see the repository). Spring Data REST babysits the database (a default, embedded H2 `javax.sql.DataSource`, though we could as easily have used any other `DataSource` or, indeed, any of a number of other backend NoSQL stores entirely!

```java
Copypackage demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.OAuth2ResourceServerConfigurer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

// standard @Configuration class 
@Configuration
@ComponentScan
@EnableAutoConfiguration
@Import(RepositoryRestMvcConfiguration.class) // import Spring Data REST
public class Application {

    public static final String CRM_RESOURCE_ID = "crm";
    
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
	
	    @Configuration
    @EnableResourceServer
    protected static class ResourceServerConfiguration
    	 extends ResourceServerConfigurerAdapter {

		// tell SS OAuth which URI paths to secure (optional!)
        @Override
        public void configure(HttpSecurity http) throws Exception {
            // @formatter:off
            http
                    .requestMatchers().antMatchers("/*", "/admin/beans").and()
                    .authorizeRequests()
                    .anyRequest().access("#oauth2.hasScope('read')");
            // @formatter:on
        }
		
        @Override
        public void configure(OAuth2ResourceServerConfigurer resources) throws Exception {
            resources.resourceId(CRM_RESOURCE_ID);
        }

    }

    @Configuration
    @EnableAuthorizationServer
    protected static class OAuth2Configuration
    		 extends AuthorizationServerConfigurerAdapter {
		
        @Autowired
        private AuthenticationManager authenticationManager;

		// plugin a Spring Security AuthenticationManager. One is created for us by Boot,
		// though we could plugin to *any* Identity Provider (LDAP, ActiveDirectory, etc)
        @Override
        public void configure(OAuth2AuthorizationServerConfigurer oauthServer) throws Exception {
            oauthServer.authenticationManager(authenticationManager);
        }

        @Override
        public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
            // @formatter:off
            
			// we could describe multiple clients with varying settings
            clients.inMemory()    
            		 .withClient("ios-crm")  // describe how our iOS client should connect
                    .authorizedGrantTypes("client_credentials", "password")
                    .authorities("ROLE_CLIENT")
                    .scopes("read")
                    .resourceIds(CRM_RESOURCE_ID)
                    .secret("secret");
            // @formatter:on
        }

    }
}

// a Spring Data JPA repository that's 
// exposed as a REST endpoint using Spring Data REST
@RepositoryRestResource
interface CustomerRepository extends JpaRepository<Customer, Long> {
}

// JPA entity.
@Entity
class Customer {

    @Id
    @GeneratedValue
    private Long id;
    private String firstName, lastName;

    Customer() {
    } // for JPA

    public Customer(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getLastName() {
        return lastName;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }
}

```

Not bad!

## [](#the-next-25)The Next 25

It's hard to guess what's going to happen in the long term. In the short term, though, there are some interesting developments to watch. Layer 7, a CA technologies company, has just released results of a survey focused on API design and deployment. There are many takeaways from the survey, so be sure to read it, but one thing I thought particularly promising: [a predicted growth in Hypermedia-aware APIs among API developers](http://www.infoq.com/news/2014/03/ca-api-survey). Java 8, due very soon, will sport [significant SSL/TLS improvements](http://blog.ivanristic.com/2014/03/ssl-tls-improvements-in-java-8.html), improving its security story on the open web further still. Apache Tomcat 8 is around the corner.

Many of the technical wrinkles have been ironed out and the web has become a part of everyday life. For many developers, the question isn't whether REST is a part of the architecture, it's how quickly REST services can be stood up, or managed. [Microservices](http://martinfowler.com/articles/microservices.html), for example, is an architectural style tending towards loosely-coupled, singly-focused, tiny REST services.

In Spring we have a rich toolset for building on the amazing, ubiquitous, ceaselessly growing platform of the web. The next 25 are sure to be amazing.