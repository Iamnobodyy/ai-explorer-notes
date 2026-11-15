/* AI 探索筆記站 — 共用腳本：導覽列、頁尾、文章索引、分類篩選、搜尋 */
(function () {
  'use strict';

  // 新增文章時，只需在此陣列加入一筆資料（首頁列表與搜尋會自動更新）
  var ARTICLES = [
    { slug: "chatgpt-workflow", title: "ChatGPT 入門：從對話到檔案分析", cat: "tools", date: "2026-11-9", read: 2, summary: "ChatGPT 可協助整理文件、比較資料與分析表格；功能會依帳戶、方案與版本而不同。", tags: ["ChatGPT", "檔案分析"] },
    { slug: "claude-intro", title: "Claude 入門：文件理解與長任務協作", cat: "tools", date: "2026-11-9", read: 2, summary: "Claude 可協助摘要、分析、寫作與程式協作；大型任務應拆解並設定驗收標準。", tags: ["Claude", "長文件"] },
    { slug: "gemini-intro", title: "Gemini 入門：多模態助理與學習應用", cat: "tools", date: "2026-11-9", read: 2, summary: "Gemini 產品線涵蓋文字與多模態任務；功能可用性可能受地區、帳戶與方案影響。", tags: ["Gemini", "多模態"] },
    { slug: "hf-diffusers-intro", title: "Hugging Face Diffusers：擴散模型工具箱", cat: "tools", date: "2026-11-9", read: 2, summary: "Diffusers 是用於擴散模型的開源函式庫，不是單一生圖網站；需留意模型、環境與授權。", tags: ["Hugging Face", "Diffusers", "擴散模型"] },
    { slug: "stable-diffusion-intro", title: "Stable Diffusion 入門：認識開放權重的圖像生成模型", cat: "tools", date: "2026-11-13", read: 7, summary: "了解 Stable Diffusion 的基本原理、常見使用方式，以及初學者該注意的硬體、授權與安全事項。", tags: ["Stable Diffusion", "圖像生成", "擴散模型"] },
    { slug: "ai-agent-intro", title: "AI Agent 是什麼？從回答問題到執行任務", cat: "concepts", date: "2026-11-10", read: 2, summary: "AI Agent 通常是模型搭配工具、規則與工作環境，能規劃步驟、採取行動並觀察結果。", tags: ["Agent", "工具使用", "自動化"] },
    { slug: "llm-basics", title: "大型語言模型（LLM）如何產生文字？", cat: "concepts", date: "2026-11-10", read: 2, summary: "LLM 透過大量資料學習語言模式，依上下文預測 token；流暢回答不代表每個細節都正確。", tags: ["LLM", "語言模型"] },
    { slug: "prompt-basics", title: "Prompt 基礎：怎麼把問題問清楚", cat: "concepts", date: "2026-11-13", read: 5, summary: "用「角色、任務、背景、格式、限制」五個要素，寫出更穩定、可重複使用的提示詞。", tags: ["Prompt", "LLM", "提示詞"] },
    { slug: "rag-intro", title: "RAG 是什麼？讓 AI 先查資料再回答", cat: "concepts", date: "2026-11-10", read: 2, summary: "RAG 把外部文件檢索結果交給模型參考，能補充專屬資料，但不保證答案一定正確。", tags: ["RAG", "檢索"] },
    { slug: "transformer-basics", title: "Transformer 是什麼？理解注意力機制", cat: "concepts", date: "2026-11-10", read: 2, summary: "Transformer 透過注意力機制處理序列中不同位置的關聯，是許多大型語言模型的重要架構基礎。", tags: ["Transformer", "注意力機制"] },
    { slug: "chatgpt-file-workshop", title: "實作教學：用 AI 閱讀 PDF 與整理重點", cat: "tutorials", date: "2026-11-13", read: 2, summary: "先確認模型讀取範圍，再要求頁碼或段落依據，最後回到原始 PDF 查核。", tags: ["PDF", "ChatGPT", "文件整理"] },
    { slug: "diffusers-first-image", title: "實作教學：第一次使用文字生圖模型", cat: "tutorials", date: "2026-11-13", read: 2, summary: "第一次生成時先描述主體、場景、風格與光線，從預設值開始，一次只改一個參數。", tags: ["Diffusers", "文字生圖"] },
    { slug: "github-pages-publish", title: "實作教學：把靜態網站發布到 GitHub Pages", cat: "tutorials", date: "2026-11-13", read: 2, summary: "GitHub Pages 可發布儲存庫中的靜態網站；發布前要確認首頁檔名、資源路徑與設定。", tags: ["GitHub Pages", "部署"] },
    { slug: "mlcc-study-path", title: "實作教學：跟著 Google ML Crash Course 學 AI", cat: "tutorials", date: "2026-11-13", read: 2, summary: "課程提供文字教材、影片、互動視覺化與練習，適合依主題分段學習。", tags: ["機器學習", "Google", "課程"] },
    { slug: "prompt-improvement-workshop", title: "實作教學：用四步驟改善 AI 提示詞", cat: "tutorials", date: "2026-11-13", read: 2, summary: "有效提示詞不一定越長越好，重點是讓模型知道任務、背景、交付格式與驗收方式。", tags: ["Prompt", "提示詞改善"] },
    { slug: "accessibility-ai-case", title: "應用案例：AI 如何協助改善資訊可近用性", cat: "cases", date: "2026-11-13", read: 2, summary: "AI 可協助產生替代文字、轉錄語音與簡化內容，但錯誤描述也可能誤導使用者。", tags: ["可近用性", "替代文字", "語音轉文字"] },
    { slug: "ai-study-assistant-case", title: "應用案例：把 AI 當作個人學習助教", cat: "cases", date: "2026-11-13", read: 2, summary: "AI 能依程度改寫解釋與產生練習，但真正學習仍需自己作答、檢查與反思。", tags: ["學習", "助教"] },
    { slug: "data-analysis-case", title: "應用案例：用 AI 初步探索問卷資料", cat: "cases", date: "2026-11-15", read: 2, summary: "AI 可協助探索資料，但分析結論必須回到欄位、樣本限制與計算方法確認。", tags: ["資料分析", "問卷"] },
    { slug: "research-workflow-case", title: "應用案例：用 AI 協助整理研究文獻", cat: "cases", date: "2026-11-15", read: 2, summary: "AI 能加速文獻初步整理，但不能取代閱讀原文、確認研究方法與核對引用。", tags: ["研究", "文獻整理"] },
    { slug: "small-business-ai-case", title: "應用案例：小店如何用 AI 規劃社群貼文", cat: "cases", date: "2026-11-15", read: 2, summary: "AI 適合產生文案初稿，但商品資訊、價格、活動條件與品牌語氣仍需店家確認。", tags: ["小店", "社群行銷"] },
    { slug: "ai-bias-reflection", title: "學習心得：AI 可能帶有偏見嗎？", cat: "notes", date: "2026-11-15", read: 2, summary: "AI 可能延續資料中的不平衡與社會偏見；只看整體準確率可能忽略特定群體的錯誤。", tags: ["偏見", "公平性"] },
    { slug: "copyright-reflection", title: "學習心得：AI 生成內容的著作權與引用責任", cat: "notes", date: "2026-11-15", read: 2, summary: "AI 生成不代表內容自動沒有權利問題；需分別確認模型授權、輸入素材權利與所在地法律。", tags: ["著作權", "引用"] },
    { slug: "hallucination-reflection", title: "學習心得：AI 回答很流暢，為什麼還要查證？", cat: "notes", date: "2026-11-15", read: 2, summary: "流暢、完整與正確是不同品質；AI 可協助整理資訊，但未查證回答不能直接當成事實。", tags: ["幻覺", "查證"] },
    { slug: "human-ai-collaboration-reflection", title: "學習心得：把 AI 當助手，而不是把決定權交出去", cat: "notes", date: "2026-11-15", read: 2, summary: "好的 AI 協作是讓模型處理適合的工作，人類負責目標、脈絡、價值判斷與最後驗收。", tags: ["人機協作", "決策"] },
    { slug: "privacy-reflection", title: "學習心得：把資料交給 AI 前，先想想隱私", cat: "notes", date: "2026-11-15", read: 2, summary: "上傳文件前先確認是否含個資、密碼、未公開資料或機密內容，並閱讀服務的資料處理說明。", tags: ["隱私", "資料安全"] }
  ];
  var CATS = { tools: 'AI 工具', concepts: '技術觀念', tutorials: '實作教學', cases: '應用案例', notes: '學習心得' };
  var root = document.body.getAttribute('data-root') || '';
  var params = new URLSearchParams(location.search);
  var currentCat = CATS[params.get('cat')] ? params.get('cat') : '';
  var pageKey = document.body.getAttribute('data-page') || '';

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // 導覽列
  var links = [['', '首頁', root + 'index.html']];
  Object.keys(CATS).forEach(function (k) { links.push([k, CATS[k], root + 'index.html?cat=' + k + '#articles']); });
  links.push(['about', '關於本站', root + 'about.html']);
  var active = pageKey === 'about' ? 'about' : (pageKey === 'home' ? currentCat : (document.body.getAttribute('data-cat') || ''));
  var items = links.map(function (l) {
    var cur = l[0] === active ? ' aria-current="page"' : '';
    return '<li><a href="' + l[2] + '"' + cur + '>' + l[1] + '</a></li>';
  }).join('');
  var h = document.getElementById('site-header');
  if (h) {
    h.className = 'site';
    h.innerHTML = '<div class="wrap bar"><a class="brand" href="' + root + 'index.html">AI 探索筆記站</a>' +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav">選單</button>' +
      '<nav class="main" id="main-nav" aria-label="主要導覽"><ul>' + items + '</ul></nav></div>';
    var btn = h.querySelector('.menu-btn'), nav = h.querySelector('nav');
    btn.addEventListener('click', function () { var o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
  }
  var f = document.getElementById('site-footer');
  if (f) {
    f.className = 'site';
    f.innerHTML = '<div class="wrap"><p><strong>AI 探索筆記站</strong><br>給初學者的繁體中文 AI 學習筆記，從概念到實作。</p>' +
      '<p><a href="' + root + 'index.html">回首頁</a></p></div>';
  }

  // 文章卡片與搜尋（僅首頁）
  var list = document.getElementById('article-list');
  if (!list) return;
  var q = document.getElementById('q'), chips = document.getElementById('chips'), status = document.getElementById('result-status');

  function render() {
    var kw = (q.value || '').trim().toLowerCase();
    var out = ARTICLES.filter(function (a) {
      if (currentCat && a.cat !== currentCat) return false;
      var hay = (a.title + a.summary + CATS[a.cat] + a.tags.join(' ')).toLowerCase();
      return !kw || hay.indexOf(kw) !== -1;
    }).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    list.innerHTML = out.length ? out.map(function (a) {
      return '<article class="card"><a class="tag" href="' + root + 'index.html?cat=' + a.cat + '#articles">' + CATS[a.cat] + '</a>' +
        '<h3><a href="' + root + 'articles/' + a.slug + '.html">' + esc(a.title) + '</a></h3>' +
        '<p>' + esc(a.summary) + '</p><div class="meta">更新：' + a.date + '　閱讀約 ' + a.read + ' 分鐘</div></article>';
    }).join('') : '<p class="empty">目前沒有符合的文章。請換個關鍵字，或選擇「全部」查看所有文章。</p>';
    status.textContent = '共 ' + out.length + ' 篇文章';
    Array.prototype.forEach.call(chips.children, function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-cat') === currentCat)); });
  }
  chips.innerHTML = [['', '全部']].concat(Object.keys(CATS).map(function (k) { return [k, CATS[k]]; })).map(function (c) {
    return '<button class="chip" type="button" data-cat="' + c[0] + '" aria-pressed="false">' + c[1] + '</button>';
  }).join('');
  chips.addEventListener('click', function (e) {
    var c = e.target.closest('.chip'); if (!c) return;
    currentCat = c.getAttribute('data-cat');
    history.replaceState(null, '', currentCat ? '?cat=' + currentCat + '#articles' : location.pathname + '#articles');
    render();
  });
  q.addEventListener('input', render);
  document.getElementById('search-form').addEventListener('submit', function (e) { e.preventDefault(); render(); });
  render();
})();
