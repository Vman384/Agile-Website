import React, { useEffect, useState } from 'react';
import { Route, useParams, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import AuthRoute from '../../components/AuthRoute';
import { auth } from '../../config/firebaseSetup';
import logging from '../../config/logging';
import routes from '../../config/routes';
import Home from './page'

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
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default Application;