<script>
  export let blog;
  export let helpers;
</script>

<style>
  span.date-badge {
    color: gray;
    font-size: 80%;
    width: fit-content;
  }

  p {
    margin: 0.25rem;
  }
</style>

<a href={helpers.permalinks.blog({ slug: blog.slug })}>
<div class="entry card">
    <h3 style="margin: 0; color: var(--secondary)">{blog.frontmatter.title}</h3>
  <span class="date-badge">
    {new Intl.DateTimeFormat("ko-KR", {dateStyle: "long", timeStyle: "short"}).format(new Date(blog.frontmatter.date))}
  </span>
  <p>{blog.frontmatter.excerpt}</p>
</div>
</a>
