import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const run = await client.actor("serenido/wechat-official-account-scraper").call({
    "keywords": [
        "咖啡",
        "人工智能"
    ],
    "maxArticlesPerKeyword": 20,
    "fullText": true
});

const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
