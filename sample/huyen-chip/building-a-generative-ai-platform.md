```yaml
title: Building A Generative AI Platform
author: Huyen Chip
tags:
  - generative AI
  - AI platform
  - architecture
  - RAG
  - model gateway
  - guardrails
  - caching
  - orchestration
  - observability
  - AI engineering
```

After studying how companies deploy generative AI applications, I noticed many similarities in their platforms. This post outlines the common components of a generative AI platform, what they do, and how they are implemented. I try my best to keep the architecture general, but certain applications might deviate. This is what the overall architecture looks like.

![Image 1: Overview of a genai platform](https://huyenchip.com/assets/pics/genai-platform/1-genai-platform.png)

This is a pretty complex system. This post will start from the simplest architecture and progressively add more components. In its simplest form, your application receives a query and sends it to the model. The model generates a response, which is returned to the user. There are no guardrails, no augmented context, and no optimization. The **Model API** box refers to both third-party APIs (e.g., OpenAI, Google, Anthropic) and self-hosted APIs.

![Image 2: Overview of a genai platform](https://huyenchip.com/assets/pics/genai-platform/2.png)

From this, you can add more components as needs arise. The order discussed in this post is common, though you don’t need to follow the exact same order. A component can be skipped if your system works well without it. Evaluation is necessary at every step of the development process.

1.  Enhance context input into a model by giving the model access to external data sources and tools for information gathering.
2.  Put in guardrails to protect your system and your users.
3.  Add model router and gateway to support complex pipelines and add more security.
4.  Optimize for latency and costs with cache.
5.  Add complex logic and write actions to maximize your system’s capabilities.

Observability, which allows you to gain visibility into your system for monitoring and debugging, and orchestration, which involves chaining all the components together, are two essential components of the platform. We will discuss them at the end of this post.

**» What this post is not «**

_This post focuses on the overall architecture for deploying AI applications. It discusses what components are needed and considerations when building these components. It’s not about how to build AI applications and, therefore, does NOT discuss model evaluation, application evaluation, prompt engineering, finetuning, data annotation guidelines, or chunking strategies for RAGs. All these topics are covered in my upcoming book [AI Engineering](https://oreillymedia.pxf.io/GmaeBn)._

Step 1. Enhance Context
-----------------------

The initial expansion of a platform usually involves adding mechanisms to allow the system to augment each query with the necessary information. Gathering the relevant information is called context construction.

Many queries require context to answer. The more relevant information there is in the context, the less the model has to rely on its internal knowledge, which can be unreliable due to its training data and training methodology. Studies have shown that having access to relevant information in the context can help the model generate more detailed responses while reducing hallucinations ([Lewis et al.](https://arxiv.org/abs/2005.11401), 2020).

For example, given the query “Will Acme’s fancy-printer-A300 print 100pps?”, the model will be able to respond better if it’s given the specifications of fancy-printer-A300. (Thanks Chetan Tekur for the example.)

Context construction for foundation models is equivalent to feature engineering for classical ML models. They serve the same purpose: giving the model the necessary information to process an input.

In-context learning, learning from the context, is a form of continual learning. It enables a model to incorporate new information continually to make decisions, preventing it from becoming outdated. For example, a model trained on last-week data won’t be able to answer questions about this week unless the new information is included in its context. By updating a model’s context with the latest information, e.g. fancy-printer-A300’s latest specifications, the model remains up-to-date and can respond to queries beyond its cut-off date.

### RAGs

The most well-known pattern for context construction is RAG, Retrieval-Augmented Generation. RAG consists of two components: a generator (e.g. a language model) and a retriever, which retrieves relevant information from external sources.

![Image 3: Overview of a genai platform](https://huyenchip.com/assets/pics/genai-platform/3-rag.png)

Retrieval isn’t unique to RAGs. It’s the backbone of search engines, recommender systems, log analytics, etc. Many retrieval algorithms developed for traditional retrieval systems can be used for RAGs.

External memory sources typically contain unstructured data, such as memos, contracts, news updates, etc. They can be collectively called _documents_. A document can be 10 tokens or 1 million tokens. Naively retrieving whole documents can cause your context to be arbitrarily long. RAG typically requires documents to be split into _manageable chunks_, which can be determined from the model’s maximum context length and your application’s latency requirements. To learn more about chunking and the optimal chunk size, see [Pinecone](https://www.pinecone.io/learn/chunking-strategies/), [Langchain](https://js.langchain.com/v0.1/docs/modules/data_connection/document_transformers/), [Llamaindex](https://docs.llamaindex.ai/en/stable/optimizing/production_rag/), and [Greg Kamradt](https://www.youtube.com/watch?v=8OJC21T2SL4)’s tutorials.

Once data from external memory sources has been loaded and chunked, retrieval is performed using two main approaches.

1.  **Term-based retrieval**  
    This can be as simple as keyword search. For example, given the query “transformer”, fetch all documents containing this keyword. More sophisticated algorithms include BM25 (which leverages TF-IDF) and Elasticsearch (which leverages inverted index).Term-based retrieval is usually used for text data, but it also works for images and videos that have text metadata such as titles, tags, captions, comments, etc.
    
2.  **Embedding-based retrieval** (also known as vector search)  
    You convert chunks of data into embedding vectors using an embedding model such as [BERT](https://arxiv.org/abs/1810.04805), [sentence-transformers](https://github.com/UKPLab/sentence-transformers), and proprietary embedding models provided by OpenAI or Google. Given a query, the data whose vectors are closest to the query embedding, as determined by the vector search algorithm, is retrieved.
    
    Vector search is usually framed as nearest-neighbor search, using approximate nearest neighbor (ANN) algorithms such as [FAISS](https://arxiv.org/abs/1702.08734) (Facebook AI Similarity Search), Google’s [ScaNN](https://research.google/blog/announcing-scann-efficient-vector-similarity-search/), Spotify’s [ANNOY](https://github.com/spotify/annoy), and [hnswlib](https://github.com/nmslib/hnswlib) ([Hierarchical Navigable Small World](https://arxiv.org/abs/1603.09320)).  
    The [ANN-benchmarks website](https://ann-benchmarks.com/) compares different ANN algorithms on multiple datasets using four main metrics, taking into account the tradeoffs between indexing and querying.
    
    *   **Recall**: the fraction of the nearest neighbors found by the algorithm.
    *   **Query per second (QPS)**: the number of queries the algorithm can handle per second. This is crucial for high-traffic applications.
    *   **Build time**: the time required to build the index. This metric is important especially if you need to frequently update your index (e.g. because your data changes).
    *   **Index size**: the size of the index created by the algorithm, which is crucial for assessing its scalability and storage requirements.

This works with not just text documents, but also images, videos, audio, and code. Many teams even try to summarize SQL tables and dataframes and then use these summaries to generate embeddings for retrieval.

Term-based retrieval is much faster and cheaper than embedding-based retrieval. It can work well out of the box, making it an attractive option to start. Both BM25 and Elasticsearch are widely used in the industry and serve as formidable baselines for more complex retrieval systems. Embedding-based retrieval, while computationally expensive, can be significantly improved over time to outperform term-based retrieval.

A production retrieval system typically combines several approaches. Combining term-based retrieval and embedding-based retrieval is called _hybrid search_.

One common pattern is sequential. First, a cheap, less precise retriever, such as a term-based system, fetches candidates. Then, a more precise but more expensive mechanism, such as k-nearest neighbors, finds the best of these candidates. The second step is also called reranking.

For example, given the term “transformer”, you can fetch all documents that contain the word transformer, regardless of whether they are about the electric device, the neural architecture, or the movie. Then you use vector search to find among these documents those that are actually related to your transformer query.

Context reranking differs from traditional search reranking in that the exact position of items is less critical. In search, the rank (e.g., first or fifth) is crucial. In context reranking, the order of documents still matters because it affects how well a model can process them. Models might better understand documents at the beginning and end of the context, as suggested by the paper [Lost in the middle](https://arxiv.org/abs/2307.03172) (Liu et al., 2023). However, as long as a document is included, the impact of its order is less significant compared to in search ranking.

Another pattern is ensemble. Remember that a retriever works by ranking documents by their relevance scores to the query. You use multiple retrievers to fetch candidates at the same time, then combine these different rankings together to generate a final ranking.

#### RAGs with tabular data

External data sources can also be structured, such as dataframes or SQL tables. Retrieving data from an SQL table is significantly different from retrieving data from unstructured documents. Given a query, the system works as follows.

1.  **Text-to-SQL**: Based on the user query and the table schemas, determine what SQL query is needed.
2.  **SQL execution**: Execute the SQL query.
3.  **Generation**: Generate a response based on the SQL result and the original user query.

![Image 4: Overview of a genai platform](https://huyenchip.com/assets/pics/genai-platform/4-rag-with-tabular-data.png)

For the text-to-SQL step, if there are many available tables whose schemas can’t all fit into the model context, you might need an intermediate step to predict what tables to use for each query. Text-to-SQL can be done by the same model used to generate the final response or one of many specialized text-to-SQL models.

#### Agentic RAGs

An important source of data is the Internet. A web search tool like Google or Bing API can give the model access to a rich, up-to-date resource to gather relevant information for each query. For example, given the query “Who won Oscar this year?”, the system searches for information about the latest Oscar and uses this information to generate the final response to the user.

Term-based retrieval, embedding-based retrieval, SQL execution, and web search are actions that a model can take to augment its context. You can think of each action as a function the model can call. A workflow that can incorporate external actions is also called _agentic_. The architecture then looks like this.

![Image 5: Overview of a genai platform](https://huyenchip.com/assets/pics/genai-platform/5-agentic-rag.png)

**» Action vs. tool «**

A tool allows one or more actions. For example, a people search tool might allow two actions: search by name and search by email. However, the difference is minimal, so many people use _action_ and _tool_ interchangeably.

**» Read-only actions vs. write actions «**

Actions that retrieve information from external sources but don’t change their states are read-only actions. Giving a model write actions, e.g. updating the values in a table, enables the model to perform more tasks but also poses more risks, which will be discussed later.

### Query rewriting

Often, a user query needs to be rewritten to increase the likelihood of fetching the right information. Consider the following conversation.

```
User: When was the last time John Doe bought something from us?
AI: John last bought a Fruity Fedora hat from us two weeks ago, on January 3, 2030.
User: How about Emily Doe?
```

The last question, “How about Emily Doe?”, is ambiguous. If you use this query verbatim to retrieve documents, you’ll likely get irrelevant results. You need to rewrite this query to reflect what the user is actually asking. The new query should make sense on its own. The last question should be rewritten to “When was the last time Emily Doe bought something from us?”

Query rewriting is typically done using other AI models, using a prompt similar to “Given the following conversation, rewrite the last user input to reflect what the user is actually asking.”

![Image 6: Overview of a genai platform](https://huyenchip.com/assets/pics/genai-platform/6-query-rewriting.png)

Query rewriting can get complicated, especially if you need to do identity resolution or incorporate other knowledge. If the user asks “How about his wife?”, you will first need to query your database to find out who his wife is. If you don’t have this information, the rewriting model should acknowledge that this query isn’t solvable instead of hallucinating a name, leading to a wrong answer.

Step 2. Put in Guardrails
-------------------------

Guardrails help reduce AI risks and protect not just your users but also you, the developers. They should be placed whenever there is potential for failures. This post discusses two types of guardrails: input guardrails and output guardrails.

### Input guardrails

Input guardrails are typically protection against two types of risks: leaking private information to external APIs, and executing bad prompts that compromise your system (model jailbreaking).

#### Leaking private information to external APIs

This risk is specific to using external model APIs when you need to send your data outside your organization. For example, an employee might copy the company’s secret or a user’s private information into a prompt and send it to wherever the model is hosted.

One of the most notable early incidents was when Samsung employees put Samsung’s proprietary information into ChatGPT, accidentally [leaking the company’s secrets](https://www.techradar.com/news/samsung-workers-leaked-company-secrets-by-using-chatgpt). It’s unclear how Samsung discovered this leak and how the leaked information was used against Samsung. However, the incident was serious enough for Samsung to [ban ChatGPT in May 2023](https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak).

There’s no airtight way to eliminate potential leaks when using third-party APIs. However, you can mitigate them with guardrails. You can use one of the many available tools that automatically detect sensitive data. What sensitive data to detect is specified by you. Common sensitive data classes are:

*   Personal information (ID numbers, phone numbers, bank accounts).
*   Human faces.
*   Specific keywords and phrases associated with the company’s intellectual properties or privileged information.

Many sensitive data detection tools use AI to identify potentially sensitive information, such as determining if a string resembles a valid home address. If a query is found to contain sensitive information, you have two options: block the entire query or remove the sensitive information from it. For instance, you can mask a user’s phone number with the placeholder \[PHONE NUMBER\]. If the generated response contains this placeholder, use a PII reversible dictionary that maps this placeholder to the original information so that you can unmask it, as shown below.

![Image 7: Overview of a genai platform](https://huyenchip.com/assets/pics/genai-platform/7-reversible-pii-mapping.png)

#### Model jailbreaking

It’s become an online sport to try to jailbreak AI models, getting them to say or do bad things. While some might find it amusing to get ChatGPT to make controversial statements, it’s much less fun if your customer support chatbot, branded with your name and logo, does the same thing. This can be especially dangerous for AI systems that have access to tools. Imagine if a user finds a way to get your system to execute an SQL query that corrupts your data.

To combat this, you should first put guardrails on your system so that no harmful actions can be automatically executed. For example, no SQL queries that can insert, delete, or update data can be executed without human approval. The downside of this added security is that it can slow down your system.

To prevent your application from making outrageous statements it shouldn’t be making, you can define out-of-scope topics for your application. For example, if your application is a customer support chatbot, it shouldn’t answer political or social questions. A simple way to do so is to filter out inputs that contain predefined phrases typically associated with controversial topics, such as “immigration” or “antivax”. More sophisticated algorithms use AI to classify whether an input is about one of the pre-defined restricted topics.

If harmful prompts are rare in your system, you can use an anomaly detection algorithm to identify unusual prompts.

### Output guardrails

AI models are probabilistic, making their outputs unreliable. You can put in guardrails to significantly improve your application’s reliability. Output guardrails have two main functionalities:

1.  Evaluate the quality of each generation.
2.  Specify the policy to deal with different failure modes.

#### Output quality measurement

To catch outputs that fail to meet your standards, you need to understand what failures look like. Here are examples of failure modes and how to catch them.

1.  **Empty responses**.
    
2.  **Malformatted responses** that don’t follow the expected output format. For example, if the application expects JSON and the generated response has a missing closing bracket. There are validators for certain formats, such as regex, JSON, and Python code validators. There are also tools for [constrained sampling](https://huyenchip.com/2024/01/16/sampling.html#constraint_sampling) such as guidance, outlines, and instructor.
    
3.  **Toxic responses**, such as those that are racist or