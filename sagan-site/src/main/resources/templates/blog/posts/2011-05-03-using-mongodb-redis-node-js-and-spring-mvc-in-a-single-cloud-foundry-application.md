---
title: Using MongoDB, Redis, Node.js, and Spring MVC in a single Cloud Foundry Application
source: https://spring.io/blog/2011/05/03/using-mongodb-redis-node-js-and-spring-mvc-in-a-single-cloud-foundry-application
scraped: 2026-02-24T08:41:46.324Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jon Brisbin |  May 03, 2011 | 2 Comments
---

# Using MongoDB, Redis, Node.js, and Spring MVC in a single Cloud Foundry Application

_Engineering | Jon Brisbin |  May 03, 2011 | 2 Comments_

Traditionally, applications have been defined by the principle technology they use. If you're building a Spring MVC application, we call it a "Java app". Since our application is primarily composed of Java components, we tend to stay in our own yards and not be terribly friendly with our neighbors until we're forced to interact with them. We set up Java-based application servers and tend to think first of going to the Java language to solve a problem in our application whether that language is the best choice or not. It has usually just been too difficult to maintain multiple sets of runtime environments for our applications, so we stovepipe ourselves through sheer inertia.

[Cloud Foundry](http://cloudfoundry.com/) turns that dynamic on its head because it is no longer inconvenient to use the right tool for the job. We simply are not forced to stovepipe our applications into one species any more (a "Java app" or a "Node app"). If we need really high volume, non-blocking throughput with XHR long-polling support, we can use [Node.js](http://nodejs.org/ "Node.js Home") for that portion of our application. If we need the flexibility and depth of library support found in the Spring family of projects, we can easily take advantage of them by using Java for that portion of the application. If we need both a fast key-value store for a cache or event bus and a capable document store for persisting data, we can use both in the same application without worrying about the logistics involved in setting these services up separately and managing them ourselves (or dumping them onto [our already-harried Operations staff](http://www.youtube.com/watch?v=d0KIF7i5yIM)).

It also doesn't hurt our case any that deploying either species of application is as simple as issuing a "push" command from our favorite shell.

### Polyglot Programming ^ N

What's that [old saying](http://www.goodreads.com/quotes/show/37300)? "If it's worth doing, it's worth overdoing"? This example application is a poster child for that sentiment!

There are several components to [this application](http://ticker-analysis.cloudfoundry.com):

1.  A recurring event to generate random ticker data and emit it into an event bus.
2.  A Node.js application to power a web front-end that uses [Socket.IO](http://socket.io/ "Socket.IO Home") for long-polling Ajax goodness.
3.  A Spring MVC application to read individual data points from the event bus and summarize these into a document stored in MongoDB.

Numbers 1 and 2 are handled in the same application: namely the Node.js app that powers the web front-end. Number 3 is a standard Spring MVC application that uses [the NoSQL support of the Spring Data family of projects](http://www.springsource.org/spring-data "Spring Data Home") to connect to Redis and MongoDB in a single helper class.

### Node.js

We're using Node.js because: a) it's lightweight, fast, and non-blocking, and: b) it's the zippered hoodie of the web world (it's what all the cool kids are wearing these days).

In all seriousness, Node.js is an excellent choice in which to deploy a web front-end. We're using it to asynchronously send ticker events to the browser using Socket.IO, to the database using the Mongoose MongoDB library, and over our application's event bus (in this case, Redis) to be consumed by code running in another application.

There's a lot here, so we'll take each part in chunks.

### Configuration

Before we get too deep into the application, we need to discuss how to get configuration information from the Cloud Foundry environment. The hostname, port, user, and password you need to connect to your provisioned services is encoded into a JSON document stored in an environment variable named "VCAP\_SERVICES". There are various helper utilities springing up to aid the developer in using these configuration values (or defaults when running your app locally). The Node.js module we'll be using here will not necessarily reflect the official Node.js Cloud Foundry runtime module that is being worked on as we write this.

##### Connecting to MongoDB

To get the configuration information you need to connect to your MongoDB instance when running in Cloud Foundry, require the "cloudfoundry" module like so:

```javascript
Copy
var cf       = require("cloudfoundry");
var mongoConfig = cf.getServiceConfig("ticker-analysis")
		|| { username: "admin", password: "password", hostname: "localhost", port: 27017, db: "tickeranalysis" };
```

This either pulls our configuration information from the VCAP\_SERVICES environment variable or provides a set of defaults for use when running locally.

##### Set up mapping for Javascript entities

We're using the Mongoose MongoDB mapping library for connecting to our database. We save our individual ticker events as well as read those saved by the Spring MVC application. The nice thing about using a document store to persist our data is that it gives us full cross-language support. We can save an object using the Spring Data mapping infrastructure and later read that object into our Node.js application using Mongoose.

To configure the Mongoose library, we need to define our models:

```javascript
Copy
var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    DocumentObjectId = mongoose.Types.ObjectId;

var TickerEvent = new Schema({
	symbol: { type: String },
	 price: { type: Number },
	volume: { type: Number }
});
mongoose.model('TickerEvent', TickerEvent);
var TickerSummary = new Schema({
	      _id: { type: String },
	timestamp: { type: Number },
	      max: { type: Number },
	      min: { type: Number },
	  average: { type: Number },
	   volume: { type: Number }
});
mongoose.model('TickerSummary', TickerSummary);
```

The corresponding domain object on the Java side looks like this:

```java
Copy
@Document(collection = "tickersummary")
public class Summary {

	@Id
	private final String symbol;
	private final Long timestamp;
	private Float total = new Float(0);
	private Integer samples = 0;
	private Float min = Float.MAX_VALUE;
	private Float average = new Float(0);
	private Float max = Float.MIN_VALUE;
	private Integer volume = 0;

  // Constructors, getters, and setters...
}
```

##### Express.js

To power the web front-end, we'll be using the [express.js web framework](http://expressjs.com/ "Express.js Home") for Node.js. Of note in this block is our use of a special method on the Cloud Foundry Node.js module to tell us whether we're running in the cloud or not. If we are, then we don't want to dump our exceptions to the browser like we do when we're running in development.

```javascript
Copy
var express  = require("express");
var app      = express.createServer();
app.configure(function() {
  
  // Standard express setup
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(app.router);	
	app.use(express.static(__dirname + '/public'));
	
	// Use the Jade template engine
	app.set('view engine', 'jade');
	app.set('running in cloud', cf.isRunningInCloud());
	
  // Don't give away information about our environment in production
	if(!cf.isRunningInCloud()) {
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	}
	
});
```

##### Socket.IO

We're using Socket.IO for Ajax long-polling to pipe our server-side events to a listening browser. Since Cloud Foundry is only in beta, it doesn't yet support full-blown websockets (it's on the roadmap). To set this up, we're going to specify that Socket.IO use long polling since we already know the dynamic routing infrastructure won't be happy with us otherwise. We also have to reset this connection after 10 seconds to keep the timeout police from confiscating our connections. As the Cloud Foundry platform evolves, this will likely be a moot point. But for the time being, just keep these caveats in mind if using Ajax push with Cloud Foundry.

```javascript
Copy
var io = require("socket.io").listen(app, {
	transports: ['xhr-polling'], 
	transportOptions: {
		'xhr-polling': {duration: 10000} 
	} 
});
```

### The Event Emitter

To generate the actual data points, we could have chosen to subscribe to any of the publicly-available stock ticker feeds. Since it doesn't actually matter in this case how the data is constituted and we get a better chance to illustrate cross-runtime integration at a deeper level by doing so, we're going to randomly generate our ticker data.

To publish these events to another listening application, we need to use Redis' pub/sub functionality as an event bus. To do that in Node.js, we set up two separate Redis client instances. One will be used for listening for events to send to the browser and the other will be the outbound publisher client.

```javascript
Copy
// Get our Cloud Foundry config information or default to localhost
var redisConfig = cf.getServiceConfig("ticker-stream")
		|| { hostname: "localhost", port: 6379, password: false };

// Create Redis client instances
var redisClient = redis.createClient(redisConfig.port, redisConfig.hostname);
var redisPublisher = redis.createClient(redisConfig.port, redisConfig.hostname);
if(redisConfig.password) {
  // Cloud Foundry Redis instances are secured with a password
	redisClient.auth(redisConfig.password);
	redisPublisher.auth(redisConfig.password);
}

redisClient.subscribe("ticker-stream");
redisClient.on("message", function(channel, json) {
	var data = JSON.parse(json);
	
	// Save this event to the database
	var TickerEvent = db.model('TickerEvent', 'tickerdata');
	var te = new TickerEvent({
		symbol: data.symbol,
		price: data.price,
		volume: data.volume
	});
	te.save(function(err) {
		if(err) {
			throw(err);
		}
	});
	
	// Broadcast this event to the browser
	io.broadcast(json);
	
});
```

To send the data, we have a helper method that we call setTimeout on and pass a random wait time of 3-7 seconds.

```javascript
Copy
var tickerSender;
function sendTickerEvent() {
	var symbolInfo = {
		symbol: getRandomSymbol(), 
		price: getRandomPrice(),
		volume: getRandomVolume()
	};
	redisPublisher.publish("ticker-stream", JSON.stringify(symbolInfo));

	// Call ourselves again after 3-7 seconds
	tickerSender = setTimeout(sendTickerEvent, getRandomTimeout());
}
```

##### Express.js Routes

Our routes for the web application are pretty sparse. We need to render the home page with the Javascript magic in it to power the UI and provide a route for getting the summary document from MongoDB to display on the right-hand side of the page when the user clicks on a ticker symbol link.

```javascript
Copy
app.get("/", function(req, resp) {
	resp.render("home", {
		pageTitle: "Ticker Analysis Sample"
	});
});

app.get("/summary/:symbol", function(req, resp) {
	var TickerSummary = db.model("TickerSummary", "tickersummary");
	TickerSummary.findById(req.params.symbol, function(err, data) {
		if(err) {
			// Handle error
		}
		resp.send(JSON.stringify(data));
	});
});
```

To initialize our data generation, we need to make sure our random event emitter is running. But since we don't want our database to fill up when no one's looking at the page, we'll just start the event emitter the first time a user hits our application. After that, we'll just leave it running until the timeout "tickerSender" is cleared (you can add a route to do that, if you want).

```javascript
Copy
// Socket.IO-based Ticker Stream
io.on("connection", function(client) {
	if(!tickerSender) {
	  // Start the ticker stream if one hasn't been already
		sendTickerEvent();
	}
});
```

##### Getting the application port number

To tell Express.js what port our application should run on, we need to read the environment variable VCAP\_APP\_PORT. There's another method on our Cloud Foundry Node.js module to do that for us. So our call to listen() looks like this:

```javascript
Copy
app.listen(cf.getAppPort());
```

### Spring MVC

We *could* keep this in the family and handle the summary calculations in Node.js. But sometimes there's very good business reasons for using a Java/Spring component for a portion of your application. Our purpose here is to illustrate how this can be done so you can choose the right tool for the job.

##### Spring Configuration

You'll remember when we were dealing with the Node.js portion that we had to get configuration parameters from our environment when running in Cloud Foundry. Our Spring application has the same need. But since there's already a capable Cloud Foundry runtime library for Java, we'll use that to extract the bits we need to connect to our provisioned MongoDB instance.

The first thing we need to do is declare a couple additional namespaces. One for the Cloud Foundry runtime, and one for the MongoDB support.

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
			 xmlns:cloud="http://schema.cloudfoundry.org/spring"
			 xmlns:mongo="http://www.springframework.org/schema/data/mongo"
			 xmlns:p="http://www.springframework.org/schema/p"
			 xmlns:util="http://www.springframework.org/schema/util"
			 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			 xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.1.xsd
			 http://schema.cloudfoundry.org/spring http://schema.cloudfoundry.org/spring/cloudfoundry-spring-0.6.xsd
			 http://www.springframework.org/schema/data/mongo http://www.springframework.org/schema/data/mongo/spring-mongo-1.0.xsd
			 http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-2.0.xsd">
```

In particular, note that we're going to be using Spring 3.1, which is still in pre-release status. You don't have to use Spring 3.1 to use Cloud Foundry. But the <a href="[http://blog.springsource.com/2011/02/14/spring-3-1-m1-introducing-profile/](http://blog.springsource.com/2011/02/14/spring-3-1-m1-introducing-profile/)" "Blog post about profiles">profiles feature of Spring 3.1 will make our configuration easier.

To configure our MongoDB connection, we'll use the <mongo:mongo/> namespace configuration helper when running locally, and it's cousin, the <cloud:mongo/> namespace configuration helper when running in the cloud. In our "default" profile, we'll set up some properties to mimic those we'll have available when running in the cloud--we'll just set them to our local MongoDB server.

```xml
Copy
<!-- Use this when running locally -->
<beans profile="default">
	<util:properties id="serviceProperties">
		<prop key="ticker-analysis.db">tickeranalysis</prop>
		<prop key="ticker-analysis.username">admin</prop>
		<prop key="ticker-analysis.password">passwd</prop>
	</util:properties>
	<mongo:mongo id="mongo"/>
	<bean id="redisConnectionFactory"
				class="org.springframework.data.keyvalue.redis.connection.jedis.JedisConnectionFactory"/>
</beans>

<!-- Use this when running in the cloud -->
<beans profile="cloud">
	<cloud:service-properties id="serviceProperties"/>
	<cloud:mongo id="mongo"/>
	<cloud:redis-connection-factory id="redisConnectionFactory"/>
</beans>

<!-- MongoDB -->
<mongo:mapping-converter id="mappingConverter"/>
<bean id="mongoTemplate" class="org.springframework.data.document.mongodb.MongoTemplate"
			p:username="#{serviceProperties['ticker-analysis.username']}"
			p:password="#{serviceProperties['ticker-analysis.password']}">
	<constructor-arg ref="mongo"/>
	<constructor-arg name="databaseName" value="#{serviceProperties['ticker-analysis.db']}"/>
	<constructor-arg name="defaultCollectionName" value="tickerdata"/>
	<constructor-arg ref="mappingConverter"/>
</bean>
```

The properties for our provisioned services, as you will notice, follow the convention SERVICE\_NAME.PROPERTY\_NAME. In this example, I have a MongoDB service provisioned with the name "ticker-analysis":

```code
Copy> vmc services

============== System Services ==============
... [omitted for brevity]

=========== Provisioned Services ============

+-----------------+---------+
| Name            | Service |
+-----------------+---------+
| ticker-stream   | redis   |
| ticker-analysis | mongodb |
+-----------------+---------+
```

As you might be able to guess now, my Redis connection follows a similar pattern.

##### Selecting the profile to use

Astute readers will immediately wonder: "but how does it know which profile to use?" In our case, we'll be using an ApplicationContextInitializer that sets our profile based on whether or not the proper environment variables are available.

Here's all we need to set our profile at runtime so we can run with the "default" profile during development and the "cloud" profile when running in Cloud Foundry:

```java
Copy
public class CloudApplicationContextInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

	@Override
	public void initialize(ConfigurableApplicationContext applicationContext) {
		CloudEnvironment env = new CloudEnvironment();
		if (env.getInstanceInfo() != null) {
			// We're running in the cloud, set the profile accordingly
			applicationContext.getEnvironment().setActiveProfiles("cloud");
		}
		else {
			applicationContext.getEnvironment().setActiveProfiles("default");
		}
	}

}
```

To activate this ApplicationContextInitializer, we add it to our web.xml:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">

	<context-param>
		<param-name>contextInitializerClasses</param-name>
		<param-value>org.cloudfoundry.services.CloudApplicationContextInitializer</param-value>
	</context-param>
	
</web-app>
```

##### The Spring layer

Our Spring layer is pretty simple. We have a helper class that leverages the MessageListenerAdapter in [the Spring Data Redis support](http://www.springsource.org/spring-data/redis "Spring Data Redis Home"). Our bean will be invoked whenever Redis gets a message for that event. Inside that handler, we'll be using [the Spring Data MongoDB support](http://www.springsource.org/spring-data/mongodb "Spring Data MongoDB Home") to map a POJO onto that document so we can update the min, max, and average values.

```java
Copy
public void handleMessage(String json) throws IOException {

  // Use the Jackson ObjectMapper to turn a JSON document into a POJO
	TickerEvent event = mapper.readValue(new StringReader(json), TickerEvent.class);

  // Load the existing document or start a new one
	Summary summ = mongoTemplate.findOne(query(where("_id").is(event.getSymbol())), Summary.class);
	if (null == summ) {
		summ = new Summary(event.getSymbol(), System.currentTimeMillis());
	}
	// Recalculate min, max, and average
	summ.addTickerEvent(event);

  // Save the modified document back
	mongoTemplate.save(summ);
	
}
```

##### Provide REST endpoints if you want

We don't need to expose anything in our Spring layer to the web. It does its work offline, doesn't require input from the user, and doesn't provide the summary data directly to a web client.

That being said, we might want to put a simple Controller in that will let us know what's going on inside our Java helper class. We created just such a class in our sample application.

```java
Copy
@Controller
@RequestMapping("/summaries")
public class SummariesController {

	@Autowired
	private SummaryService summaryService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public @ResponseBody List<Summary> summaries() {
	  // Return all summaries
		return summaryService.getSummaries();
	}

	@RequestMapping(value = "/{symbol}", method = RequestMethod.GET)
	public @ResponseBody Summary summary(@PathVariable String symbol) {
	  // Return a specific summary document
		return summaryService.getSummary(symbol);
	}
}
```

This is not something you'd want to do in a production application. But for developing on Cloud Foundry and getting some insight into what sometimes feels like a black box, it might make sense to put in a few controller methods that expose your Spring layer's innards.

### Clear as mud?

I don't know about you, but I get a little bored with the simplistic nature of many examples and tutorials. Admittedly, there's nothing simplistic about this sample application! It might seem a little like drinking from a fire hose here, but the goal was to provide you with enough meat on the bones to keep you busy for a while as you investigate Cloud Foundry and get your cloud \[sea\] legs.

The example app is live on Cloud Foundry:

-   [http://ticker-analysis.cloudfoundry.com](http://ticker-analysis.cloudfoundry.com)

All the source code is in the Cloud Foundry samples repo on GitHub:

-   [https://github.com/SpringSource/cloudfoundry-samples/tree/master/ticker-analysis](https://github.com/SpringSource/cloudfoundry-samples/tree/master/ticker-analysis)

For help getting up-to-speed with Cloud Foundry, you can access the forums:

-   [http://support.cloudfoundry.com/forums/373015-knowledge-base](http://support.cloudfoundry.com/forums/373015-knowledge-base)

Comprehensive documentation is still in flux because, frankly, so is the Cloud Foundry platform. It's a bit of a moving target at the moment. The community is maintaining [some wiki pages on github](https://github.com/SpringSource/cloudfoundry-samples/wiki/Node), though, which should help some.

The [Node.js module referenced earlier](https://github.com/SpringSource/cloudfoundry-samples/tree/master/ticker-analysis/node-ticker-analysis/node_modules/cloudfoundry) (to provide easier access to the Cloud Foundry environment variables) is actually part of the sample application until a full-blown Cloud Foundry runtime is released for Node.js.

Happy hacking!