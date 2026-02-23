---
title: Spring for Android 2.0.0.M1 released
source: http://spring.io/blog/2014/09/16/spring-for-android-2-0-0-m1-released
scraped: 2026-02-23T22:14:30.245Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  September 16, 2014 | 0 Comments
---

# Spring for Android 2.0.0.M1 released

_Releases | Roy Clarkson |  September 16, 2014 | 0 Comments_

I am pleased to announce that Spring for Android 2.0.0.M1 is now available in the [Spring milestone repository](https://repo.spring.io/milestone). Highlights include:

-   Generics support through the use of `ParameterizedTypeReference`
-   Support for OkHttp via `OkHttpRequestFactory`
-   RestTemplate API parity with Spring Framework
-   Bug fixes and improvements

### [](#minimum-version)Minimum Version

This release raises the minimum version from Android 2.1 (API level 7) to Android 2.2 (API level 8). The Google Play Store app is no longer supported on Android 2.1 and that version is not being tracked on the Android developer [Dashboards](https://developer.android.com/about/dashboards/index.html). Additionally, OkHttp is only supported on Android 2.3 and newer.

### [](#generic-types)Generic Types

The following is an example of how to consume generic types with Rest Template:

```java
CopyParameterizedTypeReference<List<String>> typeRef = 
        new ParameterizedTypeReference<List<String>>() {};

ResponseEntity<List<String>> responseEntity = 
        restTemplate.exchange(url, HttpMethod.GET, requestEntity, typeRef);

List<String> strings = responseEntity.getBody();
```

### [](#api-parity)API Parity

In order to maintain parity with Spring Framework's Rest Template library, this release introduces a few breaking changes. Specifically, note the `RestTemplate` constructors have changed. The default constructor now creates a standard set of `HttpMessageConverters`. The recommended way to prevent default message converters from being created is to use the following new constructor:

```java
Copypublic RestTemplate(List<HttpMessageConverter<?>> messageConverters)
```

### [](#conclusion)Conclusion

For a complete list of changes, see the [Release Notes](https://jira.spring.io/browse/ANDROID) in JIRA. The [reference documentation](http://docs.spring.io/spring-android/docs/2.0.0.M1/reference/htmlsingle/) has also been updated to cover the new features.

Thanks again to everyone that has contributed to the release! Please try this new milestone and report any problems in [JIRA](https://jira.spring.io/browse/ANDROID) or on [GitHub](https://github.com/spring-projects/spring-android/issues).