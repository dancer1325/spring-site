---
title: Spring Cloud Function for Azure Function
source: https://spring.io/blog/2023/03/02/spring-cloud-function-for-azure-function
scraped: 2026-02-23T10:04:47.738Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Tzolov |  February 24, 2023 | 1 Comment
---

# Spring Cloud Function for Azure Function

_Engineering | Christian Tzolov |  February 24, 2023 | 1 Comment_

## [](#what-is-the-spring-cloud-function)What is the Spring Cloud Function?

Spring Cloud Function is a SpringBoot-based framework allowing users to concentrate on their business logic by implementing them as Java Functions (i.e., Supplier, Function, Consumer). In turn the framework provides necessary abstraction to enable execution of these functions in various environments (e.g., REST, Streaming) as well as serverless environments such as AWS Lambda or Azure Functions, without having to worry about the underlying platform-specific details. This allows developers to focus on writing their business logic and let the framework handle the rest.

Spring Cloud Function uses the `java.util.function.Function/Supplier/Consumer` Interfaces as building blocks for defining the structure of the function, including the input and output types.

Here's a simple example of a Spring Cloud Function that takes in a string and returns the string in uppercase:

First, we define the function interface:

```java
Copypublic interface UppercaseFunction extends Function<String, String> { }
```

Next, we register the function as a bean:

```java
Copy@Bean
public UppercaseFunction uppercase() {
    return value -> value.toUpperCase();
}
```

This is a basic example of what you can do with Spring Cloud Function, you can use it for more complex use cases like connecting to a database, or consuming messages from a queue, and more. By itself it is just a piece of code implemented as a Java function and registered as Spring Bean. However, with Spring Cloud Function this function can become a handler of a REST request or a message handler triggered by a messaging system such as Kafka. The same function can also execute in serverless environments such as AWS Lambda or Microsoft Azure, all without changes to its implementation. And that is what this post is about, specifically integration of Spring Cloud Function with Microsoft Azure.

## [](#what-is-azure-java-function)What is Azure Java Function?

The Azure Java Functions is a service that allows you to write Java-based serverless functions, running them on Azure infrastructure, with the ability to integrate with other Azure services and frameworks like Spring Boot.

The Azure Functions runtime takes care of scaling, security, and monitoring of your function app, and provides easy integration with other Azure services. You can read more about Azure Java Functions [here](https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-java?tabs=bash%2Cconsumption)

#### [](#spring-cloud-function-as-azure-function)Spring Cloud Function as Azure Function

Spring Cloud Function provides an [Azure Adapter](https://docs.spring.io/spring-cloud-function/docs/4.0.x-SNAPSHOT/reference/html/azure.html) to deploy and run Java functions as Azure Java Functions.

In order to use Spring Cloud Function with Azure Java Functions, you need to have the `spring-cloud-function-adapter-azure` dependency on your classpath:

```xml
Copy<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-function-adapter-azure</artifactId>
    <version>4.0.4</version>
</dependency>
```

It's important to note that using Spring Cloud Function enables you to use simple Java Function programming model on Azure Java Functions, but the underlying infrastructure is still Azure Functions, you still need to manage the scaling, security, and monitoring of the Azure Function app, and the integration with other Azure services.

Let’s look at the example. For this we need to factor out the business logic (i.e., uppercasing the String) into a dedicated function called `uppercase`:

```java
Copyimport java.util.function.Function;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HttpTriggerDemoApplication {

   @Bean
   public Function<String, String> uppercase() {
       return payload -> {
           String output = payload.toUpperCase();
           return String.format("Input: %s", output);         
       }
   }

	 @Bean
	 public Function<String, String> reverse() {
		  return payload -> new StringBuilder(payload).reverse().toString();
	 }

   public static void main(String[] args) {
       SpringApplication.run(HttpTriggerDemoApplication.class, args);
   }
}
```

This example uses the `@SpringBootApplication` annotation to configure a Spring Boot application and the `@Bean` annotation to define a function bean. Then to run this function on Azure Java Function, you need to create a new function app on Azure and configure it to use the Java runtime.

```java
Copyimport java.util.Optional;
import java.util.function.Function;
import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.function.context.FunctionCatalog;
import org.springframework.stereotype.Component;

@Component
public class AzureJavaExampleFunctionWithSpring {

   /**
    * Plain Spring bean (not Spring Cloud Functions!)
    */
   @Autowired
   private Function<String, String> uppercase;

   /**
    * The FunctionCatalog leverages the Spring Cloud Function framework.
    */
   @Autowired
   private FunctionCatalog functionCatalog;

   @FunctionName("bean")
   public String plainBeans(
           @HttpTrigger(name = "req", methods = { HttpMethod.GET,
                   HttpMethod.POST }, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<String>> request,
           ExecutionContext context) {

       // Use plain Spring Beans.
       return uppercase.apply(request.getBody().orElse("Hello World"));
   }

   @FunctionName("scf")
   public String springCloudFunction(
            @HttpTrigger(name = "req", methods = { HttpMethod.GET,
                    HttpMethod.POST }, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<String>> request,
            ExecutionContext context) {

        // Use SCF composition. 
        Function composed = this.functionCatalog.lookup("reverse|uppercase");

        return (String) composed.apply(request.getBody().orElse("Hello World"));
    }   
}
```

The `AzureJavaExampleFunctionWithSpring` class is annotated with standard Azure annotations such as @FunctionName and `@HttpTrigger` and internally it calls the `uppercase` function defined in the `HttpTriggerDemoApplication`. The `@Component` annotation is what makes this Azure application also a Spring application, thus providing integration point with Spring Cloud Function and other Spring managed components through Spring dependency injections such as autowiring the `uppercase` or `functionCatalog` beans. Note that the `AzureJavaExampleFunctionWithSpring` is a fully fledged Spring component, so you can autowire any Spring bean (not only functions), use property configurations and any other Spring Framework feature.

Note that the `plainBeans` function uses plain Spring beans, while the `springCloudFunctin` leverages the `FunctionCatalog` to compose multiple Spring Cloud Functions.

#### [](#deploying-to-microsoft-azure)Deploying to Microsoft Azure

You need to package your function as a fat jar, and then deploy it to your Azure Function App. Once deployed you can trigger your function either by HTTP request, events from Azure services like Event Hub, Service Bus, etc.

You can also use the maven plugin `com.microsoft.azure:azure-functions-maven-plugin` to deploy the function to the azure function, the maven plugin can be configured by adding the following to your pom.xml:

```xml
Copy<plugin>
  <groupId>com.microsoft.azure</groupId>
  <artifactId>azure-functions-maven-plugin</artifactId>
  <version>1.22.0</version>
  <configuration>
      <appName>scf-samples</appName>
      <resourceGroup>java-functions-group</resourceGroup>
      <region>westus</region>
      <appServicePlanName>java-functions-app-service-plan</appServicePlanName>
      <pricingTier>EP1</pricingTier>
      <hostJson>${project.basedir}/src/main/resources/host.json</hostJson>

      <runtime>
          <os>linux</os>
          <javaVersion>17</javaVersion>
      </runtime>

      <funcPort>7072</funcPort>

      <appSettings>
          <property>
              <name>FUNCTIONS_EXTENSION_VERSION</name>
              <value>~4</value>
          </property>
      </appSettings>
  </configuration>
  <executions>
      <execution>
          <id>package-functions</id>
          <goals>
              <goal>package</goal>
          </goals>
      </execution>
  </executions>
</plugin>
```

This will integrate your Azure Java Function with Spring Cloud Function and you can leverage the power of Spring Cloud Function like Function composition, POJO based development and many more.

For more information check the updated [Azure adapter reference documentation](https://docs.spring.io/spring-cloud-function/docs/4.0.x-SNAPSHOT/reference/html/azure.html#_microsoft_azure) and various examples can be found [here](https://docs.spring.io/spring-cloud-function/docs/4.0.x-SNAPSHOT/reference/html/azure.html#_samples).

#### [](#appendix1-convert-legacy-code-from-functinoinvoker-to-di-azure-function-integration)Appendix1: Convert legacy code. From FunctinoInvoker to DI Azure Function integration

Any existing application that uses FunctionInvoker can easily be converted into the new DI Azure Function integration style.

For example let's convert the following sample application that uses the legacy FunctionInvoker style.

The Spring Boot defines the boot application and a Spring Cloud Function called uppercase:

```java
Copyimport java.util.Map;
import java.util.function.Function;
import com.microsoft.azure.functions.ExecutionContext;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.function.json.JsonMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.Message;

@SpringBootApplication
public class Config {

   public static void main(String[] args) throws Exception {
       SpringApplication.run(Config.class, args);
   }

   @Bean
   public Function<Message<String>, String> uppercase(JsonMapper mapper) {
       return message -> {
           String value = message.getPayload();
           try {
               Map<String, String> map = mapper.fromJson(value, Map.class);

               if(map != null)
                   map.forEach((k, v) -> map.put(k, v != null ? v.toUpperCase() : null));

               return mapper.toString(map);
           } catch (Exception e) {
               e.printStackTrace();
               return ("Function error: - bad request");
           }
       };
   }
}
```

and the FunctionInvoker that uses the uppercase function as an Azure Function would look like this:

```java
Copyimport com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import java.util.Optional;
import org.springframework.cloud.function.adapter.azure.FunctionInvoker;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;

public class UppercaseHandler extends FunctionInvoker<Message<String>, String> {

   @FunctionName("uppercase")
   public String execute(
       @HttpTrigger(
           name = "req",
           methods = {HttpMethod.GET, HttpMethod.POST},
           authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<String>> request,
       ExecutionContext context
   ) {
       context.getLogger().warning("Using Java (" + System.getProperty("java.version") + ")");
       Message<String> message = MessageBuilder.withPayload(request.getBody().get())
           .copyHeaders(request.getHeaders()).build();
       return handleRequest(message, context);
   }
}
```

Note that by convention the `@FunctionName` must match the @Bean function name (in the Config class).

It is straightforward to refactor the UppercaseHandler class so that we replace the legacy FunctionInvoker with DI like this:

```java
Copyimport com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;

import java.util.Optional;

import org.springframework.cloud.function.adapter.azure.FunctionInvoker;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;

@Component
public class UppercaseHandler {

   @Autowired
   private Function<Message<String>, String> uppercase;

   @FunctionName("uppercase")
   public String execute(
       @HttpTrigger(
           name = "req",
           methods = {HttpMethod.GET, HttpMethod.POST},
           authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<String>> request,
       ExecutionContext context
   ) {
       context.getLogger().warning("Using Java (" + System.getProperty("java.version") + ")");
       Message<String> message = MessageBuilder.withPayload(request.getBody().get())
           .copyHeaders(request.getHeaders()).build();
       return uppercase.apply(message);
   }
}
```

-   Add the `@Component` class annotation.
-   Remove the `FunctionInvoke` class inheritance.
-   Autowire the required Function beans. Any Spring service and autowiring technique is supported.
-   Replace the `handleRequest` method call with an explicit function call.

This is all now you can build and deploy your application.