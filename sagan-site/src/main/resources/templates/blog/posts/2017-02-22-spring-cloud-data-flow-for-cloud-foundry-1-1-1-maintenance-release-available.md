---
title: Spring Cloud Data Flow for Cloud Foundry 1.1.1 Maintenance release available
source: https://spring.io/blog/2017/02/22/spring-cloud-data-flow-for-cloud-foundry-1-1-1-maintenance-release-available
scraped: 2026-02-23T18:36:41.039Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eric Bottard |  February 22, 2017 | 2 Comments
---

# Spring Cloud Data Flow for Cloud Foundry 1.1.1 Maintenance release available

_Releases | Eric Bottard |  February 22, 2017 | 2 Comments_

The 1.1.1.RELEASE maintenance release of Spring Cloud Data Flow for Cloud Foundry is now available and includes a variety of stability and performance improvements. Following are the highlights:

-   **Stability Improvements** The instability problems when using SCDF’s 1.1.0.RELEASE on PCF manifested to the users in the following forms.
    
    -   `stream list` operation would hang and eventually time out with “IllegalStateException: 503 Bad Gateway” or “IllegalStateException: Timeout on block read” exceptions. This is addressed in the cf-java-client library.
        
    -   With SCDF server sitting cold/idle for a period of time and with OAUTH token refresh routine happening in the background, any new operation to the server would never complete. The OAUTH refresh token routine had a bug in successfully negotiating for new tokens. This is addressed in the cf-java-client library.
        
-   **Error Handling Improvements** The improved error handling and logging support include the operations and its call chain details. This is especially useful when performing 100s of stream/task operations in SCDF, and if anything fails in the process, it will be easy to correlate and determine the root-cause more efficiently. There has been error handling improvements in SCDF’s cf-deployer, cf-java-client, and reactor-core projects.
    
-   **Network Call Optimizations** While invoking `stream list` from the shell or navigating to the equivalent stream list page in the Dashboard, we were performing a network call for each application associated with the stream(s). This is now refactored and replaced to efficiently query for all the application statuses in a single network call if the backing runtime supports it (and the Cloud Foundry deployer certainly does). This change significantly improves the user-experience of the stream listing operation.
    
-   **Stress/Load Testing** In the process of addressing above mentioned instability patterns, we have built a comprehensive integration and acceptance test harness. With the load-testing routines simulating 100s of concurrent operations on the server including “stream creates”, “stream deploys”, “stream destroys”, and “stream lists”, we were able to monitor the overall health of the SCDF server and as well correlate to confirm the successful execution of operations in entirety.
    

For more details on the [CF-deployer](https://github.com/spring-cloud/spring-cloud-deployer-cloudfoundry) and [CF-server](https://github.com/spring-cloud/spring-cloud-dataflow-server-cloudfoundry) improvements, please refer to the respective release markers [here](https://github.com/spring-cloud/spring-cloud-deployer-cloudfoundry/milestone/11?closed=1) and [here](https://github.com/spring-cloud/spring-cloud-dataflow-server-cloudfoundry/milestone/13?closed=1).