import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./../components/chat/Header";
import Copyright from "./../components/chat/Copyright";
import Sidebar from "./../components/chat/Sidebar";
import SecondarySidebar from "./../components/chat/SecondarySidebar";
import { useEffect, useState } from "react";

function ChatLayout() {
  // --- States ---

  const [contentType, setContentType] = useState("chat");
  const [selectedContent, setSelectedContent] = useState(false);

  // --- Variables ---

  const location = useLocation();
  const navigate = useNavigate();
  const id = localStorage.getItem("wechat_id");
  const uid = localStorage.getItem("wechat_uid");

  // --- Toggle Sidebar ---
  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/communities")) {
      setContentType("communities");
    } else if (path.includes("/bookmarks") || path.includes("/saved")) {
      setContentType("bookmarks");
    } else {
      setContentType("chat");
    }
  }, [location.pathname]);

  // ---- Authentication Check ----
  useEffect(() => {
    if (id && uid) {
      return;
    }
    navigate("/auth");
  }, [id, uid, navigate]);

  return (
    <div className="flex h-screen">
      <SecondarySidebar setContentType={setContentType} />
      <Sidebar
        contentType={contentType}
        selectedContent={selectedContent}
        setSelectedContent={setSelectedContent}
      />
      <div className="max-w-360 w-full flex-1 h-full flex flex-col">
        <div className="flex flex-col flex-1 min-h-0 w-full">
          <Outlet />
        </div>
        <div>
          <Copyright />
        </div>
      </div>
    </div>
  );
}

export default ChatLayout;
