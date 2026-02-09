import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import VideoDetail from "./pages/VideoDetail";
import Login from "./pages/Login";

// I have structured App.jsx to use a Layout approach.
// This ensures that the Sidebar state (open/closed) is managed centrally
// and doesn't reset when navigating between pages.
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col h-screen">
          {/* Requirement: Header with toggleable hamburger menu [cite: 8] */}
          <Navbar toggleSidebar={toggleSidebar} />

          <div className="flex flex-1 pt-14">
            {" "}
            {/* pt-14 matches Navbar height [cite: 7] */}
            {/* Requirement: Static sidebar that can toggle [cite: 8] */}
            <Sidebar isOpen={isSidebarOpen} />
            {/* The main content area grows to fill the remaining space */}
            <main
              className={`flex-1 overflow-y-auto bg-yt-black p-4 transition-all duration-300 ${isSidebarOpen ? "ml-60" : "ml-16"}`}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
