---
title: Spring Integration 6.2.0 Milestone 3 Available
source: https://spring.io/blog/2023/09/20/spring-integration-6-2-0-milestone-3-available
scraped: 2026-02-23T09:22:43.607Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 20, 2023 | 0 Comments
---

# Spring Integration 6.2.0 Milestone 3 Available

_Releases | Artem Bilan |  September 20, 2023 | 0 Comments_

Dear Spring community,

On behalf of Spring Integration team, it is my pleasure to announce `6.2.0-M3` version which is available from [Spring Milestone](https://repo.spring.io/milestone) repository.

In addition, bug fixes version `6.1.3` has been released as well into Maven Central.

Since the previously announced [Milestone 1](https://spring.io/blog/2023/07/19/spring-integrtion-6-2-milestone-1-available), these changes have made it into a new Spring Integration generation:

-   The documentation migrated to Antora site generator and hosted alongside with other migrated Spring projects [here](https://docs.spring.io/spring-integration/reference/6.2/index.html)
    
-   The project build lifecycle is now connected to [Gradle Enterprise](https://ge.spring.io/scans?search.rootProjectNames=spring-integration), so every one contributing can now benefit from remote shared cache for Gradle tasks
    
-   The `LockRegistry` interface provides a template-like `executeLocked()` API:
    

```java
Copy registry.executeLocked("someLockKey", () -> someExclusiveResourceCall());
```

-   The remote files channel adapters ((S)FTP, SMB) now can be configured with their specific `AbstractLastModifiedFileListFilter<F>` implementation
    
-   The custom `SftpClient` can now be configured on extension of the `DefaultSftpSessionFactory` via overridden `createSftpClient()` method.
    
-   Some other minor improvements and bug-fixes back-ported to other supported versions.
    

My personal appreciation for community contributors: [Adama Sorho](https://github.com/AdamaSorho), [Myeonghyeon-Lee](https://github.com/mhyeon-lee)

See [What's New](https://docs.spring.io/spring-integration/docs/6.2.0-M3/reference/html/whats-new.html#whats-new) in the documentation and don't forget about a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.1-to-6.2-Migration-Guide).

Now we are heading to Release Candidate phase in October where we are going to wrap up new features and breaking changes for Spring Integration `6.2`, therefore this is the last chance to contribute something what cannot wait for the next version.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)