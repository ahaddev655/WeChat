import { MessageSquarePlus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [searchData, setSearchData] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const [userData, setUserData] = useState([
    {
      temp_id: "UID-8F3K9M2X",
      id: 1,
      fname: "Muhammad",
      lname: "Ahad",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahad",
      status: 1,
      active_at: "10:45 AM",
      unreadCount: 2,
    },
    {
      temp_id: "UID-8F3K9M2X",
      id: 2,
      fname: "Sarah",
      lname: "Ahmed",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      status: 0,
      active_at: "Yesterday",
      unreadCount: 0,
    },
    {
      temp_id: "UID-8F3K9M2X",
      id: 3,
      fname: "John",
      lname: "Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      status: 0,
      active_at: "Friday",
      unreadCount: 0,
    },
  ]);

  const filteredUsers = userData.filter((user) =>
    `${user.fname} ${user.lname}`
      .toLowerCase()
      .includes(searchData.toLowerCase()),
  );
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (
      path.startsWith("/chat") &&
      path.includes("/communities") &&
      !path.includes("/saved")
    ) {
      setToggleSidebar(true);
    } else {
      setToggleSidebar(false);
    }
  }, [location.pathname]);

  return (
    <div>
      {toggleSidebar && (
        <div className="w-[320px] border-r border-gray-200/80 h-full bg-white flex flex-col">
          <div className="px-4 pt-5 pb-3 flex flex-col gap-4">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Messages
              </h2>
              <button
                type="button"
                aria-label="New Message"
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 active:scale-95"
              >
                <MessageSquarePlus size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full">
              <input
                type="text"
                name="search"
                id="search"
                value={searchData}
                placeholder="Search conversations..."
                className="w-full h-9 pl-9 pr-8 border border-gray-300 rounded-xl bg-gray-50/50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition-all duration-200"
                onChange={(e) => setSearchData(e.target.value)}
              />

              {/* Search Icon */}
              <Search
                className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 pointer-events-none"
                size={16}
              />

              {/* Clear Search Button (Conditional) */}
              {searchData && (
                <button
                  type="button"
                  onClick={() => setSearchData("")}
                  className="absolute top-1/2 -translate-y-1/2 right-2.5 p-0.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic List Area */}
          <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Link to={`/chat/${user.temp_id}/${user.id}`}>
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group"
                  >
                    {/* Avatar Layout with Dynamic Status Dot */}
                    <div className="relative shrink-0">
                      <img
                        src={user.avatar}
                        alt={`${user.fname} ${user.lname}`}
                        className="w-11 h-11 rounded-full bg-gray-100 border border-gray-100 object-cover transform group-hover:scale-102 transition-transform"
                      />
                      {user.status === 1 && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white ring-1 ring-black/5" />
                      )}
                    </div>

                    {/* User Identity & Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.fname} {user.lname}
                        </p>
                        <span className="text-xs text-gray-400 font-medium">
                          {user.active_at}
                        </span>
                      </div>

                      {/* Dynamic Sub-text / Notification layout */}
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500 truncate max-w-35">
                          {user.status === 1 ? "Online" : "Offline"}
                        </p>

                        {user.unreadCount > 0 && (
                          <span className="flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm animate-pulse">
                            {user.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              /* Empty Search State */
              <div className="text-center py-8 px-4">
                <p className="text-sm text-gray-400 font-medium">
                  No results found
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
