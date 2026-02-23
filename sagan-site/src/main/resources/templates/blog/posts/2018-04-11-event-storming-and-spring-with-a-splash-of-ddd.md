---
title: Event Storming and Spring with a Splash of DDD
source: https://spring.io/blog/2018/04/11/event-storming-and-spring-with-a-splash-of-ddd
scraped: 2026-02-23T15:28:28.374Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jakub Pilimon |  April 11, 2018 | 16 Comments
---

# Event Storming and Spring with a Splash of DDD

_Engineering | Jakub Pilimon |  April 11, 2018 | 16 Comments_

It is my pleasure to announce that I have just joined the developer advocacy team at Pivotal, focusing on Spring. I feel privileged to have the opportunity to learn and collaborate with great and passionate engineers from all over the world. Hence, I must say I am really excited for the upcoming journey.

*If you would like to follow me, I tweet under* [*@JakubPilimon*](https://twitter.com/JakubPilimon) *and blog* [*here*](http://pillopl.github.io).

Before joining Pivotal, I have had the pleasure of consulting with and learning from software development teams across a variety of domains. Whether the domain is e-commerce, pharma, fintech, or insurance—common to all domains in software are *the expectations of users*. In this post I'm going to introduce some of my principles for building Spring applications with DDD.

*Principles for delivering software faster while increasing reliability*:

-   **UNDERSTAND** - Help teams understand and fix the gap between complex business problems (the so-called "domain") and the model in code representing it. The most common problem I run into is that the domain models that find their way to production are often far and away from what the domain experts had in mind.
-   **DIVIDE** - Decompose software functionally into modules. By module, I mean any independent piece of our enterprise that could be one or many deployment units. It is crucial that each module be shipped as independent products so that we can apply different architectural styles.
-   **IMPLEMENT** - Refactor towards microservices by shifting the mindset from monoliths to distributed systems—or *discouraging* going down that path when it is not necessary!
-   **DEPLOY** - Improve the process of delivery by enlarging the awareness of habits like *Test Driven Development*, *Continuous Integration* and *Continuous Delivery*
-   **BUILD VALUE** - Use Spring Boot and Spring Cloud to shorten the time needed to deliver business value. Allow developers to spend as much time as needed on understanding the business domain itself.

**Domain Modeling**

When it comes to understanding the business that you're building software for, there is no programming framework that can magically help us understand and model a complex domain. I don't expect such a tool to ever materialize, since it is generally impossible to predict how such a domain will evolve and change in the future. There are, however, some common abstract business domains that most should be familiar with—like *sales*, *inventory,* or a *product catalogue*. When it comes to domain modeling from scratch, there's no need to reinvent the wheel. Here is a great resource I recommend for complex domain modeling: [Enterprise Patterns and MDA: Building Better Software with Archetype Patterns and UML](https://www.amazon.com/Enterprise-Patterns-MDA-Building-Archetype/dp/032111230X).

**Understand, Divide, and Continuously Conquer**

When rapidly delivering software, we must not sacrifice how code will be understood by others later. Thankfully, we have a set of principles and practices to help us—in the form of *Domain-Driven Design*. Personally, I like to think about DDD as a process of iterative learning of the unknown. The side-effect of applying DDD is that we are able to make our code more understandable, extendable, and coherent for both developers and the business. With DDD, it becomes possible to make our source code the single source of truth for how a domain should function. Software functionality is meant to be changed. But when a developer is unable to articulate source code to the business in the terms that they understand, that functionality becomes ornamental and difficult to change or replace.

Even the most complex domains can be divided into…

-   Smaller but still quite complex subdomains (so-called core domains) - this is probably the largest competitive advantage of our enterprise hence, we invest much effort there.
-   Simple and understandable subdomains that might not be unique to our enterprise (so-called generic subdomains) - we need them for our enterprise to operate but it does not give our customers competitive advantage. Think about *inventory* or *invoicing.* Our users will not come back attracted by even the prettiest invoices.

Identifying those smaller products gives us a first draft of how to organize our code into modules. Each subdomain equals separate module. Understanding distinction between core and generic domains helps us see that they probably need different architectural style.

Fortunately, there are a lot of [ingredients we can pick and choose](http://start.spring.io) from!

**The example**

From this place I am happy to announce that together with my friend [Michał Michaluk](https://twitter.com/michal_michaluk), we've created an initiative called #dddbyexamples. The purpose of the initiative is to bridge the many different parts of the Spring ecosystem with the interests of DDD enthusiasts. You can check our samples [here](https://github.com/ddd-by-examples). So far, there are two samples. One sample focuses on Event Sourcing and Command Query Responsibility Segregation, while the other focuses on an end-to-end DDD example. Both are implemented with Spring Boot.

Let's dive into the end-to-end example. We are going to implement a simplified credit card management system. We will segment the work to Understand, Divide, Implement and Deploy. The requirements are not clear yet and so far we know that the system should be able to:

-   Assign initial limit to a card
-   Withdraw money
-   Create a statement with amount of money to be repaid (at the end of a billing cycle)
-   Repay money
-   Order or change personalized plastic card

**Understand**

To understand what is **really** going on in our business problem we can take advantage of a lightweight technique called [Event Storming](https://en.wikipedia.org/wiki/Event_storming). All we need is unlimited space on a wide wall, sticky notes and both business and technical people gathered in one room. The first step is to write down **what can happen** in our domain on orange notes. These are the **domain events.** Note the past tense and no particular order.

![events](https://github.com/pilloPl/eventstorming-with-spring/blob/master/just-events.png?raw=true)

Then we must identify the cause of each event. Domain experts know the cause and most probably it can be categorized to:

-   A direct **command** to a system - blue note next to the event
-   Another event - in that case we put those events next to each other
-   Some period of time that has passed - small note saying *time*

![events-and-commands](https://github.com/pilloPl/eventstorming-with-spring/blob/master/events-and-causes.png?raw=true)

There is also a green note: *plastic card personalization view*. It is a direct message to the system that causes *plastic card personalization displayed* event. But it is a **query** , not a command. For views and read models we are going to use green notes.

Next step is crucial. We need to know if the cause alone is sufficient for the domain event to occur. Maybe there is another condition that have to be met. Maybe more than one. Those conditions are called **invariants.** If so, we write them down on yellow notes and place in between events and causes.

![invariants](https://github.com/pilloPl/eventstorming-with-spring/blob/master/invariants.png?raw=true)

If we applied chronology to our events we would get a very good overview of what our domain is about. Moreover, we will learn about basic business processes. The technique is lightweight, quick, fun and more descriptive comparing to tones of text documents or UI mockups. But it did not deliver a single line of code yet, did it?

**Divide**

To find boundaries between business modules we can apply the rule of cohesion: things that change together and are used together should be kept together. For instance, in one module. How can we talk about cohesion having just a set of colorful notes? Let's see.

In order to check invariants (yellow notes) system must ask some questions. For instance, in order to withdraw there must be already an assigned limit. System must run a query: *"Hi, does it have assigned limit?"*. On the other hand, there are commands and events that might **change** answer to that question. For instance, the first command to assign limit changes that answer from *no* to *yes* forever. This a clear indicator of **highly cohesive** behaviors that might go together into one module or class.

Let's apply this heuristic in all places. On green notes we will write down the name of a query/view that the system needs to check during processing each invariant. Also, let's highlight when the answer to that query/view might change as a consequence of an event. That way the green notes can be spotted either next to an invariant or next to an event.

![invariants-view-events-view-changes](https://i.imgur.com/G9XVk63.png)

Let's search for the following pattern:

-   Command `CmdA` is fired and it causes `EventA`
-   `EventA` affects view `SomeView`.
-   `SomeView` is also needed while processing an invariant that protects `CmdB`
-   That means that `CmdA` and `CmdB` might be good candidates to land in the same module!
-   Let's put those commands (together with invariants and events) next to each other.

Doing so might segment our domain into very cohesive spots. Below we can find a proposed modularization. Remember that this is just a heuristic, you might end up with different setup. Proposed technique gives us a good chance to identify modules which are loosely coupled. This method is just a heuristic (not a strong rule) that can help us at finding independent modules. Also, if you think about it, proposed modules have linguistic boundaries. Credit card means something different for accounting and marketing, even though it's the same word. In DDD terminology those are called *Bounded Contexts*. Those will be our deployment units. Also, this generalization must take into account if the effect should be immediate or eventual. If it can be eventually consistent, this heuristic is not that strong, even though there is a relationship.

![modules](https://i.imgur.com/YJBU0WO.png)

The last step in DIVIDE part is to identify how modules communicate with each other. This is so-called context mapping. Here is a list of some integration strategies:

-   A module sends a query to another module - Statement module needs to ask Card Operations if there are any withdrawals. Because if not, it does not issue any statement.
-   A module listens to events sent by another module - The direct consequence of *Money Repaid* event is *Statement Closed* event. That means that Statements shall subscribe to events thrown by Card Operations. That was missed at the beginning of Event Storming session. Context Mapping is actually a moment when we discover a lot of new information
-   A module fires a command to another module - no such example in our system.

![contextmap](https://i.imgur.com/vBhouxJ.png)

**Implement**

Having functionally decomposed software tremendously helps during its maintenance. Modular monolith is a good start, but the fact that it is a single deployment unit might cause problems. All of the modules must be deployed together. In some enterprises going with microservices may be a better option. Please refer to [this article](https://content.pivotal.io/blog/should-that-be-a-microservice-keep-these-six-factors-in-mind?utm_campaign=content-social&utm_medium=social-sprout&utm_source=twitter&utm_content=1516394228) by [Nate Shutta](https://twitter.com/ntschutta) in order to learn more about when this decision is right.

Let's assume that our example fits microservice architecture. Each module can be a separate Spring Boot application. We know the boundaries of the modules. Different architectural styles can be applied in each of them. The places which contain the most business logic should be implemented with careful attention. On the other hand, there are some modules which are clear and simple. How to find both?

-   Look for spots with a lot of yellow notes (invariants). This is where we have much logic in between a command and eventual event. System needs to process complex commands here. This is where we expect sudden changes and where we probably build competitive advantage. We want to apply special care here, thus for example apply the Domain-Driven Design techniques or hexagonal architecture.
-   Look for spots that contain a few or zero yellow notes. Those are clear and easy to implement. There is almost nothing in between a command and an event, the system does not need to do anything complex here. The only job here is to interact with the database so we should be careful and try to avoid accidental complexity there.

That knowledge is a very important architectural driver that can make us decide to decouple *commands exposure* (e.g. REST resources) from *commands processing* (domain model with invariants). This architectural driver applied to Card Operations leads us to the following technology stack:

![cardoperations](https://i.imgur.com/LBOtKc5.png)

Take a look at the commands and related invariants (blue and yellow notes). On the wall we have a complete suite of test scenarios! The only thing left is to write them down:

```java
Copyclass CreditCardTest {

    @Test
    public void cannot_withdraw_when_limit_not_assigned() {

    }

    @Test
    public void cannot_withdraw_when_not_enough_money() {

    }

    @Test
    public void cannot_withdraw_when_there_was_withdrawal_within_lastH() {

    }

    @Test
    public void can_withdraw() {

    }

    @Test
    public void cannot_assign_limit_when_it_was_already_assigned() {

    }

    @Test
    public void can_assign_limit() {

    }

    @Test
    public void can_repay() {

    }

}
```

And following TDD principles we can design our code to meet these scenarios. Next is an initial design that we can construct from the blue and yellow sticky notes.

```java
Copy@Entity
class CreditCard {

    //..fields will pop-up during TDD!

    void assignLimit(BigDecimal money) {
        if(limitAlreadyAssigned()) {
            // throw
        }
        //...
    }

    void withdraw(BigDecimal money) {
        if(limitNotAssigned()) {
            // throw
        }
        if(notEnoughMoney()) {
            // throw
        }
        if(withdrawalWithinLastHour()) {
            // throw
        }

        //...
    }

    void repay(BigDecimal money) {

    }

}
```

Because we used the sticky notes, we did our thinking in the design phase. We just copied what was on the sticky notes and pasted it to the code. The same language is present on the notes and in the code, which is part of what makes event storming powerful. As a developer, this process allows us to focus on what we do best, which is writing robust code. The language and the models are just a part of the process of working together with a business's domain experts.

Now let's implement the integration layer. To implement the answer to the view *list of withdrawals* requested by `Statements` module we will create REST withdrawals resource. Also, this will be a natural candidate for exposing the `withdraw` command. As always, let's start with a test:

```java
Copy@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
class WithdrawalControllerTest {

	private static final String ANY_CARD_NO = "no";

	@Autowired
	TestRestTemplate testRestTemplate;

	@Test
	public void should_show_correct_number_of_withdrawals() {
	    // when
	    testRestTemplate.postForEntity("/withdrawals/" + ANY_CARD_NO, 
                                        new WithdrawRequest(TEN), 
                                        WithdrawRequest.class);

	    // then
            ResponseEntity res = testRestTemplate.getForEntity(
                                         "/withdrawals/" + ANY_CARD_NO, 
                                         WithdrawRequest.class);
            assertThat(res.getStatusCode().is2xxSuccessful()).isTrue();
            assertThat(res.getBody()).hasSize(1);
	}

}
```

And the implementation:

```java
Copy@RestController("/withdrawals")
class WithdrawalController {

    @GetMapping("/{cardNo}")
    ResponseEntity withdrawalsForCard(@PathVariable String cardNo) {
        //.. stack for query
        // - direct call to DB to Withdrawals
    }

    @PostMapping("/{cardNo}")
    ResponseEntity withdraw(@PathVariable String cardNo, @RequestBody WithdrawRequest r) {
        //.. stack for commands
        // - call to CreditCard.withdraw(r.amount)
        // - insert new Withdrawal to DB
    }

}
```

According to the context map the `Repay` command emits `MoneyRepaid` event. A message broker will be a natural candidate for asynchronously transporting the domain events. To implement messaging, we'll save ourselves some time by using [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream/). Let's create an end-to-end test:

```java
Copy@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
class RepaymentsTest {

	private static final String ANY_CARD_NO = "no";

	@Autowired
        TestRestTemplate testRestTemplate;

	@Autowired
	MessageCollector messageCollector;

	@Autowired
	Source source;

	BlockingQueue<Message<?>> outputEvents;

	@BeforeClass
	public void setup() {
		outputEvents = messageCollector.forChannel(source.output());
	}

	@Test
	public void should_show_correct_number_of_withdrawals_after_1st_withdrawal() {
	    // given
	    testRestTemplate.postForEntity("/withdrawals/" + ANY_CARD_NR, 
                                new WithdrawRequest(TEN), 
                                WithdrawRequest.class);

	    // when
	    testRestTemplate.postForEntity("/repayments/" + ANY_CARD_NR, 
                                new RepaymentRequest(TEN), 
                                RepaymentRequest.class);

	    // then
	    assertThat(
                   outputEvents.poll()
                        .getPayload() instanceof MoneyRepaid)
                             .isTrue();
	}

}
```

And the implementation:

```
Copy@RestController("/repayments")
class RepaymentController {

    private final Source source;

    RepaymentController(Source source) {
        this.source = source;
    }

    @PostMapping("/{cardNr}")
    ResponseEntity repay(@PathVariable String cardNo, @RequestBody RepaymentRequest r) {
        //.. stack for commands
        // - call to CreditCard.repay(r)
        // - source.output().send(... new MoneyRepaid(...));
    }

}

class RepaymentRequest {

    final BigDecimal amount;

    RepaymentRequest(BigDecimal amount) {
        this.amount = amount;
    }
}
```

The `PlasticCards` module is very simple. There are no [invariants](http://www.informit.com/articles/article.aspx?p=2020371&seqNum=2) and the only responsibility is to talk with the database and/or the message broker. Let's not over-complicate the matter and first notice the fact that it has four primary functions: *create, update, read and delete*. [Spring Data REST](https://projects.spring.io/spring-data-rest/) is a fantastic project to easily create a basic CRUD repository without any heavy lifting or worrying too much about the plumbing.

![plasticcards](https://i.imgur.com/FUTqyMX.png)

Spring Data allows us to implement a repository from the above design in just a few lines of code. One can argue that a simple test to check if the contexts and entity mappings are fine, which seems like a good idea. For brevity, let's skip that and jump directly to the implementation:

```java
Copy@RepositoryRestResource(path = "plastic-cards",
        collectionResourceRel = "plastic-cards",
        itemResourceRel = "plastic-cards")
interface PlasticCardController extends CrudRepository<PlasticCard, Long> {

}

@Entity
class PlasticCard {

    //..
}
```

Although the `Statements` module contains one invariant, the module is also very close to a simple CRUD interface. Although, `Statements` has one invariant. In order to process the invariant, the module interacts with the `CardOperations` module. To test that behaviour in isolation (without the real instance of `CardOperations` in our Spring Boot application) we should take a look at [Spring Cloud Contract](https://cloud.spring.io/spring-cloud-contract/) and start to introduce it into our proposed stack. `Statements` are simple documents by their nature, and *Spring Data MongoDB*, provides that functionality out of the box with document collections. The `Statements` module exposes no endpoints for commands, but it subscribes to the `MoneyRepaid` command and leverages Spring Cloud Stream's messaging capabilities.

![statements](https://i.imgur.com/HhawAb9.png)

There is an interesting scenario: closing a statement as a consequence of received `MoneyRepaid` event. The test might trigger the fake event with Spring Cloud Stream test tools:

```
Copy@RunWith(SpringRunner.class)
@SpringBootTest
class MoneyRepaidListenerTest {

	private static final String ANY_CARD_NR = "nr";

	@Autowired Sink sink;
	@Autowired StatementRepository statementRepository;

	@Test
	public void should_close_the_statement_when_money_repaid_event_happens() {
	    // when
	    sink.input()
                .send(new GenericMessage<>(new MoneyRepaid(ANY_CARD_NR, TEN)));

	    // then
	    assertThat(statementRepository
                .findLastByCardNr(ANY_CARD_NR).isClosed()).isTrue();
	}

}
```

And the implementation:

```java
Copy@Component
class MoneyRepaidListener {

    @StreamListener("card-operations")
    public void handle(MoneyRepaid moneyRepaid) {
        //..close statement
    }
}

class MoneyRepaid {

    final String cardNo;
    final BigDecimal amount;

    MoneyRepaid(String cardNo, BigDecimal amount) {
        this.cardNo = cardNo;
        this.amount = amount;
    }
}
```

On the other hand, the process of generating statements requires a query to `CardOperations` module in order to check for present withdrawals. As already mentioned, this should be tested in isolation. To do so a contract with the team responsible for `CardOperations` module can be proposed. Hence the stubbed version of that module can be fired for testing purposes. The [WireMock](http://wiremock.org/) stub generated from the contract might look as follows...

```json
Copy{
  "request" : {
    "url" : "/withdrawals/123",
    "method" : "GET"
  },
  "response" : {
    "status" : 200,
    "body" : "{\"withdrawals\":\"["first", "second", "third"]\"}"
  }
}

{
  "request" : {
    "url" : "/withdrawals/456",
    "method" : "GET"
  },
  "response" : {
    "status" : 204,
    "body" : "{}"
  }
}
```

And here are tests that, *thanks to the contract*, will work without any real instance of `CardOperations`:

```java
Copy@RunWith(SpringRunner.class)
class StatementGeneratorTest {

	private static final String USED_CARD = "123";
	private static final String NOT_USED_CARD = "456";

	@Autowired StatementGenerator statementGenerator;
	@Autowired StatementRepository statementRepository;

	@Test
	public void should_create_statement_only_if_there_are_withdrawals() {
	    // when
	    statementGenerator.generateStatements();

	    // then
	    assertThat(statementRepository
                             .findOpenByCardNr(USED_CARD)).hasSize(1);
	    assertThat(statementRepository
                             .findOpenByCardNr(NOT_USED_CARD)).hasSize(0);

	}

}
```

The last thing is the implementation:

```java
Copy@Component
class StatementGenerator {

    @Scheduled
    public void generateStatements() {
        allCardNumbers()
                .forEach(this::generateIfNeeded);
    }

    private void generateIfNeeded(CardNr cardNo) {
        //query to card-operations
        //if 200 OK - generate and statement
    }

    private List<CardNr> allCardNumbers() {
         return callToCardRepository();
    }
}
```

Using [Spring Cloud Pipelines](https://cloud.spring.io/spring-cloud-pipelines/) we can easily introduce CI/CD and be done with the deploy part.

> If you are interested, don't miss [this talk by Cora Iberkleid and Marcin Grzejszczak](https://content.pivotal.io/springone-platform-2017/continuous-deployment-to-the-cloud-marcin-grzejszczak-cora-iberkleid) about Spring Cloud Pipelines.

**Conclusions**

Event Storming helps us quickly understand what our domain is all about. Following DDD principles, we can divide the enterprise into smaller cohesive and loosely coupled problems. Knowing the complexity of each module and how they need to communicate with each other, we can pick from a broad set of tools in the Spring ecosystem in order to implement and deploy very quickly.

**Special Thanks**

I want to thank [Kenny Bastani](https://twitter.com/kennybastani) for many useful remarks about early draft of this post. But first of all I would like to thank him for having so many great ideas when we were creating and rehearsing our [talk](https://content.pivotal.io/springone-platform-2017/state-or-events-which-shall-i-keep-jakub-pilimon-kenny-bastani-2) at SpringOne.

Also, I would like to thank [Marcin Grzejszczak](https://twitter.com/MGrzejszczak) for endless discussions about microservices and testing. I can say that you rarely see so much passion and enthusiasm in one person.