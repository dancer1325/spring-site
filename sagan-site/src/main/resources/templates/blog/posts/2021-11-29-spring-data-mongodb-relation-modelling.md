---
title: Spring Data MongoDB - Relation Modelling
source: https://spring.io/blog/2021/11/29/spring-data-mongodb-relation-modelling
scraped: 2026-02-23T13:03:10.576Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  November 29, 2021 | 2 Comments
---

# Spring Data MongoDB - Relation Modelling

_Engineering | Christoph Strobl |  November 29, 2021 | 2 Comments_

MongoDB’s flexible schema allows for multiple patterns when it comes to modeling relationships between entities. Also, for many use cases, a denormalized data model (storing related data right within a single document) might be the best choice, because all information is kept in one place, so that the application requires fewer queries to fetch all data. However, this approach also has its downsides, such as potential data duplication, larger documents, and the maximum document size.

In general, MongoDB recommends using normalized data models when the advantages of embedding are neglected by the implications of duplication. In this blog post, we take a look at the different possibilities of linking documents with *manual references* and *DBRefs* when the need occurs to work with relations.

*DBRef* is MongoDB’s native element to express references to other documents with an explicit format `{ $db : …, $ref : …, $id : … }` that holds information about the target *database*, *collection*, and *id* value of the references element, best suited to link to documents distributed across different collections.

*Manual references*, on the other hand, are simpler in structure (by storing only the *id* of the referenced document), but are, therefore, not as flexible when it comes to mixed collection references.

Having set the terminology, let’s introduce well known domain types, such as `Book` and `Publisher`, and their obvious relation to one another:

```
Copyclass Book {
    private String isbn13;
    private String title;
    private int pages;
}

class Publisher {
    private String name;
    private String arconym;
    private int foundationYear;
}
```

Embedding the `Publisher` within each and every `Book` is not an appealing option, as it would lead to data duplication and put an unnecessary burden on storage and maintainability:

```
Copyclass Book {
    // ...
    private Publisher publisher;
}
```

Though this storage format allows for atomic updates and offers the most flexibility when it comes to querying for specific attributes, the repetition of the `Publisher` information, as shown in the snippet below, might not be worth this cost:

```
Copy{
    "_id" : "617cfb",
    "isbn13" : "978-0345503800",
    "title" : "The Warded Man",
    "pages" : 432,
    "publisher" : {
        "name" : "Del Rey Books",
        "arconym" : "DRB",
        "foundationYear" : 1977
    }
}
```

The same goes for embedding a collection of `Books` within the `Publisher`, which causes unnecessarily large documents. Normalizing the model and working with linked documents can mitigate the issue.

A first step is to determine the direction of the relation, to figure out which part of the relation needs to hold the reference, if not both. This decision will influence our lookup, storage, and query options available later on.

### [](#linking-with-dbrefs)[](#linking-with-dbrefs)Linking with DBRefs

In this case, the `Publisher` holds references to the associated `Books`. The idea is to store those references as an array within the `Publisher` document:

```
Copyclass Publisher {
    // ...
    @DBRef
    List<Book> books;
}
```

In the above snippet, the books property is annotated with `@DBRef`. This advises the Spring Data mapping layer to store elements of the property as MongoDB native `$dbref` elements, which looks like the following:

```
Copy{
    "_id" : "833f7d",
    "name" : "Del Rey Books",
    "arconym" : "DRB",
    "foundationYear" : 1977,
    "books" : [
        {
            "$ref" : "book",
            "$id" : "617cfb"
        },
        {
            "$ref" : "book",
            "$id" : "23e78f"
        }
    ]
}
```

Using the `@DBRef` annotation lets us reduce storage size by not repeating all `Publisher` information within the Book, which is good. Still, this approach has its downsides. The `Book` no longer holds information about the publisher, which may impact queries that look up `Books` by attributes of the `Publisher`. The lack of back reference from the `Book` to the publisher will also affect performance when looking up the `Publisher` for a given `Book`, since we now have to issue a query against the `Publisher` collection that matches a `Book.id` against the `books` field of a publisher, instead of heading directly for its *id*. Additionally the `books` array in `Publisher` uses a complex object that stores more information than necessary, whereas a *manual reference* that uses the *id* alone would have been sufficient, since all references objects are held in the same target collection.

Fortunately, there are ways to improve, starting with adding a back reference to the `Publisher`, (for example, by its `id`):

```
Copyclass Book {
    // …
    private String publisherId;
}
```

### [](#linking-with-manual-references)[](#linking-with-manual-references)Linking with Manual References

Next, let’s switch from *DBRef* to *manual references* for storing the collection of `Book` references. The obvious step would be to remove the `@DBRef` annotation and replace the `List<Book>` with a `List<String>`, as in the snippet below:

```
Copyclass Publisher {
    // …
    List<String> bookIds;
}

{
    …
    "bookIds" : ["617cfb", "23e78f", … ]
}
```

To add a new `Book` to the `bookIds` field of `Publisher`, we could use the following statement.

```
Copytemplate.update(Publisher.class)
    .matching(where("id").is(publisher.id))
    .apply(new Update().push("bookIds", book.id))
    .first();
```

Following this approach optimizes for storage format and makes a very explicit statement about the data type used in both the domain model as well as the database. Nevertheless, just `bookIds` does not give you the context of the collection in which to look up the values contained in the `bookIds` field.

### [](#linking-using-declarative-manual-references)[](#linking-using-declarative-manual-references)Linking using Declarative Manual References

Starting with [Spring Data MongoDB 3.3.0](https://spring.io/blog/2021/11/12/spring-data-2021-1-0-goes-ga), *manual references* can be expressed in a declarative way by using the `@DocumentReference` annotation:

```
Copyclass Publisher {
    // …
    @DocumentReference
    List<Book> books;
}
```

By default, this tells the mapping layer to extract the `id` value of the referenced entity for storage, loading the referenced document itself on read.

```
Copy{
    …
    "books" : ["617cfb", … ]
}
```

Because the mapping layer is aware of the link between the documents, update statements, such as the one shown earlier, detect the association and extract the *id* for storage:

```
Copytemplate.update(Publisher.class)
    .matching(where("id").is(publisher.id))
    .apply(new Update().push("books", book))
    .first();
```

Also, the back reference from `Book` to `Publisher` could be modeled this way. In this case, it might make sense to delay the retrieval of the publisher until first access of the property to avoid eager loading delays:

```
Copyclass Book {
    // …
    @DocumentReference(lazy=true)
    private Publisher publisher;
}
```

By using declarative links, we can now preserve mapping functionality while optimizing for storage. Still, we need to be careful when adding new `Book` instances, as those also need to be added to the `books` field of the `Publisher`, to establish the link:

```
Copytemplate.save(newBook);

template.update(Publisher.class)
    .matching(where("id").is(newBook.publisher.id))
    .apply(new Update().push("books", newBook))
    .first();
```

The above snippet outlines very well the non-atomic nature of working with links between documents, which may require to run operations within a [Transaction](https://docs.mongodb.com/manual/core/transactions/).

### [](#one-to-many-style-references)[](#one-to-many-style-references)One-To-Many Style References

Depending on your application’s needs, it can be feasible to invert the relation between `Book` and `Publisher` so that the linking element is solely stored within the `Book` documents. This lets you store `Books` without having to think about updating the `Publisher` document, as we saw in the last snippet. To do so, we need to do two things. First, we need to tell the mapping layer to omit storing links from `Publisher` to `Book` and second, update the *lookup query* when retrieving linked `Books`.

The initial part is rather easy, applying an additional `@ReadOnlyPorperty` annotation to the `books` property. The other part requires us to update the `lookup` attribute of the `@DocumentReference` annotation with a custom query:

```
Copyclass Publisher {
    // …
    @ReadOnlyProperty
    @DocumentReference(lookup="{'publisher':?#{#self._id} }")
    List<Book> books;
}
```

In the snippet above, we make use of the expression support within the query parser of Spring Data. In doing so, we can access the raw `Publisher` document by using the `#self` attribute and can extract its identifier to then use it when querying the `Book` collection for matching elements.

### [](#final-remarks)[](#final-remarks)Final Remarks

Having a single aggregate root with embedded data has many advantages. Still, it is important to understand how to model relations once those advantages are superseded by other concerns, such as storage size or operability. We have seen that, by moving from an *embedded* approach to *DBRefs* and on to *manual references*, we can reduce storage size. However, we have to deal with other problems, such as changes that affect multiple documents and limited query options. `@DocumentReference` can be a powerful tool that lets you express and customize links between documents. You can learn more about it in our [Reference Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.3.0/reference/html/#mapping-usage.document-references).

Nevertheless, before you leave, please always keep in mind that links between documents require additional server roundtrips. Therefore, make sure to have indexes available that support your lookup. A collection of linked documents is bulk loaded, restoring ordering on a best effort basis within the memory of your application.

Also, always ask yourself which is best for your application? Is the default embedding approach the better solution? Do you really need the cyclic back reference? Should a link be lazy? How will non-atomic updates affect your application? And finally, which queries do you need to run?