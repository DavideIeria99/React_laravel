import { createBrowserRouter } from "react-router-dom";

import Root from "./src/Components/Views/Root/Root";
import Home from "./src/Components/Views/Home/Home";
import Details from "./src/Components/Views/Details/Details";
import Search from "./src/Components/Views/Search/Search";
import Sign from "./src/Components/Views/Sign/Sign";
import Profile from "./src/Components/Views/Profile/Profile";
import ProtectedRoute from "./src/Components/Utilities/ProtectedRoute";
import Update from "./src/Components/Views/Update/Update";
import UpdateImage from "./src/Components/Views/UpdateImage/UpdateImage.jsx";








export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:slug",
        element: <Details />,
      },
      {
        path: "/search/:genre/:num",
        element: <Search />,
      },
      {
        path: "/Sign",
        element: <Sign />,
      },


      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />
          },
          {
            path: "/updateProfile",
            element: <Update />
          },
          {
            path: "/updateImage",
            element: <UpdateImage />
          },
        ]
      },
    ]
  },

]);
