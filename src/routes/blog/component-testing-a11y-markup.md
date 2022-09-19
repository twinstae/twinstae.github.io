---
title: '컴포넌트 테스트 시작하기 - 마크업'
excerpt: '@testing-library로 사용자 관점에서 직관적으로 컴포넌트 테스트를 만들어봅시다. 기초부터 SSR까지 실전을 다룹니다.'
date: '2022-09-17T12:28:02.780Z'
author: 탐정토끼(Taehee Kim)
tag: '테스트, 접근성'
---

## testing-library는 개발자와 사용자를 모두 행복하게 해줍니다
[우리에게는 프런트 테스트가 필요할지도 모릅니다.](https://twinstae.github.io/why-frontend-testing/)에서 이야기한 것처럼, 테스트를 짜면 좋은 점이 많습니다.

특히 이번에 소개할 `@testing-library`는 접근성을 기반으로, 사용자 관점에서 직관적으로 테스트를 작성할 수 있게 도와줍니다. 테스트하기 쉬운 컴포넌트를 만들다 보면, 누구나 [손쉽게 사용](https://www.apple.com/kr/accessibility/)할 수 있게 되는 경우가 많습니다. 시각 장애인이 접근하기 어려운 앱은, 테스팅 라이브러리도 접근하기 어렵기 때문입니다.

테스트를 짜면 브라우저를 열지 않고도 빠르게 개발이 가능합니다. 예를 들어 `vitest`와 `jsdom`을 이용하면, 5개의 폼에 값을 입력하고 제출하는 것 같이 귀찮은 경우도 1초도 안 되는 시간에 테스트해볼 수 있어요. 

의존성을 격리해서 유지보수하기 쉬워집니다. 라이브러리를 바꾸거나 버전을 올리는 건 물론이고, 프레임워크나 언어를 바꾸더라도 테스트는 굳건하게 자리를 지켜줍니다. 브라우저, 서버, 모바일 웹 뷰나 일렉트론 등 다양한 환경에도 쉽게 가져다 붙일 수 있어요.

무엇보다 모든 게 잘 돌아가고 있다는 확신(confidence)을 얻게 해줍니다. 자신 있게 구조를 뜯어고치거나, 새 기능을 추가할 수 있어요.

하지만 한국에는 프런트엔드 컴포넌트 테스트에 대한 자료가 많지 않습니다. 책이나 강의에서도 짧고 단순한 예시만 다루고 있습니다. 복잡하고 현실적인 상황을 테스트하려고 하면, 쉽게 답을 찾기도 어렵고 포기하게 되는 경우가 많습니다. 저도 그랬습니다.

테스트가 낯설 뿐이지 어렵지는 않았으면 좋겠습니다. 그래서 이 글을 쓰기 시작했습니다.

## @testing-library 설치하기

`@testing-library`는 하나가 아니고, 여러 라이브러리가 모여 있습니다. 따로 @로 시작하는 이름 공간을 할당 받아서 쓸 정도니까요.

- `@testing-library/react`
  - 프레임워크의 컴포넌트를 렌더해주고, 테스트가 끝나면 정리해줍니다.
  - react나 vue는 물론이고 react-native, svelte, preact, solid, marko도 지원합니다.
- `@testing-library/dom`
  - getByRole 처럼 접근성에 기반해서 DOM을 가져올 수 있게 도와줍니다.
  - 프레임워크의 어댑터를 설치하면, 보통 같이 동봉되어 있어요.
- `@testing-library/user-event`
  - click, type, tab과 같이 사용자의 동작을 모사해줍니다
- `@testing-library/jest-dom`
  - jest나 vitest에 toHaveTextContent와 같이 유용한 matcher를 추가해줍니다

여러분이 사용하는 package manager를 이용해서 devDependency로 설치해주세요.
### npm
```bash
npm install --save-dev @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom
```
### yarn
```
yarn add --dev @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom
```

## JSDOM 설정하기
testing-library는 dom이 있는 환경에서만 돌아갑니다. 그래서 브라우저에서도 실행할 수 있어요.

하지만 브라우저에서는 느리기 때문에, 보통 `jest`나 `vitest` 같은 테스트 러너를 이용해서 node 환경에서 돌립니다. 저는 이 둘 중 하나를 사용하고 계실거라 가정하고 계속 진행하겠습니다. 특히 `create-react-app`을 쓰고 계신다면 jest가 이미 세팅되어 있을 겁니다.

템플릿 없이 직접 jest를 세팅하는 건 글 하나를 써야할 정도로 번거롭기 때문에 생략합니다. jest config를 만들고, babel을 써서 코드를 변환해야 하고, 설정 하는 중에 당황스러운 에러를 만나는 경우도 많습니다.

새로운 프로젝트를 만드신다면 `vite` 템플릿으로 세팅하시길 권해드립니다. [vitest](https://vitest.dev/guide/)는 jest와 api가 호환될 뿐만 아니라, vite 플러그인을 이용하면 별다른 설정도 필요 없습니다. 공식 문서와 testing-library 설정 예시를 참고해주시면 어렵지 않을 거에요. 다음처럼 vite.config에 test라는 옵션만 추가해주면 되거든요.

```ts
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true, // describe, it, expect와 같은 의존성을 자동으로 import 해줍니다.
		environment: 'jsdom', // node에는 dom이 없기 때문에, js로 된 dom 구현체를 사용합니다
		setupFiles: './src/setupTest.ts', // setup.ts 파일을 테스트 전마다 실행해줍니다
		css: false, // css를 import해야 하는 테스트라면 true로 켜주세요
	},
})
```

어쨌든 node에는 dom이 없기 때문에 `jsdom`이라는 라이브러리로 돔 구현체를 주입해줘야 합니다. vitest는 설정에 jsdom 환경을 설정해주면, 알아서 설치할 거냐고 물어보기까지 합니다.

jsdom 환경을 설정하면, node에도 `document` 객체가 생깁니다. 이제 브라우저와 비슷하게 대부분의 기능을 테스트할 수 있어요. 물론 SSR과 유사하게 `localStorage`와 같이 브라우저에만 존재하는 api는 사용할 수 없습니다. 이런 문제를 처리하는 방법도 의존성 주입을 다루는 시리즈에서 다뤄볼게요.

다른 테스트 프레임워크에서 jsdom을 설정하는 방법도 일단 생략하고 지나가겠습니다. 도움이 필요하시면 댓글을 남겨주세요!

## 테스트의 성공과 실패에 익숙해지기

와와 축하합니다. 이제 테스트를 짜고 실행시켜보면 되겠어요.

`create-react-app`을 쓰신다면 `npm run test`나 `yarn test`로 테스트를 실행해보세요. `package.json`에 설정된 대로 테스트가 바로 시작될 겁니다.

vitest를 쓰신다면 `npx vitest`라고 치면 별다른 `scripts` 설정 없이도 테스트가 잘 실행될 겁니다.

기존에 만들어진 테스트 파일이 있다면 `watch` 모드로 들어가면서, 테스트 파일이 변경될 때마다 다시 실행하고 결과를 보여줍니다.

아직 테스트 파일을 만들지 않았다면, 테스트를 찾지 못했다고 나올 겁니다. 다음처럼요!

<div class="hl-lines-7 hl-lines-11"></div>

```bash
taehee@taehee-MS-7B89:~/github/testing-for-all$ yarn vitest
yarn run v1.22.19
$ /home/taehee/github/testing-for-all/node_modules/.bin/vitest

 DEV  v0.23.2 /home/taehee/github/testing-for-all

include: **/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}
exclude:  **/node_modules/**, **/dist/**, **/cypress/**, **/.{idea,git,cache,output,temp}/**
watch exclude:  **/node_modules/**, **/dist/**

No test files found, exiting with code 1
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

jest나 vitest의 기본 설정은 `test.tsx`나 `spec.tsx`로 끝나는 파일을 찾아서 알아서 실행해줍니다. 정확히는 나와있듯이 `js,mjs,cjs,ts,mts,cts,jsx,tsx` 등의 확장자를 모두 지원합니다.

파일을 만들고, 뼈대부터 잡아볼까요? 다음처럼 `DarkModeButton.test.tsx`를 만들어주세요.

(vue나 svelte도 비슷하게 할 수 있는데, 나중에 예시를 추가해보겠습니다.)

```tsx
// DarkModeButton.test.tsx

// describe는 여러 it으로 된 테스트를 묶어주는 역할을 합니다.
describe("DarkModeButton", () => {
	// it은 테스트하고 싶은 하나의 케이스입니다
	it("1+1은 2이다", () => {
		// expect는 실제 값(received)이 기대하는(expected) 결과와 같은지 검증합니다.
		expect(1+1).toBe(2);
	})
})
```

그러면 콘솔에 다음과 같이 떠야 합니다.

<div class="hl-lines-9"></div>

```bash
 ✓ src/DarkModeButton.test.tsx (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
  Start at  22:37:34
  Duration  1.20s (transform 399ms, setup 80ms, collect 53ms, tests 3ms)


 PASS  Waiting for file changes...
       press h to show help, press q to quit
```

1+1이라는 당연해보이는 테스트를 짜는 이유이기도 합니다. 만약에 여전히 테스트를 찾지 못한다면 뭔가 잘못되었다는 뜻이거든요.

예를 들어 `setupTest.ts` 파일이 없으면 다음과 같은 에러가 뜹니다.

<div class="hl-lines-7 hl-lines-8"></div>

```bash
 DEV  v0.23.2 /home/taehee/github/testing-for-all

 ❯ src/DarkModeButton.test.tsx (0)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/DarkModeButton.test.tsx [ src/DarkModeButton.test.tsx ]
Error: [vite-node] Failed to load /home/taehee/github/testing-for-all/src/setupTest.ts
```

src에 다음과 같이 setupTest.ts 파일을 만들고 저장해주세요.

```ts
import "@testing-library/jest-dom";

```

만약 에러가 없이 테스트가 PASS했다면, 이번에는 일부러 테스트를 실패시켜 보세요. 예를 들어 1+1이 1은 1이라고 어처구니 없는 테스트를 짠다면?

<div class="plus-lines-6"></div>

```tsx
// DarkModeButton.test.tsx

describe("DarkModeButton", () => {
	it("1+1은 1이다???", () => {
		// expect(received).toBe(expected)
		expect(1+1).toBe(1);
	})
})
```

당연히 실패해야겠죠?

<div class="hl-lines-8 hl-lines-13 hl-lines-14"></div>

```bash
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/DarkModeButton.test.tsx > DarkModeButton > 1+1은 1이다???
AssertionError: expected 2 to be 1 // Object.is equality
 ❯ src/DarkModeButton.test.tsx:9:16
      7|   it("1+1은 1이다???", () => {
      8|     // expect는 실제 값(actual)이 기대하는(expected) 결과와 같은지 검증합니다.
      9|     expect(1+1).toBe(1);
       |                ^
     10|   })
     11| })

  - Expected   "1"
  + Received   "2"

Test Files  1 failed (1)
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

     Tests  1 failed (1)
  Start at  22:43:01
  Duration  96ms

 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
```

이 `AssertionError` 메세지 읽는 법을 간단하게 설명해볼게요. `toBe(1)` 그러니까 `1`이길 기대했는데, 실제로는 `1+1` 즉 `2`가 와서 실패했다는 거죠.

이제 기본적인 걸 배웠으니, 본격적으로 다크 모드 버튼을 만들어 봅시다.

## 인간의 말로 적어보기

테스트 코드를 작성하기에 앞서, 잠시 저희가 만들고 싶은 다크모드 버튼은 어떤 건지 스펙을 정의해볼게요. 코드부터 쓰면 낯설기도 하고요. 인간의 언어로 된 기획을 정확하게 테스트로 옮기지 못하게 되기도 하거든요.

> - 제 역량배지 서비스는 현재 `light 테마`가 기본이에요. 밤에 밝은 테마의 사이트를 보면 눈이 부시죠. 그래서 `dark 테마`도 지원하고 싶어요.
> - `button` 은 라이트일 때 해 모양, 다크일 때에는 달 모양의 아이콘이에요.
> - 마우스를 올리면(hover) "현재 라이트 모드, 다크 모드로 전환하려면 클릭하세요" 같은 식으로 툴팁(tooltip)이 뜨면 좋겠어요.
> - 테마의 초기 값은 `시스템 설정`을 사용하지만, `SSR`처럼 값을 가져올 수 없을 때에는 fallback으로 `dark를 기본 값`으로 쓰고 싶어요.
> - 이렇게 설정한 값은 `localStorage`에 저장하고, 다시 접속했을 때 가져올 수 있으면 좋겠어요.
> - 클릭하면 테마가 바뀌면서, 아이콘도 같이 바뀌어요.

실제로는 이런 스펙을 혼자 정할 수는 없을 거에요. 기획자나 디자이너를 비롯해서 어쩌면 고객까지! 의사결정권이 있는 이해관계자들과 스펙을 명확하게 하는 작업이 필요하겠지요.

그러면 이 기획을 테스트로 하나씩 옮겨볼까요?

## DOM 가져오기와 마크업

TDD, 즉 테스트 주도 개발에서는 작은 보폭으로 조금씩 확인하면서 개발하는 걸 중요하게 생각합니다. 그래서 저도 한 번에 다크모드 버튼을 구현하기 보다는, 작게 하나씩 @testing-libary의 기능을 소개하면서 가보려 해요.

먼저 dom이 잘 그려지는지를 테스트하고, 그에 맞게 마크업을 만들어 볼게요.

일단 `button`을 하나 만들고, 그 안에 `현재 다크 모드`라는 `textContent`가 보이면 좋겠어요. 이를 테스트로 표현하면 다음처럼 될 거에요.

```tsx
// DarkModeButton.test.tsx
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import DarkModeButton from "./DarkModeButton";

describe("DarkModeButton", () => {
	it("다크 모드 버튼을 렌더할 수 있다", () => {
		// 다크 모드 버튼을 document에 렌더해요.
		render(<DarkModeButton />);

		// dom에서 button role을 가지고
		// "현재 다크 모드"라는 접근 가능한 이름(name)을 가진 element를 가져와요.
		// getBy는 요소를 찾지 못하면 에러가 나고 테스트가 실패해요.
		const button = screen.getByRole("button", { name: "현재 다크 모드" });

		// 이 버튼이 document에 있는지 확인해요. 생략할 수 있어요.
		expect(button).toBeInTheDocument();
	});
});
```

아직 `DarkModeButton.tsx` 파일을 만들지 않았으니, 타입스크립트라면 타입 에러도 나고 테스트도 실패할 거에요.

```bash
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Suites 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/DarkModeButton.test.tsx [ src/DarkModeButton.test.tsx ]
 ❯ async /home/taehee/github/testing-for-all/src/DarkModeButton.test.tsx:8:31
Error: [vite-node] Failed to load ./DarkModeButton

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

Test Files  1 failed (1)
```

구현도 다음처럼 최소한의 파일만 만들어볼까요?

```tsx
// DarkModeButton.tsx
function DarkModeButton(){
	return null;
}

export default DarkModeButton;
```

아직 button이 없으니 여전히 에러가 나겠지만, 이번에는 새로운 에러일 거에요!

```bash
 ❯ src/DarkModeButton.test.tsx (1)
   ❯ DarkModeButton (1)
     × 다크 모드 버튼을 렌더할 수 있다

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/DarkModeButton.test.tsx > DarkModeButton > 다크 모드 버튼을 렌더할 수 있다
TestingLibraryElementError: Unable to find an accessible element with the role "button" and name "현재 다크 모드"

There are no accessible roles. But there might be some inaccessible roles. If you wish to access them, then set the `hidden` option to `true`. Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole

Ignored nodes: comments, script, style

<body>
  <div />
</body>
```

당황하지 말고 이 에러를 하나씩 읽어보죠.

> TestingLibraryElementError: Unable to find an accessible element with the role "button" and name "현재 다크 모드"

먼저 "현재 다크 모드"라는 `name`에 `button` `role`을 가진 element를 찾지 못했다고 해요.

> There are no accessible roles. But there might be some inaccessible roles. If you wish to access them, then set the hidden option to true.

그리고 `접근 가능(accessible)`한 role을 가진 요소가 없다고 해요. 하지만 접근 가능하지 않은 role이 있을 수도 있으니, 이것도 접근하고 싶으면 hidden 옵션을 true로 설정하라네요.

이쯤이면 모르는 용어들에 겁?을 먹으셨을지도 모르겠어요. 그러면 `role`이랑 `accessible name`이 뭔지 설명해볼게요.

### role은 요소에 의미있는 역할을 달아주는 거에요

[WAI-ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)는 접근성을 위한 웹 표준이에요. `role`은 어떤 요소의 역할이에요. 이런 role은 기본적으로 html element마다 기본으로 달려 있어요.

- `<button>` 그러니까 `HTMLButtonElement`는 `button` role이 있어요.
- `<a>`는 `link`
- `<input />`도 타입마다 role이 달라요.
  - `<input type="text" />`는 `textbox` role을 가지고요.
  - `<input type="checkbox" />`는 `checkbox` role을 가지고 있어요
- `<ul>`이나 `<ol>`은 `list` role이고
  - `<li>`는 `listitem` role을 가지고 있어요.
- `<h1>`부터 `<h6>` 까지의 제목들은 `heading` role을 가지고 있어요.

이런 role은 스크린 리더는 물론이고, 검색엔진 로봇, 그리고 저희의 테스트 도구에게도 유용한 정보를 제공해요. 기계는 눈이 없기 때문에, 글자 크기를 크고 굵게 만들어도 그게 제목이라고 생각하지 않아요. 하지만 h1~h6와 같은 heading은 제목이라는 걸 바로 눈치챌 수 있죠. div로만 된 페이지에서는 스크린 리더도 구글도 뭐가 제목인지? 글의 핵심은 무엇인지? 알지 못해서 헷갈릴 거에요.

그래서 `div`가 아니라 올바른 semantic html을 사용하면, 대부분의 경우에는 role을 달아주지 않아도 됩니다. 예를 들어 `div`에 onClick을 달기보다는 `button` 태그를 사용하는 식으로요.

div와 달리 요소들의 기본 css가 불편하다면, 이런 요소의 [기본 css를 reset](https://www.joshwcomeau.com/css/custom-css-reset/)시켜서 사용하는 경우도 많아요. 

### CSS보다 role이 더 직관적이고 안정적이에요
우리의 @testing-library도 웹 표준인 role을 이용해서 요소를 찾는데. 혹시 기존에 css를 이용해서 요소를 찾는 테스트 도구를 써보신 적이 있나요? css 선택자를 쓰면 되는데, 왜 role을 배워야하나 의문이실지도 모르겠어요. 예를 들어 `enzyme`에서는, 앞에서 짠 테스트를 다음과 같이 할 수 있지요.

```tsx
// DarkModeButton.test.tsx
import { render } from "enzyme";
import DarkModeButton from "./DarkModeButton";

describe("DarkModeButton", () => {
	it("다크 모드 버튼을 렌더할 수 있다", () => {
		const wrapper = render(<DarkModeButton />);

		const button = wrapper.find('button');

		// 텍스트가 무엇인지는 또 확인을 해야 해요.
		expect(wrapper.text()).toBe('현재 다크 모드');
	});
});
```

css 선택자에 의존하는 테스트는 불안정해요. id나 class name은 사람마다 다르게 정해요. 클래스 이름을 정하는 방법론은 매우 많죠. `tailwind`처럼 알아보기 어려운 경우도 있어요. 클래스명이 충돌 나거나 디자인에 따라 바뀌기도 해요.

role은 웹 표준이라서, 제대로 알고 지키기만 하면 어디서나 일관적으로 사용할 수 있어요. 또 `list`나 `heading` 같은 role은 `ul`이나 `ol`, `h1`, `h2`보다 느슨해서 쉽게 깨지지 않지요. 거꾸로 `input[type="text"]`나 `input[type="checkbox"]`처럼 역할이 다른데도 똑같은 태그를 쓰는 경우에는 `textbox`나 `checkbox`처럼 간결하고 직관적으로 쓸 수 있지요.

### 접근 가능한 이름을 달아주기

그러면 이 많은 role을 하나하나 외워야 할까요? semantic html을 잘 쓴다면 괜찮아요. `@testing-library`는 요소를 찾지 못했을 때, 화면에 있는 접근 가능한 role을 가진 요소들의 목록을 띄워주거든요.

앞의 테스트를 딱 통과하지 못할 정도로만 구현을 해볼게요. `button`을 만들고, 잘못된 text를 넣어볼 거에요.

<div class="plus-lines-3"></div>

```tsx
// DarkModeButton.tsx
function DarkModeButton(){
	return <button type="button">어둠의 버튼</button>;
}

export default DarkModeButton;
```

그러면 다음처럼 에러가 발생해요!

<div class="hl-lines-8 hl-lines-10 hl-lines-11"></div>

```bash
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/DarkModeButton.test.tsx > DarkModeButton > 다크 모드 버튼을 렌더할 수 있다
TestingLibraryElementError: Unable to find an accessible element with the role "button" and name "현재 다크 모드"

Here are the accessible roles:

  button:

  Name "어둠의 버튼":
  <button />

  --------------------------------------------------

Ignored nodes: comments, script, style
<body>
  <div>
    <button>
      어둠의 버튼
    </button>
  </div>
</body>
```

보면 button이 있긴 한데, `name`이 다르다고 하고 있죠? `accessible name` 그러니까 접근 가능한 이름은, 스크린 리더가 읽어주는 해당 요소의 이름이에요.

`<a>`나 `<button>` 태그라면 요소의 `textContent`가 접근 가능한 이름이에요. 여기서는 `"어둠의 버튼"`이겠죠.

앞의 테스트를 통과 시키려면, 버튼의 textContent를 `"현재 다크 모드"`로 바꿔주면 될 겁니다.

<div class="plus-lines-3"></div>

```tsx
// DarkModeButton.tsx
function DarkModeButton(){
	return <button type="button">현재 다크 모드</button>;
}

export default DarkModeButton;
```

그러면 드디어 테스트가 통과해요! 와와!
```bash
 ✓ src/DarkModeButton.test.tsx (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
  Start at  16:11:36
  Duration  227ms


 PASS  Waiting for file changes...
       press h to show help, press q to quit
```

## 아이콘과 aria-label

스펙을 더 구현해볼까요? 우리는 다크 모드 버튼을 해와 달 아이콘을 써서 만들고 싶었어요.

> `button` 은 라이트일 때 해 모양, 다크일 때에는 달 모양의 아이콘이에요.

그러면 `tailwind`에서 만든 [HeroIcons](https://heroicons.com/)에서 moon icon을 찾아서 넣어주었어요.

```tsx
function DarkModeButton() {
	return (
		<button type="button">
			<MoonIcon className="w-6 h-6"/>
		</button>
	);
}

export default DarkModeButton;
```

앗 이러니 테스트가 실패합니다.

```bash
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
 FAIL  src/DarkModeButton.test.tsx > DarkModeButton > 다크 모드 버튼을 렌더할 수 있다
TestingLibraryElementError: Unable to find an accessible element with the role "button" and name "현재 다크 모드"

Here are the accessible roles:

  button:

  Name "":
  <button />
```

에러를 읽어보니, button에 name이 비어 있는 걸로 나와요. 당연하지만 텍스트를 없애버렸기 때문이에요.

아이콘은 텍스트가 아니니까 접근 가능한 이름이 존재하지 않아요. 이건 이미지도 마찬가지에요.

이는 특히 시각 장애인 분들이 앱을 사용할 때 불편해요. 제가 스크린 리더를 사용해보니 정말 어쩌라는 건가 싶을 정도였어요. 메뉴에 있는 아이콘을 아무리 넘겨도, 스크린 리더는 읽어줄 수 있는 게 없거든요.

> "라벨이 지정되지 않음"
> "라벨이 지정되지 않음"
> "라벨이 지정되지 않음"
> "라벨이 지정되지 않음"

그러면 어떻게 해야할까요? `<img>`라면 `alt="대체 텍스트"` 같은 alt attribute를 달아주면 됩니다. twitter를 하시는 분들은 이따금 이미지에 ALT 가 달린 걸 보셨을 거에요.

아이콘도 마찬가지입니다. `aria-label`을 이용해서 라벨을 달아주면 됩니다. 이 아이콘 대신 텍스트가 있었다면 무엇이 있었을지 적어주시면 되어요.

이러면 테스트도 쉬워요. icon을 id나 class name으로 가져오는 것보다는, 사용자처럼 접근할 수 있는 이름으로 가져오는 게 더 직관적이니까요.

자, 설명은 이쯤 하고 코드를 고쳐봅시다.

<div class="plus-lines-3"></div>

```tsx
function DarkModeButton() {
	return (
		<button type="button" aria-label="현재 다크 모드">
			<MoonIcon className="w-6 h-6"/>
		</button>
	);
}
```

그러면 다시 멋진 초록 막대(PASS)를 보실 수 있어요.

```bash
 ✓ src/DarkModeButton.test.tsx (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
  Start at  16:26:05
  Duration  229ms


 PASS  Waiting for file changes...
       press h to show help, press q to quit
```

간단한 한 줄로 테스트도 더 쉽고, 더 접근 가능한 버튼이 되었습니다. :)

## 다음은? 상태와 효과

사용자의 click과 같은 상호작용(interaction)으로 상태(state)가 바뀌고, react 외부에 효과(effect)를 일으키는 걸 테스트하는 법을 다뤄보겠습니다.

[컴포넌트 테스트 시작하기 - 상태와 효과](/component-testing-a11y-state-effect)