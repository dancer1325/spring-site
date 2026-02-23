---
title: Extending Spring Data Repositories Just Got Easier
source: https://spring.io/blog/2024/12/03/extending-spring-data-repositories-just-got-easier
scraped: 2026-02-23T08:01:22.740Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  December 03, 2024 | 6 Comments
---

# Extending Spring Data Repositories Just Got Easier

_Engineering | Christoph Strobl |  December 03, 2024 | 6 Comments_

Since its inception, Spring Data Repositories have been designed for extension, whether you want to customize a single query method or provide a completely new base implementation.

The [2024.1 release](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2024.1-Release-Notes) enhances your ability to extend a repository with [custom functionality](https://docs.spring.io/spring-data/commons/reference/repositories/custom-implementations.html) making it easier than ever for anyone to create extensions that can be shared across different projects.

Let’s explore an example to see how this works in practice.

Imagine you are using MongoDB as a document store to manage a movie database. You want to leverage MongoDBs Atlas [vector search](https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-stage/) functionality through your repository interfaces for AI-powered search operations. Typically, you’d create a custom repository fragment like this:

```java
Copypackage io.movie.db;

interface AtlasMovieRepository {
   List<Movie> vectorSearch(String index, String path, List<Double> vector, Limit limit);
}
```

Here, since you're working with the `Movie` type, you already know the collection. The index parameter specifies the vector index to use, and path defines the field holding the [vector embeddings](https://www.mongodb.com/docs/atlas/atlas-vector-search/create-embeddings/) for comparison. The similarity function (e.g., euclidean, cosine, or dotProduct) is determined when you set up the index. Let’s assume a cosine vector index is already in place.

In your fragment implementation, you will need to create the `$vectorSearch` aggregation stage, MongoDB's approach to running vector searches, and integrate it into the Aggregation API using `MongoOperations`:

```java
Copypackage io.movie.db;

class AtlasMovieRepositoryFragment implements AtlasMovieRepository {

   private final MongoOperations mongoOperations;

   public AtlasMovieRepositoryFragment(MongoOperations mongoOperations) {
       this.mongoOperations = mongoOperations;
   }

   @Override
   public List<Movie> vectorSearch(String index, String path, List<Double> vector, Limit limit) {
       Document $vectorSearch = createSearchDocument(index, path, vector, limit);
       Aggregation aggregation = Aggregation.newAggregation(ctx -> $vectorSearch);
       return mongoOperations.aggregate(aggregation, "movies", Movie.class).getMappedResults();
   }

   private static Document createSearchDocument(String index, String path, List<Double> vector, Limit limit) {
       Document $vectorSearch = new Document();
       $vectorSearch.append("index", index);
       $vectorSearch.append("path", path);
       $vectorSearch.append("queryVector", vector);
       $vectorSearch.append("limit", limit.max());

       return new Document("$vectorSearch", $vectorSearch);
   }
}
```

Now, simply integrate the fragment into your `MovieRepository`:

```java
Copypackage io.movie.db;

interface MovieRepository extends CrudRepository<Movie, String>, AtlasMovieRepository { }
```

While this approach works, you might notice that it is tightly coupled to a single repository with a specific domain type (`Movie`). This makes it difficult to reuse in other projects, as the fragment implementations are tied to the repository’s package and are domain-specific.

But vector search isn't limited to just our Movie database. What if we want to reuse this functionality in other projects without copying and modifying the solution? Let’s explore a way to make this more generic.

### [](#making-it-reusable)Making It Reusable

To enable reuse, we move the `AtlasMovieRepository` and its implementation to a separate project so that it can be shared. Then, we register the fragment within the `META-INF/spring.factories` file, so that Spring Data knows about the extension:

```properties
Copyapi.mongodb.atlas.AtlasMovieRepository=api.mongodb.atlas.AtlasMovieRepositoryFragment
```

However, the current implementation is still tied to the `Movie` type, limiting its reusability. To fix this, we need to make the fragment more generic. Rename `AtlasMovieRepository` to `AtlasRepository` and introduce a generic type parameter. Don’t forget to update the `spring.factories` file as well.

```
Copypackage api.mongodb.atlas;

interface AtlasRepository<T> {
   List<T> vectorSearch(String index, String path, List<Double> vector, Limit limit);
}
```

Next, we update the implementation to reflect the new generic approach, as we can no longer assume we're targeting the `Movie` collection. Using the newly introduced `RepositoryMethodContext`, we can access repository metadata and determine the appropriate collection name dynamically:

```java
Copypackage api.mongodb.atlas;

class AtlasRepositoryFragment<T> implements AtlasRepository<T>, RepositoryMetadataAccess {

   private MongoOperations mongoOperations;

   public AtlasRepositoryFragment(MongoOperations mongoOperations) {
       this.mongoOperations = mongoOperations;
   }

   @Override
   public List<T> vectorSearch(String index, String path, List<Double> vector, Limit limit) {
       RepositoryMethodContext methodContext = RepositoryMethodContext.getContext();

       Class<?> domainType = methodContext.getMetadata().getDomainType();

       Document $vectorSearch = createSearchDocument(index, path, vector, limit);
       Aggregation aggregation = Aggregation.newAggregation(ctx -> $vectorSearch);
       return (List<T>) mongoOperations.aggregate(aggregation, mongoOperations.getCollectionName(domainType), domainType).getMappedResults();
   }

   private static Document createSearchDocument(String indexName, String path, List<Double> vector, Limit limit) {
       Document $vectorSearch = new Document();
       //…
   }
}
```

The provided method context not only allows you to access general information about the repository, but also gives you access to the repositories' generics, methods etc. In the above snippet we assume that the repository domain type aligns with our custom fragment, which must not be the case. So instead we could also read the component type of the interface via `ResolvableType.forClass(getRepositoryInterface()).as(AtlasRepository.class).getGeneric(0)` or even check the current methods return type to apply additional manipulation like projections and the such. For simplicity let’s stick with the domain type in this sample.

To avoid unnecessary overhead, we only enable context access for repositories that need it. Looking carefully at the code above you will see that there is an extra `RepositoryMetadataAccess` interface on the `AtlasRepositoryFragment` class. This marker interfaces advises the infrastructure to provide the required metadata on method invocation.

With that setup, you can now use the custom extension in any project by simply extending your repository:

```java
Copypackage io.movie.db;

interface MovieRepository extends CrudRepository<Movie, String>, AtlasRepository<Movie> { }
```

To try it out, visit the [Spring Data Examples](https://github.com/spring-projects/spring-data-examples/tree/main/mongodb/fragment-spi) project, where you’ll find the code ready to run.