
require("dotenv").config();
const express=require("express");
const session=require("express-session");
const helmet=require("helmet");
const multer=require("multer");
const path=require("path");
const fs=require("fs");
const crypto=require("crypto");
const bcrypt=require("bcryptjs");
const Database=require("better-sqlite3");

const app=express();
const PORT=Number(process.env.PORT||3000);
const ROOT=path.join(__dirname,"..");
const PUBLIC=path.join(ROOT,"public");
const DATA=path.join(__dirname,"data");
fs.mkdirSync(DATA,{recursive:true});
fs.mkdirSync(path.join(PUBLIC,"uploads"),{recursive:true});
const db=new Database(path.join(DATA,"catalog.sqlite"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(`
CREATE TABLE IF NOT EXISTS platforms(
 id TEXT PRIMARY KEY, name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
 description TEXT NOT NULL DEFAULT '', logoUrl TEXT NOT NULL DEFAULT '', createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS services(
 id TEXT PRIMARY KEY, platformId TEXT NOT NULL REFERENCES platforms(id) ON DELETE CASCADE,
 title TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', pricePer100 REAL NOT NULL CHECK(pricePer100>=0),
 minQuantity INTEGER NOT NULL CHECK(minQuantity>=1), maxQuantity INTEGER NOT NULL CHECK(maxQuantity>=minQuantity),
 unit TEXT NOT NULL DEFAULT 'units', tag TEXT NOT NULL DEFAULT '', createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`);
const count=db.prepare("SELECT COUNT(*) AS n FROM platforms").get().n;
if(count===0){
 const ins=db.prepare("INSERT INTO platforms(id,name,slug,description) VALUES(?,?,?,?)");
 const initial=[
  ["instagram","Instagram","instagram","Photo, reels and live content promotion services."],
  ["facebook","Facebook","facebook","Facebook page and content promotion services."],
  ["youtube","YouTube","youtube","Video, channel and live-stream promotion services."],
  ["x","X","x","X profile and post promotion services."],
  ["linkedin","LinkedIn","linkedin","Professional profile and company page services."],
  ["telegram","Telegram","telegram","Telegram channel and group promotion services."],
  ["whatsapp","WhatsApp","whatsapp","WhatsApp channel and community promotion services."]
 ];
 const tx=db.transaction(rows=>rows.forEach(x=>ins.run(...x)));tx(initial);
 const platformIds=Object.fromEntries(initial.map(x=>[x[1],x[0]]));
 const is=db.prepare("INSERT INTO services(id,platformId,title,description,pricePer100,minQuantity,maxQuantity,unit,tag) VALUES(?,?,?,?,?,?,?,?,?)");
 const examples=[
  ["ig-followers","Instagram","Instagram Followers","Sample catalogue entry. Confirm service scope and platform compliance before publishing.",99,100,1000000,"followers","Popular"],
  ["ig-likes","Instagram","Instagram Likes","Sample catalogue entry. Confirm service scope and platform compliance before publishing.",49,100,1000000,"likes",""],
  ["ig-live-views","Instagram","Instagram Live Stream Views","Sample catalogue entry. Confirm service scope and platform compliance before publishing.",499,100,1000000,"viewers","Live"],
  ["fb-followers","Facebook","Facebook Followers","Sample catalogue entry. Confirm service scope and platform compliance before publishing.",99,100,1000000,"followers",""],
  ["yt-subscribers","YouTube","YouTube Subscribers","Sample catalogue entry. Confirm service scope and platform compliance before publishing.",299,100,1000000,"subscribers",""],
  ["yt-views","YouTube","YouTube Views","Sample catalogue entry. Confirm service scope and platform compliance before publishing.",79,100,1000000,"views",""],
  ["x-followers","X","X Followers","Sample catalogue entry. Confirm service scope and platform compliance before publishing.",149,100,1000000,"followers",""],
  ["li-followers","LinkedIn","LinkedIn Followers","Sample catalogue entry. Confirm service scope and platform compliance before publishing.",299,100,1000000,"followers",""],
  ["tg-subscribers","Telegram","Telegram Subscribers","Sample catalogue entry. Confirm service scope and platform compliance before publishing.",99,100,1000000,"subscribers",""],
  ["wa-followers","WhatsApp","WhatsApp Channel Followers","Sample catalogue entry. Confirm service scope and platform compliance before publishing.",99,100,1000000,"followers",""]
 ];
 const tx2=db.transaction(rows=>rows.forEach(x=>is.run(x[0],platformIds[x[1]],x[2],x[3],x[4],x[5],x[6],x[7],x[8])));tx2(examples);
}
app.disable("x-powered-by");
app.use(helmet({contentSecurityPolicy:false,crossOriginResourcePolicy:{policy:"same-site"}}));
app.use(express.json({limit:"200kb"}));
app.use(express.urlencoded({extended:false}));
const sessionSecret=process.env.SESSION_SECRET;
if(!sessionSecret||sessionSecret.length<32)console.warn("WARNING: set a random SESSION_SECRET (32+ chars) in .env before production.");
app.use(session({name:"csj.sid",secret:sessionSecret||crypto.randomBytes(48).toString("hex"),resave:false,saveUninitialized:false,cookie:{httpOnly:true,sameSite:"strict",secure:process.env.NODE_ENV==="production",maxAge:1000*60*60*4}}));
const upload=multer({storage:multer.diskStorage({destination:(req,file,cb)=>cb(null,path.join(PUBLIC,"uploads")),filename:(req,file,cb)=>cb(null,crypto.randomBytes(16).toString("hex")+path.extname(file.originalname).toLowerCase())}),limits:{fileSize:2*1024*1024},fileFilter:(req,file,cb)=>{const allowed=["image/png","image/jpeg","image/webp","image/svg+xml"];if(!allowed.includes(file.mimetype))return cb(new Error("Upload PNG, JPG, WEBP or SVG image only."));cb(null,true)}});
function admin(req,res,next){if(req.session&&req.session.admin===true)return next();return res.status(401).json({error:"Please sign in to the admin panel."})}
function validId(s){return typeof s==="string"&&/^[a-zA-Z0-9_-]{2,80}$/.test(s)}
function safePlatform(p){return {id:p.id,name:p.name,slug:p.slug,description:p.description,logoUrl:p.logoUrl||""}}
function safeService(s){return {id:s.id,platformId:s.platformId,title:s.title,description:s.description,pricePer100:s.pricePer100,minQuantity:s.minQuantity,maxQuantity:s.maxQuantity,unit:s.unit,tag:s.tag}}
function catalog(){return {platforms:db.prepare("SELECT * FROM platforms ORDER BY name COLLATE NOCASE").all().map(safePlatform),services:db.prepare("SELECT * FROM services ORDER BY createdAt DESC,title COLLATE NOCASE").all().map(safeService)}}
app.get("/api/catalog",(req,res)=>res.json(catalog()));
app.get("/api/admin/me",(req,res)=>res.json({authenticated:req.session?.admin===true}));
app.post("/api/admin/login",async(req,res)=>{const {username,password}=req.body||{};const expectedUser=process.env.ADMIN_USERNAME||"admin";const hash=process.env.ADMIN_PASSWORD_HASH||"";if(!hash||hash==="replace-with-bcrypt-hash")return res.status(503).json({error:"Admin password is not configured. Set ADMIN_PASSWORD_HASH in .env first."});const ok=typeof username==="string"&&typeof password==="string"&&username===expectedUser&&await bcrypt.compare(password,hash);if(!ok)return res.status(401).json({error:"Incorrect username or password."});req.session.regenerate(err=>{if(err)return res.status(500).json({error:"Could not create secure session."});req.session.admin=true;res.json({ok:true})})});
app.post("/api/admin/logout",admin,(req,res)=>req.session.destroy(()=>res.json({ok:true})));
app.get("/api/admin/catalog",admin,(req,res)=>res.json(catalog()));
app.post("/api/admin/platforms",admin,upload.single("logo"),(req,res)=>{try{const {id,name,slug,description=""}=req.body;const platformId=id||crypto.randomUUID();if(!name||!slug||!validId(slug))return res.status(400).json({error:"Enter a platform name and a URL slug using letters, numbers, _ or -."});if(name.length>80||description.length>500)return res.status(400).json({error:"Name or description is too long."});const existing=db.prepare("SELECT * FROM platforms WHERE id=?").get(platformId);const logoUrl=req.file?"/uploads/"+req.file.filename:(existing?.logoUrl||"");if(existing)db.prepare("UPDATE platforms SET name=?,slug=?,description=?,logoUrl=? WHERE id=?").run(name.trim(),slug.trim().toLowerCase(),description.trim(),logoUrl,platformId);else db.prepare("INSERT INTO platforms(id,name,slug,description,logoUrl) VALUES(?,?,?,?,?)").run(platformId,name.trim(),slug.trim().toLowerCase(),description.trim(),logoUrl);res.json({ok:true,id:platformId})}catch(e){res.status(400).json({error:e.message.includes("UNIQUE")?"That platform slug already exists.": "Could not save platform."})}});
app.delete("/api/admin/platforms/:id",admin,(req,res)=>{if(!validId(req.params.id))return res.status(400).json({error:"Invalid platform id."});const result=db.prepare("DELETE FROM platforms WHERE id=?").run(req.params.id);if(!result.changes)return res.status(404).json({error:"Platform not found."});res.json({ok:true})});
app.post("/api/admin/services",admin,(req,res)=>{try{const d=req.body||{};const id=d.id||crypto.randomUUID();const title=String(d.title||"").trim(),description=String(d.description||"").trim(),unit=String(d.unit||"").trim();const price=Number(d.pricePer100),min=Number(d.minQuantity),max=Number(d.maxQuantity),platformId=String(d.platformId||"");if(!validId(platformId)||!db.prepare("SELECT id FROM platforms WHERE id=?").get(platformId))return res.status(400).json({error:"Choose a valid platform."});if(!title||title.length>120||description.length>1000||!unit||unit.length>40)return res.status(400).json({error:"Enter valid title, description and unit label."});if(!Number.isFinite(price)||price<0||!Number.isInteger(min)||!Number.isInteger(max)||min<1||max<min||max>100000000)return res.status(400).json({error:"Check price and quantity limits."});const tag=String(d.tag||"").slice(0,40);const old=db.prepare("SELECT id FROM services WHERE id=?").get(id);if(old)db.prepare("UPDATE services SET platformId=?,title=?,description=?,pricePer100=?,minQuantity=?,maxQuantity=?,unit=?,tag=? WHERE id=?").run(platformId,title,description,price,min,max,unit,tag,id);else db.prepare("INSERT INTO services(id,platformId,title,description,pricePer100,minQuantity,maxQuantity,unit,tag) VALUES(?,?,?,?,?,?,?,?,?)").run(id,platformId,title,description,price,min,max,unit,tag,id);res.json({ok:true,id})}catch(e){res.status(400).json({error:"Could not save service. Check all fields and try again."})}});
app.delete("/api/admin/services/:id",admin,(req,res)=>{if(!validId(req.params.id))return res.status(400).json({error:"Invalid service id."});const result=db.prepare("DELETE FROM services WHERE id=?").run(req.params.id);if(!result.changes)return res.status(404).json({error:"Service not found."});res.json({ok:true})});
app.use(express.static(PUBLIC,{extensions:["html"]}));
app.use((err,req,res,next)=>{if(err instanceof multer.MulterError)return res.status(400).json({error:err.code==="LIMIT_FILE_SIZE"?"Image must be 2 MB or smaller.":err.message});if(err) return res.status(400).json({error:err.message||"Bad request"});next()});
app.listen(PORT,()=>console.log(`CSJ Growth Hub running at http://localhost:${PORT}`));
