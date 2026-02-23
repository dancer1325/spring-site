---
title: Spring Cloud Data Flow 1.2 M3 released
source: https://spring.io/blog/2017/03/22/spring-cloud-data-flow-1-2-m3-released
scraped: 2026-02-23T16:36:47.134Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  March 22, 2017 | 0 Comments
---

# Spring Cloud Data Flow 1.2 M3 released

_Releases | Thomas Risberg |  March 22, 2017 | 0 Comments_

On behalf of the team, I am excited to announce the release of the third milestone of Spring Cloud Data Flow 1.2.

*Note:* A great way to start using this new release(s) is to follow the [release matrix](http://cloud.spring.io/spring-cloud-dataflow/#spring-cloud-data-flow-implementations) on the project page, which includes the download coordinates and the links to the reference guide.

## [](#highlights-of-the-12-m3-release)Highlights of the 1.2 M3 release:

### [](#companion-metadata-artifact)Companion Metadata Artifact

As part of the long awaited feature to improve access to app properties info for both shell and Dashboard, we are introducing a new optional artifact for both Stream and Task applications - we are calling it the [“companion metadata artifact”](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.0.M3/reference/htmlsingle/#spring-cloud-dataflow-stream-app-metadata-artifact). Through this functionality, the streaming and task applications and their properties are first-class citizens for both Docker and Maven based application artifacts.

The companion metadata artifact is a thin lightweight jar artifact that includes the properties metadata as JSON and it is generated for each of the out-of-the-box application. Given the smaller size of this artifact, we are pre-fetching the metadata files at the event of app registration. Any downstream operation including the `app info <app-type>:<app-name>` shell command or the loading of properties dialog window on the Dashboard, you will find the application properties populating more efficiently as opposed to waiting for the entire uber-jar to download.

A new [maven plugin](https://github.com/spring-cloud/spring-cloud-app-starters-maven-plugins/tree/master/spring-cloud-app-starter-metadata-maven-plugin) has been introduced with this feature. Any custom application can use this plugin to generate the companion metadata artifact.

*Note:* It is not mandatory to register applications with the companion metadata artifact, we are still retaining the prior experience, and it will continue to work as expected.

### [](#environment-info-endpoint)Environment Info Endpoint

The “/about” RESTful endpoint is updated to probe the respective runtime environments for details including dependencies, versions, feature-toggles, platform versions, etc.. The endpoint can be useful for version compatibility checks and bug-reporting. This same information is available from a "Show Details" button on the Dashboard's "About" page and can be copied to the clipboard from that detail page.

```javascript
Copy{
	"featureInfo": {
		"analyticsEnabled": true,
		"streamsEnabled": true,
		"tasksEnabled": true
	},
	"versionInfo": {
		"implementation": {
			"name": "spring-cloud-dataflow-server-local",
			"version": "1.2.0.M3"
		},
		"core": {
			"name": "Spring Cloud Data Flow Core",
			"version": "1.2.0.M3"
		},
		"dashboard": {
			"name": "Spring Cloud Dataflow UI",
			"version": "1.2.0.M2"
		},
		"commitId": "d10dfcd5626dfe38fdb6059af21430743e28f545",
		"shortCommitId": "d10dfcd",
		"commitTime": "2017-03-21T18:33:04.000Z",
		"branch": "master"
	},
	"securityInfo": {
		"authenticationEnabled": false,
		"authorizationEnabled": true,
		"formLogin": false,
		"authenticated": false,
		"username": null,
		"roles": []
	},
	"runtimeEnvironment": {
		"appDeployer": {
			"deployerImplementationVersion": "1.2.0.M3",
			"deployerName": "LocalAppDeployer",
			"deployerSpiVersion": "1.2.0.M3",
			"javaVersion": "1.8.0_101",
			"platformApiVersion": "Mac OS X 10.11.6",
			"platformClientVersion": "10.11.6",
			"platformHostVersion": "10.11.6",
			"platformSpecificInfo": {},
			"platformType": "Local",
			"springBootVersion": "1.5.2.RELEASE",
			"springVersion": "4.3.7.RELEASE"
		},
		"taskLauncher": {
			"deployerImplementationVersion": "1.2.0.M3",
			"deployerName": "LocalTaskLauncher",
			"deployerSpiVersion": "1.2.0.M3",
			"javaVersion": "1.8.0_101",
			"platformApiVersion": "Mac OS X 10.11.6",
			"platformClientVersion": "10.11.6",
			"platformHostVersion": "10.11.6",
			"platformSpecificInfo": {},
			"platformType": "Local",
			"springBootVersion": "1.5.2.RELEASE",
			"springVersion": "4.3.7.RELEASE"
		}
	},
	"_links": {
		"self": {
			"href": "http://localhost:9393/about"
		}
	}
}
```

### [](#deployer-properties-parsing-improvements)Deployer Properties Parsing Improvements

In the previous 1.2.M1 release, we have differentiated the notion of apps vs. deployer properties at the DSL level. This differentiation had residual side effects to overall parsing behavior in certain scenarios. The parser constructs have been revisited and the inconsistencies were resolved.

### [](#role-awareness-for-shell)Role Awareness for Shell

In 1.2 M2/M3, we have added the foundation for RBAC and the support for it in the Dashboard. The support for [Shell to be role-aware](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.0.M3/reference/htmlsingle/#authorization-shell-and-dashboard) is now available.

### [](#spring-cloud-stream-app-starters-baconrc1)Spring Cloud Stream App Starters Bacon.RC1

The next installment of [Spring Cloud Stream App Starters Bacon.RC1](https://github.com/spring-cloud-stream-app-starters/app-starters-release/releases/tag/vBacon.RC1) release is promoted. This release builds upon Spring Cloud Dalston.RC1 and Spring Cloud Stream Chelsea.RC1 improvements and bug-fixes. As always, we generate out-of-the-box applications for RabbitMQ, Apache Kafka 0.9, and Apache Kafka 0.10 binder implementations. You can find the bit.ly links to import out-of-the-box applications in bulk from the [project site](http://cloud.spring.io/spring-cloud-stream-app-starters/#stream-app-starters-and-spring-cloud-data-flow-).

### [](#spring-cloud-task-app-starters-belmontm1)Spring Cloud Task App Starters Belmont.M1

The recommended task app starters are part of the [Spring Cloud Task App Starters Belmont.M1](https://github.com/spring-cloud-task-app-starters/app-starters-release/releases/tag/vBelmont.M1) release. You can find the bit.ly links to import out-of-the-box applications in bulk from the [project site](http://cloud.spring.io/spring-cloud-task-app-starters/#task-app-starters-and-spring-cloud-data-flow-).

### [](#release-notes)Release Notes

Review the [release notes](https://github.com/spring-cloud/spring-cloud-dataflow/releases/tag/v1.2.0.M3) for more details regarding all issues resolved and also for links to issues resolved in companion projects.

## [](#next-milestone---120rc1)Next Milestone - 1.2.0.RC1

Further enhancements to support Docker artifacts as first-class citizen in Shell, DSL, and the Dashboard.

The ability to orchestrate “composition of batch-jobs or tasks” is making progress. A new set of DSL primitives to support this capability from Shell/UI is underway.

Metrics and monitoring for streaming pipelines is planned for the upcoming release. The ability to drill into individual streaming application performance including its send/receive rates and as well aggregate metrics for the entire pipeline is in the works.

---

Feedback is important. Please reach out to us in [StackOverflow](http://stackoverflow.com/questions/tagged/spring-cloud-dataflow) and [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) for questions and feature requests. We also welcome contributions! Any help improving the [Spring Cloud Data Flow ecosystem](http://cloud.spring.io/spring-cloud-dataflow/#building-blocks-of-spring-cloud-data-flow) is appreciated.