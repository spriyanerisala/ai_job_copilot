// import { useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// export default function App() {
//   const [resume, setResume] = useState("");
//   const [roles, setRoles] = useState([]);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [finalResume, setFinalResume] = useState("");
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // =========================
//   // STEP 1: GET ROLES
//   // =========================
//   const handleAnalyze = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "https://n8n.srv1771261.hstgr.cloud/webhook/job-role-resume",
//         { resume_text: resume }
//       );

//       const rawRoles =
//         res.data?.output?.suggested_roles ??
//         res.data?.suggested_roles ??
//         res.data?.[0]?.output?.suggested_roles ??
//         "[]";

//       let parsedRoles;
//       try {
//         parsedRoles =
//           typeof rawRoles === "string"
//             ? JSON.parse(rawRoles)
//             : rawRoles;
//       } catch {
//         parsedRoles = [];
//       }

//       setRoles(Array.isArray(parsedRoles) ? parsedRoles : []);
//       setStep(2);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // STEP 2: GENERATE RESUME
//   // =========================
//   const handleGenerate = async (role) => {
//     try {
//       setLoading(true);
//       setSelectedRole(role);

//       const res = await axios.post(
//         "https://n8n.srv1771261.hstgr.cloud/webhook/new-resume",
//         {
//           resume_text: resume,
//           selected_role: role,
//         }
//       );

//       let result =
//         res.data?.output ??
//         res.data?.resume ??
//         res.data?.[0]?.output ??
//         "No resume returned";

//       if (typeof result !== "string") {
//         result = JSON.stringify(result, null, 2);
//       }

//       setFinalResume(result);
//       setStep(3);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // UI
//   // =========================
//   return (
//     <>
//       <Navbar />

//       <div className="max-w-5xl mx-auto p-8 text-white">

//         {/* TITLE */}
//         <h1 className="text-4xl font-bold text-cyan-400 mb-6">
//           AI Job Role Resume Builder
//         </h1>

//         {loading && (
//           <p className="text-cyan-400 mb-4">Loading...</p>
//         )}

//         {/* ================= STEP 1 ================= */}
//         {step === 1 && (
//           <div>
//             <textarea
//               value={resume}
//               onChange={(e) => setResume(e.target.value)}
//               placeholder="Paste your resume here..."
//               className="w-full h-80 bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
//             />

//             <button
//               onClick={handleAnalyze}
//               disabled={!resume || loading}
//               className="mt-5 bg-cyan-500 px-6 py-3 rounded-lg hover:bg-cyan-600 font-bold"
//             >
//               Analyze Roles
//             </button>
//           </div>
//         )}

//         {/* ================= STEP 2 ================= */}
//         {step === 2 && (
//           <div>
//             <h2 className="text-2xl font-semibold mb-4 text-white">
//               Select Job Role
//             </h2>

//             {roles.length > 0 ? (
//               <div className="flex flex-wrap gap-3">
//                 {roles.map((r, i) => (
//                   <button
//                     key={i}
//                     onClick={() => handleGenerate(r)}
//                     className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg hover:bg-cyan-500 hover:text-black transition"
//                   >
//                     {r}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-400">No roles found</p>
//             )}
//           </div>
//         )}

//         {/* ================= STEP 3 ================= */}
//         {step === 3 && (
//           <div className="bg-slate-800 p-6 rounded-xl mt-6">

//             <h2 className="text-2xl font-bold text-green-400 mb-4">
//               Final Resume ({selectedRole})
//             </h2>

//             <pre className="whitespace-pre-wrap text-white">
//               {finalResume}
//             </pre>

//             <button
//               onClick={() => {
//                 setStep(1);
//                 setRoles([]);
//                 setResume("");
//                 setFinalResume("");
//                 setSelectedRole("");
//               }}
//               className="mt-5 bg-gray-600 px-4 py-2 rounded"
//             >
//               Start Again
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function App() {
  const [resume, setResume] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [finalResume, setFinalResume] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // =========================
  // STEP 1: GET ROLES
  // =========================
  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://n8n.srv1771261.hstgr.cloud/webhook/job-role-resume",
        {
          resume_text: resume,
        }
      );

      const rawRoles =
        res.data?.output?.suggested_roles ??
        res.data?.suggested_roles ??
        res.data?.[0]?.output?.suggested_roles ??
        "[]";

      let parsedRoles;

      try {
        parsedRoles =
          typeof rawRoles === "string"
            ? JSON.parse(rawRoles)
            : rawRoles;
      } catch {
        parsedRoles = [];
      }

      setRoles(Array.isArray(parsedRoles) ? parsedRoles : []);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // STEP 2: GENERATE RESUME
  // =========================
  const handleGenerate = async (role) => {
    try {
      setLoading(true);
      setSelectedRole(role);

      const res = await axios.post(
        "https://n8n.srv1771261.hstgr.cloud/webhook/new-resume",
        {
          resume_text: resume,
          selected_role: role,
        }
      );

      let result =
        res.data?.output ??
        res.data?.resume ??
        res.data?.[0]?.output ??
        "No resume returned";

      if (typeof result !== "string") {
        result = JSON.stringify(result, null, 2);
      }

      setFinalResume(result);
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Failed to generate resume");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESET
  // =========================
  const resetApp = () => {
    setResume("");
    setRoles([]);
    setSelectedRole("");
    setFinalResume("");
    setStep(1);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8">
          
          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400">
              AI Job Role Resume Builder
            </h1>

            <p className="text-slate-400 mt-3 text-sm sm:text-base md:text-lg">
              Analyze your resume and generate ATS-optimized resumes
              for multiple job roles.
            </p>
          </div>

          {/* STEP INDICATOR */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
              
              <div
                className={`px-4 py-2 rounded-full font-semibold ${
                  step >= 1
                    ? "bg-cyan-500 text-black"
                    : "bg-slate-800"
                }`}
              >
                1. Upload Resume
              </div>

              <div className="hidden sm:block text-slate-500">
                →
              </div>

              <div
                className={`px-4 py-2 rounded-full font-semibold ${
                  step >= 2
                    ? "bg-cyan-500 text-black"
                    : "bg-slate-800"
                }`}
              >
                2. Select Role
              </div>

              <div className="hidden sm:block text-slate-500">
                →
              </div>

              <div
                className={`px-4 py-2 rounded-full font-semibold ${
                  step >= 3
                    ? "bg-cyan-500 text-black"
                    : "bg-slate-800"
                }`}
              >
                3. Generate Resume
              </div>
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="flex justify-center my-8">
              <div className="h-12 w-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
            </div>
          )}

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl">

              <h2 className="text-xl sm:text-2xl font-bold mb-5">
                Paste Your Resume
              </h2>

              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your complete resume here..."
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
                  placeholder-slate-500
                  outline-none
                  focus:border-cyan-500
                  resize-none
                "
              />

              <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <span className="text-slate-400 text-sm">
                  Characters: {resume.length}
                </span>

                <button
                  onClick={handleAnalyze}
                  disabled={!resume || loading}
                  className="
                    w-full
                    sm:w-auto
                    bg-cyan-500
                    hover:bg-cyan-600
                    text-black
                    font-bold
                    px-8
                    py-3
                    rounded-xl
                    transition
                    disabled:opacity-50
                  "
                >
                  Analyze Roles
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Select Job Role
              </h2>

              {roles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {roles.map((role, index) => (
                    <button
                      key={index}
                      onClick={() => handleGenerate(role)}
                      className="
                        bg-slate-900
                        border
                        border-slate-700
                        rounded-2xl
                        p-6
                        text-left
                        hover:border-cyan-500
                        hover:scale-[1.02]
                        transition-all
                      "
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {role}
                      </h3>

                      <p className="text-slate-400 mt-2">
                        Generate ATS optimized resume
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-900 rounded-2xl p-6">
                  <p className="text-slate-400">
                    No matching roles found.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 md:p-8">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-green-400">
                  Final Resume
                </h2>

                <span className="bg-cyan-500 text-black px-4 py-2 rounded-full font-semibold">
                  {selectedRole}
                </span>
              </div>

              <div className="bg-slate-800 rounded-2xl p-4 sm:p-6 max-h-[700px] overflow-y-auto border border-slate-700">
                <pre className="whitespace-pre-wrap break-words text-sm sm:text-base text-white leading-relaxed">
                  {finalResume}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={resetApp}
                  className="
                    w-full
                    sm:w-auto
                    bg-gray-700
                    hover:bg-gray-600
                    px-6
                    py-3
                    rounded-xl
                    font-bold
                    transition
                  "
                >
                  Start Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}