import { ArrowRight, BadgeCheck, Building2, Globe2, Image, Sparkles, Users, Zap } from "lucide-react";
import Button from "../components/Button.jsx";
import PromptCard from "../components/PromptCard.jsx";

const badges = [
  { label: "Small Shops", icon: <Users size={14} /> },
  { label: "Freelancers", icon: <Sparkles size={14} /> },
  { label: "Content Creators", icon: <Image size={14} /> },
  { label: "Businesses", icon: <Globe2 size={14} /> }
];

export default function Home({ onStart }) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center px-5 py-16 text-center sm:px-7 lg:py-24">
      <div className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs font-bold text-violet-300">
        AI-Powered Ad Prompt Builder
      </div>

      <h1 className="mt-10 max-w-4xl text-5xl font-black leading-tight tracking-normal text-white sm:text-7xl">
        Build Winning <span className="text-violet-400">AI Ad Prompts</span> in Seconds
      </h1>

      <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
        PromptAds Studio guides you through every detail - product, audience, platform, style - and generates a
        ready-to-use prompt for your next AI advertising visual.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button onClick={onStart} className="px-7">
          <Sparkles size={17} />
          Start Creating Prompt
          <ArrowRight size={17} />
        </Button>
        <span className="text-sm text-slate-500">Free · No signup needed</span>
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-3">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-navy-850/60 px-4 py-2 text-sm font-semibold text-slate-200"
          >
            <span className="text-violet-300">{badge.icon}</span>
            {badge.label}
          </span>
        ))}
      </div>

      <div className="mt-20 grid w-full max-w-4xl gap-5 md:grid-cols-3">
        <PromptCard icon={<Zap size={22} />} title="Instant Generation">
          Turn product info into high-converting AI prompts in seconds.
        </PromptCard>
        <PromptCard icon={<BadgeCheck size={22} />} title="Audience-Targeted">
          Tailor every prompt to your exact customer profile and platform.
        </PromptCard>
        <PromptCard icon={<Building2 size={22} />} title="Multi-Platform">
          Optimized for Instagram, TikTok, YouTube, LinkedIn, Pinterest, and more.
        </PromptCard>
      </div>
    </section>
  );
}
