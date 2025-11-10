export function personalizeSeoData(
  data: Record<string, any>,
  location: string,
) {
  const result: Record<string, any> = structuredClone(data);

  result.hero = personalizeTextFields(result.hero, location, [
    "heading",
    "subheading",
    "paragraph",
  ]);
  result.form = personalizeTextFields(result.form, location, [
    "heading",
    "subheading",
    "description",
  ]);
  result.introParagraph = personalizeTextFields(
    result.introParagraph,
    location,
    ["heading"],
  );
  result.introparagraph = personalizeTextFields(
    result.introparagraph,
    location,
    ["heading"],
  );
  if (Array.isArray(result.introParagraph?.paragraphs)) {
    result.introParagraph.paragraphs = result.introParagraph.paragraphs.map(
      (paragraph: string) => injectLocation(paragraph, location),
    );
  }
  if (Array.isArray(result.introparagraph?.paragraphs)) {
    result.introparagraph.paragraphs = result.introparagraph.paragraphs.map(
      (paragraph: string) => injectLocation(paragraph, location),
    );
  }
  result.painPoints = personalizeCollection(result.painPoints, location, [
    "heading",
    "subheading",
  ]);
  result.painpoints = personalizeCollection(result.painpoints, location, [
    "heading",
    "subheading",
  ]);
  if (Array.isArray(result.painPoints?.painPoints)) {
    result.painPoints.painPoints = result.painPoints.painPoints.map(
      (item: any) =>
        personalizeTextFields(item, location, ["problem", "solution"]),
    );
  }
  if (Array.isArray(result.painpoints?.painPoints)) {
    result.painpoints.painPoints = result.painpoints.painPoints.map(
      (item: any) =>
        personalizeTextFields(item, location, ["problem", "solution"]),
    );
  }
  result.services = personalizeTextFields(result.services, location, [
    "heading",
    "subheading",
  ]);
  if (Array.isArray(result.services?.items)) {
    result.services.items = result.services.items.map((item: any) =>
      personalizeTextFields(item, location, ["title", "description"]),
    );
  }
  result.content = personalizeTextFields(result.content, location, [
    "heading",
    "text1",
    "text2",
    "text3",
  ]);
  result.strategic = personalizeCollection(result.strategic, location, [
    "heading",
    "subheading",
  ]);
  result.keyBenefits = personalizeCollection(result.keyBenefits, location, [
    "heading",
    "subheading",
  ]);
  result.keybenefits = personalizeCollection(result.keybenefits, location, [
    "heading",
    "subheading",
  ]);
  if (Array.isArray(result.keyBenefits?.benefits)) {
    result.keyBenefits.benefits = result.keyBenefits.benefits.map((item: any) =>
      personalizeTextFields(item, location, ["title", "description"]),
    );
  }
  if (Array.isArray(result.keybenefits?.benefits)) {
    result.keybenefits.benefits = result.keybenefits.benefits.map((item: any) =>
      personalizeTextFields(item, location, ["title", "description"]),
    );
  }
  result.features = personalizeCollection(result.features, location, [
    "heading",
    "subheading",
  ]);
  result.faq = personalizeCollection(result.faq, location, [
    "heading",
    "subheading",
  ]);
  if (Array.isArray(result.faq?.items)) {
    result.faq.items = result.faq.items.map((item: any) =>
      personalizeTextFields(item, location, ["question", "answer"]),
    );
  }
  if (Array.isArray(result.faq?.faqs)) {
    result.faq.faqs = result.faq.faqs.map((item: any) =>
      personalizeTextFields(item, location, ["q", "a"]),
    );
  }

  return result;
}

function personalizeCollection(obj: any, location: string, fields: string[]) {
  if (!obj) return obj;
  if (typeof obj === "string") {
    return injectLocation(obj, location);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === "string" ? injectLocation(item, location) : item,
    );
  }
  const updated = personalizeTextFields(obj, location, fields);
  return updated;
}

function personalizeTextFields(obj: any, location: string, fields: string[]) {
  if (!obj) return obj;
  if (typeof obj === "string") {
    return injectLocation(obj, location);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === "string" ? injectLocation(item, location) : item,
    );
  }
  const copy: Record<string, any> = { ...obj };
  fields.forEach((field) => {
    if (typeof copy[field] === "string") {
      copy[field] = injectLocation(copy[field] as string, location);
    }
  });
  return copy;
}

export function injectLocation(text: string, location: string): string {
  if (!text) return text;
  if (text.toLowerCase().includes(location.toLowerCase())) {
    return text;
  }
  const trimmed = text.trimEnd();
  if (trimmed.length <= 60) {
    if (/[.!?]$/.test(trimmed)) {
      return trimmed.replace(/([.!?])$/, ` in ${location}$1`);
    }
    return `${trimmed} in ${location}`;
  }
  if (/^based in\s/i.test(trimmed)) {
    return text;
  }
  return `Based in ${location}, ${trimmed}`;
}
