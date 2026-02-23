---
title: Getting Started | Authenticating a User with LDAP
source: https://spring.io/guides/gs/authenticating-ldap
scraped: 2026-02-19T07:54:43.036Z
description: Learn how to secure an application with LDAP.
---

# Authenticating a User with LDAP

This guide walks you through the process creating an application and securing it with the [Spring Security](https://projects.spring.io/spring-security/) LDAP module.

## What You Will Build

You will build a simple web application that is secured by Spring Security’s embedded Java-based LDAP server. You will load the LDAP server with a data file that contains a set of users.

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

-   [Download](https://github.com/spring-guides/gs-authenticating-ldap/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-authenticating-ldap.git](https://github.com/spring-guides/gs-authenticating-ldap.git)`
    
-   cd into `gs-authenticating-ldap/initial`
    
-   Jump ahead to [Create a Simple Web Controller](#initial).
    

**When you finish**, you can check your results against the code in `gs-authenticating-ldap/complete`.

## Starting with Spring Initializr

Because the point of this guide is to secure an unsecured web application, you will first build an unsecured web application and, later in the guide, add more dependencies for the Spring Security and LDAP features.

You can use this [pre-initialized project](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.1.0&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=authenticating-ldap&name=authenticating-ldap&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.authenticating-ldap&dependencies=web) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Spring Web**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from Github and open it in your IDE or other editor.

## Create a Simple Web Controller

In Spring, REST endpoints are Spring MVC controllers. The following Spring MVC controller (from `src/main/java/com/example/authenticatingldap/HomeController.java`) handles a `GET /` request by returning a simple message:

```
Copypackage com.example.authenticatingldap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

  @GetMapping("/")
  public String index() {
    return "Welcome to the home page!";
  }

}
```

The entire class is marked up with `@RestController` so that Spring MVC can autodetect the controller (by using its built-in scanning features) and automatically configure the necessary web routes.

`@RestController` also tells Spring MVC to write the text directly into the HTTP response body, because there are no views. Instead, when you visit the page, you get a simple message in the browser (because the focus of this guide is securing the page with LDAP).

## Build the Unsecured Web Application

Before you secure the web application, you should verify that it works. To do that, you need to define some key beans, which you can do by creating an `Application` class. The following listing (from `src/main/java/com/example/authenticatingldap/AuthenticatingLdapApplication.java`) shows that class:

```
Copypackage com.example.authenticatingldap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuthenticatingLdapApplication {

  public static void main(String[] args) {
    SpringApplication.run(AuthenticatingLdapApplication.class, args);
  }

}
```

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-authenticating-ldap-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-authenticating-ldap-0.0.1-SNAPSHOT.jar

If you open your browser and visit [http://localhost:8080](http://localhost:8080), you should see the following plain text:

```
CopyWelcome to the home page!
```

## Set up Spring Security

To configure Spring Security, you first need to add some extra dependencies to your build.

For a Gradle-based build, add the following dependencies to the `build.gradle` file:

```
Copyimplementation("org.springframework.boot:spring-boot-starter-security")
implementation("org.springframework.ldap:spring-ldap-core")
implementation("org.springframework.security:spring-security-ldap")
implementation("com.unboundid:unboundid-ldapsdk")
```

Due to an artifact resolution issue with Gradle, **spring-tx** must be pulled in. Otherwise, Gradle fetches an older one that doesn’t work.

For a Maven-based build, add the following dependencies to the `pom.xml` file:

```
Copy<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
		<groupId>org.springframework.ldap</groupId>
		<artifactId>spring-ldap-core</artifactId>
</dependency>
<dependency>
		<groupId>org.springframework.security</groupId>
		<artifactId>spring-security-ldap</artifactId>
</dependency>
<dependency>
		<groupId>com.unboundid</groupId>
		<artifactId>unboundid-ldapsdk</artifactId>
</dependency>
```

These dependencies add Spring Security and UnboundId, an open source LDAP server. With those dependencies in place, you can then use pure Java to configure your security policy, as the following example (from `src/main/java/com/example/authenticatingldap/WebSecurityConfig.java`) shows:

```
Copypackage com.example.authenticatingldap;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class WebSecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests((authorize) -> authorize
        .anyRequest().fullyAuthenticated()
      )
      .formLogin(Customizer.withDefaults());

    return http.build();
  }

  @Autowired
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth
      .ldapAuthentication()
        .userDnPatterns("uid={0},ou=people")
        .groupSearchBase("ou=groups")
        .contextSource()
          .url("ldap://localhost:8389/dc=springframework,dc=org")
          .and()
        .passwordCompare()
          .passwordEncoder(new BCryptPasswordEncoder())
          .passwordAttribute("userPassword");
  }

}

//@Configuration
//public class WebSecurityConfig {

//  @Bean
//  public SecurityFilterChain configure(HttpSecurity http) throws Exception {
//    return http
//      .authorizeRequests()
//      .anyRequest().authenticated()
//      .and()
//      .formLogin(Customizer.withDefaults())
//      .build();
//  }
//}
```

You also need an LDAP server. Spring Boot provides auto-configuration for an embedded server written in pure Java, which is being used for this guide. The `ldapAuthentication()` method configures things so that the user name at the login form is plugged into `{0}` such that it searches `uid={0},ou=people,dc=springframework,dc=org` in the LDAP server. Also, the `passwordCompare()` method configures the encoder and the name of the password’s attribute.

## Add Application Properties

Spring LDAP requires that three application properties be set in the `` application.properties` `` file:

```
Copyspring.ldap.embedded.ldif=classpath:test-server.ldif
spring.ldap.embedded.base-dn=dc=springframework,dc=org
spring.ldap.embedded.port=8389
```

## Set up User Data

LDAP servers can use LDIF (LDAP Data Interchange Format) files to exchange user data. The `spring.ldap.embedded.ldif` property inside `application.properties` lets Spring Boot pull in an LDIF data file. This makes it easy to pre-load demonstration data. The following listing (from `src/main/resources/test-server.ldif`) shows an LDIF file that works with this example:

```
Copydn: dc=springframework,dc=org
objectclass: top
objectclass: domain
objectclass: extensibleObject
dc: springframework

dn: ou=groups,dc=springframework,dc=org
objectclass: top
objectclass: organizationalUnit
ou: groups

dn: ou=subgroups,ou=groups,dc=springframework,dc=org
objectclass: top
objectclass: organizationalUnit
ou: subgroups

dn: ou=people,dc=springframework,dc=org
objectclass: top
objectclass: organizationalUnit
ou: people

dn: ou=space cadets,dc=springframework,dc=org
objectclass: top
objectclass: organizationalUnit
ou: space cadets

dn: ou=\"quoted people\",dc=springframework,dc=org
objectclass: top
objectclass: organizationalUnit
ou: "quoted people"

dn: ou=otherpeople,dc=springframework,dc=org
objectclass: top
objectclass: organizationalUnit
ou: otherpeople

dn: uid=ben,ou=people,dc=springframework,dc=org
objectclass: top
objectclass: person
objectclass: organizationalPerson
objectclass: inetOrgPerson
cn: Ben Alex
sn: Alex
uid: ben
userPassword: $2a$10$c6bSeWPhg06xB1lvmaWNNe4NROmZiSpYhlocU/98HNr2MhIOiSt36

dn: uid=bob,ou=people,dc=springframework,dc=org
objectclass: top
objectclass: person
objectclass: organizationalPerson
objectclass: inetOrgPerson
cn: Bob Hamilton
sn: Hamilton
uid: bob
userPassword: bobspassword

dn: uid=joe,ou=otherpeople,dc=springframework,dc=org
objectclass: top
objectclass: person
objectclass: organizationalPerson
objectclass: inetOrgPerson
cn: Joe Smeth
sn: Smeth
uid: joe
userPassword: joespassword

dn: cn=mouse\, jerry,ou=people,dc=springframework,dc=org
objectclass: top
objectclass: person
objectclass: organizationalPerson
objectclass: inetOrgPerson
cn: Mouse, Jerry
sn: Mouse
uid: jerry
userPassword: jerryspassword

dn: cn=slash/guy,ou=people,dc=springframework,dc=org
objectclass: top
objectclass: person
objectclass: organizationalPerson
objectclass: inetOrgPerson
cn: slash/guy
sn: Slash
uid: slashguy
userPassword: slashguyspassword

dn: cn=quote\"guy,ou=\"quoted people\",dc=springframework,dc=org
objectclass: top
objectclass: person
objectclass: organizationalPerson
objectclass: inetOrgPerson
cn: quote\"guy
sn: Quote
uid: quoteguy
userPassword: quoteguyspassword

dn: uid=space cadet,ou=space cadets,dc=springframework,dc=org
objectclass: top
objectclass: person
objectclass: organizationalPerson
objectclass: inetOrgPerson
cn: Space Cadet
sn: Cadet
uid: space cadet
userPassword: spacecadetspassword

dn: cn=developers,ou=groups,dc=springframework,dc=org
objectclass: top
objectclass: groupOfUniqueNames
cn: developers
ou: developer
uniqueMember: uid=ben,ou=people,dc=springframework,dc=org
uniqueMember: uid=bob,ou=people,dc=springframework,dc=org

dn: cn=managers,ou=groups,dc=springframework,dc=org
objectclass: top
objectclass: groupOfUniqueNames
cn: managers
ou: manager
uniqueMember: uid=ben,ou=people,dc=springframework,dc=org
uniqueMember: cn=mouse\, jerry,ou=people,dc=springframework,dc=org

dn: cn=submanagers,ou=subgroups,ou=groups,dc=springframework,dc=org
objectclass: top
objectclass: groupOfUniqueNames
cn: submanagers
ou: submanager
uniqueMember: uid=ben,ou=people,dc=springframework,dc=org
```

Using an LDIF file is not standard configuration for a production system. However, it is useful for testing purposes or guides.

If you visit the site at [http://localhost:8080](http://localhost:8080), you should be redirected to a login page provided by Spring Security.

Enter a user name of `ben` and a password of `benspassword`. You should see the following message in your browser:

```
CopyWelcome to the home page!
```

## Summary

Congratulations! You have written a web application and secured it with [Spring Security](https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/). In this case, you used an [LDAP-based user store](https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#ldap).

## See Also

The following guide may also be helpful:

-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-authenticating-ldap)