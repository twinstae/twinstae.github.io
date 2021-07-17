<script>
  import { onMount } from "svelte";

  onMount(()=>{
    const btn = document.getElementById("scroll-top-button");

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      const limit = 256;
      if (btn.style.opacity == 0 && document.body.scrollTop > limit || document.documentElement.scrollTop > limit) {
        btn.style.opacity = 1;
      } else if (btn.style.opacity == 1){
        btn.style.opacity = 0;
      }
    }
  })
</script>

<button id="scroll-top-button" on:click={function topFunction() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }}>↑ 맨 위로</button>

<style>
  #scroll-top-button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 7;
    border: none;
    outline: none;
    background-color: var(--primary);
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    font-size: 1.25rem;
    border-radius: 0.5rem;
    opacity: 0;
    transition: opacity 0.5s linear;
  }
</style>
