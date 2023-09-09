import IPageProps from '../../../interfaces/page';
import { Link } from 'react-router-dom';
import { useState } from "react";
import logging from '../../../config/logging';
import { initializeApp } from 'firebase/app'
import {  createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from '../../../config/firebaseSetup'




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
        })
    }

    return (
        <div className="Register">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Enter Password</label>
          <input
            autoComplete="new-password"
            type="password"
            id="password"
            placeholder="Enter Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            autoComplete="new-password"
            type="password"
            id="confirm"
            placeholder="Confirm Password"
            onChange={(event) => setConfirm(event.target.value)}
            value={confirm}
          />
        </div>
        <button
          disabled={registering}
          onClick={signUpWithEmailAndPassword}
        >
          Sign Up
        </button>
        <small>
          <p className="text-center">
            Already have an account? <Link to="/Login">Login.</Link>
          </p>
        </small>
        {error && <p className="error-text">{error}</p>}
      </div>
);
}

export default RegisterPage