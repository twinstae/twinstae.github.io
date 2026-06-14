# 진리의 배 조선소

탐정토끼가 만드는 진리의 배 블로그

이 블로그는 [Astro](https://astro.build/)와 [Svelte](https://svelte.dev/)로 만들었습니다. 
폰트는 [Pretendard](https://cactus.tistory.com/306)를 사용합니다.
[GitHub Pages](https://pages.github.com/)로 호스팅하고 있습니다.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Build output goes to `docs/` for GitHub Pages.

## Structure

- `src/content/blog/` - Blog posts (Markdown)
- `src/pages/` - Astro pages
- `src/components/` - Astro & Svelte components
- `src/layouts/` - Astro layouts
- `src/styles/` - Global CSS
- `public/` - Static assets
- `docs/` - Build output (GitHub Pages)

## Old URL Redirects

Old blog URLs (`https://twinstae.github.io/:slug/`) are automatically redirected to new URLs (`https://twinstae.github.io/blog/:slug/`) via redirect pages.
