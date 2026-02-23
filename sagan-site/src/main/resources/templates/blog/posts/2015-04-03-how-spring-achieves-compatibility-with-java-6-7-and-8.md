---
title: How Spring achieves compatibility with Java 6, 7 and 8
source: https://spring.io/blog/2015/04/03/how-spring-achieves-compatibility-with-java-6-7-and-8
scraped: 2026-02-23T21:08:08.837Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  April 03, 2015 | 20 Comments
---

# How Spring achieves compatibility with Java 6, 7 and 8

_Engineering | Stéphane Nicoll |  April 03, 2015 | 20 Comments_

As of Spring Framework 4.0, Java 8 is supported as a first-class citizen and we've seen some confusion in the Spring community since then. How do we manage to support Java 8 and remain compatible with Java 6 and Java 7 after all? This blog post provides some insight into how we're handling this within the framework codebase.

## [](#java-8-language-features-vs-java-8-apis)Java 8 language features vs. Java 8 APIs

First, a distinction must be made between using new language features and new APIs in a given Java generation such as Java 8. If a class uses a Java 8 language feature such as a lambda expression, it has to be compiled with `-source 1.8 -target 1.8` and therefore the whole compilation unit will only work on Java 8+. However, if a particular class in a library optionally uses a new Java 8 interface such as `java.util.stream.Stream`, the library can still run on a previous Java generation as long as it is being compiled with e.g. `-source 1.6 -target 1.6` - and as long as the use of that particular `Stream`\-based class is guarded to only kick in when actually running on Java 8+. As you may have guessed, we're making extensive use of such arrangements within the Spring Framework codebase!

We've advertised how Spring Framework 4.0 naturally fits with Java 8 lambdas. For instance, retrieving the catalog of a given JDBC connection with a [`ConnectionCallback`](https://github.com/spring-projects/spring-framework/blob/8472a2b2/spring-jdbc/src/main/java/org/springframework/jdbc/core/ConnectionCallback.java) can be written as follows:

```java
CopyjdbcTemplate.execute(connection -> connection.getCatalog())
```

In fact, Spring Framework had now-so-called functional interfaces for years and we did not have to change any of those APIs to be compliant with Java 8's compiler rules for functional interfaces. Lambda-based code such as the above, calling into Spring APIs, can be used in any Spring application - which then requires a Java 8 runtime, obviously. However, if you choose to write such code with a traditional inner class approach, against the very same Spring APIs in the very same Spring version, you can do so as well with a Java 6+ runtime:

```
CopyjdbcTemplate.execute(new ConnectionCallback<String>() {
    @Override
    public String doInConnection(Connection con) throws SQLException {
        return con.getCatalog();
    }
});
```

The bottom line is that the choice is yours: We carefully designed Spring Framework 4.x to be naturally compatible with Java 6, 7 and 8, with the same Spring jars and no special setup steps. We don't use any Java 8 language features in our own code, so we can compile our framework codebase with `-source 1.6 -target 1.6`, and we autodetect and automatically activate many Java 8 API features (if available at runtime) within that codebase arrangement. Your application code may then choose to use Java 6, 7 or 8 language level itself, interacting with our framework arrangement and naturally getting the most out of the JDK that you happen to be using - without any extra setup, just through combining Spring with your JDK at runtime.

## [](#which-java-8-api-features-do-we-support)Which Java 8 API features do we support?

We have dedicated support for a number of Java 8 specific API features such as `java.util.Optional`, `java.util.stream.Stream`, `java.time` (JSR-310), repeatable annotations, method/constructor parameter names, and even the `java.util.Base64` utility class. Those features get reflectively detected when you choose to use them in your own application classes, with the Spring Framework conditionally activating its support for those Java 8 features, e.g. registering default converters for `Optional` and `Stream` when Java 8 is present at runtime.

Let's have a look at an example. In the upcoming Spring Framework 4.2, if you define a value of type `Collection` or array, you can inject it as a `Stream` and we will convert that for you. You can find the full code of [`StreamConverter` on github](https://github.com/spring-projects/spring-framework/blob/228d9db4/spring-core/src/main/java/org/springframework/core/convert/support/StreamConverter.java) but here's an excerpt:

```java
Copyimport java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.core.convert.*;
import org.springframework.lang.UsesJava8;

@UsesJava8
public class StreamConverter implements ConditionalGenericConverter {
    ....
}
```

`StreamConverter` is an isolated class using Java 8 specific APIs, so what we need to do now is to conditionally add `StreamConverter` to [`DefaultConverterService`](https://github.com/spring-projects/spring-framework/blob/018adb04/spring-core/src/main/java/org/springframework/core/convert/support/DefaultConversionService.java) if Java 8 is present at runtime.

```java
Copypublic class DefaultConversionService extends GenericConversionService {

    /** Java 8's java.util.stream.Stream class available? */
    private static final boolean streamAvailable = ClassUtils.isPresent(
            "java.util.stream.Stream", 
            DefaultConversionService.class.getClassLoader());

    private static void addCollectionConverters(
            ConverterRegistry converterRegistry) {
        ...

        if (streamAvailable) {
            converterRegistry.addConverter(
                    new StreamConverter(conversionService));
        }
    }
}
```

We conditionally check if the API is present at runtime and make a decision based on that, with you as a user simply experiencing fully Java 8 adapted setup by default. This is somewhat similar to the [conditions infrastructure](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/condition) in Spring Boot except it is more low-level and internal.

## [](#checking-java-6-compatibility)Checking Java 6 compatibility

Since we are using Java 8 specific APIs in several isolated places, we need JDK 8 to compile the framework codebase overall. As a result, there is a risk that we accidentally introduce Java 8 specific API calls in places where we need to remain Java 6 compatible.

Fortunately, our CI build plan is configured to execute [Animal Sniffer](http://mojo.codehaus.org/animal-sniffer/) with each build. This checks our code against a given Java API *signature* (in our case Java 6 update 18) and fails the build if some incorrect usage happens to be found. So what about legitimate use cases then where we do need to call Java 7 or 8 APIs? You can configure the sniffer to exclude a list of classes or, better yet, provide a set of annotations that *flag* such exceptional cases.

That's exactly what the [`@UsesJava8`](https://github.com/spring-projects/spring-framework/blob/f7b46539/spring-core/src/main/java/org/springframework/lang/UsesJava8.java) annotation on `StreamConverter` (see above) indicates: It demarcates the whole class as an exception to the Java 6 API compatibility rule. You can flag an inner class or even a method in a similar manner. By looking at our usage of that annotation, we know all the places where Java 7/8 specific APIs are used in our codebase.

The Animal Sniffer configuration is pretty straightforward: check out [our build](https://github.com/spring-projects/spring-framework/blob/f926f6cb3e95affdd87ed5c06ac0450d0ada2aec/build.gradle#L143) or [the official documentation](http://mojo.codehaus.org/animal-sniffer/) for more details.

## [](#wrapping-up)Wrapping Up

We chose not to use any Java 7 or Java 8 language features in our own codebase in order to give you the flexibility to write your Spring 4 applications for Java 6, 7 or 8. At the same time, we allow you to experience a very natural approach if you decide to use Java 8, with the Spring Framework essentially appearing as Java 8 based to you in such a scenario.

Fortunately, Java 8's functional interface convention isn't new for us. Many existing Spring APIs can be seamlessly used with Java 8 lambdas since they are naturally following the same convention. New Java 8 APIs such as `java.time` (JSR-310), `Optional` and `Stream` are automatically supported by the framework if you choose to use them in your own code.

On a forward-looking note, as of 4.2, our codebase is even being checked with early JDK 9 builds already! This will lead to a unique situation in the framework once JDK 9 becomes generally available next year: supporting *four* Java generations in the same release line - your choice of JDK 6, 7, 8 or 9 in combination with the same Spring Framework generation!