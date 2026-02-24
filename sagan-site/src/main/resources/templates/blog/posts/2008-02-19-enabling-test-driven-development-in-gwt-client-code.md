---
title: Enabling Test Driven Development in GWT client code
source: https://spring.io/blog/2008/02/19/enabling-test-driven-development-in-gwt-client-code
scraped: 2026-02-24T09:20:44.255Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Iwein Fuld |  February 19, 2008 | 0 Comments
---

# Enabling Test Driven Development in GWT client code

_Engineering | Iwein Fuld |  February 19, 2008 | 0 Comments_

In the past months I've been working with various clients on projects using Google Web Toolkit \[GWT\]. I like GWT primarily because of the Java to javascript compiler. This is the key to the door letting mere mortal Java developers create RIA's without having to learn a new language.

I've allways been a fan of test driven development, and to my disappointment at first sight it looked like TDD and GWT were not going to play together.

Testing GWT code is a bit problematic. The core of the problem is that GWT code is compiled to javascript before it is run. In many cases a GWT.create() statement is used to hook into the dynamic binding mechanism. When executed in normal Java environment this statement causes an exception.

Even when you use a mocking library like EasyMock to mock out the culprit you are still likely to run into the problem if it is triggered from a constructor for example. Creating interfaces for all widgets is just too much overhead, and even when you do that you will not be able to test the specific class that has the GWT.create() in it.

GWT provides a solution for this problem in GWTTestCase, but this class has quite a few problems of its own. Just to name a few:

-   it starts hosted mode from within the testrunner (making it slow)
-   it needs to run on GWT compiled code (making it slow)
-   it waits for the async service with a timeout (making it slow)

It provides a decent mechanism to do integration testing on your client code, but for unit testing it is too bloated.

When you do test driven development you need to be able to write tests with at least the following properties:

-   They run from the IDE immediately (no switching, no waiting)
-   They run fast (the upper bound in the order of magnitude of 10 seconds)
-   They can test units in isolation (mocking or stubbing out the dependencies)

All these requirements are about quickly and easily switching between test mode and development mode. Because if that is possible you can keep your entire focus on solving the problem. From personal experience I can say that this is a sure way to get into flow, but your mileage may vary. In any case, if these basic requirements are *not* met, you *will* get distracted during development and that eliminates the advantage of upfront testing, which is the essence of TDD.

So what do we do to keep our code from turning into spaghetti by lack of testing, but keeping those slow GWTTestCases to a minimum? **MVC to the rescue**

MVC is a veteran pattern. There have been many applications of it, some of which have almost nothing in common with the original MVC pattern except for the name, but the general direction I would like to point in is best summarized by Martin Fowler under the name Humble View.

My even shorter summary is this: views are usually very hard to test, therefore they should know and do as little as possible. In GWT a view is synonymous to a Widget. Now there is a slight catch here: anything that runs on the client is owned by a Widget. Most of the GWT code has pretty much all the logic in widgets, so most developers using GWT extend a widget and just add some more logic.

My advice is simple: don't go there. Type safety is nice to get IDE support, it does nothing to prevent you from writing bad code. So if you don't unit test, your code you'll end up being a mess.

If you don't go down the path of putting logic in your Views (Widget subclasses) you'll need another place to put it. That's where the Controller comes in. Coming back to the catch I mentioned before, we will need to bootstrap the controller from a Widget or EntryPoint. There is really no way around this, so let's just do it and see how bad it looks:

`   public class NoteEditor extends Composite {     public NoteEditor() {         //do the dependency injection stuff         NoteModel noteModel = new NoteModel();         NoteEditorController controller =                 new NoteEditorController(noteModel, NoteService.App.getInstance(), new AlertCallback());         //...     } }   `

As you can see I've done some dependency injection from the code here, because we don't have Spring on the client yet. I say yet, because we could use GWToolbox or Rocket for that later. The service takes a GWT.create() to get bootstrapped, and the AlertCallback is used to decouple the controller from Window for the occasional alert. This is not so bad I'd say, I can sleep easily without writing a test for this code.The trouble is not entirely over, because any element we want to use in the view (buttons, labels etc) needs to be instantiated in the view and then registered with the controller:

`   controller.registerDetailViewSelector(new DeckPanelSelector(detailView)); detailView.addStyleName("detailPanel"); main.add(detailView, DockPanel.CENTER); //some buttons at the bottom of the screen buttonPanel.add((Widget)controller.registerClearButton(new Button("Clear"))); buttonPanel.add((Widget)controller.registerLoadButton(new Button("Load existing Note")));   `

The controller accepts the buttons under their interface (SourcesClickEvents) which as a bonus allows us to replace the button with some Widget with a different look without having to change our controller. Nothing new here, this is exactly the separation of concerns that MVC is about. To be honest I'd normally prefer to write a test to check that the registration has happened correctly, but this is something that can't be done without GWTTesCase.Now it is time to let our IDE create that controller + methods for us and write the test so we can implement the logic. For example the test for the load button would look something like this:

`       public void testLoadButtonPressed_success() throws Exception {         final Foo expectedFoo = new Foo("expected");         fooServiceMock.loadFoo(isA(String.class), isA(AsyncCallback.class));         expectLastCall().andAnswer(new IAnswer() {             public Object answer() throws Throwable {                 ((AsyncCallback) getCurrentArguments()[1]).onSuccess(expectedFoo);                 return null;             }         });         fooModelMock.setFoo(expectedFoo);         replay(allMocks);         loadButton.fireClick();         verify(allMocks);     }   `

And off we go! I've attached a quick sample to show the idea. You can use it as a starting point for experiments.

Update 2008-10: Sources of the sample are outdated. The general advice still holds.

To summarize a quick sketch of the GWT flavoured MVC pattern. But of course you can choose your own flavor, as long as you *keep your logic in a testable class*.

![GWT flavored MVC pattern](http://blog.springsource.com/main/wp-content/uploads/2008/02/gwt-mvc-picture.png)