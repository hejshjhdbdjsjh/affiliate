import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      heroRef.current.style.setProperty('--x', x);
      heroRef.current.style.setProperty('--y', y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-3xl mt-4"
      style={{
        background: 'radial-gradient(circle at calc(50% + var(--x, 0) * 20%) calc(50% + var(--y, 0) * 20%), #1e1b4b, #0f172a)',
      }}
    >
      {/* Floating glow orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-up">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          <span className="text-white">Copy the Best.</span><br />
          <span className="text-gradient">Earn Like Them.</span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
          AI‑powered affiliate mirroring — live leaderboard, one‑click copy. Mirror top earners in seconds.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-10 text-white/90">
          <div className="glass-dark px-6 py-3 rounded-2xl min-w-[140px]">
            <p className="text-2xl font-bold text-emerald-300">$147M+</p>
            <p className="text-xs uppercase tracking-wider text-slate-400">Total Earnings</p>
          </div>
          <div className="glass-dark px-6 py-3 rounded-2xl min-w-[140px]">
            <p className="text-2xl font-bold text-indigo-300">12.4K</p>
            <p className="text-xs uppercase tracking-wider text-slate-400">Active Copiers</p>
          </div>
          <div className="glass-dark px-6 py-3 rounded-2xl min-w-[140px]">
            <p className="text-2xl font-bold text-amber-300">4.8 ⭐</p>
            <p className="text-xs uppercase tracking-wider text-slate-400">Avg Rating</p>
          </div>
        </div>

        <Link
          to="/affiliates"
          className="inline-block mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-2xl shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
        >
          View Top Affiliates →
        </Link>
      </div>
    </div>
  );
}
