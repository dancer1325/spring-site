---
title: Spring IDE 1.2 released
source: https://spring.io/blog/2005/05/17/spring-ide-1-2-released
scraped: 2026-02-24T09:39:49.921Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Torsten Juergeleit |  May 17, 2005 | 0 Comments
---

# Spring IDE 1.2 released

_Releases | Torsten Juergeleit |  May 17, 2005 | 0 Comments_

Dear Spring Community,  
  
We are pleased to announce that Spring IDE v1.2 has been released.  
  
Version 1.2 is a port to Eclipse 3 with a bunch of bugfixes. For a complete list of bugfixes included  
visit [http://springide.org/project/milestone/Release%201.2](http://springide.org/project/milestone/Release%201.2)  

Changes:

-   Ported to Eclipse 3.0
-   Added support for Eclipse 3.1M7
-   Updated to Spring v1.2
-   Refactored generic stuff (e.g. model, project nature + action, incremental project builder, ...) into separate plugins (org.springframework.ide.eclipse.core and org.springframework.ide.eclipse.ui)
-   add change notification and visitor support to generic model
-   beans model now extends generic model defined in new plugin org.springframework.ide.eclipse.beans.core
-   all jars moved from org.springframework.ide.eclipse.beans.core to new plugin org.springframework.ide.eclipse.core

More details are available from the project's site [http://springide.org/](http://springide.org/)  
  
This release is available from the project's Eclipse update site:  
    http://springide.org/updatesite/  
  
Bug reports tickets can be opened via [http://springide.org/project/newticket](http://springide.org/project/newticket)