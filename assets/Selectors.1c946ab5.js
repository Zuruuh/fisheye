var E=Object.defineProperty;var P=(t,e,r)=>e in t?E(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var f=(t,e,r)=>(P(t,typeof e!="symbol"?e+"":e,r),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();const d=class{static get(e){return d.cache[e]}static has(e){return Boolean(d.cache[e])}static set(e,r){d.cache[e]=r}};let i=d;f(i,"cache",{});class m{async load(){const e=await(await fetch("./data/data.json")).json();Object.entries(e).forEach(([r,n])=>i.set(r,n))}}class g{async all(){return await this.ensureCacheIsLoaded(),i.get(this.getCacheKey())}async get(e){var r;return(r=(await this.all()).find(n=>n.id===e))!=null?r:null}cacheLoaded(){return i.has(this.getCacheKey())}async ensureCacheIsLoaded(){i.has(this.getCacheKey())||await new m().load()}}class N extends g{getCacheKey(){return"photographers"}}var l=(t=>(t[t.PREPEND=0]="PREPEND",t[t.APPEND=1]="APPEND",t))(l||{});class p{static node(e,r=null){var a,s,o,h;const n=document.createElement(e.tag);if(Object.entries((a=e.attributes)!=null?a:{}).forEach(([c,u])=>n.setAttribute(c,String(u))),Object.entries((s=e.eventListeners)!=null?s:{}).forEach(([c,u])=>n.addEventListener(c,u)),e.text&&(n.textContent=e.text),((o=e.children)!=null?o:[]).forEach(c=>n.appendChild(c instanceof HTMLElement?c:p.node(c))),r){const c={[l.APPEND]:"append",[l.PREPEND]:"prepend"}[(h=e.insertionStrategy)!=null?h:l.APPEND];r[c](n)}return n}}var y=(t=>(t.MAIN="#app",t.PHOTOGRAPH_HEADER=".photograph-header",t.MEDIA_GRID=".media-grid",t.MEDIA_SORTERS=".media-sorters",t.CONTACT_BUTTON="#contact-button",t.CONTACT_MODAL="#contact-modal",t))(y||{});export{p as H,l as I,N as P,y as S,g as a};
