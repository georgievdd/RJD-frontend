import {createBrowserRouter, Navigate,} from "react-router-dom";
import "./index.css";
import {Wrapper} from "./components/Wrapper";
import {PATH} from "./consts";
import Auth from "./pages/auth/Auth";
import OrderRegistration from "./pages/auth/OrderRegistration";
import {ChooseTrip} from "./pages/ChooseTrip";
import {ChoosePlace} from "./pages/ChoosePlace";

export const router = createBrowserRouter([
    {
        path: PATH.LOGIN,
        element: <Auth />
    },
    {
        path: PATH.REGISTRATION,
        element: <Auth />
    },
    {
        path: '/',
        element: <Navigate to={PATH.LOGIN}/>
    },
    {
        path: PATH.HOME,
        element: <Wrapper />,
        children: [
            {
                path: PATH.HOME,
                element: <ChooseTrip/>,
            },
            {
                path: PATH.ORDER_REGISTRATION,
                element: <OrderRegistration />,
            },
            {
                path: PATH.CHOOSE_PLACE,
                element: <ChoosePlace />,
            }
        ]
    }
]);
