<script>
  import { onMount } from "svelte";

  import { tagStoreInit, tag_list, selected_tag } from "../stores/tag";
  export let blog_list;

  onMount(()=>{
    tagStoreInit(blog_list);
  })

  $: tag_counter = $tag_list.reduce((acc, tag)=>{
    if (tag=="작성 중"){
      return acc;
    }

    if (!acc.has(tag)){
      acc.set(tag, 0);
    }

    acc.set(tag, acc.get(tag) + 1);
    return acc;
  }, new Map())

  $: tag_count_list = [...tag_counter.entries()].sort(([a, a_count], [b, b_count])=> b_count - a_count);
</script>
<div id="tag-nav">
  <header>해시태그 목록</header>
  <span class="hashtag" class:selected={$selected_tag == ""} on:click={function(){ selected_tag.set(""); }}>
    전체
  </span>
  <span class="hashtag" class:selected={$selected_tag == "작성 중"} on:click={function(){ selected_tag.set("작성 중"); }}>
    작성 중🚧
  </span>
  {#each tag_count_list as [tag, count] }
    <span class="hashtag" class:selected={$selected_tag == tag} on:click={function(){ selected_tag.set(tag); }}>
      #{tag} {count}
    </span>
  {/each}
</div>


<style>
  header {
    color: var(--primary);
    font-size: 1.25rem;
    margin: 0.25rem;
  }

  div#tag-nav {
    line-height: 150%;
    font-size: 14px;
    padding: 0.5rem;
    border: 1px solid var(--muted);
    border-radius: 0.5rem;
  }

  .selected {
    border: 2px solid orange;
    border-radius: 4px;
    padding: 0.125rem;
    margin:  0.125rem;
    line-height: 150%;
  }
</style>
