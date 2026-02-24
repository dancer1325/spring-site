---
title: Bundlor Version Expansion and Property Substitution
source: https://spring.io/blog/2009/05/12/bundlor-version-expansion-and-property-substitution
scraped: 2026-02-24T09:08:07.018Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christopher Frost |  May 12, 2009 | 0 Comments
---

# Bundlor Version Expansion and Property Substitution

_Engineering | Christopher Frost |  May 12, 2009 | 0 Comments_

## Introduction

Recently the M3 milestone of Bundlor has been released ([Forum Anouncement](http://forum.springsource.org/showthread.php?t=70950)). This milestone adds support for Property Substitution and Version Expansion. This blog post explains how to work with these new features to improve the quality of generated Manifests.

## Property Substitution

Bundlor can now be used to substitute any property value into your Manifest Template.

Bundle-Name: ${name}
Bundle-Description: Test bundle using new version of Kernel at ${com.springsource.kernel}
Import-Template: com.springsource.kernel.\*;version="${com.springsource.kernel}"

This syntax allows you to specify property placeholders for `${name}` and `${com.springsource.kernel}` and have them substituted at runtime with actual values. The way that these values are passed in is specific to which Bundlor front end is being used.

### Specifying Properties at the Command Line

When Bundlor is run from the command line it will use all the properties available as system properties, this does not include any environment variables. The command line script will pass through any variables passed in via `-D` so the following will provide the `${com.springsource.kernel}` property with a value of '2.0.0.RELEASE' and the `${name}` property with a value of 'Kernel test bundle'.

bundlor.sh \\
        transform \\
        --bundle ./org.springframework.integration.jar \\
        --manifest ./template.mf \\
        --outputfile ./target/org.springframework.integration.jar \\
        -Dcom.springsource.kernel=2.0.0.RELEASE \\
        -Dname="Kernel test bundle"

### Specifying Properties with Maven

To pass properties in to Bundlor from a Maven build you should define a new (or add to an existing) properties element under the project element in the Maven project file.

<properties>
    <name>${project.name}</name>
    <com.springsource.kernel>2.0.0.RELEASE</com.springsource.kernel>
</properties>

This would run Bundlor with a substitution value for `${com.springsource.kernel}` of '2.0.0.RELEASE' and a substitution value for `${name}` of the name of the Maven project.

### Specifying Properties with Ant

When calling the Bundlor task from Ant an extra property can be provided on the task that passes in an Ant Property Set which will be passed on to Bundlor.

<bundlor:bundlor>
    bundlePath="${basedir}/org.springframework.integration.jar"
    outputPath="${basedir}/target/org.springframework.integration.jar"
    bundleVersion="2.0.0.BUILD-${timestamp}"
    manifestTemplatePath="${basedir}/template.mf">
    <propertyset>
        <property name="name" value="${ant.project.name}"/>
        <property name="com.springsource.kernel" value="2.0.0.RELEASE"/>
    </propertyset>
</bundlor:bundlor>

This would run Bundlor and provide a substitution value for `${com.springsource.kernel}` of '2.0.0.RELEASE' and a substitution value for `${name}` of the name of the Ant project.

## Version Expansion

Property substitution can take place anywhere in the values of a Manifest Template. It can even be used to substitute 'Import-Template' versions. On their own, a single version in an import isn't very useful as it is rather restrictive, but automatically expanding a version into a version range is useful. A version expansion pattern can be given after a colon that will be applied to the version to generate a version range.

Import-Template: com.springsource.kernel.\*;version="${com.springsource.kernel:\[=.=.=.=, +1.0.0)}",
 org.apache.commons.logging.\*;version="${org.apache.commons.logging:\[=.=.=.=, =.=.+1)}"

Version expansion works on a variable that holds a legal OSGi version number. Based on that version number, the expansion breaks into 4 parts, the major, minor, micro, and qualifier. If the supplied property is not a valid OSGi version then Bundlor will fail with an exception stating that the supplied property was not a valid version string.

The first three segments of this version number can be substituted in the expansion as follows:

\=

Equal to the value from the variable

\[+/-\]n

Adjust the value from the variable by this amount

n

Substitute this value for the one in the variable. This will typically only be used for putting in a 0

The fourth segment (qualifier) can only take the following substitutions:

\=

Equal to the value from the variable

Any legal qualifier value.

Substitute this value for the one in the variable

  
So for the example above, the generated version range for `${com.springsource.kernel}` and a given version of 1.2.0 would be \[1.2.0, 2.0.0). This means the highest version available from 1.2.0 to (but not including) 2.0.0 will be used. For `${org.apache.commons.logging}` and a given version of 1.4.0 the generated version range would be \[1.4.0, 1.4.1), this is a lot more restrictive as it will only let changes to the qualifier of version 1.4.0 and will not let versions from 1.4.1.xxx and upwards be used.

### Naming

If a pattern is going to be used for several imports then it can be specified with a name and used many times. A new header is used in the Template Manifest to specify the named version expansion patterns.

Import-Template: 
 org.apache.commons.codec.\*;version="${org.apache.commons.codec:apache}",
 org.apache.commons.logging.\*;version="${org.apache.commons.logging:apache}",
 org.hibernate.\*;version="${org.hibernate:hibernate}"
 org.myorg.\*;version="${org.myorg:(=.=.=.=, =.+1.0.=\]}"

Version-Patterns: 
 apache;pattern="\[=.=.=.=, +1.0.0)",
 hibernate;pattern="\[=.=.=.=, =.=.+1)"

This shows multiple patterns being defined and being used for multiple imports. The apache pattern will give a version range from the one provided up to but not including the next major version. The hibernate pattern will give a version range of the one provided up to but not including the next micro version. There is also an import defined with an in-line version expansion pattern which can be used along with named patterns just fine in the same template. The in-line pattern shows a more unusual usage. It will create a version range from, but not including, the provided version up to and including the next minor version with the same qualifier.

## Conclusion

Using these techniques together, the generation of reliable manifests is possible. Proper use of Version Expansion will ensure that the generated manifests are restrictive enough to stop unwanted wiring but flexible enough to allow minor changes through. When writing the Template Manifest a pragmatic approach should be taken for each bundle concerned as not all bundles are versioned with the same approach.