import { Routes, Route, Navigate, } from "react-router-dom";
import { authRoutes, publicRoutes } from "../router/Routes";
import { LOGIN_ROUTE, TASK_ROUTE } from "../utils/consts";
import { useContext } from "react";
import { observer } from "mobx-react";
import { Context } from "..";
import Navbar from "./UI/navbar/Navbar.jsx";


const AppRoute = observer(() => {
    const { user } = useContext(Context);

    

    return (
        <>
            {user.getIsAuth&&<Navbar/>}
            {user.getIsAuth
                ?
                <Routes>
                    {authRoutes.map(route =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                            exact={route.exact} />
                    )
                    }
                    <Route path="*" element={<Navigate to={TASK_ROUTE} />} />
                </Routes>

                : <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                            exact={route.exact}
                        />)}
                    <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
                </Routes>
            }
        </>
    )
})

export default AppRoute;