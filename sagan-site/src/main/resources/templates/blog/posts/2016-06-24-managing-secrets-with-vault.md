---
title: Managing Secrets with Vault
source: http://spring.io/blog/2016/06/24/managing-secrets-with-vault
scraped: 2026-02-23T19:12:40.802Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  June 24, 2016 | 30 Comments
---

# Managing Secrets with Vault

_Engineering | Mark Paluch |  June 24, 2016 | 30 Comments_

Passwords, API keys and confidential data fall into the category of secrets. Storing secrets the secure way is a challenge with limiting access and a true secure storage. Let's take a look at [Hashicorp](https://www.hashicorp.com/) [Vault](https://www.vaultproject.io/) and how you can use it to store and access secrets.

## [](#how-do-you-store-secrets)How do you store Secrets?

Passwords, API keys, secure Tokens, and confidential data fall into the category of secrets. That's data which shouldn't lie around. It mustn't be available in plaintext in easy to guess locations. In fact, it must not be stored in plaintext in any location.

Sensitive data can be encrypted by using the [Spring Cloud Config Server](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_encryption_and_decryption) or [TomEE](http://tomee.apache.org/datasource-password-encryption.html). Encrypted data is one step better than unencrypted. Encryption imposes on the other side the need for decryption on the user side which requires a decryption key to be distributed. Now, where do you put the key? Is the key protected by a passphrase? Where do you put the passphrase? On how many systems do you distribute your key and the passphrase?

As you see, encryption introduces a chicken-egg problem. Storing a decryption key gives the application the possibility to decrypt data. It also allows an attack vector. Someone who is not authorized could get access to the decryption key by having access to the machine. That person can decrypt data which is decryptable by this key. The key is static so a leaked key requires the change of keys. Data needs to be re-encrypted and credentials need to be changed. It's not possible to discover such leakage with online measure because data can be decrypted offline once it was obtained.

One approach is putting the key in a hard to guess location before the application starts and wipe the key once it was read to memory. The time in which the key is available is shortened. The attack time-frame is reduced, but still the key was there. Wiping the key works only for one application startup. Containers and microservices in the Cloud are known to be restarted once they crashed. A restart of the application is no longer possible as the key is gone.

## [](#wait-theres-hope)Wait, there's hope!

Doing encryption right is tough, managing secrets is even harder if doing it yourself. Vault addresses exactly these issues. It helps to address the chicken-egg problem and it comes with encryption. Vault is a service to manage secrets. It provides an API that gives access to secrets based on policies. Any user of the API needs to authenticate and only sees the secrets for which he is authorized. Vault encrypts data using 256-bit [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) with [GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode). It can store data in various backends (files, Amazon DynamoDB, Consul, etcd and much more). The other key aspect is that Vault never stores a key in a persistent location. Starting/restarting Vault always requires one or more operators to unseal Vault. However let's start with the basics first.

Vault isn't the answer for all security concern. It's worth to check the [Vault Security Model](https://www.vaultproject.io/docs/internals/security.html) documentation to get an idea of the threat model.

To bootstrap Vault, you need to download the binary from [https://www.vaultproject.io/downloads.html](https://www.vaultproject.io/downloads.html). Vault is written in Go and binaries are available for various platforms. Unzip the downloaded file and you are ready to use Vault.

Start Vault Server next. You need a configuration file to specify some options.

**vault.conf**

```
Copybackend "inmem" {
}

listener "tcp" {
  address = "0.0.0.0:8200"
  tls_disable = 1
}

disable_mlock = true
```

This config is good for most platforms and to try first steps with Vault. Don't use it in production.

Start Vault with

```
Copy$ vault server -config vault.conf
```

Vault will start as a foreground process.

Congratulations, you started Vault.

Now is a good moment to open a second console to perform administrative tasks with Vault. Vault runs now in plaintext mode because TLS/SSL is disabled. You need to set the `VAULT_ADDR` environment variable to tell the Vault client to use plaintext:

```
Copy$ export VAULT_ADDR=http://127.0.0.1:8200
```

Vault is started. It requires two additional steps before you can actually start using Vault. Vault needs to be initialized and unsealed. Initialization is the process of initial key generation. Unsealing is supplying the keys to Vault so Vault can decrypt encrypted data and start serving clients.

Vault creates upon initialization two things:

1.  The master key and key splits
2.  A root token

Vault allows shared keys using the [Shamir Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) algorithm. Data is usually encrypted with one key. The one, who has access to the key has full control to all data as a single person. Sometimes you don't want that. Usually you want to distribute the master key amongst multiple people so no one single person is in control of all your encrypted data. Vault allows specifying the number of total key shares and the number of key shares required to unseal Vault during initialization. That setting cannot be changed once Vault is initialized. Initializing Vault from the console will display the full key. Initialization using the API is maybe something you want to adopt with your DevOps tooling by e.g. sending secure messages to your operators who should receive a key share.

Initialize Vault with:

```bash
Copy$ vault init -key-shares=5 -key-threshold=2
```

Vault will display the key shares and the root key. Please note that these values are random and change upon every initialization. Be careful with that output as you will see it only once. There's no way to retrieve the keys and the token afterward. Please read the instructions carefully when using Vault with real data otherwise you'll loose your data.

```
CopyKey 1: 99eb89735688ad7a29bb1ff27383bd1005a22a62c97f14357ea4f5f98c1d2c8c01
Key 2: 0c5605b16905794a302603bbeb8f6c8ad5ecf7e877f0e29084f838eba931b86902
Key 3: 7f3d88067c7e355acea4fe756a8b23fc6cd6bc671d7cb0f3d2cc8ae543dc3dc303
Key 4: 3d37062e1704ca2a02073b29c097d5a56e7056e710f515c16b40b9cfe3698bb804
Key 5: 4e5c8b99027f863afc85c6e741939ad3d74a1d687a7947a23d740bc109840e1205
Initial Root Token: 9a63de21-8af7-311a-9a5a-151b6a0d4795

Vault initialized with 5 keys and a key threshold of 2. Please
securely distribute the above keys. When the Vault is re-sealed,
restarted, or stopped, you must provide at least 2 of these keys
to unseal it again.

Vault does not store the master key. Without at least 2 keys,
your Vault will remain permanently sealed.
```

Then you need to unseal Vault. Vault does not store the key on disk. It's stored in memory all the time. After initializing and after (re)starting Vault you're required to unseal Vault with the required number of key shares so Vault can serve secrets. In this case that's two key shares. Note: There's also a seal command to make Vault stop serving secrets.

```
Copy$ vault unseal 99eb89735688ad7a29bb1ff27383bd1005a22a62c97f14357ea4f5f98c1d2c8c01
Sealed: true
Key Shares: 5
Key Threshold: 2
Unseal Progress: 1

$ vault unseal 7f3d88067c7e355acea4fe756a8b23fc6cd6bc671d7cb0f3d2cc8ae543dc3dc303
Sealed: false
Key Shares: 5
Key Threshold: 2
Unseal Progress: 0
```

Once Vault is unsealed you can start storing secret data inside of Vault.

Vault requires an authenticated access to proceed from here on. Vault uses tokens as generic authentication on its transport level.

Remember the output from the initialization? The last item after the key shares is the root token. The easiest way for now is using the root token. The easiest way to use the token on the console is storing it in an environment variable:

```
Copy$ export VAULT_TOKEN=9a63de21-8af7-311a-9a5a-151b6a0d4795
$ vault write secret/my-application password=H@rdT0Gu3ss
```

The generic secret backend allows storage of arbitrary values as a key-value store. A single context can store one or many key-value tuples. Contexts can be organized hierarchically and the used data format is JSON.

Vault provides besides the generic secret backend other backends that allow credential generation for MySQL, SQL Server, PostgreSQL, Consul and [many more](https://www.vaultproject.io/docs/secrets/index.html).

## [](#authentication)Authentication

Vault works primarily with tokens. Each token is assigned to a policy that may constrain the actions and the paths. Policies use path based matching to apply rules. Tokens can get metadata (key-values) and display names assigned which makes administration a bit more ops friendly.

You can create tokens manually and assign them to applications and users. Besides that there are a couple of [authentication mechanisms](https://www.vaultproject.io/docs/auth/index.html) (LDAP, Username/Password, GitHub Token, …) that allow users to login and obtain a token. Tokens and authentication mechanisms can be revoked and that makes it easy to lock out a particular user.

## [](#spring-cloud-vault)Spring Cloud Vault

We at Pivotal took a look at Vault and considered it a promising tool. That's why we built [Spring Cloud Vault](https://github.com/spring-cloud-incubator/spring-cloud-vault-config). Spring Cloud Vault is a configuration extension similar to [Spring Cloud Config](https://github.com/spring-cloud/spring-cloud-config). Spring Cloud Config targets external configuration management backed by data stored in various repositories, such as GitHub, SVN or even Vault.

With Spring Cloud Vault you can access your secrets inside Vault. Secrets are picked up at startup of your application. Spring Cloud Vault uses the data from your application (application name, active contexts) to determine contexts paths in which you stored your secrets.

```
Copy/secret/{application}/{profile}
/secret/{application}
/secret/{defaultContext}/{profile}
/secret/{defaultContext}
```

## [](#getting-started-with-spring-cloud-vault)Getting started with Spring Cloud Vault

First you need a Spring Boot project. [start.spring.io](http://start.spring.io/) is a good starting point. Any empty project is sufficient.

### [](#include-the-spring-cloud-vault-starter-in-your-project)Include the Spring Cloud Vault starter in your project

Add the following code to your build configuration file. These lines include a starter for Spring Cloud Vault with all required dependencies.

**Maven**

```xml
Copy<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-vault-starter-config</artifactId>
    <version>1.0.0.BUILD-SNAPSHOT</version>
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
}
```

Make sure to include the Snapshots repository when using `SNAPSHOT` dependencies.

### [](#setup-the-configuration)Setup the configuration

Spring Cloud Vault uses by default `application` as the default context and the value of `spring.application.name` as application context. All configuration needs to be specified in the bootstrap configuration. For this example we use `bootstrap.yml` in `src/main/resources`:

```yaml
Copyspring:
    application:
        name: my-application
    cloud:
        vault:
            token: 9a63de21-8af7-311a-9a5a-151b6a0d4795
            scheme: http
```

The `spring.cloud.vault.scheme` is set to `http` because we've started Vault in plaintext HTTP mode. Don't do this for production. Plaintext makes the whole secret story useless as all listeners on the network can see your secrets. `spring.cloud.vault.scheme` defaults to `https`.

Please note that the token here is taken from the root token. You can create new tokens with:

```
Copy$ vault token-create
Key            	Value
---            	-----
token          	728d26ae-53a6-d8b6-d7a0-c5f62238ea55
token_accessor 	2fd7dcba-39d0-04d3-8d6b-096c3529cf14
token_duration 	0
token_renewable	true
token_policies 	[root]
```

### [](#write-data-into-vault)Write data into Vault

Write some data into Vault:

```
Copy$ vault write secret/my-application password=H@rdT0Gu3ss
```

### [](#update-your-spring-boot-application)Update your Spring Boot Application

Now go over to your application launcher class and enhance it to inject the secret. Use the same property name as you used to write it into Vault:

```java
Copypackage example;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootVaultHelloWorldApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootVaultHelloWorldApplication.class, args);
    }

    @Value("${password}")
    String password;

    @PostConstruct
    private void postConstruct() {
        System.out.println("My password is: " + password);
    }
}
```

All the other things are handled by Spring Cloud Vault itself. Now run your application.

Congratulations, you've made it!

## [](#outlook)Outlook

Spring Cloud Vault lives in the Cloud Incubator right now. It supports Token and [AppId](https://www.vaultproject.io/docs/auth/app-id.html) authentication. Spring Cloud Vault comes with a starter and dependencies for various database integration and RabbitMQ/Consul support. You can checkout the project and the [documentation](https://github.com/spring-cloud-incubator/spring-cloud-vault-config/blob/master/docs/src/main/asciidoc/spring-cloud-vault-config.adoc) at [https://github.com/spring-cloud-incubator/spring-cloud-vault-config](https://github.com/spring-cloud-incubator/spring-cloud-vault-config).

We prepared some samples to give you an impression how you could integrate Spring Cloud Vault with your application. You can find the samples at [https://github.com/mp911de/spring-cloud-vault-config-samples](https://github.com/mp911de/spring-cloud-vault-config-samples).

We don't have a timeline yet when to release Spring Cloud Vault. You're invited to join [Spencer Gibb's](https://2016.event.springoneplatform.io/presenters/spencer_gibb.html) talk at [SpringOne Platform 2016](https://springoneplatform.io/) about [Spring Cloud with Consul and Vault](https://2016.event.springoneplatform.io/schedule/sessions/spring_cloud_with_consul_and_vault.html) or mine to learn how to [Manage Secrets at Scale](https://2016.event.springoneplatform.io/schedule/sessions/managing_secrets_at_scale.html). We're interested in your feedback.

Thanks to Alex Soto who showed Vault to me. Vault is made by Hashicorp, the guys who created Vagrant, Consul and other great tools.