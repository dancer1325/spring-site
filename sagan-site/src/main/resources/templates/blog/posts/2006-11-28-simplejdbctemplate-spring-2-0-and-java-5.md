---
title: SimpleJdbcTemplate: Spring 2.0 and Java 5
source: https://spring.io/blog/2006/11/28/simplejdbctemplate-spring-2-0-and-java-5
scraped: 2026-02-24T09:33:16.691Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  November 28, 2006 | 0 Comments
---

# SimpleJdbcTemplate: Spring 2.0 and Java 5

_Engineering | Ben Hale |  November 28, 2006 | 0 Comments_

In the run up to [The Spring Experience](http://www.thespringexperience.com) I've been busy but I've noticed that Rod's been really active on the blogging front. So in some spare time in airports and on planes today, I've decided to do a little blogging.

One of the biggest balancing acts that we in the Spring community have is to make sure that we stay backwards compatible while still innovating. Part of that innovation is taking advantage of new features and constructs in later versions of Java such as Java 5. Since the 1.2.x branch, we've seen some of this with things like the @Transactional annotation and our JMX auto-detection based on the @ManagedResource annotation. In the end these are great features and have greatly simplified development (at least mine anyway), but they really amount to moving metadata into the code. What we hadn't seen was the actual simplification of APIs.

With Spring 2.0, that's changed. We're seeing certain APIs take advantage of features other than just annotations. In fact, there is one great example where we see almost every new language feature of Java 5 used (autoboxing, varargs, generics), the [SimpleJdbcTemplate](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/jdbc/core/simple/SimpleJdbcTemplate.html). SimpleJdbcTemplate isn't quite a replacement for the standard JdbcTemplate, rather it uses Java 5 to simplify certain common tasks.

## Autoboxing

Strictly speaking, autoboxing isn't something that we do with our APIs, but it is something that can make using JdbcTemplate much nicer. So for example, where you use to have to box your primitive values...

```java
Copy
public int getLargeAccountCount(double value, int type) {
    return getSimpleJdbcTemplate().queryForInt(
        "select count(*) from accounts where balance > ? and type = ?",
        new Object[] { new Double(value), new Integer(type) });
}
```

... you no longer have to.

```java
Copy
public int getLargeAccountCount(double value, int type) {
    return getSimpleJdbcTemplate().queryForInt(
        "select count(*) from accounts where balance > ? and type = ?",
        new Object[] { value, type });
}
```

In this simple example, it doesn't make a whole lot of difference, but you can imagine in a complex SQL query with multiple bind variables boxing can take up quite a bit of room.

## Varargs

If we take a look at that original example, we see another piece of boilerplate code that Java 5 can help us remove. The bind parameters are passed in as an Object array, but Java 5 will allow us to specify just a comma delimited list of objects and it'll be converted back into that needed object array.

So if we start with the original example...

```java
Copy
public int getLargeAccountCount(double value, int type) {
    return getSimpleJdbcTemplate().queryForInt(
        "select count(*) from accounts where balance > ? and type = ?",
        new Object[] { new Double(value), new Integer(type) });
}
```

... and combine both autoboxing and varargs things really start to get shorter.

```java
Copy
public int getLargeAccountCount(double value, int type) {
    return getSimpleJdbcTemplate().queryForInt(
        "select count(*) from accounts where balance > ? and type = ?",
        value, type);
}
```

## Generics

The final improvement that we see in SimpleJdbcTemplate is the introduction of generics. One of the biggest pains for me when using JdbcTemplate was that whenever I did a [queryForObject()](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/jdbc/core/JdbcTemplate.html#queryForObject\(java.lang.String,%20java.lang.Object[],%20org.springframework.jdbc.core.RowMapper\)) I had to do manual casting and didn't get a lot of help from my IDE or compiler.

```java
Copy
public Account getAccount(long id) {
    return (Account) getJdbcTemplate().queryForObject(
        "select * from accounts where id = ?",
        new Object[] { new Long(id) }, new RowMapper() {

            public Object mapRow(ResultSet rs, int rowNum)
                    throws SQLException {
                String accountNumber = rs.getString("account_number");
                int balance = rs.getInt("balance");
                return new Account(accountNumber, balance);
            }
        });
}
```

In Spring 2.0 we released a companion to SimpleJdbcTemplate, [ParameterizedRowMapper](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/jdbc/core/simple/ParameterizedRowMapper.html). When the two are used together, it actually creates a pretty nice little system that doesn't require a cast at all and has your IDE and compiler doing strong type checking.

```java
Copy
public Account getAccount(long id) {
    return getSimpleJdbcTemplate().queryForObject(
        "select * from accounts where id = ?",
        new ParameterizedRowMapper<Account>() {

            public Account mapRow(ResultSet rs, int rowNum)
                    throws SQLException {
                String accountNumber = rs.getString("account_number");
                int balance = rs.getInt("balance");
                return new Account(accountNumber, balance);
            }
        }, id);
}
```

One thing that it's important to remember is that SimpleJdbcTemplate doesn't have all of the methods that JdbcTemplate had. It doesn't even extend JdbcTemplate, but rather can provide a reference to a JdbcTemplate. The goal of SimpleJdbcTemplate is to simplify the use of some common behaviors while leveraging Java 5.

In the end, this isn't anything revolutionary. Much like Rod's [earlier post](http://blog.interface21.com/main/2006/11/25/xml-syntax-sugar-in-spring-20/), this is just syntactic sugar. But it is an example of the ways Spring is embracing the new features in Java 5 and beyond.