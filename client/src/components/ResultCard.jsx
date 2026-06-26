function ResultCard({ title, value }) {
  return (
    <div
      className="
        w-full
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        p-4
        sm:p-6
        shadow-lg
        hover:border-cyan-500
        hover:shadow-cyan-500/10
        transition-all
        duration-300
      "
    >
      <h2
        className="
          text-cyan-400
          text-lg
          sm:text-xl
          md:text-2xl
          font-bold
          mb-3
          break-words
        "
      >
        {title}
      </h2>

      <div
        className="
          text-slate-200
          text-sm
          sm:text-base
          md:text-lg
          leading-relaxed
          break-words
          whitespace-pre-wrap
        "
      >
        {value}
      </div>
    </div>
  );
}

export default ResultCard;