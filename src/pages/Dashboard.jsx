import { useAuth } from '../context/AuthContext';
import { affiliates } from '../data/affiliates';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const [depositAmt, setDepositAmt] = useState('');
  const [withdrawAmt, setWithdrawAmt] = useState('');
  const [msg, setMsg] = useState('');

  if (!user) return <div className="text-center py-20">Please <Link to="/login" className="text-indigo-600 underline">login</Link> to view dashboard.</div>;

  const copiedAffiliates = affiliates.filter(a => user.copied?.includes(a.id));

  const handleDeposit = () => {
    const amt = parseFloat(depositAmt);
    if (!amt || amt <= 0) return setMsg('Enter a valid amount.');
    // mock pending request (stored in user)
    const updated = {
      ...user,
      deposits: [...(user.deposits || []), { amount: amt, status: 'pending', date: new Date().toISOString() }]
    };
    updateUser(updated);
    setMsg(`Deposit request of $${amt} submitted (pending approval).`);
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
    setMsg(`Withdrawal request of $${amt} submitted (pending approval).`);
    setWithdrawAmt('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>

      {/* Balance card */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-6 rounded-2xl shadow-lg flex flex-wrap justify-between items-center">
        <div>
          <p className="text-sm opacity-80">Available Balance</p>
          <p className="text-4xl font-bold">${user.balance.toLocaleString()}</p>
        </div>
        <div className="flex gap-3 flex-wrap mt-2 sm:mt-0">
          <input
            type="number"
            placeholder="Amount"
            value={depositAmt}
            onChange={(e) => setDepositAmt(e.target.value)}
            className="w-28 px-3 py-2 rounded text-gray-800"
          />
          <button onClick={handleDeposit} className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded font-semibold">Deposit</button>
          <input
            type="number"
            placeholder="Amount"
            value={withdrawAmt}
            onChange={(e) => setWithdrawAmt(e.target.value)}
            className="w-28 px-3 py-2 rounded text-gray-800"
          />
          <button onClick={handleWithdraw} className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded font-semibold">Withdraw</button>
        </div>
      </div>
      {msg && <p className="text-center font-medium text-gray-700 bg-gray-100 p-2 rounded">{msg}</p>}

      {/* Pending requests summary */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <p className="text-gray-500">Pending deposits</p>
          <p className="text-xl font-bold text-emerald-600">
            {user.deposits?.filter(d => d.status === 'pending').length || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <p className="text-gray-500">Pending withdrawals</p>
          <p className="text-xl font-bold text-amber-600">
            {user.withdrawals?.filter(w => w.status === 'pending').length || 0}
          </p>
        </div>
      </div>

      {/* Copied affiliates list */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Copied Affiliates ({copiedAffiliates.length})</h2>
        {copiedAffiliates.length === 0 ? (
          <p className="text-gray-500 bg-white p-6 rounded-xl shadow">You haven't copied anyone yet. <Link to="/affiliates" className="text-indigo-600 underline">Browse top affiliates</Link>.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {copiedAffiliates.map(a => (
              <div key={a.id} className="bg-white p-4 rounded-xl shadow flex items-center gap-4 border border-gray-100">
                <img src={a.avatar} alt={a.name} className="w-14 h-14 rounded-full" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{a.name}</p>
                  <p className="text-sm text-gray-500">{a.niche} · ${a.revenue.toLocaleString()}</p>
                  <Link to={`/affiliate/${a.id}`} className="text-xs text-indigo-600 hover:underline">View profile</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
