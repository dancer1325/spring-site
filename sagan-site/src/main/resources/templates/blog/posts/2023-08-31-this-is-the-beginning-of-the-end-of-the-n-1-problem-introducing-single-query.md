---
title: This is the Beginning of the End of the N+1 Problem: Introducing Single Query Loading.
source: https://spring.io/blog/2023/08/31/this-is-the-beginning-of-the-end-of-the-n-1-problem-introducing-single-query
scraped: 2026-02-23T09:26:03.680Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  August 31, 2023 | 12 Comments
---

# This is the Beginning of the End of the N+1 Problem: Introducing Single Query Loading.

_Engineering | Jens Schauder |  August 31, 2023 | 12 Comments_

## [](#tldr)TL;DR:

Starting with Spring Data JDBC 3.2.0-M2, Spring Data JDBC supports *Single Query Loading*. Single Query Loading loads arbitrary aggregates with a single select statement.

To enable Single Query Loading you need to call `setSingleQueryLoadingEnabled(true)` on your [`RelationalMappingContext`](https://docs.spring.io/spring-data/jdbc/docs/current/api/org/springframework/data/relational/core/mapping/RelationalMappingContext.html).

In 3.2.0-M2, this works only for simple aggregates, consisting of an aggregate root and a single collection of other entities. It is also limited to the `findAll`, `findById`, and `findAllByIds` methods in `CrudRepository`. [Future versions will improve on that](https://github.com/spring-projects/spring-data-relational/issues/1445). A final limitation is that the database you use has to support [analytic functions (AKA window functions)](https://www.sqltutorial.org/sql-window-functions/). All the officially supported databases except for the in memory databases (H2 and Hsql DB) do so.

You can abbreviate Single Query Loading as *SQL*, but please, don't.

If you want to understand how it does work, and a little of how we came up with it, read on.

## [](#the-problem)The Problem

Conceptually Spring Data JDBC loads complete aggregates in one go. So far, though, if you looked at what SQL actually gets run, you realize that, for non-trivial aggregates, multiple SQL statements get run. Consider, for example, the type of `Minion` that references a collection of `Hobby` and a collection of `Toy` entities. When Spring Data JDBC loads a bunch of such minions it:

1.  Run a `SELECT ... FROM MINION`
2.  For each result in that query, it:
3.  Run a `SELECT ... FROM HOBBY`
4.  Run a `SELECT ... FROM TOY`

This is inefficient and known as the N+1 problem, since, for an aggregate with a single collection to load N aggregates, N+1 queries get executed (one for the root and N for the child entities). If there is only a single collection, you may do a join, but that falls apart when there are multiple collections.

This problem is by no means specific to Spring Data JDBC. Other ORMs use different strategies to minimize this problem. For example, they may join one child entity to the aggregate root. Alternately, they may use batch loading for related entities. All these approaches limit the effect of the problem, but they merely treat symptoms. Also, most people will actually tell you that you can't really do this in a single query, since you will get a cross product of all the child tables, which can be very bad. Imagine 5 child tables with 10 entries per minion. The cross product of these will be 10*10*10*10*10 = 10000 rows!

## [](#the-idea)The Idea

Quite some time ago, I remembered something [Frank Gerberding](https://www.linkedin.com/in/frank-gerberding/), a former coworker of mine said: "The problem with relational databases is that they always return tables, and sometimes you need a tree." Well he said it in German, and I don't remember his exact words, but that was the gist of it. This got me thinking: It's true, a SQL query will always return basically a table. But how would I represent a tree in there? To put it differently: How would you represent the data of an aggregate in Excel? What if you ignore the fact that Excel is basically a relational database with super powers and just treat it as a single spread sheet?

Let's start with a fairly simple case.

```java
Copyclass Minion {
    @Id
    Long id;
    String name;
    List<Toy> toys;
    // the skills you need to excel at this hobby.
    List<Hobby> hobbies;
}
```

`Toy` and `Hobby` just have a `name` property for now.

If I want to represent this in Excel, I'd probably do something like this:

Minion id

Minion name

toys name

hobbies name

1

Bob

Teddy

Hold Teddy

Blue Light

Look Cute

Follow Kevin

2

Kevin

...

...

Getting a result like this back from a query would be really nice. It would be not to difficult to construct Java instances from that with a single pass over the `ResultSet`.

At this point I remembered that SQL is actually Turing-complete. Therefore, I can express this in SQL. It is just a question of how! It always helps to know there is a solution for a problem. When you can shut the voice in your head down that otherwise tries to convince you that there isn't a solution and you are just wasting your time, finding the solution becomes much easier.

## [](#row-numbers)Row Numbers

The elements of the collections are kind of "joined" by the index of the row within a `Minion`. But that index does not exist in the database. Luckily, you can create such an index fairly easily using the `row_number()` window function.

If you don't know about [window functions (AKA analytic functions)](https://www.sqltutorial.org/sql-window-functions/), they are similar to aggregate functions, but the `group by` doesn't collapse all matching rows into one. Instead, the analytic function gets applied to the *window* defined by the `group by` and the result is available in each row. And it doesn't always have to be the same result for all rows in a group. There is a lot more you can do with these functions. [You should read more about it](https://www.sqltutorial.org/sql-window-functions/). But for our current problem at hand we need only:

-   `row_number()`, which assigns a unique, continuously increasing numbers to all rows in a group.
-   `count(*)`, which counts the number of rows in a group. I know, surprising.

We start by creating with a subselect for each child table. Each subselect selects all columns from the underlying table, a `row_number()` and the `count(*)`, each grouped by the `minion_id`.

```sql
Copy( 
  select *,
    row_number() over (partition by minion_id) h_rn,
    count(*) over (partition by minion_id) h_cnt
  from hobby
) h
```

We actually do the same for the aggregate root. However, we don't need a `row_number`, since we know that there is only one minion per row. Therefore, we can fix that to 1.

```sql
Copy( 
  select *,
    1 m_rn
  from minion
) m
```

## [](#join-by-id)Join by Id

Next we join all these subselects together, with a standard left join:

```sql
Copyselect *
from ( ... ) m
left join 
  ( ... ) h
  on m.id = h.minion_id
left join 
  ( ... ) t
  on m.id = t.minion_id
```

This gives exactly the cross product that I declared unacceptable above.

Minion id

m\_rn

Minion name

toys name

t\_rn

hobbies name

h\_rn

1

1

Bob

Teddy

1

Hold Teddy

1

1

1

Bob

Blue Light

2

Hold Teddy

1

1

1

Bob

Teddy

1

Look Cute

2

1

1

Bob

Blue Light

2

Look Cute

2

1

1

Bob

Teddy

1

Follow Kevin

3

1

1

Bob

Blue Light

2

Follow Kevin

3

2

1

Kevin

...

...

...

...

What we want instead is similar to a [`full outer join`](https://www.w3schools.com/sql/sql_join_full.asp) on the different row numbers. Unfortunately, you can't have a `left join` on one column and a `full outer join` on another column in SQL. But we can solve this with a where clause.

## [](#pseudo-full-outer-join-on-row-numbers)Pseudo Full Outer Join on Row Numbers

The naive version of that where clause would be:

```sql
Copywhere m_rn = h_rn
and   m_rn = t_rn
```

This ignores the fact that we need the outer join semantics. To fix that, a lot of `is null` checks and comparisons with the `cnt` columns are added, making the where clause rather hard to read. And it is also sufficiently complicated that I'm not able to write it down without probably making a ton of mistakes. I therefore spare you the details. Go ahead and enable SQL logging, if you really have to know.

With this we have the number of rows down to the correct number. Great! But we are still duplicating parts of the data.

Minion id

m\_rn

Minion name

toys name

t\_rn

hobbies name

h\_rn

1

1

Bob

Teddy

1

Hold Teddy

1

1

1

Bob

Blue Light

2

Look Cute

2

1

1

Bob

Teddy

1

Follow Kevin

3

2

1

Kevin

...

...

...

...

For example, for the hobbies that don't have a matching toy, the data of one toy gets repeated over and over again. We really want to reduce that to `null` values. It doesn't make much of a difference in this toy example, but those values might be long comments on a blog post and take a considerable amount of time to transfer over the wire. For this, we replace almost all the columns with expressions like the following:

```sql
Copycase when x_rn = rn then name end
```

Here `x_rn` is the row\_number of the subselect that is the source of the column in question. `rn` is the *total row\_number* - that is, the row\_number that all the subselects join on. This condition basically expresses: If the subselect has data for this row, use it; otherwise, just use `null`. We use this pattern on all normal columns. Only columns that are used in further join as described in the following paragraph aren't treated with this.

Now our result looks just as desired.

Minion id

m\_rn

Minion name

toys name

t\_rn

hobbies name

h\_rn

1

1

Bob

Teddy

1

Hold Teddy

1

1

1

Blue Light

2

Look Cute

2

1

1

Follow Kevin

3

2

1

Kevin

...

...

...

...

We return a minimum number of rows and also no duplicate data! But we only do that for a single level of nested entities! This is solved by simple recursion: The result we got just looks like a simple table. It can, therefore, be used as such. To be precise, it can be used instead of the subselect that adds a row number to a select, because it already has a row number.

## [](#conditions)Conditions

So far, we basically looked at the query for a `findAll` operation. And about half a year ago I already had a solution that worked for `findAll` but didn't yield an efficient solution for things like `findById` or `findByAddressName`. This is not a problem with the solution presented above. Any where clause gets applied to the inner most select of the aggregate root and, thanks to the joins, restricts all data. This is well supported by the indexes you'd create for foreign keys and IDs anyway, so we are confident that this way of querying can be executed efficiently.

## [](#outlook)Outlook

As outlined at the start of this article, this approach is currently only implemented for Spring Data JDBC, simple aggregate, and very specific query methods. We want to make this available for all aggregates, all Spring Data JDBC query methods, and even Spring Data R2DBC. The last one would enable reading full aggregates for Spring Data R2DBC! It will certainly have an effect on how you will specify queries for Spring Data Relational in future. Of course, downstream projects that consume Spring Data Relational will benefit from this as well. Spring's REST and GraphQL support come to mind.

Follow [this Github issue](https://github.com/spring-projects/spring-data-relational/issues/1445) to learn more about progress on this topic.

## [](#conclusion)Conclusion

We found a way to load data from arbitrary trees of tables with a single query. This fits Spring Data JDBC perfectly, because the aggregates it is working on are such trees. The resulting queries are a little more complex, but RDBMS's should be able to execute them efficiently.

Of course, we are now looking for real world experiences and feedback: Do you experience problems? Does it make a performance difference for you? Please let us know via [Github](https://github.com/spring-projects/spring-data-relational/issues), [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-data-jdbc).