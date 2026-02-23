---
title: Spring Cloud Stream - demystified and simplified
source: https://spring.io/blog/2019/10/14/spring-cloud-stream-demystified-and-simplified
scraped: 2026-02-23T14:24:34.825Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  October 14, 2019 | 5 Comments
---

# Spring Cloud Stream - demystified and simplified

_Engineering | Oleg Zhurakousky |  October 14, 2019 | 5 Comments_

This is the first post in a series of blog posts meant to clarify and preview what's coming in the upcoming releases of [spring-cloud-stream](https://spring.io/projects/spring-cloud-stream) and [spring-cloud-function](https://spring.io/projects/spring-cloud-function) (both 3.0.0).

Recently, I had a discussion with a user and heard something that prompted me to begin a series of blog posts (starting with this one) with the goal of both demystifying the true goals of *Spring Cloud Stream* and *Spring Cloud Function* projects as well as demonstrating their new features.

### [](#spring-integration-wrapper)Spring Integration Wrapper?

The specific phrase that prompted all this was - *"Spring Cloud Stream, being a light Spring Integration input/output router. . .”*. That's an interesting perception, but I have to disagree. While it may have been inspired by Enterprise Integration Patterns (EIP) and builds on top of Spring Integration (SI), that last part is really just an implementation detail. Spring Cloud Stream (SCSt) as a framework was never about *"being a light Spring Integration input/output router"*. In fact, this statement shows part of the problem, where SI (the framework of choice to support some of the internal requirements of SCSt) was somehow perceived to be the core of SCSt in such way that many perceive SCSt to be an extension or a wrapper to SI. It is not. It has always been about pure microservices and binding them to *sources* and *targets* of data (i.e., messaging systems) . Simple as that. If you abstract yourself far enough from knowing the internals of SCSt, you quickly realize that it is really a binding and activation framework. It binds a piece of code (provided by the user) to source/target of data exposed by the binder and activates such code according to binder implementation (for example, message arrival and so on). That is pretty much it.

### [](#to-function-or-not-to-function)To Function or Not to Function?

Historically, Spring Cloud Stream exposed an annotation-based configuration model that required the user to provide a lot of information that could be otherwise easily inferred, thus simplifying configuration.

Let's look at the following two code snippets

Annotation-based:

```
Copy@SpringBootApplication
@EnableBinding(Processor.class)
public class SampleApplication  {
    @StreamListener(Processor.INPUT)
    @SendTo(Processor.OUTPUT)
    public String uppercase(String value) {
        return value.toUpperCase();
    }
}

```

Function based (since v2.1.0):

```
Copy@SpringBootApplication
public class SampleApplication  {
    @Bean
    public Function<String, String> uppercase() {
        return value -> value.toUpperCase();
    }
}
```

Both are valid and fully functioning SCSt applications. Both do the same thing and both produce the same result -- except that, in the annotation-based example, the user has to be aware of SCSt abstractions (that is, messaging, channels, binding, and so on) while the actual user code has nothing to do with any of them. That raises a question: Why? Spring has always been about *“you worry about functional requirements and we take care of non-functional (boilerplate)”*. So, in the context of SCSt as a framework and its core goals of "binding and activating/triggering" we quickly realized that these abstractions are boilerplate and should not be leaked into the user’s code, especially in the form of annotations, as they contribute to the binary dependency of such code on SCSt for no valid reason. Also, given that the basis for most new frameworks within spring portfolio is Spring Boot, think about Spring Boot's core message -- the dependency (for example, a JAR) includes auto-configuration, which is effectively an *opinion on how we (Spring) believe things should be*, while giving you a way to opt out. So, in this context, why do you need to provide so many instructions, especially through annotations (`EnableBinding, Processor, StreamListener`, and others), where one can easily extract or infer the same information (in the context of SCSt ) by simply following some convention. For example, a function bean in the context of SCSt is a processor. We know that a processor has only one input destination and one output, and we know their names, so why do we need to explicitly state the known and the obvious? And so on. . . Also, keep in mind that, while deriving all of that, we still preserve the use of the existing consumer and producer properties and all other configuration options. They still apply here, letting you configure and reconfigure the same things as you would with `StreamListener`.

So, with that, I am also saying that we are starting on our slow journey of moving away from an annotation-based programming model and into a more agile, simple and Spring Boot-aligned, opinionated model of clearly documented and intuitive conventions with limited out-of-the-box configuration required of the user.

For more up to date information on functional support in spring-cloud-stream, please follow this [link](https://github.com/spring-cloud/spring-cloud-stream/blob/master/docs/src/main/asciidoc/spring-cloud-stream.adoc#spring_cloud_function).

Please feel free to provide any feedback.