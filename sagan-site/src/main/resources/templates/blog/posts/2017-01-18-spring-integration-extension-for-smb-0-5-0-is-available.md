---
title: Spring Integration Extension for SMB 0.5.0 is Available
source: https://spring.io/blog/2017/01/18/spring-integration-extension-for-smb-0-5-0-is-available
scraped: 2026-02-23T18:42:58.723Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  January 18, 2017 | 1 Comment
---

# Spring Integration Extension for SMB 0.5.0 is Available

_Releases | Artem Bilan |  January 18, 2017 | 1 Comment_

On behalf of the Spring Integration team I’d like to announce release of one more Spring Integration Extension. This time it is Spring Integration for [Server Message Block](https://en.wikipedia.org/wiki/Server_Message_Block) and its artifact is `spring-integration-smb.0.5.0.RELEASE`, which is available in the [Release Repository](https://repo.spring.io/release/) and Maven Central.

The project has been around for some time but only recently gained enough community traction to warrant a release. So, first of all, big thanks to you, the community, for your contributions!

The [Java CIFS Client Library](https://jcifs.samba.org/) has been chosen as a Java implementation for the CIFS/SMB networking protocol. Its `SmbFile` abstraction is simply wrapped to the Spring Integration "Remote File" foundations like `SmbSession`, `SmbRemoteFileTemplate` etc.

The SMB Channel Adapters and support classes implementations are fully similar to existing components for [(S)FTP](http://docs.spring.io/spring-integration/reference/html/ftp.html) or [AWS S3](https://github.com/spring-projects/spring-integration-aws) protocols. So, if you familiar with those components, it is pretty straightforward to use this extension. But any way here are several words about existing components:

## [](#smb-inbound-channel-adapter)[](#smb-inbound-channel-adapter)SMB Inbound Channel Adapter

To download SMB files locally the `SmbInboundFileSynchronizingMessageSource` is provided. It is simple extension of the `AbstractInboundFileSynchronizingMessageSource` which requires `SmbInboundFileSynchronizer` injection. For filtering remote files you still can use any existing `FileListFilter` implementations, but particular `SmbRegexPatternFileListFilter` and `SmbSimplePatternFileListFilter` are provided. For XML configuration the `<int-smb:inbound-channel-adapter>` component is provided.

## [](#smb-outbound-channel-adapter)[](#smb-outbound-channel-adapter)SMB Outbound Channel Adapter

There is no (yet) some SMB specific requirements for files transferring to SMB, so for XML `<int-smb:outbound-channel-adapter>` component we simply reuse an existing `FileTransferringMessageHandler`. In case of Java configuration that `FileTransferringMessageHandler` should be supplied with the `SmbSessionFactory` (or `SmbRemoteFileTemplate`) and that all!

```
Copy@ServiceActivator(inputChannel = "storeToSmb")
@Bean
public MessageHandler smbMessageHandler(SmbSessionFactory smbSessionFactory) {
    FileTransferringMessageHandler<SmbFile> handler =
                new FileTransferringMessageHandler<>(smbSessionFactory);
    handler.setRemoteDirectoryExpression(
                new LiteralExpression("remote-target-dir"));
    handler.setFileNameGenerator(m ->
                m.getHeaders().get(FileHeaders.FILENAME, String.class) + ".test");
    handler.setAutoCreateDirectory(true);
    return handler;
}
```

We would like to hear any feedback from the Community before we go straight forward to the `1.0.0.RELEASE`, so, do not hesitate to contact with us via any available communication channel!

[Project Page](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-smb) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)