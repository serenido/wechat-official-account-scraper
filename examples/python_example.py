import os

from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])

run = client.actor("serenido/wechat-official-account-scraper").call(run_input={
    "keywords": [
        "咖啡",
        "人工智能"
    ],
    "maxArticlesPerKeyword": 20,
    "fullText": True
})

for item in client.dataset(run.default_dataset_id).iterate_items():
    print(item)
