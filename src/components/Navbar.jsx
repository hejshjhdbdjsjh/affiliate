import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-indigo-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">CopyAffiliates</Link>
        <div className="space-x-4">
          <Link to="/affiliates">Top Affiliates</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              {user.email === 'admin@copy.com' && <Link to="/admin">Admin</Link>}
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-white text-indigo-700 px-3 py-1 rounded">Login</Link>
              <Link to="/signup" className="bg-green-500 px-3 py-1 rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
```
