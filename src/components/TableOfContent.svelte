<script>
  export let tocTree;
</script>

<nav>
  <div>
    <h4>목차</h4>
    <ol>
    {#each tocTree as heading2}
      <li>
        <a href="#{heading2.id}">
          {heading2.text}
          {#if heading2.children}
          <ol>
            {#each heading2.children as heading3}
              <li style="font-size: 80%"><a href="#{heading3.id}">{heading3.text}</a></li>
            {/each}
          </ol>
          {/if}
        </a>
      </li>
    {/each}
    </ol>
  </div>
</nav>

<style>
  a {
    color: var(--muted);
  }

  nav {
    z-index: 1;
    margin-top: 1rem;
    border: 2px solid var(--primary-text);
    border-radius: 0.5rem;
  }
</style>
