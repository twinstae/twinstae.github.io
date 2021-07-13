---
title: '언어들이 문자열 String을 다루는 방식'
excerpt: 'Java, JS, Python, Rust, Clojure, Elixir 등등 다양한 언어들이 문자열을 다루는 방식을 비교하고 익혀봅니다.'
date: '2021-07-08T15:26:07.156Z'
author: 탐정토끼(Taehee Kim)
tag: '작성 중, std, 프로그래밍 언어'
---

## 언어 사이에 공통점과 차이점

### 문자열은 무엇인가?

### 문자열 인코딩은 UTF-8인가?

### 원시타입인가 객체인가?

### Char와 String을 구분하는가?

### 자동 형변환이 가능한가?

### 메서드인가, 모듈 함수인가?

### 인덱스가 0부터 시작하는가?

포트란, Lua, Julia

### 인덱스 슬라이싱이 가능한가?

### 인덱스 for vs Iterator

### 정규표현식

## 프로그래밍 언어별 String 코드 예시
### Java: char, Char, String
```java
String foo = "abcde";
StringBuffer sb = new StringBuffer(str);
String reversedFoo = sb.reverse().toString();
System.out.println(reversedFoo);
```

### Python: str
```python
foo = "탐정토끼" # 리터럴
assert type(foo) == type("탐") # 글자 하나의 타입도 string이다.
# <class 'str'>

assert len(foo) == 4 # 문자열의 길이

# 문자열[start : end : step]
assert foo[0] == "탐"  # 문자 가져오기
assert foo[1:] == "정토끼" # 자르기. start 부터 끝까지
assert foo[1:3] == "정토"  # 마지막 인덱스는 미포함
assert foo[-2:] == "토끼"  # 마지막 2글자
assert "abcdefg"[::2] == "aceg" # step 2칸씩 

print(foo[::-1]) # 뒤집기
# "끼토정탐"

assert "2014/02/14".replace("/", "-") == "2014-02-14" # 치환
assert "2014/02/14".split("/") == ["2014", "02", "14"] # 쪼개기

assert str(24) + "시간이 모자라" # int와 문자열 합치기
# "24시간이 모자라"
assert "1" < "3" # 비교 가능

assert "taehee" + " " + "kim" == "taehee kim" # 합치기
assert "".join(["탐정", "토끼", "입니다."]) == "탐정토끼입니다." # 붙이기

long_csv = """12, 3, "빨강"
13, 2, "파랑"
14, 1, "초록"
""" # 여러 줄 문자열
long_csv.split("\n") # 줄 단위로 자르기

assert "탐정" in foo == True # foo가 "탐정"을 포함하는지? 
assert "https://twinstae.github.io/".startswith("https") == True # 시작하는지?
assert "fiesta-izone.mp3".endswith(".mps") # 끝나는지?

name: str = 'kim' # 타입힌트, ' 홑 따옴표도 상관 없다.

assert not name == True;   # 비어 있는지? PEP8 가이드 권장
# "name != ""               # 이렇게 할 수도 있긴 하다.

print('hello, %s' % name) # format
# 'hello, kim'
print(f'hello, {name}')   # interpolation
# 'hello, kim'

print('TAEhee Kim'.lower()) # 소문자로
# 'taehee kim'
'    내용     \n   '.strip()  # 공백 자르기
# '내용'

m = re.search('([1-6])학년 ([0-9]{1,2})단원', '2학년 3단원')
assert m.group(0) == '2학년 3단원'
assert m.group(1) == '2'
assert m.group(2) == '3'
```
### TypeScript: string
```typescript
const foo: string = "탐정토끼";
console.log(foo.split("").reverse().join());
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
(s/split "2014/02/14" "/") ; 쪼개기
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
```

### Elixir: String.grapheme(), String.t()
```elixir
foo = "탐정토끼"
IO.puts String.reverse(foo)
```
