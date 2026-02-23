---
title: Spring for Android 2.0.0.M2 released
source: https://spring.io/blog/2014/12/09/spring-for-android-2-0-0-m2-released
scraped: 2026-02-23T22:04:02.343Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  December 09, 2014 | 2 Comments
---

# Spring for Android 2.0.0.M2 released

_Releases | Roy Clarkson |  December 09, 2014 | 2 Comments_

I am pleased to announce that Spring for Android 2.0.0.M2 is now available in the Spring milestone repository. Highlights include:

-   Support for the Android port of [HttpClient 4.3](https://hc.apache.org/httpcomponents-client-4.3.x/android-port.html) via HttpComponentsClientHttpRequestFactory
-   Support for HttpClient 4.0 included with Android is now deprecated but will remain available through HttpComponentsAndroidClientHttpRequestFactory.
-   HTTP PATCH support in RestTemplate
-   The type conversion package from Spring Core is now available in Spring for Android Core.
-   Many improvements and fixes from Spring 3.2 are now merged into Spring for Android to bring baseline compatibility to Spring 3.2, while certain RestTemplate features from Spring 4.1 have been included to support the new HttpClient.
-   Other bug fixes and improvements

### [](#httpclient-43)HttpClient 4.3

If HttpClient 4.3 for Android is available on the classpath it will be configured as the default HTTP client. Include the following dependency in your `build.gradle` to utilize the new HttpClient.

```groovy
Copydependencies {
    compile 'org.apache.httpcomponents:httpclient-android:4.3.5'
}
```

### [](#minimum-version)Minimum Version

The minimum supported version is Android 2.2 (API level 8), however it now accounts for 0.5% of Android devices on the Android developer [Dashboards](https://developer.android.com/about/dashboards/index.html). We recommend Android 2.3 as a minimum target for new apps, as third-party libraries such as Jackson 2.4 and OkHttp require Android 2.3 and newer.

### [](#conclusion)Conclusion

For a complete list of changes, see the [Release Notes](https://jira.spring.io/browse/ANDROID) in JIRA. The [reference documentation](http://docs.spring.io/spring-android/docs/2.0.0.M2/reference/htmlsingle/) has also been updated to cover the new features.

Thanks again to everyone that has contributed to the release! Please try this new milestone and report any problems in [JIRA](https://jira.spring.io/browse/ANDROID) or on [GitHub](https://github.com/spring-projects/spring-android/issues).