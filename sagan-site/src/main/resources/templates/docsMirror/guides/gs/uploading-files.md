---
title: Getting Started | Uploading Files
source: https://spring.io/guides/gs/uploading-files
scraped: 2026-02-19T07:54:22.221Z
description: Learn how to build a Spring application that accepts multi-part file uploads.
---

# Uploading Files

This guide walks you through the process of creating a server application that can receive HTTP multipart file uploads.

## What You Will Build

You will create a Spring Boot web application that accepts file uploads. You will also build a simple HTML interface to upload a test file.

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

-   [Download](https://github.com/spring-guides/gs-uploading-files/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-uploading-files.git](https://github.com/spring-guides/gs-uploading-files.git)`
    
-   cd into `gs-uploading-files/initial`
    
-   Jump ahead to [Create an Application Class](#initial).
    

**When you finish**, you can check your results against the code in `gs-uploading-files/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=gradle-project&groupId=com.example&artifactId=uploading-files&language=java&jvmVersion=17&packageName=com.example.uploading-files&dependencies=web,thymeleaf) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use.
    
3.  Click **Dependencies** and select **Spring Web** and **Thymeleaf**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from GitHub and open it in your IDE or other editor.

## Create an Application Class

To start a Spring Boot MVC application, you first need a starter. In this sample, `spring-boot-starter-thymeleaf` and `spring-boot-starter-webmvc` are already added as dependencies. To upload files with Servlet containers, you need to register a `MultipartConfigElement` class (which would be `<multipart-config>` in web.xml). Thanks to Spring Boot, everything is autoconfigured for you!

All you need to get started with this application is the following `UploadingFilesApplication` class:

Java

Kotlin

```
Copypackage com.example.uploadingfiles;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UploadingFilesApplication {

  public static void main(String[] args) {
    SpringApplication.run(UploadingFilesApplication.class, args);
  }

}
```

```
Copypackage com.example.uploadingfiles

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class UploadingFilesApplication

fun main(args: Array<String>) {
	runApplication<UploadingFilesApplication>(*args)
}
```

As part of autoconfiguring Spring MVC, Spring Boot will create a `MultipartConfigElement` bean and make itself ready for file uploads.

## Create a File Upload Controller

The initial application already contains a few classes to deal with storing and loading the uploaded files on disk. They are all located in the `com.example.uploadingfiles.storage` package. You will use those in your new `FileUploadController`. The following listing shows the file upload controller:

Java

Kotlin

```
Copypackage com.example.uploadingfiles;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.uploadingfiles.storage.StorageFileNotFoundException;
import com.example.uploadingfiles.storage.StorageService;

@Controller
public class FileUploadController {

  private final StorageService storageService;

  @Autowired
  public FileUploadController(StorageService storageService) {
    this.storageService = storageService;
  }

  @GetMapping("/")
  public String listUploadedFiles(Model model) {

    model.addAttribute("files", storageService.loadAll().map(
        path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
            "serveFile", path.getFileName().toString()).build().toUri().toString())
        .collect(Collectors.toList()));

    return "uploadForm";
  }

  @GetMapping("/files/{filename:.+}")
  @ResponseBody
  public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

    Resource file = storageService.loadAsResource(filename);

    if (file == null)
      return ResponseEntity.notFound().build();

    return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
        "attachment; filename=\"" + file.getFilename() + "\"").body(file);
  }

  @PostMapping("/")
  public String handleFileUpload(@RequestParam("file") MultipartFile file,
      RedirectAttributes redirectAttributes) {

    storageService.store(file);
    redirectAttributes.addFlashAttribute("message",
        "You successfully uploaded " + file.getOriginalFilename() + "!");

    return "redirect:/";
  }

  @ExceptionHandler(StorageFileNotFoundException.class)
  public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
    return ResponseEntity.notFound().build();
  }

}
```

```
Copypackage com.example.uploadingfiles

import com.example.uploadingfiles.storage.StorageFileNotFoundException
import com.example.uploadingfiles.storage.StorageService
import org.springframework.core.io.Resource
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder
import org.springframework.web.servlet.mvc.support.RedirectAttributes
import java.util.stream.Collectors

@Controller
class FileUploadController(private val storageService: StorageService) {

  @GetMapping("/")
  fun listUploadedFiles(model: Model): String {
    model.addAttribute("files", storageService.loadAll().map { path ->
      MvcUriComponentsBuilder.fromMethodName(
        FileUploadController::class.java,
        "serveFile", path.fileName.toString()
      ).build().toUri().toString()
    }.collect(Collectors.toList()))

    return "uploadForm"
  }

  @GetMapping("/files/{filename:.+}")
  @ResponseBody
  fun serveFile(@PathVariable filename: String): ResponseEntity<Resource> {
    val file = storageService.loadAsResource(filename)
      ?: return ResponseEntity.notFound().build()

    return ResponseEntity.ok().header(
      HttpHeaders.CONTENT_DISPOSITION,
      "attachment; filename=\"${file.filename}\""
    ).body(file)
  }

  @PostMapping("/")
  fun handleFileUpload(@RequestParam("file") file: MultipartFile, 
             redirectAttributes: RedirectAttributes): String {
    storageService.store(file)
    redirectAttributes.addFlashAttribute(
      "message",
      "You successfully uploaded ${file.originalFilename}!")

    return "redirect:/"
  }

  @ExceptionHandler(StorageFileNotFoundException::class)
  fun handleStorageFileNotFound(exc: StorageFileNotFoundException): ResponseEntity<*> {
    return ResponseEntity.notFound().build<Any>()
  }
}
```

The `FileUploadController` class is annotated with `@Controller` so that Spring MVC can pick it up and look for routes. Each method is tagged with `@GetMapping` or `@PostMapping` to tie the path and the HTTP action to a particular controller action.

In this case:

-   `GET /`: Looks up the current list of uploaded files from the `StorageService` and loads it into a Thymeleaf template. It calculates a link to the actual resource by using `MvcUriComponentsBuilder`.
    
-   `GET /files/{filename}`: Loads the resource (if it exists) and sends it to the browser to download by using a `Content-Disposition` response header.
    
-   `POST /`: Handles a multipart message `file` and gives it to the `StorageService` for saving.
    

In a production scenario, you more likely would store the files in a temporary location, a database, or perhaps a NoSQL store (such as [Mongo’s GridFS](https://docs.mongodb.org/manual/core/gridfs)). It is best to NOT load up the file system of your application with content.

You will need to provide a `StorageService` so that the controller can interact with a storage layer (such as a file system). The following listing shows that interface:

Java

Kotlin

```
Copypackage com.example.uploadingfiles.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {

  void init();

  void store(MultipartFile file);

  Stream<Path> loadAll();

  Path load(String filename);

  Resource loadAsResource(String filename);

  void deleteAll();

}
```

```
Copypackage com.example.uploadingfiles.storage

import org.springframework.core.io.Resource
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Path
import java.util.stream.Stream

interface StorageService {

  fun init()

  fun store(file: MultipartFile)

  fun loadAll(): Stream<Path>

  fun load(filename: String): Path

  fun loadAsResource(filename: String): Resource?

  fun deleteAll()

}
```

You also need four classes to support the storage service:

Java

Kotlin

```
Copypackage com.example.uploadingfiles.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class StorageProperties {

  /**
   * Folder location for storing files
   */
  private String location = "upload-dir";

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

}
```

```
Copypackage com.example.uploadingfiles.storage

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties("storage")
data class StorageProperties(
  /**
   * Folder location for storing files
   */
  var location: String = "upload-dir"
)
```

Java

Kotlin

```
Copypackage com.example.uploadingfiles.storage;

public class StorageException extends RuntimeException {

  public StorageException(String message) {
    super(message);
  }

  public StorageException(String message, Throwable cause) {
    super(message, cause);
  }
}
```

```
Copypackage com.example.uploadingfiles.storage

open class StorageException(message: String, cause: Throwable? = null) :
  RuntimeException(message, cause)
```

Java

Kotlin

```
Copypackage com.example.uploadingfiles.storage;

public class StorageFileNotFoundException extends StorageException {

  public StorageFileNotFoundException(String message) {
    super(message);
  }

  public StorageFileNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }
}
```

```
Copypackage com.example.uploadingfiles.storage

class StorageFileNotFoundException(message: String, cause: Throwable? = null) :
  StorageException(message, cause)
```

Java

Kotlin

```
Copypackage com.example.uploadingfiles.storage;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileSystemStorageService implements StorageService {

  private final Path rootLocation;

  @Autowired
  public FileSystemStorageService(StorageProperties properties) {
        
        if(properties.getLocation().trim().length() == 0){
            throw new StorageException("File upload location can not be Empty."); 
        }

    this.rootLocation = Paths.get(properties.getLocation());
  }

  @Override
  public void store(MultipartFile file) {
    try {
      if (file.isEmpty()) {
        throw new StorageException("Failed to store empty file.");
      }
      Path destinationFile = this.rootLocation.resolve(
          Paths.get(file.getOriginalFilename()))
          .normalize().toAbsolutePath();
      if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
        // This is a security check
        throw new StorageException(
            "Cannot store file outside current directory.");
      }
      try (InputStream inputStream = file.getInputStream()) {
        Files.copy(inputStream, destinationFile,
          StandardCopyOption.REPLACE_EXISTING);
      }
    }
    catch (IOException e) {
      throw new StorageException("Failed to store file.", e);
    }
  }

  @Override
  public Stream<Path> loadAll() {
    try {
      return Files.walk(this.rootLocation, 1)
        .filter(path -> !path.equals(this.rootLocation))
        .map(this.rootLocation::relativize);
    }
    catch (IOException e) {
      throw new StorageException("Failed to read stored files", e);
    }

  }

  @Override
  public Path load(String filename) {
    return rootLocation.resolve(filename);
  }

  @Override
  public Resource loadAsResource(String filename) {
    try {
      Path file = load(filename);
      Resource resource = new UrlResource(file.toUri());
      if (resource.exists() || resource.isReadable()) {
        return resource;
      }
      else {
        throw new StorageFileNotFoundException(
            "Could not read file: " + filename);

      }
    }
    catch (MalformedURLException e) {
      throw new StorageFileNotFoundException("Could not read file: " + filename, e);
    }
  }

  @Override
  public void deleteAll() {
    FileSystemUtils.deleteRecursively(rootLocation.toFile());
  }

  @Override
  public void init() {
    try {
      Files.createDirectories(rootLocation);
    }
    catch (IOException e) {
      throw new StorageException("Could not initialize storage", e);
    }
  }
}
```

```
Copypackage com.example.uploadingfiles.storage

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.stereotype.Service
import org.springframework.util.FileSystemUtils
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.net.MalformedURLException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.stream.Stream

@Service
class FileSystemStorageService(properties: StorageProperties) : StorageService {

  private val rootLocation: Path

  init {
    if (properties.location.trim().isEmpty()) {
      throw StorageException("File upload location can not be Empty.")
    }
    this.rootLocation = Paths.get(properties.location)
  }

  override fun store(file: MultipartFile) {
    try {
      if (file.isEmpty) {
        throw StorageException("Failed to store empty file.")
      }
      val filename = file.originalFilename
        ?: throw StorageException("Failed to store file with null filename")

      val destinationFile = rootLocation.resolve(filename)
        .normalize().toAbsolutePath()

      // Security check - prevent directory traversal
      if (!destinationFile.parent.equals(rootLocation.toAbsolutePath())) {
        throw StorageException("Cannot store file outside current directory.")
      }

      file.inputStream.use { inputStream ->
        Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING)
      }
    } catch (e: IOException) {
      throw StorageException("Failed to store file ${file.originalFilename}", e)
    }
  }

  override fun loadAll(): Stream<Path> {
    return try {
      Files.walk(rootLocation, 1)
        .filter { path -> path != rootLocation }
        .map { path -> rootLocation.relativize(path) }
    } catch (e: IOException) {
      throw StorageException("Failed to read stored files", e)
    }
  }

  override fun load(filename: String): Path {
    return rootLocation.resolve(filename)
  }

  override fun loadAsResource(filename: String): Resource? {
    return try {
      val file = load(filename)
      val resource = UrlResource(file.toUri())
      if (resource.exists() || resource.isReadable) {
        resource
      } else {
        throw StorageFileNotFoundException("Could not read file: $filename")
      }
    } catch (e: MalformedURLException) {
      throw StorageFileNotFoundException("Could not read file: $filename", e)
    }
  }

  override fun deleteAll() {
    FileSystemUtils.deleteRecursively(rootLocation.toFile())
  }

  override fun init() {
    try {
      Files.createDirectories(rootLocation)
    } catch (e: IOException) {
      throw StorageException("Could not initialize storage", e)
    }
  }
}
```

## Creating an HTML Template

The following Thymeleaf template (from `src/main/resources/templates/uploadForm.html`) shows an example of how to upload files and show what has been uploaded:

```
Copy<html xmlns:th="https://www.thymeleaf.org">
<body>

	<div th:if="${message}">
		<h2 th:text="${message}"/>
	</div>

	<div>
		<form method="POST" enctype="multipart/form-data" action="/">
			<table>
				<tr><td>File to upload:</td><td><input type="file" name="file" /></td></tr>
				<tr><td></td><td><input type="submit" value="Upload" /></td></tr>
			</table>
		</form>
	</div>

	<div>
		<ul>
			<li th:each="file : ${files}">
				<a th:href="${file}" th:text="${file}" />
			</li>
		</ul>
	</div>

</body>
</html>
```

This template has three parts:

-   An optional message at the top where Spring MVC writes a [flash-scoped message](https://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#mvc-flash-attributes).
    
-   A form that lets the user upload files.
    
-   A list of files supplied from the backend.
    

## Tuning File Upload Limits

When configuring file uploads, it is often useful to set limits on the size of files. Imagine trying to handle a 5GB file upload! With Spring Boot, we can tune its autoconfigured `MultipartConfigElement` with some property settings.

Add the following properties to your existing properties settings (in `src/main/resources/application.properties`):

```
Copyspring.servlet.multipart.max-file-size=128KB
spring.servlet.multipart.max-request-size=128KB
```

The multipart settings are constrained as follows:

-   `spring.servlet.multipart.max-file-size` is set to 128KB, meaning the total file size cannot exceed 128KB.
    
-   `spring.servlet.multipart.max-request-size` is set to 128KB, meaning total request size for a `multipart/form-data` cannot exceed 128KB.
    

## Update the Application

You want a target folder to which to upload files, so you need to enhance the basic `UploadingFilesApplication` class that Spring Initializr created and add a Boot `CommandLineRunner` to delete and re-create that folder at startup. The following listing shows how to do so:

Java

Kotlin

```
Copypackage com.example.uploadingfiles;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import com.example.uploadingfiles.storage.StorageProperties;
import com.example.uploadingfiles.storage.StorageService;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class UploadingFilesApplication {

  public static void main(String[] args) {
    SpringApplication.run(UploadingFilesApplication.class, args);
  }

  @Bean
  CommandLineRunner init(StorageService storageService) {
    return (args) -> {
      storageService.deleteAll();
      storageService.init();
    };
  }
}
```

```
Copypackage com.example.uploadingfiles

import com.example.uploadingfiles.storage.StorageProperties
import com.example.uploadingfiles.storage.StorageService
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties::class)
class UploadingFilesApplication {

	@Bean
	fun init(storageService: StorageService) = CommandLineRunner {
		storageService.deleteAll()
		storageService.init()
	}
}

fun main(args: Array<String>) {
	runApplication<UploadingFilesApplication>(*args)
}
```

## Run the Application

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-uploading-files-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-uploading-files-0.0.1-SNAPSHOT.jar

That runs the server-side piece that receives file uploads. Logging output is displayed. The service should be up and running within a few seconds.

With the server running, you need to open a browser and visit `[http://localhost:8080/](http://localhost:8080/)` to see the upload form. Pick a (small) file and press **Upload**. You should see the success page from the controller. If you choose a file that is too large, you will get an ugly error page.

You should then see a line resembling the following in your browser window:

“You successfully uploaded <name of your file>!”

## Testing Your Application

There are multiple ways to test this particular feature in our application. The following listing shows one example that uses `MockMvc` so that it does not require starting the servlet container:

Java

Kotlin

```
Copypackage com.example.uploadingfiles;

import java.nio.file.Paths;
import java.util.stream.Stream;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.uploadingfiles.storage.StorageFileNotFoundException;
import com.example.uploadingfiles.storage.StorageService;

@SpringBootTest
@AutoConfigureMockMvc
public class FileUploadTests {

  @Autowired
  private MockMvc mvc;

  @MockitoBean
  private StorageService storageService;

  @Test
  public void shouldListAllFiles() throws Exception {
    given(this.storageService.loadAll())
        .willReturn(Stream.of(Paths.get("first.txt"), Paths.get("second.txt")));

    this.mvc.perform(get("/")).andExpect(status().isOk())
        .andExpect(model().attribute("files",
            Matchers.contains("http://localhost/files/first.txt",
                "http://localhost/files/second.txt")));
  }

  @Test
  public void shouldSaveUploadedFile() throws Exception {
    MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt",
        "text/plain", "Spring Framework".getBytes());
    this.mvc.perform(multipart("/").file(multipartFile))
        .andExpect(status().isFound())
        .andExpect(header().string("Location", "/"));

    then(this.storageService).should().store(multipartFile);
  }

  @SuppressWarnings("unchecked")
  @Test
  public void should404WhenMissingFile() throws Exception {
    given(this.storageService.loadAsResource("test.txt"))
        .willThrow(StorageFileNotFoundException.class);

    this.mvc.perform(get("/files/test.txt")).andExpect(status().isNotFound());
  }

}
```

```
Copypackage com.example.uploadingfiles

import com.example.uploadingfiles.storage.StorageFileNotFoundException
import com.example.uploadingfiles.storage.StorageService
import org.hamcrest.Matchers
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.mockito.BDDMockito.then
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc
import org.springframework.mock.web.MockMultipartFile
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import java.nio.file.Paths
import java.util.stream.Stream

@SpringBootTest
@AutoConfigureMockMvc
class FileUploadTests(@Autowired private val mvc: MockMvc) {

  @MockitoBean
  private lateinit var storageService: StorageService

  @Test
  fun shouldListAllFiles() {
    given(storageService.loadAll())
      .willReturn(Stream.of(Paths.get("first.txt"), Paths.get("second.txt")))

    mvc.perform(get("/"))
      .andExpect(status().isOk)
      .andExpect(
        model().attribute(
          "files",
          Matchers.contains(
            "http://localhost/files/first.txt",
            "http://localhost/files/second.txt"
          )
        )
      )
  }

  @Test
  fun shouldSaveUploadedFile() {
    val multipartFile = MockMultipartFile(
      "file",
      "test.txt",
      "text/plain",
      "Spring Framework".toByteArray()
    )

    mvc.perform(multipart("/").file(multipartFile))
      .andExpect(status().isFound)
      .andExpect(header().string("Location", "/"))

    then(storageService).should().store(multipartFile)
  }

  @Test
  fun should404WhenMissingFile() {
    given(storageService.loadAsResource("test.txt"))
      .willThrow(StorageFileNotFoundException::class.java)

    mvc.perform(get("/files/test.txt"))
      .andExpect(status().isNotFound)
  }
}
```

In those tests, you use various mocks to set up the interactions with your controller and the `StorageService` but also with the Servlet container itself by using `MockMultipartFile`.

For an example of an integration test, see the `FileUploadIntegrationTests` class.

## Summary

Congratulations! You have just written a web application that uses Spring to handle file uploads.

## See Also

The following guides may also be helpful:

-   [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
    
-   [Handling Form Submission](https://spring.io/guides/gs/handling-form-submission/)
    
-   [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
    
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-uploading-files)