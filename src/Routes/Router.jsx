import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../layouts/Home";
import Auth from "../layouts/Auth";
import Main from "../components/Main";



const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children: [
            {
                path: '/',
                element: <Main></Main>
            }
        ]
    },
    {
        path: 'auth',
        element: <Auth></Auth>,
    }

]);

export default Router;