---
title: Spring Session Corn-M2 and Spring Session Bean-SR6 Released
source: https://spring.io/blog/2019/06/18/spring-session-corn-m2-and-spring-session-bean-sr6-released
scraped: 2026-02-23T14:44:17.200Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  June 18, 2019 | 0 Comments
---

# Spring Session Corn-M2 and Spring Session Bean-SR6 Released

_Releases | Rob Winch |  June 18, 2019 | 0 Comments_

*This post was authored by [Vedran Pavić](https://github.com/vpavic)*

On behalf of the community I’m pleased to announce the releases of Spring Session `Corn-M2` and `Bean-SR6`. These releases will be picked up by Spring Boot `2.2.0.M4` and `2.1.6.RELEASE`, respectively.

## [](#spring-session-corn-m2)[](#spring-session-corn-m2)Spring Session `Corn-M2`

The `Corn-M2` release is based on:

-   Spring Session core modules `2.2.0.M2`
    
-   Spring Session Data Geode `2.2.0.M2`
    
-   Spring Session Data MongoDB `2.2.0.M3`
    

Some of the highlights of Spring Session `2.2.0.M2` are:

-   simple Redis-based implementation of `SessionRepository`
    
-   reworked `@Configuration` classes are now compatible with `proxyBeanMethods=false`
    
-   migration of project’s tests to JUnit 5
    
-   simplified project structure
    

Complete details of these releases can be found in [the changelog](https://github.com/spring-projects/spring-session/milestone/61?closed=1).

### [](#simpleredisoperationssessionrepository)[](#simpleredisoperationssessionrepository)`SimpleRedisOperationsSessionRepository`

The biggest highlight of the release is the new, simple, Redis-based implementation of `SessionRepository` that’s offered as an alternative to the well known `RedisOperationsSessionRepository`.

The original `RedisOperationsSessionRepository`, on top of core `SessionRepository` functionality, provides support for session events (that are translated to `HttpSessionEvent` instances) and also implements `FindByIndexNameSessionRepository` (that allows retrieval of sessions for a given principal). The support for these two features comes at a cost, as there’s some complexity around how the sessions need to be [persisted in Redis](https://docs.spring.io/spring-session/docs/current/reference/html5/#api-redisoperationssessionrepository-storage).

For many applications, support for session events and principal index isn’t essential and this was the main motivation for providing an alternative in `SimpleRedisOperationsSessionRepository`. The new `SessionRepository` does not yet have a first-class support in Spring Session’s configuration infrastructure, so it can be configured as follows:

```
Copy@EnableSpringHttpSession
public class RedisSessionConfiguration {

    @Autowired
    private RedisConnectionFactory redisConnectionFactory;

    @Bean
    public RedisOperations<String, Object> sessionRedisOperations() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(this.redisConnectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        return redisTemplate;
    }

    @Bean
    public SimpleRedisOperationsSessionRepository sessionRepository(
            RedisOperations<String, Object> sessionRedisOperations) {
        return new SimpleRedisOperationsSessionRepository(sessionRedisOperations);
    }

}
```

Consider giving `Corn-M2` release and `SimpleRedisOperationsSessionRepository` a spin, and let us know of your feedback!

## [](#spring-session-bean-sr6)[](#spring-session-bean-sr6)Spring Session `Bean-SR6`

The `Bean-SR6` release is based on:

-   Spring Session core modules `2.1.7.RELEASE`
    
-   Spring Session Data Geode `2.1.4.RELEASE`
    
-   Spring Session Data MongoDB `2.1.4.RELEASE`
    

Spring Session `2.1.7.RELEASE` is maintenance release that brings a couple of bug fixes together with the usual dependency upgrades. Complete details of these releases can be found in [the changelog](https://github.com/spring-projects/spring-session/milestone/62?closed=1).

[Project Page](https://projects.spring.io/spring-session/) | [Documentation](https://docs.spring.io/spring-session/docs/2.2.0.M2/reference/html5/) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Gitter](https://gitter.im/spring-projects/spring-session) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-session)