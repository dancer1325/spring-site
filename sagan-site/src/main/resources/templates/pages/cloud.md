* Spring
  * support any Cloud platform

# Cloud

* distributed systems
  * complexity 
    * | network layer 
    * demands greater interaction BETWEEN services
* if you want to make your code ‘cloud-native’ -> address [12-factor issues](https://12factor.net/)
  * _Examples:_ external configuration, statelessness, logging, and connecting to backing services

* Spring Cloud
  * == suite of projects

# Spring Cloud architecture highlights

![](static/cloudHighlight.svg)

    
# Service discovery

* allow
  * applications can know other services exact location 
* _Example of service registry:_
  * [Netflix Eureka](https://github.com/Netflix/eureka)
  * [HashiCorp Consul](https://www.consul.io/)
    * sidecar solution

* Spring Cloud
  * provides
    * `DiscoveryClient` implementations -- for -- popular registries
      * [Eureka](https://spring.io/projects/spring-cloud-netflix)
      * [Consul](https://spring.io/projects/spring-cloud-consul)
      * [Zookeeper](https://spring.io/projects/spring-cloud-zookeeper)
      * [Kubernetes](https://spring.io/projects/spring-cloud-kubernetes)
  * [guide1](https://github.com/spring-guides/gs-spring-cloud-loadbalancer)
  * [guide2](https://github.com/spring-guides/gs-service-registration-and-discovery)

# [Spring Cloud API gateway](https://spring.io/projects/spring-cloud-gateway)

* uses
  * many clients & servers
* allows
  * securing and routing messages
  * hiding services
    * -- via -- service discovery
  * throttling load
    * -- via -- load-balancing solution
* enable you
  * controlling precisely your API layer

* [blog](../blog/posts/2019-06-18-getting-started-with-spring-cloud-gateway.md)
* [use case](https://youtube.com/watch?v=RRMO4oNptoQ)

# [Spring Cloud Config](https://spring.io/projects/spring-cloud-config)

* NOT embed | application
* requirements of the configuration
  * flexible enough / cope with MULTIPLE applications, environments, and service instances
  * can deal with dynamic changes WITHOUT downtime
* store the configuration | Git repository
* [guide](https://github.com/spring-guides/gs-centralized-configuration)

# [Spring Cloud Circuit breakers](https://spring.io/projects/spring-cloud-circuitbreaker)
 
* can help you mitigate
  * unreliability of distributed systems
  * requests' timeouts OR failures 
* ALLOWED options
  * [Resilience4J](https://resilience4j.readme.io/docs/getting-started)
  * [Sentinel](https://github.com/alibaba/Sentinel/wiki/Circuit-Breaking)
  * [Hystrix](https://github.com/Netflix/Hystrix/wiki) 
* [guide](https://github.com/spring-guides/gs-cloud-circuit-breaker)

# Tracing

* allows
  * debugging distributed applications

* use cases
  * distributed services

* [Micrometer Tracing](https://docs.micrometer.io/tracing/reference/)
  * can instrument your applications -- via --
    * predictable way
    * repeatable way
  * \+ [OpenZipkin Brave](https://github.com/openzipkin/brave) or [OpenTelemetry](https://opentelemetry.io/)

* [Zipkin and Distributed Tracing](https://www.youtube.com/watch?v=CFLZJSwbYI0)

# Testing

* | cloud,
  * PRETTY important: APIs / reliable, trustworthy, stable
    * Reasons: 
      * dependency BETWEEN services
      * network issues related

* Spring Cloud Contract
  * == contract-based testing
    * allows
      * stay on track
  * uses
    * REST & messaging-based APIs / 
      * contracts written | Groovy, Java, or Kotlin
  * [guide](https://github.com/spring-guides/gs-contract-rest)
