import{S as s,i as a,s as e,e as c,a as t,c as l,g as o,b as n,f as r,h,j as d,k as u,r as i,n as m,u as f,q as k}from"../index-cdf3995b.js";function g(s){let a,e,k,g,p,N,b,x;return{c(){a=c("input"),e=t(),k=c("label"),g=c("span"),p=t(),N=c("span"),this.h()},l(s){a=l(s,"INPUT",{type:!0,id:!0,class:!0}),e=o(s),k=l(s,"LABEL",{for:!0,class:!0});var c=n(k);g=l(c,"SPAN",{class:!0}),n(g).forEach(r),p=o(c),N=l(c,"SPAN",{class:!0}),n(N).forEach(r),c.forEach(r),this.h()},h(){h(a,"type","checkbox"),h(a,"id","darkmode-checkbox"),h(a,"class","svelte-s86u72"),h(g,"class","svelte-s86u72"),h(N,"class","svelte-s86u72"),h(k,"for","darkmode-checkbox"),h(k,"class","svelte-s86u72")},m(c,t){d(c,a,t),a.checked=s[0],d(c,e,t),d(c,k,t),u(k,g),u(k,p),u(k,N),b||(x=[i(a,"change",s[2]),i(a,"change",s[1])],b=!0)},p(s,[e]){1&e&&(a.checked=s[0])},i:m,o:m,d(s){s&&r(a),s&&r(e),s&&r(k),b=!1,f(x)}}}function p(s,a,e){let c=!1;return k((()=>{e(0,c="dark"==document.getElementsByTagName("html")[0].className)})),[c,function(){localStorage.setItem("dark",c),document.getElementsByTagName("html")[0].className=c?"dark":"light"},function(){c=this.checked,e(0,c)}]}export default class extends s{constructor(s){super(),a(this,s,p,g,e,{})}}
