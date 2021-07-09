<script>
  import HookDetail from '../../components/HookDetail.svelte';
  import BlogTeaser from '../../components/BlogTeaser.svelte';
  import Clock from '../../components/Clock.svelte';
  export let data, helpers;

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
    border: 1px solid var(--muted);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background: var(--main-background);
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
</style>

<svelte:head>
  <title> 진리의 배 조선소 </title>
  <meta name="description" content="탐정토끼가 만드는 진리의 배 블로그" />
  <link href="/" rel="canonical" />
</svelte:head>

<div>
  <h1> 진리의 배 조선소 : Blog </h1>

  <img style=" width: 8rem; height: 8rem; border-radius: 50%;"
       src="https://twinstae.github.io/TamjungRabbitProfile.jpg"
       alt="갈색 코트를 입은 디즈니식 토끼 그림. 주토피아가 탐정물로 기획되던 시절 주인공 주디의 디자인이다."
       data-balloon-length="medium" data-balloon-pos="up" aria-label="그림 출처 : 디즈니 애니메이션 주토피아가 탐정물로 기획되던 시절의 주디의 원안">
  <h2>탐정토끼 (본체: Taehee Kim) </h2>

  <p>
    진리의 배는 서로 다른 사람들이 함께 나아가기 위한 플랫폼입니다. 그 시작으로 작은 배를 만드는 조선소로서, 이 블로그를 열었습니다.
    그냥 글만 올리는 블로그가 아니라, 여러 웹 서비스를 만들고 실험해보려 합니다.
  </p>

  <p>
  코칭을 받고 싶으시면 <a target="_blank" href="https://open.kakao.com/o/sMM8O6md"><span style="color:black;" class="badge warning">오픈 카카오톡</span></a>으로 연락 주시면 편합니다.
    <a target="_blank" href="https://twitter.com/stelo_kim"> <span class="badge secondary">트위터 </span></a>DM이나 <span class="badge">rabolution@gmail.com</span> 으로 이메일을 주셔도 됩니다.
  </p>
  <p>
    구직 중 입니다. 채용에 관심이 있으시면 역시 위에 적힌 연락처로 연락 주세요.
  </p>
</div>

<div class="blog">
  <div class="entries">
    {#each data.markdown.blog.sort(compare_blog_date) as blog}
      <BlogTeaser {blog} {helpers} />
    {/each}
  </div>
</div>
