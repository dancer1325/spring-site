---
title: VI Java API and CloudTools
source: https://spring.io/blog/2009/12/08/vi-java-api-and-cloudtools
scraped: 2026-02-24T09:01:40.859Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Charles Lee |  December 08, 2009 | 0 Comments
---

# VI Java API and CloudTools

_Engineering | Charles Lee |  December 08, 2009 | 0 Comments_

Steve Jin, the creator of The Virtual Infrastructure Java API or vSphere API, recently contributed the work he had done for the VMworld 2009 keynote sessions to the CloudTools repository.  CloudTools is the open source project that provides the core infrastructure provisioning and application deployment functionalities to Cloud Foundry.  Steve's code not only demonstrates how a Java application can be deployed through the Cloud Foundry user-interface to a vSphere infrastructure, it also shows how easily one can add an adaptor to CloudTools to enable Java application deployments to different cloud providers.  The following is a re-print of the blog entry Steve wrote to announce the contribution at his [VMware Infrastructure (vSphere) Java API Blog](http://vijava.sourceforge.net).

> DIY PaaS made possible with VI Java API and CloudTools
> 
> Nov 23, 2009
> 
> As mentioned earlier, VI Java API was leveraged at VMWorld 2009 Keynote demos. Now I got legal approval and contributed the related adapters to CloudTools code hosted at Google.
> 
> The CloudTools/CloudFoudry was originally designed for EC2. The CloudTools is open source; the CloudFoudry is not. With our contributed code, you can run CloudTools with vSphere for deploying your Java (Groovy) based web applications to your internal cloud. It offers both Maven and Grails plugins so you can do all the deployment with one line of command. Even better, you can integrate the plugin command with Spring Tools Suite (STS) and have a context menu in the Eclispe based IDE. This is what I call **DIY PaaS (Do It Yourself Platform as a Service)**: vSphere + VI Java API + adapter + CloudTools.
> 
> The vCloud adapter was designed with Terremark vCloudExpress platform for the SpringOne 2GX keynote demo. The adapter does not use the VI Java API, but leverages the vCloud REST API. Besides the basic part, the Terremark vCloud API provides extensions for managing the network like public IP, InternetService, and node.
> 
> Although you see two different adapters, the user experiences are the same. Both adapters implement the required interfaces defined by CloudTools. Technically it's not a big deal, but business wise, it is a big deal -- you can seamlessly deploy to private (vSphere) cloud and public (service providers like Terremark) cloud, whatever best suits your needs.
> 
> For more details, check out the [CloudTools project home](http://code.google.com/p/cloudtools/).
> 
> Steve Jin

Thanks, Steve, for your vSphere adaptor implementation.  We will be working to enable even more third-party contributions into CloudTools and ultimately give access to these integrations and new functionalities in Cloud Foundry.