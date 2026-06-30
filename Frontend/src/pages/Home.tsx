import { useState } from 'react';
import { SideNavBar } from '../components/SideNavBar';
import { TopNavBar } from '../components/TopNavBar';
import { PromptInput } from '../components/PromptInput';
import { Footer } from '../components/Footer';

export interface HomeProps {}

export function Home() {
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setEnhancedPrompt(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/home/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to enhance prompt');
      }

      const data = await response.json();
      setEnhancedPrompt(data.enhanced_prompt);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Is LM Studio running?');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (enhancedPrompt) {
      navigator.clipboard.writeText(enhancedPrompt);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased overflow-hidden min-h-screen">
      <SideNavBar />
      <TopNavBar />
      
      {/* Main Content Area */}
      <main className="ml-16 min-h-screen flex flex-col items-center justify-center px-md pb-xl">
        <PromptInput onSubmit={handlePromptSubmit} />
        
        {/* Output Area */}
        <div className="w-full max-w-max-width-content mt-lg px-md transition-all">
          {isLoading && (
            <div className="flex flex-col items-center gap-sm p-lg animate-pulse">
              <span className="material-symbols-outlined text-primary text-[48px] animate-spin">
                psychology
              </span>
              <p className="text-on-surface-variant font-body-md">Enhancing your prompt with Gemma 4...</p>
            </div>
          )}

          {error && (
            <div className="bg-error-container text-on-error-container p-md rounded-xl shadow-sm flex items-start gap-sm">
              <span className="material-symbols-outlined">error</span>
              <div>
                <h3 className="font-label-bold text-label-bold uppercase tracking-wide">Error</h3>
                <p className="font-body-sm mt-xs">{error}</p>
              </div>
            </div>
          )}

          {enhancedPrompt && !isLoading && !error && (
            <div className="bg-surface rounded-3xl p-md border border-outline-variant shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-xs">
                <h3 className="font-label-bold text-label-bold text-primary uppercase tracking-wider flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  Enhanced Prompt
                </h3>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-xs rounded-full hover:bg-surface-container"
                  title="Copy to clipboard"
                >
                  <span className="material-symbols-outlined text-[20px]">content_copy</span>
                </button>
              </div>
              <div className="bg-surface-container-low rounded-xl p-md text-on-surface font-code text-code overflow-x-auto whitespace-pre-wrap">
                {enhancedPrompt}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
