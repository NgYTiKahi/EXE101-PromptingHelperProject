import { ArrowLeft, Bookmark, Check, Copy, Download, RefreshCw } from "lucide-react";
import { useState } from "react";
import Button from "../components/Button.jsx";

const HISTORY_KEY = "promptads_history";

function savePromptToHistory(formData, prompt) {
  const current = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    formData,
    prompt
  };
  localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...current].slice(0, 25)));
}

function MetaBadge({ label, value }) {
  return (
    <span className="rounded-full border border-violet-500/20 bg-violet-500/15 px-4 py-2 text-xs font-bold text-slate-300">
      <span className="text-slate-500">{label}: </span>
      <span className="text-violet-200">{value || "Not set"}</span>
    </span>
  );
}

export default function Result({ formData, prompt, onBack, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const handleSave = () => {
    savePromptToHistory(formData, prompt);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  const handleExport = () => {
    const blob = new Blob([prompt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${formData.productName || "promptads-prompt"}.txt`.replace(/[^\w.-]+/g, "-");
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 sm:px-7">
      <div className="rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-2 text-xs font-bold text-violet-300 w-fit">
        Prompt Generated
      </div>
      <h1 className="mt-6 text-4xl font-black tracking-normal text-white">Your AI Ad Prompt is Ready</h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Copy and paste this into Midjourney, DALL-E, Sora, or any AI image/video tool.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <MetaBadge label="Product" value={formData.productName} />
        <MetaBadge label="Platform" value={formData.platform} />
        <MetaBadge label="Content" value={formData.contentType} />
        <MetaBadge label="Style" value={formData.advertisingStyle} />
        <MetaBadge label="Language" value={formData.language} />
      </div>

      <article className="mt-8 rounded-2xl border border-violet-500/20 bg-navy-850/78 p-5 shadow-panel sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Generated Prompt</h2>
          <Button variant="secondary" className="min-h-9 rounded-full px-4 py-2 text-xs" onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <pre className="whitespace-pre-wrap rounded-2xl bg-navy-950/90 p-5 text-sm font-semibold leading-7 text-slate-200">
          {prompt}
        </pre>
      </article>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <Button onClick={handleCopy}>
          {copied ? <Check size={17} /> : <Copy size={17} />}
          Copy Prompt
        </Button>
        <Button variant="secondary" onClick={onRegenerate}>
          <RefreshCw size={17} />
          Regenerate
        </Button>
        <Button variant="secondary" onClick={handleSave}>
          {saved ? <Check size={17} /> : <Bookmark size={17} />}
          {saved ? "Saved" : "Save to History"}
        </Button>
        <Button variant="secondary" onClick={handleExport}>
          <Download size={17} />
          Export .txt
        </Button>
      </div>

      <section className="mt-8 rounded-2xl border border-violet-500/20 bg-navy-850/70 p-5">
        <h2 className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Pro Tips</h2>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-400">
          <li>Add --ar 9:16 at the end for vertical Stories or Reels.</li>
          <li>Append --style raw in Midjourney for a more photorealistic result.</li>
          <li>Try adding a specific photographer or lighting aesthetic for a unique brand look.</li>
        </ul>
      </section>

      <Button variant="ghost" className="mt-7 px-0" onClick={onBack}>
        <ArrowLeft size={17} />
        Back to Builder
      </Button>
    </section>
  );
}
