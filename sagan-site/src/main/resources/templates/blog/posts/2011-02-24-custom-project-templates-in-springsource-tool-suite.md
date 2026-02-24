---
title: Custom Project Templates in SpringSource Tool Suite
source: https://spring.io/blog/2011/02/24/custom-project-templates-in-springsource-tool-suite
scraped: 2026-02-24T08:45:42.735Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Martin Lippert |  February 24, 2011 | 4 Comments
---

# Custom Project Templates in SpringSource Tool Suite

_Engineering | Martin Lippert |  February 24, 2011 | 4 Comments_

The SpringSource Tool Suite (STS) provides the New Spring Template Project wizard. Uses this wizard, the user can see a number of project templates, choose one and let the wizard create a complete project, based on that template description. While this gives you an easy way to create new projects, you might wanna define your own custom project templates for your team or your organization. And we will show you how to do this in the following.

### 1\. Step: Contribute a new resources extension to STS

STS creates the list of available project templates by downloading and reading resource XML files. To let STS know where those resource files are located, you need to contribute them to STS via an extension.

So the first step is to create a new and empty plugin project. You don't need Java code in there, so don't create this as a Java project. Just create a new plugin project, deselect the Java options in the wizard and you are done.

Now define the extension within that plugin project. Create a `plugin.xml` by selecting the extension tab, when you have the manifest editor open (double clicking on the `META-INF/MANIFEST.MF`). You define the extension my modifying the `plugin.xml` to look something like this:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<?eclipse version="3.4"?>

<plugin>
   <extension point="com.springsource.sts.core.resources">
      <url
         id="content.descriptors"
         value="%content.descriptor.urls">
      </url>
   </extension>

</plugin>
```

This defines a contribution to the STS extension point `com.springsource.sts.core.resources` and overrides the default value for the `content.descriptors` id with your new value. This new value should contain all the URLs from all templates you would like to see within the STS wizard. In this case, we don't put the URLs in here directly, but we externalize them into a separate properties file. *THIS IS NEEDED* for multiple URLs, as you will see.

The next step is to create a properties file called `bundle.properties` inside your plugin, and you should put that into a directory called `OSGI-INF/I10n/`. This properties file should look like this:

```xml
Copy
content.descriptor.urls = http://dist.springsource.com/release...riptors.xml\n\
file:///Users/mlippert/template-contribution/descriptor.xml
```

As you can see, I put the original STS value in there to keep the STS default templates available and added my own URL to my (in this case local) `descriptor.xml` file. So if you would like to use just a local file, you can go ahead with this approach. In the case where you would like to distribute your new template across your company, having the `descriptor.xml` file being served as a http resources would make sense. Please note that the URLs are separated by a `\n`.

Now you are pretty much done with the new plugin for STS. You can export that and put the resulting JAR file into the `dropins` directory of your STS installation. Take care that the build.properties have META-INF, OSGI-INF, and `plugin.xml` checked to be included for the binary build.

(I attached an example plugin project for this: [template-contribution-plugin.zip](http://blog.springsource.com/wp-content/uploads/2011/02/template-contribution-plugin.zip))

### 2\. Step: Build the `descriptor.xml` file

The URL that you added to the STS extension in the previous step points to a descriptor.xml file. This file should look like this:

```xml
Copy
<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<descriptors>
   <descriptor id="org.test.mynewtemplate" kind="template" local="false" name="Mein neues Template" size="998877" url="file:///Users/mlippert/template-contribution/test-template-1.0.0.zip" version="1.0.0">
      <description>My brand new template contribution for this hacky stuff etc.</description>
   </descriptor>
</descriptors>
```

As you can see, I put some random stupid examples in there, you should replace that with your own ids. Please choose:

-   your own ID for the template (`org.test.mynewtemplate` in the example)
-   your own name for the template ("Mein neues Template"), this will show up in the list of the wizard
-   your own URL to point to the ZIP file for the template
-   don't forget to set the correct size of the ZIP file in the `side` attribute
-   description: some more text to tell the user what your template is all about

### 3\. Step: Build the real template

Now you need to create that ZIP file that we referenced from the `descriptor.xml` file. This ZIP file should contain three files in its root directory: 

`  	-   template.xml 	-   template.zip 	-   wizard.json  `

Lets take a look at the first one, `template.xml`:

```xml
Copy
<template>
   <descriptor id="org.test.mynewtemplate"
             name="Mein neues Template"
             kind="template"
             version="1.0.0">
      <description>My brand new template contribution for this hacky stuff</description>
   </descriptor>
   <project path="template.zip"/>
   <json path="wizard.json"/>
</template>
```

It contains the same `id`, `name`, and `description` for the template than the `descriptor.xml`, also the same `version` and the kind `template`. In addition to that it also contains the reference to the template.zip file and the wizard.json file. So this is the place where you define those two other files.

The wizard.json file contains the description that is used to create and handle the UI of the wizard for this template specifically. In my example the wizard.json file looks like this:

```javascript
Copy
{
   "info" : {
      "elements" : {
         "element" : [
         {
            "name" : "topLevelPackage",
            "description" : "Please specify the top-level package e.g. com.mycompany.myapp",
            "type" : "java.lang.String",
            "page" : 0,
            "required" : true,
            "pattern" : "\\w+\\.\\w+(\\.\\w+)+",
            "replaceKind" : "topLevelPackage"
         }
         ]
      },

      "topLevelPackage" : "mytld.mycompany.myapp.mysubsystem",
      "projectName" : "projectName",

      "pages" : {
         "page" : [
         {
            "order" : 0,
            "description" : "Project Settings"
         }
         ]
      }
   }
}
```

I don't go into the details here, but this is basically the information for the wizard UI. It contains the elements that the user can type in within the wizard and that are used to create the actual project (for example the top level packages).

The last part is the actual project that you would like to instantiate if the user chooses your template. All you need to do here is to create the project yourself and name the top-level packages the way you defined it in the wizard.json (in this case `mytld.mycompany.myapp.mysubsystem`). In the example that I attached to this the template project resides in the root directory called `template` and contains:

-   .classpath
-   .project
-   .settings
-   .springBeans
-   pom.xml
-   src directory containing the project layout and some predefined source code

Here is an example for this: [template-contribution.zip](http://blog.springsource.com/wp-content/uploads/2011/02/template-contribution.zip).

**That's it!**

**Please note:** Once you have downloaded the zip file of your new template into STS (this is done automatically after you have chosen it from the list and pressed return), STS will re-use the downloaded file the next time. So if you chance your template, take care to set a newer version number to it. Otherwise STS will not pick-up your changed one.