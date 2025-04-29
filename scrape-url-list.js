/**
 * scrape-and-process-list.js
 *
 * Usage:
 *   Set your OpenAI API key in the environment variable OPENAI_API_KEY.
 *   Run the script with:
 *     node scrape-and-process-list.js <article-url-1> <article-url-2> ...
 *
 * The script will:
 * 1. Create a folder named 'processed-articles'.
 * 2. For each provided article URL, fetch content via Jira API, process it with OpenAI to trim unrelated content and generate frontmatter.
 * 3. Save the processed content as markdown files named by the hyphen-case title in the created folder.
 */

const fs = require('fs').promises;
const path = require('path');
const fetch = globalThis.fetch || require('node-fetch');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4.1-mini';

if (!OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is not set.');
  process.exit(1);
}

function toHyphenCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchJiraContent(url) {
  try {
    const response = await fetch(`https://r.jina.ai/${url}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Jira content: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.text();
    return data;
  } catch (err) {
    console.error(`Error fetching Jira content for ${url}:`, err);
    return null;
  }
}

async function callOpenAI(content) {
  const prompt = `
You are an assistant that processes markdown content from a Jira article.
Please do the following:
1. Trim out unrelated content such as header, footer, sidebar.
2. Extract title, author, and tags from the content and write a YAML frontmatter.
3. Output the new content with the frontmatter at the top.

Original content:
${content}
`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that processes Jira markdown content.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 4000,
        temperature: 0,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenAI API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;
    return result;
  } catch (err) {
    console.error('Error calling OpenAI API:', err);
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error(
      'Usage: OPENAI_API_KEY=xxx node scrape-and-process-list.js <article-url-1> <article-url-2> ...',
    );
    process.exit(1);
  }

  const folderName = 'processed-articles';
  try {
    await fs.mkdir(folderName, { recursive: true });
  } catch (err) {
    console.error('Error creating folder:', err);
    process.exit(1);
  }

  for (const url of args) {
    console.log(`Processing article URL: ${url}`);

    const jiraContent = await fetchJiraContent(url);
    if (!jiraContent) {
      console.error(`Skipping URL due to fetch error: ${url}`);
      continue;
    }

    const processedContent = await callOpenAI(jiraContent);
    if (!processedContent) {
      console.error(`Skipping URL due to OpenAI processing error: ${url}`);
      continue;
    }

    // Extract title from frontmatter or from first line starting with # in processedContent
    let title = 'untitled';
    const frontmatterMatch = processedContent.match(/title:\s*(.+)/i);
    if (frontmatterMatch) {
      title = frontmatterMatch[1].trim();
    } else {
      const headerMatch = processedContent.match(/^#\s+(.+)$/m);
      if (headerMatch) {
        title = headerMatch[1].trim();
      }
    }

    const fileName = toHyphenCase(title) + '.md';
    const filePath = path.join(folderName, fileName);

    try {
      await fs.writeFile(filePath, processedContent, 'utf-8');
      console.log(`Saved processed content to ${filePath}`);
    } catch (err) {
      console.error(`Error saving file ${filePath}:`, err);
    }
  }
}

main();
