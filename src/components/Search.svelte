<script>
  import { getRegExp } from 'korean-regexp';
    import { onMount } from 'svelte';

  export let blog_list;

  let keyword = '';
  $: regex = getRegExp(keyword, {
    initialSearch: true,
    ignoreSpace: true,
    ignoreCase: true,
    global: true,
  });
  $: result = keyword ? blog_list
    .map(blog => {
      const match = blog.frontmatter.title.match(regex) || [];
      return {
        ...blog,
        match,
        text: blog.frontmatter.title.replace(new RegExp('('+ match.join('|') +')', 'g'), '<mark>$&</mark>')
      }
    })
    .filter(blog => blog.match.length)
    .sort((a,b) => a.match.length - b.match.length) : [];

  $: console.log(result)
  onMount(() => {
    console.log(blog_list);
  });
  
</script>
<label>
  검색
  <input type="text" bind:value={keyword} />
</label>
{#each result as item}
  <li>{@html item.text}</li>
{/each}
