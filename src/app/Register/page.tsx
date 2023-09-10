"use client"
import IPageProps from '../../../interfaces/page';
import { BrowserRouter } from 'react-router-dom';
import Link from 'next/link'
import { useState } from "react";
import logging from '../../../config/logging';
import {  createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from '../../../config/firebaseSetup'
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../../components/AuthContainer';






const RegisterPage: React.FunctionComponent<IPageProps> = props => {
    const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');


    const signUpWithEmailAndPassword = () =>{
        if (password !== confirm) setError("Please make sure your passwords match.")
        if (error !== '') setError('');

        setRegistering(true);
        createUserWithEmailAndPassword(auth, email,password)
        .then(result => {
            logging.info(result)
        }).catch(error =>{
            logging.error(error);

            if (error.code.includes('auth/weak-password'))
            {
                setError('Please enter a stronger password.');
            }
            else if (error.code.includes('auth/email-already-in-use'))
            {
                setError('Email already in use.');
            }
            else
            {
                setError('Unable to register.  Please try again later.')
            }

            setRegistering(false);
        });
    }

    return (
      <AuthContainer header="Register">
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
      <FormGroup>
          <Input 
              autoComplete="new-password"
              type="password"
              name="confirm"
              id="confirm"
              placeholder="Confirm Password"
              onChange={event => setConfirm(event.target.value)}
              value={confirm}
          />
      </FormGroup>
      <Button
          disabled={registering}
          color="success"
          block
          onClick={() =>signUpWithEmailAndPassword()}
      >
          Sign Up
      </Button>
      <small>
      <BrowserRouter><p className='m-1 text-center'>Already have an account? <Link href="/">Login.</Link></p></BrowserRouter>
      </small>
  </AuthContainer>
);
}

export default RegisterPage;