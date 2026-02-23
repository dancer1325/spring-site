---
title: Spring Cloud Skipper 1.0 GA Released
source: https://spring.io/blog/2018/02/05/spring-cloud-skipper-1-0-ga-released
scraped: 2026-02-23T16:09:50.084Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  February 05, 2018 | 1 Comment
---

# Spring Cloud Skipper 1.0 GA Released

_Releases | Mark Pollack |  February 05, 2018 | 1 Comment_

On behalf of the team, I am pleased to announce the release of Spring Cloud Skipper 1.0 GA

Skipper is a lightweight tool that allows you to discover Spring Boot applications and manage their lifecycle on multiple Cloud Platforms. You can use Skipper standalone or integrate it with Continuous Integration pipelines to help implement the practice of Continuous Deployment.

The [getting started section](https://docs.spring.io/spring-cloud-skipper/docs/1.0.0.RELEASE/reference/htmlsingle/#getting-started) in the reference guide is the best place to start kicking the tires.

## [](#release-highlights)[](#release-highlights)Release Highlights:

-   Introduction of Flyway to manage schema along with various schema tweaks.
    
-   Option to delete a release along with its package.
    
-   Refined the REST API.
    
-   Updated properties to YAML converter.
    
-   Add resource metadata in manifest template.
    
-   Separate platform deployers into multiple maven modules.
    
-   Support passing to the shell commands to execute.
    
-   Updated documentation.
    
-   Various bug fixes.
    

## [](#whats-next)[](#what-s-next)What’s next?

The 1.0 GA feature set was primarily driven by the needs of Spring Cloud Data Flow to deploy message-driven applications. Future releases plan to improve how http routing is managed during upgrade/rollback and to support templating of Cloud Foundry application manifests.

Please reach out on [GitHub Issues](https://github.com/spring-cloud/spring-cloud-skipper/issues), [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-skipper), and the [Gitter channel](https://gitter.im/spring-cloud/spring-cloud-skipper) with questions, feedback or contributions.

## [](#and-now-for-something-completely-different)[](#and-now-for-something-completely-different)And now for something completely different

"Silicon’s Island" - Parody of the [Gilligan’s Island Theme Song](https://www.youtube.com/watch?v=Q8jhb5NnADM)

Just sit right back and you’ll hear a tale  
A tale of a fateful app  
That started from initializr  
To fill a functional gap

The dev was a mighty Mary Ann  
The Skipper brave and sure  
Five apps were deployed that day  
For a three hour tour  
A three hour tour

The GC started getting rough  
The tiny app was tossed  
If not for the courage of the fearless crew  
The data would be lost  
The data would be lost

The app set ground on the shore  
Of this uncharted Java isle  
With Gilligan  
The Skipper too  
A container, that came to life  
A GitHub star  
The Professor and Mary Ann  
Here on Silicon’s Isle

Now this is the tale of our streaming apps  
They’re here for a long, long time  
They’ll have to make the best of things  
In a CD paradigm.

The first mate and his Skipper too  
Will do their very best  
To make the apps comfortable  
In their Java island nest

No Slack, No sprites, No FTP  
Not a single luxury  
Like a base install of Linux  
It’s primitive as can be

So join us here each sprint my friends,  
You’re sure to get a smile,  
From our stranded castaways  
Here on Silicon’s Isle!