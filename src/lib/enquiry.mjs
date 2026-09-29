// Pure enquiry rules; hidden or unrelated answers never leak into another intent.
export function fieldState(service, stage) {
  const benefits = service === "benefits";
  return { benefits, production: benefits && ["producing", "expanding"].includes(stage), machinery: benefits && ["planning", "producing", "expanding"].includes(stage) };
}
export function benefitsLines(values) {
  const state = fieldState(values.service, values.stage);
  if (!state.benefits) return [];
  const stages = { planning: "Planning a manufacturing unit", producing: "Production has started", expanding: "Expanding an existing unit" };
  return [`Location: ${String(values.district ?? "").trim()}, ${values.state ?? ""}`, `Stage: ${stages[values.stage] ?? "Not supplied"}`, `Udyam: ${values.udyam || "Not supplied"}`, ...(state.production ? [`Production start: ${values.production || "Not supplied"}`] : []), ...(state.machinery ? [`Machinery: ${values.machinery || "Not supplied"}`] : [])];
}
