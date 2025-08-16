# Evaluation (quick & practical)

Use `scripts/eval-ab.ts` to run a simple A/B on a small test set (`eval/testset.jsonl`). It calls two models and prints the winner per prompt based on a naive heuristic. Replace with your rubric or plug into your favorite eval framework.

```bash
# Example (OpenAI-compatible)
PROVIDER=openai OPENAI_API_KEY=... MODEL_A=gpt-4o-mini MODEL_B=gpt-4o-mini pnpm eval
```

For OCI, point `OCI_BASE_URL` to your OpenAI-compatible gateway and set `OCI_API_KEY`, `OCI_MODEL`.
