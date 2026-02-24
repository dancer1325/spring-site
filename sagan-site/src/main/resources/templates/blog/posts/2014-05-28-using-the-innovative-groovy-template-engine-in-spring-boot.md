---
title: Using the innovative Groovy template engine in Spring Boot
source: https://spring.io/blog/2014/05/28/using-the-innovative-groovy-template-engine-in-spring-boot
scraped: 2026-02-23T22:29:28.871Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Cédric Champeau |  May 28, 2014 | 8 Comments
---

# Using the innovative Groovy template engine in Spring Boot

_Engineering | Cédric Champeau |  May 28, 2014 | 8 Comments_

With the release of [Spring Boot 1.1.0.M2](https://spring.io/blog/2014/05/27/spring-boot-1-1-0-m2-available-now) came the support for the [new template engine](http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html) that [Groovy 2.3](http://groovy.codehaus.org/Groovy+2.3+release+notes) provides. In this post, we will describe the benefits of using such an engine and of course how you can use it in Boot.

All the source code in this post is available on GitHub, so feel free to clone the repository and give it a try:

```bash
Copygit clone https://github.com/melix/springboot-groovytemplates.git
cd springboot-groovytemplates
./gradlew run
```

Then open your browser on [http://localhost:8080](http://localhost:8080)

This application is fully written in [Groovy](http://groovy.codehaus.org) and also makes use of [GORM for Boot](https://spring.io/guides/gs/accessing-data-gorm/), but it is of course possible to use Groovy only for the templating part and write the rest of the application in Java. Starting from now, we will only focus on the templating aspect of this project.

# [](#dependencies)Dependencies

Integrating with Groovy 2.3 templates in Spring Boot is very easy. You just need to add a dependency to the `groovy-templates` module in your build file. For example, if you use Gradle, just use this:

```groovy
Copydependencies {
  compile "org.codehaus.groovy:groovy:${groovyVersion}"
  compile "org.codehaus.groovy:groovy-templates:${groovyVersion}"
  compile "org.springframework.boot:spring-boot-starter-web:${springBootVersion}"
  compile "org.grails:gorm-hibernate4-spring-boot:1.0.0.RELEASE"

  runtime "com.h2database:h2:1.3.173"
}
```

# [](#groovy-templates)Groovy templates

The Groovy markup template engine provides an innovative templating system based on the builder syntax. It offers various key features:

-   hierarchical (builder) syntax to generate XML-like contents (in particular, HTML5)
-   template includes
-   compilation of templates to bytecode for fast rendering
-   internationalization
-   layout mechanism for sharing strucural patterns
-   optional type checking

and more! you can find a full list of the features of this template engine in the [documentation](http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html). The templates are basically Groovy code with special support for the template use case.

Let's start with a very simple example, where we want to display an index with a simple message containing the version numbers of Spring Boot and Groovy currently in use:

```groovy
CopyyieldUnescaped '<!DOCTYPE html>'
html {
  head {
    title('Spring Boot - Groovy templates example')
    link(rel: 'stylesheet', href: '/css/bootstrap.min.css')
  }
  body {
    div(class: 'container') {
      div(class: 'navbar') {
        div(class: 'navbar-inner') {
          a(class: 'brand',
              href: 'http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html',
              'Groovy - Template Engine docs')
          a(class: 'brand',
              href: 'hhttp://projects.spring.io/spring-boot/') {
            yield 'Spring Boot docs'
          }
        }
      }
      div("This is an application using Boot $bootVersion and Groovy templates $groovyVersion")
    }
  }
}

```

On the first line, you can read the `yieldUnescaped` instruction. It instructs the renderer to render the argument *as is*. This instruction can be used to render any kind of text based contents. Here, it is used to render the doctype declaration of our HTML file, but you can really use it to render anything. The template engine provides a number of helper functions like `yield`, which are described in the [documentation](http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html).

The rest of the template consists of a hierarchical structure matching the HTML output, making it very natural to render HTML contents. For example, the code: `link(rel: 'stylesheet', href: '/css/bootstrap.min.css')` will be rendered as:

```html
Copy<link rel='stylesheet' href='/css/bootstrap.min.css'/>
```

Similarily, this:

```groovy
Copya(class: 'brand',
  href: 'http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html',
  'Groovy - Template Engine docs')
```

will be rendered as:

```html
Copy<a class='brand' href='http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html'>Groovy - Template Engine docs</a>
```

Note how the attributes in the template map to tag attributes in the rendered HTML. The last argument corresponds to the body of the tag. Alternatively, it is possible to use the `yield` instruction to render the body of the tag:

```groovy
Copya(class: 'brand',
  href: 'http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html') {
  yield 'Groovy - Template Engine docs'
}
```

The choice often depends on whether you have nested contents to render or not. But so far, all the contents that our template generates is static. The last part of the template is more interesting:

```groovy
Copydiv("This is an application using Boot $bootVersion and Groovy templates $groovyVersion")
```

As you guessed, this will be rendered as:

```html
Copy<div>This is an application using Boot 1.1.0.M2 and Groovy templates 2.3.2</div>
```

The template, here, makes use of two variables which are found in the *model*:

-   bootVersion
-   groovyVersion

Those are exposed by our application as variables in the template, so let's see how we do this.

# [](#the-controller)The controller

The only thing that we have to do is creating a controller which will render our view, and as usual with Spring Boot, it's a matter of a few lines of code:

```groovy
Copypackage sample

import org.springframework.boot.Banner
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView

@Controller
class SampleController {
  @RequestMapping("/")
  def home() {
    new ModelAndView(
        "views/home",
        [bootVersion: Banner.package.implementationVersion, 
         groovyVersion: GroovySystem.version])
  }
}
```

Our `home` method returns a `ModelAndView` instance, and the model only contains two elements, which are the Spring Boot version and well as the Groovy version. The view is automatically found thanks to its reference, `views/home`. Spring Boot expects the view to be found in `src/main/resources/templates/views`. Can it be easier?

# [](#real-life-data)Real life data

In real life, templates are unlikely to be that simple. You will have entities, databases, CRUD operations, etc... So the next step is to show you how you can use the new template engine to render a model which is more complex. For that, we made use of GORM, so we will start by defining an entity named `Person`:

```groovy
Copypackage sample

import grails.persistence.*

@Entity
class Person {
  String firstName
  String lastName
}
```

And what we will want to do is, for example:

-   listing persons in the database
-   adding/editing a new person

So we will need two templates: one for listing persons, the other for creating a person (or editing). The list example is interesting because it will let us show you how you can iterate on a list in the template. So before that, let's create a controller with the list operation:

```groovy
Copy@Controller
@RequestMapping("/person")
class PersonController {

  @RequestMapping("list")
  def list() {
    new ModelAndView('views/person/list', [persons: Person.list()])
  }
}
```

You can see that similarily to what we did in the simple example, we return a `ModelAndView` example, but this time, the model contains a list of persons. So let's see what the template looks like:

```groovy
CopyyieldUnescaped '<!DOCTYPE html>'
html {
  head {
    title('Spring Boot - Groovy templates example')
    link(rel: 'stylesheet', href: '/css/bootstrap.min.css')
  }
  body {
    div(class: 'container') {
      div(class: 'navbar') {
        div(class: 'navbar-inner') {
          a(class: 'brand',
              href: 'http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html',
              'Groovy - Template Engine docs')
          a(class: 'brand',
              href: 'hhttp://projects.spring.io/spring-boot/') {
            yield 'Spring Boot docs'
          }
        }
      }

      ul {
        persons.each { person ->
          li {
            a(href:"/person/$person.id", "$person.lastName $person.firstName")
          }
        }
      }

      div {
        a(href:'/person/add', 'Add new person')
      }
    }
  }
}
```

Most of the template is actually corresponding to the decoration of the page, and copied from the original template. At this point, you may wonder what you can do to improve this, but we will come back to that later, and focus on the most interesting part of this template, the iteration:

```groovy
Copyul {
  persons.each { person ->
    li {
      a(href: "/person/$person.id", "$person.lastName $person.firstName")
    }
  }
}
```

Looping over the `persons` variable is done thanks to the traditional `each` method that Groovy developers are used to. This is normal, because the templates are in fact Groovy code! So we can iterate on the persons, we give a name (`person`) to the current person in the iteration, then use it inside an `a` tag.

With several persons in database, the resulting HTML would be something like this:

```html
Copy<ul>
  <li><a href='/person/1'>John Doe</a></li>
  <li><a href='/person/2'>Bob Dylan</a></li>
  <li><a href='/person/3'>Guillaume Laforge</a></li>
  <li><a href='/person/4'>Graeme Rocher</a></li>
  <li><a href='/person/5'>Dave Syer</a></li>
</ul>
```

So if you are used to JSPs, GSPs and any kind of HTML-like templating system, you can immediately see that this template engine will release you from the infamous issue of having to deal with opening/closing tags. And this is just a beginning... As an illustration of how you can simplify things, we will introduce you to the *layout* mechanism.

If you remember, we actually have two templates that share a common structure. They both use Twitter Bootstrap, they both share the same menu, and eventually, the only thing that changes is the page title and the main body. What if we could extract this from our templates and share it?

# [](#introducing-layouts)Introducing layouts

Layouts are made for this. So let's extract the common part of our template into a *main.tpl* file that we will save into *src/main/resources/templates/layouts*:

```groovy
CopyyieldUnescaped '<!DOCTYPE html>'
html {
  head {
    title(pageTitle)
    link(rel: 'stylesheet', href: '/css/bootstrap.min.css')
  }
  body {
    div(class: 'container') {
      div(class: 'navbar') {
        div(class: 'navbar-inner') {
          a(class: 'brand',
              href: 'http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html',
              'Groovy - Template Engine docs')
          a(class: 'brand',
              href: 'hhttp://projects.spring.io/spring-boot/') {
            yield 'Spring Boot docs'
          }
        }
      }
      mainBody()
    }
  }
}
```

This looks very similar to a standard template, but you can actually find two special things:

-   `title(pageTitle)` where `pageTitle` is expected to be the page title that we want to give
-   `mainBody()`, which will cause rendering of the main body for pages using that layout. Note the parenthesis which are important.

Now let's update the home page template to use this layout:

```groovy
Copylayout 'layouts/main.tpl',
    pageTitle: 'Spring Boot - Groovy templates example with layout',
    mainBody: contents {
      div("This is an application using Boot $bootVersion and Groovy templates $groovyVersion")
    }
```

You can see that we call the `layout` method and provide it with several arguments:

-   the name of the layout file to be used (`layouts/main.tpl`)
-   `pageTitle`, a simple string
-   `mainBody`, using the `contents` block

Use of the `contents` block will trigger the rendering of the contents of `mainBody` inside the layout when the `mainBody()` instruction is found. So using this layout file, we are definitely sharing a common, structural pattern, against multiple templates. As an illustration, let's see how the `list.tpl` template now looks like:

```groovy
Copylayout 'layouts/main.tpl',
    pageTitle: 'List persons',
    mainBody: contents {
      ul {
        persons.each { person ->
          li {
            a(href:"/person/$person.id", "$person.lastName $person.firstName")
          }
        }
      }

      div {
        a(href:'/person/add', 'Add new person')
      }
    }
```

Of course, layouts are themselves composable, so you can use layouts inside layouts...

# [](#conclusion)Conclusion

In this post, we have showed you how Spring Boot makes it very easy to use the new template engine that Groovy introduced in Groovy 2.3. This template engine offers a very natural and powerful syntax to generate any kind of text based contents. A full description of the capabilities of the template engine can be found in the [Groovy documentation](http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html) and an alternative application using the same technology can be found in the [Spring Boot samples](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-web-groovy-templates).

Last but not least, native support for this template engine is coming into Spring 4.1! So expect more Groovy love in the future!