import Sidebar from "./../components/community/Sidebar";
import { Outlet } from "react-router-dom";

function CommunitiesLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default CommunitiesLayout;
