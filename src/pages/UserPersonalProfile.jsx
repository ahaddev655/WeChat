import { ArrowLeft, Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserPersonalProfile() {
  // ---- Arrays ----
  const friends = [];
  const [userData, setUserData] = useState(null);
  const [copied, setCopied] = useState(false);

  // ---- Variables ----
  const id = localStorage.getItem("wechat_id");
  const uid = localStorage.getItem("wechat_uid");
  const base_url = import.meta.env.VITE_API_LOCAL_BASE_URL;

  // ---- User Details Function ----
  const userDetails = () => {
    axios
      .get(`${base_url}/user/user/${uid}/${id}`)
      .then((response) => {
        const data = response?.data.user_details;
        setUserData(data || {});
      })
      .catch((error) => {
        toast.error(error?.response?.data.message);
        setUserData({});
      });
  };

  useEffect(() => {
    userDetails();
  }, []);

  // ---- Copy to Clipboard Handler ----
  const handleCopyUid = async () => {
    if (!uid) return;
    try {
      await navigator.clipboard.writeText(uid);
      setCopied(true);
      toast.success("UID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy UID");
    }
  };

  const isLoading = userData === null;

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
          {isLoading ? (
            <>
              <div className="w-16 h-16 rounded-full bg-slate-200 animate-pulse ring-4 ring-slate-50" />
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-slate-200 rounded animate-pulse w-2/3" />
                <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white grid place-items-center text-xl font-bold shadow-sm ring-4 ring-blue-50">
                {userData.firstName
                  ? `${userData.firstName[0]}${userData.lastName?.[0] || ""}`.toUpperCase()
                  : "MA"}
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="font-medium text-blue-600 text-sm">
                  {userData.email}
                </p>
              </div>
            </>
          )}
        </div>

        <hr className="border-slate-100" />

        {/* Account Information Section */}
        <div>
          <h2 className="font-semibold text-xs uppercase tracking-wider text-slate-400 mb-4">
            Account Information
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {/* First Name */}
            <div>
              <span className="block text-xs text-slate-400 font-medium mb-0.5">
                First Name
              </span>
              {isLoading ? (
                <div className="h-4 bg-slate-200 rounded animate-pulse w-24 mt-1" />
              ) : (
                <span className="text-sm font-semibold text-slate-800">
                  {userData.firstName}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div>
              <span className="block text-xs text-slate-400 font-medium mb-0.5">
                Last Name
              </span>
              {isLoading ? (
                <div className="h-4 bg-slate-200 rounded animate-pulse w-24 mt-1" />
              ) : (
                <span className="text-sm font-semibold text-slate-800">
                  {userData.lastName}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className="col-span-2">
              <span className="block text-xs text-slate-400 font-medium mb-0.5">
                Email Address
              </span>
              {isLoading ? (
                <div className="h-4 bg-slate-200 rounded animate-pulse w-48 mt-1" />
              ) : (
                <span className="text-sm font-semibold text-slate-800 break-all">
                  {userData.email}
                </span>
              )}
            </div>

            {/* User ID (UID) */}
            <div className="col-span-2">
              <span className="block text-xs text-slate-400 font-medium mb-0.5">
                User ID (UID)
              </span>
              {isLoading ? (
                <div className="h-9 bg-slate-100 rounded-lg animate-pulse w-full mt-0.5" />
              ) : (
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100 w-full justify-between">
                  <span className="text-sm font-mono font-medium text-slate-700 truncate">
                    {uid || "Not Available"}
                  </span>
                  {uid && (
                    <button
                      onClick={handleCopyUid}
                      className="p-1.5 hover:bg-slate-200 rounded-md transition-colors text-slate-500 hover:text-slate-700"
                      title="Copy UID"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Role */}
            <div>
              <span className="block text-xs text-slate-400 font-medium mb-0.5">
                Role
              </span>
              {isLoading ? (
                <div className="h-5 bg-slate-100 rounded-full animate-pulse w-16 mt-0.5" />
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                  {userData.role}
                </span>
              )}
            </div>

            {/* Location */}
            <div>
              <span className="block text-xs text-slate-400 font-medium mb-0.5">
                Location
              </span>
              {isLoading ? (
                <div className="h-4 bg-slate-200 rounded animate-pulse w-12 mt-1" />
              ) : (
                <span className="text-sm font-medium text-slate-400">—</span>
              )}
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Recent Chats / Friends Section */}
        <div>
          <div className="mb-4">
            <h2 className="font-semibold text-xs uppercase tracking-wider text-slate-400">
              Friends List
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {friends.length > 0 ? (
              friends.map((friend) => (
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
              ))
            ) : (
              <p className="text-sm text-gray-400 font-medium">
                No friends added
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPersonalProfile;
