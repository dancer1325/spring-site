---
title: Building a RESTful quotation service with Spring
source: https://spring.io/blog/2014/08/21/building-a-restful-quotation-service-with-spring
scraped: 2026-02-23T22:16:54.842Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  August 21, 2014 | 3 Comments
---

# Building a RESTful quotation service with Spring

_Engineering | Greg L. Turnquist |  August 21, 2014 | 3 Comments_

I was recently made aware that a public API we were using for one of our guides contained objectionable material. After confirming this, I immediately responded that we would pick another source. Wishing to avoid such an issue in the future, I decided the best solution was to build our own RESTful quote service. So I decided to use the best tools to do so, the Spring stack, and was able to migrate the very next day.

### [](#picking-your-tools)Picking your tools

To kick things off, I made a check list of what I knew would be the right tools for the job of creating a RESTful web service.

-   [Spring Data JPA](http://projects.spring.io/spring-data-jpa/) - quickly pre-load, fetch, and potentially update content
-   [Spring MVC](http://projects.spring.io/spring-framework/) - solid REST support since Spring 3
-   [Spring Boot](http://projects.spring.io/spring-boot/) - create all the needed components with little to no effort
-   [http://start.spring.io](http://start.spring.io) - assemble a project by simply checking the desired items on a form

I quickly set aside the desire to add, delete, manage, or view the data through a web page. Instead, my focus was to serve up a fixed set of content with the exact same structure that the guide expected to consume.

### [](#picking-your-content)Picking your content

The original content for the guide was a series of "Chunk Norris" jokes. I like a good laugh. But when I revisited the public API, I saw that several of the jokes were a bit rancid. After a brief discussion with colleagues, the idea came up to cite historical quotes. I took that idea and bent it a little. I had recently collected quotes from various developers about Spring Boot for personal reasons, so I decided to use that as the curated content.

### [](#time-to-code)Time to code!

To kick things off, I visited [http://start.spring.io](http://start.spring.io). This [Spring Boot app](https://github.com/spring-io/initializr) lets you enter the details of your new project, pick the Java level, and select the Spring Boot starters you need. I used my checklist up above and created a new gradle-based project.

#### [](#defining-your-domain)Defining your domain

With the project unpacked and imported into my IDE, the first thing I did was copy the [domain objects shown in the Reactor guide](http://spring.io/guides/gs/messaging-reactor/#initial). This way, I could ensure that the data sent out by my REST service was correct. Since the POJOs in my *Quoters Incorporated* app are almost identical, I won't post them here.

Then I created a Spring Data repository.

```java
Copypublic interface QuoteRepository extends CrudRepository<Quote, Long> {}
```

This empty interface definition handles `Quote` objects with an internal primary key of type `Long`. By extending the Spring Data Commons `CrudRepository`, it inherits a fistful of database operations we'll use later on.

Next step? Initialize some data. I created a `DatabaseLoader` like this:

```java
Copy@Service
public class DatabaseLoader {

	private final QuoteRepository repository;

	@Autowired
	public DatabaseLoader(QuoteRepository repository) {
		this.repository = repository;
	}

	@PostConstruct
	void init() {
		repository.save(new Quote("Working with Spring Boot is like pair-programming with the Spring developers."));
		// more quotes...
	}

}
```

-   It's marked as a `@Service` so it will be automatically picked up by `@ComponentScan` when the app starts.
-   It uses constructor injection with auto-wiring to ensure a copy of the `QuoteRepository` is made available.
-   `@PostConstruct` tells Spring MVC to run the data loading method after all beans have been created.
-   Finally, the `init()` method uses Spring Data JPA to create a whole slew of quotations.

Because I have H2 as my database of choice (**com.h2database:h2**) in `build.gradle`, there is no database set up at all (thanks to Spring Boot).

#### [](#creating-a-controller)Creating a controller

After I built this database layer, I went on to create the APIs. With Spring MVC, it wasn't hard at all.

```java
Copy@RestController
public class QuoteController {

	private final QuoteRepository repository;

	private final static Quote NONE = new Quote("None");

	private final static Random RANDOMIZER = new Random();

	@Autowired
	public QuoteController(QuoteRepository repository) {
		this.repository = repository;
	}

	@RequestMapping(value = "/api", method = RequestMethod.GET)
	public List<QuoteResource> getAll() {
		return StreamSupport.stream(repository.findAll().spliterator(), false)
			.map(q -> new QuoteResource(q, "success"))
			.collect(Collectors.toList());
	}

	@RequestMapping(value = "/api/{id}", method = RequestMethod.GET)
	public QuoteResource getOne(@PathVariable Long id) {
		if (repository.exists(id)) {
			return new QuoteResource(repository.findOne(id), "success");
		} else {
			return new QuoteResource(NONE, "Quote " + id + " does not exist");
		}
	}

	@RequestMapping(value = "/api/random", method = RequestMethod.GET)
	public QuoteResource getRandomOne() {
		return getOne(nextLong(1, repository.count() + 1));
	}

	private long nextLong(long lowerRange, long upperRange) {
		return (long)(RANDOMIZER.nextDouble() * (upperRange - lowerRange)) + lowerRange;
	}

}
```

Let's break it down:

-   The whole class is flagged as a `@RestController`. This means all routes return objects not views.
-   I have some static objects, particular a `NONE` quote and a Java 8 `Random` for randomly picking quotes.
-   It uses constructor injection to get a hold of `QuoteRepository`.

API

Description

/api

Fetch ALL quotes

/api/{id}

Fetch quote **id**

/api/random

Fetch a random quote

To fetch ALL quotes, I use a Java 8 stream to wrap the Spring data's `findAll()` and in turn, wrap each one into a `QuoteResource`. The results are turned into a `List`.

To fetch a single quote, it first tests if a given id exists. If not, return `NONE`. Otherwise, return a wrapped quote.

Finally, to fetch a random quote, I use Java 8's `Random` utility inside the `nextLong()` utility method to fetch a `Long` with the `lowerRange` and `upperRange`, inclusively.

> **QUESTION:** Why am I using `QuoteResource`? `Quote` is the core domain object returned by the `QuoteRepository`. To match the previous public API, I wrap each instance in a `QuoteResource` which includes a **status** code.

#### [](#testing-the-results)Testing the results

With this in place, the default `Application` class created by [http://start.spring.io](http://start.spring.io) was ready to run.

````
Copy$ curl localhost:8080/api/random
{
	type: "success",
	value: {
		id: 1,
		quote: "Working with Spring Boot is like pair-programming with the Spring developers."
	}
}
```

Ta dah! 

To wrap things up, I built the JAR file and pushed it up to [Pivotal Web Services](https://run.pivotal.io/). You can view the site yourself at http://gturnquist-quoters.cfapps.io/api/random.

Suffice it to say, I was able to tweak the [Reactor guide](https://spring.io/guides/gs/messaging-reactor/) by altering [ONE LINE OF CODE](https://github.com/spring-guides/gs-messaging-reactor/blob/master/complete/src/main/java/hello/Receiver.java#L21). With that in place, I did some other clean up of the content and was done!

To see the code, please visit https://github.com/gregturn/quoters.

### Outstanding issues

* This RESTful service satisfies [Level 2 - HTTP Verbs](http://martinfowler.com/articles/richardsonMaturityModel.html#level2) of the Richardson Maturity Model. While good, it's best to shoot for [Level 3 - Hypermedia](http://martinfowler.com/articles/richardsonMaturityModel.html#level3). With [Spring HATEOAS](http://projects.spring.io/spring-hateoas), it's easier than ever to add hypermedia links. Stay tuned.
* There is no friendly web page. This would be nice, but it isn't required.
* Content is fixed and defined inside the app. To make content flexible, we would need to open the door to POSTs and PUTs. This would introduce the desire to also secure things properly.

These are some outstanding things that didn't fit inside the time budget and weren't required to solve the original problem involving the Reactor guide. But they are good exercises you can explore! You can clone the project in github and take a shot at it yourself!

### SpringOne 2GX 2014

Book your place at [SpringOne](https://2014.event.springone2gx.com/register) in Dallas, TX for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. You can see myself and Roy Clarkson talk about [Spring Data REST - Data Meets Hypermedia](https://2014.event.springone2gx.com/schedule/sessions/spring_data_rest_data_meets_hypermedia.html) to see how to merge Spring Data and RESTful services.
````