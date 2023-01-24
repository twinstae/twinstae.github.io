---
title: '컴포넌트 테스트 시작하기 - 상태와 효과'
excerpt: '@testing-library로 사용자 관점에서 직관적으로 컴포넌트 테스트를 만들어봅시다. 기초부터 SSR까지 실전을 다룹니다.'
date: '2022-09-19T05:37:47.856Z'
author: 탐정토끼(Taehee Kim)
tag: '테스트, 접근성'
---

## 지난 이야기

[컴포넌트 테스트 시작하기 - 마크업](/component-testing-a11y-markup) 편에서는...

- `vitest`와 `@testing-library`를 이용한 테스트 환경을 설정해보았습니다.
- 테스트 결과에 나오는 성공과 실패 메세지를 읽는 법을 배웠습니다.
- 저의 [역량배지] 서비스에서 사용할 다크모드 버튼의 스펙을 인간의 말로 적어봤습니다.
- `@testing-library/dom`이 제공하는 `screen.getByRole` 같은 쿼리로 element를 찾고 가져오는 법을 배웠습니다.
- WAI-ARIA 접근성 표준을 간단하게 소개했습니다. 접근 가능한 역할(role)과 이름(name)으로 테스트를 작성해봤습니다.
- 테스트를 통과하도록 semantic html을 이용해서 markup을 작성했습니다.
- 텍스트가 없는 icon에도 aria-label을 달아서 접근 가능하고 테스트하기 쉽게 만들었습니다.

이번 글을 끝까지 따라오시면, 다음과 같은 결과가 나옵니다. StackBlitz의 웹 컨테이너를 이용해서, 브라우저에서도 로컬처럼 실습하고 테스트를 해보실 수 있어요. 처음에는 의존성을 다운 받는데 시간이 좀 걸립니다. 

{{ stackblitz url="https://stackblitz.com/edit/testing-library-dark-mode-button" file="src/components/DarkModeButton.test.tsx,src/components/DarkModeButton.tsx" terminal="all" hideExplorer=false /}}

## 상태와 이벤트

아직 저희가 만든 버튼은 정적인 마크업일 뿐이지, 실제로 작동하진 않아요. 이제 상태와 이벤트로 버튼을 동적으로 만들어볼게요.

구현할 스펙을 다시 정리해보면 이렇습니다.

> - 클릭하면 테마가 바뀌면서, 아이콘도 같이 바뀌어요.

여기서 [userEvent](https://testing-library.com/docs/user-event/intro)을 쓰면 됩니다. 앞서 설명한 것처럼 `userEvent`는 `click`과 같은 사용자와의 상호작용(interaction)을 모사해줍니다.

다음과 같이 테스트를 바꿔볼게요.

<div class="plus-lines-13 plus-lines-16"></div>

```tsx
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import DarkModeButton from "./DarkModeButton";

describe("DarkModeButton", () => {
	it("다크 모드 버튼을 클릭하면, 라이트 모드로 바뀐다", async () => {
		render(<DarkModeButton />);

		const button = screen.getByRole("button", { name: "현재 다크 모드" });

    // button을 클릭하면
		await userEvent.click(button);

    // 버튼은 '현재 라이트 모드'라는 접근 가능한 이름을 가져야 해요.
		expect(button).toHaveAccessibleName('현재 라이트 모드');
	});
});
```

또 낯설고 새로운 게 등장했죠. 하나씩 알아봅시다.

`userEvent`는 `promise`를 반환하기 때문에, `await`을 붙여줘요. 왜냐면 `click` 이벤트는 이벤트 핸들러를 통해 비동기적으로 처리되기 때문이죠. 그리고 react나 vue 같은 프런트엔드 프레임워크도, 바로 dom을 변경하지 않아요. 자체 스케쥴러나 타이머를 가지고 기다렸다가 모아서 수정하기 때문에, dom이 수정될 때까지 기다려줘야 해요.

`jest`나 `vitest`를 써보신 분들은 `toHaveAccessibleName`라는 matcher를 처음 보셨을지도 모르겠어요. 이는 앞서 설치하고 setupTest.ts에서 import해준 `@testing-library/jest-dom`이 `extend` 해준 거에요. 이렇듯 직관적인 matcher를 쓸 수 있어서, 번거롭게 `button.getAttribute('aria-label')` 같은 코드를 쓰지 않아도 된답니다.

혹시 테스트가 실패해서 당황하신 분 있나요? 아직 구현을 하지 않았으니, 당연히 실패하는 게 당연합니다.

```
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
 ❯ src/DarkModeButton.test.tsx:14:17

 FAIL  src/DarkModeButton.test.tsx > DarkModeButton > 다크 모드 버튼을 클릭하면, 라이트 모드로 바뀐다
Error: expect(element).toHaveAccessibleName()

Expected element to have accessible name:
  현재 라이트 모드
Received:
  현재 다크 모드
     12|   await userEvent.click(button);
     13| 
     14|   expect(button).toHaveAccessibleName('현재 라이트 모드');
       |                 ^
     15|  });
     16| });
```

이제 `useState`를 써서 간단하게 구현을 해줄까요?

```tsx
import { useState } from "react";

function DarkModeButton() {
  const [isDark, setIsDark] = useState(false);

  const label = isDark ? "현재 다크 모드" : "현재 라이트 모드";

  function toggleDark(){
    setIsDark(old => !old);
  }
	return (
		<button type="button" aria-label={label} onClick={() => toggleDark()}>
			{isDark ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}
		</button>
	);
}

export default DarkModeButton;
```

다시 PASS가 뜨는 초록 막대를 보셨다면 축하합니다!

테스트가 깨지셨을지도 모르겠어요. (일부러 에러를 심어놓은 제 코드를 복붙 하셨다던가) 그렇다면 정말 기쁜 일입니다. 테스트가 자기 할 일을 다 하고 있는 거니까요. `useState`의 초기 값이나, 삼항 연산자의 순서를 살펴보시면 좋을 것 같아요. 아니면 오타가 있을 수도 있고요.

## 의존성과 효과

하지만 아직 정말 끝난 건 아니에요. 버튼의 text만 바뀔 뿐입니다. 아직 테마가 바뀌는 효과(effect)도 없고, 시스템의 다크 모드 설정-의존성(dependency)-을 가져오지도 않았습니다. 스펙을 다시 가져와보면 그렇습니다.

> - 마우스를 올리면(hover) "현재 라이트 모드, 다크 모드로 전환하려면 클릭하세요" 같은 식으로 툴팁(tooltip)이 뜨면 좋겠어요.
> - 테마의 초기 값은 `시스템 설정`을 사용하지만, `SSR`처럼 값을 가져올 수 없을 때에는 fallback으로 `dark를 기본 값`으로 쓰고 싶어요.
> - 이렇게 설정한 값은 `localStorage`에 저장하고, 다시 접속했을 때 가져올 수 있으면 좋겠어요.
> - 클릭하면 테마가 바뀌면서, 아이콘도 같이 바뀌어요.

이런 부수효과와 의존성은 테스트하기 어려운 경우가 많습니다. 저희의 상황을 예로 들어보죠.

- `css framework`에 따라서, `theme`를 설정해주는 방법이 다릅니다.
  - 예를 들어 역량 배지가 사용 중인 `tailwind` 기반의 `daisyui`에서는 `html` 태그에 attribute로 `data-theme="emerald"`와 같이 달아줘야 해요. 다크 테마는 `data-theme="forest"`를 달아줘야 합니다.
    - `react`는 body 안에 있는 `root`
- 역량 배지는 nextjs처럼 remix로 SSR을 하는데요. node 서버에서는 사용자의 시스템 설정이나, `localStorage`에 접근할 수 없습니다.
  - 이는 jest나 vitest도 마찬가지죠!

`deno`처럼 localStorage 같은 브라우저 api를 지원해주는 경우도 있지만. 역량배지도 그렇고 아직 대부분은 `node`를 사용하지요. 그러면 저희는 어떻게 테스트를 해야할까요?

정답은 없지만, 제가 믿는 원칙은 있습니다.

0. 쉽게 변하지 않는 가정이나 표준에 의존할 것
1. 추측하기 보다는 조사하고, 귀납적으로 결론을 내릴 것
2. 되도록 실제 의존성과 부수효과를 테스트할 것
   1. 부수효과는 되도록 알아서 정리하거나 초기화할 것(setup)
3. 테스트를 느리게 만들거나, 부수효과가 다루기 어렵거나, 여러 환경을 지원하는 경우에만, 테스트 대역을 활용할 것.

이 원칙들은 여러 경험과 책에서 나온 건데요. 제가 왜 이런 원칙들을 믿게 되었는지, 사례를 보면서 설명해보겠습니다. 하나씩 비판적으로 음미해보시죠.

## react 앱 외부의 dom 바꾸기
저는 `<html>` 태그의 `attribute`를 변경하는 부수효과는 직접 테스트하려 합니다. 사용자의 클릭과 같은 상호작용은 브라우저에서 일어나고, 브라우저에는 `dom`이 있습니다. 저희의 테스트 환경에도 `jsdom`이 있지요. 여러 csr과 ssr, ssg 프레임워크를 경험해본 결과... 이건 쉽게 변하기 어려운 가정 같습니다.

문제는 `<html>`태그가 전역 상태라는 거에요. `@testing-library/react`는 리액트가 그렇듯이, `<body>` 태그 안에 컴포넌트를 렌더합니다. 그리고 테스트가 끝나면 정리해주죠. 하지만 리액트 밖에 있는 `<html>`는 수정된 상태로 남습니다.

이는 뒤의 테스트에도 영향을 줄 수도 있어요. 그러니 테스트가 끝나기 전에 초기화해주면 좋겠습니다.

다음과 같이 테스트를 짜보겠습니다. 테스트가 효과로 지저분해질 거에요.

<div class="plus-lines-5 plus-lines-11 plus-lines-15"></div>

```tsx
const $html = document.getElementsByTagName('html')[0];
it("다크 모드 버튼을 클릭하면, 라이트 모드로 바뀌고, 다시 클릭하면 다크 모드로 돌아온다", async () => {
  render(<DarkModeButton />);

  expect($html).toHaveAttribute('data-theme', 'forest');

  const button = screen.getByRole("button", { name: "현재 다크 모드" });
  await userEvent.click(button);

  expect(button).toHaveAccessibleName('현재 라이트 모드');
  expect($html).toHaveAttribute('data-theme', 'emerald');

  await userEvent.click(button);
  expect(button).toHaveAccessibleName('현재 다크 모드');
  expect($html).toHaveAttribute('data-theme', 'forest');

  // 정리
  $html.setAttribute('data-theme', '');
});
```

당연히 테스트는 실패합니다.

```bash
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/DarkModeButton.test.tsx > DarkModeButton > 다크 모드 버튼을 클릭하면, 라이트 모드로 바뀌고, 다시 클릭하면 다크 모드로 돌아온다
 ❯ src/DarkModeButton.test.tsx:10:16
Error: expect(element).toHaveAttribute("data-theme", "forest") // element.getAttribute("data-theme") === "forest"

Expected the element to have attribute:
  data-theme="forest"
Received:
  null
      8|   render(<DarkModeButton />);
      9|   const $html = document.getElementsByTagName('html')[0];
     10|   expect($html).toHaveAttribute('data-theme', 'forest');
       |                ^
     11| 
     12|   const button = screen.getByRole("button", { name: "현재 다크 모드" });
```

`<html>` 태그에 `data-theme`이라는 attribute가 없다고 하죠. 하나씩 고쳐봅시다.

일단 상태에 무관하게 forest 테마를 설정하는 것부터 해봅시다. react 외부를 건드리고 있으니, `useEffect`를 써보죠.

<div class="plus-lines-13 plus-lines-14 plus-lines-15 plus-lines-16"></div>

```tsx
// DarkModeButton.tsx
import { useEffect, useState } from "react";

function DarkModeButton() {
  const [isDark, setIsDark] = useState(true);

  const label = isDark ? "현재 다크 모드" : "현재 라이트 모드";

  function toggleDark(){
    setIsDark(old => !old);
  }

	useEffect(() => {
		const $html = document.getElementsByTagName('html')[0];
		$html.setAttribute('data-theme', 'forest')
	})
	return (
		<button type="button" aria-label={label} onClick={() => toggleDark()}>
			{isDark ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}
		</button>
	);
}
```

그러면 여전히 실패하긴 하는데, 실패하는 위치가 달라집니다.

<div class="hl-lines-10 hl-lines-13"></div>

```bash
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/DarkModeButton.test.tsx > DarkModeButton > 다크 모드 버튼을 클릭하면, 라이트 모드로 바뀌고, 다시 클릭하면 다크 모드로 돌아온다
Error: expect(element).toHaveAttribute("data-theme", "emerald") // element.getAttribute("data-theme") === "emerald"

Expected the element to have attribute:
  data-theme="emerald"
Received:
  data-theme="forest"
 ❯ src/DarkModeButton.test.tsx:16:16
     14| 
     15|   expect(button).toHaveAccessibleName('현재 라이트 모드');
     16|   expect($html).toHaveAttribute('data-theme', 'emerald');
       |                ^
     17| 
     18|   await userEvent.click(button);
```

강조한 부분을 보면 테스트 코드의 16번째 줄에서 에러가 발생했다고 합니다. 16번째 줄을 살펴보면, 처음 한 번 클릭을 하고 라이트 모드로 변하긴 했는데요. `data-theme`이 `"emerald"`로 바뀌지 않았다고 하고 있어요.

useEffect가 상태에 따라 호출되지 않으니 당연?한 일입니다. useEffect의 의존성 배열에 `isDark`를 넣어주고, 값에 따라 다른 테마를 달아주게 해볼게요.

<div class="plus-lines-15 plus-lines-16"></div>

```tsx
// DarkModeButton.tsx
import { useEffect, useState } from "react";

function DarkModeButton() {
  const [isDark, setIsDark] = useState(true);

  const label = isDark ? "현재 다크 모드" : "현재 라이트 모드";

  function toggleDark(){
    setIsDark(old => !old);
  }

	useEffect(() => {
		const $html = document.getElementsByTagName('html')[0];
		$html.setAttribute('data-theme', isDark ? "forest" : "emerald")
	}, [isDark])
	return (
		<button type="button" aria-label={label} onClick={() => toggleDark()}>
			{isDark ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}
		</button>
	);
}
```

그럼 또 짠! 하고 PASS 초록 막대가 뜰 겁니다. 이번에도 삼항 연산자의 순서에 주의해주세요.

## 다음은? 브라우저와 서버

역량 배지는 Server Side Rendering을 하는 Remix로 만들었습니다. 요즘 Next.js를 비롯해서 서버 사이드 렌더링이 유행인데요. node의 테스트 환경은 SSR과 유사합니다.

그러니 이번에는 브라우저와 서버를 오가는, 하이드레이션 문제를 테스트하는 걸 보여드릴게요.

[컴포넌트 테스트 시작하기 - 브라우저와 서버](/component-testing-a11y-ssr)