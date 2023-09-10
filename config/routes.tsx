import IRoute from "../interfaces/routes";
import RegisterPage from "../src/app/Register/page";
import Home from "@/app/page";


const routes: IRoute[] = [
    {
        path: '/register',
        exact: true,
        component: RegisterPage,
        name: 'Register Page',
        protected: false
    },
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home',
        protected: false
    },
    
];

export default routes;