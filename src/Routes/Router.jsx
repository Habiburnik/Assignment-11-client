import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../layouts/Home";
import Auth from "../layouts/Auth";
import Main from "../components/Main";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import AddArtifacts from "../components/pages/AddArtifacts";
import AllArtifacts from "../components/pages/AllArtifacts";
import PrivateRoute from "./PrivateRoute";
import ArtifactsDetails from "../components/pages/ArtifactsDetails";
import LikedArtifacts from "../components/pages/LikedArtifacts";
import MyArtifacts from "../components/pages/MyArtifacts";



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
            },
            {
                path: '/allartifacts',
                element: <AllArtifacts></AllArtifacts>
            },
            {
                path: '/artifactsDetails/:id',
                element: <PrivateRoute><ArtifactsDetails></ArtifactsDetails></PrivateRoute>
            },
            {
                path: '/likedArtifacts',
                element: <PrivateRoute><LikedArtifacts></LikedArtifacts></PrivateRoute>
            },
            {
                path:"/myArtifacts",
                element:<PrivateRoute><MyArtifacts></MyArtifacts></PrivateRoute>
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