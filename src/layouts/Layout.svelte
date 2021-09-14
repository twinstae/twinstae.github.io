<script>
  import style from '../../assets/style.css';
  import paper from '../../assets/paper.css';
  import katex from '../../assets/katex.min.css';
  import hljs_badge from '../../assets/hljs-badge.css';

  import DarkCheckBox from "../components/DarkCheckBox.svelte";

  export let templateHtml, request; //, settings;

  function current(href){
    return request.slug === href ? 'current' : '';
  }
</script>

<style>
  .container {
    max-width: 900px;
    min-height: 90vh;
    width: 100%;
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
    display: flex;
    align-items: center;
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
    margin-bottom: 0.125rem;
    padding: .125rem 0px;
  }
</style>

<svelte:head>
  <link href="https://unpkg.com/balloon-css/balloon.min.css" rel="preload" as="style" />
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css" />
  <script>
    setTimeout(()=>{
      const codes = document.getElementsByTagName("pre");
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
<nav id="top-nav-bar">
  <DarkCheckBox hydrate-client={{}}/>
  <a href="/"     class={current('/')}     style="color: white;"> 진리의 배 조선소 </a>
  <a href="/lec/" class={current('/lec/')} style="color: white;"> 삶을 풍요롭게 하는 코칭 </a>
</nav>

<article class="container">
  {@html templateHtml}
</article>

<footer class="footer">
  이 블로그는 <a href="https://svelte.dev/">Svelte</a>와 <a class="secondary" href="https://elderguide.com/tech/elderjs/">Elder.js</a>로 만들었습니다.
  <br>
  디자인은 <a href="https://www.getpapercss.com/docs/">PaperCSS</a>를 기본으로 커스텀했습니다.
  <br>
  폰트는 <a href="https://cactus.tistory.com/306">Pretendard</a>를 사용합니다.
  <br>
  <a href="https://pages.github.com/">Github Pages</a>로 호스팅하고 있습니다.
  <br>
  오픈소스 개발자분들과 무료 호스팅 서비스에 감사드립니다. :)
</footer>
