---
title: Dynamic DataSource Routing
source: https://spring.io/blog/2007/01/23/dynamic-datasource-routing
scraped: 2026-02-24T09:32:15.802Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  January 23, 2007 | 23 Comments
---

# Dynamic DataSource Routing

_Engineering | Mark Fisher |  January 23, 2007 | 23 Comments_

Spring 2.0.1 introduced an `AbstractRoutingDataSource`. I believe that it deserves attention, since (based on frequent questions from clients) I have a hunch that there are quite a few 'home-grown' solutions to this problem floating around. That combined with the fact that it is trivial to implement yet easy to overlook, and now I have several reasons to dust off my corner of the team blog.

The general idea is that a routing `DataSource` acts as an intermediary - while the 'real' DataSource can be determined dynamically at runtime based upon a lookup key. One potential use-case is for ensuring transaction-specific isolation levels which are not supported by standard JTA. For that, Spring provides an implementation: `IsolationLevelDataSourceRouter`. Consult its JavaDoc for a detailed description including configuration examples.

Another interesting use-case is determination of the DataSource based on some attribute of the current user's context. What follows is a rather contrived example to demonstrate this idea.

First, I created a `Catalog` that extends Spring 2.0's `SimpleJdbcDaoSupport`. That base class only requires an instance of any implementation of `javax.sql.DataSource`, and then it creates a `SimpleJdbcTemplate` for you. Since it extends `JdbcDaoSupport`, the `JdbcTemplate` is also available. However, the "simple" version provides many nice Java 5 conveniences. You can read more detail about that in [this blog](https://spring.io/blog/2006/11/28/simplejdbctemplate-spring-2-0-and-java-5) by Ben Hale.

Anyways, here's the code for my `Catalog`:

```java
Copypackage blog.datasource;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcDaoSupport;

public class Catalog extends SimpleJdbcDaoSupport {
	
   public List<Item> getItems() {
      String query = "select name, price from item";
      return getSimpleJdbcTemplate().query(query, new ParameterizedRowMapper<Item>() {
            public Item mapRow(ResultSet rs, int row) throws SQLException {
               String name = rs.getString(1);
               double price = rs.getDouble(2);
               return new Item(name, price);
            }
      });
   }
}
```

As you can see, the `Catalog` simply returns a list of `item` objects. The `Item` just contains name and price properties:

```java
Copypackage blog.datasource;

public class Item {

   private String name;
   private double price;
	
   public Item(String name, double price) {
      this.name = name;
      this.price = price;
   }

   public String getName() {
      return name;
   }

   public double getPrice() {
      return price;
   }

   public String toString() {
      return name + " (" + price + ")";
   }

}
```

Now, in order to demonstrate multiple DataSources, I created an enum for different Customer types (representing "levels" of membership I guess), and I created three different databases - so that each type of customer would get a distinct item list (I did mention that this would be a contrived example didn't I?). The important thing is that each of the databases are equivalent in terms of the schema. That way the Catalog's query will work against any of them - just returning different results. In this case, it's just the "item" table with 2 columns: name and price. And... here is the enum:

```java
Copypublic enum CustomerType {
   BRONZE, 
   SILVER, 
   GOLD
}
```

It's time to create some bean definitions. Since I have 3 datasources where everything is the same except for the port number, I created a parent bean so that the shared properties can be inherited. Then, I added the 3 bean definitions to represent the per-CustomerType DataSources:

```xml
Copy<bean id="parentDataSource"
         class="org.springframework.jdbc.datasource.DriverManagerDataSource"
         abstract="true">
   <property name="driverClassName" value="org.hsqldb.jdbcDriver"/>
   <property name="username" value="sa"/>
</bean>
		
<bean id="goldDataSource" parent="parentDataSource">
   <property name="url" value="jdbc:hsqldb:hsql://localhost:${db.port.gold}/blog"/>
</bean>

<bean id="silverDataSource" parent="parentDataSource">
   <property name="url" value="jdbc:hsqldb:hsql://localhost:${db.port.silver}/blog"/>
</bean>

<bean id="bronzeDataSource" parent="parentDataSource">
   <property name="url" value="jdbc:hsqldb:hsql://localhost:${db.port.bronze}/blog"/>
</bean>

<bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
   <property name="location" value="classpath:/blog/datasource/db.properties"/>
</bean>	
```

Notice that I added a `PropertyPlaceholderConfigurer` so that I could externalize the port numbers in a "db.properties" file, like so:

db.port.gold=9001
db.port.silver=9002
db.port.bronze=9003

Now things start to get interesting. I need to supply the "routing" DataSource to my `Catalog` so that it can dynamically get connections from the 3 different databases at runtime based on the current customer's type. As I mentioned, the `AbstractRoutingDataSource` can be rather simple to implement. Here is my implementation:

```java
Copypackage blog.datasource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class CustomerRoutingDataSource extends AbstractRoutingDataSource {

   @Override
   protected Object determineCurrentLookupKey() {
      return CustomerContextHolder.getCustomerType();
   }
}
```

...and the `CustomerContextHolder` simply provides access to a thread-bound `CustomerType`. In reality, the 'context' would likely hold more information about the customer. Also note that if you are using Spring Security, then you could retrieve some information from the userDetails. For this example, it's just the customer "type":

```java
Copypublic class CustomerContextHolder {

   private static final ThreadLocal<CustomerType> contextHolder = 
            new ThreadLocal<CustomerType>();
	
   public static void setCustomerType(CustomerType customerType) {
      Assert.notNull(customerType, "customerType cannot be null");
      contextHolder.set(customerType);
   }

   public static CustomerType getCustomerType() {
      return (CustomerType) contextHolder.get();
   }

   public static void clearCustomerType() {
      contextHolder.remove();
   }
}
```

Finally, I just need to configure the catalog and routing DataSource beans. As you can see, the "real" DataSource references are provided in a Map. If you provide Strings, they can be resolved as JNDI names (or any custom resolution strategy can be provided - see the JavaDoc). Also, I've simply set the 'bronzeDataSource' as the default:

```xml
Copy<bean id="catalog" class="blog.datasource.Catalog">
   <property name="dataSource" ref="dataSource"/>
</bean>

<bean id="dataSource" class="blog.datasource.CustomerRoutingDataSource">
   <property name="targetDataSources">
      <map key-type="blog.datasource.CustomerType">
         <entry key="GOLD" value-ref="goldDataSource"/>
         <entry key="SILVER" value-ref="silverDataSource"/>
      </map>
   </property>
   <property name="defaultTargetDataSource" ref="bronzeDataSource"/>
</bean>
```

Of course I'd like to see this working, so I've created a simple test (extending one of Spring's integration test support classes). I added 3 items to the "gold" database, 2 items to the "silver" database, and only 1 item to the "bronze" database. This is the test:

```java
Copypublic class CatalogTests extends AbstractDependencyInjectionSpringContextTests {

   private Catalog catalog;

   public void setCatalog(Catalog catalog) {
      this.catalog = catalog;
   }

   public void testDataSourceRouting() {
      CustomerContextHolder.setCustomerType(CustomerType.GOLD);
      List<Item> goldItems = catalog.getItems();
      assertEquals(3, goldItems.size());
      System.out.println("gold items: " + goldItems);

      CustomerContextHolder.setCustomerType(CustomerType.SILVER);
      List<Item> silverItems = catalog.getItems();
      assertEquals(2, silverItems.size());
      System.out.println("silver items: " + silverItems);
	
      CustomerContextHolder.clearCustomerType();
      List<Item> bronzeItems = catalog.getItems();
      assertEquals(1, bronzeItems.size());
      System.out.println("bronze items: " + bronzeItems);		
   }

   protected String[] getConfigLocations() {
      return new String[] {"/blog/datasource/beans.xml"};
   }	
}
```

...and rather than simply taking a screenshot of the green bar, you'll notice I've provided some console output - the results!:

gold items: \[gold item #1 (250.0), gold item #2 (325.45), gold item #3 (55.6)\]
silver items: \[silver item #1 (25.0), silver item #2 (15.3)\]
bronze items: \[bronze item #1 (23.75)\]

As you can see, the configuration is simple. Better still, the data-access code is not concerned with looking up different DataSources. For more information, consult the JavaDoc for `AbstractRoutingDataSource`.