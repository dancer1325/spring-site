---
title: React-ing to start.spring.io + User feedback updates
source: https://spring.io/blog/2019/06/05/react-ing-to-start-spring-io-user-feedback-updates
scraped: 2026-02-23T14:45:30.836Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Damien Vitrac |  June 05, 2019 | 1 Comment
---

# React-ing to start.spring.io + User feedback updates

_Releases | Damien Vitrac |  June 05, 2019 | 1 Comment_

We are happy to announce today that [start.spring.io](https://start.spring.io) is now built using **React/Gatsby** as the front-end framework. We also made **UI improvements** based on your feedback. **Thank you** to all those who have contributed to this update and to all the users who continue to tell us how to improve!

## [](#reactjs)React.js

During the previous Web UI modernization (launched on March 5th), we realized that making even small changes to the site had become more time consuming than we anticipated. The architecture was inhibiting our ability to run experiments and move quickly to make small, incremental changes.

As a result, we decided to rewrite the front-end using a modern and popular javascript framework - [Gatsby](https://www.gatsbyjs.org/).

## [](#changes-based-on-your-feedback)Changes based on your feedback

Thanks to everyone who continues to **give us feedback** - at conferences, through GitHub, taking the survey, etc. Based on those results, the team has cultivated a list of improvements we are planning on making over the coming months. Below are the changes included to the current site.

### [](#no-more-modal-window-dependency-list)No more modal-window dependency list

After rolling out the **new UI**, we removed the dependency list. You voiced your opinion about this removal and we quickly brought the list back in the form of a modal window. While this worked, we wanted to continue to improve the user experience.

![](https://static.spring.io/blog/damienvitrac/20190605/start.png)

**Changes:**

-   Showing the full dependency list has been promoted to a prominent position. We have removed the link and replaced it with a list icon next to the search functionality.
-   To better utilize the space we switched to a grid style which allows us to fit more dependencies on the page at once and decrease the amount of scrolling. Additionally, each group can be collapsed/opened as well.
-   Updated groupings and descriptions. We reviewed the dependencies, polished the descriptions to better describe the functionality and re-grouped some of them.
-   Visual indication of selected dependencies.

### [](#new-help-menu)New ‘Help’ Menu!

![](https://static.spring.io/blog/damienvitrac/20190605/help.png)

From this menu users can access:

-   Spring Projects (link to projects page) - Users can access the home page for the major Spring Projects.
-   Spring Guides (link to the guides page) - This page provides users with samples of how to use and integrate Spring projects.
-   What’s New With Spring - This will take users to the Spring blog, which is one of the best places to stay up-to-date on news and updates from the Spring team
-   Migrate from 1.5 => 2.0 - With 1.x lines End-Of-Life fast approaching (August, 2019) we have provided quick access to the migration manual.

### [](#additional-ui-changes)Additional UI Changes

As always, we made small html/css changes as well:

-   Searching will now sort incompatible items to the bottom of the list.
-   Searching will show a warning message if your search term is too broad
-   We changed the styling on the options menu

### [](#gradle-kotlin-dsl)Gradle Kotlin DSL

In an effort to continue our support of the **Kotlin** community we now support and provide **Gradle Kotlin DSL projects**. When generating a new project, when the user selects “Gradle” and “Kotlin” the project generated will include *build.gradle.kts* and *settings.gradle.kts* by default.

## [](#a-note-about-using-curl)A note about using cURL

Recently the start.spring.io page was updated to https:// from http://. The result is that if a user types curl start.spring.io from the terminal nothing happens…and there is no user feedback.

When using **cURL** or **httpie**, you should use `https://start.spring.io` from now on - please update your scripts!

---

Again we appreciate **everyone's help and feedback** as we continue learning and iterating on the site and the initializr library.