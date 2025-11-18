// ================== CONFIG ==================
const KEYS = {
  // INSERT your keys below
  YT: "",
  GEMINI: "",
  // Optional: GitHub token improves rate limits. Leave "" if you don't have one.
  GITHUB_TOKEN: ""
};


// ================== STATE ==================
const q = new URLSearchParams(location.search).get("q")?.trim();
if(!q){ alert("No query"); location.href="search.html"; }

document.getElementById("queryLabel").textContent = `for “${q}”`;

const ytList = document.getElementById("ytList");
const ghList = document.getElementById("ghList");
const aiSummary = document.getElementById("aiSummary");
const ytMore = document.getElementById("ytMore");
const ghMore = document.getElementById("ghMore");

// cache key
const CK = "builtit_cache_"+q;

// local cache check
let cache = localStorage.getItem(CK);
cache = cache? JSON.parse(cache) : { yt:[], gh:[], summary:"" };

// ================== HELPERS ==================
function liTpl(title,url,extra,src){
return `<li>
  <a href="${url}" target="_blank">${title}</a>
  ${extra?`<div class="muted">${extra}</div>`:""}
  <button class="small explain" data-url="${url}" data-title="${title}">AI info</button>
  <div class="ai-note muted" style="display:none;"></div>
</li>`;
}

function gemEndpoint(){
  return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${KEYS.GEMINI}`;
}

// ================== FETCH PARTS ==================
async function fetchYT(){
  if(cache.yt.length>=20){ ytMore.disabled=true; return; }
  const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(q)}&key=${KEYS.YT}`;
  const r=await fetch(url);
  const d=await r.json();
  d.items.forEach(v=>{
    const title=v.snippet.title;
    const u=`https://www.youtube.com/watch?v=${v.id.videoId}`;
    const e=v.snippet.channelTitle;
    cache.yt.push({title,url:u,extra:e});
  });
  renderYT();
}

async function fetchGH(){
  if(cache.gh.length>=20){ ghMore.disabled=true; return; }
  const page = Math.floor(cache.gh.length/5)+1;
  const headers={Accept:"application/vnd.github+json"};
  if(KEYS.GITHUB_TOKEN) headers.Authorization="Bearer "+KEYS.GITHUB_TOKEN;
  const url=`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=5&page=${page}`;
  const r=await fetch(url,{headers});
  const d=await r.json();
  (d.items||[]).forEach(repo=>{
    cache.gh.push({
      title:repo.full_name+" ★"+repo.stargazers_count,
      url:repo.html_url,
      extra:repo.description||""
    });
  });
  renderGH();
}

// ================== RENDERERS ==================
function renderYT(){
  ytList.innerHTML="";
  cache.yt.forEach(o=>{
    ytList.insertAdjacentHTML("beforeend", liTpl(o.title,o.url,o.extra,"yt"));
  });
}
function renderGH(){
  ghList.innerHTML="";
  cache.gh.forEach(o=>{
    ghList.insertAdjacentHTML("beforeend", liTpl(o.title,o.url,o.extra,"gh"));
  });
}

// ================== AI ==================
async function askMainSummary(){
  if(cache.summary){
    aiSummary.textContent=cache.summary;
    return;
  }
  aiSummary.textContent="Thinking…";
  const prompt=`
Explain topic: "${q}" in 1 short paragraph (5-7 sentences).
First: explain the topic in simple words.
Then: suggest 2 realistic beginner project ideas to start.
`.trim();
  const r=await fetch(gemEndpoint(),{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})
  });
  const d=await r.json();
  const txt=d?.candidates?.[0]?.content?.parts?.[0]?.text||"No summary.";
  cache.summary=txt;
  aiSummary.textContent=txt;
  localStorage.setItem(CK,JSON.stringify(cache));
}

async function oneLineExplain(title,url,mount){
  mount.style.display="block";
  mount.textContent="…";
  const prompt=`
Explain this resource in ONE line:
What it is, why it’s useful, what outcome user gets:
Title: ${title}
URL: ${url}
`.trim();
  const r=await fetch(gemEndpoint(),{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})
  });
  const d=await r.json();
  mount.textContent=d?.candidates?.[0]?.content?.parts?.[0]?.text||"no info";
}

// ================== EVENTS ==================
ytMore.onclick=async()=>{
  await fetchYT();
  localStorage.setItem(CK,JSON.stringify(cache));
};
ghMore.onclick=async()=>{
  await fetchGH();
  localStorage.setItem(CK,JSON.stringify(cache));
};
document.getElementById("aiRefresh").onclick=()=>{
  cache.summary=""; askMainSummary();
};

document.addEventListener("click",e=>{
  const b=e.target.closest(".explain");
  if(!b)return;
  const li=b.closest("li");
  const note=li.querySelector(".ai-note");
  oneLineExplain(b.dataset.title,b.dataset.url,note);
});

// ================== INIT ==================
(async function(){
  renderYT(); renderGH(); // if any cache exists
  if(cache.yt.length===0) await fetchYT();
  if(cache.gh.length===0) await fetchGH();
  await askMainSummary();
})();
