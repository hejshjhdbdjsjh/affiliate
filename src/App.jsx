```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Affiliates from './pages/Affiliates';
import AffiliateDetail from './pages/AffiliateDetail';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/affiliates" element={<Affiliates />} />
              <Route path="/affiliate/:id" element={<AffiliateDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```
