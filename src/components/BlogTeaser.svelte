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
<li class="blog-teaser">
  <a href={blog.permanlink} class:selected={is_selected}>
    <div class="entry card">
      <h3>
        {blog.frontmatter.title}
        {#if in_progress}🚧{/if}
      </h3>
      <span class="date-badge">
        {formattedDate}
      </span>
      <ul class="tag-list" style="padding: 0;">
        {#each blog.tags as tag}
          <li class="hashtag">
            #{tag}        
          </li>
        {/each}
      </ul>
      <p class="excerpt">{blog.frontmatter.excerpt}</p>
    </div>
  </a>
</li>
{/if}

<style>
  li.blog-teaser:before {
    content: '';
  }

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
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .tag-list {
    line-height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .hashtag:before {
    content: ' ';
  }

  .hashtag {
    padding-left: 1rem;
  }

  .excerpt {
    font-size: 80%;
  }
</style>
