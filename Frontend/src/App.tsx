
import { LoginCard } from './components/LoginCard';

function App() {
  const handleLogin = (username: string) => {
    console.log(`Logging in ${username}...`);
    // Will connect to Backend Authentication API here
  };

  const handleGoogleLogin = () => {
    console.log('Logging in with Google...');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="flex justify-center items-center w-full py-xl px-md">
        <h1 className="text-headline-md font-headline-md font-bold text-on-background tracking-tight">
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
          <a className="text-label-sm font-label-sm text-on-secondary-fixed-variant hover:text-on-surface transition-colors" href="/terms">Terms of Service</a>
          <a className="text-label-sm font-label-sm text-on-secondary-fixed-variant hover:text-on-surface transition-colors" href="/privacy">Privacy Policy</a>
          <a className="text-label-sm font-label-sm text-on-secondary-fixed-variant hover:text-on-surface transition-colors" href="/support">Contact Support</a>
        </div>
        <p className="text-label-sm font-label-sm text-on-secondary-fixed-variant mt-sm">
          © 2026 Prompt Helper. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
