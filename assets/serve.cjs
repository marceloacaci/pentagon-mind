const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const PORT=8726;
const MIME={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  let u=decodeURIComponent(req.url.split('?')[0]); if(u==='/')u='/index.html';
  const fp=path.normalize(path.join(ROOT,u));
  if(fp!==ROOT && !fp.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('Forbidden');}
  fs.readFile(fp,(e,d)=>{
    if(e){res.writeHead(404);return res.end('Not Found');}
    const ext=path.extname(fp);
    const cs=(ext==='.js'||ext==='.html'||ext==='.css'||ext==='.json')?'; charset=utf-8':'';
    res.writeHead(200,{'Content-Type':(MIME[ext]||'application/octet-stream')+cs});
    res.end(d);
  });
}).listen(PORT,()=>console.log('serving on '+PORT+' root='+ROOT));
