---
title: '파이썬 비동기 DB 비교 - 1. 큰 그림'
excerpt: '파이썬에서 비동기 DB를 SQLDriver, ORM, NoSQL까지 다양한 방법으로 구현해보고 비교해보려 합니다. 큰 그림을 그려보면서 시작합니다.'
date: '2021-07-13T11:23:44.765012'
author: 탐정토끼(Taehee Kim)
tag: '작성 중, 비동기, 파이썬, 데이터베이스'
---

## AsyncIO DB를 다양한 방식으로 구현해보고 비교합니다.


## 비동기는 쓰레드 하나(single thread)로도 차단(Blocking) 없이 더 많은 요청을 처리할 수 있습니다.


## 파이썬에서는 AsyncIO와 async/await 키워드로 비동기를 처리합니다.


## 다양한 DB를 사용해서 구현해보고 비교해봅니다.

### SQL Driver : SQLite/aiosqlite, PostgreSQL/asyncpg

### ORM 객체 관계 맵퍼 : SQLAlchemy, Tortoise

### Next-Generation? : EdgeDB

### Key-Value 키-값 : Redis/async-redis

### Document : MongoDB/Motor

### Graph : Neo4j/aioneo4j
