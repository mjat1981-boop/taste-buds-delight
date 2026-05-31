export function SectionTitle({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <div className="mb-4">
      {eyebrow && (
        <p className="mb-1 text-xs font-black uppercase tracking-[0.25em] text-budz-pink">{eyebrow}</p>
      )}
      <h2 className="inline-flex rounded-full border border-budz-green/40 bg-white/5 px-4 py-2 text-2xl font-black shadow-neon">
        <span className="text-budz-green">{title}</span>
      </h2>
    </div>
  );
}
