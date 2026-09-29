// RFC 9110 media-range precedence: a specific exclusion beats a wildcard.
// We offer UTF-8 HTML and Markdown, without additional media-type parameters.
export function negotiate(accept) {
  if (accept === null) return "text/html";
  const ranges = accept.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map((part, order) => {
    const [type, ...parameters] = part.trim().toLowerCase().split(";").map(s => s.trim());
    let q = 1, supported = true, sawQ = false;
    for (const parameter of parameters) {
      const [key, raw = ""] = parameter.split("=");
      const value = raw.replace(/^"|"$/g, "");
      if (key.trim() === "q") { q = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(value) ? Number(value) : 0; sawQ = true; }
      else if (!sawQ && !(key.trim() === "charset" && value === "utf-8")) supported = false;
    }
    return { type, q: supported ? q : 0, order };
  });
  const choices = ["text/html", "text/markdown"].map(type => {
    const match = ranges.map(range => ({ ...range, specificity: range.type === type ? 2 : range.type === "text/*" ? 1 : range.type === "*/*" ? 0 : -1 }))
      .filter(range => range.specificity >= 0).sort((a, b) => b.specificity - a.specificity || b.q - a.q || a.order - b.order)[0];
    return { type, q: match?.q ?? 0, specificity: match?.specificity ?? -1 };
  }).sort((a, b) => b.q - a.q || b.specificity - a.specificity);
  return choices[0].q > 0 ? choices[0].type : null;
}
