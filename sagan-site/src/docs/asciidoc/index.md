# Overview

* [Spring projects](https://spring.io/projects)
  * TODO: check if it's removed -- by -- [these pages](../../main/resources/templates/projects)
  * project's
    * releases
    * samples
    * support

# Projects

* TODO: A Spring Project has an official name in the Spring portfolio.
Its sources can be found in a git repository.
The team in charge of this project will build the sources and release the resulting artifacts in an <<repository, Artifact Repository>>.

Some projects are part of a Release train, i.e. a set of project releases that are known to be compatible.
Such projects are gathered under an umbrella project (or parent project).

We can `GET` the full collection of Spring Projects using the `"projects"` link provided at the root of the service:

include::{snippets}/list-projects/http-response.adoc[]

We can then fetch an individual project using its `"self"` link when listed in the full collection, for example for the Spring Boot project:

include::{snippets}/show-project/http-response.adoc[]

## Project Support Status
Each Project has an official support status; the goal here is to set expectations about the type of support you can expect from the Spring team:

[horizontal]
Incubating:: an experiment which might/might no be officially supported in the future.
Active:: actively and officially supported by the Spring team.
Community:: actively supported by the Spring community with limited involvement from the Spring team.
End Of Life:: not supported anymore; there won't be new releases for this project.


# Releases
The Project team selects the currently relevant releases; they're often releases that belong to active <<generation, Project Generations>>.
We can get the list of releases for a given project by following the `"releases"` link on the Project resource:

SNAPSHOT:: Unstable release with limited support; SNAPSHOT versions are released continuously
PRERELEASE:: Also known as Milestone, this a release meant to be tested by the community
GENERAL_AVAILABILITY:: Release Generally Available on public artifact repositories and getting full support from maintainers

[[delete-release]]
## Deleting an existing Release
We can delete an existing Release from a Project:

include::{snippets}/delete-release/http-request.adoc[]

include::{snippets}/delete-release/http-response.adoc[]

NOTE: This request requires <<authentication>>.

[[generation]]
# Generations
Each project has an official <<project-status, Support Status>>, but not all releases are supported at any time.
Releases are grouped as Generations. Depending on the project and its release policy, a Generation usually
regroups all maintenance Releases for a given minor version or a specific release train.

Developers should upgrade to the latest Release at their earliest convenience;
the Spring team helps drive that decision by providing end of support dates for each generation.

Each project generation has two periods of active support:
https://tanzu.vmware.com/support/oss[Open Source support] and https://tanzu.vmware.com/support/lifecycle_policy[Commercial support].
All releases cut during these support periods are publicly available in the <<repository, artifact repositories>>.

We can get the list of generations for a given project by following the `"generations"` link on the Project resource:

include::{snippets}/list-generations/http-response.adoc[]

We can of course fetch a single generation by following its canonical link:

include::{snippets}/show-generation/http-response.adoc[]

## Response structure

include::{snippets}/show-generation/response-fields.adoc[]

## HTTP Caching support

This endpoint supports conditional requests with `"If-Modified-Since"` request headers.
To avoid fetching and parsing a generation or the list of generations for a given project,
clients can issue conditional requests like:

include::{snippets}/cached-list-generations/http-request.adoc[]

If the project generations haven't been updated in the meantime, the server will respond with a "304 Not Modified" status.

include::{snippets}/cached-list-generations/http-response.adoc[]

# Artifact Repositories
Releases are hosted on public Artifact Repositories.
The Spring team deploys artifacts to different repositories, depending on the <<releases-status, Release Status>>.
You can configure your build system to resolve dependencies from the artifact repositories listed by this service.
"Generally Available" releases are also available on Maven Central and its mirrors.

Each <<release, Project Release>> has a link to an Artifact Repository resource.
You can fetch the full list of repositories managed by the Spring team by following the `"repositories"` link on the root endpoint:
