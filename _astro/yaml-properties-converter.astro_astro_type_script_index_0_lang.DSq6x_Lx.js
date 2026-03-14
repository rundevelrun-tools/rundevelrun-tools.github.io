const I=`spring:
  application:
    name: my-app
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: secret
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
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
    com.example: DEBUG`,L=`spring.application.name=my-app
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=secret
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.profiles.active[0]=dev
spring.profiles.active[1]=local

server.port=8080
server.servlet.context-path=/api

logging.level.root=INFO
logging.level.com.example=DEBUG`;function E(t,e="",n=[]){if(t==null)return n.push(`${e}=`),n;if(Array.isArray(t))return t.forEach((s,r)=>{E(s,`${e}[${r}]`,n)}),n;if(typeof t=="object"){for(const s of Object.keys(t)){const r=e?`${e}.${s}`:s;E(t[s],r,n)}return n}return n.push(`${e}=${t}`),n}function S(t){const e=t.split(`
`),n={},r=[{indent:-1,container:{__root:n},key:"__root"}];for(let o=0;o<e.length;o++){const i=e[o],c=i.trimEnd();if(c===""||c.trimStart().startsWith("#"))continue;const a=i.length-i.trimStart().length,l=c.trimStart();for(;r.length>1&&r[r.length-1].indent>=a;)r.pop();const u=r[r.length-1],g=u.container[u.key];if(l.startsWith("- ")){const y=l.slice(2).trim();Array.isArray(u.container[u.key])||(u.container[u.key]=[]),u.container[u.key].push(k(y))}else{const y=l.indexOf(":");if(y===-1)continue;const h=l.slice(0,y).trim(),$=l.slice(y+1).trim();$===""?(g[h]={},r.push({indent:a,container:g,key:h})):g[h]=k($)}}return n}function k(t){if(t==="true")return!0;if(t==="false")return!1;if(t==="null"||t==="~")return null;const e=Number(t);return!isNaN(e)&&t!==""?e:t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'")?t.slice(1,-1):t}function A(t){try{const e=S(t);return E(e).join(`
`)}catch(e){return`# Error: ${e.message}`}}function W(t,e,n){const s=[],r=e.split(".");for(const c of r){const a=c.match(/^(.+?)\[(\d+)\]$/);a?(s.push(a[1]),s.push(parseInt(a[2],10))):s.push(c)}let o=t;for(let c=0;c<s.length-1;c++){const a=s[c],l=s[c+1];(o[a]===void 0||o[a]===null||typeof o[a]!="object")&&(o[a]=typeof l=="number"?[]:{}),o=o[a]}const i=s[s.length-1];Array.isArray(o),o[i]=n}function j(t){const e={},n=t.split(`
`);for(const s of n){const r=s.trim();if(!r||r.startsWith("#")||r.startsWith("!"))continue;const o=r.indexOf("="),i=r.indexOf(":");let c=-1;if(o===-1&&i===-1)continue;o===-1?c=i:i===-1?c=o:c=Math.min(o,i);const a=r.slice(0,c).trim(),l=r.slice(c+1).trim();W(e,a,w(l))}return e}function w(t){if(t==="true")return!0;if(t==="false")return!1;if(t==="")return null;const e=Number(t);return!isNaN(e)&&t!==""?e:t}function b(t,e=0){const n="  ".repeat(e),s=[];if(Array.isArray(t))for(const r of t)r!==null&&typeof r=="object"?(s.push(`${n}-`),s.push(b(r,e+1))):s.push(`${n}- ${v(r)}`);else if(t!==null&&typeof t=="object")for(const r of Object.keys(t)){const o=t[r];if(o!==null&&typeof o=="object")if(Array.isArray(o)&&o.every(i=>i===null||typeof i!="object")){s.push(`${n}${r}:`);for(const i of o)s.push(`${n}  - ${v(i)}`)}else s.push(`${n}${r}:`),s.push(b(o,e+1));else s.push(`${n}${r}: ${v(o)}`)}return s.join(`
`)}function v(t){if(t==null)return"null";if(typeof t=="boolean"||typeof t=="number")return String(t);const e=String(t);return e.includes(":")||e.includes("#")||e.includes('"')||e.startsWith(" ")||e.endsWith(" ")||e==="true"||e==="false"||e==="null"?`'${e.replace(/'/g,"''")}'`:e}function B(t){try{const e=j(t);return b(e)}catch(e){return`# Error: ${e.message}`}}document.querySelectorAll(".tab-btn").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.tab;document.querySelectorAll(".tab-btn").forEach(n=>{n.classList.toggle("active",n===t),n.classList.toggle("inactive",n!==t)}),document.querySelectorAll(".tab-panel").forEach(n=>{n.classList.toggle("hidden",n.id!==`tab-${e}`)})})});const p=document.getElementById("yaml-input"),m=document.getElementById("props-output");p.addEventListener("input",()=>{m.value=p.value.trim()?A(p.value):""});document.getElementById("yp-sample-btn").addEventListener("click",()=>{p.value=I,m.value=A(I)});document.getElementById("yp-clear-btn").addEventListener("click",()=>{p.value="",m.value=""});document.getElementById("yp-clear-input-btn").addEventListener("click",()=>{p.value="",m.value=""});document.getElementById("yp-copy-btn").addEventListener("click",async()=>{if(!m.value)return;await navigator.clipboard.writeText(m.value);const t=document.getElementById("yp-copy-btn");t.classList.add("copied"),setTimeout(()=>t.classList.remove("copied"),1500)});const d=document.getElementById("props-input"),f=document.getElementById("yaml-output");d.addEventListener("input",()=>{f.value=d.value.trim()?B(d.value):""});document.getElementById("py-sample-btn").addEventListener("click",()=>{d.value=L,f.value=B(L)});document.getElementById("py-clear-btn").addEventListener("click",()=>{d.value="",f.value=""});document.getElementById("py-clear-input-btn").addEventListener("click",()=>{d.value="",f.value=""});document.getElementById("py-copy-btn").addEventListener("click",async()=>{if(!f.value)return;await navigator.clipboard.writeText(f.value);const t=document.getElementById("py-copy-btn");t.classList.add("copied"),setTimeout(()=>t.classList.remove("copied"),1500)});
