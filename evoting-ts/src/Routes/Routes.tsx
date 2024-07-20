import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Container/HomeContainer";
import Listing from '../Container/ElectionsRealtimeContainer';
import LoginForm from "../Container/LoginContainer";
import ElectionFormContainer from "../Container/ElectionFormContainer";
import ElectionsRealtimeContainer from "../Container/ElectionsRealtimeContainer";
import ElectionsBatchContainer from "../Container/ElectionsBatchContainer";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "login", element: <LoginForm updateUsername={function (name: string): void {
            throw new Error("Function not implemented.");
        } } /> },
        { path: "list-batch", element: <ElectionsBatchContainer /> },
        { path: "CreateElection", element: <ElectionFormContainer /> },
        { path: "list-realtime", element: <ElectionsRealtimeContainer /> },
    
      ],
    },
  ]);