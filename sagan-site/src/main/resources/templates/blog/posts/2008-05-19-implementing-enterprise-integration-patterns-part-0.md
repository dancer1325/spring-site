---
title: Implementing Enterprise Integration Patterns part 0
source: https://spring.io/blog/2008/05/19/implementing-enterprise-integration-patterns-part-0
scraped: 2026-02-24T09:17:16.336Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Iwein Fuld |  May 19, 2008 | 0 Comments
---

# Implementing Enterprise Integration Patterns part 0

_Engineering | Iwein Fuld |  May 19, 2008 | 0 Comments_

After my talk on Spring Integration I've been getting quite some questions on clarification and samples. To meet the demand I will start a small series on implementing different integration patterns using Spring Integration. This first article will focus on the basics. It will show you how to get up and running and walk through one of the samples.

If you never heard about Spring Integration before it might be a good idea to familiarize yourself with it reading the [introductory blog Mark Fisher wrote about it](http://blog.springsource.com/main/2007/12/14/spring-integration-a-new-addition-to-the-spring-portfolio/) or by browsing the project website. In general

Let me start with a disclaimer: the patterns you're about to see here are merely meant as an illustration to the features that Spring Integration has to offer; syntax may vary through different versions and extra precautions might be needed on your system.

The first step to getting involved in Spring Integration is to download the project and look at the sample. So let's start with that:

1.  Check out the sources from svn: svn co https://src.springframework.org/svn/spring-integration/trunk If you're uncomfortable working with a constantly changing code base you could also go for one of the milestones under https://src.springframework.org/svn/spring-integration/tags/, but at the time of this blog M4 isn't out yet and I still want to show you the latest features of course. Don't forget to check if M4 isn't out already when you read this. Last time I checked it was about to hatch.
2.  Run a build on the entire project:  
    $ cd build-spring-integration  
    $ ant
3.  Import the projects in Eclipse and configure an IVY\_CACHE variable to point to your ivy cache. This will probably be a directory next to build-spring-integration.
4.  Open up HelloWorldDemo and run as Java application. If you've done this [before](http://blog.springsource.com/main/2007/12/21/spring-integration-samples/) you'll see the changes in syntax.

If this works OK you're up and running. Next you can explore the different samples. I will describe only the cafe sample because that is the most interesting configuration.

In the cafe package of the sample project you will find all the code related to the implementation of the [famous Starbucks story](http://www.enterpriseintegrationpatterns.com/ramblings/18_starbucks.html). To introduce you to the architecture I will follow an order from start (Cafe) to finish (Barista):

First the order is created by CafeDemo. It contains two drinks, one hot, one cold. Then the order is wrapped in a message and put on the 'orders' channel. The endpoint listening to the 'orders' channel is a splitter (OrderSplitter) in the split method the order is split up into multiple Drinks which are in turn wrapped into separate messages by the framework.

After being split and put on the 'drinks' channel the drinks are being processed by the DrinksRouter. This router has the responsibility of putting hot drinks on the 'hotDrinks' channel and cold drinks on the 'coldDrinks' channel. Both these channels are handled by different endpoints that use the prepareHotDrink and preprareColdDrink method on the Barista respectively.

Let's follow the flow of messages through the relevant bits of code: In the cafeDemo.xml bean definition file you can see a Cafe being configured as a bean. `<beans:bean id="cafe" class="org.springframework.integration.samples.cafe.Cafe"> <beans:property name="orderChannel" ref="orders" /> </beans:bean>` This bean is used by the CafeDemo main method to put order messages on the order queue. `		Cafe cafe = (Cafe) context.getBean("cafe"); DrinkOrder order = new DrinkOrder(); Drink hotDoubleLatte = new Drink(DrinkType.LATTE, 2, false); Drink icedTripleMocha = new Drink(DrinkType.MOCHA, 3, true); order.addDrink(hotDoubleLatte); order.addDrink(icedTripleMocha); for (int i = 0; i < 100; i++) { cafe.placeOrder(order); }`

A <context:component-scan ...../> is being used in cafeDemo.xml to bootstrap the OrderSplitter and DrinkRouter.

The OrderSplitter is sprinkled with some annotations:

-   the @MessageEndpoint annotation tells Spring Integration to wrap a bean of this type in an endpoint when you turn on annotation-config. Additionally it is a subtype of @Component so that you don't need to write an xml bean definition for Spring to pick it up.
-   the @Splitter annotation tells spring to use the splitOrder method to split a message containing an Order as payload into multiple messages containing the drinks of that Order.

`@MessageEndpoint(input="orders", output="drinks") public class OrderSplitter {  ``` Copy@Splitter public List<Drink> split(Message<DrinkOrder> orderMessage) { 	return orderMessage.getPayload().getDrinks(); } ```  `

`}`

The DrinkRouter is similarly decorated with annotations that tell Spring Integration to use it as a router. The string returned from the @Router annotated method is interpreted by Spring Integration as the output channel. `@MessageEndpoint(input="drinks") public class DrinkRouter {`

`   ``` Copy@Router public String resolveDrinkChannel(Drink drink) { 	return (drink.isIced()) ? "coldDrinks" : "hotDrinks"; } ```   `

`}`

After the routing the messages are available on the hotDrinks or coldDrinks channel depending on their temperature.

The endpoints configured to call the appropriate method on the Barista are configured in xml: 

You can see that both the input channel and the method to feed the message to are defined so Spring Integration knows what to do.

Notice that you don't need to unwrap the message yourself: accepting the payload type as input parameter is fine as well. If you change the methods in the Barista to accept Message and extract the payload yourself, it will still work as expected. `	public void prepareColdDrink(Message drinkMessage) { Drink drink = drinkMessage.getPayload(); //no changes to the rest of the code }`

Play around with the sample and post on the forum if you have any troubles. You'll find that they are quite helpful already (mainly because Mark responds to almost every post). Next episode will feature an other implementation of an EIP.