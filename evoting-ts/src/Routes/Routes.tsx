import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Container/HomeContainer";
import Login from "../Container/LoginContainer";
import Listing from '../Component/ElectionsContainer';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "login", element: <Login /> },
        { path: "list", element: <Listing /> },
    
      ],
    },
  ]);