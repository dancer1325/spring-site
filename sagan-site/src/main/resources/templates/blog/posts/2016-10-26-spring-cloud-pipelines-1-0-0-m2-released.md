---
title: Spring Cloud Pipelines 1.0.0.M2 Released
source: https://spring.io/blog/2016/10/26/spring-cloud-pipelines-1-0-0-m2-released
scraped: 2026-02-23T19:00:16.901Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  October 26, 2016 | 0 Comments
---

# Spring Cloud Pipelines 1.0.0.M2 Released

_Releases | Marcin Grzejszczak |  October 26, 2016 | 0 Comments_

On behalf of the Spring Cloud team it is my pleasure to announce a new milestone release of Spring Cloud Pipelines - `1.0.0.M2`. Apart from some bug fixes it’s providing an out of the box support for Gradle projects.

In order for the Gradle project to work out of the box the following opinionated decisions were taken:

-   usage of Gradlew Wrapper
    
-   custom `deploy` task is used for artifacts deployment
    
-   running smoke tests on a deployed app via the custom `smoke` task
    
-   running end to end tests on a deployed app via the custom `e2e` task
    
-   custom `groupId` task to retrieve group id
    
-   custom `artifactId` task to retrieve artifact id
    
-   custom `currentVersion` task to retrieve the current version
    
-   custom `stubIds` task to retrieve list of collaborators for which stubs should be downloaded
    

Example implementation of these tasks can be found [here](https://github.com/spring-cloud-samples/github-analytics/blob/master/gradle/pipeline.gradle). We’re pasting its contents below:

```
Copytest {
    description = "Task to run unit and integration tests"
    testLogging {
        exceptionFormat = 'full'
    }
    jvmArgs = systemPropsFromGradle()
    exclude 'smoke/**'
    exclude 'e2e/**'
}

task smoke(type: Test) {
    description = "Task to run smoke tests"
    testLogging {
        exceptionFormat = 'full'
    }
    jvmArgs = systemPropsFromGradle()
    include 'smoke/**'
}

task e2e(type: Test) {
    description = "Task to run end to end tests"
    testLogging {
        exceptionFormat = 'full'
    }
    jvmArgs = systemPropsFromGradle()
    include 'e2e/**'
}

task deploy(dependsOn: 'publish') {
    description = "Abstraction over publishing artifacts to Artifactory / Nexus"
}

task groupId << {
    println projectGroupId
}
groupId.description = "Task to retrieve Group ID"

task artifactId << {
    println projectArtifactId
}
artifactId.description = "Task to retrieve Artifact ID"

task currentVersion << {
    println projectVersion
}
currentVersion.description = "Task to retrieve version"

task stubIds << {
    println stubrunnerIds
}
stubIds.description = "Task to retrieve Stub Runner IDS"

[test, smoke, e2e, deploy, groupId, artifactId, currentVersion, stubIds].each {
    it.group = "Pipeline"
}

private List<String> systemPropsFromGradle() {
    return project.gradle.startParameter.systemPropertiesArgs.entrySet().collect { "-D${it.key}=${it.value}" }
}
```

Unlike most of Spring projects this one is not available at any repository since it’s not a library, but instead it is available as a github repo for you to download and use as template for creating a deployment pipeline.

Please check out any of these links for more information or to contact us:

-   [Project page](http://cloud.spring.io/spring-cloud-pipelines/)
    
-   [Project documentation](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html)
    
-   [Concourse opinionated pipeline setup](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html#concourse)
    
-   [Concourse Website](http://concourse.ci)
    
-   [Jenkins opinionated pipeline setup](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html#jenkins)
    
-   [Jenkins Job Dsl Plugin](https://github.com/jenkinsci/job-dsl-plugin/wiki)
    
-   [Spring Cloud Pipelines Gitter](https://gitter.im/spring-cloud/spring-cloud-pipelines)
    
-   [Spring Cloud Pipelines GitHub page](https://github.com/spring-cloud/spring-cloud-pipelines)