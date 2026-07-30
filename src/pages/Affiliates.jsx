import { useState } from 'react';
import { Link } from 'react-router-dom';
import { affiliates } from '../data/affiliates';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';

export default function Affiliates() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('revenue');
  const { user } = useAuth();

  const filtered = affiliates
    .filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.niche.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'revenue') return b.revenue - a.revenue;
      if (sort === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
      if (sort === 'followers') return b.followers - a.followers;
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Top Affiliates</h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by name or niche..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2 border rounded-lg bg-white">
          <option value="revenue">Highest Revenue</option>
          <option value="rating">Highest Rating</option>
          <option value="followers">Most Followers</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(a => (
          <div key={a.id} className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center gap-4">
              <img src={a.avatar} alt={a.name} className="w-16 h-16 rounded-full" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{a.name}</h3>
                <p className="text-sm text-indigo-600">{a.niche}</p>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Revenue</span>
                <span className="font-semibold text-emerald-600">${a.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rating</span>
                <span className="flex items-center gap-1">
                  <StarRating rating={parseFloat(a.rating)} />
                  <span className="text-gray-600">{a.rating}</span>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Min Copy</span>
                <span className="font-medium">${a.minDeposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Followers</span>
                <span className="text-gray-700">{a.followers.toLocaleString()}</span>
              </div>
            </div>
            <Link
              to={`/affiliate/${a.id}`}
              className="mt-4 block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-gray-500 py-10">No affiliates match your search.</p>}
    </div>
  );
}
