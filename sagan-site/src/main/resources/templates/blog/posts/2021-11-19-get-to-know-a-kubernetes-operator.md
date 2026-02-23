---
title: Get to Know a Kubernetes Operator!
source: https://spring.io/blog/2021/11/19/get-to-know-a-kubernetes-operator
scraped: 2026-02-23T13:03:39.902Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 19, 2021 | 0 Comments
---

# Get to Know a Kubernetes Operator!

_Engineering | Josh Long |  November 19, 2021 | 0 Comments_

.logo { --gutter: 10px; --logo-width : 200px; grid-area: logo ; border: 1px solid white ; width: var(--logo-width) ; background-color: white ; padding: var(--gutter); border-radius: var(--gutter); }

Hi, Spring fans! It's Friday, and you know what that means? Some poor schlub somewhere is trying fruitlessly to get something deployed to production, or at least rolled back consistently, in time for dinner. And it's not working. I've been there. Deployments are hard. There's nuance in deployment. I love Kubernetes as much as the next Operator, but let's not pretend it's the pinnacle of productivity. Quite the contrary. There's a whole cottage industry around simplifying application deployments with Kubernetes. See for example [KNative](https://knative.dev/docs/), [Cloud Foundry on Kubernetes](https://tanzu.vmware.com/developer/guides/cf4k8s-gs/), or [Azure Spring Cloud](https://azure.microsoft.com/en-us/services/spring-cloud/#overview). These tools are awesome - they provide opinions about how to quickly deploy and manage typical 12-factor style online web applications. They have strong opinions that are loosely held. They're rails for particular workloads - rails that lead to production, *if* you can fit your workload into a particular, PaaS-friendly shape. That's great for so much of the workloads we run out there, but not *all* of them. Our applications will invariably want to talk to something more substantial, like Apache Kafka, and those things are never so easy to deploy.

Kubernetes has an answer for this: [the Operator](https://coreos.com/operators/). It's hard to say what a typical distributed database looks like, let alone a standard message queue, or a regular mail server, or whatever. They're all pretty unique and have their usage patterns. So Kubernetes offers primitives, like the Kubernetes `StatefulSet` CRD, that - taken together - can be used to successfully deploy a service with replication and backups and quorums and what all. But it's no fun to figure out when and in which we should deploy things. Nobody wants to do that or try to debug it when something goes wrong.

## [](#operators)Operators

Vendors of various services have taken great pains to package up their wares as Kubernetes operators. Operators are, basically, just programs that live in your Kubernetes cluster and interact with the Kubernetes API to programmatically deploy and - should something go wrong - redeploy the various moving parts of a service.

Most vendors extend three options to us, the wayward application developers that want to get to the happiest place on earth, production:

-   deploy the OSS bits yourself. I call this the YOLO option.
-   deploy the vendor's (more often than not OSS) Operator for Kubernetes
-   use the vendor's hosted, cloudy SaaS thing. I tend to do this option whenever I can. Of course, it costs a few bucks, but the peace of mind? Priceless.

If you don't want to take the plunge and go for the third option, then the second option is your best bet if you know where to look. So, let's look at some operators that I like and use in my day-to-day work building Spring applications.

The installation of these is usually some combination of the following steps, in roughly the next order:

-   set up the appropriate and requisite cluster permissions for your Kubernetes installation
-   Get the various operator resource definitions installed by either `kubectl applying` some definitions, OR, using a Helm chart
-   Provisioning/configuring an instance of the CRD managed by the Operator

After a while, you'll want to upgrade to the newer versions of that infrastructure, so you'll typically either use Helm or apply the updated definitions. In addition, many (but not all!) have built-in support for failover and replication.

### [](#rabbitmq)RabbitMQ

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/rabbitmq.png)

Many messaging brokers are on this list because they have some of the more exciting and potentially fragile deployments. RabbitMQ is no exception. RabbitMQ is, of course, the AMQP-spec-implementing, queue-centric message broker developed primarily by Tanzu (I work on the Spring team, as part of Tanzu), a part of VMWare. I loved RabbitMQ before VMWare ever owned it, and I use it routinely. Heck, I even pay for hosted RabbitMQ with services [from Cloud AMQP](https://www.cloudamqp.com/). But now I don't need to. [There's an operator from the RabbitMQ team itself](https://www.rabbitmq.com/kubernetes/operator/operator-overview.html).

### [](#apache-kafka)Apache Kafka

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/kafka.png)

Alrighty, I'll bet you were looking for this one. Apache Kafka is a topic-centric message queue that fell out of the work that Linkedin and others were doing to Apache Kafka is notoriously hard to operationalize. Heck, it's even had components, like Apache Zookeeper, that themselves are notoriously hard to operationalize! As I write this, Apache Zookeeper is out the door, and so you may not have to deal with it when you one day read this, but it's still a thing now.

You have two excellent choices here. First, there's the Confluent Operator for Kubernetes, which is [not opensource but is easy enough to test and try](https://docs.confluent.io/operator/current/overview.html). It's also made and supported by Confluent, the folks who drive the growth of Apache Kafka and its ecosystem. It's inarguably the more sophisticated project *and* it helps the folks who work on the code. So, if you can do this, you should.

Otherwise, there's a top-rated OSS operator for Apache Kafka [called Strimzi](https://github.com/strimzi/strimzi-kafka-operator). This open-source project powers commercial offerings from various vendors like IBM, too. I like this one, as well, for a few reasons, including that the code is itself in Java, not Go, so it's fertile ground for people who want to learn how to write an operator. (You do want to learn how to write an operator, don't ya'?)

### [](#artemis)Artemis

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/activemq.png)

Remember [JBoss HornetQ](https://en.wikipedia.org/wiki/HornetQ)? It was *awesome* and offered game-changing, world-class leading performance (at the time) centered around the JMS API. The HornetQ project eventually ended up being folded into Apache ActiveMQ, another super popular JMS message broker of the time. A new project that was more than the sum of the parts was released: Apache Artemis. [And, lo, there's an OSS operator](https://artemiscloud.io/)! Want a very fast, outstanding, world-class JMS broker at OSS prices? Now you've got one.

### [](#cassandra)Cassandra

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/cassandra.png)

Apache Cassandra is a super-popular columnar database that engineers created at Facebook. It prioritizes *Availability* and *Partitionability* over consistency in the CAP theorem. It also powers some of the largest sites on the planet. And you can use it, too. There's a delightful operator called [K8ssandra](https://k8ssandra.io/) by the good folks over at DataStax, the company behind Apache Cassandra and its emerging ecosystem. From the website, it builds on "the rock-solid Apache Cassandra® NoSQL database" and "brings together a complete operational data platform for Kubernetes including APIs, monitoring, and backups." Sounds good to me!

### [](#yugabytedb)YugabyteDB

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/yugabyte.png)

Hey, remember how we talked about Apache Cassandra, *way back* in the paragraph that precedes this one, and I said that it prioritized AP over C in the CAP theorem? What if you had a distributed database that *felt* like a single-node PostgreSQL instance and was compatible with PostgreSQL while reducing the extent to which you needed to compromise for C so much that it's effectively not a compromise anymore? That's what YugabyteDB, created by some of the same folks who designed Apache Cassandra in the first place, sets out to do. I love it. [And I love that there's an operator](https://docs.yugabyte.com/latest/deploy/kubernetes/single-zone/oss/yugabyte-operator/).

### [](#elasticsearch)ElasticSearch

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/elasticsearch.png)

Elastic is the company behind ElasticSearch, the popular search engine. It's incredible and can be used to add natural language search capabilities to an application instantly. It's also, as you can imagine, compromised of a lot of moving parts and the perfect candidate for an operator. Elastic will sell you Elastic Cloud access if you like. That's as easy as it gets. Or, you could use Elastic Cloud on Kubernetes (ECK), which is their Operator for [your particular Kubernetes installation](https://www.elastic.co/downloads/elastic-cloud-kubernetes). It installs ElasticSearch and Kibana, APM Server, Enterprise Search, Beats, Elastic Agent, and Elastic Maps Server. Either way, enjoy being able to find that needle in your organization's haystack again!

### [](#prometheus)Prometheus

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/prometheus.png)

Prometheus is a popular time-series database that scales with your Kubernetes workloads. It was developed in the cradle of the Kubernetes ecosystem and works well for Kubernetes-deployed services. No surprise: there's an excellent [Prometheus Operator, too](https://github.com/coreos/prometheus-operator).

### [](#mysql)MySQL

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/mysql.png)

Do you want to run MySQL? You're not alone! Oracle has even built [an OSS Kubernetes operator to run MySQL in your cluster](https://github.com/mysql/mysql-operator). This Operator manages the entire lifecycle, including backups and restorations.

### [](#mongodb)MongoDB

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/mongodb.png)

MongoDB is a popular NoSQL datastore that's, *ahem*, "web scale."

There are two options. The [MongoDB Enterprise Kubernetes Operator](https://github.com/mongodb/mongodb-enterprise-kubernetes) is an Enterprise product, available under the Enterprise Advanced license. The Operator enables easy deployment of the following applications into Kubernetes clusters:

-   *MongoDB* - Replica Sets, Sharded Clusters, and Standalones - with authentication, TLS, and many more options.
-   *Ops Manager* - the enterprise management, monitoring, and backup platform for MongoDB. The Operator can install and manage Ops Manager in Kubernetes for you. In addition, Ops Manager can manage MongoDB instances both inside and outside Kubernetes.

You might also try [the MongoDB Community Operator](https://github.com/mongodb/mongodb-kubernetes-operator), which deploys MongoDB community into Kubernetes clusters.

### [](#postgresql)PostgreSQL

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/postgresql.png)

Want to run PostgreSQL at scale? Me too! And, evidently, so do a good many others, as well! Unfortunately, I couldn't find a single, well-known, and endorsed Operator for PostgreSQL - I found many, but none that seemed "official," whatever that means. I've used this one [from German online fashion platform Zalando](https://github.com/zalando/postgres-operator) before, and it works well.

### [](#couchbase)Couchbase

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/couchbase.png)

A long time ago, in a galaxy far away, CouchDB and Membase merged, and the result was Couchbase. Couchbase is a key-value store that can store lots of different kinds of data. There's [an enterprise (read: paid) Kubernetes operator](https://www.couchbase.com/products/cloud/kubernetes).

### [](#fluxcd)FluxCD

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/flux.png)

Alright, I grant you. However, this one is a bit of a freebie. It's FluxCD. It manages continuous delivery in your Kubernetes cluster for your Kubernetes cluster. That is, there's no natural way to run it *without* running it in Kubernetes. Nonetheless, [it does technically have an operator](https://github.com/weaveworks/flux)!

### [](#nats)NATS

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/nats.png)

[NATS](https://nats.io/) is a messaging (another one!) technology that Derek Collison developed to support the message-bus requirements of Cloud Foundry more than a decade ago. It's a very lightweight, super-fast message broker that is great for scaling systems. In addition, there's a Spring Cloud Stream binder, a Java client, and - obviously - [there's a Kubernetes operator](https://github.com/nats-io/nats-operator).

### [](#arangodb)ArangoDB

![](https://raw.githubusercontent.com/joshlong/blog-images/master/get-to-know-an-operator/arangodb.png)

ArangoDB is a multi-model distributed database. I haven't used it much. The one time I did, it was easy enough to get going on my local machine and - importantly - [on Kubernetes, thanks to this Operator](https://github.com/arangodb/kube-arangodb)

## [](#next-steps)Next Steps

In my experience, the first thing I tried to do when I got into Kubernetes was to deploy a stateless microservice using Spring Boot. I knew that these kinds of stateless microservices were the happy path for Kubernetes, and I didn't want to go uphill. This experience was satisfying and got me hooked. "This thing has potential!" I exclaimed. Then I spent time trying to optimize for stateless microservices. I learned Istio, KNative, and so on. The Tanzu Application Platform seems like the best fit for deploying applications of all the things I've learned. (I only wish it'd existed then as it does now! I would've undoubtedly saved myself scads of time!)

Then, I wondered how I would get my data on the platform. And that's where the optimism dwindles. 90% of my journey on Kubernetes has been figuring out how to make infrastructure work reliably on the platform. Things like message queues, databases, and more. It took learning how to work with Helm charts, operators, and StatefulSets before I started even understanding the problem space. If I had to do it over again, I'd spend less time treading water with microservices and dive almost immediately into getting my favorite database working reliably. Start small. Then learn Helm. Then discover the operator pattern. Once you've got those arrows in your quill, anything's possible. Then the force-multiplying effect of composition and reuse starts to kick in at the platform level.

In this post, we've looked at a few operators that I found pleasant enough to use and powerful enough to be worth using. I'd love to know what other operators you've found to be helpful in your experiences.