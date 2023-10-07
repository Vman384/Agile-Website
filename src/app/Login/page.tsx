"use client";

import React, { useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import AuthContainer from "../../../components/AuthContainer";
import ErrorText from "../../../components/ErrorText";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebaseSetup";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const signIn = () => {
        if (error !== "") setError("");
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("success");
                window.location.href = "/Menu";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <div>
            <div className="mt-8 mb-5 justify-center mx-5 flex">
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
            </div>
            <div className="flex justify-center block w-fit h-fit mx-auto justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                <AuthContainer header="Login">
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
                    <Button
                        className="mt-4 py-2 px-4 bg-gray-800 hover:bg-gray-700 focus:ring-gray-100 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                        color="success"
                        block
                        onClick={signIn}
                    >
                        Login
                    </Button>
                    <small>
                        <p className="m-1 text-center">
                            Don't have an account?
                            <Link href="/Register">Register here.</Link>
                        </p>
                    </small>
                    <ErrorText error={error} />
                    <hr className="bg-info m-3" />
                </AuthContainer>
            </div>
        </div>
    );
}
