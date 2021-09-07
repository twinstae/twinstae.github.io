<script>
  export let tocTree;
</script>

<nav>
  <div>
    <span>목차</span>
    <ol>
    {#each tocTree as heading2}
      <li style="font-size: 1.25rem;">
        <a href="#{heading2.id}" style="color: #868e96;">
          {heading2.text}
        </a>
        {#if heading2.children}
        <ol>
          {#each heading2.children as heading3}
            <li style="font-size: 1rem;">
              <a href="#{heading3.id}" style="color: #868e96;">
                {heading3.text}
              </a>
            </li>
          {/each}
        </ol>
        {/if}
      </li>
    {/each}
    </ol>
  </div>
</nav>

<style>
  nav {
    z-index: 1;
    margin-top: 1rem;
    border: 2px solid var(--primary-text);
    border-radius: 0.5rem;
  }
</style>
