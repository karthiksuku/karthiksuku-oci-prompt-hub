# OCI Generative AI

Use an **OpenAI-compatible** gateway or your own proxy endpoint and set:

```
PROVIDER=oci
OCI_BASE_URL=https://your-oci-openai-compatible-endpoint/v1
OCI_API_KEY=...
OCI_MODEL=grok-4
```

> If you expose a private gateway, ensure it supports the OpenAI Chat Completions shape for `/chat/completions`.
