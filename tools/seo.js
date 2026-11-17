// Run from the project root AFTER git add:   node tools/seo.js YYYY-MM-DD
// Adds favicon, canonical and share-preview tags to every published page, then writes sitemap.xml + robots.txt.
// Safe to re-run: it replaces its own block (between the SEO markers) instead of adding a second one.
const fs=require('fs'),cp=require('child_process');
const SITE='https://reputeindiaai.com/';
const TODAY=process.argv[2];
const PRIVATE=new Set(['admin.html','dashboard.html','onboarding.html']);
const IND={clinics:'Clinics & Doctors',coaching:'Coaching & Education',gyms:'Gyms & Fitness',jewellery:'Jewellery',realestate:'Real Estate',restaurants:'Restaurants & Cafes',salons:'Salons & Beauty'};
const PAGE={index:'Demo overview',app:'Customer app demo',apps:'App demos',crm:'CRM demo',features:'AI features',problems:'Problems and fixes',website:'Website demo','crm-live':'Live CRM demo'};
const esc=s=>s.replace(/&(?!amp;|quot;|#)/g,'&amp;').replace(/"/g,'&quot;');
const files=cp.execSync('git ls-files "*.html"',{encoding:'utf8'}).split(/\r?\n/).filter(Boolean);
const urls=[];
for(const f of files){
  if(/^google[0-9a-f]+.html$/.test(f)) continue;            // Google ownership file: never touch, never list
  let h=fs.readFileSync(f,'utf8');
  const nl=h.includes('\r\n')?'\r\n':'\n';
  h=h.replace(/<!-- SEO:start -->[\s\S]*?<!-- SEO:end -->\r?\n?/,'');
  const url=SITE+f.replace(/(^|\/)index\.html$/,'$1');
  let block=['<link rel="icon" href="/favicon.ico" sizes="any">','<link rel="apple-touch-icon" href="/apple-touch-icon.png">'];
  if(PRIVATE.has(f)){
    block.push('<meta name="robots" content="noindex, nofollow">');
  } else if(!/<link rel="canonical"/.test(h)){
    let title=(h.match(/<title>([\s\S]*?)<\/title>/)||[])[1]||'Repute India AI';
    let desc=(h.match(/<meta name="description" content="([^"]*)"/)||[])[1];
    const m=f.match(/^showcase\/([^/]+)\/([^/.]+)\.html$/);
    if(m&&IND[m[1]]){
      if(/^Demo · /.test(title)) title=IND[m[1]]+' — '+PAGE[m[2]]+' · Repute India AI';
      if(!desc) desc='See what Repute India AI builds for '+IND[m[1]].toLowerCase()+': '+PAGE[m[2]].replace(/^[A-Z](?=[a-z])/,c=>c.toLowerCase())+', with the website, CRM, app and AI features shown working.';
    }
    if(!desc) desc='Repute India AI builds websites, CRMs, apps, AI agents and automation, and gets your business found in AI search.';
    title=esc(title.replace(/&amp;/g,'&')); desc=esc(desc.replace(/&amp;/g,'&'));
    block.push('<link rel="canonical" href="'+url+'">',
      '<meta property="og:type" content="website">','<meta property="og:site_name" content="Repute India AI">',
      '<meta property="og:url" content="'+url+'">','<meta property="og:title" content="'+title+'">',
      '<meta property="og:description" content="'+desc+'">',
      '<meta property="og:image" content="'+SITE+'assets/og-image.png">','<meta property="og:image:width" content="1200">','<meta property="og:image:height" content="630">',
      '<meta name="twitter:card" content="summary_large_image">','<meta name="twitter:title" content="'+title+'">',
      '<meta name="twitter:description" content="'+desc+'">','<meta name="twitter:image" content="'+SITE+'assets/og-image.png">');
    if(!/<meta name="description"/.test(h)) block.unshift('<meta name="description" content="'+desc+'">');
  }
  const ownTags=/<link rel="canonical"/.test(h);   // homepage + solution pages carry their own tags
  if(!ownTags){
    const re=/(<meta name="viewport"[^>]*>\r?\n)/;
    if(!re.test(h)) throw new Error('no viewport tag in '+f);
    h=h.replace(re,(m0)=>m0+'<!-- SEO:start -->'+nl+block.join(nl)+nl+'<!-- SEO:end -->'+nl);
    fs.writeFileSync(f,h);
  }
  if(!PRIVATE.has(f)) urls.push(url);
}
urls.sort((a,b)=>a.length-b.length||a.localeCompare(b));
fs.writeFileSync('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+
  urls.map(u=>'  <url><loc>'+u+'</loc><lastmod>'+TODAY+'</lastmod></url>').join('\n')+'\n</urlset>\n');
fs.writeFileSync('robots.txt','User-agent: *\nAllow: /\nDisallow: /admin.html\nDisallow: /owner-only/\nDisallow: /forms/\nDisallow: /dashboard.html\n\nSitemap: https://reputeindiaai.com/sitemap.xml\n');
console.log('pages tagged:',files.length,'| in sitemap:',urls.length);
