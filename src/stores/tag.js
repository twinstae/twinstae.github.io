import { writable } from "svelte/store";

export const tag_list = writable([]);

export function tagStoreInit(blog_list){
  const result = blog_list.reduce((acc, blog)=>{
    const raw_tags = blog.frontmatter.tag; // ex 'Svelte, Elder.js, Github Pages, Blog'
    if (! raw_tags){
      return acc;
    }
    const tags = raw_tags.split(", ");
    return acc.concat(tags);
  }, []);

  tag_list.set(result);
}

export let selected_tag = writable("");
