const styleDetails = {
  Minimalist: "clean negative space, refined composition, and soft premium lighting",
  "Bold & Vibrant": "high-energy colors, confident contrast, cinematic depth, and rich details",
  Cinematic: "dramatic framing, depth of field, atmospheric light, and polished commercial realism",
  "Playful & Fun": "bright playful energy, expressive props, friendly motion, and joyful color accents",
  Professional: "trustworthy brand polish, balanced lighting, sharp product focus, and editorial clarity",
  "Luxury & Premium": "elegant contrast, premium textures, restrained typography, and high-end lighting",
  Lifestyle: "natural human context, aspirational everyday scenes, and authentic product use"
};

const aspectRatioByPlatform = {
  Instagram: "1:1 or 4:5",
  TikTok: "9:16",
  Facebook: "1:1 or 4:5",
  YouTube: "16:9",
  LinkedIn: "1.91:1",
  Pinterest: "2:3",
  "X (Twitter)": "16:9"
};

const variantLines = [
  "Add a stronger emotional hook in the opening visual and make the product benefit instantly recognizable.",
  "Use a fresh layout with more foreground product presence and clearer visual hierarchy.",
  "Lean into thumb-stopping contrast while keeping the brand credible and conversion-focused."
];

export function generatePrompt(data, options = {}) {
  const style = styleDetails[data.advertisingStyle] || "polished advertising composition and brand-safe visual details";
  const ratio = aspectRatioByPlatform[data.platform] || "platform-native";
  const variant = options.variant
    ? `\n\nCreative variation: ${variantLines[Math.floor(Math.random() * variantLines.length)]}`
    : "";

  return `Create a ${data.contentType.toLowerCase()} advertisement for "${data.productName}" - ${data.productDescription}.

Target audience: ${data.targetAudience}. Platform: ${data.platform}. Visual style: ${data.advertisingStyle}.

Core message: "${data.mainMessage}"

The composition should feel ${style}. Feature the product prominently against a background that resonates emotionally with ${data.targetAudience}. Use color grading, lighting, and typography consistent with high-performing ${data.platform} advertising.

Call to action: "${data.callToAction}"

Output language: ${data.language}. Aspect ratio optimized for ${data.platform}: ${ratio}. Photorealistic, ultra HD, commercial advertising quality.${variant}`;
}
