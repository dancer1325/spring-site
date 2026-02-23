---
title: Using Java 16 records with Thymeleaf - Wim Deblauwe
source: https://www.wimdeblauwe.com/blog/2021/07/25/using-records-with-thymeleaf/
scraped: 2026-02-23T13:18:03.895Z
---

# Using Java 16 records with Thymeleaf - Wim Deblauwe

Since Java 16, we can use records. This blog post shows how Thymeleaf supports this.

For an introduction to Java Records, see [Record classes](https://docs.oracle.com/en/java/javase/16/language/records.html) on the Java Language Updates page. For Thymeleaf, there is not that much to explain here as it supports records out-of-the-box. Let’s create a small example application to see things in action.

Start by creating a new Spring Boot application at [https://start.spring.io](https://start.spring.io).

Be sure to select:

-   Java 16
    
-   Dependencies: Web MVC & Thymeleaf
    

We can create a simple Java record:

```
public record Person(String givenName, String familyName) {}
```

Next to that, we create a controller to serve our HTML page:

```
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping
    public String index(Model model) {
        model.addAttribute("person", new Person("Wout", "Van Aert"));
        return "index";
    }
}
```

Note how we add an instance of the `Person` record to the model.

Finally, create an `index.html` in the `src/main/resources/templates` folder:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Thymeleaf with Records</title>
</head>
<body>
<div>
    <h1>Property access</h1>
    <div th:text="${person.givenName}"></div>
    <div th:text="${person.familyName}"></div>

    <h1>Method calls</h1>
    <div th:text="${person.givenName()}"></div>
    <div th:text="${person.familyName()}"></div>
</div>
</body>
</html>
```

The HTML uses 2 ways of accessing the field values of the record. We can use property access, like we can do for JavaBeans/POJO’s (classes that use the get/set conventions):

```
<div th:text="${person.givenName}"></div>
```

We can also call the actual methods that a record creates for each field of the record (without the get/set prefix as records don’t use that):

```
<div th:text="${person.givenName()}"></div>
```

If we run the Spring Boot application, we can view our page at [http://localhost:8080](http://localhost:8080).

It should look something like this:

![thymeleaf with records](/images/2021/07/thymeleaf-with-records.png)

## Conclusion

Thymeleaf supports records, so if you are on Java 16 or higher, feel free to use them on your Thymeleaf projects.

To see the full code of this example, [see GitHub](https://github.com/wimdeblauwe/blog-example-code/tree/master/thymeleaf-with-records).