// Build One Thing quiz. Formspree form xkjjjzlv receives waitlist + founding clicks.
const FORM = "https://formspree.io/f/xkjjjzlv";
const KEY = "onepath-v3";
// Google Apps Script web app that emails each results signup their result (tools/email-result.gs). Empty = off.
const MAILER = "";
const SRC = document.documentElement.dataset.src||"home";
const gc = (path,title)=>{if(SRC!=="home"){path+="-"+SRC;title+=" ("+SRC+")"}try{window.goatcounter&&goatcounter.count({path,title,event:true})}catch(e){}};
const post = d=>(d={source:SRC,page:location.pathname,...d},fetch(FORM,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(d)}));
const esc = s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

const PATHS={
 dir:{name:"A helpful guide website",line:"A website that lists and compares the best options for one thing people shop for, so they can choose with confidence.",
  builds:["Chooses the exact topic, based on your answers","Builds the whole website for you","Writes the guides and comparison pages","Adds new pages every week","Sends you a plain-English update each week"],
  you:["Say yes to the topic and the website's name","Glance over a few pages each week","Sign up for partner programs that need your real name"]},
 dig:{name:"A shop for helpful downloads",line:"Simple checklists, planners or guides people buy and download, based on what you know.",
  builds:["Finds a problem people are already looking to solve","Writes and designs the first download","Sets up the shop pages","Writes the announcement posts and emails","Tells you weekly what people looked at and bought"],
  you:["Say yes to the product and its price","Read it over before it goes on sale","Open the payment account in your own name"]},
 news:{name:"A weekly email people look forward to",line:"A short, friendly email each week that saves readers time on one subject.",
  builds:["Decides who the readers are and what to cover","Sets up the email list and sign-up page","Researches and writes each week's email","Writes posts to help new readers find it","Tells you weekly how many people read it"],
  you:["Read each email and approve it","Add a personal line now and then if you like","Create the email account in your own name"]},
 face:{name:"A how-to video channel (you never appear)",line:"Short, useful videos on one subject, narrated by a voice and pictures, with no need to show your face.",
  builds:["Picks the subject and studies what people watch","Writes every script and title","Makes the videos with narration and pictures","Uploads them on a schedule","Tells you weekly which videos people liked"],
  you:["Say yes to the channel idea","Create the channel account in your name","Watch videos before they go live, if you want"]},
 tool:{name:"A simple online tool",line:"A small web page that does one handy job, like a calculator or a checklist maker.",
  builds:["Checks that people really want it","Builds the tool, start to finish","Puts it online with a clear welcome page","Writes the instructions","Keeps it running and fixes problems"],
  you:["Say yes to the idea and the name","Try it and tell it what you think","Own the web address and any payment account"]},
 lead:{name:"A local services website",line:"A website for your area that helps neighbors find a trusted local service, like roofers or pet sitters.",
  builds:["Picks a service your area searches for","Builds the website and its local pages","Writes the content and the request form","Lists it on local maps and directories","Tells you weekly how many requests came in"],
  you:["Say yes to the service and town","Have a short chat with one or two local businesses","Register the business listing in your name"]},
 prod:{name:"A done-for-you helping service",line:"One clear service using your experience, like resume help or writing listings, with the AI doing most of the work.",
  builds:["Shapes the service around what you already know","Builds the order page and the questions form","Drafts each piece of work for you","Handles the follow-up emails","Tells you weekly what came in and what's done"],
  you:["Say yes to the service","Look over each piece of work before it's sent","Open the payment account in your own name"]},
 crea:{name:"Short videos where you share what you know",line:"You talk to the camera for a minute or two. The AI handles scripts, editing and posting.",
  builds:["Plans what to talk about each week","Writes your scripts in your voice","Edits your clips and posts them","Builds a simple page where people can follow you","Tells you weekly what people liked"],
  you:["Record short clips on your phone (it gives you the words)","Say yes to anything that's offered","Own the accounts in your name"]},
 comm:{name:"A members' club for people like you",line:"A friendly online group for people in a situation you understand, with guides and weekly topics.",
  builds:["Decides who the club is for and what it offers","Sets up the club and its sign-up page","Writes weekly topics and guides","Welcomes new members by email","Tells you weekly how the club is doing"],
  you:["Say yes to the theme","Pop in and say hello each week","Open the payment and club accounts in your name"]}};
const ORDER=Object.keys(PATHS);
const SECTIONS=["Your time","What you know","Your interests","Your comfort zone","How you like to work"];
const Q=[
 {s:0,id:"hours",t:"slider",q:"About how many hours a week would you like to spend on this?",hint:"Your best guess is fine. You can change it later.",min:1,max:20,unit:"hours a week",lo:{dir:3,dig:2,news:1,tool:2,lead:3},hi:{crea:3,comm:3,face:2,prod:3,news:2}},
 {s:0,id:"when",t:"single",q:"When do you usually have free time?",o:[["Evenings",{dir:1,news:1,face:1,dig:1}],["Weekends",{lead:1,dig:1,tool:1}],["A little here and there",{dir:2,lead:2,dig:1}],["Most days, I'm flexible",{crea:2,comm:2,prod:2}]]},
 {s:0,id:"goal",t:"single",q:"What would make this feel worth it to you?",o:[["Having something of my own that lasts",{dir:2,news:2,tool:2,lead:1}],["Helping real people soon",{prod:3,comm:1}],["Finally finishing one thing",{dir:2,dig:2,lead:1}],["Staying sharp and learning something new",{tool:2,face:1,crea:1}]]},
 {s:0,id:"dropped",t:"single",q:"Have you tried starting something on the side before?",o:[["No, this would be my first",{}],["Once or twice",{dir:1,dig:1}],["A few times, and it didn't stick",{dir:2,lead:2,dig:1}]]},
 {s:1,id:"career",t:"single",q:"What kind of work have you spent the most years doing?",o:[["Office, admin or finance",{dig:2,prod:2}],["Healthcare or caregiving",{comm:2,news:1,dig:1}],["Teaching or training",{comm:2,crea:1,dig:2}],["Trades, building or repairs",{lead:3,face:1}],["Sales, retail or customer service",{prod:2,lead:1,crea:1}],["Security, military or public service",{comm:1,dir:1,dig:1}],["Running my own business",{prod:2,tool:1,lead:1}],["Something else",{}]]},
 {s:1,id:"skills",t:"multi",q:"Which of these come easily to you?",hint:"Tap all that apply, then press Next.",o:[["Writing letters or emails",{news:2,dig:1,dir:1}],["Explaining things patiently",{comm:2,crea:2,dig:1}],["Looking things up and comparing",{dir:3,news:1}],["Talking with people",{prod:2,lead:2,crea:1}],["Making things look nice",{dig:2,crea:1}],["Fixing or building things",{lead:2,face:1}],["Organizing and planning",{dig:2,prod:1}],["Using a computer or phone apps",{tool:2,face:1}]]},
 {s:1,id:"askedfor",t:"text",q:"What do friends or family often ask you for help with?",hint:"Optional. A few words is plenty, like 'gardening' or 'Medicare forms'.",ph:"e.g. fixing up old furniture"},
 {s:1,id:"tech",t:"slider",q:"How comfortable are you with computers?",hint:"Be honest. Your AI CEO does the technical parts either way.",min:0,max:10,unit:"out of 10",lo:{lead:1,prod:1,comm:1,dir:1},hi:{tool:3,face:1,dig:1}},
 {s:2,id:"hobbies",t:"multi",q:"What do you enjoy in your spare time?",hint:"Tap all that apply.",o:[["Gardening or the outdoors",{dir:2,face:1,news:1}],["Cooking or baking",{dig:2,crea:1,news:1}],["Crafts, woodworking or sewing",{dig:2,face:2}],["Travel",{news:2,dir:1}],["Fishing, hunting or sports",{dir:2,face:1}],["Pets",{lead:2,dir:1}],["Reading or history",{news:2,face:1}],["Family and grandkids",{comm:2,dig:1}]]},
 {s:2,id:"local",t:"single",q:"How well do you know your town or area?",o:[["Very well, I know who does good work",{lead:3}],["Pretty well",{lead:1,dir:1}],["Not especially",{news:1,face:1,dig:1}]]},
 {s:2,id:"who",t:"single",q:"Who would you most like to help?",o:[["Everyday folks shopping for something",{dir:2,face:1}],["Small business owners",{tool:2,prod:2}],["People who do the work I used to do",{comm:3,dig:1}],["Neighbors in my area",{lead:3}]]},
 {s:2,id:"problem",t:"text",q:"Is there something people around you often complain about?",hint:"Optional. Your AI CEO uses this to choose a topic.",ph:"e.g. hard to find a reliable handyman"},
 {s:3,id:"budget",t:"single",q:"How much would you be comfortable spending each month on running costs?",hint:"Things like website hosting. You are never charged by this page.",o:[["Nothing for now",{prod:2,crea:1}],["A little",{dir:1,dig:1,news:1}],["A moderate amount",{tool:2,face:1,lead:1}],["More, if it helps it grow",{lead:2,dig:1,comm:1}]]},
 {s:3,id:"patience",t:"slider",q:"How many months would you give it before deciding if it's working?",min:1,max:12,unit:"months",lo:{prod:3,crea:1},hi:{dir:3,news:2,face:2,lead:2}},
 {s:3,id:"pace",t:"single",q:"Which sounds more like you?",o:[["Slow and steady suits me",{dir:2,news:2,face:1}],["I'd like to see something happen soon",{prod:2,dig:2,tool:1}]]},
 {s:3,id:"quiet",t:"single",q:"If things are quiet for the first couple of months, you'd...",o:[["Keep going, that's normal",{dir:2,news:1,lead:1}],["Want to adjust and try again",{dig:2,prod:1,tool:1}],["Probably lose interest",{prod:2}]]},
 {s:4,id:"camera",t:"slider",q:"How would you feel about appearing in short videos?",hint:"0 means no thanks. 10 means happy to.",min:0,max:10,unit:"out of 10",lo:{face:2,dir:2,news:1,tool:1},hi:{crea:4,comm:1}},
 {s:4,id:"selling",t:"single",q:"How do you feel about chatting with customers?",o:[["I enjoy it",{prod:2,lead:2,comm:1}],["Fine once in a while",{dig:1,news:1}],["I'd rather not",{dir:2,face:2,tool:1}]]},
 {s:4,id:"hands",t:"single",q:"How involved would you like to be?",o:[["Just approve things, let it do the rest",{dir:2,face:2,news:1,tool:1}],["Help out a few hours a week",{dig:1,lead:1,prod:1}],["Learn and do some parts myself",{crea:1,comm:1,tool:1}]]},
 {s:4,id:"public",t:"single",q:"Would you like your name on it?",o:[["Yes, I'm happy to be the face",{crea:3,comm:2}],["A different name is fine",{news:1,dig:1}],["I'd rather stay in the background",{dir:2,face:2,lead:1,tool:1}]]}];

let st=JSON.parse(localStorage.getItem(KEY)||"null")||{i:0,a:{}};
if(st.res&&st.storyDone)st.back=true;
const save=()=>localStorage.setItem(KEY,JSON.stringify(st));
const qEl=document.getElementById("q"),rEl=document.getElementById("result");

function contrib(q,val){ // returns {path:pts} and label
 if(q.t==="slider"){const f=(val-q.min)/(q.max-q.min),o={};for(const p of ORDER){const v=(q.lo[p]||0)*(1-f)+(q.hi[p]||0)*f;if(v)o[p]=v}return o}
 if(q.t==="single")return val==null?{}:q.o[val][1];
 if(q.t==="multi"){const o={};(val||[]).forEach(k=>{for(const[p,v]of Object.entries(q.o[k][1]))o[p]=Math.min(3,(o[p]||0)+v)});return o}
 return {}}
function maxFor(q,p){if(q.t==="slider")return Math.max(q.lo[p]||0,q.hi[p]||0);if(q.t==="single")return Math.max(0,...q.o.map(o=>o[1][p]||0));if(q.t==="multi")return Math.min(3,q.o.reduce((s,o)=>s+(o[1][p]||0),0));return 0}
function label(q,val){if(q.t==="slider")return val+" "+(val===1?q.unit.replace("hours","hour").replace("months","month"):q.unit);if(q.t==="single")return q.o[val][0];if(q.t==="multi")return (val||[]).map(k=>q.o[k][0]).join(", ");return val}

function score(){const tot={},dim={},log={};ORDER.forEach(p=>{tot[p]=0;dim[p]=SECTIONS.map(()=>[0,0]);log[p]=[]});
 Q.forEach(q=>{const v=st.a[q.id];const c=contrib(q,v);ORDER.forEach(p=>{const m=maxFor(q,p);dim[p][q.s][1]+=m;const g=c[p]||0;dim[p][q.s][0]+=g;tot[p]+=g;if(g>0&&q.t!=="text")log[p].push([g,q,v])})});
 const pct=p=>SECTIONS.map((_,s)=>{const[g,m]=dim[p][s];return m?Math.round(100*g/m):50});
 const ranked=ORDER.map(p=>{const d=pct(p);return{p,d,fit:Math.round(d.reduce((a,b)=>a+b)/d.length),raw:tot[p]}}).sort((a,b)=>b.fit-a.fit||b.raw-a.raw);
 return{ranked,log}}

function render(){
 if(st.i>=Q.length&&!st.storyDone)return story();
 if(st.i>=Q.length)return done();
 const q=Q[st.i],v=st.a[q.id];rEl.hidden=true;qEl.hidden=false;
 const pctDone=Math.round(100*st.i/Q.length);
 let body="";
 if(q.t==="single")body=q.o.map((o,k)=>`<button class="opt${v===k?" sel":""}" data-k="${k}">${o[0]}</button>`).join("");
 if(q.t==="multi")body=q.o.map((o,k)=>`<button class="opt chk${(v||[]).includes(k)?" sel":""}" data-k="${k}"><span class="box"></span>${o[0]}</button>`).join("");
 if(q.t==="slider"){const val=v??Math.round((q.min+q.max)/2);body=`<div class="sl"><output id="slv">${val} ${q.unit}</output><input type="range" id="rng" min="${q.min}" max="${q.max}" value="${val}"><div class="slab"><span>${q.min}</span><span>${q.max}${q.max===20?"+":""}</span></div></div>`}
 if(q.t==="text")body=`<input class="txt" id="txt" maxlength="80" placeholder="${esc(q.ph)}" value="${esc(v||"")}">`;
 const needNext=q.t!=="single";
 qEl.innerHTML=`<div class="bar"><i style="width:${pctDone}%"></i></div>
 <p class="prog">${SECTIONS[q.s]} · Question ${st.i+1} of ${Q.length}</p><h2>${q.q}</h2>${q.hint?`<p class="hint">${q.hint}</p>`:""}${body}
 <div class="nav">${st.i?'<button class="back" id="back">← Go back</button>':"<span></span>"}${needNext?`<button class="btn" id="next">${q.t==="text"&&!v?"Skip":"Next"} <span>→</span></button>`:""}</div>`;
 const go=()=>{st.i++;save();render();document.getElementById("quiz").scrollIntoView({behavior:"smooth",block:"start"})};
 if(q.t==="single")qEl.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{st.a[q.id]=+b.dataset.k;go()});
 if(q.t==="multi")qEl.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const k=+b.dataset.k,a=st.a[q.id]||[];st.a[q.id]=a.includes(k)?a.filter(x=>x!==k):[...a,k];b.classList.toggle("sel");save()});
 if(q.t==="slider"){const r=document.getElementById("rng");st.a[q.id]=+r.value;r.oninput=()=>{st.a[q.id]=+r.value;document.getElementById("slv").textContent=r.value+" "+q.unit;save()}}
 if(q.t==="text"){const t=document.getElementById("txt");t.oninput=()=>{st.a[q.id]=t.value.trim();document.getElementById("next").firstChild.textContent=t.value.trim()?"Next ":"Skip ";save()}}
 const n=document.getElementById("next");if(n)n.onclick=go;
 const b=document.getElementById("back");if(b)b.onclick=()=>{st.i--;save();render()};
}

const STORY=[["overwhelm","What feels overwhelming right now?"],["feel","What do you wish making money could feel like?"],["other","Anything else you're going through that we should know?"]];
function story(){rEl.hidden=true;qEl.hidden=false;const s=st.story||{};
 qEl.innerHTML=`<div class="bar"><i style="width:97%"></i></div><p class="prog">Last step · optional</p><h2>In your own words</h2>
 <p class="hint">Only if you'd like. Your answers stay in this browser and are used to personalize your plan. They're only sent to us if you join the waitlist.</p>
 ${STORY.map(([k,l])=>`<label class="lbl" for="st-${k}">${l}</label><textarea class="txt area" id="st-${k}" maxlength="400" rows="3">${esc(s[k]||"")}</textarea>`).join("")}
 <div class="nav story-nav"><button class="back" id="back">← Go back</button><span class="two"><button class="btn alt" id="skip">Skip</button><button class="btn" id="see">See my result <span>→</span></button></span></div>`;
 const read=()=>{const o={};STORY.forEach(([k])=>{const v=document.getElementById("st-"+k).value.trim();if(v)o[k]=v});return o};
 STORY.forEach(([k])=>document.getElementById("st-"+k).oninput=()=>{st.story=read();save()});
 document.getElementById("back").onclick=()=>{st.i=Q.length-1;save();render()};
 const fin=skip=>{st.story=skip?{}:read();const filled=Object.keys(st.story).length>0;gc(filled?"story-filled":"story-skipped",filled?"Story filled":"Story skipped");st.storyDone=true;save();render();document.getElementById("quiz").scrollIntoView({behavior:"smooth",block:"start"})};
 document.getElementById("skip").onclick=()=>fin(true);document.getElementById("see").onclick=()=>fin(false)}
const snip=t=>{t=t.replace(/\s+/g," ").trim().replace(/[.!?,;:]+$/,"");const w=t.split(" ");return w.length>12?w.slice(0,12).join(" ")+"…":t};
// ---- richer result content ----
const HOBBY=["gardening","home cooking and baking","crafts and woodworking","travel","fishing and the outdoors","pets","history and books","family life"];
const CAREER=["office and admin work","healthcare and caregiving","teaching","the trades","sales and customer service","security and public service","running a small business",null];
const ger=v=>({get:"getting",put:"putting",set:"setting",run:"running",shop:"shopping",plan:"planning"}[v]||(/[^e]e$/.test(v)&&v!=="see"?v.slice(0,-1)+"ing":v+"ing"));
const clip=t=>{t=(t||"").replace(/\s+/g," ").trim().replace(/^["'“‘]+|["'”’]+$/g,"").replace(/[.!?,;:…]+$/,"").trim();if(t.length>50)t=t.slice(0,50).replace(/\s\S*$/,"");if(!t)return"";
 t=t.split(/,|;| - | and the | but | because /)[0].trim();
 if(!/^[A-Z]{2,}/.test(t)&&!/^(I|Medicare|Medicaid|Social Security|Amazon|Facebook|Google|YouTube|Etsy|eBay|Ohio|Columbus|Christmas|VA|iPhone|Android|Windows)\b/.test(t))t=t.charAt(0).toLowerCase()+t.slice(1);
 t=t.replace(/^(it'?s |it is |people say |people find it )/i,"");
 let m=t.match(/^(?:(?:really |so |too )?(?:hard|difficult|tough|impossible) to|(?:can'?t|cannot|can not|never) (?:seem to )?)\s*(\w+)\s+(.*)$/i);if(m)t=ger(m[1].toLowerCase())+" "+m[2];
 m=t.match(/^(?:no|not enough|there'?s no|there are no|lack of) (good |reliable |honest |affordable )?(.*)$/i);if(m){const rest=(m[1]||"good ")+m[2];t="finding "+(/^\S+\s+\S*s\b/.test(rest)||/^\S+s\b/.test(m[2])?"":"a ")+rest}
 t=t.replace(/^(getting|finding) anyone\b/,"$1 someone");
 return t};
function ctx(){const a=st.a;return{t:clip(a.askedfor),p:clip(a.problem),h:(a.hobbies||[]).map(k=>HOBBY[k]),c:a.career!=null?CAREER[a.career]:null,local:a.local===0||a.local===1}}
const IDEAS={
 dir:[c=>c.t&&`Everything people want to know about ${c.t}`,c=>c.h[0]&&`A guide to the best ${c.h[0]} spots and gear around your area`,c=>c.p&&`Honest help with ${c.p}`,c=>c.local&&`A guide to trusted local services in your town`,c=>c.c&&`A resource guide for people working in ${c.c}`,
  ()=>"A guide to the best fishing spots around your area",()=>"Medicare made simple for first-timers",()=>"Home repair help for older homes",()=>"The best tools for new gardeners"],
 dig:[c=>c.t&&`An easy printable guide to ${c.t}`,c=>c.h[0]&&`Printable planners for ${c.h[0]}`,c=>c.c&&`Ready-to-use templates for people in ${c.c}`,c=>c.p&&`A step-by-step checklist for ${c.p}`,
  ()=>"A retirement paperwork checklist",()=>"A printable meal planner for two",()=>"A home maintenance calendar for every season"],
 news:[c=>c.t&&`A weekly email of tips on ${c.t}`,c=>c.h[0]&&`A Sunday email for people who love ${c.h[0]}`,c=>c.local&&`A weekly "what's on this week" email for your town`,c=>c.c&&`Weekly news and tips for people in ${c.c}`,
  ()=>"A season-by-season garden email",()=>"A local history story every week",()=>"Weekly tips for getting the most out of retirement"],
 face:[c=>c.t&&`Short how-to videos about ${c.t}`,c=>c.h[0]&&`Calm explainer videos about ${c.h[0]}`,c=>c.c&&`Story videos: what years in ${c.c} teach you`,c=>c.p&&`Short videos on ${c.p}, explained simply`,
  ()=>"Easy home fixes, explained step by step",()=>"History stories in five minutes",()=>"Beginner gardening tips"],
 tool:[c=>c.t&&`A simple online helper for ${c.t}`,c=>c.p&&`A small online helper for ${c.p}`,c=>c.c&&`A handy checklist maker for people in ${c.c}`,c=>c.h[0]&&`A planner tool for ${c.h[0]}`,
  ()=>"A 'how much paint do I need' calculator",()=>"A medication schedule maker",()=>"A garden planting-date finder"],
 lead:[c=>c.local&&`A "find a trusted handyman" site for your town`,c=>c.p&&`A local site for ${c.p} in your town`,c=>c.h[0]&&`A local finder for ${c.h[0]} shops and services`,c=>c.c==="the trades"&&`A local site for the trade you know best`,
  ()=>"Find a reliable pet sitter in your area",()=>"Trusted roofers and gutter cleaners near you",()=>"A local lawn care finder"],
 prod:[c=>c.t&&`A done-for-you service helping people with ${c.t}`,c=>c.c&&`A service built on your experience in ${c.c}`,c=>c.p&&`A service that takes ${c.p} off people's plates`,
  ()=>"Resume refresh for people changing careers",()=>"Writing online listings for local shops",()=>"Family history write-ups"],
 crea:[c=>c.t&&`Short videos sharing your know-how on ${c.t}`,c=>c.h[0]&&`A friendly "${c.h[0]} with me" video series`,c=>c.c&&`Stories and lessons from your years in ${c.c}`,
  ()=>"Classic recipes in one minute",()=>"Tips from a lifetime of fixing things",()=>"Gardening through the seasons"],
 comm:[c=>c.c&&`A club for people who worked in ${c.c}`,c=>c.t&&`A members' group learning about ${c.t} together`,c=>c.h[0]&&`A ${c.h[0]} club with weekly topics`,
  ()=>"A club for new retirees finding their rhythm",()=>"A support circle for family caregivers",()=>"A morning group for small business owners"]};
function ideasFor(p){const c=ctx(),out=[];if(c.p&&c.p===c.t)c.p="";for(const f of IDEAS[p]){const v=f(c);if(v&&!out.includes(v))out.push(v);if(out.length>=4)break}return out}
const MORE={
 dir:{how:"Your AI CEO builds a website that answers the questions people search for on one topic, like which tools to buy or which local services to trust. It adds helpful pages every week so more people find it on Google over time.",
  money:[["Display ads","Small ads shown on your pages. Ad networks pay based on how many people visit."],["Affiliate links","When a reader buys something you recommend through your link, the store pays a small commission."],["Featured listings","Local businesses pay to be highlighted at the top of a page."],["A paid downloadable guide","A deeper guide readers can buy and download."]],
  road:[["Month 1","Your AI CEO picks the topic, builds the site and publishes the first 20 pages."],["Months 2–3","50+ pages, an email sign-up, and the first visitors from Google."],["Months 4–6","First ad or affiliate income becomes possible. First outreach to local sponsors."],["Months 7–12","Grow the pages that work best, and possibly add a paid guide."]]},
 dig:{how:"Your AI CEO creates a simple download, like a checklist or planner, that solves one problem people already look for help with. It sets up a small shop page and tells people about it.",
  money:[["Product sales","People pay once and download the file right away."],["Bundles","Several related downloads sold together."],["Custom versions","A personalized version for people who want extra help."],["Affiliate links","Recommending related tools and earning a small commission."]],
  road:[["Month 1","Topic chosen, first download written and designed, shop page live."],["Months 2–3","Two or three more products, an email list, first visitors."],["Months 4–6","First sales possible. Improve the products people look at most."],["Months 7–12","Bundles, more products, and sharing in more places."]]},
 news:{how:"Your AI CEO writes a short, friendly email every week on one subject and sends it to people who sign up. It also writes posts that help new readers find it.",
  money:[["Sponsorships","A business pays to be mentioned in your email."],["A paid edition","Readers who want extra pay a small monthly fee."],["Affiliate recommendations","A small commission when readers buy something you suggest."],["Classified ads","Small paid notices from readers or local businesses."]],
  road:[["Month 1","Topic and reader chosen, sign-up page live, first four emails sent."],["Months 2–3","A steady weekly rhythm and the first hundred readers is the goal."],["Months 4–6","First sponsor conversations become possible as readers grow."],["Months 7–12","Grow the reader list and possibly add a paid edition."]]},
 face:{how:"Your AI CEO writes and makes short videos with a narrator voice and pictures, so you never need to appear. It uploads them on a schedule and learns from what people watch.",
  money:[["Platform ad share","Video sites share ad money with channels once they qualify."],["Sponsorships","Companies pay for a short mention in a video."],["Affiliate links","Links in the description earn a commission on purchases."],["A paid guide","A deeper guide or class viewers can buy."]],
  road:[["Month 1","Channel set up, first 8 videos published."],["Months 2–3","30+ videos and the first subscribers."],["Months 4–6","Focus on the topics people watch most. Affiliate income possible."],["Months 7–12","Possibly qualify for the platform's ad sharing, and approach sponsors."]]},
 tool:{how:"Your AI CEO builds a small, easy web page that does one handy job, like a calculator or a schedule maker. It keeps it running and improves it based on how people use it.",
  money:[["Extra features","Free to use, with a small fee for extras."],["One-time unlock","Pay once for the full version."],["Ads","Small ads on the tool's page."],["Affiliate links","Recommending related products people need next."]],
  road:[["Month 1","Idea checked, first version built and online."],["Months 2–3","Improvements from feedback, a welcome page, first users."],["Months 4–6","A paid extra or unlock becomes possible."],["Months 7–12","Grow what people use most, possibly add a second tool."]]},
 lead:{how:"Your AI CEO builds a website for your area that helps people find a trusted local service. When someone asks for help, the request goes to a good local business.",
  money:[["Pay per request","Local businesses pay for each customer request they receive."],["Featured spot","A business pays monthly to be the top recommendation."],["Renting the site","One business pays to have the whole site send requests to them."]],
  road:[["Month 1","Service and town chosen, site built, request form live."],["Months 2–3","Local pages, map listings, first requests start to come in."],["Months 4–6","First conversations with local businesses about paying for requests."],["Months 7–12","Add nearby towns or a second service."]]},
 prod:{how:"You offer one clear service based on what you know, at one set price. Your AI CEO builds the order page, drafts the work, and you check it before it goes out.",
  money:[["Per-order price","Customers pay a set price for each job."],["Packages","A bundle of several jobs at once."],["Repeat clients","Some customers come back every month."]],
  road:[["Month 1","Service shaped and priced, order page live."],["Months 2–3","First orders possible. Improve the process with each one."],["Months 4–6","Add a package, collect kind words from happy customers."],["Months 7–12","Grow through referrals and a second related service."]]},
 crea:{how:"You record short clips on your phone, and your AI CEO writes the words, edits the videos and posts them. Over time people who like your style follow along.",
  money:[["Creator programs","Some platforms share money with creators once they qualify."],["Brand sponsorships","Companies pay you to mention their product."],["A simple paid offer","A guide or class for followers who want more."],["Affiliate links","A small commission on things you recommend."]],
  road:[["Month 1","Topics planned, first 10 short videos posted."],["Months 2–3","A steady posting rhythm and first followers."],["Months 4–6","A simple paid guide or class becomes possible."],["Months 7–12","Grow on one platform and possibly talk to sponsors."]]},
 comm:{how:"Your AI CEO sets up a friendly online group for people in one situation you understand. It writes weekly topics and welcomes new members, and you pop in to say hello.",
  money:[["Monthly membership","Members pay a small monthly fee to belong."],["Workshops","Paid sessions on one topic."],["Sponsors","A business that serves your members pays to support the group."]],
  road:[["Month 1","Theme chosen, club set up, first weekly topics ready."],["Months 2–3","First members invited, a weekly routine in place."],["Months 4–6","A paid membership becomes possible once people find it useful."],["Months 7–12","Add workshops and grow by word of mouth."]]}};
const GROW={
 dir:{s:[["Answering real Google questions","New pages each week that answer what people actually type into Google, so they find your site."],["Pinterest pins","Pretty picture pins that link back to your guides, so people discover them while browsing."],["Helpful posts in online groups","Friendly, useful posts for Facebook groups, Reddit and local boards, drafted for you to approve."],["Local partners","Teaming up with local businesses and newsletters that share your guides."],["An email list","A simple sign-up so readers come back each time there's a new guide."]],mile:"Steady visitors from Google and pins are the aim."},
 dig:{s:[["Searchable shop listings","Product pages written the way buyers search, so they show up."],["Pinterest pins","Picture pins that show your downloads and link to the shop."],["Helpful posts in online groups","Useful tips in groups where your buyers gather, drafted for you to approve."],["A free sample","A small free download that brings people onto your email list."]],mile:"Regular shop visitors from pins and search are the aim."},
 news:{s:[["Swaps with similar newsletters","You and another newsletter recommend each other to your readers."],["Referral rewards","Readers who share your email with friends get a small thank-you, like a bonus guide."],["Snippets on social media","Short bits of each issue posted online with a sign-up link."],["Helpful posts in online groups","Useful posts in groups where your readers gather, drafted for you to approve."]],mile:"A growing list of regular readers is the aim."},
 face:{s:[["Searchable titles","Video titles and descriptions written around what people search for."],["Short clips","Bite-size versions posted on other video apps to bring viewers back."],["Posting on a steady schedule","Regular uploads, which video sites tend to reward."],["Helpful posts in online groups","Sharing useful videos where people ask about your topic, drafted for you to approve."]],mile:"Regular viewers and subscribers are the aim."},
 tool:{s:[["Answering real Google questions","A welcome page and help pages that match what people search for."],["Tool directories","Listing your tool on sites where people look for handy tools."],["Helpful posts in online groups","Sharing the tool where people ask for help with that job, drafted for you to approve."],["Word of mouth","A simple share button so happy users can pass it on."]],mile:"A steady stream of people using the tool is the aim."},
 lead:{s:[["Google Business Profile","A free listing so you show up on Google Maps in your area."],["Local directories","Listing the site on local business directories and maps."],["Reviews","Kindly asking happy customers to leave a review, which helps others trust the site."],["Local community boards","Helpful posts on neighborhood groups and boards, drafted for you to approve."]],mile:"Regular requests from neighbors are the aim."},
 prod:{s:[["A clear, searchable order page","Written the way people search for this kind of help."],["Helpful posts in online groups","Useful advice where your customers gather, drafted for you to approve."],["Referrals","A small thank-you for customers who send a friend."],["Kind words from customers","Real reviews from happy customers shown on your page, with their permission."]],mile:"A steady trickle of inquiries is the aim."},
 crea:{s:[["Searchable titles and captions","Written around what people look for, so new viewers find you."],["Posting on a steady schedule","Regular short videos, which apps tend to reward."],["Short clips on more than one app","The same video shared in a few places to reach more people."],["Joining the conversation","Friendly replies to comments, drafted for you to approve."]],mile:"A growing group of regular followers is the aim."},
 comm:{s:[["A free taster","A free guide or open session that invites people in."],["Helpful posts in online groups","Useful posts where people like your members gather, drafted for you to approve."],["Member invites","Members can invite a friend to join."],["Partners","Teaming up with groups or newsletters that serve the same people."]],mile:"A small, active group of members is the aim."}};

const shown=x=>Math.round(40+0.6*x);
const fitLabel=x=>x>=80?"Strong fit":x>=65?"Good fit":"Promising fit";

function done(){
 const{ranked,log}=score(),w=ranked[0],ru=ranked[1],P=PATHS[w.p],R=PATHS[ru.p],M=MORE[w.p],G=GROW[w.p];
 const reasons=log[w.p].sort((a,b)=>b[0]-a[0]).slice(0,4).map(([g,q,v])=>`<li><b>${esc(q.q.replace(/[?.…]+$/,""))}:</b> “${esc(label(q,v))}”</li>`).join("");
 const gaps=SECTIONS.map((s,i)=>[s,w.d[i]-ru.d[i]]).sort((a,b)=>b[1]-a[1])[0];
 const topic=st.a.askedfor,prob=st.a.problem;
 const nicheLine=topic||prob?`<p class="note">Your AI CEO would start by looking into ${topic?`“${esc(topic)}”`:""}${topic&&prob?" and ":""}${prob?`the problem you noticed: “${esc(prob)}”`:""}.</p>`:"";
 const S=st.story||{};const refl=[S.overwhelm?`You said “${esc(snip(S.overwhelm))}” feels like a lot right now. That's why your plan sticks to one thing, and your AI CEO handles the busy work.`:"",S.feel?`You said you'd like it to feel “${esc(snip(S.feel))}”. We'll keep your weekly updates short and calm with that in mind.`:""].filter(Boolean).map(x=>`<p class="note">${x}</p>`).join("");
 qEl.hidden=true;rEl.hidden=false;
 document.getElementById("wlv").value=w.p;
 rEl.innerHTML=`<div class="bar"><i style="width:100%"></i></div><p class="prog">Your one business</p>
 ${st.back?`<div class="welcome" id="welcome"><p class="wt">Welcome back, here's your one business.</p><div class="wb"><a class="btn alt" href="#rs" id="wview">View it</a><button class="back" id="wretake">↺ Retake the quiz</button></div></div>`:""}
 <p class="verdict">${P.name}</p><p class="lede">${P.line}</p>
 <div class="rsign" id="rs"><h3>Email me my result &amp; save my spot</h3><p>We'll email you this plan and put you on the launch list. Free, no card.</p>
 ${st.signed?`<p class="ok big">You're on the launch list. We'll email you your result soon. Thank you!</p>`:`<form id="rsf"><input type="email" name="email" required placeholder="you@email.com" aria-label="Your email"><button class="btn big" type="submit">Email me my result <span>→</span></button></form><p class="err" id="rserr" hidden>Sorry, that didn't go through. Please check your email and try again.</p>`}
 <div class="ropts"><button class="back" id="retry">Not quite right? Try again</button><button class="back" id="prt">🖨 Print / save as PDF</button></div></div>${refl}
 <div class="fit"><div class="fitnum"><b>${shown(w.fit)}</b><span>${fitLabel(shown(w.fit))}</span></div><div class="dims"><p class="dh">Your strengths for this path</p>${SECTIONS.map((s,i)=>[s,w.d[i]]).sort((x,y)=>y[1]-x[1]).map(([s,v],j,arr)=>j===arr.length-1?`<div class="dim covered"><span>${s}</span><em class="cov">Your AI CEO covers this part for you</em></div>`:`<div class="dim"><span>${s}</span><div class="track"><i style="width:${shown(v)}%"></i></div><em>${shown(v)}</em></div>`).join("")}</div></div>
 <h3>How it works</h3><p>${M.how}</p>
 <h3>Example ideas for you</h3><ul class="why">${ideasFor(w.p).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
 <h3>Why this fits you</h3><ul class="why">${reasons}</ul>${nicheLine}
 <h3>Runner-up: ${R.name}</h3><p class="mute">A close second, with a fit of ${shown(ru.fit)}. It came second mainly because of <b>${gaps[0].toLowerCase()}</b>: your first choice matched your answers better there.</p>
 <h3>How it can make money</h3><ul class="money">${M.money.map(([n,d])=>`<li><b>${n}</b><span>${d}</span></li>`).join("")}</ul>
 <p class="warn">Honest note: results vary a lot. Many new online projects earn nothing for months, and some never do. We don't promise or predict any income.</p>
 <h3>How your AI CEO brings people in</h3><ul class="money">${G.s.map(([n,d])=>`<li><b>${n}</b><span>${d}</span></li>`).join("")}</ul>
 <p class="warn">Anything posted under your name gets your OK first. Growth usually takes months, so your AI CEO keeps at it steadily each week.</p>
 <h3>Your 6 to 12 month roadmap</h3><ol class="road">${M.road.map(([t,d],j)=>`<li><b>${t}</b><span>${d}${j===2?" "+G.mile:""}</span></li>`).join("")}</ol>
 <p class="fine">Milestones are possible goals, not promises. Timing depends on your topic and effort.</p>
 <div class="split"><div><h3>What your AI CEO builds and runs</h3><p class="hint">No tech skills needed. Nothing to install.</p><ul class="tick">${P.builds.map(x=>`<li>${x}</li>`).join("")}</ul></div>
 <div><h3>What only you do</h3><ul class="you">${P.you.map(x=>`<li>${x}</li>`).join("")}<li>Read a plain-English weekly update and tap approve</li></ul></div></div>
 <p class="fine">A fit score reflects how well a path matches your answers. It is not a prediction of results or income.</p>
 <div class="nav"><button class="back" id="redo">↺ Retake</button><a class="btn" href="#join">Reserve my build <span>→</span></a></div>`;
 const retake=()=>{gc("retake","Retake quiz");st={i:0,a:{}};save();render();document.getElementById("quiz").scrollIntoView({behavior:"smooth",block:"start"})};
 ["redo","retry","wretake"].forEach(id=>{const b=document.getElementById(id);if(b)b.onclick=retake});
 document.getElementById("prt").onclick=()=>{gc("print","Print result");window.print()};
 const f=document.getElementById("rsf");if(f)f.onsubmit=async e=>{e.preventDefault();const btn=f.querySelector("button");btn.disabled=true;document.getElementById("rserr").hidden=true;
  gc("signup-results","Signup from results");let ok=false;try{const res=await post({email:f.email.value,type:"results_signup",source:"results",result:P.name,verdict:w.p,runner_up:R.name,fit:shown(w.fit),answers:summary(),in_their_words:st.story||{}});ok=res.ok}catch(_){}
  if(ok&&MAILER){fetch(MAILER,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify({email:f.email.value,verdict:w.p})}).catch(()=>{})}
  if(ok){st.signed=true;st.email=f.email.value;save();f.outerHTML=`<p class="ok big" role="status">You're on the launch list! We'll email you your result, ${esc(P.name.toLowerCase())}, soon. Thank you.</p>`;const wl=document.getElementById("wl");wl.email.value=st.email}
  else{btn.disabled=false;document.getElementById("rserr").hidden=false}};
 st.res=P.name;st.back=false;save();
 if(st.counted!==w.p){gc("quiz-done-"+w.p,"Quiz verdict "+w.p);st.counted=w.p;save()}
 window.__result={winner:w.p,runner:ru.p,fit:w.fit};if(st.email)document.getElementById("wl").email.value=st.email;
}
function summary(){const o={};Q.forEach(q=>{const v=st.a[q.id];if(v!=null&&v!==""&&!(Array.isArray(v)&&!v.length))o[q.id]=label(q,v)});return o}
render();
document.getElementById("wl").onsubmit=async e=>{e.preventDefault();const f=e.target;gc("waitlist-submit","Waitlist submit");
 const r=window.__result||{};const b=f.querySelector("button");b.disabled=true;let ok=false;try{ok=(await post({email:f.email.value,type:"waitlist",result:r.winner?PATHS[r.winner].name:"(quiz not finished)",verdict:r.winner||"(quiz not finished)",runner_up:r.runner||"",fit:r.fit||"",answers:summary(),in_their_words:st.story||{}})).ok}catch(_){}
 b.disabled=false;if(ok){f.hidden=true;document.getElementById("wlmsg").hidden=false}else alert("Sorry, that didn't go through. Please check your email and try again.")};
document.getElementById("found").onclick=e=>{gc("founding-click","Founding $49 click");const em=document.getElementById("wl").email.value;const r=window.__result||{};
 post({type:"founding_click",email:em||"(none)",verdict:r.winner||"",answers:summary(),in_their_words:st.story||{}}).catch(()=>{});e.target.hidden=true;document.getElementById("fmsg").hidden=false};
