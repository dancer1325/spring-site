* Generative AI
  * == type of AI / 
    * can create new content (text, images, videos)
    * unique characteristics vs other AI or traditional software
      * use human language -- as the -- interface
      * reply -- based on -- context
        * != fixed rules to reply
      * pre-trained models
      * accessible -- via -- Web APIs
  * use cases
    * conversational chatbots
    * code assistance
    * healthcare diagnostics
  * requirements
    * learn about
      * retrieval-augmented generation (RAG),
      * multimodal use cases (_Examples:_ image recognition, predictive analytics) 

# Generative AI | Spring

* Spring AI
  * == Spring project / 
    * goal: integrate AI | your Spring applications
    * allows
      * creating AI-capable applications 
        * [Get started with ChatClients](https://docs.spring.io/spring-ai/reference/api/multimodality.html)
        * [Portable Chat Models](https://docs.spring.io/spring-ai/reference/api/chat/comparison.html)
  * == extension of Spring Framework| Spring ecosystem

# Tool Calling

* Tool calling
  * allows you to
    * register your own functions / connect the LLMs -- to -- external APIs 
* These systems can provide LLMs with real-time data and perform data processing actions on their behalf
* Spring AI greatly simplifies code you need to write to support function invocation
* You can provide your function as a @Bean and then provide the bean name of the function in your prompt options to activate that function
* Additionally, you can define and reference multiple functions in a single prompt.

[Get started with Tool Calling](https://docs.spring.io/spring-ai/reference/api/tools.html)

# [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro)

* | [Spring AI](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html) 

# Retrieval Augmented Generation

At its core, Spring AI addresses the fundamental challenge of AI integration - Connecting your enterprise Data and APIs with the AI Models
* A technique termed Retrieval Augmented Generation (RAG) has emerged to address the challenge of incorporating relevant data into prompts for accurate AI model responses.Spring AI greatly simplifies code you need to write to support RAG pipelines.

![](/img/extra/ai-1.png)![](/img/extra/ai-1-dark.png)

[Get started with RAG](https://docs.spring.io/spring-ai/reference/api/retrieval-augmented-generation.html)

# Spring AI supported patterns

Generative AI brings with it it's own set of challenges
* Spring AI supports the following patterns to address these challenges.

Challenges

Patterns

Align responses to goals

System prompt

No structured output

Output converters

Not trained on your data

Prompt Stuffing

Limited Context Size

RAG

Stateless APIs

Chat memory

Not aware of your APIs

Function calling

Hallucinations

Evaluators

# Integration with common technologies

Spring AI provides abstractions that serve as the foundation for developing AI applications
* These abstractions have multiple implementations, enabling easy component swapping with minimal code changes
* Spring AI has support for all major Model providers such as OpenAI, Microsoft, Amazon, Google, and Hugging Face
* It also supports all major Vector Database providers such as Apache Cassandra, Azure Vector Search, Chroma, Milvus, MongoDB Atlas, Neo4j, Oracle, PostgreSQL/PGVector, PineCone, Qdrant, Redis, and Weaviate.

## Ready to get started?

## More resources

[![AI Powered Flight booking system](/img/extra/ai-2.svg)![AI Powered Flight booking system](/img/extra/ai-2-dark.svg)](https://github.com/tzolov/playground-flight-booking)

# [AI Powered Flight booking system](https://github.com/tzolov/playground-flight-booking)

Christian Tzolov

![](/img/extra/footer.svg)
