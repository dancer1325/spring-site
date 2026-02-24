---
title: What\'s new in Spring Data MongoDB 1.4 M1
source: https://spring.io/blog/2013/12/04/what-s-new-in-spring-data-mongodb-1-4-m1
scraped: 2026-02-24T07:50:00.096Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Thomas Darimont |  December 04, 2013 | 1 Comment
---

# What's new in Spring Data MongoDB 1.4 M1

_Engineering | Thomas Darimont |  December 04, 2013 | 1 Comment_

As the first milestone of the Spring Data release train Codd has now cooled down a little bit, I'd like to highlight some of the new features shipped with the MongoDB module.

## [](#spel-support-for-projections-in-aggregation-framework)SpEL support for projections in aggregation framework

Sometimes it can be pretty complicated to define arithmetic expressions within MongoDB aggregation framework projections.

Assume a part of an aggregation for an order is the gross price of it, effectively calculated using the following formula: `(netPrice * discountRate + fixedCharge) * taxRate`. With a discount rate of 0.8, a fixed charge of 1.2 and a tax rate of 1.19, the according `DBObject` to encode this formula with the MongoDB aggregation framework looks as follows:

```javascript
Copy{ "aggregate": "product",
  "pipeline": [
    { "$project": {
        "name": 1,
        "netPrice": 1,
        "grossPrice": {
          "$multiply": [ 
            { "$add": [ { "$multiply" : [ "$netPrice", 0.8 ] }, 1.2 ] }, 1.19
          ]
        }
      }
    }
  ]
}
```

With our new support for transforming SpEL expressions in appropriate MongoDB projection expressions this gets a lot easier, as you can effectively use the source formula as is:

```java
Copyimport static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
 
double discountRate = 0.8;
double fixedCharge = 1.2;
double taxRate = 1.19;
 
TypedAggregation<Product> agg = newAggregation(Product.class,
  project("name", "netPrice")
    .andExpression("(netPrice * [0]  + [1]) * [2]", 
      discountRate, fixedCharge, taxRate)
    .as("grossPrice")
);
 
AggregationResults<DBObject> result = mongoTemplate.aggregate(agg, DBObject.class);
List<DBObject> resultList = result.getMappedResults();
```

Under the covers we transform the parsed AST (Abstract Syntax Tree) of the SpEL expression into an appropriate MongoDB aggregation framework expression. Note that we referred to the previously declared variables by using the array index operator which refers to the varargs Object array, the `….andExpression(…)` takes as second parameter. You can find additional usage examples in the [unit tests](https://github.com/spring-projects/spring-data-mongodb/blob/1.4.0.M1/spring-data-mongodb/src/test/java/org/springframework/data/mongodb/core/aggregation/SpelExpressionTransformerUnitTests.java) for `SpelExpressionTransformer`.

## [](#auditing-configuration-with-java-config)Auditing configuration with Java Config

In this release we conquered the last feature of Spring Data modules that strictly required XML configuration - auditing. If you want to use auditing in your application all you have to do now is to use the new `@EnableMongoAuditing` annotation (or the equivalent for JPA respectively):

```java
Copy@Configuration
@EnableMongoAuditing
@EnableMongoRepositories
class Config {
 
  @Bean
  public MongoOperations mongoTemplate() throws Exception {
    MongoClient client = new MongoClient();
    return new MongoTemplate(new SimpleMongoDbFactory(client, "database"));
  }

  @Bean
  public MongoMappingContext mappingContext() {
    return new MongoMappingContext();
  }

  @Bean
  public AuditorAware<BusinessEntity> auditorProvider() {
    return new MongoAuditorProvider<BusinessEntity>();
  }
}
```

The infrastructure enabled through `@EnableMongoAuditing` will automatically pick up an `AuditorAware` instance available in the `ApplicationContext`. If you only want to get creation and modification dates set on your entities, there's no need to declare an `AuditorAware` bean.

## [](#redefine-behavior-of-crud-methods)Redefine behavior of CRUD Methods

Methods defined in `CrudRepository` are usually implemented by a store-specific class that provides the necessary behavior. However, you might want to override the execution of these methods by simple query executions. You can now annotate any of the CRUD methods with a `@Query` annotation to define the query expression that should be executed. For a MongoDB based repository this looks as follows:

```java
Copyinterface PersonRepository extends MongoRepository<Person, String> {

  @Query("{ 'username' : { $nin : [ 'admin' ] }}")
  List<Person> findAll();
}
```

This mechanism is available for all modules supporting the repository abstraction.

## [](#support-for-lazy-dbrefs)Support for lazy DBRefs

So far, properties of your domain model that were bound to MongoDB DBRefs were loaded eagerly, which caused some trouble if you had a bi-directional DBRef relationship between entities. You can now set a `lazy` attribute on a `@DBRef` annotation to declare a field to be resolved lazily. If we detect such a field when loading a document, we generate a proxy for the given object and resolve it when any method of the object is called (expect methods from `java.lang.Object`).

```java
Copyclass User{
    
  @DBRef(lazy = true) List<User> fans;
  // …
}
```

## [](#conclusion)Conclusion

This concludes this brief overview of some of the new features in the latest Codd release but there is a lot more to discover as you can see in our [curated changelog](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Codd).

Please see the [Spring Data MongoDB project page](https://github.com/spring-projects/spring-data-mongodb) for more information and links for downloads, documentation etc. We would appreciate users giving this milestone a spin.