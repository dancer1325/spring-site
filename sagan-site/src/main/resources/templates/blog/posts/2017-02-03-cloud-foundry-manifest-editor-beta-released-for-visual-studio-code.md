---
title: Cloud Foundry Manifest Editor Beta released for Visual Studio Code
source: https://spring.io/blog/2017/02/03/cloud-foundry-manifest-editor-beta-released-for-visual-studio-code
scraped: 2026-02-23T16:31:41.874Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  February 03, 2017 | 0 Comments
---

# Cloud Foundry Manifest Editor Beta released for Visual Studio Code

_Releases | Martin Lippert |  February 03, 2017 | 0 Comments_

As part of our activities to support developers around the globe building applications with Spring and deploying those apps to Cloud Foundry and PCF, we are proud to announce our first beta version of the [Cloud Foundry Manifest editing support](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-manifest-yaml) for [Visual Studio Code](https://code.visualstudio.com/) (on macOS, Linux x64, and Windows).

## [](#why-visual-studio-code)Why Visual Studio Code?

Visual Studio Code is a lightweight and open-source code editor that runs on macOS, Linux x64, and Windows. It is based on an interesting architecture with regards to extensibility. Support for languages in Visual Studio Code gets implemented as so called “language servers”. Those language servers are independent of the editor that you use. The editor and the language server are connected using a protocol (called the language server protocol). Even though Visual Studio Code introduced this protocol, other editors and IDEs started to adopt this language server protocol - like the Eclipse IDE (from version 4.7 on) or Eclipse Che as a cloud IDE. Other lightweight editors like Sublime Text and Atom will likely offer support in the near future, too. As a result, we can focus on implementing the Cloud Foundry manifest editor support as an independent language server and you can add this support to the editor or IDE of your choice.

Visual Studio Code introduced this protocol and offers the best support for it at the moment - including a nice marketplace for those extensions that allow a smooth and easy experience installing and using them. Therefore, as a first step, our language server for Cloud Foundry manifest files is now available on that marketplace. Open your installation of Visual Studio Code, go to the extensions section, and search for “manifest”. The Cloud Foundry Manifest Editor support will show up.

## [](#working-with-manifest-files)Working with manifest files

Once installed, it helps you working with Cloud Foundry manifest files. It provides content-assist for properties and certain values, validates the property keys and values (to avoid typos and surprises when deploying the app), and provides extensive hover help.

The content-assist can also provide help entering certain values that depend on your specific Cloud Foundry target that you use. To be more specific, the tooling infers the available buildpacks as well as a list of service instances that you have around on your Cloud Foundry target. Once that information is available, it becomes super easy to define the buildpack or services in your Cloud Foundry manifest files.

In order to get the necessary information, the tooling uses the CF CLI configuration and its access token. So whatever you have configured in your CF CLI (e.g. your API endpoint + space) will be used automatically to gather the information about buildpacks and services on demand (as long as you are logged into the CF target on the CLI).

## [](#outlook)Outlook

This marks our first step towards implementing tooling in an IDE-agnostic way, adopting the language server protocol from Visual Studio Code - in addition to our work on the Eclipse-based Spring Tool Suite and our ongoing support for Jetbrains to improve their awesome Spring tooling in IntelliJ even further. And since this is just our first step here, there is more to come in 2017, like new language servers around Spring and Spring Boot, improved versions of the manifest editing support, and more options for editors and IDEs to plug this into. One of those options will remain the Spring Tool Suite, while other (lightweight) editors and IDEs will get awesome Spring and Spring Boot tooling that way, too. Stay tuned.