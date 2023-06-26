import AuthorizationPage from "../pages/AuthorizationPage";
import RegistrationPage from "../pages/RegistrationPage";
import TaskPage from "../pages/TaskPage";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, TASK_ROUTE } from "../utils/consts";

const publicRoutes = [
    { path: REGISTRATION_ROUTE, component: RegistrationPage, exact: true },
    { path: LOGIN_ROUTE, component: AuthorizationPage, exact: true },
]

const authRoutes = [
    { path: TASK_ROUTE, component: TaskPage, exact: true },
]

export {
    publicRoutes,
    authRoutes
}