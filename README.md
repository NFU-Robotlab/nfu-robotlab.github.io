# NFU 智慧型機器人系統實驗室網站

國立虎尾科技大學智慧型機器人系統實驗室（NFU I.R.S. Lab）的公開網站。

- 正式網站：https://nfu-robotlab.github.io/
- 技術：GitHub Pages、Jekyll、Tailwind CSS
- 主要語言：繁體中文

## 專案結構

```text
.
├── _includes/             # 共用導覽列與頁尾
├── _layouts/              # Jekyll 共用頁面骨架
├── assets/
│   ├── css/               # 全站與各頁樣式
│   ├── images/            # 網站圖片
│   └── js/                # 共用與各頁互動程式
├── pages/
│   └── tutorials/         # 教學頁面內容
├── scripts/               # 自動檢查工具
├── index.html             # 首頁
├── _config.yml            # GitHub Pages / Jekyll 設定
└── AGENTS.md              # AI 維護規則
```

頁面來源雖然依功能放在 `pages/`，仍透過 `permalink` 保留原本網址。例如：

- `pages/training.html` → `/training.html`
- `pages/tutorials/onshape.html` → `/onshape-tutorial.html`

## 修改與檢查

1. 修改對應的 `pages/` 內容檔。
2. 共用導覽或頁尾請修改 `_includes/`，不要複製到每個頁面。
3. 執行 `npm test` 檢查網址、資源、重複 ID 與公開內容規則。
4. 透過 Pull Request 合併到 `main`，GitHub Pages 會自動更新網站。

更完整的規則請閱讀 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) 與 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 公開內容界線

此儲存庫與網站為公開狀態。帳號、密碼、個人資料、財務資料及實驗室內部行政流程不得放入本儲存庫。內部行政文件應存放在具有成員權限控管的私人空間。
