---
title: 'shiki로 elder.js 코드블럭 문법 강조하기'
excerpt: 'Elder.js 기본 템플릿에 내장된 shiki를 이용해서 코드블럭 문법 강조(syntax highlight)를 해봅시다.'
date: '2021-07-11T13:27:22.262492'
author: 탐정토끼(Taehee Kim)
tag: '작성 중, Elder.js, Blog, syntax highlighting'
---

## elder.config.js 에 shiki 테마 설정하기

```js
{
  plugins: {
    '@elderjs/plugin-markdown': {
      ///...
      useSyntaxHighlighting: {
        theme: 'material-theme-darker',
      },
    },
}
```
