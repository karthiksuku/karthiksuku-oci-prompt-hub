import 'dotenv/config';
import fetch from 'node-fetch';

async function main(){
  const base = process.env.OCI_BASE_URL;
  const r = await fetch(base?.replace(/\/$/,'') + '/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${process.env.OCI_API_KEY||''}` },
    body: JSON.stringify({
      model: process.env.OCI_MODEL || 'grok-4',
      messages: [
        { role: 'system', content: 'You are a SQL translator for Oracle 23c. Return SQL only.'},
        { role: 'user', content: 'Top 10 customers by revenue in 2024 from SALES and CUSTOMERS.' }
      ]
    })
  });
  const j = await r.json();
  console.log(j?.choices?.[0]?.message?.content);
}
main();
