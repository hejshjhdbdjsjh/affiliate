import { useAuth } from '../context/AuthContext';
import { affiliates } from '../data/affiliates';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const [depositAmt, setDepositAmt] = useState('');
  const [withdrawAmt, setWithdrawAmt] = useState('');
  const [msg, setMsg] = useState('');

  if (!user) {
    return (
      <div className="pt-32 text-center">
        <p className="text-slate-500">Please <Link to="/login" className="text-indigo-600 underline font-semibold">login</Link> to view your dashboard.</p>
      </div>
    );
  }

  const copiedAffiliates = affiliates.filter(a => user.copied?.includes(a.id));

  const handleDeposit = () => {
    const amt = parseFloat(depositAmt);
    if (!amt || amt <= 0) return setMsg('Enter a valid amount.');
    const updated = {
      ...user,
      deposits: [...(user.deposits || []), { amount: amt, status: 'pending', date: new Date().toISOString() }]
    };
    updateUser(updated);
    setMsg(`✅ Deposit request of $${amt} submitted (pending approval).`);
    setDepositAmt('');
  };

  const handleWithdraw = () => {
    const amt = parseFloat(withdrawAmt);
    if (!amt || amt <= 0) return setMsg('Enter a valid amount.');
    if (amt > user.balance) return setMsg('Insufficient balance.');
    const updated = {
      ...user,
      withdrawals: [...(user.withdrawals || []), { amount: amt, status: 'pending', date: new Date().toISOString() }]
    };
    updateUser(updated);
    setMsg(`✅ Withdrawal request of $${amt} submitted (pending approval).`);
    setWithdrawAmt('');
  };

  return (
    <div className="max-w-6xl mx-auto pt-24 pb-12 px-4">
      <h1 className="text-4xl font-extrabold text-slate-800 mb-8">My Dashboard</h1>

      {/* Balance card - glass */}
      <div className="glass rounded-3xl p-8 border border-white/40 shadow-2xl bg-gradient-to-br from-indigo-900/10 to-purple-900/10">
        <div className="flex flex-wrap justify-between items-center gap-6">
          <div>
            <p className="text-sm uppercase tracking-wider text-slate-500">Available Balance</p>
            <p className="text-5xl font-extrabold text-slate-800">${user.balance.toLocaleString()}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <input
              type="number"
              placeholder="Amount"
              value={depositAmt}
              onChange={(e) => setDepositAmt(e.target.value)}
              className="w-28 px-4 py-2.5 rounded-full border border-slate-200 bg-white/50 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button onClick={handleDeposit} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-md transition">
              Deposit
            </button>
            <input
              type="number"
              placeholder="Amount"
              value={withdrawAmt}
              onChange={(e) => setWithdrawAmt(e.target.value)}
              className="w-28 px-4 py-2.5 rounded-full border border-slate-200 bg-white/50 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button onClick={handleWithdraw} className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-md transition">
              Withdraw
            </button>
          </div>
        </div>
        {msg && <p className="mt-4 text-center text-sm font-medium text-slate-700 bg-white/50 p-3 rounded-xl">{msg}</p>}
      </div>

      {/* Pending requests summary */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="glass rounded-2xl p-5 border border-white/30 text-center">
          <p className="text-slate-500 text-sm">Pending Deposits</p>
          <p className="text-2xl font-bold text-emerald-600">{user.deposits?.filter(d => d.status === 'pending').length || 0}</p>
        </div>
        <div className="glass rounded-2xl p-5 border border-white/30 text-center">
          <p className="text-slate-500 text-sm">Pending Withdrawals</p>
          <p className="text-2xl font-bold text-amber-600">{user.withdrawals?.filter(w => w.status === 'pending').length || 0}</p>
        </div>
      </div>

      {/* Copied list */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Your Copied Affiliates ({copiedAffiliates.length})</h2>
        {copiedAffiliates.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center border border-white/30">
            <p className="text-slate-500">You haven't copied anyone yet.</p>
            <Link to="/affiliates" className="text-indigo-600 font-semibold hover:underline">Browse top affiliates →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {copiedAffiliates.map(a => (
              <div key={a.id} className="glass rounded-2xl p-4 flex items-center gap-4 border border-white/30 hover:border-indigo-300/50 transition">
                <img src={a.avatar} alt={a.name} className="w-14 h-14 rounded-full border-2 border-indigo-200/50" />
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{a.name}</p>
                  <p className="text-sm text-slate-500">{a.niche} · ${a.revenue.toLocaleString()}</p>
                  <Link to={`/affiliate/${a.id}`} className="text-xs text-indigo-600 font-medium hover:underline">View profile</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
