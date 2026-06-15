import { ArrowLeft } from "lucide-react";

function UserPersonalProfile() {
  const friends = [
    { id: 1, name: "Zain Ali", initials: "ZA", online: true },
    { id: 2, name: "Esha Khan", initials: "EK", online: true },
    { id: 3, name: "Bilal Umar", initials: "BU", online: false },
    { id: 4, name: "Sana Ahmed", initials: "SA", online: false },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white max-w-md w-full shadow-md rounded-2xl p-6 border border-slate-100 space-y-6 relative">
        {/* Top Navigation / Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Header Section (Avatar + Name) */}
        <div className="flex items-center gap-4 pt-2">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white grid place-items-center text-xl font-bold shadow-sm ring-4 ring-blue-50">
            MA
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Muhammad Ahad
            </h1>
            <p className="font-medium text-blue-600 text-sm">
              ahad.dev.eng@gmail.com
            </p>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Account Information Section */}
        <div>
          <h2 className="font-semibold text-xs uppercase tracking-wider text-slate-400 mb-4">
            Account Information
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <div>
              <span className="block text-xs text-slate-400 font-medium mb-0.5">
                First Name
              </span>
              <span className="text-sm font-semibold text-slate-800">
                Muhammad
              </span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-medium mb-0.5">
                Last Name
              </span>
              <span className="text-sm font-semibold text-slate-800">Ahad</span>
            </div>
            <div className="col-span-2">
              <span className="block text-xs text-slate-400 font-medium mb-0.5">
                Email Address
              </span>
              <span className="text-sm font-semibold text-slate-800 break-all">
                ahad.dev.eng@gmail.com
              </span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-medium mb-0.5">
                Role
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                User
              </span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-medium mb-0.5">
                Location
              </span>
              <span className="text-sm font-medium text-slate-400">—</span>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Recent Chats / Friends Section */}
        <div>
          <div className="mb-4">
            <h2 className="font-semibold text-xs uppercase tracking-wider text-slate-400">
              Recent Chats
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex flex-col items-center shrink-0 group cursor-pointer"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm grid place-items-center border-2 border-white ring-2 ring-slate-200 group-hover:ring-blue-400 transition-all">
                    {friend.initials}
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${
                      friend.online ? "bg-green-500" : "bg-slate-300"
                    }`}
                  />
                </div>
                <span className="text-xs text-slate-600 font-medium mt-1.5 max-w-15 truncate text-center">
                  {friend.name.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPersonalProfile;
