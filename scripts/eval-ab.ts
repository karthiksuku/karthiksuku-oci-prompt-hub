import 'dotenv/config';
import fs from 'fs';
import fetch from 'node-fetch';

type Item = { id: string; prompt: string };

const PROVIDER = process.env.PROVIDER || 'openai';
const MODEL_A = process.env.MODEL_A || 'gpt-4o-mini';
const MODEL_B = process.env.MODEL_B || 'gpt-4o-mini';

async function ask(provider: string, model: string, text: string){
  if (provider === 'openai'){
    const r = await fetch(process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model, messages: [{role:'user', content: text}], temperature: 0.3 })
    });
    const j = await r.json();
    return j?.choices?.[0]?.message?.content ?? '';
  }
  if (provider === 'anthropic'){
    const r = await fetch((process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1') + '/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model, max_tokens: 600, messages: [{role:'user', content: text}] })
    });
    const j = await r.json();
    return j?.content?.[0]?.text ?? '';
  }
  if (provider === 'oci'){
    const base = process.env.OCI_BASE_URL;
    const r = await fetch(base?.replace(/\/$/,'') + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OCI_API_KEY||''}` },
      body: JSON.stringify({ model, messages: [{role:'user', content:text}] })
    });
    const j = await r.json();
    return j?.choices?.[0]?.message?.content ?? '';
  }
  throw new Error('Unknown provider');
}

async function main(){
  const lines = fs.readFileSync('eval/testset.jsonl','utf-8').trim().split(/\n+/);
  for (const line of lines){
    const item = JSON.parse(line) as Item;
    const a = await ask(PROVIDER, MODEL_A, item.prompt);
    const b = await ask(PROVIDER, MODEL_B, item.prompt);
    // naive heuristic: prefer shorter concise answers unless SQL requested
    const preferAForSQL = /SQL/i.test(item.prompt) ? (a.length >= b.length) : (a.length <= b.length);
    const winner = preferAForSQL ? 'A' : 'B';
    console.log(JSON.stringify({ id:item.id, winner, a_len:a.length, b_len:b.length }));
  }
}
main().catch(e=>{ console.error(e); process.exit(1); });
