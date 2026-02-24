---
title: $text $search your Documents with Spring Data MongoDB
source: https://spring.io/blog/2014/07/17/text-search-your-documents-with-spring-data-mongodb
scraped: 2026-02-23T22:19:57.916Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  July 17, 2014 | 8 Comments
---

# $text $search your Documents with Spring Data MongoDB

_Engineering | Christoph Strobl |  July 17, 2014 | 8 Comments_

MongoDB officially has offered full text search capabilities since its 2.6 release. The feature ranks among the [Top 5](https://jira.mongodb.org/issues/?jql=project%20%3D%20SERVER%20AND%20issuetype%20%3D%20%22New%20Feature%22%20ORDER%20BY%20votes%20DESC) most voted features for the server component and ships in its current version with numerous stemmers and parsers, phrase matching, negation and per field weights. So it's about time to give it a little love and share what's cooking in Spring Data's kitchen to support that feature.

For text indexing and searching MongoDB defaults the language to English, normalizing the text by tokenizing, removing common stop words and reducing words to their base. There's support for several other languages as well.

## [](#manually-build-text-indexes)Manually build text indexes

```java
Copy@Document
class CookingRecipe {
  String title;
  String content;
}
```

Here we've got a very simple entity `CookingRecipe` and want to have a text index based on its `title` and `content` fields, putting some weight of 2 to search hits in `title`. Attaching weights to fields allows you to influence relevancy of a document when being looked up. It defines the significance of a field relative to others, boosting the documents score. In this case it doubles the documents relevance when hitting a match in `title`. The raw MongoDB index definition would look something like this:

```javascript
Copy{
  title : "text",
  content : "text"
},
{
  weights: { title : 2 }
}
```

As of version 1.5 M1 of Spring Data MongoDB we can create a text index, capturing the fields we want to have full text search enabled on, manually.

```java
CopyTextIndexDefinition textIndex = new TextIndexDefinitionBuilder()
  .onField("title", 2F)
  .onField("content")
  .build();

MongoTemplate template = … // obtain MongoTemplate
template.indexOps(CookingRecipe.class).ensureIndex(textIndex);
```

Alternatively, let the index be created automatically using mapping annotations. All we need to do is adding a few hints on the domain class and we are good to go.

```java
Copy@Document
class CookingRecipe {
  @TextIndexed(weight=2) String title;
  @TextIndexed String content;
}
```

Please note that it is only possible to have one full text index per collection. Now that we've created the index we'll query the top 5 recipes matching "coffee" or "cake".

```java
CopyTextCriteria criteria = TextCriteria.forDefaultLanguage()
  .matchingAny("coffee", "cake");

Query query = TextQuery.queryText(criteria)
  .sortByScore()
  .with(new PageRequest(0, 5));

List<CookingRecipe> recipes = template.find(query, CookingRecipe);
```

Note that we provide dedicated types `TextCriteria` and `TextQuery` to express searches in full detail.

## [](#scoring)Scoring

As mentioned earlier, documents get scored while searching. The `score` value is not returned by default, but since this information is often helpful we can include it in the output by adding `{ score :  { $meta : "textScore" } }` to the projection, which is implicitly done by calling `query.sortByScore()`. To access the score in the resulting documents we add a `@TextScore` annotated property to `CookingRecipe`.

```java
Copy@Document
class CookingRecipe {
  @TextIndexed(weight=2) String title;
  @TextIndexed String content;
  @TextScore Float score;
}
```

The `@TextScore` annotation implicitly turns the `score` property into a read-only property due to the `@ReadOnlyProperty` annotation the annotation carries in turn. The latter can be used in other contexts as well where you'd like make sure fields from a document are only read but never written.

Additional resources on [behavior and restrictions](http://docs.mongodb.org/manual/reference/operator/query/text/#behavior), as well as [supported languages](http://docs.mongodb.org/manual/reference/text-search-languages) can be found in the [MongoDB reference](http://docs.mongodb.org/manual/reference/).

Moving forward with release train [Evans](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Evans) we will be adding text search support to `MongoRepositories`.

---

If you want to learn more about Spring Data, be sure to [register](https://2014.event.springone2gx.com/register) for this year's SpringOne conference. The [schedule](https://2014.event.springone2gx.com/schedule/2014-09-09) contains a lot of data-related talks to introduce you to the latest features we're going to ship with Evans.