// CONFIG: set after Formspree signup (free tier). Same form receives waitlist + founding clicks.
const FORM = "https://formspree.io/f/YOUR_FORM_ID";
const gc = (path,title)=>{try{window.goatcounter&&goatcounter.count({path,title,event:true})}catch(e){}};
const post = d=>fetch(FORM,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(d)});
const P={
 freelance:{name:"Freelance one skill",why:"You already have a skill people pay for. Selling it as a simple service is the fastest way to learn what the market wants.",step:"Write a one-line offer for one skill and send it to 5 people or post it in one community."},
 digital:{name:"Sell one small digital product",why:"You can make things and like working alone. A template, guide or checklist can be built once and improved weekly.",step:"Pick one problem you've solved and outline a 1-page template or checklist for it."},
 content:{name:"Faceless content channel",why:"You have patience and some time but prefer not to be on camera. A focused topic channel builds slowly and steadily.",step:"Choose one narrow topic and draft titles for your first 10 posts."},
 creator:{name:"On-camera short videos",why:"You're comfortable on camera. Showing up consistently on one platform is your edge.",step:"Record and post 3 short videos about one thing you know, on one platform."},
 affiliate:{name:"Niche review site",why:"You have patience, little time pressure, and like writing. A small, honest review site in one niche can grow over months.",step:"Pick one niche you know and list 10 questions buyers ask about it."}};
const Q=[
 {q:"How much time can you give each week?",a:[["Under 3 hours",{freelance:1,digital:2}],["3 to 7 hours",{digital:1,content:1,affiliate:1}],["8+ hours",{content:2,creator:2,freelance:1}]]},
 {q:"Which is closest to a skill you have?",a:[["Writing, design or code",{freelance:2,digital:1,affiliate:1}],["Explaining or teaching",{creator:2,content:1,digital:1}],["None I'd charge for yet",{content:1,affiliate:2}]]},
 {q:"How do you feel about being on camera?",a:[["Happy to",{creator:3}],["Maybe, voice only",{content:2}],["No thanks",{affiliate:1,digital:1,freelance:1}]]},
 {q:"Starting budget for tools?",a:[["Nothing",{freelance:2,creator:1}],["A little",{digital:1,content:1}],["Some, if it helps",{affiliate:1,content:1}]]},
 {q:"How patient are you for first results?",a:[["I need a sign in weeks",{freelance:3}],["A few months is fine",{digital:2,creator:1}],["I'll play the long game",{affiliate:2,content:2}]]},
 {q:"How do you prefer to work?",a:[["With clients and people",{freelance:2,creator:1}],["Alone, making things",{digital:2,affiliate:1,content:1}]]}];
let i=0,s={};const q=document.getElementById("q"),r=document.getElementById("result");
function show(){const x=Q[i];q.innerHTML=`<p class="prog">Question ${i+1} of ${Q.length}</p><h2>${x.q}</h2>`+x.a.map((o,k)=>`<button class="opt" data-k="${k}">${o[0]}</button>`).join("");
 q.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{for(const[k,v]of Object.entries(x.a[b.dataset.k][1]))s[k]=(s[k]||0)+v;i++;i<Q.length?show():done()})}
function done(){const order=["freelance","digital","content","creator","affiliate"];const best=order.reduce((a,b)=>(s[b]||0)>(s[a]||0)?b:a);const p=P[best];
 q.hidden=true;r.hidden=false;document.getElementById("wlv").value=best;
 r.innerHTML=`<p class="prog">Your one path</p><p class="verdict">${p.name}</p><p><b>Why:</b> ${p.why}</p><p><b>Your first-week step:</b> ${p.step}</p><a class="btn" href="#join">Get weekly steps →</a> <button class="opt" style="display:inline;width:auto" id="redo">Retake</button>`;
 document.getElementById("redo").onclick=()=>{i=0;s={};q.hidden=false;r.hidden=true;show()};gc("quiz-done-"+best,"Quiz verdict "+best)}
show();
document.getElementById("wl").onsubmit=async e=>{e.preventDefault();const f=e.target;gc("waitlist-submit","Waitlist submit");
 try{await post({email:f.email.value,type:"waitlist",verdict:f.verdict.value})}catch(_){}f.hidden=true;document.getElementById("wlmsg").hidden=false};
document.getElementById("found").onclick=e=>{gc("founding-click","Founding $29 click");const em=document.getElementById("wl").email.value;
 post({type:"founding_click",email:em||"(none)",verdict:document.getElementById("wlv").value}).catch(()=>{});e.target.hidden=true;document.getElementById("fmsg").hidden=false};
