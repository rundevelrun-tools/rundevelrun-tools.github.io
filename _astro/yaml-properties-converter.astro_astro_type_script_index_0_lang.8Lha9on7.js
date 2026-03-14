const $=`spring:
  application:
    name: my-service
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: admin
    password: secret
  profiles:
    active:
      - dev
      - local
server:
  port: 8080
  servlet:
    context-path: /api
logging:
  level:
    root: INFO
    com.example: DEBUG`,k=`spring.application.name=my-service
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=admin
spring.datasource.password=secret
spring.profiles.active[0]=dev
spring.profiles.active[1]=local
server.port=8080
server.servlet.context-path=/api
logging.level.root=INFO
logging.level.com.example=DEBUG`,L=document.querySelectorAll(".tab-btn");L.forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.panel;L.forEach(s=>{const n=s===t;s.classList.toggle("active",n),s.classList.toggle("inactive",!n);const r=s.querySelector("span");r&&(r.classList.toggle("font-semibold",n),r.classList.toggle("font-normal",!n))}),document.getElementById("panel-yaml-to-props").classList.toggle("hidden",e!=="panel-yaml-to-props"),document.getElementById("panel-props-to-yaml").classList.toggle("hidden",e!=="panel-props-to-yaml")})});function h(t){const e=t.trim();return e==="true"?!0:e==="false"?!1:e==="null"||e==="~"?null:/^-?\d+$/.test(e)?parseInt(e,10):/^-?\d+\.\d+$/.test(e)?parseFloat(e):e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1):e}function A(t){const e=t.split(`
`),s={},n=[{indent:-1,container:{__root:s},key:"__root"}];for(const r of e){if(!r.trim()||r.trim().startsWith("#"))continue;const o=r.search(/\S/),a=r.trim();for(;n.length>1&&n[n.length-1].indent>=o;)n.pop();const l=n[n.length-1],c=l.container[l.key];if(a.startsWith("- ")){const p=a.slice(2).trim();Array.isArray(l.container[l.key])||(l.container[l.key]=[]),l.container[l.key].push(h(p))}else if(a.includes(":")){const p=a.indexOf(":"),d=a.slice(0,p).trim(),i=a.slice(p+1).trim();i===""||i==="|"||i===">"?(c[d]={},n.push({indent:o,container:c,key:d})):c[d]=h(i)}}return s}function E(t,e=""){const s=[];if(Array.isArray(t))t.forEach((n,r)=>{const o=`${e}[${r}]`;n!==null&&typeof n=="object"?s.push(...E(n,o)):s.push(`${o}=${n??""}`)});else if(t!==null&&typeof t=="object")for(const[n,r]of Object.entries(t)){const o=e?`${e}.${n}`:n;r!==null&&typeof r=="object"?s.push(...E(r,o)):s.push(`${o}=${r??""}`)}return s}function w(t){try{const e=A(t);return E(e).join(`
`)}catch(e){return`# Error: ${e.message}`}}function T(t){const e={};for(const s of t.split(`
`)){const n=s.trim();if(!n||n.startsWith("#")||n.startsWith("!"))continue;const r=n.indexOf("=");if(r<0)continue;const o=n.slice(0,r).trim(),a=n.slice(r+1).trim(),l=o.split(".").flatMap(i=>{const u=i.match(/^(.+?)\[(\d+)\]$/);return u?[u[1],u[2]]:[i]});let c=e;for(let i=0;i<l.length-1;i++){const u=l[i],b=l[i+1],x=/^\d+$/.test(b);c[u]===void 0&&(c[u]=x?[]:{}),c=c[u]}const p=l[l.length-1],d=h(a);Array.isArray(c)?c.push(d):c[p]=d}return e}function v(t,e=0){const s="  ".repeat(e);let n="";if(Array.isArray(t))for(const r of t)r!==null&&typeof r=="object"?n+=`${s}-
${v(r,e+1)}`:n+=`${s}- ${I(r)}
`;else if(t!==null&&typeof t=="object")for(const[r,o]of Object.entries(t))Array.isArray(o)?n+=`${s}${r}:
${v(o,e+1)}`:o!==null&&typeof o=="object"?n+=`${s}${r}:
${v(o,e+1)}`:n+=`${s}${r}: ${I(o)}
`;return n}function I(t){if(t===null)return"null";if(typeof t=="boolean"||typeof t=="number")return String(t);const e=String(t);return["true","false","null","~"].includes(e)||/^[\d.]+$/.test(e)||e.includes(":")||e.startsWith("{")||e.startsWith("[")?`"${e}"`:e}function B(t){try{const e=T(t);return v(e)}catch(e){return`# Error: ${e.message}`}}const m=document.getElementById("yaml-input"),f=document.getElementById("props-output");m.addEventListener("input",()=>{f.value=m.value.trim()?w(m.value):""});document.getElementById("yp-sample-btn").addEventListener("click",()=>{m.value=$,f.value=w($)});document.getElementById("yp-clear-btn").addEventListener("click",()=>{m.value="",f.value=""});document.getElementById("yp-clear-input-btn").addEventListener("click",()=>{m.value="",f.value=""});document.getElementById("yp-copy-btn").addEventListener("click",async()=>{if(!f.value)return;await navigator.clipboard.writeText(f.value);const t=document.getElementById("yp-copy-btn"),e=t.innerHTML;t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3FB950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',setTimeout(()=>{t.innerHTML=e},2e3)});const y=document.getElementById("props-input"),g=document.getElementById("yaml-output");y.addEventListener("input",()=>{g.value=y.value.trim()?B(y.value):""});document.getElementById("py-sample-btn").addEventListener("click",()=>{y.value=k,g.value=B(k)});document.getElementById("py-clear-btn").addEventListener("click",()=>{y.value="",g.value=""});document.getElementById("py-clear-input-btn").addEventListener("click",()=>{y.value="",g.value=""});document.getElementById("py-copy-btn").addEventListener("click",async()=>{if(!g.value)return;await navigator.clipboard.writeText(g.value);const t=document.getElementById("py-copy-btn"),e=t.innerHTML;t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3FB950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',setTimeout(()=>{t.innerHTML=e},2e3)});
