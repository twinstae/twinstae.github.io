---
title: '컴포넌트 테스트 시작하기 - 훅과 컨텍스트'
excerpt: '@testing-library로 사용자 관점에서 직관적으로 컴포넌트 테스트를 만들어봅시다. 기초부터 SSR까지 실전을 다룹니다.'
date: '2022-09-19T12:23:26.754Z'
author: 탐정토끼(Taehee Kim)
tag: '테스트, 접근성'
---

## 지난 이야기

[컴포넌트 테스트 시작하기 - 브라우저와 서버](/component-testing-a11y-ssr) 편에서는...

- 서버 환경에서는 존재하지 않는 web api를 테스트하는 법을 다뤘습니다.
- SSR의 작동 원리와 hydration mismatch 문제를 테스트로 재현해봤습니다.
- useEffect로 간단하게 문제를 해결했습니다.

이번에는 실제로 테스트를 짜면서 하게 되는 고민의 과정을 보여드리려 해요. UI와 로직의 결합을 고민하면서, custom hook과 context를 테스트하는 법도 보여드릴게요.

## 코드 리뷰 : UI와 로직의 결합

다크 모드 버튼 컴포넌트의 로직은 갈 수록 커지고 있습니다. 테스트도 UI 구현에 종속되게 되었어요. 저희 코드를 돌아보는 시간을 가져볼까요?

먼저 테스트 코드입니다.

```tsx
// DarkModeButton.test.tsx
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as ReactDOMServer from 'react-dom/server';
import DarkModeButton from './DarkModeButton';

describe('DarkModeButton', () => {
	const $html = document.getElementsByTagName('html')[0];

	it('다크 모드 버튼을 클릭하면, 라이트 모드로 바뀌고, 다시 클릭하면 다크 모드로 돌아온다', async () => {
		render(<DarkModeButton />);
		expect($html).toHaveAttribute('data-theme', 'forest');

		const button = screen.getByRole('button', { name: '현재 다크 모드' });
		await userEvent.click(button);

		expect(button).toHaveAccessibleName('현재 라이트 모드');
		expect($html).toHaveAttribute('data-theme', 'emerald');

		await userEvent.click(button);
		expect(button).toHaveAccessibleName('현재 다크 모드');
		expect($html).toHaveAttribute('data-theme', 'forest');

		$html.setAttribute('data-theme', '');
	});

	function renderServerSide(element: React.ReactElement) {
		const container = document.createElement('div');
		document.body.appendChild(container);
		container.innerHTML = ReactDOMServer.renderToString(element);
		return { container };
	}

	it('SSR에서는 다크 모드로 렌더되지만, 사용자가 라이트 모드를 선호하면, 라이트 모드 버튼으로 다시 렌더된다', () => {
		const { container } = renderServerSide(<DarkModeButton />);

		const button = screen.getByRole('button', { name: '현재 다크 모드' });

		window.matchMedia = () => ({ matches: false }) as MediaQueryList;

		render(<DarkModeButton />, { container, hydrate: true });

		expect(button).toHaveAccessibleName('현재 라이트 모드');
		expect($html).toHaveAttribute('data-theme', 'emerald');

		// matchMedia 메서드를 다시 지워줍니다
		Object.assign(window, { matchMedia: undefined });
	});
});

```

다음은 구현 코드입니다.

```tsx
// DarkModeButton.tsx
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

function DarkModeButton() {
	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		if (window.matchMedia !== undefined) {
			setIsDark(window.matchMedia('(prefers-color-scheme:dark)')?.matches);
		}
	}, []);

	useEffect(() => {
		const $html = document.getElementsByTagName('html')[0];
		$html.setAttribute('data-theme', isDark ? 'forest' : 'emerald');
	}, [isDark]);

	function toggleDark() {
		setIsDark((old) => !old);
	}

	const label = isDark ? '현재 다크 모드' : '현재 라이트 모드';

	return (
		<button type="button" aria-label={label} onClick={() => toggleDark()}>
			{isDark ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}
		</button>
	);
}

export default DarkModeButton;

```

저희 스펙을 기억하시나요? 사실 버튼의 text는 `'현재 다크 모드'`가 아니었습니다. `"현재 라이트 모드, 다크 모드로 전환하려면 클릭하세요"`라고 친절하게 나오길 바랐어요.

그런데 이러면 테스트를 유지보수하는 게 참 어렵습니다. 사용자 관점에서 테스트하면서, 많은 로직이 버튼의 text에 의존하게 되었거든요. 예를 들어 `'현재 다크 모드'` 라는 문구는 테스트에 3번에 걸쳐 하드 코딩 되어 있는데요. 이걸 모두 바꿔줘야 합니다.

이렇듯 frontend 테스트는 ui의 사소한 변경에 치명타를 맞는 것 같습니다. 그래서 어떤 분들은 ui보다는 상태를 직접 테스트하는 게 맞지 않냐고 말이죠. 어떤 분은 unit은 쉬운데, e2e는 어렵다고 하고요. 어떤 분은 e2e는 짜겠는데 unit은 어렵다고 합니다.

왜 이렇게 된 걸까요?

상태 로직과 UI가 강결합된 것이 원인이에요. 상태 로직과 UI를 분리했다면 테스트가 ui에 따라 바뀔 일은 없었을 거에요. 저희는 return 해주는 부분이 UI이고, 상태 로직은 useState와 useEffect를 비롯한 Hook들이었어요. 이 둘이 하나의 컴포넌트 안에 지역 상태로 모여 있기 때문에 이런 일이 벌어진 것이죠.

## 언제 커스텀 훅을 분리해야 할까?

UI와 로직 분리하려면 어떻게 해야할까요? 상태 로직을 custom hook으로 추출할 수 있겠습니다. 

### 지역 상태는 대부분의 경우에 더 좋다
하지만 잠시 멈춰보죠! 정말 꼭 분리해야 할까요. 겨우 라벨 바꾸기 귀찮다고, 그런 대공사를 하는 건 배보다 배꼽이 큰 것 같아요. 대부분의 경우에는 상태 로직을 컴포넌트 안에 지역 상태로 두는 게 좋습니다.

예를 들어 저와 [리덕스 팀은 form 상태 같은 걸 전역 상태 관리 라이브러리 같은 곳에 넣는 건 끔찍한 아이디어라 생각해요](https://redux.js.org/style-guide#avoid-putting-form-state-in-redux). 전역 변수가 나쁜 것처럼, 전역 상태는 성능 이슈로 이어질 수도 있고 위험할 수도 있어요.

### UI와 묶인 코드는 테스트가 느려요
그러니 다양한 의견을 들어보고 생각을 해봐야겠습니다. 어디 누가 쓴 글에서 주장하는 의견을 회사 코드에 바로 적용하기 전에 말이죠.

우아한 형제들 등에서 쓰이는 MobX를 만든 Michel Weststrate는 [(번역)UI는 좀 이따 생각해봅시다](https://www.rinae.dev/posts/ui-as-an-afterthought-kr)라는 글에서 테스트와 UI가 강결합되면 테스트하기도 어렵고, 현재의 프레임워크에 종속된다고 말합니다.

실제로 component 테스트는 느립니다. node에서 jsdom으로 실제 화면을 렌더하지 않는데도, 클릭 한 번을 할 때마다 50ms 전후가 걸립니다. 매우 짧은 시간으로 보이실지도 모르겠습니다만. 이렇게 테스트가 100개 정도 되면 5초가 걸리고요. 테스트를 짜기 시작하면 흔한 일입니다.

### 컴포넌트 테스트는 직관적이고, 대부분의 케이스를 커버할 수 있습니다.

하지만 이 역시 다르게 생각해볼 수도 있어요. 어떤 분은 추상적인 메서드 호출이 더 쉬울지도 모르지만. `@testing-library`를 이용해서 click하고 화면이 바뀌는 걸 테스트하는 게 더 직관적이라 생각하는 분도 있어요.

또 뒤에서 보시겠지만, 상태를 분리하더라도 UI를 테스트하지 않을 수는 없어요. 상태도 테스트하고, UI도 테스트하면 좀 이상해요. 메서드를 호출하면 상태가 바뀌는지 테스트한 뒤에, 클릭하면 화면이 바뀌는지 테스트를 또 해야 하거든요. 일을 두 번 하는 게 될 수도 있습니다.

그래서 `@testing-library`를 만든 Kent C. Dodds는 [테스팅 트로피](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests)를 이야기하면서 통합 테스트, 즉 컴포넌트 테스트를 많이 짜는 게 좋다고도 이야기해요.

### 로직을 분리하면, UI 프레임워크가 변해도 안전해요
한편 리액트의 패러다임은 계속 변하고 있습니다. 저희의 `useState`나 `useEffect`도 그렇습니다. 불과 몇 년 전만 해도 `class component`가 주류였고, hook은 널리 쓰이지 않았습니다. 최근 `fine grained reactivity`라는 유령이 세상을 떠도는데. 리액트에서도 [signal](https://twitter.com/_developit/status/1569065455192506370)이 주류가 될지는 누구도 모르지요.

`nanostore` 같은 라이브러리를 이용하면 `hook`은 물론이고, `react`에도 종속되지 않을 수도 있습니다. `vue`, `svelte`, `solid` 등 어떤 프레임워크에서도 돌아가는 다크 모드 라이브러리를 만들어서 [useHooks](https://usehooks.com/useDarkMode/)같이 배포할 수도 있겠어요.

### 일반론보다는 우리의 상황을 관찰합시다

이런 때 남의 말을 듣기 보다는 우리의 상황을 잘 관찰하는 게 중요합니다. 저는 보다 현실적인 이유를 들고 싶어요. 보통 dark mode 같은 테마는 `Context`에 넣어 놓고 이곳저곳에서 공유하는 경우가 많습니다. [실제로 리액트 문서에서도 theme을 예시로 Context API를 설명하고 있습니다](https://reactjs.org/docs/context.html)

또 저는 아이즈원 프라이빗 메일을 작업할 때에도 비슷한 기억이 있습니다. 저는 키보드 단축키를 좋아하고, 접근성을 위해서도 단축키를 넣고 싶었어요. `d`키를 누르면 다크모드가 전환되는 식으로 말이죠. 하지만 단축키는 버튼 하나가 아니라 화면 전체 어디에서든 (단 input 안이 아닐 때) 누를 수가 있고요. 또 키가 충돌하면 안 되니 한 곳에 모아두고 싶어요.

저는 그때도 상태를 분리했습니다. 그래서 긴 고민 끝에 커스텀 훅을 분리해볼게요.

## 커스텀 훅 분리하기

이번에도 테스트 먼저 옮겨봅시다. `nanostore` 같은 걸 써보고도 싶지만, 일단 react의 기능만 활용해볼게요.

```ts
// useDarkMode.test.tsx
import { describe, it, expect } from 'vitest';
import { act, render, renderHook } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import * as ReactDOMServer from 'react-dom/server';
import { useDarkMode } from './useDarkMode';

describe('useDarkMode', () => {
	const $html = document.getElementsByTagName('html')[0];

	it('isDark를 toggle하면, false로 바뀌고, 다시 toggle하면 true로 돌아온다', async () => {
		// renderHook으로 훅만 render합니다.
		const { result } = renderHook(() => useDarkMode());
    
		// result ref에서 isDark 상태를 검증합니다
    expect(result.current.isDark).toBe(true);
    expect($html).toHaveAttribute('data-theme', 'forest');

		// act로 감싸서 상태가 변경될 때까지 기다립니다
    act(() => result.current.toggleDark());

    expect(result.current.isDark).toBe(false);
		expect($html).toHaveAttribute('data-theme', 'emerald');
    
    act(() => result.current.toggleDark());

    expect(result.current.isDark).toBe(true);
		expect($html).toHaveAttribute('data-theme', 'forest');

		$html.setAttribute('data-theme', '');
	});

  function renderServerSide(element: React.ReactElement) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    container.innerHTML = ReactDOMServer.renderToString(element);
    return { container };
  }

  it('SSR에서는 다크로 렌더되지만, 사용자가 라이트 모드를 선호하면, 라이트로 다시 렌더된다', () => {
    function Story(){
      const { isDark } = useDarkMode();
      return (<button>{isDark ? '다크' : '라이트'}</button>);
    }

    const { container } = renderServerSide(<Story />);

    const button = screen.getByRole('button', { name: '다크' });

    window.matchMedia = () => ({ matches: false }) as MediaQueryList;

    render(<Story />, { container, hydrate: true });

    expect(button).toHaveAccessibleName('라이트');

    Object.assign(window, { matchMedia: undefined });
  });
});
```

바뀐 부분이 보이시나요? 기존의 컴포넌트 테스트에서, text처럼 변덕스러운 부분만 true / false로 변했습니다. 사용자의 클릭에 의존하던 코드는 toggleDark 메서드를 호출하는 것으로 바뀌었지요.

> 리액트는 훅의 법칙 때문에 `renderHook`을 쓸 수 밖에 없었는데요. `result.current`에 `act`까지 더해지니 그렇게 예쁘진 않습니다. vue나 svelte, `nanostore` 등에서는 같은 코드를 얼마나 깔끔하게 구현할 수 있는지 생각하면, 역시 아쉬움이 남아요.

한편 SSR은 UI 없이 테스트할 수 없습니다. 이 역시 테스트만을 위한 간단한 UI를 만들어서 분리했습니다. 테스트 파일의 확장자도 그래서 `.tsx`로 해줬고요. 이 UI는 이 hook에만 의존하기 때문에, 기획이 변경되더라도 영향을 받지 않아서 더 안전하지요.

`useDarkMode` hook을 구현하는 건 더 쉽습니다. 그냥 잘라내서 붙여넣기한 뒤에, 함수로 `export`해주면 되거든요.

```ts
// useDarkMode.ts
import { useEffect, useState } from 'react';

export function useDarkMode(){
  const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		if (window.matchMedia !== undefined) {
			setIsDark(window.matchMedia('(prefers-color-scheme:dark)')?.matches);
		}
	}, []);

	useEffect(() => {
		const $html = document.getElementsByTagName('html')[0];
		$html.setAttribute('data-theme', isDark ? 'forest' : 'emerald');
	}, [isDark]);

	function toggleDark() {
		setIsDark((old) => !old);
	}

  return { isDark, toggleDark };
}
```

귀찮은 건 이제 모두 커스텀 훅이 하고 있습니다. 이제 UI는 식은 죽 먹기에요.

`DarkModeButton`도 테스트부터 바꿔줍니다. 상태가 두 가지니까, 두 가지 상태의 UI를 검증하고. 클릭이 잘 되는지만 확인하면 됩니다. 정말 간단해지죠.

```tsx
// DarkModeButton.test.tsx
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import DarkModeButton from './DarkModeButton';

describe('DarkModeButton', () => {
	it('다크 모드 버튼을 클릭하면, 라이트 모드로 바뀐다', async () => {
		render(<DarkModeButton />);
		const button = screen.getByRole('button', { name: '현재 다크 모드, 라이트 모드로 전환하려면 클릭하세요' });

		await userEvent.click(button);

		expect(button).toHaveAccessibleName('현재 라이트 모드, 다크 모드로 전환하려면 클릭하세요');
	});
});
```

이제 `useDarkMode` hook을 사용하도록 버튼의 구현체도 바꿔줍니다.

```tsx
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useDarkMode } from './useDarkMode';

function DarkModeButton() {
	const { isDark, toggleDark } = useDarkMode();

	const label = isDark
		? '현재 다크 모드, 라이트 모드로 전환하려면 클릭하세요'
		: '현재 라이트 모드, 다크 모드로 전환하려면 클릭하세요';

	return (
		<button type="button" aria-label={label} onClick={() => toggleDark()}>
			{isDark ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}
		</button>
	);
}

export default DarkModeButton;
```

고민을 많이 했지만, 분리해놓고 보니 깔끔해서 마음에 듭니다. 이제 앞에서 말한 것처럼 `Context`로 야망을 펼쳐볼까요.

## Context로 의존성 주입하기

[react의 공식 문서](https://beta.reactjs.org/learn/passing-data-deeply-with-context#use-cases-for-context)에서도 이야기하듯이, context는 theme을 이곳저곳에 주입해주는데 널리 쓰입니다. 특히 저는 키보드로 단축키를 만드는데 도움이 될 것 같아요.

이번에는 먼저 코드를 보고 테스트를 만드는 신기한 접근법을 써볼게요. 먼저 `DarkModeContext.tsx`를 만들어볼까요.

```tsx
// DarkModeContext.tsx
import React, { createContext } from "react";
import { useDarkMode } from "./useDarkMode";

// 디폴트 값을 넣어서 Context를 만들어요
export const DarkModeContext = createContext({
	isDark: false,
	toggleDark: () => {}
});

// 상태를 내려주는 Provider component도 만들어줍니다.
export function DarkModeProvider({ children }: { children: React.ReactNode }) {
	const { isDark, toggleDark } = useDarkMode();
	
	return (
		<DarkModeContext.Provider value={{ isDark, toggleDark }}>
			{children}
		</DarkModeContext.Provider>
	)
}

```

그리고 DarkModeButton이 `DarkModeContext`를 사용하게 바꿔줍시다.

<div class="plus-lines-3 plus-lines-4 plus-lines-7"></div>

```tsx
// DarkModeButton.tsx
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

function DarkModeButton() {
	const { isDark, toggleDark } = useContext(DarkModeContext);

	// ... 생략
}
```

그러면 테스트가 와장창 깨지는 걸 보실 수 있어요. 이게 저의 음모였지요.

```bash
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  app/components/DarkModeButton.test.tsx > DarkModeButton > 다크 모드 버튼을 클릭하면, 라이트 모드로 바뀐다
TestingLibraryElementError: Unable to find an accessible element with the role "button" and name "현재 다크 모드, 라이트 모드로 전환하려면 클릭하세요"

Here are the accessible roles:

  button:

  Name "현재 라이트 모드, 다크 모드로 전환하려면 클릭하세요":
  <button
    aria-label="현재 라이트 모드, 다크 모드로 전환하려면 클릭하세요"
    type="button"
  />

  --------------------------------------------------
```

에러를 읽어보면 다크 모드 버튼을 찾지 못했고, 라이트 모드로 렌더되었어요.

그 이유는 컴포넌트가 `Provider`로 감싸(wrap)지지 않았을 때에는, `Context`를 만들 때 넣었던 기본 값을 사용하기 때문이에요. 기본 값에 `isDark: false`로 넣어줬기 때문에 라이트 모드로 렌더되는 거죠.

이런 때에는 `@testing-library`의 `render` 함수에 `wrapper` 옵션으로 프로바이더 컴포넌트를 넣어주면 됩니다. 전에 `ssr`을 할 때 `container`나 `hydrate` 옵션을 넣어준 것처럼 말이죠. 물론 옵션을 쓰지 않고, 수동으로 감싸주실 수도 있어요.

<div class="plus-lines-6 plus-lines-11 plus-lines-12"></div>

```tsx
// DarkModeButton.test.tsx
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import DarkModeButton from './DarkModeButton';
import { DarkModeProvider } from './DarkModeContext';

describe('DarkModeButton', () => {
	it('다크 모드 버튼을 클릭하면, 라이트 모드로 바뀐다', async () => {
		render(<DarkModeButton />, {
			wrapper: DarkModeProvider
		});

		const button = screen.getByRole('button', {
			name: '현재 다크 모드, 라이트 모드로 전환하려면 클릭하세요'
		});

		await userEvent.click(button);

		expect(button).toHaveAccessibleName('현재 라이트 모드, 다크 모드로 전환하려면 클릭하세요');
	});
});
```

그러면 테스트를 통과합니다!

```bash
 ✓ app/components/DarkModeButton.test.tsx (1)

Test Files  14 passed (14)
     Tests  36 passed (36)
  Start at  23:30:38
  Duration  4.88s


 PASS  Waiting for file changes...
       press h to show help, press q to quit
```

## Context의 다양한 쓸모

Context는 이런저런 라이브러리를 사용하면서 많이 보게 되실 거에요. 모두 비슷한 패턴을 쓸 수 있습니다.

- `redux`나 `react-query` 같은 상태 관리 라이브러리들은 provider로 초기 store나 client를 주입할 수 있어요.
- `react-router-dom`은 서로 다른 router 구현체를 주입할 수 있지요. 이런 컴포넌트를 테스트하는 일도 크게 다르지 않아요.

하지만 이렇게 매번 `wrapper`를 설정해주는 건 번거롭기도 하거니와. 컴포넌트 하나를 테스트하는데 몇 개의 `Provider`가 필요한 경우도 있지요.

이런 경우는 어떻게 다뤄야 하는지는 옆집의 *테스트로 보는 DI* 시리즈에서 다룰 예정이니 참고해주세요.

## 마치며
이걸로 첫 번째 글을 마치고자 해요. 다음에는 `form`이나 `router`, `api`, `localStorage`, `modal`과 `portal`, `tab` 등 복잡하고 다양한 실제 상황을 다뤄보려 해요. 당연히 관련된 접근성 논의도 같이 소개합니다. 혹시 궁금하거나 다뤄주길 바라는 주제가 있다면 댓글로 달아주세요.

 언제가 될지는 약속할 수 없지만, 다시 오겠습니다.
 