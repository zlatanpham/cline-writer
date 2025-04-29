```yaml
title: Agents
author: Huyen Chip
tags:
  - AI
  - Intelligent Agents
  - Foundation Models
  - Planning
  - Tools
  - Evaluation
  - Autonomous Systems
```

Intelligent agents are considered by many to be the ultimate goal of AI. The classic book by Stuart Russell and Peter Norvig, _Artificial Intelligence: A Modern Approach_ (Prentice Hall, 1995), defines the field of AI research as “_the study and design of rational agents._”

The unprecedented capabilities of foundation models have opened the door to agentic applications that were previously unimaginable. These new capabilities make it finally possible to develop autonomous, intelligent agents to act as our assistants, coworkers, and coaches. They can help us create a website, gather data, plan a trip, do market research, manage a customer account, automate data entry, prepare us for interviews, interview our candidates, negotiate a deal, etc. The possibilities seem endless, and the potential economic value of these agents is enormous.

This section will start with an overview of agents and then continue with two aspects that determine the capabilities of an agent: tools and planning. Agents, with their new modes of operations, have new modes of failure. This section will end with a discussion on how to evaluate agents to catch these failures.

_This post is adapted from the **Agents** section of [**AI Engineering**](https://amzn.to/49j1cGS) (2025) with minor edits to make it a standalone post._

**Notes**:

1.  AI-powered agents are an emerging field with no established theoretical frameworks for defining, developing, and evaluating them. This section is a best-effort attempt to build a framework from the existing literature, but it will evolve as the field does. Compared to the rest of the book, this section is more experimental. I received helpful feedback from early reviewers, and I hope to get feedback from readers of this blog post, too.
2.  Just before this book came out, Anthropic published a blog post on [Building effective agents](https://www.anthropic.com/research/building-effective-agents) (Dec 2024). I’m glad to see that Anthropic’s blog post and my agent section are [conceptually aligned](https://cedricchee.com/blog/the-dna-of-ai-agents/), though with slightly different terminologies. However, Anthropic’s post focuses on isolated patterns, whereas my post covers why and how things work. I also focus more on planning, tool selection, and failure modes.
3.  The post contains a lot of background information. Feel free to skip ahead if it feels a little too in the weeds!

Agent Overview
--------------

The term _agent_ has been used in many different engineering contexts, including but not limited to a software agent, intelligent agent, user agent, conversational agent, and reinforcement learning agent. So, what exactly is an agent?

An agent is anything that can perceive its environment and act upon that environment. _Artificial Intelligence: A Modern Approach_ (1995) defines an agent as anything that can be viewed as perceiving its environment through sensors and acting upon that environment through actuators.

This means that an agent is characterized by the _environment_ it operates in and _the set of actions_ it can perform.

The _environment_ an agent can operate in is defined by its use case. If an agent is developed to play a game (e.g., _Minecraft,_ Go, _Dota_), that game is its environment. If you want an agent to scrape documents from the internet, the environment is the internet. A self-driving car agent’s environment is the road system and its adjacent areas.

The _set of actions_ an AI agent can perform is augmented by the _tools_ it has access to. Many generative AI-powered applications you interact with daily are agents with access to tools, albeit simple ones. ChatGPT is an agent. It can search the web, execute Python code, and generate images. RAG systems are agents—text retrievers, image retrievers, and SQL executors are their tools.

There’s a strong dependency between an agent’s environment and its set of tools. The environment determines what tools an agent can potentially use. For example, if the environment is a chess game, the only possible actions for an agent are the valid chess moves. However, an agent’s tool inventory restricts the environment it can operate in. For example, if a robot’s only action is swimming, it’ll be confined to a water environment.

Figure 6-8 shows a visualization of [SWE-agent](https://arxiv.org/abs/2405.15793) (Yang et al., 2024), an agent built on top of GPT-4. Its environment is the computer with the terminal and the file system. Its set of actions include navigate repo, search files, view files, and edit lines.

![Image 1: A coding agent](https://huyenchip.com/assets/pics/agents/1-swe-agent.png)

Figure 6-8. SWE-agent is a coding agent whose environment is the computer and whose actions include navigation, search, view files, and editing

An AI agent is meant to accomplish tasks typically provided by the users. In an AI agent, AI is the brain that processes the task, plans a sequence of actions to achieve this task, and determines whether the task has been accomplished.

Let’s return to the RAG system with tabular data in the Kitty Vogue example above. This is a simple agent with three actions:

*   response generation,
*   SQL query generation, and
*   SQL query execution.

Given the query `"Project the sales revenue for Fruity Fedora over the next three months"`, the agent might perform the following sequence of actions:

1.  Reason about how to accomplish this task. It might decide that to predict future sales, it first needs the sales numbers from the last five years. An agent’s reasoning can be shown as intermediate responses.
2.  Invoke SQL query generation to generate the query to get sales numbers from the last five years.
3.  Invoke SQL query execution to execute this query.
4.  Reason about the tool outputs (outputs from the SQL query execution) and how they help with sales prediction. It might decide that these numbers are insufficient to make a reliable projection, perhaps because of missing values. It then decides that it also needs information about past marketing campaigns.
5.  Invoke SQL query generation to generate the queries for past marketing campaigns.
6.  Invoke SQL query execution.
7.  Reason that this new information is sufficient to help predict future sales. It then generates a projection.
8.  Reason that the task has been successfully completed.

Compared to non-agent use cases, agents typically require more powerful models for two reasons:

*   **Compound mistakes**: an agent often needs to perform multiple steps to accomplish a task, and the overall accuracy decreases as the number of steps increases. If the model’s accuracy is 95% per step, over 10 steps, the accuracy will drop to 60%, and over 100 steps, the accuracy will be only 0.6%.
*   **Higher stakes**: with access to tools, agents are capable of performing more impactful tasks, but any failure could have more severe consequences.

A task that requires many steps can take time and money to run. A common complaint is that agents are only good for burning through your API credits. However, if agents can be autonomous, they can save human time, making their costs worthwhile.

Given an environment, the success of an agent in an environment depends on **the tool it has access to** and **the strength of its AI planner**. Let’s start by looking into different kinds of tools a model can use. We’ll analyze AI’s capability for planning next.

Tools
-----

A system doesn’t need access to external tools to be an agent. However, without external tools, the agent’s capabilities would be limited. By itself, a model can typically perform one action—an LLM can generate text and an image generator can generate images. External tools make an agent vastly more capable.

Tools help an agent to both perceive the environment and act upon it. Actions that allow an agent to perceive the environment are _read-only actions_, whereas actions that allow an agent to act upon the environment are _write actions_.

The set of tools an agent has access to is its tool inventory. Since an agent’s tool inventory determines what an agent can do, it’s important to think through what and how many tools to give an agent. More tools give an agent more capabilities. However, the more tools there are, the more challenging it is to understand and utilize them well. Experimentation is necessary to find the right set of tools, as discussed later in the “**Tool selection**” section.

Depending on the agent’s environment, there are many possible tools. Here are three categories of tools that you might want to consider: knowledge augmentation (i.e., context construction), capability extension, and tools that let your agent act upon its environment.

### Knowledge augmentation

I hope that this book, so far, has convinced you of the importance of having the relevant context for a model’s response quality. An important category of tools includes those that help augment the knowledge of your agent. Some of them have already been discussed: text retriever, image retriever, and SQL executor. Other potential tools include internal people search, an inventory API that returns the status of different products, Slack retrieval, an email reader, etc.

Many such tools augment a model with your organization’s private processes and information. However, tools can also give models access to public information, especially from the internet.

Web browsing was among the earliest and most anticipated capabilities to be incorporated into ChatGPT. Web browsing prevents a model from going stale. A model goes stale when the data it was trained on becomes outdated. If the model’s training data was cut off last week, it won’t be able to answer questions that require information from this week unless this information is provided in the context. Without web browsing, a model won’t be able to tell you about the weather, news, upcoming events, stock prices, flight status, etc.

I use web browsing as an umbrella term to cover all tools that access the internet, including web browsers and APIs such as search APIs, news APIs, GitHub APIs, or social media APIs.

While web browsing allows your agent to reference up-to-date information to generate better responses and reduce hallucinations, it can also open up your agent to the cesspools of the internet. Select your Internet APIs with care.

### Capability extension

You might also consider tools that address the inherent limitations of AI models. They are easy ways to give your model a performance boost. For example, AI models are notorious for being bad at math. If you ask a model what is 199,999 divided by 292, the model will likely fail. However, this calculation would be trivial if the model had access to a calculator. Instead of trying to train the model to be good at arithmetic, it’s a lot more resource-efficient to just give the model access to a tool.

Other simple tools that can significantly boost a model’s capability include a calendar, timezone converter, unit converter (e.g., from lbs to kg), and translator that can translate to and from the languages that the model isn’t good at.

More complex but powerful tools are code interpreters. Instead of training a model to understand code, you can give it access to a code interpreter to execute a piece of code, return the results, or analyze the code’s failures. This capability lets your agents act as coding assistants, data analysts, and even research assistants that can write code to run experiments and report results. However, automated code execution comes with the risk of code injection attacks, as discussed in Chapter 5 in the section “Defensive Prompt Engineering**“**. Proper security measurements are crucial to keep you and your users safe.

Tools can turn a text-only or image-only model into a multimodal model. For example, a model that can generate only texts can leverage a text-to-image model as a tool, allowing it to generate both texts and images. Given a text request, the agent’s AI planner decides whether to invoke text generation, image generation, or both. This is how ChatGPT can generate both text and images—it uses DALL-E as its image generator.

Agents can also use a code interpreter to generate charts and graphs, a LaTex compiler to render math equations, or a browser to render web pages from HTML code.

Similarly, a model that can process only text inputs can use an image captioning tool to process images and a transcription tool to process audio. It can use an OCR (optical character recognition) tool to read PDFs.

_Tool use can significantly boost a model’s performance compared to just prompting or even finetuning_. [Chameleon](https://arxiv.org/abs/2304.09842) (Lu et al., 2023) shows that a GPT-4-powered agent, augmented with a set of 13 tools, can outperform GPT-4 alone on several benchmarks. Examples of tools this agent used are knowledge retrieval, a query generator, an image captioner, a text detector, and Bing search.

On ScienceQA, a science question answering benchmark, Chameleon improves the best published few-shot result by 11.37%. On TabMWP (Tabular Math Word Problems) (Lu et al., 2022), a benchmark involving tabular math questions, Chameleon improves the accuracy by 17%.

### Write actions

So far, we’ve discussed read-only actions that allow a model to read from its data sources. But tools can also perform write actions, making changes to the data sources. An SQL executor can retrieve a data table (read) and change or delete the table (write). An email API can read an email but can also respond to it. A banking API can retrieve your current balance, but can also initiate a bank transfer.

Write actions enable a system to do more. They can enable you to automate the whole customer outreach workflow: researching potential customers, finding their contacts, drafting emails, sending first emails, reading responses, following up, extracting orders, updating your databases with new orders, etc.

However, the prospect of giving AI the ability to automatically alter our lives is frightening. Just as you shouldn’t give an intern the authority to delete your production database, you shouldn’t allow an unreliable AI to initiate bank transfers. Trust in the system’s capabilities and its security measures is crucial. You need to ensure that the system is protected from bad actors who might try to manipulate it into performing harmful actions.

* * *

> **Sidebar: Agents and security**

Whenever I talk about autonomous AI agents to a group of people, there is often someone who brings up self-driving cars. “_What if someone hacks into the car to kidnap you?_” While the self-driving car example seems visceral because of its physicality, an AI system can cause harm without a presence in the physical world. It can manipulate the stock market, steal copyrights, violate privacy, reinforce biases, spread misinformation and propaganda, and more, as discussed in the section “Defensive Prompt Engineering” in Chapter 5.

These are all valid concerns, and any organization that wants to leverage AI needs to take safety and security seriously. However, this doesn’t mean that AI systems should never be given the ability to act in the real world. If we can trust a machine to take us into space, I hope that one day, security measures will be sufficient for us to trust autonomous AI systems. Besides, humans can fail, too. Personally, I would trust a self-driving car more than the average stranger to give me a lift.

* * *

Just as the right tools can help humans be vastly more productive—can you imagine doing business without Excel or building a skyscraper without cranes?—tools enable models to accomplish many more tasks. Many model providers already support tool use with their models, a feature often called function calling. Going forward, I would expect function calling with a wide set of tools to be common with most models.

Planning
--------

At the heart of a foundation model agent is the model responsible for solving user-provided tasks. A task is defined by its goal and constraints. For example, one task is to schedule a two-week trip from San Francisco to India with a budget of $5,000. The goal is the two-week trip. The constraint is the budget.

Complex tasks require planning. The output of the planning process is a plan, which is a roadmap outlining the steps needed to accomplish a task. Effective planning typically requires the model to understand the task, consider different options to achieve this task, and choose the most promising one.

If you’ve ever been in any planning meeting, you know that planning is hard. As an important computational problem, planning is well studied and would require several volumes to cover. I’ll only be able to cover the surface here.

### Planning overview

Given a task, there are many possible ways to solve it, but not all of them will lead to a successful outcome. Among the correct solutions, some are more efficient than others. Consider the query, `"How many companies without revenue have raised at least $1 billion?"`, and the two example solutions:

1.  Find all companies without revenue, then filter them by the amount raised.
2.  Find all companies that have raised at least $1 billion, then filter them by revenue.

The second option is more efficient. There are vastly more companies without revenue than companies that have raised $1 billion. Given only these two options, an intelligent agent should choose option 2.

You can couple planning with execution in the same prompt. For example, you give the model a prompt, ask it to think step by step (such as with a chain-of-thought prompt), and then execute those steps all in one prompt. But what if the model comes up with a 1,000-step plan that doesn’t even accomplish the goal? Without oversight, an agent can run those steps for hours, wasting time and money on API calls, before you realize that it’s not going anywhere.

To avoid fruitless execution, _planning_ should be decoupled from _execution_. You ask the agent to first generate a plan, and only after this plan is _validated_ is it executed. The plan can be validated using heuristics. For example, one simple heuristic is to eliminate plans with invalid actions. If the generated plan requires a Google search and the agent doesn’t have access to Google Search, this plan is invalid. Another simple heuristic might be eliminating all plans with more than X steps.

A plan can also be validated using AI judges. You can ask a model to evaluate whether the plan seems reasonable or how to improve it.

If the generated plan is evaluated to be bad, you can ask the planner to generate another plan. If the generated plan is good, execute it.

If the plan consists of external tools, function calling will be invoked. Outputs from executing this plan will then again need to be evaluated. Note that the generated plan doesn’t have to be an end-to-end plan for the whole task. It can be a small plan for a subtask. The whole process looks like Figure 6-9.

![Image 2: Agent pattern](https://huyenchip.com/assets/pics/agents/2-agent-pattern.png)

Figure 6-9. Decoupling planning and execution so