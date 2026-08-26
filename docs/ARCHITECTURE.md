# 網站架構

## 建置方式

網站使用 GitHub Pages 內建的 Jekyll 建置。`_layouts/default.html` 提供完整 HTML 骨架，頁面只保留自己的內容。導覽列與頁尾分別由 `_includes/site-header.html`、`_includes/site-footer.html` 共用。

## 內容與網址

來源檔與公開網址由 front matter 的 `permalink` 對應：

| 來源檔 | 公開網址 |
| --- | --- |
| `index.html` | `/` |
| `pages/training.html` | `/training.html` |
| `pages/learning-guides.html` | `/learning-guides.html` |
| `pages/ta.html` | `/ta.html` |
| `pages/administrative-affairs.html` | `/administrative-affairs/` |
| `pages/tutorials/onshape.html` | `/onshape-tutorial.html` |
| `pages/tutorials/equipment.html` | `/equipment-tutorial.html` |
| `pages/tutorials/3d-printing.html` | `/3d-printer-tutorial.html` |
| `pages/tutorials/robotis.html` | `/robotis-tutorial.html` |
| `pages/tutorials/csharp.html` | `/csharp-tutorial.html` |

請勿只為了整理檔名而變更 `permalink`，否則舊連結會失效。

## 樣式

- `assets/css/site.css`：全站基本樣式、導覽列、頁尾與無障礙設定。
- `assets/css/pages/*.css`：單一頁面專用樣式。
- Tailwind CSS 仍負責既有頁面的 utility class，避免大規模重寫造成畫面破壞。

## JavaScript

- `assets/js/site.js`：全站共用導覽、進場動畫與小白點工具列控制。
- `assets/js/pages/*.js`：各教學頁的模擬器、測驗、對話框或進度功能。

頁面本身不應再放大型 inline script。

## 行政內容邊界

`/administrative-affairs/` 是公開行政知識庫，只整理舊站已公開的一般規則與檢查清單。公開網站不提供權限驗證，因此帳號操作、員工代碼、個人資料、實際報帳明細及未公開計畫資料不得放在此儲存庫；成員限定流程應繼續使用獨立私人儲存庫或具備身分驗證的服務。
