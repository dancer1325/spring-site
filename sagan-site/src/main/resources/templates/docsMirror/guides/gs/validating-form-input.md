---
title: Getting Started | Validating Form Input
source: https://spring.io/guides/gs/validating-form-input
scraped: 2026-02-19T07:55:59.332Z
description: Learn how to perform form validation with Spring.
---

# Validating Form Input

This guide walks you through the process of configuring a web application form to support validation.

## What You Will Build

You will build a simple Spring MVC application that takes user input and checks the input by using standard validation annotations. You will also see how to display the error message on the screen so that the user can re-enter input to make it be valid.

## What You Need

-   About 15 minutes
    
-   A favorite text editor or IDE
    
-   [Java 17](https://www.oracle.com/java/technologies/downloads/) or later
    
-   [Gradle 7.5+](https://gradle.org/install/) or [Maven 3.5+](https://maven.apache.org/download.cgi)
    
-   You can also import the code straight into your IDE:
    
    -   [Spring Tool Suite (STS)](/guides/gs/sts)
        
    -   [IntelliJ IDEA](/guides/gs/intellij-idea/)
        
    -   [VSCode](/guides/gs/guides-with-vscode/)
        
    

## How to complete this guide

Like most Spring [Getting Started guides](/guides), you can start from scratch and complete each step or you can bypass basic setup steps that are already familiar to you. Either way, you end up with working code.

To **start from scratch**, move on to [Starting with Spring Initializr](#scratch).

To **skip the basics**, do the following:

-   [Download](https://github.com/spring-guides/gs-validating-form-input/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-validating-form-input.git](https://github.com/spring-guides/gs-validating-form-input.git)`
    
-   cd into `gs-validating-form-input/initial`
    
-   Jump ahead to [Create a `PersonForm` Object](#initial).
    

**When you finish**, you can check your results against the code in `gs-validating-form-input/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=maven-project&language=java&packaging=jar&jvmVersion=11&groupId=com.example&artifactId=validating-form-input&name=validating-form-input&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.validating-form-input&dependencies=web,thymeleaf,validation) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Spring Web**, **Thymeleaf**, and **Validation**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from Github and open it in your IDE or other editor.

## Create a `PersonForm` Object

The application involves validating a user’s name and age, so you first need to create a class that backs the form used to create a person. The following listing (from `src/main/java/com/example/validatingforminput/PersonForm.java`) shows how to do so:

```
Copypackage com.example.validatingforminput;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class PersonForm {

	@NotNull
	@Size(min=2, max=30)
	private String name;

	@NotNull
	@Min(18)
	private Integer age;

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String toString() {
		return "Person(Name: " + this.name + ", Age: " + this.age + ")";
	}
}
```

The `PersonForm` class has two attributes: `name` and `age`. It is flagged with a few standard validation annotations:

-   `@Size(min=2, max=30)`: Allows names between 2 and 30 characters long.
    
-   `@NotNull`: Does not allow a null value, which is what Spring MVC generates if the entry is empty.
    
-   `@Min(18)`: Does not allow the age to be less than 18.
    

In addition to that, you can also see getters and setters for `name` and `age` and a convenient `toString()` method.

## Create a Web Controller

Now that you have defined a form-backing object, it is time to create a simple web controller. The following listing (from `src/main/java/com/example/validatingforminput/WebController.java`) shows how to do so:

```
Copypackage com.example.validatingforminput;

import jakarta.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Controller
public class WebController implements WebMvcConfigurer {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/results").setViewName("results");
	}

	@GetMapping("/")
	public String showForm(PersonForm personForm) {
		return "form";
	}

	@PostMapping("/")
	public String checkPersonInfo(@Valid PersonForm personForm, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return "form";
		}

		return "redirect:/results";
	}
}
```

This controller has a GET method and a POST method. Both methods are mapped to `/`.

The `showForm` method returns the `form` template. It includes a `PersonForm` in its method signature so that the template can associate form attributes with a `PersonForm`.

The `checkPersonInfo` method accepts two arguments:

-   A `personForm` object marked with `@Valid` to gather the attributes filled out in the form.
    
-   A `bindingResult` object so that you can test for and retrieve validation errors.
    

You can retrieve all the attributes from the form, which is bound to the `PersonForm` object. In the code, you test for errors. If you encounter an error, you can send the user back to the original `form` template. In that situation, all the error attributes are displayed.

If all of the person’s attribute are valid, it redirects the browser to the final `results` template.

## Build an HTML Front End

Now build the “main” page, as the following listing (from `src/main/resources/templates/form.html`) shows:

```
Copy<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
    <body>
        <form action="#" th:action="@{/}" th:object="${personForm}" method="post">
            <table>
                <tr>
                    <td>Name:</td>
                    <td><input type="text" th:field="*{name}" /></td>
                    <td th:if="${#fields.hasErrors('name')}" th:errors="*{name}">Name Error</td>
                </tr>
                <tr>
                    <td>Age:</td>
                    <td><input type="text" th:field="*{age}" /></td>
                    <td th:if="${#fields.hasErrors('age')}" th:errors="*{age}">Age Error</td>
                </tr>
                <tr>
                    <td><button type="submit">Submit</button></td>
                </tr>
            </table>
        </form>
    </body>
</html>
```

The page contains a simple form, with each of its field in a separate cell in a table. The form is geared to post to `/`. It is marked as being backed up by the `personForm` object that you saw in the `GET` method in the web controller. This is known as a “bean-backed form”. There are two fields in the `PersonForm` bean, and you can see that they are tagged with `th:field="*{name}"` and `th:field="*{age}"`. Next to each field is a secondary element that is used to show any validation errors.

Finally, you have a button that submits the form. In general, if the user enters a name or age that violates the `@Valid` constraints, it bounces back to this page with the error message displayed. If a valid name and age is entered, the user is routed to the next web page.

The following example (from `src/main/resources/templates/results.html`) shows the results page:

```
Copy<html>
	<body>
		Congratulations! You are old enough to sign up for this site.
	</body>
</html>
```

In this simple example, these web pages do not have any sophisticated CSS or JavaScript.

## Run the Application

For this application, you are using the template language of [Thymeleaf](https://www.thymeleaf.org/doc/tutorials/3.0/thymeleafspring.html). This application needs more than raw HTML. The Spring Initializr created an application class for you. The following listing (from `src/main/java/com/example/validatingforminput/ValidatingFormInputApplication.java`) shows that class:

```
Copypackage com.example.validatingforminput;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ValidatingFormInputApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(ValidatingFormInputApplication.class, args);
	}

}
```

To activate Spring MVC, you would normally add `@EnableWebMvc` to the `Application` class. But Spring Boot’s `@SpringBootApplication` already adds this annotation when it detects `spring-webmvc` on your classpath. This same annotation lets it find the annotated `@Controller` class and its methods.

The Thymeleaf configuration is also taken care of by `@SpringBootApplication`. By default, templates are located in the classpath under `templates/` and are resolved as views by stripping the '.html' suffix off the file name. (Thymeleaf settings can be changed and overridden in a variety of ways, depending on what you need to achieve, but the details are not relevant to this guide.)

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-validating-form-input-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-validating-form-input-0.0.1-SNAPSHOT.jar

The application should be up and running within a few seconds.

If you visit `[http://localhost:8080/](http://localhost:8080/)`, you should see something like the following image:

![valid 01](https://raw.githubusercontent.com/spring-guides/gs-validating-form-input/main/images/valid-01.png)

The following pair of images show what happens if you enter `N` for the name and `15` for your age and click on **Submit**:

![valid 02](https://raw.githubusercontent.com/spring-guides/gs-validating-form-input/main/images/valid-02.png)

![valid 03](https://raw.githubusercontent.com/spring-guides/gs-validating-form-input/main/images/valid-03.png)

The preceding images show that, because the values violated the constraints in the `PersonForm` class, you get bounced back to the “main” page. Note that, if you click on **Submit** with nothing in the entry box, you get a different error, as the following image shows:

![valid 04](https://raw.githubusercontent.com/spring-guides/gs-validating-form-input/main/images/valid-04.png)

If you enter a valid name and age, you end up on the `results` page, as the following image shows:

![valid 05](https://raw.githubusercontent.com/spring-guides/gs-validating-form-input/main/images/valid-05.png)

## Summary

Congratulations! You have coded a simple web application with validation built into a domain object. This way, you can ensure that the data meets certain criteria and that the user correctly inputs the data.

## See Also

The following guides may also be helpful:

-   [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
    
-   [Handling Form Submission](https://spring.io/guides/gs/handling-form-submission/)
    
-   [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
    
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-validating-form-input)