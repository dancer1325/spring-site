---
title: Interesting new filters on Spring Cloud Gateway 4.0
source: https://spring.io/blog/2023/01/18/interesting-new-filters-on-spring-cloud-gateway-4-0
scraped: 2026-02-23T10:15:46.754Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Marta Medio |  January 18, 2023 | 2 Comments
---

# Interesting new filters on Spring Cloud Gateway 4.0

_Engineering | Marta Medio |  January 18, 2023 | 2 Comments_

[Spring Cloud Gateway 4.0](https://spring.io/projects/spring-cloud-gateway) is finally here! Thanks to our community contributions we have introduced new features and interesting filters.

This blog post details new noteworthy and explains some of the new filters included, how they work and how you can use it to provide more insights into your applications.

First of all, let's talk about cache! Cache is a complicated issue and that's why we have introduced two new filters related to it, but take into account that these filters can make the gateway memory constrained so use them carefully.

#### [](#cacherequestbody)CacheRequestBody

Manipulating the request body can cause issues if not done properly, so we made it easy for you; with this filter we offer the possibility to cache the request body before it to the downstream and get that body from an exchange attribute. It will be available in the `ServerWebExchange.getAttributes()` under a key defined in `ServerWebExchangeUtils.CACHED_REQUEST_BODY_ATTR` to use it in a later filter.

To configure it, it's simply necessary to indicate the type of body class to convert it to:

```
Copyspring:
  cloud:
    gateway:
      routes:
      - id: cache_request_body_route
        uri: http://downstream
        predicates:
        - Path=/get/**
        filters:
        - name: CacheRequestBody
          args:
            bodyClass: java.lang.String
```

This filter only works with HTTP requests (including HTTPS).

#### [](#localcacheresponsebody)LocalCacheResponseBody

Sometimes your gateway consumes services that you know do not have a change in their response over time. To improve performance and avoid going to the downstream to get the same response on every hit we added a new filter that allows local caching on response body and headers.

This new functionality is implemented at global level but is also available an override of the global configuration at route level to set an specific behavior for those routes that you know need an special treatment.

There are some conditions that must be taken into account:

-   It will only cache bodyless GET requests.
-   It will only cache responses with the following status codes: HTTP 200 (OK), HTTP 206 (Partial Content) and HTTP 301 (Moved Permanently).
-   We're following HTTP Cache-Control specification so it will only cache if the `Cache-Control` header allows it. That means it doesn't have any of the following values: `no-store` present in the request, `no-store` or `private` present in the response. Additionally, if the response is already cached and a new request is performed with `no-cache` value at `Cache-Control` header, it will return a bodyless response with status code HTTP 304 (Not Modified).

To activate this global cache filter, just set to `true` the following property: `spring.cloud.gateway.filter.local-response-cache.enabled`

We make available a couple of configuration properties to manage how cache on the responses should work, with `spring.cloud.gateway.filter.local-response-cache.size` you can set the maximum size of the cache to evict entries, it takes size format in `KB`, `MB` and `GB`; and `spring.cloud.gateway.filter.local-response-cache.timeToLive` property sets time to expire a cache entry expressed in `s` for seconds, `m` for minutes and `h` for hours.

```yaml
Copyspring:
  cloud:
    gateway:
      filter:
	  local-response-cache:
	    enabled: true
	    timeToLive: 20m
	    size: 6MB
```

If none of these parameters are configured but the property to activate the global filter is enabled, Gateway configures by default 5 minutes of time to live for the cached response without any size limit.

As mentioned earlier, we offer the possibility of overriding the global configuration implementing the filter per route. Just take into account that it's mandatory to have the global filter enabled to set up a configuration per route! The route configuration accepts a first parameter to override the maximum size of the cache to evict entries for this route (size format in `KB`, `MB` and `GB`) and a second parameter to override the time to expire a cache entry (expressed in `s` for seconds, `m` for minutes and `h` for hours):

```yaml
Copyspring:
 cloud:
   gateway:
     routes:
     - id: local_response_cache_get_route
       uri: http://downstream
       predicates:
       - Path=/get/data
       filters:
       - LocalResponseCache=10s,10MB
```

An interesting thing behind this functionality is that it also implements the calculation of the `max-age` value in the HTTP `Cache-Control` header. So if `max-age` is present on the original response the value will be rewritten with the number of seconds set in the `timeToLive` configuration parameter, and in consecutive calls this value will be recalculated with the number of seconds left until the response expires.

#### [](#addrequestheadersifnotpresent)AddRequestHeadersIfNotPresent

The name of the filter almost explains itself, is quite similar to how `AddRequestHeader` works, but unlike `AddRequestHeader` it will only add the header when it's not already present in the request. Otherwise, the original value in the client request is sent.

It takes a collection of name and value pairs separated by colon:

```yaml
Copyspring:
 cloud:
   gateway:
     routes:
     - id: add_request_header_route
       uri: http://downstream
       predicates:
       - Path=/colors
       filters:
       - AddRequestHeadersIfNotPresent=X-Request-Color:blue,X-Header-Color:red
```

It also supports URI variables used to match a path or host:

```yaml
Copyspring:
 cloud:
   gateway:
     routes:
     - id: add_request_header_route
       uri: http://downstream
       predicates:
       - Path=/colors/{segment}
       filters:
       - AddRequestHeadersIfNotPresent=X-Request-Red:blue-{segment}
```

And you also can set a multi-valued header! Just add the header name/value multiple times:

```yaml
Copyspring:
 cloud:
   gateway:
     routes:
     - id: add_request_header_route
       uri: http://downstream
       predicates:
       - Path=/colors/
       filters:
       - AddRequestHeadersIfNotPresent=X-Request-Color:blue,X-Request-Color:green
```

#### [](#removejsonattributesresponsebody)RemoveJsonAttributesResponseBody

JSON is one of the most used formats to represent data, that's why we want to add more specific features to work with responses in this format. This filter provides a convenient method to apply a transformation to JSON body content by deleting attributes from it.

It takes a collection of attribute names to search for, an optional last parameter from the list can be a boolean to remove the attributes just at root level (that's the default value, `false`, if not present at the end of the parameter configuration) or recursively (`true`).

```yaml
Copyspring:
 cloud:
   gateway:
     routes:
     - id: remove_json_attributes_route
       uri: https://downstream
 	 predicates:
       - Path=/json/
       filters:
       - RemoveJsonAttributesResponseBody=created_date,color
```

The above configuration will remove attributes from the JSON content body but only at root level.

```yaml
Copyspring:
 cloud:
   gateway:
     routes:
     - id: remove_json_attributes_route
       uri: https://downstream
 	 predicates:
       - Path=/json/
       filters:
       - RemoveJsonAttributesResponseBody=created_date,color,true
```

Adding that true attribute at the end will remove attributes from the JSON content body at any level of the JSON structure.

These filters add powerful new capabilities. We'd like to hear from you how they support your use case and how we can improve your productivity. You can find more about this new filter and other functionalities in [its reference documentation](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#gatewayfilter-factories).

Thanks to all those who have contributed with reports and pull requests!

### [](#additional-resources)Additional Resources

Want to learn more about Spring Cloud? Join us virtually at [SpringOne](https://springone.io/)! Want to know more about Spring Cloud Gateway offer? Take a look at [our commercial platform with Kubernetes support](https://docs.vmware.com/en/VMware-Spring-Cloud-Gateway-for-Kubernetes/index.html).