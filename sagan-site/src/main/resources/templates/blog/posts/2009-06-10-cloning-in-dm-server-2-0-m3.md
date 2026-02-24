---
title: Cloning in dm Server 2.0 M3
source: https://spring.io/blog/2009/06/10/cloning-in-dm-server-2-0-m3
scraped: 2026-02-24T09:07:06.013Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Glyn Normington |  June 10, 2009 | 0 Comments
---

# Cloning in dm Server 2.0 M3

_Engineering | Glyn Normington |  June 10, 2009 | 0 Comments_

Cloning is the feature in dm Server 2.0 which copies certain bundles and libraries into a scoped application (that is, a PAR or a scoped plan) as described in the [roadmap.](http://blog.springsource.com/2009/04/01/springsource-dm-server-roadmap/)

The support for cloning in dm Server has progressed steadily over the last few sprints. The [fundamental mechanisms](http://blog.springsource.com/2009/04/02/announcing-dm-server-20-m1/) were in place in M1: cloning may be triggered:

-   manually by specifying the directive sharing:=clone on import-library or import-bundle
-   automatically when a scoped application fails to resolve because of a uses constraint violation.

Since then the code was tidied up somewhat, a major performance optimisation was added for the common case of Spring framework being cloned, log messages were added to indicate which bundles have been cloned, tracing was improved, and a few bugs were fixed.

We have noticed that manual cloning is a relatively safe operation as it is completely under the user's control. However, automatic cloning is always speculative. It is driven by OSGi resolver failures, in particular violations of uses constraints (as explained in an earlier [blog](http://blog.springsource.com/2008/10/20/understanding-the-osgi-uses-directive/)). Some uses constraint violations cannot be avoided by cloning, but we can't tell until automatic cloning has been attempted and the uses violation is still present. This can involve several iterations of running the resolver and cloning one or more bundles. Sometimes, particularly if Spring framework bundles are cloned, it is also necessary to clone the Spring DM extender bundle and some associated machinery.

All this processing can, in the worst case, take many seconds or even minutes. So we are adding a configuration option to allow automatic cloning to be turned off. One use for this option would be to develop an application with automatic cloning enabled. If automatic cloning is necessary to resolve the application but the performance is unacceptable, manual cloning could then be used (and automatic cloning could be disabled).

In the next couple of sprints, the dm Server team are aiming to ship M3. Before then we'd like your feedback on what default value the community (i.e. you) would prefer for this configuration option. Would you like automatic cloning to be enabled or disabled by default?

The benefit of having it enabled by default is that the automatic cloning support will tend to get more use and any remaining bugs are more likely to be fleshed out. The benefit of having is disabled by default is that users will not be exposed to the relative complexity, and possible performance cost, of automatic cloning unless they opt in. I would prefer to enable it by default, at least at this stage of development, but I'm undecided what the default should be when we eventually ship 2.0.

Beyond M3 the cloning support will be refactored into the new deployer architecture, but more about that on another occasion.