import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem('mockUsers');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('mockUsers', JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const signup = (email, password) => {
    if (users.find(u => u.email === email)) return false;
    const newUser = { 
      id: Date.now(), 
      email, 
      password, 
      balance: 0, 
      copied: [], 
      suspended: false,
      deposits: [],
      withdrawals: []
    };
    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  const updateUser = (updated) => {
    const newList = users.map(u => u.id === updated.id ? updated : u);
    setUsers(newList);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, users, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
