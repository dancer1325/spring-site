---
title: Managing your Database Secrets with Vault
source: https://spring.io/blog/2016/08/15/managing-your-database-secrets-with-vault
scraped: 2026-02-23T19:07:41.008Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  August 15, 2016 | 4 Comments
---

# Managing your Database Secrets with Vault

_Engineering | Mark Paluch |  August 15, 2016 | 4 Comments_

In my previous post about [Managing Secrets with Vault](https://spring.io/blog/2016/06/24/managing-secrets-with-vault), I introduced you to Vault and how to store arbitrary secrets using the generic secret backend. Vault can manage more than just secret data like API keys, passwords, and other sensitive string-like data. Today we’re taking a look at Vault’s integration with databases, services, and certificates.

## [](#database-credentials-tend-to-be-static)Database credentials tend to be static

When it comes to databases, the regular workflow of getting credentials applying for a database is asking some operator or a self-service tool to give you credentials so your application can log into the database. At this point, credentials are considered static. Credentials get usually changed in case the database is migrated or if there’s a security breach.

With [Spring Cloud Vault](https://github.com/spring-cloud-incubator/spring-cloud-vault-config) you can store username and password inside Vault instead your application configuration. [Spring Config Server](https://cloud.spring.io/spring-cloud-config/) is also a good choice; it allows you to [store encrypted secrets](http://cloud.spring.io/spring-cloud-static/spring-cloud.html#_encryption_and_decryption) in your config repository. Your credentials are protected.

There's one caveat: Long-lived credentials are a good target for leakage. Leaked credentials can give access to an unintended party. A few databases implement restrictions on source hosts. In some cases, a database user can be restricted to a group of hosts. That restriction prevents access from other hosts. Still, every user and process that has access to a permitted machine can use the leaked credentials. But how do you discover that leakage? You might find the leak if your data was leaked to the public or the internet but that’s not always the case. For other cases, the unintended party may read or change your data, and it’s fairly sure the leak remains undiscovered for quite a while.

Let’s make credentials short-lived.

## [](#vault-and-databases)Vault and Databases

Vault comes with a variety of integrations to different systems. Some of them integrate with [PostgreSQL](https://www.vaultproject.io/docs/secrets/postgresql/index.html) and [MySQL](https://www.vaultproject.io/docs/secrets/mysql/index.html) as secret backend. A secret backend can provide secrets. In this case, secret backend does not mean that secret data is stored in PosgreSQL/MySQL. It means that Vault can create (and revoke) users for databases on demand.

To generate database credentials, you need to set up a role first. Roles control the permission context for database credentials generation. A role defines the permissions that are associated with the credentials. That concept maps well if you run different applications and each application requires different database permissions. A role also defines the max lease time for obtained credentials. The lease is in Vault-speak the duration the credentials are valid. Vault revokes credentials from the database system once they are expired. Some databases, like PostgreSQL, have built-in support for password expiry with the `CREATE ROLE … VALID UNTIL …` clause.

## [](#first-steps-with-vault-and-mysql)First steps with Vault and MySQL

Now how to get started with Vault and MySQL?

You need an initialized and unsealed Vault server and a running MySQL server. See the [previous post](https://spring.io/blog/2016/06/24/managing-secrets-with-vault#wait-there-rsquo-s-hope) how to setup Vault.

Then you can set up the MySQL backend along the connection details and role declaration:

First, mount the `mysql` secret backend with

```bash
Copy$ vault mount mysql
Successfully mounted 'mysql' at 'mysql'!
```

Each mount correlates to one MySQL server. If you want to generate credentials for multiple servers, then you need to mount the backend multiple times using different paths.

Once the backend is mounted, you need to supply the control connection details that consist of a username/password combination and the host and port. The control connection is used to create and revoke users.

```bash
Copy$ vault write mysql/config/connection \
	connection_url="root:root@tcp(127.0.0.1:3306)/"
Success! Data written to: mysql/config/connection
```

The role contains the scripts for user creation and the authorization. You can include multiple commands if you wish to do so. Vault will execute these commands on each credential generation:

```bash
Copy$ vault write mysql/roles/readonly \
	sql="CREATE USER '{{name}}'@'%' IDENTIFIED BY '{{password}}';GRANT SELECT ON *.* TO '{{name}}'@'%';"
Success! Data written to: mysql/roles/readonly
```

Vault is now ready to generate credentials for the `readonly` role. You can obtain credentials with

```bash
Copy$ vault read mysql/creds/readonly
Key            	Value
---            	-----
lease_id       	mysql/creds/readonly/2e7cd1d0-e313-158e-c9a4-1dd3c3277642
lease_duration 	2592000
lease_renewable	true
password       	04cf512a-57f8-d146-9cf5-ec2bd829ca8c
username       	token-10a8b69f-a
```

and verify they work using the `mysql` console application:

```bash
Copy$ mysql -h 127.0.0.1 -utoken-10a8b69f-a -p04cf512a-57f8-d146-9cf5-ec2bd829ca8c
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 5
...
```

Now that we know our Vault/MySQL integration is working we can use it inside a Spring Boot application with Spring Cloud Vault.

Grab a Spring Boot project. [start.spring.io](http://start.spring.io) is a good starting point.

Include the Spring Cloud Vault Starter, the Database dependency, `spring-jdbc` and the MySQL driver in your project. Add the following code to your build configuration file. These lines include all required dependencies.

**Maven**

```xml
Copy<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-vault-starter-config</artifactId>
	<version>1.0.0.BUILD-SNAPSHOT</version>
</dependency>

<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-vault-config-databases</artifactId>
	<version>1.0.0.BUILD-SNAPSHOT</version>
</dependency>

<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-jdbc</artifactId>
</dependency>

<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
</dependency>

<repositories>
	<repository>
		<id>spring-snapshots</id>
		<name>Spring Snapshots</name>
		<url>https://repo.spring.io/libs-snapshot</url>
		<snapshots>
			<enabled>true</enabled>
		</snapshots>
	</repository>
</repositories>
```

**Gradle**

```
Copyrepositories {
	maven {
		url 'https://repo.spring.io/libs-snapshot'
	}
}

dependencies {
	compile("org.springframework.cloud:spring-cloud-vault-starter-config:1.0.0.BUILD-SNAPSHOT")
	compile("org.springframework.cloud:spring-cloud-vault-config-databases:1.0.0.BUILD-SNAPSHOT")
	compile("org.springframework:spring-jdbc:4.3.1.RELEASE")
	compile("mysql:mysql-connector-java:5.1.39")
}
```

## [](#setup-the-configuration)Setup the configuration

Spring Cloud Vault uses by default the generic secret backend. In our case we don’t need the generic backend. So we need to disable the `generic` backend and enable the MySQL backend. All configuration needs to be specified in the bootstrap configuration. For this example we use `bootstrap.yml` in `src/main/resources`:

```yml
Copyspring.cloud.vault:
		token: 9a63de21-8af7-311a-9a5a-151b6a0d4795
		scheme: http
		generic:
			enabled: false
		mysql:
			enabled: true
			role: readonly

spring.datasource.url: jdbc:mysql://127.0.0.1:3306		
```

We don’t add any database credentials to the config file. These would usually be `spring.datasource.username` and `spring.datasource.password`.

The `spring.cloud.vault.scheme` is set to `http` because we’ve started Vault in plaintext HTTP mode (`spring.cloud.vault.scheme` defaults to `https`). Don’t do this in production. Plaintext makes the whole secret story useless as all listeners on the network can see your secrets Please note that the token used in the example is the root token.

You can create new tokens with:

```bash
Copy$ vault token-create
Key            	Value
---            	-----
token          	728d26ae-53a6-d8b6-d7a0-c5f62238ea55
token_accessor 	2fd7dcba-39d0-04d3-8d6b-096c3529cf14
token_duration 	0
token_renewable	true
token_policies 	[root]
```

That’s apparently all you need to do for the Vault MySQL integration with your Spring Boot application.

Let’s quickly add some code to your application so you can test the integration with real code.

```java
Copy
@SpringBootApplication
public class MySqlApplication {
	public static void main(String[] args) {
		SpringApplication.run(MySqlApplication.class, args);
	}

	@Autowired
	DataSource dataSource;

	@PostConstruct
	private void postConstruct() throws Exception {

		try (Connection connection = dataSource.getConnection();
				Statement statement = connection.createStatement()) {
				
			ResultSet resultSet = statement.executeQuery("SELECT CURRENT_USER();");
			resultSet.next();

			System.out.println("Connection works with User: " + resultSet.getString(1));

			resultSet.close();
		}
	}
```

Then start your application. The code produces an output like:

`Connection works with User: token-...`

Spring Cloud Vault obtains database credentials at startup and stores those using the default property names so Spring Boot can pick these.

## [](#other-services)Other services

Vault supports several other integrations. We’ve built support for integrations we also support in Spring Boot.

You can use the following services and databases:

-   PostgreSQL and MySQL - Generates credentials to be used with JDBC and Spring Data JPA
-   Apache Cassandra - Generates credentials to be used with the Datastax client and Spring Data Cassandra
-   Hashicorp Consul - Generates an ACL token that can be used together with Spring Cloud Consul
-   RabbitMQ - Generates credentials to be used with Spring AMQP
-   Amazon AWS - Generates Access key and secret key to be used with Spring Cloud AWS

You can view a complete example in our examples repository at [https://github.com/mp911de/spring-cloud-vault-config-samples](https://github.com/mp911de/spring-cloud-vault-config-samples/tree/master/mysql).