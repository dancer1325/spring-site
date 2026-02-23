---
title: SSL hot reload in Spring Boot 3.2.0
source: https://spring.io/blog/2023/11/07/ssl-hot-reload-in-spring-boot-3-2-0
scraped: 2026-02-23T09:11:44.042Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Moritz Halbritter |  November 07, 2023 | 10 Comments
---

# SSL hot reload in Spring Boot 3.2.0

_Engineering | Moritz Halbritter |  November 07, 2023 | 10 Comments_

In Spring Boot 3.2.0, we're adding the ability for embedded web servers to hot-reload SSL certificates and keys. That means you can rotate your SSL trust material without restarting your application. Hot reloading is supported for Tomcat and Netty embedded web servers.

Let's see that in action!

First, we're going to create our SSL private key and matching certificate using OpenSSL:

```shell
Copymkdir certs
cd certs
openssl req -x509 -subj "/CN=demo-cert-1" -keyout demo.key -out demo.crt -sha256 -days 365 -nodes -newkey rsa 
```

This creates a private key stored in `certs/demo.key` and a matching (self-signed) certificate with the common name "demo-cert-1" in `certs/demo.crt`.

Now we're creating a new Spring Boot 3.2.0 application, using the "Spring Web" dependency, which uses the Tomcat web server by default, using our favorite website [start.spring.io](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.2.0-RC2&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=ssl-hot-reload&name=ssl-hot-reload&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.ssl-hot-reload&dependencies=web).

In the application configuration, we're adding the following bits:

```yaml
Copyspring.ssl.bundle.pem:
  demo:
    reload-on-update: true
    keystore:    
      certificate: "certs/demo.crt"
      private-key: "certs/demo.key"
```

This configures an [SSL bundle](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.ssl) with the name "demo" and our generated certificate and private key. The `reload-on-update: true` configuration instructs Spring Boot to watch the files in the background and trigger a reload if they change.

Now we're configuring the web server to use that bundle and to accept connections on port 8443:

```yaml
Copyserver.ssl.bundle: "demo"
server.port: 8443
```

Let's also add a simple controller which responds with a plain "Hello World":

```java
Copy@RestController
class DemoController {
    @GetMapping(path = "/", produces = MediaType.TEXT_PLAIN_VALUE)
    String helloWorld() {
        return "Hello World";
    }
}
```

When we're starting the application, we see something like this in the logs, which confirms it started on port 8443 using HTTPS.

```
CopyINFO 82407 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8443 (https)
```

Now we can make our first request with curl:

```
Copy$ curl --insecure https://localhost:8443/
Hello World%
```

Hooray, it works! We had to pass `--insecure` because the SSL certificate is self-signed and not trusted by curl.

Let's switch curl to verbose mode to get some information about the SSL handshake that happened:

```
Copy$ curl --verbose --insecure https://localhost:8443/
*   Trying 127.0.0.1:8443...
* Connected to localhost (127.0.0.1) port 8443 (#0)
* ALPN: offers h2,http/1.1
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384
* ALPN: server did not agree on a protocol. Uses default.
* Server certificate:
*  subject: CN=demo-cert-1
*  start date: Nov  2 09:22:53 2023 GMT
*  expire date: Nov  1 09:22:53 2024 GMT
*  issuer: CN=demo-cert-1
*  SSL certificate verify result: self-signed certificate (18), continuing anyway.
* using HTTP/1.x
> GET / HTTP/1.1
> Host: localhost:8443
> User-Agent: curl/8.0.1
> Accept: */*
> 
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
< HTTP/1.1 200 
< Content-Type: text/plain;charset=UTF-8
< Content-Length: 11
< Date: Thu, 02 Nov 2023 09:33:37 GMT
< 
* Connection #0 to host localhost left intact
Hello World
```

In the line `subject: CN=demo-cert-1` you can see that the common name of the certificate is "demo-cert-1", which will be important later.

Let's try the hot reload by generating a new private key and certificate with OpenSSL, overwriting the old files:

```
Copycd certs
openssl req -x509 -subj "/CN=demo-cert-2" -keyout demo.key -out demo.crt -sha256 -days 365 -nodes -newkey rsa
```

This time, our certificate has the common name "demo-cert-2".

After some time, you'll see something like this in the logs:

```
CopyINFO 83162 --- [-bundle-watcher] o.a.t.util.net.NioEndpoint.certificate   : Connector [https-jsse-nio-8443], TLS virtual host [_default_], certificate type [UNDEFINED] configured from keystore [/home/xxx/.keystore] using alias [tomcat] with trust store [null]
```

This is a complicated way of saying that Tomcat has reloaded the private key and certificate.

We can now verify with curl that the new certificate is used:

```
Copy$ curl --verbose --insecure https://localhost:8443/
*   Trying 127.0.0.1:8443...
* Connected to localhost (127.0.0.1) port 8443 (#0)
* ALPN: offers h2,http/1.1
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384
* ALPN: server did not agree on a protocol. Uses default.
* Server certificate:
*  subject: CN=demo-cert-2
*  start date: Nov  2 09:37:46 2023 GMT
*  expire date: Nov  1 09:37:46 2024 GMT
*  issuer: CN=demo-cert-2
*  SSL certificate verify result: self-signed certificate (18), continuing anyway.
* using HTTP/1.x
> GET / HTTP/1.1
> Host: localhost:8443
> User-Agent: curl/8.0.1
> Accept: */*
> 
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
< HTTP/1.1 200 
< Content-Type: text/plain;charset=UTF-8
< Content-Length: 11
< Date: Thu, 02 Nov 2023 09:39:47 GMT
< 
* Connection #0 to host localhost left intact
Hello World
```

The `subject: CN=demo-cert-2` line verifies that the new certificate is used. Hooray, great success!

To recap: We've created an SSL private key and certificate, and then we configured Spring Boot to use it and watch for changes. When the private key and certificate change, Spring Boot reloads them, and they will be used without restarting the application. Isn't that cool?!

By the way, if you're wondering what happens to already existing connections: they will continue to use the old certificate, but all new connections will use the new certificate.

We hope that this feature simplifies your operations. You can give it a try by testing [Spring Boot 3.2.0-RC2](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.2.0-RC2&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=ssl-hot-reload&name=ssl-hot-reload&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.ssl-hot-reload&dependencies=web). If you have enhancement ideas or found a bug, please don't hesitate and open an issue on [our tracker](https://github.com/spring-projects/spring-boot/issues).