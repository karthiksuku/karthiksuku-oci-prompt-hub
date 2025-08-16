import fs from 'fs';
import path from 'path';

const regDir = 'prompts/registry';
const outDir = 'docs/prompts';
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(regDir).filter(f => f.endsWith('.json'));
for (const f of files){
  const j = JSON.parse(fs.readFileSync(path.join(regDir, f), 'utf-8'));
  const slug = j.id;
  const mdx = `---
id: ${slug}
title: ${j.title}
tags: [${(j.tags||[]).join(', ')}]
---

**Owner:** ${j.owner}  
**License:** ${j.license}

## System Prompt
\`\`\`text
${j.system}
\`\`\`

## Usage (OpenAI-compatible)
\`\`\`bash
curl -s $OPENAI_BASE_URL/chat/completions \\
 -H "Authorization: Bearer $OPENAI_API_KEY" \\
 -H "Content-Type: application/json" \\
 -d '{
   "model":"$OPENAI_MODEL",
   "messages":[
     {"role":"system","content":"${j.system.replace(/"/g,'\\"')}"},
     {"role":"user","content":"<your input here>"}
   ]
 }'
\`\`\`

## Notes
- Provide minimal input; the prompt enforces structure.
- See **/examples** for client code.
`;
  fs.writeFileSync(path.join(outDir, `${slug}.mdx`), mdx);
}

const index = `# Prompt Library

${files.length} prompts auto-generated from the registry. Contribute new prompts via PRs with a JSON file in \`/prompts/registry\`.
`;
fs.writeFileSync(path.join(outDir, 'index.md'), index);
console.log('Generated', files.length, 'prompt pages.');
