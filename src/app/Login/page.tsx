"use client"
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../../components/AuthContainer';
import ErrorText from '../../../components/ErrorText';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import logging from '../../../config/logging';
import IPageProps from '../../../interfaces/page';
import firebase from 'firebase/app';
import Link from 'next/link'

const Login: React.FunctionComponent<IPageProps> = props => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');


    const signIn = () => {
        if (error !== '') setError('');
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("success")
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    }


    return (
        <div>
            <div className='my-20 flex text-5xl font-extrabold justify-center items-center'>Sunday.com</div>
            <div className="flex justify-center block w-fit h-fit mx-auto justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                <AuthContainer header="Login">
                    <FormGroup>
                        <Input 
                            className="border p-3"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            onChange={event => setEmail(event.target.value)}
                            value={email}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            className="border p-3"
                            autoComplete="new-password"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter Password"
                            onChange={event => setPassword(event.target.value)}
                            value={password}
                        />
                    </FormGroup>
                    <Button
                        className="mt-4 py-2 px-4 bg-gray-800 hover:bg-gray-700 focus:ring-gray-100 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                        color="success"
                        block
                        onClick={() => signIn()}
                    >
                        Login
                    </Button>
                    <small>
                        <BrowserRouter><p className='m-1 text-center'>Don't have an account? <Link href="/Register">Register here.</Link></p></BrowserRouter>
                    </small>
                    <ErrorText error={error} />
                    <hr className="bg-info m-3" />
                </AuthContainer>
            </div>
        </div>
    );
}

export default Login;