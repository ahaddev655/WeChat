import { Outlet } from "react-router-dom";
import Header from "../components/community/Header";

function CommunitiesLayout() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header />

      <div className="flex-1 min-h-0 relative flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default CommunitiesLayout;
