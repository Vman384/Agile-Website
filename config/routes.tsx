import IRoute from "../interfaces/routes";
// import ChangePasswordPage from "../src/app/Login/change";
// import ForgotPasswordPage from "../pages/auth/forgot";
// import LoginPage from "../pages/auth/login";
// import LogoutPage from "../pages/auth/logout";
import RegisterPage from "../src/app/Login/Login";
// import ResetPasswordPage from "../pages/auth/reset";
// import HomePage from "../pages/home";

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: RegisterPage,
        name: 'Register',
        protected: true
    },
    // {
    //     path: '/register',
    //     exact: true,
    //     component: RegisterPage,
    //     name: 'Register Page',
    //     protected: false
    // },
    // {
    //     path: '/login',
    //     exact: true,
    //     component: LoginPage,
    //     name: 'Login Page',
    //     protected: false
    // },
    // {
    //     path: '/change',
    //     exact: true,
    //     component: ChangePasswordPage,
    //     name: 'Change Password Page',
    //     protected: true
    // },
    // {
    //     path: '/logout',
    //     exact: true,
    //     component: LogoutPage,
    //     name: 'Logout Page',
    //     protected: true
    // },
    // {
    //     path: '/forget',
    //     exact: true,
    //     component: ForgotPasswordPage,
    //     name: 'Forgot Password Page',
    //     protected: false
    // },
    // {
    //     path: '/reset',
    //     exact: true,
    //     component: ResetPasswordPage,
    //     name: 'Reset Password Page',
    //     protected: false
    // }
];

export default routes;