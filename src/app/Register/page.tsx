"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import AuthContainer from "../../../components/AuthContainer";
import { auth } from "../../../config/firebaseSetup";
import logging from "../../../config/logging";

export default function Register() {
    const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [error, setError] = useState<string>("");

    const signUpWithEmailAndPassword = () => {
        if (password !== confirm)
            setError("Please make sure your passwords match.");
        if (error !== "") setError("");

        setRegistering(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                logging.info(result);
            })
            .catch((error) => {
                logging.error(error);

                if (error.code.includes("auth/weak-password")) {
                    setError("Please enter a stronger password.");
                } else if (error.code.includes("auth/email-already-in-use")) {
                    setError("Email already in use.");
                } else {
                    setError("Unable to register.  Please try again later.");
                }

                setRegistering(false);
            });
    };

    return (
        <div>
            <div className="my-20 flex text-5xl font-extrabold justify-center items-center">
                Sunday.com
            </div>
            <div className="flex justify-center block w-fit h-fit mx-auto justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                <AuthContainer header="Register">
                    <FormGroup>
                        <Input
                            className="border p-3"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            onChange={(event) => setEmail(event.target.value)}
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
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            value={password}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            className="border p-3"
                            autoComplete="new-password"
                            type="password"
                            name="confirm"
                            id="confirm"
                            placeholder="Confirm Password"
                            onChange={(event) => setConfirm(event.target.value)}
                            value={confirm}
                        />
                    </FormGroup>
                    <Button
                        className="mt-4 py-2 px-4 bg-gray-800 hover:bg-gray-700 focus:ring-gray-100 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                        disabled={registering}
                        color="success"
                        block
                        onClick={() => signUpWithEmailAndPassword()}
                    >
                        Sign Up
                    </Button>
                    <small>
                        <p className="m-1 text-center">
                            Already have an account?
                            <Link href="/Login">Login.</Link>
                        </p>
                    </small>
                </AuthContainer>
            </div>
        </div>
    );
}
