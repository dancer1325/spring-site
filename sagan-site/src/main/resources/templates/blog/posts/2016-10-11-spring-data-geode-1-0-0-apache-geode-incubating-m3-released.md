---
title: Spring Data Geode 1.0.0.APACHE-GEODE-INCUBATING-M3 Released
source: https://spring.io/blog/2016/10/11/spring-data-geode-1-0-0-apache-geode-incubating-m3-released
scraped: 2026-02-23T19:01:42.682Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  October 11, 2016 | 2 Comments
---

# Spring Data Geode 1.0.0.APACHE-GEODE-INCUBATING-M3 Released

_Engineering | John Blum |  October 11, 2016 | 2 Comments_

I apologize to both the Spring and Apache Geode communities for the delay, relative to the Apache Geode [M3 release announcement](http://markmail.org/search/?q=list%3Aorg.apache.geode.user+order%3Adate-backward#query:list%3Aorg.apache.geode.user%20order%3Adate-backward%20from%3A%22Anthony%20Baker%22+page:1+mid:bkuiicogrvqb34oo+state:results), but I am very excited and pleased to follow that with the release of Spring Data for [Apache Geode 1.0.0-incubating.M3](http://geode.incubator.apache.org/releases/).

You can get the bits from [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cgeode) by including the following dependency in either your application Maven or Gradle build files ...

#### [](#maven)Maven

```xml
Copy<dependency>
  <groupId>org.springframework.data</groupId>
  <artifactId>spring-data-geode</artifactId>
  <version>1.0.0.APACHE-GEODE-INCUBATING-M3</version>
</dependency>
```

#### [](#gradle)Gradle

```groovy
Copycompile 'org.springframework.data:spring-data-geode:1.0.0.APACHE-GEODE-INCUBATING-M3'
```

Including the `spring-data-geode` dependency will transitively pull in all required Apache Geode artifacts so you can start building Spring applications that use Apache Geode today.

## [](#whats-new)What's New

While not much functionally changed between Apache Geode M2 and M3 (mainly [bug fixes](https://cwiki.apache.org/confluence/display/GEODE/1.0.0-incubating.M3+Release)), many things did [change](https://github.com/spring-projects/spring-data-gemfire/blob/1.0.0.APACHE-GEODE-INCUBATING-M3/src/main/resources/changelog.txt#L7-L52) in *Spring Data Geode*. One key feature stands above all the rest.

## [](#setting-the-stage)Setting the Stage

Because the focus of [Apache Geode](http://geode.incubator.apache.org/) (and by extension, [Pivotal GemFire](https://pivotal.io/big-data/pivotal-gemfire)) has always been to provide enough functional breadth and flexibility to address a wide array of [complex customer requirements and use cases](https://pivotal.io/big-data/pivotal-gemfire) (click "*Use Cases*"), it has made it difficult for users to get up and running as quickly, and as easily as possible. And, though it has much stronger consistency guarantees, and often times, better performance, it is hard to compete with the *out-of-box* experience when using alternative, comparable solutions.

To gain more insight into the problem along with how we are focused on resolving it for Apache Geode and Pivotal GemFire, checkout my talk in the August, [Apache Geode Clubhouse Meeting](https://www.youtube.com/watch?v=6SdNawIJi_c&feature=youtu.be).

## [](#problemsolution)Problem/Solution

The problem has been rooted in the fact that Apache Geode has lacked an opinionated and consistent programming/configuration model, particularly for application development. So really, we don't need to look any further than the [Spring Framework](http://projects.spring.io/spring-framework/). However, that still leaves "opinion".

Once again, Spring gives us [Spring Boot](http://projects.spring.io/spring-boot/), and what a beautiful piece of engineering it is, so elegant, so simple. And, as you will see below, it has truly been an inspiration for the work on *Spring Data Geode*.

## [](#shut-up-and-show-me-the-code)Shut Up and Show Me "The Code"...

In the past, Spring developers had to configure Geode with either [XML](https://github.com/jxblum/contacts-application/blob/master/configuration-example/src/test/resources/example/config/spring/xml/HazelcastApiExampleTests-context.xml), or [Java config](https://github.com/jxblum/contacts-application/blob/master/configuration-example/src/test/java/example/config/spring/java/HazelcastApiExampleTests.java#L62-L79), and then use a bootstrapping mechanism, like [*Gfsh*](http://geode.docs.pivotal.io/docs/tools_modules/gfsh/command-pages/start.html#topic_3764EE2DB18B4AE4A625E0354471738A), or *Spring Boot*, to get up and running. This has even been demonstrated in the [guides](https://spring.io/guides/gs/accessing-data-gemfire/). Neither one was really a significant advantage over the other until now.

From this milestone release onward, *Spring Data Geode* will include a new [set of annotations](https://github.com/spring-projects/spring-data-gemfire/tree/apache-geode/src/main/java/org/springframework/data/gemfire/config/annotation), very similar in form/function, and complimentary to, *Spring Boot* annotations, but specifically for SD/Apache Geode, with 1 simple goal in mind...

> Simply the *out-of-box* experience in order to get users **up and running** as **quickly** and **easily** as possible

So, let's take our XML and Java config example and do it one more time...

```java
Copy@SpringBootApplication
@PeerCacheApplication
@WithReplicateRegions("myDistributedMap")
public class ExampleApplication implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(ExampleApplication.class, args);
  }

  @Resource(name = "myDistributedMap")
  private Region<String, String> myDistributedMap;

  @Override
  public void run(String... strings) throws Exception {
    assertThat(myDistributedMap.put("key", "value")).isNull();
    assertThat(myDistributedMap.get("key")).isEqualTo("value");
    assertThat(myDistributedMap.putIfAbsent("somekey", "somevalue")).isNull();
    assertThat(myDistributedMap.replace("key", "value", "newvalue")).isTrue();
  }
}
```

Pretty easy. This example is rather simplistic, but you can probably imagine some application configurations (for [example](https://github.com/jxblum/contacts-application/tree/master/repository-example/src/main/java/example/app/config); just follow the hierarchy) becoming pretty involved rather quickly.

This is a teaser for now, so stay tuned for more.

## [](#conclusion)Conclusion

There will be many different annotations to address all the unique concerns in a consistent and robust way, providing out-of-box defaults along with many convenient, "enabling" features. Many of the details of this new *Annotation* configuration model are still a work in progress, such as proper examples and documentation.

In the interim, I have started the beginnings of a [reference implementation](https://github.com/jxblum/contacts-application) that will showcase many of the features and functionality of using Spring and Apache Geode together (like the new [Annotation configuration model](https://github.com/jxblum/contacts-application/tree/master/configuration-example)).

Look for more communications from us down the road soon.

As always, feedback is most welcomed, and you can reach out to us in [JIRA](https://jira.spring.io/browse/SGF) or on [StackOverflow](http://stackoverflow.com/questions/tagged/spring-data-gemfire).

Thanks all!