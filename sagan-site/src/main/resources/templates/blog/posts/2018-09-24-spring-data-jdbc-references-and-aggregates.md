---
title: Spring Data JDBC, References, and Aggregates
source: https://spring.io/blog/2018/09/24/spring-data-jdbc-references-and-aggregates
scraped: 2026-02-23T09:27:12.680Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  September 24, 2018 | 25 Comments
---

# Spring Data JDBC, References, and Aggregates

_Engineering | Jens Schauder |  September 24, 2018 | 25 Comments_

In my previous [blog article](/blog/2018/09/17/introducing-spring-data-jdbc), I described how to set up and use Spring Data JDBC. I also described the premise of making Spring Data JDBC easier to understand than JPA. This becomes interesting once you consider references. As a first example, consider the following domain model:

```
Copyclass PurchaseOrder {

  private @Id Long id;
  private String shippingAddress;
  private Set<OrderItem> items = new HashSet<>();

  void addItem(int quantity, String product) {
    items.add(createOrderItem(quantity, product));
  }

  private OrderItem createOrderItem(int quantity, String product) {

    OrderItem item = new OrderItem();
    item.product = product;
    item.quantity = quantity;
    return item;
  }
}

class OrderItem {
  int quantity;
  String product;
}
```

Additionally, consider a repository defined as follows:

```
Copyinterface OrderRepository extends CrudRepository<PurchaseOrder, Long> {

  @Query("select count(*) from order_item")
  int countItems();
}
```

If you create an order with items, you probably expect all of it to get persisted. And that is exactly what happens:

```
Copy@Autowired OrderRepository repository;

@Test
public void createUpdateDeleteOrder() {

  PurchaseOrder order = new PurchaseOrder();
  order.addItem(4, "Captain Future Comet Lego set");
  order.addItem(2, "Cute blue angler fish plush toy");

  PurchaseOrder saved = repository.save(order);

  assertThat(repository.count()).isEqualTo(1);
  assertThat(repository.countItems()).isEqualTo(2);
  …
```

Also, if you delete the `PurchaseOrder`, all its items should get deleted as well. Again, that’s the way it is.

```
Copy  …
  repository.delete(saved);

  assertThat(repository.count()).isEqualTo(0);
  assertThat(repository.countItems()).isEqualTo(0);
}
```

But what if we consider a syntactically identical but semantical different relationship?

```
Copyclass Book {
  // …
  Set<Author> authors = new HashSet<>();
}
```

When a Book goes out of print, you delete it. And gone are all the Authors. Certainly not what you intended, since some of the Authors probably wrote other books as well. Now, this doesn’t make sense. Or does it? I think it does.

In order to understand why this does make sense, we need to take a step back and take a look at what repositories actually persist. This is closely related to a question that comes up over and over again: [Are you supposed to have one repository per table in JPA?](https://stackoverflow.com/questions/21265262/are-you-supposed-to-have-one-repository-per-table-in-jpa)

And the [correct and authoritative answer](https://stackoverflow.com/a/21277087/66686) is "NO". Repositories persist and load aggregates. An aggregate is a cluster of objects that form a unit, which should always be consistent. Also, it should always get persisted (and loaded) together. It has a single object, called the aggregate root, which is the only thing allowed to touch or reference the internals of the aggregate. The aggregate root is what gets passed to the repository in order to persist the aggregate.

This brings up the question: How does Spring Data JDBC determine what is part of the aggregate and what isn’t? The answer is very simple: Everything you can reach from an aggregate root by following non-transient references is part of the aggregate.

With this in mind, the behavior of the `OrderRepository` makes perfect sense. `OrderItem` instances are part of the aggregate and, therefore, get deleted. `Author` instances, conversely, are not part of the `Book` aggregate and, therefore, should not get deleted. So they should simply not get referenced from the `Book` class.

Problem solved. Well, … not really. We still need to store and access the information about the relationship between `Book` and `Author`. The answer can again be found in Domain Driven Design (DDD), which recommends using IDs instead of direct references. This applies to all kinds of many-to-x relationships.

**If multiple aggregates reference the same entity, that entity can’t be part of those aggregates referencing it since it only can be part of exactly one aggregate. Therefore any Many-to-One and Many-to-Many relationship must be modeled by just referencing the id.**

If you apply this, you achieve multiple things:

1.  You clearly denote the boundaries of the aggregate.
    
2.  You also completely decouple (at least in the domain model of your application) the two aggregates involved.
    
3.  This separation can be represented in the database in different ways:
    
    1.  Leave the database the way it normally would be, including all the foreign keys. This means you have to make sure that you create and persist the aggregates in the correct order.
        
    2.  Use deferred constraints, which only get checked during the commit phase of a transaction. This might enable higher throughput. It also codifies a version of eventual consistency where "eventually" is tied to the end of the transaction. This also allows referencing aggregates that never exist, as long as it only happens during a transaction. That might be useful for avoiding large amounts of infrastructure code just to satisfy foreign keys and not-null-constraints.
        
    3.  Remove the foreign key completely, allowing for real eventual consistency.
        
    4.  Persist the referenced aggregate in a different database, possibly even a No SQL store.
        

However far you take the separation, even the minimum one enforced by Spring Data JDBC encourages modularization of your application. Also, if you have tried to migrate a truly monolithic 10-year-old application, you understand how valuable that can be.

With Spring Data JDBC, you’d model the many-to-many relationship like this:

```
Copyclass Book {

  private @Id Long id;
  private String title;
  private Set<AuthorRef> authors = new HashSet<>();

  public void addAuthor(Author author) {
    authors.add(createAuthorRef(author));
  }

  private AuthorRef createAuthorRef(Author author) {

    Assert.notNull(author, "Author must not be null");
    Assert.notNull(author.id, "Author id, must not be null");

    AuthorRef authorRef = new AuthorRef();
    authorRef.author = author.id;
    return authorRef;
  }
}

@Table("Book_Author")
class AuthorRef {
  Long author;
}

class Author {
  @Id Long id;
  String name;
}
```

Note the extra class (`AuthorRef`), which represents the knowledge of the Book aggregate about the authors. It might contain additional aggregated information about the author, which then would actually be duplicated in the database. This makes a lot of things, considering that the author-database might be completely different from the book-database.

Also, note that the set of authors is a private field and the instantiation of `AuthorRef` instances happens in a private method. So nothing outside the aggregate can access it directly. This is in no way required by Spring Data JDBC, but it is encouraged by DDD. The domain would be used like this:

```
Copy@Test
public void booksAndAuthors() {

  Author author = new Author();
  author.name = "Greg L. Turnquist";

  author = authors.save(author);

  Book book = new Book();
  book.title = "Spring Boot";
  book.addAuthor(author);

  books.save(book);

  books.deleteAll();

  assertThat(authors.count()).isEqualTo(1);
}
```

To wrap it up: Spring Data JDBC does not support many-to-one or many-to-many relationships. In order to model these, use IDs. This encourages a clean modularization of the domain model. It also removes a whole type of questions that one would have to solve and learn to reason about if such a mapping were possible.

By a similar line of thought, avoid bidirectional dependencies. References inside an aggregate go from the aggregate root toward the elements. References between aggregates are represented by IDs in one direction. Also, if you need to navigate the inverse direction, use a query method in a repository. This makes it unmistakably clear which aggregate is responsible for maintaining the reference.

The following is the database structure used by the examples.

```
CopyPurchase_Order (
  id
  shipping_address
)

Order_Item (
  purchase_order
  quantity
  product
);

Book (
  id
  title
)

Author (
  id
  name
)

Book_Author (
  book
  author
)
```