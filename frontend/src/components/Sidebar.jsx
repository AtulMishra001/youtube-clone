import {
  MdHome,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdOutlineHistory,
  MdOutlineWatchLater,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper component for Sidebar Items
  const SidebarItem = ({ icon: Icon, label, path }) => {
    const isActive = location.pathname === path;

    return (
      <div
        onClick={() => {
          navigate(path);
          // Feature: Auto-close sidebar on mobile after selecting a link
          if (window.innerWidth < 768) toggleSidebar();
        }}
        className={`flex items-center gap-5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors
          ${isActive ? "bg-yt-light-gray font-bold" : "hover:bg-yt-light-gray"}
        `}
      >
        <Icon
          size={22}
          className={isActive ? "text-white" : "text-yt-text-primary"}
        />
        {/* Label visibility logic for desktop mini-sidebar vs mobile drawer */}
        <span
          className={`text-sm tracking-wide ${isOpen ? "block" : "hidden md:hidden lg:hidden"}`}
        >
          {label}
        </span>
      </div>
    );
  };

  return (
    <>
      {/* 1. MOBILE OVERLAY: Dims background and allows closing by clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* 2. SIDEBAR CONTAINER */}
      <aside
        className={`fixed left-0 top-14 h-[calc(100vh-56px)] bg-yt-black overflow-y-auto no-scrollbar transition-all duration-300 z-40 border-r border-yt-border
          ${/* Logic: On mobile, hide off-screen (-translate-x-full). On desktop, toggle between 60/16 width. */ ""}
          ${
            isOpen
              ? "translate-x-0 w-60 px-3"
              : "-translate-x-full md:translate-x-0 md:w-16 px-2"
          }
        `}
      >
        {/* SECTION 1: Main Navigation */}
        <div className="flex flex-col gap-1 py-3 border-b border-yt-border">
          <SidebarItem icon={MdHome} label="Home" path="/" />
          <SidebarItem icon={SiYoutubeshorts} label="Shorts" path="/shorts" />
          <SidebarItem
            icon={MdOutlineSubscriptions}
            label="Subscriptions"
            path="/subscriptions"
          />
        </div>

        {/* SECTION 2: Library & History */}
        <div className="flex flex-col gap-1 py-3 border-b border-yt-border">
          <div
            className={`px-3 py-2 text-sm font-bold text-white ${isOpen ? "block" : "hidden"}`}
          >
            You {">"}
          </div>
          <SidebarItem
            icon={MdOutlineVideoLibrary}
            label="Library"
            path="/library"
          />
          <SidebarItem
            icon={MdOutlineHistory}
            label="History"
            path="/history"
          />
          <SidebarItem
            icon={MdOutlineWatchLater}
            label="Watch Later"
            path="/watch-later"
          />
        </div>

        {/* FOOTER: Required for professional look & feel */}
        {isOpen && (
          <div className="p-4 text-[11px] text-yt-text-secondary font-semibold flex flex-wrap gap-x-2 leading-4">
            <span className="hover:text-white cursor-pointer">About</span>
            <span className="hover:text-white cursor-pointer">Press</span>
            <span className="hover:text-white cursor-pointer">Copyright</span>
            <span className="hover:text-white cursor-pointer">Contact us</span>
            <span className="hover:text-white cursor-pointer">Creators</span>
            <div className="mt-3 text-yt-text-secondary font-normal">
              © 2026 Google LLC
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
