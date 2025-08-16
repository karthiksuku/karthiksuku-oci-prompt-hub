import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@docusaurus/Layout';

export default function Home(): JSX.Element {
  return (
    <Layout title="Prompt Engine Hub" description="Patterns, templates & tools for great prompts">
      <section className="heroBanner">
        <h1>Prompt Engine Hub</h1>
        <p>Community-driven patterns, templates, and tools for building great LLM prompts.</p>
        <div style={{display:'flex', gap:12, justifyContent:'center', marginTop:20}}>
          <Link className="button button--primary" to="/docs/getting-started">Get Started</Link>
          <Link className="button button--secondary" to="/playground">Try Playground</Link>
          <a className="button button--secondary" href="https://github.com/YOUR_GITHUB_USERNAME/REPO_NAME">GitHub</a>
        </div>
      </section>
      <div className="container">
        <div className="row">
          <div className="col col--4"><h3>🔧 Templates</h3><p>Ready-to-use JSON/CLI templates, with schema & validation.</p></div>
          <div className="col col--4"><h3>🧪 Patterns</h3><p>Role-based prompts, few-shot, tools, evaluators & more.</p></div>
          <div className="col col--4"><h3>🌐 Integrations</h3><p>OpenAI-compatible, Anthropic, <b>OCI Generative AI</b>, and more.</p></div>
        </div>
      </div>
    </Layout>
  );
}
