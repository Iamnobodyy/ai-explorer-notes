# AI 探索筆記站（AI Explorer Notes）

以繁體中文為主的 AI 學習知識庫。使用原生 HTML、CSS、JavaScript，無需建置，可直接部署到 GitHub Pages。專案規範見 [AGENTS.md](AGENTS.md)。

## 本機預覽
方法一：直接雙擊 `index.html` 以瀏覽器開啟。

方法二（建議，較接近正式環境）：在專案資料夾執行
```bash
python3 -m http.server 8000
```
再開啟 <http://localhost:8000>。

## 部署到 GitHub Pages
1. 在 GitHub 點右上角 **+ → New repository**，名稱例如 `ai-explorer-notes`，選 Public，建立。
2. 在專案資料夾執行：
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI 探索筆記站"
   git branch -M main
   git remote add origin https://github.com/<你的帳號>/ai-explorer-notes.git
   git push -u origin main
   ```
3. 到 Repository 的 **Settings → Pages**。
4. **Build and deployment → Source** 選 **Deploy from a branch**；Branch 選 `main`，資料夾選 `/ (root)`，按 Save。
5. 等待約 1–2 分鐘，網址為 `https://<你的帳號>.github.io/ai-explorer-notes/`。

## 新增文章
1. 複製 `articles/prompt-basics.html`，改名為新的 slug（小寫英文與連字號）。
2. 修改內容，格式見 `docs/article-template.md`。
3. 在 `assets/js/main.js` 的 `ARTICLES` 陣列新增一筆資料，首頁列表、分類與搜尋會自動更新。

## 結構
```
index.html  about.html  AGENTS.md  README.md
assets/{css/style.css, js/main.js, images/}
articles/  docs/article-template.md
```
