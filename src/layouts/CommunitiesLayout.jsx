import { Outlet } from "react-router-dom";

function CommunitiesLayout() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Outlet />
    </div>
  );
}

export default CommunitiesLayout;
