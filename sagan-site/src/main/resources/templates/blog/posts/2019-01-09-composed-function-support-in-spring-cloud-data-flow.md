---
title: Composed Function Support in Spring Cloud Data Flow
source: https://spring.io/blog/2019/01/09/composed-function-support-in-spring-cloud-data-flow
scraped: 2026-02-23T15:02:23.780Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ilayaperumal Gopinathan |  January 09, 2019 | 0 Comments
---

# Composed Function Support in Spring Cloud Data Flow

_Engineering | Ilayaperumal Gopinathan |  January 09, 2019 | 0 Comments_

Spring Cloud Stream has recently added a [feature](https://spring.io/blog/2018/08/28/spring-cloud-stream-fishtown-m2-2-1-0-m2-release-announcement#spring-cloud-function-support) to compose a function definition into an existing Spring Cloud Stream application. In this blog, we'll see how Spring Cloud Data Flow makes use of this feature to compose functions in Streaming pipelines.

### [](#whats-different-about-it)**What’s different about it?**

In Spring Cloud Data Flow, streaming data pipelines are comprised of Spring Cloud Stream applications. A developer can pick and choose the out-of-the-box [streaming applications](http://cloud.spring.io/spring-cloud-stream-app-starters/), which cover many common use cases. A developer can also [extend](https://start-scs.cfapps.io/) these out-of-the-box applications or create custom applications by using Spring Cloud Stream framework.

The release of [Spring Cloud Stream 2.1.0 GA](https://spring.io/blog/2019/01/08/announcing-general-availability-of-spring-cloud-stream-fishtown-release-2-1-0-release#core) includes an integration of the [Spring Cloud Function](https://cloud.spring.io/spring-cloud-function/)\-based programming model, which allows the business logic to be represented as a `java.util.Function`, a `java.util.Consumer`, and a `java.util.Supplier`, representing the roles of a `Processor`, `Sink`, and `Source` respectively. Given this flexibility, Spring Cloud Stream framework now supports a simple but powerful approach to function composition. A composition in this context could be a combination of source and processor into a single application: a “new source”. Otherwise, it could be a combination of processor + sink into a single application: “a new sink”.This flexibility opens up interesting new opportunities for stream application developers.

Let’s consider how a pipeline is created to perform a simple transformation by using three applications and then see how it can be implemented as a pipeline by using two applications that use functional composition.

### [](#streaming-pipeline-with-three-applications)**Streaming Pipeline with three applications**

For the first stream,

we will use the out-of-the-box `http-source`, `transform-processor` and `log-sink` applications.

As a first step, start the Spring Cloud Data Flow `local` server:

```
Copyjava -jar spring-cloud-dataflow-server-local-1.7.3.RELEASE.jar
```

Now, start the Spring Cloud Data Flow `shell`:

```
Copyjava -jar spring-cloud-dataflow-shell-1.7.3.RELEASE.jar
```

Now let’s register the HTTP source, the transformer processor, and the log sink applications that use the RabbitMQ binder:

```
Copydataflow:>app register --name http --type source --uri https://repo.spring.io/milestone/org/springframework/cloud/stream/app/http-source-rabbit/2.1.0.M2/http-source-rabbit-2.1.0.M2.jar
```

```
Copydataflow:>app register --name transformer --type processor --uri https://repo.spring.io/milestone/org/springframework/cloud/stream/app/transform-processor-rabbit/2.1.0.M2/transform-processor-rabbit-2.1.0.M2.jar
```

```
Copydataflow:>app register --name log --type sink --uri https://repo.spring.io/milestone/org/springframework/cloud/stream/app/log-sink-rabbit/2.1.0.M2/log-sink-rabbit-2.1.0.M2.jar
```

Now we can create a simple stream without function composition:

```
Copydataflow:>stream create hello --definition "http --server.port=9000 | transformer --expression=(\"Hello \"+payload.toString().toUpperCase()) | log"
```

Then we can deploy the stream:

```
Copydataflow:>stream deploy hello --properties "deployer.*.local.inheritLogging=true"
```

```
Copydataflow:>http post --data "friend" --target "http://localhost:9000"
POST (text/plain) http://localhost:9000 friend
202 ACCEPTED
```

You can see the following log message at the `log` application:

```
Copy[sformer.hello-1] log-sink                                 : Hello FRIEND

```

In this stream, we have the http (source), transformer (processor), and log (sink) applications deployed as standalone applications in the target platform (in this case, it is `local`). For certain use-cases, for a simple payload transformation logic, we might want to have the `Processor` application combined with either the `Source` or `Sink` applications. For instance, transformation scenarios like masking some specific user specific fields at the Source output data doesn’t necessarily need to be deployed as a separate standalone application. Instead, it can be composed either at the Source or Sink application.

To compose Processor functions into Source or Sink applications, we use Spring Cloud Stream’s function composition support.

The function composition support in Spring Cloud Stream is based on Spring Cloud Function’s ability to allow the registration of `java.util.Supplier`, `java.util.Consumer`, and `java.util.Function` as Spring `@Bean` definitions. These function `@Bean` definitions are available for composition at runtime.

Spring Cloud Stream has introduced a new property, called `spring.cloud.stream.function.definition`, which corresponds to the function definition DSL in Spring Cloud Function. When this property is set, the desired functional beans are automatically chained at the runtime.

The function composition happens in the following way:

When the Spring Cloud Stream application is of type `Source`, the composed function is applied after the source `output`.

When the Spring Cloud Stream application is of type `Sink`, the composed function is applied before the sink `input`.

This gives an ability to compose the function (defined in the Spring Cloud Function DSL) into an existing Spring Cloud Stream application and subsequently have it be orchestrated by Spring Cloud Data Flow in streaming data pipeline.

### [](#composing-functions-into-a-stream-application)**Composing functions into a Stream application**

Let’s create and deploy a stream that composes the previous example’s transformer expression into the `Source` application itself. The transformer logic is done by using two `java.util.Function` implementations.

We will create a new source application, which we will refer to as the `http-transformer` which extends the out of the box http source application. The source for the new source application can be found [here](https://github.com/ilayaperumalg/sandbox/tree/master/function-composition).

The `http-transformer`application contains the `upper` and `concat` function beans, as defined below:

```
Copy@SpringBootApplication
@Import(org.springframework.cloud.stream.app.http.source.HttpSourceConfiguration.class)
public class HttpSourceRabbitApplication {

	@Bean
	public Function<String, String> upper() {
		return value -> value.toUpperCase();
	}

	@Bean
	public Function<String, String> concat() {
		return value -> "Hello "+ value;
	}

	public static void main(String[] args) {
		SpringApplication.run(HttpSourceRabbitApplication.class, args);
	}
}

```

After cloning the github [repo](https://github.com/ilayaperumalg/sandbox), you can build the application using maven:

> cd function-composition/http-transformer ./mvnw clean package

Now register `http-transformer` application byusing the Data Flow Shell.

**NOTE**

> For the below app register `--uri` option, replace the directory name and path of the artifact with the value appropriate to your system.

```
Copydataflow:>app register --name http-transformer --type source --uri file:///Users/igopinathan/dev/git/ilayaperumalg/sandbox/function-composition/http-transformer/target/http-transformer-2.1.0.BUILD-SNAPSHOT.jar
```

Now let’s create the stream:

```
Copydataflow:>stream create helloComposed --definition "http-transformer --server.port=9001 | log"
```

When deploying the stream, we pass the `spring.cloud.stream.function.definition` property to define the composed function DSL (defined as in Spring Cloud Function). In this case, it is:

```
Copydataflow:>stream deploy helloComposed --properties "app.http-transformer.spring.cloud.stream.function.definition=upper|concat,deployer.*.local.inheritLogging=true"

```

The above deployment composes the `upper` and `concat` function beans into the `http` source application.

Then we can send the payload to `http` application:

```
Copydataflow:>http post --data "friend" --target "http://localhost:9001"
> POST (text/plain) http://localhost:9001 friend
> 202 ACCEPTED

```

Then you can see the output in the `log` application as,

```
Copy[helloComposed-1] log-sink                                 : Hello FRIEND

```

**NOTE**

Please note that function composition support is not applicable for the out-of-the-box Spring Cloud Stream `Processor` applications, since there is ambiguity in whether the function needs to be applied before or after the existing processor’s application logic.

However, you can create your own processor applications that use functional composition with standard java.util.Function APIs, as the following example shows:

```
Copy@Configuration
public static class FunctionProcessorConfiguration {

@Bean
public Function<String, String> upperAndConcat() {
return upper().andThen(concat());
}

  @Bean
  public Function<String, String> upper() {
     return value -> value.toUpperCase();
  }

  @Bean
  public Function<String, String> concat() {
     return value -> "Hello "+ value;
  }
}
```

Then you need to deploy with the following property: `spring.cloud.stream.function.definition=upperAndConcat`

### [](#kotlin-support)**Kotlin Support**

Another interesting feature is that Spring Cloud Function supports functional composition of Kotlin functions. This lets us add any Kotlin function beans into composable functions for `Source` or `Sink` applications.

To see this working, let’s use the `http-transformer-kotlin-processor` application from our sample github [repository](https://github.com/ilayaperumalg/sandbox).

The Kotlin function bean is configured as a processor. Here, the Kotlin function bean is the `transform` function as defined below:

```
Copy@Bean
open fun transform(): (String) -> String {
   return { "How are you ".plus(it) }
}
```

Also, this project has the `spring-cloud-function-kotlin` as a dependency to apply function configuration support for Kotlin functions, defined as follows:

```
Copy<dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-function-kotlin</artifactId>
      <version>2.0.0.RELEASE</version>
    </dependency>
```

> cd function-composition/http-transformer-kotlin ./mvnw clean package

**NOTE**

> For the below app register `--uri` option, replace the directory name and path of the artifact with the value appropriate to your system.

```
Copydataflow:>app register --name http-transformer-kotlin --type source --uri file:///Users/igopinathan/dev/git/ilayaperumalg/sandbox/function-composition/http-transformer-kotlin/target/http-transformer-kotlin-2.1.0.BUILD-SNAPSHOT.jar
```

To create a stream with this application as the `Source`:

```
Copydataflow:>stream create helloComposedKotlin --definition "http-transformer-kotlin --server.port=9002 | log"

```

As we did in the `http-transformer` example, we can use the`spring.cloud.stream.function.definition` property to specify any valid composed function DSL to construct the function composition. In this case, let’s combine the function beans registered via Java configuration along with the function bean from Kotlin processor configuration.

```
Copydataflow:>stream deploy helloComposedKotlin --properties "app.http-transformer-kotlin.spring.cloud.stream.function.definition=upper|transform|concat,deployer.*.local.inheritLogging=true"

```

Here, the function name `transform` corresponds to Kotlin function.

Note: We can perform the composition between Kotlin functions and Java functions because Kotlin functions are internally converted into `java.util.Function`.

```
Copydataflow:>http post --data "friend" --target "http://localhost:9002"
> POST (text/plain) http://localhost:9002 friend
> 202 ACCEPTED

```

and, you can see the output in the `log` application as:

```
Copy[omposedKotlin-1] log-sink               : Hello How are you FRIEND
```

In this example, the `http-transformer` also contained the source code for the functions. However, you can make the application more modular by defining the function beans in a separate artifact. Then you can build the applications by adding only a maven dependency to the project and setting the `spring.cloud.stream.function.definition` property. In this way, you can have the majority of your business logic coded as a function, and can, if necessary, compose it with a Source or a Sink.