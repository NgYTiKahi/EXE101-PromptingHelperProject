import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginCard } from './components/LoginCard';
import { Home } from './pages/Home';

function App() {
  // Simple auth state for now
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (username: string, password?: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log(`Successfully logged in ${username}`);
        setIsAuthenticated(true);
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Network error. Please make sure the backend is running.');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Logging in with Google...');
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : (
            <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white">
              {/* Top Navigation */}
              <header className="flex justify-center items-center w-full py-xl px-md">
                <h1 className="text-headline-md font-headline-md font-bold text-[#8b5cf6] tracking-tight">
                  Prompt Helper
                </h1>
              </header>

              {/* Main Content Canvas */}
              <main className="flex-grow flex items-center justify-center px-md pb-3xl">
                <LoginCard onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />
              </main>

              {/* Footer */}
              <footer className="w-full py-xl flex flex-col items-center gap-base opacity-60">
                <div className="flex gap-lg">
                  <a className="text-label-sm font-label-sm text-gray-400 hover:text-white transition-colors" href="/terms">Terms of Service</a>
                  <a className="text-label-sm font-label-sm text-gray-400 hover:text-white transition-colors" href="/privacy">Privacy Policy</a>
                  <a className="text-label-sm font-label-sm text-gray-400 hover:text-white transition-colors" href="/support">Contact Support</a>
                </div>
                <p className="text-label-sm font-label-sm text-gray-400 mt-sm">
                  © 2026 Prompt Helper. All rights reserved.
                </p>
              </footer>
            </div>
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
