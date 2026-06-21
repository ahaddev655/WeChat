import {
  MessageSquarePlus,
  Search,
  X,
  Filter,
  CircleUserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Sidebar({ contentType, selectedContent, setSelectedContent }) {
  // --- States ---

  const [searchData, setSearchData] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState(true);
  // const [modalType, setModalType] = useState("");
  const [selectedModalType, setSelectedModalType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // --- Arrays ---

  // --- Variables ---

  const location = useLocation();

  const id = localStorage.getItem("wechat_id");

  const uid = localStorage.getItem("wechat_uid");

  const base_url = import.meta.env.VITE_API_PRODUCTION_BASE_URL;

  // --- State-Based Arrays ---

  const [userFriends, setUserFriends] = useState([]);
  const [users, setUsers] = useState([]);

  const [communitiesData, setCommunitiesData] = useState([
    {
      uid: "UID-8F3K9M2X",
      id: 1,
      communityName: "Hello World",
    },
    {
      uid: "UID-8F3K9M2X",
      id: 2,
      communityName: "Hello World",
    },
    {
      uid: "UID-8F3K9M2X",
      id: 3,
      communityName: "Hello World",
    },
  ]);

  // --- Data Filter ---

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchData.toLowerCase()),
  );

  const filteredCommunities = communitiesData.filter((community) =>
    `${community.communityName}`
      .toLowerCase()
      .includes(searchData.toLowerCase()),
  );

  const filteredFriendsList = userFriends.filter((user) => {
    const fullastName =
      `${user?.friend_firstName} ${user?.friend_lastName}`.toLowerCase();
    const matchesSearch = fullastName.includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === "online") return user.status === 1;
    if (activeFilter === "offline") return user.status === 0;
    return true;
  });

  // --- Toggle Sidebar ---

  // useEffect(() => {
  //   const path = location.pathname;

  //   if (path.startsWith("/chat")) {
  //     setToggleSidebar(true);
  //   } else {
  //     setToggleSidebar(false);
  //   }
  // }, [location.pathname]);

  // --- Toggle Modal Type ---

  // useEffect(() => {
  //   const path = location.pathname;

  //   if (path.startsWith("/chat") && !path.includes("communities")) {
  //     setModalType("chat");
  //   } else {
  //     setModalType("communities");
  //   }
  // }, [location.pathname]);

  // --- Add Friend Function ---

  const handleAddFriend = (friend_uid) => {
    axios
      .put(`${base_url}/friends/${friend_uid}/${id}`)
      .then((response) => {
        toast.success(response?.data?.message);
        setSelectedModalType("");
        fetchFriends();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  };

  // --- Fetch Friends ---

  const fetchFriends = () => {
    axios
      .get(`${base_url}/friends/${id}`)
      .then((response) => {
        const parsedFriends = JSON.parse(response?.data.friends);
        setUserFriends(parsedFriends);
      })
      .catch((error) => {});
  };

  // --- Fetch Users ---

  const fetchUsers = () => {
    setIsLoading(true);
    axios
      .get(`${base_url}/user/users/${id}`)
      .then((response) => {
        setUsers(response?.data.users);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchFriends();
  }, []);

  return (
    <>
      {/* Dektop Sidebar */}
      <div className="w-[320px] max-w-[320px] min-w-[320px] sm:flex hidden shrink-0 grow-0 border-r border-gray-200/80 h-full bg-white flex-col">
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
              onClick={() => setSelectedModalType("chat")}
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

            {/* Clear Search Button */}
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
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 animate-pulse"
                >
                  <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-gray-200 rounded-md w-2/3" />
                      <div className="h-3 bg-gray-200 rounded-md w-12" />
                    </div>
                    <div className="h-3 bg-gray-200 rounded-md w-1/3" />
                  </div>
                </div>
              ))
            ) : filteredFriendsList.length > 0 ? (
              filteredFriendsList.map((user) => (
                <Link
                  to={`/chat/${user.friend_uid}/${user.friend_id}`}
                  key={user.friend_id}
                  className="block w-full"
                >
                  <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group">
                    {/* Avatar Layout with Dynamic Status Dot */}
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm tracking-wider shadow-sm border border-blue-100/20 shrink-0 transform group-hover:scale-[1.02] transition-transform grid place-items-center">
                        {user?.friend_firstName.charAt(0)}
                        {user?.friend_lastName.charAt(0)}
                      </div>
                      {user.friend_status === 1 && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white ring-1 ring-black/5" />
                      )}
                    </div>

                    {/* User Identity & Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user?.friend_firstName} {user?.friend_lastName}
                        </p>

                        <span className="text-[10px] text-gray-400 font-medium">
                          {user?.friend_user_created_at
                            ? new Date(
                                user.friend_user_created_at,
                              ).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                        </span>
                      </div>

                      {/* Dynamic Sub-text / Notification layout */}
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500 truncate max-w-35">
                          {" "}
                          {user.friend_status === 1 ? "Online" : "Offline"}
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
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 animate-pulse"
                >
                  <div className="w-11 h-11 rounded-xl bg-gray-200 shrink-0" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="h-4 bg-gray-200 rounded-md w-1/2" />
                    <div className="h-3 bg-gray-200 rounded-md w-3/4" />
                  </div>
                </div>
              ))
            ) : filteredCommunities.length > 0 ? (
              filteredCommunities.map((community) => (
                <Link
                  to={`/chat/communities/${community.uid}/${community.id}`}
                  key={community.id}
                  className="block w-full"
                >
                  <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100/80 group">
                    {/* Enhanced Avatar Layout */}
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-[1.03] group-hover:shadow transition-all duration-200">
                        {" "}
                        {community.communityName?.charAt(0).toUpperCase() ||
                          "#"}
                      </div>
                    </div>

                    {/* Community Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-880 truncate group-hover:text-blue-600 transition-colors">
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

      {/* Mobile Overlay */}
      <AnimatePresence>
        {!selectedContent && (
          <motion.div
            initial={{ translateX: -350 }}
            animate={{ translateX: 0 }}
            exit={{ translateX: -350 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full z-20 shrink-0 grow-0 border-r border-gray-200/80 h-full bg-white flex flex-col sm:relative fixed top-0 left-0 sm:hidden"
          >
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
                <div
                  className="flex items-center
                "
                >
                  <Link to={"/profile"}>
                    <button
                      type="button"
                      aria-label="New Message"
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 active:scale-95"
                    >
                      <CircleUserRound size={20} strokeWidth={2} />
                    </button>
                  </Link>

                  <button
                    type="button"
                    aria-label="New Message"
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 active:scale-95"
                    onClick={() => setSelectedModalType("chat")}
                  >
                    <MessageSquarePlus size={20} strokeWidth={2} />
                  </button>
                </div>
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

                {/* Clear Search Button */}
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
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 animate-pulse"
                    >
                      <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="h-4 bg-gray-200 rounded-md w-2/3" />
                          <div className="h-3 bg-gray-200 rounded-md w-12" />
                        </div>
                        <div className="h-3 bg-gray-200 rounded-md w-1/3" />
                      </div>
                    </div>
                  ))
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <Link
                      onClick={() => setSelectedContent(true)}
                      to={`/chat/${user.uid}/${user.id}`}
                      key={user.id}
                      className="block w-full"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 group">
                        {/* Avatar Layout with Dynamic Status Dot */}
                        <div className="relative shrink-0">
                          <div className="w-11 h-11 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm tracking-wider shadow-sm border border-blue-100/20 shrink-0 transform group-hover:scale-[1.02] transition-transform grid place-items-center">
                            {user?.firstName.charAt(0)}
                            {user?.lastName.charAt(0)}
                          </div>
                          {user.status === 1 && (
                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white ring-1 ring-black/5" />
                          )}
                        </div>

                        {/* User Identity & Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {user.firstName} {user.lastName}
                            </p>

                            <span className="text-[10px] text-gray-400 font-medium">
                              {user.user_created_at
                                ? new Date(
                                    user.user_created_at,
                                  ).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                  })
                                : ""}
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
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 animate-pulse"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gray-200 shrink-0" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-4 bg-gray-200 rounded-md w-1/2" />
                        <div className="h-3 bg-gray-200 rounded-md w-3/4" />
                      </div>
                    </div>
                  ))
                ) : filteredCommunities.length > 0 ? (
                  filteredCommunities.map((community) => (
                    <Link
                      to={`/chat/communities/${community.uid}/${community.id}`}
                      key={community.id}
                      className="block w-full"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100/80 group">
                        {/* Enhanced Avatar Layout */}
                        <div className="relative shrink-0">
                          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-[1.03] group-hover:shadow transition-all duration-200">
                            {" "}
                            {community.communityName?.charAt(0).toUpperCase() ||
                              "#"}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {selectedModalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedModalType("")}
            className="bg-black/70 z-30 backdrop-blur-md w-full h-full fixed top-0 left-0 flex items-center justify-center px-3"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
              className="bg-white max-w-sm w-full rounded-xl shadow-xl py-3 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedModalType === "chat" ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users to add..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>

                    <button
                      type="button"
                      className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-600 hover:text-black transition-colors"
                      title="Filter users"
                    >
                      <Filter className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveFilter("all")}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                        activeFilter === "all"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-black border-gray-200"
                      }`}
                    >
                      All Users
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFilter("online")}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                        activeFilter === "online"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-black border-gray-200"
                      }`}
                    >
                      Online
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFilter("offline")}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                        activeFilter === "offline"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-black border-gray-200"
                      }`}
                    >
                      Offline
                    </button>
                  </div>

                  <div className="mt-2 max-h-48 overflow-y-auto flex flex-col gap-1 pr-1 scrollbar-none!">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="relative h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-xs font-semibold text-gray-600">
                              {user.firstName ? user.firstName[0] : ""}
                              {user.lastName ? user.lastName[0] : ""}
                              {user.status === 1 && (
                                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
                              )}
                            </div>
                            <span className="text-sm font-medium text-black">
                              {user.firstName} {user.lastName}
                            </span>
                          </div>
                          <button
                            onClick={() => handleAddFriend(user.uid)}
                            type="button"
                            className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-4">
                        No users found
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-sm font-medium text-gray-500">
                    No other action views available
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
