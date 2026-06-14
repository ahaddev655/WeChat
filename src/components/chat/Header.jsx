import {
  Ban,
  Circle,
  EllipsisVertical,
  Phone,
  Search,
  Trash2,
  UserCircle,
} from "lucide-react";
import React, { useState } from "react";
import InputItem from "./../InputItem";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
function Header() {
  const [searchToggle, setSearchToggle] = useState(false);
  const [settingsToggle, setSettingsToggle] = useState(false);
  const [searchData, setSearchData] = useState("");
  const settingsArray = [
    {
      path: "/",
      label: "Block Profile",
      icon: Ban,
    },
    {
      path: "/",
      label: "See Profile",
      icon: UserCircle,
    },
    {
      path: "/",
      label: "Delete Profile",
      icon: Trash2,
    },
    {
      path: "/",
      label: "Call User",
      icon: Phone,
    },
  ];

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

  return (
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
              transition={{ duration: 0.6, ease: "easeInOut" }}
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
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute w-52 border border-gray-100 rounded-xl top-12 bg-white z-50 shadow-xl -left-36 p-1.5 backdrop-blur-md"
            >
              {settingsArray.map((item, i) => {
                // Dynamic Icon helper
                const IconComponent = item.icon || Circle;

                return (
                  <React.Fragment key={i}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 hover:bg-slate-50 active:bg-slate-100 transition-all duration-150 ease-in-out rounded-lg px-3 py-2.5 group"
                    >
                      <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-150" />
                      <span className="text-gray-600 font-medium text-sm group-hover:text-gray-900 transition-colors duration-150">
                        {item.label}
                      </span>
                    </Link>

                    {i < settingsArray.length - 1 && (
                      <div className="h-px w-[90%] mx-auto bg-gray-100 my-1" />
                    )}
                  </React.Fragment>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Header;
