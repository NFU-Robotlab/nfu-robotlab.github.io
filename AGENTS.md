# AI maintenance instructions

This repository publishes the public NFU Intelligent Robot System Laboratory website.

## Non-negotiable rules

- Keep all public URLs declared in page front matter stable unless the user explicitly approves a migration.
- Reuse `_layouts/default.html`, `_includes/site-header.html`, and `_includes/site-footer.html`. Never paste shared navigation or footer markup into individual pages.
- Put shared styles in `assets/css/site.css`; put truly page-specific styles in `assets/css/pages/`.
- Put shared JavaScript in `assets/js/`; put page-specific JavaScript in `assets/js/pages/`.
- Use lowercase, descriptive, ASCII filenames with hyphens for new assets.
- Do not add credentials, personal data, financial records, private administrative instructions, or teacher account procedures. This repository is public.
- Keep `googledb7aa7ee4b9cc443.html` and `googleeb0a91bceb3a7c19.html` until the current Google Search Console verification is confirmed.
- Run `npm test` before proposing or committing changes.

## Page conventions

- Every published page must have front matter with `layout`, `title`, `description`, `permalink`, and `page_key`.
- Content pages belong in `pages/`; tutorial pages belong in `pages/tutorials/`.
- Use `page_css` and `page_js` only when a page needs dedicated assets.
- Use `{{ '/path/from/site-root' | relative_url }}` for local assets.
- External links opened in a new tab must include `rel="noopener noreferrer"`.
- Preserve Traditional Chinese as the primary reader-facing language.

## Verification

Run:

```bash
npm test
```

Review the rendered GitHub Pages preview before merging visual changes.
