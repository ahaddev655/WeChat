import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Outlet,
} from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFoundError from "./pages/NotFoundError";
import ChatLayout from "./layouts/ChatLayout";
import MainChatLayout from "./layouts/MainChatLayout";
import UserPersonalProfile from "./pages/UserPersonalProfile";
import Profile from "./pages/Profile";
import ChatComp from "./components/chat/ChatComp";
import SplashScreen from "./pages/SplashScreen";
import { useEffect } from "react";
import axios from "axios";

const AppTracker = () => {
  const location = useLocation();
  const id = localStorage.getItem("wechat_id");
  const uid = localStorage.getItem("wechat_uid");
  const base_url = import.meta.env.VITE_API_PRODUCTION_BASE_URL;

  useEffect(() => {
    if (!id) return;

    // ---- Status Change ----
    axios
      .put(`${base_url}/user/status-true/${id}`)
      .then((response) => {})
      .catch((error) => {
        console.error(error?.response?.data?.error || "Error updating status");
      });

    // ---- Block Check ----
    if (!uid) return;
    axios
      .get(`${base_url}/user/user/${uid}/${id}`)
      .then((response) => {
        const data = response?.data?.user_details;

        if (data && data.isBlocked) {
          alert("You are blocked");
          window.close();
        }
      })
      .catch((error) => {});
  }, [location.pathname, base_url, id, uid]);

  return <Outlet />;
};

function App() {
  const routes = createBrowserRouter([
    {
      element: <AppTracker />,
      children: [
        {
          path: "*",
          element: <NotFoundError />,
        },
        {
          path: "/",
          element: <SplashScreen />,
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
              path: "profile/:temp_id/:user_id",
              element: <Profile />,
            },
          ],
        },
        {
          path: "/profile",
          element: <UserPersonalProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
