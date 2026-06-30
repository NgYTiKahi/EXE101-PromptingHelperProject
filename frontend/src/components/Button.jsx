export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) {
  const styles = {
    primary:
      "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-glow hover:from-violet-500 hover:to-fuchsia-400",
    secondary:
      "border border-violet-500/30 bg-navy-850/80 text-slate-100 hover:border-violet-400/60 hover:bg-violet-500/10",
    ghost:
      "border border-transparent bg-transparent text-slate-300 hover:bg-white/5 hover:text-white"
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition ${
        styles[variant]
      } ${
        disabled
          ? "cursor-not-allowed opacity-45 shadow-none hover:border-violet-500/30 hover:bg-navy-850/80"
          : "active:scale-[0.99]"
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
