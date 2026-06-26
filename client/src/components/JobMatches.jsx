// function JobMatches({ jobs }) {
//   if (!jobs || jobs.length === 0) return null;

//   return (
//     <div className="mt-10">

//       <h2 className="text-3xl font-bold text-cyan-400 mb-6">
//         Matching Jobs
//       </h2>

//       {jobs.map((job, index) => (
//         <div
//           key={index}
//           className="bg-slate-800 p-6 rounded-xl mb-6 border border-cyan-500"
//         >
//           <h3 className="text-2xl font-bold text-white">
//             {job.title}
//           </h3>

//           <p className="text-cyan-400 text-lg mt-1">
//             {job.company}
//           </p>

//           <div className="mt-4">
//             <span className="font-bold">
//               Match Score:
//             </span>

//             <span className="text-green-400 text-xl font-bold ml-2">
//               {job.match_score}%
//             </span>
//           </div>

//           <div className="mt-4">
//             <h4 className="font-bold text-yellow-400">
//               Why this job matches
//             </h4>

//             <p className="mt-2">
//               {job.reason}
//             </p>
//           </div>

//           <div className="mt-4">
//             <h4 className="font-bold text-green-400">
//               Matched Skills
//             </h4>

//             <div className="flex flex-wrap gap-2 mt-2">
//               {job.matched_skills?.map((skill, i) => (
//                 <span
//                   key={i}
//                   className="bg-green-600 px-3 py-1 rounded-full text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="mt-4">
//             <h4 className="font-bold text-red-400">
//               Missing Skills
//             </h4>

//             <div className="flex flex-wrap gap-2 mt-2">
//               {job.missing_skills?.map((skill, i) => (
//                 <span
//                   key={i}
//                   className="bg-red-600 px-3 py-1 rounded-full text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// }

// export default JobMatches;


function JobMatches({ jobs }) {
  if (!jobs || jobs.length === 0) return null;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="
          text-2xl
          sm:text-3xl
          md:text-4xl
          font-bold
          text-cyan-400
          mb-6
        ">
          Matching Jobs
        </h2>

        {/* Job Cards */}
        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="
                bg-slate-800
                border
                border-cyan-500/40
                rounded-2xl
                p-4
                sm:p-6
                md:p-8
                shadow-lg
                hover:shadow-cyan-500/20
                transition-all
              "
            >
              {/* Title */}
              <h3 className="
                text-xl
                sm:text-2xl
                md:text-3xl
                font-bold
                text-white
                break-words
              ">
                {job.title}
              </h3>

              {/* Company */}
              <p className="
                text-cyan-400
                text-base
                sm:text-lg
                mt-2
                break-words
              ">
                {job.company}
              </p>

              {/* Match Score */}
              <div className="
                mt-5
                flex
                flex-col
                sm:flex-row
                sm:items-center
                gap-2
              ">
                <span className="font-semibold text-white">
                  Match Score:
                </span>

                <span className="
                  text-green-400
                  text-xl
                  sm:text-2xl
                  font-bold
                ">
                  {job.match_score}%
                </span>
              </div>

              {/* Reason */}
              <div className="mt-6">
                <h4 className="
                  font-bold
                  text-yellow-400
                  text-lg
                ">
                  Why this job matches
                </h4>

                <p className="
                  mt-2
                  text-slate-300
                  leading-relaxed
                  text-sm
                  sm:text-base
                ">
                  {job.reason}
                </p>
              </div>

              {/* Matched Skills */}
              <div className="mt-6">
                <h4 className="
                  font-bold
                  text-green-400
                  text-lg
                ">
                  Matched Skills
                </h4>

                <div className="
                  flex
                  flex-wrap
                  gap-2
                  mt-3
                ">
                  {job.matched_skills?.map((skill, i) => (
                    <span
                      key={i}
                      className="
                        bg-green-600
                        px-3
                        py-2
                        rounded-full
                        text-xs
                        sm:text-sm
                        font-medium
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="mt-6">
                <h4 className="
                  font-bold
                  text-red-400
                  text-lg
                ">
                  Missing Skills
                </h4>

                <div className="
                  flex
                  flex-wrap
                  gap-2
                  mt-3
                ">
                  {job.missing_skills?.map((skill, i) => (
                    <span
                      key={i}
                      className="
                        bg-red-600
                        px-3
                        py-2
                        rounded-full
                        text-xs
                        sm:text-sm
                        font-medium
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default JobMatches;