---
title: Unit Testing with Stubs and Mocks
source: https://spring.io/blog/2007/01/15/unit-testing-with-stubs-and-mocks
scraped: 2026-02-24T09:32:40.049Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  January 15, 2007 | 2 Comments
---

# Unit Testing with Stubs and Mocks

_Engineering | Dave Syer |  January 15, 2007 | 2 Comments_

I was on site with some clients the other day, and they asked me about unit testing and mock objects. I decided to write up some of the discussion we had as a tutorial on creating dependencies (collaborators) for unit testing. We discuss two options, stubbing and mock objects and give some simple examples that illustrate the usage, and the advantages and disadvantages of both approaches.

It is common in unit tests to mock or stub collaborators of the class under test so that the test is independent of the implementation of the collaborators. It is also a useful thing to be able to do to control precisely the test data that are used by the test, and verify that the unit is behaving as expected.

## Stubbing

The stubbing approach is easy to use and involves no extra dependencies for the unit test. The basic technique is to implement the collaborators as concrete classes which only exhibit the small part of the overall behaviour of the collaborator which is needed by the class under test. As an example consider the case where a service implementation is under test. The implementation has a collaborator:

```java
Copy
public class SimpleService implements Service {

    private Collaborator collaborator;
    public void setCollaborator(Collaborator collaborator) {
        this.collaborator = collaborator;
    }

    // part of Service interface
    public boolean isActive() {
        return collaborator.isActive();
    }
}
```

To test the implementation of isActive we might have a unit test like this:

```java
Copy
public void testActiveWhenCollaboratorIsActive() throws Exception {

    Service service = new SimpleService();
    service.setCollaborator(new StubCollaborator());
    assertTrue(service.isActive());

}

...

class StubCollaborator implements Collaborator {
    public boolean isActive() {
        return true;
    }
}
```

The stub collaborator does nothing more than return the value that we need for the test.

It is common to see such stubs implemented inline as anonymous inner classes, e.g.

```java
Copy
public void testActiveWhenCollaboratorIsActive() throws Exception {

    Service service = new SimpleService();
    service.setCollaborator(new Collaborator() {
        public boolean isActive() {
           return true;
        }
    });
    assertTrue(service.isActive());

}
```

This saves us a lot of time maintaining stub classes as separate declarations, and also helps to avoid the common pitfalls of stub implementations: re-using stubs across unit tests, and explosion of the number of concrete stubs in a project.

What's wrong with this picture? Well, often the collaborator interfaces in a service like this one are not as simple as this trivial example, and to implement the stub inline requires dozens of lines of empty declarations of methods that are not used in the service. Also, if the collaborator interface changes (e.g. adds a method), we have to manually change all the inline stub implementations in all the test cases, which can be a lot of work.

To solve those two problems we start with a base class, and instead of implementing the interface afresh for each test case, we extend a base class. If the interface changes, we only have to change the base class. Usually the base class would be stored in the unit test directory in our project, not in the production or main source directory.

For example, here is a suitable base class for the interface as defined:

```java
Copy
public class StubCollaboratorAdapter implements Collaborator {
   public boolean isActive() {
       return false;
   }
}
```

and here is the new test case:

```java
Copy
public void testActiveWhenCollaboratorIsActive() throws Exception {

    Service service = new SimpleService();
    service.setCollaborator(new StubCollaboratorAdapter() {
        public boolean isActive() {
           return true;
        }
    });
    assertTrue(service.isActive());

}
```

The test case is now insulated from changes to the collaborator interface that do not affect the isActive method. In fact, using an IDE, it will also be insulated from some changes in the interface that do affect the isActive method - for instance a name or signature change can be made automatically by the IDE in all test cases.

The inline stub approach is very useful and quick to implement, but to have more control over the test case, and ensure that if the implementation of the service object changes, the test case also changes accordingly, a mock object approach is better.

## Mock Objects

Using mock objects (e.g. from [EasyMock](http://www.easymock.org) or [JMock](http://www.jmock.org)) we get a high level of control over testing the internals of the implementation of the unit under test.

To see this in practice consider the example above, rewritten to use EasyMock. First we look at EasyMock 1 (i.e. not taking advantage of Java 5 extensions in EasyMock 2). The test case would look like this:

```java
Copy
MockControl control = MockControl.createControl(Collaborator.class);
Collaborator collaborator = (Collaborator) control.getMock();
control.expectAndReturn(collaborator.isActive(), true);
control.replay();

service.setCollaborator(collaborator);
assertTrue(service.isActive());

control.verify();
```

If the implementation changes to use a collaborator differently, then the unit test fails immediately, signalling to the developer that it needs to be re-written. Suppose the internals of the service changed to not use the collaborator at all:

```java
Copy
public class SimpleService implements Service {

    ...

    public boolean isActive() {
        return calculateActive();
    }

}
```

The test above using EasyMock would fail with an obvious message saying that the expected method call on collaborator was not executed. In the stub implementation, the test might or might not fail: if it did fail the error meesage would be cryptic; if it did not, then it would only be accidental.

To fix the failed test we have to modify it to reflect the internal implementation of the service. The constant re-working of test cases to reflect the internals of the implementation is seen by some as a burden, but actually it is in the very nature of unit testing to have to do this. We are testing the implementation of the unit, not its contract with the rest of the system. To test the contract we would use an integration test, and treat the service as a black box, defined by its interface, not its implementation.

## EasyMock 2

Note that the above test case implementation can be streamlined if we are using Java 5 and EasyMock 2:

```java
Copy
Collaborator collaborator = EasyMock.createMock(Collaborator.class);
EasyMock.expect(collaborator.isActive()).andReturn(true);
EasyMock.replay(collaborator);

service.setCollaborator(collaborator);
assertTrue(service.isActive());

EasyMock.verify(collaborator);
```

There is no need for the MockControl in the new test case. Not a big deal if there is only one collaborator, like here, but if there are many, then the test case becomes significantly easier to write and read.

## When to Use Stubs and Mocks?

If mock objects are superior, why would we ever use stubs? The question is likely to draw us into the realm of the religious debate, which we will take care to avoid for now. So the simple answer is, "do what suits your test case, and creates the simplest code to read and maintain". If the test using a stub is quick to write and read, and you are not too concerned about changes to the collaborator, or uses of the collaborator internally to the unit under test, then that is fine. If the collabrator is not under your control (e.g. from a third-party library), it may often be the case that a stub is more difficult to write.

A common case where stubbing is easier to implement (and read) than mocks is where the unit under test needs to use a nested method call on the collaborator. For example, consider what happens if we change our service, so it no longer uses the collaborator's isActive directly, but instead nests a call to another collaborator (of a different class, say Task):

```java
Copy
public class SimpleService implements Service {

    public boolean isActive() {
        return !collaborator.getTask().isActive();
    }

}
```

To test this with mock objects in EasyMock 2:

```java
Copy
Collaborator collaborator = EasyMock.createMock(Collaborator.class);
Task task = EasyMock.createMock(Task.class);

EasyMock.expect(collaborator.getTask()).andReturn(task);
EasyMock.expect(task.isActive()).andReturn(true);
EasyMock.replay(collaborator, task);

service.setCollaborator(collaborator);
assertTrue(service.isActive());

EasyMock.verify(collaborator, task);
```

The stub implementation of the same test would be

```java
Copy
Service service = new SimpleService();
service.setCollaborator(new StubCollaboratorAdapter() {
    public Task getTask() {
        return (new StubTaskAdapter() {
            public boolean isActive() {
                return true;
            }
        }
    }
});
assertTrue(service.isActive());
```

there isn't much to distinguish between the two in terms of length (ignoring the code in the adapter base classes, which we can re-use in other tests). The mock version is more robust (for reasons discussed above), so we prefer it. But if we had to use EasyMock 1 because we were unable to use Java 5, things might be different: it would be quite a lot more ugly to implement the mock version. Here it is:

```java
Copy
MockControl controlCollaborator = MockControl.createControl(Collaborator.class);
Collaborator collaborator = (Collaborator) controlCollaborator.getMock();

MockControl controlTask = MockControl.createControl(Task.class);
Task task = (Task) controlTask.getMock();

controlCollaborator.expectAndReturn(collaborator.getTask(), task);
controlTask.expectAndReturn(task.isActive(), true);

controlTask.replay();
controlCollaborator.replay();

service.setCollaborator(collaborator);
assertTrue(service.isActive());

controlCollaborator.verify();
controlTask.verify();
```

The test is half as long again, and correspondingly harder to read and maintain. Things can easily get much worse in reality. In this case we might consider the stub implementation in the interests of an easy life. Of course the true believers in mock objects will point out that this is a false economy, and the unit test will be more robust and better for the long term than the test using stubs.