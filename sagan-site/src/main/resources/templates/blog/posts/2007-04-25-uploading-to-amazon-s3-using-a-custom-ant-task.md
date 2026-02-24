---
title: Uploading to Amazon S3 using a custom ANT task
source: https://spring.io/blog/2007/04/25/uploading-to-amazon-s3-using-a-custom-ant-task
scraped: 2026-02-24T09:30:15.330Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  April 25, 2007 | 1 Comment
---

# Uploading to Amazon S3 using a custom ANT task

_Engineering | Ben Hale |  April 25, 2007 | 1 Comment_

One of the interesting side effects of a solid CI structure is that when things are running reliably, new problems start to crop up. Shortly after Spring's CI system started running smoothly, our occasional space and bandwidth issues on static.springframework.org became more pronounced. Colin Sampaleanu had done research earlier on how to alleviate some of these problems and had settled on [Amazon S3](http://aws.amazon.com/s3).

Amazon S3 is part of the [Amazon Web Services](http://aws.amazon.com) umbrella and provides an incredibly cheap online file storage service. What does 'incredibly cheap' mean? Well, from the website, it appears that 1 GB\*month of storage costs US$0.15 and 1 GB of bandwidth costs US$0.20. Add to that, a high-bandwidth transparent mirroring service, and S3 becomes very appealing for storing our nightly snapshots. On a tangent, Amazon actually uses the exact same infrastructure internally, so you know that there is a team of admins guaranteeing their five 9's promise.

To use S3 for our nightly snapshots, we first had to replace the old snapshot upload procedure that used scp. Looking around I didn't see any ANT tasks that uploaded to S3, so I set out to create my own. My target configuration was very simple:

```xml
Copy
<aws:s3 accessKey="${s3.accessKey}" secretKey="${s3.secretKey}">
	<upload bucketName="static.springframework.org"
		file="${target.release.dir}/${release-with-dependencies.zip}"
		toFile="SPR/spring-framework-${spring-version}-with-dependencies-${tstamp}-${build.number}.zip"
		publicRead="true"/>
	<upload bucketName="static.springframework.org"
		file="${target.release.dir}/${release.zip}"
		toFile="SPR/spring-framework-${spring-version}-${tstamp}-${build.number}.zip"
		publicRead="true"/>
</aws:s3>
```

I wanted to be able to define a single S3 session governed by our access and secret keys (S3's cryptographic login) and execute multiple uploads in that definition. Each upload goes into a 'bucket' which is the only level of granularity S3 provides.

S3 itself is typically used as a REST-ful service, so it's easy to interact with. For this effort, I used a library called [jets3t](https://jets3t.dev.java.net/) (pronounced jet-set). For anyone using S3 with Java, this is the preferred way of using S3 (as far as I could tell, it's the only library endorsed by Amazon). Jets3t uses a similar paradigm to my XML definition (or maybe I used theirs?) in that you create a reference to the server and use that repeatedly to do multiple actions. In the ANT task, I create a set of credentials based on the access and secret keys and bind them into a reference to the service:

```java
Copy
AWSCredentials credentials = new AWSCredentials(accessKey, secretKey);
S3Service service = new RestS3Service(credentials);

for (Upload upload : uploads) {
	upload.upload(service);
}
```

As you can see, I've modularized the upload action, so that in the future if I need to expand the s3 task to do other things (downloading, setting permissions, etc) I can. The Upload object does the heavy lifting. It creates a reference to a bucket based on the bucketName, creates a reference to the new object based on the toFile value, and then uploads the contents of the file via HTTP.

```java
Copy
private S3Bucket getBucket() {
	return new S3Bucket(bucketName);
}
```

```java
Copy
private S3Object getObject() {
	S3Object object = new S3Object(toFile);
	if (publicRead) {
		object.setAcl(AccessControlList.REST_CANNED_PUBLIC_READ);
	}
	object.setDataInputFile(file);
	object.setContentLength(file.length());
	return object;
}
```

```java
Copy
S3Bucket bucket = getBucket();
S3Object object = getObject();
service.putObject(bucket, object);
```

In the actual code for this task, I've added some pretty output so that you can see how fast the file is uploaded and what the upload speed is:

upload-s3:
   \[aws:s3\] Uploading /opt/j2ee/domains/springframework.org/build/bamboo-home/xml-data/build-dir/
                SPR-NIGHTLY/spring/target/release/spring-framework-2.0.5-with-dependencies.zip (65132641B)
                to bucket static.springframework.org
   \[aws:s3\] Transfer Time: 34.0s - Transfer Rate: 1915665.9B/​s
   \[aws:s3\] Uploading /opt/j2ee/domains/springframework.org/build/bamboo-home/xml-data/build-dir/
                SPR-NIGHTLY/spring/target/release/spring-framework-2.0.5.zip (10752085B)
                to bucket static.springframework.org
   \[aws:s3\] Transfer Time: 6.0s - Transfer Rate: 1792014.1B/​s

The effort was so successful for us that we've expanded it all of the ANT based builds in the Spring portfolio. The Spring Framework, Spring LDAP, Spring Web Flow, and Spring Modules all now upload to this S3 nightly snapshot repository and on my list of things to do is to give some love to the Maven projects as well. The upshot to this is that we've freed up over 30GB of space and drastically reduced bandwidth usage all for about US$4.00 over the last two months.

Since I had to write some code to make this all work, I dropped it into our source control area. I also went ahead and put it up on our internal private Maven repo which is mirrored to the public Maven repo. If you're interested in seeing the code take a look in the [SVN repository](https://springframework.svn.sourceforge.net/svnroot/springframework/spring-aws/). If you'd like to use the ANT task you can grab it from Maven with a groupId of org.springframework.aws and an artifactId of spring-aws-ant. **Please note that this is totally unsupported and undocumented code!** What it does is very limited and there are no current plans to improve or document it in any way. If I get some spare time, that might change, but don't count on it :)

It appears that my flight is landing now, so I'll take this opportunity to finish up. Look for a following post that describes how we build the snapshot download pages so you can grab the snapshots directly from S3.