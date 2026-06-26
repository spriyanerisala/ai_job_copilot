// import { useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// function ResumeImprover() {
//   const [resumeText, setResumeText] = useState("");
//   const [improvedResume, setImprovedResume] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleImproveResume = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "https://n8n.srv1771261.hstgr.cloud/webhook/improve-resume",
//         {
//           resume_text: resumeText,
//         }
//       );

//       setImprovedResume(response.data.improved_resume || "");
//     } catch (error) {
//       console.error(error);
//       alert("Resume improvement failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 📥 Download Resume
//  const handleDownload = async () => {
//   try {
//     const response = await axios.post(
//       "https://n8n.srv1771261.hstgr.cloud/webhook/download-resume",
//       {
//         resume_text: improvedResume,
//       },
//       {
//         responseType: "blob", // IMPORTANT for file download
//       }
//     );

//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const a = document.createElement("a");

//     a.href = url;
//     a.download = "resume.txt";
//     a.click();

//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error(error);
//     alert("Download failed");
//   }
// };

//   // 📋 Copy Resume
//   const handleCopy = () => {
//     navigator.clipboard.writeText(improvedResume);
//     alert("Copied the improved resume!");
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-5xl mx-auto p-8">

//         <h1 className="text-4xl font-bold text-cyan-400 mb-6">
//           AI Resume Improver
//         </h1>

//         {/* INPUT */}
//         <textarea
//           value={resumeText}
//           onChange={(e) => setResumeText(e.target.value)}
//           placeholder="Paste your resume here..."
//           className="w-full h-80 bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
//         />

//         {/* BUTTON */}
//         <button
//           onClick={handleImproveResume}
//           className="mt-6 bg-cyan-500 px-6 py-3 rounded-lg hover:bg-cyan-600 font-bold"
//         >
//           Improve Resume
//         </button>

//         {loading && (
//           <p className="mt-4 text-cyan-400">
//             Improving Resume...
//           </p>
//         )}

//         {/* OUTPUT */}
//         {improvedResume && (
//           <div className="bg-slate-800 p-6 rounded-xl mt-8">

//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold text-green-400">
//                 Improved Resume
//               </h2>

//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCopy}
//                   className="bg-gray-600 px-3 py-1 rounded"
//                 >
//                   Copy
//                 </button>

//                 <button
//                   onClick={handleDownload}
//                   className="bg-green-600 px-3 py-1 rounded"
//                 >
//                   Download
//                 </button>
//               </div>
//             </div>

//             <pre className="whitespace-pre-wrap text-white">
//               {improvedResume}
//             </pre>

//           </div>
//         )}

//       </div>
//     </>
//   );
// }

// export default ResumeImprover;

import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ResumeImprover() {
  const [resumeText, setResumeText] = useState("");
  const [improvedResume, setImprovedResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleImproveResume = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://n8n.srv1771261.hstgr.cloud/webhook/improve-resume",
        { resume_text: resumeText }
      );
      setImprovedResume(response.data.improved_resume || "");
    } catch (error) {
      console.error(error);
      alert("Resume improvement failed");
    } finally {
      setLoading(false);
    }
  };

  // 📥 Download Resume
  const handleDownload = async () => {
    try {
      const response = await axios.post(
        "https://n8n.srv1771261.hstgr.cloud/webhook/download-resume",
        { resume_text: improvedResume },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.txt";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Download failed");
    }
  };

  // 📋 Copy Resume
  const handleCopy = () => {
    navigator.clipboard.writeText(improvedResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-4 sm:mb-6">
          AI Resume Improver
        </h1>

        {/* Input Label */}
        <label className="block text-sm sm:text-base text-slate-400 mb-2">
          Paste your resume below
        </label>

        {/* Textarea */}
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume here..."
          className="w-full h-56 sm:h-72 lg:h-80 bg-slate-800 text-white text-sm sm:text-base
                     p-3 sm:p-4 rounded-xl border border-slate-700 resize-y
                     focus:outline-none focus:border-cyan-500 transition-colors duration-200"
        />

        {/* Char count hint */}
        <p className="text-xs text-slate-500 mt-1 text-right">
          {resumeText.length} characters
        </p>

        {/* Improve Button */}
        <button
          onClick={handleImproveResume}
          disabled={loading || !resumeText.trim()}
          className="mt-4 sm:mt-6 w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600
                     disabled:opacity-50 disabled:cursor-not-allowed
                     px-6 py-3 rounded-lg font-bold text-sm sm:text-base
                     transition-colors duration-200"
        >
          {loading ? "Improving..." : "Improve Resume"}
        </button>

        {/* Loading State */}
        {loading && (
          <p className="mt-3 text-cyan-400 text-sm sm:text-base animate-pulse">
            Improving your resume, please wait...
          </p>
        )}

        {/* OUTPUT */}
        {improvedResume && (
          <div className="bg-slate-800 p-4 sm:p-6 rounded-xl mt-6 sm:mt-8">

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-green-400">
                Improved Resume
              </h2>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 sm:flex-none bg-slate-600 hover:bg-slate-500
                             px-3 sm:px-4 py-2 rounded-lg text-sm font-medium
                             transition-colors duration-200"
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>

                <button
                  onClick={handleDownload}
                  className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700
                             px-3 sm:px-4 py-2 rounded-lg text-sm font-medium
                             transition-colors duration-200"
                >
                  Download
                </button>
              </div>
            </div>

            {/* Resume Output */}
            <pre className="whitespace-pre-wrap text-white text-xs sm:text-sm lg:text-base
                            leading-relaxed overflow-x-auto">
              {improvedResume}
            </pre>

          </div>
        )}

      </div>
    </>
  );
}

export default ResumeImprover;