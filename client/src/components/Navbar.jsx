// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   return (
//     <nav className="flex justify-between items-center px-8 py-4 bg-slate-900 border-b border-slate-700">
//       <h1
//         className="text-2xl font-bold text-cyan-400 cursor-pointer"
//         onClick={() => navigate("/")}
//       >
//         AI Job Copilot
//       </h1>

//       <div className="flex gap-4">

//         <button
//           onClick={() => navigate("/")}
//           className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600"
//         >
//           Dashboard
//         </button>

//         <button
//           onClick={() => navigate("/resume-improver")}
//           className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
//         >
//           Resume Improver
//         </button>

//         <button
//           onClick={() => navigate("/resume-selector")}
//           className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600"
//         >
//           Resume Selector
//         </button>

//         <button
//           onClick={() => navigate("/job-role-resume")}
//           className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600"
//         >
//           Job Role Resume
//         </button>

//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      color: "bg-cyan-500 hover:bg-cyan-600",
    },
    {
      name: "Resume Improver",
      path: "/resume-improver",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Resume Selector",
      path: "/resume-selector",
      color: "bg-gray-500 hover:bg-gray-600",
    },
    {
      name: "Job Role Resume",
      path: "/job-role-resume",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <h1
            className="text-xl sm:text-2xl font-bold text-cyan-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            AI Job Copilot
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-3">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`${item.color} px-4 py-2 rounded-lg font-medium transition`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">

            <div className="flex flex-col gap-3">

              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                  className={`${item.color} w-full py-3 rounded-lg font-medium transition`}
                >
                  {item.name}
                </button>
              ))}

            </div>

          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;