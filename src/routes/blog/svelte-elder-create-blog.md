---
title: 'Svelte Elder.js 블로그 만들기'
excerpt: '검색 엔진 최적화(SEO)된 Svelte 정적 페이지 생성기인 ElderJS로 블로그 만드는 과정을 설명합니다.'
date: '2021-07-07T15:01:00.618Z'
author: 탐정토끼(Taehee Kim)
---

이 블로그는 [Svelte](https://svelte.dev/)와 [Elder.js](https://elderguide.com/tech/elderjs/)로 만들었습니다. 이 글에서는 여러분에게 Svelte와 Elder.js를 소개하고, 여러분도 비슷한 블로그를 만들 수 있게 도와드리려 합니다.

## 필요한 것

제 블로그는 초보도 쉽게 따라할 수 있도록 자세하고 친절하게 쓰려 합니다. 이미 많이 알고 계시는 분들은 큰 제목 위주로 빠르게 읽어 내려가시면 되겠습니다.

- HTML, CSS, JS에 대해 기본적인 지식이 있어야합니다.
  - 잘 모른다면 [생활코딩 WEBn](https://opentutorials.org/course/3083) 강좌로 시작하길 권해드립니다.
- [Node.JS](https://nodejs.org/ko/download/)가 설치되어 있고, NPM 을 사용할 수 있어야 합니다.
  - [생활코딩 Node.js 설치](https://opentutorials.org/course/3332/21029) 강의 영상을 참고하세요.
- GitHub 계정이 있고, Git을 사용할 줄 알아야 합니다.
  - [생활코딩 GIT1](https://opentutorials.org/course/3837), [생활코딩 GitHub](https://opentutorials.org/course/307/2475) 강좌도 있습니다. (없는 게 없네요!)

## Svelte.js와 Elder.js를 소개합니다.
이 두 친구와 SEO, JAM Stack 등에 대해 이미 잘 알고 계신다면 바로 실전으로 넘어가셔도 됩니다.

### Svelte는 가상 돔 없이 바닐라JS에 가깝게 개발할 수 있는 웹 프레임워크입니다.
Svelte는 요즘 유명해졌습니다. Angular, React, Vue 3대장을 이은 다크호스로 주목 받고 있죠. 물론 Svelte가 뭔지 모르시는 분도 있을 겁니다.

Svelte가 도대체 뭐길래? 공식 홈페이지에서는 다음 3가지 특징을 밀고 있습니다.

- Write less code : HTML, CSS, 바닐라 JS에 가깝게 코딩할 수 있고요. 복잡한 보일러 플레이트가 거의 없습니다.
- No virtual DOM : 프레임워크 오버헤드 없이, 가벼운 바닐라 JS 코드로 컴파일됩니다. [번들 용량이 놀라울 정도로 작습니다](https://miro.medium.com/max/2000/1*6HK361f-UDqNpWuTA68jHw.png).
- Truly reactive : 복잡한 상태 관리 라이브러리 없이도, 쉽게 상태를 관리하고, 변화에 '반응'해서 빠르고 정확하게 UI를 변경합니다.

다음은 이 블로그 게시글 목록에 있는 카드를 만드는 스벨트 컴포넌트입니다.

```html
// BlogTeaser.svelte
<script>
  export let blog; // 컴포넌트의 prop입니다.
  export let helpers;

  // ISO 포맷인 날짜를 사람이 읽을 수 있는 모양으로 변환합니다.
  const formattedDate = new Intl.DateTimeFormat(
    "ko-KR", {
      dateStyle: "long",
      timeStyle: "short"
    })
    .format(new Date(blog.frontmatter.date));
</script>

<!-- 리액트처럼 {} 안에 js 코드를 넣을 수 있습니다. -->
<a href={helpers.permalinks.blog({ slug: blog.slug })}>
<div class="entry card">
    <h3>{blog.frontmatter.title}</h3>
  <span class="date-badge">
    {formattedDate}
  </span>
  <p>{blog.frontmatter.excerpt}</p>
</div>
</a>


<!--
css도 평범하게 사용하면 됩니다.
scope가 해당 컴포넌트 안으로 제한되기 때문에
복잡한 className 없이도 selector를 간단하게 유지할 수 있습니다.
-->
<style>
  span.date-badge {
    color: gray;
    font-size: 80%;
    width: fit-content;
  }

  h3 {
    margin: 0;
    color: var(--primary);
  }

  p {
    margin: 0.25rem;
    color: var(--primary-text);
  }
</style>
```

### Svelte 영어 튜토리얼, 한국어 가이드
Svelte 홈페이지에는 따로 설치 없이 바로 해볼 수 있는 [영어 튜토리얼](https://svelte.dev/tutorial/basics)이 있습니다. 

한국어 자료로는 [Svete.js 완벽 가이드](https://heropy.blog/2019/09/29/svelte/)도 있습니다. 저자 분이 인프런에서 유료 강의도 하고 계세요.

### Elder.js는 검색엔진에 최적화된 Svelte 정적 사이트 생성기(SSG)입니다.
Elder.js는 CSR(Client Side Rendering)과 SSR(Server Side Rendering)의 단점을 해결하기 위해 등장한 JAM stack 정적 사이트 생성기(Static Site Generator)입니다. Elder.js 는 Svelte 앱을 정적인 HTML과 자그마한 컴포넌트로 분할해서 정적 파일로 배포할 수 있게 해줍니다.

SEO, 즉 검색 엔진 최적화(Search Engine Optimization)는 블로그나 사이트를 만드는 사람이라면 신경 쓸 수 밖에 없는 요소입니다. 구글이나 네이버의 크롤링 로봇들은 인터넷을 돌아다니면서 HTML 파일을 읽고 웹사이트에 어떤 내용이 있는지 정리합니다.

하지만 React를 비롯해서 웹브라우저에서 렌더링 되는 프레임워크들은 검색 엔진이 읽기 어려워합니다. 식당에서 음식을 고르려는데, 식재료와 레시피만 적혀 있는 것과 다르지 않습니다. 사용자의 웹 브라우저가 직접 html을 계산해야 하기 때문에 속도도 느리죠.

그래서 서버에서 html을 렌더링하기도 합니다. SSR 서버 사이드 렌더링이 바로 그것이죠. React 기반인 Next.js가 대표적입니다. 하지만 SSR은 상대적으로 비싼 서버를 굴려야하기 때문에, 저희 같은 일반인은 물론이고 회사에게도 부담입니다.

여기서 [JAM Stack](https://jamstack.org/)이 등장합니다. 미리 가능한 페이지들을 정적(static) HTML 파일로 만들어서 CDN(콘텐츠 배달 네트워크)에 올려놓고, 추가로 필요한 데이터만 작은 API 서버에서 받아오게 하는 것이죠.

이러면 Svelte나 React 같은 최신 프런트엔드 프레임워크를 사용하면서도, 가볍게 블로그나 사이트를 운영할 수 있습니다.

이야기를 더 듣고 싶으시다면 [웹 프런트 엔드의 간략한 역사](https://twinstae.github.io/brief-history-of-web-front/)를 읽어주세요.

Elder.js는 이러한 JAM 스택에서도 특히 SEO 전문가들이 만든 프레임워크입니다. 여러분의 블로그가 더 잘 검색될 수 있도록 사소한 것 하나하나 warning을 띄우고 Tip을 알려주죠. Sitemap을 비롯한 여러 요소도 알아서 생성해줍니다. 높은 조회수를 원하신다면, 정말 매력적인 셈이죠. :)

이제 설명은 끝입니다. 실전으로 들어가보죠!

## Elder.js 템플릿 세팅하기

그러면 공식 가이드를 따라서, 프로젝트를 세팅해봅시다.

앞서 말씀드렸듯 node.js와 함께 npm 이 설치되어 있어야합니다.

잘 모르겠다면 명령 프롬프트나 터미널을 열고 다음 명령어를 쳐보세요.
```
npx --version
# 6.14.12 이런 식으로 나오면 설치가 되어 있는 겁니다.
```
npx는 프로젝트 템플릿을 다운 받아 세팅해줍니다. 다음 명령어를 입력하면 <내 깃허브 아이디>.github.io 라는 이름의 폴더와 기본 파일들이 생성됩니다.

```bash
npx degit Elderjs/template <내 깃허브 아이디>.github.io
```
저는 깃허브 아이디가 `twinstae` 이기 때문에 `twinstae.github.io`로 만들었습니다.

이제 다음 명령어들을 차례차례 입력합니다. # 은 주석이니 무시하셔도 됩니다. 잘 모르는 터미널 명령어가 있다면 인터넷에 더 자세한 내용을 검색해보세요.

```bash
# cd는 change directory의 줄임말입니다.
# 방금 만든 프로젝트 폴더 안으로 이동합니다.
cd <내 깃허브 아이디>.github.io

# package.json 파일에 적혀 있는 라이브러리들을 다운 받습니다.
# svelte와 elder.js 등등의 모듈이 node_modules 폴더에 설치 됩니다.
# yarn 을 사용한다면 yarn install도 가능합니다.
npm install

# package.json에 있는 start 스크립트를 실행합니다.
# dev 스크립트가 프로젝트를 빌드하고, 개발용 서버를 실행합니다.
npm start

# 웹 브라우저에서 http://localhost:3000 으로 들어가면 사이트를 볼 수 있습니다.
open http://localhost:3000
```

정상적으로 프로젝트가 세팅이 되었다면, 웹 브라우저에서 다음과 같은 템플릿 사이트를 볼 수 있습니다.

![웹 브라우저에 Elder.js 템플릿 사이트가 열린 모습. Hello World: Welcome to Elder.js 라는 제목이 큰 글씨로 적혀 있다.](https://res.cloudinary.com/practicaldev/image/fetch/s--A0xtvNLd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/mksj4g4iuntzxkx5xdau.jpg)

## Elder.js Github Pages에 배포하기
개발용 localhost 서버는 내 컴퓨터에서만 볼 수 있습니다. 이제 저희 템플릿 프로젝트를 github pages에 올려서, 누구나 언제 어디서나 접속할 수 있게 만들어봅시다.

영상이 편하신 분은 [생활코딩 WEBn 웹 호스팅](https://opentutorials.org/course/3084/18891) 강좌를 참고하세요. 약간 옛날 자료이긴 하지만 큰 개념을 잡는 데에는 무리가 없을 겁니다.

### github 저장소 만들기
깃허브에 가입하지 않으셨다면 먼저 [회원가입](https://github.com/signup)(Sign Up), 로그인(Sign In)을 해주세요.

이제 저희 코드가 올라갈 클라우드 저장소(Repository)를 만들어야 합니다. 보통 줄여서 레포(Repo)라고도 부릅니다. 왼쪽 위에 보시면 다음과 같이 생긴 초록 버튼이 있습니다. 누르면 새 레포를 만드는 페이지가 나옵니다.

<a href="https://github.com/new" target="_blank" style="padding: 4px; background-color: green; border-radius: 4px; color: white; border-color: transparent">
<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" style="color: white;">
    <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
</svg>
 New
</a> 사실 이 버튼을 눌러도 바로 이동합니다.

1. 레포 이름은 앞서 정했던 `<내 깃허브 아이디>.github.io` 로 합니다.
2. Public과 Private가 있는데, Private로 하면 남들이 볼 수 없습니다. 사람들이 우리 사이트에 접속할 수 있게 하려면 Public을 선택합니다.
3. README.md 파일이나 .gitignore 파일에 대해서는 다음 단계에서 설명합니다.

![깃허브 new repo 생성 페이지의 모습. repository name에 1, public/private 에 2, README 체크박스에 3이라는 번호가 적혀져 있다. 출처는 생활코딩 WEBn 강좌](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7820.jpeg)

### github pages 설정하기
이제 저장소를 만들었으니, 저장소의 파일을 서빙하도록 설정해야 합니다.

저장소 메뉴에 보면 Settings(설정)이 있습니다.
![Github 저장소 메뉴 사진. Settings 가 강조되어 있다.](https://docs.github.com/assets/images/help/repository/repo-actions-settings.png)

Pages 탭에 들어갑니다.

![설정의 메뉴 목록 사진. Pages가 강조되어 있다.](https://docs.github.com/assets/images/help/pages/pages-tab.png)

Source 폴더를 `/(root)`에서 `/docs` 폴더로 바꾸고 저장(Save)해줍니다.

### .gitignore로 용량이 큰 파일, 보안에 민감한 파일 숨기기
이제 아까 만들어둔 템플릿 프로젝트 폴더에 메모장이나 텍스트 에디터를 열고 `.gitignore` 라는 파일을 하나 만듭니다. txt 확장자로 저장하면 안 되고, 모든 파일 형식 으로 저장합니다.

.gitignore에 적힌 파일이나 폴더는 remote 저장소에 올라가지 않게 됩니다. 저는 다음과 같이 3가지 폴더를 넣어주었습니다. 수정하고 저장합니다.

- node_modules는 용량이 크기 때문에
- ___ELDER___는 컴파일된 중간 파일들이라서
- .env는 보안에 중요한 key 등이 들어가기 때문에 제외했습니다.

```text
# .gitignore 파일 내용

node_modules
___ELDER___
.env
```

### .nojekyll 파일 넣어서 asset 서빙되게 하기

Github Pages는 원래 Jekyll 이라는 루비 정적 사이트 생성기를 사용하는 게 기본입니다. 저희는 Elder.js 를 쓰기 때문에 .nojekyll 설정을 해줘야 합니다. 이 설정을 안 해주면 사이트 css나 이미지 같은 asset을 불러오지 못하게 됩니다. 디자인이 모두 날아간 황량한 HTML을 보지 않으려면...

.nojekyll 파일을 만들어줍시다. 메모장으로 파일을 만들고 저장하면 됩니다. 내용은 비어 있어도 상관 없습니다.

### 배포되는 public 폴더 이름을 docs로 바꾸기
github pages는 root 폴더나 docs 라는 이름을 가진 폴더만 서빙할 수 있습니다. elder.js 는 기본적으로 public 폴더에 빌드된 html 파일들이 들어갑니다. 그렇기 때문에 설정을 바꿔서 docs 폴더에 들어가게 해줘야 합니다.

`elder.config.js` 파일을 텍스트 편집기로 열어보세요. 설정이 많지만 저희가 신경 쓸 건 딱 두 가지, 'origin'과 'distDir'입니다.

`origin`은 비어 있을 겁니다. 내 사이트의 host 도메인을 넣어줘야 하는데요. `https://<내 깃허브 아이디>.github.io`를 적어주면 됩니다.

`distDir`은 `public`으로 되어 있을 겁니다. `docs` 로 바꿔줍니다.

```javascript
module.exports = {
  origin: 'https://<내 깃허브 아이디>.github.io', // <- 여기에 내 깃허브 pages 주소를 넣어줍니다.
  lang: 'ko-KR',
  srcDir: 'src',
  distDir: 'docs', // <- 여기를 docs로 바꿔 줍니다.
  // 길어서 생략
```

### 원격 저장소에 push 하기
이제 git으로 저희의 github 원격(remote) 저장소에 프로젝트를 올려보겠습니다. 혹시 빼먹고 넘어간 건 없는지 한 번 점검해보세요.

문제가 없는 것 같다면 이제 터미널을 열고, 아까 저희가 만들어둔 템플릿 프로젝트 폴더로 이동합니다. cd 명령어를 이용하면 됩니다. 잘 모르겠다면 [cd 명령어를 검색](https://www.google.com/search?q=cd+%EB%AA%85%EB%A0%B9%EC%96%B4)해보세요

이제 다음 명령어를 차례대로 실행합니다.

```bash
# 현재 폴더를 깃 프로젝트로 설정합니다.
git init

# 현재 폴더의 모든 파일을 git stage로 올려서 선택합니다.
git add .

# stage에 선택된 파일들을 커밋해서 확정합니다.
git commit -m "Initial commit"

# main 이라는 브랜치 버전을 만듭니다. 
git branch -M main

# 내 깃허브 원격 저장소를 추가해서 연결합니다.
git remote add origin https://github.com/<내 깃허브 아이디>/<내 깃허브 아이디>.github.io.git

# 내 깃허브 원격 저장소에 커밋한 파일들을 올립니다!
git push -u origin main
```

성공적으로 push가 끝났으면, 내 github 페이지에 들어가서 파일이 잘 올라갔는지 확인합니다. 웹 브라우저 주소 창에 `https://<내 깃허브 아이디>.github.io`를 치고 들어가면 됩니다.

아까 localhost로 봤던 템플릿 사이트가 보이나요? 그러면 성공입니다!

고생하셨습니다. 저희가 이번에 한 일을 정리해봅시다.

- Elder.js 템플릿 프로젝트를 세팅했습니다.
- 템플릿 프로젝트를 Github 저장소에 올려서 배포했습니다.

물론 이제 시작입니다. ;) 이제부터...

- 블로그에 마크다운으로 글을 쓰는 방법
- 내가 원하는대로 Layout, Home, Blog 의 디자인을 바꾸는 법
- 다크모드, 날짜 순 정렬, 코드 문법 강조, Utterances 댓글 기능, 프로필 이미지 등을 넣는 법
- Elder.JS 의 작동 원리, 검색 엔진 최적화...

그 밖에도 다양한 내용들을 차례차례 소개해보겠습니다. 궁금하신 게 있으면 댓글로 달아주세요.
