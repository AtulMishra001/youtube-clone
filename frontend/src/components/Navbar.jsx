import { useState, useContext } from "react";
import { HiMenu } from "react-icons/hi";
import {
  IoSearchOutline,
  IoNotificationsOutline,
  IoArrowBack,
} from "react-icons/io5";
import { RiVideoAddLine, RiLogoutBoxRLine } from "react-icons/ri";
import { FaUserCircle, FaPlusSquare } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ytLogo from "../assets/youtubeIcon.png";

const Navbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setShowMobileSearch(false);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-14 bg-yt-black flex items-center justify-between px-4 z-50 border-b border-yt-border">
      {/* MOBILE SEARCH MODE */}
      {showMobileSearch ? (
        <div className="flex w-full items-center gap-2">
          <button
            onClick={() => setShowMobileSearch(false)}
            className="p-2 hover:bg-yt-light-gray rounded-full text-white"
          >
            <IoArrowBack size={24} />
          </button>

          <form onSubmit={handleSearch} className="flex-1 flex items-center">
            <input
              autoFocus
              type="text"
              placeholder="Search YouTube..."
              className="w-full bg-yt-black border border-yt-border rounded-l-full px-4 py-2 outline-none focus:border-yt-blue text-white text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yt-light-gray border border-l-0 border-yt-border px-5 py-2 rounded-r-full hover:bg-yt-border text-white"
            >
              <IoSearchOutline size={20} />
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* LEFT SECTION */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-yt-light-gray rounded-full text-white"
            >
              <HiMenu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-1">
              <img
                src={ytLogo}
                className="h-5 object-contain"
                alt="YouTube Logo"
              />
              <span className="font-bold text-xl tracking-tighter hidden sm:block text-white">
                YouTube
              </span>
            </Link>
          </div>

          {/* CENTER SECTION (Desktop Only) */}
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
                className="w-full bg-transparent outline-none text-white text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-yt-light-gray border border-l-0 border-yt-border px-5 py-1.5 rounded-r-full hover:bg-yt-border text-white"
            >
              <IoSearchOutline size={20} />
            </button>
          </form>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => setShowMobileSearch(true)}
              className="md:hidden p-2 hover:bg-yt-light-gray rounded-full text-white"
            >
              <IoSearchOutline size={24} />
            </button>

            {user ? (
              <>
                <button
                  onClick={() => navigate("/upload")}
                  className="hidden sm:block p-2 hover:bg-yt-light-gray rounded-full text-white"
                >
                  <RiVideoAddLine size={24} />
                </button>
                <button className="hidden sm:block p-2 hover:bg-yt-light-gray rounded-full text-white">
                  <IoNotificationsOutline size={24} />
                </button>

                <div className="relative ml-2">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold border-2 border-transparent hover:border-white transition-all text-white"
                  >
                    {user.username?.charAt(0).toUpperCase()}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-yt-light-gray rounded-xl shadow-2xl py-2 z-100 border border-yt-border">
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-yt-border mb-2">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                          {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold truncate text-white">
                            {user.username}
                          </span>
                          <span className="text-xs text-yt-text-secondary truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          navigate("/create-channel");
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-yt-border text-sm text-white"
                      >
                        <FaPlusSquare size={18} />
                        Create a channel
                      </button>

                      <button
                        onClick={() => {
                          navigate("/my-channels");
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-yt-border text-sm text-white"
                      >
                        <FaUserCircle size={18} />
                        My Channel
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
        </>
      )}
    </nav>
  );
};

export default Navbar;
