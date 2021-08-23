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
  <button class="hashtag" class:selected={$selected_tag == ""} on:click={function(){ selected_tag.set(""); }}>
    전체
  </button>
  <button class="hashtag" class:selected={$selected_tag == "작성 중"} on:click={function(){ selected_tag.set("작성 중"); }}>
    작성 중🚧
  </button>
  {#each tag_count_list as [tag, count] }
    <button class="hashtag" class:selected={$selected_tag == tag} on:click={function(){ selected_tag.set(tag); }}>
      #{tag} {count}
    </button>
  {/each}
</div>


<style>
  header {
    color: var(--primary);
    font-size: 1.25rem;
    margin: 0.25rem;
  }

  div#tag-nav {
    line-height: 100%;
    padding: .5rem;
    border: 1px solid var(--muted);
    border-radius: .5rem;
    display: flex;
    flex-wrap: wrap;
  }

  .selected {
    border: 2px solid orange;
  }
</style>
