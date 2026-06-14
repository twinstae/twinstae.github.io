<script>
  export let title = '';
  export let icon = '';
  export let type = 'default';
</script>

<div class="admonition admonition-{type}">
  {#if title || icon}
    <div class="admonition-title">
      {#if icon}<span class="admonition-icon">{icon}</span>{/if}
      {#if title}<span>{title}</span>{/if}
    </div>
  {/if}
  <div class="admonition-content">
    <slot />
  </div>
</div>

<style>
  .admonition {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border-left: 4px solid var(--primary);
    border-radius: 0.25rem;
    margin: 1.5rem 0;
    overflow: hidden;
    background-color: var(--bg-surface);
    transition: background-color var(--transition-slow);
  }

  .admonition-title {
    border-radius: 0.25rem;
    background-color: var(--primary-bg);
    padding: 0.5rem 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary);
    transition: background-color var(--transition-slow);
  }

  .admonition-content {
    padding: 0.5rem 0.75rem;
  }

  .admonition-content :global(p) {
    margin: 0.5rem 0;
  }

  .admonition-content :global(p:first-child) {
    margin-top: 0;
  }

  .admonition-content :global(p:last-child) {
    margin-bottom: 0;
  }

  .admonition-content :global(ul) {
    padding: 0 1rem 1rem 2rem;
    margin: 0;
  }

  /* Variants */
  .admonition-note {
    border-left-color: var(--secondary);
  }
  .admonition-note .admonition-title {
    background-color: var(--secondary-light);
    color: var(--secondary-text);
  }

  .admonition-tip {
    border-left-color: var(--success);
  }
  .admonition-tip .admonition-title {
    background-color: var(--success-light);
    color: var(--success-text);
  }

  .admonition-warning {
    border-left-color: var(--warning);
  }
  .admonition-warning .admonition-title {
    background-color: var(--warning-light);
    color: var(--warning-text);
  }

  .admonition-danger {
    border-left-color: var(--danger);
  }
  .admonition-danger .admonition-title {
    background-color: var(--danger-light);
    color: var(--danger-text);
  }

  .admonition-think {
    border-left-color: var(--primary);
  }
  .admonition-think .admonition-title {
    background-color: var(--primary-bg);
    color: var(--primary);
  }
</style>
