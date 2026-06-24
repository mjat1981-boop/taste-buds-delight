export function SectionTitle({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <div className="mb-4">
      {eyebrow && (
        <p className="mb-1 text-xs font-black uppercase tracking-[0.25em] text-tbd-brown">{eyebrow}</p>
      )}
      <h2 className="inline-flex rounded-full border border-tbd-green/40 bg-tbd-green/5 px-4 py-2 text-2xl font-black shadow-tbd-soft">
        <span className="text-tbd-green">{title}</span>
      </h2>
    </div>
  );
}
