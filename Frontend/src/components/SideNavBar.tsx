import { Link, useLocation } from 'react-router-dom';

export interface SideNavBarProps {}

export function SideNavBar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full z-40 flex flex-col items-center py-md bg-surface-container-low w-16 border-r border-outline-variant transition-colors">
      <div className="mb-xl flex flex-col items-center gap-md">
        <Link to="/" className="text-primary hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined font-headline-lg-mobile text-headline-lg-mobile">
            chat
          </span>
        </Link>
      </div>
      <nav className="flex flex-col gap-sm flex-1">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95 ${
            location.pathname === '/' ? 'text-primary bg-surface-container-high' : 'text-on-surface-variant'
          }`}
          title="Chat"
        >
          <span className="material-symbols-outlined">chat</span>
          <span className="font-body-sm text-[10px] mt-0.5">Chat</span>
        </Link>
        <Link
          to="/folders"
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95 ${
            location.pathname === '/folders' ? 'text-primary bg-surface-container-high' : 'text-on-surface-variant'
          }`}
          title="Folders"
        >
          <span className="material-symbols-outlined">folder</span>
          <span className="font-body-sm text-[10px] mt-0.5">Folders</span>
        </Link>
      </nav>
      <div className="mt-auto">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95 text-on-surface-variant">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </aside>
  );
}
