// Regression tests for negotiation, public content parity and the enquiry flow.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { negotiate } from "../worker/accept.mjs";
import { handler } from "../worker/handler.mjs";
import { toMarkdown, walk, attr } from "../scripts/markdown.mjs";
import { parse } from "parse5";
import { benefitsLines, fieldState } from "../src/lib/enquiry.mjs";

test("Accept selection respects quality, specificity, exclusions and browser defaults", () => {
  const cases = [[null,"text/html"],["*/*","text/html"],["text/*","text/html"],["text/html","text/html"],["text/markdown","text/markdown"],["TEXT/MARKDOWN; charset=UTF-8","text/markdown"],["text/markdown;q=0.5,text/html;q=0.9","text/html"],["text/html;q=0.5,text/markdown;q=0.9","text/markdown"],["text/markdown;q=0,*/*;q=1","text/html"],["text/html;q=0,*/*;q=1","text/markdown"],["application/json",null],["text/markdown;q=0",null],["text/html;q=0,text/markdown;q=0",null],["text/markdown;q=9",null],["text/markdown;variant=unknown",null],["text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,*/*;q=0.8","text/html"],["text/*;q=1,text/markdown;q=0.1","text/html"]];
  for (const [accept, expected] of cases) assert.equal(negotiate(accept), expected, String(accept));
});

const routes = { "/": "/index.md", "/about/": "/about/index.md" };
const fetcher = handler(routes);
const calls = [];
const env = { ASSETS: { fetch: async request => {
  const path = new URL(request.url).pathname;
  calls.push({path,headers:request.headers});
  if (path === "/about") return new Response(null, {status:301,headers:{Location:"/about/"}});
  if (request.method === "POST") return new Response("Not allowed",{status:405});
  const files = {"/":"<h1>Porul</h1>","/about/":"<h1>About</h1>","/index.md":"# Porul\n\nBenefits review.","/about/index.md":"# About Porul", "/404.md":"# Not found\n\nThis page does not exist. [Sitemap](/sitemap-index.xml)","/404.html":"<h1>Not found</h1>","/asset.css":"body{}"};
  return new Response(request.method === "HEAD" ? null : files[path] ?? "<h1>Not found</h1>", {status: files[path] ? 200 : 404,headers:{"Content-Type":path.endsWith(".css")?"text/css":path.endsWith(".md")?"text/plain":"text/html","Vary":"Accept-Encoding","ETag":"asset-tag"}});
}}};
const request = (path, accept, extra={}) => new Request("https://porul.in"+path,{...extra,headers:{...(accept?{Accept:accept}:{}),...extra.headers}});

test("same URL negotiates Markdown and HTML without sharing validators", async () => {
  for (const accept of ["text/markdown","text/html","text/markdown"]) {
    const response = await fetcher(request("/",accept,{headers:{Accept:accept,"If-None-Match":"html-tag",Range:"bytes=0-2"}}),env);
    assert.equal(response.status,200); assert.match(response.headers.get("Content-Type"),new RegExp(accept));
    assert.equal(response.headers.get("Vary"),"Accept-Encoding, Accept");
    assert.equal(response.headers.get("Cache-Control"),"private, no-cache");
    assert.match(await response.text(),accept === "text/markdown" ? /^# Porul/ : /<h1>/);
    if (accept === "text/markdown") { assert.equal(response.headers.get("ETag"),null); assert.equal(calls.at(-1).headers.get("Range"),null); }
  }
});
test("Markdown 404 remains a useful 404, including explicit error assets", async () => {
  for (const path of ["/missing","/missing.file","/404","/404/","/404.html","/404.md"]) {
    const response = await fetcher(request(path,"text/markdown"),env);
    assert.equal(response.status,404,path); assert.match(response.headers.get("Content-Type"),/text\/markdown/);
    assert.match(await response.text(),/\[Sitemap\]/); assert.match(response.headers.get("X-Robots-Tag"),/noindex/);
  }
});
test("HEAD, 406, redirects, static assets and non-GET behavior", async () => {
  const head = await fetcher(request("/","text/markdown",{method:"HEAD"}),env);
  assert.equal(head.status,200); assert.equal(await head.text(),""); assert.match(head.headers.get("Content-Type"),/markdown/);
  assert.equal((await fetcher(request("/","application/json"),env)).status,406);
  const redirect = await fetcher(request("/about","text/markdown"),env); assert.equal(redirect.status,301);
  const asset = await fetcher(request("/asset.css","text/markdown"),env); assert.equal(asset.headers.get("Content-Type"),"text/css");
  assert.equal((await fetcher(request("/","text/html",{method:"POST"}),env)).status,405);
  const direct = await fetcher(request("/index.md","*/*"),env); assert.match(direct.headers.get("Content-Type"),/markdown/); assert.match(direct.headers.get("X-Robots-Tag"),/noindex/);
});
test("Markdown conversion retains evidence and links, not hidden UI or scripts", () => {
  const result=toMarkdown('<main><h1>Heading</h1><p>Published <time>28 September</time>. <a href="/about/">Source</a></p><details><summary>Evidence</summary><p>Company-supplied.</p></details><form>private</form><div hidden>secret</div><script>bad()</script><p lang="ta">பொருள்</p></main>',"https://porul.in/");
  assert.match(result,/# Heading/); assert.match(result,/Published 28 September/); assert.match(result,/\[Source\]\(https:\/\/porul.in\/about\/\)/); assert.match(result,/Company-supplied/); assert.match(result,/பொருள்/); assert.doesNotMatch(result,/private|secret|bad\(\)/);
});
test("benefits fields are stage-specific and cannot leak into GeM enquiries", () => {
  assert.deepEqual(fieldState("benefits","planning"),{benefits:true,production:false,machinery:true});
  assert.equal(fieldState("benefits","producing").production,true);
  assert.equal(fieldState("benefits","expanding").production,true);
  assert.equal(fieldState("benefits","").machinery,false);
  const values={service:"benefits",stage:"planning",district:"Salem",state:"Tamil Nadu",production:"2025-01",machinery:"Planning a purchase"};
  assert.doesNotMatch(benefitsLines(values).join("\n"),/2025-01/);
  assert.match(benefitsLines(values).join("\n"),/Salem, Tamil Nadu/);
  for (const service of ["registration","catalogue","dsc","bid","tn-tender","marketing","certification","exhibitions","compliance","other"]) assert.deepEqual(benefitsLines({...values,service}),[]);
});
test("built release includes parity, contact trust, bounded FAQs and machine discovery", async () => {
  const map=JSON.parse(await readFile(new URL("../.generated/routes.json",import.meta.url),"utf8"));
  const llms=await readFile(new URL("../dist/llms.txt",import.meta.url),"utf8");
  assert.match(llms,/^# Porul.in\n/); assert.match(llms,/## When to use Porul/);
  for (const [route,md] of Object.entries(map)) {
    const html=await readFile(new URL("../dist"+route+"index.html",import.meta.url),"utf8");
    const markdown=await readFile(new URL("../dist"+md,import.meta.url),"utf8");
    assert.equal(markdown,toMarkdown(html,"https://porul.in"+route));
    assert.ok(markdown.length>100); assert.doesNotMatch(markdown,/turn\d+(?:search|view)\d+|cite|:contentReference/);
    const nodes=walk(parse(html));
    assert.ok(nodes.some(n=>n.tagName==="link"&&attr(n,"type")==="text/markdown"&&attr(n,"href")==="https://porul.in"+md));
    if (["/about/","/contact/","/privacy/"].includes(route)) {
      const main=nodes.find(n=>n.tagName==="main");
      const text=walk(main).filter(n=>n.nodeName==="#text").map(n=>n.value).join(" ");
      assert.ok(text.length>500,route);
    }
  }
  for (const link of llms.matchAll(/\]\(https:\/\/porul.in([^)]*)\)/g)) {
    assert.ok(link[1].endsWith(".xml")||Object.values(map).includes(link[1]),link[1]);
  }
  const home=await readFile(new URL("../dist/index.html",import.meta.url),"utf8");
  assert.match(home,/Find out which MSME benefits could apply/);
  assert.doesNotMatch(home,/Your MSME.s extended back office|Tell us what.s pending|proto-bar|class="rn"/);
  const nodes=walk(parse(home));
  const json=nodes.find(n=>n.tagName==="script"&&attr(n,"type")==="application/ld+json");
  const graph=JSON.parse(json.childNodes[0].value)["@graph"];
  const faq=graph.find(n=>n["@type"]==="FAQPage");
  for(const q of faq.mainEntity) { assert.ok(home.includes(q.name)); assert.ok(home.includes(q.acceptedAnswer.text)); }
  assert.equal(graph.find(n=>n["@type"]==="Organization").address,undefined,"Never invent an address");
});

test("all generated internal links, fragments and assets resolve", async () => {
  const map=JSON.parse(await readFile(new URL("../.generated/routes.json",import.meta.url),"utf8"));
  const documents=new Map();
  for(const route of [...Object.keys(map),"/404.html"]) {
    const file=route.endsWith(".html")?route:route+"index.html";
    documents.set(route,walk(parse(await readFile(new URL("../dist"+file,import.meta.url),"utf8"))));
  }
  let checked=0;
  for(const [route,nodes] of documents) for(const node of nodes) {
    for(const key of ["href","src"]) {
      const value=attr(node,key); if(!value) continue;
      const url=new URL(value,"https://porul.in"+route);
      if(url.origin!=="https://porul.in") continue;
      if(documents.has(url.pathname)) {
        if(url.hash) assert.ok(documents.get(url.pathname).some(n=>attr(n,"id")===decodeURIComponent(url.hash.slice(1))),`${route} -> ${value}`);
      } else await access(new URL("../dist"+url.pathname,import.meta.url));
      checked++;
    }
  }
  assert.ok(checked>300);
});

test("benefits location copy is substantive, discoverable and never claims an office", async () => {
  const route = "/msme-benefits/";
  const map=JSON.parse(await readFile(new URL("../.generated/routes.json",import.meta.url),"utf8"));
  assert.equal(map[route],"/msme-benefits/index.md");
  const html=await readFile(new URL("../dist/msme-benefits/index.html",import.meta.url),"utf8");
  const markdown=await readFile(new URL("../dist/msme-benefits/index.md",import.meta.url),"utf8");
  const nodes=walk(parse(html));
  const title=nodes.find(n=>n.tagName==="title");
  assert.match(title.childNodes[0].value,/MSME Benefits Review/);
  for(const city of ["Coimbatore","Hosur","Chennai"]) {
    assert.match(html,new RegExp(city));
    assert.match(markdown,new RegExp(city));
  }
  assert.match(html,/relevant authority decides eligibility/);
  const graph=JSON.parse(nodes.find(n=>n.tagName==="script"&&attr(n,"type")==="application/ld+json").childNodes[0].value)["@graph"];
  const service=graph.find(n=>n["@type"]==="Service");
  assert.deepEqual(service.areaServed.map(n=>n.name),["Tamil Nadu","Karnataka"]);
  assert.match(service.serviceType,/benefits scheme review/);
  const org=graph.find(n=>n["@type"]==="Organization");
  assert.equal(org.address,undefined);
  assert.ok(!graph.some(n=>["LocalBusiness","PostalAddress"].includes(n["@type"])));
  for(const path of ["index","gem-services/index","about/index","contact/index","enquire/index"]) {
    const source=await readFile(new URL(`../dist/${path}.html`,import.meta.url),"utf8");
    assert.match(source,/href="\/msme-benefits\/"/,path);
  }
});
