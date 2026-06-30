import { useState, useRef, useEffect } from 'react';

export interface PromptInputProps {
  onSuggest?: (suggestion: string) => void;
  onSubmit?: (prompt: string) => void;
}

export function PromptInput({ onSuggest, onSubmit }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 240);
      textareaRef.current.style.height = `${Math.max(newHeight, 128)}px`;
    }
  }, [prompt]);

  const handleSubmit = () => {
    if (prompt.trim() && onSubmit) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  const suggestions = [
    'Draft a cover letter',
    'Explain quantum physics',
    'Debug this React code',
  ];

  return (
    <div className="w-full max-w-max-width-content text-center space-y-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Heading */}
      <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight">
        What can I help with?
      </h1>
      {/* Input Container */}
      <div className="relative w-full group">
        <div
          className={`bg-surface-container rounded-3xl p-md border shadow-sm transition-all duration-300 ${
            isFocused ? 'shadow-md border-outline ring-1 ring-outline' : 'border-outline-variant'
          }`}
        >
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="w-full bg-transparent border-none focus:ring-0 resize-none font-body-md text-body-md text-on-surface placeholder-on-surface-variant h-32 leading-relaxed focus:outline-none"
            placeholder="Ask anything"
            spellCheck="false"
          />
          {/* Utility Bar */}
          <div className="flex items-center justify-between mt-sm">
            {/* Left Utilities */}
            <div className="flex items-center gap-xs">
              <button className="flex items-center gap-xs px-sm py-xs rounded-full bg-surface-container-highest hover:bg-surface-dim transition-colors text-on-surface font-body-sm text-body-sm active:scale-95 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Deep Search</span>
              </button>
              <button className="flex items-center gap-xs px-sm py-xs rounded-full bg-surface-container-highest hover:bg-surface-dim transition-colors text-on-surface font-body-sm text-body-sm active:scale-95 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
                <span>Reason</span>
              </button>
            </div>
            {/* Send Button */}
            <button 
              onClick={handleSubmit}
              className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary rounded-full hover:opacity-90 active:scale-90 transition-all shadow-lg cursor-pointer"
            >
              <span className="material-symbols-outlined">arrow_upward</span>
            </button>
          </div>
        </div>
        {/* Suggestions / Contextual Chips */}
        <div className="flex flex-wrap justify-center gap-xs mt-lg opacity-80 group-hover:opacity-100 transition-opacity">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => {
                setPrompt(suggestion);
                onSuggest?.(suggestion);
              }}
              className="px-sm py-base rounded-full border border-outline-variant text-on-surface-variant font-body-sm text-body-sm cursor-pointer hover:bg-surface-container transition-colors"
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
