import { Outlet } from "react-router-dom";
import Header from "./../components/chat/Header";
import Copyright from "./../components/chat/Copyright";
import Sidebar from "./../components/chat/Sidebar";
import SecondarySidebar from "./../components/chat/SecondarySidebar";
import { useState } from "react";

function ChatLayout() {
  const [contentType, setContentType] = useState("chat");
  return (
    <div className="flex h-screen">
      <SecondarySidebar setContentType={setContentType} />
      <Sidebar contentType={contentType} />
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
