---
title: '웹 인터페이스 계층'
excerpt: 'REST, gRPC, GraphQL, Socket, PubSub 등등... API 계층은 외부에서 들어온 요청을 작업으로 변환하고, 결과를 응답으로 변환하고 전달합니다.'
date: '2021-07-13T18:30:36.653907'
author: 탐정토끼(Taehee Kim)
tag: '작성 중, DDD, 계층형 아키텍처, API, REST, gRPC, GraphQL, WebSocket, PubSub'
---

## 웹 인터페이스는 서버가 외부와 통신하는 방법이자, 계약입니다.

## 수단과 양식, 통신 프로토콜

### HTTP: HyperText Transfer Protocol 하이퍼 텍스트 전송 규약

> Hypertext Transfer Protocol (HTTP) is an application-layer protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers, but it can also be used for other purposes. HTTP follows a classical client-server model, with a client opening a connection to make a request, then waiting until it receives a response. HTTP is a stateless protocol, meaning that the server does not keep any data (state) between two requests. Though often based on a TCP/IP layer, it can be used on any reliable transport layer, that is, a protocol that doesn't lose messages silently like UDP does. RUDP — the reliable update of UDP — is a suitable alternative.
>
> [MDN HTTP 문서](https://developer.mozilla.org/en-US/docs/Web/HTTP)

>  The Hypertext Transfer Protocol (HTTP) is an application-level protocol for distributed, collaborative, hypermedia information systems. It is a generic, stateless, protocol which can be used for many tasks beyond its use for hypertext, such as name servers and distributed object management systems, through extension of its request methods, error codes and headers [47]. A feature of HTTP is the typing and negotiation of data representation, allowing systems to be built independently of the data being transferred.
>
> [RFC2616 Hypertext Transfer Protocol -- HTTP/1.1 스펙](https://datatracker.ietf.org/doc/html/rfc2616)

#### RESTful: Representational state transfer 표현적 상태 전이

> Client-Server, Stateless, Cache, Uniform Interface, Layered System
>
> Roy Thomas Fielding의 논문
>
> [Architectural Styles and the Design of Network-based Software Architectures](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)

#### OpenAPI

> The OpenAPI Specification (OAS) defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.
> An OpenAPI definition can then be used by documentation generation tools to display the API, code generation tools to generate servers and clients in various programming languages, testing tools, and many other use cases.
>
> [Swagger 공식 사이트의 OpenAPI 소개](https://swagger.io/specification/)

#### 동사로 API만들기: REST를 넘어서

### gRPC: google Remote Procedure Call 구글 원격 프로시저 호출

> gRPC is a modern open source high performance Remote Procedure Call (RPC) framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication. It is also applicable in last mile of distributed computing to connect devices, mobile applications and browsers to backend services.
>
> [About gRPC 공식 홈페이지](https://grpc.io/about/)

### GraphQL: Graph Query Language 진화하는 API를 위한 질의 언어

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.
>
> [GraphQL 공식 사이트](https://graphql.org/)

### WebSocket: 양방향, 실시간, 이벤트 기반 통신을 위한 API 

> The WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply.
>
> [MDN The WebSocket API 문서](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

> Socket.IO enables real-time, bidirectional and event-based communication.
It works on every platform, browser or device, focusing equally on reliability and speed.
>
> 대표적인 소켓 통신 라이브러리. [Socket.IO 공식 사이트](https://socket.io/)

### PubSub: 게시자-구독자 패턴. 비동기 메세징 API

> SUBSCRIBE, UNSUBSCRIBE and PUBLISH implement the Publish/Subscribe messaging paradigm where (citing Wikipedia) senders (publishers) are not programmed to send their messages to specific receivers (subscribers). Rather, published messages are characterized into channels, without knowledge of what (if any) subscribers there may be.
> Subscribers express interest in one or more channels, and only receive messages that are of interest, without knowledge of what (if any) publishers there are. This decoupling of publishers and subscribers can allow for greater scalability and a more dynamic network topology.
>
> [Redis Pub/Sub 공식 문서](https://redis.io/topics/pubsub)
