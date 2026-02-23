---
title: Docker Compose Support in Spring Boot 3.1
source: https://spring.io/blog/2023/06/21/docker-compose-support-in-spring-boot-3-1
scraped: 2026-02-23T09:40:10.259Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Moritz Halbritter |  June 21, 2023 | 18 Comments
---

# Docker Compose Support in Spring Boot 3.1

_Engineering | Moritz Halbritter |  June 21, 2023 | 18 Comments_

> Docker Compose support in Spring Boot 3.1 builds on top of the `ConnectionDetails` abstraction, which [we've featured in a separate blog post](https://spring.io/blog/2023/06/19/spring-boot-31-connectiondetails-abstraction). If you haven't already read it, please do so before reading this post.

Docker Compose ["is a tool for defining and running multi-container Docker applications"](https://docs.docker.com/compose/). A Docker Compose configuration file, usually named `docker-compose.yaml` or `compose.yaml`, allows you to define services. Such services must have a name and a Docker image. Optionally you can also define environment variables, exposed ports, labels, how services relate to one another, and so on.

Here's a typical example of a simple Docker Compose file:

```yaml
Copyservices:
  database:
    image: 'postgres:15.2'
    ports:
    - '5432'
    environment:
    - 'POSTGRES_USER=myuser'
    - 'POSTGRES_DB=mydatabase'
    - 'POSTGRES_PASSWORD=secret'
```

It defines one service named `database`, which uses the `postgres:15.2` Docker image. It exposes the container port `5432` (which is the default PostgreSQL port), and Docker will choose a random host port on startup. Additionally, it defines some environment variables which configure the user, password, and database name.

If you run `docker compose up` in the directory where this file resides, Docker Compose will first check if this service is already running. If not, it will start a new container using the `postgres:15.2` image and configure it.

You can now run `docker compose ps` and see that the container has been started:

```
Copy$ docker compose ps
NAME                             IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
docker-compose-test-database-1   postgres:15.2       "docker-entrypoint.s…"   database            7 seconds ago       Up 6 seconds        0.0.0.0:32768->5432/tcp, :::32768->5432/tcp
```

To develop against that service in a pre-Spring Boot 3.1 application, you have to put some configuration properties in place, maybe in some kind of "developer" profile:

```properties
Copyspring.datasource.url=jdbc:postgresql://localhost:32768/mydatabase
spring.datasource.username=myuser
spring.datasource.password=secret
```

This configures Spring Boot to use the PostgreSQL database running inside the Docker container (connecting on the host port `32768`).

When you're done using the service, you'll typically run `docker compose down` to stop and destroy the containers. But when you start them again, you'll see that the dynamic port has changed:

```
Copy$ docker compose ps
NAME                             IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
docker-compose-test-database-1   postgres:15.2       "docker-entrypoint.s…"   database            4 minutes ago       Up 1 second         0.0.0.0:32769->5432/tcp, :::32769->5432/tcp
```

Oh no, that means you'll now have to update the application configuration!

Luckily, Docker Compose has a solution for that. Don't use random ports, use a fixed host port:

```yaml
Copyservices:
  database:
    image: 'postgres:15.2'
    ports:
      - '15432:5432'
    environment:
      - 'POSTGRES_USER=myuser'
      - 'POSTGRES_DB=mydatabase'
      - 'POSTGRES_PASSWORD=secret'
```

Now, every time you start the container, it's reachable on `localhost:15432`.

This works, but there's a different problem. If you're developing multiple applications where each application has their own database (which is quite common in microservice architectures), you have to remember to use different host ports. If you don't, some `docker compose up` commands fail because the port is already in use.

And now the good news. With Spring Boot 3.1, this gets a lot easier for you. You can continue to use random host ports but you don't have to specify configuration properties and you don't have to duplicate usernames, passwords, and so on in multiple places. You also don't have to remember to run `docker compose up` before starting the application.

Spring Boot 3.1 will detect that there's a Docker Compose file present, and will run `docker compose up` for you before connecting to the services. If the services are already running, it will detect that, too, and will use them. It will also run `docker compose stop` when the application shuts down - gone are the days of lingering Docker containers eating your precious memory.

The images started by Docker Compose are automatically detected and used to create `ConnectionDetails` beans pointing to the services. That means you don't have to put properties in your configuration, you don't have to remember how to construct PostgreSQL JDBC URLs, and so on.

With Spring Boot 3.1, all you need to do is to provide the `compose.yaml` file and let Spring Boot figure out the rest. It just works!

At the time of writing, we support [the following Docker images](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.docker-compose.service-connections):

-   Cassandra - [`cassandra`](https://hub.docker.com/_/cassandra)
-   Elasticsearch - [`elasticsearch`](https://hub.docker.com/_/elasticsearch)
-   Oracle database - [`gvenzl/oracle-xe`](https://hub.docker.com/r/gvenzl/oracle-xe)
-   MariaDB - [`mariadb`](https://hub.docker.com/_/mariadb)
-   Microsoft SQL server - [`mssql/server`](https://hub.docker.com/_/microsoft-mssql-server)
-   MySQL - [`mysql`](https://hub.docker.com/_/mysql)
-   PostgreSQL - [`postgres`](https://hub.docker.com/_/postgres)
-   MongoDB - [`mongo`](https://hub.docker.com/_/mongo)
-   RabbitMQ - [`rabbitmq`](https://hub.docker.com/_/rabbitmq)
-   Redis - [`redis`](https://hub.docker.com/_/redis)
-   Zipkin - [`openzipkin/zipkin`](https://hub.docker.com/r/openzipkin/zipkin)

Want to try this yourself? We've [prepared some documentation to get you started](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.docker-compose).

We have also added support for Docker Compose to [start.spring.io](https://start.spring.io/) to get you started even faster! For example, if you generate a project with "Docker Compose support" and "PostgreSQL driver" dependencies, you'll get a sensible `compose.yaml` for free! Isn't that absolutely awesome?!

"Okay, okay", I hear you say, "but what about my custom Redis image we use at our company?". We have you covered: you can build your own image, [put a label on it](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.docker-compose.custom-images) and Spring Boot will pretend that it's the official image. Just make sure that you use the same environment variable names as the official image.

We also support [ignoring services](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.docker-compose.skipping), Docker Compose [files with unusual names](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.docker-compose.specific-file), and Docker Compose [profiles](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.docker-compose.profiles).

We really hope you like the new Docker Compose features! If you want to see more services supported, or have other ideas how to improve things, [please get in touch](https://github.com/spring-projects/spring-boot/issues).