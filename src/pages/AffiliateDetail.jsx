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

  if (!affiliate) return <div className="text-center py-20 text-red-500">Affiliate not found</div>;

  const alreadyCopied = user?.copied?.includes(affiliate.id);

  const handleCopy = () => {
    if (!user) return navigate('/login');
    if (alreadyCopied) return setCopyMsg('Already copied this affiliate.');
    if (user.balance < affiliate.minDeposit) {
      return setCopyMsg(`Insufficient balance. Need $${affiliate.minDeposit.toLocaleString()}.`);
    }

    const updated = {
      ...user,
      balance: user.balance - affiliate.minDeposit,
      copied: [...(user.copied || []), affiliate.id]
    };
    updateUser(updated);
    setCopyMsg(`Success! Copied ${affiliate.name}. Balance: $${updated.balance.toLocaleString()}`);
  };

  const maxRevenue = Math.max(...affiliate.growthCurve);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
        <img src={affiliate.avatar} alt={affiliate.name} className="w-32 h-32 rounded-full border-4 border-indigo-200" />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">{affiliate.name}</h1>
          <p className="text-indigo-600 font-medium">{affiliate.niche} · {affiliate.followers.toLocaleString()} followers</p>
          <div className="flex items-center gap-3 mt-1 justify-center md:justify-start">
            <StarRating rating={parseFloat(affiliate.rating)} />
            <span className="text-gray-600">{affiliate.rating} / 5</span>
          </div>
          <p className="text-2xl font-semibold text-emerald-600 mt-2">${affiliate.revenue.toLocaleString()} total revenue</p>
          <p className="text-sm text-gray-500">{affiliate.monthsActive} months active</p>
        </div>
      </div>

      {/* Copy section */}
      <div className="my-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          <p className="font-medium text-gray-700">Min deposit to copy: <span className="text-indigo-700 font-bold">${affiliate.minDeposit.toLocaleString()}</span></p>
          <p className="text-sm text-gray-500">You copy their product picks and posting style automatically.</p>
        </div>
        <button
          onClick={handleCopy}
          className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          {alreadyCopied ? 'Already Copied' : 'Copy This Affiliate'}
        </button>
      </div>
      {copyMsg && <p className="text-center font-medium text-gray-700 mb-4">{copyMsg}</p>}

      {/* Revenue growth chart (simple bars) */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Monthly Revenue (12‑month trend)</h3>
        <div className="flex items-end h-48 gap-1 bg-gray-100 p-3 rounded-xl overflow-x-auto">
          {affiliate.growthCurve.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[30px]">
              <div
                className="w-6 bg-indigo-500 rounded-t hover:bg-indigo-600 transition-all"
                style={{ height: `${(val / maxRevenue) * 100}%`, minHeight: '4px' }}
              ></div>
              <span className="text-[10px] text-gray-500 mt-1">{idx + 1}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Month 1</span>
          <span>Month 12</span>
        </div>
      </div>

      {/* Products */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-700">Top products mirrored:</h4>
        <ul className="list-disc list-inside text-gray-600">
          {affiliate.products.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
    </div>
  );
}
