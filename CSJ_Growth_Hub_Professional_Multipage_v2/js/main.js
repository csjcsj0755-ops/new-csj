/* CSJ Growth Hub shared JavaScript. Edit catalogue data below to maintain services. */
const WHATSAPP_NUMBER="918571053488";
const CONTACT_PHONE="8571053488";
const CONTACT_EMAIL="csjcsj0756@gmail.com";
const PLATFORMS=[
 {name:"Instagram",slug:"instagram",icon:"◎",className:"instagram",description:"Reels, posts, live streams and community strategy."},
 {name:"Facebook",slug:"facebook",icon:"f",className:"facebook",description:"Page promotion, live sessions and community engagement."},
 {name:"YouTube",slug:"youtube",icon:"▶",className:"youtube",description:"Video promotion, channel strategy and live stream discovery."},
 {name:"X",slug:"x",icon:"𝕏",className:"x",description:"Profile visibility, post promotion and audience conversations."},
 {name:"LinkedIn",slug:"linkedin",icon:"in",className:"linkedin",description:"Professional profile positioning and content strategy."},
 {name:"Telegram",slug:"telegram",icon:"➤",className:"telegram",description:"Public channel promotion and community planning."},
 {name:"WhatsApp",slug:"whatsapp",icon:"◉",className:"whatsapp",description:"Channel discovery and business profile guidance."},

{
  name: "Snapchat",
  slug: "snapchat",
  icon: "S",
  className: "snapchat",
  description: "Snapchat promotion and audience growth services."
}

];
/* Sample prices in INR per 100 campaign units. Edit min/max/prices before publishing. */
const SERVICES=[
{id:"ig-content",platform:"Instagram",title:"Instagram Content Promotion",icon:"◎",description:"Promotion planning to help relevant audiences discover your Instagram content.",price:299,min:100,max:1000000,unit:"units",tag:"Popular"},
{id:"ig-reels",platform:"Instagram",title:"Reels Promotion Campaign",icon:"▶",description:"A discovery-focused campaign for Reels. Reach varies by content and audience.",price:399,min:100,max:1000000,unit:"units",tag:"Reels"},
{id:"ig-live",platform:"Instagram",title:"Instagram Live Promotion",icon:"◉",description:"Promotion planning to help notify interested viewers about your live session.",price:499,min:100,max:1000000,unit:"viewers",tag:"Live"},
{id:"ig-comments",platform:"Instagram",title:"Authentic Comment Strategy",icon:"✎",description:"Ideas and guidance for encouraging relevant, genuine conversations around posts.",price:349,min:100,max:1000000,unit:"units",tag:"Engagement"},
{id:"fb-page",platform:"Facebook",title:"Facebook Page Promotion",icon:"f",description:"Campaign planning to introduce your page and content to relevant audiences.",price:299,min:100,max:1000000,unit:"units",tag:"Popular"},
{id:"fb-live",platform:"Facebook",title:"Facebook Live Promotion",icon:"◉",description:"Promote an upcoming live stream with audience-focused campaign planning.",price:499,min:100,max:1000000,unit:"viewers",tag:"Live"},
{id:"fb-community",platform:"Facebook",title:"Community Engagement Plan",icon:"✦",description:"Content prompts and promotion planning for genuine discussion on your page or group.",price:349,min:100,max:1000000,unit:"units",tag:"Community"},
{id:"yt-video",platform:"YouTube",title:"YouTube Video Promotion",icon:"▶",description:"Promote a public video to viewers who may be interested in the topic.",price:499,min:100,max:1000000,unit:"views",tag:"Popular"},
{id:"yt-channel",platform:"YouTube",title:"Channel Growth Strategy",icon:"↗",description:"Channel audit and practical content recommendations for sustainable audience growth.",price:799,min:100,max:1000000,unit:"units",tag:"Strategy"},
{id:"yt-live",platform:"YouTube",title:"YouTube Live Promotion",icon:"◉",description:"Promotion planning for a live stream. Attendance and watch duration are not guaranteed.",price:599,min:100,max:1000000,unit:"viewers",tag:"Live"},
{id:"yt-watch",platform:"YouTube",title:"Watch-Time Improvement Plan",icon:"◷",description:"Retention review and recommendations to improve viewer experience and content quality.",price:699,min:100,max:1000000,unit:"units",tag:"Optimization"},
{id:"x-post",platform:"X",title:"X Profile & Post Promotion",icon:"𝕏",description:"Promotion planning for public posts and profiles to support relevant discovery.",price:399,min:100,max:1000000,unit:"units",tag:"Reach"},
{id:"x-strategy",platform:"X",title:"X Community Strategy",icon:"✧",description:"A practical content and engagement plan for authentic participation on X.",price:499,min:100,max:1000000,unit:"units",tag:"Strategy"},
{id:"li-profile",platform:"LinkedIn",title:"LinkedIn Profile Promotion",icon:"in",description:"Improve profile positioning and promote professional content to relevant audiences.",price:599,min:100,max:1000000,unit:"units",tag:"Professional"},
{id:"li-content",platform:"LinkedIn",title:"LinkedIn Content Strategy",icon:"▤",description:"Content themes and posting recommendations for professional audiences.",price:699,min:100,max:1000000,unit:"units",tag:"Strategy"},
{id:"tg-channel",platform:"Telegram",title:"Telegram Channel Promotion",icon:"➤",description:"Promotion planning to help the right audience discover your public channel.",price:399,min:100,max:1000000,unit:"units",tag:"Community"},
{id:"tg-plan",platform:"Telegram",title:"Telegram Community Plan",icon:"✦",description:"Posting guidance and content ideas to help your community stay useful and active.",price:299,min:100,max:1000000,unit:"units",tag:"Engagement"},
{id:"wa-channel",platform:"WhatsApp",title:"WhatsApp Channel Promotion",icon:"◉",description:"Promotion planning to help relevant audiences discover your public WhatsApp Channel.",price:399,min:100,max:1000000,unit:"units",tag:"Popular"},
{id:"wa-business",platform:"WhatsApp",title:"WhatsApp Business Setup Guidance",icon:"▣",description:"Guidance for your business profile, catalogue and customer enquiry flow.",price:599,min:1,max:100,unit:"sessions",tag:"Business"},

{
  id: "ig-live-views",
  platform: "Instagram",
  title: "Instagram Live Stream Views",
  icon: "◉",
  description: "Instagram live stream promotion service.",
  price: 499,
  min: 100,
  max: 1000000,
  unit: "viewers",
  tag: "Live"
},

{
  id: "ig-live-views",
  platform: "Instagram",
  title: "Instagram Live Stream Views",
  icon: "◉",
  description: "Instagram live stream promotion service.",
  price: 998,
  min: 200,
  max: 1000000,
  unit: "viewers",
  tag: "Live"
}


];
const money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function iconFor(p){return p==="Instagram"?"◎":p==="Facebook"?"f":p==="YouTube"?"▶":p==="X"?"𝕏":p==="LinkedIn"?"in":p==="Telegram"?"➤":"◉"}
function initTheme(){const saved=localStorage.getItem("csj-theme");const prefersDark=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=saved||(prefersDark?"dark":"light");const b=document.getElementById("themeToggle");if(b){const paint=()=>{const dark=document.documentElement.dataset.theme==="dark";const label=b.querySelector(".theme-label");if(label)label.textContent=dark?"Light mode":"Dark mode";else b.textContent=dark?"Light mode":"Dark mode";b.setAttribute("aria-label",dark?"Switch to light theme":"Switch to dark theme");b.setAttribute("title",dark?"Switch to light theme":"Switch to dark theme")};paint();b.addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem("csj-theme",next);paint()})}}
function initNav(){const menu=document.getElementById("menuToggle"),links=document.getElementById("navLinks");if(menu&&links){menu.addEventListener("click",()=>links.classList.toggle("open"));links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")))}document.querySelectorAll("[data-year]").forEach(n=>n.textContent=new Date().getFullYear());document.querySelectorAll("[data-wa-link]").forEach(a=>a.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello CSJ Growth Hub! I would like to know more about your services.")}`);document.querySelectorAll("[data-email]").forEach(a=>a.href=`mailto:${CONTACT_EMAIL}`);document.querySelectorAll("[data-phone]").forEach(a=>a.href=`tel:${CONTACT_PHONE}`)}
function observe(){const nodes=document.querySelectorAll(".reveal:not(.visible)");if(!("IntersectionObserver"in window)){nodes.forEach(n=>n.classList.add("visible"));return}const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ob.unobserve(e.target)}}),{threshold:.07});nodes.forEach(n=>ob.observe(n))}
function renderPlatformCards(targetId){const target=document.getElementById(targetId);if(!target)return;target.innerHTML=PLATFORMS.map((p,i)=>`<a class="platform-card reveal" href="category.html?platform=${encodeURIComponent(p.name)}" style="transition-delay:${(i%3)*45}ms"><div class="platform-top"><img class="platform-logo" src="assets/${p.slug}.svg" alt="${p.name} logo"><div><h3>${p.name}</h3><span class="service-platform">Explore services ↗</span></div></div><p>${p.description}</p><div class="arrow"><span>View category</span><span>→</span></div></a>`).join("");observe()}
function renderServices(targetId,platform="All",query=""){const target=document.getElementById(targetId);if(!target)return;const q=query.toLowerCase().trim();const items=SERVICES.filter(s=>(platform==="All"||s.platform===platform)&&`${s.title} ${s.description} ${s.platform} ${s.tag}`.toLowerCase().includes(q));target.innerHTML=items.length?items.map((s,i)=>`<article class="service-card reveal" style="transition-delay:${(i%3)*35}ms"><div class="service-meta"><span class="service-platform">${iconFor(s.platform)} &nbsp;${s.platform}</span><span class="tag">${esc(s.tag||"Service")}</span></div><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><div class="service-bottom"><div class="price">${money(s.price)}<small>per 100 ${esc(s.unit)}</small></div><button class="text-link" data-service="${esc(s.id)}">Details & order ↗</button></div></article>`).join(""):`<div class="empty">No matching services. Try a different search.</div>`;target.querySelectorAll("[data-service]").forEach(b=>b.addEventListener("click",()=>openOrder(b.dataset.service)));observe()}
function renderFilters(targetId,selected,onSelect){const target=document.getElementById(targetId);if(!target)return;const names=["All",...PLATFORMS.map(p=>p.name)];target.innerHTML=names.map(n=>`<button class="filter ${selected===n?"active":""}" data-filter="${esc(n)}">${n==="All"?"✦":iconFor(n)} ${esc(n)}</button>`).join("");target.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>onSelect(b.dataset.filter)))}
let currentOrder=null;
function openOrder(id){const s=SERVICES.find(x=>x.id===id);if(!s)return;currentOrder=s;const modal=document.getElementById("orderModal");if(!modal){location.href=`contact.html?service=${encodeURIComponent(s.title)}`;return}document.getElementById("orderTitle").textContent=s.title;document.getElementById("orderDescription").textContent=s.description;const q=document.getElementById("orderQuantity");q.min=s.min;q.max=s.max;q.value=s.min;document.getElementById("quantityHelp").textContent=`Minimum ${s.min.toLocaleString("en-IN")} · Maximum ${s.max.toLocaleString("en-IN")} ${s.unit}`;updateOrderTotal();modal.classList.add("open");document.body.style.overflow="hidden"}
function updateOrderTotal(){if(!currentOrder)return;const q=document.getElementById("orderQuantity");let n=Number(q.value);if(!Number.isFinite(n)||n<currentOrder.min)n=currentOrder.min;if(n>currentOrder.max)n=currentOrder.max;q.value=n;document.getElementById("orderTotal").textContent=money(Math.ceil(n/100*currentOrder.price))}
function closeOrder(){const m=document.getElementById("orderModal");if(m)m.classList.remove("open");document.body.style.overflow=""}
function initOrder(){const modal=document.getElementById("orderModal");if(!modal)return;document.getElementById("orderClose").addEventListener("click",closeOrder);modal.addEventListener("click",e=>{if(e.target===modal)closeOrder()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeOrder()});document.getElementById("orderQuantity").addEventListener("input",updateOrderTotal);document.getElementById("orderSubmit").addEventListener("click",()=>{if(!currentOrder)return;const q=Number(document.getElementById("orderQuantity").value),total=Math.ceil(q/100*currentOrder.price);const msg=`Hello CSJ Growth Hub! I am interested in:%0AService: ${encodeURIComponent(currentOrder.title)}%0APlatform: ${encodeURIComponent(currentOrder.platform)}%0AQuantity: ${encodeURIComponent(q+" "+currentOrder.unit)}%0AEstimated starting price: ${encodeURIComponent(money(total))}%0A%0APlease share details and next steps.`;window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,"_blank","noopener")})}
function initHome(){renderPlatformCards("platformGrid");let selected="All";const drawFilters=()=>renderFilters("homeFilters",selected,n=>{selected=n;drawFilters();renderServices("homeServiceGrid",selected,document.getElementById("homeSearch")?.value||"")});drawFilters();renderServices("homeServiceGrid");const search=document.getElementById("homeSearch");if(search)search.addEventListener("input",()=>renderServices("homeServiceGrid",selected,search.value))}
function initCatalogue(){const params=new URLSearchParams(location.search);let selected=params.get("platform")||"All";if(!["All",...PLATFORMS.map(p=>p.name)].includes(selected))selected="All";const title=document.getElementById("catalogueTitle");if(title)title.textContent=selected==="All"?"All social media services":`${selected} services`;const search=document.getElementById("catalogueSearch");const doRender=()=>renderServices("catalogueGrid",selected,search?.value||"");renderFilters("catalogueFilters",selected,n=>{selected=n;const t=document.getElementById("catalogueTitle");if(t)t.textContent=selected==="All"?"All social media services":`${selected} services`;renderFilters("catalogueFilters",selected,()=>{});doRender()});if(search)search.addEventListener("input",doRender);doRender()}
function initContact(){const params=new URLSearchParams(location.search),service=params.get("service");const f=document.getElementById("contactService");if(f&&service)f.value=service;const form=document.getElementById("contactForm");if(form)form.addEventListener("submit",e=>{e.preventDefault();const data=new FormData(form);const msg=`Hello CSJ Growth Hub!%0AName: ${encodeURIComponent(data.get("name"))}%0AEmail: ${encodeURIComponent(data.get("email"))}%0AInterested service: ${encodeURIComponent(data.get("service")||"General enquiry")}%0AMessage: ${encodeURIComponent(data.get("message"))}`;window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,"_blank","noopener")})}
document.addEventListener("DOMContentLoaded",()=>{initTheme();initNav();initOrder();if(document.getElementById("platformGrid"))initHome();if(document.getElementById("catalogueGrid"))initCatalogue();if(document.getElementById("contactForm"))initContact();observe()});
