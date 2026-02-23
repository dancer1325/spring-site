---
title: Spring Cloud Function Native Images
source: https://spring.io/blog/2020/05/04/spring-cloud-function-native-images
scraped: 2026-02-23T14:02:26.954Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  May 04, 2020 | 3 Comments
---

# Spring Cloud Function Native Images

_Engineering | Dave Syer |  May 04, 2020 | 3 Comments_

Here's the latest graph of memory versus billing for Spring Cloud Function on AWS Lambda. It shows the billing metric GBsec as a function of memory allocation in Lambda for two custom runtimes, one in plain Java and one using a [GraalVM native image](https://www.graalvm.org/docs/reference-manual/native-image/), as described recently in this blog by [Andy Clement](https://spring.io/blog/2020/04/09/spring-graal-native-0-6-0-released):

![aws-billing-3.x](https://docs.google.com/spreadsheets/d/e/2PACX-1vQRWYdp_BpzQg7nA9P7xi9bjTapxu6cYrLi7PFvBmnnKM2zCuVuYzAh25KpFuz0hX0fqJyo1nJO5fyN/pubchart?oid=918725258&format=image)

In both cases the functionality is identical (a simple POJO-POJO function), and they both show only the results for cold start. Warm starts, where the function was already active when the request came in, were much faster and cheaper (except for the smallest memory setting they all cost the same because there is a minimum charge for all functions in AWS). You can see that the native images start up very fast and that they are more than two times cheaper to run than the regular JVM. The fastest startup was in the 1000MB container - it only took 19ms to start the app, but it took AWS 700ms to prepare the container, so it was billed at 800ms. In fact, all of the cold starts were billed at 800ms for the native image. For the regular JVM the fastest startup was also in the 1000MB container at 300ms, but it was billed at 2200ms.

For comparison, here's the a similar graph that I published over a year ago when Spring Cloud Function reached its 2.0 release. It showed significant improvements over the 1.x version, and also featured the custom runtime which I am using again here (so the orange bars are the equivalent of the red bars in the graph above):

![aws-billing](https://docs.google.com/spreadsheets/d/e/2PACX-1vQRWYdp_BpzQg7nA9P7xi9bjTapxu6cYrLi7PFvBmnnKM2zCuVuYzAh25KpFuz0hX0fqJyo1nJO5fyN/pubchart?oid=459598255&format=image)

The custom runtime in the regular JVM is roughly the same in version 3.x, but you can use it at lower memory settings because of Spring Boot optimizations that have been released since then.

## [](#building-the-sample)Building the Sample

The sample app was taken from the [Spring Graal Native Feature](https://github.com/spring-projects-experimental/spring-graal-native/tree/master/spring-graal-native-samples/function-aws), but modified to be a function of POJO to POJO, forcing Spring to do some extra work. So compared to the sample in Github I modified the function:

```java
Copyclass Foobar implements Function<Foo, Foo> {

	@Override
	public Foo apply(Foo input) {
		System.err.println("HI: " + input.getName());
		return new Foo("hi " + input.getName() + "!");
	}
}
```

where the `Foo` is defined like this:

```java
Copyclass Foo {
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Foo(String name) {
		this.name = name;
	}

	Foo() {
	}
}
```

and the function is registered in the main application:

```java
Copy	@Override
	public void initialize(GenericApplicationContext context) {
		context.registerBean("foobar", FunctionRegistration.class,
				() -> new FunctionRegistration<>(new Foobar())
						.type(FunctionType.from(Foo.class).to(Foo.class)));
	}
```

Note that I am using the [functional bean registration style](https://spring.io/blog/2018/10/22/functional-bean-registrations-in-spring-cloud-function), although it doesn't make much difference for such a simple application.

I also had to modify the tests to make sure they work with the new POJO signature. You could just delete the tests and the `verify.sh` to avoid having to do that, if you just want something quick to work. If you want to see what I did look at the [foo branch](https://github.com/dsyer/spring-graal-feature/tree/foo/spring-graal-native-samples/function-aws) in my fork.

Then I built the application in the same way as the other samples. This creates the native image and dumps it in the `target` directory:

```
Copy$ ./build.sh
```

It also creates a `.zip` file to upload to AWS. This one is the regular JVM version:

```
Copy$ ls -l target/*.zip
-rw-rw-r-- 1 dsyer dsyer 32577121 Apr 21 09:37 target/function-aws-0.0.1-SNAPSHOT-java-zip.zip
```

and then this creates a `.zip` file for the native image:

```
Copy$ ./mvnw package -P native
$ ls -l target/*.zip
-rw-rw-r-- 1 dsyer dsyer 32577121 Apr 21 09:37 target/function-aws-0.0.1-SNAPSHOT-java-zip.zip
-rw-rw-r-- 1 dsyer dsyer 26284838 Apr 21 09:28 target/function-aws-0.0.1-SNAPSHOT-native-zip.zip
```

## [](#conclusion)Conclusion

Using Spring Cloud Function is a very convenient way to develop functions that run on AWS and other platforms. If you also use the experimental Spring Graal Native Feature project to compile the result to a native binary executable they can run faster than the same application on a regular JVM. Note that there is [another sample](https://github.com/spring-projects-experimental/spring-graal-native/tree/master/spring-graal-native-samples/function-netty) in the Spring Graal Native Feature project that makes a function into a standalone web application (there is also a functional bean registration version of the same sample). You can run that on a lot of platforms that allow you to "bring your own container".