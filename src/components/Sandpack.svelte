<script context="module">
  import Prism from "prismjs";

  const highlight = (code, syntax) => Prism.highlight(code, Prism.languages[syntax], syntax);
</script>

<script>
  import { SandpackClient } from '@codesandbox/sandpack-client';
  import { onMount } from 'svelte';
  import dedent from "dedent-tabs";

  export let id;
  export let initCode = dedent`<script>
    let name = 'World';
  <${'/'}script>
  <main>
    <h1>Hello {name}</h1>
  </main>`;
  export let template = 'svelte';

  let code = dedent`${initCode}`

  let client;
  let CodeJar;

  const options = template === 'svelte' ?
    {
      files: {
        "/index.js": {
          code: `import App from "./App.svelte";
            const app = new App({
              target: document.body
            });
            export default app;
                  `,
        },
        "/public/index.html": {
          code: `\<!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf8" \/>
              <meta name="viewport" content="width=device-width" \/>
              <title>Svelte app</title>
              <link rel="stylesheet" href="public/bundle.css" \/>
            <\/head>
            <body>
              <script src="bundle.js"><\/script>
            <\/body>
          </html>`,
        },
        "/package.json": {
          code: JSON.stringify({
            dependencies: {
              svelte: "^3.0.0",
            },
            main: "/index.js",
          }),
        },
      },
      main: "/index.js",
    } : {};

  onMount(() => {
    client = new SandpackClient('#'+id, {
      files: {
        ...options.files,
        '/App.svelte': {
          code,
        },
      },
      entry: "/index.js",
      template,
    });
    console.log('hello!')
  });
  onMount(async () => {
    ({CodeJar} = await import("@novacbn/svelte-codejar"));
  });

  $: client?.updatePreview({
      files: {
        '/App.svelte': {
          code,
        },
        ...options.files
      },
      entry: "/index.js",
      template,
    });
  
  function onClassChange(element, callback) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          callback(mutation.target);
        }
      });
    });
    observer.observe(element, { attributes: true });
    return observer.disconnect;
  }

  let isDark = false;
  onMount(() => {
    const $html = document.getElementsByTagName('html')[0];
    isDark = $html.classList.contains('dark')
    onClassChange($html, (node) => {
      isDark = node.classList.contains('dark')
    })
  })
</script>

<svelte:head>
	<link href="/prism{isDark ? '-dark' : ''}.css" rel="stylesheet" />
</svelte:head>

<div class="sandpack-box row">
  {#if CodeJar}
    <div class="col-6 col">
      <svelte:component this={CodeJar} syntax="html" {highlight} bind:value={code} addClosing withLineNumbers class="code-wrapper" />
    </div>
  {:else}
  <pre><code>{code}</code></pre>
  {/if}
  <div class="preview-wrapper border border-primary col-6 col">
    <iframe {id} title="샌드팩 미리보기"/>
  </div>
</div>

<style>

  .sandpack-box {
    width: 100%;
    display: flex;
  }
  .sandpack-box > .preview-wrapper {
    background-color: white;
    width: 50%;
    padding: 0;
  }
</style>
