---
title: Secure communications end-to-end for Spring Boot apps – in Zero Trust environment
source: https://spring.io/blog/2021/12/08/secure-communications-end-to-end-for-spring-boot-apps-in-zero-trust-environment
scraped: 2026-02-23T13:01:29.270Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 08, 2021 | 2 Comments
---

# Secure communications end-to-end for Spring Boot apps – in Zero Trust environment

_Engineering | Josh Long |  December 08, 2021 | 2 Comments_

# [](#secure-communications-end-to-end-for-spring-boot-apps---in-a-zero-trust-environment)Secure communications end-to-end for Spring Boot apps - in a Zero Trust environment

Hi, Spring fans! Today, we are excited to announce the general availability of all the features to secure communications end-to-end for Spring Boot apps – in a Zero Trust environment. You can secure communications end-to-end or terminate transport level security at any communication point for Spring Boot apps. You can also automate the provisioning and configuration for all the Azure resources needed for securing communications.

Implementing secure communications as part of your solution architecture can be challenging. Many customers manually rotate their certificates or create their own solutions to automate provisioning and configuration. Even then, there is still data exfiltration risk – say unauthorized copying or transfer of data from server systems. With Azure Spring Cloud, all of this is handled for you; there is no need to figure out the difficult details. Azure Spring Cloud abstracts away most of the complexity, leaving secure communications as configurable and automatable options in the service.

> “Implementing end-to-end encryption and Zero Trust have been at the top of the list of security requirements for our new API platform. Neither requirement was ever achievable on our old platform. Azure Spring Cloud, and its built-in integrations with services like Azure Key Vault and Managed Identities, will finally help us to meet those requirements in an easily automated and manageable way.” – Claus Lund, Infrastructure Engineering Lead, [National Life Group](https://www.nationallife.com/)

> “For Liantis, having secure end-to-end communications is a non-negotiable in our line of business dealing with very sensitive financial, medical and payroll data. Again, Azure Spring Cloud delivers on its promise to abstract most of the complexity, reduce operational overhead associated with certificate provisioning, configuration and certificate rotation in a seamless way using a simple and straightforward integration with Azure Key Vault.” - Kurt Roggen, Infrastructure and Security Architect, [Liantis](https://www.liantis.be/nl?overlay=select-language)

## [](#secure-internet-communications)Secure Internet communications

The TLS/SSL protocol establishes identity and trust, and encrypts communications of all types, making secure communications possible - particularly Web traffic carrying commerce data and personally identifiable information.

You can use any types of SSL certificates – certificates issued by a certificate authority, extended validation certificate, wildcard certificates with support for any number of sub domains, or self-signed certificates for dev and testing environments.

## [](#zero-trust--securely-load-certificates)Zero Trust – securely load certificates

Based on the principle of "never trust, always verify and credential-free", [Zero Trust](https://docs.microsoft.com/en-us/security/zero-trust/) helps to secure all communications by eliminating unknown and un-managed certificates, and only trusts certificates that are shared by verifying identity prior to granting access to those certificates.

To securely load certificates from [Azure Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/), Spring Boot apps use [managed identities](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview) and [Azure role-based access control](https://docs.microsoft.com/en-us/azure/role-based-access-control/), and Azure Spring Cloud uses a provider service principal and Azure role-based access control. This secure loading is powered using the Azure Key Vault [JCA](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/keyvault/azure-security-keyvault-jca) (Java Cryptography Architecture) Provider.

With Azure Key Vault:

-   You control the storage and distribution of certificates to reduce accidental leakage.
-   Applications and services can securely access certificates. Key Vault uses Azure role-based access control to lock down access to only those requiring access, such as an admin of course, but also for apps using the principle of least privilege. Applications and service authenticate and authorize, using Azure Active Directory and Azure role-based access control, to access certificates.
-   You can monitor the access and use of certificates in Key Vault through its full audit trail.

## [](#secure-communications-end-to-end-or-terminate-tls-at-any-point)Secure communications end-to-end or terminate TLS at any point

As illustrated in the diagram below, there are several segments of communications through:

-   Network access points such as Azure Front Door, Azure App Gateway, F5 BIG-IP Local Traffic Manager, Azure API Management and Apigee API Management
-   Spring Boot apps and
-   Backend systems such as databases, messaging and eventing systems and app cache.

You can secure communications end-to-end or terminate transport level security at any communication point for Spring Boot apps.

![](https://github.com/joshlong/blog-images/raw/master/secure-e2e/secure-communications-end-to-end-for-spring-boot-apps.jpg)

### [](#securing-communications-into-azure-spring-cloud)Securing communications into Azure Spring Cloud

**Segment 1** represents securing communications from consumers - like browsers, mobile phones, desktops, kiosks, or network access points like Azure Front Door, Azure App Gateway, F5 BIG-IP Local Traffic Manager, Azure API Management and Apigee API Management - to the ingress controller in Azure Spring Cloud.

By default, segment 1 is secured using a Microsoft supplied SSL certificate for the \*.azuremicroservices.io domain. You can apply your own SSL certificate in Azure Key Vault by binding a custom domain to your app in Azure Spring Cloud. No code is necessary.

### [](#securing-communications-from-ingress-controller-to-apps)Securing communications from ingress controller to apps

**Segment 2** represents securing communications from Azure Spring Cloud’s ingress controller to any app on Azure Spring Cloud. You can enable [TLS/SSL to secure traffic from the ingress controller to an app](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-enable-end-to-end-tls) that supports HTTPS.

A Spring Boot app can use Spring’s approach to enable HTTPS or secure communications by using the [Azure Key Vault Certificates Spring Boot Starter](https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-key-vault-certificates#enable-the-spring-boot-app-to-load-the-tlsssl-certificate) – in three configuration steps to secure communications using an SSL certificate from an Azure Key Vault. No code is necessary.

Step 1 – Include the Azure Key Vault Certificates Spring Boot Starter:

![](https://github.com/joshlong/blog-images/raw/master/secure-e2e/azure-spring-boot-starter-keyvault-certificates-dependency.jpg)

Step 2 – Configure an app to load an SSL certificate from Azure Key Vault by specifying the URI of the Azure Key Vault and the certificate name:

![](https://github.com/joshlong/blog-images/raw/master/secure-e2e/configure-spring-boot-app-to-load-SSL-certificate.jpg)

Step 3 – Enable the app’s [managed identity](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-enable-system-assigned-managed-identity) and grant the managed identity with "Get" and "List" access to the Azure Key Vault

### [](#securing-communications-from-app-to-managed-middleware)Securing communications from app to managed middleware

**Segment 3** represents communications from any app to the managed Spring Cloud Config Server and Spring Cloud Service Registry in Azure Spring Cloud. By default, segment 3 is secured using a Microsoft supplied SSL certificate.

### [](#securing-app-to-app-communications)Securing app to app communications

**Segment 4** represents communications between an app to another app in Azure Spring Cloud.

You can configure the caller app using the Azure Key Vault Certificates Spring Boot Starter to trust the SSL certificate supplied by an HTTPS-enabled called app.

The receiver Spring Boot app can use Spring’s approach to enable HTTPS or secure communications by using the Azure Key Vault Certificates Spring Boot Starter.

### [](#securing-app-to-external-system-communications)Securing app to external system communications

**Segment 5** represents communications between an app running in Azure Spring Cloud and external systems. You can configure the app running in Azure Spring Cloud to trust the SSL certificate supplied by any external systems - using the [Azure Key Vault Certificates Spring Boot Starter](https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-key-vault-certificates#run-a-spring-boot-application-with-secure-outbound-connections).

### [](#implicitly-load-ssl-certificates-from-key-vault-into-an-app)Implicitly load SSL certificates from Key Vault into an app

If your Spring code, Java code, or open-source libraries, such as openssl, rely on the JVM default JCA chain to implicitly load certificates into the JVM’s trust store, then you [can import your SSL certificates from Key Vault](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-use-tls-certificate#import-a-certificate) into Azure Spring Cloud and use those certificates within the app.

### [](#upload-well-known-public-ssl-certificates-for-backend-systems)Upload well known public SSL certificates for backend systems

For an app to communicate to backend services in the cloud or in on premises systems, it may require the use of public SSL certificates to secure communication. You can upload [those SSL certificates](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-use-tls-certificate) for securing outbound communications.

## [](#automate-provisioning-and-configuration-for-securing-communications)Automate provisioning and configuration for securing communications

Using an ARM Template, Bicep, or Terraform, you can automate the provisioning and configuration of all the Azure resources mentioned above for securing communications.

## [](#build-your-solutions-and-secure-communications-today)Build your solutions and secure communications today!

Azure Spring Cloud is a fully managed service for Spring Boot applications. It abstracts away the complexity of infrastructure and Spring Cloud middleware management from users. So, you can focus on building your business logic and let Azure take care of dynamic scaling, patches, security, compliance, and high availability. With a few steps, you can provision Azure Spring Cloud, create applications, deploy, and scale Spring Boot applications, and start securing communications in minutes.

Azure Spring Cloud is jointly built, operated, and supported by Microsoft and VMware. We will continue to bring more developer-friendly and enterprise-ready features to Azure Spring Cloud. We would love to hear how you are building impactful solutions using Azure Spring Cloud...

Deploy Spring Boot apps to Azure Spring Cloud and secure communications end-to-end!

Get started today

-   Learn using an [MS Learn module](https://docs.microsoft.com/en-us/learn/modules/azure-spring-cloud-workshop/) or [self-paced workshop](https://github.com/microsoft/azure-spring-cloud-training) on GitHub
-   [Deploy](https://github.com/Azure-Samples/spring-petclinic-microservices) a distributed version of Spring Petclinic application
-   Learn [more](https://docs.microsoft.com/en-us/azure/spring-cloud/) about implementing solutions on Azure Spring Cloud

Secure communications end-to-end for Spring Boot apps

-   [Bind custom domain to an app in Azure Spring Cloud](https://docs.microsoft.com/en-us/azure/spring-cloud/tutorial-custom-domain?tabs=Azure-portal)
-   [Secure traffic from ingress controller to an app in Azure Spring Cloud](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-enable-end-to-end-tls)
-   [Azure Key Vault Certificates Spring Boot Starter](https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-key-vault-certificates#enable-the-spring-boot-app-to-load-the-tlsssl-certificate)
-   [Azure Key Vault Certificates Spring Boot Starter (GitHub.com)](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/spring/azure-spring-boot-starter-keyvault-certificates)
-   Azure Key Vault [JCA](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/keyvault/azure-security-keyvault-jca) (Java Cryptography Architecture) Provider

Additional Resources

-   Deploy Spring Boot applications by leveraging enterprise best practices – [Azure Spring Cloud Reference Architecture](https://docs.microsoft.com/en-us/azure/spring-cloud/reference-architecture)
-   Migrate your [Spring Boot](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-boot-to-azure-spring-cloud), [Spring Cloud](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-cloud-to-azure-spring-cloud), and [Tomcat](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-tomcat-to-azure-spring-cloud) applications to Azure Spring Cloud
-   Wire Spring applications to interact with Azure services
-   For feedback and questions, [please e-mail us](mailto:AzureSpringCloud-Talk@service.microsoft.com).