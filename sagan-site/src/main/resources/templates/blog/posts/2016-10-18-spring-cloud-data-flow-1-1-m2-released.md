---
title: Spring Cloud Data Flow 1.1 M2 Released
source: https://spring.io/blog/2016/10/18/spring-cloud-data-flow-1-1-m2-released
scraped: 2026-02-23T19:00:30.446Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Pollack |  October 18, 2016 | 0 Comments
---

# Spring Cloud Data Flow 1.1 M2 Released

_Engineering | Mark Pollack |  October 18, 2016 | 0 Comments_

On behalf of the team, I am pleased to announce the release of the second milestone of Spring Cloud Data Flow 1.1. You can download the local server that is part of this release [here](http://repo.spring.io/milestone/org/springframework/cloud/spring-cloud-dataflow-server-local/1.1.0.M2/spring-cloud-dataflow-server-local-1.1.0.M2.jar).

The 1.1 M2 release includes the following new features and improvements:

-   Builds upon Boot 1.4.1 and Spring Cloud Camden improvements
    
-   Task application properties can now be referenced using non-prefixed property names
    
-   Add visual representation for related streams. This representation also includes nested TAPs and the downstream processing nodes in an overall topology view.
    

![Visualization of Taps](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-nested-tap-streams.png)

-   The UI adds [bulk import support for Task definitions](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.M2/reference/htmlsingle/#_creating_task_definitions_using_the_bulk_define_interface). This allows importing task definitions from a file or the ability to add multiple task-definitions using the Flo-editor
    
-   The flo-editor embeds [CodeMirror](https://codemirror.net/) for incremental DSL syntax validation and error reporting. There’s also a toggle on/off button to enable and disable incremental validations.
    
-   Adds a form-based login page for non-OAUTH backend authentication methods such as the LDAP, Basic and File-based options.
    
-   Adds the ability to [pass application specific properties via YAML file](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.M2/reference/htmlsingle/#_inline_vs_file_reference_properties_2). This is particularly useful when deploying streams with that set many deployment properties.
    
-   Consolidates the following shell commands for ordering and consistency. “task display” changed to “task execution status”, “task status” is removed, use of : syntax for “app info :” and “app unregister :.
    

Review the [1.0.1.M2 release marker](https://github.com/spring-cloud/spring-cloud-dataflow/milestone/8?closed=1) to learn more about the incremental improvements.