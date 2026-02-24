---
title: RabbitMQ Plugin for Grails - Early Access
source: https://spring.io/blog/2010/08/23/rabbitmq-plugin-for-grails-early-access
scraped: 2026-02-24T08:54:11.368Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  August 23, 2010 | 0 Comments
---

# RabbitMQ Plugin for Grails - Early Access

_Engineering | Peter Ledbrook |  August 23, 2010 | 0 Comments_

[RabbitMQ](http://www.rabbitmq.com/) is a lightweight, reliable, scalable and portable message broker based on the [Advanced Message Queueing Protocol (AMQP)](http://blog.springsource.com/2010/06/14/understanding-amqp-the-protocol-used-by-rabbitmq/). It's ideal for heterogeneous systems and cloud platforms, but it can be used for pretty much any messaging requirements, big or small. You don't (typically) access it via the JMS API, and in fact the JMS plugin won't help, but a new plugin is now available that's dedicated to making it easy to use RabbitMQ from Grails applications.

The current version of the plugin (0.2) is relatively limited, but you can already send and receive messages. I encourage you to try it out and provide feedback - you have the opportunity to influence its development!

**Update** The companion screencast is now available:

[![](http://blog.springsource.com/wp-content/uploads/2010/08/grails-rabbitmq-thmb.png "grails-rabbitmq-thmb")](	http://videos.springsource.org/grails/rabbitmq_grails_earlyaccess_web.mov)

**Update** [Source code](http://s3.springsource.com/MRKT/grails/grailsrabbitdemo.zip) for the example project created in the screencast.

## Installing the broker

Before you try the plugin, you will have to set up a RabbitMQ server somewhere. Take a look at the RabbitMQ [server download page](http://www.rabbitmq.com/server.html) and locate the appropriate package for your platform. Then follow the appropriate [installation instructions](http://www.rabbitmq.com/install.html).

I use an Ubuntu virtual machine to run the broker, because installation is a one-liner:

    sudo apt-get install rabbitmq-server

This command will not only install the server but also configure it to start on boot. To check that the broker is running, you can execute the command:

    sudo rabbitmqctl status

This should display output that looks something like

    Status of node rabbit@ubuntu ...
    \[{running\_applications,\[{rabbit,"RabbitMQ","1.7.2"},
                            {mnesia,"MNESIA  CXC 138 12","4.4.12"},
                            {os\_mon,"CPO  CXC 138 46","2.2.4"},
                            {sasl,"SASL  CXC 138 11","2.1.8"},
                            {stdlib,"ERTS  CXC 138 10","1.16.4"},
                            {kernel,"ERTS  CXC 138 10","2.13.4"}\]},
     {nodes,\[rabbit@ubuntu\]},
     {running\_nodes,\[rabbit@ubuntu\]}\]
    ...done.

Assuming that it has installed OK and is running, you can start using it from your Grails applications.

## Receiving messages

The first step towards interacting with the broker involves installing the plugin:

    grails install-plugin rabbitmq 0.2

Once that's finished, you'll see a message explaining that you have to add some settings to grails-app/conf/Config.groovy before you can use it. Specifically, you have to configure the connection factory for the broker, i.e. where the broker is running and what credentials to use when connecting to it. So, open up Config.groovy in your editor and add the following:

```groovy
Copyrabbitmq {
    connectionfactory {
        username = 'guest'
        password = 'guest'
        hostname = 'localhost'
        consumers = 5
    }

    queues = {
        msgs()
    }
}
```

This configures the plugin to use a default RabbitMQ server running on the local machine. If the broker isn't running locally or it's running in a virtual machine, you will have to change the host name. And at the risk of stating the obvious, please make sure you use more secure credentials for a production instance of the broker!

The code above also configures a queue called 'msgs'. It's important to understand that this setting ensures that the queue exists by the time the application has started up, i.e. if it doesn't exist, the plugin will create it. If some other application were to create the queue, then you would *not* need to configure the queue in Config.groovy. For more information on plugin configuration, have a look at the plugin's [user guide](http://grails-plugins.github.com/grails-rabbitmq/docs/manual/guide/2.%20Configuration.html#2.1 Configuring Queues).

Now we have a queue set up, how do we process messages from it? Simple: create a service! Here's an example (file location: grails-app/services/org/example/ConsumerService.groovy):

```groovy
Copypackage org.example

class ConsumerService {
    static rabbitQueue = "msgs"

    void handleMessage(msg) {
        println "Received message: $msg"
    }
}
```

The static rabbitQueue property tells the plugin which queue this service should listen on. In this case, it's the one we configured in Config.groovy. The handleMessage() method will then be invoked whenever a message becomes available on the queue, and the message's content will be passed as the argument.

We're now good to go; all we have to do is publish some messages to that queue. I borrowed [a Groovy script](http://ndpar.blogspot.com/2010/03/get-started-with-rabbitmq.html) for this job and have made it available. It's currently hard-coded to 'localhost', but you can easily change this if you need to. Assuming that the Grails application is running and you have Groovy installed and on the path, you can call the script like so:

    groovy publisher.groovy msgs "Hello world"

This sends the message content "Hello world" to the 'msgs' queue. Hopefully, you will shortly see

Received message: Hello world

in the output of the Grails application. That's all there is to it - nice and easy.

### Of message types

Before I show you how to send messages from a Grails application, a word of warning: the content of an AMQP message is basically a sequence of bytes. Normally it would be up to the consumer to convert that sequence of bytes - a byte array in Java - to its proper form, but the Grails plugin will automatically perform the conversion if the message has an appropriate content type header. In fact, this automatic conversion is handled by the [Spring AMQP](http://www.springsource.org/spring-amqp) library, which the plugin uses under the hood.

What does this mean for you? Well, if you use the plugin or Spring AMQP for both consumers and publishers, you won't have to worry about conversions. If you publish a map as a message, the consumer will see it as a map. But if you use the raw RabbitMQ Java client or a different language/platform, you will either have to make sure the content type header is set by the publisher or perform the data conversion yourself in the consumer.

After that little diversion, let's take a look at sending messages.

## Sending messages

Sending messages via RabbitMQ is even easier than receiving them. The plugin dynamically adds a method called rabbitSend() to all artifacts, including controllers and services. For example, we can use it from a service like so:

```groovy
Copypackage org.example

class PublishService {
    void sendMessage(String msg) {
        rabbitSend 'msgs', msg
    }
}
```

This service just sends some text messages to the 'msgs' queue. If you want a bit more flexibility, then you can use an alternative form of the rabbitSend() method:

    rabbitSend(String exchange, String routingKey, msg)

This will send a message to the named exchange with the given routing key. Although the plugin cannot create exchanges itself yet, it can interact with existing ones, which makes this form of the method more useful than it seems at first. See my [AMQP blog post](http://blog.springsource.com/2010/06/14/understanding-amqp-the-protocol-used-by-rabbitmq/) for more information on exchanges and routing keys.

**Warning** You may stumble across rabbitSend(msg), i.e. a version of the method that only takes a message, but it doesn't do anything useful - unless you override the rabbitTemplate bean, which is a task that's beyond the scope of this article.

As I indicated earlier, the current version of the plugin is really available as an early-access preview for those who don't need full featured support at this stage, but who would like to get started with RabbitMQ. That said, point-to-point messaging works fine and if you are able to create exchanges via an alternative method, you have the flexibility to send messages to them with any routing key you choose. So why not give it a try?