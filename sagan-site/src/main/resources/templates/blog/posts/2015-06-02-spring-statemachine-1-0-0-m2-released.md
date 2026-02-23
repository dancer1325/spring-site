---
title: Spring Statemachine 1.0.0.M2 Released
source: https://spring.io/blog/2015/06/02/spring-statemachine-1-0-0-m2-released
scraped: 2026-02-23T19:50:34.593Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  June 02, 2015 | 6 Comments
---

# Spring Statemachine 1.0.0.M2 Released

_Releases | Janne Valkealahti |  June 02, 2015 | 6 Comments_

We’re pleased to announce a second milestone release of [Spring Statemachine](http://projects.spring.io/spring-statemachine/) 1.0.0.M2.

With this milestone we focused on features in regions and pseudostates. Regions provide more sophisticated functionality for a parallel execution of a states machines and pseudostates will bring more functionality for working with initial, terminate, history, choice, fork and join states.

One might ask what is a region and how it works with a state machine. A state machine is a specialization of a region where orthogonal regions are composed of a multiple independent state machines. This is a difficult concept to understand so we did a sample to demonstrate this feature.

![Tasks Statechart](http://docs.spring.io/spring-statemachine/docs/1.0.0.M2/reference/htmlsingle/images/statechart5.png)

Above statechart is showing a usual concept of how a group of tasks are executed during a workflow. Executing a multiple tasks means that if one of these tasks will fail, executing of tasks again cannot continue unless a failure reason is fixed. These failures can be either fixed automatically or state machine is put into a manual state where user level intervention is required. Only after that a state machine can go back to its main state where all tasks can be executed again.

One useful concept in a state machine is a history state. This pseudostate is recording last active state of a statemachine and returning into that state will restore active state configuration. Concept of this is shown below(we know that washer is able to continue from its last state when power is restored) and more detailed description can be found from a reference documentation.

![Washer Statechart](http://docs.spring.io/spring-statemachine/docs/1.0.0.M2/reference/htmlsingle/images/statechart6.png)

Where do we go from here? With a next milestone we're going to tackle features like:

-   Better stability and speed
-   Relax requirement of using enums for states and events.
-   Adding error handling for state machine execution.
-   Better support for Spring SpEL for actions and guards.
-   Better programmatic instantiation of a state machine.
-   New concept of using a recipes for easy state machine usage. Tasks example above is a good example where we can provide recipes for usual state machine use cases.

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). Super Early Bird Price expires June 12th! It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.

#Discounts

-   The Super Early Bird price tier ($300 discount) expires June 12th. The Early Bird price tier (June 13th - August 14th) is discounted $150.
-   Register 4 and get the 5th pass free. Contact us with the names of your first 4 registrants for your complimentary pass code (conference admission only).
-   Alumni, contact us for your discount code ($150 off any option).