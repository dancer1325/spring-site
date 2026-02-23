---
title: Spring Integration 4.3.10 is Available
source: https://spring.io/blog/2017/06/08/spring-integration-4-3-10-is-available
scraped: 2026-02-23T16:27:02.287Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  June 08, 2017 | 0 Comments
---

# Spring Integration 4.3.10 is Available

_Releases | Artem Bilan |  June 08, 2017 | 0 Comments_

On behalf of the Spring Integration team, I am pleased to announce that the [4.3.10.RELEASE](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=16061) of Spring Integration is now available.

This release contains a few important bug fixes as well as a couple of improvements.

One of the most interesting feature is customized Jackson `ObjectMapper` which is aware of `Message` and `MessageHeaders` serialization/deserialization to/from JSON. This functionality is useful in those components which allow to configure custom serializer/deserializer, for example `RedisMessageStore`:

```
CopyRedisMessageStore store = new RedisMessageStore(redisConnectionFactory);

ObjectMapper mapper = JacksonJsonUtils.messagingAwareMapper();

GenericJackson2JsonRedisSerializer serializer =
                             new GenericJackson2JsonRedisSerializer(mapper);
store.setValueSerializer(serializer);
```

And messages and message groups will be stored in Redis in the JSON format.

This version will be the default version with the upcoming Spring Boot `1.4.7` and `1.5.4` releases.

Also this version with its new [ErrorMessagePublisher](https://jira.spring.io/browse/INT-4257) foundation is important for error handling functionality in the upcoming [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream/) `Ditmars`.

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)