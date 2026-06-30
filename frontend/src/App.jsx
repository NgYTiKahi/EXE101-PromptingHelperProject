import { useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Builder from "./pages/Builder.jsx";
import Result from "./pages/Result.jsx";
import { generatePrompt } from "./utils/promptGenerator.js";

const defaultForm = {
  productName: "",
  productDescription: "",
  targetAudience: "",
  platform: "",
  contentType: "",
  advertisingStyle: "",
  mainMessage: "",
  language: "English",
  callToAction: ""
};

export default function App() {
  const [page, setPage] = useState("home");
  const [formData, setFormData] = useState(defaultForm);
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const breadcrumbs = useMemo(() => {
    if (page === "builder") return ["Home", "Builder"];
    if (page === "result") return ["Home", "Builder", "Result"];
    return [];
  }, [page]);

  const handleGenerate = (data = formData) => {
    const prompt = generatePrompt(data);
    setFormData(data);
    setGeneratedPrompt(prompt);
    setPage("result");
  };

  const handleRegenerate = () => {
    setGeneratedPrompt(generatePrompt(formData, { variant: true }));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-navy-950 text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_15%,rgba(126,69,255,0.18),transparent_34%),radial-gradient(circle_at_84%_72%,rgba(77,93,255,0.1),transparent_34%),linear-gradient(180deg,#080b1b_0%,#070a1a_52%,#050816_100%)]" />
      <Navbar breadcrumbs={breadcrumbs} onNavigate={setPage} />
      <main>
        {page === "home" && <Home onStart={() => setPage("builder")} />}
        {page === "builder" && (
          <Builder
            formData={formData}
            setFormData={setFormData}
            onGenerate={handleGenerate}
          />
        )}
        {page === "result" && (
          <Result
            formData={formData}
            prompt={generatedPrompt}
            onBack={() => setPage("builder")}
            onRegenerate={handleRegenerate}
          />
        )}
      </main>
    </div>
  );
}
