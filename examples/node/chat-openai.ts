import 'dotenv/config';
import fetch from 'node-fetch';

async function main(){
  const r = await fetch(process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a friendly email rewriter. Keep under 100 words.'},
        { role: 'user', content: 'Turn these bullets into a warm email: thanks for chasing, can you share the draft by Friday?' }
      ]
    })
  });
  const j = await r.json();
  console.log(j?.choices?.[0]?.message?.content);
}
main();
