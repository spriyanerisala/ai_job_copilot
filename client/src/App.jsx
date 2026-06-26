import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import ResumeImprover from "./pages/ResumeImprover";
import ResumeSelector from './components/ResumeStyleSelector';
import JobRoleResume from './components/JobRoleResume';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path='/resume-improver' element={<ResumeImprover/>}/>
        <Route path='/resume-selector' element={<ResumeSelector/>}/>
        <Route path='/job-role-resume' element={<JobRoleResume/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;