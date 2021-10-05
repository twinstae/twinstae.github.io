<script>
import ScrollTopButton from "../../components/ScrollTopButton.svelte";
import TableOfContent from "../../components/TableOfContent.svelte";

  export let data, request; // data is mainly being populated from the @elderjs/plugin-markdown
  const { html, frontmatter, tocTree } = data;
</script>


<svelte:head>
  <title>{frontmatter.title}</title>
  <meta name="description" content={frontmatter.excerpt} />
  <link href="https://twinstae.github.io{request.permalink}" rel="canonical" />

  <meta property="og:site_name" content="진리의 배 조선소">
  <meta property="og:url" content="https://twinstae.github.io{request.permalink}">
  <meta property="og:title" content="{frontmatter.title}">
  <meta property="og:image" content="https://twinstae.github.io/TamjungRabbitProfile.jpg">
  <meta property="og:description" content="{frontmatter.excerpt}">

  <meta name="twitter:card" content="summary">
  <meta name="twitter:url" content="https://twinstae.github.io{request.permalink}">
  <meta name="twitter:title" content="{frontmatter.title}">
  <meta name="twitter:description" content="{frontmatter.excerpt}">
  <meta name="twitter:image" content="https://twinstae.github.io/TamjungRabbitProfile.jpg">
</svelte:head>

<a href="/">&LeftArrow; Home</a>

<div class="title">
  <h1>{frontmatter.title}</h1>
  <div>
    {#if frontmatter.tag}
      {#each frontmatter.tag.split(", ") as tag}
        <span class="hashtag">
          #{tag}
        </span>
      {/each}
    {/if}
  </div>
  {#if frontmatter.author}<small>By {frontmatter.author}</small>{/if}
</div>

<ScrollTopButton hydrate-client={{}} hydrate-options={{preload: true }} />

{#if tocTree && tocTree.length > 0}
  <TableOfContent tocTree={tocTree}/>
{/if}

{#if html}
  {@html html}
{:else}
  <h1>Oops!! Markdown not found!</h1>
{/if}

<div>
  <script src="https://utteranc.es/client.js" repo="twinstae/twinstae.github.io" issue-term="pathname" label="댓글" theme="github-dark-orange" crossorigin="anonymous" async="">
  </script>
</div>

<style>
  .title {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;
  }
</style>
