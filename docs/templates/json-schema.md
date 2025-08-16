# Prompt Template Schema

A draft schema for storing prompts & metadata.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Prompt",
  "type": "object",
  "properties": {
    "id": {"type": "string"},
    "title": {"type": "string"},
    "system": {"type": "string"},
    "user": {"type": "string"},
    "tags": {"type": "array", "items": {"type": "string"}}
  },
  "required": ["id", "title", "user"]
}
```
