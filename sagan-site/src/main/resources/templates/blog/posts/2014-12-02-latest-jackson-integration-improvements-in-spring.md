---
title: Latest Jackson integration improvements in Spring
source: https://spring.io/blog/2014/12/02/latest-jackson-integration-improvements-in-spring
scraped: 2026-02-23T07:27:46.931Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  December 02, 2014 | 40 Comments
---

# Latest Jackson integration improvements in Spring

_Engineering | Sébastien Deleuze |  December 02, 2014 | 40 Comments_

**Updated on 2015/08/31 with an additional [Jackson modules section](#jackson-modules)**

Spring [Jackson](https://github.com/FasterXML/jackson) support has been improved lately to be more flexible and powerful. This blog post gives you an update about the most useful Jackson related features available in Spring Framework 4.x and Spring Boot. All the code samples are coming from this [spring-jackson-demo](https://github.com/sdeleuze/spring-jackson-demo) sample application, feel free to have a look at the code.

## [](#json-views)JSON Views

It can sometimes be useful to filter contextually objects serialized to the HTTP response body. In order to provide such capabilities, Spring MVC now has builtin support for [Jackson’s Serialization Views](http://wiki.fasterxml.com/JacksonJsonViews) (as of Spring Framework 4.2, JSON Views are supported on `@MessageMapping` handler methods as well).

The following example illustrates how to use `@JsonView` to filter fields depending on the context of serialization - e.g. getting a "summary" view when dealing with collections, and getting a full representation when dealing with a single resource:

```java
Copypublic class View {
	interface Summary {}
}

public class User {

	@JsonView(View.Summary.class)
	private Long id;

	@JsonView(View.Summary.class)
	private String firstname;

	@JsonView(View.Summary.class)
	private String lastname;

	private String email;
	private String address;
	private String postalCode;
	private String city;
	private String country;
}

public class Message {

	@JsonView(View.Summary.class)
	private Long id;

	@JsonView(View.Summary.class)
	private LocalDate created;

	@JsonView(View.Summary.class)
	private String title;

	@JsonView(View.Summary.class)
	private User author;

	private List<User> recipients;
  
	private String body;
}
```

Thanks to Spring MVC `@JsonView` support, it is possible to choose, on a per handler method basis, which field should be serialized:

```java
Copy@RestController
public class MessageController {

	@Autowired
	private MessageService messageService;

	@JsonView(View.Summary.class)
	@RequestMapping("/")
	public List<Message> getAllMessages() {
		return messageService.getAll();
	}

	@RequestMapping("/{id}")
	public Message getMessage(@PathVariable Long id) {
		return messageService.get(id);
	}
}
```

In this example, if all messages are retrieved, only the most important fields are serialized thanks to the `getAllMessages()` method annotated with `@JsonView(View.Summary.class)`:

```javascript
Copy[ {
  "id" : 1,
  "created" : "2014-11-14",
  "title" : "Info",
  "author" : {
    "id" : 1,
    "firstname" : "Brian",
    "lastname" : "Clozel"
  }
}, {
  "id" : 2,
  "created" : "2014-11-14",
  "title" : "Warning",
  "author" : {
    "id" : 2,
    "firstname" : "Stéphane",
    "lastname" : "Nicoll"
  }
}, {
  "id" : 3,
  "created" : "2014-11-14",
  "title" : "Alert",
  "author" : {
    "id" : 3,
    "firstname" : "Rossen",
    "lastname" : "Stoyanchev"
  }
} ]
```

In Spring MVC default configuration, `MapperFeature.DEFAULT_VIEW_INCLUSION` is set to `false`. That means that when enabling a JSON View, non annotated fields or properties like `body` or `recipients` are not serialized.

When a specific `Message` is retrieved using the `getMessage()` handler method (no JSON View specified), all fields are serialized as expected:

```javascript
Copy{
  "id" : 1,
  "created" : "2014-11-14",
  "title" : "Info",
  "body" : "This is an information message",
  "author" : {
    "id" : 1,
    "firstname" : "Brian",
    "lastname" : "Clozel",
    "email" : "bclozel@pivotal.io",
    "address" : "1 Jaures street",
    "postalCode" : "69003",
    "city" : "Lyon",
    "country" : "France"
  },
  "recipients" : [ {
    "id" : 2,
    "firstname" : "Stéphane",
    "lastname" : "Nicoll",
    "email" : "snicoll@pivotal.io",
    "address" : "42 Obama street",
    "postalCode" : "1000",
    "city" : "Brussel",
    "country" : "Belgium"
  }, {
    "id" : 3,
    "firstname" : "Rossen",
    "lastname" : "Stoyanchev",
    "email" : "rstoyanchev@pivotal.io",
    "address" : "3 Warren street",
    "postalCode" : "10011",
    "city" : "New York",
    "country" : "USA"
  } ]
}
```

Only **one** class or interface can be specified with the `@JsonView` annotation, but you can use inheritance to represent JSON View hierarchies (if a field is part of a JSON View, it will be also part of parent view). For example, this handler method will serialize fields annotated with `@JsonView(View.Summary.class)` **and** `@JsonView(View.SummaryWithRecipients.class)`:

```java
Copypublic class View {
	interface Summary {}
	interface SummaryWithRecipients extends Summary {}
}

public class Message {

	@JsonView(View.Summary.class)
	private Long id;

	@JsonView(View.Summary.class)
	private LocalDate created;

	@JsonView(View.Summary.class)
	private String title;

	@JsonView(View.Summary.class)
	private User author;

	@JsonView(View.SummaryWithRecipients.class)
	private List<User> recipients;
  
	private String body;
}

@RestController
public class MessageController {

	@Autowired
	private MessageService messageService;

	@JsonView(View.SummaryWithRecipients.class)
	@RequestMapping("/with-recipients")
	public List<Message> getAllMessagesWithRecipients() {
		return messageService.getAll();
	}
}
```

JSON Views could also be specified when using `RestTemplate` HTTP client or `MappingJackson2JsonView` by wrapping the value to serialize in a `MappingJacksonValue` as shown in this [code sample](https://github.com/spring-projects/spring-framework/blob/master/spring-web/src/test/java/org/springframework/web/client/RestTemplateIntegrationTests.java#L224).

## [](#jsonp)JSONP

As described in the [reference documentation](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#mvc-ann-jsonp), you can enable [JSONP](http://en.wikipedia.org/wiki/JSONP) for `@ResponseBody` and `ResponseEntity` methods by declaring an `@ControllerAdvice` bean that extends `AbstractJsonpResponseBodyAdvice` as shown below:

```java
Copy@ControllerAdvice
public class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {

    public JsonpAdvice() {
        super("callback");
    }
}
```

With such `@ControllerAdvice` bean registered, it will be possible to request the JSON webservice from another domain using a `<script />` tag:

```html
Copy<script type="application/javascript"
            src="http://mydomain.com/1.json?jsonp=parseResponse">
</script>
```

In this example, the received payload would be:

```javascript
CopyparseResponse({
  "id" : 1,
  "created" : "2014-11-14",
  ...
});
```

JSONP is also supported and automatically enabled when using `MappingJackson2JsonView` with a request that has a query parameter named jsonp or callback. The JSONP query parameter name(s) could be customized through the `jsonpParameterNames` property.

## [](#xml-support)XML support

Since 2.0 release, Jackson provides first class support for some other data formats than JSON. Spring Framework and Spring Boot provide builtin support for Jackson based XML serialization/deserialization.

As soon as you include the [`jackson-dataformat-xml`](https://github.com/FasterXML/jackson-dataformat-xml) dependency to your project, it is automatically used instead of JAXB2.

Using Jackson XML extension has several advantages over JAXB2:

-   Both Jackson and JAXB annotations are recognized
-   JSON View are supported, allowing you to build easily REST Webservices with the same filtered output for both XML and JSON data formats
-   No need to annotate your class with `@XmlRootElement`, each class serializable in JSON will serializable in XML

You usually also want to make sure that the XML library in use is Woodstox since:

-   It is faster than Stax implementation provided with the JDK
-   It avoids some known issues like adding unnecessary namespace prefixes
-   Some features like pretty print don't work without it

In order to use it, simply add the latest [`woodstox-core-asl`](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.codehaus.woodstox%22%20AND%20a%3A%22woodstox-core-asl%22) dependency available to your project.

## [](#customizing-the-jackson-objectmapper)Customizing the Jackson ObjectMapper

Prior to Spring Framework 4.1.1, Jackson `HttpMessageConverter`s were using `ObjectMapper` default configuration. In order to provide a better and easily customizable default configuration, a new [`Jackson2ObjectMapperBuilder`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/http/converter/json/Jackson2ObjectMapperBuilder.html) has been introduced. It is the JavaConfig equivalent of the well known [`Jackson2ObjectMapperFactoryBean`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/http/converter/json/Jackson2ObjectMapperFactoryBean.html) used in XML configuration.

[`Jackson2ObjectMapperBuilder`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/http/converter/json/Jackson2ObjectMapperBuilder.html) provides a nice API to customize various Jackson settings while retaining Spring Framework provided default ones. It also allows to create `ObjectMapper` and `XmlMapper` instances based on the same configuration.

Both `Jackson2ObjectMapperBuilder` and `Jackson2ObjectMapperFactoryBean` define a better Jackson default configuration. For example, the [`DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES`](http://fasterxml.github.io/jackson-databind/javadoc/2.0.0/com/fasterxml/jackson/databind/DeserializationFeature.html#FAIL_ON_UNKNOWN_PROPERTIES) property set to false, in order to allow deserialization of JSON objects with unmapped properties.

These classes also allow you to register easily Jackson [mixins](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/http/converter/json/Jackson2ObjectMapperBuilder.html#mixIn-java.lang.Class-java.lang.Class-), [modules](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/http/converter/json/Jackson2ObjectMapperBuilder.html#modules-java.util.List-), [serializers](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/http/converter/json/Jackson2ObjectMapperBuilder.html#serializers-com.fasterxml.jackson.databind.JsonSerializer...-) or even property naming strategy like `PropertyNamingStrategy.CAMEL_CASE_TO_LOWER_CASE_WITH_UNDERSCORES` if you want to have your `userName` java property translated to `user_name` in JSON.

### [](#with-spring-boot)With Spring Boot

As described in the Spring Boot reference documentation, there are various ways to [customize the Jackson `ObjectMapper`](http://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#howto-customize-the-jackson-objectmapper).

You can for example enable/disable Jackson features easily by adding properties like `spring.jackson.serialization.indent_output=true` to [`application.properties`](http://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#boot-features-external-config-application-property-files).

As an alternative, Spring Boot also allows to customize the Jackson configuration (JSON and XML) used by Spring MVC `HttpMessageConverter`s by declaring a `Jackson2ObjectMapperBuilder` `@Bean`:

```java
Copy@Bean
public Jackson2ObjectMapperBuilder jacksonBuilder() {
	Jackson2ObjectMapperBuilder b = new Jackson2ObjectMapperBuilder();
	b.indentOutput(true).dateFormat(new SimpleDateFormat("yyyy-MM-dd"));
	return b;
}
```

This is useful if you want to use advanced Jackson configuration not exposed through regular configuration keys.

If you just need to register an additional Jackson module, be aware that Spring Boot autodetects all `Module` `@Bean`. For example to register [jackson-module-parameter-names](https://github.com/FasterXML/jackson-module-parameter-names):

```java
Copy@Bean
public Module parameterNamesModule() {
  return new ParameterNamesModule(JsonCreator.Mode.PROPERTIES);
}
```

### [](#without-spring-boot)Without Spring Boot

In a plain Spring Framework application, you can also use `Jackson2ObjectMapperBuilder` to customize the XML and JSON `HttpMessageConverter`s as shown bellow:

```java
Copy@Configuration
@EnableWebMvc
public class WebConfiguration extends WebMvcConfigurerAdapter {

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
		builder.indentOutput(true).dateFormat(new SimpleDateFormat("yyyy-MM-dd"));
		converters.add(new MappingJackson2HttpMessageConverter(builder.build()));
		converters.add(new MappingJackson2XmlHttpMessageConverter(builder.createXmlMapper(true).build()));
	}
}
```

### [](#jackson-modules)Jackson modules

Some well known Jackson modules are automatically registered if they are detected on the classpath:

-   [jackson-datatype-jdk7](https://github.com/FasterXML/jackson-datatype-jdk7): Java 7 types like `java.nio.file.Path` (as of 4.2.1 release)
-   [jackson-datatype-joda](https://github.com/FasterXML/jackson-datatype-joda): Joda-Time types
-   [jackson-datatype-jsr310](https://github.com/FasterXML/jackson-datatype-jsr310): Java 8 Date & Time API data types
-   [jackson-datatype-jdk8](https://github.com/FasterXML/jackson-datatype-jdk8): other Java 8 types like `Optional` (as of 4.2.0 release)

Some other modules are not registered by default (mainly because they require additional configuration) so you will have to register them explicitly, for example with [`Jackson2ObjectMapperBuilder#modulesToInstall()`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/http/converter/json/Jackson2ObjectMapperBuilder.html#modulesToInstall-com.fasterxml.jackson.databind.Module...-) or by declaring a Jackson `Module` `@Bean` if you are using Spring Boot:

-   [jackson-module-parameter-names](https://github.com/FasterXML/jackson-module-parameter-names): adds support for accessing parameter names (feature added in Java 8)
-   [jackson-datatype-money](https://github.com/zalando/jackson-datatype-money): `javax.money` types (unofficial module)
-   [jackson-datatype-hibernate](https://github.com/FasterXML/jackson-datatype-hibernate): Hibernate specific types and properties (including lazy-loading aspects)

## [](#advanced-features)Advanced features

As of Spring Framework 4.1.3, thanks to the addition of a Spring context aware [`HandlerInstantiator`](http://wiki.fasterxml.com/HandlerInstantiator) (see [SPR-10768](https://jira.spring.io/browse/SPR-10768) for more details), you are able to autowire Jackson handlers (serializers, deserializers, type and type id resolvers).

This could allow you to build, for example, a custom deserializer that will replace a field containing only a reference in the JSON payload by the full `Entity` retrieved from the database.