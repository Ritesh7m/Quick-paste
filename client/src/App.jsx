import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#0F1A08] text-white">
        <Navbar />
        <div className="flex-grow mt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/paste" element={<Paste />} />
            <Route path="/viewpaste/:pasteId" element={<ViewPaste />} />
          </Routes>
          <footer className="text-center py-3 bg-[#1F2D14] text-green-400 shadow-inner border-green-700">
          <h1 className="text-sm md:text-base font-medium">Made with ❤️ by Ritesh</h1>
        </footer>
        </div>

        
      </div>
    </Router>
  );
};

export default App;
