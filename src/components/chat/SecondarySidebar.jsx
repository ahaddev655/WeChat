import { Bookmark, MessageSquareText, Users } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function SecondarySidebar() {
  const iconData = [
    {
      icon: MessageSquareText,
      path: "/chat",
    },
    {
      icon: Users,
      path: "/chat/communities",
    },
    {
      icon: Bookmark,
      path: "/chat/saved",
    },
  ];

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="max-w-30 flex w-full border-r border-gray-200 h-full flex-col py-6 bg-white items-center justify-between">
        {/* Main Navigation */}
        <div className="w-full flex flex-col items-center space-y-4 px-3">
          {iconData.map((icon, i) => {
            const Icon = icon.icon;
            return (
              <NavLink
                to={icon.path}
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
    </div>
  );
}

export default SecondarySidebar;
