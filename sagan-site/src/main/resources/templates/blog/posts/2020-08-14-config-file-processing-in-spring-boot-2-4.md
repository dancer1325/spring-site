---
title: Config file processing in Spring Boot 2.4
source: https://spring.io/blog/2020/08/14/config-file-processing-in-spring-boot-2-4
scraped: 2026-02-23T13:43:24.471Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Phil Webb |  August 14, 2020 | 54 Comments
---

# Config file processing in Spring Boot 2.4

_Engineering | Phil Webb |  August 14, 2020 | 54 Comments_

Spring Boot 2.4.0.M2 has [just been released](https://spring.io/admin/blog/4170-spring-boot-2-4-0-m2-is-now-available), and it brings with it some interesting changes to the way that `application.properties` and `application.yml` files are loaded.

If your applications use the fairly typical setup of only using a single `application.properties` or `application.yml` file, then you’ll probably not notice any difference. If, however, you have applications that use more complex setups (such as profile specific properties), you might want to read on to learn about what we’ve changed and why.

## [](#why-were-making-these-changes)[](#why-were-making-these-changes)Why We’re Making These Changes

With recent versions of Spring Boot we’ve been working hard to improve our Kubernetes support. One thing that we wanted to add in Spring Boot 2.3, but couldn’t, was support for volume mounted configuration.

Volume mounted configuration is a popular feature of Kubernetes where a `ConfigMap` directive is used to surface configuration directly on the file system. You can either mount a complete YAML file that contains an amalgamation of multiple keys and values, or you can use a simpler directory tree format where the filename is the key and the contents of the file is the value.

We wanted to offer support for both, and in a way that felt natural to use alongside our existing `application.properties` and `application.yml` support. To do that we needed to touch the dreaded `ConfigFileApplicationListener` class.

## [](#the-problem-with-configfileapplicationlistener)[](#the-problem-with-configfileapplicationlistener)The Problem with ConfigFileApplicationListener

A few years ago some amusing [clips from the video game Trap Adventure 2](https://youtu.be/wvti-SKu2pk) started doing the rounds. They’re a pretty good analogy for what can happen in software. Sometimes you just find yourself with areas of code that are very hard to change. In Spring Boot, `ConfigFileApplicationListener` ended up becoming one of these "trap adventures".

It’s not that code is badly written, or is missing tests. It’s just that as we added features to it, we ended up tying ourselves in knots.

The two main problems that we have with the code are to do with profile specific documents (mainly in YAML). Namely:

-   You can enable additional profiles from a profile specific document.
    
-   It’s hard to know the order that documents will be added.
    

Take the following example:

## [](#securityuserpassword-usera)security.user.password: usera

## [](#springprofiles-localsecurityuserpassword-userbrunlocal-true)spring.profiles: local security.user.password: userb runlocal: true

spring.profiles: !dev spring.profiles.include: local security.user.password: userc

Here we have a [multi-document YAML](https://yaml.org/spec/1.2/spec.html#id2760395) file (a single file that’s comprised of three logical documents separated by `---`).

If you run with `--spring.profiles.active=prod` what’s the value of `security.user.password`? Is the `runlocal` property set? Are you sure? Is the middle document even included since the profile isn’t activated at the time it’s processed?

We regularly had issues raised about this file processing logic, but whenever we tried to fix them something would break for someone else. We ultimately decided the only way forward was to rethink the entire thing.

So in Spring Boot 2.4 we’re planning to make two significant changes to the way the properties and YAML files are loaded:

1.  Documents will be loaded in the order that they’re defined.
    
2.  Profiles can no longer be activated from profile specific documents.
    

## [](#document-order)[](#document-order)Document Order

Starting with Spring Boot 2.4, there will be a simple rule that can be applied when loading properties and YAML files. Properties declared lower in the file will override those higher up.

This follows the same ordering rules that plain old `.properties` files already use. Think of each line putting an entry in a `Map`. Any existing entry is replaced when a new value with the same key is put into the `Map`.

Following these rules, given a multi-document YAML file, the lower document will override values in the higher one:

## [](#test-value)test: "value"

test: "overridden-value"

## [](#multi-document-properties-files)[](#multi-document-properties-files)Multi-document Properties Files

With Spring Boot 2.4, we’ve decided to bring YAML-like multi-document support to Java properties files. Multi-document properties files use a comment (`#`) followed by the familiar three dash notation to split documents (*we chose to use a comment so that existing IDE tooling wouldn’t break*).

For example, the properties equivalent of the YAML snippet above would be:

test=value #--- test=overridden-value

## [](#profile-specific-documents)[](#profile-specific-documents)Profile Specific Documents

The above example is a bit artificial since it wouldn’t really make sense to always override a value. A more common setup would be to declare that the second document is only active with a specific profile.

In Spring Boot 2.3, you’d use the `spring.profiles` key to do this. With Spring Boot 2.4, we’ve decided to change the property to `spring.config.activate.on-profile`.

For example, if we only want to override `test` when the `dev` profile is active, we can use the following:

test=value #--- spring.config.activate.on-profile=dev test=overridden-value

## [](#profile-activation)[](#profile-activation)Profile Activation

You can still use `spring.profiles.active` properties to activate or include profiles from an `application.properties` or `application.yaml` file.

For example, the following is perfectly valid:

test=value spring.profiles.active=local #--- spring.config.activate.on-profile=dev test=overridden value

One thing that you’re no longer allowed to do is use that property in combination with `spring.config.activate.on-profile`. For example, the following file would now throw an exception:

test=value #--- spring.config.activate.on-profile=dev spring.profiles.active=local # will fail test=overridden value

We hope that this new restriction will ultimately make your `application.properties` and `application.yml` files easier to reason about and understand. We also hope that it’ll make Spring Boot itself easier to manage and maintain. We are, however, aware of a least one valid use-case where people want to expand a profile into multiple sub-profiles. In order to support that, we’re adding a feature called "profile groups".

## [](#profile-groups)[](#profile-groups)Profile Groups

Profile groups are a new feature in Spring Boot 2.4 that allow you to expand a single profile into multiple sub-profiles. For example, suppose you have a complex set of `@Configuration` classes that you conditionally enable using `@Profile` annotations. You might have a database configuration with `@Profile("proddb")`, a message configuration with `@Profile("prodmq")` and so on.

Using multiple discrete profiles might make your code easier to reason about, but it’s not ideal for deployment. You don’t want to force users to remember that they must always activate `proddb`, `prodmq`, `prodmetrics` etc at the same time. Instead, you just want them to be able to activate a single `prod` profile. Groups allow you to do just that.

To define a group, you can use the `spring.profiles.group` property in your `application.properties` or `application.yml` file. For example:

spring.profiles.group.prod=proddb,prodmq,prodmetrics

## [](#importing-additional-configuration)[](#importing-additional-configuration)Importing Additional Configuration

Now that we’ve fixed that basic issues with config file processing, we’re finally able to think about new features that we want to offer. The main one that we’re delivering with Spring Boot 2.4 is support for importing additional configuration.

With earlier versions of Spring Boot, it was pretty hard to import additional properties or yaml files beyond `application.properties` and `application.yml`. You could use the `spring.config.additional-location` property, but you needed to set it pretty early and it was quite limited with the types of files that it could deal with.

With the latest milestone, you can use the new `spring.config.import` property directly in your `application.properties` or `application.yml` files. For example, you might want to import a "git ignored" `developer.properties` file so that any developer in your team can quickly change properties just for them:

application.name=myapp spring.config.import=developer.properties

You can even combine `spring.config.import` declarations with `spring.config.activate.on-profile` properties. For example, here we load `prod.properties` only if the `prod` profile is active:

spring.config.activate.on-profile=prod spring.config.import=prod.properties

Imports can be considered as additional documents inserted just below the document that declares them. They follow the same top-down ordering as regular multi-document files: An import will only be imported once, no matter how many times it is declared.

## [](#volume-mounted-configuration-trees)[](#volume-mounted-configuration-trees)Volume Mounted Configuration Trees

Import definitions use URL-like syntax as their value. If your location doesn’t have a prefix, it’s considered to be a regular file or folder. If, however, you use the `configtree:` prefix, you’re telling Spring Boot that you expect a Kubernetes style volume mounted configuration tree at the location.

For example, you can declare the following in your `application.properties`:

spring.config.import=configtree:/etc/config

If you have the following mounted content:

etc/ +- config/ +- my/ | +- application +- test

You end up with `my.application` and `test` properties in your Spring `Environment`. The value for `my.application` will be the contents of `/etc/config/my/application`, and the value of `test` will be the contents of `/etc/config/test`.

## [](#cloud-platform-activation)[](#cloud-platform-activation)Cloud Platform Activation

If you only want volume mounted config trees (or any properties for that matter) to be active on a specific cloud platform, you can use the `spring.config.activate.on-cloud-platform` property. This works in a similar way to the `spring.config.activate.on-profile` property, but uses `CloudPlatform` values, rather than profile names.

If we want to only enable our configtree example above when we’re deployed to Kubernetes, we can do the following:

spring.config.activate.on-cloud-platform=kubernetes spring.config.import=configtree:/etc/config

## [](#supporting-additional-locations)[](#supporting-additional-locations)Supporting Additional Locations

The location strings specified in `spring.config.import` properties are completely pluggable and may be extended by writing a few custom classes. We expect that third-party libraries may start to offer support for custom locations in the future. For example, you could imagine third-party jars to support locations such as `archaius://…​`, `vault://…​` or `zookeeper://…​`.

If you’re interested in adding additional location support, look at the javadoc for `ConfigDataLocationResolver` and `ConfigDataLoader` in the `org.springframework.boot.context.config` package.

## [](#using-legacy-processing)[](#using-legacy-processing)Using Legacy Processing

If you’re upgrading an existing Spring Boot application, and you don’t feel comfortable using all these new features, you can switch back to the older processor. To do that, you can set `spring.config.use-legacy-processing` to `true` to your `application.properties` or `application.yml` file. This should give you application config processing that’s identical to a Spring Boot 2.3 application.

If you do find you need to switch to legacy processing because we’ve missed a specific use-case, please [raise an issue on GitHub](https://github.com/spring-projects/spring-boot/issues) and we’ll try to address it.

## [](#summary)[](#summary)Summary

We hope the new config data processing classes are useful, and they don’t cause too much upgrade pain. If you want to read more about them, you can checkout the updated [reference documentation](https://docs.spring.io/spring-boot/docs/2.4.0-SNAPSHOT/reference/htmlsingle/#boot-features-external-config-files).