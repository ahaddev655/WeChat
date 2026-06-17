import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFoundError from "./pages/NotFoundError";
import ChatLayout from "./layouts/ChatLayout";
import MainChatLayout from "./layouts/MainChatLayout";
import CommunitiesLayout from "./layouts/CommunitiesLayout";
import UserPersonalProfile from "./pages/UserPersonalProfile";
import Profile from "./pages/Profile";
import ChatComp from "./components/chat/ChatComp";
import CommunityComp from "./components/community/CommunityComp";
import BookmarksComp from './components/BookmarksComp';
import SplashScreen from "./pages/SplashScreen";

function App() {
  const routes = createBrowserRouter([
    {
      path: "*",
      element: <NotFoundError />,
    },
    {
      path: "/",
      element: <SplashScreen />
    },
    {
      path: "/auth",
      element: <AuthenticationPage />,
    },
    {
      path: "/chat",
      element: <ChatLayout />,
      children: [
        {
          path: ":temp_id/:id",
          element: <MainChatLayout />,
          children: [
            {
              index: true,
              element: <ChatComp />,
            },
          ],
        },
        {
          path: "communities",
          element: <CommunitiesLayout />,
          children: [
            {
              path: ":temp_id/:id",
              element: <CommunityComp />,
            },
          ],
        },
        {
          path: "saved",
          element: <BookmarksComp />,
        },
        {
          path: "profile/:temp_id/:user_id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/profile",
      element: <UserPersonalProfile />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
