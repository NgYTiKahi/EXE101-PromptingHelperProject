import { ArrowRight, Briefcase, MessageSquare, PanelsTopLeft, Sparkles, Target } from "lucide-react";
import Button from "../components/Button.jsx";

const platforms = ["Instagram", "TikTok", "Facebook", "YouTube", "LinkedIn", "Pinterest", "X (Twitter)"];
const contentTypes = ["Static Image", "Short Video", "Carousel", "Story", "Reel", "Banner Ad"];
const styles = ["Minimalist", "Bold & Vibrant", "Cinematic", "Playful & Fun", "Professional", "Luxury & Premium", "Lifestyle"];
const languages = ["English", "Vietnamese", "Spanish", "French", "Japanese", "Korean"];
const requiredFields = [
  "productName",
  "productDescription",
  "targetAudience",
  "platform",
  "contentType",
  "advertisingStyle",
  "mainMessage",
  "callToAction"
];

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-300">
        {label} {required && <span className="text-violet-300">*</span>}
      </span>
      {children}
    </label>
  );
}

function ChoiceGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            value === option
              ? "border-violet-400 bg-violet-500/25 text-white shadow-glow"
              : "border-violet-500/15 bg-white/5 text-slate-400 hover:border-violet-400/50 hover:text-slate-100"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Section({ icon, title, children }) {
  return (
    <section className="rounded-2xl border border-violet-500/20 bg-navy-850/78 p-5 shadow-panel sm:p-7">
      <div className="mb-6 flex items-center gap-3 text-sm font-extrabold text-slate-200">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-violet-500/15 text-violet-300">{icon}</span>
        {title}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

export default function Builder({ formData, setFormData, onGenerate }) {
  const update = (field, value) => setFormData((current) => ({ ...current, [field]: value }));
  const isReady = requiredFields.every((field) => String(formData[field]).trim().length > 0);

  const inputClass =
    "w-full rounded-2xl border border-violet-500/20 bg-indigo-950/50 px-4 py-3 text-sm font-semibold text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10";

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 sm:px-7">
      <div className="rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-2 text-xs font-bold text-violet-300 w-fit">
        Prompt Builder
      </div>
      <h1 className="mt-6 text-4xl font-black tracking-normal text-white">Tell us about your ad</h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Fill in the details below and we will craft the perfect AI prompt for your advertising visual.
      </p>

      <form
        className="mt-9 space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (isReady) onGenerate(formData);
        }}
      >
        <Section icon={<Briefcase size={17} />} title="Product Info">
          <Field label="Product Name" required>
            <input
              className={inputClass}
              value={formData.productName}
              onChange={(event) => update("productName", event.target.value)}
              placeholder="e.g. ClearSkin Serum"
            />
          </Field>
          <Field label="Product Description" required>
            <textarea
              className={`${inputClass} min-h-24 resize-y`}
              value={formData.productDescription}
              onChange={(event) => update("productDescription", event.target.value)}
              placeholder="e.g. A lightweight, vegan face serum that reduces acne and brightens skin in 7 days."
            />
          </Field>
        </Section>

        <Section icon={<Target size={17} />} title="Audience & Platform">
          <Field label="Target Audience" required>
            <input
              className={inputClass}
              value={formData.targetAudience}
              onChange={(event) => update("targetAudience", event.target.value)}
              placeholder="e.g. Women aged 18-30 interested in skincare and wellness"
            />
          </Field>
          <Field label="Platform" required>
            <ChoiceGroup options={platforms} value={formData.platform} onChange={(value) => update("platform", value)} />
          </Field>
        </Section>

        <Section icon={<PanelsTopLeft size={17} />} title="Content & Style">
          <Field label="Content Type" required>
            <ChoiceGroup
              options={contentTypes}
              value={formData.contentType}
              onChange={(value) => update("contentType", value)}
            />
          </Field>
          <Field label="Advertising Style" required>
            <ChoiceGroup
              options={styles}
              value={formData.advertisingStyle}
              onChange={(value) => update("advertisingStyle", value)}
            />
          </Field>
        </Section>

        <Section icon={<MessageSquare size={17} />} title="Message & CTA">
          <Field label="Main Message" required>
            <input
              className={inputClass}
              value={formData.mainMessage}
              onChange={(event) => update("mainMessage", event.target.value)}
              placeholder="e.g. Get clear skin in just 7 days - naturally"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Language">
              <select
                className={inputClass}
                value={formData.language}
                onChange={(event) => update("language", event.target.value)}
              >
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </Field>
            <Field label="Call to Action" required>
              <input
                className={inputClass}
                value={formData.callToAction}
                onChange={(event) => update("callToAction", event.target.value)}
                placeholder="e.g. Shop Now"
              />
            </Field>
          </div>
        </Section>

        <div className="pt-2 text-center">
          <Button type="submit" disabled={!isReady} className="w-full">
            <Sparkles size={18} />
            Generate My Prompt
            <ArrowRight size={18} />
          </Button>
          {!isReady && <p className="mt-4 text-xs font-semibold text-slate-600">Fill in all required fields to generate your prompt.</p>}
        </div>
      </form>
    </section>
  );
}
