import IRoute from "../interfaces/routes";
import RegisterPage from "../src/app/Register/page";


const routes: IRoute[] = [
    {
        path: '/register',
        exact: true,
        component: RegisterPage,
        name: 'Register Page',
        protected: false
    },
    
];

export default routes;