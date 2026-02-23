---
title: Introducing Spring Sync
source: https://spring.io/blog/2014/10/22/introducing-spring-sync
scraped: 2026-02-23T22:11:07.347Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Craig Walls |  October 22, 2014 | 19 Comments
---

# Introducing Spring Sync

_Engineering | Craig Walls |  October 22, 2014 | 19 Comments_

Earlier today, I announced the first milestone release of Spring Sync, a new project that addresses efficient communication between client applications and Spring backends by employing patch-based exchanges. As this is a new project, I thought it would be a good time to show you what Spring Sync can do.

The examples given here refer to the [Spring REST Todos](https://github.com/spring-projects/spring-sync-samples/tree/master/spring-rest-todos) example and/or the `Todo` class in that example project.

## [](#creating-and-applying-patches)Creating and applying patches

At its lowest level, Spring Sync provides a library for producing and applying patches to Java objects. The `Patch` class is the centerpiece of this library, capturing the changes that can be applied to an object to bring it in sync with another object.

The `Patch` class aims to be generic, not associated directly with any particular representation of a patch. That said, it is inspired by [JSON Patch](https://tools.ietf.org/html/rfc6902) and Spring Sync provides support for creating and serializing `Patch` instances as JSON Patch. Future versions of Spring Sync may include support for other patch representations.

The easiest way to create a patch is to perform a difference between two Java objects:

```java
CopyTodo original = ...;
Todo modified = ...;
Patch patch = Diff.diff(original, modified);
```

Here, the `Diff.diff()` method will compare the two `Todo` objects and produce a `Patch` that describes the difference between them.

Once you have a `Patch`, it can be applied to an object by passing in the object to the `apply()` method:

```java
CopyTodo patched = patch.apply(original, Todo.class);
```

Note that the `diff()` and `apply()` methods are the inverse of each other. Therefore, the patched `Todo` in these examples should be identical to the modified `Todo` after applying the patch to the original.

As I mentioned, `Patch` is decoupled from any particular patch representation. But Spring Sync offers `JsonPatchMaker` as a utility class to convert `Patch` objects to/from Jackson `JsonNode` instances where the `JsonNode` is an `ArrayNode` containing zero or more operations per the JSON Patch specification. For example, to convert a `Patch` to a `JsonNode` containing JSON Patch:

```java
CopyJsonNode jsonPatchNode = JsonPatchMaker.toJsonNode(patch);
```

Similarly, a `Patch` object can be created from a `JsonNode` like this:

```java
CopyPatch patch = JsonPatchMaker.fromJsonNode(jsonPatchNode);
```

Note that `JsonPatchMaker` is a temporary solution to (de)serializing `Patch` objects to/from JSON Patch. It will be replaced with a more permanent solution in a later release.

## [](#applying-differential-synchronization)Applying Differential Synchronization

Creating patches requires that you have both before and after instances of an object from which to calculate the difference. Although it doesn't refer to them as "before" and "after", the [Differential Synchronization](https://neil.fraser.name/writing/sync/eng047-fraser.pdf) algorithm described in a paper by Neil Fraser essentially defines a controller manner by which patches can be created, shared, and applied between two or more network nodes (perhaps client and server, but not necessarily applicable only to client-server scenarios).

When applying Differential Synchronization, each node maintains two copies of a resource:

-   The local node's own working copy that it may change.
-   A shadow copy which is the local node's understanding of what a remote node's working copy looks like.

The node may make any changes it needs to it's local copy of the resource. Periodically, the node will produce a patch by comparing the local node with the shadow copy it maintains for the remote node. It then sends the patch to the remote node. Once the patch is sent, the node copies its local copy over the shadow, assuming that the remote node will apply the patch and therefore its understanding of the remote node's resource is in sync with the local resource.

Upon receiving a patch, a node must apply the patch to the shadow that it keeps for the node that sent the patch and to its own local copy (which may have had changes itself).

Spring Sync supports Differential Synchronization through its `DiffSync` class. To create a `DiffSync`, you must supply it with a `ShadowStore` and the object type that it can apply patches for:

```java
CopyShadowStore shadowStore = new MapBasedShadowStore();
shadowStore.setRemoteNodeId("remoteNode");
DiffSync diffSync = new DiffSync(shadowStore, Todo.class);
```

Once you have a `DiffSync` in hand, you can use it to apply a `Patch` to an object:

```java
CopyTodo patched = diffSync.apply(patch, todo);
```

The `apply()` method will apply the patch to both the given object as well as the shadow copy of that same object. If no shadow copy has yet been created, it will create one by deep-cloning the given object.

The `ShadowStore` is where `DiffSync` maintains its copy of shadow copies for a remote node. For any given node, there may be multiple shadow stores, one for each remote node it deals with. As you can see in the example, its `remoteNodeId` property is set to uniquely identify the remote node. In a client-server topology, the server may use the session ID to identify the remote node. Meanwhile, the clients (which are probably only sharing the resource with one central server) may use any identifier they want to identify the server node.

`DiffSync` can also be used to create a `Patch` from a stored shadow copy:

```java
CopyPatch patch = diffSync.diff(todo);
```

When creating a patch, the stored shadow will be retrieved from the `ShadowStore` and compared with the given object. In keeping with the Differential Synchronization flow, the given object will be copied over the shadow once the patch is produced.

It's worth noting that `DiffSync` works with `Patch` objects which are decoupled from any particular patch representation. Therefore, `DiffSync` itself is decoupled from the patch representation as well.

## [](#taking-diffsync-to-the-web)Taking DiffSync to the web

Creating and applying patches on a single node is somewhat pointless. Where Differential Synchronization really shines is when two or more nodes are sharing and manipulating the same resource and you need each node to remain in sync (as much as is reasonable). Therefore, Spring Sync also offers `DiffSyncController` a Spring MVC controller that handles [HTTP PATCH](http://tools.ietf.org/html/rfc5789) requests, applying Differential Synchronization to a resource.

The easiest way to configure `DiffSyncController` is to create a Spring configuration class that is annotated with `@EnableDifferentialSynchronization` and extend the `DiffSyncConfigurerAdapter` class:

```java
Copy@Configuration
@EnableDifferentialSynchronization
public class DiffSyncConfig extends DiffSyncConfigurerAdapter {

	@Autowired
	private PagingAndSortingRepository<Todo, Long> repo;
	
	@Override
	public void addPersistenceCallbacks(PersistenceCallbackRegistry registry) {
		registry.addPersistenceCallback(new JpaPersistenceCallback<Todo>(repo, Todo.class));
	}
	
}
```

Among other things, `@EnableDifferentialSynchronization` declares a `DiffSyncController` bean, providing it with a `PersistenceCallbackRegistry` and a `ShadowStore`.

The `PersistenceCallbackRegistry` is a registry of `PersistenceCallback` objects through which `DiffSyncController` will retrieve and persist resources it patches. The `PersistenceCallback` interface enables `DiffSyncController` to be decoupled from the application-specific persistence choices for the resource. As an example, here's an implementation of `PersistenceCallback` that works with a [Spring Data](http://projects.spring.io/spring-data/) `CrudRepository` to persist `Todo` objects:

```java
Copypackage org.springframework.sync.diffsync.web;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.sync.diffsync.PersistenceCallback;

class JpaPersistenceCallback<T> implements PersistenceCallback<T> {
	
	private final CrudRepository<T, Long> repo;
	private Class<T> entityType;

	public JpaPersistenceCallback(CrudRepository<T, Long> repo, Class<T> entityType) {
		this.repo = repo;
		this.entityType = entityType;
	}
	
	@Override
	public List<T> findAll() {
		return (List<T>) repo.findAll();
	}
	
	@Override
	public T findOne(String id) {
		return repo.findOne(Long.valueOf(id));
	}
	
	@Override
	public void persistChange(T itemToSave) {
		repo.save(itemToSave);
	}
	
	@Override
	public void persistChanges(List<T> itemsToSave, List<T> itemsToDelete) {
		repo.save(itemsToSave);
		repo.delete(itemsToDelete);
	}

	@Override
	public Class<T> getEntityType() {
		return entityType;
	}
	
}
```

As for the `ShadowStore` given to `DiffSyncController`, it will be a `MapBasedShadowStore` by default. But you can override the `getShadowStore()` method from `DiffSyncConfigurerAdapter` to specify a different shadow store implementation. For example, you may configure a Redis-based shadow store like this:

```java
Copy@Autowired
private RedisOperations<String, Object> redisTemplate;

@Override
public ShadowStore getShadowStore() {
	return new RedisShadowStore(redisTemplate);
}
```

Regardless of which implementation of `ShadowStore` you choose, a session-scoped bean will be declared, ensuring that each client will receive their own instance of the shadow store.

As it handles PATCH requests, `DiffSyncController` will apply one cycle of the Differential Sychronization flow:

1.  It will apply the patch to the server copy of the resource and to the shadow copy for the client who sent the PATCH.
2.  It will create a new patch by comparing its local resource with the shadow copy.
3.  It will replace the shadow copy with the local copy of the resource.
4.  It will send the new patch on the response to the client.

Just like `Patch` and `DiffSync`, `DiffSyncController` is decoupled from any particular patch format. Spring Sync does provide `JsonPatchHttpMessageConverter`, however, so that `DiffSyncController` can receive and response with JSON Patch-formated patches, given "application/json-patch+json" as the content type.

## [](#conclusion)Conclusion

As you've seen here, Spring Sync aims to provide a means of efficient communication and synchronization between a client and a server (or any set of nodes that share a resource). It provides low-level support for producing and applying patches as well as higher-level support for working with Differential Synchronization. Although it comes with support for JSON Patch, it is largely independent of any specific patch format.

This is just the beginning. Among other things, we're looking to...

-   Complement `DiffSyncController`'s HTTP-based Differential Synchronization with WebSocket/STOMP for full-duplex patch communication.
-   Continued refinement of the Differential Synchronization implementation to support resource versioning and other techniques to avoid patching conflicts.
-   Support for using Spring Sync in client-side Android applications.

Keep an eye on the project and let us know what you think. Feel free to [submit bug reports and improvements](https://github.com/spring-projects/spring-sync/issues) and we certainly welcome you to [fork the code](https://github.com/spring-projects/spring-sync) and submit pull requests.

If you'd like to read more about Spring Sync, then have a look at these resources:

-   [Differential Sychronization and JSON Patch](http://www.slideshare.net/briancavalier/differential-sync-and-json-patch-s2-gx-2014) : The presentation that Brian Cavalier and I gave at SpringOne/2GX in September.
-   [Streaming JSON Patch from Spring to a React UI](https://spring.io/blog/2014/10/08/streaming-json-patch-from-spring-to-a-react-ui) : An article by Brian Cavalier that leverages Spring Sync on the server-side for producing patches.
-   [Spring REST Todos](https://github.com/spring-projects/spring-sync-samples/tree/master/spring-rest-todos) : An Todos list example employing Spring Sync on the server with [jiff.js](https://github.com/cujojs/jiff) and [fabulous.js](https://github.com/briancavalier/fabulous) on the client.