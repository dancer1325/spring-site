---
title: Building RabbitMQ apps using Python
source: https://spring.io/blog/2010/08/19/building-rabbitmq-apps-using-python
scraped: 2026-02-24T08:54:20.241Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  August 19, 2010 | 7 Comments
---

# Building RabbitMQ apps using Python

_Engineering | Greg L. Turnquist |  August 19, 2010 | 7 Comments_

[RabbitMQ](http://rabbitmq.com) is a powerful messaging broker based on the [Advanced Message Queueing Protocol (AMQP)](http://blog.springsource.com/2010/06/14/understanding-amqp-the-protocol-used-by-rabbitmq/). Thanks to the neutral nature of the AMQP spec, it is easy to connect to it from many platforms, including Python. In this blog entry, we will:

-   Create a simple stock ticker Python application
-   Create a brokerage Python application that decides when to buy and sell.
-   Compare [pika](http://github.com/tonyg/pika), an AMQP library created by the RabbitMQ team, with [py-amqplib](http://code.google.com/p/py-amqplib/).

You can find all the source code for this blog at [http://github.com/gregturn/amqp-demo](http://github.com/gregturn/amqp-demo). This assumes you have already installed RabbitMQ based on [instructions for your platform](http://www.rabbitmq.com/install.html) and fired it up. Personally, I have it running on my Mac OS X machine (snow leopard).

By the way:

> The code written in this blog entry is for demonstration purposes only. Do not rely on the algorithms for financial advice.

With that out of the way, let's write some code!

## Building the stock ticker

A good example for a messaging solution is a stock ticker system. The stock exchange publishes messages to the broker indicating stock name, price, and time.

```python
Copyimport pickle
import random
import time

class Ticker(object):
    def __init__(self, publisher, qname):
        self.publisher = publisher

        # This quickly creates four random stock symbols
        chars = range(ord("A"), ord("Z")+1)
        def random_letter(): return chr(random.choice(chars))
        self.stock_symbols = [random_letter()+random_letter()+random_letter() for i in range(4)]

        self.last_quote = {}
        self.counter = 0
        self.time_format = "%a, %d %b %Y %H:%M:%S +0000"
        self.qname = qname

    def get_quote(self):
        symbol = random.choice(self.stock_symbols)
        if symbol in self.last_quote:
            previous_quote = self.last_quote[symbol]
            new_quote = random.uniform(0.9*previous_quote, 1.1*previous_quote)
            if abs(new_quote) - 0 < 1.0:
                new_quote = 1.0
            self.last_quote[symbol] = new_quote
        else:
            new_quote = random.uniform(10.0, 250.0)
            self.last_quote[symbol] = new_quote
        self.counter += 1
        return (symbol, self.last_quote[symbol], time.gmtime(), self.counter)

    def monitor(self):
        while True:
            quote = self.get_quote()
            print("New quote is %s" % str(quote))
            self.publisher.publish(pickle.dumps((quote[0], quote[1], time.strftime(self.time_format, quote[2]), quote[3])), routing_key="")
            secs = random.uniform(0.1, 0.5)
            #print("Sleeping %s seconds..." % secs)
            time.sleep(secs)
```

This application randomly creates four stock symbols, and then starts to create quotes. It initially picks a random value between 10.0 and 250.0, then proceeds to randomly adjust the price between 90% and 110% of the previous price. It then randomly waits between 0.1 and 0.5 seconds before ticking off the next quote. An important part of this code design is the fact that publishing to an AMQP broker has been decoupled from the stock ticker. Instead, it expects a publisher service to be injected when constructed.

Its important to note that we are using pickle to serialize our tuple of stock quote data. In AMQP, the body of the message is just a series of bytes. What is stored and how it is serialized is not part of the spec, and instead must be agreed upon between sender and receiver. In our situation, the publisher and subscriber have both agreed upon it containing a pickled tuple.

## Creating an AMQP service

The next step is to create our AMQP client service. Its purpose is to make it easy for us to properly isolate talking to the AMQP server, either through publishing or by consuming events.

```python
Copyfrom amqplib import client_0_8 as amqp

class PyAmqpLibPublisher(object):
    def __init__(self, exchange_name):
        self.exchange_name = exchange_name
        self.queue_exists = False

    def publish(self, message, routing_key):
        conn = amqp.Connection(host="127.0.0.1", userid="guest", password="guest", virtual_host="/", insist=False)

        ch = conn.channel()

        ch.exchange_declare(exchange=self.exchange_name, type="fanout", durable=False, auto_delete=False)

        msg = amqp.Message(message)
        msg.properties["content_type"] = "text/plain"
        msg.properties["delivery_mode"] = 2
        ch.basic_publish(exchange=self.exchange_name,
                         routing_key=routing_key,
                         msg=msg)
        ch.close()
        conn.close()
```

An important thing to notice here is that the declared exchange is type "fanout". This means that every queue that binds to it will receive a copy of the message without expensive processing on the broker's end.

You may be wondering why the content\_type of the body is "text/plain", considering it's a serialized message. This is because Python's pickle library encodes data in an ASCII-armored format that is viewable with any tool without causing weird behavior.

## Buy low, sell high

Some simple, sage advice is to buy when the price is low and sell it when the price is high. Here we'll look at a simple client that subscribes for stock quotes, collects a historical trend of prices to figure out whether the next price is on the low end or high end, and then decides to buy or sell.

```python
Copyimport pickle
import random
import uuid

class Buyer(object):
    def __init__(self, client, qname, trend=5):
        self.holdings = {}
        self.cash = 100000.0
        self.history = {}
        self.qname = qname
        self.client = client
        self.trend = trend
        self.qname = uuid.uuid4().hex

    def decide_whether_to_buy_or_sell(self, quote):
        symbol, price, date, counter = quote
        #print "Thinking about whether to buy or sell %s at %s" % (symbol, price)

        if symbol not in self.history:
            self.history[symbol] = [price]
        else:
            self.history[symbol].append(price)

        if len(self.history[symbol]) >= self.trend:
            price_low = min(self.history[symbol][-self.trend:])
            price_max = max(self.history[symbol][-self.trend:])
            price_avg = sum(self.history[symbol][-self.trend:])/self.trend
            #print "Recent history of %s is %s" % (symbol, self.history[symbol][-self.trend:])
        else:
            price_low, price_max, price_avg = (-1, -1, -1)
            print "%s quotes until we start deciding whether to buy or sell %s" % (self.trend - len(self.history[symbol]), symbol)
            #print "Recent history of %s is %s" % (symbol, self.history[symbol])

        if price_low == -1: return

        #print "Trending minimum/avg/max of %s is %s-%s-%s" % (symbol, price_low, price_avg, price_max)
        #for symbol in self.holdings.keys():
        #    print "self.history[symbol][-1] = %s" % self.history[symbol][-1]
        #    print "self.holdings[symbol][0] = %s" % self.holdings[symbol][0]
        #    print "Value of %s is %s" % (symbol, float(self.holdings[symbol][0])*self.history[symbol][-1])
        value = sum([self.holdings[symbol][0]*self.history[symbol][-1] for symbol in self.holdings.keys()])
        print "Net worth is %s + %s = %s" % (self.cash, value, self.cash + value)

        if symbol not in self.holdings:
            if price < 1.01*price_low:
                shares_to_buy = random.choice([10, 15, 20, 25, 30])
                print "I don't own any %s yet, and the price is below the trending minimum of %s so I'm buying %s shares." % (symbol, price_low, shares_to_buy)
                cost = shares_to_buy * price
                print "Cost is %s, cash is %s" % (cost, self.cash)
                if cost < self.cash:
                    self.holdings[symbol] = (shares_to_buy, price, cost)
                    self.cash -= cost
                    print "Cash is now %s" % self.cash
                else:
                    print "Unfortunately, I don't have enough cash at this time."
        else:
            if price > self.holdings[symbol][1] and price > 0.99*price_max:
                print "+++++++ Price of %s is higher than my holdings, so I'm going to sell!" % symbol
                sale_value = self.holdings[symbol][0] * price
                print "Sale value is %s" % sale_value
                print "Holdings value is %s" % self.holdings[symbol][2]
                print "Total net is %s" % (sale_value - self.holdings[symbol][2])
                self.cash += sale_value
                print "Cash is now %s" % self.cash
                del self.holdings[symbol]

    def handle_pyamqplib_delivery(self, msg):
        self.handle(msg.delivery_info["channel"], msg.delivery_info["delivery_tag"], msg.body)

    def handle(self, ch, delivery_tag, body):
        quote = pickle.loads(body)
        #print "New price for %s => %s at %s" % quote
        ch.basic_ack(delivery_tag = delivery_tag)
        print "Received message %s" % quote[3]
        self.decide_whether_to_buy_or_sell(quote)

    def monitor(self):
        self.client.monitor(self.qname, self.handle_pyamqplib_delivery)
```

This client has its strategy for buying and selling stocks nicely isolated from the machinery for receiving messages from RabbitMQ.

1.  **monitor** is the main hook to kick off listening for new stock quotes. It registers **handle\_pyamqplib\_delivery** as the callback method to invoke every time a new quote arrives.
2.  **handle\_pyamqplib\_delivery** pulls out the important parts of the message and hands them to **handle**. The reason for inserting this extra method call is to support swapping out py-amqplib with pika, which we'll look at later.
3.  **handle** de-pickles the opaque body of the message, acknowledges receipt of the message on the channel with the broker, and then fires off its algorithm about deciding whether to buy or sell.
4.  **decide\_whether\_to\_buy\_or\_sell** splits up the tuple of the stock quote and then adds the price to its stock symbol history. It's geared to collect a minimum number of quotes before making a decision. Wouldn't you? Then it calculates the minimum and maximum of the trend, and if the price is relatively close to the minimum, it buys. However, if it already has shares, then it waits for the price to rise above what it originally paid for it. When that happens, it sells.

The part missing from this is the **self.client.monitor** function. **self.client** is our hook on the AMQP service coded earlier, and we need a way to bind our queue to the exchange to receive messages. The following function needs to be added to **PyAmqpLibPublisher**.

```python
Copy    def monitor(self, qname, callback):
        conn = amqp.Connection(host="127.0.0.1", userid="guest", password="guest")

        ch = conn.channel()

        if not self.queue_exists:
            ch.queue_declare(queue=qname, durable=False, exclusive=False, auto_delete=False)
            ch.queue_bind(queue=qname, exchange=self.exchange_name)
            print "Binding queue %s to exchange %s" % (qname, self.exchange_name)
            #ch.queue_bind(queue=qname, exchange=self.exchange_name, routing_key=qname)
            self.queue_exists = True

        ch.basic_consume(callback=callback, queue=qname)

        while True:
            ch.wait()
        print 'Close reason:', conn.connection_close
```

This shows the basic pattern of connecting to our RabbitMQ broker, declaring a queue, binding it to the fanout exchange, and then registering a callback.

But let's not getting all wrapped up in how to make this algorithm better at picking winners and losers. Instead, let's recognize that this makes it very easy for any financial company to subscribe for stock quotes by creating a unique queue, binding to the stock system's fanout exchange, and then write their own algorithm for making financial decision.

## Replacing py-amqplib with pika

AMQP is a nicely written spec. It includes an XML format, supporting the ability to automatically generate client libraries. This means that libraries that were coded to spec are easy to swap out, and pick based on the merits of their implementation. A popular library in the Python community is [py-amqplib](http://code.google.com/p/py-amqplib/). One of its limitations, as noted on its project site, is that it blocks and doesn't currently provide concurrency. pika offers both.

The important point is that migrating from py-amqplib to pika is actually quite easy. The AMQP-based methods are the same, and the underpinning concepts are the same as well. Let's look at writing an alternative AMQP service using pika.

```python
Copyimport pika

class PikaPublisher(object):
    def __init__(self, exchange_name):
        self.exchange_name = exchange_name
        self.queue_exists = False

    def publish(self, message, routing_key):
        conn = pika.AsyncoreConnection(pika.ConnectionParameters(
                '127.0.0.1',
                credentials=pika.PlainCredentials('guest', 'guest')))

        ch = conn.channel()

        ch.exchange_declare(exchange=self.exchange_name, type="fanout", durable=False, auto_delete=False)

        ch.basic_publish(exchange=self.exchange_name,
                         routing_key=routing_key,
                         body=message,
                         properties=pika.BasicProperties(
                                content_type = "text/plain",
                                delivery_mode = 2, # persistent
                                ),
                         block_on_flow_control = True)
        ch.close()
        conn.close()

    def monitor(self, qname, callback):
        conn = pika.AsyncoreConnection(pika.ConnectionParameters(
                '127.0.0.1',
                credentials=pika.PlainCredentials('guest', 'guest')))

        ch = conn.channel()

        if not self.queue_exists:
            ch.queue_declare(queue=qname, durable=False, exclusive=False, auto_delete=False)
            ch.queue_bind(queue=qname, exchange=self.exchange_name)
            print "Binding queue %s to exchange %s" % (qname, self.exchange_name)
            #ch.queue_bind(queue=qname, exchange=self.exchange_name, routing_key=qname)
            self.queue_exists = True

        ch.basic_consume(callback, queue=qname)

        pika.asyncore_loop()
        print 'Close reason:', conn.connection_close
```

This is very similar to the other service shown earlier. Creating a connection is a little different, but included the same pieces of data such as host for the **broker**, and **username** and **password**. **basic\_publish** is slightly different in that the message and its properties are put together inside the method call. py-amqplib declares the entire message and its properties in a slightly different structure, and then passes it into basic\_publish as one argument. Good thing about the spec is knowing that all the important pieces are in both libraries.

pika supports different waiting mechanisms compared to py-amqplib. py-amqplib has a blocking wait, while pika offers both a blocking mechanism as well as one that uses [Python's asyncore utility](http://docs.python.org/library/asyncore.html) for asynchronous operations. We can explore this in future blog entries about RabbitMQ and Python.

There is a slight difference in the method signature of the callback between these two libraries. We need to update our brokerage client to handle it suitably.

```python
Copy    def handle_pyamqplib_delivery(self, msg):
        self.handle(msg.delivery_info["channel"], msg.delivery_info["delivery_tag"], msg.body)
```

Compare this with pika's callback method signature.

```python
Copy    def handle_pika_delivery(self, ch, method, header, body):
        self.handle(ch, delivery_tag, body)
```

They are very close. The important parts are there. The difference is based on the fact that pika splits up the parts of the message while py-amqplib combines it all inside a single class. This is the reason there is a decoupling between the callback method and the actual method that extracts the body of our message. By extracting the necessary parts, it is possible to switch between these two libraries without rewriting our buy/sell algorithm.

## Running things

With all this code, we need to run things. It's easy to code a runner script and just spin things up.

```python
Copy########################################
# To run this demo using py-amqplib,
# uncomment this block, and  comment out
# the next block.
########################################

#from amqplib_client import *
#publisher = PyAmqpLibPublisher(exchange_name="my_exchange")

########################################
# To run this demo using pika,
# uncomment this block, and comment out
# the previous block
########################################

from pika_client import *
publisher = PikaPublisher(exchange_name="my_exchange")

########################################
# This part doesn't have to change
########################################

from ticker_system import *
ticker = Ticker(publisher, "")
ticker.monitor()
```

This runner can be switched between running either the py-amqplib or pika version of our stock ticker system. Now we just need a runner for the brokerage service.

```python
Copy########################################
# To run this demo using py-amqplib,
# uncomment this block, and  comment out
# the next block.
########################################

#from amqplib_client import *
#publisher = PyAmqpLibPublisher(exchange_name="my_exchange")

########################################
# To run this demo using pika,
# uncomment this block, and comment out
# the previous block
########################################

from pika_client import *
publisher = PikaPublisher(exchange_name="my_exchange")

########################################
# This part doesn't have to change
########################################

from buy_low_sell_high import *
buyer = Buyer(publisher, "", trend=25)
print "Buyer = %s" % id(buyer)
buyer.monitor()
```

In future blog entries, we can entertain running the same code using a pythonic DI container.

## **A good spec provides great options**

The AMQP spec makes it easy to pick libraries based on more than just technical merit. By splitting up the machinery of AMQP from the logic of generating quotes as well as parsing them, it was pretty easy to swap out py-amqplib and pika. The core method names are the same. Several arguments are the same. But even more important: the architectural concepts are the same. The choice about which library to choose can now include not just technical merit, but instead things like customer support, spec compliance, synchronous vs. asynchronous support, and usability.