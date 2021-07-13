<script>
  import BlogTeaser from "./BlogTeaser.svelte";

  export let blog_list;
</script>


<div class="entries">
  {#each blog_list as blog (blog.frontmatter.title)}
    <BlogTeaser {blog} />
  {/each}
</div>


<style>
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
</style>
