<script>
  import style from '../../assets/style.css';
  import paper from '../../assets/paper.css';

  export let templateHtml, settings;
</script>

<style>
  .container {
    max-width: 900px;
    min-height: 90vh;
    margin: 0 auto;
    padding: 1rem;
  }

  h1 {
    font-size: 8rem;
  }

  :root {
    --balloon-color: #06395a;
    --balloon-font-size: 14px;
    --codeblock-background-color: #333;
    --codeblock-color: #ddd;
  }
  .footer {
    padding: 2rem 0;
    background: #06395a;
    padding-top: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    color: #f4f7fb;
    text-align: center;
    font-size: 14px;
  }
  .footer a {
    color: #f4f7fb;
  }
  :global(ul li),
  :global(ol li) {
    margin-bottom: 0.3rem;
  }
</style>

<svelte:head>
  <!-- You can remove this balloon it is just for hover effects -->
  <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css">
  <link rel="stylesheet" href="https://unpkg.com/balloon-css/balloon.min.css" />
  <link rel="stylesheet" href="./paper.css">
</svelte:head>

<article class="container">
  {@html templateHtml}
</article>

<footer class="footer">이 블로그는 <a href="https://svelte.dev/">Svelte</a>와 <a class="secondary" href="https://elderguide.com/tech/elderjs/">Elder.js</a>로 만들었습니다. 디자인은 <a href="https://www.getpapercss.com/docs/">PaperCSS</a>를 기본으로 커스텀했습니다. <a href="https://pages.github.com/">Github Pages</a>로 호스팅하고 있습니다.</footer>
