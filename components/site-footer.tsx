export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 py-10 text-center text-sm text-budz-muted">
      <p>© {new Date().getFullYear()} Tasty Budz. Sweet Temptations Delivered.</p>
      <p className="mt-2">
        21+ only. Products shown are for lawful adult use where permitted.
      </p>
    </footer>
  );
}
