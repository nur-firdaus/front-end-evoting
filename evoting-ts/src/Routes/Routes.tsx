import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Container/HomeContainer";
import Listing from '../Component/ElectionsContainer';
import LoginForm from "../Container/LoginContainer";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "login", element: <LoginForm updateUsername={function (name: string): void {
            throw new Error("Function not implemented.");
        } } /> },
        { path: "list", element: <Listing /> },
    
      ],
    },
  ]);