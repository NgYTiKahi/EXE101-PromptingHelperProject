export default function PromptCard({ icon, title, children }) {
  return (
    <article className="rounded-2xl border border-violet-500/20 bg-navy-850/70 p-6 shadow-panel backdrop-blur">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-violet-500/20 text-violet-300">
        {icon}
      </div>
      <h3 className="text-lg font-extrabold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{children}</p>
    </article>
  );
}
