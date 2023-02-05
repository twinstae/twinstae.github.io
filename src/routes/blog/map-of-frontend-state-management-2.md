---
title: '프런트엔드 상태의 지도 - (2) Form 상태'
excerpt: '상태관리 서브웨이 안내서. 모던 프런트엔드는 수 많은 반응형 상태관리 방법으로 넘쳐나고 있습니다. 어떤 대안들이 있으며, 뭐가 다른 걸까요?'
date: '2023-01-30T10:20:44.269Z'
author: 탐정토끼(Taehee Kim)
tag: '작성 중, 프런트엔드, 상태, 지도'
---

이번에는 다양한 Form의 사례를 다루고, 테스트해보면서, 리액트를 비롯한 반응형 상태 관리 도구로 form을 다루는 법을 이야기해보려 합니다.

잠시 지난 글의 내용을 복습해봅시다.

1. **상태**는 useState나 redux 뿐만 아니라, 원래 더 넓은 의미를 가지고 있었습니다. 앞서 일어난 **이벤트**나 **사용자의 입력**에 따라서 상태는 계속해서 변합니다.
2. 세상은 상태로 가득 차 있습니다! 변수, 방문기록, 파일이나 DB, 로컬 스토리지에 저장된 데이터, 캐시, dom, 현재 시간이나 무작위 값이 모두 상태입니다.
3. 이런 상태를 직접 '**어떻게**' 조작하고 변경할지, 즉 '**효과(effect)**'를 일으키는데 집중하는 게 고전적인 **명령형** 프로그래밍입니다.
4. 처음에 명령형은 직관적이고 단순해보이지만...
5. 상태가 **분산되고 공유**되기 시작하면 서로 모순되고 무결성이 깨진 걸, **동기화**하느라 고통 받게 됩니다!
6. 내가 기대하는 게 **무엇**인지에 집중하는 **선언형** 프로그래밍의 한 가지인
7. **함수형** 프로그래밍은 값을 계산하는 순수 함수를 조합하고
8. **반응형** 은 동기화되는 이벤트와 데이터의 흐름을 선언하면, 알아서 구독하고 전파해줍니다.
9. 이는 엑셀의 함수, svelte의 $ 연산자는 물론이고 react에서도 쉽게 구현할 수 있었습니다.

## 사용자 입력을 마주하기

그러면 또 생각을 해봅시다. 사용자 입력은 무엇이고 어떤 것들이 있을까요?

물론 매우 다양합니다! 프런트엔드 개발자라는 말이 널리 쓰이기 전부터, 터치와 클릭, GUI가 없을 때에도 **입력Input**은 있었습니다. 튜링 머신에 들어가는 명령어 띠부터, 천공카드, 유닉스 계열 커맨드라인에서 쓰이는 것과 같은 표준 입력 문자열도 있습니다.

프로그램 안에 모든 데이터가 다 들어 있는 경우는 별로 없습니다. 대부분의 프로그램은 동적으로 들어오는 사용자의 입력에 반응해서 출력을 내놓고, 상호작용합니다.

웹 개발을 비롯한 GUI에서 Form 은 사용자가 무언가를 제출할 수 있는 양식입니다. textbox, checkbox, select, datepicker 등 여러 input을 통해 사용자의 입력을 받지요.

여기에 어떤 '상태'들이 있고 무엇이 고민인지... 하나씩 사례를 탐구해봅시다.

## 회원가입 form에서 아이디 중복 확인하기

회원가입은 전환의 가장 중요한 길목 중 하나입니다. 사용자가 회원가입을 해야 회사의 서비스를 사고 돈을 내지 않겠어요? 회원가입이 불편하거나 귀찮으면, 회사들은 돈을 벌지 못할 겁니다.

일단 로직을 사람의 말로 써봅시다.

> - 가입하려면 아이디와 비밀번호가 필요합니다.
> - 아이디와 비밀번호는 유효해야 합니다. 아이디를 입력하지 않거나, 빈 문자열이면 안 됩니다.
> - 아이디는 최소 3글자 이상이어야 합니다.
> - 비밀번호는 최소 8 글자 이상이어야 하고, 숫자와 알파벳, 특수문자가 하나 이상 포함되어 있어야 합니다.
> - 비밀번호에 오타를 낼 수도 있기 때문에, 비밀번호를 두 번 입력해서 확인하고, 그 둘은 일치해야 합니다.
> - 사용자가 form을 다 채우고 "가입하기" 버튼을 클릭하면, 서버에 회원가입 요청이 날아가고...
> - 여기서 중복 여부를 확인합니다. 아이디가 중복이면 서버에서 409 Conflict status code로 응답을 줍니다.
>   - 이때 아이디 input이 invalid 하다고 사용자에게 붉은 테두리로 보여주고
> 	- 밑에는 텍스트로 에러 메세지도 보여줘야 합니다.
>   - 사용자가 id를 한 글자라도 수정하면 원래 모습으로 돌아갑니다.

일단 이 정도면 될 것 같습니다. 간단하게 HTML도 생각해둘까요?

```html
<form id="signup-form">
	<label>
		아이디
		<input type="text" name="id" />
	</label>
	<label>
		비밀번호
		<input type="password" name="password" />
	</label>
	<label>
		비밀번호 확인
		<input type="password" name="password-confirm" />
	</label>
	<button type="submit">가입하기</button>
</form>
```

일단 이 정도면 될 것 같습니다. 이제 로직을 하나씩 테스트하면서, 상태 관리의 고통을 마주해보겠습니다.

## You might not need Reactive State

브라우저가 지원하는 내장 기능을 사용하면 복잡한 프레임워크나 상태 없이도 쉽게 form 상태를 처리할 수 있는 경우가 많습니다. 이는 React로 만든 앱에서도 사용할 수 있고요. Remix나 Sveltekit 등에서는 이와 유사한 기능을 SPA와 통합해서 사용할 수 있게 지원해주기도 합니다.

회사에서 기술 과제를 하다 보면 바닐라 js로 앱을 만들라는 과제를 주곤 합니다. "바닐라"라는 표현을 처음 듣는 분도 계실텐데. 아이스크림의 바닐라맛처럼 프레임워크나 라이브러리 없이 순수한 js만 사용한다고 해서 바닐라 js라고 합니다.

Web 에는 사실 UI를 만드는데 필요한 API들이 이미 다 있습니다. HTML은 대표적인 선언형 언어라서, 우리의 요구사항을 그대로 옮길 수 있어요.

```html
<form id="signup-form">
	<label>
		아이디
		<input type="text" name="id" required minlength="4" />
	</label>
	<label>
		비밀번호
		<input type="password" name="password" required minlength="8" />
	</label>
	<label>
		비밀번호 확인
		<input type="password" name="password-confirm" required minlength="8" />
	</label>
	<button type="submit">가입하기</button>
</form>

<script>
	// fake dependencies
	class AlreadySignupError extends Error {}
	const fakeDB = ["twinstae"];
	const myAlert = alert;
	const redirect = () => alert('회원가입 성공! 메인 페이지로 이동합니다.');
	const api = {
		auth: {
			async signUp({ userId }) {
				if (fakeDB.includes(userId)) {
					throw AlreadySignupError();
				}
				fakeDB.push(userId);
			}
		}
	};

	const form = document.getElementById("signup-form");

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const { userId, password, passwordConfirm } = Object.fromEntries(new FormData(form));

		if (password !== passwordConfirm) {
			myAlert("비밀번호가 다릅니다");
			return;
		}
		api.auth
			.signUp({ userId, password, passwordConfirm })
			.catch((e) => {
				if (e instanceof AlreadySignupError) {
					myAlert("이미 가입된 아이디입니다");
				}
			})
			.then((e) => {
				redirect("/");
			});
	});
</script>
```

## useState : 반응형 상태

## 리렌더 성능


## 명령적 dom api의 한계

## "그래서 어떤 방식을 써야 하나요?"

## react-hook-form은 상태 관리 라이브러리인가?

## Custom Hook과 캡슐화

## focus 관리 : 명령적 vs 함수적

## Derived : 파생 상태

## useEffect : 리액트 상태를 외부와 동기화하기
