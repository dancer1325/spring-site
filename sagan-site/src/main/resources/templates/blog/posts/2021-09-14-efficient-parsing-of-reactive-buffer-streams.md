---
title: Efficient Parsing of Reactive Buffer Streams
source: https://spring.io/blog/2021/09/14/efficient-parsing-of-reactive-buffer-streams
scraped: 2026-02-23T13:14:30.018Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Arjen Poutsma |  September 14, 2021 | 0 Comments
---

# Efficient Parsing of Reactive Buffer Streams

_Engineering | Arjen Poutsma |  September 14, 2021 | 0 Comments_

It has been a while since Spring Framework 5.3 was released. One of the features in that release was a [major overhaul of our Reactive Multipart support](https://github.com/spring-projects/spring-framework/issues/21659). In this blog post, we share some of the knowledge learned while working on this feature. Specifically, we focus on finding a token within a stream of byte buffers.

## [](#multipart-form-data)[](#multipart-form-data)Multipart Form Data

Whenever you upload a file, your browser sends it — and other fields in the form — to the server as a `multipart/form-data` message. The exact format of these messages is described in [RFC 7578](https://datatracker.ietf.org/doc/html/rfc7578). If you submit a simple form with a single text field called `foo` and a file selector called `file`, the `multipart/form-data` message looks something like this:

```
CopyPOST / HTTP/1.1
Host: example.com
Content-Type: multipart/form-data;boundary="boundary" (1)

--boundary (2)
Content-Disposition: form-data; name="foo" (3)

bar
--boundary (4)
Content-Disposition: form-data; name="file"; filename="lorum.txt" (5)
Content-Type: text/plain

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis metus id vestibulum nullam.

--boundary-- (6)
```

1.  The `Content-Type` header of the message contains the `boundary` parameter.
    
2.  The boundary is used to start the first part. It is preceded by `--`.
    
3.  The first part contains the value of the text field, `foo`, as can be seen in the part headers. The value of the field is `bar`.
    
4.  The boundary is used to separate between the first and second part. Again, it is preceded by `--`.
    
5.  The second part contains the contents of the submitted file, named `lorum.txt`.
    
6.  The end of the message is indicated by the boundary. It is preceded and followed by `--`.
    

### [](#finding-the-boundaries)[](#finding-the-boundaries)Finding the Boundaries

The boundary in a `multipart/form-data` message is quite important. It is specified as a parameter of the `Content-Type` header. When preceded by two hyphens (`--`), the boundary indicates the beginning of a new part. When also followed by `--`, the boundary indicates the end of the message.

Finding the boundary in the stream of incoming byte buffers is key when parsing multipart messages. Doing so seems simple enough:

```
Copyprivate int indexOf(DataBuffer source, byte[] target) {
  int max = source.readableByteCount() - target.length + 1;
  for (int i = 0; i < max; i++) {
    boolean found = true;
    for (int j = 0; j < target.length; j++) {
      if (source.getByte(i + j) != target[j]) {
        found = false;
        break;
      }
    }
    if (found) {
      return i;
    }
  }
  return -1;
}
```

However, there is a complication:The boundary can be split across two buffers, which — in a Reactive environment — might not arrive at the same time. For example, given the sample multipart message shown earlier, the first buffer might contain the following:

```
CopyPOST / HTTP/1.1
Host: example.com
Content-Type: multipart/form-data;boundary="boundary"

--boundary
Content-Disposition: form-data; name="foo"

bar
--bou
```

While the next buffer contains the remainder:

```
Copyndary
Content-Disposition: form-data; name="file"; filename="lorum.txt"
Content-Type: text/plain

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis metus id vestibulum nullam.

--boundary--
```

If we inspect one buffer at the time, we can not find split boundaries like these. Instead, we need to find the boundary across multiple buffers.

One way to solve this problem would be to wait until all buffers have been received, [join them](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/io/buffer/DataBufferUtils.html#join-org.reactivestreams.Publisher-), and locate the boundaries afterwards. The following example does so, using a sample stream and the `indexOf` method defined earlier:

```
CopyFlux<DataBuffer> stream = Flux.just("foo", "bar", "--boun", "dary", "baz")
  .map(s -> factory.wrap(s.getBytes(UTF_8)));
byte[] boundary = "--boundary".getBytes(UTF_8);

Mono<Integer> result = DataBufferUtils.join(stream)
  .map(joined -> indexOf(joined, boundary));

StepVerifier.create(result)
  .expectNext(6)
  .verifyComplete();
```

Using Reactor’s `StepVerifier`, we see that the boundary starts at index 6.

There is one major downside to this approach: joining multiple buffers into one effectively stores the entire multipart message in memory. Multipart messages are primarily used to upload (large) files, so this is not a viable option. Instead, we need a smarter way to locate the boundary.

### [](#knuth-to-the-rescue)[](#knuth-to-the-rescue)Knuth to the Rescue!

Luckily, such a way exists in the form of the [Knuth–Morris–Pratt](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) algorithm. The main idea behind this algorithm is that if we already matched several bytes of the boundary but the next byte does not match, we do not need to restart the from the beginning. To do so, the algorithm maintains state, in the form of a position in a precomputed table that contains the number of bytes that can be skipped after a mismatch.

In Spring Framework, we have implemented the Knuth-Morris-Pratt algorithm in the [`Matcher`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/io/buffer/DataBufferUtils.Matcher.html) interface, which you can obtain an instance of through [`DataBufferUtils::matcher`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/io/buffer/DataBufferUtils.html#matcher-byte:A-). You can also check out the [source code](https://github.com/spring-projects/spring-framework/blob/d83fb099149bd9178ee7d103c6da1ea52152c1cc/spring-core/src/main/java/org/springframework/core/io/buffer/DataBufferUtils.java#L837).

Here, we use the `Matcher` to give us the end indices of `boundary` in `stream`, using the same sample input as earlier:

```
CopyFlux<DataBuffer> stream = Flux.just("foo", "bar", "--boun", "dary", "baz")
  .map(s -> factory.wrap(s.getBytes(UTF_8)));
byte[] boundary = "--boundary".getBytes(UTF_8);

DataBufferUtils.Matcher matcher = DataBufferUtils.matcher(boundary);
Flux<Integer> result = stream.map(matcher::match);

StepVerifier.create(result)
  .expectNext(-1)
  .expectNext(-1)
  .expectNext(-1)
  .expectNext(3)
  .expectNext(-1)
  .verifyComplete();
```

Note that the Knuth-Morris-Pratt algorithm gives the **end** index of the boundary, which explains the test results: the boundary does not end until index 3 in the second-to-last buffer.

As can be expected, Spring Framework’s `MultipartParser` makes heavy use of `Matcher`, for

-   [Finding the first boundary](https://github.com/spring-projects/spring-framework/blob/d83fb099149bd9178ee7d103c6da1ea52152c1cc/spring-web/src/main/java/org/springframework/http/codec/multipart/MultipartParser.java#L292) by looking for the boundary prefixed by `--`.
    
-   [Finding subsequent boundaries](https://github.com/spring-projects/spring-framework/blob/d83fb099149bd9178ee7d103c6da1ea52152c1cc/spring-web/src/main/java/org/springframework/http/codec/multipart/MultipartParser.java#L480) by looking for the boundary prefixed by `CRLF` (end of previous part) and `--`.
    
-   [Finding the `CRLF` `CRLF` separator](https://github.com/spring-projects/spring-framework/blob/d83fb099149bd9178ee7d103c6da1ea52152c1cc/spring-web/src/main/java/org/springframework/http/codec/multipart/MultipartParser.java#L369) between the part headers and part body.
    

If you need to find a series of bytes in a stream of byte buffers, give the `Matcher` a try!