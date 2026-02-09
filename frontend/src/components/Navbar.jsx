import { useState, useContext } from "react";
import { HiMenu } from "react-icons/hi";
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";
import { RiVideoAddLine, RiLogoutBoxRLine } from "react-icons/ri"; // Added Logout icon
import { FaUserCircle, FaPlusSquare } from "react-icons/fa"; // Added Channel icon
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, logout } = useContext(AuthContext); // Consuming the Auth state
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-14 bg-yt-black flex items-center justify-between px-4 z-50 border-b border-yt-border">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-yt-light-gray rounded-full"
        >
          <HiMenu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <div className="bg-yt-red p-1 rounded-lg">
            <span className="text-white font-bold text-xs">YT</span>
          </div>
          <span className="font-bold text-xl tracking-tighter hidden sm:block">
            YouTube
          </span>
        </Link>
      </div>

      {/* CENTER SECTION */}
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
            className="w-full bg-transparent outline-none text-yt-text-primary"
          />
        </div>
        <button
          type="submit"
          className="bg-yt-light-gray border border-l-0 border-yt-border px-5 py-1.5 rounded-r-full hover:bg-yt-border"
        >
          <IoSearchOutline size={20} />
        </button>
      </form>

      {/* RIGHT SECTION: Dynamic Auth UI */}
      <div className="flex items-center gap-2 relative">
        {user ? (
          <>
            <button className="p-2 hover:bg-yt-light-gray rounded-full">
              <RiVideoAddLine size={24} />
            </button>
            <button className="p-2 hover:bg-yt-light-gray rounded-full">
              <IoNotificationsOutline size={24} />
            </button>

            {/* AVATAR & DROPDOWN */}
            <div className="relative ml-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold border-2 border-transparent hover:border-white transition-all"
              >
                {user.username?.charAt(0).toUpperCase()}
              </button>

              {/* DROPDOWN MENU */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-yt-light-gray rounded-xl shadow-2xl py-2 z-100 border border-yt-border">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-yt-border mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold truncate">
                        {user.username}
                      </span>
                      <span className="text-xs text-yt-text-secondary truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  {/* Requirement: Menu item to Create Channel */}
                  <button
                    onClick={() => {
                      navigate("/create-channel");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-yt-border text-sm"
                  >
                    <FaPlusSquare size={18} />
                    Create a channel
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-yt-border text-sm text-red-400"
                  >
                    <RiLogoutBoxRLine size={18} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 border border-yt-border text-yt-blue px-3 py-1.5 rounded-full hover:bg-yt-blue/10 font-medium"
          >
            <FaUserCircle size={24} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
