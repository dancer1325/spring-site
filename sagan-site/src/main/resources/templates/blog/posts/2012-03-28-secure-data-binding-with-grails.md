---
title: Secure Data Binding With Grails
source: https://spring.io/blog/2012/03/28/secure-data-binding-with-grails
scraped: 2026-02-24T08:24:25.326Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jeff Scott Brown |  March 28, 2012 | 0 Comments
---

# Secure Data Binding With Grails

_Engineering | Jeff Scott Brown |  March 28, 2012 | 0 Comments_

## Introduction

The Grails Framework provides a lot of tools and techniques to web application developers to simplify solving common application development challenges.

Among those are a number of things which simplify the complicated and tedious problems often associated with data binding. In general, data binding is made very simple by Grails as it offers several techniques for binding maps of data to graphs of objects.

It is important that application developers understand the implications of each of those techniques in order to decide which is most appropriate and most secure for any given use case.

## Web Application Data Binding Overview

A really common task for many web applications is for the application to accept a set of http request parameters and bind those parameters to an object. The object then might be stored in the database, used to perform some kind of calculation or used carry out some kind of application logic. In a Grails application some of that is often carried out in a controller action and the data is often being bound to a domain object.

Consider a domain class which looks something like this:

#### Code Listing 1

```groovy
Copyclass Employee {
    String firstName
    String lastName
    BigDecimal salary
}
```

There might be a form in the application which allows for updating the firstName and lastName properties. That form might not allow for updating the salary property, which might be updated only by some other part of the application.

A controller action for updating a particular employee might look something like this:

#### Code Listing 2

```groovy
Copyclass EmployeeController {
    def updateEmployee() {
        // retrieve the employee from the database
        def employee = Employee.get(params.id)

        // update properties in the employee
        employee.firstName = params.firstName
        employee.lastName = params.lastName

        // update the database
        employee.save()
    }
}
```

Grails can simplify that by allowing something like this:

#### Code Listing 3

```groovy
Copyclass EmployeeController {
    def updateEmployee() {
        // retrieve the employee from the database
        def employee = Employee.get(params.id)

        // update properties in the employee
        employee.properties = params

        // update the database
        employee.save()
    }
}
```

Each of these examples assumes that there are request parameters named firstName and lastName. In the first example we have a line of code for every property which needs to be updated but in the second example we have just 1 line of code which accounts for all of the properties which need to be updated.

In this particular example we only eliminated 1 line of code but if there were a lot of properties to update in the Employee object the first example would get longer and more tedious while the second example would stay exactly the same.

## A Potential Problem

Code Listing 3 is cleaner and requires less maintenance than Code Listing 2 but it may or may not be the best thing to do for any particular use case.

A problem with the more simple approach is it may allow a user to update properties that the application developer did not intend to allow.

For example, if there were a request parameter named salary, the code in Code Listing 2 would ignore that request parameter but the code in Code Listing 3 would use the value of that parameter to update the salary property in the Employee object, which might be problematic.

There are several techniques that the application code might use to defend against something like that. One is to use the approach shown in Code Listing 2. Another is to provide a white list or a black list of property names to Grails when asking for the data binding to be done.

One way to provide a white list is shown here:

#### Code Listing 4

```groovy
Copyclass EmployeeController {
    def updateEmployee() {
        // retrieve the employee from the database
        def employee = Employee.get(params.id)

        // update the firstName and lastName properties in the employee
        employee.properties['firstName', 'lastName'] = params

        // update the database
        employee.save()
    }
}
```

The code in Code Listing 4 will bind only the firstName and lastName request parameters to the employee object, ignoring all other request parameters. If there is a request parameter named salary, it will not cause the salary property in the employee object to be updated.

Another technique is to use the bindData method which is added to all Grails controllers. The bindData method allows for a white list and/or a black list of property names to be supplied:

#### Code Listing 5

```groovy
Copyclass EmployeeController {
    def updateEmployee() {
        // retrieve the employee from the database
        def employee = Employee.get(params.id)

        // update the firstName and lastName properties in the employee
        bindData(employee, params, [include: ['firstName', 'lastName']])

        // or... bindData(employee, params, [exclude: ['salary']])

        // update the database
        employee.save()
    }
}
```

## Data Binding And Dependency Injection

The potential problem described above could cause problems for an application in a number of ways. One is something like allowing an employee's salary property to be updated in a part of the application that wasn't intended to allow that. Another way that the problem might come up is if data binding is carried out on an object which has any properties which were injected into the object from the Spring application context.

Consider code like this:

#### Code Listing 6

```groovy
Copyclass TaxCalculator {
    def taxRate

    def calculateTax(baseAmount) {
        baseAmount * taxRate
    }
}

class InvoiceHelper {
    def taxCalculator

    def calculateInvoice(...) {
        // do something with the parameters that involves invoking
        // taxCalculator.calculateTax(...) to generate some total
    }
}
```

Consider that an instance of TaxCalculator is configured in the Spring application context along with an instance of InvoiceHelper. The TaxCalculator instance is auto-wired into the InvoiceHelper instance.

Now consider a Grails domain class like this:

### Code Listing 7

```groovy
Copyclass Vendor {
    def invoiceHelper
    String vendorName

    // ...
}
```

A Grails controller might do something like this to update a Vendor currently persisted in the database:

#### Code Listing 8

```groovy
Copyclass VendorController {
    def updateVendor = {
        // retrieve the vendor from the database
        def vendor = Vendor.get(params.id)

        // update properties in the vendor
        vendor.properties = params

        // update the database
        vendor.save()
    }
}
```

A potential problem with this is that it might inadvertently allow the taxRate property in the TaxCalculator instance which is in the Spring application context to be updated.

If there were a request parameter named invoiceHelper.taxCalculator.taxRate, that is exactly what would happen when "vendor.properties = params" is executed. Depending on some other details in the application, that might cause unexpected and problematic behavior of the application.

In Grails 2.0.2 that would not be a problem because the invoiceHelper property in the Vendor class is dynamically typed and as discussed below, dynamically typed properties are not bindable unless they are explicitly included in a white list. If the invoiceHelper property were statically typed, then it would be subject to data binding.

Prior to Grails 2.0.2 the code in Coding Listing 8 is problematic but can easily be dealt with using the white list or black list techniques described above.

Another version of the same problem comes up when using a data binding constructor:

#### Code Listing 9

```groovy
Copyclass VendorController {
    def createVendor = {
        // create a new Vendor
        def vendor = new Vendor(params)

        // save to the database
        vendor.save()
    }
}
```

Prior to Grails 2.0.2 and Grails 1.3.8 what happens when "new Vendor(params)" is executed is the Vendor object is created, then dependency injection is carried out agains the Vendor instance, then data binding is carried out binding params to the instance.

Because of the order of events there, if params includes a request parameter named "invoiceHelper.taxCalculator.taxRate" then this code is subject to the same problem described above.

In Grails 2.0.2 and Grails 1.3.8 the order of events is changed so the Vendor object is created, then data binding is carried out agains the instance, then dependency injection is carried out.

With that sequence of events there is no danger of the data binding mutating properties in Spring beans because the Spring beans are not injected until after the data binding happens.

For versions of Grails prior to Grails 2.0.2 and Grails 1.3.8, a simple approach to manage this problem is something like this:

#### Code Listing 10

```groovy
Copyclass VendorController {
    def createVendor = {
        // create a new Vendor
        def vendor = new Vendor()

        vendor.properties['vendorName'] = params

        // or... bindData(vendor, params, [include: ['vendorName']])
        // or... bindData(vendor, params, [exclude: ['invoiceHelper']])

        // save to the database
        vendor.save()
    }
}
```

This is not problematic for every domain class but is potentially problematic for domain classes that have Spring beans auto-wired into them. Incidentally, the same set of issues applies to Grails command objects, which are also subject to data binding and automatic dependency injection.

## Grails 2.0.2 Data Binding Improvements

Those techniques have all been supported by Grails for a long time. Grails 2.0.2 will include even more flexibility for managing data binding. In Grails 2.0.2 the code in Code Listings 4 and 5 will behave exactly the same as it did in previous versions. When a white list or a black list is supplied, it will be respected.

However, when a white list or a black list is not supplied, as in "employee.properties = params", Grails 2.0.2 may behave differently, depending on some details in the Employee class.

In Grails 2.0.2 the data binding mechanism will by default exclude all properties which are static, transient or dynamically typed. For more fine grained control over what is by default bindable and what is not, Grails 2.0.2 supports a new bindable constraint:

#### Code Listing 11

```groovy
Copyclass Employee {
    String firstName
    String lastName
    BigDecimal salary

    static constraints = {
        salary bindable: false
    }
}
```

Code Listing 11 shows how to express that the salary property is not bindable by default. This means when an application does something like "employee.properties = params", the salary property will not be subject to data binding.

If the property is ever explicitly included in a white list like "employee.properties\['firstName', 'lastName', 'salary'\] = params", then it will be subject to data binding.

## Conclusion

The data binding mechanisms provided by Grails allow for clean expressive code to be written without being cluttered with a lot of tedious data binding related details. It is important for application developers to understand the implications of using those techniques so the best approach for any particular use case can be implemented.

### References

-   [Grails 2.0.2 User Guide](http://grails.org/doc/2.0.2/)
-   [Data Binding Documentation](http://grails.org/doc/2.0.2/guide/theWebLayer.html#dataBinding)
-   [bindable Constraint Documentation](http://grails.org/doc/2.0.2/ref/Constraints/bindable.html)