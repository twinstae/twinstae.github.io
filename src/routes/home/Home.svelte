<script>
  import HookDetail from '../../components/HookDetail.svelte';
  import BlogTeaser from '../../components/BlogTeaser.svelte';
  import Clock from '../../components/Clock.svelte';
  export let data, helpers;

  // add permalinks to the hook list so we can link to the posts.
  const hooks = data.hookInterface.map((hook) => ({
    ...hook,
    link: helpers.permalinks.hooks({ slug: hook.hook.toLocaleLowerCase() }),
  }));

  function compare_blog_date(a, b){
    return Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date);
  }
</script>

<style>
  .banner {
    padding: 1rem;
  }

  .entries {
    display: grid;
    grid-template-columns: 1fr;
    margin: 3rem 0;
  }

  @media (min-width: 768px) {
    .entries {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 3rem 0;
    }
    :global(.entries .entry) {
      margin-right: 1rem;
    }
  }

  :global(.entry) {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background: white;
  }

  .about {
    margin-bottom: 2rem;
  }

  @media (min-width: 768px) {
    .hydrate {
      display: grid;
      grid-template-columns: 80% 20%;
    }
  }

  .hooks {
    display: grid;
    grid-template-columns: 100%;
  }

  @media (min-width: 768px) {
    .hooks {
      grid-template-columns: 50% 50%;
    }
  }
</style>

<svelte:head>
  <title> 진리의 배 조선소 </title>
  <meta name="description" content="탐정토끼가 만드는 진리의 배 블로그" />
  <link href="/" rel="canonical" />
</svelte:head>

<div>
  <h1> 진리의 배 조선소 : Blog </h1>

  <img style=" width: 8rem; border-radius: 16rem;"
       src="https://pbs.twimg.com/profile_images/1392049180571365376/NDtx4On3_400x400.jpg"
       alt="갈색 코트를 입은 디즈니식 토끼 그림. 주토피아가 탐정물로 기획되던 시절 주인공 주디의 디자인이다."
       data-balloon-length="medium" data-balloon-pos="up" aria-label="그림 출처 : 디즈니 애니메이션 주토피아가 탐정물로 기획되던 시절의 주디의 원안">
  <h2>탐정토끼 (본체: Taehee Kim) </h2>
  <a href="https://twitter.com/stelo_kim"> <span class="badge secondary">트위터 </span></a>

  <p>
    진리의 배는 서로 다른 사람들이 함께 나아가기 위한 플랫폼입니다. 그 시작으로 작은 배를 만드는 조선소로서, 이 블로그를 열었습니다.
    그냥 글만 올리는 블로그가 아니라, 여러 웹 서비스를 만들고 실험해보려 합니다.
  </p>

  <p>
    코칭을 받고 싶으시면 <a href="https://open.kakao.com/o/sMM8O6md"><span class="badge warning">오픈 카카오톡</span></a>으로 연락 주시면 편합니다.
    트위터 DM이나 <span class="badge">rabolution@gmail.com</span> 으로 이메일을 주셔도 됩니다.
  </p>
  <p>
    구직 중 입니다. 채용에 관심이 있으시면 역시 위에 적힌 연락처로 연락 주세요.
  </p>

  <ul>
    <li> <strong>15분 만에 끝내는 개발환경</strong> : 여러 언어와 프레임워크를 쉽게 설치하고 세팅할 수 있게 도와드립니다 </li>
    <li> <strong>제네릭&lt;언어&gt; </strong>: 여러 프로그래밍 언어들에서 공통되거나 특별한 개념들을 탐구합니다. </li>
    <li> <strong>Svelte Elder.js로 블로그 만들기</strong> : 이런 블로그를 직접 만드는 방법을 소개합니다. </li>
    <li> <strong>IZ*DOOR 개발 일지</strong> : 제목이 곧 내용입니다.</li>
    <li> <strong>개념어 사전 </strong>: 어디서 들어보긴 했는데 정확하게는 모르고 있던 개념들을 설명합니다</li>
    <li> 그 외에 TDD 테스트 주도 개발, DDD 도메인 주도 개발, 객체지향 X 함수형, Actor 모델... </li>
  </ul>
</div>

<div class="blog">
  <div class="entries">
    {#each data.markdown.blog.sort(compare_blog_date) as blog}
      <BlogTeaser {blog} {helpers} />
    {/each}
  </div>
</div>
