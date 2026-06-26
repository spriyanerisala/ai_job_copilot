// function JobDescription({ jd, setJd }) {
//   return (
//     <div>
//       <label className="block mb-3 text-lg">
//         Paste Job Description
//       </label>

//       <textarea
//         rows="10"
//         value={jd}
//         onChange={(e) => setJd(e.target.value)}
//         placeholder="Paste Job Description Here..."
//         className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
//       />
//     </div>
//   );
// }

// export default JobDescription;



function JobDescription({ jd, setJd }) {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          bg-slate-900
          border border-slate-800
          rounded-2xl
          sm:rounded-3xl
          p-4
          sm:p-6
          md:p-8
          lg:p-10
          shadow-xl
        "
      >
        {/* Heading */}
        <div className="mb-5 md:mb-7">
          <h2
            className="
              text-xl
              sm:text-2xl
              md:text-3xl
              lg:text-4xl
              font-bold
              text-white
            "
          >
            Paste Job Description
          </h2>

          <p
            className="
              mt-2
              text-slate-400
              text-sm
              sm:text-base
              md:text-lg
            "
          >
            Add the job description to generate an ATS-friendly resume.
          </p>
        </div>

        {/* Textarea */}
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste Job Description Here..."
          rows={12}
          className="
            w-full
            min-h-[250px]
            sm:min-h-[300px]
            md:min-h-[350px]
            lg:min-h-[400px]
            p-4
            sm:p-5
            md:p-6
            rounded-xl
            md:rounded-2xl
            bg-slate-800
            border
            border-slate-700
            text-white
            placeholder-slate-500
            text-sm
            sm:text-base
            md:text-lg
            resize-y
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/30
            transition-all
          "
        />

        {/* Footer */}
        <div
          className="
            mt-4
            flex
            flex-col
            sm:flex-row
            gap-4
            sm:items-center
            sm:justify-between
          "
        >
          <span className="text-slate-400 text-sm sm:text-base">
            Characters: {jd.length}
          </span>

          <button
            className="
              w-full
              sm:w-auto
              px-6
              md:px-8
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              text-sm
              sm:text-base
              transition-all
            "
          >
            Analyze Job Description
          </button>
        </div>
      </div>
    </section>
  );
}

export default JobDescription;