```jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-gray-800">Copy the Best. Earn Like Them.</h1>
      <p className="text-xl text-gray-600 mt-4">AI‑powered affiliate mirroring — live leaderboard, one‑click copy.</p>
      <div className="flex justify-center gap-8 mt-8 text-2xl font-semibold text-indigo-600">
        <span>💰 $147M+ total earnings</span>
        <span>👥 12,400+ active copiers</span>
        <span>⭐ 4.8 avg rating</span>
      </div>
      <Link to="/affiliates" className="inline-block mt-10 bg-indigo-600 text-white px-10 py-4 rounded-lg text-xl hover:bg-indigo-700">
        View Top Affiliates
      </Link>
    </div>
  );
}
```
