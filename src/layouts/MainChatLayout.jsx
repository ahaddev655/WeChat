import { Outlet } from "react-router-dom";
import Header from "../components/chat/Header";

function MainChatLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default MainChatLayout;
