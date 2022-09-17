---
title: '테스트로 보는 DI - 함수와 변수 추출'
excerpt: '테스트를 통해 수 많은 의존성 주입 기법을 탐구합니다. 그 시작은 변수와 함수부터입니다....'
date: '2022-09-16T13:44:12.130Z'
author: 탐정토끼(Taehee Kim)
tag: '테스트, DI, 리팩토링'
---

[프런트엔드에서 의존성을 제어하는 법](https://twinstae.github.io/testing-with-dependency-injection/)에서는 의존성 주입이 필요한 이유만 다뤘는데도 너무 길어졌습니다. 지난 글에서 언급한 것처럼, 의존성 주입은 거창한 의존성 주입 도구를 통해서만 가능한 것도 아니며, 객체지향에서만 필요한 방법론도 아닙니다.

이제부터는 실전으로 들어가서. 여러 의존성 주입 기법을 하나씩 살펴보고, 설계에 어떤 영향을 주는지 관찰해보겠습니다.

그 첫 번째 주인공은 `변수 variable`와 `함수 function`입니다.

## 요약

> 하드코딩된 코드는 결합된 코드의 범위를 늘리고, 같이 변하는 것들을 따로따로 바꿔야해서 귀찮아 집니다.
>
> 이런 때 의존성 주입을 통해서, 간접적인 인터페이스에 의존하도록 분리해내면 좋습니다.
>
> 변수나 함수를 추출하는 리팩토링은 단순하고 되돌리기도 쉬운 의존성 주입 기법입니다.
>
> 도메인, 시스템, 사용자를 생각하면서 의미 있고 같이 변하는 단위를 식별해야 합니다.
>
> 발견한 중복을 적절한 스코프의 상수 혹은 변수로 추출합니다.
>
> 동적으로 다른 값을 주입 받고 싶거나, 매번 새로 부수효과를 일으켜야 한다면 함수나 프로시저로 추출합니다.
>
> 함수는 비슷한 로직을 의존하는 입력만 다르게 주입해주면, 풍부하게 활용할 수 있습니다.
>
> 상황이 변하더라도 함수에 매개변수를 늘리고, 부분적용을 통해 원하는 만큼 구체화된 함수를 만들어낼 수 있습니다.

이 요약이 이해가 안 가신다면 글을 계속 읽으시면 됩니다. 다 읽고 다시 와서 읽어보세요. ;)

## 하드코딩된 코드는 변경에 취약합니다

의존성 주입에 반대가 있다면, 하드코딩된 코드일 것입니다. 이런 코드는 구현체를 갈아 끼우기 어렵고. 테스트 뿐만 아니라 변경할 때마다 눈물을 흘리게 합니다.

다음은 제가 지금 작업 중인 역량 배지의 테스트를 가지고 만들어 본, 하드코딩된 테스트의 예시입니다. `TagsInput`은 여러 태그를 입력할 수 있는 컴포넌트인데, [zagjs](https://zagjs.com/components/react/tags-input)를 기반으로 커스텀을 했습니다.

두 테스트 사이에는 중복이 있으니 찾아보시죠.

```tsx
// TagsInput.test.tsx
it('add and delete', async () => {
  render(
    <TagsInput
      className="mb-2"
      labelText="역량"
      name="skills"
      placeholder="ex) react"
      errors={undefined}
      maxLength={2}
      candidates={['react', 'redux', 'rescript', 'svelte', 'vue']}
    />,
  );
  // 역량이라는 라벨에 연결된 input을 찾아옵니다.
  const $addInput = screen.getByLabelText('역량');

  // react라는 값을 입력합니다.
  await userEvent.type($addInput, '{enter}react{enter}');

  // react tag가 추가되면서, 삭제하는 버튼도 가져올 수 있게 됩니다.
  const $reactDeleteTag = screen.getByRole('button', {
    name: 'react 태그를 삭제',
  });

  // 삭제 버튼을 클릭하면
  await userEvent.click($reactDeleteTag);

  // 그러면 버튼을 document 안에서 찾을 수 없게 됩니다.
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

it('후보에 없는 값은 추가 되지 않는다', async () => {
  render(
    <TagsInput
      className="mb-2"
      labelText="역량"
      name="skills"
      placeholder="ex) react"
      errors={undefined}
      maxLength={2}
      candidates={['react', 'redux', 'rescript', 'svelte', 'vue']}
    />,
  );
  const $addInput = screen.getByLabelText('역량');

  await userEvent.type($addInput, '{enter}not-in-candidate{enter}');

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
```

맞습니다. `TagsInput` 컴포넌트를 `render` 하는 부분이 완전히 똑같습니다.

복사 붙여넣기는 처음에는 나쁘지 않게 보입니다. 성급한 추상화는 나쁘지 않다고도 하고, test는 촉촉하고 명확한 게 좋다고도 하지 않습니까?

하지만 역할을 생각하면, 이건 좋은 중복이 아닙니다.

이 두 코드는 props 값에 따라 컴포넌트가 어떻게 변하는지 테스트하고 싶은 게 아닙니다. 처음에는 완전히 동일한 props로 렌더링하는데, 사용자가 다른 값을 입력했을 때, 동작이 어떻게 달라지는지를 테스트하고 있습니다.

그러면 앞의 두 `render`는 오히려 두 테스트에서 같아야 하는 부분입니다. 중복된 하드코딩은 `TagsInput`에 직접 의존하며 결합도를 늘리고, 변경할 때마다 중복된 노력이 들게 합니다.

예를 들어 component의 props가 달라진다면... 같이 변해야 할 겁니다. 역량 배지의 상황에 맞게 세세한 옵션을 추가하다보니, props가 늘어날 것은 당연한 이야기입니다.

`TagsInput`이 기존에 서버에 있던 데이터를 수정한다면, 초기 값으로 서버에서 가져온 원래 데이터를 넣어주고 싶을 수 있습니다. 그래서 `initValue`라는 prop을 추가해줍니다.

<div class="hl-lines-6 hl-lines-12"></div>

```tsx
// TagsInput.tsx
export default function TagsInput<S>({
	name,
	labelText,
	errors,
	initValue = [],
	// ... 생략
}: {
	name: string;
	labelText: string;
	errors: FieldErrors<S> | undefined;
	initValue?: string[];
  // ... 이하 생략
}){
  // ... 이하 생략
}
```

테스트는 테스트 대상인 `TagsInput` 컴포넌트에 의존합니다. 의존 대상이 바뀌었으니, 테스트도 바꿔줘야 합니다. 의존성을 그려보면 다음과 같습니다.

{{mmd}}
graph BT
    a(test: add and delete) --> TagsInput
    b(test: 후보에 없는 값은 추가 되지 않는다) --> TagsInput
{{/mmd}}

테스트부터 바꾸면 더 tdd스럽다고 생각하실지도 모르겠습니다. 하지만 저는 타입스크립트를 쓰고 있고, type 정의를 바꾸는 것도 테스트와 비슷합니다. 바뀐 type 인터페이스에 따라 테스트에서 에러가 납니다. type이 테스트를 테스트하고 있는 셈이죠.

보면 `TagsInput`을 `render`하는 부분에서 에러가 납니다. 고쳐줄까요?

<div class="hl-lines-11"></div>

```tsx
// TagsInput.test.tsx
it('add and delete', async () => {
  render(
    <TagsInput
      className="mb-2"
      labelText="역량"
      name="skills"
      placeholder="ex) react"
      errors={undefined}
      maxLength={2}
      initValue={[]}
      candidates={['react', 'redux', 'rescript', 'svelte', 'vue']}
    />,
  );
  // ... 이하 생략
})
```

문제는 여기서부터입니다. 테스트가 하나 더 있으니 똑같은 수정을 한 번 더 해줘야 합니다. 만약 테스트가 2개, 3개... 점점 늘어난다면 어떨까요? 역량 배지에는 TagsInput 컴포넌트 하나를 테스트하는 코드만 현재 6개나 있습니다.

테스트도 코드이며, 유지보수하기 쉽게 의존성을 관리해야 합니다. 코드를 한 두 변경할 때마다 테스트를 6~12줄 씩 고쳐야 한다면, 테스트를 짜고 싶어 하는 사람은 많지 않을 겁니다.

대안이 있을까요? 생각보다 쉽지요. 바로 변수나 함수로 추출(extract)하는 겁니다.

## 변수로 추출하기

저는 마틴 파울러가 쓴 [리팩토링]이라는 책에서 변수 추출이라는 용어를 배웠습니다. 변수 추출은 너무 흔해서 IDE들은 물론 vs code나 vim 같은 에디터에서도 [LSP](https://zetawiki.com/wiki/%EC%96%B8%EC%96%B4_%EC%84%9C%EB%B2%84_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)를 통해 기능으로 지원해주기도 합니다.

변수 추출은 간단합니다. 중복된 부분을 변수로 빼서 재사용하면 되지요.

```tsx
const emptyTagsInputElement = (
  <TagsInput
    className="mb-2"
    labelText="역량"
    name="skills"
    placeholder="ex) react"
    errors={undefined}
    maxLength={2}
    initValue={[]}
    candidates={['react', 'redux', 'rescript', 'svelte', 'vue']}
  />,
);
```

이제 이 `emptyTagsInputElement`를 테스트에 사용합니다. test들은 TagsInput에 직접 의존하지 않고, `emptyTagsInputElement`에 간접 의존하게 됩니다.

```tsx
it('add and delete', async () => {
  render(emptyTagsInputElement);
  // ... 이하 생략
})
it('후보에 없는 값은 추가 되지 않는다', async () => {
  render(emptyTagsInputElement);
  // ... 이하 생략
})
```

이제 `TagsInput`의 interface가 변경되더라도 `emptyTagsInputElement`만 변경해주면 됩니다.

단순히 재사용을 편하게 하기 위해 변수를 추출한 게 아닙니다. 관찰하면서 같이 변하는, 즉 역할이 같은 부분을 추출한 것이죠. 덕분에 결합도를 낮추고 유연해질 수 있었습니다.

의존성을 다시 그려보면 다음과 같습니다.

{{mmd}}
graph BT
    a(test: add and delete) --> emptyTagsInputElement
    b(test: 후보에 없는 값은 추가 되지 않는다) --> emptyTagsInputElement
    emptyTagsInputElement --> TagsInput
{{/mmd}}

## 상수의 한계. 성급한 추상화인가?

이제 새로운 테스트를 더 추가해보겠습니다. `TagsInput`에는 개수 제한이 있습니다. 최대 개수인 2개에 도달하면, 더 이상 input이 보이지 않도록 하고 싶습니다.

문제는 이를 테스트하기 위해서는 2개의 tag를 미리 추가해줘야 한다는 겁니다. 다음처럼 할 수 있습니다.

```tsx
it('2개 제한을 넘으면 input이 보이지 않는다', async () => {
  // 빈 TagsInput을 렌더합니다.
  render(emptyTagsInputElement);
  const $addInput = screen.getByLabelText('역량');
  // rescript 태그를 추가합니다.
  await userEvent.type($addInput, 'rescript{enter}');
  // svelte 태그를 추가합니다.
  await userEvent.type($addInput, 'svelte{enter}');

  // 더 이상 역량 라벨에 연결된 input이 document에 존재하지 않습니다.
  expect(screen.queryByLabelText('역량')).not.toBeInTheDocument();
});
```

현실적인 시나리오이긴 하지만, 테스트 사이에 결합도가 높아졌습니다. 예를 들어 태그를 추가하는 기능이 망가졌지만, 최대 개수에 도달했을 때 input이 보이지 않도록 하는 기능은 잘 동작한다 해봅시다.

하지만 방금 만든 테스트 코드는 실패하게 됩니다. 왜냐면 태그를 추가하는 기능에도 의존하고 있기 때문입니다. 태그를 추가할 수 없으니, input은 사라지지 않고 테스트는 실패합니다. input의 최대 개수를 제한하는 기능은 멀쩡한데 말이죠!

잘 돌아가는데에도 문제가 있다고 거짓 경보가 울리는 현상. false positive한 테스트가 되버린 겁니다.

그러면 어떻게 해야할까요? 아까 저희는 `initValue`라는 prop을 만들었습니다. 이를 이용하면 초기 값을 지정해줄 수 있으니, 처음부터 두 개의 태그를 주입하고 시작하면 됩니다.

앗. 그런데 그러면 저희가 아까 만들었던 `emptyTagsInputElement` 상수는 사용할 수 없습니다. 약간 다른 두 번째 상수 `doubleTagsInputElement`를 만듭니다.

<div class="hl-lines-9"></div>

```tsx
const doubleTagsInputElement = (
  <TagsInput
    className="mb-2"
    labelText="역량"
    name="skills"
    placeholder="ex) react"
    errors={undefined}
    maxLength={2}
    initValue={['rescript', 'svelte']}
    candidates={['react', 'redux', 'rescript', 'svelte', 'vue']}
  />,
);
```

이를 이용해서 테스트를 고치면 다음처럼 깔끔해집니다. tag를 추가하는 기능에도 의존하지 않기 때문에, 역할이 잘 분리된 좋은 테스트가 되었습니다.

```tsx
it('2개 제한을 넘으면 input이 보이지 않는다', async () => {
  // 태그가 2개인 TagsInput을 렌더합니다.
  render(doubleTagsInputElement);

  // 더 이상 역량 라벨에 연결된 input이 document에 존재하지 않습니다.
  expect(screen.queryByLabelText('역량')).not.toBeInTheDocument();
});
```

흠... 이러면 `initValue` prop에 무엇이 들어가는지에 따라서 새로운 변수를 매번 만들어줘야 합니다. 이런 낭패입니다. 복잡해지는 것도 문제지만, 앞서 이야기한 것처럼 `TagsInput`의 인터페이스가 변할 때마다 수 많은 변수들을 모두 업데이트해줘야 합니다. 변수를 추출하는 건 성급한 추상화였던 게 아닐까요?

현재 의존성 구조를 그려보면 다음과 같이 복잡해졌습니다.

{{mmd}}
graph BT
    a(test: add and delete) --> emptyTagsInputElement
    b(test: 후보에 없는 값은 추가 되지 않는다) --> emptyTagsInputElement
    emptyTagsInputElement --> TagsInput
    c(text: 2개 제한을 넘으면 input이 보이지 않는다) --> doubleTagsInputElement
    doubleTagsInputElement --> TagsInput
{{/mmd}}

괜찮습니다. 변수 추출은 간단하기 때문에, 되돌리는 데에도 큰 비용이 들지 않습니다. 이제 함수를 만날 시간입니다.

## 함수에 동적으로 매개변수를 주입하자

함수는 동적으로 매개변수를 주입해서, 매번 새로운 표현식을 만들어 낼 수 있습니다.

저는 함수를 추출할 때 먼저 중복되는 부분과, 달라지는 부분을 파악합니다. 그리고 달라지는 값을 매개변수로 주입하면 됩니다.

위에서 본 두 개의 변수를 관찰해보면, `initValue`를 제외하고 모두 똑같다는 걸 알 수 있습니다. 사실 관찰할 필요도 없었습니다. 저희는 복사 붙여넣기 하고 `initValue`를 바꿔준 것 빼고는 한 게 없으니까요!

`initValue`를 매개변수로 바꿔서 함수로 만들면 다음과 같이 하면 됩니다.

<div class="hl-lines-9"></div>

```tsx
const tagsInputWithValue = (initValue: string[]) => (
  <TagsInput
    className="mb-2"
    labelText="역량"
    name="skills"
    placeholder="ex) react"
    errors={undefined}
    maxLength={2}
    initValue={initValue}
    candidates={['react', 'redux', 'rescript', 'svelte', 'vue']}
  />
);
```

이제 다음처럼 하나의 함수로 다양한 test를 유연하게 처리할 수 있습니다.

<div class="hl-lines-2 hl-lines-6 hl-lines-10"></div>

```tsx
it('add and delete', async () => {
  render(tagsInputWithValue([]));
  // ... 이하 생략
})
it('후보에 없는 값은 추가 되지 않는다', async () => {
  render(tagsInputWithValue([]));
  // ... 이하 생략
})
it('2개 제한을 넘으면 input이 보이지 않는다', async () => {
  render(tagsInputWithValue(['rescript', 'svelte']));
  // ... 이하 생략
});
```

의존 관계도 개선됩니다. 3가지 테스트는 하나의 `tagsInputWithValue`에만 의존합니다. `tagsInputWithValue`는 좁고 단순한 인터페이스로 `TagsInput`에 필요한 여러 props에 적절한 default 값을 넣어줍니다.

이를 함수형 프로그래밍에서는 부분 적용, 영어로는 파셜 어플리케이션(partial application)이라고 합니다. 함수에 여러 매개변수가 있을 때 일부 변수만 미리 넣어서, 더 적은 매개변수만 필요로 하는 함수로 만들어주는 것이죠.

의존 관계를 그려보면 다음과 같습니다.

{{mmd}}
graph BT
    a(test: add and delete) --> tagsInputWithValue
    b(test: 후보에 없는 값은 추가 되지 않는다) --> tagsInputWithValue
    c(text: 2개 제한을 넘으면 input이 보이지 않는다) --> tagsInputWithValue
    tagsInputWithValue --> TagsInput
{{/mmd}}

## 좁은 인터페이스, 넓은 인터페이스
그러면 변수나 함수를 추출하면서 무엇이 변한 걸까요? 두루뭉술한 느낌을 명확한 말로 옮겨봅시다.

바로 넓은 public 인터페이스로 세부 구현을 노출하는 대신, 딱 필요한 initValue의 인터페이스만 노출하고 나머지는 private으로 감추었다는 것입니다.

여기서 흔히 객체지향 만의 전유물이라 오해되는 **public/private**, **인터페이스와 구현(implementation)**, **캡슐화(encapsulation)** 를 함수적으로 이해할 수 있습니다.

인터페이스는 두 시스템이 만나는 경계를 뜻합니다. 여기서는 `TagsInput`이라는 컴포넌트와, 이에 의존하는 test들이 만나고 있습니다.

{{mmd}}
graph LR
    tagsInputWithValue --> |props|TagsInput;
{{/mmd}}

`TagsInput` 컴포넌트는 많은 props를 주입할 수 있게 공개하고 있습니다. `label`이나 `name`, `initValue`등을 원하는 값으로 주입할 수 있죠.

이렇게 밖에서 제어할 수 있거나, 메세지를 보낼 수 있게 외부에 공개한 부분을 보통 public interface라 합니다. 함수의 public 인터페이스는? 파라미터와 반환하는 값의 타입. 즉 함수의 타입(type)입니다.

하지만 인터페이스가 넓을 수록, 사용하기는 불편하고 신경 쓸 게 많아집니다. 잘못 사용하기도 쉽고요. 너무 많은 부분에 의존하기 때문에, 앞서 보신 것처럼 인터페이스 변경에도 취약해집니다.

이는 인터페이스 사용자와, 제공자에게 모두 제약입니다. 사용자는 제공자가 인터페이스를 바꾸고 파괴적 변경을 하면 어떻게 하나 걱정하게 되고요. 인터페이스를 제공하는 쪽에서도 섣불리 인터페이스를 변경할 수 없게 됩니다.

그래서 딱 필요한 부분에만 의존하고, 공개하는 게 좋습니다. 그러면 사용하는 쪽에서도 쉽게 의존성을 사용할 수 있고, 제공하는 쪽에서도 내부 구현을 고칠 수 있으니까요.

{{mmd}}
graph LR
    test들 --> |initValue|tagsInputWithValue;
    tagsInputWithValue --> |props|TagsInput;
{{/mmd}}

예시로 돌아가면 `tagsInputWithValue`는 initValue라는 단 하나의 파라미터만 공개하고 있습니다. labelText나 name을 비롯한 여러 값들은 적절한 디폴트 값을 주입해주고 있죠. 이는 private으로 감추고, 캡슐화한 구현 상세입니다.

매개변수 하나만 지정해주면 되기 때문에 사용하기 편리합니다. `TagsInput`에 새로운 props가 추가되거나, 삭제되거나, 이름이 바뀌더라도 `tagsInputWithValue`만 수정해주면 되고요. 기존의 test들은 똑같은 인터페이스를 사용할 수 있습니다.

물론 제어할 수 있는 부분이 전혀 없어도 문제입니다.

{{mmd}}
graph LR
    test들 --> emptyTagsInputElement;
    test들 --> doubleTagsInputElement;
    doubleTagsInputElement --> |props|TagsInput;
    emptyTagsInputElement --> |props|TagsInput;
{{/mmd}}

앞에서 변수로 추출했던 `emptyTagsInputElement`는 값이 없는 `TagsInput` element일 뿐이었습니다. 거의 모든 게 private인 셈입니다. 제어할 수 있는 부분이 전혀 없기 때문에, 다양한 테스트에서 활용할 수 없었지요.

이렇듯 넓은 인터페이스와 좁은 인터페이스라는 양극단 사이에서 균형을 잘 잡아야 합니다. 늘 그렇듯이 잘 관찰하고, 예측하고 결정을 내리시길 바랍니다.

## 오해 바로잡기. 매개변수가 많다고 넓은 인터페이스는 아니다.

여기서 오해를 하나 짚고 넘어가자면. 매개변수가 많다고 무조건 넓은 인터페이스인 것은 아닙니다. 때로는 하나의 수퍼 메서드보다, 여러 개의 구체적인 메서드를 노출하는 게 더 안전한 경우도 많아요.

흔한 예를 들자면 `setter`야 말로 너무 넓고, 위험한 인터페이스의 예시라고 할 수 있습니다. 프런트엔드에서는 `setState`를 이리저리 내려주며 공유하거나, `=` 으로 ref나 reactive 등에 직접 값을 할당하는 경우가 있겠습니다.

왜냐하면 setter는 상태가 어떤 형태이며, 어떻게 업데이트할지를 매번 정해줘야 하기 때문입니다. 그래서 `setter`는 안티패턴이라 하는 분도 있습니다. "`set`을 외부에 공개하지 말아라!"하고 말이죠.

예를 들어 todoList를 만든다면 setter는 다음과 같이 구현이 곳곳에 흩어지게 됩니다. 제가 일부러 에러도 심어놓았는데, 한 번 찾아보시죠. ;)

```tsx
function TodoList(){
  [todoList, setTodoList] = useState<TodoT[]>([]);
  return (
    <ul>
      {todoList.map(todo => (
        <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo}
              aria-label={`할일 ${todo.content} 완료하기`}
              onClick={() => {
                setTodoList(old => old.map(item => item.id === todo.id ? { ...item, checked: !item.checked } : todo ))
              }}
            />
            {todo.content}
            <button onClick={() => {
              setTodoList(old => old.filter(item => item.id !== todo.id))
            }}>
              삭제
            </button>
        </li>
      ))}
    </ul>
  );
}
```

이런 경우에는 좁은 함수들을 만들어서, ui에서는 만들어진 함수를 사용하기만 하면 좋습니다. 예를 들어 다음처럼 `completeTodo`와 `deleteTodo`를 만들면, 각각 `id`에만 의존하니, 더 좁은 인터페이스가 됩니다. 에러도 같이 고쳤으니 비교하며 디버깅 연습을 해보셔도 좋겠습니다.

```tsx
function TodoList(){
  [todoList, setTodoList] = useState([]);

  function completeTodo(targetId: TodoT['id']){
    setTodoList(old => old.map(item => item.id === targetId ? { ...item, checked: !item.checked } : item ));
  }

  function deleteTodo(targetId: TodoT['id']){
    setTodoList(old => old.filter(item => item.id !== targetId))
  }

  return (
    <ul>
      {todoList.map(todo => (
        <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo}
              aria-label={`할일 ${todo.content} 완료하기`}
              onClick={() => {completeTodo(todo.id)}}
            />
            {todo.content}
            <button onClick={() => { deleteTodo(todo.id) }}>
              삭제
            </button>
        </li>
      ))}
    </ul>
  );
}
```

물론 이러면 코드가 더 복잡해지지만, 이득도 큽니다. ui가 `useState` api에 직접 의존하지 않기 때문에, 다른 api를 쓰는 라이브러리도 쉽게 적용할 수 있지요.

예를 들어 위의 코드를 redux를 사용하게 바꾸더라도, return해주는 ui는 전혀 변경하지 않아도 됩니다. 어떤 분은 여기서 커스텀 훅을 추출했으면 더 좋지 않았을까 생각하실지도 모르겠어요. ;)
```tsx
function TodoList(){
  const todoList = useSelector(state => state.todoList);
  const dispatch = useDispatch()

  function completeTodo(targetId: TodoT['id']){
    dispatch(completeTodoAction({ targetId }))
  }

  function deleteTodo(targetId: TodoT['id']){
    dispatch(deleteTodoAction({ targetId }))
  }

  return (
    // ... 그대로
  )
}
```


## 개념은 하나, 적용은 무궁무진

이런 예시를 통해 어떤 추상적인 개념을 설명할 때면 늘 걱정이 됩니다. 왜냐하면 추상적인 개념을 한 두 가지 예시로 설명하면, 응용하지 못하시는 경우가 많거든요.

저는 변수와 함수 추출을 밥 먹듯이 씁니다. 만약에 같이 변해야 하는 걸 복사 붙여넣기를 하고 있다면, 보통 추출해야 한다는 징조인 경우가 많습니다. 이는 테스트 뿐만이 아니고, 온갖 상황에서 그렇습니다.

여러분도 프로젝트에서 변수나 함수를 추출할 수 있는 경우를 잘 찾아보시면 좋겠습니다.

예를 들어 저는 의존성 주입 도구가 없는 프레임워크로 디비나 파일 같은 의존성을 사용할 때, 인터페이스를 정의하고 repository 구현체를 만들어서 위에 변수로 alias를 만들어서 빼놓습니다. 다음처럼요.

```ts
import fsRepository from './fsRepository';
const repository: ITodoRepository = fsRepository;

// ... 생략

server.get('/todo-list', opts, async (request, reply) => {
  const todoList = await repository.getAll();

  reply.status(200);
  return { todoList }
});
```

너무 단순해서, 이게 어떤 의미가 있나 싶으실 겁니다. 하지만 여러모로 장점이 많습니다. 나중에 테스트를 위해 `fakeRepository`를 쓰고 싶다면, `repository`에 `fakeRepository`를 할당해주면 됩니다. 프로덕션에서 `fsRepository`를 `typeOrmRepository`로 바꾸고 싶다고 해도 마찬가지입니다.

`repository` 변수를 사용하는 라우터들은 이게 어떤 repository 구현체를 쓰는지 알지 못하고 `ITodoRepository` 인터페이스에 정의된 메서드만 사용하기 때문에, 자연스럽게 특정 repository 구현체와 결합되는 걸 피할 수도 있습니다.

이렇듯 중간에 변수나 함수 하나를 만드는 것은. 거창한 의존성 주입 프레임워크나 수 많은 파일들 없이도, 쉽게 코드 간의 결합을 낮출 수 있는 방법입니다. 여러분의 코드로 돌아가서 적용할 수 있는 부분을 찾아보시길 바라요.

> 여담이지만 변수와 함수 추출은 프런트와 백엔드 뿐만 아니라, 웹이 없던 시절부터 내려오는 기법입니다. 궁금하신 분들은 변수와 함수라는 개념이 처음 만들어진 역사를 살펴보시면 재미있겠습니다.

## 언제든지 돌아갈 수 있다

이런 클린한 아키텍처 어쩌구를 들으면, 진절머리가 나시는 분들도 있습니다. 좋다는 아키텍처를 따라해보려다가 괜히 복잡해지기만 했다면서 말이죠. 성급한 추상화를 했다가, 같이 변경되는 역할이나 범위를 잘못 파악해서 결국 다 뜯어고치는 경우도 있습니다.

변수와 함수 추출의 큰 장점은, 되돌리기 쉽다는 것입니다. 마틴 파울러는 [리팩토링] 책에서 추출 말고도 '인라인' 리팩토링을 소개하고 있습니다. 추출이 여러 중복되는 값을 하나의 변수나 함수로 추출하는 것이라면. 인라인은 거꾸로 하나의 변수나 함수를 사용하는 곳에 구체적인 값으로 되돌리는 겁니다. 

앞으로도 여러 방법들을 소개해드리고 비교해볼텐데요. 안전하면서도 빠르게 분리해내고, 다시 되돌릴 수 있다면. 더 자신 있게 리팩토링 할 수 있습니다. 추출하고 인라인하는 연습을 해보세요. 에디터의 단축키나 replace, 자동 리팩토링 기능을 배워두시면 좋습니다.

테스트가 있으면, 구현을 바꿀 수 있듯이. 테스트를 리팩토링하는 것도 마찬가지입니다. 구현을 바꾸지 않았는데, 테스트가 실패한다면? 리팩토링을 잘못한 것이겠죠. 비슷하게 구현을 망가트렸는데, 테스트가 통과해버린다면? 이 역시 테스트를 망가트렸다는 신호입니다. 테스트나 구현이나 인간이 만든 것이니, 상호 검증을 해주시면서 내가 정확하게 리팩토링을 하고 있는지 피드백을 받아보시길 바랍니다.

## 다음 회 예고... prop 내리기와 의존성 주입의 고통

변수와 함수 추출은 단순하지만, 한계도 분명합니다. 예를 들어 scope에 따른 namespace 충돌 같은 문제라던가요. 의존성을 주입하는 이유와 방법은, 제 머릿 속에만 10가지가 넘습니다. 앞으로 그런 방법들을 하나씩 다뤄가려 합니다.

다음에는 `module`이나 `context`를 다뤄보려 합니다.

import/export나 파일 분리/계층 구조와 같은 모듈화는 흔한 의존성 주입의 방법입니다. 어떻게 보면 mock이나 fake 같은 기법도 그러하며, 번들러를 비롯한 여러 도구는 alias를 비롯해 여러 신기한 기능도 제공합니다. 역사가 긴 만큼 많은 문제를 해결해온 기법이기도 합니다. 저희가 모듈이나 패키지를 의존성Dependency라고 부르는 이유이기도 하고요.

또한 여러 웹 프레임워크는 `context` / `provider` / `inject` 와 같은 개념을 가지고 있기도 한데요. `context`라는 말을 들을 때마다 이게 무엇인지 궁금하셨을 분도 있을 것 같습니다. 여러 프레임워크의 `context`를 비교해보면서, 그 용도와 장단점을 다뤄보겠습니다. 물론 테스트와 함께요.

여기까지 읽어주셔서 감사합니다. 언제가 될지 약속은 못하겠지만, 또 돌아올게요. 다음에 뵙겠습니다.