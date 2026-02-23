---
title: The latest on Azure Active Directory integration
source: https://spring.io/blog/2021/01/13/the-latest-on-azure-active-directory-integration
scraped: 2026-02-23T13:35:46.322Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Clement |  January 13, 2021 | 12 Comments
---

# The latest on Azure Active Directory integration

_Engineering | Andy Clement |  January 13, 2021 | 12 Comments_

Whether you are building a web API, mobile front end or a good-old fashioned desktop application, identity and access management will always be foundational pieces that are front and center in writing software. Azure offers a great platform to democratize your application development journey, as it not only offers a cloud-base identity service, but also deep integration with the rest of the Azure ecosystem. Spring Security has made it easy to secure your Spring based applications with powerful abstractions and extensible interfaces. However as powerful as the Spring framework can be, it is not tailored to a specific identity provider. The Azure Spring Boot Starter for Azure Active Directory is the result of collaborative efforts from Microsoft and VMware to provide the most optimal way to connect your application to an Azure AD tenant and protect resource APIs with Azure Active Directory. Case in point, there are scenarios where you may want to authorize against multiple resource servers, and you can simply do that by including multiple authorization clients in your application configuration.

To get started with the Azure Spring boot starter for Azure Active Directory, connect your application to an Azure AD tenant, and include the following configuration in your `application.yml`:

```
Copyazure:
  activedirectory:
    tenant-id: xxxxxx-your-tenant-id-xxxxxx
    client-id: xxxxxx-your-client-id-xxxxxx
    client-secret: xxxxxx-your-client-secret-xxxxxx
    authorization-clients:
      graph:
        scopes:
            - https://graph.microsoft.com/User.Read
            - https://graph.microsoft.com/Directory.AccessAsUser.All
```

Get the `OAuth2AuthorizedClient` in your Controller:

```
Copy@GetMapping("/graph")
@ResponseBody
public String graph(
    @RegisteredOAuth2AuthorizedClient("graph") OAuth2AuthorizedClient client
) {
// Now you can use the access token to access a graph URI
}
```

For more detail see our [sample project](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/spring/azure-spring-boot-samples/azure-spring-boot-sample-active-directory-webapp).

Let’s look at some of the recent enhancements in the starter:

## [](#web-applications)[](#web-applications)Web applications

### [](#integration-with-microsoft-api)[](#integration-with-microsoft-api)Integration with Microsoft API

The identity platform provides Microsoft APIs to interact with many well-known Microsoft SaaS applications. For example, use the graph API to interact with Office 365, Azure DevOps to talk to with Azure DevOps server and Azure Batch to schedule HPC applications in the cloud. To use the graph API First configure your `application.yml`:

```
Copyazure:
  activedirectory:
    authorization-clients:
      graph:
        scopes:
            - https://graph.microsoft.com/User.Read
            - https://graph.microsoft.com/Directory.AccessAsUser.All
```

And then get the `OAuth2AuthorizedClient` in your Controller.

### [](#incremental-consent)[](#incremental-consent)Incremental consent

You can incrementally approve your application access to resources and APIs as needed. This type of behavior is desirable when you want to have finer control of access management, as opposed to granting all scopes upfront. To utilize incremental consent in a web application, configure your `application.yml`:

```
Copyazure:
  activedirectory:
    authorization-clients:
      arm:
        on-demand: true
        scopes: https://management.core.windows.net/user_impersonation
```

Incremental consent is triggered when an application tries to get corresponding `OAuth2AuthorizedClient`. It can also be triggered by accessing the URL: `/login/oauth2/code/{authorization-client}`

### [](#integrate-with-aad-for-logout)[](#integrate-with-aad-for-logout)Integrate with AAD for logout

Add `azure.activedirectory.post-logout-redirect-uri` in your configuration properties and your application will automatically log out all active sessions when the user performs a log out, and then redirect the user to the `logout-redirect-uri`.

See [this web application sample project](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/spring/azure-spring-boot-samples/azure-spring-boot-sample-active-directory-webapp) for more detail. (This sample includes all 3 scenarios)

## [](#resource-server)[](#resource-server)Resource server

### [](#aad-protected-resource-server)[](#aad-protected-resource-server)AAD protected resource server

In OAuth 2.0, a resource server is an application that protects underlying resources with a token. In this release we’ve added validation for Audience and Issuer to ensure intended audience and issuer are respected. See the [resource server sample project](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/spring/azure-spring-boot-samples/azure-spring-boot-sample-active-directory-resource-server) for details.

### [](#on-behalf-of-flow-with-spring-resource-server)[](#on-behalf-of-flow-with-spring-resource-server)On Behalf-of-flow with spring resource server

When your application calls API A with a token, and API A in turn calls API B, a different token is required before API B can be accessed. OAuth 2.0 provides an On-Behalf-Of (OBO) flow that is designed to handle this common scenario. With the Azure Spring Boot Starter for Azure Active Directory, you can delegate a user identity request and propagate through the request chain.

See [the resource server with OBO sample project](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/spring/azure-spring-boot-samples/azure-spring-boot-sample-active-directory-resource-server-obo) for details.

### [](#other-notable-changes)[](#other-notable-changes)Other notable changes

#### [](#pack-id-change)[](#pack-id-change)Pack ID change:

To align with the rest of Azure SDKs, starting from 3.x, the package ID for Azure Spring Boot starters has been renamed from `azure-[startername]-spring-boot` to `azure-spring-boot-[startername]`.

#### [](#latest-versions)[](#latest-versions)Latest versions:

Version 3.0.0 is released and includes support for Spring boot 2.2.x and 2.3.x