
export interface TopNavBarProps {
  userAvatarUrl?: string;
  onGetPro?: () => void;
}

export function TopNavBar({ userAvatarUrl, onGetPro }: TopNavBarProps) {
  return (
    <header className="fixed top-0 right-0 left-16 z-30 bg-transparent pointer-events-none">
      <div className="flex justify-end items-center w-full px-md py-sm max-w-max-width-content mx-auto gap-md pointer-events-auto">
        <div className="flex items-center gap-md">
          <button 
            onClick={onGetPro}
            className="px-md py-xs rounded-full border border-outline font-label-bold text-label-bold text-primary hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          >
            Get Pro
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant hover:opacity-80 transition-opacity duration-200 cursor-pointer">
            <img 
              className="w-full h-full object-cover" 
              alt="User Avatar" 
              src={userAvatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCRIXXK-GnkQd-fuAj6B3thOJ0-tujLJ9jqVdkpq7_FrT_HavNmUQOV4rnTk96mUPPnzSQQdKXJCTpYk1vJL94xc9oH2gC--u9EkCBb6LVr9V1r8okPilKLDbU1uxTRKsxkbz2k0o4lOqUca-hIo5RnEZ3cE6nl50SYCww1QNNZA870nLn2ut2GYQd-ZIfHC1P8TFaXLBOlPwa-lDnlZNVF_B4qylUe3P8V7tdxJX7GEMAb4O_LqvngJp-Peha46paO8rPPiC4La98"}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
