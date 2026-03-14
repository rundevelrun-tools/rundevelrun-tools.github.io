const $=`spring:
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
    com.example: DEBUG`,I=`spring.application.name=my-app
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
logging.level.com.example=DEBUG`;function E(t,e="",r=[]){if(t==null)return r.push(`${e}=`),r;if(Array.isArray(t))return t.forEach((n,s)=>{E(n,`${e}[${s}]`,r)}),r;if(typeof t=="object"){for(const n of Object.keys(t)){const s=e?`${e}.${n}`:n;E(t[n],s,r)}return r}return r.push(`${e}=${t}`),r}function j(t){const e=t.split(`
`),r={},n=[{indent:-1,obj:r,key:null}];for(let s=0;s<e.length;s++){const o=e[s],i=o.trimEnd();if(i===""||i.trimStart().startsWith("#"))continue;const l=o.length-o.trimStart().length,c=i.trimStart();for(;n.length>1&&n[n.length-1].indent>=l;)n.pop();const u=n[n.length-1],p=u.obj;if(c.startsWith("- ")){const g=c.slice(2).trim(),a=u.key;a!==null&&p[a]===void 0&&(p[a]=[]);const h=a!==null?p[a]:null;if(Array.isArray(h)){const B=L(g);h.push(B)}}else{const g=c.indexOf(":");if(g===-1)continue;const a=c.slice(0,g).trim(),h=c.slice(g+1).trim();h===""?(p[a]={},n.push({indent:l,obj:p[a],key:a})):p[a]=L(h)}}return r}function L(t){if(t==="true")return!0;if(t==="false")return!1;if(t==="null"||t==="~")return null;const e=Number(t);return!isNaN(e)&&t!==""?e:t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'")?t.slice(1,-1):t}function k(t){try{const e=j(t);return E(e).join(`
`)}catch(e){return`# Error: ${e.message}`}}function S(t,e,r){const n=[],s=e.split(".");for(const l of s){const c=l.match(/^(.+?)\[(\d+)\]$/);c?(n.push(c[1]),n.push(parseInt(c[2],10))):n.push(l)}let o=t;for(let l=0;l<n.length-1;l++){const c=n[l],u=n[l+1];(o[c]===void 0||o[c]===null||typeof o[c]!="object")&&(o[c]=typeof u=="number"?[]:{}),o=o[c]}const i=n[n.length-1];Array.isArray(o),o[i]=r}function O(t){const e={},r=t.split(`
`);for(const n of r){const s=n.trim();if(!s||s.startsWith("#")||s.startsWith("!"))continue;const o=s.indexOf("="),i=s.indexOf(":");let l=-1;if(o===-1&&i===-1)continue;o===-1?l=i:i===-1?l=o:l=Math.min(o,i);const c=s.slice(0,l).trim(),u=s.slice(l+1).trim();S(e,c,w(u))}return e}function w(t){if(t==="true")return!0;if(t==="false")return!1;if(t==="")return null;const e=Number(t);return!isNaN(e)&&t!==""?e:t}function b(t,e=0){const r="  ".repeat(e),n=[];if(Array.isArray(t))for(const s of t)s!==null&&typeof s=="object"?(n.push(`${r}-`),n.push(b(s,e+1))):n.push(`${r}- ${v(s)}`);else if(t!==null&&typeof t=="object")for(const s of Object.keys(t)){const o=t[s];if(o!==null&&typeof o=="object")if(Array.isArray(o)&&o.every(i=>i===null||typeof i!="object")){n.push(`${r}${s}:`);for(const i of o)n.push(`${r}  - ${v(i)}`)}else n.push(`${r}${s}:`),n.push(b(o,e+1));else n.push(`${r}${s}: ${v(o)}`)}return n.join(`
`)}function v(t){if(t==null)return"null";if(typeof t=="boolean"||typeof t=="number")return String(t);const e=String(t);return e.includes(":")||e.includes("#")||e.includes('"')||e.startsWith(" ")||e.endsWith(" ")||e==="true"||e==="false"||e==="null"?`'${e.replace(/'/g,"''")}'`:e}function A(t){try{const e=O(t);return b(e)}catch(e){return`# Error: ${e.message}`}}document.querySelectorAll(".tab-btn").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.tab;document.querySelectorAll(".tab-btn").forEach(r=>{r.classList.toggle("active",r===t),r.classList.toggle("inactive",r!==t)}),document.querySelectorAll(".tab-content").forEach(r=>{r.classList.toggle("hidden",r.id!==`tab-${e}`)})})});const d=document.getElementById("yaml-input"),f=document.getElementById("props-output");d.addEventListener("input",()=>{f.value=d.value.trim()?k(d.value):""});document.getElementById("yp-sample-btn").addEventListener("click",()=>{d.value=$,f.value=k($)});document.getElementById("yp-clear-btn").addEventListener("click",()=>{d.value="",f.value=""});document.getElementById("yp-clear-input-btn").addEventListener("click",()=>{d.value="",f.value=""});document.getElementById("yp-copy-btn").addEventListener("click",async()=>{if(!f.value)return;await navigator.clipboard.writeText(f.value);const t=document.getElementById("yp-copy-btn");t.classList.add("copied"),setTimeout(()=>t.classList.remove("copied"),1500)});const m=document.getElementById("props-input"),y=document.getElementById("yaml-output");m.addEventListener("input",()=>{y.value=m.value.trim()?A(m.value):""});document.getElementById("py-sample-btn").addEventListener("click",()=>{m.value=I,y.value=A(I)});document.getElementById("py-clear-btn").addEventListener("click",()=>{m.value="",y.value=""});document.getElementById("py-clear-input-btn").addEventListener("click",()=>{m.value="",y.value=""});document.getElementById("py-copy-btn").addEventListener("click",async()=>{if(!y.value)return;await navigator.clipboard.writeText(y.value);const t=document.getElementById("py-copy-btn");t.classList.add("copied"),setTimeout(()=>t.classList.remove("copied"),1500)});
