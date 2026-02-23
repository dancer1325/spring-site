---
title: Spring Cloud Data Flow 2.5.0.M1 Released
source: https://spring.io/blog/2020/03/20/spring-cloud-data-flow-2-5-0-m1-released
scraped: 2026-02-23T14:07:50.112Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ilayaperumal Gopinathan |  March 20, 2020 | 0 Comments
---

# Spring Cloud Data Flow 2.5.0.M1 Released

_Engineering | Ilayaperumal Gopinathan |  March 20, 2020 | 0 Comments_

Spring Cloud Data Flow team is pleased to announce the first milestone release of 2.5.0.M1.

The first milestone release of 2.5.0 consists of performance improvements addressed at application status retrieval for streams in Cloud Foundry. This also involves revamping the runtime application view page along with better pagination for streams at the SCDF dashboard. You can see more information on these improvements on the recently released SCDF [2.4.2 GA](https://spring.io/blog/2020/03/11/spring-cloud-data-flow-2-4-2-ga-released).

This milestone release also consists of some important bug fixes mentioned in [here](https://github.com/spring-cloud/spring-cloud-dataflow/releases/tag/v2.5.0.M1)

Please note that Spring Cloud Data Flow 2.5.x is compatible only with the Spring Cloud Skipper 2.3.2.RELEASE and above. When upgrading Spring Cloud Data Flow 2.5.0.M1, Spring Cloud Skipper also needs to be updated to 2.3.2.RELEASE and above. The current milestone on Spring Cloud Skipper release is 2.4.0.M1.

What’s coming next:

We are working on a feature to support application `metadata` as part of the `Docker` images. Currently, we support application whitelisting only via maven artifact. With this new feature, one can configure the application metadata when creating the docker image.

Support for `Azure AD` as an identity provider is in the works.

## [](#stay-in-touch)Stay in touch...

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).