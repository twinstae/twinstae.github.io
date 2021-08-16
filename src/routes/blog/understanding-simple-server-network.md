---
title: '써보면서 배우는 HTTP 서버와 네트워크'
excerpt: '0.0.0.0 은 무슨 뜻일까요? IP부터 CORS, method와 status 까지... 면접 질문이 아닙니다. 실제로 필요한 HTTP 네트워크에 대한 지식을 간단한 HTTP 서버를 만들어보며 배워봅시다.'
date: '2021-08-12T19:28:27.107344'
author: 탐정토끼(Taehee Kim)
tag: '작성 중'
---
## "이게 왜 필요하지?" -> 실제로 해보면서 배워요

### 생활코딩 WEB1 심화편

## 한 줄로 static 파일 서버 열기

### 파이썬 설치하기

### 터미널 돌아다니기 : CLI 세계에 오신 걸 환영합니다

pwd

ls (dir)

cd

### HTML 파일을 만들기

### python -m http.server 실행하기

### PC 웹 브라우저에서 서버 접속하기

### 핸드폰 웹 브라우저에서 서버 접속하기

## Under the Hood... 도대체 무슨 일이 일어난 거죠?

### 큰 그림 : 브라우저와 서버가 요청과 응답을 주고 받았어요

### 개발자도구 Network 탭 열어보기

### Route Path : 계층적 파일 경로

디렉토리를 만들어요.

디렉토리 안에 index.html을 만들어요.

파일 경로 vs URL 경로

### Host : 0.0.0.0 은 무슨 뜻이죠?

호스트를 정해봅시다.

### Port 포트 : 80, 3000, 8000... 이게 무슨 뜻이죠?

같은 포트에 서버를 하나 더 열어봅시다.

## 집 밖에서 내 서버에 접속하려면?

### 192.168... 사설 IP : 공유기가 할당해주는 주소

### Port Forwarding 포트 포워딩 : 공인 IP와 사설 IP를 연결하기

### 라즈베리파이 : 미니 컴퓨터

### Termux : 안 쓰는 안드로이드 폰을 리눅스 서버로 쓰기

### 클라우드, 호스팅 서비스, 서버리스 이용하기

### Status Code 상태 코드

304 Not Modified : 새로고침을 해봅시다. 

200 OK : 파일을 수정해봐요.

404 Not Found : 없는 파일을 요청해봅시다. 

## Swagger Open API 로 HTTP 요청과 응답 이해하기

### HTTP API 란?

### HTTP Method : Get, Post, Patch, Put, Delete

### Query Params : ?

### Request Body : 요청 본문
요즘은 보통 json을 사용하지만, XML이나 protobuff도 있습니다.

### Request Header

### Response Header

### 상태코드 심화편

400 Bad Request : 잘못된 요청

401 Unauthorized : 인증 필요

403 Forbidden : 접근 거부

Authorization 헤더를 달아봅시다

### cache control

## 현실 세상의 사이트를 돌아다녀보자

### 도메인 이름과 DNS

### https vs http : SSL 인증서와 보안

### gzip

## 이제 어디로?

### 커맨드라인 배워보기
WSL2 사용하기
리눅스 커맨드라인 생존 가이드

curl

### 서버 만들어 보기

### 내가 쓰는 플랫폼과 언어에서 http 요청 보내기

js : axios, fetch, ky
python : requests, httpx

### HTTP 스펙을 더 깊게 파고들기
MDN
RFC

그림으로 배우는 HTTP & Network Basic
HTTP 완벽 가이드
네트워크 하향식 접근

김영한님 강의 [모든 개발자를 위한 HTTP 웹 기본 지식](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)

### HTTP 2.0 / HTTP 3.0
Open API와 Swagger
gRPC
GraphQL
