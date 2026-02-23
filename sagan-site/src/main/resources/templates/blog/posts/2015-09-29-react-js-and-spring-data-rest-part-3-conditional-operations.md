---
title: React.js and Spring Data REST: Part 3 - Conditional Operations
source: http://spring.io/blog/2015/09/29/react-js-and-spring-data-rest-part-3-conditional-operations
scraped: 2026-02-23T19:41:21.364Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  September 29, 2015 | 1 Comment
---

# React.js and Spring Data REST: Part 3 - Conditional Operations

_Engineering | Greg L. Turnquist |  September 29, 2015 | 1 Comment_

To see updates to this code, visit our [React.js and Spring Data REST tutorial](https://spring.io/guides/tutorials/react-and-spring-data-rest/).

In the [previous session](https://spring.io/blog/2015/09/15/react-js-and-spring-data-rest-part-2-hypermedia), you found out how to turn on Spring Data REST’s hypermedia controls, have the UI navigate by paging, and dynamically resize based on changing the page size. You added the ability to create and delete employees and have the pages adjust. But no solution is complete with taking into consideration updates made by other users on the same bit of data you are currently editing.

Feel free to [grab the code](https://github.com/gregturn/react-and-spring-data-rest/tree/master/conditional) from this repository and follow along. This session is based on the previous session’s app with extra things added.

## To PUT or not to PUT, that is the question

When you fetch a resource, there is risk is that it might go stale if someone else updates it. To deal with this, Spring Data REST integrates two technologies: versioning of resources and ETags.

By versioning resources on the backend and using ETags in the frontend, it is possible to conditially PUT a change. In other words, you can detect if a resource has changed and prevent a PUT (or a PATCH) from stomping on someone else’s update. Let’s check it out.

## Versioning REST resources

To support versioning of resources, define a version attribute for your domain objects that need this type of protection.

src/main/java/com/greglturnquist/payroll/Employee.java

```java
Copy@Data
@Entity
public class Employee {
private @Id @GeneratedValue Long id;
private String firstName;
private String lastName;
private String description;

private @Version @JsonIgnore Long version;

private Employee() {}

public Employee(String firstName, String lastName, String description) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.description = description;
}

```

-   The **version** field is annoated with `javax.persistence.Version`. It causes a value to be automatically stored and updated everytime a row is inserted and updated.
    

When fetching an individual resource (not a collection resource), Spring Data REST will automatically add an [ETag response header](http://tools.ietf.org/html/rfc7232#section-2.3) with the value of this field.

## Fetching individual resources and their headers

In the [previous session](https://spring.io/blog/2015/09/15/react-js-and-spring-data-rest-part-2-hypermedia) you used the collection resource to gather data and populate the UI’s HTML table. With Spring Data REST, the **\_embedded** data set is considered a preview of data. While useful for glancing at data, to get headers like ETags, you need to fetch each resource individually.

In this version, `loadFromServer` is updated to fetch the collection and then use the URIs to retrieve each individual resource.

src/main/resources/static/app.jsx - Fetching each resource

```javascript
CopyloadFromServer: function (pageSize) {
    follow(client, root, [
        {rel: 'employees', params: {size: pageSize}}]
    ).then(employeeCollection => {
        return client({
            method: 'GET',
            path: employeeCollection.entity._links.profile.href,
            headers: {'Accept': 'application/schema+json'}
        }).then(schema => {
            this.schema = schema.entity;
            this.links = employeeCollection.entity._links;
            return employeeCollection;
        });
    }).then(employeeCollection => {
        return employeeCollection.entity._embedded.employees.map(employee =>
                client({
                    method: 'GET',
                    path: employee._links.self.href
                })
        );
    }).then(employeePromises => {
        return when.all(employeePromises);
    }).done(employees => {
        this.setState({
            employees: employees,
            attributes: Object.keys(this.schema.properties),
            pageSize: pageSize,
            links: this.links
        });
    });
},
```

1.  The `follow()` function goes to the **employees** collection resource.
2.  The `then(employeeCollection ⇒ …​)` clause creates a call to fetch JSON Schema data. This has a sub-then clause to store the metadata and navigational links in the `<App/>` component.
    
    -   Notice that this embedded promise returns the employeeCollection. That way, the collection can be passed onto the next call while letting you grab the metadata along the way.
    
3.  The second `then(employeeCollection ⇒ …​)` clause converts the collection of employees into an array of GET promises to fetch each individual resource. **This is what you need to fetch an ETag header for each employee.**
4.  The `then(employeePromises ⇒ …​)` clause takes the array of GET promises and merges them into a single promise with `when.all()`, resolved when all the GET promises are resolved.
5.  `loadFromServer` wraps up with `done(employees ⇒ …​)` where the UI state is updated using this amalgamation of data.

This chain is implemented in other places as well. For example, `onNavigate()`, which is used to jump to different pages, has been updated to fetch individual resources. Since it’s mostly the same as what’s shown above, it’s been left out of this session.

## Updating existing resources

In this session, you are adding an `UpdateDialog` React component to edit existing employee records.

src/main/resources/static/app.jsx - UpdateDialog component

```javascript
Copyvar UpdateDialog = React.createClass({
handleSubmit: function (e) {
    e.preventDefault();
    var updatedEmployee = {};
    this.props.attributes.forEach(attribute =&gt; {
        updatedEmployee[attribute] = React.findDOMNode(this.refs[attribute]).value.trim();
    });
    this.props.onUpdate(this.props.employee, updatedEmployee);
    window.location = "#";
},

render: function () {
    var inputs = this.props.attributes.map(attribute =&gt;
            &lt;p key={this.props.employee.entity[attribute]}&gt;
                &lt;input type="text" placeholder={attribute}
                       defaultValue={this.props.employee.entity[attribute]}
                       ref={attribute} className="field" /&gt;
            &lt;/p&gt;
    );

    var dialogId = "updateEmployee-" + this.props.employee.entity._links.self.href;

    return (
        &lt;div key={this.props.employee.entity._links.self.href}&gt;
            &lt;a href={"#" + dialogId}&gt;Update&lt;/a&gt;
            &lt;div id={dialogId} className="modalDialog"&gt;
                &lt;div&gt;
                    &lt;a href="#" title="Close" className="close"&gt;X&lt;/a&gt;

                    &lt;h2&gt;Update an employee&lt;/h2&gt;

                    &lt;form&gt;
                        {inputs}
                        &lt;button onClick={this.handleSubmit}&gt;Update&lt;/button&gt;
                    &lt;/form&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    )
}

```

This new component has both a `handleSubmit()` function as well as the expected `render()` function, similar to the `<CreateDialog />` component.

Let’s dig into these functions in reverse order, and first look at the `render()` function.

### Rendering

This component uses the same CSS/HTML tactics to show and hide the dialog as the `<CreateDialog />` from the previous session.

It converts the array of JSON Schema attributes into an array of HTML inputs, wrapped in paragraph elements for styling. This is also the same as the `<CreateDialog />` with one difference: the fields are loaded with **this.props.employee**. In the CreateDialog component, the fields are empty.

The **id** field is built differently. There is only one CreateDialog link on the entire UI, but a separate UpdateDialog link for every row displayed. Hence, the **id** field is based on the **self** link’s URI. This is used in both the <div> element’s React **key** as well as the HTML anchor tag and the hidden pop-up.

### Handling user input

The submit button is linked to the component’s `handleSubmit()` function. This handily uses `React.findDOMNode()` to extract the details of the pop-up using [React refs](http://facebook.github.io/react/docs/more-about-refs.html).

After the input values are extracted and loaded into the `updatedEmployee` object, the top-level `onUpdate()` method is invoked. This continues React’s style of one-way binding where the functions to call are pushed from upper level components into the lower level ones. This way, state is still managed at the top.

## Conditional PUT

So you’ve gone to all this effort to embed versioning in the data model. Spring Data REST has served up that value as an ETag response header. Here is where you get to put it to good use!

src/main/resources/static/app.jsx - onUpdate function

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
        this.loadFromServer(this.state.pageSize);
    }, response => {
        if (response.status.code === 412) {
            alert('DENIED: Unable to update ' +
                employee.entity._links.self.href + '. Your copy is stale.');
        }
    });
},
```

PUT with an [If-Match request header](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.24) causes Spring Data REST to check the value against the current version. If the incoming **If-Match** value doesn’t match the data store’s version value, Spring Data REST will fail with an **HTTP 412 Precondition Failed**.

Note

The spec for [Promises/A+](https://promisesaplus.com/) actually defines their API as `then(successFunction, errorFunction)`. So far, you’ve only seen it used with success functions. In the code fragment above, there are two functions. The success function invokes `loadFromServer` while the error function displays a browser alert about the stale data.

## Putting it all together

With your `UpdateDialog` React component defined and nicely linked to the top-level `onUpdate` function, the last step is to wire it into the existing layout of components.

The `CreateDialog` created in the previous session was put at the top of the `EmployeeList` because there is only one instance. However, `UpdateDialog` is tied directly to specific employees. So you can see it plugged in below in the `Employee` React component:

src/main/resources/static/app.jsx - Employee with UpdateDialog

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
})
```

In this session, you switch from using the collection resource to individual resources. The fields for an employee record are now found at `this.props.employee.entity`. It gives us access to `this.props.employee.headers` where we can find ETags.

There are other headers supported by Spring Data REST (like [Last-Modified](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.29)) which aren’t part of this series. So structuring your data this way is handy.

Important

The structure of `.entity` and `.headers` is only pertinent when using [rest.js](https://github.com/cujojs/rest) as the REST library of choice. If you use a different library, you will have to adapt as necessary.

## Seeing things in action

1.  Start up the app (`./mvnw spring-boot:run`).
2.  Open up a tab and navigate to [http://localhost:8080](http://localhost:8080).
    
    ![conditional 1](https://github.com/gregturn/react-and-spring-data-rest/raw/master/conditional/images/conditional-1.png)
    
3.  Pull up the edit dialog for Frodo.
4.  Open another tab in your browser and pull up the same record.
5.  Make a change to the record in the first tab.
6.  Try to make a change in the second tab.
    
    ![conditional 2](https://github.com/gregturn/react-and-spring-data-rest/raw/master/conditional/images/conditional-2.png)
    

![conditional 3](https://github.com/gregturn/react-and-spring-data-rest/raw/master/conditional/images/conditional-3.png)

With these mods, you have increased data integrity by avoiding collisions.

## Review

In this session:

-   You configured your domain model with an `@Version` field for JPA-based optimistic locking.
-   You adjusted the frontend to fetch individual resources.
-   You plugged the ETag header from an individual resource into an **If-Match** request header to make PUTs conditional.
-   You coded a new UpdateDialog for each employee shown on the list.

With this plugged in, it’s easy to avoid colliding with other users, or simply overwriting their edits.

Issues?

It’s certainly nice to know when you’re editing a bad record. But is it best to wait until you click "Submit" to find out?

The logic to fetch resources is very similar in both `loadFromServer` and `onNavigate`. Do you see ways to avoid duplicate code?

You put the JSON Schema metadata to good use in building up the `CreateDialog` and the `UpdateDialog` inputs. Do you see other places to use the metadata to makes things more generic? Imagine you wanted to add five more fields to `Employee.java`. What would it take to update the UI?