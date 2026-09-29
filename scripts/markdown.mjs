// Convert only public rendered main content. HTML remains the source of truth.
import { parse } from "parse5";
export const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
export const walk = node => [node, ...(node.childNodes ?? []).flatMap(walk)];
const escape = text => text.replace(/([\\`*_[\]<>])/g, "\\$1");
export function toMarkdown(html, canonical) {
  const nodes = walk(parse(html));
  const main = nodes.find(node => node.tagName === "main");
  if (!main) throw new Error(`Missing main: ${canonical}`);
  const render = node => {
    if (node.nodeName === "#text") return escape(node.value.replace(/\s+/g, " "));
    const tag = node.tagName;
    if (["script", "style", "form", "button", "input", "select", "textarea"].includes(tag) || attr(node, "hidden") !== undefined || attr(node, "aria-hidden") === "true") return "";
    const text = (node.childNodes ?? []).map(render).join("").trim();
    if (/^h[1-6]$/.test(tag ?? "")) return `\n\n${"#".repeat(Number(tag[1]))} ${text}\n\n`;
    if (tag === "a") {
      const href = attr(node, "href");
      if (!href || !text) return text;
      return `[${text}](${new URL(href, canonical).href.replace(/\(/g, "%28").replace(/\)/g, "%29")}) `;
    }
    if (tag === "img") return attr(node, "alt") ? `\n\nImage: ${escape(attr(node, "alt"))}\n\n` : "";
    if (tag === "br") return "\n";
    if (tag === "li") return `\n- ${text.replace(/\n/g, "\n  ")}\n`;
    if (tag === "summary") return `\n\n**${text}**\n\n`;
    if (tag === "strong" || tag === "b") return `**${text}** `;
    if (["p", "div", "section", "article", "header", "aside", "nav", "figure", "figcaption", "ul", "ol", "dl", "dt", "dd", "details"].includes(tag)) return text ? `\n\n${text}\n\n` : "";
    return (node.childNodes ?? []).map(render).join("");
  };
  return `${render(main).replace(/\n[ \t]+\n/g, "\n\n").replace(/\n{3,}/g, "\n\n").trim()}\n\n---\n\nCanonical page: ${canonical}\n\n[About Porul](https://porul.in/about/) · [Contact](https://porul.in/contact/) · [Agent guide](https://porul.in/llms.txt)\n`;
}
