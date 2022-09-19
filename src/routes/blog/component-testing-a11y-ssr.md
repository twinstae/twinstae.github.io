---
title: '컴포넌트 테스트 시작하기 - 브라우저와 서버'
excerpt: '@testing-library로 사용자 관점에서 직관적으로 컴포넌트 테스트를 만들어봅시다. 기초부터 SSR까지 실전을 다룹니다.'
date: '2022-09-19T05:37:47.856Z'
author: 탐정토끼(Taehee Kim)
tag: '테스트, 접근성'
---

## 지난 이야기

[컴포넌트 테스트 시작하기 - 상태와 효과](/component-testing-a11y-state-effect) 편에서는...

- `userEvent`를 이용해서 `click`과 같은 사용자 동작을 처리했습니다.
- 상태가 변하면서 dom이 기대하는 모습으로 변했는지를  `jest-dom`이 제공하는 `toHaveAccessibleName`처럼 편리한 `matcher`로 검증했어요.
- react 상태를 외부와 동기화해주는 효과(effect)도 테스트했어요.
- 이렇게 변화된 전역 상태를 다시 원래대로 되돌려서 정리해줬습니다.

## 서버 사이드 렌더링 vs 클라이언트 사이드 렌더링
보통 사용자들은 브라우저나 운영체제에서 원하는 `color-scheme`을 설정해놓습니다. 다크 모드로 설정해놓은 사용자에게, 밝은 화면을 보여주면 기분이 좋지 않겠죠.

그래서 보통 `window.matchMedia` 등으로 브라우저의 `prefers-color-scheme` 미디어 쿼리를 확인할 수 있습니다. 그리고 이를 isDark 상태의 초기 값으로 넣어주면 되겠죠?

<div class="plus-lines-5"></div>

```tsx
// DarkModeButton.tsx
import { useEffect, useState } from "react";

function DarkModeButton() {
	const userPreferDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
  const [isDark, setIsDark] = useState(userPreferDark);

	// ... 이하 생략
}
```

이러면 테스트가 실패하게 됩니다. ;)

```bash
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/DarkModeButton.test.tsx > DarkModeButton > 다크 모드 버튼을 클릭하면, 라이트 모드로 바뀌고, 다시 클릭하면 다크 모드로 돌아온다
TypeError: window.matchMedia is not a function
 ❯ DarkModeButton src/DarkModeButton.tsx:4:31
      2| 
      3| function DarkModeButton() {
      4|  const userPreferDark = window.matchMedia("(prefers-color-scheme:d…
       |                               ^
      5|   const [isDark, setIsDark] = useState(userPreferDark);
      6| 
```

에러를 읽어보면 `window.matchMedia`는 함수가 아니라고 합니다. 그러면 뭘까요? 바로 `undefined`입니다.

`node`는 물론이고, `jsdom`에도 matchMedia 함수가 없습니다. 브라우저가 아니니 media query가 없는 게 어떻게 보면 당연합니다.

이러면 window.matchMedia를 mocking해서 해결하시려는 경우가 많습니다. 아니면 cypress나 playwright, puppeteer 등으로 실제 브라우저에서 테스트를 할 수 있죠. 둘 다 좋은 방법입니다.

하지만 저희 상황에서는 그것만으로 문제가 해결되진 않아요. 그러면 테스트는 통과할지 모르지만, `remix`에서 사용하진 못합니다.

왜냐면 이는 SSR의 문제이기도 하기 때문입니다. 누누히 말씀 드린 것처럼 `node`의 테스트 환경은, `SSR`과 유사합니다. `remix`에서 SSR을 할 때에도 `window.matchMedia` 함수가 없다는 점은 달라지지 않습니다. 서버에서 이 다크 모드 버튼을 렌더링할 때에도 똑같은 에러가 날 거에요.

저희가 직접 만들지 않아도 그렇습니다. 프로젝트에서 사용하는 컴포넌트 라이브러리가 내부에서 window.matchMedia를 쓴다면, 이런 고민은 더 커질 겁니다.

## hydration mismatch 문제

간단하게 "window 객체에 matchMedia가 있는지 확인하면 되는 거 아니야?"라고 생각하실지도 모르겠어요. 서버 같은 환경에서는 `false` 같은 fallback을 쓰게 하고요.

코드를 다음과 같이 바꿔줍시다.

<div class="plus-lines-5 plus-lines-6"></div>

```tsx
// DarkModeButton.tsx
import { useEffect, useState } from "react";

function DarkModeButton() {
	const userPreferDark = window.matchMedia
		? window.matchMedia("(prefers-color-scheme:dark)").matches
		: false;
	
	const [isDark, setIsDark] = useState(userPreferDark);

	// ... 이하 생략
}
```

이러면 테스트는 통과합니다. 하지만 이대로 remix 서버를 열고, 브라우저에서 접속하면 에러가 발생합니다.

```text
root.tsx:54 Error: Hydration failed because the initial UI does not match what was rendered on the server.
    at throwOnHydrationMismatch (react-dom.development.js:12507:9)
    at popHydrationState (react-dom.development.js:12678:9)
    at completeWork (react-dom.development.js:22176:30)
    at completeUnitOfWork (react-dom.development.js:26593:16)
		// 이하 생략
```
테스트에서는 괜찮아 보였는데. 아니 무슨 일이 생긴 걸까요? 그건 테스트 환경과 실제 환경이 다르다는 말입니다.

이 이슈를 이해하려면 먼저 react의 SSR을 이해해야 합니다. 서버 사이드 렌더링은 어떻게 동작할까요?

예를 들어 `remix` 프로젝트에는 `entry.server.tsx`라는 파일이 있습니다.

```ts
import { renderToString } from 'react-dom/server';
import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
) {
	const markup: string = renderToString(
		<RemixServer context={remixContext} url={request.url} />,
	);

	responseHeaders.set('Content-Type', 'text/html');

	return new Response(`<!DOCTYPE html>${markup}`, {
		status: responseStatusCode,
		headers: responseHeaders,
	});
}
```

`react-dom/server` 서버는 `renderToString`이라는 메서드로 html을 만듭니다. 그러니까 html은 그냥 문자열일 뿐입니다.

이렇게 만든 html 문자열은 HTTP Response body에 실어서 브라우저로 보냅니다.

브라우저에서 html을 파싱해서 렌더한 뒤에도 정적인 html일 뿐입니다. 여기에는 상태도 없고 `onClick` 같은 이벤트 핸들러도 없습니다. js가 필요 없고 0kb js로 만들고 싶다면, 여기서 끝낼 수도 있습니다.

하지만 보통은 js가 필요합니다. 예를 들어 우리는 다크모드 상태도 필요하고요. 버튼을 클릭하면 상태가 바뀌기도 해야 합니다. 그러면 이미 `string`으로 바싹 건조된 html을 어떻게 다시 살릴까요?

`remix`에는 `entry.client.tsx`도 있습니다. 이름처럼 `react-dom/client`는 서버가 아니라 브라우저에서 실행됩니다. 

```tsx
import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document, <RemixBrowser />);
```

이게 바로 `hydration`입니다. 수화라고도 번역하는데요. 물을 먹인다는 뜻입니다. 건조된 생면을 물에 삶듯이. html에 react로 상태도 붙이고 이벤트 핸들러도 붙여서 동적으로 되살리는 걸 하이드레이션이라 해요. 이제부터는 평범하게? Client Side Rendering을 하는 SPA로 작동하지요.

`hydration`을 할 때에는 첫 렌더 결과물이 같아야 합니다. 그러니까 서버에서 render한 html 문자열과, 브라우저에서 새로운 상태로 렌더한 결과가 똑같아야 한다는 거죠. 그런데 두 dom 이 다르게 되면 SSR 프레임워크들은 에러를 뿜습니다.

그러면 이제 배경지식도 생겼으니, 저희 상황을 해석해볼까요?

저희의 경우에는 서버에서는 `isDark`가 `true`인 게 기본 값인데요. 브라우저에서는 `prefers-color-scheme`을 가져오니 `light`일 수도 있습니다. 그러면 서버에서는 `현재 다크 모드`로 렌더링 되고, 브라우저에서는 `현재 라이트 모드`로 렌더링 되면... 서로 안 맞게 됩니다.

"아니 뭐 이리 문제가 많아!" 참 머리가 아픕니다. `SSR`과 접근성이 교차하는 이 문제를 어떻게 풀면 좋을까요?

이 에러 상황을 재현하고 검증할 수 있는 테스트를 만들어 볼게요. 코드에도 단계별로 주석을 적어두어었으니 참고해주세요.

먼저 `react-dom/server`의 `renderToString`을 써서, 다크 모드 버튼을 html로 렌더링해보겠습니다. 그리고 이걸 브라우저처럼 document에 넣어줘요.

그리고 저희가 가짜 window.matchMedia를 주입해서 브라우저를 흉내내 보았습니다. 사용자가 light 테마를 선호한다고 설정했다고 해보죠.

이 상태에서 hydrate를 해주면... 이제 에러가 터질 겁니다.

```tsx
// DarkModeButton
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import * as ReactDOMServer from "react-dom/server";
import DarkModeButton from "./DarkModeButton";

describe("DarkModeButton", () => {
	// $html은 어차피 전역 상태이기 때문에 밖으로 빼줍니다
	const $html = document.getElementsByTagName("html")[0];
	
	// ... 기존 테스트

	function renderServerSide(element: React.ReactElement<any, string | React.JSXElementConstructor<any>>){
		// 렌더해줄 container를 만들어 body에 추가합니다
		const container = document.createElement('div')
		document.body.appendChild(container)

		// container에 SSR로 렌더한 html 문자열을 넣습니다
		container.innerHTML = ReactDOMServer.renderToString(element);
		return { container }
	}

	it("서버에서는 다크 모드로 렌더되지만, 사용자가 라이트 모드를 선호하면, 라이트 모드 버튼으로 다시 렌더된다", () => {
		// html을 렌더한 div element를 가져옵니다
		const { container } = renderServerSide(<DarkModeButton />);

		// 처음에는 다크 모드로 렌더링 됩니다
		const button = screen.getByRole("button", { name: "현재 다크 모드" });

		// matchMedia에 stub을 주입합니다
		window.matchMedia = () => ({ matches: false } as MediaQueryList);
		
		// @testing-library/react에 hydrate option을 써서 되살립니다
		render(<DarkModeButton />, { container, hydrate: true });

		// mismatch가 있으면 여기까지 오지 못하고 에러가 납니다

		// 라이트 모드로 다시 렌더링됩니다
		expect(button).toHaveAccessibleName('현재 라이트 모드');
		expect($html).toHaveAttribute('data-theme', 'emerald');

		// matchMedia 메서드를 undefined로 되돌립니다
		Object.assign(window, { matchMedia: undefined });
	});
});
```

복잡하군요! hydration이 끼어드니까, 하나도 쉬운 게 없습니다. `@testing-library`가 친절하게 에러를 보여줄 거에요.
```bash
Warning: Prop `aria-label` did not match. Server: "현재 다크 모드" Client: "현재 라이트 모드"
    at button
    at DarkModeButton (/home/taehee/github/skill-badge/app/components/DarkModeButton.tsx:10:53)
```

## useEffect is all you need

뜸을 많이 들였지만. 해법은 간단합니다. 무엇이 잘못된 방법인지 알면, 올바른 방법은 생각보다 쉬운 법이죠.

[리액트에서 useEffect는 SSR에서는 실행되지 않습니다.](https://reactjs.org/docs/hooks-reference.html#uselayouteffect), 그러니 `useEffect`를 이용하면 될 것 같아요.

개요는 이렇습니다. 브라우저에서 처음 `hydration`을 할 때에는 `isDark`가 `true`인 초기 상태 그대로 렌더합니다. 그러면 서버와 똑같이 다크 모드로 렌더되니까 일치하겠지요.

그리고 `mount`가 되고 나면 `useEffect`로 mediaQuery를 가져와서 상태를 바꿔줍니다. 만약 사용자가 light 테마를 선호한다면, 다시 light 모드로 바뀌게 될 거에요.

이를 코드로 옮기면 다음과 같습니다.

<div class="plus-lines-7 plus-lines-8 plus-lines-9 plus-lines-10 plus-lines-11"></div>

```tsx
import { MoonIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function DarkModeButton() {
	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		if (window.matchMedia !== undefined) {
			setIsDark(window.matchMedia("(prefers-color-scheme:dark)")?.matches);
		}
	}, []);

	useEffect(() => {
		const $html = document.getElementsByTagName("html")[0];
		$html.setAttribute("data-theme", isDark ? "forest" : "emerald");
	}, [isDark]);

	function toggleDark() {
		setIsDark((old) => !old);
	}

	const label = isDark ? "현재 다크 모드" : "현재 라이트 모드";

	return (
		<button type="button" aria-label={label} onClick={() => toggleDark()}>
			<MoonIcon className="w-6 h-6"/>
		</button>
	);
}

export default DarkModeButton;
```

<span style="background-color: rgb(84,206,127); color: rgb(35, 62, 49);"> PASS </span>를 보셨나요? 힘들었으니 스스로를 축하해줍시다.

보신 바와 같이, 테스트는 복잡하고 헷갈리는 상황을 재현하는데도 훌륭한 도구입니다. 복잡한 SSR과 하이드레이션의 과정도 10줄 남짓이면 재현할 수 있으니 말이죠. 이 교훈은 SSR이 아니라 PWA나 일렉트론, 리액트 네이티브와 같이 브라우저가 아닌 여러 환경에서 코딩을 하실 때에도 도움이 되실 거에요.

다크모드 버튼을 넘어서 생각하면, 이는 `고대비(prefers-contrast)` 설정이나, `움직임 축소(prefers-reduced-motion)` 같이 window.matchMedia나 브라우저 api를 테스트하셔야 하는 경우에 폭 넓게 적용할 수 있는 방법이지 않을까 싶습니다.

## 다음은? 커스텀 훅과 Context

지금은 다크 모드 버튼 안에 모든 상태가 들어 있습니다.

하지만 이런 `theme`은 다른 컴포넌트에서도 필요할지도 모릅니다. css in js로 dark mode인지에 따라 다르게 써야 한다던가요. 앞에서 이야기한 것처럼 `reduced-motion` 옵션이 켜져 있으면 애니메이션을 꺼주고 싶다던가 말이죠.

다음에는 `Custom Hook`으로 상태 로직을 분리하고, `Context`와 `<Provider>`를 이용해서 의존성을 주입하고 테스트하는 법을 다뤄보겠습니다.

[컴포넌트 테스트 시작하기 - 훅과 컨텍스트](/component-testing-a11y-context)