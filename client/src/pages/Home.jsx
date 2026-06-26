import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ResumeUpload from "../components/ResumeUpload";
import JobDescription from "../components/JobDescription";
import axios from 'axios';
function Home() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");

  const navigate = useNavigate();

 const handleSubmit = async () => {
  console.log("Selected File:", file);
  console.log("Job Description:", jd);

  if (!file) {
    alert("Please upload a resume");
    return;
  }

  if (!jd.trim()) {
    alert("Please enter a Job Description");
    return;
  }

  try {
    const response = await axios.post(
      "https://n8n.srv1771261.hstgr.cloud/webhook/resume-analysis",
      {
        resume_url: "YOUR_CLOUDINARY_FILE_URL",
        job_description: jd,
      }
    );

    console.log("Webhook Response:", response.data);

    navigate("/results", {
      state: response.data,
    });
  } catch (error) {
    console.error("Full Error:", error);
  console.error("Response:", error.response);
  console.error("Data:", error.response?.data);
    alert("Something went wrong");
  }
};

 return (
  <>
    <Navbar />

    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10">

        {/* Hero Section */}
        <div className="text-center mb-12">

          <h1 className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-bold
            text-cyan-400
          ">
            AI Job Application Copilot
          </h1>

          <p className="
            mt-4
            text-slate-400
            text-sm
            sm:text-base
            md:text-lg
            max-w-3xl
            mx-auto
          ">
            Upload your resume and compare it against any
            job description using AI-powered ATS analysis.
          </p>

        </div>

        {/* Upload + JD Section */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            lg:gap-8
          "
        >

          <ResumeUpload
            file={file}
            setFile={setFile}
          />

          <JobDescription
            jd={jd}
            setJd={setJd}
          />

        </div>

        {/* Submit Button */}
        <div className="mt-10 flex justify-center">

          <button
            onClick={handleSubmit}
            className="
              w-full
              sm:w-auto
              min-w-[250px]
              bg-cyan-500
              hover:bg-cyan-600
              text-black
              font-bold
              text-lg
              px-10
              py-4
              rounded-2xl
              transition-all
              hover:scale-105
              shadow-lg
            "
          >
            Analyze Resume
          </button>

        </div>

      </div>

    </div>
  </>
);
}

export default Home;