import{S as n,P as c,H as a,I as e}from"./Selectors.1c946ab5.js";async function l(){const r=document.querySelector(n.MAIN),i=await new c().all(),s=a.node({tag:"div",insertionStrategy:e.APPEND,attributes:{class:"photographers"}},r);i.forEach(t=>a.node({tag:"div",insertionStrategy:e.APPEND,attributes:{class:"photographer"},children:[{tag:"a",attributes:{href:`./photographer.html?id=${t.id}`,"aria-label":t.name},eventListeners:{click:o=>o},children:[{tag:"img",attributes:{src:`./medias/photographers/${t.portrait}`}},{tag:"h2",text:t.name}]},{tag:"div",children:[{tag:"p",text:t.country,attributes:{class:"photographer-location"}},{tag:"p",text:t.tagline,attributes:{class:"photographer-tagline"}},{tag:"p",text:`${t.price}\u20AC/jour`,attributes:{class:"photographer-price"}}]}]},s))}l().catch(console.error);
