import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const stylesData = [
  { id: "fresher", label: "Fresher" },
  { id: "internship", label: "Internship" },
  { id: "experienced", label: "Experienced" },
  { id: "ats", label: "ATS Optimized" },
];

// ⭐ FUNCTION NAME UPDATED
function ResumeStyleSelector() {
  const [resumeText, setResumeText] = useState("");
  const [improvedResume, setImprovedResume] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImproveResume = async () => {
  if (!resumeText || !selectedStyle) {
    alert("Please enter resume and select style");
    return;
  }

  try {
    setLoading(true);

    const response = await axios.post(
      "https://n8n.srv1771261.hstgr.cloud/webhook/resume-style",
      {
        resume_text: resumeText,
        style: selectedStyle,
      }
    );

    const result =
      response.data.output?.improved_resume ??
      response.data.output ??
      response.data.improved_resume ??
      "";

    setImprovedResume(result);
  } catch (error) {
    console.error(error);
    alert("Resume improvement failed");
  } finally {
    setLoading(false);
  }
};
  const handleCopy = () => {
    navigator.clipboard.writeText(improvedResume);
    alert("Copied!");
  };

  const handleDownload = () => {
    const blob = new Blob([improvedResume], {
      type: "text/plain",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "resume.txt";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
   
<div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
  <Navbar />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8">

    {/* HEADING */}
    <div className="text-center mb-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400">
        Resume Style Selector
      </h1>

      <p className="mt-3 text-slate-400 text-sm sm:text-base md:text-lg">
        Convert your resume into different professional formats.
      </p>
    </div>

      {/* STYLE SELECTOR */}
      <div className="mb-8">
  <h2 className="text-white text-xl font-semibold mb-4">
    Select Resume Style
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {stylesData.map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedStyle(item.id)}
        className={`
          p-5 rounded-2xl border transition-all
          ${
            selectedStyle === item.id
              ? "bg-cyan-500 text-black border-cyan-500"
              : "bg-slate-800 border-slate-700 hover:border-cyan-500"
          }
        `}
      >
        {item.label}
      </button>
    ))}
  </div>
</div>

        {/* INPUT */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 md:p-8">

  <textarea
    value={resumeText}
    onChange={(e) => setResumeText(e.target.value)}
    placeholder="Paste your resume here..."
    className="
      w-full
      min-h-[250px]
      sm:min-h-[350px]
      md:min-h-[450px]
      bg-slate-800
      border
      border-slate-700
      rounded-2xl
      p-4
      text-white
      resize-none
      outline-none
      focus:border-cyan-500
    "
  />

  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-5">

    <span className="text-slate-400 text-sm">
      Characters: {resumeText.length}
    </span>

    <button
      onClick={handleImproveResume}
      disabled={loading}
      className="
        w-full
        sm:w-auto
        bg-cyan-500
        hover:bg-cyan-600
        text-black
        px-8
        py-3
        rounded-xl
        font-bold
      "
    >
      Improve Resume
    </button>

  </div>
</div>

       

        {loading && (
  <div className="flex justify-center my-8">
    <div className="h-12 w-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
  </div>
)}

        {/* OUTPUT */}
       {improvedResume && (
  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 md:p-8 mt-8">

    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">

      <h2 className="text-2xl sm:text-3xl font-bold text-green-400">
        Improved Resume
      </h2>

      <div className="flex flex-wrap gap-3">

        <button
          onClick={handleCopy}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl"
        >
          Copy
        </button>

        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
        >
          Download
        </button>

      </div>
    </div>

    <div className="
      bg-slate-800
      border
      border-slate-700
      rounded-2xl
      p-4
      max-h-[700px]
      overflow-y-auto
    ">
      <pre className="
        whitespace-pre-wrap
        break-words
        text-sm
        sm:text-base
        leading-relaxed
      ">
        {improvedResume}
      </pre>
    </div>

  </div>
)}

      </div>
  </div>
  );
}

export default ResumeStyleSelector;