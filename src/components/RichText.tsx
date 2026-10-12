/**
 * Renders plain text from the content files: blank lines separate
 * paragraphs, and a block whose lines all start with "- " becomes a
 * bulleted list.
 */
export function RichText({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lines.every((l) => l.startsWith('- '))) {
          return (
            <ul key={i} className="mb-4 list-disc space-y-2 pl-6 marker:text-teal last:mb-0">
              {lines.map((l, j) => (
                <li key={j}>{l.slice(2)}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{lines.join(' ')}</p>;
      })}
    </>
  );
}
