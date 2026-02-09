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
import ManageVideo from "./pages/ManageVideo";
import MyChannels from "./pages/MyChannels";

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
              className={`flex-1 overflow-y-auto bg-yt-black p-4 transition-all duration-300
                ml-0  /* Default: Mobile has 0 margin (Sidebar is overlay) */
                ${isSidebarOpen ? "md:ml-60" : "md:ml-16"} /* Desktop: Push content right */
              `}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-channel" element={<CreateChannel />} />
                <Route path="/channel/:id" element={<Channel />} />
                <Route path="/manage/video/:id" element={<ManageVideo />} />
                <Route path="/my-channels" element={<MyChannels />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
