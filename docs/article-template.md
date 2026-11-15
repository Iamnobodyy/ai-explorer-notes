# 文章範本（依 AGENTS.md 第 6 節）

新增文章：複製 `articles/prompt-basics.html` 為 `articles/<新-slug>.html`，修改下列欄位，再到 `assets/js/main.js` 的 `ARTICLES` 陣列新增一筆資料。

## 必要欄位
1. 標題（`<h1>`、`<title>`）
2. 分類標籤（`<body data-cat>` 與標籤連結；可用值：tools / concepts / tutorials / cases / notes）
3. 更新日期（YYYY-MM-DD）
4. 閱讀時間（估計值）
5. 摘要（1–3 句）
6. 前言／學習目標
7. 正文（H2、H3）
8. 操作步驟或範例（編號步驟，說明預期結果）
9. 注意事項／常見問題
10. 結語或重點整理
11. 參考資料（有引用外部資訊時）

## main.js 資料格式
```js
{ slug: 'new-slug', title: '標題', cat: 'tools', date: 'YYYY-MM-DD', read: 5,
  summary: '摘要', tags: ['標籤1', '標籤2'] }
```

## 注意
- 檔名只用小寫英文、數字與連字號。
- 價格、版本、功能等易變資訊須標示查核日期。
- 圖片放在 `assets/images/`，並加上 alt 文字。
