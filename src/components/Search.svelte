<script>
  import { onMount } from 'svelte';
  import { Document } from 'flexsearch';

  export let blog_list;

  const index = new Document({
    doc: {
      id: "name",
      field: ["content"]
    },
    encode: str => str.replace(/[\x00-\x7F]/g, "").split("")
  });
  let keyword = '';
  $: result = index.search(keyword).reduce((acc, { result }) => acc.concat(result), []);

	onMount(async () => {
		const keys = await fetch('/keys.json').then(res => res.json());

    await Promise.all(keys.map(name => fetch('/'+ name).then(res => res.text())))
      .then(chunks => {
        chunks.forEach((chunk, i) => {
          console.log(keys[i].replace('.index', ''))
          index.import(keys[i].replace('.index', ''), chunk)
        })
      })


    console.log(blog_list);
  });

  function getFrontmatter(item){
    return blog_list.find(blog => item.replace('.md', '') === blog.slug).frontmatter;
  }
</script>
<label>
  검색
  <input type="text" bind:value={keyword} />
</label>
{#each result as item}
  <li>{getFrontmatter(item).title}</li>
{/each}
