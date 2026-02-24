---
title: Using UDP and TCP Adapters in Spring Integration 2.0 M3
source: https://spring.io/blog/2010/03/29/using-udp-and-tcp-adapters-in-spring-integration-2-0-m3
scraped: 2026-02-24T08:58:43.190Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Gary Russell |  March 29, 2010 | 2 Comments
---

# Using UDP and TCP Adapters in Spring Integration 2.0 M3

_Engineering | Gary Russell |  March 29, 2010 | 2 Comments_

The UDP and TCP channel adapters introduced in [Spring Integration 2.0 Milestone 3](http://blog.springsource.com/2010/03/23/spring-integration-2-0-milestone-3-released/) provide lightweight communication either between two or more Spring Integration applications, or between a Spring Integration application and some other platform.

Following on from [Oleg's blog about the Loan Broker](http://blog.springsource.com/2010/03/18/eip-loan-broker-reference-implementation-part-1/), I use the same example to show how to use the new UDP adapters available with M3. Assume that the CEO of the Loan Broker company has heard complaints from some customers that several banks are quoting outrageous rates. He asks the CIO if he can monitor the quotes coming back from the banks for a while.

Since the Loan Broker app is built using Spring Integration, it is easy to wire-tap the quotes, filter them, and send them off-box to another application using the new ip adapters in M3. This can be done with minimal reconfiguration; the illustration below shows how multicast can be used to send the high-rate quotes to a simple Spring Roo application as well as to Groovy and Perl scripts, or indeed to any platform that supports IP.

First of all, let's explicitly add the aggregation channel and wiretap the quotes...

```xml
Copy
<int:channel id="quotesAggregationChannel">
    <int:interceptors>
        <int:wire-tap channel="loanSharkDetectorChannel"/>
    </int:interceptors>
</int:channel>

```

This sends each quote to the loanSharkDetectorChannel (as well as the aggregator).

The next step is to set up the filter and channels to detect the loan sharks...

```xml
Copy
<int:channel id="loanSharkDetectorChannel" />

<int:filter id="loanSharkFilter"
        input-channel="loanSharkDetectorChannel"
        output-channel="loanSharkChannel"
        expression="payload.rate > 5.2"/>

<int:channel id="loanSharkChannel" />

<int:transformer ref="udpTransformer"
        input-channel="loanSharkChannel"
        output-channel="sharkOutChannel"/>

<int:channel id="sharkOutChannel" />

```

The filter drops non-loan sharks (those that quote <= 5.2%; the [transformer](https://src.springsource.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/src/main/java/org/springframework/integration/loanbroker/Transformer.java) simply converts the LoanQuote to a string containing the bank name and rate, delimited by a comma.

Finally, we add the UDP channel adapter; choosing multicast so we can send the quotes to several destinations...

```xml
Copy	<int-ip:outbound-channel-adapter id="udpOut"
		channel="sharkOutChannel"
		protocol="udp"
		host="225.6.7.8"
		multicast="true"
		port="11111"/>

```

This adapter will multicast the data to port 11111 on multicast address 225.6.7.8.

Now let's take a look at the receiving side. First of all, I created a simple Roo application with the following script...

```code
Copyproject --topLevelPackage com.springframework.integration.loanbroker.loanshark
persistence setup --provider HIBERNATE --database HYPERSONIC_IN_MEMORY
entity --class ~.domain.LoanShark
field string --fieldName name
field number --type java.lang.Long --fieldName counter
field number --type java.lang.Double --fieldName averageRate 
finder add --finderName findLoanSharksByName
controller scaffold --class ~.web.SharkController
logging setup --level DEBUG
dependency add --artifactId org.springframework.integration.ip --groupId org.springframework.integration --version 2.0.0.M3
perform eclipse
```

(Note, before issuing the perform eclipse, I changed the Spring version in the pom.xml to 3.0.1.RELEASE-A).

Please refer to the [Roo documentation](http://static.springsource.org/spring-roo/reference/index.html) to see how these steps generate the initial Roo application.

Finally, I added some Spring Integration to the Roo application.

```xml
Copy	<int-ip:inbound-channel-adapter id="udpIn"
		channel="channel"
		multicast="true"
		protocol="udp"
		multicast-address="225.6.7.8"
		port="11111"/>
		
	<int:channel id="channel" />
	<int:transformer ref="transformer" 
		input-channel="channel"
		output-channel="transformedChannel"/>
	<int:channel id="transformedChannel" />		
	<int:service-activator 
		id="activator" 
		input-channel="transformedChannel"
		ref="accumulator" />
		
	<bean id="accumulator" class="com.springframework.integration.loanbroker.loanshark.biz.Accumulator" />
	<bean id="transformer" class="com.springframework.integration.loanbroker.loanshark.biz.SharkTransformer" />
```

The channel adapter receives the packets (\[bankName\],\[rate\]); the [transformer](https://src.springsource.org/svn/spring-integration/trunk/spring-integration-samples/loanshark/src/main/java/com/springframework/integration/loanbroker/loanshark/biz/SharkTransformer.java) transforms the data to a [SharkQuote](https://src.springsource.org/svn/spring-integration/trunk/spring-integration-samples/loanshark/src/main/java/com/springframework/integration/loanbroker/loanshark/biz/SharkQuote.java) object which is passed in to the [accumulator](https://src.springsource.org/svn/spring-integration/trunk/spring-integration-samples/loanshark/src/main/java/com/springframework/integration/loanbroker/loanshark/biz/Accumulator.java). This looks up the bank, creates it if necessary, increments the counter and calculates the average rate for that bank.

Here is a screen shot of the Roo application; click for a larger image.

[![LoanSharkRoo](http://blog.springsource.com/wp-content/uploads/2010/04/LoanSharkRoo.png "LoanSharkRoo")](http://blog.springsource.com/wp-content/uploads/2010/04/LoanSharkRoo.png)

This Groovy script also sees the packets...

```groovy
Copy
socket = new MulticastSocket(11111)
mcast = InetAddress.getByName("225.6.7.8")
socket.joinGroup(mcast)
buffer = (' ' * 1024) as byte[]
while(true) {
    incoming = new DatagramPacket(buffer, buffer.length)
    socket.receive(incoming)
    s = new String(incoming.data, 0, incoming.length)
    println ("**Shark** " + s)
}
```

... as does this Perl script...

```perl
Copy
#!/usr/bin/perl -w
use strict;
use IO::Socket::Multicast;
my $socket = IO::Socket::Multicast->new(LocalPort=>11111, ReuseAddr=>1)
  or die "Can't start UDP server: $@";
$socket->mcast_add('225.6.7.8');
my ($datagram,$flags);
while ($socket->recv($datagram,1024,$flags)) {
	print "**Shark** $datagram\n";
}
$socket->close();
```

You may have to install IO::Socket::Multicast for this script to work.

Either of the above scripts creates this output...

[![perl](http://blog.springsource.com/wp-content/uploads/2010/04/perl.png "perl")](http://blog.springsource.com/wp-content/uploads/2010/04/perl.png)

**Conclusion**

This is just a brief introduction to the new IP adapters. The code (updates to Loan Broker as well as the Loan Shark Roo application) is available in svn.

[](https://src.springsource.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/)[https://src.springsource.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/](https://src.springsource.org/svn/spring-integration/trunk/spring-integration-samples/loan-broker/)  
[](https://src.springsource.org/svn/spring-integration/trunk/spring-integration-samples/loanshark/)[https://src.springsource.org/svn/spring-integration/trunk/spring-integration-samples/loanshark/](https://src.springsource.org/svn/spring-integration/trunk/spring-integration-samples/loanshark/)

TCP adapters are also provided in M3; read about them [here](http://static.springsource.org/spring-integration/reference/htmlsingle/#ip).

We are considering creating TCP/IP gateways for bidirectional communication. If this is something you need, vote for the [JIRA issue](https://jira.springsource.org/browse/INT-1008).