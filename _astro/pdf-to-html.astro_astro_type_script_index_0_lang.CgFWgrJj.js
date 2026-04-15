import{G as O,g as A}from"./pdf.CCSKr6-4.js";O.workerSrc="/pdf.worker.min.mjs";let i="",B="converted";const d=document.getElementById("upload-area"),y=document.getElementById("file-input"),U=document.getElementById("status-area"),P=document.getElementById("status-message"),k=document.getElementById("progress-bar-wrapper"),j=document.getElementById("progress-bar"),$=document.getElementById("output-section"),h=document.getElementById("preview-content"),T=document.getElementById("source-output"),r=document.getElementById("btn-copy"),b=document.getElementById("btn-download"),m=document.getElementById("btn-clear"),L=document.getElementById("tab-preview"),w=document.getElementById("tab-source"),C=document.getElementById("panel-preview"),H=document.getElementById("panel-source"),f=document.getElementById("copy-source-btn");L.addEventListener("click",()=>{L.classList.add("active"),w.classList.remove("active"),C.classList.remove("hidden"),H.classList.add("hidden")});w.addEventListener("click",()=>{w.classList.add("active"),L.classList.remove("active"),H.classList.remove("hidden"),C.classList.add("hidden")});d.addEventListener("click",()=>y.click());d.addEventListener("dragover",e=>{e.preventDefault(),d.classList.add("drag-over")});d.addEventListener("dragleave",()=>{d.classList.remove("drag-over")});d.addEventListener("drop",e=>{e.preventDefault(),d.classList.remove("drag-over");const t=e.dataTransfer?.files[0];t&&t.type==="application/pdf"?R(t):l("error","Please drop a valid PDF file.")});y.addEventListener("change",()=>{const e=y.files?.[0];e&&R(e)});r.addEventListener("click",async()=>{if(i)try{await navigator.clipboard.writeText(i);const e=r.innerHTML;r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3FB950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!',setTimeout(()=>{r.innerHTML=e},2e3)}catch{}});b.addEventListener("click",()=>{if(!i)return;const e=new Blob([i],{type:"text/html"}),t=URL.createObjectURL(e),c=document.createElement("a");c.href=t,c.download=`${B}.html`,c.click(),URL.revokeObjectURL(t)});m.addEventListener("click",()=>{i="",$.classList.add("hidden"),U.classList.add("hidden"),y.value="",r.disabled=!0,b.disabled=!0,m.disabled=!0,L.classList.add("active"),w.classList.remove("active"),C.classList.remove("hidden"),H.classList.add("hidden")});f.addEventListener("click",async()=>{if(T.value)try{await navigator.clipboard.writeText(T.value);const e=f.innerHTML;f.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3FB950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',setTimeout(()=>{f.innerHTML=e},2e3)}catch{}});function l(e,t){U.classList.remove("hidden"),P.textContent=t,P.className=`status-message status-${e}`}function D(e,t){k.classList.remove("hidden"),j.style.width=`${Math.round(e/t*100)}%`}async function R(e){B=e.name.replace(/\.pdf$/i,""),$.classList.add("hidden"),k.classList.add("hidden"),j.style.width="0%",r.disabled=!0,b.disabled=!0,m.disabled=!0,l("info",`Loading "${e.name}"...`);try{const t=await e.arrayBuffer(),c=await A({data:t}).promise,s=c.numPages;l("info",`Converting ${s} page${s>1?"s":""}...`),k.classList.remove("hidden");const p=[];for(let n=1;n<=s;n++){D(n-1,s),l("info",`Converting page ${n} of ${s}...`);const a=await c.getPage(n),g=a.getViewport({scale:1.5}),u=document.createElement("canvas");u.width=g.width,u.height=g.height;const N=u.getContext("2d");await a.render({canvasContext:N,viewport:g}).promise;const F=u.toDataURL("image/jpeg",.85),S=(await a.getTextContent()).items,v=new Map;for(const o of S){if(!o.str.trim())continue;const x=Math.round(g.height-o.transform[5]),E=Math.round(x/8)*8;v.has(E)||v.set(E,[]),v.get(E).push(o.str)}const M=Array.from(v.entries()).sort((o,x)=>o[0]-x[0]).map(([,o])=>o.join(" ").trim()).filter(Boolean),z=M.length>0?M.map(o=>`    <p>${I(o)}</p>`).join(`
`):"    <p><em>No text extracted from this page.</em></p>";p.push(`  <section class="pdf-page" id="page-${n}">
    <h2 class="page-number">Page ${n}</h2>
    <div class="page-visual">
      <img src="${F}" alt="Visual render of page ${n}" loading="lazy" />
    </div>
    <div class="page-text">
      <h3>Extracted Text</h3>
`+z+`
    </div>
  </section>`),D(n,s)}i=V(B,p),h.innerHTML=G(p.length),h.querySelectorAll("img[data-src]").forEach(n=>{const a=n;a.src=a.dataset.src}),h.innerHTML="";for(let n=0;n<p.length;n++){const a=document.createElement("div");a.innerHTML=p[n],h.appendChild(a.firstElementChild)}T.value=i,$.classList.remove("hidden"),r.disabled=!1,b.disabled=!1,m.disabled=!1,l("success",`Done! ${s} page${s>1?"s":""} converted.`)}catch(t){l("error",`Conversion failed: ${t?.message||"Unknown error. The PDF may be password-protected or corrupted."}`),m.disabled=!1}}function I(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function G(e){return`<p>${e} pages converted.</p>`}function V(e,t){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${I(e)}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 900px; margin: 0 auto; padding: 20px; background: #fff; color: #1a1a1a; }
    .pdf-page { border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; margin-bottom: 32px; }
    .page-number { font-size: 13px; color: #888; font-family: monospace; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; margin: 0 0 16px; }
    .page-visual img { width: 100%; height: auto; border: 1px solid #e0e0e0; border-radius: 4px; display: block; }
    .page-text { margin-top: 20px; padding-top: 16px; border-top: 1px solid #f0f0f0; }
    .page-text h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; margin: 0 0 12px; }
    .page-text p { margin: 4px 0; font-size: 14px; line-height: 1.6; color: #333; }
    .page-text em { color: #aaa; }
    /* Generated by RUN:DEVEL:RUN — tools.rundevelrun.com */
  </style>
</head>
<body>
  <header style="text-align:center; margin-bottom:32px;">
    <h1 style="font-size:20px; color:#333;">${I(e)}</h1>
    <p style="font-size:12px; color:#aaa;">Converted by <a href="https://tools.rundevelrun.com/tools/pdf-to-html" style="color:#aaa;">RUN:DEVEL:RUN PDF to HTML Converter</a></p>
  </header>
${t.join(`
`)}
</body>
</html>`}
