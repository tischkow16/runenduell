// Runenduell Service Worker – bei jedem Update VERSION erhöhen
const VERSION='runenduell-1.6.0';
const FILES=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "sprites/art.jpg", "sprites/art10.jpg", "sprites/art11.jpg", "sprites/art12.jpg", "sprites/art13.jpg", "sprites/art14.jpg", "sprites/art15.jpg", "sprites/art16.jpg", "sprites/art17.jpg", "sprites/art18.jpg", "sprites/art19.jpg", "sprites/art2.jpg", "sprites/art20.jpg", "sprites/art21.jpg", "sprites/art22.jpg", "sprites/art23.jpg", "sprites/art24.jpg", "sprites/art25.jpg", "sprites/art26.jpg", "sprites/art27.jpg", "sprites/art28.jpg", "sprites/art29.jpg", "sprites/art3.jpg", "sprites/art31.jpg","sprites/art33.jpg","sprites/art34.jpg","sprites/art32.jpg", "sprites/art4.jpg", "sprites/art5.jpg", "sprites/art6.jpg", "sprites/art7.jpg", "sprites/art8.jpg", "sprites/art9.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>Promise.all(FILES.map(f=>fetch(new Request(f,{cache:'reload'})).then(r=>{if(r.ok)return c.put(f,r)}).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith(caches.open(VERSION).then(c=>c.match('index.html')).then(m=>m||fetch(r)));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{if(res.ok){const cl=res.clone();caches.open(VERSION).then(c=>c.put(r,cl))}return res})));
});
