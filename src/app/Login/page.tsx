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
        <AuthContainer header="Login">
            <FormGroup>
                <Input 
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
    );
}

export default Login;