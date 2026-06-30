import { Sparkles } from "lucide-react";
import Button from "./Button.jsx";

export default function Navbar({ breadcrumbs = [], onNavigate }) {
  return (
    <header className="sticky top-0 z-30 border-b border-violet-500/10 bg-navy-950/86 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-7">
        <button
          className="flex items-center gap-2 text-left"
          onClick={() => onNavigate("home")}
          aria-label="Go to home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-glow">
            <Sparkles size={16} />
          </span>
          <span className="text-lg font-black tracking-tight">
            PromptAds<span className="text-violet-400">Studio</span>
          </span>
        </button>

        {breadcrumbs.length > 0 ? (
          <nav className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
            {breadcrumbs.map((item, index) => (
              <span key={item} className="flex items-center gap-2">
                <button
                  className={`transition hover:text-slate-200 ${
                    index === breadcrumbs.length - 1 ? "text-violet-300" : ""
                  }`}
                  onClick={() => onNavigate(item.toLowerCase() === "home" ? "home" : item.toLowerCase())}
                >
                  {item}
                </button>
                {index < breadcrumbs.length - 1 && <span className="text-violet-700">›</span>}
              </span>
            ))}
          </nav>
        ) : (
          <Button className="min-h-9 rounded-full px-4 py-2" onClick={() => onNavigate("builder")}>
            Start Creating
          </Button>
        )}
      </div>
    </header>
  );
}
