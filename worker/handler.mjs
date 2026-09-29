// A small representation layer over static assets; no submissions, database or UA bypass.
import { negotiate } from "./accept.mjs";
export function handler(routes) {
  const markdownPaths = new Set(Object.values(routes));
  return async function fetch(request, env) {
    const url = new URL(request.url);
    if (!["GET", "HEAD"].includes(request.method)) return env.ASSETS.fetch(request);
    const original = await env.ASSETS.fetch(request);
    if (original.status >= 300 && original.status < 400 && original.status !== 304) return original;
    const directMarkdown = markdownPaths.has(url.pathname) || url.pathname === "/404.md";
    const error = original.status === 404 || ["/404", "/404/", "/404.html", "/404.md"].includes(url.pathname);
    const document = error || routes[url.pathname] || original.headers.get("Content-Type")?.includes("text/html");
    if (!document && !directMarkdown) return original;
    const type = directMarkdown ? "text/markdown" : negotiate(request.headers.get("Accept"));
    const headers = new Headers(original.headers);
    const vary = headers.get("Vary");
    if (!vary?.split(",").some(value => ["accept", "*"].includes(value.trim().toLowerCase()))) headers.set("Vary", vary ? `${vary}, Accept` : "Accept");
    // No shared response cache: ASSETS already caches distinct underlying files.
    headers.set("Cache-Control", "private, no-cache");
    headers.set("X-Content-Type-Options", "nosniff");
    if (!type) {
      return new Response(request.method === "HEAD" ? null : "This page is available as text/html or text/markdown.\n", { status: 406, headers: { "Content-Type": "text/plain; charset=utf-8", "Vary": "Accept", "Cache-Control": "no-store" } });
    }
    let response = original;
    if (type === "text/markdown" && !directMarkdown) {
      const path = error ? "/404.md" : routes[url.pathname];
      if (!path) return original; // canonical redirects are handled by ASSETS.
      const target = new URL(path, url.origin);
      const clean = new Headers(request.headers);
      clean.set("Accept", "*/*");
      // Do not reuse an HTML validator or byte range for a Markdown representation.
      for (const key of ["If-None-Match", "If-Modified-Since", "Range", "If-Range"]) clean.delete(key);
      response = await env.ASSETS.fetch(new Request(target, { method: request.method, headers: clean }));
      if (!response.ok) return new Response("Markdown representation temporarily unavailable.\n", { status: 503, headers: { "Content-Type": "text/plain", "Cache-Control": "no-store", "Vary": "Accept" } });
      for (const key of ["ETag", "Last-Modified", "Content-Length", "Content-Encoding", "Content-Range"]) headers.delete(key);
    }
    headers.set("Content-Type", `${type}; charset=utf-8`);
    headers.set("Link", '</llms.txt>; rel="describedby"');
    if (directMarkdown) headers.set("X-Robots-Tag", "noindex, follow");
    if (error) { headers.set("X-Robots-Tag", "noindex, follow"); headers.delete("ETag"); }
    return new Response(request.method === "HEAD" ? null : response.body, { status: error ? 404 : response.status, headers });
  };
}
