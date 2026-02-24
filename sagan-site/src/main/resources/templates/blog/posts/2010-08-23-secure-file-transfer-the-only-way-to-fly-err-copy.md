---
title: (Secure) File Transfer, the Only Way to Fly…err Copy
source: https://spring.io/blog/2010/08/23/secure-file-transfer-the-only-way-to-fly-err-copy
scraped: 2026-02-24T08:54:06.111Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 23, 2010 | 0 Comments
---

# (Secure) File Transfer, the Only Way to Fly…err Copy

_Engineering | Josh Long |  August 23, 2010 | 0 Comments_

There are many ways to skin a cat. Many applications today rely on messaging (AMQP, JMS) to bridge the gap between disparate systems and data. Others rely on RPC (typically web-services, or REST). For a great many applications, however, file transfer is very much a way of life! There are several common ways of supporting it, but three of the most common are using a shared mount or folder, using a FTP server, and - for more secure exchanges - using SSH (or SFTP). While it's common knowledge that Spring has always provided first-class support for messaging (JMS, AMQP) and RPC (there are far too many remoting options to list!), many might be surprised at the many robust options for file transfer that the [Spring Integration project](http://www.springsource.org/spring-integration) has. In this post, I'll be building against some of the exciting support found in the upcoming Spring Integration 2.0 framework that lets you hook into events when new files arrive and also to send files to remote endpoints like an FTP or SFTP server, or a shared mount.

We'll use a familiar pair of Java classes - one to produce outbound data, and another to receive inbound data, be they used for SFTP, FTP, or plain ol' file systems is irrelevant. All the adapters deliver `java.io.File` objects as their inbound payload, and we can send File's or Strings or `byte[]`s to the remote systems. First, let's look at our standard client. In Spring Integration, classes that do logic in response to inbound messages are called "service activators." You simply configure a `<service-activator>` element and tell it which bean you want to use to handle the `Message`. It'll follow a few different heuristics to help you out in resolving which method to dispatch the Message. Here, we're just annotating it explicitly. Thus, here's the client code we'll use throughout the post:

```java
Copyimport org.springframework.integration.annotation.*;
import org.springframework.stereotype.Component;
import java.io.File;
import java.util.Map;

@Component
public class InboundFileProcessor {

    @ServiceActivator
    public void onNewFileArrival(
            @Headers Map&lt;String, Object&gt; headers,
            @Payload File file) {

        System.out.printf("A new file has arrived deposited into " +
                          "the accounting folder at the absolute " +
                          "path %s \n", file.getAbsolutePath());

        System.out.println("The headers are:");
        for (String k : headers.keySet())
            System.out.println(String.format("%s=%s", k, headers.get(k)));

    }
}
```

And, here's the code we'll use to synthesize data to ultimately be stored on a file system as a file:

```java
Copyimport org.springframework.integration.annotation.Header;
import org.springframework.integration.aop.Publisher;
import org.springframework.integration.file.FileHeaders;
import org.springframework.stereotype.Component;

@Component
public class OutboundFileProducer {

    @Publisher(channel = "outboundFiles")
    public String writeReportToDisk (
             @Header("customerId") long customerId,
             @Header(FileHeaders.FILENAME) String fileName    ) {
        return String.format("this is a message tailor made for customer # %s", customerId);
    }

}
```

This last one is an example of one of my absolute favorite features in Spring Integation and indeed Spring in general: interface transparency. The `OutboundFileProducer` class defines a method annotated with a `@Publisher` annotation. The `@Publisher` annotation tells Spring Integration to forward the return value of this method invocation onto a channel (here we've named it through the annotation - `outboundFiles`). This is the same as if you had injected a `org.springframework.integration.MessageChannel` instance directly and sent a `Message` on it directly. Except, now it's all hidden behind a nice clean POJO! Anybody can inject this bean at their discretion - it'll be our secret that when they invoke the method the return value is being written to a `File` somewhere :-) To activate this feature, we install a Spring `BeanPostProcessor` in our Spring context. The bean post processor mechanism lets you easily scan the Spring context for beans and - where appropriate - augment their definitions. In this case we're augmenting beans annotated with `@Publisher`. Installing the `BeanPostProcessor` is as simple as instantiating it:

<beans:bean class="org.springframework.integration.aop.PublisherAnnotationBeanPostProcessor"/>

Now, I can create a client that injects this bean (or simply access it from the context) and use it like I might any other service:

```java
Copy@Autowired
private OutboundFileProducer outboundFileProducer ; 

 // ... 

outboundFileProducer.writeReportToDisk(1L, "1.txt") ;
```

Finally, in all my Spring contexts, I'll turn on `<context:component-scan ...  />` to let the Java code do most of the talking and handle the business logic. The only places where I've used XML are in describing the global integration solution's flow and configuration.

## File System

The first choice - a shared mount - is incredibly common. There are increasingly more ways to build a solution like this. Most Operating Systems have a mechanism that lets you receive notifications when files have arrived. Win32 / .NET surfaces hooks for Windows, and on Linux there are numerous mechanisms like inotify at the kernel level. On the Java platform, Java 7 is slated to include a WatchService in the NIO.2 package. In the meantime, however, you need to write code that does directory polling, keeps state, and then dispatches events. Doesn't sound very exciting, does it? Note that all of the adapters we'll discuss require polling of some sort. Polling works well enough, but requires some amount of calibration on your part. First it's entirely possible that a scan of a directory will pickup a file that's still being written to, unless you mask the file appropriately. Typically a system will deposit a file on some mount, write it and then rename it in such a way that it will match a regular expression mask on the adapter: this guarantees that the adapter won't "see" the file before it is done.

Here, Spring Integration helps quite a bit - sparing you from all the directory polling code and freeing you to write the logic that is important to you. If you've used Spring Integration before, then you know that receiving events from external systems is as easy as plugging in an adapter and then letting the adapter tell you when something is worth reacting to. The setup is simple: a folder of files is monitored for new files and when a new file arrives and (optionally) matches some criteria, Spring Integration forwards a `Message` having as its payload a `java.io.File` reference to the file that's been added.

You can use the `file:inbound-channel-adapter` for this purpose. The adapter monitors a directory at a fixed interval (as configured by a `poller` element) and then publishes a `Message` when a new File has been detected. Let's look at how we'd configure this in Spring Integration:

```xml
Copy<?xml version="1.0" encoding="UTF-8"?>

<beans:beans ... xmlns:file="http://www.springframework.org/schema/integration/file" >
    <context:component-scan base-package="org.springframework.integration.examples.filetransfer.core"/>

    <file:inbound-channel-adapter channel="inboundFiles"
                                  auto-create-directory="true"
                                  filename-pattern=".*?csv"
                                  directory="#{systemProperties['user.home']}/accounting">
        <poller fixed-rate="10000"/>
    </file:inbound-channel-adapter>

    <channel id="inboundFiles"/>

    <service-activator input-channel="inboundFiles" ref="inboundFileProcessor"/>

</beans:beans>
```

The options are pretty self explanatory, I think. The `filename-pattern` is a regular expression that will be evaluated against every file name in the directory. If the file name matches the regular expression, then it will processed. The poller element inside the adapter's tags tell the adapter to recheck the directory every 10,000 milliseconds, or 10 seconds. The directory attribute lets you specify the directory to be monitored, of course, and the channel describes on what named channel to forward messages when the adapter finds something. In this example, as with all subsequent examples, we'll have it forward the message to a named channel that's hooked up to a `<service-activator>` element. Service activators are simply Java code that you provide and that Spring Integration will call when new messages arrive. There you may do anything you'd like.

Writing to a file system mount is another story entirely; it's easier!

<?xml version="1.0" encoding="UTF-8"?>

<beans:beans ... xmlns:file="http://www.springframework.org/schema/integration/file" >

    <context:component-scan base-package="org.springframework.integration.examples.filetransfer.core"/>
    <beans:bean class="org.springframework.integration.aop.PublisherAnnotationBeanPostProcessor"/>

    <channel id="outboundFiles"/>

    <file:outbound-channel-adapter
            channel="outboundFiles"
            auto-create-directory="true"
            directory="#{systemProperties\['user.home'\]}/Desktop/sales"/>

</beans:beans>

In this example, we've described a named channel and an outbound adapter. Recall that the outbound channel is referenced from the Publisher class we created earlier. In all case examples, it will put a Message onto the channel (`outboundFiles`) when you invoke the method `writeReportToDisk`, and those messages will travel until they hit the outbound adapter. When you invoke the method `writeReportToDisk`, the return value (a String) is used as the payload for a `Message`, and the two method parameters annotated with `@Header` elements are added as headers to the `Message.` The `@Header` whose key is `FileHeaders.FILENAME` is used to tell the outbound-adapter what file name to use when writing it in the configured directory. If we hadn't specified it, it would have synthesized one based on a `UUID` for us. Pretty slick right?

## FTP (File Transfer Protocol)

FTP's a very common way of storing files. FTP supports basic authentication, so it is not the most secure of protocols. It is ubiquitous: there are free clients for all operating systems, and indeed many people who are not necessarily technical will know how to work with it, This makes it a good way of integrating and enabling file sharing between your system and your customers. To use the FTP adapters in Spring Integration, you need to tell it how to connect to your FTP server, *and* you need to tell it where you want the files downloaded to on your local system in the inbound scenario.

Let's look at configuring Spring Integration to receive new files from a remote FTP server.

<?xml version="1.0" encoding="UTF-8"?>
<beans  ... xmlns:ftp="http://www.springframework.org/schema/integration/ftp">

    <context:component-scan base-package="org.springframework.integration.examples.filetransfer.core"/>
    <context:property-placeholder location="file://${user.home}/Desktop/ftp.properties" ignore-unresolvable="true"/>

    <ftp:inbound-channel-adapter
            remote-directory="${ftp.remotedir}"
            channel="ftpIn"
            auto-create-directories="true"
            host="${ftp.host}"
            auto-delete-remote-files-on-sync="false"
            username="${ftp.username}" password="${ftp.password}"
            port="2222"
            client-mode="passive-local-data-connection-mode"
            filename-pattern=".\*?jpg"
            local-working-directory="#{systemProperties\['user.home'\]}/received\_ftp\_files"
            >
        <int:poller fixed-rate="10000"/>
    </ftp:inbound-channel-adapter>

    <int:channel id="ftpIn"/>

    <int:service-activator input-channel="ftpIn" ref="inboundFileProcessor"/>

</beans>

You can see there are a lot of options! Most of them are just that -optional - but it's nice to know that they're there. This adapter will download files that match the `filename-pattern` specified and then deliver them as a `Message` with a `java.io.File` as a payload, just as before. This is why we are able to simply reuse the previous `inboundFileProcessor` bean. If you want additional control over what does and does not get downloaded, consider using the filename-pattern to specify a mask. Note that there's quite a bit of control surfaced here, including control over the connection mode and whether or not the source files should be deleted on delivery of the File.

The outbound adapter will look eerily similar to the outbound adapter we configured for the File support. When this is executed, it will the marshal the contents of the payload that's coming into it and then store those contents on the FTP server. Currently there is prebuilt support for marshaling a `String,` a `byte[],` and a `java.io.File` object.

<?xml version="1.0" encoding="UTF-8"?>
<beans ... xmlns:ftp="http://www.springframework.org/schema/integration/ftp">

    <context:component-scan base-package="org.springframework.integration.examples.filetransfer.core"/>
    <context:property-placeholder location="file://${user.home}/Desktop/ftp.properties" ignore-unresolvable="true"/>

    <int:channel id="outboundFiles"/>

    <ftp:outbound-channel-adapter
            remote-directory="${ftp.remotedir}"
            channel="outboundFiles"
            host="${ftp.host}"
            username="${ftp.username}" password="${ftp.password}" port="2222"
            client-mode="passive-local-data-connection-mode"
            />
</beans>

As with the outbound file adapter, we are producing content to be stored using our `OutboundFileProducer` class, so there's no need to review that. All that's left then is the configuration for the channel and the adapter itself which stipulates all the things you'd expect to see stipulated: the server configuration and the remote directory into which the payload's deposited.

Moving on....

## SSH File Transfer Protocol (or, Secure File Transfer Protocol)

Finally, we reach the SFTP adapter. This is arguably the most complicated of the 3 adapters to configure, but it's one of the easiest to test. SFTP usually works anywhere you have SSH access, though it is not strictly speaking limited to that. SFTP is not FTP over SSH, but a completely different protocol. It is generally more ubiquitous and consistent than SCP, specifying many things that SCP leaves up to interpretation. SFTP itself is a relatively spartan protocol because it makes a lot of assumptions about the connection over which it communicates: it assumes - among other things - that the client user's identity is known, that it's being conducted over a secure channel and that authentication has occurred. It was designed by the same working group that designed SSH2, and works well as an SSH2 subsystem; it is conceivable that you could run SFTP on an SSH1 server. Because SFTP works on top of SSH which provides the authentication mechanism, it supports the same authentication options including user names, passwords, and / or and public keys (which themselves might optionally have a password). If you're running a relatively recent version of OpenSSH (which itself runs on AIX, HP-UX, Iris, Linux, Cygwin, Mac OSX, Solaris, SNI, Digital Unix/Tru64/OSF, NeXT (!), SCO, and more), then you likely already have this installed and can proceed. Put another way, it is easier to find a computer than could support some form of SFTP than a computer that could support a file system you could mount. See, I told you it'd be easy to test!

To get started with an inbound adapter, simply copy and paste the FTP adapter, rename all occurrences of FTP to SFTP, change the relevant configuration values as appropriate (port, host...), drop the client-mode option, and then you're done! There are of course other options - lots of other options to let you qualify your authentication mechanism; a public key or username, for example. Here's a familiar example:

<?xml version="1.0" encoding="UTF-8"?>
<beans ... xmlns:sftp="http://www.springframework.org/schema/integration/sftp">

    <context:component-scan base-package="org.springframework.integration.examples.filetransfer.core"/>
    <context:property-placeholder location="file://${user.home}/Desktop/sftp.properties" ignore-unresolvable="true"/>

    <sftp:inbound-channel-adapter
            remote-directory="${sftp.remotedir}"
            channel="sftpIn"
            auto-create-directories="true"
            host="${sftp.host}"
            auto-delete-remote-files-on-sync="false"
            username="${sftp.username}"
            password="${sftp.password}"
            filename-pattern=".\*?jpg"
            local-working-directory="#{systemProperties\['user.home'\]}/received\_sftp\_files"
            >
        <int:poller fixed-rate="10000"/>
    </sftp:inbound-channel-adapter>

    <int:channel id="sftpIn"/>

    <int:service-activator input-channel="sftpIn" ref="inboundFileProcessor"/>

</beans>

Pretty handy, eh? The rules are the same as the previous examples: your client code will be delivered a `java.io.File` instance which you can process anyway you see fit. The SFTP outbound adapter rounds out the set:

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns:sftp="http://www.springframework.org/schema/integration/sftp">

    <context:component-scan base-package="org.springframework.integration.examples.filetransfer.core"/>
    <context:property-placeholder location="file://${user.home}/Desktop/sftp.properties" ignore-unresolvable="true"/>

    <int:channel id="outboundFiles"/>

    <sftp:outbound-channel-adapter
            remote-directory="${sftp.remotedir}"
            channel="outboundFiles"
            host="${sftp.host}"
            username="${sftp.username}"
            password="${sftp.password}"
    />
</beans>

## Where to go from Here?

It's useful to think about what kinds of problems are typically file-oriented, or *batch-oriented* in nature. Spring Integration does a fantastic job at notifying you of interesting events in your world ("new file placed in folder!") and integrating data; Spring Integration is a great way to achieve an event driven architecture. A file with a million rows, however, is not an *event.* Spring Integration has no inbuilt facilities for processing large batch file payloads in the framework - that is a job for [Spring Batch.](http://static.springsource.org/spring-batch/) So consider an approach that leverages Spring Integration to detect the availability of a file for the genesis of a job, and then kick off a Spring Batch job. There's no job too big for Spring Batch. Spring Batch can help you decompose your million-record file into event-sized records that Spring Integration is happier processing. I like to think of the two frameworks as interweaving dancers in a delicate ballet of event-driven, data crunching badassery!

## Summary

In this post we've talked about the wide world of file transfer adapters in Spring Integration that make downright pleasant the chore of file-based integration using a straight file-system mount, FTP and SFTP.