import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();
app.use(express.json());

const PORT = process.env.PLAYGROUND_PORT || 5173;

// Choose provider via env flags
const PROVIDER = process.env.PROVIDER || 'openai'; // 'openai' | 'anthropic' | 'oci'

app.post('/chat', async (req, res) => {
  const { model, system, prompt } = req.body || {};
  try {
    if (PROVIDER === 'openai') {
      const r = await fetch(process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: model || process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: system || 'You are a helpful assistant.' },
            { role: 'user', content: prompt || 'Say hello' }
          ]
        })
      });
      const data = await r.json();
      const output = data?.choices?.[0]?.message?.content;
      return res.json({ provider: 'openai', output, raw: data });
    }

    if (PROVIDER === 'anthropic') {
      const r = await fetch((process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1') + '/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model || process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20240620',
          system: system || 'You are a helpful assistant.',
          max_tokens: 600,
          messages: [{ role: 'user', content: prompt || 'Say hello' }]
        })
      });
      const data = await r.json();
      const output = data?.content?.[0]?.text;
      return res.json({ provider: 'anthropic', output, raw: data });
    }

    if (PROVIDER === 'oci') {
      // OCI Generative AI Inference (Chat/Completions) — OpenAI-compatible Gateway or REST
      const base = process.env.OCI_BASE_URL; // e.g., OpenAI-compatible gateway URL
      if (!base) throw new Error('Set OCI_BASE_URL to your OpenAI-compatible endpoint or Function gateway.');

      const r = await fetch(base.replace(/\/$/, '') + '/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OCI_API_KEY || ''}`
        },
        body: JSON.stringify({
          model: model || process.env.OCI_MODEL || 'grok-4', // example name if mapped
          messages: [
            { role: 'system', content: system || 'You are a helpful assistant.' },
            { role: 'user', content: prompt || 'Say hello' }
          ]
        })
      });
      const data = await r.json();
      const output = data?.choices?.[0]?.message?.content;
      return res.json({ provider: 'oci', output, raw: data });
    }

    throw new Error('Unsupported PROVIDER: ' + PROVIDER);
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`[dev-proxy] Provider=%s port=%s`, PROVIDER, PORT);
});
