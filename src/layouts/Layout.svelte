<script>
  import style from '../../assets/style.css';
  import paper from '../../assets/paper.css';
  import atom_one_dark from '../../assets/atom-one-dark.min.css';
  import hijs_badge from '../../assets/hljs-badge.css';
  import DarkCheckBox from "../components/DarkCheckBox.svelte";

  export let templateHtml; //, settings;
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
    --codeblock-background-color: #282c34;
    --codeblock-color: #ddd;
  }

  nav {
    background-color: var(--primary);
  }

  .footer {
    padding: 2rem 0;
    background: #333;
    padding-top: 2rem;
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
    margin-bottom: .5rem;
    padding: .125rem 0px;
  }
</style>

<svelte:head>
  <link href="https://unpkg.com/balloon-css/balloon.min.css" rel="preload" as="style" />
  <link href='https://fonts.googleapis.com/css?family=Noto Sans KR:400,600&display=swap' rel="preload" as="style" />
  <link href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous" rel="preload" as="style">
  <script type="application/javascript" src="https://twinstae.github.io/highlight.min.js"></script>
  <script>
    hljs.highlightAll();
    setTimeout(()=>{
      const codes = document.getElementsByTagName("code");
      console.log(codes);

      for (const code of codes){
        code.addEventListener("dblclick", function(e){
          navigator.clipboard.writeText(code.innerText)
            .then(() => {
              alert('코드를 클립보드에 복사했습니다.')
            });
        })
      }
    }, 500)
  </script>
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
