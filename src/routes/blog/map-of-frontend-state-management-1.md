---
title: '프런트엔드 상태 관리의 지도 - (1) 상태란 무엇인가'
excerpt: '상태관리 서브웨이 안내서. 상태는 리액트의 useState도 리덕스도 아닙니다. 상태는 변하는 모든 것들입니다.'
date: '2023-01-04T10:20:44.269Z'
author: 탐정토끼(Taehee Kim)
tag: '프런트엔드, 상태, 지도'
---

## 프런트엔드는 대 상태관리 시대

이 시대에 프런트엔드 UI를 개발하는 분이라면, 누구나 상태(State)라는 말을 들어보셨을 겁니다. 지역 상태니 전역 상태니, 리덕스니! 라이브러리는 넘쳐나고, 상태가 무엇인지, 왜 중요한지는 잘 모르겠다는 분이 많습니다.

저는 이 글에서 제 정답을 제시하려는 건 아닙니다. 다양한 의견과 근거들을 정리하고, 오해를 줄이며, 선택에 도움을 드리고자 합니다.

그러면 제가 무슨 자격이 있어서 그런 말을 할까요? 제가 이 다채로운 생태계를 이모저모 잘 알게 된 사정이 있습니다.

## 코치는 세계여행을 한다

제 직업은 코치입니다. 다양한 분들을 만나서 개인적으로는 성장하고, 팀의 문제를 함께 해결하실 수 있게 도와주는 일을 합니다.

코칭의 장점이 뭔지 아시나요? 바로 경험의 폭이 넓고 다양하다는 겁니다.

- 취준생 분들과 React 상태 관리 라이브러리들을 스터디하며 연습용 프로젝트를 만들어보고
- 회사와 개인의 기술 블로그, 댄 아브라모가 쓴 You might not need Redux와 같은 글들, 여러 프레임워크의 라이브러리와 공식 문서를 읽고
- 트위터에서 프레임워크와 상태 라이브러리 개발자들이 논쟁하는 걸 지켜보고
- Vue를 쓰는 팀에 취직해서 Vue2에서 Vue3로 전환하는 일을 돕고 tanstack-query를 전도하거나
- Angular를 쓰는 분을 코칭하며 회사의 레거시 코드에 대해 논의하거나
- 제 첫 개인 프로젝트는 Svelte로 만든 웹 앱이었고, 제 블로그도 Svelte이며
- nanoStore에 utility를 만들어 PR을 날리기도 하고
- Flutter나 Android, Game 등의 UI 개발자 분들과 같이 디버깅을 하는 등...

자랑은 아니고요. 모두 깊이는 얇지만 넓은 지식을 얻게 되었다고 할까요. 큰 그림을 조망할 수 있게 되었습니다.

## 상태관리의 지도

슬프게도 "그래서 뭐가 좋은 거야?"라는 질문에 쉬운 답은 없습니다. 리덕스는 여전히 "특정한 상황에서는" 강력하며, 모든 도구는 자기만의 강점도 있지만. 잘못 쓰면 위험하기도 합니다. 유지보수의 고통은 누군가의 몫이 되겠죠.

이 글은 ㅇㅇ 쓰세요라는 답을 주진 않습니다. 그보다는 모던 프런트엔드의 상태 서브웨이를 모험하는 카탈로그이자 안내서, 혹은... 지도입니다.

상태에 대해 좁게 생각해오셨다면, 이게 여러분의 얼어붙은 바다를 깨는 도끼인지 뭐시기가 되기를.

두려워하기보다는, 여러 선택지들을 이해하고, 우리 상황에 맞는 단순한 해법을 선택하시는데 도움이 되기를 바랍니다.

## 상태의 넓은 의미

질문을 하나 해보겠습니다.

> 여러분은 상태는 무엇이라 생각하시나요?

상태는 변합니다. 상태는 리액트의 useState나 redux가 전부가 아닙니다. 생각보다 많은 것들이 상태에 속합니다.

상태라는 말이 어디서 시작했는지 알기 위해 위키백과로 가봅시다.

> "정보 기술과 컴퓨터 과학에서, 시스템이 이전의 이벤트나 사용자와의 상호작용을 기억하도록 설계되어 있다면, **stateful**하다고 한다; 이 기억하는 정보를 시스템의 **상태**(State)라고 한다. (중략) 컴퓨터 프로그램은 데이터를 변수에 저장하고, 이는 컴퓨터 메모리의 저장소 위치를 나타냅니다. 프로그램이 실행되는 동안 주어진 순간에, 이 메모리의 위치에 있는 내용은, 프로그램의 상태라고 부릅니다."
> 
> [위키백과 : State (computer science)](https://en.wikipedia.org/wiki/State_(computer_science))
> (강조는 필자)

이러한 상태에 대한 정의 사실 컴퓨터의 기원부터 시작됩니다. 튜링 기계나 폰 노이만 구조 같은 걸 찾아보시면. 컴퓨터는 결국 CPU와 메모리, 입출력 이라는 세 가지 요소로 이루어지는 걸 알 수 있습니다. 밖에서 들어오는 입력과 현재 메모리의 값을 따라 CPU가 계산을 합니다. 이 값은 다시 메모리에 적힌 상태를 변경하거나, 외부로 출력하는 게 컴퓨터의 본질입니다.

![2012년에 만든 튜링기계의 실물 모델](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Turing_Machine_Model_Davey_2012.jpg/1200px-Turing_Machine_Model_Davey_2012.jpg)

> 입력 => [ 이전 상태 => 새로운 상태 ] => 출력

컴퓨터가 기억하고 있는 데이터들은 계속 변합니다. 변하는 것. 그것이 바로 상태입니다.

물론 상태는 더 다양하고 복잡합니다. 앞으로 이야기하겠지만. 변할 수 있는 건 거의 모두 다 상태라고 봐도 됩니다. 거꾸로 말해서 나중에 봤을 때 변해있다면, 그건 상태입니다.

변수도 상태입니다. 엑셀의 cell 하나에 적힌 값은 상태입니다. 현재 URL(location)과 브라우저의 history, 하드 디스크에 있는 파일이나 로컬 스토리지, DB에 기록된 데이터도 상태입니다. 브라우저 캐시도 상태이고, 화면에 그려질 문서의 dom도 상태입니다. 현재 시간이나, 무작위 난수도 상태입니다.

세상은 상태로 가득 차 있습니다. 그래서 변덕스럽고 귀찮습니다. 시간은 흐로고, 이벤트는 계속 일어나며, 최신화와 동기화는 끝이 없습니다.

이제 우리는 상태를 조작하는 명령형과, 불변 값의 관계를 선언하는 선언형 프로그래밍에 대한 이야기로 넘어가게 됩니다.

## 명령형 : 상태 조작하기

프로그래머들은 명령어를 통해 상태를 변경합니다. 예를 들어 변수를 선언한 뒤에 값을 재할당할 수 있습니다.

```ts
let count = 0; // count 변수를 0으로 초기화

count = 1; // count가 1로 변경됨
```
여기서 `count` 변수는 상태이고 우리는 그 값을 1로 바꾼 겁니다.

이렇게 상태와 상태를 변경하는 명령을 중심에 놓는 프로그래밍 패러다임을... 우리는 명령형 프로그래밍이라 합니다. 뒤에서 이야기할 `선언형` 특히 `함수형` 패러다임에서는 이를 `효과`(effect) 혹은 `부수 효과`(side effect)라고 부르기도 합니다. 명령형과 선언형은 사이가 안 좋아서, 대립하는 관계에 있습니다.

그럼에도 우리는 효과 없이 프로그램을 짤 수 없습니다. 입출력에 따라 상태가 변하는 것이 컴퓨터의 본질?이니까요.

- 링크를 클릭해서 다른 URL로 이동하는 것도 상태를 바꾸는 겁니다.
- 게시글을 쓰거나, 수정하거나, 삭제하는 것도 상태 조작입니다.
- 로컬 스토리지에 setItem으로 값을 쓰는 것도 상태를 변경합니다.
- 화면에 보이는 글자나 버튼의 색을 바꾸는 것도 효과입니다.
- 시간은 멈춤 없이 흐르고, 현재 시간이라는 상태는 계속 변합니다...

이런 상태 변경 없이 코딩을 할 수 있을까요? 없겠죠. 명령형은 어떻게 보면 자연스럽고 익숙하게 느껴지기까지도 합니다.

공유 상태의 비극을 마주하기 전까지는요. 전역 변수, 혹은 전역 상태가 끔찍한 이유이기도 합니다.

## 분산된 상태를 동기화하기

상태는 보통 한 곳에만 있지 않습니다. 같은 상태를 여러가지 방식으로 보여주기도 하고요. 예를 들어 내가 은행 앱을 쓴다면 은행의 서버가 있고, 은행 앱 프런트엔드도 있을 겁니다. 서버가 관리하는 DB도 상태이고 사용자가 보는 화면도 상태입니다.

그러면 두 상태는 동기화되어야 합니다. 다시 말해 은행 DB에 있는 통장 잔고를 사용자가 보는 화면에도 띄워줘야겠죠?

{{mmd}}
flowchart LR
		A(**서버 상태** 잔고: 100000원) -->|일치| B(**화면 상태** 잔고: 100000원)
		B -->|일치| A
{{/mmd}}

문제는 이렇게 상태가 두 개 이상일 때!... 불일치하거나 논리적으로 안 맞을 수 있다는 겁니다.

사용자가 보는 UI 화면에 토끼 페이 잔고가 10만원 남았다고 뜨는데, 그 사이에서 서버에서 카드 값이 나갔다고 해봅시다. 그래서 통장에는 사실 0원 밖에 없습니다. 즉 돈이 없는 거죠.

이 두 상태 사이에 모순이 있습니다. 사용자가 돈이 있는 줄 알고 물건을 구매했다면, 서버에서는 잔고가 부족하다고 에러가 날아오겠죠!

{{mmd}}
flowchart LR
		A(**서버 상태** 잔고: 0원) -->|불일치| B(**화면 상태** 잔고: 100000원)
		B -->|불일치| A
{{/mmd}}

이 문제를 막으려면 서버와 상태를 동기화해줘야 합니다. 이를 명령적인 코드로 쓰면 다음과 같을 겁니다. 예전에는 이걸 JQuery로 했지만. 요즘에는 순수 JS만으로도 간단합니다.

```html
<span id="balance">잔고: 100000원</span>

<script>
	setInterval(() => {
		fetch('/api/balance/me') // 서버에서 balance의 상태를 들고 옵니다.
			.then(res => res.text())
			.then(newBalance => {
				// id가 'balance' 인 dom 객체의 innerText 상태를 바꿉니다.
				document.getElementById('balance').innerText = `잔고: ${newBalance}원`;
			})
	}, 10 * 1000) // 10초마다 다시 확인합니다.
</script>
```
JQuery를 이용해도 다음처럼 단순합니다.

```html
<span id="balance">잔고: 100000원</span>

<script>
	setInterval(() => {
		$.ajax({
		url: "/api/balance/me",
		success( result ) {
			$( "#balance" ).text("잔고: "+ newBalance + "원" );
		}
	});
	}, 10 * 1000) // 10초마다 다시 확인합니다.
</script>
```

이렇게 단순해 보이는 JS 기본 기능과, JQuery를 두고 왜 리액트 같은 프런트엔드가 나왔을까요?

## 내가 할 일 = 상호작용의 수 X 상태의 수

물론 여러 이유가 있지만... 그 중 하나는 명령적 상태관리가 좀 복잡해지기 시작하면, 동기화가 헷갈리고 어렵기 때문입니다.

예를 들어 여러분이 할일목록 앱을 만드는데, `todo` 하나를 추가하거나 삭제하고 싶다고 해봅시다. 상태는 최소 2가지일테고, 이 둘을 항상 동기화해줘야 합니다.

- **메모리** : `todos` 배열이 있습니다. `const todos = ["운동하기", "글쓰기"]`
- **DOM** : `<ul>` 안에 각 todo 마다 `<li>`가 있습니다. (아래 html 참조)

예시 코드를 한 번 만들어보면 매우 복잡해집니다. 중복도 생기고, 까먹고 실수하기도 쉬워집니다. 나름 간단하게 만들려고 했는데도 말이죠! 꼭 이해하실 필요는 없으니 구경만 해보시죠.

```html
<ul id="todolist">
	<!-- dom의 초기 상태 -->
	<li>운동하기 <button>삭제</button></li>
	<li>글쓰기 <button>삭제</button></li>
<ul>
<form id="todo-form">
	<input type="text" name="content"/>
	<button type="submit">추가</button>
</form>

<script>
	// 배열의 초기 상태
	const todos = ["운동하기", "글쓰기"];

	function createTodoItem(todo) {
		const item = document.createElement('LI');
		item.innerText = todo;

		const deleteButton = document.createElement('BUTTON');
		deleteButton.innerText = '삭제';
		function deleteTodo(){
			todos.splice(todos.indexOf(todo), 1); // 배열에서 todo 문자열 삭제
			item.remove(); // DOM에서 item node 삭제
		}
		deleteButton.onclick = deleteTodo;

		item.appendChild(deleteButton);
		return item;
	}

	const $todolist = document.getElementById('todolist');
	function addTodo(todo){
		todos.push(todo); // 배열에 todo 문자열 추가
		$todolist.appendChild(createTodoItem(todo)); // DOM에 item node 추가
	}

	const $todoForm = document.getElementById('todo-form');
	$todoForm.onsubmit = (e) => {
		e.preventDefault();
		const todo = new FormData($todoForm).get('content');
		addTodo(todo);
	}
</script>
```

> - 기술 과제 등을 위해, 여기서 사용한 JS의 DOM 관련 메서드를 알고 싶으신 분은 [모던 자바스크립트 튜토리얼](https://ko.javascript.info/modifying-document)을 참고해보시길 추천드립니다.
> - [FormData](https://developer.mozilla.org/ko/docs/Web/API/FormData/FormData)에 대해서는 뒤에 Form 상태 관리의 사례를 다루면서 이야기하겠습니다.

사용자는 form을 submit하거나, 삭제 button을 click하는 등의 상호작용을 합니다. 이는 이벤트를 발생시키고 핸들러가 처리하죠.

제가 주석을 써놓은 부분을 살펴보시면. 핸들러는 두 개의 상태를 매번 똑같이 변경해줘야 합니다. 저희의 예시에서는 배열에도 값을 추가하거나 삭제하고, DOM에도 item node를 추가하거나 삭제해줘야 하는 것이죠.

{{mmd}}
flowchart LR
		Add(추가) -->|todos\.push| Arr(배열 상태)
		Add(추가) -->|list\.appendChild| Dom(DOM 상태)
		Del(삭제) -->|todos\.splice| Arr
		Del(삭제) -->|item\.remove| Dom
{{/mmd}}

패턴을 눈치채셨나요? 기능 하나마다 모든 상태에 작업을 해야 한다면... 이 둘은 곱한 만큼 코드를 짜야 합니다. 수식으로 쓰면 다음과 같겠죠.

> (가능한 상호작용의 수) 추가, 삭제 x (상태의 숫자) 배열, DOM = (내가 해야할 일) **4**

연관된 상태가 많아지고 복잡해질 수록 **조합 폭발**이 일어날 겁니다. 예를 들어 localStorage에 저장하고 불러오는 기능을 만든다고 합시다.

<div class="plus-lines-3 plus-lines-4 plus-lines-9 plus-lines-15"></div>

```html
<script>
	const saved = localStorage.getItem('todo-item'); // localStorage 상태 가져오기
	const todos = saved ? JSON.parse(saved) : []; // 배열을 초기화
	for (const todo of todos) { addTodo(todo); } // 화면을 초기화
	// ... 생략
		function deleteTodo(){
			todos.splice(todos.indexOf(todo), 1); // 배열 상태
			item.remove(); // DOM 상태
			localStorage.setItem(JSON.stringify(todos)); // localStorage 상태 덮어 쓰기
		}
	// ... 생략
	function addTodo(todo){
		todos.push(todo); // 배열 상태
		$todolist.appendChild(createTodoItem(todo)); // DOM 상태
		localStorage.setItem(JSON.stringify(todos)); // localStorage 상태 덮어 쓰기
	}
	// ... 생략
</script>
```

{{mmd}}
flowchart LR
		Store(localStorage) -->|getItem| Arr(배열 상태)
		Store(localStorage) -->|for 추가| Dom(DOM 상태)
		Add(추가) -->|todos\.push| Arr
		Add -->|list\.appendChild| Dom
		Add -->|setItem| Store
		Del(삭제) -->|todos\.splice| Arr
		Del -->|item\.remove| Dom
		Del -->|setItem| Store
{{/mmd}}

이 끔찍한 도표가 보이시나요. 이제 저희의 할일목록에 할일 완료, 수정하기, localStorage 말고 서버와 동기화 같은 기능을 추가한다고 생각해보시죠. 저는 실제로 코드까지 구현해봤지만, 일단 그래프만 그려보겠습니다.

{{mmd}}
flowchart LR
		Server(서버) -->|api\.getTodos| Arr(배열 상태)
		Server -->|for 추가| Dom(DOM 상태)
		Add(추가) -->|todos\.push| Arr
		Add -->|list\.appendChild| Dom
		Add -->|api\.addTodo| Server
		Del(삭제) -->|todos\.splice| Arr
		Del -->|item\.remove| Dom
		Del -->|api\.deleteTodo| Server
		Done(완료) -->|todo\.isDone \= true| Arr
		Done -->|doneCheckBox.ischecked \= true| Dom
		Done -->|api\.doneTodo| Server
		Update(수정) -->|todo\.content \= newContent| Arr
		Update -->|text\.textContent \= newContent| Dom
		Update -->|api\.updateTodo| Server
{{/mmd}}

그렇죠. 이건 끔찍한 동기화의 악몽입니다. 백엔드를 하시는 분들이라면 캐시나 DB와 도메인 객체를 동기화하는 고통을 떠올리실지도 모르겠어요.

## 선언형 반응형 상태
이러한 명령형 프로그래밍은 리액트를 비롯한 모던 프런트엔드가 채택한 '선언형', 그 중에서도 '함수형', '반응형' 패러다임과는 정반대입니다.

이 세 패러다임을 정확하게 설명하기는 어렵습니다. 거칠게 요약하면 다음과 같습니다.

- **선언형 Declarative** : 프로그램이 **어떻게** 상태를 바꾸는지가 아니라, **무엇**인지 선언하는 패러다임. 보통 명령형과 대립해서 설명한다. 예를 들어 함수형, 논리형, 객체지향 등이 있다.
- **함수형 Functional** : 상태와 부수효과를 밖으로 밀어내고, 순수 함수를 합성하는 패러다임
- **반응형 Reactive** : 이벤트를 구독하고 전파하는 데이터 스트림을 계산하고 합성하는 패러다임

셋 다 낯설게 느껴지시는 분이 많을 겁니다. 리액트나 뷰는 물론이고 RxJS와 같은 반응형 프로그래밍 라이브러리를 써오신 분들조차 그렇습니다. 그러니 구체적인 예를 들어서 설명을 해보겠습니다. 엑셀은 어떨까요?

왜 엑셀이냐고요? 엑셀은 직장에서도 개인적으로 많이 쓰는 도구입니다. 엑셀의 함수들은 반응형 패러다임으로 돌아갑니다. 예를 들어 스벨트를 만든 리치 해리스도 [Rethinking reactivity](https://www.youtube.com/watch?v=AdNJ3fydeao)라는 강연에서 엑셀을 가지고 반응형 패러다임을 설명하고요. [Vue 공식 문서의 Reactivity in Depth 항목](https://vuejs.org/guide/extras/reactivity-in-depth.html)도 그렇더군요. 여기서도 그 전통을 따라가보겠습니다.

참. 혹시 엑셀 함수를 써보신 적이 있나요? 안 써보신 분도 계실 거라 생각합니다. 간단하게 보여드리자면, 엑셀은 테이블... 즉 표처럼 생겼습니다.

{{svelteComponent name="ExcelExample" props='{"id":"excel-example"}' options='{"loading": "lazy"}'/}}

각 칸을 셸이라하고요. 셸의 세로 열은 A,B,C로 가로 행은 0, 1, 2 같은 식으로 좌표가 붙어 있습니다.

셸에는 값을 입력할 수 있습니다. 예를 들어 A1에는 사람의 이름인 `'토끼'`가 적혀 있고요. 토끼 씨의 선호도는 5점 만점에 `3`점입니다.

그리고 함수를 이용하면, 자동으로 계산이 되게 만들 수도 있지요. 예를 들어 가운데 하단을 보시면 `B3`를 `=SUM(B1:B2)`로 선언했습니다. `B3` 셀의 값은 = `B1`부터 `B2`까지 셸 값의 합이라는 거지요.

이렇듯 엑셀 함수로 코딩을 할 때에는 어떤 셀의 값을 '선언'하지, 저희가 짜던 코드처럼 한 줄 한 줄 상태를 변경하지 않습니다.

이렇게 계산한 값으로 또 계산을 할 수도 있습니다. 평균을 계산하려면 `AVG` 함수를 쓸 수도 있지만. 방금 계산한 `B3`에 들어 있는 합계를, 사람 수(`COUNT`)로 나누면 평균이 나옵니다. 그래서 `B4`는 `= COUNT(B1:B2)`로, `B5`는 `= B3 / B4`로 선언했습니다.

## 이벤트와 변경의 전파

값이 변하는 '이벤트'가 발생하면, 알아서 변경이 전파됩니다. 값이 재계산되고 화면도 업데이트 됩니다. 예를 들어 위의 엑셀에서 `'고양'`씨의 선호도를 1점이 아니라 5점으로 바꿔 적어보세요.

`B3`는 새로운 합계인 3 + 5 = `8`로, `B5`는 새로운 평균인 8 / 2 = `4` 로 재계산됩니다. 화면도 rerender되죠.

아까 명령형으로 코딩할 때 조합이 폭발했던 걸 생각해봅시다. 모든 행동에 모든 상태를 어떻게 바꿀지 설정할 필요는 없습니다. 그저 값과 값 사이의 관계를 `함수`로 계산하도록 `선언`하기만 하면 됩니다. 그러면 값이 바뀔 때마다 `반응`해서 변경이 전파됩니다. `'고양'`씨 말고 `'토끼'`씨의 값을 바꾸더라도 똑같이 재계산이 일어날 겁니다. `=COUNT(B1:B2)` 같이 새로운 계산을 추가하더라도 더 바꿀 곳은 없을 겁니다.

이러한 상태 사이의 관계를 그려보면 이렇게 단순합니다.

{{mmd}}
flowchart LR
		B1B2(3\,5 데이터) -->|SUM| B3(8 합계)
		B1B2 -->|COUNT| B4(2 사람 수)
		B3 --> B5(4 평균)
		B4 --> B5
{{/mmd}}

그러면 이렇게 좋은 반응형 프로그래밍을, 프런트엔드에서도 할 수는 없을까요?

## 스벨트와 리액트로 알아보는 반응형 상태

react나 svelte와 같은 프레임워크는 UI와 상태의 동기화를 엑셀처럼 해주는 것입니다.

방금 만든 코드를 svelte로 옮기면 이렇습니다. markup을 빼면 그렇게 복잡하지 않지요.

```svelte
<script>
	let data = [3,5]; // let 변수는 상태 store입니다.
	
	const sum = (data) => data.reduce((acc, n) => acc + n, 0);
	$: total = sum(data); // 2. 변수가 변경되면 $: 로 선언된 값들이 재계산됩니다.
	$: count = data.length;
	$: avg = total / count;
</script>

<!-- 1. bind된 사용자 input의 value가 변하면, 상태가 알아서 동기화됩니다-->
<label> 토끼 <input type="number" bind:value={data[0]}></label>
<label> 돼지 <input type="number" bind:value={data[1]}></label>
<!-- 3. 상태가 변하면, 그 상태에 의존하는 dom이 변경됩니다 -->
<label> 합계 <output>{total}</output></label>
<label> 사람 수 <output>{count}</output></label>
<label> 평균 <output>{avg}</output></label>
```

<a href="https://svelte.dev/repl/a723daf19a4f48c79d53bec6ac26332d?version=3.55.0" target="_window"> 스벨트 리플에서 직접 해보기</a>


변경이 전파되는 흐름을 그려보면 이렇습니다.


{{mmd}}
flowchart LR
		input -->|changeEvent| data
		subgraph compute
			data -->|sum| total
			data -->|length| count
			total --> avg
			count --> avg
		end
		compute -->|render| dom(dom output)
{{/mmd}}

이는 svelte에서만 가능한 걸까요? 사실 react로 구현해도 크게 다르지 않습니다.

```jsx
const sum = (data) => data.reduce((acc, n) => acc + n, 0);

// 2. 리액트 스케쥴러가 Excel 컴포넌트 함수를 다시 실행합니다.
function Excel() {
	// 3. useState로 새로 변경된 상태를 받아옵니다.
	const [data, setData] = useState([3,5]);
	
	// 4. 새 값을 계산합니다.
	const total = sum(data);
	const count = data.length;
	const avg = total / count;

	// 5. 컴포넌트 전체의 가상DOM을 반환합니다.
	return (
		<>
			<label>
				토끼
				<input
					type="number"
					value={data[0]}
					onChange={(e) => {
						// 1. onChange handler가 setData를 호출하면
						setData(([_, second]) => [e.target.valueAsNumber, second]);
					}}
			/>
			</label>
			<label> 돼지 <input type="number" value={data[1]} onChange={(e) => {
            setData(([first, _]) => [first, e.target.valueAsNumber]);
			}} /></label>
			<label> 합계 <output>{total}</output></label>
			<label> 사람 수 <output>{count}</output></label>
			<label> 평균 <output>{avg}</output></label>
		</>
	);
}
// 6. 리액트가 반환된 가상DOM과 실제DOM을 비교해서, 다른 부분만 변경합니다.
```

svelte와 react를 사용하면서. 우리는 명령적으로 상태를 동기화할 때처럼, 화면을 매번 어떻게 업데이트할지 고민하지 않았습니다. 엑셀처럼 프레임워크가 알아서 해주니까요. `appendChild`나 `remove`, `innerText` 처럼 헷갈리고 실수하기도 쉬운 명령적 API로 수정하는 게 아니라. 데이터를 변경하고. 데이터가 어떤 상태일 때, 보이는 화면은 무엇인지 **선언**만 해주면 되는 거지요. HTML과 비슷한 JSX와 템플릿으로요. (여담이지만 HTML은 대표적인 선언형 언어입니다.)

svelte의 let이나, react의 useState는 그냥 변수가 아닙니다. state와 view는 **연결**되어 있습니다. react의 컴포넌트는 state를 매개변수나 hook으로 주입 받는 함수라고도 할 수 있습니다. 데이터의 전파가 단순하고 직관적이기 때문에, 어디선가 뭘 실수했다고 해도 쉽게 에러를 찾을 수 있습니다.

이 말이 이해가 가신다면, [리액트 공식 문서의 다음 설명](https://ko.reactjs.org/)도 이해가 가실 겁니다.

> 선언형
> 
> React는 상호작용이 많은 UI를 만들 때 생기는 어려움을 줄여줍니다. 애플리케이션의 각 상태에 대한 간단한 뷰만 설계하세요. 그럼 React는 데이터가 변경됨에 따라 적절한 컴포넌트만 효율적으로 갱신하고 렌더링합니다.
> 
> 선언형 뷰는 코드를 예측 가능하고 디버그하기 쉽게 만들어 줍니다.

## 명령형보다 반응형이 더 효율적인가?

이렇게 설명을 하면, 리액트가 더 효율적이라거나. 반응형이 명령형보다 성능상으로 더 효율적이라는 식의 오해를 하는 경우가 자주 있습니다. 가상돔을 쓰기 때문에 직접 돔 조작보다 빠르다거나 효율적이라는 식의 오개념들 말이죠.

결론부터 말하자면 그렇지 않기 때문에 오해입니다. 리액트는 js로 직접 명령적으로 돔을 조작하는 것보다 (대부분의 경우) 느립니다.

세상의 많은 사이트는 여전히 JQuery나 라이브러리 없이 JS를 쓰고 있습니다. 지금 보시는 이 블로그도 Svelte로 만들었지만. 곳곳에 명령적 JS 코드로 만든 기능들이 있습니다. 프레임워크는 무겁고, 복잡해질 때도 많습니다.

우리가 선언적으로 반응형으로 코드를 짜더라도. 컴퓨터는 명령적으로 굴러갑니다. 계산도 리렌더도 모두 부수효과이고 비용입니다. 그래서 리액트에서 상태의 범위를 너무 크게 잡거나. 하나의 상태의 폼의 모든 데이터를 때려넣는 등의 끔찍한 일을 하면 화면이 버벅거리는 걸 보실 수 있죠. 반면에 순수한 js로 세밀하게 부수효과를 지정해준 명령적 코드는 훨씬 빠를 겁니다. 일을 느리게 만드는 프레임워크는 오버헤드이니까요.

물론 그렇다고 리액트는 쓰레기야! 하고 가져다 버릴 필요는 없습니다. 명령적으로 dom을 만드는 건 매우 귀찮기 때문에, JQuery나 바닐라 js를 쓰는 사람들은 innerHTML 같이 위험하고 느린 꼼수에 의존하곤 합니다. 그러면 차라리 리액트를 쓰는 게 나을 정도로 느려지기도 하고요. 성능은 둘째치더라도 버그와 보안 문제에 시달리게 됩니다. 리액트가 싫다면 preact, solid, svelte 처럼 가벼운 프레임워크도 요즘 많습니다.

다만 우리는 프레임워크를 사용할 때, 추상화된 선언적 사용 방법에 속아서는 안 되겠습니다. 캡슐화는 누출되고는 합니다. 끔찍한 리렌더 성능 이슈를 만날 때마다, 우리는 내부 원리로 다시 파고 들어가 불완전한 캡슐화를 저주하게 되겠습니다.

## 프레임워크 바깥의 세계

다르게 말하면 리액트를 명령적으로 사용할 수록 예상치 못한 버그와 마주칠 일도 더 많아지겠죠. 처음에 말씀 드린 바와 같이... 세상에는 상태가 넘쳐나고, 부수효과도 널려 있습니다. 리액트가 관리해주는 상태 너머... 바깥의 상태와 동기화하는 건 참 귀찮고 어려운 일입니다.

어떤 사람들은 상태가 둘로 나눠진 게 문제라며. 서버 사이드 렌더링이나, LiveView 같은 기술로 이 문제를 해결하려 합니다. Next.js의 getServerSideProps나 React-Router의 loader 등을 이용하면 클라이언트의 상태를 소거시켜버릴 수도 있습니다.

상태 관리 방법론이 춘추전국시대처럼 난립하는 데에는 이유가 있는 법이죠.

다음 시간부터는 Form, 서버와의 동기화, 복잡한 웹 애플리케이션과 같은 실제 사례들을 다뤄보려 합니다. 마지막으로는 앞으로 미래를 열어갈 방법론들과, 새로운 관점들도 하나씩 살펴보겠습니다.

이 글이 어려우셨던 분도 있을테고, 쉽고 당연한 이야기처럼 느껴지시는 분도 있을듯 합니다. 늘 그렇듯이 잘못된 부분을 찾으시거나, 중요한 부분을 빼먹었다고 생각하시는 분도 계실 거에요. 질문은 언제나 받고 있으니. 댓글로 달아주시거나 트위터 멘션이나 디엠을 주셔도 좋겠습니다.

## 참고 자료


- [위키백과 : State (computer science)](https://en.wikipedia.org/wiki/State_(computer_science))
- [드림핵 시스템 해킹 강의 : Computer Architecture](https://dreamhack.io/lecture/roadmaps/2)
	- 폰 노이만 구조
- [책 : Grokking Simplicity 쏙쏙 들어오는 함수형 코딩](http://www.yes24.com/Product/Goods/108748841)
- [패스트캠퍼스 강의 : TypeScript를 활용한 함수형 프로그래밍 온보딩](https://fastcampus.co.kr/dev_online_fpwithts) - 김춘구, 김태희
- [베타 리액트 문서 : Reacting to Input with State](https://beta.reactjs.org/learn/reacting-to-input-with-state#how-declarative-ui-compares-to-imperative)
- [강연 Youtube : Rethinking reactivity](https://www.youtube.com/watch?v=AdNJ3fydeao) - 리치 해리스
- [Vue 문서 : Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)
