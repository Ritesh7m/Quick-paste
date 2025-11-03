import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Paste from "./components/Paste"
import ViewPaste from "./components/ViewPaste"
import ShortViewPaste from "./components/ShortViewPaste"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#1E1E1E] text-[#E0E0E0]">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/paste" element={<Paste />} />
            {/* Old long URL route - still works */}
            <Route path="/viewpaste/:pasteId" element={<ViewPaste />} />
            <Route path="/p/:slug" element={<ShortViewPaste />} />
          </Routes>
          <footer className="text-center py-3 bg-[#252526] text-[#858585] border-t border-[#3E3E42]">
            <h1 className="text-sm md:text-base font-medium">Made with ❤️ by Ritesh</h1>
          </footer>
        </div>
      </div>
    </Router>
  )
}

export default App
