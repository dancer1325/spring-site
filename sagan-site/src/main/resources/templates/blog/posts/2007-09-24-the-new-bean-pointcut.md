---
title: The new bean() pointcut
source: https://spring.io/blog/2007/09/24/the-new-bean-pointcut
scraped: 2026-02-24T09:24:46.935Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ramnivas Laddad |  September 24, 2007 | 0 Comments
---

# The new bean() pointcut

_Engineering | Ramnivas Laddad |  September 24, 2007 | 0 Comments_

Spring 2.5 features a new pointcut designator -- bean() that allows selecting join points in beans with a matching name pattern. Now it is possible to use the auto-proxy mechanism along with Spring-AspectJ integration to select a specific bean even when there are more than one beans of a type. Earlier, you could use [BeanNameAutoProxyCreator](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/aop/framework/autoproxy/BeanNameAutoProxyCreator.html) to achieve a similar result; however, that mechanism didn't work with Schema-style or @AspectJ aspects.

Besides selecting a specific bean, this pointcut designator offers two interesting ways to select beans if you follow an appropriate naming convention:

1.  **Selecting a vertical slice of beans:** If you follow a convention where bean names include a string indicating their role from the business perspective, a bean() pointcut can select beans based on their business role. For example, you may use the bean(account\*) pointcut to select all accounting-related beans such as accountRepository, accountService, and accountController if bean names start with a string representing their business functionality.
2.  **Selecting a horizontal slice of beans:** If you follow a convention where bean names include a string indicating their role from the architectural perspective, a bean() pointcut can select beans based on their architectural role. For example, you can use bean(\*Repository) to select all repository beans if bean names end with a string representing their architectural role. Without the bean() pointcut, you had to rely on the package structure or type-based pointcuts, which can be sometimes a bit too restrictive.

![The bean() Pointcut Designator](http://blog.interface21.com/main/wp-content/uploads/2007/09/BeanPointcut.png)

**Figure 1: Selecting horizontal and vertical slices of beans based on their names using bean() pointcuts**

This pointcut represents a Spring-specific extension to the AspectJ pointcut expression language and as such is useful only in a Spring-based application. The name-pattern follows the AspectJ matching rules for a name pattern with '\*' being the only allowed wildcard. Here is a table showing a few example pointcuts and beans selected by them.

Pointcut

Join points selected in

bean(accountRepository)

The bean named "accountRepository"

!bean(accountRepository)

Any bean except the "accountRepository" bean

bean(\*)

Any bean

bean(account\*)

Any bean with name starting in "account"

bean(\*Repository)

Any bean with name ending in "Repository"

bean(accounting/showaccount)

The bean named accounting/showaccount (designating, say, a controller handling that URL)

bean(accounting/\*)

Any bean whose name starts with "accounting/" (designating, say, any controller handling accounting-related URLs)

bean(accounting/\*/edit)

Any bean whose name starts with "accounting/" and ends with "/edit" (designating, say, any controller handling the edit operation functionality related to accounting)

bean(\*dataSource) || bean(\*DataSource)

Any bean whose name ends with either "dataSource" or "DataSource"

bean(service:name=monitoring)

The bean named "service:name=monitoring"