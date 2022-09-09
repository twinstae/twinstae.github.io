<script>
  import '../../assets/style.css';
  import '../../assets/paper.css';
  import '../../assets/hljs-badge.css';

  import DarkCheckBox from '../components/DarkCheckBox.svelte';

  export let templateHtml, request; //, settings;
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
    integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
    crossorigin="anonymous"
  />
  <script>
    setTimeout(() => {
      const codes = document.getElementsByTagName('pre');

      for (const code of codes) {
        code.addEventListener('dblclick', function (e) {
          navigator.clipboard.writeText(code.innerText).then(() => {
            alert('코드를 클립보드에 복사했습니다.');
          });
        });
      }
    }, 500);
  </script>
  <script>
    let is_dark = localStorage.getItem('dark') == 'true';
    document.getElementsByTagName('html')[0].className = is_dark
      ? 'dark'
      : 'light';
  </script>
</svelte:head>
<nav id="top-nav-bar">
  <DarkCheckBox hydrate-client={{}} />
  <a href="/" aria-current={request.slug === '/'}> 진리의 배 조선소 </a>
  <a href="/lec/" aria-current={request.slug === '/lec/'}>
    삶을 풍요롭게 하는 코칭
  </a>
</nav>

<article class="container">
  {@html templateHtml}
</article>

<footer class="footer">
  이 블로그는 <a href="https://svelte.dev/">Svelte</a>와
  <a class="secondary" href="https://elderguide.com/tech/elderjs/">Elder.js</a
  >로 만들었습니다.
  <br />
  디자인은 <a href="https://www.getpapercss.com/docs/">PaperCSS</a>를 기본으로
  커스텀했습니다.
  <br />
  폰트는 <a href="https://cactus.tistory.com/306">Pretendard</a>를 사용합니다.
  <br />
  <a href="https://pages.github.com/">Github Pages</a>로 호스팅하고 있습니다.
  <br />
  오픈소스 개발자분들과 무료 호스팅 서비스에 감사드립니다. :)
</footer>

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
    padding: 0.125rem 0px;
  }
</style>
