import { useState } from 'react';
import { Link } from 'react-router-dom';
import { affiliates } from '../data/affiliates';
import StarRating from '../components/StarRating';

export default function Affiliates() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('revenue');

  const filtered = affiliates
    .filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.niche.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'revenue') return b.revenue - a.revenue;
      if (sort === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
      if (sort === 'followers') return b.followers - a.followers;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800">Top Affiliates</h1>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by name or niche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-5 py-2.5 rounded-full border border-slate-200 bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-400 w-64 text-sm"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-5 py-2.5 rounded-full border border-slate-200 bg-white/70 backdrop-blur text-sm font-medium cursor-pointer"
          >
            <option value="revenue">Highest Revenue</option>
            <option value="rating">Highest Rating</option>
            <option value="followers">Most Followers</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((a, idx) => (
          <div
            key={a.id}
            className="group glass rounded-2xl p-6 border border-white/30 hover:border-indigo-300/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              <img src={a.avatar} alt={a.name} className="w-16 h-16 rounded-full border-2 border-indigo-200/50 object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-lg leading-tight">{a.name}</h3>
                <p className="text-sm text-indigo-600 font-medium">{a.niche}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <StarRating rating={parseFloat(a.rating)} />
                  <span className="text-xs text-slate-400 ml-1">{a.rating}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="bg-slate-50/70 rounded-xl px-3 py-2 text-center">
                <p className="text-xs text-slate-400 uppercase">Revenue</p>
                <p className="font-bold text-emerald-600">${a.revenue.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50/70 rounded-xl px-3 py-2 text-center">
                <p className="text-xs text-slate-400 uppercase">Min Copy</p>
                <p className="font-bold text-indigo-600">${a.minDeposit.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50/70 rounded-xl px-3 py-2 text-center col-span-2">
                <p className="text-xs text-slate-400 uppercase">Followers</p>
                <p className="font-medium text-slate-700">{a.followers.toLocaleString()}</p>
              </div>
            </div>

            <Link
              to={`/affiliate/${a.id}`}
              className="mt-4 block text-center bg-indigo-600/90 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition shadow-md shadow-indigo-200/50 group-hover:shadow-indigo-300/80"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400 text-lg">No affiliates found. Try a different search.</div>
      )}
    </div>
  );
}
