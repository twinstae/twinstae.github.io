<script>
  export let blog;
  export let helpers;

  const formattedDate = new Intl.DateTimeFormat(
    "ko-KR", {
      dateStyle: "long",
      timeStyle: "short"
    })
    .format(new Date(blog.frontmatter.date));
</script>

<a href={helpers.permalinks.blog({ slug: blog.slug })}>
<div class="entry card">
    <h3>{blog.frontmatter.title}</h3>
  <span class="date-badge">
    {formattedDate}
  </span>
  <p>{blog.frontmatter.excerpt}</p>
</div>
</a>

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
</style>
