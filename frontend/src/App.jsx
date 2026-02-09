import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import VideoDetail from "./pages/VideoDetail";
import Login from "./pages/Login";
import CreateChannel from "./pages/CreateChannel";
import Channel from "./pages/Channel";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col h-screen">
          {/* Requirement: Header with toggleable hamburger menu */}
          <Navbar toggleSidebar={toggleSidebar} />

          <div className="flex flex-1 pt-14">
            {" "}
            {/* pt-14 matches Navbar height */}
            {/* Requirement: Static sidebar that can toggle */}
            <Sidebar isOpen={isSidebarOpen} />
            {/* The main content area grows to fill the remaining space */}
            <main
              className={`flex-1 overflow-y-auto bg-yt-black p-4 transition-all duration-300 ${isSidebarOpen ? "ml-60" : "ml-16"}`}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-channel" element={<CreateChannel />} />
                <Route path="/channel/:id" element={<Channel />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
