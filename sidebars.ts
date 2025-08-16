export default {
  docs: [
    { type: 'doc', id: 'intro' },
    { type: 'doc', id: 'getting-started' },
    {
      type: 'category',
      label: 'Prompt Patterns',
      collapsed: false,
      items: [
        'patterns/role-based',
        'patterns/few-shot',
        'patterns/chain-of-thought',
        'patterns/tool-use'
      ]
    },
    {
      type: 'category',
      label: 'Templates',
      items: [
        'templates/overview',
        'templates/json-schema',
        'templates/cli'
      ]
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/overview',
        'integrations/openai-compatible',
        'integrations/anthropic',
        'integrations/oci-generative-ai'
      ]
    },

    {
      type: 'category',
      label: 'Prompt Library',
      items: [
        'prompts/index'
      ]
    },
    {
      type: 'category',
      label: 'Evaluation',
      items: [
        'evaluation/overview'
      ]
    },
    {
      type: 'category',
      label: 'Cookbook',
      items: [
        'cookbook/overview',
        'cookbook/email-drafter',
        'cookbook/sql-helper',
        'cookbook/rag-starter'
      ]
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/contributing',
        'community/code-of-conduct'
      ]
    }
  ]
} as const;
