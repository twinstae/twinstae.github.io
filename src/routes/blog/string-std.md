---
title: '문자열 String std 파고들기'
excerpt: '문자열은 대충 생각하면 문자의 배열이지만, 실제로는 더 복잡합니다. 문자열을 0101 이진수로 저장하는 방법. 유니코드, UTF-8와 같은 인코딩에 대해 알아봅니다.'
date: '2021-07-08T15:26:07.156Z'
author: 탐정토끼(Taehee Kim)
tag: '작성 중, std, 문자열, 표준 라이브러리'
---

std 시리즈에서는 서로 다른 언어들의 표준 라이브러리와 자료형, 문법을 비교해보고자합니다.

std는 standard 표준의 약자로, 보통 그 언어의 표준 라이브러리를 std라고 부릅니다. 언어마다 표준은 다르며, 각자 나름대로 그런 표준을 선택한 이유와 배경이 있습니다. 여기서는 다양한 언어들의 표준 라이브러리로 대표적인 작업을 처리하는 예시 코드를 보여드립니다. 직접 REPL 등에 하나씩 쳐보시면서 익혀보시면 더욱 좋겠죠.

하지만 코드만 봐서는 원리는 알기 어렵습니다. 문자열은 언어마다 어떻게 구현되어 있으며, 이게 어떤 쓸모가 있을까요? 기본적으로는 재미로 알아 보자는 거지만. 이런 지식이 도움이 되는 때도 있을 겁니다.

- [문자, 문자열, 한글 인코딩](/string-encoding/)
- [문자열은 왜 불변인가?](/string-immutable/)

## 프로그래밍 언어별 String 표준 라이브러리
### Java: char, Char, String
```java
String foo = "탐정토끼";
char f = '탐'; // 글자와 String을 구분한다.

String foo_copy = foo;
foo_copy += "입니다.";
System.out.println(foo);
// 탐정토끼  <- 원래 값은 불변
System.out.println(foo_copy);
// 탐정토끼입니다. 

// 길이
assertEqual(foo.length(), 4);

assertEqual(foo.charAt(0), '탐');
assertEqual(foo.substring(1), "정토끼");
assertEqual(foo.substring(1, 3), "정토"); // 마지막 인덱스 미포함
assertEqual(foo.substring(foo.length() - 2), "토끼"); // 마지막 2 글자

// 뒤집기
StringBuffer sb = new StringBuffer(str);
String reversedFoo = sb.reverse().toString();
System.out.println(reversedFoo);

// 바꾸기
assertEqual("2014/02/14".replaceAll("/", "-"), "2014-02-14");
// 쪼개기
for (String item: "2014/02/14".split("/")){
  System.out.println(item);
}
assertEqual("2014/02/14".split("/"), ["2014", "02", "14"]);

assertEqual(String.valueOf(24) + "시간이 모자라", "24시간이 모자라");
// "1" < "3" <- 비교 불가
// error: bad operand types for binary operator '<'

assertEqual("taehee" + " " + "kim", "taehee kim"); // 합치기
String[] arr = new String[] {"탐정", "토끼"};
assertEqual(String.join("", arr), "탐정토끼");

String html = """
  <html>
    <body>
      <p>Hello, world</p>
    </body>
  </html>
"""; // 자바15부터 가능

// 주어진 문자열을 포함하는지?
assertTrue(foo.contains("탐정"));

// 주어진 문자열로 시작하는지?
assertTrue("https://twinstae.github.io/".startswith("https"));
// 주어진 문자열로 끝나는지?
assertTrue("fiesta-izone.mp3".endswith(".mp3"));

String name = "kim";
// 비어있는지?
assertFalse(name.isBlank());

assertEqual(String.format("hello, %s", name), "hello, kim");

// 소문자로
assertEqual('TAEhee Kim'.toLowerCase(), "taehee kim") 
// 공백 자르기
assertEqual('    내용     \n   '.trim(), "내용")

// 메소드 체이닝
String raw_text = "    \n         TeST HeLLo WORld      \n \n \t   ";
String[] expected = new String[] {'test', 'hello', 'world'};
assertEqual(raw_text.trim().toLowerCase().split(" "), expected);
```

### Python: str
```python
foo = "탐정토끼" # 리터럴
assert type(foo) == type("탐") # 글자 하나의 타입도 str
# <class 'str'>

foo_copy = foo // 값을 복사
foo_copy += "입니다."
print(foo) 
// "탐정토끼" 원래 값은 불변
print(foo_copy)
// "탐정토끼입니다."

assert len(foo) == 4 # 문자열의 길이

# 문자열[start : end : step]
assert foo[0] == "탐"  # 문자 가져오기
assert foo[1:] == "정토끼" # 자르기. start 부터 끝까지
assert foo[1:3] == "정토"  # 마지막 인덱스는 미포함
assert foo[-2:] == "토끼"  # 마지막 2글자
assert "abcdefg"[::2] == "aceg" # step 2칸씩 

print(foo[::-1]) # 뒤집기
# "끼토정탐"

assert "2014/02/14".replace("/", "-") == "2014-02-14" # 바꾸기
assert "2014/02/14".split("/") == ["2014", "02", "14"] # 쪼개기

assert str(24) + "시간이 모자라" # int와 문자열 합치기
# "24시간이 모자라"
assert "1" < "3" # 비교 가능

assert "taehee" + " " + "kim" == "taehee kim" # 합치기
assert "".join(["탐정", "토끼"]) == "탐정토끼" # 이어붙이기

long_csv = """12, 3, "빨강"
13, 2, "파랑"
14, 1, "초록"
""" # 여러 줄 문자열
long_csv.split("\n") # 줄 단위로 자르기

assert "탐정" in foo == True # foo가 "탐정"을 포함하는지? 
# 주어진 문자열로 시작하는지?
assert "https://twinstae.github.io/".startswith("https") == True
# 주어진 문자열로 끝나는지?
assert "fiesta-izone.mp3".endswith(".mp3")


name: str = 'kim' # 타입힌트, ' 홑 따옴표도 상관 없다.

assert not name == False;   # 비어 있는지? PEP8 가이드 권장
# "name != ""               # 이렇게 할 수도 있긴 하다.

print('hello, %s' % name) # format
# 'hello, kim'
print(f'hello, {name}')   # interpolation
# 'hello, kim'

print('TAEhee Kim'.lower()) # 소문자로
# 'taehee kim'
'    내용     \n   '.strip()  # 공백 자르기
# '내용'

# 메소드 체이닝
raw_text = "    \n         TeST HeLLo WORld      \n \n \t   "
raw_text.strip().lower().split(" ")
# ['test', 'hello', 'world']

m = re.search('([1-6])학년 ([0-9]{1,2})단원', '2학년 3단원')
assert m.group(0) == '2학년 3단원'
assert m.group(1) == '2'
assert m.group(2) == '3'
```
### TypeScript: string
```typescript
const foo: string = "탐정토끼";
typeof foo == typeof "탐"; // 글자 하나도 string
// "string"

let foo_copy = foo;
foo_copy += "입니다.";
console.log(foo);
// "탐정토끼" 원래 값은 불변
console.log(foo_copy);
// "탐정토끼입니다." 새로운 값만 변함

foo.length == 4 // 길이

foo[0] == "탐"  // 가져오기
foo.slice(1) == "정토끼" // 자르기
foo.slice(1, 3) == "정토" // 마지막 인덱스 미포함
foo.slice(foo.length - 2) == "토끼" // 마지막 2글자

// 문자열 뒤집기
console.log([...foo].reverse().join());
// "끼토정탐"

"2014/02/14".replace(/\//g, "-") == "2014-02-14"; // 모두 바꾸기
"2014/02/14".split("/") // 쪼개기
// ["2014", "02", "14"]

24 + "시간이 모자라" // 자동 형변환
// "24시간이 모자라"
"1" < "3" // 비교 가능
// true

"taehee" + " " + "kim" == "taehee kim" // 합치기
["탐정", "토끼"].join("") == "탐정토끼" // 이어붙이기

const long_csv = `12, 3, "빨강"
13, 2, "파랑"
14, 1, "초록"` // 여러 줄 문자열
const lines = long_csv.split("\n") # 줄 단위로 자르기

foo.includes("탐정")  
// true  주어진 문자열을 포함하는지?

"https://twinstae.github.io/".startsWith("https")
// true  주어진 문자열로 시작하는지?

"fiesta-izone.mp3".endsWith(".mp3")
// 주어진 문자열로 끝나는지?

name: string = 'kim' // 명시적 타입

! name;   // 비어 있는지?
// false
name !== ""               // 이렇게 할 수도 있긴 하다.

`hello, ${name}`   // interpolation
// 'hello, kim'

'TAEhee Kim'.toLowerCase() // 소문자로
// 'taehee kim'
'    내용     \n   '.trim()  // 앞뒤 공백 자르기
// '내용'

// 메소드 체이닝
raw_text = "    \n         TeST HeLLo WORld      \n \n \t   "
raw_text.trim().toLowerCase().split(" ")
// ['test', 'hello', 'world']

m = '2학년 3단원'.match('([1-6])학년 ([0-9]{1,2})단원');
m[0] == '2학년 3단원';
m[1] == '2';
m[1] == '3';
const [라벨, 학년, 단원] = m; // 구조 분해 할당
라벨 // "2학년 3단원"
학년 // "2"
단원 // "3"
```

### Rust: str, std::String
```rust
let foo = "탐정토끼";
println!("{}", foo.chars().rev().collect::<String>());
```

### Clojure: java.lang.Character, java.lang.String
```clojure
(require '[clojure.string :as s])
(def foo "탐정토끼")

(count foo) ; 길이
; 4

(get foo 0) ; 문자 가져오기
; \탐
(subs foo 1) ; 자르기. start 부터 끝까지
;"정토끼"
(subs foo 1 3) ; 마지막 인덱스는 미포함
;"정토"
(subs foo (- (count foo) 2)) ; 마지막 2글자
;"토끼"

(print (s/reverse foo)) ; 뒤집기

(s/replace "2014/02/14" "/", "-") ; 바꾸기
; "2014-02-14"
(s/split "2014/02/14" #"/") ; 쪼개기 #은 정규표현식 표시
; ("2014" "02" "14")

(def long-csv "12, 3, \"빨강\"
13, 2, \"파랑\"
14, 1, \"초록\"
")
(s/split-lines long-csv)

(s/includes? foo "탐정") ; foo가 "탐정"을 포함하는지?
(s/startswith? "https://twinstae.github.io/" "https") ; 시작하는지?
(s/ends-with? "fiesta-izone.mp3" ".mp3") ; 끝나는지?

(s/blank? foo) ; 비어있는지?

(str "taehee" " " "kim") ; 합치기
; "taehee kim"
(str 24 "시간이 모자라") ; int와 문자열 합치기. 자동 형 변환.
; "24시간이 모자라"

; (< "1" "3")
; 비교 불가 .String cannot be cast to class java.lang.Number

(s/join " " ["탐정" "토끼" "입니다."]) ; 붙이기
; "탐정 토끼 입니다."

(format "hello, %s" foo) ; 포맷
; "hello, 탐정토끼"

(s/lower "TAEhee Kim")
; "taehee kim"
(s/trim "    내용     \n   ")
; "내용"

; 파이프
(def raw_text "    \n         TeST HeLLo WORld      \n \n \t   ")
(-> raw_text s/trim s/lower-case (s/split #" "))
; ["test" "hello" "world"]
```

### Elixir: String.grapheme(), String.t()
```elixir
foo = "탐정토끼"
IO.puts String.reverse(foo)
```
