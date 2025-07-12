import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomeRouter from "./routes/HomeRouter";

function App() {
  return (
    <div className="font-priego text-sm md:text-md bg-[#f2ecec] min-h-screen">
      <Router>
        <Routes>
          <Route path="*" element={<HomeRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
