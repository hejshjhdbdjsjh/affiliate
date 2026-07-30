import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-gradient">
          CopyAffiliates
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/affiliates" className="text-slate-600 hover:text-indigo-600 transition">Top Affiliates</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-slate-600 hover:text-indigo-600 transition">Dashboard</Link>
              {user.email === 'admin@copy.com' && (
                <Link to="/admin" className="text-amber-600 hover:text-amber-700 transition">Admin</Link>
              )}
              <button onClick={logout} className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm transition shadow-md">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-indigo-600 transition">Login</Link>
              <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full text-sm transition shadow-md">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
