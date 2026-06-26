// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// import Navbar from "../components/Navbar";
// import ResultCard from "../components/ResultCard";
// import JobMatches from "../components/JobMatches";

// function Results() {
// const location = useLocation();

// const [jobs, setJobs] = useState([]);
// const [loadingJobs, setLoadingJobs] = useState(false);

// const data = location.state || null;

// const handleJobMatch = async () => {
// try {
// setLoadingJobs(true);


//   const response = await axios.post(
//     "https://n8n.srv1771261.hstgr.cloud/webhook/job-match",
//     {
//       resume_text:
//         (data.summary || "") +
//         " " +
//         (data.matched_skills || []).join(" "),
//     }
//   );

//   setJobs(response.data.job_matches || []);
// } catch (error) {
//   console.error("Job Match Error:", error);
// } finally {
//   setLoadingJobs(false);
// }

// };

// if (!data) {
// return (
// <> <Navbar /> <div className="text-center mt-10 text-xl">
// No Analysis Data Found </div>
// </>
// );
// }

// return (
// <> <Navbar />

//   <div className="max-w-6xl mx-auto p-8">
//     <h1 className="text-4xl font-bold mb-8">
//       Resume Analysis Report
//     </h1>

//     <ResultCard
//       title="ATS Score"
//       value={`${data.ats_score ?? 0}%`}
//     />

//     <div className="bg-slate-800 p-6 rounded-xl my-6">
//       <h2 className="text-cyan-400 text-xl font-bold mb-3">
//         Summary
//       </h2>

//       <p>
//         {data.summary || "No summary available"}
//       </p>
//     </div>

//     <ResultCard
//       title="Matched Skills"
//       value={(data.matched_skills || []).join(", ")}
//     />

//     <ResultCard
//       title="Missing Skills"
//       value={(data.missing_skills || []).join(", ")}
//     />

//     <div className="bg-slate-800 p-6 rounded-xl mt-6">
//       <h2 className="text-yellow-400 text-2xl font-bold mb-4">
//         Interview Questions
//       </h2>

//       <h3 className="text-green-400 font-bold mb-2">
//         Easy
//       </h3>

//       {(data.interview_questions?.easy || []).map((q, i) => (
//         <p key={i}>• {q}</p>
//       ))}

//       <h3 className="text-yellow-400 font-bold mt-4 mb-2">
//         Medium
//       </h3>

//       {(data.interview_questions?.medium || []).map((q, i) => (
//         <p key={i}>• {q}</p>
//       ))}

//       <h3 className="text-red-400 font-bold mt-4 mb-2">
//         Hard
//       </h3>

//       {(data.interview_questions?.hard || []).map((q, i) => (
//         <p key={i}>• {q}</p>
//       ))}
//     </div>

//     <div className="mt-8">
//       <button
//         onClick={handleJobMatch}
//         className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-bold"
//       >
//         Find Matching Jobs
//       </button>
//     </div>

//     {loadingJobs && (
//       <p className="mt-6 text-cyan-400">
//         Finding matching jobs...
//       </p>
//     )}

//     <JobMatches jobs={jobs} />
//   </div>
// </>


// );
// }

// export default Results;

import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import ResultCard from "../components/ResultCard";
import JobMatches from "../components/JobMatches";

function Results() {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const data = location.state || null;

  const handleJobMatch = async () => {
    try {
      setLoadingJobs(true);
      const response = await axios.post(
        "https://n8n.srv1771261.hstgr.cloud/webhook/job-match",
        {
          resume_text:
            (data.summary || "") +
            " " +
            (data.matched_skills || []).join(" "),
        }
      );
      setJobs(response.data.job_matches || []);
    } catch (error) {
      console.error("Job Match Error:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <p className="text-center text-lg sm:text-xl text-slate-400">
            No Analysis Data Found
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
          Resume Analysis Report
        </h1>

        {/* ATS Score */}
        <ResultCard
          title="ATS Score"
          value={`${data.ats_score ?? 0}%`}
        />

        {/* Summary */}
        <div className="bg-slate-800 p-4 sm:p-6 rounded-xl my-4 sm:my-6">
          <h2 className="text-cyan-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">
            Summary
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-300">
            {data.summary || "No summary available"}
          </p>
        </div>

        {/* Skills - side by side on tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 sm:my-6">
          <ResultCard
            title="Matched Skills"
            value={(data.matched_skills || []).join(", ")}
          />
          <ResultCard
            title="Missing Skills"
            value={(data.missing_skills || []).join(", ")}
          />
        </div>

        {/* Interview Questions */}
        <div className="bg-slate-800 p-4 sm:p-6 rounded-xl mt-4 sm:mt-6">
          <h2 className="text-yellow-400 text-xl sm:text-2xl font-bold mb-4">
            Interview Questions
          </h2>

          {/* Easy / Medium / Hard - stack on mobile, 3 cols on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

            {/* Easy */}
            <div>
              <h3 className="text-green-400 font-bold mb-2 text-sm sm:text-base uppercase tracking-wide">
                Easy
              </h3>
              <ul className="space-y-2">
                {(data.interview_questions?.easy || []).map((q, i) => (
                  <li key={i} className="text-sm sm:text-base text-slate-300 flex gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medium */}
            <div>
              <h3 className="text-yellow-400 font-bold mb-2 text-sm sm:text-base uppercase tracking-wide">
                Medium
              </h3>
              <ul className="space-y-2">
                {(data.interview_questions?.medium || []).map((q, i) => (
                  <li key={i} className="text-sm sm:text-base text-slate-300 flex gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hard */}
            <div>
              <h3 className="text-red-400 font-bold mb-2 text-sm sm:text-base uppercase tracking-wide">
                Hard
              </h3>
              <ul className="space-y-2">
                {(data.interview_questions?.hard || []).map((q, i) => (
                  <li key={i} className="text-sm sm:text-base text-slate-300 flex gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Job Match Button */}
        <div className="mt-6 sm:mt-8">
          <button
            onClick={handleJobMatch}
            disabled={loadingJobs}
            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed
                       px-6 py-3 rounded-lg font-bold text-sm sm:text-base transition-colors duration-200"
          >
            {loadingJobs ? "Searching..." : "Find Matching Jobs"}
          </button>
        </div>

        {loadingJobs && (
          <p className="mt-4 text-cyan-400 text-sm sm:text-base animate-pulse">
            Finding matching jobs...
          </p>
        )}

        {/* Job Matches */}
        <div className="mt-6">
          <JobMatches jobs={jobs} />
        </div>

      </div>
    </>
  );
}

export default Results;