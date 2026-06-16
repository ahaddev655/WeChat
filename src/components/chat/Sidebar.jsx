import { MessageSquarePlus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ contentType }) {
  // --- States ---
  const [searchData, setSearchData] = useState("");

  // --- State-Based Arrays ---

  const [userData, setUserData] = useState([
    {
      temp_id: "UID-8F3K9M2X",
      id: 1,
      fname: "Muhammad",
      lname: "Ahad",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahad",
      status: 1,
      active_at: "10:45 AM",
    },
    {
      temp_id: "UID-8F3K9M2X",
      id: 2,
      fname: "Sarah",
      lname: "Ahmed",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      status: 0,
      active_at: "Yesterday",
    },
    {
      temp_id: "UID-8F3K9M2X",
      id: 3,
      fname: "John",
      lname: "Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      status: 0,
      active_at: "Friday",
    },
  ]);

  const [communitiesData, setCommunitiesData] = useState([
    {
      temp_id: "UID-8F3K9M2X",
      id: 1,
      communityName: "Hello World",
    },
    {
      temp_id: "UID-8F3K9M2X",
      id: 2,
      communityName: "Hello World",
    },
    {
      temp_id: "UID-8F3K9M2X",
      id: 3,
      communityName: "Hello World",
    },
  ]);

  // --- Data Filter ---

  const filteredUsers = userData.filter((user) =>
    `${user.fname} ${user.lname}`
      .toLowerCase()
      .includes(searchData.toLowerCase()),
  );

  const filteredCommunities = communitiesData.filter((community) =>
    `${community.communityName}`
      .toLowerCase()
      .includes(searchData.toLowerCase()),
  );

  return (
    <div className="w-[320px] min-w-[320px] max-w-[320px] shrink-0 grow-0 border-r border-gray-200/80 h-full bg-white flex flex-col">
      <div className="px-4 pt-5 pb-3 flex flex-col gap-4">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            {contentType === "chat"
              ? "Messages"
              : contentType === "communities"
                ? "Communities"
                : "Bookmarks"}
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
            placeholder={
              contentType === "chat"
                ? "Search conversations..."
                : contentType === "communities"
                  ? "Search communities..."
                  : "Search saved messages..."
            }
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

      {/* User Data */}
      {contentType === "chat" ? (
        <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Link
                to={`/chat/${user.temp_id}/${user.id}`}
                key={user.id}
                className="block w-full"
              >
                <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group">
                  {/* Avatar Layout with Dynamic Status Dot */}
                  <div className="relative shrink-0">
                    <img
                      src={user.avatar}
                      alt={`${user.fname} ${user.lname}`}
                      className="w-11 h-11 rounded-full bg-gray-100 border border-gray-100 object-cover transform group-hover:scale-[1.02] transition-transform"
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
                        {" "}
                        {user.status === 1 ? "Online" : "Offline"}
                      </p>
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
      ) : (
        <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-4">
          {filteredCommunities.length > 0 ? (
            filteredCommunities.map((community) => (
              <Link
                to={`/chat/community/${community.temp_id}/${community.id}`}
                key={community.id}
                className="block w-full"
              >
                <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100/80 group">
                  {/* Enhanced Avatar Layout */}
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-[1.03] group-hover:shadow transition-all duration-200">
                      {" "}
                      {community.communityName?.charAt(0).toUpperCase() || "#"}
                    </div>
                  </div>

                  {/* Community Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                        {community.communityName}
                      </p>
                    </div>

                    <p className="text-xs text-gray-400 truncate mt-0.5 font-medium">
                      Click to view community chat
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 px-4">
              <p className="text-sm text-gray-500 font-medium">
                No communities found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
