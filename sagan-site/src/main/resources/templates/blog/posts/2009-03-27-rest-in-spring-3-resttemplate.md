---
title: REST in Spring 3: RestTemplate
source: https://spring.io/blog/2009/03/27/rest-in-spring-3-resttemplate
scraped: 2026-02-24T09:09:41.890Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Arjen Poutsma |  March 27, 2009 | 6 Comments
---

# REST in Spring 3: RestTemplate

_Engineering | Arjen Poutsma |  March 27, 2009 | 6 Comments_

In an earlier [post](http://blog.springsource.com/2009/03/08/rest-in-spring-3-mvc/), I blogged about the REST capabilities we added to Spring @MVC version 3.0. Later, Alef [wrote](http://blog.springsource.com/2009/03/16/adding-an-atom-view-to-an-application-using-springs-rest-support/) about using the introduced functionality to add an Atom view to the Pet Clinic application. In this post, I would like to introduce the client-side capabilities we added in Milestone 2.

## RestTemplate

The [RestTemplate](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/web/client/RestTemplate.html) is the central Spring class for client-side HTTP access. Conceptually, it is very similar to the [JdbcTemplate](http://static.springframework.org/spring/docs/2.5.x/api/org/springframework/jdbc/core/JdbcTemplate.html), [JmsTemplate](http://static.springframework.org/spring/docs/2.5.x/api/org/springframework/jms/core/JmsTemplate.html), and the various other templates found in the Spring Framework and other portfolio projects. This means, for instance, that the RestTemplate is thread-safe once constructed, and that you can use callbacks to customize its operations.

### RestTemplate Methods

The main entry points of the template are named after the six main HTTP methods:

HTTP

RestTemplate

DELETE

[delete(String, String...)](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/web/client/RestTemplate.html#delete\(String, String...\))

GET

[getForObject(String, Class, String...)](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/web/client/RestTemplate.html#getForObject\(String, Class, String...\))

HEAD

[headForHeaders(String, String...)](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/web/client/RestTemplate.html#headForHeaders\(String, String...\))

OPTIONS

[optionsForAllow(String, String...)](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/web/client/RestTemplate.html#optionsForAllow\(String, String...\))

POST

[postForLocation(String, Object, String...)](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/web/client/RestTemplate.html#postForLocation\(String, Object, String...\))

PUT

[put(String, Object, String...)](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/web/client/RestTemplate.html#put\(String, Object, String...\))

The names of these methods clearly indicate which HTTP method they invoke, while the second part of the name indicates what is returned. For instance, getForObject() will perform a GET, convert the HTTP response into an object type of your choice, and returns that object. postForLocation will do a POST, converting the given object into a HTTP request, and returns the response HTTP Location header where the newly created object can be found. As you can see, these methods try to enforce REST best practices.

### URI Templates

Each of these methods takes a URI as first argument. That URI can be a [URI template](http://bitworking.org/projects/URI-Templates/), and variables can be used to expand the template to a normal URI. The template variables can be passed in two forms: as a String variable arguments array, or as a Map<String, String>. The string varargs variant expands the given template variables in order, so that

```java
Copy
String result = restTemplate.getForObject("http://example.com/hotels/{hotel}/bookings/{booking}", String.class, "42", "21");
```

will perform a GET on [http://example.com/hotels/42/bookings/21](http://example.com/hotels/42/bookings/21). The map variant expands the template based on variable name, and is therefore more useful when using many variables, or when a single variable is used multiple times. For example:

```java
Copy
Map<String, String> vars = new HashMap<String, String>();
vars.put("hotel", "42");
vars.put("booking", "21");
String result = restTemplate.getForObject("http://example.com/hotels/{hotel}/bookings/{booking}", String.class, vars);
```

will also perform a GET on [http://example.com/hotels/42/rooms/42](http://example.com/hotels/42/rooms/42).

### HttpMessageConverters

Objects passed to and returned from the methods getForObject(), postForLocation(), and put() and are converted to HTTP requests and from HTTP responses by [HttpMessageConverters](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/http/converter/HttpMessageConverter.html). Converters for the main mime types and Java types are registered by default, but you can also write your own converter and plug it in the RestTemplate. In the example below, I will show you how that's done.

## Using the RestTemplate to retrieve photos from Flickr

Rather than going through the various methods of the RestTemplate, I will show you how to use it for retrieving pictures from [Flickr](http://www.flickr.com/), Yahoo!s online photo-sharing application. This sample application searches Flickr for photos that match a given search term. It then shows these pictures using a simple Swing UI. To run the application yourself, you will need to create a Flickr account and [apply for an API key](http://www.flickr.com/services/api/keys/apply).

### Searching for photos

Flickr exposes various [APIs](http://www.flickr.com/services/api/) to manipulate its vast library of photos. The [flickr.photos.search](http://www.flickr.com/services/api/flickr.photos.search.html) method allows you to search for photos, by issuing a GET request on http://www.flickr.com/services/rest?method=flickr.photos.search&api+key=xxx&tags=penguins, where you enter your API key and the thing to search for (penguins in this case). As a result, you get back a XML document, describing the photos that conform to your query. Something like:

```xml
Copy
<photos page="2" pages="89" perpage="10" total="881">
	<photo id="2636" owner="47058503995@N01" 
		secret="a123456" server="2" title="test_04"
		ispublic="1" isfriend="0" isfamily="0" />
	<photo id="2635" owner="47058503995@N01"
		secret="b123456" server="2" title="test_03"
		ispublic="0" isfriend="1" isfamily="1" />
	<photo id="2633" owner="47058503995@N01"
		secret="c123456" server="2" title="test_01"
		ispublic="1" isfriend="0" isfamily="0" />
	<photo id="2610" owner="12037949754@N01"
		secret="d123456" server="2" title="00_tall"
		ispublic="1" isfriend="0" isfamily="0" />
</photos>
```

Using the RestTemplate, retrieving such a document is quite trivial:

```java
Copy
final String photoSearchUrl =
   "http://www.flickr.com/services/rest?method=flickr.photos.search&api+key={api-key}&tags={tag}&per_page=10";
Source photos = restTemplate.getForObject(photoSearchUrl, Source.class, apiKey, searchTerm);
```

where apiKey and searchTerm are two Strings given on the command line. This method uses the SourceHttpMessageConverter to convert the HTTP XML response into a javax.xml.transform.Source (Note that the SourceHttpMessageConverter was introduced shortly after we released Spring 3.0 M2, so you will have to get a recent snapshot (or the upcoming M3) to use it. The sample project available below is set up to retrieve these via Maven).

### Retrieving the photos

Next, we're going to use an XPath expression to retrieve all the photo elements of the document. For this, we are going to use the [XPathTemplate](http://static.springframework.org/spring-ws/sites/1.5/reference/html/common.html#xpath-template) from Spring Web Services. We are going to execute the //photo expressions, returning all photo elements occurring anywhere in the document. The [NodeMapper](http://static.springframework.org/spring-ws/sites/1.5/apidocs/org/springframework/xml/xpath/NodeMapper.html) is a callback interface, whose mapNode() method will be invoked for each photo element in the document. In this case, we are retrieving the server, id, and secret attributes of this element, and use those to fill up a Map. Finally, we use the RestTemplate again, to retrieve the photo as a java.awt.image.BufferedImage. Thus when the XPath evaluation is done, the resulting imageList will contain an image for each photo in the XML document.

```java
Copy
List<BufferedImage> imageList = xpathTemplate.evaluate("//photo", photos, new NodeMapper() {
    public Object mapNode(Node node, int i) throws DOMException {
        Element photo = (Element) node;

        Map<String, String> variables = new HashMap<String, String>(3);
        variables.put("server", photo.getAttribute("server"));
        variables.put("id", photo.getAttribute("id"));
        variables.put("secret", photo.getAttribute("secret"));

        String photoUrl = "http://static.flickr.com/{server}/{id}_{secret}_m.jpg";
        return restTemplate.getForObject(photoUrl, BufferedImage.class, variables);
    }
});
```

For instance, given the XML document given above, the imageList will contain 4 images. The URL for the first image retrieved will be [http://static.flickr.com/2/2636](http://static.flickr.com/2/2636)\_ a123456\_m.jpg, the second is [http://static.flickr.com/2/2635](http://static.flickr.com/2/2635)\_ b123456\_m.jpg, etc.

### Converting the images

There is one more thing that needs to be done in order for the code to work: we will need to write a HttpMessageConverter that is able to read from the HTTP response, and create a BufferedImagefrom that. Doing so with the Java Image I/O API is fairly simple, we just need to implement the read() method defined in the HttpMessageConverter interface. Overall, our simple converter looks like this:

```java
Copy
public class BufferedImageHttpMessageConverter implements HttpMessageConverter<BufferedImage> {

    public List<MediaType> getSupportedMediaTypes() {
        return Collections.singletonList(new MediaType("image", "jpeg"));
    }

    public boolean supports(Class<? extends BufferedImage> clazz) {
        return BufferedImage.class.equals(clazz);
    }

    public BufferedImage read(Class<BufferedImage> clazz, HttpInputMessage inputMessage) throws IOException {
        return ImageIO.read(inputMessage.getBody());
    }

    public void write(BufferedImage image, HttpOutputMessage message) throws IOException {
        throw new UnsupportedOperationException("Not implemented");
    }

}
```

Note that we didn't implement write() because we are not uploading images, just downloading them. Now we just have to plug this converter into the RestTemplate. We do that in the Spring application context:

```xml
Copy
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="flickrClient" class="com.springsource.samples.resttemplate.FlickrClient">
        <constructor-arg ref="restTemplate"/>
        <constructor-arg ref="xpathTemplate"/>
    </bean>

    <bean id="restTemplate" class="org.springframework.web.client.RestTemplate">
        <property name="messageConverters">
            <list>
                <bean class="org.springframework.http.converter.xml.SourceHttpMessageConverter"/>
                <bean class="com.springsource.samples.resttemplate.BufferedImageHttpMessageConverter"/>
            </list>
        </property>
    </bean>

    <bean id="xpathTemplate" class="org.springframework.xml.xpath.Jaxp13XPathTemplate"/>

</beans>
```

### Showing the photos

The final stage is to show the photos in a simple GUI. For this, we use Swing:

```java
Copy
JFrame frame = new JFrame(searchTerm + " photos");
frame.setLayout(new GridLayout(2, imageList.size() / 2));
for (BufferedImage image : imageList) {
    frame.add(new JLabel(new ImageIcon(image)));
}
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
frame.pack();
frame.setVisible(true);
```

which gives us the following:

![Penguins](http://blog.springsource.com/wp-content/uploads/2009/03/penguins.png "Penguins")

Overall, I hope this post showed you how simple it can be to use the RestTemplate to interact with HTTP servers. In just under 30 lines of Java code, we created a GUI that shows pictures of everybody's favorite bird: the penguin! Check out the [RestTemplate](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/web/client/RestTemplate.html) and let us know what you think!

### Downloads

A Maven project containing the code above can be downloaded [here](http://blog.springsource.com/wp-content/uploads/2009/03/spring3-resttemplate.zip). Note that the project is based on a nightly snapshot build of Spring. The upcoming Milestone 3 of Spring will contain the necessary classes as well.