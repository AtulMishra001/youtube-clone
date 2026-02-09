import {
  MdHome, // Corrected from MdHomeFilled
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdOutlineHistory,
  MdOutlineWatchLater,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper component for Sidebar Items
  const SidebarItem = ({ icon: Icon, label, path }) => {
    const isActive = location.pathname === path;

    return (
      <div
        onClick={() => navigate(path)}
        className={`flex items-center gap-5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors
          ${isActive ? "bg-yt-light-gray font-bold" : "hover:bg-yt-light-gray"}
        `}
      >
        <Icon
          size={22}
          className={isActive ? "text-white" : "text-yt-text-primary"}
        />
        <span
          className={`text-sm tracking-wide ${isOpen ? "block" : "hidden"}`}
        >
          {label}
        </span>
      </div>
    );
  };

  return (
    <aside
      className={`fixed left-0 top-14 h-[calc(100vh-56px)] bg-yt-black overflow-y-auto no-scrollbar transition-all duration-300 z-40
        ${isOpen ? "w-60 px-3" : "w-16 px-2"}
      `}
    >
      {/* SECTION 1: Main Navigation */}
      <div className="flex flex-col gap-1 py-3 border-b border-yt-border">
        {/* Fixed: Using MdHome here instead of MdHomeFilled */}
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
          className={`px-3 py-2 text-sm font-bold ${isOpen ? "block" : "hidden"}`}
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
        path="/history" />
        <SidebarItem
          icon={MdOutlineWatchLater}
          label="Watch Later"
          path="/watch-later"
        />
      </div>

      {/* FOOTER: Links (Only shown when expanded) */}
      {isOpen && (
        <div className="p-4 text-[11px] text-yt-text-secondary font-semibold flex flex-wrap gap-x-2 leading-4">
          <span>About</span>
          <span>Press</span>
          <span>Copyright</span>
          <span>Contact us</span>
          <span>Creators</span>
          <div className="mt-3 text-yt-text-secondary font-normal italic">
            © 2026 Google LLC
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
