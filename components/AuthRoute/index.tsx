import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../config/firebaseSetup";
import logging from "../../config/logging";

export interface IAuthRouteProps {
    children: React.ReactNode;
}

export default function AuthRoute({ children }: IAuthRouteProps) {
    if (!auth.currentUser) {
        logging.warn("No user detected, redirecting");
        return <Navigate to="/Login" />;
    }

    return <div>{children}</div>;
}
