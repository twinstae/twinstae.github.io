<script>
  import { selected_tag } from "../stores/tag";

  export let blog;

  const formattedDate = new Intl.DateTimeFormat(
    "ko-KR", {
      dateStyle: "long",
      timeStyle: "short"
    })
  .format(new Date(blog.frontmatter.date));

  $: is_selected = $selected_tag ? blog.tags.includes($selected_tag) : true;
  const in_progress = blog.tags.includes("작성 중")
</script>

{#if is_selected}
<a href={blog.permanlink} class:selected={is_selected}>
  <div class="entry card">
    <h3>
      {blog.frontmatter.title}
      {#if in_progress}🚧{/if}
    </h3>
    <span class="date-badge">
      {formattedDate}
    </span>
    <div class="tag-list">
      {#each blog.tags as tag}
        <span class="hashtag">
          #{tag}        
        </span>
      {/each}
    </div>
    <p>{blog.frontmatter.excerpt}</p>
  </div>
</a>
{/if}

<style>
  span.date-badge {
    color: gray;
    font-size: 80%;
    width: fit-content;
  }

  h3 {
    margin: 0;
    color: var(--primary);
  }

  p {
    margin: 0.25rem;
    color: var(--primary-text);
  }

  .entry {
    padding: 1rem;
    border: 1px solid var(--muted);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>
