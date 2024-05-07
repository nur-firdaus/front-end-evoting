import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Container/HomeContainer";
import Listing from '../Container/ElectionsContainer';
import LoginForm from "../Container/LoginContainer";
import ElectionsContainer from "../Container/ElectionsContainer";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "login", element: <LoginForm updateUsername={function (name: string): void {
            throw new Error("Function not implemented.");
        } } /> },
        { path: "list", element: <ElectionsContainer /> },
        
    
      ],
    },
  ]);