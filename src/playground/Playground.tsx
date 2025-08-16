import React, {useState} from 'react';

export default function Playground(){
  const [model, setModel] = useState('gpt-4o-mini');
  const [system, setSystem] = useState('You are a helpful assistant.');
  const [prompt, setPrompt] = useState('Write a 1-paragraph welcome message.');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    setLoading(true);
    setResult('');
    try {
      const r = await fetch('http://localhost:5173/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ model, system, prompt })
      });
      const data = await r.json();
      setResult(data.output || JSON.stringify(data, null, 2));
    } catch (e:any){
      setResult('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="playground">
      <h1>Playground</h1>
      <div className="card">
        <label>Model</label>
        <input value={model} onChange={e=>setModel(e.target.value)} placeholder="e.g., gpt-4o-mini / anthropic:claude-3-5 / oci:grok-4"/>
        <label>System</label>
        <textarea value={system} onChange={e=>setSystem(e.target.value)}/>
        <label>Prompt</label>
        <textarea value={prompt} onChange={e=>setPrompt(e.target.value)}/>
        <button className="button button--primary" onClick={callApi} disabled={loading}>
          {loading? 'Running...' : 'Run'}
        </button>
      </div>
      <div className="card">
        <h3>Output</h3>
        <pre style={{whiteSpace:'pre-wrap'}}>{result}</pre>
      </div>
      <p><small>Note: this uses a <b>local proxy</b> at <code>http://localhost:5173</code>. See <code>scripts/dev-proxy.ts</code>.</small></p>
    </div>
  );
}
