import { useParams, useNavigate } from 'react-router-dom';
import { affiliates } from '../data/affiliates';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import { useState } from 'react';

export default function AffiliateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const affiliate = affiliates.find(a => a.id === parseInt(id));
  const [copyMsg, setCopyMsg] = useState('');

  if (!affiliate) return <div className="pt-32 text-center text-red-400 text-xl">Affiliate not found.</div>;

  const alreadyCopied = user?.copied?.includes(affiliate.id);
  const maxRevenue = Math.max(...affiliate.growthCurve);

  const handleCopy = () => {
    if (!user) return navigate('/login');
    if (alreadyCopied) return setCopyMsg('You already copied this affiliate.');
    if (user.balance < affiliate.minDeposit) {
      return setCopyMsg(`Insufficient balance. Need $${affiliate.minDeposit.toLocaleString()}.`);
    }
    const updated = {
      ...user,
      balance: user.balance - affiliate.minDeposit,
      copied: [...(user.copied || []), affiliate.id]
    };
    updateUser(updated);
    setCopyMsg(`✅ Copied ${affiliate.name}! New balance: $${updated.balance.toLocaleString()}`);
  };

  return (
    <div className="max-w-5xl mx-auto pt-24 pb-12 px-4">
      <div className="glass rounded-3xl p-8 md:p-12 border border-white/40 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-slate-200/60 pb-8">
          <img src={affiliate.avatar} alt={affiliate.name} className="w-32 h-32 rounded-full border-4 border-indigo-300/50 shadow-lg" />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-slate-800">{affiliate.name}</h1>
            <p className="text-indigo-600 font-medium text-lg">{affiliate.niche}</p>
            <div className="flex items-center gap-3 justify-center md:justify-start mt-1">
              <StarRating rating={parseFloat(affiliate.rating)} />
              <span className="text-slate-500">{affiliate.rating} / 5</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">{affiliate.followers.toLocaleString()} followers</span>
            </div>
            <p className="text-3xl font-bold text-emerald-600 mt-2">${affiliate.revenue.toLocaleString()}</p>
            <p className="text-sm text-slate-400">{affiliate.monthsActive} months active</p>
          </div>
        </div>

        {/* Copy action */}
        <div className="my-8 p-6 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-2xl border border-indigo-200/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-semibold text-slate-700">Min deposit to copy:</p>
            <p className="text-2xl font-bold text-indigo-700">${affiliate.minDeposit.toLocaleString()}</p>
            <p className="text-sm text-slate-500">Mirror their product picks and posting schedule.</p>
          </div>
          <button
            onClick={handleCopy}
            disabled={alreadyCopied}
            className={`px-10 py-3.5 rounded-full font-bold text-white shadow-xl transition-all duration-300 ${
              alreadyCopied
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 hover:shadow-indigo-400/40'
            }`}
          >
            {alreadyCopied ? 'Already Copied ✅' : 'Copy This Affiliate'}
          </button>
        </div>
        {copyMsg && <p className="text-center font-medium text-slate-700 bg-white/50 p-3 rounded-xl mb-4">{copyMsg}</p>}

        {/* Chart */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-700 mb-3">Monthly Revenue (12‑month trend)</h3>
          <div className="bg-slate-100/60 p-4 rounded-2xl overflow-x-auto">
            <div className="flex items-end h-52 gap-2 min-w-[360px]">
              {affiliate.growthCurve.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full max-w-[40px] bg-gradient-to-t from-indigo-400 to-indigo-600 rounded-t-lg transition-all duration-500 hover:from-purple-500 hover:to-indigo-700"
                    style={{ height: `${(val / maxRevenue) * 100}%`, minHeight: '6px' }}
                  ></div>
                  <span className="text-[10px] text-slate-400 mt-1.5 font-medium">{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mt-6 bg-slate-50/60 p-5 rounded-2xl">
          <h4 className="font-semibold text-slate-700 mb-2">Top products mirrored:</h4>
          <ul className="flex flex-wrap gap-2">
            {affiliate.products.map((p, i) => (
              <li key={i} className="bg-white/70 px-4 py-1.5 rounded-full text-sm font-medium text-slate-700 border border-slate-200/60 shadow-sm">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
