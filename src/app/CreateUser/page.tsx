"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
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
            <div className="my-8 flex text-5xl font-extrabold justify-center items-center">
                <Link href="/AdminMenu" title="Back to Admin. Menu">
                    <Image
                        className="hidden dark:block"
                        priority
                        src="/named-logo-light-text.png"
                        height={88}
                        width={250}
                        alt="Sunday.com logo"
                    />

                    <Image
                        className="block dark:hidden"
                        priority
                        src="/named-logo-dark-text.png"
                        height={88}
                        width={250}
                        alt="Sunday.com logo"
                    />
                </Link>
            </div>
            <div className="flex justify-center block w-fit h-fit mx-auto justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:border-white">
                <AuthContainer header="Create User">
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
                        className="mt-4 py-2 px-4 bg-green-500 hover:bg-green-400 focus:ring-green-100 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                        disabled={registering}
                        color="success"
                        block
                        onClick={signUpWithEmailAndPassword}
                    >
                        Create User
                    </Button>
                </AuthContainer>
            </div>
        </div>
    );
}
