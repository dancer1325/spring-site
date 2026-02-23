---
title: Spring Batch 4.0.0.RELEASE is now available
source: https://spring.io/blog/2017/12/04/spring-batch-4-0-0-release-is-now-available
scraped: 2026-02-23T16:12:46.734Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  December 04, 2017 | 2 Comments
---

# Spring Batch 4.0.0.RELEASE is now available

_Releases | Michael Minella |  December 04, 2017 | 2 Comments_

We are pleased to announce that Spring Batch 4.0.0.RELEASE is now available through Github, the Pivotal download repository, and Maven Central. This is the generally available release of the 4.0 line. Many thanks to all that contributed to this release.

## [](#how-we-got-here)How We Got Here

Spring Batch 4 is the first major version release of Spring Batch since 3.0 went out in 2014. A lot has changed in the Spring ecosystem since that version went out. This release is intended to bring Spring Batch up to date with those changes. When Spring Batch 3 came out, Java configuration was just beginning to take over XML-based configuration. Spring Boot had not been announced yet. Also, while JDK 8 had just come out, Spring Framework 4 (which Spring Batch 3 was based on) still supported java back to JDK 6. Spring Batch 4 brings upgrades to all of these areas. Let's take a look.

## [](#new-baseline)New Baseline

Spring Batch 3 was based on Spring Framework 4, which supported an ecosystem of dependencies that went back to Java 6. Spring Batch 4 takes a fresh look at its dependency tree and brings it up to date with the upcoming Spring Boot 2 dependency tree, including Spring Framework 5 and Java 8 as baseline requirements. While Spring Batch has had a complete Java 8 story for years, this upgrade lets us improve and simplify things internally by allowing us to use Java 8 idioms internally.

## [](#improved-java-configuration)Improved Java Configuration

As mentioned previously, Spring Batch 4 is the first major version release since Spring Boot came out. In this release, we have taken strides to improve the Java configuration experience in all the areas where users felt the most pain. Builders are now available for all `ItemReader` and `ItemWriter` implementations. An example of the simplification between Spring Batch 3 and 4 is configuring the `FlatFileItemReader`. Using the Java configuration capabilities of Spring Batch 3, your configuration would look something like the following:

```
Copy@Bean
public FlatFileItemReader<Foo> reader(Resource resource) 
    throws Exception {

        FlatFileItemReader<Foo> reader = new FlatFileItemReader<>();

        reader.setName(“fooReader”);
        reader.setResource(resource);

        BeanWrapperFieldSetMapper<Foo> fieldSetMapper = 
            new BeanWrapperFieldSetMapper<>();
        fieldSetMapper.setTargetType(Foo.class);
        fieldSetMapper.afterPropertiesSet();

        DelimitedLineTokenizer tokenizer = new DelimitedLineTokenizer();
        tokenizer.setNames(new String[] {“first”, “second”, “third”});
        tokenizer.afterPropertiesSet();

        DefaultLineMapper lineMapper = new DefaultLineMapper();
        lineMapper.setLineTokenizer(tokenizer);
        lineMapper.setFieldSetMapper(fieldSetMapper);

        reader.setLineMapper(lineMapper);

        return reader;
    }
```

With Spring Batch 4, the previous configuration is reduced to the following:

```
Copy@Bean
public FlatFileItemReader<Foo> reader(Resource resource) {
        return new FlatFileItemReaderBuilder<Foo>()
            .name(“fooReader”)
            .resource(resource)
            .delimited()
            .names(new String[]{“first”, “second”, “third”})
            .targetType(Foo.class)
            .build();
}
```

Fluent builders such as that shown in the preceding example are available for all `ItemReader` and `ItemWriter` implementations with this release.

## [](#new-documentation)New Documentation

Spring Batch's documentation had not had a major overhaul in years. It is time. With this release the documentation has been migrated to Asciidoc to simplify creation of the documentation as well as to become consistent across the Spring portfolio. In addition to that, the reference documentation now has the option to view any example in either Java configuration or XML configuration by using a toggle at the top of each page.

![Java configuration toggle](https://raw.githubusercontent.com/mminella/blog_images/master/documentation_toggle.png)

This toggle gives you the option to have the documentation presented to you in the way you need. If you are on a project that is XML-based, the entire file shows what is appropriate for XML configuration. If you use Java configuration, the entire file shows what is appropriate for a project using Java configuration.

## [](#wait-theres-more)Wait! There's More!

Beyond all of the above, Spring Batch 4 includes other improvements, including a new `ItemProcessor` that delegates to a `java.util.Function`, letting you create a processor with zero Spring dependencies. Enhancements provided by the community, such as the `Query` support in the `MongoItemReader` provided by Takaaki Iida, provide examples of this new feature.

## [](#what-do-you-think)What do you think?

We look forward to your feedback on these new features in [Jira](https://jira.spring.io/browse/BATCH/), [StackOverflow](https://stackoverflow.com/tags/spring-batch), or to me directly via Twitter [@michaelminella](https://twitter.com/michaelminella) or in person at SpringOne Platform!

[Spring Batch Home](https://projects.spring.io/spring-batch/) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](http://docs.spring.io/spring-batch/4.0.x/reference/html/index.html)