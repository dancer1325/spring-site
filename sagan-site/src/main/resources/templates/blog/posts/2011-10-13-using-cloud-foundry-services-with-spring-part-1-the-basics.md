---
title: Using Cloud Foundry Services with Spring: Part 1 - The Basics
source: https://spring.io/blog/2011/10/13/using-cloud-foundry-services-with-spring-part-1-the-basics
scraped: 2026-02-24T08:33:58.242Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ramnivas Laddad |  October 13, 2011 | 0 Comments
---

# Using Cloud Foundry Services with Spring: Part 1 - The Basics

_Engineering | Ramnivas Laddad |  October 13, 2011 | 0 Comments_

Services offered in Cloud Foundry make writing efficient and effective applications possible. Developers can now choose just the right kind of services without worrying about operating those services. For example, a portion of an application can choose Postgres for the parts where transactional access is crucial, MongoDB where interacting with data as a collection of documents makes sense, Redis where key-value is the right abstraction, and RabbitMQ where messaging helps create effective architecture. In this four-part blog series, we will explore how Spring applications can use Cloud Foundry services. While our focus is on Spring, developers using other frameworks, especially JVM-based frameworks (Grails, Lift, and plain Java Web) will find good portion of these blogs relevant.

In this first installment, we will explore how Cloud Foundry exposes service information to applications. In the next blog, I will describe how a typical Spring application can use the auto-reconfiguration mechanism that allows using services without any modifications. In the third blog, Thomas Risberg will explain how to use the “cloud” namespace to have an explicit control over consuming services. In the fourth installment, Scott Andrews will show how to combine the profile support in Spring 3.1 with the “cloud” namespace to create applications that allow explicit control over services, while allowing applications to run locally or in Cloud Foundry without any change. By the end of this blog series, you should have sufficient information to use Cloud Foundry services effectively from Spring applications.

When you bind Cloud Foundry services such as Postgres or Mongo to an application, information about the bound services such as host, port, and credentials are exposed through environment variables with values encoded as JSON. To illustrate this point, we will create a simple web application that shows all the environment variables. We start with a Spring MVC Template project and add the following end point to HomeController (you can see this application on [github](https://github.com/cloudfoundry-samples/spring-hello-env)).

```java
Copy
@RequestMapping("/env")
public void env(HttpServletResponse response) throws IOException {
    response.setContentType("text/plain");
    PrintWriter out = response.getWriter();
    out.println("System Environment:");
    for (Map.Entry<String, String> envvar : System.getenv().entrySet()) {
        out.println(envvar.getKey() + ": " + envvar.getValue());
    }
}
```

Let’s deploy this application. I will use the 'vmc' tool, but using STS with the Cloud Foundry plugin will work, as well. Note that I am using hello-env as the application name and default URL based on it (hello-env.cloudfoundry.com). If you are coding along with this blog, you will want to choose an application name such as the default URL for it is not already taken. Alternatively, you can deploy to [Micro Cloud Foundry](http://www.cloudfoundry.com/micro).

```
Copy
$ vmc push hello-env -n
Creating Application: OK
Uploading Application:
  Checking for available resources: OK
  Processing resources: OK
  Packing application: OK
  Uploading (8K): OK   
Push Status: OK
Staging Application: OK                                                         
Starting Application: OK
```

At this point if you navigate to [](http://hello-env.cloudfoundry.com/env)[http://hello-env.cloudfoundry.com/env](http://hello-env.cloudfoundry.com/env), you will see a page full for all environment variables, many with the name starting with VCAP\_ exposing all sorts of information about the application. Of our interest is the VCAP\_SERVICES variable, which currently shows as

```javascript
Copy
VCAP_SERVICES: {}
```

We see the variable as empty map (in JSON representation) indicating, rightly so, that no services have been bound. Let's create a Postgres service, name it env-postgresql, and bind it to our application. Note the form of the command: `vmc create-service <service-type> <service-name> <applciation-name>`.

```
Copy
$ vmc create-service postgresql env-postgresql hello-env
Creating Service: OK
Binding Service: OK
Stopping Application: OK
Staging Application: OK                                                         
Starting Application: OK
```

Now, let's navigate again to [](http://hello-env.cloudfoundry.com/env)[http://hello-env.cloudfoundry.com/env](http://hello-env.cloudfoundry.com/env) and you will see the VCAP\_SERVICES environment variable as (formatted here for readability):

```javascript
Copy
{
    "postgresql-9.0": [{
        "name": "env-postgresql",
        "label": "postgresql-9.0",
        "plan": "free",
        "credentials": {
            "name": "de24667f9344b4eeaad6b5a2326d52faa",
            "host": "172.30.48.122",
            "hostname": "172.30.48.122",
            "port": 5432,
            "user": "u50ce600bba434bacbc99e034bb415644",
            "username": "u50ce600bba434bacbc99e034bb415644",
            "password": "pf4dca5bd449d4732841f0c4ae3f299d0"
        }
    }]
}
```

This has all the information necessary for the application to connect to it: host, port, and name to create a JDBC URL as well as username and password to connect to it (hostname is deprecated and will be removed in a future version).

Let's bind another service, this time a MongoDB.

```
Copy
$ vmc create-service mongodb env-mongodb hello-env
```

Now the environment variable will look like:

```javascript
Copy
{
    "mongodb-1.8": [{
        "name": "env-mongodb",
        "label": "mongodb-1.8",
        "plan": "free",
        "tags": ["mongodb", "mongodb-1.8", "nosql"],
        "credentials": {
            "hostname": "172.30.48.68",
            "host": "172.30.48.68",
            "port": 25026,
            "username": "b8b312a0-9b43-4104-90f8-52f2ac8bc7c6",
            "password": "6a62732d-f820-4690-9bab-d1c85af13323",
            "name": "416e990a-6f81-46f9-abaa-1233a11ca5d6",
            "db": "db"
        }
    }],
    "postgresql-9.0": [{
        "name": "env-postgresql",
        "label": "postgresql-9.0",
        "plan": "free",
        "credentials": {
            "name": "de24667f9344b4eeaad6b5a2326d52faa",
            "host": "172.30.48.122",
            "hostname": "172.30.48.122",
            "port": 5432,
            "user": "u50ce600bba434bacbc99e034bb415644",
            "username": "u50ce600bba434bacbc99e034bb415644",
            "password": "pf4dca5bd449d4732841f0c4ae3f299d0"
        }
    }]
}
```

Again, the MongoDB portion has all the information needed to create a connection to it.

This is how Cloud Foundry exposes service information to your application so that it can consume the services bound to it. This requires accessing the environment variable, parsing JSON, and creating access objects (such as `DataSource` for relational database). While not too difficult, this is not something a programmer wants or likes to deal with directly. Therefore, Cloud Foundry provides a few mechanisms to simplify the task of connecting to services, which we will explore later in this series.

In the next installment, I will show you the auto-reconfiguration mechanism that lets typical Spring applications consume services without changing anything in the application. Until then, enjoy!