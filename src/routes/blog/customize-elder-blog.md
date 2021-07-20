---
title: 'Elder 블로그 커스터마이징 하기'
excerpt: 'Elder 기본 템플릿에 웹 폰트, 날짜 순 정렬, tooltip 같은 기능들을 추가해봅니다.'
date: '2021-07-08T05:01:27.798Z'
author: 탐정토끼(Taehee Kim)
tag: '작성 중, Svelte, Elder.js, Blog'
---

이번에는 Elder.js의 구조를 살펴보고 간단하게 레이아웃을 수정해보겠습니다.

저번에는 Elder.js 템플릿을 가져와서 GitHub Pages에 배포도 해봤습니다. 이제 템플릿을 커스텀해서, 나만의 블로그를 만들 시간입니다.

일단 가볍게 전체 구조를 살펴보고, 기능들을 만들면서 하나씩 배워보겠습니다. 다음 프로젝트 구조를 구경만 해보세요. 이런 게 있구나 알아보시기만 하면 됩니다.

## Elder.js 프로젝트 구조
- node_modules : 저희가 설치한 각종 모듈들
- assets : 전체 기본 css, 이미지, robots.txt 등이 들어갑니다.
  - style.css
- src : 프로젝트 소스 파일
  - components : 스벨트 컴포넌트
    - BlogTeaser.svelte
    - ...
  - layouts : 기본 레이아웃. 틀
  - routes : 파일 시스템 기반 URL
    - blog : 블로그 글
      - Blog.svelte : 블로그 페이지의 스벨트 컴포넌트
      - route.js : url 과 데이터 설정
      - <글의 slug>.md : 마크다운으로 쓴 글 본문
    - home : 초기 화면
      - Home.svelte
      - route.js
  - docs : 실제로 생성된 사이트 파일
  - build.js
  - cleanPublic.js : docs 폴더를 정리해줌
  - hook.js
  - server.js
  - shortcodes.js
- .gitignore : 저번에 만든 git에 올리지 않을 파일 목록
- .nojekyll : 깃허브에게 jekyll 을 쓰지 않는다고 알려주는 파일
- elder.config.js : 엘더 js 설정
- esbuild.js : esbuild 설정
- rollup.config.js : 롤업 설정
- svelte.config.js : 스벨트 설정
- package.json : 프로젝트 의존성, 스크립트 등 설정

처음 배울 때에는 원래 정신이 없기 마련입니다. 일단 내게 필요한 기능을 만드는데 필요한 부분만 조금씩 배워보겠습니다.

## 새로운 글쓰기. 불필요한 글 지우기.

먼저 src/routes/blog/route.js 를 열어보면 다음과 같은 내용이 보이실 겁니다.

```javascript
module.exports = {
 // 마크다운 플러그인이
 // data와 all의 내용을 채워준다는 설명
  data: {},
  all: () => [],
  permalink: '/:slug/',
};
```

일단 permanent link는 앞으로 몇 년 동안 이 페이지로 접근할 수 있는 URL은 이곳임을 알려주는 표시입니다. 검색엔진은 이 URL을 믿고 사람들을 데려오기 때문에 때문에 마음대로 permalink가 바뀌면 안 됩니다. {{keyword}}SEO{{/keyword}}에 중요한 이유를 아시겠죠?

여기서는 permanlink 가 /:slug/ 모양이라고 템플릿을 만들어놨습니다. 여기서 slug는 url에 쓸 수 있게 띄어쓰기 대신 - 등으로 연결한 글 제목인데요. 영어로 쓴 마크다운 파일 제목이 slug가 됩니다. 예를들어 `getting-started.md` 파일은 .md 확장자를 빼버리고 `/getting-started/`가 url이 됩니다. 중요한 건 파일 이름을 일단 영문 알파벳으로 해줘야한다는 점입니다.

그러면 Blog.svelte를 살펴보러 가겠습니다. data와 all을 마크다운 플러그인이 어떻게 채워줬을까요?

코드를 열어보시면 맨 위에 script가 있습니다.

```html
<script>
  export let data, request; // data의 내용은 markdown plugin이 외부에서 넣어줌.
  const { html, frontmatter } = data;
</script>
```

export let 으로 data와 request를 선언해놓으면, 마크다운 플러그인이 값을 넣어줍니다. data를 구조 분해할당해서 html과 frontmatter 를 꺼내오는데요. 구조 분해 할당을 잘 모르신다면 다음과 같은 코드를 줄여 쓴거라고 생각하시면 됩니다.
```javascript
// 전통적인 방법.
const html = data.html;
const frontmatter = data.html;

// 구조 분해 할당
const { html , frontmatter } = data;
```

그러면 html이랑 frontmatter는 어디서 왔을까요? 마크다운 플러그인이 blog 폴더에 있는 `.md` 파일들을 찾아서 변환한 겁니다.

`getting-started.md` 마크다운 파일을 하나 열어보면 이렇게 생겼습니다.

위에 title부터 author 까지가 frontmatter입니다. 그 다음에 이어지는 본문 마크다운이 html로 변환됩니다. 마크다운은 html을 편리하게 쓰기 위한 문법입니다. 인터넷에 검색해보시면 마크다운 문법을 쓰는 방법을 설명한 글이 많으니, 잘 모르신다면 이번 기회에 한 번 배워보세요.

```
---
title: 'Getting Started with Elder.js'
excerpt: 'You have the starter template of Elder.js running. So what is next? This guide will help you explore the project.'
date: '2020-03-16T05:35:07.322Z'
author: Nick Reese
---

Sweet! So you've got the Elder.js starter template up and running. What's next?

## 4 Routes To Explore

This project is structured to follow the required Elder.js folder structure which you can see below, but in short you've got several routes in the `./src/routes/` folder.
```

그러면 이렇게 변환한 html과 frontmatter로 뭘 어떻게 하는 걸까요? 다시 `Blog.svelte`로 돌아가 봅시다.

`<style>` 태그를 지나치면 `<svelte:head>`가 나옵니다. 이 친구는 역시 검색엔진에게 이런저런 정보를 알려주기 위한 정보를 html header에 추가해줍니다.

`<title>`은 말 그대로 글의 제목입니다. 탭에 제목이 뜨게 되고, frontmatter에 적어놨던 title을 가져옵니다. svelte에서는 html에 js 값을 넣을 때 {}로 감싸줍니다. 예를 들어 title에 값을 채워넣으면 다음과 같이 렌더링될 겁니다.

`<title>Svelte Elder.js 블로그 만들기</title>`

다음으로 `<meta name="description"`은 페이지가 어떤 내용인지 설명합니다. 여기서는 frontmatter에 적어놨던 excerpt를 가져옵니다. excerpt는 발췌라는 뜻인데. 보통 글의 첫 부분 내용을 가져옵니다. 검색엔진에 미리보기로 뜨는 그 내용입니다.

마지막으로 `<link>`는 아까 정해뒀던 permanlink를 넣어줍니다. 검색엔진에게 premanlink는 이거라고 알려주는 부분입니다.

그 다음은 이제 화면의 내용을 HTML로 본격적으로 그리게 됩니다.
```html
<a href="/">&LeftArrow; Home</a> // 블로그 홈으로 돌아가기

<div class="title">
  <h1>{frontmatter.title}</h1> // 제목
  {#if frontmatter.author}<small>By {frontmatter.author}</small>{/if} // 글쓴이가 있으면 표시
</div>

{#if html} // html이 있으면
  {@html html} // html을 표시
{:else}
  <h1>Oops!! Markdown not found!</h1>
{/if}
```

여기서 중요한 친구는 {#if 조건} 내용 {/if} 구문입니다. 스벨트는 옛날 템플릿 언어들을 닮았습니다. html에 리액트처럼 ? 삼항 연산자나 && 문을 쓰지 않고, 이렇게 if 템플릿 안에 html을 넣어줍니다.

마찬가지로 frontmatter에서 title과 author를 꺼내서 넣었고요. 아까 같이 data에서 꺼냈던 html도 넣어줬습니다.

@html 은 html을 있는 그대로 삽입하기 위한 명령어입니다. 시험삼아 @html을 지우고 npm run dev로 서버를 실행해보세요. 글로 들어가면 렌더링 되지 않은 HTML 코드 자체가 보일 겁니다. @html이 있어야 html을 내용 그대로 삽입할 수 있습니다.

## 게시글 목록 날짜 순으로 정렬하기

## 게시글 목록에 날짜 달기

