---
title: Building web applications with Spring Boot and Vaadin
source: https://spring.io/blog/2020/07/14/building-web-applications-with-spring-boot-and-vaadin
scraped: 2026-02-23T13:54:56.169Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  July 14, 2020 | 11 Comments
---

# Building web applications with Spring Boot and Vaadin

_Engineering | Stéphane Nicoll |  July 14, 2020 | 11 Comments_

> This post is a guest post by community member [Marcus Hellberg (@marcushellberg)](https://twitter.com/marcushellberg). Marcus is the head of the Community team at Vaadin. He likes helping developers discover and learn modern web technologies by creating online content and speaking with developers at events.

Building web apps can be a daunting task. There are many moving parts: you need to define the structure in HTML and then use CSS to make it look the way you want. For frontend apps, you also need to write the app logic in JavaScript and connect it to your backend over REST. And of course, you also need to implement the backend logic and REST services.

None of these things are that hard in and of themselves, but building something that both looks good and works well requires mastering several languages and often means spending a lot of time on setup and other tasks that don't add end-user value.

Why not consider Vaadin as an alternative? It is far less task intensive and offers many additional benefits.

## [](#vaadin-a-modern-web-application-framework-for-java)Vaadin: a modern web application framework for Java

Vaadin is a full-stack framework for the JVM that has a different approach to building web apps. It comes with:

-   An extensive set of customizable UI components with a Java API.
-   Automatic browser communication.
-   Powerful data binding and end-to-end type safety.
-   Built-in support for Spring technologies.

Let's take a look at a concrete example. Below, we create a view by mapping a `VerticalLayout` component to the `contacts` path. We use Spring to inject a service class into the constructor for backend access. We then instantiate a Vaadin Grid component and pass in a list of `Contact` objects to the grid. Finally, we add an `H1` header and the grid to our view to display them.

```java
Copy@Route("contacts") // localhost:8080/contacts
public class ContactsView extends VerticalLayout {

 // Autowire a Spring @Service
 public VaadinView(ContactService service) {

   // Instantiate Vaadin data grid component
   Grid<Contact> grid = new Grid<>(Contact.class);

   // Pass in a list of Contacts to show in the grid
   grid.setItems(service.findAll());
  
   // Define columns
   grid.addColumn(Contact::getFirstName).setHeader("First Name");
   grid.addColumn(Contact::getLastName).setHeader("Last Name");
   grid.addColumn(Contact::getEmail).setHeader("Email");
   grid.addColumn(contact -> contact.getCompany().getName()).setHeader("Company");

   // Add components to the layout to show them
   add(
       new H1("All contacts"),
       grid
   );
 }
}
```

In the example above, `@Route` is a specialized `@Component` that makes sure `ContractsView` is a regular Spring bean in the context.

![A Vaadin Grid showing contacts from a Spring @Service](https://static.spring.io/blog/snicoll/20200714/contacts.png)

What's worth noting here is what we didn't do: we didn't write an HTML template, CSS, JavaScript, or REST endpoints. We used the Spring backend we had and connected it to our UI, all in Java.

## [](#easier-vaadin-development-with-spring-boot)Easier Vaadin development with Spring Boot

Spring Boot is the most popular backend for Vaadin applications. Both Vaadin and Spring Boot are built with the developer in mind. They're easy enough to learn quickly, but robust enough to run in production.

Vaadin views are Spring-managed by default, which means you can autowire services and access your database and other server resources. You can use Spring Security to handle authentication and restrict access to parts of your application.

## [](#learn-web-app-development-with-spring-boot-and-vaadin)Learn web app development with Spring Boot and Vaadin

Vaadin recently published [a comprehensive tutorial series on Spring Boot and Vaadin](https://vaadin.com/learn/tutorials/modern-web-apps-with-spring-boot-and-vaadin). It's suitable for anyone who has some Java knowledge and wants to learn to build web applications.

The text and video tutorial cover the full application-development lifecycle:

-   Setting up a development environment.
-   Creating a new Spring Boot project with Vaadin support.
-   Using Spring Data to access a database.
-   Vaadin views, layouts, forms and data binding.
-   Making the app installable and defining an offline fallback page.
-   Unit and browser testing.
-   Cloud deployment.

\[[Read the Spring Boot and Vaadin tutorial](https://vaadin.com/learn/tutorials/modern-web-apps-with-spring-boot-and-vaadin)\]