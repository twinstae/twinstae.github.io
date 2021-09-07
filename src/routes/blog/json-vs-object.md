---
title: '자바스크립트 JSON vs 객체 무엇이 다른가요?'
excerpt: '한 줄 요약 : JSON, 즉 Java Script Object Notation(자바스크립트 객체 표기법)은 js 객체를 문자열로 쓰는 방법입니다.'
date: '2021-09-07T11:28:48.765170'
author: 탐정토끼(Taehee Kim)
tag: '자바스크립트, 객체, JSON, 문자열'
---

한 줄 요약 : JSON, 즉 Java Script Object Notation(자바스크립트 객체 표기법)은 js 객체를 문자열로 쓰는 방법입니다.

> 하지만 도대체 json하고 객체하고 넘 비슷하게생겻는데 모가다르단거에요 ㅡㅡ........책보다보면 나오겟지..

트위터에서 이런 고민을 하는 트친님을 봤습니다. 그래서 json이 뭔지 좀 적어볼게요.

json은 문자열입니다. 글자죠. 제가 종이에 json을 적을 수도 있습니다. 그래서 따옴표( ' )로 감싸놓습니다. 문자열을 감싸는 따옴표와 문자열 안에 있는 따옴표를 구분하기 위해서 \ 역슬래시를 이용해서 escape(빠져나가기, 무시) 처리를 해줍니다. 한국 키보드에서는 엔터 위에 원(화폐단위) 문자로 보이기도 해요.

이런 문자열은 HTTP 네트워크를 타고 서버나 다른 기기와 데이터를 주고 받을 때에도 쓰이고요. 텍스트 파일로 데이터를 저장할 때도 씁니다. 제가 만든 프메 백업 뷰어도 데이터를 JSON으로 저장하고 있어요.

다음 코드는 브라우저에서 F12를 누르시면 나오는 개발자 도구 Console 탭에서 직접 쳐보실 수 있어요.
```javascript
const sakuMailJson1 = "{\"name\":\"미야와키 사쿠라\",\"message\":\"안녕하세요. \\\\(^ ^\"}";

sakuMailJson
// "{\"name\":\"미야와키 사쿠라\",\"message\":\"안녕하세요. \\\\(^ ^\"}" 가 출력됩니다.
```

객체(object)는 코드가 아니라 그 코드를 가지고 메모리에 올라간 자료구조에요. 이 객체에서는 key를 가지고 이런저런 값을 꺼낼 수 있죠. 다른 언어에서는 보통 HashMap이나 Dictionary 같은 자료구조로 표현합니다. 보통 따옴표 없이 리터럴로 쓸 수 있지만, 빈 객체에 값을 하나씩 넣어서 만들 수도 있습니다.

```javascript
const sakuMailLiteral = {
  name: "미야와키 사쿠라",
  message: "안녕하세요. \\(^ ^"
}

sakuMailLiteral
// {name: "미야와키 사쿠라", message: "안녕하세요. \(^ ^"} 가 출력됩니다. 따옴표가 없죠?

const sakuMailFromEmpty = {}; // 처음에는 비어 있습니다.
sakuMailFromEmpty.name = "미야와키 사쿠라"  // 값을 넣어줍니다.
sakuMailFromEmpty.message ="안녕하세요. \\(^ ^"

sakuMailFromEmpty
// {name: "미야와키 사쿠라", message: "안녕하세요. \(^ ^"} 가 출력됩니다. 객체를 만들었어요.
```

보통 API 서버에서 값을 가져오면 JSON 문자열입니다. 이걸 JSON.parse에 넣으면 해석해서 객체로 만들어줍니다. 반대로 JSON.stringify 에 객체를 넣으면 문자열로 직렬화해줍니다. 통신선이나 전파를 타고 이동하려면 문자열처럼 직렬화되어 있어야하거든요.

```javascript
const sakuMailJson2 = "{\"name\":\"미야와키 사쿠라\",\"message\":\"안녕하세요. \\\\(^ ^\"}";

const sakuMailObject = JSON.parse(sakuMailJson2);
sakuMailObject
//{name: "미야와키 사쿠라", message: "안녕하세요. \(^ ^"}

const sakuMailJson3 = JSON.stringify(sakuMailObject);
sakuMailJson3
// "{\"name\":\"미야와키 사쿠라\",\"message\":\"안녕하세요. \\\\(^ ^\"}
```

요즘 대부분의 언어에서는 JSON을 다룰 수 있는 모듈이나 라이브러리를 제공합니다. JS는 웹 브라우저의 표준 언어고, 왠만한 언어는 모두 서버를 만드니까요. 예를 들어 파이썬에는 json.dumps와 json.loads 가 있고요. 객체보다는 dict (사전) 자료구조를 이용합니다. Java Spring에서는 보통 DTO라는 클래스로 객체를 만들어 넣지만, key-value를 저장하는 HashMap을 선호하는 분도 간혹 있습니다.

옛날 사람들은 XML을 썼는데요. (그래서 Ajax 라는 말의 x가 xml이라는 뜻입니다) XML은 읽기 어렵고 불편했기 때문에, 점점 JSON이 득세하기 시작했습니다. 하지만 요즘은 또 json이 마음에 안 들었던 구글이 프로토콜버퍼(protobuf)라는 직렬화 방법을 직접 만들어서 gRPC(원격 프로시저 호출)같은 곳에 사용하고 있기도 합니다. gRPC는 [뱅크샐러드](https://blog.banksalad.com/tech/production-ready-grpc-in-golang/)를 비롯해 여러 회사들이 쓰고 있어요.

'직렬화'라는 말이 나왔죠? 어떤 자료구조를 줄줄이 한 줄로 이어지는 문자열이나 바이트 스트림으로 만들면 직렬화 한다고고 합니다. 0010111000111 같은 데이터 말이죠. 이런 걸 그래서 '선형적'이라고도 해요. 일직선이니까요.

잠깐, json도 줄이 바뀌는 걸 보신 적이 있을텐데요. 줄이 바뀐 것처럼 보여도 사실 \n 줄바꿈 문자가 저장된 걸 해석해서 보여줄 뿐입니다. 자료구조는 메모리 곳곳에 파편화된 걸, 참조를 통해서 연결해놓는 경우가 많아요. 이런 게 비선형적인 데이터인데요. 네트워크 통신선이나 전파를 타고 데이터를 전송하려면 데이터가 하나씩 직렬화된 상태로 만들어야합니다.


이쯤이면 당장 필요한 지식은 충분합니다. 하지만 JSON을 쓰다보면 여러 문제를 마주치실 거에요. 내가 쓰는 언어의 JSON 모듈 문서를 찾아보시는 것도 좋은 방법입니다.

[MDN : JavaScript와 JSON의 차이](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON)

[ECMA-404 The JSON Data Interchange Standard](https://www.json.org/json-ko.html)

[파이썬 : json — JSON 인코더와 디코더](https://docs.python.org/ko/3/library/json.html)

더 궁금하신 게 있으시면 댓글로 달아주세요.
