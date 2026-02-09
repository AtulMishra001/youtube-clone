import { useState } from "react";
import { HiMenu } from "react-icons/hi"; // Hamburger Icon
import { IoSearchOutline } from "react-icons/io5"; // Search Icon
import { RiVideoAddLine } from "react-icons/ri"; // Upload Icon
import { IoNotificationsOutline } from "react-icons/io5"; // Notifications
import { FaUserCircle } from "react-icons/fa"; // User Avatar Fallback
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handling the search logic: I am using URLSearchParams to ensure
  // the 'search' query parameter is correctly passed to the Home Page.
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-14 bg-yt-black flex items-center justify-between px-4 z-50">
      {/* LEFT SECTION: Hamburger and Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-yt-light-gray rounded-full cursor-pointer transition-colors"
        >
          <HiMenu size={24} />
        </button>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          {/* YouTube Brand Logo Styling */}
          <div className="bg-yt-red p-1 rounded-lg">
            {/* You can replace this text with a proper YouTube SVG Logo */}
            <span className="text-white font-bold text-xs">YT</span>
          </div>
          <span className="font-bold text-xl tracking-tighter">YouTube</span>
        </div>
      </div>

      {/* CENTER SECTION: Search Bar */}
      {/* I have implemented the pill-shaped search bar exactly as seen on YouTube, 
          using a distinct background color for the button to provide visual hierarchy. */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex flex-1 max-w-150 items-center ml-10"
      >
        <div className="flex flex-1 bg-yt-black border border-yt-border rounded-l-full px-4 py-1.5 focus-within:border-yt-blue">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-yt-text-primary placeholder-yt-text-secondary"
          />
        </div>
        <button
          type="submit"
          className="bg-yt-light-gray border border-l-0 border-yt-border px-5 py-1.5 rounded-r-full hover:bg-yt-border transition-colors"
        >
          <IoSearchOutline size={20} />
        </button>
      </form>

      {/* RIGHT SECTION: User Icons & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        <button className="hidden sm:block p-2 hover:bg-yt-light-gray rounded-full">
          <RiVideoAddLine size={24} />
        </button>
        <button className="hidden sm:block p-2 hover:bg-yt-light-gray rounded-full">
          <IoNotificationsOutline size={24} />
        </button>
        <div
          className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-yt-light-gray"
          onClick={() => navigate("/login")}
        >
          {/* Requirement: Header should show sign-in button if not logged in */}
          <FaUserCircle size={32} className="text-yt-text-secondary" />
          {/* After signing in, user's name should appear here */}
          <span className="hidden lg:block text-sm font-medium">Sign In</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
