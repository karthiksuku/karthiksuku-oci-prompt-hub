import os, requests, json

base = os.environ.get("OPENAI_BASE_URL","https://api.openai.com/v1")
key = os.environ["OPENAI_API_KEY"]

resp = requests.post(f"{base}/chat/completions",
    headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    json={
        "model": os.environ.get("OPENAI_MODEL","gpt-4o-mini"),
        "messages":[
            {"role":"system","content":"You answer with JSON only: {\"summary\": string}"},
            {"role":"user","content":"Summarize: We cut infra spend by 15% using RI and shapes."}
        ]
    })
print(resp.json())
