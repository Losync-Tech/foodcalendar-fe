export function MealDescription({ description, className }: { description: string; className?: string }) {
  const segments: string[] = [];
  let depth = 0;
  let start = 0;

  for (let index = 0; index < description.length; index++) {
    const character = description[index];
    if (character === "(") depth++;
    if (character === ")" && depth > 0) depth--;
    if (character === "," && depth === 0) {
      segments.push(description.slice(start, index));
      start = index + 1;
    }
  }
  segments.push(description.slice(start));
  const items = segments.map(item => item.trim()).filter(Boolean);

  if (!items.length) return null;

  return (
    <span role="list" className={`block pl-4 ${className ?? ""}`}>
      {items.map((item, index) => (
        <span key={index} role="listitem" className="list-item list-disc whitespace-pre-wrap break-words">
          {item}
        </span>
      ))}
    </span>
  );
}
