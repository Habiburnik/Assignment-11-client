import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../layouts/Home";
import Auth from "../layouts/Auth";
import Main from "../components/Main";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import AddArtifacts from "../components/pages/AddArtifacts";
import PrivateRoute from "./PrivateRoute";



const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children: [
            {
                path: '/',
                element: <Main></Main>
            },
            {
                path: '/addArtifact',
                element: <PrivateRoute><AddArtifacts></AddArtifacts></PrivateRoute>
            }
        ]
    },
    {
        path: 'auth',
        element: <Auth></Auth>,
        children: [
                        {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            }
        ]
    }

]);

export default Router;