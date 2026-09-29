// Run against wrangler preview or the deployed origin. No submissions or credentials.
import assert from "node:assert/strict";
import { XMLParser } from "fast-xml-parser";
const origin = process.argv[2] ?? "http://127.0.0.1:8787";
const baseline = process.argv.includes("--baseline");
const results=[];
const get = async (path,accept="text/html",ua="PorulReleaseCheck/1.0",method="GET") => {
  const response=await fetch(new URL(path,origin),{method,headers:{Accept:accept,"User-Agent":ua},signal:AbortSignal.timeout(20000)});
  const text=await response.text();
  const row={path,accept,ua,method,status:response.status,type:response.headers.get("Content-Type"),vary:response.headers.get("Vary"),length:text.length};
  results.push(row); return {response,text,row};
};
let failure;
try {
  const parser=new XMLParser();
  const index=await get("/sitemap-index.xml","application/xml");
  assert.equal(index.response.status,200);
  const list=value=>Array.isArray(value)?value:[value];
  const paths=[];
  for(const item of list(parser.parse(index.text).sitemapindex.sitemap)) {
    const map=await get(new URL(item.loc).pathname,"application/xml");
    for(const url of list(parser.parse(map.text).urlset.url)) paths.push(new URL(url.loc).pathname);
  }
  for(const path of paths) {
    const html=await get(path); assert.equal(html.response.status,200,path); assert.match(html.row.type,/text\/html/);
    const md=await get(path,"text/markdown");
    if(!baseline) {assert.equal(md.response.status,200,path);assert.match(md.row.type,/text\/markdown/);assert.match(md.row.vary,/Accept/i);assert.ok(md.text.length>100);assert.match(md.text,/^# /m);assert.match(html.row.vary,/Accept/i);}
    if(!baseline) { const alt=await get(path+"index.md","text/markdown"); assert.equal(alt.response.status,200);assert.equal(alt.text,md.text); }
  }
  for(const path of ["/robots.txt","/llms.txt","/rss.xml","/sitemap.xml"]) {
    const item=await get(path,"*/*"); if(!baseline) {assert.equal(item.response.status,200,path);assert.ok(item.text.length>20);}
  }
  for(const path of ["/__porul-release-404-probe","/404.html","/404.md"]) {
    for(const accept of ["text/html","text/markdown"]) {
      const item=await get(path,accept);
      if(!baseline) {assert.equal(item.response.status,404,path);assert.ok(item.text.length>20); if(accept==="text/markdown") {assert.match(item.row.type,/text\/markdown/);assert.match(item.text,/\[Sitemap\]/);}}
    }
  }
  for(const agent of ["ChatGPT-User","OAI-SearchBot","GPTBot","ClaudeBot","Claude-User","Claude-SearchBot","Googlebot","Google-Extended","ora-agent","DeepSeekBot"]) {
    const item=await get("/","text/html",agent); if(!baseline) assert.equal(item.response.status,200,agent);
  }
  if(!baseline) {
    for(const [accept,type] of [["text/markdown;q=0,text/html","text/html"],["text/markdown;q=0.9,text/html;q=0.2","text/markdown"],["*/*","text/html"]]) {const item=await get("/",accept);assert.ok(item.row.type.startsWith(type));}
    assert.equal((await get("/","application/json")).response.status,406);
    const head=await get("/","text/markdown","PorulReleaseCheck/1.0","HEAD");assert.equal(head.response.status,200);assert.equal(head.text,"");assert.match(head.row.type,/text\/markdown/);
  }
} catch(error) { failure=error.message; }
console.log(JSON.stringify({origin,baseline,checks:results.length,results,failure},null,2));
if(failure) process.exitCode=1;
