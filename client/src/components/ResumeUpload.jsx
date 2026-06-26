import { Upload, FileText } from "lucide-react";

function ResumeUpload({ file, setFile }) {
  return (
    <div
      className="
        w-full
        bg-slate-900
        border-2
        border-dashed
        border-cyan-500
        rounded-3xl
        p-6
        sm:p-8
        md:p-10
        text-center
        transition-all
        hover:border-cyan-400
        hover:shadow-lg
        hover:shadow-cyan-500/10
      "
    >
      {/* Upload Icon */}
      <div className="flex justify-center">
        <Upload
          size={50}
          className="text-cyan-400 sm:w-16 sm:h-16"
        />
      </div>

      {/* Heading */}
      <h2
        className="
          text-xl
          sm:text-2xl
          md:text-3xl
          font-bold
          text-white
          mt-4
        "
      >
        Upload Resume
      </h2>

      <p
        className="
          text-slate-400
          text-sm
          sm:text-base
          mt-2
          mb-6
        "
      >
        Upload your PDF resume for AI analysis
      </p>

      {/* File Input */}
      <label
        className="
          inline-flex
          items-center
          justify-center
          px-6
          py-3
          bg-cyan-500
          hover:bg-cyan-600
          text-black
          font-semibold
          rounded-xl
          cursor-pointer
          transition-all
        "
      >
        Choose Resume

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>

      {/* File Preview */}
      {file && (
        <div
          className="
            mt-6
            bg-slate-800
            border
            border-slate-700
            rounded-2xl
            p-4
            flex
            items-center
            justify-center
            gap-3
            break-all
          "
        >
          <FileText className="text-green-400" size={24} />

          <span
            className="
              text-green-400
              text-sm
              sm:text-base
              font-medium
            "
          >
            {file.name}
          </span>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;