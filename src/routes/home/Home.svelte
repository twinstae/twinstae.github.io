<script>
  import BlogList from '../../components/BlogList.svelte';
  // import TagNav from '../../components/TagNav.svelte';
  import { tagStoreInit } from '../../stores/tag';

  export let data, request, helpers;

  function compare_frontmatter_date_latest(a, b) {
    return Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date);
  }

  const blog_list = data.markdown.blog
    .sort(compare_frontmatter_date_latest)
    .map((blog) => ({
      ...blog,
      permanlink: helpers.permalinks.blog({ slug: blog.slug }),
      tags: blog.frontmatter.tag ? blog.frontmatter.tag.split(', ') : [],
    }))
    .filter(blog => blog.tags.includes('작성 중') === false);

  tagStoreInit(blog_list);
</script>

<svelte:head>
  <title>진리의 배 조선소</title>
  <meta name="description" content="탐정토끼가 만드는 진리의 배 블로그" />
  <link href="https:/twinstae.github.io/" rel="canonical" />
</svelte:head>

<section id="banner">
  <h1>진리의 배 조선소 : Blog</h1>

  <img
    style=" width: 8rem; height: 8rem; border-radius: 50%;"
    src="./TamjungRabbitProfile.jpg"
    alt="갈색 코트를 입은 디즈니식 토끼 그림. 주토피아가 탐정물로 기획되던 시절 주인공 주디의 디자인이다."
    data-balloon-length="medium"
    data-balloon-pos="up"
    aria-label="그림 출처 : 디즈니 애니메이션 주토피아가 탐정물로 기획되던 시절의 주디의 원안"
  />
  <h2>탐정토끼 (본체: Taehee Kim)</h2>

  <p>
    진리의 배는 서로 다른 사람들이 함께 나아가기 위한 플랫폼입니다. 그 시작으로
    작은 배를 만드는 조선소로서, 이 블로그를 만들었습니다.
  </p>

</section>

<section class="blog">
  <BlogList
    hydrate-client={{
      blog_list: blog_list.slice(request.postStart, request.postEnd),
    }}
    hydrate-options={{ "loading" : "eager" }}
  />
</section>
