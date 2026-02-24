---
title: REST in Spring 3: @MVC
source: https://spring.io/blog/2009/03/08/rest-in-spring-3-mvc
scraped: 2026-02-24T09:10:28.189Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Arjen Poutsma |  March 08, 2009 | 0 Comments
---

# REST in Spring 3: @MVC

_Engineering | Arjen Poutsma |  March 08, 2009 | 0 Comments_

In the last couple of years, REST has emerged as a compelling alternative to SOAP/WSDL/WS-\*-based distributed architectures. So when we started to plan our work on the next major release of Spring - version 3.0, it was quite clear to us that we had to focus on making the development of 'RESTful' Web services and applications easier. Now, what is and isn't 'RESTful' could be the topic of a whole new post all together; in this post I'll take a more practical approach, and focus on the features that we added to the @Controller model of Spring MVC.

## A Bit of Background

*Ok, I lied: there is some background first. If you really want to learn about the new features, feel free to skip to the [next section](#features).*

For me, work on REST started about two years ago, shortly after reading the highly recommended book [RESTful Web Services](http://oreilly.com/catalog/9780596529260/index.html) from O'Reilly, by Leonard Richardson and Sam Ruby. Initially, I was thinking about adding REST support to [Spring Web Services](http://www.springsource.org/spring-ws), but after working a couple of weeks on a prototype, it became clear to me that this wasn't a very good fit. In particular, I found out that I had to copy most of the logic from the Spring-MVC DispatcherServlet over to Spring-WS. Clearly, this was not the way to go forward.

Around the same time we introduced the [annotation-based model of Spring MVC](http://blog.springsource.com/2007/11/14/annotated-web-mvc-controllers-in-spring-25/). This model was clearly an improvement to the former, inheritance-based model. Another interesting development at that time was the development of the [JAX-RS](http://jcp.org/en/jsr/detail?id=311) specification. My next attempt was to try and merge these two models: to try and combine the @MVC annotations with the JAX-RS annotations, and to be able to run JAX-RS applications within the DispatcherServlet. While I did get a working prototype out of this effort, the result was not satisfactory. There were a number of technical issues which I won't bore you with, but most importantly the approach felt 'clunky' and unnatural for a developer who was already used to Spring MVC 2.5.

Finally, we decided to add the RESTful functionality to features to Spring MVC itself. Obviously, that would mean that there would be some overlap with JAX-RS, but at least the programming model would be satisfactory for Spring MVC developers, both existing and new ones. Additionally, there are already three JAX-RS implementations offering Spring support ([Jersey](https://jersey.dev.java.net/), [RESTEasy](http://www.jboss.org/resteasy/), and [Restlet](http://www.restlet.org/)). Adding a fourth to this list did not seem a good use of our valuable time.

## RESTful features in Spring MVC 3.0

Now, enough of the background, let's look at the features!

### URI Templates

A URI template is a URI-like string, containing one or more variable names. When these variables are substituted for values, the template becomes a URI. For more information, see the [proposed RFC](http://bitworking.org/projects/URI-Templates/).

In Spring 3.0 M1, we introduced the use of URI templates through the @PathVariable annotation. For instance:

```java
Copy
@RequestMapping("/hotels/{hotelId}")
public String getHotel(@PathVariable String hotelId, Model model) {
    List<Hotel> hotels = hotelService.getHotels();
    model.addAttribute("hotels", hotels);
    return "hotels";
}
```

When a request comes in for /hotels/1, that 1 will be bound to the hotelId parameter. You can optionally specify the variable name the parameter is bound to, but when you compile your code with debugging enabled that is not necessary: we infer the path variable name from the parameter name.

You can also have more than one path variable, like so:

```java
Copy
@RequestMapping(value="/hotels/{hotel}/bookings/{booking}", method=RequestMethod.GET)
public String getBooking(@PathVariable("hotel") long hotelId, @PathVariable("booking") long bookingId, Model model) {
    Hotel hotel = hotelService.getHotel(hotelId);
    Booking booking = hotel.getBooking(bookingId);
    model.addAttribute("booking", booking);
    return "booking";
}
```

This would match requests like /hotels/1/bookings/2, for instance.

You can also combine the use of Ant-style paths and path variables, like so:

```java
Copy
@RequestMapping(value="/hotels/*/bookings/{booking}", method=RequestMethod.GET)
public String getBooking(@PathVariable("booking") long bookingId, Model model) {
    ...
}
```

and you can use data binding, too:

```java
Copy
@InitBinder
public void initBinder(WebDataBinder binder) {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
}

@RequestMapping("/hotels/{hotel}/dates/{date}")
public void date(@PathVariable("hotel") String hotel, @PathVariable Date date) {
    ...
}
```

The above would match /hotels/1/dates/2008-12-18, for instance.

### Content Negotiation

In version 2.5, Spring-MVC lets the @Controller decide which view to render for a given request, through its View, view name, and ViewResolver abstractions. In a RESTful scenario, it is common to let the client decide the acceptable representations, via the Accept HTTP header. The server responds with the delivered representation via the Content-Type header. This process is known as [content negotiation](http://en.wikipedia.org/wiki/Content_negotiation).

One issue with the Accept header is that is impossible to change it in a web browser, in HTML. For instance, in Firefox, it's fixed to `  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8  ` So what if you want to link to a PDF version of a particular resource? Looking at the file extension is a good workaround. For example, [http://example.com/hotels.pdf](http://example.com/hotels.pdf) retrieves the PDF view of the hotel list, as does [http://example.com/hotels](http://example.com/hotels) with an Accept header of application/pdf.

This is what the ContentNegotiatingViewResolver does: it wraps one or more other ViewResolvers, looks at the Accept header or file extension, and resolves a view corresponding to these. In an upcoming blog post, Alef Arendsen will show you how to use the ContentNegotiatingViewResolver.

### Views

We also added some new Views to Spring MVC, particularly:

-   the [AbstractAtomFeedView](http://static.springsource.org/spring/docs/3.0.0.M1/javadoc-api/org/springframework/web/servlet/view/feed/AbstractAtomFeedView.html) and [AbstractRssFeedView](http://static.springsource.org/spring/docs/3.0.0.M1/javadoc-api/org/springframework/web/servlet/view/feed/AbstractRssFeedView.html), which can be used to return an Atom and RSS feed,
-   the [MarshallingView](http://static.springframework.org/spring/docs/3.0.0.M2/javadoc-api/org/springframework/web/servlet/view/xml/MarshallingView.html), which can be used to return an XML representation. This view is based on the Object/XML Mapping module, which has been copied from the Spring Web Services project. This module wraps XML marshalling technologies such as JAXB, Castor, JiBX, and more, and makes it easier to configure these within a Spring application context,
-   the JacksonJsonView, for JSON representations of objects in your model. This view is actually part of the Spring JavaScript project, which we'll talk about more in a future blog post.

Obviously, these work great in combination with the ContentNegotiatingViewResolver!

### HTTP Method Conversion

Another key principle of REST is the use of the Uniform Interface. Basically, this means that all resources (URLs) can be manipulated using the same four HTTP method: GET, PUT, POST, and DELETE. For each of methods, the HTTP specification defines exact semantics. For instance, a GET should always be a safe operation, meaning that is has no side effects, and a PUT or DELETE should be idempotent, meaning that you can repeat these operations over and over again, but the end result should be the same.

While HTTP defines these four methods, HTML only supports two: GET and POST. Fortunately, there are two possible workarounds: you can either use JavaScript to do your PUT or DELETE, or simply do a POST with the 'real' method as an additional parameter (modeled as a hidden input field in an HTML form). This latter trick is what the HiddenHttpMethodFilter does. This filter was introduced in Spring 3.0 M1, and is a plain Servlet Filter. As such, it can be used in combination with any web framework (not just Spring MVC). Simply add this filter to your web.xml, and a POST with a hidden \_method parameter will be converted into the corresponding HTTP method request.

As an extra bonus, we've also added support for method conversion in the Spring MVC form tags. For example, the following snippet taken from the updated Petclinic sample:

```html
Copy
<form:form method="delete">
    <p class="submit"><input type="submit" value="Delete Pet"/></p>
</form:form>
```

will actually perform an HTTP POST, with the 'real' DELETE method hidden behind a request parameter, to be picked up by the HiddenHttpMethodFilter. The corresponding @Controller method is therefore:

```java
Copy
@RequestMapping(method = RequestMethod.DELETE)
public String deletePet(@PathVariable int ownerId, @PathVariable int petId) {
    this.clinic.deletePet(petId);
    return "redirect:/owners/" + ownerId;
}
```

### ETag support

An [ETag](http://en.wikipedia.org/wiki/HTTP_ETag) (entity tag) is an HTTP response header returned by an HTTP/1.1 compliant web server used to determine change in content at a given URL. It can be considered to be the more sophisticated successor to the Last-Modified header. When a server returns a representation with an ETag header, client can use this header in subsequent GETs, in a If-None-Match header. If the content has not changed, the server will return 304: Not Modified.

In Spring 3.0 M1, we introduced the ShallowEtagHeaderFilter. This is a plain Servlet Filter, and thus can be used in combination any web framework. As the name indicates, the filter creates so-called *shallow* ETags (as opposed to a deep ETags, more about that later). The way it works is quite simple: the filter simply caches the content of the rendered JSP (or other content), generates a MD5 hash over that, and returns that as a ETag header in the response. The next time a client sends a request for the same resource, it use that hash as the If-None-Match value. The filter notices this, renders the view again, and compares the two hashes. If they are equal, a 304 is returned. It is important to note that this filter will not save processing power, as the view is still rendered. The only thing it saves is **bandwith**, as the rendered response is not sent back over the wire.

*Deep* ETags are a bit more complicated. In this case, the ETag is based on the underlying domain objects, RDMBS tables, etc. Using this approach, no content is generated unless the underlying data has changed. Unfortunately, implementing this approach in a generic way is much more difficult than shallow ETags. We might add support for deep ETags in a later version of Spring, by relying on JPA's @Version annotation, or an AspectJ aspect for instance.

## And more!

In a following post, I will conclude my RESTful journey, and talk about the RestTemplate, which was also introduced in Spring 3.0 M2. This class gives you client-side access to RESTful resources in a fashion similar to the JdbcTemplate, JmsTemplate, etc.