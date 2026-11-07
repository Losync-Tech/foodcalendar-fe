export function MealDescription({ description, className }: { description: string; className?: string }) {
  const items = description.split(",").map(item => item.trim()).filter(Boolean);

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
