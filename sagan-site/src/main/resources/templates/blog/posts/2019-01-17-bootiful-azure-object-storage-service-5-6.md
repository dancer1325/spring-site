---
title: Bootiful Azure: Object Storage Service (5/6)
source: https://spring.io/blog/2019/01/17/bootiful-azure-object-storage-service-5-6
scraped: 2026-02-23T15:00:32.605Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 17, 2019 | 0 Comments
---

# Bootiful Azure: Object Storage Service (5/6)

_Engineering | Josh Long |  January 17, 2019 | 0 Comments_

> This is part 5 of a 6 part series, with new posts Mondays and Thursdays, introducing Microsoft Azure for Spring developers. I couldn't have put this together without input from Microsoft's Asir Vedamuthu Selvasingh, Yitao Dong, Bruno Borges, Brian Benz and Theresa Nguyen. You can find the code for this series [on Github](https://github.com/joshlong/bootiful-azure-article). Hit me up on [Twitter (@starbuxman)](http://twitter.com/Starbuxman) as you're reading the installments with any feedback or questions. You can also learn more about Microsoft Azure in my [Spring Tips (@SpringTipsLive)](http://twitter.com/SpringTipsLive) installment, [*Bootiful Azure*](https://spring.io/blog/2018/12/05/spring-tips-bootiful-microsoft-azure)

Here are all the installments:

-   [Bootiful Azure: Taking Your First Steps with Microsoft Azure](https://spring.io/blog/2019/01/03/bootiful-azure-taking-your-first-steps-with-microsoft-azure-1-6)
-   [Bootiful Azure: SQL-based data access with Microsoft SQL Server](https://spring.io/blog/2019/01/07/bootiful-azure-sql-based-data-access-with-microsoft-sql-server-2-6)
-   [Bootiful Azure: Global Scale Data Access with CosmosDB](https://spring.io/blog/2019/01/10/bootiful-azure-global-scale-data-access-with-cosmosdb-3-6)
-   [Bootiful Azure: Integration with Azure Service Bus](https://spring.io/blog/2019/01/14/bootiful-azure-integration-with-azure-service-bus-4-6)
-   [Bootiful Azure: Object Storage Service](https://spring.io/blog/2019/01/17/bootiful-azure-object-storage-service-5-6)
-   [Bootiful Azure: To Production!](https://spring.io/blog/2019/01/21/bootiful-azure-to-production-6-6)

Now let's turn to something a bit more... mundane. Something that you, ideally, won't even think about all that often. Applications often have storage requirements: they may need to store uploaded user content (binary data like pictures or documents), generated artifacts like PDF files, videos, music, etc. They might want to store logs. It's not hard to think of things an application might want to durably store.

These applications *could* use a filesystem, such as that on the local machine or a network attached filesystem like [NFS (network file system)](https://en.wikipedia.org/wiki/Network_File_System). I'll use NFS to generically refer to any network attached file system like Samba, NFS (those mounted with the NFS protocol) itself, or legacy options like DAC, FAL, etc. NFS options provide a filesystem-like interface to files, often in a hierarchical format. NFS options are interesting because they're like fileystems with which we're all familiar, and everybody knows how to work with filesystems, right? Surely, everything looks like the hierarchy expressed in Windows Explorer? Or macOS Finder? Except, they look nothing like each other...

Come to think of it, I had to say "like" when I said that NFS options are like filesystems. Some support more nuanced permissions models than others. Some support encoding and replication of metatadata attached to files and directories in the tree. Support support different speed guarantees for different operations; some filesystems may optimize for reads versus writes. Some might optimize for directory traversals. The client's perspective of a file read or write is different depending on the client used. (Is a write consistent on all replication nodes immediately?)

Even if we assumed all the filesystems to which we wanted to write were POSIX-friendly - you could use `int open(const char *path, int flags)` or `java.io.File` - this may not be the case for our clients. What if the client doesn't "speak" filesystem, and would prefer to manipulate the data in some other way? What if the client can only speak HTTP? Or if it wanted to speak Bittorrent for more efficient consolidation of downloads through peer-to-peer networks?

For these reasons, and more, Amazon Web Services introduced S3, the Simple Cloud Storage Service (get it? "S" times 3? "S3"?) which has since been something of a prevailing standard that all other cloud vendors need to support. For Microsoft Azure, the Object Storage Service (OSS) is the thing that provides an S3-like experience. It is not a POSIX filesystem. You can use its API directly, as we will here, but it's [also possible to use the S3Proxy to proxy writes to OSS](https://www.microsoft.com/developerblog/2016/05/22/access-azure-blob-storage-from-your-apps-using-s3-api/) using an AWS S3 client, of which there are countless! Azure's Object Storage Service truly is *boring* which is exactly what you want when dealing with something so fundamental as persistant volumes of file-like data. It even offers a standalone browser called [the Microsoft Azure Storage Explorer](https://azure.microsoft.com/en-us/features/storage-explorer/) which runs (yep!) on Linux, Macintosh and Windows. That standalone browser lets you interrogate OSS stores *as well as* CosmosDB data. How's that for convenient? You can of course use the `az` CLI or the API itself. We're going to use the Spring integration for the Java API.

## [](#configuring-azure-object-storage-service)Configuring Azure Object Storage Service

You've got to create an Azure Object Storage Service account (`bootiful`) assigned to the existing resource group `bootiful`. Then, create a storage container (`files`) assigned to the just-created storage account. Here's a sample script.

```shell
Copy#!/usr/bin/env bash

rg=$1
accountname=bootiful

az storage account create --name ${accountname} --resource-group ${rg}
az storage container create -n files --account-name ${accountname}
```

Use the following command to ascertain the connection string required to connect to the application.

```shell
Copyaz storage account show-connection-string --resource-group bootiful --name bootiful
```

Note the connection string for later.

## [](#introducing-azure-object-storage-service-into-your-spring-application)Introducing Azure Object Storage Service into your Spring Application

Add `com.microsoft.azure`: `azure-storage-spring-boot-starter` to your application's build file. Make sure you've specified the OSS connection string for the `azure.storage.connection-string` property.

We'll read the bytes for an image of a cat in our application's `src/main/resources` directory and then write those bytes to the Object Storage Service as a "block blog". There are other interfaces through which you can talk to OSS, but for our purposes it's very natural to think about it as an ensemble of "containers" (logical groupings of things, almost like a directory or a bucket in S3 parlance) and "blobs." A blob is a file, basically, with a name and metadata associated with it. All that the following example does is store the bytes for a photo of a cat into a container called `files` under a random name prefixed with `cat-` and suffixed with `.jpg`.

```java
Copypackage com.example.bootifulazure;

import com.microsoft.azure.storage.CloudStorageAccount;
import com.microsoft.azure.storage.StorageException;
import com.microsoft.azure.storage.blob.CloudBlobContainer;
import com.microsoft.azure.storage.blob.CloudBlockBlob;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.UUID;

@Log4j2
@Component
class ObjectStorageServiceDemo {

    private final CloudStorageAccount cloudStorageAccount;
    private final Resource resource;
    private final CloudBlobContainer files;

    ObjectStorageServiceDemo(
        CloudStorageAccount csa,
        @Value("classpath:/cat.jpg") Resource cat) throws URISyntaxException, StorageException {
        this.resource = cat;
        this.cloudStorageAccount = csa;
        this.files = this.cloudStorageAccount
            .createCloudBlobClient()
            .getContainerReference("files");
    }

    @EventListener(ApplicationReadyEvent.class)
    public void demo() throws Exception {
        CloudBlockBlob blockBlobReference = this.files.getBlockBlobReference("cat-" + UUID.randomUUID().toString() + ".jpg");
        try (InputStream in = this.resource.getInputStream()) {
            blockBlobReference.upload(in, this.resource.contentLength());
            log.info("uploaded blockblob to " + blockBlobReference.getStorageUri());
        }

    }
}
```

The Microsoft Azure-specific bits are less than trivial. We obtain a reference to a container and then write to it and then log out the addressable URI of the resource. How *mundane*! And that's exactly what you want in a computing system primitive like a filesystem. It should be *mundane*. To be very honest, I was more pleased with getting to use Java 7's try-with-resources syntax for the `Autocloseable` `InputStream` reference!