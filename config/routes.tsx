import Home from "@/app/page";
import IRoute from "../interfaces/routes";
import Login from "../src/app/Login/page";
import RegisterPage from "../src/app/Register/page";

const routes: IRoute[] = [
    {
        path: "/register",
        exact: true,
        component: RegisterPage,
        name: "Register Page",
        protected: false,
    },
    {
        path: "/",
        exact: true,
        component: Home,
        name: "Home",
        protected: true,
    },
    {
        path: "/Login",
        exact: true,
        component: Login,
        name: "Home",
        protected: false,
    },
];

export default routes;
