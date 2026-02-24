---
title: The dm Shell
source: https://spring.io/blog/2009/10/15/the-dm-shell
scraped: 2026-02-24T09:03:12.854Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christopher Frost |  October 15, 2009 | 0 Comments
---

# The dm Shell

_Engineering | Christopher Frost |  October 15, 2009 | 0 Comments_

The dm Server has a new command line shell. It is currently available along with the existing Equinox shell and will replace it for the 2.0 release. Improvements over the Equinox shell include basic tab completion and a command history.

The dm Shell is available both locally and remotely over ssh. When used locally by starting the server with the *'./startup.sh -shell'* option it will take over the console output once the dm Kernel has started. Console output will still be viewable in the event log. Either way the first thing to be produced is an ASCII art splash image followed by the command prompt *':> '*.

```plain
Copy[13:36:54 ~]: ssh -p 2402 admin@localhost
admin@localhost's password: 

     @@@ ***                                                                       
    @@@ *****            .__.                  .__.            .__.  .__.          
   @@@@ ******         __|  |  _____     _____.|  |__    ____  |  |  |  |          
   @@@@@@ ****        / __  | /     \   /  ___/|  |  \ ./ __ \ |  |  |  |       
    @@@@@ ***        / /_/  ||  Y Y  \  \___ \ |   Y  \\  ___/ |  |__|  |__   
     @@@ ***         \______||__|_|__/ /_____/ |___|__/ \____/ |____/|____/      

Type 'help' to see the available commands.
:> 
```

When accessing the dm Shell remotely a password is required, security is provided by JAAS authentication and is the same id/password as for the dm Console. The default is *'admin/springsource'*. This can be configured from the *'com.springsource.kernel.users.properties'* file in the *'config'* directory.

### Listing bundles

Once in the shell type *'help'* to view a list of available of commands. When half way through a command just press '**TAB**' to see a list of possible completions for the command instead of going back and typing *'help'* again.

Start with the *'bundles'* command, this will show the [user region](http://blog.springsource.com/2009/10/13/regions/) bundles in the system. Their state, name, version and whether they are spring powered is shown. With the exception of a few kernel bundles and their services, used to administer the user region, none of the kernel is visible to user installed artifacts. This makes it much clearer as there are far fewer system bundles and services visible.

```plain
Copy:> bundles
Id  State         Name-Version
0   Active        org.eclipse.osgi-3.5.1.R35x_v20090827
1   Active        com.springsource.region.user-0.0.0
2   Resolved      org.springframework.aop-3.0.0.CI-395
3   Resolved      org.springframework.asm-3.0.0.CI-395
....
46  Active      S com.springsource.server.admin.web-2.0.0.M5
47  Active        com.springsource.javax.servlet.jsp.jstl-1.1.2
48  Active        com.springsource.org.apache.taglibs.standard-1.1.2
49  Active        org.springframework.context.support-3.0.0.CI-395
50  Active        org.springframework.jdbc-3.0.0.CI-395
51  Active        org.springframework.js-2.0.8.RELEASE
52  Active        org.springframework.transaction-3.0.0.CI-395
53  Active        org.springframework.web.servlet-3.0.0.CI-395
54  Active      S com.springsource.server.repository.hosted-2.0.0.M5-com.springsource.server.repository.hosted.core-2.0.0.M5
55  Active        com.springsource.server.repository.hosted-2.0.0.M5-com.springsource.server.repository.hosted.web-2.0.0.M5
56  Active        com.springsource.server.repository.hosted-2.0.0.M5-com.springsource.server.repository.hosted-synthetic.context-2.0.0.M5
57  Active        com.springsource.server.splash-2.0.0.M5
```

### Performing lifecycle operations

It is easy to perform operations as well, for example installing a bundle. Type *'install file:/path.to.bundle.jar'*.

```plain
Copy:> install file:/Users/chrisfrost/Desktop/com.bar.import-1.0.0.jar
60  Installed     com.bar.importer-1.0.0
```

The Bundle has been installed but when we try to *'start'* it there is an error. When the attempt was made to start the bundle a missing required dependency for the bundle is shown.

```plain
Copy:> start 60
Error occured while starting bundle '[60] com.bar.importer-1.0.0' : The bundle could not be resolved. Reason: Missing Constraint: Import-Package: com.foo; version="[1.0.0,2.0.0)"
:> 
```

It is easy to get this information at any time with the *'diag'* command. The information presented will be the same as that displayed in the log files when any attempts are made to start the bundle.

```plain
Copy:> diag 60
Resolution report for bundel 60  Installed     com.bar.importer-1.0.0

Cannot resolve: com.bar.importer
    Resolver report:
        An Import-Package could not be resolved. Caused missing constraint <Import-Package: com.foo; version="[1.0.0,2.0.0)"> in bundle <com.bar.importer_1.0.0>

:> 
```

We can install a bundle that satisfies the dependency and then *'start'* our original bundle again, this time all goes smoothly.

### Bundle details

This is a very simple bundle and it can be viewed in detail by typing *'bundle 60'*. Remember there is tab completion so just *'bu* **TAB** *60'* will do to complete the command. Here all the packages that this bundle imports and exports are shown. The *'S'* before the bundle name indicates that the bundle has a Spring context.

```plain
Copy:> bundle 60
Bundle report for 60  Active      S com.bar.importer-1.0.0

Imported packages:
    com.foo-[1.0.0, 2.0.0)

Exported packages:

:> bundle 61
Bundle report for 61  Resolved      com.foo.exporter-1.0.0

Imported packages:

Exported packages:
    com.foo-1.0.0

:> 
```

We can see that it is now importing the package that caused the error before. The second bundle shown is the one that exports that package.

### Viewing configuration

Some of the other commands available include *'config'* and *'configs'*, these will display the installed configurations and their properties.

```plain
Copy:> configs
Pid
com.springsource.kernel
com.springsource.repository
com.springsource.server.repository.hosted
com.springsource.osgi.medic
com.springsource.kernel.users
com.springsource.kernel.jmxremote.access

:> config com.springsource.osgi.medic
Pid                 = com.springsource.osgi.medic
Factory pid         = null
Bundle location     = null

dump.root.directory = serviceability/dump
log.wrapSysErr      = true
log.wrapSysOut      = true
service.pid         = com.springsource.osgi.medic

:> 
```

Shown is a listing of the available configurations and the properties for the medic configuration. When finished with dm Shell there are two ways to leave it. *'exit'* will simply exit the shell while *'shutdown'* will call shutdown on the server and the shell session will be terminated as part of the shutdown.

```plain
Copy:> exit
Goodbye.
Connection to localhost closed.
[14:24:03 ~]: 
```

## Coming soon...

More work is being done on the shell in the run up to the 2.0 release and when that happens there will be a full user guide and I suspect another blog or screencast. So if there is some **killer** feature that you would like to see then please shout.