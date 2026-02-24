---
title: Validation logic (and my first post!)
source: https://spring.io/blog/2006/08/25/validation-logic-and-my-first-post
scraped: 2026-02-24T09:35:22.106Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Colin Yates |  August 25, 2006 | 0 Comments
---

# Validation logic (and my first post!)

_Engineering | Colin Yates |  August 25, 2006 | 0 Comments_

Hey all!

This is my first post since I joined Interface21 last month. My previous [blog](http://blogs.warwick.ac.uk/colinyates "blog") is now officially deprecated and I won't be updating it anymore.

So what is the subject of my first post (except to introduce myself)?  Validation logic.  It won't be a walkthrough of how to perform validation in the Spring framework, rather it will discuss a particular bug bear of mine :)

In particular, I would like to discuss exactly what should go into validation logic.  It seems to be a no-brainer answer; "logic to validate the specified data".  OK, that *is* a no-brainer but read on :). As you know, the Spring framework provides a nice abstraction layer for your validation, via the [Errors](http://www.springframework.org/docs/api/org/springframework/validation/Errors.html "Errors") and [Validator](http://www.springframework.org/docs/api/org/springframework/validation/Validator.html "Validator") interfaces.  In particular the Validator is where you apply your business specific validation rules to your populated domain object.  Spring's excellent binding support is responsible for updating your domain model based on some input, the validator is responsible for ensuring that the populated domain model is *semantically* correct. So what is my bug bear?  Time and time again I keep running across applications that allow validation logic to trickle out of the validator and into the controllers (for web apps), or even worse into the middle tier.  Just before people start taking issue; I am not saying validation doesn't belong in the middle tier, I am saying that the Validator is the place to put validation logic!

The most common example of this is when you are adding a new entity, say a User.  Typically the validator will perform a number of "simple" checks (fields are not null, text fields are longer than 25 characters etc.).  The controller (for example) will then call the middle tier (userService.add(user)) and catch DuplicateKeyException (or a strongly typed DuplicateUserException) exception.  If this exception is thrown the controller will then populate the errors object and then re-display the form.

So what's wrong with that picture?  Quite simply the fact that some validation is now *implicitly* being done with the raising of the DuplicateKeyException indicating that validation has failed!.  The DB (in this example) is validating the data to ensure it is unique before inserting it, and if not it throws the exception.

My point (that I am admittedly being very verbose in making ;)) is that this is all validation logic which belongs in the Validator.  Moving this uniqueness check into the validator **where it belongs(!)** enables a number of benefits:

-   It is a much cleaner, and more intuitive implementation; where do you look for validation logic?  In the validator.
-   The validator implementation is now *truly* re-usable.  Previously the validator was actually only validating some of the data.
-   Unit testing for a unique user is done within the validation unit tests.  This is much easier than unit testing the controller which would require mocking up an Errors, HttpServletRequest, HttpServletResponse (which is actually pretty easy, but still....) etc..  The number of objects that need to be mocked to test a validator is the Errors object, the DAO and your domain model.
-   The onSubmit method in the Controller now honours the contract specified by SimpleFormController (which states it is only called when validation succeeds), so the code is much cleaner.

This isn't rocket science, but a lot of people just don't "get" it.  I think it is probably because they view the validator as the place to validate that the request parameters are correct.  Sure you do that on the domain model itself, but that is still their mindset.  It isn't.  It is all about applying *all* your *business* validation rules.

Note: there is an argument that states you are repeating your validation logic; the DB knows what is and isn't unique, so why duplicate that logic in the controller?  Well, the point is that you *are* duplicating that logic, you are using the throwing of a DuplicateXXXException to indicate the validation failure, so this isn't really a valid argument.

There is also another argument that states that this isn't 100% guaranteed to catch *all* (in this case) duplicate keys.  And that is true.  There is a small window of opportunity after the validation has been called but before the middle tier call is made in which another process could sneak in and create the unique row, but this is a very *very* small window (typically milliseconds), and an OptimisticLockingException would probably thrown anyway.  Also consider the nature of the data.  It is highly unlikely that a single unique entitiy would be created by two different threads at the same time.  If it does happen, fine.  Let the exception trickle up to the container because it really is now an *exceptional* condition.

Rant over.

P.S.  The rest of my blog posts will probably be just as verbose :)