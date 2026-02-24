---
title: Hyperic 4.5 Released
source: https://spring.io/blog/2010/11/10/hyperic-4-5-released
scraped: 2026-02-24T08:51:23.976Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jennifer Hickey |  November 10, 2010 | 0 Comments
---

# Hyperic 4.5 Released

_Engineering | Jennifer Hickey |  November 10, 2010 | 0 Comments_

After many months of development, I am proud to announce the release of [Hyperic 4.5](http://blog.hyperic.com/substantial-infrastructure-upgrade-in-hyperic-4-5-release). In this release, we migrated Hyperic from an EJB application running on JBoss to a Spring web application running on Tomcat. The detailed migration steps are covered in my [Case Study on Migrating Hyperic from EJB to Spring](http://www.slideshare.net/hyperic/hyperic-casestudy-jenniferhickey1up), originally presented at the recent SpringOne 2GX. In this post, I would like to highlight a few of my favorite things about the conversion.

## Improved testability

Switching to Spring allowed us to convert our existing Stateless Session EJBs to POJOs with autowired dependencies. This eliminated quite a bit of static JNDI lookup code that made unit testing so difficult. Spring also made integration testing significantly easier. Before the conversion, we had a handful of integration tests that each took several minutes to bootstrap an approximation of an EJB container. This process was cumbersome and error prone. Additionally, the tests often left the database in an inconsistent state, making it necessary to add database setup or tear down code, adding additional overhead to test execution time and occasionally causing inconsistent test results.

After the conversion, we were able to take advantage of Spring's integration testing support to test our new service layer of converted EJBs as well as their underlying DAOs. By simply adding a few annotations, we were able to bootstrap our entire application context in less than 30 seconds and run each test method in a dedicated transaction that was automatically rolled back at the end of the test. This support proved very valuable in allowing us to quickly increase our test coverage by 18% and 12% in our open source and enterprise codebases respectively.

```java
Copy
@Transactional
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath*:META-INF/spring/*-context.xml")
public class AppdefManagerTest  {

  @Autowired
  private AppdefManager appdefManager;

  @Before
  public void setUp() throws Exception {
      createPlatformType("TestPlatform", "test");
  }

  @Test
  public void testGetControllablePlatformTypes() throws Exception {
      Map<String, AppdefEntityID> platformTypes = appdefManager
          .getControllablePlatformTypes(subject);
      assertEquals(1, platformTypes.size());
      assertEquals("TestPlatform", platformTypes.keySet().iterator().next());
  }
}
```

## Reduced code complexity

Simply introducing Spring for dependency injection greatly simplified the code in many areas by eliminating verbose dependency lookup. However, there are many other places where introduction of Spring significantly improved the clarity of code, reducing the clutter of infrastructure and allowing us to focus on the true business logic. Two of my favorite examples of this in Hyperic are the usage of JmsTemplate for publishing JMS messages and JdbcTemplate for data access.

### Message Publishing Before

```java
Copy
public void publishMessage(String name, Serializable sObj) {
       TopicConnection conn = null;
       TopicSession session = null;
       if (_ic == null)
               _ic = new InitialContext();
            if (_factory == null)
               _factory = _ic.lookup(CONN_FACTORY_JNDI);
            TopicConnectionFactory tFactory = (TopicConnectionFactory) _factory;
            Topic topic = getTopic(name);
            if (topic != null) {
               // Now create a connection to send a message
               if (_tConn != null)
                   conn = _tConn;
               else
                   conn = tFactory.createTopicConnection();
               if (conn == null)
                   _log.error("TopicConnection cannot be created");
               if (_tSession != null)
                   session = _tSession;
               else
                   session = conn.createTopicSession(false,
                                                     Session.AUTO_ACKNOWLEDGE);
               // Create a publisher and publish the message
               TopicPublisher publisher = session.createPublisher(topic);
               ObjectMessage msg = session.createObjectMessage();
               msg.setObject(sObj);
               publisher.publish(msg);
       ...
}
```

### Message Publishing After

```java
Copy
public void publishMessage(String name, Serializable sObj) {
       eventsJmsTemplate.convertAndSend(name, sObj);
}
```

### Data Access Before

```java
Copy
public int getServicesCount(AuthzSubject subject) {
       Statement stmt = null;
       ResultSet rs = null;
       Integer subjectId = subject.getId();
        try {
           Connection conn = getDBConn();
           String sql = "SELECT COUNT(SVC.ID) FROM TBL_SERVICE";
           stmt = conn.createStatement();
           rs = stmt.executeQuery(sql);
           if (rs.next()) {
               return rs.getInt(1);
           }
       } catch (SQLException e) {
           log.error("Caught SQL Exception finding Services by type: " + e, e);
                    throw new SystemException(e);
       } finally {
           DBUtil.closeJDBCObjects(LOG_CTX, null, stmt, rs);
       }
       return 0;
}
```

### Data Access After

```java
Copy
public int getServicesCount(AuthzSubject subject) {
       return jdbcTemplate.queryForInt("SELECT COUNT(SVC.ID) FROM TBL_SERVICE");
   }
```

That's quite a weight loss plan! Simply by converting to Spring and not changing any functionality, we reduced both the open source and enterprise codebases by approximately 7%.

## Improved developer productivity

As mentioned above, the Spring support for integration testing allows us to bootstrap our entire application context in less than 30 seconds for end-to-end integration testing. This has been a huge time-saver when testing new features or debugging problems. When we do need to bring up the entire web application, the switch to Tomcat has improved our productivity by significantly decreasing startup time. A single developer coding and debugging an application now saves approximately 5 minutes of waiting each time he/she starts up the application. Considering that developer may restart the application 12 times a day, that frees up an entire hour per day to develop new features! Additionally, the cleaner code and improved unit testability has made it faster and easier to find and fix problems, and the flexible architecture makes it easier to add new features and enhancements.

These are just a few of the benefits provided by switching to Spring and Tomcat in this release. There are really just too many to list in a single blog post!

This release also contains monitoring and management for three of the VMware vFabric platform services, including [vFabric GemFire 6.5 distributed caching system](http://support.hyperic.com/display/EVO/Monitor+GemFire), [RabbitMQ enterprise messaging system](http://support.hyperic.com/display/EVO/Monitoring+RabbitMQ), and the new [vFabric tc Server](http://support.hyperic.com/display/EVO/SpringSource+tc+Runtime+6.0+server) 2.1 Java runtime server also released this week. Support for vFabric tc Server existed in previous releases of Hyperic; however, in 4.5 the plugin is now bundled with the Hyperic distributions, and is no longer a separate download. Look for more information on monitoring GemFire and RabbitMQ in a future blog post.

While migrating, we also took the opportunity to move our code repository from subversion to git. To download the source from the git code repository go to [](http://git.springsource.org/hq)[http://git.springsource.org/hq](http://git.springsource.org/hq). We also switched our build system from ant to maven. All of the Hyperic modules needed for development of custom plugins or features can now be downloaded from our maven repository at [](http://maven.hyperic.org/release)[http://maven.hyperic.org/release](http://maven.hyperic.org/release).

## Conclusion

I encourage you to download [Hyperic 4.5](http://www.hyperic.com/downloads) and/or [check out the code](http://git.springsource.org/hq). As always, community feedback through the [forums](http://forums.hyperic.com/jiveforums/index.jspa) is very much appreciated. We are looking forward to building on this easily extensible architecture that our conversion to Spring has provided. Stay tuned for more exciting enhancements!