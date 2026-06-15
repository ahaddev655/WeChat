import {
  Ban,
  Circle,
  EllipsisVertical,
  Phone,
  Search,
  Trash2,
  UserCircle,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import InputItem from "./../InputItem";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
function Header() {
  // --- States ---

  const [searchToggle, setSearchToggle] = useState(false);
  const [settingsToggle, setSettingsToggle] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [modalToggle, setModalToggle] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // --- Variables ---

  const route = useLocation();
  const location = route.pathname.split("/");

  // --- ID & UID from routing ---

  const id = location[2];
  const uid = location[3];

  // --- State-Based Data ---

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

  // --- Dropdown Logic ---

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSettingsToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsToggle]);

  return (
    <>
      {/* Header */}
      <div className="h-20 flex items-center justify-between container-v2 bg-white border-b-2 border-gray-100 shadow-lg">
        {/* Name */}
        <div>
          <span className="text-xl font-semibold text-slate-800">John Doe</span>
        </div>
        {/* Social Icons */}
        <div className="flex items-center gap-5 relative">
          <AnimatePresence>
            {searchToggle && (
              <motion.input
                initial={{ width: 0, style: { transformOrigin: "right" } }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                type="text"
                name="search"
                id="search"
                value={searchData}
                placeholder="Search your previous messages..."
                onChange={(e) => setSearchData(e.target.value)}
                className="h-9 border-2 border-gray-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900 rounded-lg px-3 transition-colors duration-200 ease-in-out text-sm font-medium text-neutral-700 outline-none w-70 ml-auto"
              />
            )}
          </AnimatePresence>
          <button type="button" onClick={() => setSearchToggle(!searchToggle)}>
            <Search
              size={22}
              strokeWidth={2}
              className="text-gray-500 hover:text-blue-800 transition-colors duration-200 ease-in-out"
            />
          </button>
          <button
            type="button"
            onClick={() => setSettingsToggle(!settingsToggle)}
          >
            <EllipsisVertical
              size={22}
              strokeWidth={1.5}
              className="text-gray-500 hover:text-blue-800 transition-colors duration-200 ease-in-out"
            />
          </button>
          <AnimatePresence>
            {settingsToggle && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute w-52 border border-gray-100 rounded-xl top-12 bg-white z-50 shadow-xl -left-36 p-1.5 backdrop-blur-md"
              >
                <Link
                  to={`/chat/profile/${location[2]}/${location[3]}`}
                  onClick={() => settingsToggle(false)}
                  className="flex items-center gap-3 hover:bg-slate-50 active:bg-slate-100 transition-all duration-150 ease-in-out rounded-lg px-3 py-2.5 group"
                >
                  <UserCircle className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-150" />
                  <span className="text-gray-600 font-medium text-sm group-hover:text-gray-900 transition-colors duration-150">
                    See Profile
                  </span>
                </Link>

                <div className="h-px w-[90%] mx-auto bg-gray-100 my-1" />

                <button
                  onClick={() => {
                    setModalToggle(true);
                    setModalType("block");
                    setSelectedId(id);
                    setSettingsToggle(false);
                  }}
                  className="flex items-center gap-3 hover:bg-slate-50 active:bg-slate-100 transition-all duration-150 ease-in-out rounded-lg px-3 py-2.5 group w-full text-left"
                >
                  <Ban className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-150" />
                  <span className="text-gray-600 font-medium text-sm group-hover:text-gray-900 transition-colors duration-150">
                    Block Profile
                  </span>
                </button>

                <div className="h-px w-[90%] mx-auto bg-gray-100 my-1" />

                <button
                  onClick={() => {
                    setModalToggle(true);
                    setModalType("delete");
                    setSelectedId(id);
                    setSettingsToggle(false);
                  }}
                  className="flex items-center gap-3 hover:bg-slate-50 active:bg-slate-100 transition-all duration-150 ease-in-out rounded-lg px-3 py-2.5 group w-full text-left"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-150" />
                  <span className="text-gray-600 font-medium text-sm group-hover:text-gray-900 transition-colors duration-150">
                    Delete Profile
                  </span>
                </button>

                <div className="h-px w-[90%] mx-auto bg-gray-100 my-1" />

                <Link
                  to="/"
                  onClick={() => settingsToggle(false)}
                  className="flex items-center gap-3 hover:bg-slate-50 active:bg-slate-100 transition-all duration-150 ease-in-out rounded-lg px-3 py-2.5 group"
                >
                  <Phone className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-150" />
                  <span className="text-gray-600 font-medium text-sm group-hover:text-gray-900 transition-colors duration-150">
                    Call User
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* PopUp Modal */}
      <AnimatePresence>
        {modalToggle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            className="bg-black/70 z-10 backdrop-blur-md w-full h-full fixed top-0 left-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
              className="bg-white max-w-sm w-full rounded-xl shadow-xl py-3 px-4"
            >
              {modalType === "delete" ? (
                <div>
                  {/* Heading */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xl font-bold text-slate-900 tracking-tight">
                      Delete Profile
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setModalToggle(false);
                        setModalType(null);
                        setSelectedId(null);
                      }}
                      className="p-1 rounded-lg hover:bg-slate-100 transition-colors duration-200 group"
                    >
                      <X
                        size={20}
                        className="text-slate-400 group-hover:text-slate-600 transition-colors"
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="mt-3">
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Are you sure you want to delete this user? This action
                      cannot be undone and all associated data will be
                      permanently removed.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setModalToggle(false);
                        setModalType(null);
                        setSelectedId(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all active:scale-[0.98]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setModalToggle(false);
                      }}
                      className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm shadow-red-100 transition-all active:scale-[0.98]"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Heading */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xl font-bold text-slate-900 tracking-tight">
                      Block Profile
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setModalToggle(false);
                        setModalType(null);
                        setSelectedId(null);
                      }}
                      className="p-1 rounded-lg hover:bg-slate-100 transition-colors duration-200 group"
                    >
                      <X
                        size={20}
                        className="text-slate-400 group-hover:text-slate-600 transition-colors"
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="mt-3">
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Are you sure you want to block this user? This action
                      cannot be undone and all associated data will be
                      permanently removed.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setModalToggle(false);
                        setModalType(null);
                        setSelectedId(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all active:scale-[0.98]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setModalToggle(false);
                      }}
                      className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm shadow-red-100 transition-all active:scale-[0.98]"
                    >
                      Block User
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
