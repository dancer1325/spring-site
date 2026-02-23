---
title: React.js and Spring Data REST: Part 5 - Security
source: https://spring.io/blog/2015/10/28/react-js-and-spring-data-rest-part-5-security
scraped: 2026-02-23T19:36:54.705Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  October 28, 2015 | 11 Comments
---

# React.js and Spring Data REST: Part 5 - Security

_Engineering | Greg L. Turnquist |  October 28, 2015 | 11 Comments_

To see updates to this code, visit our [React.js and Spring Data REST tutorial](https://spring.io/guides/tutorials/react-and-spring-data-rest/).

In the [previous session](https://spring.io/blog/2015/10/13/react-js-and-spring-data-rest-part-4-events), you made the app dynamically response to updates from other users via Spring Data REST’s built in event handlers and the Spring Framework’s WebSocket support. But no application is complete without securing the whole thing so that only proper users have access to the UI and the resources behind it.

Feel free to [grab the code](https://github.com/gregturn/react-and-spring-data-rest/tree/master/security) from this repository and follow along. This session is based on the previous session’s app with extra things added.

## Adding Spring Security to the project

Before getting underway, you need to add a couple dependencies to your project’s pom.xml file:

```xml
Copy<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.thymeleaf.extras</groupId>
    <artifactId>thymeleaf-extras-springsecurity4</artifactId>
</dependency>
```

This bring in Spring Boot’s Spring Security starter as well as some extra Thymeleaf tags to do security look ups in the web page.

## Defining the security model

In the past session, you have worked with a nice payroll system. It’s handy to declare things on the backend and let Spring Data REST do the heavy lifting. The next step is to model a system where security controls need to be instituted.

If this is a payroll system, then only managers would be accessing it. So kick things off by modeling a `Manager` object:

```java
Copy@Data
@ToString(exclude = "password")
@Entity
public class Manager {
public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

private @Id @GeneratedValue Long id;

private String name;

private @JsonIgnore String password;

private String[] roles;

public void setPassword(String password) {
	this.password = PASSWORD_ENCODER.encode(password);
}

protected Manager() {}

public Manager(String name, String password, String... roles) {

	this.name = name;
	this.setPassword(password);
	this.roles = roles;
}

```

-   `PASSWORD_ENCODER` is the means to encrypt new passwords or to take password inputs and encrypt them before comparison.
-   `id`, `name`, `password`, and `roles` define the parameters needed to restrict access.
-   The customized `setPassword()` ensures that passwords are never stored in the clear.
    

There is a key thing to keep in mind when designing your security layer. Secure the right bits of data (like passwords) and do NOT let them get printed to console, into logs, or exported via JSON serialization.

-   `@ToString(exclude = "password")` ensures that the Lombok-generated toString() method will NOT print out the password.
-   `@JsonIgnore` applied to the password field protects from Jackson serializing this field.

## Creating a manager’s repository

Spring Data is so good at managing entities. Why not create a repository to handle these managers?

```java
Copy@RepositoryRestResource(exported = false)
public interface ManagerRepository extends Repository<Manager, Long> {
Manager save(Manager manager);

Manager findByName(String name);

```

Instead of extending the usual `CrudRepository`, you don’t need so many methods. Instead, you need to save data (which is also used for updates) and you need to look up existing users. Hence, you can use Spring Data Common’s minimal `Repository` marker interface. It comes with no predefined operations.

Spring Data REST, by default, will export any repository it finds. You do NOT want this repository exposed for REST operations! Apply the `@RepositoryRestResource(exported = false)` annotation to block it from export. This prevents the repository from being served up as well as any metadata.

## Linking employees with their managers

The last bit of modeling security is to associate employees with a manager. In this domain, an employee can have one manager while a manager can have multiple employees:

```java
Copy@Data
@Entity
public class Employee {
private @Id @GeneratedValue Long id;
private String firstName;
private String lastName;
private String description;

private @Version @JsonIgnore Long version;

private @ManyToOne Manager manager;

private Employee() {}

public Employee(String firstName, String lastName, String description, Manager manager) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.description = description;
	this.manager = manager;
}

```

-   The manager attribute is linked via JPA’s `@ManyToOne`. Manager doesn’t need the `@OneToMany` because you haven’t defined the need to look that up.
-   The utility constructor call is updated to support initialization.

## Securing employees to their managers

Spring Security supports a multitude of options when it comes to defining security policies. In this session, you want to restrict things such that ONLY managers can view employee payroll data, and that saving, updating, and deleting operations are confined to the employee’s manager. In other words, any manager can log in and view the data, but only a given employee’s manager can make any changes.

```java
Copy@PreAuthorize("hasRole('ROLE_MANAGER')")
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {
@Override
@PreAuthorize("#employee?.manager == null or #employee?.manager?.name == authentication?.name")
Employee save(@Param("employee") Employee employee);

@Override
@PreAuthorize("@employeeRepository.findOne(#id)?.manager?.name == authentication?.name")
void delete(@Param("id") Long id);

@Override
@PreAuthorize("#employee?.manager?.name == authentication?.name")
void delete(@Param("employee") Employee employee);

```

`@PreAuthorize` at the top of the interface restricts access to people with **ROLE\_MANAGER**.

On `save()`, either the employee’s manager is null (initial creation of a new employee when no manager has been assigned), or the employee’s manager’s name matches the currently authenticated user’s name. Here you are using [Spring Security’s SpEL expressions](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#el-access) to define access. It comes with a handy "?." property navigator to handle null checks. It’s also important to note using the `@Param(…​)` on the arguments to link HTTP operations with the methods.

On `delete()`, the method either has access to the employee, or in the event it only has an id, then it must find the **employeeRepository** in the application context, perform a `findOne(id)`, and then check the manager against the currently authenticated user.

## Writing a `UserDetails` service

A common point of integration with security is to define a `UserDetailsService`. This is the way to connect your user’s data store into a Spring Security interface. Spring Security needs a way to look up users for security checks, and this is the bridge. Thankfully with Spring Data, the effort is quite minimal:

```java
Copy@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {
private final ManagerRepository repository;

@Autowired
public SpringDataJpaUserDetailsService(ManagerRepository repository) {
	this.repository = repository;
}

@Override
public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
	Manager manager = this.repository.findByName(name);
	return new User(manager.getName(), manager.getPassword(),
			AuthorityUtils.createAuthorityList(manager.getRoles()));
}

```

`SpringDataJpaUserDetailsService` implements Spring Security’s `UserDetailsService`. The interface has one method: `loadByUsername()`. This method is meant to return a `UserDetails` object so Spring Security can interrogate the user’s information.

Because you have a `ManagerRepository`, there is no need to write any SQL or JPA expressions to fetch this needed data. In this class, it is autowired by constructor injection.

`loadByUsername()` taps into the custom finder you write a moment ago, `findByName()`. It then populates a Spring Security `User` instance, which implements the `UserDetails` interface. You are also using Spring Securiy’s `AuthorityUtils` to transition from an array of string-based roles into a Java `List` of `GrantedAuthority`.

## Wiring up your security policy

The `@PreAuthorize` expressions applied to your repository are **access rules**. These rules are for nought without a security policy.

```java
Copy@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
@Autowired
private SpringDataJpaUserDetailsService userDetailsService;

@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	auth
		.userDetailsService(this.userDetailsService)
			.passwordEncoder(Manager.PASSWORD_ENCODER);
}

@Override
protected void configure(HttpSecurity http) throws Exception {
	http
		.authorizeRequests()
			.antMatchers("/bower_components/**", "/*.js",
					"/*.jsx", "/main.css").permitAll()
			.anyRequest().authenticated()
			.and()
		.formLogin()
			.defaultSuccessUrl("/", true)
			.permitAll()
			.and()
		.httpBasic()
			.and()
		.csrf().disable()
		.logout()
			.logoutSuccessUrl("/");
}

```

This code has a lot of complexity in it, so let’s walk through it, first talking about the annotations and APIs. Then we’ll discuss the security policy it defines.

-   `@EnableWebSecurity` tells Spring Boot to drop its autoconfigured security policy and use this one instead. For quick demos, autoconfigured security is okay. But for anything real, you should write the policy yourself.
-   `@EnableGlobalMethodSecurity` turns on method-level security with Spring Security’s sophisticated [@Pre and @Post annotations](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#el-pre-post-annotations).
-   It extends `WebSecsurityConfigurerAdapter`, a handy base class to write policy.
-   It autowired the `SpringDataJpaUserDetailsService` by field inject and then plugs it in via the `configure(AuthenticationManagerBuilder)` method. The `PASSWORD_ENCODER` from `Manager` is also setup.
-   The pivotal security policy is written in pure Java with the `configure(HttpSecurity)`.

The security policy says to authorize all requests using the access rules defined earlier.

-   The paths listed in `antMatchers()` are granted unconditional access since there is no reason to block static web resources.
-   Anything that doesn’t match that falls into `anyRequest().authenticated()` meaning it requires authentication.
-   With those access rules setup, Spring Security is told to use form-based authentication, defaulting to "/" upon success, and to grant access to the login page.
-   BASIC login is also configured with CSRF disabled. This is mostly for demonstrations and not recommended for production systems without careful analysis.
-   Logout is configured to take the user to "/".

Warning

BASIC authentication is handy when you are experimenting with curl. Using curl to access a form-based system is daunting. It’s important to recognize that authenticting with any mechanism over HTTP (not HTTPS) puts you at risk of credentials being sniffed over the wire. CSRF is a good protocol to leave intact. It is simply disabled to make interaction with BASIC and curl easier. In production, it’s best to leave it on.

## Adding security details automatically

A good user experience is when the application can automatically apply context. In this example, if a logged in manager creates a new employee record, it makes sense for that manager to own it. With Spring Data REST’s event handlers, there is no need for the user to explicitly link it. It also ensures the user doesn’t accidentally records to the wrong manager.

```java
Copy@Component
@RepositoryEventHandler(Employee.class)
public class SpringDataRestEventHandler {
private final ManagerRepository managerRepository;

@Autowired
public SpringDataRestEventHandler(ManagerRepository managerRepository) {
	this.managerRepository = managerRepository;
}

@HandleBeforeCreate
public void applyUserInformationUsingSecurityContext(Employee employee) {

	String name = SecurityContextHolder.getContext().getAuthentication().getName();
	Manager manager = this.managerRepository.findByName(name);
	if (manager == null) {
		Manager newManager = new Manager();
		newManager.setName(name);
		newManager.setRoles(new String[]{"ROLE_MANAGER"});
		manager = this.managerRepository.save(newManager);
	}
	employee.setManager(manager);
}

```

`@RepositoryEventHandler(Employee.class)` flags this event handler as only applied to `Employee` objects. The `@HandleBeforeCreate` annotation gives you a chance to alter the incoming `Employee` record before it gets written to the database.

In this sitation, you lookup the current user’s security context to get the user’s name. Then look up the associated manager using `findByName()` and apply it to the manager. There is a little extra glue code to create a new manager if he or she doesn’t exist in the system yet. But that is mostly to support initialization of the database. In a real production system, that code should be removed and instead depend on the DBAs or Security Ops team to properly maintain the user data store.

## Pre-loading manager data

Loading managers and linking employees to these managers is rather straight forward:

```java
Copy@Component
public class DatabaseLoader implements CommandLineRunner {
private final EmployeeRepository employees;
private final ManagerRepository managers;

@Autowired
public DatabaseLoader(EmployeeRepository employeeRepository,
					  ManagerRepository managerRepository) {

	this.employees = employeeRepository;
	this.managers = managerRepository;
}

@Override
public void run(String... strings) throws Exception {

	Manager greg = this.managers.save(new Manager("greg", "turnquist",
						"ROLE_MANAGER"));
	Manager oliver = this.managers.save(new Manager("oliver", "gierke",
						"ROLE_MANAGER"));

	SecurityContextHolder.getContext().setAuthentication(
		new UsernamePasswordAuthenticationToken("greg", "doesn't matter",
			AuthorityUtils.createAuthorityList("ROLE_MANAGER")));

	this.employees.save(new Employee("Frodo", "Baggins", "ring bearer", greg));
	this.employees.save(new Employee("Bilbo", "Baggins", "burglar", greg));
	this.employees.save(new Employee("Gandalf", "the Grey", "wizard", greg));

	SecurityContextHolder.getContext().setAuthentication(
		new UsernamePasswordAuthenticationToken("oliver", "doesn't matter",
			AuthorityUtils.createAuthorityList("ROLE_MANAGER")));

	this.employees.save(new Employee("Samwise", "Gamgee", "gardener", oliver));
	this.employees.save(new Employee("Merry", "Brandybuck", "pony rider", oliver));
	this.employees.save(new Employee("Peregrin", "Took", "pipe smoker", oliver));

	SecurityContextHolder.clearContext();
}

```

The one wrinkle is that Spring Security is active with access rules in full force when this loader runs. Thus to save employee data, you must use Spring Security’s `setAuthentication()` API to authenticate this loader with the proper name and role. At the end, the security context is cleared out.

## Touring your secured REST service

With all these mods in place, you can fire up the application (`./mvnw spring-boot:run`) and check out the mods using cURL.

$ curl -v -u greg:turnquist localhost:8080/api/employees/1
\*   Trying ::1...
\* Connected to localhost (::1) port 8080 (#0)
\* Server auth using Basic with user 'greg'
> GET /api/employees/1 HTTP/1.1
> Host: localhost:8080
> Authorization: Basic Z3JlZzp0dXJucXVpc3Q=
> User-Agent: curl/7.43.0
> Accept: \*/\*
>
< HTTP/1.1 200 OK
< Server: Apache-Coyote/1.1
< X-Content-Type-Options: nosniff
< X-XSS-Protection: 1; mode=block
< Cache-Control: no-cache, no-store, max-age=0, must-revalidate
< Pragma: no-cache
< Expires: 0
< X-Frame-Options: DENY
< Set-Cookie: JSESSIONID=E27F929C1836CC5BABBEAB78A548DF8C; Path=/; HttpOnly
< ETag: "0"
< Content-Type: application/hal+json;charset=UTF-8
< Transfer-Encoding: chunked
< Date: Tue, 25 Aug 2015 15:57:34 GMT
<
{
  "firstName" : "Frodo",
  "lastName" : "Baggins",
  "description" : "ring bearer",
  "manager" : {
    "name" : "greg",
    "roles" : \[ "ROLE\_MANAGER" \]
  },
  "\_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/employees/1"
    }
  }
}

This shows a lot more details than during the first session. First of all, Spring Security turns on several HTTP protocols to protect against various attack vectors (Pragma, Expires, X-Frame-Options, etc.). You are also issuing BASIC credentials with `-u greg:turnquist` which renders the Authorization header.

Amidst all the headers, you can see the **ETag** header from your versioned resource.

Finally, inside the data itself, you can see a new attribute: **manager**. You can see that it includes the name and roles, but NOT the password. That is due to using `@JsonIgnore` on that field. Because Spring Data REST didn’t export that repository, it’s values are inlined in this resource. You’ll put that to good use as you update the UI in the next section.

## Displaying manager info on the UI

With all these mods in the backend, you can now shift to updating things in the frontend. First of all, show an employee’s manager inside the \`<Employee /> \` React component:

```javascript
Copyvar Employee = React.createClass({
    handleDelete: function () {
        this.props.onDelete(this.props.employee);
    },
    render: function () {
        return (
            <tr>
                <td>{this.props.employee.entity.firstName}</td>
                <td>{this.props.employee.entity.lastName}</td>
                <td>{this.props.employee.entity.description}</td>
                <td>{this.props.employee.entity.manager.name}</td>
                <td>
                    <UpdateDialog employee={this.props.employee}
                                  attributes={this.props.attributes}
                                  onUpdate={this.props.onUpdate}/>
                </td>
                <td>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
});
```

This merely adds a column for `this.props.employee.entity.manager.name`.

## Filtering out JSON Schema metadata

If a field is shown in the data output, it is safe to assume it has an entry in the JSON Schema metadata. You can see it in the following excerpt:

{
	...
    "manager" : {
      "readOnly" : false,
      "$ref" : "#/descriptors/manager"
    },
    ...
  },
  ...
  "$schema" : "http://json-schema.org/draft-04/schema#"
}

The manager field isn’t something you want people to edit directly. Since it’s inlined, it should be viewed as a read only attribute. To filter it out inlined entries from the `CreateDialog` and `UpdatDialog`, just delete such entries after fetching the JSON Schema metadata.

```javascript
Copy/**
 * Filter unneeded JSON Schema properties, like uri references and
 * subtypes ($ref).
 */
Object.keys(schema.entity.properties).forEach(function (property) {
    if (schema.entity.properties[property].hasOwnProperty('format') &&
        schema.entity.properties[property].format === 'uri') {
        delete schema.entity.properties[property];
    }
    if (schema.entity.properties[property].hasOwnProperty('$ref')) {
        delete schema.entity.properties[property];
    }
});
```

This code trims out both URI relations as well as $ref entries.

## Trapping for unauthorized access

With security checks configured on the backend, add a handler in case someone tries to update a record without authorization:

```javascript
CopyonUpdate: function (employee, updatedEmployee) {
    client({
        method: 'PUT',
        path: employee.entity._links.self.href,
        entity: updatedEmployee,
        headers: {
            'Content-Type': 'application/json',
            'If-Match': employee.headers.Etag
        }
    }).done(response => {
        /* Let the websocket handler update the state */
    }, response => {
        if (response.status.code === 403) {
            alert('ACCESS DENIED: You are not authorized to update ' +
                employee.entity._links.self.href);
        }
        if (response.status.code === 412) {
            alert('DENIED: Unable to update ' + employee.entity._links.self.href +
                '. Your copy is stale.');
        }
    });
},
```

You had code to catch an HTTP 412 error. This traps an HTTP 403 status code and provides a suitable alert.

Do the same for delete operations:

```javascript
CopyonDelete: function (employee) {
    client({method: 'DELETE', path: employee.entity._links.self.href}
    ).done(response => {/* let the websocket handle updating the UI */},
    response => {
        if (response.status.code === 403) {
            alert('ACCESS DENIED: You are not authorized to delete ' +
                employee.entity._links.self.href);
        }
    });
},
```

This is coded similarly with a tailored error messages.

## Add some security details to the UI

The last thing to crown this version of the app is to display who is logged in as well providing a logout button.

```html
Copy<div>
    Hello, <span th:text="${#authentication.name}">user</span>.
    <form th:action="@{/logout}" method="post">
        <input type="submit" value="Log Out"/>
    </form>
</div>
```

## Putting it all together

With these changes in the frontend, restart the application and navigate to [http://localhost:8080](http://localhost:8080).

You are immediately redirected to a login form. This form is supplied by Spring Security, though you can [create your own](https://spring.io/guides/gs/securing-web/) if you wish. Login as greg / turnquist.

![security 1](https://github.com/gregturn/react-and-spring-data-rest/raw/master/security/images/security-1.png)

You can see the newly added manager column. Go through a couple pages until you find employees owned by **oliver**.

![security 2](https://github.com/gregturn/react-and-spring-data-rest/raw/master/security/images/security-2.png)

Click on **Update**, make some changes, and then hit **Update**. It should fail with the following pop-up:

![security 3](https://github.com/gregturn/react-and-spring-data-rest/raw/master/security/images/security-3.png)

If you try **Delete**, it should fail with a similar message. Create a new employee, and it should be assigned to you.

## Review

In this session:

-   You defined the model of manager and linked it to an employee via a 1-to-many relationship.
-   You created a repository for managers and told Spring Data REST to not export.
-   You wrote a set of access rules for the empoyee repository and also write a security policy.
-   You wrote another Spring Data REST event handler to trap creation events before they happen so they current user could be assigned as the employee’s manager.
-   You updated the UI to show an employee’s manager and also display error pop-ups when unauthorized actions are taken.

Issues?

The webpage has become quite sophisticated. But what about managing relationships and inlined data? The create/update dialogs aren’t really suited for that. It might require some custom written forms.

Managers have access to employee data. Should employees have access? If you were to add more details like phone numbers and addresses, how would you model it? How would you grant employees access to the system so they could update those specific fields? Are there more hypermedia controls that would be handy to put on the page? I hope you liked this series.