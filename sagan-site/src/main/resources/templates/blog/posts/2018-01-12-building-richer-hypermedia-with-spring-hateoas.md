---
title: Building richer hypermedia with Spring HATEOAS
source: https://spring.io/blog/2018/01/12/building-richer-hypermedia-with-spring-hateoas
scraped: 2026-02-23T16:11:33.080Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  January 12, 2018 | 8 Comments
---

# Building richer hypermedia with Spring HATEOAS

_Engineering | Greg L. Turnquist |  January 12, 2018 | 8 Comments_

Greetings Spring community,

As [previously announced](https://twitter.com/gregturn/status/935853433931943936), we have released a new **Affordances API** in 1.0.0.BUILD-SNAPSHOT. In this blog post, we’ll take a peek at exactly what this feature lets you do.

## [](#history-of-affordances)[](#history-of-affordances)History of Affordances

For starters, what is an **affordance**? Doing a little archeology, Mike Admundsen, a REST advocate, has [an article detailing the word’s origins](http://amundsen.com/blog/archives/1109), going back at least to 1986:

The affordances of the environment are what it offers …​ what it provides or furnishes, either for good or ill. The verb 'to afford' is found in the dictionary, but the noun 'affordance' is not. I have made it up (page 126).

— The Ecological Approach to Visual Perception (Gibson)

It then appeared in a psychology paper in 1988:

…​the term affordance refers to the perceived and actual properties of the thing, primarily those fundamental properties that determine just how the thing could possibly be used. (pg 9)

— The Design|Psychology of Everyday Things (Norman)

Finally, it can be found in none other than one of Roy Fielding’s presentations on hypermedia in 2008:

When I say Hypertext, I mean the simultaneous presentation of information and controls such that the information becomes the affordance through which the user obtains choices and selects actions (slide #50).

— Slide presention on REST (Fielding)

In all these situations, "affordance" refers to the available actions provided by the surrounding environment. In the context of REST, these are actions detailed by the hypermedia.

In the past, when people moved away from SOAP and its action-based tactics, they have struggled to document their APIs, many unaware that Roy Fielding built hypermedia into REST for this very purpose. By including data along with the controls to not just find related data, but to also use the data is key.

With a HAL document, clients are provided very simple affordances. The links are shown but nothing else about them. What you can do with the links and what it takes to interact with them is not detailed.

## [](#affordances-and-spring-hateoas)[](#affordances-and-spring-hateoas)Affordances and Spring HATEOAS

You can start exploring this new API by defining the following domain object:

```
Copy@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
class Employee {

	@Id @GeneratedValue
	private Long id;
	private String firstName;
	private String lastName;
	private String role;

	/**
	 * Useful constructor when id is not yet known.
	 */
	Employee(String firstName, String lastName, String role) {

		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
	}
}
```

This domain object gives us a pretty simple POJO to interact with. To persist such objects, you need to define a corresponding Spring Data JPA repository:

```
Copyinterface EmployeeRepository extends CrudRepository<Employee, Long> {
}
```

This repository will supply the simplest CRUD operations.

With these components, the table is set. You can now start defining REST operations and their corresponding affordances. First of all, create a Spring MVC REST controller as shown below:

```
Copy@RestController
class EmployeeController {

	private final EmployeeRepository repository;

	EmployeeController(EmployeeRepository repository) {
		this.repository = repository;
	}

	...
}
```

This control contains some key traits:

-   `@RestController` indicates that all the mappings will write their results directly into the response body, not render view templates.
    
-   The `EmployeeRepository` is injected via constructor injection, ensuring a consistent state.
    

Spring HATEOAS already has the means to build links out of Spring MVC endpoints. What this API provides is the ability to connect one endpoint with another. For example, you can link the **GET** endpoint for a single item resource (`/employees/{id}`) to the **PUT** mapping used for updating that employee (`/employees/{id}`). The following code shows just such a relationship:

```
Copy@RestController
class EmployeeController {

	...

	@GetMapping("/employees/{id}")
	ResponseEntity<Resource<Employee>> findOne(@PathVariable long id) {

		return repository.findById(id)
			.map(employee -> new Resource<>(employee, getSingleItemLinks(employee.getId())))
			.map(ResponseEntity::ok)
			.orElse(ResponseEntity.notFound().build());
	}

	@PutMapping("/employees/{id}")
	ResponseEntity<?> updateEmployee(@RequestBody Employee employee, @PathVariable long id) {

		employee.setId(id);
		Employee updatedEmployee = repository.save(employee);

		Resource<Employee> employeeResource = new Resource<>(updatedEmployee, getSingleItemLinks(updatedEmployee.getId()));

		try {
			return ResponseEntity
				.created(new URI(employeeResource.getRequiredLink(Link.REL_SELF).getHref()))
				.body(employeeResource);
		} catch (URISyntaxException e) {
			return ResponseEntity.badRequest().body("Unable to update " + employee);
		}
	}

	...

	private List<Link> getSingleItemLinks(long id) {

		return Arrays.asList(linkTo(methodOn(EmployeeController.class).findOne(id)).withSelfRel()
				.andAffordance(afford(methodOn(EmployeeController.class).updateEmployee(null, id)))
				.andAffordance(afford(methodOn(EmployeeController.class).deleteEmployee(id))),
			linkTo(methodOn(EmployeeController.class).findAll()).withRel("employees"));
	}
}
```

In the middle of this code are several usages of `.andAffordance(afford(methodOn(…​)))`. This is where a given link (the **self** link for `findOne`) is connected to a related link on the same URI (`updateEmployee`).

With this version, Spring HATEOAS can now glean information about the Spring MVC endpoint in a mediatype-neutral format, allowing you to serve it up to users. Which begs the question—​how do you display this relationship of links to users?

## [](#introducing-hal-forms)[](#introducing-hal-forms)Introducing HAL-FORMS

HAL itself doesn’t include any format to display these affordances. If you have multiple links at the same URI in a given resource, HAL will simply show one link. Thankfully, the popularity of HAL in the world of REST has caused derivative specs to start being developed.

[HAL-FORMS](https://rwcbook.github.io/hal-forms/) is a HAL extension that looks like any other HAL document with one additional field: **\_templates**. This field allows displaying methods as well as properties.

Assuming the single item `Resource<Employee>` code up above connected a Spring MVC `@GetMapping` endpoint to a `@PutMapping` endpoint (and you had some employee data loaded into the database), Spring HATEOAS will generate HAL-FORMS hypermedia like this:

```
Copy{
  "id" : 1,
  "firstName" : "Frodo",
  "lastName" : "Baggins",
  "role" : "ring bearer",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/employees/1"
    },
    "employees" : {
      "href" : "http://localhost:8080/employees"
    }
  },
  "_templates" : {
    "default" : {
      "title" : null,
      "method" : "put",
      "contentType" : "",
      "properties" : [ {
        "name" : "firstName",
        "required" : true
      }, {
        "name" : "id",
        "required" : true
      }, {
        "name" : "lastName",
        "required" : true
      }, {
        "name" : "role",
        "required" : true
      } ]
    },
    "deleteEmployee" : {
      "title" : null,
      "method" : "delete",
      "contentType" : "",
      "properties" : [ ]
    }
  }
}
```

When you do a `GET /employees/1`, this HAL-FORMS document shows both data *and* links. But more importantly, it gives you a template for editing the resource (the `default` template). Since HAL-FORMS presumes you are working against the **self** link, you could do a `PUT /employees/1` to make an update. And the properties it would be looking for include `firstName`, `id`, `lastName`, and `role`.

These hypermedia controls also indicate that you can issue a `DELETE /employees/1` request (the `deleteEmployee` template). No properties involved.

At first glance, this may not appear very impressive since you could already read that in the data shown at the top. But this format grants you the ability to write a little frontend JavaScript, and transform that template into:

```
Copy<form method="put" action="http://localhost:8080/employees/1">
	<input type="text" id="firstName" name="firstName"/>
	<input type="text" id="id" name="id" />
	<input type="text" id="lastName" name="lastName" />
	<input type="text" id="role" name="role" />
	<input type="submit" value="Submit" />
</form>
```

By mixing the **self** link with the listed properties, you can create a real HTML form, purely driven by the hypermedia. This completes the synergy of REST by letting the server push domain-specific details straight to the user of the site. There is no need to code this bit of domain knowledge into the client, hence reducing coupling. Instead, just convert the hypermedia’s template *into* a form. Then, as domain updates occur on the server side, the client can adapt with little friction.

In short, HAL-FORMS is designed to show other actions available against the same URI.

Reading all this, did you find yourself asking the question, "why not just push an HTML form out instead of some JSON?" That is a fair question.

The Affordances API is completely neutral allowing the Spring team to work on other mediatypes apart from HAL-FORMS. Some that are already under development include [Uber](http://rawgit.com/uber-hypermedia/specification/master/uber-hypermedia.html#rfc4627), [SIREN](https://github.com/kevinswiber/siren), [Collection+JSON](http://amundsen.com/media-types/collection/), and a form of XHTML.

## [](#more-examples)[](#more-examples)More examples

The code and details found in this article can be found at [https://github.com/spring-projects/spring-hateoas-examples](https://github.com/spring-projects/spring-hateoas-examples), particularly under **Affordances**.

We look forward to feedback from the community on the API.

Cheers!