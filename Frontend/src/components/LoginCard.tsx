import React, { useState } from 'react';

export interface LoginCardProps {
  onLogin?: (username: string, password: string) => void;
  onGoogleLogin?: () => void;
}

export function LoginCard({ onLogin, onGoogleLogin }: LoginCardProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(username, password);
    }
  };

  return (
    <div className="login-card w-full max-w-[420px] rounded-xl p-xl flex flex-col gap-lg">
      <div className="space-y-xs text-center">
        <h2 className="text-headline-lg font-headline-lg text-white">Welcome Back</h2>
        <p className="text-body-md font-body-md text-gray-400">Precision prompting awaits.</p>
      </div>

      <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-xs">
          <label className="text-label-sm font-label-sm text-[#9ca3af] uppercase tracking-wider" htmlFor="username">
            Username
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">person</span>
            <input 
              className="input-field w-full py-md pl-[44px] pr-md rounded-lg text-white font-label-md text-label-md placeholder:text-gray-500" 
              id="username" 
              placeholder="Enter your identifier" 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-xs">
          <div className="flex justify-between items-end">
            <label className="text-label-sm font-label-sm text-[#9ca3af] uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <a className="text-label-sm font-label-sm text-[#8b5cf6] hover:text-white transition-colors" href="/forgot-password">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">lock</span>
            <input 
              className="input-field w-full py-md pl-[44px] pr-md rounded-lg text-white font-label-md text-label-md placeholder:text-gray-500" 
              id="password" 
              placeholder="••••••••" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="primary-button w-full py-md mt-sm rounded-lg text-white font-label-md text-label-md font-bold uppercase tracking-widest active:scale-[0.98]" type="submit">
          Sign In
        </button>
      </form>

      <div className="flex items-center gap-md py-xs">
        <div className="h-[1px] flex-grow bg-[#2D3748]"></div>
        <span className="text-label-sm font-label-sm text-gray-400">OR</span>
        <div className="h-[1px] flex-grow bg-[#2D3748]"></div>
      </div>

      <button onClick={onGoogleLogin} type="button" className="secondary-button w-full py-md rounded-lg text-white font-label-md text-label-md flex items-center justify-center gap-md group">
        <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"></path>
          <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"></path>
          <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"></path>
          <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"></path>
        </svg>
        <span>Continue with Google</span>
      </button>

      <div className="text-center pt-md border-t border-[#2D3748]">
        <p className="text-body-md font-body-md text-gray-400">
          Don't have an account? 
          <a className="text-[#8b5cf6] hover:underline ml-xs" href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
