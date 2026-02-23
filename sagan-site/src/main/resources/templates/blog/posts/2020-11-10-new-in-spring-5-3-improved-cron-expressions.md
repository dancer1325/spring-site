---
title: New in Spring 5.3: Improved Cron Expressions
source: https://spring.io/blog/2020/11/10/new-in-spring-5-3-improved-cron-expressions
scraped: 2026-02-23T13:42:26.487Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Arjen Poutsma |  November 10, 2020 | 16 Comments
---

# New in Spring 5.3: Improved Cron Expressions

_Engineering | Arjen Poutsma |  November 10, 2020 | 16 Comments_

If you regularly listen to [A Bootiful Podcast](https://bootifulpodcast.fm), you might have heard about the improvements we made to Spring Framework’s cron support. Cron expressions are mostly used in Spring applications through the [`@Scheduled` annotation](https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#scheduling-annotation-support-scheduled). In Spring 5.3, we introduced the [`CronExpression`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/support/CronExpression.html) class, which represents — you guessed it — a [cron expression](https://en.wikipedia.org/wiki/Cron#CRON_expression).

`CronExpression` replaces `CronSequenceGenerator`, which is based on `java.util.Calendar` and which has several known issues that none of the Spring team members felt comfortable solving. Introducing a new type allowed us to use the superior `java.time` APIs, solve the outstanding issues, and (hopefully) introduce new features as well. While Spring generally prefers to maintain backward compatible, sometimes we do believe that starting from scratch is the best option.

## [](#usage)[](#usage)Usage

You typically create cron triggers with the `@Scheduled` annotation, which uses `CronExpression` internally, as of Spring Framework 5.3. This means that you can already start using the [New Features](#new-features) if you are on that version.

If you want to play around with `CronExpression` yourself, you can create one through the static parse method:

```
Copyvar expression = CronExpression.parse("10 * * * * *");
var result = expression.next(LocalDateTime.now());
System.out.println(result);
```

In this sample, `expression` represents a cron sequence that triggers 10 seconds past every minute. The `parse` method takes the well-known string with six space-separated time and date fields:

┌───────────── second (0-59) │ ┌───────────── minute (0 - 59) │ │ ┌───────────── hour (0 - 23) │ │ │ ┌───────────── day of the month (1 - 31) │ │ │ │ ┌───────────── month (1 - 12) (or JAN-DEC) │ │ │ │ │ ┌───────────── day of the week (0 - 7) │ │ │ │ │ │ (or MON-SUN -- 0 or 7 is Sunday) │ │ │ │ │ │ \* \* \* \* \* \*

Some rules apply:

-   A field may be an asterisk (`*`), which always stands for “first-last”. For the day-of-the-month or day-of-the-week fields, a question mark (`?`) may be used instead of an asterisk.
    
-   Commas (`,`) are used to separate items of a list.
    
-   Two numbers separated with a hyphen (`-`) express a range of numbers. The specified range is inclusive.
    
-   Following a range (or `*`) with `/` specifies the interval of the number’s value through the range.
    
-   English names can also be used for the day-of-month and day-of-week fields. Use the first three letters of the particular day or month (case does not matter).
    

Here are some examples:

Cron Expression

Meaning

`0 0 * * * *`

top of every hour of every day

`*/10 * * * * *`

every ten seconds

`0 0 8-10 * * *`

8, 9 and 10 o’clock of every day

`0 0 6,19 * * *`

6:00 AM and 7:00 PM every day

`0 0/30 8-10 * * *`

8:00, 8:30, 9:00, 9:30, 10:00 and 10:30 every day

`0 0 9-17 * * MON-FRI`

on the hour nine-to-five weekdays

`0 0 0 25 12 ?`

every Christmas Day at midnight

The `next` method returns the next occurrence of the trigger or `null` if there is none. It takes a `java.time.temporal.Temporal` as a parameter, which means it accepts not only `LocalDateTime` but also `ZonedDateTime` if time-zones are relevant.

## [](#new-features)[](#new-features)New Features

Using the `java.time` APIs let us introduce several new features that put Spring’s support for cron expressions on an equal footing with other schedulers. You can start using these features in `@Scheduled` as of Spring Framework 5.3.

### [](#macros)[](#macros)Macros

Expressions such as `0 0 * * * *` are hard for humans to parse and are, therefore, hard to fix in case of bugs. To improve readability, Spring now supports the following macros, which represent commonly used sequences. You can use these macros instead of the six-digit value, thus: `@Scheduled(cron = "@hourly")`.

Macro

Meaning

`@yearly` (or `@annually`)

once a year (`0 0 0 1 1 *`)

`@monthly`

once a month (`0 0 0 1 * *`)

`@weekly`

once a week (`0 0 0 * * 0`)

`@daily` (or `@midnight`)

once a day (`0 0 0 * * *`), or

`@hourly`

once an hour, (`0 0 * * * *`)

### [](#last-days)[](#last-days)Last Days

The day-of-month and day-of-week fields can contain a `L` character, which has a different meaning in each field. In the day-of-month field, `L` stands for *the last day of the month*. If followed by a negative offset (that is, `L-n`), it means *`n`th-to-last day of the month*.

In the day-of-week field, `L` stands for *the last day of the week*. If prefixed by a number or three-letter name (`dL` or `DDDL`), it means *the last day of week (`d` or `DDD`) in the month*.

Here are some examples:

Cron Expression

Meaning

`0 0 0 L * *`

last day of the month at midnight

`0 0 0 L-3 * *`

third-to-last day of the month at midnight

`0 0 0 * * 5L`

last Friday of the month at midnight

`0 0 0 * * THUL`

last Thursday of the month at midnight

### [](#weekdays)[](#weekdays)Weekdays

The day-of-month field can be `nW`, which stands for *the nearest weekday to day of the month `n`*. If `n` falls on Saturday, this yields the Friday before it. If `n` falls on Sunday, this yields the Monday after, which also happens if `n` is `1` and falls on a Saturday (that is: `1W` stands for *the first weekday of the month*).

If the day-of-month field is `LW`, it means *the last weekday of the month*.

Here are some examples:

Cron Expression

Meaning

`0 0 0 1W * *`

first weekday of the month at midnight

`0 0 0 LW * *`

last weekday of the month at midnight

### [](#second-friday-of-the-month)[](#second-friday-of-the-month)Second Friday of the Month

The day-of-week field can be `d#n` (or `DDD#n`), which stands for *the `n`th day of week `d` (or `DDD`) in the month*.

Here are some examples:

Cron Expression

Meaning

`0 0 0 ? * 5#2`

the second Friday in the month at midnight

`0 0 0 ? * MON#1`

the first Monday in the month at midnight

Improved cron expression support is only one of the [many features](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-5.x#whats-new-in-version-53) that Spring Framework 5.3 offers and will be part of the forthcoming [Spring Boot 2.4](https://github.com/spring-projects/spring-boot/milestone/178) release.