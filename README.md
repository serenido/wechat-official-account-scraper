# WeChat Official Account Articles API (微信公众号文章)

Search WeChat Official Account articles (公众号文章) by keyword, or paste article links, and get the full text with account, author, publish time, province, original label and images as clean JSON. No WeChat account, no login, no cookies.

Runs in the cloud on Apify. No servers, no proxy setup, no code to maintain. **[Open it on Apify](https://apify.com/serenido/wechat-official-account-scraper)**

**Price:** $3 per 1,000 articles. No monthly fee. Apify's free plan gives $5 of usage every month, no credit card needed. [Current price](https://apify.com/serenido/wechat-official-account-scraper/pricing).

## What you get

- Keyword search in Chinese or English (Sogou WeChat search, about 100 articles per keyword)
- Full article text without HTML, word count, all images, video count and the 阅读原文 link
- Account name, account ID and WeChat ID, author, publish time in UTC and China time, IP province (IP属地), original (原创) label
- Filters: one account only, or only articles from the last N days; the same article found twice is saved once
- Deleted, removed, expired, invalid and blocked articles are saved as free rows with the reason, never charged

## Quick start: Python

```bash
pip install -U apify-client
```

```python
from apify_client import ApifyClient

client = ApifyClient("YOUR_APIFY_TOKEN")

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
```

## Quick start: JavaScript (Node.js)

```bash
npm install apify-client
```

```javascript
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
```

## Quick start: one HTTP call

Runs the tool and returns the rows in one request. Good for runs under 5 minutes; for bigger runs use the Python or JavaScript example.

```bash
curl -X POST "https://api.apify.com/v2/acts/serenido~wechat-official-account-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"keywords": ["咖啡", "人工智能"], "maxArticlesPerKeyword": 20, "fullText": true}'
```

Get your token in [Apify Console > Settings > API & Integrations](https://console.apify.com/settings/integrations).

## Use it from AI apps (MCP)

Any app that supports remote MCP servers (Claude, ChatGPT, Cursor, VS Code and others) can run this tool for you. Add this server URL: `https://mcp.apify.com?tools=serenido/wechat-official-account-scraper`. Your Apify account connects on first use. Example config for Cursor:

```json
{
  "mcpServers": {
    "apify": {
      "url": "https://mcp.apify.com?tools=serenido/wechat-official-account-scraper"
    }
  }
}
```

## Input example

```json
{
  "keywords": [
    "咖啡",
    "人工智能"
  ],
  "maxArticlesPerKeyword": 20,
  "fullText": true
}
```

Also: `articleUrls` (mp.weixin.qq.com/s/... links), `accountName`, `publishedWithinDays`, and `fullText: false` for a faster list without the text. All options are listed on the [input page](https://apify.com/serenido/wechat-official-account-scraper/input-schema).

## Output example (one row)

```json
{
  "status": "ok",
  "keyword": "咖啡",
  "rank": 9,
  "title": "咖啡好还是茶好？别选了，咖啡＋茶更好！",
  "accountName": "营养师顾中一",
  "accountId": "MzU1ODcxNDk0OQ==",
  "accountWechatId": "gh_70e3d115215b",
  "author": "顾中一工作室",
  "publishedAt": "2023-07-10T14:22:47Z",
  "publishedAtChina": "2023-07-10 22:22",
  "province": "北京",
  "isOriginal": true,
  "articleType": "article",
  "summary": "本文约 3000 字,阅读约需 6 分钟太长不看有研究发现既喝咖啡又喝茶,健康好处有互相增益效果.咖啡和茶不加糖的话都是很健康的...",
  "contentText": "本文约 3000 字，阅读约需 6 分钟\n太长不看\n有研究发现既喝咖啡又喝茶，健康好处有互相增益效果。\n咖啡和茶不加糖的话都是很健康的饮料，不过也要适量喝。\n咖啡和茶是我们日常生活中常见的两种健康饮料，它俩的成分有重合也...",
  "wordCount": 3265,
  "coverImage": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/3lzggpiaoaiakqlgIZJhjsLVjIySdKQZGeRzk9TKxcYqHsUUFPtFqssPibGCtrltCHjjMtibNziauQxhvYbWySuiagLQ/0?wx_fmt=jpeg",
  "images": [
    "https://mmbiz.qpic.cn/mmbiz_jpg/3lzggpiaoaialMmYTEibVp7k89gcHeOpeyibrCCLKZ7UW7YN7Y7vfwp42wwFZR6icdFLDUXfaTEQQeuOHUyOUr92Q1g/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1",
    "https://mmbiz.qpic.cn/mmbiz_jpg/3lzggpiaoaiakDo4uFD0JLwNXYNX3q4nadMkAqlBz0Mele60Tian8ykpBmGN1ExBk8bj0ZAgFJI1FlsIklxwLHPVA/640?wx_fmt=jpeg"
  ],
  "imageCount": 13,
  "videoCount": 1,
  "articleId": "MzU1ODcxNDk0OQ==_2247553650_1",
  "url": "https://mp.weixin.qq.com/s?src=11&timestamp=1792761471&ver=7044&signature=UroHxEkhT0avlAsm-9WjsYO0wr6qAI2iqNoVX2oubiMgt0jJGKUhqgSC39TTabSZOpmb-eFZHRzoXLIVa5uaPp3SEeLAUyjt-HXRZs3HfEKayHWNw2LZffEPp66ewAH9&new=1",
  "scrapedAt": "2026-10-23T13:18:45Z"
}
```

Real row from a test run on 23 October 2026, with contentText and images shortened here.

Download as JSON, CSV or Excel, or connect to Make, Zapier or n8n.

## Use cases

- China market and brand monitoring
- Building Chinese text datasets for research and AI
- Following what specific Official Accounts publish

## More tools by Serenido

- [Weibo Scraper](https://github.com/serenido/weibo-scraper): posts, hot searches, comments and creators. No login.
- [Bilibili Scraper](https://github.com/serenido/bilibili-scraper): videos, comments, danmaku and creators. No login.
- [AliExpress Product Details Scraper](https://github.com/serenido/aliexpress-product-details-scraper): every variant with price and stock, shipping to 89 countries.
- [AliExpress Search Scraper](https://github.com/serenido/aliexpress-search-scraper): price, discount and exact order count for any search.
- [Australian Supermarket Prices: Coles, Woolworths and ALDI](https://github.com/serenido/coles-woolworths-aldi-scraper): Coles, Woolworths and ALDI in one run, with unit prices.
- [Google Trends Scraper](https://github.com/serenido/google-trends-scraper): interest over time, rising queries, regions and Trending Now.
- [Football xG Scraper](https://github.com/serenido/football-xg-scraper): Understat xG tables, matches, shots, players and lineups.
- [Weibo Hot Search Scraper](https://github.com/serenido/weibo-hot-search): the live 微博热搜 list, changes since your last run, top posts per topic.
- [AliExpress Dropshipping Scraper](https://github.com/serenido/aliexpress-dropshipping): winning products with shipping to your country, landed cost and profit.
- [RedNote Trending Scraper](https://github.com/serenido/rednote-trending-scraper): 小红书 trending notes with full text, images, video, likes, saves and comments.

## Support

Found a bug or need a field? Open an issue here or on the [Issues tab on Apify](https://apify.com/serenido/wechat-official-account-scraper/issues).

Use it only for public data and follow the website's terms and the laws that apply to you. This project is not affiliated with the websites it reads.
