var keyword_dict = {
  "SEO": {
    definition: "Search Engine Optimization 검색엔진 최적화\n 사이트를 검색엔진이 읽기 쉽게 구조화하는 것.",
    link: "",
  },
  "Trade-Off": {
    definition: "교환 관계\n 어떤 언어나 기술을 선택했을 때 얻는 게 있으면, 잃는 것도 있다는 뜻.",
    link: "",
  },
  "CSR" : {
    definition: "Client Side Rendering\n 웹 브라우저에서 직접 Dom을 조작해서 동적으로 UI를 그리는 것.",
    link: "",
  },
  "SSR" : {
    definition: "Server Side Rendering\n 서버에서 동적으로 HTML과 CSS를 생성하는 것.",
    link: "https://twinstae.github.io/brief-history-of-web-front/#ssr%EC%9D%B4-spa%EC%99%80-%ED%95%A8%EA%BB%98-%EB%B6%80%ED%99%9C%ED%95%98%EB%8B%A4---nextjs",
  },
  "Static File": {
    definition: "HTML, CSS, JS, 이미지처럼 자주 변하지 않는 파일. 덕분에 쉽게 캐싱할 수 있다.",
    link: "https://twinstae.github.io/brief-history-of-web-front/#static-file-%EC%A0%95%EC%A0%81-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EC%84%9C%EB%B9%99%ED%95%98%EA%B8%B0---%EB%82%98%EB%AA%A8-%EC%9B%B9-%EC%97%90%EB%94%94%ED%84%B0",
  },
  "SSG" : {
    definition: "Static Site Generator 정적 사이트 생성기\n 템플릿이나 SPA를 HTML, CSS 등 정적 파일로 된 사이트로 빌드해준다.",
    link: "",
  },
  "dehydration": {
    definition: "탈수\n 프런트에서는 서버에서 SPA 프레임워크로 rendering한 dom을\n HTML, CSS 같은 마크업 파일로 변환하는 걸 가리킨다.\n 면이나 과일을 건조시키는 것에 비유할 수 있다.",
    link: "",
  },
  "hydration" : {
    definition: "수화\n 서버에서 받아온 html, css를 브라우저에 dom에 등록하고,\n react 같은 SPA 프레임워크가 관리하는 상태로 만드는 걸 의미한다.\n 말려둔 면이나 과일을 물에 넣고 불리는 것에 비유할 수 있다.", 
    link: "",
  },
  "SPA" : {
    definition: "Single Page Application\n 새로고침 없이 JS로 Dom을 조작해서 페이지를 라우팅하고 이동하는 웹 앱이다.",
    link: "https://twinstae.github.io/brief-history-of-web-front/#spa-%EC%9B%B9-%EC%95%B1%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%9E%90---angular-vue-react",
  },
  "JAM Stack": {
    definition: "서버에서 렌더링한 사이트를\n최대한 HTMl 같은 정적 파일로 변환해서 CDN으로 전달하고,\n 사용자와 상호작용하는 동적인 부분만\n JS와 마이크로서비스 API로 전달하는 현대적인 방식.",
    link: "https://twinstae.github.io/brief-history-of-web-front/#%EC%A0%95%EC%A0%81-%ED%8C%8C%EC%9D%BC%EC%9D%B4-%ED%98%84%EB%8C%80-%EA%B8%B0%EC%88%A0%EA%B3%BC-%ED%95%A8%EA%BB%98-%EB%8F%8C%EC%95%84%EC%98%A4%EB%8B%A4---jam",
  },
  "URL": {
    definition: "Uniform Resource Locator\n 웹에 자원의 '위치'를 표시하는 단일 주소 체계. URI의 일부이다.",
    link: "",
  },
  "배포(Deploy)": {
    definition: "사용자에게 프로그램을 전달하는 것\n 웹 사이트를 url로 접속할 수 있는 서버에 올리거나, 앱을 스토어에 올리는 것 등등이 모두 배포다.",
    link: "",
  },
  "CI/CD": {
    definition: "Continuous Intergration/Continuous Deployment 지속적 통합과 배포\n 공동으로 작업하는 코드를 자주 merge해서 통합하고, 보통 1~2주 짧게는 하루에도 몇 번씩 사용자에게 업데이트를 전달한다.",
    link: "",
  },
  "불변": {
    definition: "Immutable 메모리에 저장된 값이나 상태를 '변경'할 수 없는 성질\n 함수형 프로그래밍에서 특히 중요하게 여긴다.",
    link: "",
  },
  "순수 함수": {
    definition: "Pure Function\n 수학에서처럼 같은 입력 X를 넣으면 항상 같은 출력 Y가 나오는 함수\n 입력으로 넣어주지 않은 숨겨진 외부 상태에 따라 값이 달라지면 안 된다.",
    link: "",
  },
  "부작용": {
    definition: "Side Effect 부수효과라고도 한다.\n 함수가 반환(return)하는 결과값 이외에 다른 상태를 마음대로 변경하는 것.",
    link: "",
  },
  "참조 투명성": {
    definition: "Referentially Transparent\n 어떤 함수나 표현식을 반환하는 결과값으로 바꿔치기 해도 똑같이 동작하는 성질\n 외부 상태에 의존하지 않는 순수 함수이며, 예외를 던지거나, 부작용이 없어야한다.", 
    link: "",
  },
  "바닐라JS": {
    definition: "React 같은 SPA 프레임워크를 쓰지 않는 순수JS.\n그냥 JS라 하면 없어보니까 생긴 농담이다.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
};


var tooltip_css = `.tooltip {
  position: relative;
}

.tooltip .tooltiptext {
  max-width: 32rem;
  height: auto;
  text-align: left;
  line-height: 1.2rem;
  background-color: #555;
  color: #fff;
  border-radius: 6px;
  padding: 0.5rem;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  transition: opacity 0.3s;
  visibility: hidden;
  opacity: 0;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}`;

function keyword_html(content){
  const keyword = keyword_dict[content];

  const tooltip_badge = `<span class="badge tooltip" style="background-color: var(--primary)">
     ${content}
     <span class="tooltiptext">${keyword.definition.replace(/\n/g, "<br>")}</span>
  </span>`

  if (keyword.link){
    return `<a href="${keyword.link}" target="_blank">${tooltip_badge}</a>`;
  }
  return tooltip_badge;
}

module.exports = {
    shortcode: 'keyword',
    run: async ({ content }) => {
      return {
        html: keyword_html(content),
        css: tooltip_css,
      }
    }
}
