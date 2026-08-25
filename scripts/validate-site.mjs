import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const errors = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules", "_site"].includes(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;

  const data = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
    data[key] = value;
  }
  return { data, body: content.slice(match[0].length) };
}

const sourcePages = walk(root).filter((filePath) => {
  const name = relative(filePath);
  return (name === "index.html" || name.startsWith("pages/")) && name.endsWith(".html");
});

const parsedPages = [];
const publishedPaths = new Map();

for (const filePath of sourcePages) {
  const name = relative(filePath);
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontMatter(content);

  if (!parsed) {
    errors.push(`${name}: 缺少 Jekyll front matter`);
    continue;
  }

  parsedPages.push({ filePath, name, ...parsed });

  for (const field of ["layout", "title", "description", "permalink", "page_key"]) {
    if (!parsed.data[field]) errors.push(`${name}: 缺少 ${field}`);
  }

  const permalink = parsed.data.permalink;
  if (publishedPaths.has(permalink)) {
    errors.push(`${name}: permalink 與 ${publishedPaths.get(permalink)} 重複 (${permalink})`);
  } else {
    publishedPaths.set(permalink, name);
  }

  if (/<(?:html|head|body)\b/i.test(parsed.body)) {
    errors.push(`${name}: 內容頁不應重複 html/head/body，請使用共用 layout`);
  }
  if (/<style\b/i.test(parsed.body)) errors.push(`${name}: 請將 inline style 移至 assets/css/`);
  if (/<script\b/i.test(parsed.body)) errors.push(`${name}: 請將 inline script 移至 assets/js/`);

  const ids = [...parsed.body.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) errors.push(`${name}: 重複 id：${duplicateIds.join(", ")}`);
}

for (const page of parsedPages) {
  const permalink = page.data.permalink;
  for (const match of page.body.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|tel:|#|javascript:|data:|\{\{)/i.test(value)) continue;

    const clean = value.split(/[?#]/)[0];
    if (!clean) continue;
    const resolved = clean.startsWith("/") ? clean : path.posix.resolve(path.posix.dirname(permalink), clean);
    if (!publishedPaths.has(resolved) && !fs.existsSync(path.join(root, resolved.replace(/^\//, "")))) {
      errors.push(`${page.name}: 找不到本機連結或資源 ${value}`);
    }
  }

  for (const match of page.body.matchAll(/['"](\/assets\/[^'"]+)['"]\s*\|\s*relative_url/g)) {
    const assetPath = match[1].replace(/^\//, "");
    if (!fs.existsSync(path.join(root, assetPath))) errors.push(`${page.name}: 找不到資源 ${match[1]}`);
  }
}

for (const requiredPath of ["/", "/administrative-affairs/", "/training.html", "/learning-guides.html", "/ta.html"]) {
  if (!publishedPaths.has(requiredPath)) errors.push(`缺少必要公開網址 ${requiredPath}`);
}

if (fs.existsSync(path.join(root, "admin.html"))) {
  errors.push("admin.html 不得發布於公開儲存庫");
}

const forbiddenNamePattern = /[\s()\u4e00-\u9fff]/;
for (const filePath of walk(path.join(root, "assets"))) {
  const name = path.basename(filePath);
  if (forbiddenNamePattern.test(name)) errors.push(`${relative(filePath)}: 資源檔名應使用英文小寫與連字號`);
}

if (errors.length) {
  console.error(`網站檢查失敗，共 ${errors.length} 項：`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`網站檢查通過：${sourcePages.length} 個頁面、${publishedPaths.size} 個公開網址。`);
