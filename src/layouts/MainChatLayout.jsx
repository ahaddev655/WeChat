import { Outlet } from "react-router-dom";
import Header from "../components/chat/Header";

function MainChatLayout() {
  return (
    <div className="flex flex-col h-full overflow-y-hidden">
      <Header />

      <div className="flex-1 relative">
        <Outlet />
      </div>
    </div>
  );
}

export default MainChatLayout;
