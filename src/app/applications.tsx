import React, { useEffect, useState } from 'react';
import { Route, useParams, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import AuthRoute from '../../components/AuthRoute';
import { auth } from '../../config/firebaseSetup';
import logging from '../../config/logging';
import Landing from './page'
import RegisterPage from './Register/page';
import Login from './Login/page';
import Menu from './Menu/page';
import ScrumBoard from './ScrumBoard/page';
import ProductBacklog from './ProductBacklog/page';

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = props => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user)
            {
                logging.info('User detected.');
            }
            else
            {
                logging.info('No user detected');
            }

            setLoading(false);
        })
    }, []);

    if (loading)
        return <Spinner color="info" />

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing name="Landing"/>} />
                    <Route path="/Login" element={<Login name="Login"/>} />
                    <Route path="/Register" element={<RegisterPage name="Register"/>} />
                    <Route path="/Menu" element={<Menu name="<Menu>"/>} />
                    <Route path="/ScrumBoard" element={<ScrumBoard name="ScrumBoard"/>} />
                    <Route path="/ProductBacklog" element={<ProductBacklog name="<ProductBacklog>"/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Application;