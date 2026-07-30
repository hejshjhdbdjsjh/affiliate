export default function Admin() {
  return (
    <div className="pt-28 max-w-4xl mx-auto px-4">
      <div className="glass rounded-3xl p-12 text-center border border-white/40 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-slate-800">Admin Panel</h1>
        <p className="text-slate-500 mt-4 text-lg">Full control — coming with backend integration.</p>
        <div className="mt-6 flex justify-center gap-6 text-sm text-slate-400">
          <span>👥 Users</span>
          <span>💰 Deposits</span>
          <span>📤 Withdrawals</span>
          <span>✏️ Affiliates</span>
        </div>
      </div>
    </div>
  );
}
