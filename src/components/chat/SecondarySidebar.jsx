import { Bookmark, MessageSquareText, Users } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function SecondarySidebar({ setContentType }) {
  const iconData = [
    {
      icon: MessageSquareText,
      path: "/chat",
      key: "chat",
    },
    // {
    //   icon: Users,
    //   path: "/chat/communities",
    //   key: "communities",
    // },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="max-w-23 w-full border-r border-gray-200 h-full sm:flex hidden flex-col py-6 bg-white items-center justify-between">
        {/* Main Navigation */}
        <div className="w-full flex flex-col items-center space-y-4 px-3">
          {iconData.map((icon, i) => {
            const Icon = icon.icon;
            return (
              <NavLink
                to={icon.path}
                onClick={() => setContentType(icon.key)}
                end
                key={i}
                className="relative w-full flex justify-center group"
              >
                {({ isActive }) => (
                  <>
                    {/* Icon Circle */}
                    <div
                      className={`w-12 h-12 rounded-2xl grid place-items-center transition-all duration-200 transform active:scale-95 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : "text-gray-500 hover:bg-gray-200/60 hover:text-gray-900"
                      }`}
                    >
                      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Profile Button */}
        <div className="w-full flex justify-center pt-4 border-t border-gray-100">
          <Link
            to={"/profile"}
            className="w-11 h-11 cursor-pointer rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white shadow-sm hover:shadow-md hover:scale-105 grid place-items-center transition-all duration-200 ease-in-out"
          >
            <span className="text-xs font-bold tracking-wider uppercase">
              MA
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {/* <div className="sm:hidden fixed bottom-0 left-0 bg-white border-t border-gray-200 py-5 container-v2 flex items-center justify-between shadow-[0px_-10px_10px_rgb(0_0_0/0.1)]">
        <div className="space-y-4 flex items-center justify-center">
          {iconData.map((icon, i) => {
            const Icon = icon.icon;
            return (
              <NavLink
                to={icon.path}
                onClick={() => setContentType(icon.key)}
                end
                key={i}
                className="relative flex items-center justify-center group"
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`w-12 h-12 rounded-2xl grid place-items-center transition-all duration-200 transform active:scale-95 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : "text-gray-500 hover:bg-gray-200/60 hover:text-gray-900"
                      }`}
                    >
                      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
        <div className="border-t border-gray-100">
          <Link
            to={"/profile"}
            className="w-11 h-11 cursor-pointer rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white shadow-sm hover:shadow-md hover:scale-105 grid place-items-center transition-all duration-200 ease-in-out"
          >
            <span className="text-xs font-bold tracking-wider uppercase">
              MA
            </span>
          </Link>
        </div>
      </div> */}
    </>
  );
}

export default SecondarySidebar;
