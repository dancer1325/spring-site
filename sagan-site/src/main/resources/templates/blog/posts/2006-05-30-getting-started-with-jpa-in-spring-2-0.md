---
title: Getting Started With JPA in Spring 2.0
source: https://spring.io/blog/2006/05/30/getting-started-with-jpa-in-spring-2-0
scraped: 2026-02-24T09:37:16.945Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  May 30, 2006 | 0 Comments
---

# Getting Started With JPA in Spring 2.0

_Engineering | Mark Fisher |  May 30, 2006 | 0 Comments_

The motivation behind this blog entry is to provide a simple step-by-step guide for getting started with JPA in a *standalone* environment with the Spring Framework. While the JPA specification originated as the persistence mechanism *for EJB 3.0*, it was fortunately recognized that any such mechanism should in fact be able to persist simple POJOs. Therefore, with a handful of JARs in your classpath and a few Spring-configured beans, you can begin experimenting with JPA code within your favorite IDE. I will be using Glassfish JPA - which is the reference implementation and is based upon Oracle's TopLink ORM framework.

## Initial Setup

Ensure that you are using Java 5 (a prerequisite for JPA as well as EJB 3.0).

Download the glassfish JPA jar from: [](https://glassfish.dev.java.net/downloads/persistence/JavaPersistence.html)[https://glassfish.dev.java.net/downloads/persistence/JavaPersistence.html](https://glassfish.dev.java.net/downloads/persistence/JavaPersistence.html) (NOTE: I used the “V2\_build\_02â³ jar, but any later version should also work.)

To unbundle the jar from the “installer” jar, run: java -jar glassfish-persistence-installer-v2-b02.jar (this is required for acceptance of the license agreement)

Add the toplink-essentials.jar to your classpath

Add the JAR containing your database driver (I am using hsqldb.jar version 1.8.0.1 in the example, but only minor changes are necessary to adapt for another database).

Add the following Spring JARs using the 2.0 M5 versions (available here: [](http://sourceforge.net/project/showfiles.php?group_id=73357)[http://sourceforge.net/project/showfiles.php?group\_id=73357](http://sourceforge.net/project/showfiles.php?group_id=73357)).

-   spring.jar
-   spring-jpa.jar
-   spring-mock.jar

Finally, add these jars to your classpath as well:

-   commons-logging.jar
-   log4j.jar
-   junit.jar

## Code - Domain Model

This example will be based on a purposefully simple domain model of just 3 classes. Notice the use of annotations. With JPA, one may choose to use either annotations or an XML file to specify the object-relational mapping metadata - or even a combination of both approaches. Here, I have chosen to use solely annotations - for which brief descriptions will be provided immediately following the domain model code listings.

First, the Restaurant class:

```java
Copy
package blog.jpa.domain;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

@Entity
public class Restaurant {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String name;

  @OneToOne(cascade = CascadeType.ALL)
  private Address address;

  @ManyToMany
  @JoinTable(inverseJoinColumns = @JoinColumn(name = "ENTREE_ID"))
  private Set<Entree> entrees;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public Set<Entree> getEntrees() {
    return entrees;
  }

  public void setEntrees(Set<Entree> entrees) {
    this.entrees = entrees;
  }

}
```

Second, the Address class:

```java
Copy
package blog.jpa.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(name = "STREET_NUMBER")
  private int streetNumber;

  @Column(name = "STREET_NAME")
  private String streetName;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public int getStreetNumber() {
    return streetNumber;
  }

  public void setStreetNumber(int streetNumber) {
    this.streetNumber = streetNumber;
  }

  public String getStreetName() {
    return streetName;
  }

  public void setStreetName(String streetName) {
    this.streetName = streetName;
  }

}
```

Third, the Entree class:

```java
Copy
package blog.jpa.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Entree {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String name;

  private boolean vegetarian;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public boolean isVegetarian() {
    return vegetarian;
  }

  public void setVegetarian(boolean vegetarian) {
    this.vegetarian = vegetarian;
  }

}
```

As you can see, not every persistent field has been annotated. JPA uses defaults (such as using a column name that matches the property name exactly) so that in many cases you do not need to specify the metadata explicitly. However, you may still choose to do so in order to provide more thoroughly self-documenting code. Notice that in the Entree class I am not using annotations for the String property “name” or the boolean property “vegetarian”. However, in the Address class, I am using the annotations, because I want to have a non-default name for the columns in the database (for example, I have chosen “STREET\_NAME” whereas the default would have been “STREETNAME”).

Of course, one of the most important features of any ORM mechanism is the way in which one specifies the mapping from relationships between Objects to their database counterparts. In the Restaurant class, there is a @OneToOne annotation to describe the relationship to an Address and a @ManyToMany annotation to describe the relationship with members of the Entree class. Since instances of these other classes are also being managed by the EntityManager, it is possible to specify “cascade” rules. For example, when a Restaurant is deleted, the associated Address will also be deleted. In a moment, you will see a testcase for this scenario.

Finally, take a look at the @Id annotations and the specified “strategy” for the ID's @GeneratedValue. This metadata is used for describing the *primary key* generation strategy which in turn controls the identity within the database.

To learn much more about these and additional JPA annotations, check out the JPA specification - which is actually a subset of [JSR-220](http://www.jcp.org/en/jsr/detail?id=220).

## Code - Data Access Layer

For accessing instances of the domain model, it is best to create a generic interface that hides all details about the underlying persistence mechanism. That way, if switching later to something other than JPA, there will be no impact on the architecture. This also makes it easier to test the service layer, since it enables the creation of stub implementations of this data access interface - or even dynamic mock implementations.

Here is the interface. Notice that there are no dependencies on any JPA or Spring classes. In fact, the only dependencies here that are not core Java classes are the classes of my domain model (in this simple case, there is only one - Restaurant):

```java
Copy
package blog.jpa.dao;

import java.util.List;
import blog.jpa.domain.Restaurant;

public interface RestaurantDao {

  public Restaurant findById(long id);

  public List<Restaurant> findByName(String name);

  public List<Restaurant> findByStreetName(String streetName);

  public List<Restaurant> findByEntreeNameLike(String entreeName);

  public List<Restaurant> findRestaurantsWithVegetarianEntrees();

  public void save(Restaurant restaurant);

  public Restaurant update(Restaurant restaurant);

  public void delete(Restaurant restaurant);

}
```

For the implementation of this interface, I am going to extend Spring's JpaDaoSupport class. This provides a convenience method for retrieving the JpaTemplate. If you have used Spring with JDBC or other ORM technologies, then you will probably be quite familiar with this approach.

It should be noted that use of the JpaDaoSupport is optional. It is possible to construct a JpaTemplate directly by simply providing the EntityManagerFactory to its constructor. In fact, the JpaTemplate itself is optional. If you do not wish to have the automatic translation of JPA exceptions into Spring's runtime exception hierarchy, then you can avoid JpaTemplate altogether. In that case, you may still be interested in Spring's EntityManagerFactoryUtils class which provides a convenient static method for obtaining the shared (and thus transactional) EntityManager.

Here is the implementation:

```java
Copy
package blog.jpa.dao;

import java.util.List;
import org.springframework.orm.jpa.support.JpaDaoSupport;
import blog.jpa.domain.Restaurant;

public class JpaRestaurantDao extends JpaDaoSupport implements RestaurantDao {

  public Restaurant findById(long id) {
    return getJpaTemplate().find(Restaurant.class, id);
  }

  public List<Restaurant> findByName(String name) {
    return getJpaTemplate().find("select r from Restaurant r where r.name = ?1", name);
  }

  public List<Restaurant> findByStreetName(String streetName) {
    return getJpaTemplate().find("select r from Restaurant r where r.address.streetName = ?1", streetName);
  }

  public List<Restaurant> findByEntreeNameLike(String entreeName) {
    return getJpaTemplate().find("select r from Restaurant r where r.entrees.name like ?1", entreeName);
  }

  public List<Restaurant> findRestaurantsWithVegetarianEntrees() {
    return getJpaTemplate().find("select r from Restaurant r where r.entrees.vegetarian = 'true'");
  }

  public void save(Restaurant restaurant) {
    getJpaTemplate().persist(restaurant);
  }

  public Restaurant update(Restaurant restaurant) {
    return getJpaTemplate().merge(restaurant);
  }

  public void delete(Restaurant restaurant) {
    getJpaTemplate().remove(restaurant);
  }

}
```

## The Service Layer

As the purpose here is to focus on a JPA implementation for the data-access layer, the service layer is omitted. Obviously, in a realistic scenario, the service layer would play a critical role in the system architecture. It would be the point where transactions are demarcated - and typically, they would be demarcated declaratively in the Spring configuration. In the next step, when you have a look at the configuration, you will notice that I have provided a “transactionManager” bean. It is used by the base test class to automatically wrap each test method in a transaction, and it is the same “transactionManager” that would wrap service layer methods with transactions. The main point to take away is that there is NO transaction-related code in the data-access tier. Using the Spring JpaTemplate ensures that the same EntityManager is shared across all DAOs. Therefore transaction propagation occurs automatically - as dictated by the service layer. In other words, it will actually behave exactly the same as other persistence mechanisms configured within the Spring framework. There is nothing JPA-specific - hence the rationale for leaving it out of this entry which is focused on JPA.

## Configuration

Since I opted for the annotation-based mappings, you have actually already seen most of the JPA-specific configuration when the domain classes were presented. As mentioned above, it also would have been possible to configure those mappings via XML (in an âorm.xml' file). The only other required configuration is in âMETA-INF/persistence.xml'. In this case, that is very simple since the database-related properties will be available to the EntityManagerFactory via a dependency-injected “dataSource” provided in the Spring configuration (due up next). The only other information in this âpersistence.xml' is whether to use local or global (JTA) transactions. Here are the contents of the âpersistence.xml' file:

```xml
Copy
<persistence xmlns="http://java.sun.com/xml/ns/persistence" version="1.0">

  <persistence-unit name="SpringJpaGettingStarted" transaction-type="RESOURCE_LOCAL"/>

</persistence>
```

There are only 4 beans in the Spring configuration (well ok, a couple of inner-beans too). First, there is the “restaurantDao” (I purposefully left “jpa” out of the bean name since any service layer beans depending on the DAO should only be concerned with the generic interface). The only required property for the JPA implementation of this DAO is the “entityManagerFactory” which it uses to create the JpaTemplate. The “entityManagerFactory” depends on the “dataSource”, and there is nothing JPA-specific about that. In this configuration, you will see a DriverManagerDataSource, but in production code, this would be replaced by a connection pool - and typically one obtained via a JndiObjectFactoryBean (or Spring 2.0's new convenience [jndi:lookup](jndi:lookup) tag). The final bean is the “transactionManager” that is required by the test class. This is the same “transactionManager” that would be used for transactions demarcated in the service-layer. The implementation class is Spring's JpaTransactionManager. To anyone familiar with configuring Spring for JDBC, Hibernate, JDO, TopLink, or iBATIS, most of these beans will look very familiar. The only exception is the EntityManagerFactory. I will discuss it briefly, but first have a look at the complete âapplicationContext.xml' file:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="restaurantDao" class="blog.jpa.dao.JpaRestaurantDao">
    <property name="entityManagerFactory" ref="entityManagerFactory"/>
  </bean>

  <bean id="entityManagerFactory" class="org.springframework.orm.jpa.ContainerEntityManagerFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <property name="jpaVendorAdapter">
      <bean class="org.springframework.orm.jpa.vendor.TopLinkJpaVendorAdapter">
        <property name="showSql" value="true"/>
        <property name="generateDdl" value="true"/>
        <property name="databasePlatform" value="oracle.toplink.essentials.platform.database.HSQLPlatform"/>
      </bean>
    </property>
    <property name="loadTimeWeaver">
      <bean class="org.springframework.instrument.classloading.SimpleLoadTimeWeaver"/>
    </property>
  </bean>

  <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="org.hsqldb.jdbcDriver"/>
    <property name="url" value="jdbc:hsqldb:hsql://localhost/"/>
    <property name="username" value="sa"/>
    <property name="password" value=""/>
  </bean>

  <bean id="transactionManager" class="org.springframework.orm.jpa.JpaTransactionManager">
    <property name="entityManagerFactory" ref="entityManagerFactory"/>
    <property name="dataSource" ref="dataSource"/>
  </bean>

</beans>
```

First you see that the “entityManagerFactory” needs to be aware of a “dataSource”. Next there is the “jpaVendorAdapter” as there are a variety of JPA implementations. In this case, I've configured the TopLinkJpaVendorAdapter as an inner bean, and it has a few properties of its own. There is a boolean property to specify whether SQL should be shown and another boolean property for the generation of DDL. Both of these have been set to “true” and thus the database schema will be automatically generated each time the tests are executed. This is rather convenient in the early development phase as it provides immediate feedback for experimentations in the mappings, column names, etc. The “databasePlatformClass” provides the necessary information of what particular database is being used. Finally, the “entityManagerFactory” has a property for a “loadTimeWeaver” that plays a role in the transformation of class files by JPA persistence providers in order to accomodate certain features such as lazy-loading.

## Integration Testing

Perhaps the best way to learn a new API is to write a bunch of testcases. The JpaRestaurantDaoTests class provides some basic tests. In order to learn more about JPA, modify the code and/or configuration and observe the impact on these tests. For example, try modifying the *cascade* settings - or the cardinality of the associations. Notice that JpaRestaurantDaoTests extends Spring's AbstractJpaTests. You may already be familiar with Spring's AbstractTransactionalDataSourceSpringContextTests. This class will behave the same way in that any database changes caused by the test methods will rollback by default. AbstractJpaTests actually does much more than that, but it is beyond the scope of this entry to go into those details. If interested, have a look at the source code for AbstractJpaTests.

Here is the JpaRestaurantDaoTests code:

```java
Copy
package blog.jpa.dao;

import java.util.List;
import org.springframework.test.jpa.AbstractJpaTests;
import blog.jpa.dao.RestaurantDao;
import blog.jpa.domain.Restaurant;

public class JpaRestaurantDaoTests extends AbstractJpaTests {

  private RestaurantDao restaurantDao;

  public void setRestaurantDao(RestaurantDao restaurantDao) {
    this.restaurantDao = restaurantDao;
  }

  protected String[] getConfigLocations() {
    return new String[] {"classpath:/blog/jpa/dao/applicationContext.xml"};
  }

  protected void onSetUpInTransaction() throws Exception {
    jdbcTemplate.execute("insert into address (id, street_number, street_name) values (1, 10, 'Main Street')");
    jdbcTemplate.execute("insert into address (id, street_number, street_name) values (2, 20, 'Main Street')");
    jdbcTemplate.execute("insert into address (id, street_number, street_name) values (3, 123, 'Dover Street')");

    jdbcTemplate.execute("insert into restaurant (id, name, address_id) values (1, 'Burger Barn', 1)");
    jdbcTemplate.execute("insert into restaurant (id, name, address_id) values (2, 'Veggie Village', 2)");
    jdbcTemplate.execute("insert into restaurant (id, name, address_id) values (3, 'Dover Diner', 3)");

    jdbcTemplate.execute("insert into entree (id, name, vegetarian) values (1, 'Hamburger', 0)");
    jdbcTemplate.execute("insert into entree (id, name, vegetarian) values (2, 'Cheeseburger', 0)");
    jdbcTemplate.execute("insert into entree (id, name, vegetarian) values (3, 'Tofu Stir Fry', 1)");
    jdbcTemplate.execute("insert into entree (id, name, vegetarian) values (4, 'Vegetable Soup', 1)");

    jdbcTemplate.execute("insert into restaurant_entree (restaurant_id, entree_id) values (1, 1)");
    jdbcTemplate.execute("insert into restaurant_entree (restaurant_id, entree_id) values (1, 2)");
    jdbcTemplate.execute("insert into restaurant_entree (restaurant_id, entree_id) values (2, 3)");
    jdbcTemplate.execute("insert into restaurant_entree (restaurant_id, entree_id) values (2, 4)");
    jdbcTemplate.execute("insert into restaurant_entree (restaurant_id, entree_id) values (3, 1)");
    jdbcTemplate.execute("insert into restaurant_entree (restaurant_id, entree_id) values (3, 2)");
    jdbcTemplate.execute("insert into restaurant_entree (restaurant_id, entree_id) values (3, 4)");
  }

  public void testFindByIdWhereRestaurantExists() {
    Restaurant restaurant = restaurantDao.findById(1);
    assertNotNull(restaurant);
    assertEquals("Burger Barn", restaurant.getName());
  }

  public void testFindByIdWhereRestaurantDoesNotExist() {
    Restaurant restaurant = restaurantDao.findById(99);
    assertNull(restaurant);
  }

  public void testFindByNameWhereRestaurantExists() {
    List<Restaurant> restaurants = restaurantDao.findByName("Veggie Village");
    assertEquals(1, restaurants.size());
    Restaurant restaurant = restaurants.get(0);
    assertEquals("Veggie Village", restaurant.getName());
    assertEquals("Main Street", restaurant.getAddress().getStreetName());
    assertEquals(2, restaurant.getEntrees().size());
  }

  public void testFindByNameWhereRestaurantDoesNotExist() {
    List<Restaurant> restaurants = restaurantDao.findByName("No Such Restaurant");
    assertEquals(0, restaurants.size());
  }

  public void testFindByStreetName() {
    List<Restaurant> restaurants = restaurantDao.findByStreetName("Main Street");
    assertEquals(2, restaurants.size());
    Restaurant r1 = restaurantDao.findByName("Burger Barn").get(0);
    Restaurant r2 = restaurantDao.findByName("Veggie Village").get(0);
    assertTrue(restaurants.contains(r1));
    assertTrue(restaurants.contains(r2));
  }

  public void testFindByEntreeNameLike() {
    List<Restaurant> restaurants = restaurantDao.findByEntreeNameLike("%burger");
    assertEquals(2, restaurants.size());
  }

  public void testFindRestaurantsWithVegetarianOptions() {
    List<Restaurant> restaurants = restaurantDao.findRestaurantsWithVegetarianEntrees();
    assertEquals(2, restaurants.size());
  }

  public void testModifyRestaurant() {
    String oldName = "Burger Barn";
    String newName = "Hamburger Hut";
    Restaurant restaurant = restaurantDao.findByName(oldName).get(0);
    restaurant.setName(newName);
    restaurantDao.update(restaurant);
    List<Restaurant> results = restaurantDao.findByName(oldName);
    assertEquals(0, results.size());
    results = restaurantDao.findByName(newName);
    assertEquals(1, results.size());
  }

  public void testDeleteRestaurantAlsoDeletesAddress() {
    String restaurantName = "Dover Diner";
    int preRestaurantCount = jdbcTemplate.queryForInt("select count(*) from restaurant");
    int preAddressCount = jdbcTemplate.queryForInt("select count(*) from address where street_name = 'Dover Street'");
    Restaurant restaurant = restaurantDao.findByName(restaurantName).get(0);
    restaurantDao.delete(restaurant);
    List<Restaurant> results = restaurantDao.findByName(restaurantName);
    assertEquals(0, results.size());
    int postRestaurantCount = jdbcTemplate.queryForInt("select count(*) from restaurant");
    assertEquals(preRestaurantCount - 1, postRestaurantCount);
    int postAddressCount = jdbcTemplate.queryForInt("select count(*) from address where street_name = 'Dover Street'");
    assertEquals(preAddressCount - 1, postAddressCount);
  }

  public void testDeleteRestaurantDoesNotDeleteEntrees() {
    String restaurantName = "Dover Diner";
    int preRestaurantCount = jdbcTemplate.queryForInt("select count(*) from restaurant");
    int preEntreeCount = jdbcTemplate.queryForInt("select count(*) from entree");
    Restaurant restaurant = restaurantDao.findByName(restaurantName).get(0);
    restaurantDao.delete(restaurant);
    List<Restaurant> results = restaurantDao.findByName(restaurantName);
    assertEquals(0, results.size());
    int postRestaurantCount = jdbcTemplate.queryForInt("select count(*) from restaurant");
    assertEquals(preRestaurantCount - 1, postRestaurantCount);
    int postEntreeCount = jdbcTemplate.queryForInt("select count(*) from entree");
    assertEquals(preEntreeCount, postEntreeCount);
  }
}
```

## Further Reading

JPA is a vast topic, and this blog has only scratched the surface - the main objective being to demonstrate the basic configuration of a JPA-based persistence implementation with Spring. Obviously this domain model is trivial in terms of Object-Relational mapping. However, once you have this working configuration, you will be able to extend the example here while exploring the ORM capabilities offered by JPA. I would highly encourage a closer look at the Spring JPA support via the JavaDoc and the Spring reference documentation. The 2.0 RC1 release contains an added sub-section on JPA within the ORM section of the reference document.

Here are a few helpful links:

[JSR-220](http://www.jcp.org/en/jsr/detail?id=220) (contains the JPA specification) [Glassfish JPA](https://glassfish.dev.java.net/javaee5/persistence/) (the reference implementation) [Kodo 4.0](http://commerce.bea.com/showproduct.jsp?family=KODO&major=4.0&minor=0) (BEA's JPA implementation based on Kodo) [Hibernate JPA Migration Guide](http://www.hibernate.org/371.html)