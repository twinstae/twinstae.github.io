<script>
  import style from '../../assets/style.css';
  import paper from '../../assets/paper.css';
  import DarkCheckBox from "../components/DarkCheckBox.svelte";

  export let templateHtml, settings;

</script>

<style>
  .container {
    max-width: 900px;
    min-height: 90vh;
    margin: 0 auto;
    padding: 1rem;
  }

  :root {
    --balloon-color: var(--primary);
    --balloon-font-size: 14px;
    --codeblock-background-color: #333;
    --codeblock-color: #ddd;
  }

  nav {
    background-color: var(--primary);
  }

  .footer {
    padding: 2rem 0;
    background: #333;
    padding-top: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    color: #ddd;
    text-align: center;
    font-size: 14px;
  }
  .footer a {
    color: #ddd;
    font-weight: bold;
  }

  :global(ul li),
  :global(ol li) {
    margin-bottom: 0.3rem;
  }

</style>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css">
  <link rel="stylesheet" href="https://unpkg.com/balloon-css/balloon.min.css" />
  <link rel="stylesheet" href="http://localhost:3000/paper.css">
  <script>
    let is_dark = localStorage.getItem("dark") == "true";
    document.getElementsByTagName("html")[0].className = is_dark ? "dark" : "light";
  </script>
</svelte:head>
<nav>
  <DarkCheckBox hydrate-client={{}}/>
</nav>

<article class="container">
  {@html templateHtml}
</article>

<footer class="footer">
  이 블로그는 <a href="https://svelte.dev/">Svelte</a>와 <a class="secondary" href="https://elderguide.com/tech/elderjs/">Elder.js</a>로 만들었습니다.
  <br>
  디자인은 <a href="https://www.getpapercss.com/docs/">PaperCSS</a>를 기본으로 커스텀했습니다.
  <br>
  <a href="https://pages.github.com/">Github Pages</a>로 호스팅하고 있습니다.
  <br>
  오픈소스 개발자분들과 무료 호스팅 서비스에 감사드립니다. :)
</footer>
