const fs = require('fs').promises;
const path = require('path');
const process = require('process');

async function main() {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 2) {
      console.error(
        'Usage: node generate-prompt.js <instruction_markdown_path> <sample_folder_path>',
      );
      process.exit(1);
    }

    const [instructionPath, sampleFolderPath] = args;

    // Read system prompt from instruction markdown file
    const systemPrompt = await fs.readFile(instructionPath, 'utf-8');

    // Read all files in sample folder
    const sampleFiles = await fs.readdir(sampleFolderPath, {
      withFileTypes: true,
    });
    const sampleFileContents = [];

    for (const file of sampleFiles) {
      if (file.isFile()) {
        const filePath = path.join(sampleFolderPath, file.name);
        const content = await fs.readFile(filePath, 'utf-8');
        sampleFileContents.push(content);
      }
    }

    // Concatenate all sample file contents as user prompt
    const userPrompt = sampleFileContents.join('\n\n');

    // Load environment variables from .env file
    require('dotenv').config();

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error('Error: OPENAI_API_KEY environment variable is not set.');
      process.exit(1);
    }

    // Prepare OpenAI API request body
    const requestBody = {
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 4000,
      temperature: 0,
    };

    // Call OpenAI API using fetch
    const fetch = globalThis.fetch || require('node-fetch');
    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(
        `OpenAI API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    const outputText = data.choices?.[0]?.message?.content;

    if (!outputText) {
      throw new Error('No content returned from OpenAI API');
    }

    // Determine output file name from sample folder name
    const folderName = path.basename(sampleFolderPath);
    const outputDir = path.resolve('prompts');
    const outputPath = path.join(outputDir, `${folderName}.md`);

    // Ensure prompts directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Write output to markdown file
    await fs.writeFile(outputPath, outputText, 'utf-8');

    console.log(`Output saved to ${outputPath}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
