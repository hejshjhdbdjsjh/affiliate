export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white/30 backdrop-blur mt-16 py-6">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-400">
        &copy; {new Date().getFullYear()} CopyAffiliates. Built for educational simulation.
      </div>
    </footer>
  );
}
