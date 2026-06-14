import { Outlet } from "react-router-dom";
import Header from "./../components/chat/Header";
import Copyright from "./../components/chat/Copyright";
import Sidebar from "./../components/chat/Sidebar";
import SecondarySidebar from "./../components/chat/SecondarySidebar";

function ChatLayout() {
  return (
    <div className="flex h-screen">
      <SecondarySidebar />
      <Sidebar />
      <div className="max-w-6xl mx-auto w-full flex flex-col">
        <div className="flex-1">
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
