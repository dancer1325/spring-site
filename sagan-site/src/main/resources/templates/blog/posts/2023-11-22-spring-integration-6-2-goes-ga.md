---
title: Spring Integration 6.2 goes GA!
source: https://spring.io/blog/2023/11/22/spring-integration-6-2-goes-ga
scraped: 2026-02-23T09:07:41.924Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 22, 2023 | 0 Comments
---

# Spring Integration 6.2 goes GA!

_Releases | Artem Bilan |  November 22, 2023 | 0 Comments_

Dear Spring community,

On behalf of Spring Integration team, it is my pleasure to announce `6.2.0` version which is available from Maven Central.

In addition, bug fixes version `6.1.5` has been released as well into Maven Central.

The last Open Source `5.5.20` and `6.0.9` releases are also available and everyone is encouraged to update if you cannot migrate to the latest greatest `6.2.0`.

The notable changes in `6.2`:

-   The documentation migrated to Antora site generator and hosted alongside with other migrated Spring projects [here](https://docs.spring.io/spring-integration/reference/6.2/index.html)
    
-   Project CrAC support with some internal changes to close resources on components stop
    
-   Virtual threads support with respective `TaskExecutor` injections and `synchronized` blocks to `Lock`
    
-   The project build lifecycle is now connected to [Gradle Enterprise](https://ge.spring.io/scans?search.rootProjectNames=spring-integration), so every one contributing can now benefit from remote shared cache for Gradle tasks
    
-   The `LockRegistry` interface provides a template-like `executeLocked()` API:
    

```java
Copy registry.executeLocked("someLockKey", () -> someExclusiveResourceCall());
```

-   The remote files channel adapters ((S)FTP, SMB) now can be configured with their specific `AbstractLastModifiedFileListFilter<F>` implementation
    
-   The custom `SftpClient` can now be configured on extension of the `DefaultSftpSessionFactory` via overridden `createSftpClient()` method.
    
-   Debezium Inbound Channel Adapter to tail transactional logs from databases
    
-   The `spring-integration-security` module has been fully deprecated in favor of respective utilities in `spring-security-messaging` module. See more information in the [Spring Integration Security documentation](https://docs.spring.io/spring-integration/reference/security.html)
    

Many thanks to everyone contributed!

See [What's New](https://docs.spring.io/spring-integration/reference/6.2/whats-new.html#whats-new) in the documentation and don't forget about a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.1-to-6.2-Migration-Guide).

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)