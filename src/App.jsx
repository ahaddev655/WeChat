import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFoundError from "./pages/NotFoundError";
import ChatLayout from "./layouts/ChatLayout";
import MainChatLayout from "./layouts/MainChatLayout";
import CommunitiesLayout from "./layouts/CommunitiesLayout";

function App() {
  const routes = createBrowserRouter([
    {
      path: "*",
      element: <NotFoundError />,
    },
    {
      path: "/",
      element: <AuthenticationPage />,
    },
    {
      path: "/chat",
      element: <ChatLayout />,
      children: [
        {
          path: ":temp_id/:id",
          element: <MainChatLayout />,
        },
        {
          path: "communities",
          element: <CommunitiesLayout />,
          children: [
            {
              path: ":temp_id/:id",
              element: "Communities",
            },
          ],
        },
        {
          path: "saved",
          element: "Bookmarks",
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
