import React, { useEffect, useState } from "react";
import {
    Route,
    useParams,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import { Spinner } from "reactstrap";
import { auth } from "../../config/firebaseSetup";
import logging from "../../config/logging";
import Landing from "./page";
import RegisterPage from "./Register/page";
import Login from "./Login/page";
import Menu from "./Menu/page";
import ScrumBoard from "./ScrumBoard/page";
import ProductBacklog from "./ProductBacklog/page";

export default function Application() {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                logging.info("User detected.");
            } else {
                logging.info("No user detected");
            }

            setLoading(false);
        });
    }, []);

    if (loading) return <Spinner color="info" />;

    return (
        <div>
            <Landing />
            <Login />
            <Menu />
            <ScrumBoard />
            <ProductBacklog />
        </div>
    );
}
