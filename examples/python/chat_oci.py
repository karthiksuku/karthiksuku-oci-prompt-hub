import os, requests, json

base = os.environ["OCI_BASE_URL"].rstrip('/')
key = os.environ.get("OCI_API_KEY","")

resp = requests.post(f"{base}/chat/completions",
    headers={"Authorization": f"Bearer {key}", "Content-Type":"application/json"},
    json={
        "model": os.environ.get("OCI_MODEL","grok-4"),
        "messages":[
            {"role":"system","content":"You only produce JSON: {\"sql\": string, \"params\": object}"},
            {"role":"user","content":"Orders by month 2024; table SALES(order_date, amount). Group and sum."}
        ]
    })
print(resp.json())
