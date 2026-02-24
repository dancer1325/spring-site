---
title: Querying and Downloading from Amazon S3
source: https://spring.io/blog/2007/04/30/querying-and-downloading-from-amazon-s3
scraped: 2026-02-24T09:30:10.820Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  April 30, 2007 | 0 Comments
---

# Querying and Downloading from Amazon S3

_Engineering | Ben Hale |  April 30, 2007 | 0 Comments_

In a [previous post](http://blog.interface21.com/main/2007/04/25/uploading-to-amazon-s3-using-a-custom-ant-task), I described how we use a custom ANT task to upload nightly snapshots from the ANT based projects in the Spring portfolio. In this post I'll describe how we use Amazon S3 to generate pages for the snapshots from each project and allow users to download the snapshots.

As I mentioned in the previous post, S3 is primarily used as a REST-ful service. This means that while I used Java for the upload portion, I was free to use other languages for the download portion. I chose to use PHP in this case because it was already available on the server I was working with, and was the path of least resistance.

There were two parts for this effort. The first was that I needed to query the Amazon S3 service for the list of snapshots for a given Spring project. To do this, you create a REST query with a prefix parameter:

```html
Copy
http://s3.amazonaws.com/static.springframework.org/?prefix=$prefix
```

Now that you've seen the basic way to query, I want to go back to the previous example and point out some important parts of the upload definition:

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

The first thing that you'll notice is that for the Spring artifacts, I've chosen to prefix them with SPR. The name of the file is essentially free form, so using slashes, you can create a virtual directory structure to query against. If you take a look at the builds for Spring Web Flow, you'll see its artifacts are prefixed with SWF, Spring LDAP's artifacts get LDAP, and Spring Modules' artifacts get MOD. So now by customizing our query parameters, we can choose one project specifically.

```html
Copy
http://s3.amazonaws.com/static.springframework.org/?prefix=SPR
```

```html
Copy
http://s3.amazonaws.com/static.springframework.org/?prefix=SWF
```

```html
Copy
http://s3.amazonaws.com/static.springframework.org/?prefix=LDAP
```

```html
Copy
http://s3.amazonaws.com/static.springframework.org/?prefix=MOD
```

The second thing to notice is the publicRead=true declaration. By default, S3 does not allow anyone to view or download from your bucket. You can give them permission by using your secret and access keys to create a token that will allows downloads. For this effort though, I deemed that unnecessary. The snapshots are publicly accessible, so I loosened the security and allowed them to be downloadable without the token.

Now you can call the S3 REST service and get a properly filtered list of items in the bucket, but the response is in raw XML. Even though I'm a Spring developer, looking through raw XML in a web browser doesn't excite me. ;) So the next step in the process is to transform the XML into a useful HTML page. I had two choices at this point. I could execute the transform on the server to generate HTML and then return it to the user, or I could return the XML to the user along with an XSLT file and let the users browser do the transform for me. Now I'll be honest, the latter lightens the load on the server and actually allows the user's browser to cache the transform for performance. But the reality is, I just didn't have access to the XSLT PHP libraries so I couldn't do the server-side transform if I wanted to. I realize that some older browsers will have trouble with this setup, but we'll cross that bridge when we get to it.

So I needed to take the returned XML:

```xml
Copy
<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
	<Name>static.springframework.org</Name>
	<Prefix>SPR</Prefix>
	<Marker/>
	<MaxKeys>1000</MaxKeys>
	<IsTruncated>false</IsTruncated>
	<Contents>
		<Key>SPR/spring-framework-2.0.5-20070411-50.zip</Key>
		<LastModified>2007-04-11T13:27:34.000Z</LastModified>
		<ETag>"1ab20ad18ca0edb4a360279f27409d54"</ETag>
		<Size>10725241</Size>
		<StorageClass>STANDARD</StorageClass>
	</Contents>
	<Contents>
		<Key>SPR/spring-framework-2.0.5-20070411-51.zip</Key>
		<LastModified>2007-04-12T01:25:58.000Z</LastModified>
		<ETag>"de2e5833ae8fe4cc06987935bea06e57"</ETag>
		<Size>10727049</Size>
		<StorageClass>STANDARD</StorageClass>
	</Contents>
	<Contents>
		<Key>SPR/spring-framework-2.0.5-20070412-52.zip</Key>
		<LastModified>2007-04-13T01:22:23.000Z</LastModified>
		<ETag>"414b947226fc4e08bd118e0f16a6be67"</ETag>
		<Size>10736732</Size>
		<StorageClass>STANDARD</StorageClass>
	</Contents>
...
```

and turn it into HTML:

![snapshot-download.png](http://blog.interface21.com/main/wp-content/uploads/2007/04/snapshot-download.png)

Most of the content returned from the service isn't useful to this effort, and so the XSLT becomes very simple:

```xml
Copy
<xsl:template match="/">
	<head>
		<style type="text/css" media="all">@import "./snapshot-download.css";</style>
	</head>
	<body>
		<xsl:apply-templates select="s3:ListBucketResult"/>
	</body>
</xsl:template>

<xsl:template match="s3:ListBucketResult">
	<xsl:variable name="bucket-name" select="s3:Name"/>
	<table>
		<tr>
			<th class="name"><xsl:value-of select="s3:Prefix"/> Project Snapshots</th>
			<th class="size">Size</th>
		</tr>
		<xsl:for-each select="s3:Contents">
			<tr>
				<td class="name">
					<a class="name" href="http://s3.amazonaws.com/{$bucket-name}/{s3:Key}">
						<xsl:value-of select="substring-after(s3:Key, '/')"/>
					</a>
				</td>
				<td class="size"><xsl:value-of select="format-number(s3:Size div 1048576, '###,###.0')"/> MB</td>
			</tr>
		</xsl:for-each>
	</table>
</xsl:template>
```

The transform starts with some HTML declarations and then iterates over each of the bucket's items. Then it uses the object identifier to create a link to the file on the S3 servers. That's it. The PHP page calls S3 for the XML and then passes it along with an XSLT declaration to the user's browser:

```php
Copy
<?php
$prefix = $HTTP_GET_VARS["project"];
$url = "http://s3.amazonaws.com/static.springframework.org/?prefix=$prefix";
$xml = file_get_contents($url);

header('Content-Type: text/xml; charset=UTF-8');
echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<?xml-stylesheet type="text/xsl" href="./snapshot-download.xsl"?>';
echo substr($xml, 39);
?>
```

Add a little customization for each project with a request parameter and you get individual download pages for each project:

-   [http://static.springframework.org/downloads/nightly/snapshot-download.php?project=SPR](http://static.springframework.org/downloads/nightly/snapshot-download.php?project=SPR)
-   [http://static.springframework.org/downloads/nightly/snapshot-download.php?project=SWF](http://static.springframework.org/downloads/nightly/snapshot-download.php?project=SWF)
-   [http://static.springframework.org/downloads/nightly/snapshot-download.php?project=LDAP](http://static.springframework.org/downloads/nightly/snapshot-download.php?project=LDAP)
-   [http://static.springframework.org/downloads/nightly/snapshot-download.php?project=MOD](http://static.springframework.org/downloads/nightly/snapshot-download.php?project=MOD)

This completes my exploration of the Amazon S3 service. I can say from experience now that if you have a ton of data and a lot of bandwidth needs there aren't many places that will give you better rates. And with the REST-ful interface, it's flexible enough to use with your favorite language. Thank you for having me, and I'll take any questions now. :)