---
title: '언어들이 문자열 String을 다루는 방식(작성 중)'
excerpt: 'Java, JS, Python, Rust, Clojure, Elixir 등등 다양한 언어들이 문자열을 다루는 방식을 비교하고 익혀봅니다.'
date: '2021-07-08T15:26:07.156Z'
author: 탐정토끼(Taehee Kim)
---

```java
String foo = "abcde";
StringBuffer sb = new StringBuffer(str);
String reversedFoo = sb.reverse().toString();
System.out.println(reversedFoo);
```

```python
"탐정토끼"[::-1]
```

```javascript
const foo = "탐정토끼";
console.log(foo.split("").reverse().join());
```

```rust
let foo = "탐정토끼";
println!("{}", foo.chars().rev().collect::<String>());
```

```clojure
(require '[clojure.string :as s])
(def foo "탐정토끼")
(print (s/reverse foo))
```

```elixir
foo = "탐정토끼"
IO.puts String.reverse(foo)
```
