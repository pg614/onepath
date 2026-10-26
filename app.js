// One Path assessment. Formspree form xkjjjzlv receives waitlist + founding clicks.
const FORM = "https://formspree.io/f/xkjjjzlv";
const KEY = "onepath-v3";
const gc = (path,title)=>{try{window.goatcounter&&goatcounter.count({path,title,event:true})}catch(e){}};
const post = d=>fetch(FORM,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(d)});
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
 {s:1,id:"tech",t:"slider",q:"How comfortable are you with computers?",hint:"Be honest. Your AI partner does the technical parts either way.",min:0,max:10,unit:"out of 10",lo:{lead:1,prod:1,comm:1,dir:1},hi:{tool:3,face:1,dig:1}},
 {s:2,id:"hobbies",t:"multi",q:"What do you enjoy in your spare time?",hint:"Tap all that apply.",o:[["Gardening or the outdoors",{dir:2,face:1,news:1}],["Cooking or baking",{dig:2,crea:1,news:1}],["Crafts, woodworking or sewing",{dig:2,face:2}],["Travel",{news:2,dir:1}],["Fishing, hunting or sports",{dir:2,face:1}],["Pets",{lead:2,dir:1}],["Reading or history",{news:2,face:1}],["Family and grandkids",{comm:2,dig:1}]]},
 {s:2,id:"local",t:"single",q:"How well do you know your town or area?",o:[["Very well, I know who does good work",{lead:3}],["Pretty well",{lead:1,dir:1}],["Not especially",{news:1,face:1,dig:1}]]},
 {s:2,id:"who",t:"single",q:"Who would you most like to help?",o:[["Everyday folks shopping for something",{dir:2,face:1}],["Small business owners",{tool:2,prod:2}],["People who do the work I used to do",{comm:3,dig:1}],["Neighbors in my area",{lead:3}]]},
 {s:2,id:"problem",t:"text",q:"Is there something people around you often complain about?",hint:"Optional. Your AI partner uses this to choose a topic.",ph:"e.g. hard to find a reliable handyman"},
 {s:3,id:"budget",t:"single",q:"How much would you be comfortable spending each month on running costs?",hint:"Things like website hosting. You are never charged by this page.",o:[["Nothing for now",{prod:2,crea:1}],["A little",{dir:1,dig:1,news:1}],["A moderate amount",{tool:2,face:1,lead:1}],["More, if it helps it grow",{lead:2,dig:1,comm:1}]]},
 {s:3,id:"patience",t:"slider",q:"How many months would you give it before deciding if it's working?",min:1,max:12,unit:"months",lo:{prod:3,crea:1},hi:{dir:3,news:2,face:2,lead:2}},
 {s:3,id:"pace",t:"single",q:"Which sounds more like you?",o:[["Slow and steady suits me",{dir:2,news:2,face:1}],["I'd like to see something happen soon",{prod:2,dig:2,tool:1}]]},
 {s:3,id:"quiet",t:"single",q:"If things are quiet for the first couple of months, you'd...",o:[["Keep going, that's normal",{dir:2,news:1,lead:1}],["Want to adjust and try again",{dig:2,prod:1,tool:1}],["Probably lose interest",{prod:2}]]},
 {s:4,id:"camera",t:"slider",q:"How would you feel about appearing in short videos?",hint:"0 means no thanks. 10 means happy to.",min:0,max:10,unit:"out of 10",lo:{face:2,dir:2,news:1,tool:1},hi:{crea:4,comm:1}},
 {s:4,id:"selling",t:"single",q:"How do you feel about chatting with customers?",o:[["I enjoy it",{prod:2,lead:2,comm:1}],["Fine once in a while",{dig:1,news:1}],["I'd rather not",{dir:2,face:2,tool:1}]]},
 {s:4,id:"hands",t:"single",q:"How involved would you like to be?",o:[["Just approve things, let it do the rest",{dir:2,face:2,news:1,tool:1}],["Help out a few hours a week",{dig:1,lead:1,prod:1}],["Learn and do some parts myself",{crea:1,comm:1,tool:1}]]},
 {s:4,id:"public",t:"single",q:"Would you like your name on it?",o:[["Yes, I'm happy to be the face",{crea:3,comm:2}],["A different name is fine",{news:1,dig:1}],["I'd rather stay in the background",{dir:2,face:2,lead:1,tool:1}]]}];

let st=JSON.parse(localStorage.getItem(KEY)||"null")||{i:0,a:{}};
const save=()=>localStorage.setItem(KEY,JSON.stringify(st));
const qEl=document.getElementById("q"),rEl=document.getElementById("result");

function contrib(q,val){ // returns {path:pts} and label
 if(q.t==="slider"){const f=(val-q.min)/(q.max-q.min),o={};for(const p of ORDER){const v=(q.lo[p]||0)*(1-f)+(q.hi[p]||0)*f;if(v)o[p]=v}return o}
 if(q.t==="single")return val==null?{}:q.o[val][1];
 if(q.t==="multi"){const o={};(val||[]).forEach(k=>{for(const[p,v]of Object.entries(q.o[k][1]))o[p]=Math.min(3,(o[p]||0)+v)});return o}
 return {}}
function maxFor(q,p){if(q.t==="slider")return Math.max(q.lo[p]||0,q.hi[p]||0);if(q.t==="single")return Math.max(0,...q.o.map(o=>o[1][p]||0));if(q.t==="multi")return Math.min(3,q.o.reduce((s,o)=>s+(o[1][p]||0),0));return 0}
function label(q,val){if(q.t==="slider")return val+" "+q.unit;if(q.t==="single")return q.o[val][0];if(q.t==="multi")return (val||[]).map(k=>q.o[k][0]).join(", ");return val}

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
const snip=t=>{t=t.replace(/\s+/g," ").trim();const w=t.split(" ");return w.length>12?w.slice(0,12).join(" ")+"…":t};

function done(){
 const{ranked,log}=score(),w=ranked[0],ru=ranked[1],P=PATHS[w.p],R=PATHS[ru.p];
 const reasons=log[w.p].sort((a,b)=>b[0]-a[0]).slice(0,4).map(([g,q,v])=>`<li><b>${esc(q.q.replace(/[?.…]+$/,""))}:</b> “${esc(label(q,v))}”</li>`).join("");
 const gaps=SECTIONS.map((s,i)=>[s,w.d[i]-ru.d[i]]).sort((a,b)=>b[1]-a[1])[0];
 const topic=st.a.askedfor,prob=st.a.problem;
 const nicheLine=topic||prob?`<p class="note">Your AI partner would start by looking into ${topic?`“${esc(topic)}”`:""}${topic&&prob?" and ":""}${prob?`the problem you noticed: “${esc(prob)}”`:""}.</p>`:"";
 const S=st.story||{};const refl=[S.overwhelm?`You said “${esc(snip(S.overwhelm))}” feels like a lot right now. That's why your plan sticks to one thing, and your AI partner handles the busy work.`:"",S.feel?`You said you'd like it to feel “${esc(snip(S.feel))}”. We'll keep your weekly updates short and calm with that in mind.`:""].filter(Boolean).map(x=>`<p class="note">${x}</p>`).join("");
 qEl.hidden=true;rEl.hidden=false;
 document.getElementById("wlv").value=w.p;
 rEl.innerHTML=`<div class="bar"><i style="width:100%"></i></div><p class="prog">Your one path</p>
 <p class="verdict">${P.name}</p><p class="lede">${P.line}</p>${refl}
 <div class="fit"><div class="fitnum"><b>${w.fit}</b><span>fit score</span></div><div class="dims">${SECTIONS.map((s,i)=>`<div class="dim"><span>${s}</span><div class="track"><i style="width:${w.d[i]}%"></i></div><em>${w.d[i]}</em></div>`).join("")}</div></div>
 <h3>Why this fits you</h3><ul class="why">${reasons}</ul>${nicheLine}
 <h3>Runner-up: ${R.name}</h3><p class="mute">A close second, with a fit of ${ru.fit}. It came second mainly because of <b>${gaps[0].toLowerCase()}</b>: your first choice matched your answers better there.</p>
 <div class="split"><div><h3>What your AI business partner builds and runs</h3><p class="hint">No tech skills needed. Nothing to install.</p><ul class="tick">${P.builds.map(x=>`<li>${x}</li>`).join("")}</ul></div>
 <div><h3>What only you do</h3><ul class="you">${P.you.map(x=>`<li>${x}</li>`).join("")}<li>Read a plain-English weekly update and tap approve</li></ul></div></div>
 <p class="fine">A fit score reflects how well a path matches your answers. It is not a prediction of results or income.</p>
 <div class="nav"><button class="back" id="redo">↺ Retake</button><a class="btn" href="#join">Reserve my build <span>→</span></a></div>`;
 document.getElementById("redo").onclick=()=>{st={i:0,a:{}};save();render()};
 if(st.counted!==w.p){gc("quiz-done-"+w.p,"Quiz verdict "+w.p);st.counted=w.p;save()}
 window.__result={winner:w.p,runner:ru.p,fit:w.fit};
}
function summary(){const o={};Q.forEach(q=>{const v=st.a[q.id];if(v!=null&&v!==""&&!(Array.isArray(v)&&!v.length))o[q.id]=label(q,v)});return o}
render();
document.getElementById("wl").onsubmit=async e=>{e.preventDefault();const f=e.target;gc("waitlist-submit","Waitlist submit");
 const r=window.__result||{};try{await post({email:f.email.value,type:"waitlist",verdict:r.winner||"(quiz not finished)",runner_up:r.runner||"",fit:r.fit||"",answers:summary(),in_their_words:st.story||{}})}catch(_){}
 f.hidden=true;document.getElementById("wlmsg").hidden=false};
document.getElementById("found").onclick=e=>{gc("founding-click","Founding $29 click");const em=document.getElementById("wl").email.value;const r=window.__result||{};
 post({type:"founding_click",email:em||"(none)",verdict:r.winner||"",answers:summary(),in_their_words:st.story||{}}).catch(()=>{});e.target.hidden=true;document.getElementById("fmsg").hidden=false};
