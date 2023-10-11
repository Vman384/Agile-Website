import React, { useEffect, useState } from "react";
import { auth } from "../../config/firebaseSetup";
import logging from "../../config/logging";
import Landing from "./page";
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
